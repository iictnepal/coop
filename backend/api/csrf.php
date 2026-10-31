<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/functions.php';

Response::success([
    'csrf_token' => CSRF::getToken()
], 'CSRF token generated');
