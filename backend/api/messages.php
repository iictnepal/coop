<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/functions.php';

$db = Database::getConnection();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    Auth::requireAdmin();
    $stmt = $db->query("SELECT * FROM contact_messages ORDER BY created_at DESC");
    $messages = $stmt->fetchAll();

    $result = array_map(function ($m) {
        return [
            'id'         => (string)$m['id'],
            'fullName'   => $m['full_name'],
            'phone'      => $m['phone'],
            'email'      => $m['email'],
            'subject'    => $m['subject'],
            'message'    => $m['message'],
            'status'     => $m['status'],
            'adminNotes' => $m['admin_notes'],
            'createdAt'  => $m['created_at'],
        ];
    }, $messages);

    Response::success($result);
}

if ($method === 'POST') {
    CSRF::enforce();

    $input = Response::getJsonInput();
    if (empty($input)) {
        $input = $_POST;
    }

    $errors = Validator::requireFields($input, ['fullName', 'phone', 'subject', 'message']);
    if (!Validator::isPhone($input['phone'] ?? '')) {
        $errors['phone'] = 'Please enter a valid telephone/mobile number.';
    }

    if (!empty($errors)) {
        Response::error('Contact form validation error', 422, $errors);
    }

    $stmt = $db->prepare("
        INSERT INTO contact_messages (full_name, phone, email, subject, message, status)
        VALUES (:full_name, :phone, :email, :subject, :message, 'Pending')
    ");

    $stmt->execute([
        'full_name' => Validator::sanitize($input['fullName']),
        'phone'     => Validator::sanitize($input['phone']),
        'email'     => !empty($input['email']) ? Validator::sanitize($input['email']) : null,
        'subject'   => Validator::sanitize($input['subject']),
        'message'   => Validator::sanitize($input['message']),
    ]);

    $newId = (int)$db->lastInsertId();

    Auth::logActivity(
        $input['fullName'],
        'CONTACT_MESSAGE_SUBMITTED',
        "Inquiry received regarding: " . substr($input['subject'], 0, 50)
    );

    Response::success(['id' => $newId], 'Thank you for reaching out. We will get back to you shortly.', 201);
}

if ($method === 'PUT' || $method === 'PATCH') {
    $admin = Auth::requireAdmin();
    CSRF::enforce();

    $input = Response::getJsonInput();
    $id = (int)($input['id'] ?? 0);
    $status = $input['status'] ?? 'Read';
    $notes = $input['adminNotes'] ?? null;

    if ($id <= 0) {
        Response::error('Invalid message ID', 400);
    }

    $stmt = $db->prepare("
        UPDATE contact_messages 
        SET status = :status, admin_notes = COALESCE(:notes, admin_notes)
        WHERE id = :id
    ");

    $stmt->execute([
        'status' => in_array($status, ['Pending', 'Read', 'Replied'], true) ? $status : 'Read',
        'notes'  => $notes !== null ? Validator::sanitize($notes) : null,
        'id'     => $id
    ]);

    Auth::logActivity($admin['username'], 'MESSAGE_STATUS_UPDATE', "Message ID {$id} marked as {$status}");

    Response::success(null, 'Inquiry status updated');
}

if ($method === 'DELETE') {
    $admin = Auth::requireAdmin();
    CSRF::enforce();

    $id = (int)($_GET['id'] ?? 0);
    if ($id <= 0) {
        Response::error('Invalid message ID', 400);
    }

    $stmt = $db->prepare("DELETE FROM contact_messages WHERE id = :id");
    $stmt->execute(['id' => $id]);

    Auth::logActivity($admin['username'], 'DELETE_MESSAGE', "Deleted inquiry ID: {$id}");

    Response::success(null, 'Inquiry deleted successfully');
}

Response::error('Method not allowed', 405);
