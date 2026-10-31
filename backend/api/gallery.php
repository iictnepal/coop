<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/functions.php';

$db = Database::getConnection();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $db->query("SELECT * FROM gallery_items ORDER BY date DESC, id DESC");
    $items = $stmt->fetchAll();

    $result = array_map(function ($g) {
        return [
            'id'        => 'gal-' . $g['id'],
            'numericId' => (int)$g['id'],
            'titleEn'   => $g['title_en'],
            'titleNe'   => $g['title_ne'],
            'category'  => $g['category'],
            'imageUrl'  => $g['image_url'],
            'date'      => $g['date'],
        ];
    }, $items);

    Response::success($result);
}

if ($method === 'POST') {
    $admin = Auth::requireAdmin();
    CSRF::enforce();

    $input = !empty($_POST) ? $_POST : Response::getJsonInput();

    $errors = Validator::requireFields($input, ['titleEn']);
    if (!empty($errors)) {
        Response::error('Validation failed', 422, $errors);
    }

    $imageUrl = $input['imageUrl'] ?? 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=800&q=80';

    if (isset($_FILES['imageFile']) && $_FILES['imageFile']['error'] !== UPLOAD_ERR_NO_FILE) {
        try {
            $upload = SecureUploader::uploadImage($_FILES['imageFile']);
            $imageUrl = $upload['filePath'];
        } catch (Exception $e) {
            Response::error('Image upload error: ' . $e->getMessage(), 422);
        }
    }

    $stmt = $db->prepare("
        INSERT INTO gallery_items (title_en, title_ne, category, image_url, date)
        VALUES (:title_en, :title_ne, :category, :image_url, :date)
    ");

    $stmt->execute([
        'title_en'  => Validator::sanitize($input['titleEn']),
        'title_ne'  => Validator::sanitize($input['titleNe'] ?? $input['titleEn']),
        'category'  => Validator::sanitize($input['category'] ?? 'Event'),
        'image_url' => Validator::sanitize($imageUrl),
        'date'      => $input['date'] ?? date('Y-m-d'),
    ]);

    $newId = (int)$db->lastInsertId();
    Auth::logActivity($admin['username'], 'ADD_GALLERY_ITEM', 'Added gallery photo: ' . $input['titleEn']);

    Response::success(['id' => 'gal-' . $newId], 'Photo added to gallery', 201);
}

if ($method === 'DELETE') {
    $admin = Auth::requireAdmin();
    CSRF::enforce();

    $rawId = $_GET['id'] ?? '';
    $id = (int)str_replace('gal-', '', (string)$rawId);

    if ($id <= 0) {
        Response::error('Invalid gallery ID', 400);
    }

    $stmt = $db->prepare("DELETE FROM gallery_items WHERE id = :id");
    $stmt->execute(['id' => $id]);

    Auth::logActivity($admin['username'], 'DELETE_GALLERY_ITEM', "Deleted gallery photo ID: {$id}");

    Response::success(null, 'Gallery item deleted');
}

Response::error('Method not allowed', 405);
