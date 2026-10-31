<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/functions.php';

$db = Database::getConnection();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $db->query("SELECT * FROM loan_schemes WHERE is_active = 1 ORDER BY id ASC");
    $loans = $stmt->fetchAll();

    $result = array_map(function ($l) {
        return [
            'id'             => 'loan-' . $l['id'],
            'numericId'      => (int)$l['id'],
            'nameEn'         => $l['name_en'],
            'nameNe'         => $l['name_ne'],
            'category'       => $l['category'],
            'interestRate'   => $l['interest_rate'],
            'loanLimitEn'    => $l['loan_limit_en'],
            'loanLimitNe'    => $l['loan_limit_ne'],
            'tenureEn'       => $l['tenure_en'],
            'tenureNe'       => $l['tenure_ne'],
            'descriptionEn'  => $l['description_en'],
            'descriptionNe'  => $l['description_ne'],
            'featuresEn'     => json_decode($l['features_json'] ?? '[]', true) ?: [],
            'featuresNe'     => json_decode($l['features_ne_json'] ?? '[]', true) ?: [],
            'documentsEn'    => json_decode($l['documents_json'] ?? '[]', true) ?: [],
            'documentsNe'    => json_decode($l['documents_ne_json'] ?? '[]', true) ?: [],
            'isActive'       => (bool)$l['is_active'],
        ];
    }, $loans);

    Response::success($result);
}

if ($method === 'POST') {
    $admin = Auth::requireAdmin();
    CSRF::enforce();

    $input = Response::getJsonInput();
    if (empty($input)) {
        $input = $_POST;
    }

    $errors = Validator::requireFields($input, ['nameEn', 'category', 'interestRate', 'loanLimitEn', 'tenureEn']);
    if (!empty($errors)) {
        Response::error('Validation failed', 422, $errors);
    }

    $stmt = $db->prepare("
        INSERT INTO loan_schemes (
            name_en, name_ne, category, interest_rate, loan_limit_en, loan_limit_ne,
            tenure_en, tenure_ne, description_en, description_ne,
            features_json, features_ne_json, documents_json, documents_ne_json, is_active
        ) VALUES (
            :name_en, :name_ne, :category, :interest_rate, :loan_limit_en, :loan_limit_ne,
            :tenure_en, :tenure_ne, :description_en, :description_ne,
            :features_json, :features_ne_json, :documents_json, :documents_ne_json, 1
        )
    ");

    $stmt->execute([
        'name_en'           => Validator::sanitize($input['nameEn']),
        'name_ne'           => Validator::sanitize($input['nameNe'] ?? $input['nameEn']),
        'category'          => Validator::sanitize($input['category']),
        'interest_rate'     => Validator::sanitize($input['interestRate']),
        'loan_limit_en'     => Validator::sanitize($input['loanLimitEn']),
        'loan_limit_ne'     => Validator::sanitize($input['loanLimitNe'] ?? $input['loanLimitEn']),
        'tenure_en'         => Validator::sanitize($input['tenureEn']),
        'tenure_ne'         => Validator::sanitize($input['tenureNe'] ?? $input['tenureEn']),
        'description_en'    => Validator::sanitize($input['descriptionEn'] ?? ''),
        'description_ne'    => Validator::sanitize($input['descriptionNe'] ?? ''),
        'features_json'     => json_encode($input['featuresEn'] ?? [], JSON_UNESCAPED_UNICODE),
        'features_ne_json'  => json_encode($input['featuresNe'] ?? [], JSON_UNESCAPED_UNICODE),
        'documents_json'    => json_encode($input['documentsEn'] ?? [], JSON_UNESCAPED_UNICODE),
        'documents_ne_json' => json_encode($input['documentsNe'] ?? [], JSON_UNESCAPED_UNICODE),
    ]);

    $newId = (int)$db->lastInsertId();
    Auth::logActivity($admin['username'], 'CREATE_LOAN_SCHEME', 'Created loan scheme: ' . $input['nameEn']);

    Response::success(['id' => 'loan-' . $newId], 'Loan scheme created successfully', 201);
}

if ($method === 'PUT' || $method === 'PATCH') {
    $admin = Auth::requireAdmin();
    CSRF::enforce();

    $input = Response::getJsonInput();
    $rawId = $input['id'] ?? $_GET['id'] ?? '';
    $id = (int)str_replace('loan-', '', (string)$rawId);

    if ($id <= 0) {
        Response::error('Invalid loan scheme ID', 400);
    }

    $stmt = $db->prepare("
        UPDATE loan_schemes SET
            name_en = COALESCE(:name_en, name_en),
            name_ne = COALESCE(:name_ne, name_ne),
            category = COALESCE(:category, category),
            interest_rate = COALESCE(:interest_rate, interest_rate),
            loan_limit_en = COALESCE(:loan_limit_en, loan_limit_en),
            is_active = COALESCE(:is_active, is_active)
        WHERE id = :id
    ");

    $stmt->execute([
        'id'            => $id,
        'name_en'       => isset($input['nameEn']) ? Validator::sanitize($input['nameEn']) : null,
        'name_ne'       => isset($input['nameNe']) ? Validator::sanitize($input['nameNe']) : null,
        'category'      => isset($input['category']) ? $input['category'] : null,
        'interest_rate' => isset($input['interestRate']) ? Validator::sanitize($input['interestRate']) : null,
        'loan_limit_en' => isset($input['loanLimitEn']) ? Validator::sanitize($input['loanLimitEn']) : null,
        'is_active'     => isset($input['isActive']) ? (int)$input['isActive'] : null,
    ]);

    Auth::logActivity($admin['username'], 'UPDATE_LOAN_SCHEME', "Updated loan scheme ID: {$id}");

    Response::success(null, 'Loan scheme updated successfully');
}

if ($method === 'DELETE') {
    $admin = Auth::requireAdmin();
    CSRF::enforce();

    $rawId = $_GET['id'] ?? '';
    $id = (int)str_replace('loan-', '', (string)$rawId);

    if ($id <= 0) {
        Response::error('Invalid loan scheme ID', 400);
    }

    $stmt = $db->prepare("DELETE FROM loan_schemes WHERE id = :id");
    $stmt->execute(['id' => $id]);

    Auth::logActivity($admin['username'], 'DELETE_LOAN_SCHEME', "Deleted loan scheme ID: {$id}");

    Response::success(null, 'Loan scheme deleted successfully');
}

Response::error('Method not allowed', 405);
