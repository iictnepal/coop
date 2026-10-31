import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  TrendingUp,
  Users,
  PiggyBank,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Download,
  Building,
  Calculator,
  Bell,
  Sparkles,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    lang,
    t,
    setCurrentPage,
    savingsSchemes,
    loanSchemes,
    notices,
    news,
    boardMembers,
    testimonials,
    faqs,
    setIsEmiOpen,
    openLoanApplicationModal,
    settings,
  } = useApp();

  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [selectedNoticeIdx, setSelectedNoticeIdx] = useState(0);

  const pinnedNotice = notices[selectedNoticeIdx] || notices[0];

  return (
    <div className="w-full">
      {/* Hero Section (Variation 2: 1.2fr / 1fr Split with Hard Borders and Gold Showcase) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 min-h-[82vh] border-b-2 border-[#111111] bg-[#f8f7f4]">
        {/* Left Hero Text: lg:col-span-7 */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-16 lg:border-r-2 border-[#111111] flex flex-col justify-center">
          <span className="label">
            {lang === 'ne' ? '[ ०१ ] विश्वसनीय वित्तीय सहयात्री' : '[ 01 ] TRUSTED FINANCIAL COOPERATIVE'}
          </span>

          <h1 className="font-syne font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#111111] tracking-tight leading-[0.95] my-6">
            {lang === 'ne' ? 'सुरक्षित बचत, समुन्नत भविष्य।' : 'Secure Savings, Better Future.'}
          </h1>

          <p className="text-base sm:text-lg text-[#111111]/70 leading-relaxed max-w-xl">
            {lang === 'ne'
              ? 'नागार्जुन तथा काठमाडौं उपत्यकाका परिवार र साना उद्यमीहरूलाई आकर्षक ब्याजदर, सहज कर्जा तथा भरपर्दो वित्तीय सेवा।'
              : 'Empowering families and small entrepreneurs across Nagarjun and Kathmandu valley with high returns on savings, fair loans, and mutual cooperation.'}
          </p>

          {/* Action Buttons in Space Mono */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCurrentPage('savings')}
              className="btn-brutal-primary"
            >
              <span>{lang === 'ne' ? 'बचत योजनाहरू' : 'Explore Savings'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => openLoanApplicationModal()}
              className="btn-brutal-outline"
            >
              <span>{lang === 'ne' ? 'कर्जा आवेदन' : 'Apply For Loan'}</span>
            </button>

            <button
              onClick={() => setIsEmiOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 border-2 border-dashed border-[#111111] text-[#111111] font-mono-code font-bold text-xs uppercase hover:bg-[#111111]/5 transition"
            >
              <Calculator className="w-4 h-4 text-[#d6a943]" />
              <span>{t.calcEmi}</span>
            </button>
          </div>

          {/* Hero Meta: Stat Boxes with Syne Figures */}
          <div className="flex flex-wrap items-center gap-8 sm:gap-12 mt-12 pt-8 border-t border-[#111111]/15">
            <div className="stat-box">
              <span className="font-syne text-3xl sm:text-4xl font-extrabold text-[#111111] leading-none block">
                {lang === 'ne' ? '२,८५०+' : '2,850+'}
              </span>
              <span className="label block mt-1">
                {lang === 'ne' ? 'कुल सदस्यहरू' : 'ACTIVE MEMBERS'}
              </span>
            </div>

            <div className="stat-box">
              <span className="font-syne text-3xl sm:text-4xl font-extrabold text-[#111111] leading-none block">
                {lang === 'ne' ? '३४Cr+' : 'NPR 34Cr+'}
              </span>
              <span className="label block mt-1">
                {lang === 'ne' ? 'बचत परिचालन' : 'SAVINGS MOBILIZED'}
              </span>
            </div>

            <div className="stat-box">
              <span className="font-syne text-3xl sm:text-4xl font-extrabold text-[#111111] leading-none block">
                {lang === 'ne' ? '१६+' : '16+'}
              </span>
              <span className="label block mt-1">
                {lang === 'ne' ? 'अनुभव (वर्ष)' : 'YEARS OF TRUST'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Hero Image / Gold Stage: lg:col-span-5 */}
        <div className="lg:col-span-5 bg-[#d6a943] p-8 sm:p-12 lg:p-16 flex items-center justify-center relative overflow-hidden">
          {/* Brutalist Hard-Shadow Card */}
          <div className="bg-[#f8f7f4] border-2 border-[#111111] p-6 sm:p-8 w-full max-w-md shadow-[12px_12px_0_#111111]">
            <div className="flex items-center justify-between pb-3 border-b border-[#111111]/15">
              <span className="label text-[#111111] flex items-center gap-1.5 font-bold">
                <Bell className="w-3.5 h-3.5 text-[#111111]" />
                {lang === 'ne' ? 'महत्त्वपूर्ण सूचना' : 'OFFICIAL NOTICE'}
              </span>
              <span className="font-mono-code text-[11px] text-[#111111]/70">
                {pinnedNotice?.publishedDate || '2081-06-15'}
              </span>
            </div>

            <h3 className="font-syne text-xl sm:text-2xl font-bold text-[#111111] my-4 leading-tight">
              {lang === 'ne' ? pinnedNotice?.titleNe : pinnedNotice?.titleEn}
            </h3>

            <p className="text-xs sm:text-sm text-[#111111]/80 mb-6 leading-relaxed line-clamp-4">
              {lang === 'ne' ? pinnedNotice?.contentNe : pinnedNotice?.contentEn}
            </p>

            {/* Quick Switcher of notices inside card */}
            <div className="flex items-center gap-2 mb-6">
              {notices.slice(0, 3).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedNoticeIdx(idx)}
                  className={`h-2 border border-[#111111] transition-all ${
                    selectedNoticeIdx === idx ? 'w-8 bg-[#111111]' : 'w-2 bg-transparent'
                  }`}
                  aria-label={`Notice ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#111111]/15">
              <button
                onClick={() => setCurrentPage('notices')}
                className="label text-[#111111] hover:text-[#d6a943] underline font-bold cursor-pointer"
              >
                {lang === 'ne' ? 'विवरण हेर्नुहोस् →' : 'VIEW DETAILS →'}
              </button>

              <button
                onClick={() => setCurrentPage('downloads')}
                className="font-mono-code text-[11px] font-bold uppercase px-3 py-1 border border-[#111111] bg-white hover:bg-[#111111] hover:text-[#f8f7f4] transition flex items-center gap-1"
              >
                <Download className="w-3 h-3" />
                <span>PDF</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section 1: Savings Schemes (Variation 2: 3-column light grid with hairline borders & interest stamps) */}
      <section className="border-b-2 border-[#111111] bg-[#f8f7f4]">
        <div className="p-4 sm:p-6 border-b border-[#111111]/15 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="label">{lang === 'ne' ? '[ ०२ ] निक्षेप सेवा' : '[ 02 ] SAVINGS SCHEMES'}</span>
            <h2 className="font-syne font-extrabold text-2xl sm:text-3xl text-[#111111] mt-1">
              {lang === 'ne' ? 'उच्च प्रतिफल युक्त बचत योजनाहरू' : 'High Yield Savings & Deposits'}
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage('savings')}
            className="font-mono-code text-xs font-bold uppercase tracking-wider text-[#111111] hover:text-[#d6a943] underline"
          >
            {lang === 'ne' ? 'सबै बचत योजनाहरू हेर्नुहोस् →' : 'VIEW ALL SAVINGS SCHEMES →'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
          {savingsSchemes.slice(0, 3).map((scheme, idx) => (
            <div
              key={scheme.id}
              className={`p-6 sm:p-8 flex flex-col justify-between ${
                idx < 2 ? 'md:border-r border-[#111111]/15' : ''
              } border-b md:border-b-0 border-[#111111]/15`}
            >
              <div>
                <span className="label">
                  {lang === 'ne' ? scheme.category : scheme.category.toUpperCase()}
                </span>

                <h3 className="font-syne text-xl sm:text-2xl font-bold text-[#111111] my-3 leading-snug">
                  {lang === 'ne' ? scheme.nameNe : scheme.nameEn}
                  {idx === 0 && <span className="badge-brutal ml-2">POPULAR</span>}
                  {idx === 1 && <span className="badge-brutal ml-2">MUDDATI</span>}
                </h3>

                <p className="text-xs sm:text-sm text-[#111111]/70 mb-6 leading-relaxed">
                  {lang === 'ne' ? scheme.descriptionNe : scheme.descriptionEn}
                </p>

                {/* Features list */}
                <ul className="space-y-2 mb-6 font-mono-code text-xs text-[#111111]/80">
                  {(lang === 'ne' ? scheme.featuresNe : scheme.featuresEn).slice(0, 2).map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <span className="text-[#d6a943] font-bold">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="label block border-t border-[#111111]/15 pt-3">
                  INTEREST: {scheme.interestRate.toUpperCase()}
                </span>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-mono-code text-[11px] text-[#111111]/60">
                    Min: {scheme.minimumDeposit}
                  </span>
                  <button
                    onClick={() => setCurrentPage('savings')}
                    className="font-mono-code text-xs font-bold uppercase underline hover:text-[#d6a943]"
                  >
                    {lang === 'ne' ? 'विवरण' : 'DETAILS'} →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grid Section 2: Loan Facilities (Variation 2: 3-column dark section with white borders & Apply buttons) */}
      <section className="bg-[#111111] text-[#f8f7f4] border-b-2 border-[#111111]">
        <div className="p-4 sm:p-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="label text-[#d6a943]">
              {lang === 'ne' ? '[ ०३ ] कर्जा सुविधाहरू' : '[ 03 ] CREDIT & LOAN SERVICES'}
            </span>
            <h2 className="font-syne font-extrabold text-2xl sm:text-3xl text-[#f8f7f4] mt-1">
              {lang === 'ne' ? 'व्यवसाय तथा व्यक्तिगत कर्जा' : 'SME, Housing & Agriculture Loans'}
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage('loans')}
            className="font-mono-code text-xs font-bold uppercase tracking-wider text-[#d6a943] hover:underline"
          >
            {lang === 'ne' ? 'सबै कर्जा सुविधाहरू →' : 'EXPLORE ALL LOANS →'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
          {loanSchemes.slice(0, 3).map((loan, idx) => (
            <div
              key={loan.id}
              className={`p-6 sm:p-8 flex flex-col justify-between ${
                idx < 2 ? 'md:border-r border-white/10' : ''
              } border-b md:border-b-0 border-white/10`}
            >
              <div>
                <span className="label text-[#d6a943]">
                  {lang === 'ne' ? 'कर्जा सेवा' : 'LOAN FACILITY'}
                </span>

                <h3 className="font-syne text-xl sm:text-2xl font-bold text-white my-3 leading-snug">
                  {lang === 'ne' ? loan.nameNe : loan.nameEn}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed opacity-80">
                  {lang === 'ne' ? loan.descriptionNe : loan.descriptionEn}
                </p>

                <div className="font-mono-code text-xs text-[#d6a943] mb-6">
                  <span>RATE: {loan.interestRate}</span>
                  <span className="mx-2">·</span>
                  <span>MAX: {lang === 'ne' ? loan.loanLimitNe : loan.loanLimitEn}</span>
                </div>
              </div>

              <div>
                <button
                  onClick={() => openLoanApplicationModal(loan)}
                  className="w-full sm:w-auto font-mono-code text-xs font-bold uppercase px-4 py-2 border-2 border-white text-white hover:bg-[#d6a943] hover:text-[#111111] hover:border-[#d6a943] transition"
                >
                  {lang === 'ne' ? 'आवेदन दिनुहोस्' : 'Apply Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Institutional Governance, Department of Cooperatives & Resilience */}
      <section className="border-b-2 border-[#111111] bg-[#f8f7f4] p-6 sm:p-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="border-2 border-[#111111] p-5 bg-white shadow-[4px_4px_0_#111111]">
            <span className="label">[ STATUTORY ]</span>
            <h4 className="font-syne font-bold text-lg text-[#111111] mt-2 mb-1">
              {lang === 'ne' ? 'नियमन तथा दर्ता' : 'Statutory Registration'}
            </h4>
            <p className="text-xs text-[#111111]/70 leading-relaxed font-mono-code">
              {settings.regNumber}
            </p>
          </div>

          <div className="border-2 border-[#111111] p-5 bg-white shadow-[4px_4px_0_#111111]">
            <span className="label">[ LIQUIDITY ]</span>
            <h4 className="font-syne font-bold text-lg text-[#111111] mt-2 mb-1">
              {lang === 'ne' ? 'तरलता अनुपात' : 'Liquidity Reserves'}
            </h4>
            <p className="text-xs text-[#111111]/70 leading-relaxed">
              {lang === 'ne' ? 'सहकारी ऐन अनुसार १८% भन्दा बढी अनिवार्य तरलता कोष सुरक्षित।' : 'Over 18% primary liquidity reserve strictly maintained at all times.'}
            </p>
          </div>

          <div className="border-2 border-[#111111] p-5 bg-white shadow-[4px_4px_0_#111111]">
            <span className="label">[ TRANSPARENCY ]</span>
            <h4 className="font-syne font-bold text-lg text-[#111111] mt-2 mb-1">
              {lang === 'ne' ? 'नियमित लेखापरीक्षण' : 'Statutory Audits'}
            </h4>
            <p className="text-xs text-[#111111]/70 leading-relaxed">
              {lang === 'ne' ? 'वार्षिक साधारण सभा र बाह्य चार्टर्ड एकाउन्टेन्टबाट प्रमाणित वित्तीय विवरण।' : 'Audited transparent balance sheets tabled at the Annual General Meeting.'}
            </p>
          </div>

          <div className="border-2 border-[#111111] p-5 bg-[#111111] text-[#f8f7f4] shadow-[4px_4px_0_#d6a943]">
            <span className="label text-[#d6a943]">[ MEMBER SERVICE ]</span>
            <h4 className="font-syne font-bold text-lg text-white mt-2 mb-1">
              {lang === 'ne' ? 'सुलभ काउन्टर सेवा' : 'Counter Banking'}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {lang === 'ne' ? 'नागार्जुन-४ कार्यालयबाट तत्काल बचत जम्मा तथा भुक्तानी सुविधा।' : 'Instant counter withdrawals and account services Sunday to Friday.'}
            </p>
          </div>
        </div>
      </section>

      {/* Latest News & Notices Grid */}
      <section className="border-b-2 border-[#111111] bg-[#f8f7f4] p-6 sm:p-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="label">{lang === 'ne' ? '[ ०४ ] सूचना तथा गतिविधि' : '[ 04 ] NEWS & NOTICES'}</span>
              <h2 className="font-syne font-extrabold text-2xl sm:text-3xl text-[#111111] mt-1">
                {lang === 'ne' ? 'संस्थाका पछिल्ला गतिविधि र सूचनाहरू' : 'Recent Updates & Announcements'}
              </h2>
            </div>
            <button
              onClick={() => setCurrentPage('notices')}
              className="font-mono-code text-xs font-bold uppercase tracking-wider text-[#111111] hover:text-[#d6a943] underline"
            >
              {lang === 'ne' ? 'सबै सूचनाहरू हेर्नुहोस् →' : 'ALL NOTICES →'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.slice(0, 3).map((article) => (
              <div
                key={article.id}
                className="bg-white border-2 border-[#111111] p-6 shadow-[6px_6px_0_#111111] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#111111]/10">
                    <span className="label">{article.category}</span>
                    <span className="font-mono-code text-[11px] text-[#111111]/60">{article.publishedDate}</span>
                  </div>

                  <h3 className="font-syne font-bold text-lg text-[#111111] my-3 leading-snug">
                    {lang === 'ne' ? article.titleNe : article.titleEn}
                  </h3>

                  <p className="text-xs text-[#111111]/70 leading-relaxed line-clamp-3 mb-4">
                    {lang === 'ne' ? article.contentNe : article.contentEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#111111]/10 flex items-center justify-between">
                  <span className="font-mono-code text-[11px] text-[#111111]/60">
                    {article.category}
                  </span>
                  <button
                    onClick={() => setCurrentPage('news')}
                    className="font-mono-code text-xs font-bold uppercase text-[#111111] hover:text-[#d6a943]"
                  >
                    {lang === 'ne' ? 'थप पढ्नुहोस्' : 'READ MORE'} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (Brutalist Accordion) */}
      <section className="bg-[#f8f7f4] p-6 sm:p-12 border-b-2 border-[#111111]">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <span className="label">{lang === 'ne' ? '[ ०५ ] बारम्बार सोधिने प्रश्नहरू' : '[ 05 ] COMMON QUESTIONS'}</span>
            <h2 className="font-syne font-extrabold text-2xl sm:text-3xl text-[#111111] mt-1">
              {lang === 'ne' ? 'सहकारी सम्बन्धी जिज्ञासा र समाधान' : 'Frequently Asked Questions'}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.slice(0, 5).map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={faq.id}
                  className="border-2 border-[#111111] bg-white shadow-[4px_4px_0_#111111] transition"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-syne font-bold text-base text-[#111111]"
                  >
                    <span>{lang === 'ne' ? faq.questionNe : faq.questionEn}</span>
                    <span className="font-mono-code text-lg font-bold shrink-0">
                      {isOpen ? '[-]' : '[+]'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 border-t border-[#111111]/10 text-xs sm:text-sm text-[#111111]/80 leading-relaxed">
                      {lang === 'ne' ? faq.answerNe : faq.answerEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
