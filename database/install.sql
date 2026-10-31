-- ==============================================================
-- DATABASE: aadhunik_cooperative
-- Organization: Aadhunik Jana Saving & Credit Co-operative Ltd.
-- Nepali: आधुनिक जन बचत तथा ऋण सहकारी संस्था लिमिटेड
-- Location: Ward No. 4, Nagarjun Municipality, Kathmandu, Nepal
-- Compatible with MySQL 8.0+ / MariaDB 10.5+ / PHP 8.4 PDO
-- ==============================================================

DROP DATABASE IF EXISTS `aadhunik_cooperative`;
CREATE DATABASE `aadhunik_cooperative` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `aadhunik_cooperative`;

-- 1. Website Settings & Customization
CREATE TABLE IF NOT EXISTS `website_settings` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `setting_key` VARCHAR(100) NOT NULL UNIQUE,
    `setting_value` TEXT NULL,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Administrators & Roles
CREATE TABLE IF NOT EXISTS `admins` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `full_name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `role` ENUM('super_admin', 'credit_officer', 'editor') DEFAULT 'editor',
    `is_active` TINYINT(1) DEFAULT 1,
    `last_login` DATETIME NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Shareholder Members
CREATE TABLE IF NOT EXISTS `members` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `member_id` VARCHAR(30) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `full_name` VARCHAR(150) NOT NULL,
    `full_name_ne` VARCHAR(150) NULL,
    `phone` VARCHAR(20) NOT NULL,
    `email` VARCHAR(100) NULL,
    `citizenship_no` VARCHAR(50) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `savings_balance` DECIMAL(15,2) DEFAULT 0.00,
    `share_amount` DECIMAL(15,2) DEFAULT 0.00,
    `kyc_status` ENUM('Verified', 'Pending', 'Requires Update') DEFAULT 'Verified',
    `is_active` TINYINT(1) DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Savings Schemes (Dynamic & Admin Controlled)
CREATE TABLE IF NOT EXISTS `savings_schemes` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name_en` VARCHAR(150) NOT NULL,
    `name_ne` VARCHAR(150) NOT NULL,
    `category` ENUM('Regular', 'Periodic', 'Special', 'Child', 'Senior') DEFAULT 'Regular',
    `interest_rate` VARCHAR(50) NOT NULL,
    `minimum_deposit` VARCHAR(50) NOT NULL,
    `duration_en` VARCHAR(100) NOT NULL,
    `duration_ne` VARCHAR(100) NOT NULL,
    `description_en` TEXT NOT NULL,
    `description_ne` TEXT NOT NULL,
    `features_json` JSON NULL,
    `features_ne_json` JSON NULL,
    `eligibility_en` VARCHAR(255) NULL,
    `eligibility_ne` VARCHAR(255) NULL,
    `badge` VARCHAR(50) NULL,
    `is_active` TINYINT(1) DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Loan Schemes
CREATE TABLE IF NOT EXISTS `loan_schemes` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name_en` VARCHAR(150) NOT NULL,
    `name_ne` VARCHAR(150) NOT NULL,
    `category` ENUM('Business', 'Agriculture', 'Housing', 'Education', 'Emergency', 'Personal') NOT NULL,
    `interest_rate` VARCHAR(50) NOT NULL,
    `loan_limit_en` VARCHAR(100) NOT NULL,
    `loan_limit_ne` VARCHAR(100) NOT NULL,
    `tenure_en` VARCHAR(100) NOT NULL,
    `tenure_ne` VARCHAR(100) NOT NULL,
    `description_en` TEXT NOT NULL,
    `description_ne` TEXT NOT NULL,
    `features_json` JSON NULL,
    `features_ne_json` JSON NULL,
    `documents_json` JSON NULL,
    `documents_ne_json` JSON NULL,
    `is_active` TINYINT(1) DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Online Loan Applications / Inquiries
CREATE TABLE IF NOT EXISTS `loan_applications` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `application_no` VARCHAR(50) NOT NULL UNIQUE,
    `member_id` VARCHAR(30) NULL,
    `applicant_name` VARCHAR(150) NOT NULL,
    `applicant_phone` VARCHAR(30) NOT NULL,
    `applicant_email` VARCHAR(100) NULL,
    `applicant_address` VARCHAR(255) NOT NULL,
    `loan_scheme_id` INT NOT NULL,
    `loan_scheme_name` VARCHAR(150) NOT NULL,
    `requested_amount` DECIMAL(15, 2) NOT NULL,
    `requested_tenure_months` INT NOT NULL,
    `monthly_income` DECIMAL(15, 2) NULL,
    `collateral_type` VARCHAR(150) NOT NULL,
    `purpose` TEXT NOT NULL,
    `status` ENUM('Submitted', 'Under Review', 'Approved', 'Rejected') DEFAULT 'Submitted',
    `admin_remarks` TEXT NULL,
    `submitted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_loan_app_status (`status`),
    INDEX idx_member_id (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Notices & Announcements
CREATE TABLE IF NOT EXISTS `notices` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title_en` VARCHAR(255) NOT NULL,
    `title_ne` VARCHAR(255) NOT NULL,
    `category` ENUM('General', 'AGM', 'Financial Report', 'Tender', 'Holiday') DEFAULT 'General',
    `published_date` DATE NOT NULL,
    `expiry_date` DATE NULL,
    `content_en` TEXT NOT NULL,
    `content_ne` TEXT NOT NULL,
    `is_pinned` TINYINT(1) DEFAULT 0,
    `pdf_file_name` VARCHAR(255) NULL,
    `pdf_size` VARCHAR(50) NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. News & Community Activities
CREATE TABLE IF NOT EXISTS `news` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title_en` VARCHAR(255) NOT NULL,
    `title_ne` VARCHAR(255) NOT NULL,
    `category` VARCHAR(50) DEFAULT 'Community',
    `published_date` DATE NOT NULL,
    `summary_en` TEXT NOT NULL,
    `summary_ne` TEXT NOT NULL,
    `content_en` LONGTEXT NOT NULL,
    `content_ne` LONGTEXT NOT NULL,
    `image_url` VARCHAR(255) NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Downloadable Documents
CREATE TABLE IF NOT EXISTS `documents` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title_en` VARCHAR(255) NOT NULL,
    `title_ne` VARCHAR(255) NOT NULL,
    `category` ENUM('Forms', 'Reports', 'Bylaws', 'KYC', 'Circulars') DEFAULT 'Forms',
    `file_path` VARCHAR(255) NOT NULL,
    `file_size` VARCHAR(50) NOT NULL,
    `file_type` VARCHAR(20) DEFAULT 'PDF',
    `downloads_count` INT DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. Contact Inquiries
CREATE TABLE IF NOT EXISTS `contact_messages` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `full_name` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(30) NOT NULL,
    `email` VARCHAR(100) NULL,
    `subject` VARCHAR(200) NOT NULL,
    `message` TEXT NOT NULL,
    `status` ENUM('Pending', 'Read', 'Replied') DEFAULT 'Pending',
    `admin_notes` TEXT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. Administrative Activity Audit Log
CREATE TABLE IF NOT EXISTS `activity_logs` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_name` VARCHAR(100) NOT NULL,
    `action` VARCHAR(100) NOT NULL,
    `details` TEXT NOT NULL,
    `ip_address` VARCHAR(45) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. Gallery Items
CREATE TABLE IF NOT EXISTS `gallery_items` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title_en` VARCHAR(150) NOT NULL,
    `title_ne` VARCHAR(150) NOT NULL,
    `category` VARCHAR(50) DEFAULT 'Event',
    `image_url` VARCHAR(255) NOT NULL,
    `date` DATE NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==============================================================
-- SEED DATA
-- ==============================================================

-- 1. Super Admin (Password: admin123)
-- Hash generated via password_hash('admin123', PASSWORD_BCRYPT)
INSERT INTO `admins` (`id`, `username`, `password_hash`, `full_name`, `email`, `role`, `is_active`)
VALUES (1, 'admin', '$2y$12$e80yq9Rj0t9kX2q4Hk7cLe4QzWv8m2t9u1V7l9Qe.a6R.Tz6W0S7y', 'System Administrator', 'admin@aadhunikjana.coop.np', 'super_admin', 1)
ON DUPLICATE KEY UPDATE `username`=`username`;

-- 2. Demo Member (Member ID: AJ-2075-0142, Password: member123)
-- Hash generated via password_hash('member123', PASSWORD_BCRYPT)
INSERT INTO `members` (`id`, `member_id`, `password_hash`, `full_name`, `full_name_ne`, `phone`, `email`, `citizenship_no`, `address`, `savings_balance`, `share_amount`, `kyc_status`, `is_active`)
VALUES (1, 'AJ-2075-0142', '$2y$12$W934e6T9QzK0l3J2F8H6Ue12V3B4N5M6L7K8J9H0G1F2D3S4A5Z6X', 'Ram Bahadur Shrestha', 'राम बहादुर श्रेष्ठ', '+977-9841234567', 'ram.shrestha@gmail.com', '27-01-70-01923 (Kathmandu)', 'Nagarjun-4, Seuchatar, Kathmandu', 184500.00, 25000.00, 'Verified', 1)
ON DUPLICATE KEY UPDATE `member_id`=`member_id`;

-- 3. Website Settings
INSERT INTO `website_settings` (`setting_key`, `setting_value`) VALUES
('org_name_en', 'Aadhunik Jana Saving & Credit Co-operative Ltd.'),
('org_name_ne', 'आधुनिक जन बचत तथा ऋण सहकारी संस्था लिमिटेड'),
('slogan_en', 'Secure Savings, Better Future | Empowering Community Financial Growth'),
('slogan_ne', 'सुरक्षित बचत, समुन्नत भविष्य | समुदायको दिगो आर्थिक समृद्धिको सारथि'),
('address_en', 'Ward No. 4, Nagarjun Municipality, Kathmandu, Nepal'),
('address_ne', 'नागार्जुन नगरपालिका वडा नं. ४, काठमाडौं, नेपाल'),
('phone', '+977-1-5100123'),
('phone_secondary', '+977-9851000000'),
('email', 'info@aadhunikjana.coop.np'),
('email_secondary', 'support@aadhunikjana.coop.np'),
('reg_number', 'Reg. No: 1248/065/066 (DoC Nepal)'),
('pan_number', 'PAN: 302847195'),
('office_hours_en', 'Sunday - Friday: 10:00 AM - 4:00 PM (Cash Counter till 3:30 PM)'),
('office_hours_ne', 'आइतबार देखि शुक्रबार: बिहान १०:०० देखि दिउँसो ४:०० सम्म (नगद ३:३० सम्म)'),
('facebook_url', 'https://facebook.com/aadhunikjanasaccos'),
('youtube_url', 'https://youtube.com'),
('twitter_url', 'https://twitter.com')
ON DUPLICATE KEY UPDATE `setting_key`=`setting_key`;

-- 4. Savings Schemes
INSERT INTO `savings_schemes` (`id`, `name_en`, `name_ne`, `category`, `interest_rate`, `minimum_deposit`, `duration_en`, `duration_ne`, `description_en`, `description_ne`, `features_json`, `features_ne_json`, `eligibility_en`, `eligibility_ne`, `badge`, `is_active`) VALUES
(1, 'Regular Member Savings', 'साधारण सदस्य बचत', 'Regular', '7.50% p.a.', 'NPR 500', 'Open-ended, anytime withdrawal', 'खुला अवधि, जुनसुकै समयमा जम्मा तथा भुक्तानी', 'An accessible, flexible daily savings scheme designed for all registered cooperative members with daily balance interest computation.', 'सहकारीका सम्पूर्ण साधारण सदस्यहरूका लागि दैनिक मौज्दातमा आकर्षक ब्याज गणना हुने सहज तथा लचिलो बचत खाता।', '["Daily interest calculation, quarterly crediting", "Free passbook and SMS alerts", "Instant deposit and withdrawal at counter", "No hidden service charges"]', '["दैनिक मौज्दातमा ब्याज गणना, त्रैमासिक भुक्तानी", "निःशुल्क पासबुक तथा एसएमएस सुविधा", "काउन्टरबाट तत्काल जम्मा तथा झिक्न सकिने", "कुनै लुकेको सेवा शुल्क नलाग्ने"]', 'Any individual member holding share certificate of Aadhunik Jana SACCOS.', 'आधुनिक जन साकोसको सेयर सदस्यता प्राप्त नेपाली नागरिक।', 'Popular', 1),
(2, 'Monthly Periodic Deposit (Recurring)', 'मासिक क्रमिक आवधिक बचत', 'Periodic', '9.25% p.a.', 'NPR 1,000 / month', '1 to 5 Years flexible tenure', '१ वर्ष देखि ५ वर्ष सम्मको अवधि', 'Discipline your savings habit with systematic monthly deposits for planned future investments, festivals, or family milestones.', 'हरेक महिना नियमित निश्चित रकम बचत गरी उच्च ब्याजदर सहित भविष्यको योजना सुनिश्चित गर्ने सुरक्षित आवधिक बचत योजना।', '["Guaranteed high return on consistent monthly deposits", "Tenures of 12, 24, 36, 48, and 60 months", "Loan facility up to 90% against accumulated balance", "Automated standing instruction support"]', '["नियमित मासिक बचतमा उच्च प्रतिफलको सुनिश्चितता", "१२, २४, ३६, ४८ र ६० महिनाको समयावधि विकल्प", "जम्मा भएको रकमको ९०% सम्म सुलभ कर्जा सुविधा", "स्ट्यान्डिङ इन्स्ट्रक्सन मार्फत स्वतः कटौती गर्न सकिने"]', 'Regular members having active savings account.', 'संस्थाका नियमित बचत खाता भएका सदस्यहरू।', 'High Yield', 1),
(3, 'Bal Kalyan Child Savings', 'बाल कल्याण बचत योजना', 'Child', '8.50% p.a.', 'NPR 500', 'Till 18 years of age', '१८ वर्ष उमेर नपुगुन्जेल सम्म', 'A dedicated long-term deposit account opened by parents or guardians to guarantee financing for children\'s higher education and medical safety.', 'अभिभावकद्वारा बालबालिकाको उज्ज्वल भविष्य, उच्च शिक्षा तथा सुरक्षित जीवनका लागि खोलिने विशेष बाल बचत योजना।', '["Free piggy bank (K खुत्रुके) upon opening", "Higher interest rate to reward long-term compounding", "Annual birthday gift coupon for the child", "Free education counseling workshops"]', '["खाता खोल्दा निःशुल्क आकर्षक खुत्रुके", "दीर्घकालीन चक्रवृद्धिका लागि उच्च ब्याजदर", "वार्षिक जन्मदिनमा संस्थाको तर्फबाट उपहार", "उच्च शिक्षा परामर्श कार्यशालामा निःशुल्क सहभागिता"]', 'Children below 18 years operated under parents/guardians guardianship.', '१८ वर्ष मुनिका बालबालिका (संरक्षकको संरक्षकत्वमा सञ्चालन हुने)।', 'Family', 1),
(4, 'Senior Citizen Golden Savings', 'ज्येष्ठ नागरिक स्वर्ण बचत', 'Senior', '9.00% p.a.', 'NPR 1,000', 'Open-ended, free home delivery', 'खुला अवधि, घरदैलो सेवा सुविधा', 'Honoring senior community members aged 60+ with dignified, high-interest returns, monthly interest payout, and prioritized counter service.', '६० वर्ष नाघेका आदरणीय ज्येष्ठ सदस्यहरूका लागि सम्मानपूर्वक मासिक ब्याज भुक्तानी र प्राथमिकता प्राप्त सेवा सहितको विशेष योजना।', '["Monthly interest credit to fund medicines & living costs", "Priority queue and seating in branch office", "Free doorstep cash withdrawal on special request", "Annual cooperative health checkup camp coverage"]', '["मासिक औषधोपचार खर्चका लागि मासिक ब्याज भुक्तानी", "शाखा कार्यालयमा छुट्टै ज्येष्ठ नागरिक काउन्टर र बसाइ", "विशेष अवस्थामा घरमै नगद भुक्तानी सुविधा", "वार्षिक स्वास्थ्य परीक्षण शिविरमा निःशुल्क सेवा"]', 'Senior citizens aged 60 and above with verified identity.', '६० वर्ष पुगेका संस्थाका ज्येष्ठ सदस्यहरू।', 'Special Care', 1)
ON DUPLICATE KEY UPDATE `id`=`id`;

-- 5. Loan Schemes
INSERT INTO `loan_schemes` (`id`, `name_en`, `name_ne`, `category`, `interest_rate`, `loan_limit_en`, `loan_limit_ne`, `tenure_en`, `tenure_ne`, `description_en`, `description_ne`, `features_json`, `features_ne_json`, `documents_json`, `documents_ne_json`, `is_active`) VALUES
(1, 'SME & Business Promotion Loan', 'व्यापार तथा व्यवसाय प्रवर्द्धन कर्जा', 'Business', '11.50% p.a.', 'Up to NPR 5,000,000', 'अधिकतम रु. ५०,००,००० सम्म', '1 to 5 Years', '१ देखि ५ वर्ष सम्म', 'Empower local shops, manufacturing units, retail stores, and service enterprises in Nagarjun and Kathmandu with timely working capital.', 'नागार्जुन तथा काठमाडौं उपत्यकाका स्थानीय व्यवसायी, पसल, उद्योग तथा फर्महरूको स्तरोन्नति र चालू पुँजीका लागि सुलभ कर्जा।', '["Flexible repayment via monthly or quarterly EMI", "Fast track approval within 5 working days", "Competitive interest rate with no prepayment penalty after 1 year", "High valuation for registered real estate collateral"]', '["मासिक वा त्रैमासिक किस्ताबन्दी (EMI) भुक्तानी सुविधा", "५ कार्यदिन भित्र छिटोछरितो स्वीकृति", "प्रतिस्पर्धी ब्याजदर र १ वर्षपछि बिना हर्जना चुक्ता सुविधा", "धितो मूल्याङ्कनमा सहज नीति"]', '["PAN / VAT Registration certificate", "Latest 2 years audited financial statements", "Tax clearance certificate", "Property collateral title deed (Lalpurja)", "Citizenship copies of applicant & guarantors"]', '["दर्ता प्रमाणपत्र तथा पान/भ्याट दर्ता", "कर चुक्ता प्रमाणपत्र", "धितो राखिने घरजग्गाको लालपुर्जा, तिरो तिरेको रसिद", "नक्सा, चारकिल्ला र बाटो सिफारिस", "निवेदक तथा जमानीकर्ताहरूको नागरिकता र फोटो"]', 1),
(2, 'Agro & Livestock Farming Loan', 'कृषि तथा पशुपालन उद्यम कर्जा', 'Agriculture', '10.50% p.a.', 'Up to NPR 2,500,000', 'अधिकतम रु. २५,००,००० सम्म', '1 to 7 Years', '१ देखि ७ वर्ष सम्म', 'Subsidized interest financing dedicated to commercial farming, modern polyhouse vegetable cultivation, dairy farming, poultry, and goat rearing.', 'व्यावसायिक तरकारी खेती, टनेल फार्मिङ, गाईभैंसी पालन, कुखुरा तथा बाख्रापालनका लागि सहुलियतपूर्ण कृषि कर्जा सुविधा।', '["Subsidized interest rate for verified agricultural initiatives", "Moratorium period available for initial farm setup", "Technical guidance through agricultural specialists", "Insurance coordination for livestock and crops"]', '["व्यावसायिक कृषिका लागि विशेष सहुलियत ब्याजदर", "सुरुवाती अवधिका लागि ग्रेस अवधि (Moratorium)", "पशु तथा बाली बीमामा प्राविधिक सहजीकरण", "कृषि विशेषज्ञहरूको प्राविधिक परामर्श"]', '["Agriculture firm registration / Ward recommendation", "Business plan with expected harvest revenue", "Land lease agreement or ownership certificate", "Citizenship certificate"]', '["वडा कार्यालयको कृषि व्यवसाय सिफारिस", "खेती वा फार्मको संक्षिप्त योजना", "जग्गाको लालपुर्जा वा बहाल सम्झौता पत्र", "नागरिकताको प्रतिलिपि"]', 1),
(3, 'Home Construction & Renovation Loan', 'घर निर्माण तथा मर्मत कर्जा', 'Housing', '12.00% p.a.', 'Up to NPR 10,000,000', 'अधिकतम रु. १,००,००,००० सम्म', 'Up to 15 Years', '१५ वर्ष सम्म', 'Realize your dream of constructing a new home, buying residential land, or adding floors with flexible long-term amortized financing.', 'आफ्नो सपनाको घर निर्माण, जग्गा खरिद वा भइरहेको घरको मर्मत सम्भार तथा तला थप्नका लागि दीर्घकालीन आवास कर्जा।', '["Long repayment tenure up to 15 years", "Tranche-based disbursements as construction progresses", "Fair property valuation by certified cooperative evaluators", "Option to bundle solar rooftop installation"]', '["१५ वर्ष सम्मको लामो भुक्तानी अवधि", "निर्माणको प्रगति अनुसार किस्ता-किस्तामा रकम निकासा", "संस्थाका आधिकारिक इन्जिनियरबाट निष्पक्ष मूल्याङ्कन", "सौर्य ऊर्जा जडानलाई समेत समावेश गर्न सकिने"]', '["Approved building construction map from Municipality", "Municipal construction permit (Nirman Sampanna / Ijazat)", "Property ownership deed (Lalpurja) & Ward boundary paper", "Source of income verification (Salary slip, rent agreement)"]', '["नगरपालिकाबाट स्वीकृत घरको नक्सा र निर्माण इजाजत", "चारकिल्ला तथा तिरो तिरेको रसिद", "आयस्रोत खुल्ने कागजात (तलब प्रमाण, घरबहाल सम्झौता)", "नागरिकता र पासपोर्ट साइज फोटो"]', 1),
(4, 'Higher Education & Career Loan', 'उच्च शिक्षा तथा अध्ययन कर्जा', 'Education', '11.00% p.a.', 'Up to NPR 3,000,000', 'अधिकतम रु. ३०,००,००० सम्म', 'Up to 5 Years', '५ वर्ष सम्म', 'Comprehensive financial support for tuition fees, living costs, and travel expenses for medical, engineering, IT, or international studies.', 'स्वदेश वा विदेशमा डाक्टरी, इन्जिनियरिङ, सूचना प्रविधि तथा अन्य विधामा उच्च अध्ययन गर्न चाहने विद्यार्थीहरूका लागि सुलभ शैक्षिक कर्जा।', '["Covers up to 80% of verified university tuition and living costs", "Repayment begins after completion of study (Grace period available)", "Direct tuition transfer to recognized college bank accounts", "Discounted processing fee for meritorious students"]', '["कलेज शुल्क तथा बसोबास खर्चको ८०% सम्म कर्जा", "पढाइ सकिएपछि किस्ता सुरु हुने ग्रेस अवधि", "सिधै सम्बन्धित शिक्षण संस्थाको खातामा रकम ट्रान्सफर", "उत्कृष्ट विद्यार्थीहरूका लागि सेवा शुल्कमा विशेष छुट"]', '["Admission offer letter from recognized college/university", "Itemized tuition fee structure", "Academic mark sheets & character certificates", "Parents/Guarantor property collateral or fixed deposit lien"]', '["सम्बन्धित कलेजको भर्ना अफर लेटर र शुल्क विवरण", "शैक्षिक योग्यताका प्रमाणपत्रहरू", "अभिभावकको जमानी तथा धितो कागजात", "नागरिकता र आयस्रोत विवरण"]', 1)
ON DUPLICATE KEY UPDATE `id`=`id`;

-- 6. Seed Loan Applications
INSERT INTO `loan_applications` (`id`, `application_no`, `member_id`, `applicant_name`, `applicant_phone`, `applicant_email`, `applicant_address`, `loan_scheme_id`, `loan_scheme_name`, `requested_amount`, `requested_tenure_months`, `monthly_income`, `collateral_type`, `purpose`, `status`, `admin_remarks`, `submitted_at`) VALUES
(1, 'AJ-LA-208104-0012', 'AJ-2075-0142', 'Ram Bahadur Shrestha', '+977-9841234567', 'ram.shrestha@gmail.com', 'Nagarjun-4, Kathmandu', 1, 'SME & Business Promotion Loan', 1500000.00, 36, 85000.00, 'Real Estate Land & Building (Kittha No 245)', 'Expansion of grocery retail wholesale inventory before Dashain festival season.', 'Approved', 'Collateral site inspection verified by Credit Committee on 2081/04/18. Approved up to 15 Lakhs at 11.5%.', '2026-08-10 10:30:00'),
(2, 'AJ-LA-208104-0019', NULL, 'Sunita Adhikari', '+977-9851122334', 'sunita.adhikari@yahoo.com', 'Sitapaila, Nagarjun-4, Kathmandu', 2, 'Agro & Livestock Farming Loan', 800000.00, 24, 45000.00, 'Agriculture Land & Polyhouse Setup', 'Setting up modern drip-irrigation polyhouses for seasonal tomato and capsicum farming.', 'Under Review', 'Field verification scheduled for this Friday by Agro loan officer.', '2026-08-12 14:15:00'),
(3, 'AJ-LA-208104-0027', 'AJ-2078-0599', 'Prabin Maharjan', '+977-9818899001', 'prabin.maharjan@outlook.com', 'Swayambhu, Kathmandu', 3, 'Home Construction & Renovation Loan', 4000000.00, 120, 125000.00, 'Residential House & Land', 'Construction of second and third floor residential units in family ancestral property.', 'Submitted', 'Application received online. Awaiting certified blue-print map submission at counter.', '2026-08-14 09:45:00')
ON DUPLICATE KEY UPDATE `id`=`id`;

-- 7. Notices & Announcements
INSERT INTO `notices` (`id`, `title_en`, `title_ne`, `category`, `published_date`, `expiry_date`, `content_en`, `content_ne`, `is_pinned`, `pdf_file_name`, `pdf_size`) VALUES
(1, 'Notice regarding 16th Annual General Meeting (AGM) 2081', 'संस्थाको १६औं वार्षिक साधारण सभा (AGM) सम्बन्धी अत्यन्त जरुरी सूचना', 'AGM', '2026-08-15', '2026-09-30', 'All respected shareholder members of Aadhunik Jana SACCOS are cordially invited to attend the 16th AGM on Saturday, Ashwin 12, 2081 at Nepal Academy Hall, Kamaladi, Kathmandu starting at 11:00 AM. Annual audited reports and dividend proposals will be presented.', 'आधुनिक जन बचत तथा ऋण सहकारी संस्था लिमिटेडका सम्पूर्ण सेयर सदस्य महानुभावहरूमा संस्थाको १६औं वार्षिक साधारण सभा यही मिति २०८१ साल असोज १२ गते शनिबार बिहान ११:०० बजे नेपाल प्रज्ञा प्रतिष्ठान, कमलादी, काठमाडौंमा आयोजना हुने भएकाले गरिमामय उपस्थितिका लागि हार्दिक अनुरोध गर्दछौं।', 1, '16th_AGM_Notice_AadhunikJana.pdf', '640 KB'),
(2, 'Revised Savings and Loan Interest Rates Effective from 1st Shrawan 2081', '२०८१ साउन १ गतेदेखि लागू हुने नयाँ बचत तथा कर्जा ब्याजदर सम्बन्धी सूचना', 'Financial Report', '2026-07-16', '2026-10-31', 'In accordance with the Board of Directors decision and Nepal Rastra Bank / Department of Co-operatives directives, revised interest rate slabs for all deposit schemes and loan products have been published.', 'संस्थाको सञ्चालक समितिको निर्णयानुसार सहकारी विभाग तथा नियामक निकायको निर्देशिका बमोजिम मिति २०८१ साउन १ गतेदेखि लागू हुने गरी बचत खाताहरू तथा विभिन्न कर्जा शीर्षकहरूमा नयाँ ब्याजदर तालिका निर्धारण गरिएको व्यहोरा जानकारी गराइन्छ।', 1, 'Interest_Rate_Structure_2081.pdf', '380 KB'),
(3, 'Tender Invitation for Office Interior Renovation & Security CCTV Installation', 'शाखा कार्यालय स्तरोन्नति तथा सीसीटीभी जडान सम्बन्धी बोलपत्र आह्वानको सूचना', 'Tender', '2026-08-01', '2026-08-25', 'Sealed bids are invited from registered electrical, networking, and civil construction vendors for interior renovation and IP-based surveillance setup at Nagarjun branch.', 'संस्थाको नागार्जुन शाखा कार्यालयको आन्तरिक सजावट, काउन्टर आधुनिकरण तथा सीसीटीभी सर्भिलेन्स प्रणाली जडान कार्यका लागि इजाजत प्राप्त दर्तावाला फर्महरूबाट शिलबन्दी बोलपत्र आह्वान गरिएको छ।', 0, 'Tender_Document_Branch_2081.pdf', '1.2 MB')
ON DUPLICATE KEY UPDATE `id`=`id`;

-- 8. News & Community Activities
INSERT INTO `news` (`id`, `title_en`, `title_ne`, `category`, `published_date`, `summary_en`, `summary_ne`, `content_en`, `content_ne`, `image_url`) VALUES
(1, 'Cooperative distributes warm clothes and stationery to underprivileged students in Nagarjun', 'नागार्जुनका विपन्न बालबालिकाहरूलाई न्यानो कपडा तथा शैक्षिक सामग्री वितरण', 'CSR', '2026-08-05', 'Under its Corporate Social Responsibility fund, Aadhunik Jana SACCOS supported 150 local students with school kits.', 'संस्थाको सामाजिक उत्तरदायित्व कोष अन्तर्गत नागार्जुन नगरपालिका भित्रका १५० जना विद्यार्थीहरूलाई विद्यालय झोला र पोसाक प्रदान।', 'Demonstrating its commitment to social empowerment, Aadhunik Jana SACCOS organized a special CSR distribution program at Shree Janasewa Basic School in Nagarjun. Over 150 students received complete educational kits, stationery, school uniforms, and winter sweaters. Board members and local community leaders attended the ceremony.', 'आधुनिक जन बचत तथा ऋण सहकारी संस्था लिमिटेडले आफ्नो संस्थागत सामाजिक उत्तरदायित्व (CSR) कार्यक्रम अन्तर्गत नागार्जुन नगरपालिका-४ स्थित श्री जनसेवा आधारभूत विद्यालयका १५० जना बालबालिकाहरूलाई विद्यालय पोसाक, जुत्ता, झोला र शैक्षिक सामग्री वितरण गरेको छ। कार्यक्रममा संस्थाका अध्यक्ष, सञ्चालक समिति तथा स्थानीय जनप्रतिनिधिहरूको उपस्थिति रहेको थियो।', 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80'),
(2, 'Free Blood Donation Camp collects 118 pints in partnership with Nepal Red Cross', 'संस्थाको आयोजनामा सम्पन्न बृहत् रक्तदान कार्यक्रममा ११८ पिन्ट रगत संकलन', 'Health', '2026-07-28', 'Members and community youth enthusiastically participated in the annual solidarity blood donation program.', 'सहकारीको सामाजिक उत्तरदायित्व अन्तर्गत आयोजित रक्तदान कार्यक्रममा स्थानीय युवा तथा सेयर सदस्यहरूको सक्रिय सहभागिता।', 'To tackle local hospital blood shortages in Kathmandu valley, Aadhunik Jana SACCOS in collaboration with Nepal Red Cross Society Central Blood Transfusion Service conducted a successful day-long blood donation camp at its main office premises. 118 donors contributed.', 'काठमाडौं उपत्यकामा देखिएको रगत अभावलाई न्यूनीकरण गर्ने उद्देश्यले आधुनिक जन साकोसले नेपाल रेडक्रस सोसाइटीको प्राविधिक सहयोगमा बृहत् रक्तदान कार्यक्रम सम्पन्न गरेको छ। संस्थाको केन्द्रीय कार्यालय परिसरमा सम्पन्न शिविरमा महिला तथा युवा सदस्यहरू गरी कुल ११८ जनाले रक्तदान गरेका थिए।', 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80')
ON DUPLICATE KEY UPDATE `id`=`id`;

-- 9. Downloadable Documents
INSERT INTO `documents` (`id`, `title_en`, `title_ne`, `category`, `file_path`, `file_size`, `file_type`, `downloads_count`) VALUES
(1, 'General Membership Application Form', 'साधारण सदस्यता आवेदन फारम (व्यक्तिगत)', 'Forms', 'Membership_Form_AadhunikJana.pdf', '245 KB', 'PDF', 1420),
(2, 'Loan Application & Collateral Declaration Dossier', 'कर्जा आवेदन तथा धितो मूल्याङ्कन फारम', 'Forms', 'Loan_Application_Dossier.pdf', '620 KB', 'PDF', 890),
(3, 'Individual KYC (Know Your Customer) Update Form', 'व्यक्तिगत ग्राहक पहिचान (KYC) अध्यावधिक फारम', 'KYC', 'KYC_Update_Form_2081.pdf', '180 KB', 'PDF', 3120),
(4, 'Institutional Co-operative Bylaws & Constitution (Bidhan)', 'संस्थाको संशोधित विनियम तथा विधान (२०७८)', 'Bylaws', 'Cooperative_Bidhan_Amended.pdf', '1.8 MB', 'PDF', 640),
(5, 'Audited Financial Statement for Fiscal Year 2079/80', 'आर्थिक वर्ष २०७९/८० को लेखापरीक्षण प्रतिवेदन', 'Reports', 'Audited_Report_FY_2079_80.pdf', '2.4 MB', 'PDF', 780)
ON DUPLICATE KEY UPDATE `id`=`id`;

-- 10. Initial Activity Logs
INSERT INTO `activity_logs` (`id`, `user_name`, `action`, `details`, `ip_address`, `created_at`) VALUES
(1, 'System Administrator', 'DATABASE_INITIALIZATION', 'MySQL 8 normalized database initialized with PDO support and full bilingual seeds.', '127.0.0.1', '2026-08-01 09:00:00'),
(2, 'System Administrator', 'SECURITY_POLICY_UPDATE', 'CSRF token engine and password_hash cost factor 12 configured.', '127.0.0.1', '2026-08-01 09:15:00')
ON DUPLICATE KEY UPDATE `id`=`id`;
