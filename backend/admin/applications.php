<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/functions.php';

$admin = Auth::requireAdmin();
$db = Database::getConnection();
$message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update_status'])) {
    CSRF::enforce();
    $appId = (int)($_POST['app_id'] ?? 0);
    $status = $_POST['status'] ?? 'Under Review';
    $remarks = Validator::sanitize($_POST['admin_remarks'] ?? '');

    $stmt = $db->prepare("UPDATE loan_applications SET status = :s, admin_remarks = :r WHERE id = :id");
    $stmt->execute(['s' => $status, 'r' => $remarks, 'id' => $appId]);
    Auth::logActivity($admin['username'], 'LOAN_STATUS_UPDATE', "Application #{$appId} marked as {$status}");
    $message = "Application #{$appId} updated successfully.";
}

$apps = $db->query("SELECT * FROM loan_applications ORDER BY submitted_at DESC")->fetchAll();
$csrf = CSRF::getToken();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Loan Applications Review | Admin CMS</title>
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@800&family=Space+Mono:wght@400;700&family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background: #f8f7f4; color: #111; margin: 0; padding: 2rem; }
        .card { background: #fff; border: 2px solid #111; padding: 1.5rem; box-shadow: 6px 6px 0 #111; margin-bottom: 2rem; }
        .btn { padding: 0.5rem 1rem; background: #111; color: #fff; border: 2px solid #111; font-family: 'Space Mono', monospace; font-weight: 700; cursor: pointer; text-decoration: none; font-size: 0.75rem; }
        select, input { padding: 0.4rem; border: 2px solid #111; font-family: 'Space Mono', monospace; font-size: 0.75rem; }
        table { width: 100%; border-collapse: collapse; margin-top: 1rem; font-size: 0.85rem; }
        th, td { padding: 0.75rem; border: 1px solid #ddd; text-align: left; }
        th { background: #111; color: #fff; font-family: 'Space Mono', monospace; font-size: 0.75rem; }
    </style>
</head>
<body>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <div>
            <span style="font-family: 'Space Mono', monospace; font-size: 0.7rem; color: #666;">CREDIT COMMITTEE PORTAL</span>
            <h1 style="font-family: 'Syne', sans-serif; margin: 0;">Loan Applications Management</h1>
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
                    <th>App No</th>
                    <th>Applicant Details</th>
                    <th>Scheme & Amount</th>
                    <th>Collateral & Purpose</th>
                    <th>Status & Review Action</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($apps as $a): ?>
                    <tr>
                        <td style="font-family: 'Space Mono', monospace; font-weight: 700;"><?= e($a['application_no']) ?></td>
                        <td>
                            <strong><?= e($a['applicant_name']) ?></strong><br>
                            <small>📞 <?= e($a['applicant_phone']) ?> | 📍 <?= e($a['applicant_address']) ?></small>
                        </td>
                        <td>
                            <?= e($a['loan_scheme_name']) ?><br>
                            <strong style="color: #1769AA;">NPR <?= number_format((float)$a['requested_amount']) ?></strong> (<?= $a['requested_tenure_months'] ?> Mo)
                        </td>
                        <td>
                            <small><strong>Collateral:</strong> <?= e($a['collateral_type']) ?></small><br>
                            <small><strong>Purpose:</strong> <?= e($a['purpose']) ?></small>
                        </td>
                        <td>
                            <form method="POST" action="applications.php" style="display: flex; flex-direction: column; gap: 0.4rem;">
                                <input type="hidden" name="csrf_token" value="<?= e($csrf) ?>">
                                <input type="hidden" name="update_status" value="1">
                                <input type="hidden" name="app_id" value="<?= $a['id'] ?>">

                                <select name="status">
                                    <option value="Submitted" <?= $a['status'] === 'Submitted' ? 'selected' : '' ?>>Submitted</option>
                                    <option value="Under Review" <?= $a['status'] === 'Under Review' ? 'selected' : '' ?>>Under Review</option>
                                    <option value="Approved" <?= $a['status'] === 'Approved' ? 'selected' : '' ?>>Approved</option>
                                    <option value="Rejected" <?= $a['status'] === 'Rejected' ? 'selected' : '' ?>>Rejected</option>
                                </select>

                                <input type="text" name="admin_remarks" value="<?= e($a['admin_remarks'] ?? '') ?>" placeholder="Committee remarks...">
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
