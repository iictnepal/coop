<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/functions.php';

Auth::logout();
header('Location: /admin/index.php');
exit;
