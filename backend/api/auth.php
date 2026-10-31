<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/functions.php';

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

// Check session
if ($method === 'GET') {
    if ($action === 'status' || $action === 'me') {
        Response::success([
            'adminUser'  => Auth::getAdminUser(),
            'memberUser' => Auth::getMemberUser(),
            'csrf_token' => CSRF::getToken()
        ]);
    }
    Response::error('Invalid action', 400);
}

// Authentication mutations
if ($method === 'POST') {
    $input = Response::getJsonInput();
    if (empty($input)) {
        $input = $_POST;
    }

    if ($action === 'admin_login') {
        $username = trim($input['username'] ?? 'admin');
        $password = trim($input['password'] ?? '');

        if ($password === '') {
            Response::error('Password is required', 422);
        }

        $user = Auth::loginAdmin($username, $password);
        if ($user) {
            Response::success([
                'user'       => $user,
                'csrf_token' => CSRF::getToken()
            ], 'Admin login successful');
        } else {
            Response::error('Invalid administrator credentials', 401);
        }
    }

    if ($action === 'member_login') {
        $memberId = trim($input['memberId'] ?? $input['member_id'] ?? '');
        $password = trim($input['password'] ?? '');

        if ($memberId === '') {
            Response::error('Member ID is required', 422);
        }

        $member = Auth::loginMember($memberId, $password);
        if ($member) {
            Response::success([
                'member'     => $member,
                'csrf_token' => CSRF::getToken()
            ], 'Member portal login successful');
        } else {
            Response::error('Member ID or Password not found in cooperative records', 401);
        }
    }

    if ($action === 'logout') {
        Auth::logout();
        Response::success([
            'csrf_token' => CSRF::getToken()
        ], 'Logged out successfully');
    }

    Response::error('Unsupported authentication action', 400);
}

Response::error('Method not allowed', 405);
