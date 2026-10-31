/**
 * Type definitions for Aadhunik Jana Saving & Credit Co-operative Ltd.
 */

export type Language = 'en' | 'ne';

export interface WebsiteSettings {
  orgNameEn: string;
  orgNameNe: string;
  sloganEn: string;
  sloganNe: string;
  regNumber: string;
  panNumber: string;
  addressEn: string;
  addressNe: string;
  phone: string;
  phoneSecondary: string;
  email: string;
  emailSecondary: string;
  officeHoursEn: string;
  officeHoursNe: string;
  facebookUrl: string;
  youtubeUrl: string;
  twitterUrl: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  maintenanceMode: boolean;
  defaultLanguage: Language;
  googleMapsEmbedUrl: string;
}

export interface SavingsScheme {
  id: string;
  nameEn: string;
  nameNe: string;
  category: 'Regular' | 'Periodic' | 'Special' | 'Child' | 'Senior';
  interestRate: string; // e.g. "7.50% - 9.00%"
  minimumDeposit: string; // e.g. "NPR 500"
  durationEn: string;
  durationNe: string;
  descriptionEn: string;
  descriptionNe: string;
  featuresEn: string[];
  featuresNe: string[];
  eligibilityEn: string;
  eligibilityNe: string;
  isActive: boolean;
  badge?: string;
}

export interface LoanScheme {
  id: string;
  nameEn: string;
  nameNe: string;
  category: 'Business' | 'Personal' | 'Emergency' | 'Agriculture' | 'Education' | 'Housing';
  interestRate: string; // e.g. "11.00% - 13.50%"
  loanLimitEn: string;
  loanLimitNe: string;
  tenureEn: string;
  tenureNe: string;
  descriptionEn: string;
  descriptionNe: string;
  featuresEn: string[];
  featuresNe: string[];
  eligibilityEn: string;
  eligibilityNe: string;
  documentsEn: string[];
  documentsNe: string[];
  isActive: boolean;
  badge?: string;
}

export interface NoticeItem {
  id: string;
  titleEn: string;
  titleNe: string;
  category: 'General' | 'AGM' | 'Financial Report' | 'Tender' | 'Holiday' | 'Urgent';
  publishedDate: string; // YYYY-MM-DD
  expiryDate?: string;
  contentEn: string;
  contentNe: string;
  isPinned: boolean;
  hasPdf: boolean;
  pdfFileName?: string;
  pdfSize?: string;
}

export interface NewsArticle {
  id: string;
  titleEn: string;
  titleNe: string;
  publishedDate: string;
  category: 'CSR' | 'Training' | 'Celebration' | 'Financial Literacy' | 'Community';
  summaryEn: string;
  summaryNe: string;
  contentEn: string;
  contentNe: string;
  imageUrl: string;
  readTime: string;
}

export interface DocumentDownload {
  id: string;
  titleEn: string;
  titleNe: string;
  category: 'Forms' | 'Reports' | 'Bylaws' | 'KYC' | 'Circulars';
  fileType: 'PDF' | 'DOCX';
  fileSize: string;
  publishDate: string;
  downloadsCount: number;
  descriptionEn: string;
  descriptionNe: string;
}

export interface GalleryItem {
  id: string;
  titleEn: string;
  titleNe: string;
  category: 'AGM' | 'Community Work' | 'Financial Education' | 'Branch Office';
  date: string;
  imageUrl: string;
  descriptionEn?: string;
  descriptionNe?: string;
}

export interface BoardMember {
  id: string;
  nameEn: string;
  nameNe: string;
  designationEn: string;
  designationNe: string;
  type: 'Board' | 'Account Committee' | 'Advisory' | 'Management';
  phone?: string;
  email?: string;
  imageUrl: string;
  order: number;
}

export interface Testimonial {
  id: string;
  nameEn: string;
  nameNe: string;
  membershipYear: string;
  occupationEn: string;
  occupationNe: string;
  quoteEn: string;
  quoteNe: string;
  rating: number;
  imageUrl?: string;
}

export interface FaqItem {
  id: string;
  questionEn: string;
  questionNe: string;
  answerEn: string;
  answerNe: string;
  category: 'General' | 'Savings' | 'Loans' | 'Membership';
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'Pending' | 'Read' | 'Replied';
  notes?: string;
}

export interface LoanApplication {
  id: string;
  applicationNo: string;
  applicantName: string;
  applicantPhone: string;
  applicantEmail: string;
  applicantAddress: string;
  memberId?: string;
  loanSchemeId: string;
  loanSchemeName: string;
  requestedAmount: number;
  requestedTenureMonths: number;
  purpose: string;
  monthlyIncome: number;
  collateralType: string;
  status: 'Submitted' | 'Under Review' | 'Approved' | 'Rejected';
  submittedAt: string;
  adminRemarks?: string;
}

export interface MemberUser {
  id: string;
  memberId: string; // e.g. "AJ-2081-0428"
  fullName: string;
  phone: string;
  email: string;
  accountType: string;
  joinDate: string;
  kycStatus: 'Verified' | 'Pending Verification' | 'Requires Update';
  address: string;
}

export interface AdminUser {
  id: string;
  username: string;
  fullName: string;
  role: 'Super Admin' | 'Loan Officer' | 'Content Editor';
  email: string;
  lastLogin: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
  ipAddress: string;
}
