import React, { useState } from 'react';
import { useApp, PageRoute } from '../../context/AppContext';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  User,
  ShieldAlert,
  Calculator,
  Menu,
  X,
  FileCode,
  Sparkles,
} from 'lucide-react';

export const Header: React.FC = () => {
  const { lang, setLang, t, currentPage, setCurrentPage, settings, memberUser, adminUser, setIsEmiOpen } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: PageRoute }[] = [
    { label: t.home, page: 'home' },
    { label: t.aboutUs, page: 'about' },
    { label: t.savings, page: 'savings' },
    { label: t.loans, page: 'loans' },
    { label: t.notices, page: 'notices' },
    { label: t.news, page: 'news' },
    { label: t.gallery, page: 'gallery' },
    { label: t.downloads, page: 'downloads' },
    { label: t.contactUs, page: 'contact' },
  ];

  const handleNavClick = (page: PageRoute) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full sticky top-0 z-40 bg-[#f8f7f4] border-b-2 border-[#111111]">
      {/* Top Information Bar (Variation 2 Mono Strip) */}
      <div className="bg-[#111111] text-[#f8f7f4] text-xs py-1.5 px-4 font-mono-code border-b border-[#111111]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2">
          {/* Left contact info */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-slate-300 text-[11px]">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#d6a943]" />
              <span>{lang === 'ne' ? settings.addressNe : settings.addressEn}</span>
            </span>
            <a href={`tel:${settings.phone}`} className="flex items-center gap-1.5 hover:text-[#d6a943] transition">
              <Phone className="w-3.5 h-3.5 text-[#d6a943]" />
              <span>{settings.phone}</span>
            </a>
            <span className="hidden lg:flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-[#d6a943]" />
              <span>{lang === 'ne' ? settings.officeHoursNe : settings.officeHoursEn}</span>
            </span>
          </div>

          {/* Right: Language switch & quick actions */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Source Code exporter quick button */}
            <button
              onClick={() => handleNavClick('source-export')}
              className={`flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-bold border transition ${
                currentPage === 'source-export'
                  ? 'bg-[#d6a943] text-[#111111] border-[#d6a943]'
                  : 'bg-transparent text-[#d6a943] border-[#d6a943]/60 hover:bg-[#d6a943]/10'
              }`}
              title="Download PHP 8.4 & MySQL complete source for XAMPP / cPanel"
            >
              <FileCode className="w-3 h-3 text-[#d6a943]" />
              <span>PHP SOURCE</span>
            </button>

            {/* Language Switcher */}
            <div className="flex items-center border border-white/20 p-0.5 text-[11px]">
              <button
                onClick={() => setLang('ne')}
                className={`px-2 py-0.5 transition font-bold ${
                  lang === 'ne'
                    ? 'bg-[#d6a943] text-[#111111]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                NEP
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 transition font-bold ${
                  lang === 'en'
                    ? 'bg-[#d6a943] text-[#111111]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                ENG
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Brand & Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo Area (Variation 2 Style) */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          {/* Logo Box: 48px square, background #111111, border #d6a943 */}
          <div className="w-12 h-12 bg-[#111111] border-2 border-[#d6a943] flex items-center justify-center p-1.5 shadow-[3px_3px_0_#111111] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="46" fill="#111111" stroke="#d6a943" strokeWidth="4" />
              <path d="M50 18 L82 72 L18 72 Z" fill="#d6a943" opacity="0.95" />
              <path d="M50 32 L72 68 L28 68 Z" fill="#f8f7f4" />
              <circle cx="50" cy="54" r="8" fill="#111111" />
              <rect x="22" y="72" width="56" height="6" fill="#d6a943" />
            </svg>
          </div>

          <div>
            <h1 className="font-syne font-extrabold text-lg md:text-xl text-[#111111] leading-none tracking-tight">
              {lang === 'ne' ? 'आधुनिक जन बचत' : 'Aadhunik Jana SACCOS'}
            </h1>
            <span className="label block mt-1">
              REG. NO: {settings.regNumber.split('(')[0].replace(/[^0-9/]/g, '') || '1248/065/066'} · NAGARJUN-4
            </span>
          </div>
        </div>

        {/* Action Controls: EMI Calculator, Member Portal, Admin */}
        <div className="hidden lg:flex items-center gap-3">
          {/* EMI Calculator */}
          <button
            onClick={() => setIsEmiOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-[#111111] bg-transparent text-[#111111] font-mono-code text-xs font-bold uppercase tracking-wider hover:bg-[#111111]/5 transition"
          >
            <Calculator className="w-3.5 h-3.5 text-[#111111]" />
            <span>{t.calcEmi}</span>
          </button>

          {/* Member Portal */}
          <button
            onClick={() => handleNavClick('member')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 border-2 border-[#111111] font-mono-code text-xs font-bold uppercase tracking-wider transition ${
              currentPage === 'member'
                ? 'bg-[#d6a943] text-[#111111] shadow-[3px_3px_0_#111111]'
                : 'bg-white text-[#111111] hover:bg-[#111111]/5 shadow-[2px_2px_0_#111111]'
            }`}
          >
            <User className="w-3.5 h-3.5 text-[#111111]" />
            <span>{memberUser ? `${memberUser.fullName.split(' ')[0]} (PORTAL)` : t.memberLogin}</span>
            {memberUser && <span className="w-2 h-2 rounded-full bg-emerald-600"></span>}
          </button>

          {/* Admin CMS */}
          <button
            onClick={() => handleNavClick('admin')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 border-2 border-[#111111] font-mono-code text-xs font-bold uppercase tracking-wider transition ${
              currentPage === 'admin'
                ? 'bg-[#d6a943] text-[#111111] shadow-[3px_3px_0_#111111]'
                : 'bg-[#111111] text-[#f8f7f4] hover:bg-[#d6a943] hover:text-[#111111] shadow-[3px_3px_0_#111111]'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-[#d6a943] group-hover:text-[#111111]" />
            <span>{adminUser ? 'CMS' : t.adminLogin}</span>
            {adminUser && <span className="w-2 h-2 rounded-full bg-[#d6a943]"></span>}
          </button>
        </div>

        {/* Mobile Hamburger / Close Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#111111] border-2 border-[#111111] bg-white shadow-[2px_2px_0_#111111] cursor-pointer hover:bg-slate-100 transition"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Desktop Main Navigation Bar (Clean Brutalist Track) */}
      <nav className="hidden lg:block border-t border-[#111111]/15 bg-[#f8f7f4]">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <ul className="flex items-center gap-1 font-mono-code text-xs font-bold uppercase tracking-wider">
            {navLinks.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <li key={item.page}>
                  <button
                    onClick={() => handleNavClick(item.page)}
                    className={`px-4 py-2.5 transition relative flex items-center gap-1 ${
                      isActive
                        ? 'text-[#111111] bg-[#111111]/10 font-bold border-b-2 border-[#111111]'
                        : 'text-[#111111]/80 hover:text-[#111111] hover:bg-[#111111]/5'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Quick Apply Loan pill in desktop nav */}
          <div className="py-1.5">
            <button
              onClick={() => handleNavClick('loans')}
              className="flex items-center gap-1.5 bg-[#d6a943] text-[#111111] text-xs font-mono-code font-bold uppercase px-3 py-1 border-2 border-[#111111] shadow-[2px_2px_0_#111111] hover:translate-x-0.5 hover:translate-y-0.5 transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.applyLoan}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#f8f7f4] border-t-2 border-[#111111] px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#111111]/10">
            <button
              onClick={() => handleNavClick('member')}
              className="flex items-center justify-center gap-1.5 py-2 text-xs font-mono-code font-bold uppercase border-2 border-[#111111] bg-white text-[#111111] shadow-[2px_2px_0_#111111]"
            >
              <User className="w-3.5 h-3.5" />
              <span>{t.memberLogin}</span>
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className="flex items-center justify-center gap-1.5 py-2 text-xs font-mono-code font-bold uppercase border-2 border-[#111111] bg-[#111111] text-[#f8f7f4] shadow-[2px_2px_0_#111111]"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-[#d6a943]" />
              <span>{t.adminLogin}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#111111]/10">
            <button
              onClick={() => {
                setIsEmiOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 py-2 text-xs font-mono-code font-bold uppercase border border-[#111111] bg-[#111111]/5 text-[#111111]"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>{t.calcEmi}</span>
            </button>
            <button
              onClick={() => handleNavClick('source-export')}
              className="flex items-center justify-center gap-1.5 py-2 text-xs font-mono-code font-bold uppercase border border-[#111111] bg-[#d6a943] text-[#111111]"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>PHP CODE</span>
            </button>
          </div>

          <ul className="space-y-1 font-mono-code text-xs uppercase font-bold">
            {navLinks.map((item) => (
              <li key={item.page}>
                <button
                  onClick={() => handleNavClick(item.page)}
                  className={`w-full text-left px-3 py-2 border transition ${
                    currentPage === item.page
                      ? 'bg-[#111111] text-[#f8f7f4] border-[#111111]'
                      : 'border-transparent text-[#111111] hover:bg-[#111111]/5'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};
