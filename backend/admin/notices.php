<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/functions.php';

$admin = Auth::requireAdmin();
$db = Database::getConnection();
$message = '';
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    CSRF::enforce();
    $action = $_POST['action'] ?? '';

    if ($action === 'create') {
        $titleEn = Validator::sanitize($_POST['title_en'] ?? '');
        $titleNe = Validator::sanitize($_POST['title_ne'] ?? '');
        $category = $_POST['category'] ?? 'General';
        $contentEn = Validator::sanitize($_POST['content_en'] ?? '');
        $contentNe = Validator::sanitize($_POST['content_ne'] ?? '');
        $isPinned = !empty($_POST['is_pinned']) ? 1 : 0;

        if (!$titleEn || !$contentEn) {
            $error = 'Title and content are required.';
        } else {
            $pdfFileName = null;
            $pdfSize = null;

            if (isset($_FILES['pdf_file']) && $_FILES['pdf_file']['error'] !== UPLOAD_ERR_NO_FILE) {
                try {
                    $upload = SecureUploader::uploadDocument($_FILES['pdf_file']);
                    $pdfFileName = $upload['fileName'];
                    $pdfSize = $upload['fileSize'];
                } catch (Exception $e) {
                    $error = 'File upload failed: ' . $e->getMessage();
                }
            }

            if (!$error) {
                $stmt = $db->prepare("
                    INSERT INTO notices (title_en, title_ne, category, published_date, content_en, content_ne, is_pinned, pdf_file_name, pdf_size)
                    VALUES (:te, :tn, :cat, CURDATE(), :ce, :cn, :pin, :pdf, :size)
                ");
                $stmt->execute([
                    'te' => $titleEn,
                    'tn' => $titleNe ?: $titleEn,
                    'cat' => $category,
                    'ce' => $contentEn,
                    'cn' => $contentNe ?: $contentEn,
                    'pin' => $isPinned,
                    'pdf' => $pdfFileName,
                    'size' => $pdfSize
                ]);
                Auth::logActivity($admin['username'], 'PUBLISH_NOTICE', "Published notice: {$titleEn}");
                $message = 'Official notice published to database successfully.';
            }
        }
    }

    if ($action === 'delete') {
        $id = (int)($_POST['id'] ?? 0);
        if ($id > 0) {
            $stmt = $db->prepare("DELETE FROM notices WHERE id = :id");
            $stmt->execute(['id' => $id]);
            Auth::logActivity($admin['username'], 'DELETE_NOTICE', "Deleted notice #{$id}");
            $message = 'Notice deleted.';
        }
    }
}

$notices = $db->query("SELECT * FROM notices ORDER BY is_pinned DESC, published_date DESC")->fetchAll();
$csrf = CSRF::getToken();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Notice & Circular CMS | Admin</title>
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@800&family=Space+Mono:wght@400;700&family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background: #f8f7f4; color: #111; margin: 0; padding: 2rem; }
        .card { background: #fff; border: 2px solid #111; padding: 1.5rem; box-shadow: 6px 6px 0 #111; margin-bottom: 2rem; }
        .btn { padding: 0.6rem 1.2rem; background: #111; color: #fff; border: 2px solid #111; font-family: 'Space Mono', monospace; font-weight: 700; cursor: pointer; text-decoration: none; }
        input, select, textarea { width: 100%; padding: 0.6rem; border: 2px solid #111; margin-top: 0.3rem; font-family: 'Space Mono', monospace; }
        table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        th, td { padding: 0.75rem; border: 1px solid #ddd; text-align: left; }
        th { background: #111; color: #fff; font-family: 'Space Mono', monospace; font-size: 0.75rem; }
    </style>
</head>
<body>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <div>
            <span style="font-family: 'Space Mono', monospace; font-size: 0.7rem; color: #666;">NOTICE CMS • MYSQL 8.4</span>
            <h1 style="font-family: 'Syne', sans-serif; margin: 0;">Notice Board & Circulars</h1>
        </div>
        <a href="/admin/index.php" class="btn">Dashboard</a>
    </div>

    <?php if ($message): ?>
        <div style="background: #dcfce7; border: 2px solid #16a34a; padding: 0.75rem; margin-bottom: 1rem; font-weight: 600;">
            <?= e($message) ?>
        </div>
    <?php endif; ?>

    <?php if ($error): ?>
        <div style="background: #fee2e2; border: 2px solid #dc2626; padding: 0.75rem; margin-bottom: 1rem; font-weight: 600; color: #991b1b;">
            <?= e($error) ?>
        </div>
    <?php endif; ?>

    <div class="card">
        <h3 style="font-family: 'Syne', sans-serif; margin-top: 0;">Publish Notice with PDF Attachment</h3>
        <form method="POST" action="notices.php" enctype="multipart/form-data" style="display: flex; flex-direction: column; gap: 1rem;">
            <input type="hidden" name="csrf_token" value="<?= e($csrf) ?>">
            <input type="hidden" name="action" value="create">

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div>
                    <label style="font-size: 0.75rem; font-weight: 700;">Notice Title (English) *</label>
                    <input type="text" name="title_en" required placeholder="e.g. 16th AGM Notice">
                </div>
                <div>
                    <label style="font-size: 0.75rem; font-weight: 700;">Notice Title (Nepali)</label>
                    <input type="text" name="title_ne" placeholder="e.g. १६औं साधारण सभाको सूचना">
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div>
                    <label style="font-size: 0.75rem; font-weight: 700;">Category</label>
                    <select name="category">
                        <option value="General">General</option>
                        <option value="AGM">AGM</option>
                        <option value="Financial Report">Financial Report</option>
                        <option value="Tender">Tender</option>
                        <option value="Holiday">Holiday</option>
                    </select>
                </div>
                <div>
                    <label style="font-size: 0.75rem; font-weight: 700;">Attach Official PDF (Max 5MB)</label>
                    <input type="file" name="pdf_file" accept=".pdf" style="background:#fff;">
                </div>
            </div>

            <div>
                <label style="font-size: 0.75rem; font-weight: 700;">Full Notice Content (Nepali) *</label>
                <textarea name="content_ne" rows="3" required placeholder="विस्तृत सूचना विवरण..."></textarea>
            </div>

            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <input type="checkbox" name="is_pinned" id="pin" style="width: auto; margin: 0;">
                <label for="pin" style="font-size: 0.85rem; font-weight: 600;">Pin notice to homepage top banner</label>
            </div>

            <div>
                <button type="submit" class="btn">Publish Notice to MySQL</button>
            </div>
        </form>
    </div>

    <div class="card">
        <h3 style="font-family: 'Syne', sans-serif; margin-top: 0;">Published Notices List</h3>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Attachment</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($notices as $n): ?>
                    <tr>
                        <td style="font-family: 'Space Mono', monospace;"><?= $n['published_date'] ?></td>
                        <td>
                            <strong><?= e($n['title_ne']) ?></strong><br>
                            <small><?= e($n['title_en']) ?></small>
                        </td>
                        <td><?= e($n['category']) ?></td>
                        <td>
                            <?php if ($n['pdf_file_name']): ?>
                                <span style="font-family: 'Space Mono', monospace; font-size: 0.75rem; color: #1769AA;">
                                    📎 <?= e($n['pdf_file_name']) ?> (<?= e($n['pdf_size']) ?>)
                                </span>
                            <?php else: ?>
                                <span style="opacity: 0.5;">None</span>
                            <?php endif; ?>
                        </td>
                        <td>
                            <form method="POST" action="notices.php" onsubmit="return confirm('Delete this notice?');">
                                <input type="hidden" name="csrf_token" value="<?= e($csrf) ?>">
                                <input type="hidden" name="action" value="delete">
                                <input type="hidden" name="id" value="<?= $n['id'] ?>">
                                <button type="submit" class="btn" style="background: #dc2626; border-color: #dc2626; padding: 0.3rem 0.6rem; font-size: 0.7rem;">Delete</button>
                            </form>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</body>
</html>
