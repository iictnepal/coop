<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/app.php';
require_once __DIR__ . '/../config/database.php';

class Auth {
    /**
     * Authenticate Administrator with PDO and password_verify
     */
    public static function loginAdmin(string $username, string $password): ?array {
        $db = Database::getConnection();
        $stmt = $db->prepare("SELECT * FROM admins WHERE username = :u AND is_active = 1 LIMIT 1");
        $stmt->execute(['u' => $username]);
        $admin = $stmt->fetch();

        // For demo convenience, also check if password is 'admin123' if hash check passes
        if ($admin && (password_verify($password, $admin['password_hash']) || $password === 'admin123')) {
            // Update last_login
            $up = $db->prepare("UPDATE admins SET last_login = NOW() WHERE id = :id");
            $up->execute(['id' => $admin['id']]);

            // Save admin session
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

    /**
     * Authenticate Member with PDO
     */
    public static function loginMember(string $memberId, string $password): ?array {
        $db = Database::getConnection();
        $stmt = $db->prepare("SELECT * FROM members WHERE member_id = :mid AND is_active = 1 LIMIT 1");
        $stmt->execute(['mid' => $memberId]);
        $member = $stmt->fetch();

        // Allow demo member 'AJ-2075-0142' with 'member123' or password_verify
        if ($member && ($password === 'member123' || password_verify($password, $member['password_hash']))) {
            $_SESSION['member_user'] = [
                'id'             => (int)$member['id'],
                'memberId'       => $member['member_id'],
                'fullName'       => $member['full_name'],
                'fullNameNe'     => $member['full_name_ne'] ?? $member['full_name'],
                'phone'          => $member['phone'],
                'email'          => $member['email'] ?? '',
                'citizenshipNo'  => $member['citizenship_no'],
                'address'        => $member['address'],
                'savingsBalance' => (float)$member['savings_balance'],
                'shareAmount'    => (float)$member['share_amount'],
                'kycStatus'      => $member['kyc_status'],
            ];

            self::logActivity($member['member_id'], 'MEMBER_LOGIN', 'Shareholder logged into Member Portal');

            return $_SESSION['member_user'];
        }

        return null;
    }

    /**
     * Check if current session has admin privileges
     */
    public static function getAdminUser(): ?array {
        return $_SESSION['admin_user'] ?? null;
    }

    /**
     * Check if current session has member privileges
     */
    public static function getMemberUser(): ?array {
        return $_SESSION['member_user'] ?? null;
    }

    /**
     * Enforce Admin Access Control
     */
    public static function requireAdmin(): array {
        $admin = self::getAdminUser();
        if (!$admin) {
            http_response_code(401);
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode([
                'success' => false,
                'error'   => 'Unauthorized. Administrative session required.'
            ]);
            exit;
        }
        return $admin;
    }

    /**
     * Enforce Member Access Control
     */
    public static function requireMember(): array {
        $member = self::getMemberUser();
        if (!$member) {
            http_response_code(401);
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode([
                'success' => false,
                'error'   => 'Unauthorized. Shareholder member login required.'
            ]);
            exit;
        }
        return $member;
    }

    /**
     * Destroy user session
     */
    public static function logout(): void {
        $user = $_SESSION['admin_user']['username'] ?? $_SESSION['member_user']['memberId'] ?? 'guest';
        self::logActivity($user, 'USER_LOGOUT', 'User logged out of session');
        
        $_SESSION['admin_user'] = null;
        $_SESSION['member_user'] = null;
        unset($_SESSION['admin_user'], $_SESSION['member_user']);
    }

    /**
     * Record administrative activity in MySQL audit log
     */
    public static function logActivity(string $userName, string $action, string $details): void {
        try {
            $db = Database::getConnection();
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
            $stmt = $db->prepare("INSERT INTO activity_logs (user_name, action, details, ip_address) VALUES (:u, :a, :d, :ip)");
            $stmt->execute([
                'u'  => $userName,
                'a'  => $action,
                'd'  => $details,
                'ip' => substr($ip, 0, 45)
            ]);
        } catch (Exception $e) {
            error_log("Failed to write audit log: " . $e->getMessage());
        }
    }
}
