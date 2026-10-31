import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  Calculator,
  ArrowRight,
} from 'lucide-react';

export const LoansPage: React.FC = () => {
  const { lang, t, loanSchemes, setIsEmiOpen, openLoanApplicationModal } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Business', 'Agriculture', 'Housing', 'Education', 'Emergency'];

  const filteredLoans =
    selectedCategory === 'All'
      ? loanSchemes
      : loanSchemes.filter((l) => l.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
      {/* Page Header (Variation 2 Brutalist Banner) */}
      <div className="bg-[#111111] text-[#f8f7f4] border-2 border-[#111111] shadow-[8px_8px_0_#d6a943] p-8">
        <span className="label text-[#d6a943] block mb-2">
          {lang === 'ne' ? '[ ०३ ] कर्जा तथा सापट सुविधाहरू' : '[ 03 ] CREDIT & LOAN FACILITIES'}
        </span>
        <h1 className="font-syne text-3xl md:text-5xl font-extrabold text-white">
          {t.loans}
        </h1>
        <p className="text-xs md:text-sm text-slate-300 mt-3 max-w-2xl leading-relaxed">
          {lang === 'ne'
            ? 'नागार्जुन तथा काठमाडौंका सदस्यहरूका लागि घट्दो मौज्दातमा ब्याज हिसाब हुने सुलभ व्यवसायिक, आवास, शैक्षिक तथा कृषि कर्जा।'
            : 'Transparent credit facilities with diminishing balance interest, no hidden pre-closure fees, and fast-track 3-day approval.'}
        </p>

        {/* Buttons & Categories Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-5 border-t border-white/15">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 font-mono-code text-xs uppercase font-bold border-2 transition ${
                  selectedCategory === cat
                    ? 'bg-[#d6a943] text-[#111111] border-[#d6a943]'
                    : 'bg-transparent text-white border-white/30 hover:border-white'
                }`}
              >
                {cat === 'All' ? (lang === 'ne' ? 'सबै कर्जा' : 'All Loans') : cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsEmiOpen(true)}
            className="px-4 py-2 bg-[#d6a943] text-[#111111] font-mono-code font-bold text-xs uppercase border-2 border-white hover:bg-amber-300 transition flex items-center gap-1.5 shadow-[3px_3px_0_#ffffff]"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>{t.calcEmi}</span>
          </button>
        </div>
      </div>

      {/* Advisory Announcement Banner (Variation 2 dashed box) */}
      <div className="announcement bg-white border-2 border-dashed border-[#111111] p-5 shadow-[4px_4px_0_#111111]">
        <span className="label text-[#111111] block mb-1">
          {lang === 'ne' ? '[ आधिकारिक सूचना ] ऋण नीति तथा नियमन' : '[ OFFICIAL ADVISORY ] COOPERATIVE LENDING POLICIES'}
        </span>
        <p className="font-mono-code text-xs text-[#111111]/80 leading-relaxed">
          {lang === 'ne'
            ? 'सहकारी ऐन तथा संस्थाको ऋण नीति अनुसार कर्जा प्रवाह गरिन्छ। अनलाइनबाट दिइएको आवेदन प्रारम्भिक सोधपुछ मात्र हो। सक्कल धितो कागजात, स्थलगत निरीक्षण र ऋण उप-समितिको स्वीकृति पश्चात् मात्र कर्जा सम्झौता र भुक्तानी हुनेछ।'
            : 'All loans are disbursed in compliance with the Cooperative Act and institutional credit policies. Online inquiries are preliminary; physical collateral verification and Credit Sub-Committee approval are required.'}
        </p>
      </div>

      {/* Loan Facilities Detailed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredLoans.map((loan) => (
          <div
            key={loan.id}
            className="bg-white border-2 border-[#111111] p-6 sm:p-8 shadow-[8px_8px_0_#111111] hover:shadow-[12px_12px_0_#111111] transition duration-200 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="label text-[#111111]">
                    [ {loan.category.toUpperCase()} LOAN ]
                  </span>
                  {loan.badge && (
                    <span className="badge-brutal ml-2">
                      {loan.badge}
                    </span>
                  )}
                </div>
                <span className="label text-[#111111] border-b border-[#111111] pb-0.5 font-bold">
                  INTEREST: {loan.interestRate.toUpperCase()}
                </span>
              </div>

              <div>
                <h3 className="font-syne text-2xl font-bold text-[#111111]">
                  {lang === 'ne' ? loan.nameNe : loan.nameEn}
                </h3>
                <p className="text-xs sm:text-sm text-[#111111]/70 mt-2 leading-relaxed">
                  {lang === 'ne' ? loan.descriptionNe : loan.descriptionEn}
                </p>
              </div>

              {/* Limit & Tenure matrix */}
              <div className="grid grid-cols-2 gap-3 p-4 bg-[#f8f7f4] border border-[#111111] font-mono-code text-xs">
                <div>
                  <span className="label block text-[10px]">Max Loan Limit:</span>
                  <span className="font-bold text-[#111111] block mt-0.5">
                    {lang === 'ne' ? loan.loanLimitNe : loan.loanLimitEn}
                  </span>
                </div>
                <div>
                  <span className="label block text-[10px]">Repayment Tenure:</span>
                  <span className="font-bold text-[#111111] block mt-0.5">
                    {lang === 'ne' ? loan.tenureNe : loan.tenureEn}
                  </span>
                </div>
              </div>

              {/* Key Features */}
              <div>
                <span className="label block mb-2">LOAN SPECIFICATIONS:</span>
                <ul className="space-y-1.5 font-mono-code text-xs text-[#111111]/80">
                  {(lang === 'ne' ? loan.featuresNe : loan.featuresEn).map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#d6a943] font-bold">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Eligibility */}
              <div className="p-3 border border-[#111111]/20 bg-[#f8f7f4] text-xs">
                <span className="label block text-[10px] mb-1">Eligibility:</span>
                <p className="text-[#111111]/80">{lang === 'ne' ? loan.eligibilityNe : loan.eligibilityEn}</p>
              </div>
            </div>

            <div className="pt-6 border-t border-[#111111]/15 mt-6 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => openLoanApplicationModal(loan)}
                className="btn-brutal-primary w-full sm:w-auto text-xs py-2.5 px-6"
              >
                <span>{lang === 'ne' ? 'अनलाइन कर्जा आवेदन गर्नुहोस्' : 'Apply For This Loan'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#d6a943]" />
              </button>

              <button
                onClick={() => setIsEmiOpen(true)}
                className="btn-brutal-outline text-xs py-2.5 px-4"
              >
                {lang === 'ne' ? 'EMI हिसाब गर्नुहोस्' : 'Estimate EMI'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
