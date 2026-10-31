import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SavingsScheme } from '../../types';
import {
  CheckCircle2,
  X,
} from 'lucide-react';

export const SavingsPage: React.FC = () => {
  const { lang, t, savingsSchemes, setCurrentPage } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalScheme, setActiveModalScheme] = useState<SavingsScheme | null>(null);

  const categories = ['All', 'Regular', 'Periodic', 'Child', 'Senior'];

  const filteredSchemes =
    selectedCategory === 'All'
      ? savingsSchemes
      : savingsSchemes.filter((s) => s.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
      {/* Page Header (Variation 2 Brutalist Banner) */}
      <div className="bg-[#111111] text-[#f8f7f4] border-2 border-[#111111] shadow-[8px_8px_0_#d6a943] p-8">
        <span className="label text-[#d6a943] block mb-2">
          {lang === 'ne' ? '[ ०२ ] निक्षेप तथा बचत योजनाहरू' : '[ 02 ] SAVINGS & DEPOSIT SCHEMES'}
        </span>
        <h1 className="font-syne text-3xl md:text-5xl font-extrabold text-white">
          {t.savings}
        </h1>
        <p className="text-xs md:text-sm text-slate-300 mt-3 max-w-2xl leading-relaxed">
          {lang === 'ne'
            ? 'आधुनिक जन साकोसका सम्पूर्ण बचत योजनाहरूमा दैनिक मौज्दातमा ब्याज गणना, उच्च प्रतिफल, त्रैमासिक भुक्तानी र पुँजीको पूर्ण सुरक्षा सुनिश्चित छ।'
            : 'Explore flexible daily and periodic savings products with competitive interest rates, daily balance computation, and institutional safety.'}
        </p>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-white/15">
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
              {cat === 'All' ? (lang === 'ne' ? 'सबै योजनाहरू' : 'All Schemes') : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white border-2 border-[#111111] p-6 shadow-[6px_6px_0_#111111] hover:shadow-[10px_10px_0_#111111] hover:-translate-x-0.5 hover:-translate-y-0.5 transition duration-200 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="label text-[#111111]">
                  [ {scheme.category.toUpperCase()} ]
                </span>
                {scheme.badge && (
                  <span className="badge-brutal">
                    {scheme.badge}
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-syne text-xl font-bold text-[#111111] leading-snug">
                  {lang === 'ne' ? scheme.nameNe : scheme.nameEn}
                </h3>
                <p className="text-xs text-[#111111]/70 mt-2 line-clamp-2 leading-relaxed">
                  {lang === 'ne' ? scheme.descriptionNe : scheme.descriptionEn}
                </p>
              </div>

              {/* Rate Box */}
              <div className="p-3 bg-[#f8f7f4] border border-[#111111] flex items-center justify-between font-mono-code">
                <span className="text-xs uppercase text-[#111111]/70">
                  {lang === 'ne' ? 'ब्याजदर:' : 'Interest Rate:'}
                </span>
                <span className="text-sm font-bold text-[#111111]">{scheme.interestRate}</span>
              </div>

              {/* Tenure & Min Deposit */}
              <div className="font-mono-code text-xs text-[#111111]/80 space-y-1.5 pt-1">
                <div className="flex justify-between">
                  <span className="text-[#111111]/60">Min. Deposit:</span>
                  <span className="font-bold text-[#111111]">{scheme.minimumDeposit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#111111]/60">Duration:</span>
                  <span className="font-bold text-[#111111] truncate max-w-[170px]">
                    {lang === 'ne' ? scheme.durationNe : scheme.durationEn}
                  </span>
                </div>
              </div>

              {/* Top features */}
              <ul className="space-y-1.5 text-xs text-[#111111]/80 pt-3 border-t border-[#111111]/15">
                {(lang === 'ne' ? scheme.featuresNe : scheme.featuresEn).slice(0, 3).map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#d6a943] font-bold">•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-[#111111]/15 mt-6 flex items-center justify-between gap-3">
              <button
                onClick={() => setActiveModalScheme(scheme)}
                className="w-full btn-brutal-primary text-xs py-2.5"
              >
                {lang === 'ne' ? 'विस्तृत विवरण हेर्नुहोस्' : 'View Scheme Details'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Scheme Comparison Table */}
      <div className="bg-white border-2 border-[#111111] shadow-[8px_8px_0_#111111] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-syne text-lg md:text-xl font-bold text-[#111111]">
            {lang === 'ne' ? 'बचत योजना तुलनात्मक तालिका' : 'Savings Schemes Comparison Matrix'}
          </h2>
          <span className="label">[ COMPARISON ]</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left font-mono-code">
            <thead className="bg-[#111111] text-[#f8f7f4] uppercase text-[11px]">
              <tr>
                <th className="py-3 px-4">Scheme Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Interest Rate</th>
                <th className="py-3 px-4">Minimum Deposit</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#111111]/15 text-[#111111]">
              {savingsSchemes.map((s) => (
                <tr key={s.id} className="hover:bg-[#f8f7f4] transition">
                  <td className="py-3 px-4 font-bold text-[#111111]">
                    {lang === 'ne' ? s.nameNe : s.nameEn}
                  </td>
                  <td className="py-3 px-4">{s.category}</td>
                  <td className="py-3 px-4 font-bold text-[#111111]">{s.interestRate}</td>
                  <td className="py-3 px-4">{s.minimumDeposit}</td>
                  <td className="py-3 px-4">{lang === 'ne' ? s.durationNe : s.durationEn}</td>
                  <td className="py-3 px-4">
                    <span className="badge-brutal">
                      ACTIVE
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Single Scheme Details */}
      {activeModalScheme && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111111]/75 backdrop-blur-xs cursor-pointer"
          onClick={() => setActiveModalScheme(null)}
        >
          <div
            className="bg-[#f8f7f4] border-2 border-[#111111] max-w-xl w-full shadow-[12px_12px_0_#111111] overflow-hidden flex flex-col max-h-[85vh] cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#111111] text-[#f8f7f4] p-5 flex items-center justify-between border-b-2 border-[#111111]">
              <div>
                <span className="label text-[#d6a943]">
                  [ {activeModalScheme.category.toUpperCase()} SCHEME ]
                </span>
                <h3 className="font-syne text-lg font-bold text-white mt-1">
                  {lang === 'ne' ? activeModalScheme.nameNe : activeModalScheme.nameEn}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalScheme(null)}
                className="text-white hover:text-[#d6a943] p-1.5 border border-white/20 transition cursor-pointer hover:bg-white/10"
                aria-label="Close scheme modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs md:text-sm">
              <p className="text-[#111111]/80 leading-relaxed">
                {lang === 'ne' ? activeModalScheme.descriptionNe : activeModalScheme.descriptionEn}
              </p>

              <div className="grid grid-cols-2 gap-3 p-4 bg-white border-2 border-[#111111] shadow-[4px_4px_0_#111111]">
                <div>
                  <span className="label block">Interest Rate</span>
                  <span className="font-syne font-extrabold text-[#111111] text-base md:text-lg">
                    {activeModalScheme.interestRate}
                  </span>
                </div>
                <div>
                  <span className="label block">Minimum Deposit</span>
                  <span className="font-syne font-extrabold text-[#111111] text-base md:text-lg">
                    {activeModalScheme.minimumDeposit}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-syne font-bold text-[#111111] mb-2">Key Benefits:</h4>
                <ul className="space-y-1.5 text-[#111111]/80 font-mono-code text-xs">
                  {(lang === 'ne' ? activeModalScheme.featuresNe : activeModalScheme.featuresEn).map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#d6a943] font-bold">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-white border border-[#111111] text-xs">
                <span className="label block mb-1">Eligibility Criteria:</span>
                <p className="text-[#111111]/80">{lang === 'ne' ? activeModalScheme.eligibilityNe : activeModalScheme.eligibilityEn}</p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveModalScheme(null)}
                  className="btn-brutal-outline text-xs py-2 px-4 cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveModalScheme(null);
                    setCurrentPage('downloads');
                  }}
                  className="btn-brutal-primary text-xs py-2 px-4 cursor-pointer"
                >
                  Download Account Form
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
