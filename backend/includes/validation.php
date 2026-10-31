<?php
declare(strict_types=1);

class Validator {
    /**
     * Sanitize string and escape HTML entities to prevent XSS
     */
    public static function sanitize(?string $value): string {
        if ($value === null) return '';
        return trim(htmlspecialchars($value, ENT_QUOTES, 'UTF-8'));
    }

    /**
     * Check required fields in payload array
     */
    public static function requireFields(array $data, array $requiredFields): array {
        $errors = [];
        foreach ($requiredFields as $field) {
            if (!isset($data[$field]) || trim((string)$data[$field]) === '') {
                $errors[$field] = "Field '{$field}' is required.";
            }
        }
        return $errors;
    }

    /**
     * Validate email address
     */
    public static function isEmail(string $email): bool {
        return (bool)filter_var($email, FILTER_VALIDATE_EMAIL);
    }

    /**
     * Validate phone number (Nepali format: 10 digits or with +977)
     */
    public static function isPhone(string $phone): bool {
        $clean = preg_replace('/[^0-9+]/', '', $phone);
        return strlen($clean) >= 7 && strlen($clean) <= 15;
    }

    /**
     * Validate positive number
     */
    public static function isPositiveNumber(mixed $val): bool {
        return is_numeric($val) && (float)$val > 0;
    }
}
