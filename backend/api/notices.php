<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/functions.php';

$db = Database::getConnection();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $db->query("SELECT * FROM notices ORDER BY is_pinned DESC, published_date DESC, id DESC");
    $notices = $stmt->fetchAll();

    $result = array_map(function ($n) {
        return [
            'id'            => 'notice-' . $n['id'],
            'numericId'     => (int)$n['id'],
            'titleEn'       => $n['title_en'],
            'titleNe'       => $n['title_ne'],
            'category'      => $n['category'],
            'publishedDate' => $n['published_date'],
            'expiryDate'    => $n['expiry_date'],
            'contentEn'     => $n['content_en'],
            'contentNe'     => $n['content_ne'],
            'isPinned'      => (bool)$n['is_pinned'],
            'hasPdf'        => !empty($n['pdf_file_name']),
            'pdfFileName'   => $n['pdf_file_name'],
            'pdfSize'       => $n['pdf_size'],
        ];
    }, $notices);

    Response::success($result);
}

if ($method === 'POST') {
    $admin = Auth::requireAdmin();
    CSRF::enforce();

    // Check if multipart form data was submitted (contains file)
    $input = !empty($_POST) ? $_POST : Response::getJsonInput();

    $errors = Validator::requireFields($input, ['titleEn', 'contentEn']);
    if (!empty($errors)) {
        Response::error('Validation failed', 422, $errors);
    }

    $pdfFileName = null;
    $pdfSize = null;

    // Handle secure PDF upload if file was attached
    if (isset($_FILES['pdfFile']) && $_FILES['pdfFile']['error'] !== UPLOAD_ERR_NO_FILE) {
        try {
            $upload = SecureUploader::uploadDocument($_FILES['pdfFile']);
            $pdfFileName = $upload['fileName'];
            $pdfSize = $upload['fileSize'];
        } catch (Exception $e) {
            Response::error('File upload error: ' . $e->getMessage(), 422);
        }
    } else if (!empty($input['pdfFileName'])) {
        $pdfFileName = Validator::sanitize($input['pdfFileName']);
        $pdfSize = Validator::sanitize($input['pdfSize'] ?? '512 KB');
    }

    $stmt = $db->prepare("
        INSERT INTO notices (
            title_en, title_ne, category, published_date, expiry_date,
            content_en, content_ne, is_pinned, pdf_file_name, pdf_size
        ) VALUES (
            :title_en, :title_ne, :category, :published_date, :expiry_date,
            :content_en, :content_ne, :is_pinned, :pdf_file_name, :pdf_size
        )
    ");

    $stmt->execute([
        'title_en'       => Validator::sanitize($input['titleEn']),
        'title_ne'       => Validator::sanitize($input['titleNe'] ?? $input['titleEn']),
        'category'       => Validator::sanitize($input['category'] ?? 'General'),
        'published_date' => $input['publishedDate'] ?? date('Y-m-d'),
        'expiry_date'    => !empty($input['expiryDate']) ? $input['expiryDate'] : null,
        'content_en'     => Validator::sanitize($input['contentEn']),
        'content_ne'     => Validator::sanitize($input['contentNe'] ?? $input['contentEn']),
        'is_pinned'      => !empty($input['isPinned']) ? 1 : 0,
        'pdf_file_name'  => $pdfFileName,
        'pdf_size'       => $pdfSize,
    ]);

    $newId = (int)$db->lastInsertId();
    Auth::logActivity($admin['username'], 'PUBLISH_NOTICE', 'Published notice: ' . $input['titleEn']);

    Response::success(['id' => 'notice-' . $newId], 'Notice published successfully', 201);
}

if ($method === 'DELETE') {
    $admin = Auth::requireAdmin();
    CSRF::enforce();

    $rawId = $_GET['id'] ?? '';
    $id = (int)str_replace('notice-', '', (string)$rawId);

    if ($id <= 0) {
        Response::error('Invalid notice ID', 400);
    }

    // Check if notice has attached PDF to delete
    $find = $db->prepare("SELECT pdf_file_name FROM notices WHERE id = :id");
    $find->execute(['id' => $id]);
    $item = $find->fetch();

    if ($item && !empty($item['pdf_file_name'])) {
        $filePath = DOC_UPLOAD_DIR . '/' . $item['pdf_file_name'];
        if (file_exists($filePath)) {
            @unlink($filePath);
        }
    }

    $stmt = $db->prepare("DELETE FROM notices WHERE id = :id");
    $stmt->execute(['id' => $id]);

    Auth::logActivity($admin['username'], 'DELETE_NOTICE', "Deleted notice ID: {$id}");

    Response::success(null, 'Notice deleted successfully');
}

Response::error('Method not allowed', 405);
