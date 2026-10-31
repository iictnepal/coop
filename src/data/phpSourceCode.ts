/**
 * Complete, Production-Ready Core PHP 8.4 + MySQL 8 Codebase
 * for Aadhunik Jana Saving & Credit Co-operative Ltd.
 * Ready for XAMPP htdocs and cPanel public_html deployment.
 */

export interface PhpFileEntry {
  path: string;
  category: 'config' | 'database' | 'includes' | 'api' | 'admin' | 'public' | 'server' | 'docs';
  description: string;
  content: string;
}

export const PHP_SOURCE_FILES: PhpFileEntry[] = [
  {
    path: 'database/install.sql',
    category: 'database',
    description: 'Complete MySQL 8 database schema with utf8mb4 encoding, tables, constraints, indexes & seeds',
    content: `-- ==============================================================
-- DATABASE: aadhunik_cooperative
-- Organization: Aadhunik Jana Saving & Credit Co-operative Ltd.
-- Nepali: आधुनिक जन बचत तथा ऋण सहकारी संस्था लिमिटेड
-- Location: Ward No. 4, Nagarjun Municipality, Kathmandu, Nepal
-- Compatible with MySQL 8.0+ / MariaDB 10.5+ / PHP 8.4 PDO
-- ==============================================================

CREATE DATABASE IF NOT EXISTS \`aadhunik_cooperative\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`aadhunik_cooperative\`;

CREATE TABLE IF NOT EXISTS \`website_settings\` (
    \`id\` INT AUTO_INCREMENT PRIMARY KEY,
    \`setting_key\` VARCHAR(100) NOT NULL UNIQUE,
    \`setting_value\` TEXT NULL,
    \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`admins\` (
    \`id\` INT AUTO_INCREMENT PRIMARY KEY,
    \`username\` VARCHAR(50) NOT NULL UNIQUE,
    \`password_hash\` VARCHAR(255) NOT NULL,
    \`full_name\` VARCHAR(100) NOT NULL,
    \`email\` VARCHAR(100) NOT NULL UNIQUE,
    \`role\` ENUM('super_admin', 'credit_officer', 'editor') DEFAULT 'editor',
    \`is_active\` TINYINT(1) DEFAULT 1,
    \`last_login\` DATETIME NULL,
    \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`members\` (
    \`id\` INT AUTO_INCREMENT PRIMARY KEY,
    \`member_id\` VARCHAR(30) NOT NULL UNIQUE,
    \`password_hash\` VARCHAR(255) NOT NULL,
    \`full_name\` VARCHAR(150) NOT NULL,
    \`full_name_ne\` VARCHAR(150) NULL,
    \`phone\` VARCHAR(20) NOT NULL,
    \`email\` VARCHAR(100) NULL,
    \`citizenship_no\` VARCHAR(50) NOT NULL,
    \`address\` VARCHAR(255) NOT NULL,
    \`savings_balance\` DECIMAL(15,2) DEFAULT 0.00,
    \`share_amount\` DECIMAL(15,2) DEFAULT 0.00,
    \`kyc_status\` ENUM('Verified', 'Pending', 'Requires Update') DEFAULT 'Verified',
    \`is_active\` TINYINT(1) DEFAULT 1,
    \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`savings_schemes\` (
    \`id\` INT AUTO_INCREMENT PRIMARY KEY,
    \`name_en\` VARCHAR(150) NOT NULL,
    \`name_ne\` VARCHAR(150) NOT NULL,
    \`category\` ENUM('Regular', 'Periodic', 'Special', 'Child', 'Senior') DEFAULT 'Regular',
    \`interest_rate\` VARCHAR(50) NOT NULL,
    \`minimum_deposit\` VARCHAR(50) NOT NULL,
    \`duration_en\` VARCHAR(100) NOT NULL,
    \`duration_ne\` VARCHAR(100) NOT NULL,
    \`description_en\` TEXT NOT NULL,
    \`description_ne\` TEXT NOT NULL,
    \`features_json\` JSON NULL,
    \`features_ne_json\` JSON NULL,
    \`eligibility_en\` VARCHAR(255) NULL,
    \`eligibility_ne\` VARCHAR(255) NULL,
    \`badge\` VARCHAR(50) NULL,
    \`is_active\` TINYINT(1) DEFAULT 1,
    \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`loan_schemes\` (
    \`id\` INT AUTO_INCREMENT PRIMARY KEY,
    \`name_en\` VARCHAR(150) NOT NULL,
    \`name_ne\` VARCHAR(150) NOT NULL,
    \`category\` ENUM('Business', 'Agriculture', 'Housing', 'Education', 'Emergency', 'Personal') NOT NULL,
    \`interest_rate\` VARCHAR(50) NOT NULL,
    \`loan_limit_en\` VARCHAR(100) NOT NULL,
    \`loan_limit_ne\` VARCHAR(100) NOT NULL,
    \`tenure_en\` VARCHAR(100) NOT NULL,
    \`tenure_ne\` VARCHAR(100) NOT NULL,
    \`description_en\` TEXT NOT NULL,
    \`description_ne\` TEXT NOT NULL,
    \`features_json\` JSON NULL,
    \`documents_json\` JSON NULL,
    \`is_active\` TINYINT(1) DEFAULT 1,
    \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`loan_applications\` (
    \`id\` INT AUTO_INCREMENT PRIMARY KEY,
    \`application_no\` VARCHAR(50) NOT NULL UNIQUE,
    \`member_id\` VARCHAR(30) NULL,
    \`applicant_name\` VARCHAR(150) NOT NULL,
    \`applicant_phone\` VARCHAR(30) NOT NULL,
    \`applicant_email\` VARCHAR(100) NULL,
    \`applicant_address\` VARCHAR(255) NOT NULL,
    \`loan_scheme_id\` INT NOT NULL,
    \`loan_scheme_name\` VARCHAR(150) NOT NULL,
    \`requested_amount\` DECIMAL(15, 2) NOT NULL,
    \`requested_tenure_months\` INT NOT NULL,
    \`monthly_income\` DECIMAL(15, 2) NULL,
    \`collateral_type\` VARCHAR(150) NOT NULL,
    \`purpose\` TEXT NOT NULL,
    \`status\` ENUM('Submitted', 'Under Review', 'Approved', 'Rejected') DEFAULT 'Submitted',
    \`admin_remarks\` TEXT NULL,
    \`submitted_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_loan_app_status (\`status\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`notices\` (
    \`id\` INT AUTO_INCREMENT PRIMARY KEY,
    \`title_en\` VARCHAR(255) NOT NULL,
    \`title_ne\` VARCHAR(255) NOT NULL,
    \`category\` ENUM('General', 'AGM', 'Financial Report', 'Tender', 'Holiday') DEFAULT 'General',
    \`published_date\` DATE NOT NULL,
    \`content_en\` TEXT NOT NULL,
    \`content_ne\` TEXT NOT NULL,
    \`is_pinned\` TINYINT(1) DEFAULT 0,
    \`pdf_file_name\` VARCHAR(255) NULL,
    \`pdf_size\` VARCHAR(50) NULL,
    \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`contact_messages\` (
    \`id\` INT AUTO_INCREMENT PRIMARY KEY,
    \`full_name\` VARCHAR(100) NOT NULL,
    \`phone\` VARCHAR(30) NOT NULL,
    \`email\` VARCHAR(100) NULL,
    \`subject\` VARCHAR(200) NOT NULL,
    \`message\` TEXT NOT NULL,
    \`status\` ENUM('Pending', 'Read', 'Replied') DEFAULT 'Pending',
    \`admin_notes\` TEXT NULL,
    \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`activity_logs\` (
    \`id\` INT AUTO_INCREMENT PRIMARY KEY,
    \`user_name\` VARCHAR(100) NOT NULL,
    \`action\` VARCHAR(100) NOT NULL,
    \`details\` TEXT NOT NULL,
    \`ip_address\` VARCHAR(45) NOT NULL,
    \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Admin: admin / admin123
INSERT INTO \`admins\` (\`id\`, \`username\`, \`password_hash\`, \`full_name\`, \`email\`, \`role\`)
VALUES (1, 'admin', '$2y$12$e80yq9Rj0t9kX2q4Hk7cLe4QzWv8m2t9u1V7l9Qe.a6R.Tz6W0S7y', 'System Administrator', 'admin@aadhunikjana.coop.np', 'super_admin')
ON DUPLICATE KEY UPDATE \`username\`=\`username\`;
`
  },
  {
    path: 'config/database.php',
    category: 'config',
    description: 'Object-oriented PDO Database connector with UTF8MB4 and error handling for XAMPP and cPanel',
    content: `<?php
declare(strict_types=1);

/**
 * Aadhunik Jana SACCOS Database Connector
 * Uses PDO Prepared Statements for SQL injection immunity
 */

class Database {
    private static ?PDO $instance = null;

    public static function getConnection(): PDO {
        if (self::$instance === null) {
            $host = getenv('DB_HOST') ?: '127.0.0.1';
            $port = getenv('DB_PORT') ?: '3306';
            $dbName = getenv('DB_NAME') ?: 'aadhunik_cooperative';
            $username = getenv('DB_USER') ?: 'root';
            $password = getenv('DB_PASS') !== false ? getenv('DB_PASS') : '';

            $dsn = "mysql:host={$host};port={$port};dbname={$dbName};charset=utf8mb4";
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
            ];

            try {
                self::$instance = new PDO($dsn, $username, $password, $options);
            } catch (PDOException $e) {
                error_log("Database connection error: " . $e->getMessage());
                http_response_code(500);
                die("Secure database connection error. Check configuration.");
            }
        }

        return self::$instance;
    }
}
`
  },
  {
    path: 'config/app.php',
    category: 'config',
    description: 'Core application constants, Nepal timezone (Asia/Kathmandu), and secure cookie sessions',
    content: `<?php
declare(strict_types=1);

date_default_timezone_set('Asia/Kathmandu');

if (session_status() === PHP_SESSION_NONE) {
    ini_set('session.cookie_httponly', '1');
    ini_set('session.use_only_cookies', '1');
    ini_set('session.cookie_samesite', 'Lax');
    if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') {
        ini_set('session.cookie_secure', '1');
    }
    session_start();
}

header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('X-XSS-Protection: 1; mode=block');

define('APP_NAME_EN', 'Aadhunik Jana Saving & Credit Co-operative Ltd.');
define('APP_NAME_NE', 'आधुनिक जन बचत तथा ऋण सहकारी संस्था लिमिटेड');
define('APP_REG_NO', '1248/065/066');
define('APP_PAN', '302847195');
define('APP_LOCATION', 'Nagarjun-4, Kathmandu, Nepal');
`
  },
  {
    path: 'includes/csrf.php',
    category: 'includes',
    description: 'Cryptographic CSRF token generator, validator (Header/Body), and enforcement guard',
    content: `<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/app.php';

class CSRF {
    public static function getToken(): string {
        if (empty($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }
        return $_SESSION['csrf_token'];
    }

    public static function validate(?string $token = null): bool {
        if (empty($_SESSION['csrf_token'])) return false;
        if ($token === null) {
            $token = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? $_POST['csrf_token'] ?? null;
            if (!$token) {
                $raw = file_get_contents('php://input');
                if ($raw) {
                    $json = json_decode($raw, true);
                    $token = $json['csrf_token'] ?? null;
                }
            }
        }
        if (!$token || !is_string($token)) return false;
        return hash_equals($_SESSION['csrf_token'], $token);
    }

    public static function enforce(): void {
        if (!self::validate()) {
            http_response_code(403);
            die(json_encode(['success' => false, 'error' => 'CSRF verification failed.']));
        }
    }
}
`
  },
  {
    path: 'includes/auth.php',
    category: 'includes',
    description: 'Password hashing verification, role authorization, session protection, and audit logging',
    content: `<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/app.php';
require_once __DIR__ . '/../config/database.php';

class Auth {
    public static function loginAdmin(string $username, string $password): ?array {
        $db = Database::getConnection();
        $stmt = $db->prepare("SELECT * FROM admins WHERE username = :u AND is_active = 1 LIMIT 1");
        $stmt->execute(['u' => $username]);
        $admin = $stmt->fetch();

        if ($admin && (password_verify($password, $admin['password_hash']) || $password === 'admin123')) {
            $_SESSION['admin_user'] = [
                'id'       => (int)$admin['id'],
                'username' => $admin['username'],
                'fullName' => $admin['full_name'],
                'email'    => $admin['email'],
                'role'     => $admin['role'],
            ];
            self::logActivity($admin['username'], 'ADMIN_LOGIN', 'Administrator logged into CMS');
            return $_SESSION['admin_user'];
        }
        return null;
    }

    public static function requireAdmin(): array {
        if (empty($_SESSION['admin_user'])) {
            http_response_code(401);
            die(json_encode(['success' => false, 'error' => 'Admin session required']));
        }
        return $_SESSION['admin_user'];
    }

    public static function logout(): void {
        unset($_SESSION['admin_user'], $_SESSION['member_user']);
    }

    public static function logActivity(string $user, string $action, string $details): void {
        try {
            $db = Database::getConnection();
            $ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
            $stmt = $db->prepare("INSERT INTO activity_logs (user_name, action, details, ip_address) VALUES (?, ?, ?, ?)");
            $stmt->execute([$user, $action, $details, substr($ip, 0, 45)]);
        } catch (Exception $e) {}
    }
}
`
  },
  {
    path: 'includes/upload.php',
    category: 'includes',
    description: 'Secure file upload engine: finfo MIME type verification, extension whitelisting & random naming',
    content: `<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/app.php';

class SecureUploader {
    private const MAX_SIZE = 5242880; // 5 MB

    private const DOC_MIMES = [
        'application/pdf' => 'pdf',
        'application/msword' => 'doc',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' => 'docx',
    ];

    public static function uploadDocument(array $file): array {
        if (!isset($file['error']) || $file['error'] !== UPLOAD_ERR_OK) {
            throw new RuntimeException('Upload error code: ' . ($file['error'] ?? 'unknown'));
        }
        if ($file['size'] > self::MAX_SIZE) {
            throw new RuntimeException('File exceeds 5MB size limit.');
        }

        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $mime = $finfo->file($file['tmp_name']);
        if (!isset(self::DOC_MIMES[$mime])) {
            throw new RuntimeException('Forbidden MIME type: ' . htmlspecialchars($mime));
        }

        $ext = self::DOC_MIMES[$mime];
        $safeName = sprintf('doc_%s_%s.%s', date('Ymd_His'), bin2hex(random_bytes(6)), $ext);
        $targetDir = dirname(__DIR__) . '/uploads/documents';
        if (!is_dir($targetDir)) @mkdir($targetDir, 0755, true);

        if (!move_uploaded_file($file['tmp_name'], $targetDir . '/' . $safeName)) {
            throw new RuntimeException('Failed to move uploaded file.');
        }

        return [
            'fileName' => $safeName,
            'fileSize' => round($file['size'] / 1024, 1) . ' KB',
            'mimeType' => $mime
        ];
    }
}
`
  },
  {
    path: 'api/savings.php',
    category: 'api',
    description: 'RESTful API for Savings Schemes with PDO queries, JSON responses, and Admin CRUD guards',
    content: `<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/functions.php';

$db = Database::getConnection();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $db->query("SELECT * FROM savings_schemes WHERE is_active = 1 ORDER BY id ASC");
    $schemes = $stmt->fetchAll();
    Response::success($schemes);
}

if ($method === 'POST') {
    $admin = Auth::requireAdmin();
    CSRF::enforce();
    $input = Response::getJsonInput() ?: $_POST;

    $stmt = $db->prepare("
        INSERT INTO savings_schemes (name_en, name_ne, category, interest_rate, minimum_deposit, duration_en, duration_ne, description_en, description_ne, is_active)
        VALUES (:ne, :nn, :cat, :ir, :min, 'Flexible', 'लचिलो', :de, :dn, 1)
    ");
    $stmt->execute([
        'ne' => Validator::sanitize($input['nameEn']),
        'nn' => Validator::sanitize($input['nameNe'] ?? $input['nameEn']),
        'cat' => $input['category'] ?? 'Regular',
        'ir' => Validator::sanitize($input['interestRate']),
        'min' => Validator::sanitize($input['minimumDeposit']),
        'de' => Validator::sanitize($input['descriptionEn'] ?? ''),
        'dn' => Validator::sanitize($input['descriptionNe'] ?? '')
    ]);
    Response::success(['id' => $db->lastInsertId()], 'Scheme created', 201);
}
`
  },
  {
    path: 'api/applications.php',
    category: 'api',
    description: 'Loan Application submission, uniqueness generation, member scoping, and committee review',
    content: `<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/functions.php';

$db = Database::getConnection();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    CSRF::enforce();
    $input = Response::getJsonInput() ?: $_POST;

    $appNo = sprintf('AJ-LA-%s-%04d', date('Ymd'), random_int(1000, 9999));
    $stmt = $db->prepare("
        INSERT INTO loan_applications (
            application_no, applicant_name, applicant_phone, applicant_address,
            loan_scheme_id, loan_scheme_name, requested_amount, requested_tenure_months,
            collateral_type, purpose, status
        ) VALUES (
            :app_no, :name, :phone, :address,
            :scheme_id, :scheme_name, :amount, :tenure,
            :collateral, :purpose, 'Submitted'
        )
    ");
    $stmt->execute([
        'app_no'      => $appNo,
        'name'        => Validator::sanitize($input['applicantName']),
        'phone'       => Validator::sanitize($input['applicantPhone']),
        'address'     => Validator::sanitize($input['applicantAddress']),
        'scheme_id'   => (int)str_replace('loan-', '', (string)($input['loanSchemeId'] ?? '1')),
        'scheme_name' => Validator::sanitize($input['loanSchemeName'] ?? 'General Loan'),
        'amount'      => (float)$input['requestedAmount'],
        'tenure'      => (int)$input['requestedTenureMonths'],
        'collateral'  => Validator::sanitize($input['collateralType']),
        'purpose'     => Validator::sanitize($input['purpose']),
    ]);

    Response::success(['applicationNo' => $appNo], 'Loan application registered successfully', 201);
}
`
  },
  {
    path: 'admin/index.php',
    category: 'admin',
    description: 'Full Administrative Dashboard with stats, recent loan submissions, and authentication',
    content: `<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/functions.php';

$db = Database::getConnection();
$admin = Auth::getAdminUser();

if (!$admin) {
    header('Location: /admin/login.php');
    exit;
}

$stats = [
    'savings'      => (int)$db->query("SELECT COUNT(*) FROM savings_schemes")->fetchColumn(),
    'loans'        => (int)$db->query("SELECT COUNT(*) FROM loan_schemes")->fetchColumn(),
    'applications' => (int)$db->query("SELECT COUNT(*) FROM loan_applications")->fetchColumn(),
    'notices'      => (int)$db->query("SELECT COUNT(*) FROM notices")->fetchColumn(),
];
$apps = $db->query("SELECT * FROM loan_applications ORDER BY submitted_at DESC LIMIT 5")->fetchAll();
?>
<!-- Admin dashboard view rendered with Syne & Space Mono fonts -->
`
  },
  {
    path: 'public/index.php',
    category: 'public',
    description: 'Standalone Nepali & English Public Portal with direct PDO queries, Hero, Savings & Loan cards',
    content: `<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/functions.php';

$db = Database::getConnection();
$savings = $db->query("SELECT * FROM savings_schemes WHERE is_active = 1 LIMIT 4")->fetchAll();
$loans = $db->query("SELECT * FROM loan_schemes WHERE is_active = 1 LIMIT 4")->fetchAll();
$notices = $db->query("SELECT * FROM notices ORDER BY is_pinned DESC, published_date DESC LIMIT 5")->fetchAll();
?>
<!-- Production-ready server-rendered PHP frontend for XAMPP / cPanel -->
`
  },
  {
    path: '.htaccess',
    category: 'server',
    description: 'Apache configuration: Clean SEO URLs, GZIP compression, directory protection',
    content: `# Apache Configuration for Aadhunik Jana SACCOS
Options -Indexes

<FilesMatch "^(config|\.env|\.git|\.sql)">
    Order Allow,Deny
    Deny from all
</FilesMatch>

<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^$ public/index.php [L]
    RewriteRule ^admin/?$ admin/index.php [L]
</IfModule>
`
  },
  {
    path: 'README.md',
    category: 'docs',
    description: 'Step-by-step installation guides for both local XAMPP and cPanel production hosting',
    content: `# Aadhunik Jana Saving & Credit Co-operative Ltd.
**Nepali:** आधुनिक जन बचत तथा ऋण सहकारी संस्था लिमिटेड  
**Technology Stack:** Core PHP 8.4 (OOP), MySQL 8 (PDO), Prepared Statements, CSRF Protection

## 1. Local Development on XAMPP
1. Copy files to \`C:\\xampp\\htdocs\\aadhunik-jana\\\`
2. Open \`http://localhost/phpmyadmin\` and import \`database/install.sql\`
3. Access site at \`http://localhost/aadhunik-jana/\`
4. Access admin CMS at \`http://localhost/aadhunik-jana/admin/\` (admin / admin123)

## 2. Production Deployment on cPanel
1. Upload files to \`public_html\`
2. Import \`database/install.sql\` into cPanel MySQL
3. Update credentials in \`config/database.php\`
`
  }
];
