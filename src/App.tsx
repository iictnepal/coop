/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { EmiCalculatorModal } from './components/common/EmiCalculatorModal';
import { LoanApplicationModal } from './components/common/LoanApplicationModal';

// Pages
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { SavingsPage } from './components/pages/SavingsPage';
import { LoansPage } from './components/pages/LoansPage';
import { NoticesPage } from './components/pages/NoticesPage';
import { NewsPage } from './components/pages/NewsPage';
import { GalleryPage } from './components/pages/GalleryPage';
import { DownloadsPage } from './components/pages/DownloadsPage';
import { ContactPage } from './components/pages/ContactPage';
import { MemberPortal } from './components/member/MemberPortal';
import { AdminPanel } from './components/admin/AdminPanel';
import { PhpPackageExporter } from './components/export/PhpPackageExporter';

const AppContent: React.FC = () => {
  const { currentPage, lang } = useApp();

  return (
    <div className={`min-h-screen flex flex-col bg-[#f8f7f4] text-[#111111] ${lang === 'ne' ? 'font-nepali' : ''}`}>
      <Header />

      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'savings' && <SavingsPage />}
        {currentPage === 'loans' && <LoansPage />}
        {currentPage === 'notices' && <NoticesPage />}
        {currentPage === 'news' && <NewsPage />}
        {currentPage === 'gallery' && <GalleryPage />}
        {currentPage === 'downloads' && <DownloadsPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'member' && <MemberPortal />}
        {currentPage === 'admin' && <AdminPanel />}
        {currentPage === 'source-export' && <PhpPackageExporter />}
      </main>

      <Footer />

      {/* Global Modals & Notifications */}
      <EmiCalculatorModal />
      <LoanApplicationModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
