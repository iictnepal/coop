<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/functions.php';

$db = Database::getConnection();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    Auth::requireAdmin();

    $stmt = $db->query("SELECT * FROM activity_logs ORDER BY created_at DESC LIMIT 100");
    $logs = $stmt->fetchAll();

    $result = array_map(function ($l) {
        return [
            'id'        => (string)$l['id'],
            'userName'  => $l['user_name'],
            'action'    => $l['action'],
            'details'   => $l['details'],
            'ipAddress' => $l['ip_address'],
            'createdAt' => $l['created_at'],
        ];
    }, $logs);

    Response::success($result);
}

Response::error('Method not allowed', 405);
