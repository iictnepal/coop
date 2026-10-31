<?php
declare(strict_types=1);

/**
 * Aadhunik Jana Saving & Credit Co-operative Ltd.
 * Core Database Connector with PDO for PHP 8.4
 * Supports localhost / MariaDB / cPanel MySQL 8.0+
 */

class Database {
    private static ?PDO $instance = null;

    public static function getConnection(): PDO {
        if (self::$instance === null) {
            $host = getenv('DB_HOST') ?: '127.0.0.1';
            $port = getenv('DB_PORT') ?: '3306';
            $dbName = getenv('DB_NAME') ?: 'aadhunik_cooperative';
            $username = getenv('DB_USER') ?: 'coop_user';
            $password = getenv('DB_PASS') !== false ? getenv('DB_PASS') : 'CoopSecret2026!';

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
                // In production, log error instead of exposing database internals
                error_log("Database connection error: " . $e->getMessage());
                http_response_code(500);
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode([
                    'success' => false,
                    'error'   => 'Database connection failed. Please ensure MySQL is running.'
                ]);
                exit;
            }
        }

        return self::$instance;
    }
}
