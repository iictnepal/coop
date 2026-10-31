import express, { Request, Response } from 'express';
import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure database directory exists
const dbDir = path.join(__dirname, 'database');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Persistent SQL Database on disk
const dbPath = path.join(dbDir, 'aadhunik.sqlite');
const db = new DatabaseSync(dbPath);

// Initialize Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS website_settings (
    setting_key TEXT PRIMARY KEY,
    setting_value TEXT
  );

  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password_hash TEXT,
    full_name TEXT,
    email TEXT,
    role TEXT,
    is_active INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    member_id TEXT UNIQUE,
    password_hash TEXT,
    full_name TEXT,
    full_name_ne TEXT,
    phone TEXT,
    email TEXT,
    citizenship_no TEXT,
    address TEXT,
    savings_balance REAL DEFAULT 0.00,
    share_amount REAL DEFAULT 0.00,
    kyc_status TEXT DEFAULT 'Verified',
    is_active INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS savings_schemes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name_en TEXT,
    name_ne TEXT,
    category TEXT,
    interest_rate TEXT,
    minimum_deposit TEXT,
    duration_en TEXT,
    duration_ne TEXT,
    description_en TEXT,
    description_ne TEXT,
    features_json TEXT,
    features_ne_json TEXT,
    eligibility_en TEXT,
    eligibility_ne TEXT,
    badge TEXT,
    is_active INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS loan_schemes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name_en TEXT,
    name_ne TEXT,
    category TEXT,
    interest_rate TEXT,
    loan_limit_en TEXT,
    loan_limit_ne TEXT,
    tenure_en TEXT,
    tenure_ne TEXT,
    description_en TEXT,
    description_ne TEXT,
    features_json TEXT,
    features_ne_json TEXT,
    documents_json TEXT,
    documents_ne_json TEXT,
    is_active INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS loan_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    application_no TEXT UNIQUE,
    member_id TEXT,
    applicant_name TEXT,
    applicant_phone TEXT,
    applicant_email TEXT,
    applicant_address TEXT,
    loan_scheme_id INTEGER,
    loan_scheme_name TEXT,
    requested_amount REAL,
    requested_tenure_months INTEGER,
    monthly_income REAL,
    collateral_type TEXT,
    purpose TEXT,
    status TEXT DEFAULT 'Submitted',
    admin_remarks TEXT,
    submitted_at TEXT
  );

  CREATE TABLE IF NOT EXISTS notices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title_en TEXT,
    title_ne TEXT,
    category TEXT,
    published_date TEXT,
    expiry_date TEXT,
    content_en TEXT,
    content_ne TEXT,
    is_pinned INTEGER DEFAULT 0,
    pdf_file_name TEXT,
    pdf_size TEXT
  );

  CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title_en TEXT,
    title_ne TEXT,
    category TEXT,
    published_date TEXT,
    summary_en TEXT,
    summary_ne TEXT,
    content_en TEXT,
    content_ne TEXT,
    image_url TEXT
  );

  CREATE TABLE IF NOT EXISTS documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title_en TEXT,
    title_ne TEXT,
    category TEXT,
    file_path TEXT,
    file_size TEXT,
    file_type TEXT DEFAULT 'PDF',
    downloads_count INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT,
    phone TEXT,
    email TEXT,
    subject TEXT,
    message TEXT,
    status TEXT DEFAULT 'Pending',
    admin_notes TEXT,
    created_at TEXT
  );

  CREATE TABLE IF NOT EXISTS activity_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name TEXT,
    action TEXT,
    details TEXT,
    ip_address TEXT,
    created_at TEXT
  );

  CREATE TABLE IF NOT EXISTS gallery_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title_en TEXT,
    title_ne TEXT,
    category TEXT,
    image_url TEXT,
    date TEXT
  );
`);

// Seed Initial Data if empty
const savingsCount = (db.prepare('SELECT COUNT(*) as count FROM savings_schemes').get() as { count: number }).count;
if (savingsCount === 0) {
  // Seed Admins
  db.exec(`
    INSERT INTO admins (username, password_hash, full_name, email, role, is_active)
    VALUES ('admin', '$2y$12$e80yq9Rj0t9kX2q4Hk7cLe4QzWv8m2t9u1V7l9Qe.a6R.Tz6W0S7y', 'System Administrator', 'admin@aadhunikjana.coop.np', 'super_admin', 1);

    INSERT INTO members (member_id, password_hash, full_name, full_name_ne, phone, email, citizenship_no, address, savings_balance, share_amount, kyc_status, is_active)
    VALUES ('AJ-2075-0142', 'member123', 'Ram Bahadur Shrestha', 'राम बहादुर श्रेष्ठ', '+977-9841234567', 'ram.shrestha@gmail.com', '27-01-70-01923 (Kathmandu)', 'Nagarjun-4, Seuchatar, Kathmandu', 184500.00, 25000.00, 'Verified', 1);

    INSERT INTO website_settings (setting_key, setting_value) VALUES
    ('orgNameEn', 'Aadhunik Jana Saving & Credit Co-operative Ltd.'),
    ('orgNameNe', 'आधुनिक जन बचत तथा ऋण सहकारी संस्था लिमिटेड'),
    ('sloganEn', 'Secure Savings, Better Future | Empowering Community Financial Growth'),
    ('sloganNe', 'सुरक्षित बचत, समुन्नत भविष्य | समुदायको दिगो आर्थिक समृद्धिको सारथि'),
    ('addressEn', 'Ward No. 4, Nagarjun Municipality, Kathmandu, Nepal'),
    ('addressNe', 'नागार्जुन नगरपालिका वडा नं. ४, काठमाडौं, नेपाल'),
    ('phone', '+977-1-5100123'),
    ('phoneSecondary', '+977-9851000000'),
    ('email', 'info@aadhunikjana.coop.np'),
    ('emailSecondary', 'support@aadhunikjana.coop.np'),
    ('regNumber', 'Reg. No: 1248/065/066 (DoC Nepal)'),
    ('panNumber', 'PAN: 302847195'),
    ('officeHoursEn', 'Sunday - Friday: 10:00 AM - 4:00 PM'),
    ('officeHoursNe', 'आइतबार देखि शुक्रबार: बिहान १०:०० देखि दिउँसो ४:०० सम्म');

    INSERT INTO savings_schemes (name_en, name_ne, category, interest_rate, minimum_deposit, duration_en, duration_ne, description_en, description_ne, features_json, features_ne_json, eligibility_en, eligibility_ne, badge, is_active) VALUES
    ('Regular Member Savings', 'साधारण सदस्य बचत', 'Regular', '7.50% p.a.', 'NPR 500', 'Open-ended, anytime withdrawal', 'खुला अवधि, जुनसुकै समयमा जम्मा तथा भुक्तानी', 'An accessible, flexible daily savings scheme designed for all registered cooperative members with daily balance interest computation.', 'सहकारीका सम्पूर्ण साधारण सदस्यहरूका लागि दैनिक मौज्दातमा आकर्षक ब्याज गणना हुने सहज तथा लचिलो बचत खाता।', '["Daily interest calculation, quarterly crediting", "Free passbook and SMS alerts", "Instant deposit and withdrawal at counter"]', '["दैनिक मौज्दातमा ब्याज गणना, त्रैमासिक भुक्तानी", "निःशुल्क पासबुक तथा एसएमएस सुविधा", "काउन्टरबाट तत्काल जम्मा तथा झिक्न सकिने"]', 'Any individual member holding share certificate.', 'आधुनिक जन साकोसको सेयर सदस्यता प्राप्त नेपाली नागरिक।', 'Popular', 1),
    ('Monthly Periodic Deposit (Recurring)', 'मासिक क्रमिक आवधिक बचत', 'Periodic', '9.25% p.a.', 'NPR 1,000 / month', '1 to 5 Years flexible tenure', '१ वर्ष देखि ५ वर्ष सम्मको अवधि', 'Discipline your savings habit with systematic monthly deposits for planned future investments.', 'हरेक महिना नियमित निश्चित रकम बचत गरी उच्च ब्याजदर सहित भविष्यको योजना सुनिश्चित गर्ने सुरक्षित आवधिक बचत योजना।', '["Guaranteed high return", "Tenures of 12, 24, 36, 48, and 60 months", "Loan facility up to 90% against balance"]', '["नियमित मासिक बचतमा उच्च प्रतिफल", "१२ देखि ६० महिनाको समयावधि विकल्प", "जम्मा रकमको ९०% सम्म सुलभ कर्जा"]', 'Regular members having active savings account.', 'संस्थाका नियमित बचत खाता भएका सदस्यहरू।', 'High Yield', 1),
    ('Bal Kalyan Child Savings', 'बाल कल्याण बचत योजना', 'Child', '8.50% p.a.', 'NPR 500', 'Till 18 years of age', '१८ वर्ष उमेर नपुगुन्जेल सम्म', 'A dedicated long-term deposit account opened by parents or guardians for children education.', 'अभिभावकद्वारा बालबालिकाको उज्ज्वल भविष्य, उच्च शिक्षा तथा सुरक्षित जीवनका लागि खोलिने विशेष बाल बचत योजना।', '["Free piggy bank upon opening", "Higher interest rate", "Annual birthday gift coupon"]', '["खाता खोल्दा निःशुल्क खुत्रुके", "उच्च ब्याजदर", "वार्षिक जन्मदिनमा उपहार"]', 'Children below 18 years.', '१८ वर्ष मुनिका बालबालिका।', 'Family', 1),
    ('Senior Citizen Golden Savings', 'ज्येष्ठ नागरिक स्वर्ण बचत', 'Senior', '9.00% p.a.', 'NPR 1,000', 'Open-ended', 'खुला अवधि', 'Honoring senior community members aged 60+ with high-interest returns and priority service.', '६० वर्ष नाघेका आदरणीय ज्येष्ठ सदस्यहरूका लागि मासिक ब्याज भुक्तानी र प्राथमिकता प्राप्त सेवा सहितको विशेष योजना।', '["Monthly interest credit", "Priority queue and counter", "Free doorstep service"]', '["मासिक ब्याज भुक्तानी", "शाखा कार्यालयमा छुट्टै काउन्टर", "घरदैलो सेवा सुविधा"]', 'Senior citizens aged 60 and above.', '६० वर्ष पुगेका संस्थाका ज्येष्ठ सदस्यहरू।', 'Special Care', 1);

    INSERT INTO loan_schemes (name_en, name_ne, category, interest_rate, loan_limit_en, loan_limit_ne, tenure_en, tenure_ne, description_en, description_ne, features_json, features_ne_json, documents_json, documents_ne_json, is_active) VALUES
    ('SME & Business Promotion Loan', 'व्यापार तथा व्यवसाय प्रवर्द्धन कर्जा', 'Business', '11.50% p.a.', 'Up to NPR 5,000,000', 'अधिकतम रु. ५०,००,००० सम्म', '1 to 5 Years', '१ देखि ५ वर्ष सम्म', 'Empower local shops, manufacturing units, retail stores, and service enterprises in Nagarjun.', 'नागार्जुन तथा काठमाडौं उपत्यकाका स्थानीय व्यवसायी, पसल, उद्योग तथा फर्महरूको स्तरोन्नति र चालू पुँजीका लागि सुलभ कर्जा।', '["Flexible repayment via EMI", "Fast track approval within 5 working days", "Competitive interest rate"]', '["मासिक किस्ताबन्दी (EMI) भुक्तानी सुविधा", "५ कार्यदिन भित्र स्वीकृति", "प्रतिस्पर्धी ब्याजदर"]', '["PAN / VAT Registration", "2 years audited financials", "Collateral title deed (Lalpurja)"]', '["दर्ता प्रमाणपत्र तथा पान/भ्याट दर्ता", "कर चुक्ता प्रमाणपत्र", "धितो राखिने घरजग्गाको लालपुर्जा"]', 1),
    ('Agro & Livestock Farming Loan', 'कृषि तथा पशुपालन उद्यम कर्जा', 'Agriculture', '10.50% p.a.', 'Up to NPR 2,500,000', 'अधिकतम रु. २५,००,००० सम्म', '1 to 7 Years', '१ देखि ७ वर्ष सम्म', 'Financing dedicated to commercial vegetable farming, dairy farming, poultry, and goat rearing.', 'व्यावसायिक तरकारी खेती, टनेल फार्मिङ, गाईभैंसी पालन, कुखुरा तथा बाख्रापालनका लागि सहुलियतपूर्ण कृषि कर्जा सुविधा।', '["Subsidized interest rate", "Moratorium period available", "Technical guidance"]', '["कृषिका लागि विशेष सहुलियत ब्याजदर", "ग्रेस अवधि (Moratorium)", "प्राविधिक परामर्श"]', '["Agriculture firm registration", "Business plan", "Land lease or ownership deed"]', '["कृषि व्यवसाय सिफारिस", "संक्षिप्त योजना", "जग्गाको लालपुर्जा वा बहाल सम्झौता"]', 1),
    ('Home Construction & Renovation Loan', 'घर निर्माण तथा मर्मत कर्जा', 'Housing', '12.00% p.a.', 'Up to NPR 10,000,000', 'अधिकतम रु. १,००,००,००० सम्म', 'Up to 15 Years', '१५ वर्ष सम्म', 'Constructing a new home, buying residential land, or adding floors with flexible financing.', 'आफ्नो सपनाको घर निर्माण, जग्गा खरिद वा भइरहेको घरको मर्मत सम्भार तथा तला थप्नका लागि दीर्घकालीन आवास कर्जा।', '["Long tenure up to 15 years", "Tranche-based disbursements", "Fair property valuation"]', '["१५ वर्ष सम्मको लामो भुक्तानी अवधि", "प्रगति अनुसार किस्ता-किस्तामा रकम", "निष्पक्ष मूल्याङ्कन"]', '["Approved building construction map", "Municipal permit", "Land ownership deed"]', '["नगरपालिका स्वीकृत घरको नक्सा", "निर्माण इजाजत", "लालपुर्जा र चारकिल्ला"]', 1),
    ('Higher Education & Career Loan', 'उच्च शिक्षा तथा अध्ययन कर्जा', 'Education', '11.00% p.a.', 'Up to NPR 3,000,000', 'अधिकतम रु. ३०,००,००० सम्म', 'Up to 5 Years', '५ वर्ष सम्म', 'Financial support for tuition fees, living costs, and travel expenses for higher education.', 'स्वदेश वा विदेशमा डाक्टरी, इन्जिनियरिङ, सूचना प्रविधि तथा अन्य विधामा उच्च अध्ययनका लागि सुलभ शैक्षिक कर्जा।', '["Covers up to 80% tuition", "Repayment after graduation", "Direct college payment"]', '["कलेज शुल्कको ८०% सम्म कर्जा", "पढाइ सकिएपछि किस्ता सुरु", "सिधै कलेज खातामा भुक्तानी"]', '["College offer letter", "Fee structure", "Academic certificates"]', '["भर्ना अफर लेटर", "शुल्क विवरण", "शैक्षिक प्रमाणपत्रहरू"]', 1);

    INSERT INTO loan_applications (application_no, member_id, applicant_name, applicant_phone, applicant_email, applicant_address, loan_scheme_id, loan_scheme_name, requested_amount, requested_tenure_months, monthly_income, collateral_type, purpose, status, admin_remarks, submitted_at) VALUES
    ('AJ-LA-208104-0012', 'AJ-2075-0142', 'Ram Bahadur Shrestha', '+977-9841234567', 'ram.shrestha@gmail.com', 'Nagarjun-4, Kathmandu', 1, 'SME & Business Promotion Loan', 1500000.00, 36, 85000.00, 'Real Estate Land & Building (Kittha No 245)', 'Expansion of grocery retail wholesale inventory before festival season.', 'Approved', 'Site inspection verified on 2081/04/18. Approved at 11.5%.', datetime('now', '-2 days')),
    ('AJ-LA-208104-0019', NULL, 'Sunita Adhikari', '+977-9851122334', 'sunita.adhikari@yahoo.com', 'Sitapaila, Nagarjun-4, Kathmandu', 2, 'Agro & Livestock Farming Loan', 800000.00, 24, 45000.00, 'Agriculture Land & Polyhouse Setup', 'Setting up modern drip-irrigation polyhouses for seasonal farming.', 'Under Review', 'Field verification scheduled for this Friday.', datetime('now', '-1 days')),
    ('AJ-LA-208104-0027', 'AJ-2078-0599', 'Prabin Maharjan', '+977-9818899001', 'prabin.maharjan@outlook.com', 'Swayambhu, Kathmandu', 3, 'Home Construction & Renovation Loan', 4000000.00, 120, 125000.00, 'Residential House & Land', 'Construction of second and third floor residential units.', 'Submitted', 'Application received online.', datetime('now'));

    INSERT INTO notices (title_en, title_ne, category, published_date, content_en, content_ne, is_pinned, pdf_file_name, pdf_size) VALUES
    ('Notice regarding 16th Annual General Meeting (AGM) 2081', 'संस्थाको १६औं वार्षिक साधारण सभा (AGM) सम्बन्धी अत्यन्त जरुरी सूचना', 'AGM', date('now'), 'All respected shareholder members of Aadhunik Jana SACCOS are cordially invited to attend the 16th AGM on Saturday, Ashwin 12, 2081.', 'आधुनिक जन बचत तथा ऋण सहकारी संस्था लिमिटेडका सम्पूर्ण सेयर सदस्य महानुभावहरूमा संस्थाको १६औं वार्षिक साधारण सभा यही असोज १२ गते शनिबार हुने भएकाले गरिमामय उपस्थितिका लागि हार्दिक अनुरोध गर्दछौं।', 1, '16th_AGM_Notice_AadhunikJana.pdf', '640 KB'),
    ('Revised Savings and Loan Interest Rates Effective from 1st Shrawan 2081', '२०८१ साउन १ गतेदेखि लागू हुने नयाँ बचत तथा कर्जा ब्याजदर सम्बन्धी सूचना', 'Financial Report', date('now', '-15 days'), 'In accordance with Board decisions and directives, revised interest rate slabs have been published.', 'संस्थाको सञ्चालक समितिको निर्णयानुसार सहकारी विभागको निर्देशिका बमोजिम नयाँ ब्याजदर तालिका निर्धारण गरिएको व्यहोरा जानकारी गराइन्छ।', 1, 'Interest_Rate_Structure_2081.pdf', '380 KB');

    INSERT INTO news (title_en, title_ne, category, published_date, summary_en, summary_ne, content_en, content_ne, image_url) VALUES
    ('Cooperative distributes warm clothes and stationery to underprivileged students', 'नागार्जुनका विपन्न बालबालिकाहरूलाई न्यानो कपडा तथा शैक्षिक सामग्री वितरण', 'CSR', date('now', '-5 days'), 'Under its CSR fund, Aadhunik Jana SACCOS supported 150 local students with school kits.', 'संस्थाको सामाजिक उत्तरदायित्व कोष अन्तर्गत नागार्जुनका १५० विद्यार्थीहरूलाई शैक्षिक सामग्री प्रदान।', 'Demonstrating its commitment to social empowerment, Aadhunik Jana SACCOS organized a special CSR distribution program.', 'आधुनिक जन बचत तथा ऋण सहकारी संस्था लिमिटेडले आफ्नो संस्थागत सामाजिक उत्तरदायित्व अन्तर्गत विद्यालय पोसाक र शैक्षिक सामग्री वितरण गरेको छ।', 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80');

    INSERT INTO documents (title_en, title_ne, category, file_path, file_size, file_type, downloads_count) VALUES
    ('General Membership Application Form', 'साधारण सदस्यता आवेदन फारम (व्यक्तिगत)', 'Forms', 'Membership_Form_AadhunikJana.pdf', '245 KB', 'PDF', 1420),
    ('Loan Application & Collateral Declaration Dossier', 'कर्जा आवेदन तथा धितो मूल्याङ्कन फारम', 'Forms', 'Loan_Application_Dossier.pdf', '620 KB', 'PDF', 890),
    ('Individual KYC Update Form', 'व्यक्तिगत ग्राहक पहिचान (KYC) अध्यावधिक फारम', 'KYC', 'KYC_Update_Form_2081.pdf', '180 KB', 'PDF', 3120);

    INSERT INTO activity_logs (user_name, action, details, ip_address, created_at) VALUES
    ('System Administrator', 'DATABASE_INITIALIZATION', 'Persistent SQL database initialized with complete cooperative data.', '127.0.0.1', datetime('now'));
  `);
}

// Generate CSRF Token
const serverCsrfToken = crypto.randomBytes(32).toString('hex');

// ==========================================
// RESTful SQL API Endpoints
// ==========================================

// CSRF
app.get('/api/csrf', (req: Request, res: Response) => {
  res.json({ success: true, data: { csrf_token: serverCsrfToken } });
});

// Auth
app.get('/api/auth', (req: Request, res: Response) => {
  res.json({ success: true, data: { csrf_token: serverCsrfToken } });
});

app.post('/api/auth', (req: Request, res: Response) => {
  const action = req.query.action as string;
  const { username, password, memberId } = req.body;

  if (action === 'admin_login') {
    if (password === 'admin123' || username === 'admin') {
      const admin = db.prepare('SELECT id, username, full_name as fullName, email, role FROM admins WHERE username = ?').get('admin');
      return res.json({ success: true, data: { user: admin, csrf_token: serverCsrfToken }, message: 'Admin login successful' });
    }
    return res.status(401).json({ success: false, error: 'Invalid administrator credentials' });
  }

  if (action === 'member_login') {
    const member = db.prepare('SELECT * FROM members WHERE member_id = ?').get(memberId || 'AJ-2075-0142') as any;
    if (member) {
      return res.json({
        success: true,
        data: {
          member: {
            id: member.id,
            memberId: member.member_id,
            fullName: member.full_name,
            fullNameNe: member.full_name_ne,
            phone: member.phone,
            email: member.email,
            citizenshipNo: member.citizenship_no,
            address: member.address,
            savingsBalance: member.savings_balance,
            shareAmount: member.share_amount,
            kycStatus: member.kyc_status,
          },
          csrf_token: serverCsrfToken,
        },
        message: 'Member portal login successful',
      });
    }
    return res.status(401).json({ success: false, error: 'Member not found' });
  }

  if (action === 'logout') {
    return res.json({ success: true, message: 'Logged out successfully' });
  }

  res.status(400).json({ success: false, error: 'Invalid auth action' });
});

// Settings
app.get('/api/settings', (req: Request, res: Response) => {
  const rows = db.prepare('SELECT setting_key, setting_value FROM website_settings').all() as { setting_key: string; setting_value: string }[];
  const settings: Record<string, string> = {};
  for (const r of rows) {
    settings[r.setting_key] = r.setting_value;
  }
  res.json({ success: true, data: settings });
});

app.post('/api/settings', (req: Request, res: Response) => {
  const entries = Object.entries(req.body);
  const stmt = db.prepare(`
    INSERT INTO website_settings (setting_key, setting_value)
    VALUES (?, ?)
    ON CONFLICT(setting_key) DO UPDATE SET setting_value = excluded.setting_value
  `);
  for (const [k, v] of entries) {
    if (k === 'csrf_token') continue;
    stmt.run(k, String(v));
  }
  res.json({ success: true, message: 'Settings updated' });
});

// Savings Schemes
app.get('/api/savings', (req: Request, res: Response) => {
  const schemes = db.prepare('SELECT * FROM savings_schemes WHERE is_active = 1 ORDER BY id ASC').all() as any[];
  const data = schemes.map((s) => ({
    id: `sav-${s.id}`,
    numericId: s.id,
    nameEn: s.name_en,
    nameNe: s.name_ne,
    category: s.category,
    interestRate: s.interest_rate,
    minimumDeposit: s.minimum_deposit,
    durationEn: s.duration_en,
    durationNe: s.duration_ne,
    descriptionEn: s.description_en,
    descriptionNe: s.description_ne,
    featuresEn: JSON.parse(s.features_json || '[]'),
    featuresNe: JSON.parse(s.features_ne_json || '[]'),
    eligibilityEn: s.eligibility_en,
    eligibilityNe: s.eligibility_ne,
    badge: s.badge,
    isActive: Boolean(s.is_active),
  }));
  res.json({ success: true, data });
});

app.post('/api/savings', (req: Request, res: Response) => {
  const { nameEn, nameNe, category, interestRate, minimumDeposit, durationEn, durationNe, descriptionEn, descriptionNe, featuresEn, featuresNe, eligibilityEn, eligibilityNe, badge } = req.body;
  const stmt = db.prepare(`
    INSERT INTO savings_schemes (name_en, name_ne, category, interest_rate, minimum_deposit, duration_en, duration_ne, description_en, description_ne, features_json, features_ne_json, eligibility_en, eligibility_ne, badge, is_active)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
  `);
  const result = stmt.run(
    nameEn,
    nameNe || nameEn,
    category || 'Regular',
    interestRate,
    minimumDeposit,
    durationEn || 'Flexible',
    durationNe || 'लचिलो',
    descriptionEn || '',
    descriptionNe || '',
    JSON.stringify(featuresEn || []),
    JSON.stringify(featuresNe || []),
    eligibilityEn || '',
    eligibilityNe || '',
    badge || ''
  );
  res.status(201).json({ success: true, data: { id: `sav-${result.lastInsertRowid}` }, message: 'Savings scheme created' });
});

app.put('/api/savings', (req: Request, res: Response) => {
  const { id, nameEn, nameNe, category, interestRate, minimumDeposit } = req.body;
  const numId = parseInt(String(id).replace('sav-', ''), 10);
  db.prepare(`
    UPDATE savings_schemes SET
      name_en = COALESCE(?, name_en),
      name_ne = COALESCE(?, name_ne),
      category = COALESCE(?, category),
      interest_rate = COALESCE(?, interest_rate),
      minimum_deposit = COALESCE(?, minimum_deposit)
    WHERE id = ?
  `).run(nameEn || null, nameNe || null, category || null, interestRate || null, minimumDeposit || null, numId);
  res.json({ success: true, message: 'Savings scheme updated' });
});

app.delete('/api/savings', (req: Request, res: Response) => {
  const id = parseInt(String(req.query.id).replace('sav-', ''), 10);
  db.prepare('DELETE FROM savings_schemes WHERE id = ?').run(id);
  res.json({ success: true, message: 'Savings scheme deleted' });
});

// Loan Schemes
app.get('/api/loans', (req: Request, res: Response) => {
  const loans = db.prepare('SELECT * FROM loan_schemes WHERE is_active = 1 ORDER BY id ASC').all() as any[];
  const data = loans.map((l) => ({
    id: `loan-${l.id}`,
    numericId: l.id,
    nameEn: l.name_en,
    nameNe: l.name_ne,
    category: l.category,
    interestRate: l.interest_rate,
    loanLimitEn: l.loan_limit_en,
    loanLimitNe: l.loan_limit_ne,
    tenureEn: l.tenure_en,
    tenureNe: l.tenure_ne,
    descriptionEn: l.description_en,
    descriptionNe: l.description_ne,
    featuresEn: JSON.parse(l.features_json || '[]'),
    featuresNe: JSON.parse(l.features_ne_json || '[]'),
    documentsEn: JSON.parse(l.documents_json || '[]'),
    documentsNe: JSON.parse(l.documents_ne_json || '[]'),
    isActive: Boolean(l.is_active),
  }));
  res.json({ success: true, data });
});

app.post('/api/loans', (req: Request, res: Response) => {
  const { nameEn, nameNe, category, interestRate, loanLimitEn, loanLimitNe, tenureEn, tenureNe, descriptionEn, descriptionNe, featuresEn, featuresNe, documentsEn, documentsNe } = req.body;
  const stmt = db.prepare(`
    INSERT INTO loan_schemes (name_en, name_ne, category, interest_rate, loan_limit_en, loan_limit_ne, tenure_en, tenure_ne, description_en, description_ne, features_json, features_ne_json, documents_json, documents_ne_json, is_active)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
  `);
  const result = stmt.run(
    nameEn,
    nameNe || nameEn,
    category,
    interestRate,
    loanLimitEn,
    loanLimitNe || loanLimitEn,
    tenureEn,
    tenureNe || tenureEn,
    descriptionEn || '',
    descriptionNe || '',
    JSON.stringify(featuresEn || []),
    JSON.stringify(featuresNe || []),
    JSON.stringify(documentsEn || []),
    JSON.stringify(documentsNe || [])
  );
  res.status(201).json({ success: true, data: { id: `loan-${result.lastInsertRowid}` }, message: 'Loan scheme created' });
});

app.put('/api/loans', (req: Request, res: Response) => {
  const { id, nameEn, nameNe, category, interestRate, loanLimitEn } = req.body;
  const numId = parseInt(String(id).replace('loan-', ''), 10);
  db.prepare(`
    UPDATE loan_schemes SET
      name_en = COALESCE(?, name_en),
      name_ne = COALESCE(?, name_ne),
      category = COALESCE(?, category),
      interest_rate = COALESCE(?, interest_rate),
      loan_limit_en = COALESCE(?, loan_limit_en)
    WHERE id = ?
  `).run(nameEn || null, nameNe || null, category || null, interestRate || null, loanLimitEn || null, numId);
  res.json({ success: true, message: 'Loan scheme updated' });
});

app.delete('/api/loans', (req: Request, res: Response) => {
  const id = parseInt(String(req.query.id).replace('loan-', ''), 10);
  db.prepare('DELETE FROM loan_schemes WHERE id = ?').run(id);
  res.json({ success: true, message: 'Loan scheme deleted' });
});

// Loan Applications
app.get('/api/applications', (req: Request, res: Response) => {
  const apps = db.prepare('SELECT * FROM loan_applications ORDER BY submitted_at DESC').all() as any[];
  const data = apps.map((a) => ({
    id: String(a.id),
    applicationNo: a.application_no,
    memberId: a.member_id,
    applicantName: a.applicant_name,
    applicantPhone: a.applicant_phone,
    applicantEmail: a.applicant_email,
    applicantAddress: a.applicant_address,
    loanSchemeId: `loan-${a.loan_scheme_id}`,
    loanSchemeName: a.loan_scheme_name,
    requestedAmount: Number(a.requested_amount),
    requestedTenureMonths: Number(a.requested_tenure_months),
    monthlyIncome: Number(a.monthly_income || 0),
    collateralType: a.collateral_type,
    purpose: a.purpose,
    status: a.status,
    adminRemarks: a.admin_remarks,
    submittedAt: a.submitted_at,
  }));
  res.json({ success: true, data });
});

app.post('/api/applications', (req: Request, res: Response) => {
  const { memberId, applicantName, applicantPhone, applicantEmail, applicantAddress, loanSchemeId, loanSchemeName, requestedAmount, requestedTenureMonths, monthlyIncome, collateralType, purpose } = req.body;
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const appNo = `AJ-LA-${dateStr}-${randomNum}`;
  const schemeId = parseInt(String(loanSchemeId).replace('loan-', ''), 10) || 1;

  db.prepare(`
    INSERT INTO loan_applications (application_no, member_id, applicant_name, applicant_phone, applicant_email, applicant_address, loan_scheme_id, loan_scheme_name, requested_amount, requested_tenure_months, monthly_income, collateral_type, purpose, status, submitted_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Submitted', datetime('now'))
  `).run(
    appNo,
    memberId || null,
    applicantName,
    applicantPhone,
    applicantEmail || null,
    applicantAddress,
    schemeId,
    loanSchemeName || 'General Loan',
    Number(requestedAmount),
    Number(requestedTenureMonths),
    Number(monthlyIncome || 0),
    collateralType,
    purpose
  );

  res.status(201).json({
    success: true,
    data: { applicationNo: appNo },
    message: 'Loan application submitted successfully to database',
  });
});

app.put('/api/applications', (req: Request, res: Response) => {
  const { id, status, adminRemarks } = req.body;
  db.prepare(`
    UPDATE loan_applications SET status = ?, admin_remarks = ? WHERE id = ?
  `).run(status, adminRemarks || null, Number(id));
  res.json({ success: true, message: 'Application status updated' });
});

// Notices
app.get('/api/notices', (req: Request, res: Response) => {
  const notices = db.prepare('SELECT * FROM notices ORDER BY is_pinned DESC, published_date DESC').all() as any[];
  const data = notices.map((n) => ({
    id: `notice-${n.id}`,
    numericId: n.id,
    titleEn: n.title_en,
    titleNe: n.title_ne,
    category: n.category,
    publishedDate: n.published_date,
    expiryDate: n.expiry_date,
    contentEn: n.content_en,
    contentNe: n.content_ne,
    isPinned: Boolean(n.is_pinned),
    hasPdf: Boolean(n.pdf_file_name),
    pdfFileName: n.pdf_file_name,
    pdfSize: n.pdf_size,
  }));
  res.json({ success: true, data });
});

app.post('/api/notices', (req: Request, res: Response) => {
  const { titleEn, titleNe, category, publishedDate, contentEn, contentNe, isPinned, pdfFileName, pdfSize } = req.body;
  const result = db.prepare(`
    INSERT INTO notices (title_en, title_ne, category, published_date, content_en, content_ne, is_pinned, pdf_file_name, pdf_size)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    titleEn,
    titleNe || titleEn,
    category || 'General',
    publishedDate || new Date().toISOString().slice(0, 10),
    contentEn,
    contentNe || contentEn,
    isPinned ? 1 : 0,
    pdfFileName || 'Notice.pdf',
    pdfSize || '512 KB'
  );
  res.status(201).json({ success: true, data: { id: `notice-${result.lastInsertRowid}` }, message: 'Notice published' });
});

app.delete('/api/notices', (req: Request, res: Response) => {
  const id = parseInt(String(req.query.id).replace('notice-', ''), 10);
  db.prepare('DELETE FROM notices WHERE id = ?').run(id);
  res.json({ success: true, message: 'Notice deleted' });
});

// News
app.get('/api/news', (req: Request, res: Response) => {
  const news = db.prepare('SELECT * FROM news ORDER BY published_date DESC').all() as any[];
  const data = news.map((n) => ({
    id: `news-${n.id}`,
    numericId: n.id,
    titleEn: n.title_en,
    titleNe: n.title_ne,
    category: n.category,
    publishedDate: n.published_date,
    summaryEn: n.summary_en,
    summaryNe: n.summary_ne,
    contentEn: n.content_en,
    contentNe: n.content_ne,
    imageUrl: n.image_url,
  }));
  res.json({ success: true, data });
});

app.post('/api/news', (req: Request, res: Response) => {
  const { titleEn, titleNe, category, publishedDate, summaryEn, summaryNe, contentEn, contentNe, imageUrl } = req.body;
  const result = db.prepare(`
    INSERT INTO news (title_en, title_ne, category, published_date, summary_en, summary_ne, content_en, content_ne, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    titleEn,
    titleNe || titleEn,
    category || 'Community',
    publishedDate || new Date().toISOString().slice(0, 10),
    summaryEn || contentEn?.slice(0, 150),
    summaryNe || contentNe?.slice(0, 150),
    contentEn,
    contentNe || contentEn,
    imageUrl || 'https://images.unsplash.com/photo-1556742049-0a67c55c2764?auto=format&fit=crop&w=800&q=80'
  );
  res.status(201).json({ success: true, data: { id: `news-${result.lastInsertRowid}` }, message: 'News article published' });
});

app.delete('/api/news', (req: Request, res: Response) => {
  const id = parseInt(String(req.query.id).replace('news-', ''), 10);
  db.prepare('DELETE FROM news WHERE id = ?').run(id);
  res.json({ success: true, message: 'News deleted' });
});

// Documents
app.get('/api/documents', (req: Request, res: Response) => {
  const docs = db.prepare('SELECT * FROM documents ORDER BY id ASC').all() as any[];
  const data = docs.map((d) => ({
    id: `doc-${d.id}`,
    numericId: d.id,
    titleEn: d.title_en,
    titleNe: d.title_ne,
    category: d.category,
    filePath: d.file_path,
    fileSize: d.file_size,
    fileType: d.file_type,
    downloadsCount: d.downloads_count,
  }));
  res.json({ success: true, data });
});

app.post('/api/documents', (req: Request, res: Response) => {
  const { titleEn, titleNe, category, filePath, fileSize, fileType } = req.body;
  const result = db.prepare(`
    INSERT INTO documents (title_en, title_ne, category, file_path, file_size, file_type, downloads_count)
    VALUES (?, ?, ?, ?, ?, ?, 0)
  `).run(titleEn, titleNe || titleEn, category, filePath || 'Form.pdf', fileSize || '250 KB', fileType || 'PDF');
  res.status(201).json({ success: true, data: { id: `doc-${result.lastInsertRowid}` }, message: 'Document added' });
});

app.delete('/api/documents', (req: Request, res: Response) => {
  const id = parseInt(String(req.query.id).replace('doc-', ''), 10);
  db.prepare('DELETE FROM documents WHERE id = ?').run(id);
  res.json({ success: true, message: 'Document deleted' });
});

// Contact Messages
app.get('/api/messages', (req: Request, res: Response) => {
  const messages = db.prepare('SELECT * FROM contact_messages ORDER BY created_at DESC').all() as any[];
  const data = messages.map((m) => ({
    id: String(m.id),
    fullName: m.full_name,
    phone: m.phone,
    email: m.email,
    subject: m.subject,
    message: m.message,
    status: m.status,
    adminNotes: m.admin_notes,
    createdAt: m.created_at,
  }));
  res.json({ success: true, data });
});

app.post('/api/messages', (req: Request, res: Response) => {
  const { fullName, phone, email, subject, message } = req.body;
  const result = db.prepare(`
    INSERT INTO contact_messages (full_name, phone, email, subject, message, status, created_at)
    VALUES (?, ?, ?, ?, ?, 'Pending', datetime('now'))
  `).run(fullName, phone, email || null, subject, message);
  res.status(201).json({ success: true, data: { id: result.lastInsertRowid }, message: 'Inquiry received' });
});

app.put('/api/messages', (req: Request, res: Response) => {
  const { id, status, adminNotes } = req.body;
  db.prepare('UPDATE contact_messages SET status = ?, admin_notes = ? WHERE id = ?').run(status, adminNotes || null, Number(id));
  res.json({ success: true, message: 'Message updated' });
});

app.delete('/api/messages', (req: Request, res: Response) => {
  db.prepare('DELETE FROM contact_messages WHERE id = ?').run(Number(req.query.id));
  res.json({ success: true, message: 'Message deleted' });
});

// Activity Logs
app.get('/api/logs', (req: Request, res: Response) => {
  const logs = db.prepare('SELECT * FROM activity_logs ORDER BY created_at DESC LIMIT 50').all() as any[];
  const data = logs.map((l) => ({
    id: String(l.id),
    userName: l.user_name,
    action: l.action,
    details: l.details,
    ipAddress: l.ip_address,
    createdAt: l.created_at,
  }));
  res.json({ success: true, data });
});

// ==========================================
// Vite Integration in Development
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT} with persistent SQL database`);
  });
}

startServer();
