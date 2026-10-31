<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/functions.php';

$db = Database::getConnection();
$error = '';
$success = '';

// Handle Admin Login submission in pure PHP
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login_action'])) {
    if (!CSRF::validate($_POST['csrf_token'] ?? '')) {
        $error = 'Security CSRF validation failed.';
    } else {
        $user = Auth::loginAdmin(trim($_POST['username'] ?? ''), trim($_POST['password'] ?? ''));
        if ($user) {
            header('Location: /admin/index.php');
            exit;
        } else {
            $error = 'Invalid administrative credentials.';
        }
    }
}

// Handle Logout
if (isset($_GET['action']) && $_GET['action'] === 'logout') {
    Auth::logout();
    header('Location: /admin/index.php');
    exit;
}

$admin = Auth::getAdminUser();

// If logged in, fetch quick statistics
$stats = [
    'savings'      => 0,
    'loans'        => 0,
    'applications' => 0,
    'notices'      => 0,
    'messages'     => 0,
];

if ($admin) {
    $stats['savings'] = (int)$db->query("SELECT COUNT(*) FROM savings_schemes")->fetchColumn();
    $stats['loans'] = (int)$db->query("SELECT COUNT(*) FROM loan_schemes")->fetchColumn();
    $stats['applications'] = (int)$db->query("SELECT COUNT(*) FROM loan_applications")->fetchColumn();
    $stats['notices'] = (int)$db->query("SELECT COUNT(*) FROM notices")->fetchColumn();
    $stats['messages'] = (int)$db->query("SELECT COUNT(*) FROM contact_messages")->fetchColumn();

    // Fetch latest 5 applications
    $latestApps = $db->query("SELECT * FROM loan_applications ORDER BY submitted_at DESC LIMIT 5")->fetchAll();
}

$csrf = CSRF::getToken();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin CMS | Aadhunik Jana SACCOS</title>
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@800&family=Inter:wght@400;600&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg: #f8f7f4;
            --ink: #111111;
            --accent: #d6a943;
            --ink-faint: rgba(17, 17, 17, 0.08);
            --ink-medium: rgba(17, 17, 17, 0.6);
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: var(--bg); color: var(--ink); font-family: 'Inter', sans-serif; line-height: 1.6; }
        .label { font-family: 'Space Mono', monospace; font-size: 0.7rem; text-transform: uppercase; font-weight: 700; color: var(--ink-medium); }
        .header { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 4vw; border-bottom: 2px solid var(--ink); background: var(--bg); }
        .card { background: #ffffff; border: 2px solid var(--ink); padding: 2rem; box-shadow: 8px 8px 0 var(--ink); }
        .btn { display: inline-flex; align-items: center; padding: 0.75rem 1.5rem; border: 2px solid var(--ink); font-family: 'Space Mono', monospace; font-weight: 700; text-transform: uppercase; text-decoration: none; cursor: pointer; font-size: 0.8rem; background: var(--ink); color: #fff; }
        .btn-outline { background: transparent; color: var(--ink); }
        table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
        th, td { padding: 0.75rem; border-bottom: 1px solid var(--ink-faint); text-align: left; }
        th { font-family: 'Space Mono', monospace; font-size: 0.75rem; text-transform: uppercase; background: var(--ink); color: #fff; }
    </style>
</head>
<body>
    <div class="header">
        <div>
            <span class="label">AADHUNIK JANA SACCOS CMS</span>
            <h2 style="font-family: 'Syne', sans-serif; font-size: 1.4rem;">PHP 8.4 & PDO Administration</h2>
        </div>
        <div>
            <?php if ($admin): ?>
                <span style="font-family: 'Space Mono', monospace; font-size: 0.8rem; margin-right: 1rem;">
                    Logged in as: <strong><?= e($admin['fullName']) ?></strong> (<?= e($admin['role']) ?>)
                </span>
                <a href="/admin/index.php?action=logout" class="btn btn-outline" style="padding: 0.5rem 1rem;">Sign Out</a>
            <?php else: ?>
                <a href="/" class="btn btn-outline" style="padding: 0.5rem 1rem;">Back to Site</a>
            <?php endif; ?>
        </div>
    </div>

    <div style="max-w: 1200px; padding: 3rem 4vw; margin: 0 auto;">
        <?php if (!$admin): ?>
            <div style="max-width: 440px; margin: 0 auto;" class="card">
                <span class="label">SECURE CMS AUTHENTICATION</span>
                <h3 style="font-family: 'Syne', sans-serif; font-size: 1.6rem; margin: 0.5rem 0 1.5rem;">Sign In to Admin Portal</h3>

                <?php if ($error): ?>
                    <div style="background: #fee2e2; border: 1px solid #ef4444; padding: 0.75rem; margin-bottom: 1rem; font-size: 0.85rem; color: #991b1b;">
                        <?= e($error) ?>
                    </div>
                <?php endif; ?>

                <form method="POST" action="/admin/index.php" style="display: flex; flex-direction: column; gap: 1rem;">
                    <input type="hidden" name="csrf_token" value="<?= e($csrf) ?>">
                    <input type="hidden" name="login_action" value="1">
                    
                    <div>
                        <label class="label" style="display: block; margin-bottom: 0.4rem;">Username</label>
                        <input type="text" name="username" value="admin" required style="width: 100%; padding: 0.75rem; border: 2px solid var(--ink); font-family: 'Space Mono', monospace;">
                    </div>

                    <div>
                        <label class="label" style="display: block; margin-bottom: 0.4rem;">Password</label>
                        <input type="password" name="password" placeholder="admin123" required style="width: 100%; padding: 0.75rem; border: 2px solid var(--ink); font-family: 'Space Mono', monospace;">
                    </div>

                    <button type="submit" class="btn" style="margin-top: 0.5rem; justify-content: center;">Sign In</button>
                    <div style="font-size: 0.75rem; font-family: 'Space Mono', monospace; opacity: 0.7;">Default credentials: admin / admin123</div>
                </form>
            </div>
        <?php else: ?>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem;">
                <div class="card" style="padding: 1.5rem;">
                    <span class="label">ACTIVE SAVINGS SCHEMES</span>
                    <div style="font-family: 'Syne', sans-serif; font-size: 2.2rem; font-weight: 800; margin-top: 0.5rem;"><?= $stats['savings'] ?></div>
                </div>
                <div class="card" style="padding: 1.5rem;">
                    <span class="label">LOAN PRODUCTS</span>
                    <div style="font-family: 'Syne', sans-serif; font-size: 2.2rem; font-weight: 800; margin-top: 0.5rem;"><?= $stats['loans'] ?></div>
                </div>
                <div class="card" style="padding: 1.5rem;">
                    <span class="label">LOAN APPLICATIONS</span>
                    <div style="font-family: 'Syne', sans-serif; font-size: 2.2rem; font-weight: 800; margin-top: 0.5rem; color: #1769AA;"><?= $stats['applications'] ?></div>
                </div>
                <div class="card" style="padding: 1.5rem;">
                    <span class="label">OFFICIAL NOTICES</span>
                    <div style="font-family: 'Syne', sans-serif; font-size: 2.2rem; font-weight: 800; margin-top: 0.5rem; color: var(--accent);"><?= $stats['notices'] ?></div>
                </div>
            </div>

            <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <div>
                        <span class="label">REAL-TIME PDO DATABASE</span>
                        <h3 style="font-family: 'Syne', sans-serif; font-size: 1.3rem;">Recent Loan Applications</h3>
                    </div>
                </div>

                <div style="overflow-x: auto;">
                    <table>
                        <thead>
                            <tr>
                                <th>App No</th>
                                <th>Applicant</th>
                                <th>Phone</th>
                                <th>Scheme</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($latestApps as $app): ?>
                                <tr>
                                    <td style="font-family: 'Space Mono', monospace; font-weight: 700;"><?= e($app['application_no']) ?></td>
                                    <td><strong><?= e($app['applicant_name']) ?></strong></td>
                                    <td style="font-family: 'Space Mono', monospace;"><?= e($app['applicant_phone']) ?></td>
                                    <td><?= e($app['loan_scheme_name']) ?></td>
                                    <td style="font-weight: 700; color: #1769AA;">NPR <?= number_format((float)$app['requested_amount']) ?></td>
                                    <td>
                                        <span style="display: inline-block; padding: 0.2rem 0.6rem; border: 1px solid var(--ink); font-family: 'Space Mono', monospace; font-size: 0.7rem; font-weight: 700;">
                                            <?= e($app['status']) ?>
                                        </span>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>
