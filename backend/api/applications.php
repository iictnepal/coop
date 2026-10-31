<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/functions.php';

$db = Database::getConnection();
$method = $_SERVER['REQUEST_METHOD'];

// GET: Retrieve applications
if ($method === 'GET') {
    $admin = Auth::getAdminUser();
    $member = Auth::getMemberUser();

    if (!$admin && !$member) {
        Response::error('Authentication required to view loan applications', 401);
    }

    if ($admin) {
        $stmt = $db->query("SELECT * FROM loan_applications ORDER BY submitted_at DESC");
        $apps = $stmt->fetchAll();
    } else {
        // Authenticated shareholder member: only retrieve their own applications
        $stmt = $db->prepare("
            SELECT * FROM loan_applications 
            WHERE member_id = :mid OR applicant_phone = :ph 
            ORDER BY submitted_at DESC
        ");
        $stmt->execute([
            'mid' => $member['memberId'],
            'ph'  => $member['phone']
        ]);
        $apps = $stmt->fetchAll();
    }

    $result = array_map(function ($a) {
        return [
            'id'                    => (string)$a['id'],
            'applicationNo'         => $a['application_no'],
            'memberId'              => $a['member_id'],
            'applicantName'         => $a['applicant_name'],
            'applicantPhone'        => $a['applicant_phone'],
            'applicantEmail'        => $a['applicant_email'],
            'applicantAddress'      => $a['applicant_address'],
            'loanSchemeId'          => 'loan-' . $a['loan_scheme_id'],
            'loanSchemeName'        => $a['loan_scheme_name'],
            'requestedAmount'       => (float)$a['requested_amount'],
            'requestedTenureMonths' => (int)$a['requested_tenure_months'],
            'monthlyIncome'         => (float)($a['monthly_income'] ?? 0),
            'collateralType'        => $a['collateral_type'],
            'purpose'               => $a['purpose'],
            'status'                => $a['status'],
            'adminRemarks'          => $a['admin_remarks'],
            'submittedAt'           => $a['submitted_at'],
        ];
    }, $apps);

    Response::success($result);
}

// POST: Submit new loan application
if ($method === 'POST') {
    CSRF::enforce();

    $input = Response::getJsonInput();
    if (empty($input)) {
        $input = $_POST;
    }

    $errors = Validator::requireFields($input, [
        'applicantName',
        'applicantPhone',
        'applicantAddress',
        'requestedAmount',
        'requestedTenureMonths',
        'collateralType',
        'purpose'
    ]);

    if (!Validator::isPhone($input['applicantPhone'] ?? '')) {
        $errors['applicantPhone'] = 'Invalid phone number format.';
    }

    if (!Validator::isPositiveNumber($input['requestedAmount'] ?? 0)) {
        $errors['requestedAmount'] = 'Requested amount must be greater than zero.';
    }

    if (!empty($errors)) {
        Response::error('Application validation failed', 422, $errors);
    }

    // Generate unique application number
    $appNo = sprintf('AJ-LA-%s-%04d', date('Ymd'), random_int(1000, 9999));

    // Parse scheme ID
    $schemeIdRaw = $input['loanSchemeId'] ?? '1';
    $schemeId = (int)str_replace('loan-', '', (string)$schemeIdRaw);
    if ($schemeId <= 0) $schemeId = 1;

    $schemeName = Validator::sanitize($input['loanSchemeName'] ?? 'General Loan Scheme');

    $member = Auth::getMemberUser();
    $memberId = $member['memberId'] ?? ($input['memberId'] ?? null);

    $stmt = $db->prepare("
        INSERT INTO loan_applications (
            application_no, member_id, applicant_name, applicant_phone, applicant_email,
            applicant_address, loan_scheme_id, loan_scheme_name, requested_amount,
            requested_tenure_months, monthly_income, collateral_type, purpose, status
        ) VALUES (
            :app_no, :member_id, :applicant_name, :applicant_phone, :applicant_email,
            :applicant_address, :loan_scheme_id, :loan_scheme_name, :requested_amount,
            :requested_tenure_months, :monthly_income, :collateral_type, :purpose, 'Submitted'
        )
    ");

    $stmt->execute([
        'app_no'                  => $appNo,
        'member_id'               => $memberId ? Validator::sanitize($memberId) : null,
        'applicant_name'          => Validator::sanitize($input['applicantName']),
        'applicant_phone'         => Validator::sanitize($input['applicantPhone']),
        'applicant_email'         => !empty($input['applicantEmail']) ? Validator::sanitize($input['applicantEmail']) : null,
        'applicant_address'       => Validator::sanitize($input['applicantAddress']),
        'loan_scheme_id'          => $schemeId,
        'loan_scheme_name'        => $schemeName,
        'requested_amount'        => (float)$input['requestedAmount'],
        'requested_tenure_months' => (int)$input['requestedTenureMonths'],
        'monthly_income'          => !empty($input['monthlyIncome']) ? (float)$input['monthlyIncome'] : null,
        'collateral_type'         => Validator::sanitize($input['collateralType']),
        'purpose'                 => Validator::sanitize($input['purpose']),
    ]);

    Auth::logActivity(
        $input['applicantName'],
        'LOAN_APPLICATION_SUBMITTED',
        "Application {$appNo} submitted for NPR " . number_format((float)$input['requestedAmount'])
    );

    Response::success([
        'applicationNo' => $appNo,
        'status'        => 'Submitted',
        'message'       => 'Your loan application has been registered successfully.'
    ], 'Loan application received', 201);
}

// PUT: Update application status (Credit Committee Review)
if ($method === 'PUT' || $method === 'PATCH') {
    $admin = Auth::requireAdmin();
    CSRF::enforce();

    $input = Response::getJsonInput();
    $id = (int)($input['id'] ?? 0);
    $status = $input['status'] ?? '';
    $remarks = $input['adminRemarks'] ?? $input['remarks'] ?? null;

    if ($id <= 0) {
        Response::error('Invalid loan application ID', 400);
    }

    $validStatuses = ['Submitted', 'Under Review', 'Approved', 'Rejected'];
    if (!in_array($status, $validStatuses, true)) {
        Response::error('Invalid application status', 422);
    }

    $stmt = $db->prepare("
        UPDATE loan_applications 
        SET status = :status, admin_remarks = COALESCE(:remarks, admin_remarks)
        WHERE id = :id
    ");

    $stmt->execute([
        'status'  => $status,
        'remarks' => $remarks !== null ? Validator::sanitize($remarks) : null,
        'id'      => $id
    ]);

    Auth::logActivity($admin['username'], 'LOAN_STATUS_UPDATE', "Application ID {$id} marked as {$status}");

    Response::success(null, "Application updated to {$status}");
}

Response::error('Method not allowed', 405);
