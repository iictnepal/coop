import {
  WebsiteSettings,
  SavingsScheme,
  LoanScheme,
  NoticeItem,
  NewsArticle,
  DocumentDownload,
  GalleryItem,
  BoardMember,
  Testimonial,
  FaqItem,
  ContactMessage,
  LoanApplication,
  MemberUser,
  AdminUser,
  ActivityLog,
} from '../types';

export const INITIAL_SETTINGS: WebsiteSettings = {
  orgNameEn: 'Aadhunik Jana Saving & Credit Co-operative Ltd.',
  orgNameNe: 'आधुनिक जन बचत तथा ऋण सहकारी संस्था लिमिटेड',
  sloganEn: 'Secure Savings, Better Future | Empowering Community Financial Growth',
  sloganNe: 'सुरक्षित बचत, समुन्नत भविष्य | समुदायको दिगो आर्थिक समृद्धिको सारथि',
  regNumber: 'Reg. No: 1248/065/066 (DoC Nepal)',
  panNumber: 'PAN: 302847195',
  addressEn: 'Ward No. 4, Nagarjun Municipality, Kathmandu, Nepal',
  addressNe: 'नागार्जुन नगरपालिका वडा नं. ४, काठमाडौं, नेपाल',
  phone: '+977-1-5100123',
  phoneSecondary: '+977-9851000000',
  email: 'info@aadhunikjana.coop.np',
  emailSecondary: 'support@aadhunikjana.coop.np',
  officeHoursEn: 'Sunday - Friday: 10:00 AM - 4:00 PM (Cash Counter till 3:30 PM)',
  officeHoursNe: 'आइतबार देखि शुक्रबार: बिहान १०:०० देखि दिउँसो ४:०० सम्म (नगद ३:३० सम्म)',
  facebookUrl: 'https://facebook.com/aadhunikjanasaccos',
  youtubeUrl: 'https://youtube.com',
  twitterUrl: 'https://twitter.com',
  primaryColor: '#12345A',
  secondaryColor: '#1769AA',
  accentColor: '#D6A943',
  maintenanceMode: false,
  defaultLanguage: 'ne',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14127.859663738096!2d85.271816!3d27.718335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb188448999815%3A0x7d83296c5aa9f104!2sNagarjun%2C%20Kathmandu!5e0!3m2!1sen!2snp!4v1714500000000!5m2!1sen!2snp',
};

export const INITIAL_SAVINGS_SCHEMES: SavingsScheme[] = [
  {
    id: 'sav-1',
    nameEn: 'Regular Member Savings',
    nameNe: 'साधारण सदस्य बचत',
    category: 'Regular',
    interestRate: '7.50% p.a.',
    minimumDeposit: 'NPR 500',
    durationEn: 'Open-ended, anytime withdrawal',
    durationNe: 'खुला अवधि, जुनसुकै समयमा जम्मा तथा भुक्तानी',
    descriptionEn: 'An accessible, flexible daily savings scheme designed for all registered cooperative members with daily balance interest computation.',
    descriptionNe: 'सहकारीका सम्पूर्ण साधारण सदस्यहरूका लागि दैनिक मौज्दातमा आकर्षक ब्याज गणना हुने सहज तथा लचिलो बचत खाता।',
    featuresEn: [
      'Daily interest calculation, quarterly crediting',
      'Free passbook and SMS alerts',
      'Instant deposit and withdrawal at counter',
      'No hidden service charges'
    ],
    featuresNe: [
      'दैनिक मौज्दातमा ब्याज गणना, त्रैमासिक भुक्तानी',
      'निःशुल्क पासबुक तथा एसएमएस सुविधा',
      'काउन्टरबाट तत्काल जम्मा तथा झिक्न सकिने',
      'कुनै लुकेको सेवा शुल्क नलाग्ने'
    ],
    eligibilityEn: 'Any individual member holding share certificate of Aadhunik Jana SACCOS.',
    eligibilityNe: 'आधुनिक जन साकोसको सेयर सदस्यता प्राप्त नेपाली नागरिक।',
    isActive: true,
    badge: 'Popular'
  },
  {
    id: 'sav-2',
    nameEn: 'Monthly Periodic Deposit (Recurring)',
    nameNe: 'मासिक क्रमिक आवधिक बचत',
    category: 'Periodic',
    interestRate: '9.25% p.a.',
    minimumDeposit: 'NPR 1,000 / month',
    durationEn: '1 to 5 Years flexible tenure',
    durationNe: '१ वर्ष देखि ५ वर्ष सम्मको अवधि',
    descriptionEn: 'Discipline your savings habit with systematic monthly deposits for planned future investments, festivals, or family milestones.',
    descriptionNe: 'हरेक महिना नियमित निश्चित रकम बचत गरी उच्च ब्याजदर सहित भविष्यको योजना सुनिश्चित गर्ने सुरक्षित आवधिक बचत योजना।',
    featuresEn: [
      'Guaranteed high return on consistent monthly deposits',
      'Tenures of 12, 24, 36, 48, and 60 months',
      'Loan facility up to 90% against accumulated balance',
      'Automated standing instruction support'
    ],
    featuresNe: [
      'नियमित मासिक बचतमा उच्च प्रतिफलको सुनिश्चितता',
      '१२, २४, ३६, ४८ र ६० महिनाको समयावधि विकल्प',
      'जम्मा भएको रकमको ९०% सम्म सुलभ कर्जा सुविधा',
      'स्ट्यान्डिङ इन्स्ट्रक्सन मार्फत स्वतः कटौती गर्न सकिने'
    ],
    eligibilityEn: 'Regular members having active savings account.',
    eligibilityNe: 'संस्थाका नियमित बचत खाता भएका सदस्यहरू।',
    isActive: true,
    badge: 'High Yield'
  },
  {
    id: 'sav-3',
    nameEn: 'Bal Bhavishya Child Savings',
    nameNe: 'बाल भविष्य सुनौलो बचत',
    category: 'Child',
    interestRate: '8.75% p.a.',
    minimumDeposit: 'NPR 500',
    durationEn: 'Until child reaches 18 years of age',
    durationNe: 'नाबालक १८ वर्ष नपुग्दासम्म',
    descriptionEn: 'Secure the higher education, career dreams, and financial future of your child from birth with dedicated bonus interest.',
    descriptionNe: 'तपाईंका बालबालिकाको उच्च शिक्षा र सुरक्षित भविष्यको जग बसाल्न विशेष अतिरिक्त सुविधा सहितको बाल बचत खाता।',
    featuresEn: [
      'Account operated by parent/guardian',
      'Complimentary piggy bank (खुत्रुके) upon opening',
      'Birthday greeting and special gift reward on AGM',
      'Free fund transfer from parents regular savings'
    ],
    featuresNe: [
      'अभिभावक/संरक्षकद्वारा सञ्चालन हुने खाता',
      'खाता खोल्दा आकर्षक खुत्रुके निःशुल्क उपहार',
      'जन्मदिनको शुभकामना र साधारण सभामा शैक्षिक प्रोत्साहन',
      'अभिभावकको खाताबाट निःशुल्क रकम रकमान्तर'
    ],
    eligibilityEn: 'Children under 16 years of age with parent/guardian membership.',
    eligibilityNe: '१६ वर्ष मुनिका बालबालिका (संरक्षक संस्थाको सदस्य हुनुपर्ने)।',
    isActive: true,
  },
  {
    id: 'sav-4',
    nameEn: 'Jestha Nagarik Senior Citizen Savings',
    nameNe: 'ज्येष्ठ नागरिक सम्मान बचत',
    category: 'Senior',
    interestRate: '9.00% p.a.',
    minimumDeposit: 'NPR 1,000',
    durationEn: 'Open-ended with preferential counter service',
    durationNe: 'खुला अवधि तथा प्राथमिकता काउन्टर सेवा',
    descriptionEn: 'Dedicated respect-driven financial security scheme for elderly members aged 60 and above with doorstep assistance.',
    descriptionNe: '६० वर्ष वा सोभन्दा माथिका आदरणीय ज्येष्ठ नागरिक सदस्यहरूको सहज जीवनयापन र औषधोपचारको सहयोगार्थ उच्च ब्याजको खाता।',
    featuresEn: [
      'Quarterly interest credited directly into account',
      'Home collection / doorstep assistance for senior members',
      'Priority service at the teller counter without queue',
      'Free annual health checkup camp invitation'
    ],
    featuresNe: [
      'त्रैमासिक रूपमा ब्याज सिधै खातामा जम्मा',
      'ज्येष्ठ नागरिकका लागि घरदैलो सेवाको प्राथमिकता',
      'काउन्टरमा लाइन बस्नु नपर्ने विशेष प्राथमिकता सेवा',
      'वार्षिक निःशुल्क स्वास्थ्य परीक्षण शिविरमा प्राथमिकता'
    ],
    eligibilityEn: 'Members aged 60 years and above.',
    eligibilityNe: '६० वर्ष वा सोभन्दा माथिका सदस्यहरू।',
    isActive: true,
    badge: 'Special Care'
  },
  {
    id: 'sav-5',
    nameEn: 'Aadhunik Fixed Deposit (Muddati)',
    nameNe: 'आधुनिक मुद्दती निक्षेप',
    category: 'Periodic',
    interestRate: '10.50% - 11.25% p.a.',
    minimumDeposit: 'NPR 25,000',
    durationEn: '3 Months to 5 Years',
    durationNe: '३ महिना देखि ५ वर्ष सम्म',
    descriptionEn: 'Maximize earnings on your idle funds with the highest competitive cooperative interest rates and flexible interest payment cycles.',
    descriptionNe: 'आफ्नो संचित पुँजीलाई सुरक्षित राख्दै अधिकतम प्रतिफल प्राप्त गर्न सकिने संस्थाको सबैभन्दा भरपर्दो मुद्दती निक्षेप योजना।',
    featuresEn: [
      'Option for Monthly, Quarterly, or Maturity interest payout',
      'Instant loan up to 90% against fixed deposit certificate',
      'Auto-renewal on maturity upon member instruction',
      'Non-fluctuating locked interest rate guarantee'
    ],
    featuresNe: [
      'मासिक, त्रैमासिक वा अवधि समाप्तीमा ब्याज भुक्तानी छनोट',
      'मुद्दती रसिद धितोमा ९०% सम्म तत्काल कर्जा प्राप्त गर्न सकिने',
      'सदस्यको चाहना अनुसार स्वतः नवीकरण हुने सुविधा',
      'सम्झौता अवधिसम्म ब्याजदर नघट्ने पूर्ण प्रत्याभूति'
    ],
    eligibilityEn: 'All registered individual and institutional members.',
    eligibilityNe: 'सम्पूर्ण सेयर सदस्य तथा संस्थागत सदस्यहरू।',
    isActive: true,
    badge: 'Highest Rate'
  }
];

export const INITIAL_LOAN_SCHEMES: LoanScheme[] = [
  {
    id: 'loan-1',
    nameEn: 'Small & Medium Business Loan',
    nameNe: 'साना तथा मझौला व्यवसाय कर्जा',
    category: 'Business',
    interestRate: '12.50% - 13.50% p.a.',
    loanLimitEn: 'Up to NPR 5,000,000 (Subject to collateral & project evaluation)',
    loanLimitNe: 'रु. ५०,००,००० सम्म (धितो तथा व्यवसाय मूल्याङ्कनको आधारमा)',
    tenureEn: '1 to 7 Years with easy EMI / EQI options',
    tenureNe: '१ देखि ७ वर्ष सम्म (किस्ताबन्दी भुक्तानी)',
    descriptionEn: 'Empowering local retail shops, enterprises, wholesalers, and service entrepreneurs across Nagarjun and Kathmandu valley.',
    descriptionNe: 'नागार्जुन क्षेत्र तथा काठमाडौं उपत्यकाका स्थानीय खुद्रा, थोक, उत्पादन तथा सेवामूलक व्यवसाय प्रवर्द्धनका लागि सुलभ कर्जा।',
    featuresEn: [
      'Fast-track approval within 3 working days',
      'Working capital and capital expenditure financing',
      'Revolving credit and diminishing interest calculation',
      'No hidden prepayment penalties after 1 year'
    ],
    featuresNe: [
      '३ कार्यदिन भित्र कागजात प्रमाणिकरण र स्वीकृति प्रक्रिया',
      'चालु पुँजी तथा पुँजीगत खर्च दुवैमा लगानी योग्य',
      'घट्दो मौज्दातमा मात्र ब्याज गणना हुने पारदर्शी प्रणाली',
      '१ वर्ष पश्चात् अग्रिम भुक्तानीमा अतिरिक्त शुल्क नलाग्ने'
    ],
    eligibilityEn: 'Registered business running for at least 1 year, active cooperative membership for 3+ months.',
    eligibilityNe: 'कम्तीमा १ वर्षदेखि दर्ता भई सञ्चालनमा रहेको व्यवसाय, न्यूनतम ३ महिनाको सक्रिय सेयर सदस्यता।',
    documentsEn: [
      'Business Registration Certificate and PAN/VAT',
      'Tax clearance or recent financial statement',
      'Citizenship and photo of applicant & guarantors',
      'Collateral land/building ownership certificates (Lalpurja, Tiro Rasid, Naksa Pass)'
    ],
    documentsNe: [
      'व्यवसाय दर्ता प्रमाणपत्र तथा प्यान/भ्याट दर्ता',
      'करचुक्ता प्रमाणपत्र वा अद्यावधिक आयव्यय विवरण',
      'ऋणी तथा जमानीकर्ताको नागरिकता र फोटो',
      'धितो राखिने घर/जग्गाको लालपुर्जा, तिरो तिरेको रसिद र नक्सा'
    ],
    isActive: true,
    badge: 'Entrepreneur Choice'
  },
  {
    id: 'loan-2',
    nameEn: 'Agriculture & Livestock Loan',
    nameNe: 'कृषि तथा पशुपालन कर्जा',
    category: 'Agriculture',
    interestRate: '11.00% - 12.00% p.a.',
    loanLimitEn: 'Up to NPR 1,500,000',
    loanLimitNe: 'रु. १५,००,००० सम्म',
    tenureEn: '1 to 5 Years with harvest-friendly installment cycles',
    tenureNe: '१ देखि ५ वर्ष सम्म (बाली भित्र्याउने समय अनुकूल किस्ता)',
    descriptionEn: 'Concessional cooperative financing for organic farming, commercial poultry, vegetable greenhouses, and dairy cattle rearing.',
    descriptionNe: 'तरकारी खेती, च्याउ खेती, कुखुरापालन, बाख्रापालन तथा डेरी व्यवसाय गर्ने कृषक सदस्यहरूका लागि विशेष सहुलियतपूर्ण कर्जा।',
    featuresEn: [
      'Subsidized cooperative interest rate for food producers',
      'Grace period on principal during early production cycle',
      'Group guarantee or real estate collateral options',
      'Agricultural training linkages provided'
    ],
    featuresNe: [
      'उत्पादक कृषकहरूका लागि संस्थागत सहुलियत ब्याजदर',
      'उत्पादन सुरु नहुँदासम्म साँवामा ग्रेस पिरियड सुविधा',
      'समूह जमानी वा अचल सम्पत्ति धितो दुवैमा उपलब्ध',
      'कृषि तथा व्यावसायिक तालिममा सहभागिताको अवसर'
    ],
    eligibilityEn: 'Member involved in agriculture/farming within Nagarjun or surrounding wards.',
    eligibilityNe: 'नागार्जुन नगरपालिका वा आसपासका क्षेत्रमा कृषि/पशुपालन कर्ममा संलग्न सदस्य।',
    documentsEn: ['Citizenship certificate', 'Land ownership or lease agreement for farming', 'Recommendation from local ward (if required)'],
    documentsNe: ['नागरिकता प्रमाणपत्र', 'खेती गरिने जग्गाको लालपुर्जा वा भाडा सम्झौता', 'सम्बन्धित वडाको सिफारिस (आवश्यकता अनुसार)'],
    isActive: true
  },
  {
    id: 'loan-3',
    nameEn: 'Home Construction & Renovation Loan',
    nameNe: 'आवास निर्माण तथा मर्मत कर्जा',
    category: 'Housing',
    interestRate: '12.00% - 13.00% p.a.',
    loanLimitEn: 'Up to NPR 7,500,000',
    loanLimitNe: 'रु. ७५,००,००० सम्म',
    tenureEn: 'Up to 10 Years tenure',
    tenureNe: '१० वर्ष सम्मको लामो अवधि',
    descriptionEn: 'Realize your dream of constructing a comfortable residence, adding storeys, or renovating your family home in Kathmandu.',
    descriptionNe: 'आफ्नै घर बनाउने, तला थप गर्ने वा पुरानो घरलाई मर्मत गरी चिटिक्क बनाउने सपना साकार पार्न दीगो आवास कर्जा।',
    featuresEn: [
      'Phased disbursement matched to construction stages',
      'Competitive interest calculation on reducing balance',
      'Long-term affordable monthly installments',
      'Technical building evaluation support'
    ],
    featuresNe: [
      'घर निर्माणको चरण अनुसार किस्ताबन्दी रकम भुक्तानी',
      'घट्दो मौज्दातमा सरल र पारदर्शी ब्याज हिसाब',
      'लामो समयावधि भएकोले मासिक किस्ता न्यून हुने',
      'इन्जिनियरिङ प्राविधिक मूल्याङ्कनमा सहजीकरण'
    ],
    eligibilityEn: 'Cooperative member with verifiable regular income or business cash flow.',
    eligibilityNe: 'नियमित आम्दानी वा भरपर्दो आयस्रोत भएका संस्थाका सदस्यहरू।',
    documentsEn: ['Approved municipal house design/naksa', 'Land ownership certificate (Lalpurja)', 'Income proof / salary certificate'],
    documentsNe: ['नगरपालिकाबाट स्वीकृत घरको नक्सा', 'जग्गाधनी प्रमाणपुर्जा (लालपुर्जा)', 'आयस्रोत खुल्ने तलब प्रमाण वा व्यवसायिक कागजात'],
    isActive: true,
    badge: 'Long Tenure'
  },
  {
    id: 'loan-4',
    nameEn: 'Higher Education Loan',
    nameNe: 'उच्च शिक्षा अध्ययन कर्जा',
    category: 'Education',
    interestRate: '11.50% - 12.50% p.a.',
    loanLimitEn: 'Up to NPR 3,000,000',
    loanLimitNe: 'रु. ३०,००,००० सम्म',
    tenureEn: 'Up to 5 Years',
    tenureNe: '५ वर्ष सम्म',
    descriptionEn: 'Financial backing for your children to pursue medical, engineering, IT, management, or overseas undergraduate and graduate programs.',
    descriptionNe: 'तपाईंका सन्तानको स्वदेश तथा विदेशमा चिकित्सा, इन्जिनियरिङ, सूचना प्रविधि तथा उच्च शिक्षा अध्ययनको लागि भरपर्दो सहयोग।',
    featuresEn: [
      'Covers tuition fees, admission costs, and living expenses',
      'Direct disbursement to college/university bank if required',
      'Flexible moratorium period during study term',
      'Low service and administrative processing charges'
    ],
    featuresNe: [
      'भर्ना शुल्क, कलेज फि तथा छात्रावास खर्च व्यवस्थापन योग्य',
      'आवश्यकता अनुसार सम्बन्धित शैक्षिक संस्थाको खातामा सिधै भुक्तानी',
      'अध्ययन अवधिभर साँवा तिर्न नपर्ने लचिलो सुविधा',
      'अत्यन्तै न्यून प्रशासनिक तथा सेवा शुल्क'
    ],
    eligibilityEn: 'Parent/Guardian with valid cooperative membership; student with valid offer letter.',
    eligibilityNe: 'अभिभावक संस्थाको सदस्य भएको तथा विद्यार्थीको भर्ना स्वीकृत पत्र (Offer Letter)।',
    documentsEn: ['Academic transcripts', 'College acceptance letter & fee structure', 'Guardian income and collateral documents'],
    documentsNe: ['शैक्षिक योग्यताका लब्धाङ्क पत्र', 'कलेजको भर्ना पत्र तथा फि संरचना विवरण', 'अभिभावकको धितो तथा आयस्रोत सम्बन्धी प्रमाण'],
    isActive: true
  },
  {
    id: 'loan-5',
    nameEn: 'Emergency Social & Medical Loan',
    nameNe: 'आकस्मिक सामाजिक तथा उपचार कर्जा',
    category: 'Emergency',
    interestRate: '11.00% p.a.',
    loanLimitEn: 'Up to NPR 300,000',
    loanLimitNe: 'रु. ३,००,००० सम्म',
    tenureEn: '6 Months to 2 Years',
    tenureNe: '६ महिना देखि २ वर्ष सम्म',
    descriptionEn: 'Immediate, hassle-free cash support to cope with sudden medical hospitalization, family emergencies, or social obligations.',
    descriptionNe: 'अचानक आइपर्ने स्वास्थ्य समस्या, अस्पतालको उपचार खर्च वा आकस्मिक सामाजिक आवश्यकता पुरा गर्न तत्काल उपलब्ध हुने कर्जा।',
    featuresEn: [
      'Sanctioned within 24 hours of application',
      'Minimal paperwork on personal/group guarantee',
      'Affordable monthly interest rate',
      'Empathetic member support'
    ],
    featuresNe: [
      'निवेदन दिएको २४ घण्टाभित्र कर्जा प्रवाह',
      'न्यूनतम कागजात तथा व्यक्तिगत जमानीमै उपलब्ध',
      'सहुलियतपूर्ण मासिक ब्याजदर',
      'सदस्यको अप्ठ्यारोमा साथ दिने सहकारीको मूल मर्म'
    ],
    eligibilityEn: 'Active member with consistent saving record for at least 6 months.',
    eligibilityNe: 'कम्तीमा ६ महिनादेखि नियमित बचत गरिरहेका सक्रिय सदस्यहरू।',
    documentsEn: ['Member ID card', 'Hospital admission / emergency estimate bill', 'Guarantor consent letter'],
    documentsNe: ['सदस्यता परिचयपत्र', 'अस्पताल भर्ना वा आकस्मिक खर्चको बिल/अनुमान', 'जमानीकर्ताको मञ्जुरीनामा'],
    isActive: true,
    badge: 'Instant 24h'
  }
];

export const INITIAL_NOTICES: NoticeItem[] = [
  {
    id: 'not-1',
    titleEn: 'Notice regarding 16th Annual General Meeting (AGM) 2081/2082',
    titleNe: '१६औं वार्षिक साधारण सभा (AGM) सम्बन्धी अत्यन्त जरुरी सूचना',
    category: 'AGM',
    publishedDate: '2026-10-15',
    expiryDate: '2026-11-20',
    contentEn: 'All respected shareholder members of Aadhunik Jana Saving & Credit Co-operative Ltd. are cordially requested to attend the 16th Annual General Meeting scheduled for Saturday, 2081 Kartik 29 at Party Palace Hall, Nagarjun-4, Kathmandu from 11:00 AM onwards to discuss annual reports and fiscal audit accounts.',
    contentNe: 'यस आधुनिक जन बचत तथा ऋण सहकारी संस्था लिमिटेडका सम्पूर्ण आदरणीय सेयर सदस्य महानुभावहरूमा १६औं वार्षिक साधारण सभा आगामी शनिबार नागार्जुन-४ स्थित सभाहलमा बिहान ११:०० बजे आयोजना हुन गइरहेको हुँदा वार्षिक लेखापरीक्षण प्रतिवेदन तथा नीतिगत प्रस्तावहरू उपर छलफल गर्न उपस्थितिको लागि सादर अनुरोध गरिन्छ।',
    isPinned: true,
    hasPdf: true,
    pdfFileName: '16th_AGM_Notice_Aadhunik_Jana.pdf',
    pdfSize: '1.2 MB'
  },
  {
    id: 'not-2',
    titleEn: 'Updated Interest Rates Effective from 1st Kartik 2081',
    titleNe: '२०८१ कार्तिक १ गते देखि लागू हुने नयाँ ब्याजदर सम्बन्धी सूचना',
    category: 'Financial Report',
    publishedDate: '2026-10-01',
    expiryDate: '2026-12-30',
    contentEn: 'As per the decision of the Board of Directors, the revised interest rates for savings deposits (7.50% - 11.25%) and loan facilities (11.00% - 13.50%) within the ceiling guidelines of the Department of Cooperatives have come into effect. Please review detailed scheme tables.',
    contentNe: 'सञ्चालक समितिको निर्णयानुसार सहकारी विभागको सन्दर्भ ब्याजदर निर्देशनको परिधिभित्र रही बचत निक्षेप (७.५०% देखि ११.२५%) तथा कर्जा लगानी (११.००% देखि १३.५०%) को परिमार्जित ब्याजदर २०८१ कार्तिक १ गतेदेखि लागू गरिएको व्यहोरा जानकारी गराइन्छ।',
    isPinned: true,
    hasPdf: true,
    pdfFileName: 'Interest_Rates_Schedule_Kartik_2081.pdf',
    pdfSize: '840 KB'
  },
  {
    id: 'not-3',
    titleEn: 'Tender Notice: Invitation for External Audit for Fiscal Year 2081/082',
    titleNe: 'आर्थिक वर्ष २०८१/०८२ को बाह्य लेखापरीक्षण सम्बन्धी सिलबन्दी दरभाउपत्र आह्वान',
    category: 'Tender',
    publishedDate: '2026-09-20',
    expiryDate: '2026-11-05',
    contentEn: 'Registered Chartered Accountant (CA / RA) audit firms holding valid license from ICAN are invited to submit sealed proposals for statutory audit by 2081 Kartik 15 to the administrative office.',
    contentNe: 'नेपाल चार्टर्ड एकाउन्टेन्ट्स संस्था (ICAN) बाट प्रमाणपत्र प्राप्त इच्छुक लेखापरीक्षक फर्महरूले आर्थिक वर्ष २०८१/०८२ को वार्षिक लेखापरीक्षण कार्यका लागि सिलबन्दी दरभाउपत्र संस्थाको मुख्य कार्यालयमा पेश गर्नुहुन आह्वान गरिन्छ।',
    isPinned: false,
    hasPdf: true,
    pdfFileName: 'Audit_Tender_EOI_2081.pdf',
    pdfSize: '620 KB'
  },
  {
    id: 'not-4',
    titleEn: 'Notice on KYC Verification and Biometric Update Campaign',
    titleNe: 'सदस्य महानुभावहरूको व्यक्तिगत विवरण (KYC) अद्यावधिक गर्ने बारे',
    category: 'General',
    publishedDate: '2026-09-10',
    contentEn: 'All cooperative members are kindly requested to update their Know Your Customer (KYC) forms along with national ID/citizenship photocopy and passport size photograph at the member counter or via online member portal.',
    contentNe: 'सहकारी ऐन तथा नियमावली अनुसार संस्थाका सम्पूर्ण सदस्यहरूले आफ्नो ग्राहक पहिचान विवरण (KYC) फारम तथा राष्ट्रिय परिचयपत्र/नागरिकताको प्रतिलिपि बुझाई विवरण अद्यावधिक गराइदिनुहुन विनम्र अनुरोध गर्दछौं।',
    isPinned: false,
    hasPdf: true,
    pdfFileName: 'KYC_Update_Form_2081.pdf',
    pdfSize: '450 KB'
  }
];

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'news-1',
    titleEn: 'Aadhunik Jana SACCOS Conducts Financial Literacy & Digital Banking Workshop',
    titleNe: 'आधुनिक जन साकोसद्वारा वित्तीय साक्षरता तथा डिजिटल बैंकिङ तालिम सम्पन्न',
    publishedDate: '2026-10-18',
    category: 'Financial Literacy',
    summaryEn: 'Over 85 women members and small business owners participated in a practical workshop focusing on mobile cooperative banking, household budgeting, and safe saving techniques.',
    summaryNe: 'नागार्जुन नगरपालिकाका ८५ भन्दा बढी महिला तथा साना उद्यमी सदस्यहरूको सहभागितामा पारिवारिक बजेट, मोबाइल बैंकिङ र सुरक्षित बचत सम्बन्धी प्रभावकारी तालिम सम्पन्न भएको छ।',
    contentEn: 'Aadhunik Jana Saving & Credit Co-operative Ltd. hosted an interactive full-day workshop at Nagarjun Community Centre. The session educated members on identifying fraud, utilizing SMS banking alerts, calculating loan interest fairly, and establishing monthly family emergency funds.',
    contentNe: 'आधुनिक जन बचत तथा ऋण सहकारी संस्था लि. ले नागार्जुन सामुदायिक भवनमा एकदिने बृहत् अन्तरक्रियात्मक तालिम सम्पन्न गरेको छ। कार्यक्रममा डिजिटल कारोबारमा ध्यान दिनुपर्ने सुरक्षा, पारिवारिक आपतकालीन कोष निर्माण र उद्यमशीलता कर्जाको उपयोग बारे विस्तृत प्रशिक्षण दिइएको थियो।',
    imageUrl: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=800&q=80',
    readTime: '3 min read'
  },
  {
    id: 'news-2',
    titleEn: 'Distribution of Warm Clothes & Educational Supplies to Local Students',
    titleNe: 'स्थानीय सामुदायिक विद्यालयका विद्यार्थीहरूलाई न्यानो कपडा तथा शैक्षिक सामग्री वितरण',
    publishedDate: '2026-09-28',
    category: 'CSR',
    summaryEn: 'Under our Corporate Social Responsibility (CSR) fund, stationery sets, school bags, and winter jackets were handed over to 120 deserving students in Nagarjun Ward 4.',
    summaryNe: 'संस्थाको सामाजिक उत्तरदायित्व कोष अन्तर्गत नागार्जुन-४ स्थित सामुदायिक विद्यालयका १२० जना जेहेन्दार विद्यार्थीहरूलाई शैक्षिक सामग्री तथा न्यानो कपडा वितरण गरिएको छ।',
    contentEn: 'Believing in community empowerment through education, the Board of Directors visited local Shree Jana Vikas Secondary School to award merit-based educational kits and winter uniform sweaters to students from underprivileged families.',
    contentNe: 'शिक्षा नै समृद्धिको आधार हो भन्ने मूल मर्मलाई आत्मसात गर्दै संस्थाका अध्यक्ष तथा सञ्चालक समितिका पदाधिकारीहरूको उपस्थितिमा विद्यार्थीहरूलाई प्रोत्साहन स्वरूप झोला, कापी, कलम र न्यानो ज्याकेट हस्तान्तरण गरियो।',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    readTime: '4 min read'
  },
  {
    id: 'news-3',
    titleEn: 'Free Health Screening & Blood Donation Camp Organised on Cooperative Day',
    titleNe: 'सहकारी दिवसको अवसरमा निःशुल्क स्वास्थ्य शिविर तथा रक्तदान कार्यक्रम सम्पन्न',
    publishedDate: '2026-08-14',
    category: 'Community',
    summaryEn: 'A total of 64 pints of blood were collected in coordination with Nepal Red Cross Society, and 180 senior citizens received free sugar, BP, and eye checkups.',
    summaryNe: 'नेपाल रेडक्रस सोसाइटीको प्राविधिक सहयोगमा ६४ पिन्ट रगत संकलन तथा १८० जना ज्येष्ठ नागरिकहरूको निःशुल्क सुगर, प्रेसर र आँखा परीक्षण गरियो।',
    contentEn: 'Marking National Cooperative Day, our institution organized a comprehensive health check-up camp in front of our corporate building. Senior doctors provided medical consultations and distributed basic essential medicines free of charge.',
    contentNe: 'राष्ट्रिय सहकारी दिवसको पावन अवसरमा संस्थाको केन्द्रीय कार्यालय परिसरमा आयोजित शिविरमा विशेषज्ञ चिकित्सकहरूबाट स्वास्थ्य परीक्षण तथा आवश्यक आधारभूत औषधि निःशुल्क उपलब्ध गराइएको थियो।',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    readTime: '3 min read'
  }
];

export const INITIAL_DOCUMENTS: DocumentDownload[] = [
  {
    id: 'doc-1',
    titleEn: 'Official Membership Application Form',
    titleNe: 'नयाँ सदस्यता आवेदन फारम',
    category: 'Forms',
    fileType: 'PDF',
    fileSize: '480 KB',
    publishDate: '2026-01-10',
    downloadsCount: 1420,
    descriptionEn: 'Standard application form for prospective members seeking share membership in Aadhunik Jana SACCOS.',
    descriptionNe: 'संस्थाको सेयर सदस्यता प्राप्त गर्न इच्छुक नेपाली नागरिकहरूले भर्नुपर्ने आधिकारिक आवेदन फारम।'
  },
  {
    id: 'doc-2',
    titleEn: 'Comprehensive Loan Request & Guarantor Form',
    titleNe: 'ऋण माग तथा जमानी सम्झौता फारम',
    category: 'Forms',
    fileType: 'PDF',
    fileSize: '950 KB',
    publishDate: '2026-02-15',
    downloadsCount: 980,
    descriptionEn: 'Detailed multi-page form including project evaluation, guarantor consent, and collateral declaration.',
    descriptionNe: 'व्यवसायिक, आवास, कृषि तथा अन्य कर्जा माग गर्दा धितो र जमानीकर्ताको विवरण सहित पेश गर्नुपर्ने फारम।'
  },
  {
    id: 'doc-3',
    titleEn: 'Know Your Customer (KYC) Individual Update Form',
    titleNe: 'व्यक्तिगत ग्राहक पहिचान (KYC) अद्यावधिक फारम',
    category: 'KYC',
    fileType: 'PDF',
    fileSize: '360 KB',
    publishDate: '2026-03-01',
    downloadsCount: 2310,
    descriptionEn: 'Mandatory form to verify and update family tree, residence, and identification records per regulatory norms.',
    descriptionNe: 'सहकारी नियमन निकायको निर्देशन अनुसार तीन पुस्ते विवरण, ठेगाना र पेशागत विवरण अद्यावधिक गर्ने फारम।'
  },
  {
    id: 'doc-4',
    titleEn: 'Annual Financial Progress Report Fiscal Year 2080/081',
    titleNe: 'आर्थिक वर्ष २०८०/०८१ को वार्षिक प्रगति तथा लेखापरीक्षण प्रतिवेदन',
    category: 'Reports',
    fileType: 'PDF',
    fileSize: '3.4 MB',
    publishDate: '2026-09-15',
    downloadsCount: 650,
    descriptionEn: 'Audited balance sheet, income statement, PEARLS monitoring indicators, and strategic review passed by the AGM.',
    descriptionNe: 'साधारण सभाबाट अनुमोदित वासलात, नाफा-नोक्सान हिसाब, वित्तीय सूचकाङ्क तथा वार्षिक समीक्षा प्रतिवेदन।'
  },
  {
    id: 'doc-5',
    titleEn: 'Institutional By-Laws and Savings & Credit Policy (विनियम)',
    titleNe: 'संस्थाको विनियम तथा बचत-ऋण परिचालन नीति',
    category: 'Bylaws',
    fileType: 'PDF',
    fileSize: '1.8 MB',
    publishDate: '2025-11-20',
    downloadsCount: 520,
    descriptionEn: 'Approved institutional constitution, operational guidelines, and member rights & duties.',
    descriptionNe: 'संस्था सञ्चालनको मूल विधान, काम-कर्तव्य र अधिकार तथा सदस्यहरूको अधिकार र जिम्मेवारी सम्बन्धी नीति।'
  }
];

export const INITIAL_BOARD_MEMBERS: BoardMember[] = [
  {
    id: 'bm-1',
    nameEn: 'Mr. Ram Krishna Shrestha',
    nameNe: 'श्री राम कृष्ण श्रेष्ठ',
    designationEn: 'President / Chairperson',
    designationNe: 'अध्यक्ष',
    type: 'Board',
    phone: '+977-9851011111',
    email: 'president@aadhunikjana.coop.np',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    order: 1
  },
  {
    id: 'bm-2',
    nameEn: 'Mrs. Shanti Maya Tamang',
    nameNe: 'श्रीमती शान्ति माया तामाङ',
    designationEn: 'Vice President',
    designationNe: 'उपाध्यक्ष',
    type: 'Board',
    phone: '+977-9851022222',
    email: 'vicepresident@aadhunikjana.coop.np',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    order: 2
  },
  {
    id: 'bm-3',
    nameEn: 'Mr. Binod Kumar Karki',
    nameNe: 'श्री विनोद कुमार कार्की',
    designationEn: 'Secretary',
    designationNe: 'सचिव',
    type: 'Board',
    phone: '+977-9851033333',
    email: 'secretary@aadhunikjana.coop.np',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    order: 3
  },
  {
    id: 'bm-4',
    nameEn: 'Mrs. Sita Devi Adhikari',
    nameNe: 'श्रीमती सीता देवी अधिकारी',
    designationEn: 'Treasurer',
    designationNe: 'कोषाध्यक्ष',
    type: 'Board',
    phone: '+977-9851044444',
    email: 'treasurer@aadhunikjana.coop.np',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    order: 4
  },
  {
    id: 'bm-5',
    nameEn: 'Mr. Prakash Man Maharjan',
    nameNe: 'श्री प्रकाश मान महर्जन',
    designationEn: 'Coordinator, Account Supervisory Committee',
    designationNe: 'संयोजक, लेखा सुपरिवेक्षण समिति',
    type: 'Account Committee',
    phone: '+977-9851055555',
    email: 'audit@aadhunikjana.coop.np',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    order: 5
  },
  {
    id: 'bm-6',
    nameEn: 'Mr. Suresh Chandra Gautam',
    nameNe: 'श्री सुरेश चन्द्र गौतम',
    designationEn: 'Chief Executive Officer (CEO)',
    designationNe: 'प्रमुख कार्यकारी अधिकृत (CEO)',
    type: 'Management',
    phone: '+977-9851066666',
    email: 'ceo@aadhunikjana.coop.np',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    order: 6
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    titleEn: '15th Annual General Meeting Gathering & Member Interaction',
    titleNe: '१५औं वार्षिक साधारण सभा भव्य समारोह तथा सदस्य अन्तरक्रिया',
    category: 'AGM',
    date: '2025-11-12',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    descriptionEn: 'Active participation of members celebrating cooperative unity and approving annual accounts.',
    descriptionNe: 'सदस्य महानुभावहरूको उत्साहजनक सहभागितामा सम्पन्न वार्षिक साधारण सभा।'
  },
  {
    id: 'gal-2',
    titleEn: 'Financial Empowerment & Small Business Training in Nagarjun',
    titleNe: 'नागार्जुनमा सञ्चालित वित्तीय सशक्तीकरण तथा साना व्यवसाय तालिम',
    category: 'Financial Education',
    date: '2026-03-22',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    descriptionEn: 'Practical guidance on bookkeeping and modern financial cooperative tools.',
    descriptionNe: 'लेखा व्यवस्थापन तथा आधुनिक सहकारी औजारहरू सम्बन्धी व्यावहारिक प्रशिक्षण।'
  },
  {
    id: 'gal-3',
    titleEn: 'Stationery & Warm Clothes Distribution to Underprivileged Students',
    titleNe: 'अध्ययनरत विद्यार्थीहरूलाई शैक्षिक सामग्री तथा न्यानो कपडा वितरण',
    category: 'Community Work',
    date: '2026-01-18',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    descriptionEn: 'Reaching out to school children under our CSR community welfare initiative.',
    descriptionNe: 'संस्थाको सामाजिक दायित्व अन्तर्गत बालबालिकाहरूको उज्ज्वल भविष्यका लागि सहयोग।'
  },
  {
    id: 'gal-4',
    titleEn: 'Modern Member Care & Teller Counter at Nagarjun-4 Central Office',
    titleNe: 'नागार्जुन-४ स्थित मुख्य कार्यालयको आधुनिक सेवा काउन्टर',
    category: 'Branch Office',
    date: '2026-02-10',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?auto=format&fit=crop&w=800&q=80',
    descriptionEn: 'Well-equipped service desks delivering friendly customer care to all visitors.',
    descriptionNe: 'सदस्यहरूलाई छिटो, छरितो र मर्यादित वित्तीय सेवा प्रदान गर्ने काउन्टर कक्ष।'
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    nameEn: 'Dipak Acharya',
    nameNe: 'दीपक आचार्य',
    membershipYear: 'Member since 2072 BS',
    occupationEn: 'Grocery & Wholesale Trader, Nagarjun',
    occupationNe: 'किराना तथा थोक व्यवसायी, नागार्जुन',
    quoteEn: 'Aadhunik Jana SACCOS stood by my business when commercial banks refused small working capital. Their quick approval and respectful staff helped me expand my shop into a thriving mini-mart.',
    quoteNe: 'जब मलाई व्यवसाय विस्तारका लागि तत्काल पुँजी चाहिएको थियो, आधुनिक जन साकोसले मलाई सहजै व्यवसाय कर्जा प्रदान गर्‍यो। आज मेरो पसल व्यवस्थित मिनीमार्टमा परिणत भएको छ।',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'test-2',
    nameEn: 'Maya Devi Shakya',
    nameNe: 'माया देवी शाक्य',
    membershipYear: 'Member since 2074 BS',
    occupationEn: 'Home Entrepreneur & Artisan',
    occupationNe: 'घरेलु उद्यमी तथा हस्तकला शिल्पी',
    quoteEn: 'The Bal Bhavishya child savings scheme helped me save little by little every month for my daughter. The interest rate is high and the service is completely transparent.',
    quoteNe: 'मासिक क्रमिक बचत र बाल भविष्य बचतले गर्दा मैले आफ्नी छोरीको उच्च शिक्षाको लागि कुनै चिन्ता लिनु परेको छैन। संस्थाको व्यवहार अत्यन्तै पारिवारिक र भरपर्दो छ।',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
  }
];

export const INITIAL_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    questionEn: 'How can I become a shareholder member of Aadhunik Jana SACCOS?',
    questionNe: 'आधुनिक जन साकोसको सेयर सदस्य कसरी बन्न सकिन्छ?',
    answerEn: 'Any Nepali citizen residing or running business/employment in Nagarjun Municipality or working area can apply. You need 2 passport-sized photos, copy of citizenship certificate, nominee details, and purchase minimum shares (NPR 1,000) alongside entry fees.',
    answerNe: 'नागार्जुन नगरपालिका वा संस्थाको कार्यक्षेत्रभित्र बसोबास वा पेशा/व्यवसाय गर्ने नेपाली नागरिकले २ प्रति फोटो, नागरिकताको प्रतिलिपि, हकवालाको विवरण र न्यूनतम सेयर खरिद गरी सदस्यता लिन सक्नुहुन्छ।',
    category: 'Membership'
  },
  {
    id: 'faq-2',
    questionEn: 'What is the loan processing duration and interest calculation method?',
    questionNe: 'कर्जा स्वीकृत हुन कति समय लाग्छ र ब्याज कसरी हिसाब गरिन्छ?',
    answerEn: 'Upon submission of all required documents and collateral verification, general business/personal loans are processed within 3 to 5 business days. Emergency loans are disbursed within 24 hours. Interest is calculated strictly on a daily reducing balance method.',
    answerNe: 'आवश्यक कागजात तथा धितो मूल्याङ्कन सम्पन्न भएपछि ३ देखि ५ कार्यदिन भित्र कर्जा स्वीकृत हुन्छ। आकस्मिक कर्जा २४ घण्टाभित्रै उपलब्ध हुन्छ। ब्याज घट्दो मौज्दातमा मात्र हिसाब गरिन्छ।',
    category: 'Loans'
  },
  {
    id: 'faq-3',
    questionEn: 'Are my savings safe in Aadhunik Jana SACCOS?',
    questionNe: 'आधुनिक जन साकोसमा मेरो बचत कत्तिको सुरक्षित छ?',
    answerEn: 'Yes. Our cooperative is audited regularly by licensed Chartered Accountants, maintains statutory liquidity ratios exceeding cooperative standards, and operates under the direct regulatory framework of the Department of Cooperatives.',
    answerNe: 'पूर्ण रूपमा सुरक्षित छ। हाम्रो संस्था चार्टर्ड एकाउन्टेन्ट्सबाट नियमित अडिट हुने, पर्याप्त तरलता र जगेडा कोष कायम राख्ने तथा सहकारी विभागको प्रत्यक्ष नियमनमा सञ्चालित संस्था हो।',
    category: 'Savings'
  },
  {
    id: 'faq-4',
    questionEn: 'Can I apply for a loan or check application status online?',
    questionNe: 'के म अनलाइनबाटै कर्जा आवेदन दिन र स्थिति बुझ्न सक्छु?',
    answerEn: 'Yes! You can use our online Loan Application form on this website or log in to the Member Portal to submit inquiries and track your application progress in real-time.',
    answerNe: 'अवश्य, यस वेबसाइटको "Loan Services" पेज वा "Member Portal" मा लगइन गरी अनलाइन कर्जा आवेदन पेश गर्न र त्यसको प्रगति हेर्न सक्नुहुन्छ।',
    category: 'General'
  }
];

export const INITIAL_MEMBER_USER: MemberUser = {
  id: 'mem-101',
  memberId: 'AJ-2075-0142',
  fullName: 'Krishna Prasad Sharma',
  phone: '+977-9841234567',
  email: 'krishna.sharma@example.com',
  accountType: 'Regular Savings & Share Member',
  joinDate: '2019-04-14 (2076-01-01 BS)',
  kycStatus: 'Verified',
  address: 'Nagarjun Ward 4, Raniban, Kathmandu'
};

export const INITIAL_ADMIN_USER: AdminUser = {
  id: 'adm-001',
  username: 'admin',
  fullName: 'System Administrator',
  role: 'Super Admin',
  email: 'admin@aadhunikjana.coop.np',
  lastLogin: '2026-10-31 09:15 AM'
};

export const INITIAL_LOAN_APPLICATIONS: LoanApplication[] = [
  {
    id: 'app-001',
    applicationNo: 'LA-2081-089',
    applicantName: 'Krishna Prasad Sharma',
    applicantPhone: '+977-9841234567',
    applicantEmail: 'krishna.sharma@example.com',
    applicantAddress: 'Nagarjun-4, Kathmandu',
    memberId: 'AJ-2075-0142',
    loanSchemeId: 'loan-1',
    loanSchemeName: 'Small & Medium Business Loan',
    requestedAmount: 800000,
    requestedTenureMonths: 36,
    purpose: 'Expansion of grocery retail inventory and solar backup installation.',
    monthlyIncome: 65000,
    collateralType: 'Land & Building (Lalpurja at Nagarjun-4)',
    status: 'Under Review',
    submittedAt: '2026-10-24 14:30',
    adminRemarks: 'Preliminary documents verified. Site visit scheduled for Sunday.'
  },
  {
    id: 'app-002',
    applicationNo: 'LA-2081-092',
    applicantName: 'Sunita Maharjan',
    applicantPhone: '+977-9851122334',
    applicantEmail: 'sunita.m@example.com',
    applicantAddress: 'Nagarjun-4, Sitapaila, Kathmandu',
    loanSchemeId: 'loan-2',
    loanSchemeName: 'Agriculture & Livestock Loan',
    requestedAmount: 350000,
    requestedTenureMonths: 24,
    purpose: 'Poultry farm shed expansion and organic feed procurement.',
    monthlyIncome: 45000,
    collateralType: 'Group Guarantee & Farmland Lease',
    status: 'Approved',
    submittedAt: '2026-10-21 11:15',
    adminRemarks: 'Credit committee approval granted. Member informed for contract signing.'
  }
];

export const INITIAL_CONTACT_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-001',
    fullName: 'Ramesh Bahadur Thapa',
    email: 'ramesh.thapa@gmail.com',
    phone: '+977-9841998877',
    subject: 'Inquiry regarding Fixed Deposit interest calculation for 3 years',
    message: 'Namaste. I want to deposit NPR 500,000 for 3 years. Will I receive quarterly interest payout directly to my saving account? Please inform.',
    createdAt: '2026-10-28 10:20',
    status: 'Replied',
    notes: 'Informed via phone that 11% quarterly payout is available.'
  },
  {
    id: 'msg-002',
    fullName: 'Sarita Ghimire',
    email: 'sarita.g@outlook.com',
    phone: '+977-9801234567',
    subject: 'Request for membership application and share fee details',
    message: 'Hello, our family recently relocated to Nagarjun-4. Can we open a joint saving account and children savings account at the same time?',
    createdAt: '2026-10-30 16:45',
    status: 'Pending'
  }
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'act-1',
    timestamp: '2026-10-31 09:15',
    user: 'admin (Super Admin)',
    action: 'LOGIN',
    details: 'Administrator logged into CMS dashboard',
    ipAddress: '192.168.1.104'
  },
  {
    id: 'act-2',
    timestamp: '2026-10-30 15:40',
    user: 'admin',
    action: 'UPDATE_NOTICE',
    details: 'Pinned 16th Annual General Meeting Notice',
    ipAddress: '192.168.1.104'
  },
  {
    id: 'act-3',
    timestamp: '2026-10-29 11:20',
    user: 'admin',
    action: 'APPROVE_LOAN',
    details: 'Loan application LA-2081-092 marked as Approved',
    ipAddress: '192.168.1.104'
  }
];
