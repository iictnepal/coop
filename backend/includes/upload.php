<?php
declare(strict_types=1);

require_once __DIR__ . '/../config/app.php';

class SecureUploader {
    private const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

    private const ALLOWED_DOC_MIMES = [
        'application/pdf' => 'pdf',
        'application/msword' => 'doc',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' => 'docx',
        'application/vnd.ms-excel' => 'xls',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' => 'xlsx',
    ];

    private const ALLOWED_IMG_MIMES = [
        'image/jpeg' => 'jpg',
        'image/png'  => 'png',
        'image/webp' => 'webp',
    ];

    /**
     * Upload document (PDF, DOC, DOCX, XLS, XLSX)
     */
    public static function uploadDocument(array $file): array {
        return self::processUpload($file, DOC_UPLOAD_DIR, self::ALLOWED_DOC_MIMES, 'doc');
    }

    /**
     * Upload image (JPEG, PNG, WEBP)
     */
    public static function uploadImage(array $file): array {
        return self::processUpload($file, IMG_UPLOAD_DIR, self::ALLOWED_IMG_MIMES, 'img');
    }

    private static function processUpload(array $file, string $targetDir, array $allowedMimes, string $prefix): array {
        if (!isset($file['error']) || is_array($file['error'])) {
            throw new RuntimeException('Invalid file upload parameters.');
        }

        switch ($file['error']) {
            case UPLOAD_ERR_OK:
                break;
            case UPLOAD_ERR_NO_FILE:
                throw new RuntimeException('No file sent.');
            case UPLOAD_ERR_INI_SIZE:
            case UPLOAD_ERR_FORM_SIZE:
                throw new RuntimeException('Exceeded filesize limit (Max 5MB).');
            default:
                throw new RuntimeException('Unknown upload error.');
        }

        if ($file['size'] > self::MAX_FILE_SIZE) {
            throw new RuntimeException('Exceeded filesize limit (Max 5MB).');
        }

        // Verify MIME type using Fileinfo
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $mime = $finfo->file($file['tmp_name']);

        if (!isset($allowedMimes[$mime])) {
            throw new RuntimeException('Invalid file format. Uploaded MIME type not allowed: ' . htmlspecialchars($mime));
        }

        $extension = $allowedMimes[$mime];
        
        // Double check client file extension
        $clientExt = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        if ($clientExt !== $extension && !($clientExt === 'jpeg' && $extension === 'jpg')) {
            // Mismatch between extension and detected mime
            $extension = $clientExt; // Fallback to checked extension if in allowed list
            if (!in_array($extension, array_values($allowedMimes), true)) {
                throw new RuntimeException('File extension does not match file signature.');
            }
        }

        // Generate cryptographically random secure filename (prevents directory traversal & overwriting)
        $randomName = sprintf('%s_%s_%s.%s', $prefix, date('Ymd_His'), bin2hex(random_bytes(6)), $extension);
        $destination = $targetDir . '/' . $randomName;

        if (!move_uploaded_file($file['tmp_name'], $destination)) {
            throw new RuntimeException('Failed to move uploaded file.');
        }

        // Format file size
        $bytes = $file['size'];
        $sizeFormatted = $bytes < 1048576 
            ? round($bytes / 1024, 1) . ' KB' 
            : round($bytes / 1048576, 2) . ' MB';

        $subDir = ($prefix === 'doc') ? 'documents' : 'images';
        $webPath = '/uploads/' . $subDir . '/' . $randomName;

        return [
            'fileName'     => $randomName,
            'originalName' => basename($file['name']),
            'filePath'     => $webPath,
            'fileSize'     => $sizeFormatted,
            'fileType'     => strtoupper($extension),
            'mimeType'     => $mime
        ];
    }
}
