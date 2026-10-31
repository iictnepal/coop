<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/functions.php';

$db = Database::getConnection();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $db->query("SELECT setting_key, setting_value FROM website_settings");
    $rows = $stmt->fetchAll();
    
    $settings = [];
    foreach ($rows as $r) {
        $settings[$r['setting_key']] = $r['setting_value'];
    }

    Response::success($settings);
}

if ($method === 'POST') {
    Auth::requireAdmin();
    CSRF::enforce();

    $input = Response::getJsonInput();
    if (empty($input)) {
        $input = $_POST;
    }

    if (empty($input)) {
        Response::error('No settings provided for update', 422);
    }

    $stmt = $db->prepare("
        INSERT INTO website_settings (setting_key, setting_value) 
        VALUES (:k, :v)
        ON DUPLICATE KEY UPDATE setting_value = :v2
    ");

    $admin = Auth::getAdminUser();
    $adminName = $admin['username'] ?? 'admin';

    $db->beginTransaction();
    try {
        foreach ($input as $k => $v) {
            if ($k === 'csrf_token') continue;
            $stmt->execute([
                'k'  => (string)$k,
                'v'  => (string)$v,
                'v2' => (string)$v
            ]);
        }
        $db->commit();
        Auth::logActivity($adminName, 'SETTINGS_UPDATE', 'Updated cooperative website settings via CMS');
        Response::success(null, 'Settings updated successfully');
    } catch (Exception $e) {
        $db->rollBack();
        Response::error('Failed to update settings: ' . $e->getMessage(), 500);
    }
}

Response::error('Method not allowed', 405);
