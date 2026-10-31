<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/functions.php';

$db = Database::getConnection();
$method = $_SERVER['REQUEST_METHOD'];

// Handle secure document download and counter increment
if ($method === 'GET' && isset($_GET['action']) && $_GET['action'] === 'download') {
    $rawId = $_GET['id'] ?? '';
    $id = (int)str_replace('doc-', '', (string)$rawId);

    if ($id <= 0) {
        Response::error('Invalid document ID', 400);
    }

    $stmt = $db->prepare("SELECT * FROM documents WHERE id = :id");
    $stmt->execute(['id' => $id]);
    $doc = $stmt->fetch();

    if (!$doc) {
        Response::error('Document not found', 404);
    }

    // Increment download counter
    $inc = $db->prepare("UPDATE documents SET downloads_count = downloads_count + 1 WHERE id = :id");
    $inc->execute(['id' => $id]);

    $filePath = DOC_UPLOAD_DIR . '/' . $doc['file_path'];
    if (file_exists($filePath)) {
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="' . basename($doc['file_path']) . '"');
        header('Content-Length: ' . filesize($filePath));
        readfile($filePath);
        exit;
    } else {
        // Fallback for pre-seeded demonstration documents
        Response::success([
            'document' => $doc['title_en'],
            'fileName' => $doc['file_path'],
            'message'  => 'Download registered'
        ]);
    }
}

if ($method === 'GET') {
    $stmt = $db->query("SELECT * FROM documents ORDER BY id ASC");
    $docs = $stmt->fetchAll();

    $result = array_map(function ($d) {
        return [
            'id'             => 'doc-' . $d['id'],
            'numericId'      => (int)$d['id'],
            'titleEn'        => $d['title_en'],
            'titleNe'        => $d['title_ne'],
            'category'       => $d['category'],
            'filePath'       => $d['file_path'],
            'fileSize'       => $d['file_size'],
            'fileType'       => $d['file_type'] ?? 'PDF',
            'downloadsCount' => (int)$d['downloads_count'],
            'createdAt'      => $d['created_at'],
        ];
    }, $docs);

    Response::success($result);
}

if ($method === 'POST') {
    $admin = Auth::requireAdmin();
    CSRF::enforce();

    $input = !empty($_POST) ? $_POST : Response::getJsonInput();

    $errors = Validator::requireFields($input, ['titleEn', 'category']);
    if (!empty($errors)) {
        Response::error('Validation failed', 422, $errors);
    }

    $filePath = $input['filePath'] ?? 'Cooperative_Form.pdf';
    $fileSize = $input['fileSize'] ?? '320 KB';
    $fileType = $input['fileType'] ?? 'PDF';

    if (isset($_FILES['documentFile']) && $_FILES['documentFile']['error'] !== UPLOAD_ERR_NO_FILE) {
        try {
            $upload = SecureUploader::uploadDocument($_FILES['documentFile']);
            $filePath = $upload['fileName'];
            $fileSize = $upload['fileSize'];
            $fileType = $upload['fileType'];
        } catch (Exception $e) {
            Response::error('Upload error: ' . $e->getMessage(), 422);
        }
    }

    $stmt = $db->prepare("
        INSERT INTO documents (title_en, title_ne, category, file_path, file_size, file_type, downloads_count)
        VALUES (:title_en, :title_ne, :category, :file_path, :file_size, :file_type, 0)
    ");

    $stmt->execute([
        'title_en'  => Validator::sanitize($input['titleEn']),
        'title_ne'  => Validator::sanitize($input['titleNe'] ?? $input['titleEn']),
        'category'  => Validator::sanitize($input['category']),
        'file_path' => Validator::sanitize($filePath),
        'file_size' => Validator::sanitize($fileSize),
        'file_type' => Validator::sanitize($fileType),
    ]);

    $newId = (int)$db->lastInsertId();
    Auth::logActivity($admin['username'], 'UPLOAD_DOCUMENT', 'Uploaded document: ' . $input['titleEn']);

    Response::success(['id' => 'doc-' . $newId], 'Document added successfully', 201);
}

if ($method === 'DELETE') {
    $admin = Auth::requireAdmin();
    CSRF::enforce();

    $rawId = $_GET['id'] ?? '';
    $id = (int)str_replace('doc-', '', (string)$rawId);

    if ($id <= 0) {
        Response::error('Invalid document ID', 400);
    }

    $find = $db->prepare("SELECT file_path FROM documents WHERE id = :id");
    $find->execute(['id' => $id]);
    $doc = $find->fetch();

    if ($doc && !empty($doc['file_path'])) {
        $path = DOC_UPLOAD_DIR . '/' . $doc['file_path'];
        if (file_exists($path)) {
            @unlink($path);
        }
    }

    $stmt = $db->prepare("DELETE FROM documents WHERE id = :id");
    $stmt->execute(['id' => $id]);

    Auth::logActivity($admin['username'], 'DELETE_DOCUMENT', "Deleted document ID: {$id}");

    Response::success(null, 'Document deleted successfully');
}

Response::error('Method not allowed', 405);
