<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/functions.php';

$admin = Auth::requireAdmin();
$db = Database::getConnection();
$message = '';
$error = '';

// Handle Create / Delete
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    CSRF::enforce();
    $action = $_POST['action'] ?? '';

    if ($action === 'create') {
        $nameEn = Validator::sanitize($_POST['name_en'] ?? '');
        $nameNe = Validator::sanitize($_POST['name_ne'] ?? '');
        $category = $_POST['category'] ?? 'Regular';
        $rate = Validator::sanitize($_POST['interest_rate'] ?? '');
        $min = Validator::sanitize($_POST['minimum_deposit'] ?? '');
        $descEn = Validator::sanitize($_POST['description_en'] ?? '');
        $descNe = Validator::sanitize($_POST['description_ne'] ?? '');

        if (!$nameEn || !$rate || !$min) {
            $error = 'Name, interest rate, and minimum deposit are required.';
        } else {
            $stmt = $db->prepare("
                INSERT INTO savings_schemes (name_en, name_ne, category, interest_rate, minimum_deposit, duration_en, duration_ne, description_en, description_ne, features_json, is_active)
                VALUES (:ne, :nn, :cat, :ir, :min, 'Flexible', 'लचिलो', :de, :dn, '[\"Daily balance interest\", \"Free passbook\"]', 1)
            ");
            $stmt->execute([
                'ne' => $nameEn,
                'nn' => $nameNe ?: $nameEn,
                'cat' => $category,
                'ir' => $rate,
                'min' => $min,
                'de' => $descEn,
                'dn' => $descNe ?: $descEn
            ]);
            Auth::logActivity($admin['username'], 'CREATE_SAVINGS', "Created savings scheme: {$nameEn}");
            $message = 'Savings scheme created successfully in MySQL database.';
        }
    }

    if ($action === 'delete') {
        $id = (int)($_POST['id'] ?? 0);
        if ($id > 0) {
            $stmt = $db->prepare("DELETE FROM savings_schemes WHERE id = :id");
            $stmt->execute(['id' => $id]);
            Auth::logActivity($admin['username'], 'DELETE_SAVINGS', "Deleted savings scheme ID: {$id}");
            $message = 'Savings scheme deleted.';
        }
    }
}

$schemes = $db->query("SELECT * FROM savings_schemes ORDER BY id DESC")->fetchAll();
$csrf = CSRF::getToken();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Savings Management | Admin CMS</title>
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@800&family=Space+Mono:wght@400;700&family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background: #f8f7f4; color: #111; margin: 0; padding: 2rem; }
        .card { background: #fff; border: 2px solid #111; padding: 1.5rem; box-shadow: 6px 6px 0 #111; margin-bottom: 2rem; }
        .btn { padding: 0.6rem 1.2rem; background: #111; color: #fff; border: 2px solid #111; font-family: 'Space Mono', monospace; font-weight: 700; cursor: pointer; text-decoration: none; }
        .btn-del { background: #dc2626; border-color: #dc2626; color: #fff; }
        input, select, textarea { width: 100%; padding: 0.6rem; border: 2px solid #111; margin-top: 0.3rem; font-family: 'Space Mono', monospace; }
        table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        th, td { padding: 0.75rem; border: 1px solid #ddd; text-align: left; }
        th { background: #111; color: #fff; font-family: 'Space Mono', monospace; font-size: 0.75rem; }
    </style>
</head>
<body>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <div>
            <span style="font-family: 'Space Mono', monospace; font-size: 0.7rem; color: #666;">ADMIN CMS • PDO MYSQL 8.4</span>
            <h1 style="font-family: 'Syne', sans-serif; margin: 0;">Savings Schemes Management</h1>
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
        <h3 style="font-family: 'Syne', sans-serif; margin-top: 0;">Add New Savings Scheme</h3>
        <form method="POST" action="savings.php" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
            <input type="hidden" name="csrf_token" value="<?= e($csrf) ?>">
            <input type="hidden" name="action" value="create">

            <div>
                <label style="font-size: 0.75rem; font-weight: 700;">Scheme Name (English) *</label>
                <input type="text" name="name_en" required placeholder="e.g. Mahila Utthan Savings">
            </div>
            <div>
                <label style="font-size: 0.75rem; font-weight: 700;">Scheme Name (Nepali)</label>
                <input type="text" name="name_ne" placeholder="e.g. महिला उत्थान बचत">
            </div>
            <div>
                <label style="font-size: 0.75rem; font-weight: 700;">Category</label>
                <select name="category">
                    <option value="Regular">Regular</option>
                    <option value="Periodic">Periodic</option>
                    <option value="Special">Special</option>
                    <option value="Child">Child</option>
                    <option value="Senior">Senior</option>
                </select>
            </div>
            <div>
                <label style="font-size: 0.75rem; font-weight: 700;">Interest Rate *</label>
                <input type="text" name="interest_rate" required placeholder="e.g. 8.50% p.a.">
            </div>
            <div>
                <label style="font-size: 0.75rem; font-weight: 700;">Minimum Deposit *</label>
                <input type="text" name="minimum_deposit" required placeholder="e.g. NPR 1,000">
            </div>
            <div style="grid-column: 1 / -1;">
                <label style="font-size: 0.75rem; font-weight: 700;">Description (Nepali)</label>
                <textarea name="description_ne" rows="2" placeholder="योजनाको संक्षिप्त विवरण..."></textarea>
            </div>
            <div style="grid-column: 1 / -1;">
                <button type="submit" class="btn">Save to MySQL Database</button>
            </div>
        </form>
    </div>

    <div class="card">
        <h3 style="font-family: 'Syne', sans-serif; margin-top: 0;">Existing Savings Schemes</h3>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Interest Rate</th>
                    <th>Min Deposit</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($schemes as $s): ?>
                    <tr>
                        <td style="font-family: 'Space Mono', monospace;"><?= $s['id'] ?></td>
                        <td><strong><?= e($s['name_en']) ?></strong><br><small><?= e($s['name_ne']) ?></small></td>
                        <td><?= e($s['category']) ?></td>
                        <td style="font-weight: 700; color: #16a34a;"><?= e($s['interest_rate']) ?></td>
                        <td><?= e($s['minimum_deposit']) ?></td>
                        <td>
                            <form method="POST" action="savings.php" onsubmit="return confirm('Delete this savings scheme?');" style="display:inline;">
                                <input type="hidden" name="csrf_token" value="<?= e($csrf) ?>">
                                <input type="hidden" name="action" value="delete">
                                <input type="hidden" name="id" value="<?= $s['id'] ?>">
                                <button type="submit" class="btn btn-del" style="padding: 0.3rem 0.6rem; font-size: 0.7rem;">Delete</button>
                            </form>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</body>
</html>
