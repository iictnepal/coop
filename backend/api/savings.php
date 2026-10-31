<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/functions.php';

$db = Database::getConnection();
$method = $_SERVER['REQUEST_METHOD'];

// Handle GET: List all savings schemes
if ($method === 'GET') {
    $stmt = $db->query("SELECT * FROM savings_schemes WHERE is_active = 1 ORDER BY id ASC");
    $schemes = $stmt->fetchAll();

    $result = array_map(function ($s) {
        return [
            'id'             => 'sav-' . $s['id'],
            'numericId'      => (int)$s['id'],
            'nameEn'         => $s['name_en'],
            'nameNe'         => $s['name_ne'],
            'category'       => $s['category'],
            'interestRate'   => $s['interest_rate'],
            'minimumDeposit' => $s['minimum_deposit'],
            'durationEn'     => $s['duration_en'],
            'durationNe'     => $s['duration_ne'],
            'descriptionEn'  => $s['description_en'],
            'descriptionNe'  => $s['description_ne'],
            'featuresEn'     => json_decode($s['features_json'] ?? '[]', true) ?: [],
            'featuresNe'     => json_decode($s['features_ne_json'] ?? '[]', true) ?: [],
            'eligibilityEn'  => $s['eligibility_en'] ?? '',
            'eligibilityNe'  => $s['eligibility_ne'] ?? '',
            'badge'          => $s['badge'] ?? '',
            'isActive'       => (bool)$s['is_active'],
        ];
    }, $schemes);

    Response::success($result);
}

// Handle POST: Create savings scheme
if ($method === 'POST') {
    $admin = Auth::requireAdmin();
    CSRF::enforce();

    $input = Response::getJsonInput();
    if (empty($input)) {
        $input = $_POST;
    }

    $errors = Validator::requireFields($input, ['nameEn', 'interestRate', 'minimumDeposit']);
    if (!empty($errors)) {
        Response::error('Validation failed', 422, $errors);
    }

    $stmt = $db->prepare("
        INSERT INTO savings_schemes (
            name_en, name_ne, category, interest_rate, minimum_deposit,
            duration_en, duration_ne, description_en, description_ne,
            features_json, features_ne_json, eligibility_en, eligibility_ne, badge, is_active
        ) VALUES (
            :name_en, :name_ne, :category, :interest_rate, :minimum_deposit,
            :duration_en, :duration_ne, :description_en, :description_ne,
            :features_json, :features_ne_json, :eligibility_en, :eligibility_ne, :badge, 1
        )
    ");

    $stmt->execute([
        'name_en'          => Validator::sanitize($input['nameEn']),
        'name_ne'          => Validator::sanitize($input['nameNe'] ?? $input['nameEn']),
        'category'         => in_array($input['category'] ?? '', ['Regular', 'Periodic', 'Special', 'Child', 'Senior'], true) ? $input['category'] : 'Regular',
        'interest_rate'    => Validator::sanitize($input['interestRate']),
        'minimum_deposit'  => Validator::sanitize($input['minimumDeposit']),
        'duration_en'      => Validator::sanitize($input['durationEn'] ?? 'Open-ended, anytime withdrawal'),
        'duration_ne'      => Validator::sanitize($input['durationNe'] ?? 'खुला अवधि, जुनसुकै समयमा जम्मा तथा भुक्तानी'),
        'description_en'   => Validator::sanitize($input['descriptionEn'] ?? 'Accessible savings scheme for registered cooperative members.'),
        'description_ne'   => Validator::sanitize($input['descriptionNe'] ?? 'सहकारीका सम्पूर्ण साधारण सदस्यहरूका लागि आकर्षक बचत योजना।'),
        'features_json'    => json_encode($input['featuresEn'] ?? ['Daily interest calculation', 'Free SMS alerts'], JSON_UNESCAPED_UNICODE),
        'features_ne_json' => json_encode($input['featuresNe'] ?? ['दैनिक मौज्दातमा ब्याज गणना', 'निःशुल्क एसएमएस सुविधा'], JSON_UNESCAPED_UNICODE),
        'eligibility_en'   => Validator::sanitize($input['eligibilityEn'] ?? 'All shareholder members'),
        'eligibility_ne'   => Validator::sanitize($input['eligibilityNe'] ?? 'संस्थाका सम्पूर्ण सेयर सदस्यहरू'),
        'badge'            => Validator::sanitize($input['badge'] ?? ''),
    ]);

    $newId = (int)$db->lastInsertId();
    Auth::logActivity($admin['username'], 'CREATE_SAVINGS_SCHEME', 'Created savings scheme: ' . $input['nameEn']);

    Response::success(['id' => 'sav-' . $newId], 'Savings scheme created successfully', 201);
}

// Handle PUT / PATCH: Update savings scheme
if ($method === 'PUT' || $method === 'PATCH') {
    $admin = Auth::requireAdmin();
    CSRF::enforce();

    $input = Response::getJsonInput();
    $rawId = $input['id'] ?? $_GET['id'] ?? '';
    $id = (int)str_replace('sav-', '', (string)$rawId);

    if ($id <= 0) {
        Response::error('Invalid savings scheme ID', 400);
    }

    $stmt = $db->prepare("
        UPDATE savings_schemes SET
            name_en = COALESCE(:name_en, name_en),
            name_ne = COALESCE(:name_ne, name_ne),
            category = COALESCE(:category, category),
            interest_rate = COALESCE(:interest_rate, interest_rate),
            minimum_deposit = COALESCE(:minimum_deposit, minimum_deposit),
            is_active = COALESCE(:is_active, is_active)
        WHERE id = :id
    ");

    $stmt->execute([
        'id'              => $id,
        'name_en'         => isset($input['nameEn']) ? Validator::sanitize($input['nameEn']) : null,
        'name_ne'         => isset($input['nameNe']) ? Validator::sanitize($input['nameNe']) : null,
        'category'        => isset($input['category']) ? $input['category'] : null,
        'interest_rate'   => isset($input['interestRate']) ? Validator::sanitize($input['interestRate']) : null,
        'minimum_deposit' => isset($input['minimumDeposit']) ? Validator::sanitize($input['minimumDeposit']) : null,
        'is_active'       => isset($input['isActive']) ? (int)$input['isActive'] : null,
    ]);

    Auth::logActivity($admin['username'], 'UPDATE_SAVINGS_SCHEME', "Updated savings scheme ID: {$id}");

    Response::success(null, 'Savings scheme updated successfully');
}

// Handle DELETE: Remove savings scheme
if ($method === 'DELETE') {
    $admin = Auth::requireAdmin();
    CSRF::enforce();

    $rawId = $_GET['id'] ?? '';
    $id = (int)str_replace('sav-', '', (string)$rawId);

    if ($id <= 0) {
        Response::error('Invalid savings scheme ID', 400);
    }

    $stmt = $db->prepare("DELETE FROM savings_schemes WHERE id = :id");
    $stmt->execute(['id' => $id]);

    Auth::logActivity($admin['username'], 'DELETE_SAVINGS_SCHEME', "Deleted savings scheme ID: {$id}");

    Response::success(null, 'Savings scheme deleted successfully');
}

Response::error('Method not allowed', 405);
