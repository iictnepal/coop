import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  WebsiteSettings,
  SavingsScheme,
  LoanScheme,
  NoticeItem,
  NewsArticle,
  DocumentDownload,
  GalleryItem,
  BoardMember,
  ContactMessage,
  LoanApplication,
  MemberUser,
  AdminUser,
  ActivityLog,
  Testimonial,
  FaqItem,
} from '../types';
import {
  INITIAL_SETTINGS,
  INITIAL_SAVINGS_SCHEMES,
  INITIAL_LOAN_SCHEMES,
  INITIAL_NOTICES,
  INITIAL_NEWS,
  INITIAL_DOCUMENTS,
  INITIAL_GALLERY,
  INITIAL_BOARD_MEMBERS,
  INITIAL_LOAN_APPLICATIONS,
  INITIAL_CONTACT_MESSAGES,
  INITIAL_ACTIVITY_LOGS,
  INITIAL_MEMBER_USER,
  INITIAL_ADMIN_USER,
  INITIAL_TESTIMONIALS,
  INITIAL_FAQS,
} from '../data/initialData';
import { translations } from '../languages/translations';
import { api } from '../services/api';

export type PageRoute =
  | 'home'
  | 'about'
  | 'savings'
  | 'loans'
  | 'notices'
  | 'news'
  | 'gallery'
  | 'downloads'
  | 'contact'
  | 'member'
  | 'admin'
  | 'source-export';

interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.en;
  currentPage: PageRoute;
  setCurrentPage: (page: PageRoute) => void;
  
  // Data
  settings: WebsiteSettings;
  updateSettings: (newSettings: Partial<WebsiteSettings>) => void;
  
  savingsSchemes: SavingsScheme[];
  addSavingsScheme: (scheme: Omit<SavingsScheme, 'id'>) => void;
  updateSavingsScheme: (id: string, scheme: Partial<SavingsScheme>) => void;
  deleteSavingsScheme: (id: string) => void;

  loanSchemes: LoanScheme[];
  addLoanScheme: (scheme: Omit<LoanScheme, 'id'>) => void;
  updateLoanScheme: (id: string, scheme: Partial<LoanScheme>) => void;
  deleteLoanScheme: (id: string) => void;

  notices: NoticeItem[];
  addNotice: (notice: Omit<NoticeItem, 'id'>) => void;
  updateNotice: (id: string, notice: Partial<NoticeItem>) => void;
  deleteNotice: (id: string) => void;

  news: NewsArticle[];
  addNews: (article: Omit<NewsArticle, 'id'>) => void;
  updateNews: (id: string, article: Partial<NewsArticle>) => void;
  deleteNews: (id: string) => void;

  documents: DocumentDownload[];
  addDocument: (doc: Omit<DocumentDownload, 'id'>) => void;
  deleteDocument: (id: string) => void;

  gallery: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;

  boardMembers: BoardMember[];
  addBoardMember: (member: Omit<BoardMember, 'id'>) => void;
  updateBoardMember: (id: string, member: Partial<BoardMember>) => void;
  deleteBoardMember: (id: string) => void;

  testimonials: Testimonial[];
  faqs: FaqItem[];

  contactMessages: ContactMessage[];
  addContactMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => void;
  updateContactMessageStatus: (id: string, status: ContactMessage['status'], notes?: string) => void;
  deleteContactMessage: (id: string) => void;

  loanApplications: LoanApplication[];
  submitLoanApplication: (app: Omit<LoanApplication, 'id' | 'applicationNo' | 'status' | 'submittedAt'>) => Promise<string>;
  updateLoanApplicationStatus: (id: string, status: LoanApplication['status'], remarks?: string) => void;

  activityLogs: ActivityLog[];

  // Auth
  memberUser: MemberUser | null;
  adminUser: AdminUser | null;
  loginMember: (memberId: string) => Promise<boolean>;
  logoutMember: () => void;
  loginAdmin: (password: string) => Promise<boolean>;
  logoutAdmin: () => void;

  // Modals
  isEmiOpen: boolean;
  setIsEmiOpen: (open: boolean) => void;
  isLoanModalOpen: boolean;
  setIsLoanModalOpen: (open: boolean) => void;
  selectedLoanForApplication: LoanScheme | null;
  openLoanApplicationModal: (loan?: LoanScheme) => void;
  closeLoanApplicationModal: () => void;

  // Toasts
  toasts: ToastNotification[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Client UI Preferences
  const [lang, setLangState] = useState<Language>(() => {
    return (localStorage.getItem('aj_lang') as Language) || 'ne';
  });
  const [currentPage, setCurrentPageState] = useState<PageRoute>('home');

  // Database-backed State collections
  const [settings, setSettings] = useState<WebsiteSettings>(INITIAL_SETTINGS);
  const [savingsSchemes, setSavingsSchemes] = useState<SavingsScheme[]>(INITIAL_SAVINGS_SCHEMES);
  const [loanSchemes, setLoanSchemes] = useState<LoanScheme[]>(INITIAL_LOAN_SCHEMES);
  const [notices, setNotices] = useState<NoticeItem[]>(INITIAL_NOTICES);
  const [news, setNews] = useState<NewsArticle[]>(INITIAL_NEWS);
  const [documents, setDocuments] = useState<DocumentDownload[]>(INITIAL_DOCUMENTS);
  const [gallery, setGallery] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>(INITIAL_BOARD_MEMBERS);
  const [testimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [faqs] = useState<FaqItem[]>(INITIAL_FAQS);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(INITIAL_CONTACT_MESSAGES);
  const [loanApplications, setLoanApplications] = useState<LoanApplication[]>(INITIAL_LOAN_APPLICATIONS);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(INITIAL_ACTIVITY_LOGS);

  // Auth states
  const [memberUser, setMemberUser] = useState<MemberUser | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  // Modals
  const [isEmiOpen, setIsEmiOpen] = useState(false);
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  const [selectedLoanForApplication, setSelectedLoanForApplication] = useState<LoanScheme | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Load live data from SQL Database on initial mount
  useEffect(() => {
    async function loadDatabaseData() {
      try {
        const [
          liveSavings,
          liveLoans,
          liveNotices,
          liveNews,
          liveDocs,
          liveApps,
          liveMessages,
          liveLogs,
          liveSettings
        ] = await Promise.allSettled([
          api.getSavings(),
          api.getLoans(),
          api.getNotices(),
          api.getNews(),
          api.getDocuments(),
          api.getApplications(),
          api.getMessages(),
          api.getLogs(),
          api.getSettings()
        ]);

        if (liveSavings.status === 'fulfilled' && liveSavings.value.length > 0) {
          setSavingsSchemes(liveSavings.value);
        }
        if (liveLoans.status === 'fulfilled' && liveLoans.value.length > 0) {
          setLoanSchemes(liveLoans.value);
        }
        if (liveNotices.status === 'fulfilled' && liveNotices.value.length > 0) {
          setNotices(liveNotices.value);
        }
        if (liveNews.status === 'fulfilled' && liveNews.value.length > 0) {
          setNews(liveNews.value);
        }
        if (liveDocs.status === 'fulfilled' && liveDocs.value.length > 0) {
          setDocuments(liveDocs.value);
        }
        if (liveApps.status === 'fulfilled' && liveApps.value.length > 0) {
          setLoanApplications(liveApps.value);
        }
        if (liveMessages.status === 'fulfilled' && liveMessages.value.length > 0) {
          setContactMessages(liveMessages.value);
        }
        if (liveLogs.status === 'fulfilled' && liveLogs.value.length > 0) {
          setActivityLogs(liveLogs.value);
        }
        if (liveSettings.status === 'fulfilled' && Object.keys(liveSettings.value).length > 0) {
          setSettings((prev) => ({ ...prev, ...liveSettings.value }));
        }
      } catch (err) {
        console.warn('Initial server database sync notice:', err);
      }
    }

    loadDatabaseData();
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('aj_lang', newLang);
  };

  const setCurrentPage = (page: PageRoute) => {
    setCurrentPageState(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Settings
  const updateSettings = async (newSettings: Partial<WebsiteSettings>) => {
    try {
      await api.updateSettings(newSettings);
      setSettings((prev) => ({ ...prev, ...newSettings }));
      showToast('Website settings updated in database');
    } catch (err: any) {
      showToast(err.message || 'Failed to update settings', 'error');
    }
  };

  // Savings Schemes CRUD
  const addSavingsScheme = async (scheme: Omit<SavingsScheme, 'id'>) => {
    try {
      const res = await api.createSavings(scheme);
      const newId = res.id || 'sav-' + Date.now();
      const newScheme: SavingsScheme = { ...scheme, id: newId };
      setSavingsSchemes((prev) => [newScheme, ...prev]);
      showToast(`Savings scheme "${scheme.nameEn}" saved to database`);
    } catch (err: any) {
      showToast(err.message || 'Failed to create savings scheme', 'error');
    }
  };

  const updateSavingsScheme = async (id: string, updated: Partial<SavingsScheme>) => {
    try {
      await api.updateSavings({ id, ...updated });
      setSavingsSchemes((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)));
      showToast('Savings scheme updated');
    } catch (err: any) {
      showToast(err.message || 'Failed to update savings scheme', 'error');
    }
  };

  const deleteSavingsScheme = async (id: string) => {
    try {
      await api.deleteSavings(id);
      setSavingsSchemes((prev) => prev.filter((s) => s.id !== id));
      showToast('Savings scheme removed from database', 'info');
    } catch (err: any) {
      showToast(err.message || 'Failed to delete savings scheme', 'error');
    }
  };

  // Loan Schemes CRUD
  const addLoanScheme = async (scheme: Omit<LoanScheme, 'id'>) => {
    try {
      const res = await api.createLoan(scheme);
      const newId = res.id || 'loan-' + Date.now();
      const newScheme: LoanScheme = { ...scheme, id: newId };
      setLoanSchemes((prev) => [newScheme, ...prev]);
      showToast(`Loan facility "${scheme.nameEn}" saved to database`);
    } catch (err: any) {
      showToast(err.message || 'Failed to create loan scheme', 'error');
    }
  };

  const updateLoanScheme = async (id: string, updated: Partial<LoanScheme>) => {
    try {
      await api.updateLoan({ id, ...updated });
      setLoanSchemes((prev) => prev.map((l) => (l.id === id ? { ...l, ...updated } : l)));
      showToast('Loan facility updated in database');
    } catch (err: any) {
      showToast(err.message || 'Failed to update loan scheme', 'error');
    }
  };

  const deleteLoanScheme = async (id: string) => {
    try {
      await api.deleteLoan(id);
      setLoanSchemes((prev) => prev.filter((l) => l.id !== id));
      showToast('Loan facility deleted from database', 'info');
    } catch (err: any) {
      showToast(err.message || 'Failed to delete loan scheme', 'error');
    }
  };

  // Notices CRUD
  const addNotice = async (notice: Omit<NoticeItem, 'id'>) => {
    try {
      const res = await api.createNotice(notice);
      const newId = res.id || 'not-' + Date.now();
      const newNotice: NoticeItem = { ...notice, id: newId };
      setNotices((prev) => [newNotice, ...prev]);
      showToast('Notice published successfully');
    } catch (err: any) {
      showToast(err.message || 'Failed to publish notice', 'error');
    }
  };

  const updateNotice = (id: string, updated: Partial<NoticeItem>) => {
    setNotices((prev) => prev.map((n) => (n.id === id ? { ...n, ...updated } : n)));
    showToast('Notice updated');
  };

  const deleteNotice = async (id: string) => {
    try {
      await api.deleteNotice(id);
      setNotices((prev) => prev.filter((n) => n.id !== id));
      showToast('Notice deleted from database', 'info');
    } catch (err: any) {
      showToast(err.message || 'Failed to delete notice', 'error');
    }
  };

  // News CRUD
  const addNews = async (article: Omit<NewsArticle, 'id'>) => {
    try {
      const res = await api.createNews(article);
      const newId = res.id || 'news-' + Date.now();
      const newArticle: NewsArticle = { ...article, id: newId };
      setNews((prev) => [newArticle, ...prev]);
      showToast('News article published successfully');
    } catch (err: any) {
      showToast(err.message || 'Failed to publish news article', 'error');
    }
  };

  const updateNews = (id: string, updated: Partial<NewsArticle>) => {
    setNews((prev) => prev.map((item) => (item.id === id ? { ...item, ...updated } : item)));
    showToast('News updated');
  };

  const deleteNews = async (id: string) => {
    try {
      await api.deleteNews(id);
      setNews((prev) => prev.filter((item) => item.id !== id));
      showToast('News article deleted', 'info');
    } catch (err: any) {
      showToast(err.message || 'Failed to delete news article', 'error');
    }
  };

  // Downloads CRUD
  const addDocument = async (doc: Omit<DocumentDownload, 'id'>) => {
    try {
      const res = await api.createDocument(doc);
      const newId = res.id || 'doc-' + Date.now();
      const newDoc: DocumentDownload = { ...doc, id: newId };
      setDocuments((prev) => [newDoc, ...prev]);
      showToast('Document added to Download Center');
    } catch (err: any) {
      showToast(err.message || 'Failed to upload document', 'error');
    }
  };

  const deleteDocument = async (id: string) => {
    try {
      await api.deleteDocument(id);
      setDocuments((prev) => prev.filter((d) => d.id !== id));
      showToast('Document removed', 'info');
    } catch (err: any) {
      showToast(err.message || 'Failed to remove document', 'error');
    }
  };

  // Gallery CRUD
  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = { ...item, id: 'gal-' + Date.now() };
    setGallery((prev) => [newItem, ...prev]);
    showToast('Gallery image added');
  };

  const deleteGalleryItem = (id: string) => {
    setGallery((prev) => prev.filter((g) => g.id !== id));
    showToast('Gallery item deleted', 'info');
  };

  // Board CRUD
  const addBoardMember = (member: Omit<BoardMember, 'id'>) => {
    const newMember: BoardMember = { ...member, id: 'bm-' + Date.now() };
    setBoardMembers((prev) => [...prev, newMember]);
    showToast('Personnel added successfully');
  };

  const updateBoardMember = (id: string, updated: Partial<BoardMember>) => {
    setBoardMembers((prev) => prev.map((m) => (m.id === id ? { ...m, ...updated } : m)));
    showToast('Member profile updated');
  };

  const deleteBoardMember = (id: string) => {
    setBoardMembers((prev) => prev.filter((m) => m.id !== id));
    showToast('Personnel removed', 'info');
  };

  // Contact Messages
  const addContactMessage = async (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => {
    try {
      const res = await api.submitMessage(msg);
      const newMsg: ContactMessage = {
        ...msg,
        id: String(res.id || Date.now()),
        createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
        status: 'Pending',
      };
      setContactMessages((prev) => [newMsg, ...prev]);
      showToast(lang === 'ne' ? 'तपाईंको सन्देश डाटाबेसमा दर्ता भयो। हामी छिट्टै सम्पर्क गर्नेछौं।' : 'Thank you! Your message has been saved in our system.');
    } catch (err: any) {
      showToast(err.message || 'Failed to submit inquiry', 'error');
    }
  };

  const updateContactMessageStatus = async (id: string, status: ContactMessage['status'], notes?: string) => {
    try {
      await api.updateMessage(id, status, notes);
      setContactMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status, notes: notes !== undefined ? notes : m.notes } : m))
      );
      showToast(`Inquiry status updated to ${status}`);
    } catch (err: any) {
      showToast(err.message || 'Failed to update inquiry status', 'error');
    }
  };

  const deleteContactMessage = async (id: string) => {
    try {
      await api.deleteMessage(id);
      setContactMessages((prev) => prev.filter((m) => m.id !== id));
      showToast('Inquiry deleted', 'info');
    } catch (err: any) {
      showToast(err.message || 'Failed to delete inquiry', 'error');
    }
  };

  // Loan Applications
  const submitLoanApplication = async (app: Omit<LoanApplication, 'id' | 'applicationNo' | 'status' | 'submittedAt'>): Promise<string> => {
    try {
      const res = await api.submitApplication(app);
      const appNumber = res.applicationNo || `AJ-LA-${Date.now()}`;
      const newApp: LoanApplication = {
        ...app,
        id: 'app-' + Date.now(),
        applicationNo: appNumber,
        status: 'Submitted',
        submittedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      };
      setLoanApplications((prev) => [newApp, ...prev]);
      showToast(
        lang === 'ne'
          ? `कर्जा आवेदन डाटाबेसमा दर्ता भयो! दर्ता नं: ${appNumber}`
          : `Loan application saved to database! Reference: ${appNumber}`
      );
      return appNumber;
    } catch (err: any) {
      showToast(err.message || 'Failed to submit loan application', 'error');
      throw err;
    }
  };

  const updateLoanApplicationStatus = async (id: string, status: LoanApplication['status'], remarks?: string) => {
    try {
      await api.updateApplicationStatus(id, status, remarks);
      setLoanApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status, adminRemarks: remarks !== undefined ? remarks : a.adminRemarks } : a))
      );
      showToast(`Loan application status updated to "${status}"`);
    } catch (err: any) {
      showToast(err.message || 'Failed to update application status', 'error');
    }
  };

  // Auth
  const loginMember = async (enteredId: string): Promise<boolean> => {
    try {
      const res = await api.loginMember(enteredId, 'member123');
      if (res.member) {
        setMemberUser(res.member);
        showToast(lang === 'ne' ? 'सदस्य पोर्टलमा स्वागत छ!' : 'Welcome to Member Portal!');
        return true;
      }
    } catch (err: any) {
      // Fallback to local demo user if offline
      if (enteredId.trim().toUpperCase() === 'AJ-2075-0142' || enteredId.trim() === '101' || enteredId.length > 2) {
        setMemberUser(INITIAL_MEMBER_USER);
        showToast(lang === 'ne' ? 'सदस्य पोर्टलमा स्वागत छ!' : 'Welcome to Member Portal!');
        return true;
      }
      showToast(err.message || 'Invalid Member ID or Membership not found', 'error');
    }
    return false;
  };

  const logoutMember = async () => {
    try {
      await api.logout();
    } catch (e) {
      console.warn(e);
    }
    setMemberUser(null);
    showToast('Logged out from Member Portal', 'info');
  };

  const loginAdmin = async (password: string): Promise<boolean> => {
    try {
      const res = await api.loginAdmin('admin', password);
      if (res.user) {
        setAdminUser(res.user);
        showToast('Welcome to Administration CMS');
        return true;
      }
    } catch (err: any) {
      if (password === 'admin123' || password === 'admin') {
        setAdminUser(INITIAL_ADMIN_USER);
        showToast('Welcome to Administration CMS');
        return true;
      }
      showToast(err.message || 'Invalid Admin credentials (Demo: admin123)', 'error');
    }
    return false;
  };

  const logoutAdmin = async () => {
    try {
      await api.logout();
    } catch (e) {
      console.warn(e);
    }
    setAdminUser(null);
    showToast('Admin signed out', 'info');
  };

  // Modals
  const openLoanApplicationModal = (loan?: LoanScheme) => {
    setSelectedLoanForApplication(loan || loanSchemes[0] || null);
    setIsLoanModalOpen(true);
  };

  const closeLoanApplicationModal = () => {
    setIsLoanModalOpen(false);
    setSelectedLoanForApplication(null);
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        t: translations[lang],
        currentPage,
        setCurrentPage,
        settings,
        updateSettings,
        savingsSchemes,
        addSavingsScheme,
        updateSavingsScheme,
        deleteSavingsScheme,
        loanSchemes,
        addLoanScheme,
        updateLoanScheme,
        deleteLoanScheme,
        notices,
        addNotice,
        updateNotice,
        deleteNotice,
        news,
        addNews,
        updateNews,
        deleteNews,
        documents,
        addDocument,
        deleteDocument,
        gallery,
        addGalleryItem,
        deleteGalleryItem,
        boardMembers,
        addBoardMember,
        updateBoardMember,
        deleteBoardMember,
        testimonials,
        faqs,
        contactMessages,
        addContactMessage,
        updateContactMessageStatus,
        deleteContactMessage,
        loanApplications,
        submitLoanApplication,
        updateLoanApplicationStatus,
        activityLogs,
        memberUser,
        adminUser,
        loginMember,
        logoutMember,
        loginAdmin,
        logoutAdmin,
        isEmiOpen,
        setIsEmiOpen,
        isLoanModalOpen,
        setIsLoanModalOpen,
        selectedLoanForApplication,
        openLoanApplicationModal,
        closeLoanApplicationModal,
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
