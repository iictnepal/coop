import React from 'react';
import { useApp, PageRoute } from '../../context/AppContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  FileCode,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { lang, t, setCurrentPage, settings } = useApp();

  const handleNav = (page: PageRoute) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111111] text-[#f8f7f4] border-t-2 border-[#111111]">
      {/* Variation 2: 3-column Grid (2fr 1fr 1.5fr) */}
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
        {/* Column 1: About Institution (md:col-span-5) */}
        <div className="md:col-span-5 space-y-4">
          <span className="label text-[#d6a943] block">
            {lang === 'ne' ? 'हाम्रो बारेमा' : 'ABOUT US'}
          </span>

          <h3 className="font-syne font-bold text-lg text-white">
            {lang === 'ne' ? settings.orgNameNe : settings.orgNameEn}
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 opacity-80 leading-relaxed max-w-md">
            {lang === 'ne'
              ? 'आधुनिक जन बचत तथा ऋण सहकारी संस्था लिमिटेड आपसी सहयोग, लोकतान्त्रिक नियन्त्रण र वित्तीय अनुशासनको सिद्धान्तमा सञ्चालित छ।'
              : 'Aadhunik Jana Saving & Credit Co-operative Ltd. operates on democratic control, transparent governance, statutory liquidity, and community empowerment in Nagarjun-4, Kathmandu.'}
          </p>

          <div className="pt-2 flex flex-wrap gap-4 font-mono-code text-xs">
            <span className="label text-[#d6a943]">
              REG: {settings.regNumber.split('(')[0].replace(/[^0-9/]/g, '') || '1248/065/066'}
            </span>
            <span className="label text-[#d6a943]">
              PAN: {settings.panNumber.replace(/[^0-9]/g, '') || '302847195'}
            </span>
          </div>
        </div>

        {/* Column 2: Quick Links (md:col-span-3) */}
        <div className="md:col-span-3 space-y-4">
          <span className="label text-[#d6a943] block">
            {lang === 'ne' ? 'क्विक लिङ्क्स' : 'QUICK LINKS'}
          </span>

          <ul className="space-y-2.5 font-mono-code text-xs uppercase tracking-wider">
            <li>
              <button
                onClick={() => handleNav('member')}
                className="text-[#f8f7f4] opacity-80 hover:opacity-100 hover:text-[#d6a943] transition flex items-center gap-1.5"
              >
                <span>→</span>
                <span>{t.memberLogin}</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('savings')}
                className="text-[#f8f7f4] opacity-80 hover:opacity-100 hover:text-[#d6a943] transition flex items-center gap-1.5"
              >
                <span>→</span>
                <span>{lang === 'ne' ? 'ब्याजदर विवरण' : 'Interest Rates'}</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('loans')}
                className="text-[#f8f7f4] opacity-80 hover:opacity-100 hover:text-[#d6a943] transition flex items-center gap-1.5"
              >
                <span>→</span>
                <span>{t.loans}</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('downloads')}
                className="text-[#f8f7f4] opacity-80 hover:opacity-100 hover:text-[#d6a943] transition flex items-center gap-1.5"
              >
                <span>→</span>
                <span>{lang === 'ne' ? 'डाउनलोड केन्द्र' : 'Downloads Hub'}</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('notices')}
                className="text-[#f8f7f4] opacity-80 hover:opacity-100 hover:text-[#d6a943] transition flex items-center gap-1.5"
              >
                <span>→</span>
                <span>{t.notices}</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav('source-export')}
                className="text-[#d6a943] font-bold hover:underline flex items-center gap-1.5"
              >
                <span>→</span>
                <span>PHP 8.4 Source Code</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact & Hours (md:col-span-4) */}
        <div className="md:col-span-4 space-y-4">
          <span className="label text-[#d6a943] block">
            {lang === 'ne' ? 'सम्पर्क ठेगाना' : 'CONTACT & LOCATION'}
          </span>

          <div className="space-y-2 text-xs sm:text-sm text-slate-300 opacity-80 leading-relaxed font-mono-code">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#d6a943] shrink-0 mt-0.5" />
              <span>{lang === 'ne' ? settings.addressNe : settings.addressEn}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#d6a943] shrink-0" />
              <span>{settings.phone} / {settings.phoneSecondary}</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#d6a943] shrink-0" />
              <span>{settings.email}</span>
            </p>
            <p className="flex items-start gap-2 text-[#d6a943] font-bold pt-2 border-t border-white/10">
              <Clock className="w-4 h-4 text-[#d6a943] shrink-0 mt-0.5" />
              <span>{lang === 'ne' ? '१०:०० AM - ४:०० PM (आइत-शुक्र)' : '10:00 AM - 4:00 PM (Sun-Fri)'}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Legal / Copyright Strip */}
      <div className="border-t border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-[11px] font-mono-code text-slate-400 gap-3">
          <p>
            © {new Date().getFullYear()} {lang === 'ne' ? settings.orgNameNe : settings.orgNameEn}
          </p>
          <div className="flex items-center gap-4">
            <span>NAGARJUN-4, KATHMANDU</span>
            <span>·</span>
            <button
              onClick={() => handleNav('admin')}
              className="hover:text-[#d6a943] transition underline uppercase"
            >
              CMS LOGIN
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
