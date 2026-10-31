<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/app.php';

class CSRF {
    /**
     * Get or generate cryptographic CSRF token
     */
    public static function getToken(): string {
        if (empty($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }
        return $_SESSION['csrf_token'];
    }

    /**
     * Validate CSRF token against active session
     */
    public static function validate(?string $token = null): bool {
        if (empty($_SESSION['csrf_token'])) {
            return false;
        }

        if ($token === null) {
            // Check HTTP Header X-CSRF-Token or POST body
            $token = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? $_POST['csrf_token'] ?? null;

            // If JSON body was provided, check parsed JSON
            if (!$token) {
                $raw = file_get_contents('php://input');
                if ($raw) {
                    $json = json_decode($raw, true);
                    $token = $json['csrf_token'] ?? null;
                }
            }
        }

        if (!$token || !is_string($token)) {
            return false;
        }

        return hash_equals($_SESSION['csrf_token'], $token);
    }

    /**
     * Enforce CSRF protection or respond with HTTP 403 Forbidden
     */
    public static function enforce(): void {
        if (!self::validate()) {
            http_response_code(403);
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode([
                'success' => false,
                'error'   => 'CSRF token validation failed. Request untrusted.'
            ]);
            exit;
        }
    }
}
