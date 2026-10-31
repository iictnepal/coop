<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/functions.php';

$db = Database::getConnection();

// Query website settings
$settingsStmt = $db->query("SELECT setting_key, setting_value FROM website_settings");
$settings = [];
foreach ($settingsStmt->fetchAll() as $r) {
    $settings[$r['setting_key']] = $r['setting_value'];
}

// Query savings schemes
$savingsStmt = $db->query("SELECT * FROM savings_schemes WHERE is_active = 1 LIMIT 4");
$savingsSchemes = $savingsStmt->fetchAll();

// Query loan schemes
$loansStmt = $db->query("SELECT * FROM loan_schemes WHERE is_active = 1 LIMIT 4");
$loanSchemes = $loansStmt->fetchAll();

// Query notices
$noticesStmt = $db->query("SELECT * FROM notices ORDER BY is_pinned DESC, published_date DESC LIMIT 5");
$notices = $noticesStmt->fetchAll();

$csrf = CSRF::getToken();
?>
<!DOCTYPE html>
<html lang="ne">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= e($settings['org_name_ne'] ?? APP_NAME_NE) ?> | <?= e($settings['org_name_en'] ?? APP_NAME_EN) ?></title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@800&family=Inter:wght@400;600&family=Space+Mono:wght@400;700&family=Noto+Sans+Devanagari:wght@400;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg: #f8f7f4;
            --ink: #111111;
            --accent: #d6a943;
            --ink-faint: rgba(17, 17, 17, 0.08);
            --ink-medium: rgba(17, 17, 17, 0.6);
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            background-color: var(--bg); 
            color: var(--ink); 
            font-family: 'Inter', 'Noto Sans Devanagari', sans-serif; 
            line-height: 1.6;
        }
        .label {
            font-family: 'Space Mono', monospace;
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            color: var(--ink-medium);
            font-weight: 700;
        }
        header {
            display: grid;
            grid-template-columns: 1fr auto;
            padding: 1.5rem 4vw;
            border-bottom: 2px solid var(--ink);
            align-items: center;
            background: var(--bg);
            position: sticky;
            top: 0;
            z-index: 100;
        }
        .logo-title { 
            font-family: 'Syne', sans-serif; 
            font-size: 1.2rem; 
            font-weight: 800; 
            line-height: 1.2;
        }
        nav ul { display: flex; gap: 2rem; list-style: none; }
        nav a { 
            text-decoration: none; 
            color: var(--ink); 
            font-size: 0.8rem; 
            font-weight: 700; 
            font-family: 'Space Mono', monospace;
            text-transform: uppercase;
        }
        .hero {
            display: grid;
            grid-template-columns: 1.2fr 1fr;
            min-height: 75vh;
            border-bottom: 2px solid var(--ink);
        }
        .hero-text {
            padding: 6vw 4vw;
            border-right: 2px solid var(--ink);
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        h1 {
            font-family: 'Syne', sans-serif;
            font-size: clamp(2rem, 4vw, 4rem);
            line-height: 1;
            margin: 1.2rem 0;
            letter-spacing: -0.03em;
        }
        .hero-image {
            background: var(--accent);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 4vw;
        }
        .hero-card {
            background: var(--bg);
            border: 2px solid var(--ink);
            padding: 2rem;
            width: 100%;
            max-width: 440px;
            box-shadow: 12px 12px 0 var(--ink);
        }
        .grid-section {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            border-bottom: 2px solid var(--ink);
        }
        .grid-item {
            padding: 2.5rem 2rem;
            border-right: 1px solid var(--ink-faint);
            background: #ffffff;
        }
        .btn {
            display: inline-flex;
            align-items: center;
            padding: 0.9rem 1.8rem;
            border: 2px solid var(--ink);
            font-family: 'Space Mono', monospace;
            font-weight: 700;
            text-transform: uppercase;
            text-decoration: none;
            cursor: pointer;
            font-size: 0.8rem;
        }
        .btn-primary { background: var(--ink); color: var(--bg); }
        .btn-primary:hover { background: var(--accent); color: var(--ink); }
        footer {
            padding: 4vw;
            background: var(--ink);
            color: var(--bg);
            border-top: 2px solid var(--ink);
            font-family: 'Space Mono', monospace;
            font-size: 0.8rem;
        }
    </style>
</head>
<body>
    <header>
        <div>
            <span class="label">ESTD. 2065 | REG NO. <?= e($settings['reg_number'] ?? APP_REG_NO) ?></span>
            <div class="logo-title"><?= e($settings['org_name_ne'] ?? APP_NAME_NE) ?></div>
            <div style="font-size: 0.8rem; font-weight: 600; color: var(--ink-medium);"><?= e($settings['org_name_en'] ?? APP_NAME_EN) ?></div>
        </div>
        <nav>
            <ul>
                <li><a href="#savings">Savings</a></li>
                <li><a href="#loans">Loans</a></li>
                <li><a href="#notices">Notices</a></li>
                <li><a href="/admin/index.php">CMS Portal</a></li>
            </ul>
        </nav>
    </header>

    <section class="hero">
        <div class="hero-text">
            <span class="label">SECURE SAVINGS • LOCAL EMPOWERMENT</span>
            <h1>समुदायको आर्थिक समृद्धिको दिगो सहयात्री</h1>
            <p style="font-size: 1.1rem; color: var(--ink-medium); max-width: 580px;">
                <?= e($settings['slogan_ne'] ?? 'सुरक्षित बचत, समुन्नत भविष्य | समुदायको दिगो आर्थिक समृद्धिको सारथि') ?>
            </p>
            <div style="margin-top: 2rem; display: flex; gap: 1rem;">
                <a href="#loans" class="btn btn-primary">कर्जा सुविधा हेर्नुहोस्</a>
                <a href="#savings" class="btn">बचत योजनाहरू</a>
            </div>
        </div>
        <div class="hero-image">
            <div class="hero-card">
                <span class="label">DIRECT PDO MYSQL 8.4 BACKEND</span>
                <h3 style="font-family: 'Syne', sans-serif; font-size: 1.4rem; margin: 0.8rem 0;">सहकारी मुख्य वित्तीय सेवा</h3>
                <p style="font-size: 0.85rem; margin-bottom: 1.5rem;">
                    नागार्जुन नगरपालिका वडा नं. ४, काठमाडौंमा अवस्थित आधुनिक जन बचत तथा ऋण सहकारी संस्था लि.
                </p>
                <div style="border-top: 2px solid var(--ink); padding-top: 1rem; font-family: 'Space Mono', monospace; font-size: 0.75rem;">
                    <div>• सम्पर्क: <?= e($settings['phone'] ?? '+977-1-5100123') ?></div>
                    <div>• इमेल: <?= e($settings['email'] ?? 'info@aadhunikjana.coop.np') ?></div>
                    <div>• कार्यालय समय: <?= e($settings['office_hours_ne'] ?? '१०:०० - ४:००') ?></div>
                </div>
            </div>
        </div>
    </section>

    <div style="padding: 3rem 4vw; border-bottom: 2px solid var(--ink);" id="savings">
        <span class="label">POPULAR DEPOSIT SCHEMES</span>
        <h2 style="font-family: 'Syne', sans-serif; font-size: 2rem; margin-top: 0.5rem;">बचत योजनाहरू (Savings Schemes)</h2>
    </div>

    <div class="grid-section">
        <?php foreach ($savingsSchemes as $s): ?>
            <div class="grid-item">
                <span class="label"><?= e($s['category']) ?></span>
                <h3 style="font-family: 'Syne', sans-serif; font-size: 1.2rem; margin: 0.5rem 0;"><?= e($s['name_ne']) ?></h3>
                <div style="font-size: 0.8rem; color: var(--ink-medium); margin-bottom: 1rem;"><?= e($s['name_en']) ?></div>
                <div style="font-family: 'Syne', sans-serif; font-size: 1.8rem; font-weight: 800; color: var(--accent); margin-bottom: 0.5rem;">
                    <?= e($s['interest_rate']) ?>
                </div>
                <p style="font-size: 0.85rem; color: var(--ink-medium); margin-bottom: 1rem;"><?= e($s['description_ne']) ?></p>
                <div style="font-family: 'Space Mono', monospace; font-size: 0.75rem; border-top: 1px solid var(--ink-faint); padding-top: 0.8rem;">
                    न्यूनतम मौज्दात: <?= e($s['minimum_deposit']) ?>
                </div>
            </div>
        <?php endforeach; ?>
    </div>

    <div style="padding: 3rem 4vw; border-bottom: 2px solid var(--ink);" id="loans">
        <span class="label">FLEXIBLE FINANCING</span>
        <h2 style="font-family: 'Syne', sans-serif; font-size: 2rem; margin-top: 0.5rem;">कर्जा सुविधाहरू (Credit Facilities)</h2>
    </div>

    <div class="grid-section">
        <?php foreach ($loanSchemes as $l): ?>
            <div class="grid-item">
                <span class="label"><?= e($l['category']) ?> LOAN</span>
                <h3 style="font-family: 'Syne', sans-serif; font-size: 1.2rem; margin: 0.5rem 0;"><?= e($l['name_ne']) ?></h3>
                <div style="font-size: 0.8rem; color: var(--ink-medium); margin-bottom: 1rem;"><?= e($l['name_en']) ?></div>
                <div style="font-family: 'Syne', sans-serif; font-size: 1.8rem; font-weight: 800; margin-bottom: 0.5rem;">
                    <?= e($l['interest_rate']) ?>
                </div>
                <p style="font-size: 0.85rem; color: var(--ink-medium); margin-bottom: 1rem;"><?= e($l['description_ne']) ?></p>
                <div style="font-family: 'Space Mono', monospace; font-size: 0.75rem; border-top: 1px solid var(--ink-faint); padding-top: 0.8rem;">
                    सीमा: <?= e($l['loan_limit_ne']) ?> • भुक्तानी: <?= e($l['tenure_ne']) ?>
                </div>
            </div>
        <?php endforeach; ?>
    </div>

    <footer>
        <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 2rem;">
            <div>
                <div style="font-weight: 700; font-size: 1rem;"><?= e($settings['org_name_ne'] ?? APP_NAME_NE) ?></div>
                <div style="margin-top: 0.5rem; opacity: 0.7;"><?= e($settings['address_ne'] ?? APP_LOCATION) ?></div>
                <div style="margin-top: 0.2rem; opacity: 0.7;">फोन: <?= e($settings['phone'] ?? '+977-1-5100123') ?></div>
            </div>
            <div>
                <div class="label" style="color: var(--accent);">SECURITY & STACK</div>
                <div style="margin-top: 0.5rem;">Core PHP 8.4 OOP • MySQL 8 PDO • CSRF Protected</div>
                <div style="opacity: 0.7; margin-top: 0.2rem;">All Data Protected by Institutional Security Rules</div>
            </div>
        </div>
    </footer>
</body>
</html>
