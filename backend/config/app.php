<?php
declare(strict_types=1);

/**
 * Application Core Configuration
 * Timezone: Asia/Kathmandu (Nepal Standard Time)
 * Security headers, Session management, Application constants
 */

// Official timezone for Nepal
date_default_timezone_set('Asia/Kathmandu');

// Secure Session Cookie Settings
if (session_status() === PHP_SESSION_NONE) {
    ini_set('session.cookie_httponly', '1');
    ini_set('session.use_only_cookies', '1');
    ini_set('session.cookie_samesite', 'Lax');
    if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') {
        ini_set('session.cookie_secure', '1');
    }
    session_start();
}

// Security Headers
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('X-XSS-Protection: 1; mode=block');
header('Referrer-Policy: strict-origin-when-cross-origin');

// Cooperative Meta Constants
define('APP_NAME_EN', 'Aadhunik Jana Saving & Credit Co-operative Ltd.');
define('APP_NAME_NE', 'आधुनिक जन बचत तथा ऋण सहकारी संस्था लिमिटेड');
define('APP_REG_NO', '1248/065/066 (Department of Co-operatives, Nepal)');
define('APP_PAN', '302847195');
define('APP_LOCATION', 'Ward No. 4, Nagarjun Municipality, Kathmandu, Nepal');

// Upload directory paths
define('BASE_PATH', dirname(__DIR__));
define('UPLOAD_DIR', BASE_PATH . '/uploads');
define('DOC_UPLOAD_DIR', UPLOAD_DIR . '/documents');
define('IMG_UPLOAD_DIR', UPLOAD_DIR . '/images');

if (!is_dir(UPLOAD_DIR)) {
    @mkdir(UPLOAD_DIR, 0755, true);
}
if (!is_dir(DOC_UPLOAD_DIR)) {
    @mkdir(DOC_UPLOAD_DIR, 0755, true);
}
if (!is_dir(IMG_UPLOAD_DIR)) {
    @mkdir(IMG_UPLOAD_DIR, 0755, true);
}
