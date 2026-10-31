<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/functions.php';

$admin = Auth::requireAdmin();
$db = Database::getConnection();
$message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    CSRF::enforce();
    $id = (int)($_POST['id'] ?? 0);
    $action = $_POST['action'] ?? '';

    if ($action === 'status' && $id > 0) {
        $status = $_POST['status'] ?? 'Read';
        $notes = Validator::sanitize($_POST['admin_notes'] ?? '');
        $stmt = $db->prepare("UPDATE contact_messages SET status = :s, admin_notes = :n WHERE id = :id");
        $stmt->execute(['s' => $status, 'n' => $notes, 'id' => $id]);
        Auth::logActivity($admin['username'], 'INQUIRY_STATUS_UPDATE', "Message #{$id} marked as {$status}");
        $message = "Inquiry #{$id} updated.";
    }

    if ($action === 'delete' && $id > 0) {
        $stmt = $db->prepare("DELETE FROM contact_messages WHERE id = :id");
        $stmt->execute(['id' => $id]);
        Auth::logActivity($admin['username'], 'DELETE_INQUIRY', "Deleted message #{$id}");
        $message = "Inquiry deleted.";
    }
}

$inquiries = $db->query("SELECT * FROM contact_messages ORDER BY created_at DESC")->fetchAll();
$csrf = CSRF::getToken();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Contact Inquiries | Admin CMS</title>
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@800&family=Space+Mono:wght@400;700&family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background: #f8f7f4; color: #111; margin: 0; padding: 2rem; }
        .card { background: #fff; border: 2px solid #111; padding: 1.5rem; box-shadow: 6px 6px 0 #111; margin-bottom: 2rem; }
        .btn { padding: 0.5rem 1rem; background: #111; color: #fff; border: 2px solid #111; font-family: 'Space Mono', monospace; font-weight: 700; cursor: pointer; text-decoration: none; font-size: 0.75rem; }
        table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        th, td { padding: 0.75rem; border: 1px solid #ddd; text-align: left; }
        th { background: #111; color: #fff; font-family: 'Space Mono', monospace; font-size: 0.75rem; }
        input, select { padding: 0.4rem; border: 2px solid #111; font-family: 'Space Mono', monospace; font-size: 0.75rem; }
    </style>
</head>
<body>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <div>
            <span style="font-family: 'Space Mono', monospace; font-size: 0.7rem; color: #666;">COMMUNICATION MODULE • MYSQL 8.4</span>
            <h1 style="font-family: 'Syne', sans-serif; margin: 0;">Member Inquiries & Messages</h1>
        </div>
        <a href="/admin/index.php" class="btn">Dashboard</a>
    </div>

    <?php if ($message): ?>
        <div style="background: #dcfce7; border: 2px solid #16a34a; padding: 0.75rem; margin-bottom: 1rem; font-weight: 600;">
            <?= e($message) ?>
        </div>
    <?php endif; ?>

    <div class="card">
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Sender Info</th>
                    <th>Subject & Message</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($inquiries as $m): ?>
                    <tr>
                        <td style="font-family: 'Space Mono', monospace; font-size: 0.75rem;"><?= $m['created_at'] ?></td>
                        <td>
                            <strong><?= e($m['full_name']) ?></strong><br>
                            <small>📞 <?= e($m['phone']) ?></small><br>
                            <small>✉️ <?= e($m['email'] ?? 'N/A') ?></small>
                        </td>
                        <td>
                            <strong style="color: #1769AA;"><?= e($m['subject']) ?></strong>
                            <p style="margin: 0.5rem 0; font-size: 0.85rem; background: #fdfcf9; padding: 0.5rem; border: 1px solid #eee;">
                                <?= nl2br(e($m['message'])) ?>
                            </p>
                        </td>
                        <td>
                            <form method="POST" action="messages.php" style="display: flex; flex-direction: column; gap: 0.4rem;">
                                <input type="hidden" name="csrf_token" value="<?= e($csrf) ?>">
                                <input type="hidden" name="action" value="status">
                                <input type="hidden" name="id" value="<?= $m['id'] ?>">

                                <select name="status">
                                    <option value="Pending" <?= $m['status'] === 'Pending' ? 'selected' : '' ?>>Pending</option>
                                    <option value="Read" <?= $m['status'] === 'Read' ? 'selected' : '' ?>>Read</option>
                                    <option value="Replied" <?= $m['status'] === 'Replied' ? 'selected' : '' ?>>Replied</option>
                                </select>
                                <input type="text" name="admin_notes" value="<?= e($m['admin_notes'] ?? '') ?>" placeholder="Follow-up notes...">
                                <button type="submit" class="btn">Update Status</button>
                            </form>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</body>
</html>
