<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/functions.php';

$db = Database::getConnection();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $db->query("SELECT * FROM news ORDER BY published_date DESC, id DESC");
    $articles = $stmt->fetchAll();

    $result = array_map(function ($n) {
        return [
            'id'            => 'news-' . $n['id'],
            'numericId'     => (int)$n['id'],
            'titleEn'       => $n['title_en'],
            'titleNe'       => $n['title_ne'],
            'category'      => $n['category'],
            'publishedDate' => $n['published_date'],
            'summaryEn'     => $n['summary_en'],
            'summaryNe'     => $n['summary_ne'],
            'contentEn'     => $n['content_en'],
            'contentNe'     => $n['content_ne'],
            'imageUrl'      => $n['image_url'],
        ];
    }, $articles);

    Response::success($result);
}

if ($method === 'POST') {
    $admin = Auth::requireAdmin();
    CSRF::enforce();

    $input = !empty($_POST) ? $_POST : Response::getJsonInput();

    $errors = Validator::requireFields($input, ['titleEn', 'contentEn']);
    if (!empty($errors)) {
        Response::error('Validation failed', 422, $errors);
    }

    $imageUrl = $input['imageUrl'] ?? 'https://images.unsplash.com/photo-1556742049-0a67c55c2764?auto=format&fit=crop&w=800&q=80';

    // Handle image upload if provided
    if (isset($_FILES['imageFile']) && $_FILES['imageFile']['error'] !== UPLOAD_ERR_NO_FILE) {
        try {
            $upload = SecureUploader::uploadImage($_FILES['imageFile']);
            $imageUrl = $upload['filePath'];
        } catch (Exception $e) {
            Response::error('Image upload error: ' . $e->getMessage(), 422);
        }
    }

    $stmt = $db->prepare("
        INSERT INTO news (
            title_en, title_ne, category, published_date,
            summary_en, summary_ne, content_en, content_ne, image_url
        ) VALUES (
            :title_en, :title_ne, :category, :published_date,
            :summary_en, :summary_ne, :content_en, :content_ne, :image_url
        )
    ");

    $stmt->execute([
        'title_en'       => Validator::sanitize($input['titleEn']),
        'title_ne'       => Validator::sanitize($input['titleNe'] ?? $input['titleEn']),
        'category'       => Validator::sanitize($input['category'] ?? 'Community'),
        'published_date' => $input['publishedDate'] ?? date('Y-m-d'),
        'summary_en'     => Validator::sanitize($input['summaryEn'] ?? substr($input['contentEn'], 0, 160)),
        'summary_ne'     => Validator::sanitize($input['summaryNe'] ?? ($input['contentNe'] ?? '')),
        'content_en'     => Validator::sanitize($input['contentEn']),
        'content_ne'     => Validator::sanitize($input['contentNe'] ?? $input['contentEn']),
        'image_url'      => Validator::sanitize($imageUrl),
    ]);

    $newId = (int)$db->lastInsertId();
    Auth::logActivity($admin['username'], 'PUBLISH_NEWS', 'Published news article: ' . $input['titleEn']);

    Response::success(['id' => 'news-' . $newId], 'News article published successfully', 201);
}

if ($method === 'DELETE') {
    $admin = Auth::requireAdmin();
    CSRF::enforce();

    $rawId = $_GET['id'] ?? '';
    $id = (int)str_replace('news-', '', (string)$rawId);

    if ($id <= 0) {
        Response::error('Invalid news ID', 400);
    }

    $stmt = $db->prepare("DELETE FROM news WHERE id = :id");
    $stmt->execute(['id' => $id]);

    Auth::logActivity($admin['username'], 'DELETE_NEWS', "Deleted news article ID: {$id}");

    Response::success(null, 'News article deleted successfully');
}

Response::error('Method not allowed', 405);
