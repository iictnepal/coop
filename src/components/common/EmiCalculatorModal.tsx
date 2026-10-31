import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Calculator, X, ArrowRight } from 'lucide-react';

export const EmiCalculatorModal: React.FC = () => {
  const { isEmiOpen, setIsEmiOpen, lang, t, openLoanApplicationModal } = useApp();

  const [principal, setPrincipal] = useState<number>(500000);
  const [annualRate, setAnnualRate] = useState<number>(12.5);
  const [tenureMonths, setTenureMonths] = useState<number>(36);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsEmiOpen(false);
      }
    };
    if (isEmiOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEmiOpen, setIsEmiOpen]);

  if (!isEmiOpen) return null;

  // Monthly reducing interest calculation
  const monthlyRate = annualRate / 12 / 100;
  const emi =
    monthlyRate === 0
      ? principal / tenureMonths
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
        (Math.pow(1 + monthlyRate, tenureMonths) - 1);

  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - principal;

  const principalRatio = Math.round((principal / totalPayment) * 100);
  const interestRatio = 100 - principalRatio;

  const handleApplyClick = () => {
    setIsEmiOpen(false);
    openLoanApplicationModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111111]/75 backdrop-blur-xs cursor-pointer"
      onClick={() => setIsEmiOpen(false)}
    >
      <div
        className="bg-[#f8f7f4] border-2 border-[#111111] max-w-xl w-full shadow-[12px_12px_0_#111111] overflow-hidden transform transition-all cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#111111] text-[#f8f7f4] p-5 flex items-center justify-between border-b-2 border-[#111111]">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 border border-[#d6a943] bg-black text-[#d6a943]">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-syne font-bold text-base md:text-lg text-white">{t.emiTitle}</h3>
              <p className="font-mono-code text-[11px] text-[#d6a943] uppercase">{t.reducingBalanceNote}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsEmiOpen(false)}
            className="text-white hover:text-[#d6a943] p-1.5 border border-white/20 transition cursor-pointer hover:bg-white/10"
            aria-label="Close EMI calculator"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Sliders & Inputs */}
          <div className="space-y-5">
            {/* Principal */}
            <div>
              <div className="flex justify-between items-center mb-1 text-xs md:text-sm font-bold text-[#111111]">
                <span className="font-mono-code text-xs uppercase">{t.loanAmountLabel}</span>
                <span className="font-syne font-extrabold text-base text-[#111111]">
                  NPR {principal.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={50000}
                max={5000000}
                step={25000}
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full h-2 bg-slate-300 appearance-none cursor-pointer accent-[#111111]"
              />
              <div className="flex justify-between font-mono-code text-[10px] text-[#111111]/60 mt-1">
                <span>50,000</span>
                <span>2,500,000</span>
                <span>5,000,000</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between items-center mb-1 text-xs md:text-sm font-bold text-[#111111]">
                <span className="font-mono-code text-xs uppercase">{t.interestRateLabel}</span>
                <span className="font-syne font-extrabold text-base text-[#111111]">{annualRate.toFixed(2)}% p.a.</span>
              </div>
              <input
                type="range"
                min={8.0}
                max={16.0}
                step={0.25}
                value={annualRate}
                onChange={(e) => setAnnualRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-300 appearance-none cursor-pointer accent-[#111111]"
              />
              <div className="flex justify-between font-mono-code text-[10px] text-[#111111]/60 mt-1">
                <span>8.0%</span>
                <span>12.0% (Coop Dept Cap)</span>
                <span>16.0%</span>
              </div>
            </div>

            {/* Tenure */}
            <div>
              <div className="flex justify-between items-center mb-1 text-xs md:text-sm font-bold text-[#111111]">
                <span className="font-mono-code text-xs uppercase">{t.loanTenureLabel}</span>
                <span className="font-syne font-extrabold text-base text-[#111111]">
                  {tenureMonths} {lang === 'ne' ? 'महिना' : 'Months'} ({(tenureMonths / 12).toFixed(1)} {lang === 'ne' ? 'वर्ष' : 'Yrs'})
                </span>
              </div>
              <input
                type="range"
                min={6}
                max={120}
                step={6}
                value={tenureMonths}
                onChange={(e) => setTenureMonths(Number(e.target.value))}
                className="w-full h-2 bg-slate-300 appearance-none cursor-pointer accent-[#111111]"
              />
              <div className="flex justify-between font-mono-code text-[10px] text-[#111111]/60 mt-1">
                <span>6 Months</span>
                <span>36 Months</span>
                <span>120 Months</span>
              </div>
            </div>
          </div>

          {/* Results Card (Variation 2 Brutalist Card) */}
          <div className="bg-white border-2 border-[#111111] p-5 shadow-[4px_4px_0_#111111] space-y-4">
            <div className="text-center pb-3 border-b border-[#111111]/15">
              <span className="label block">
                {t.monthlyEmi}
              </span>
              <div className="font-syne font-extrabold text-2xl md:text-3xl text-[#111111] mt-1">
                NPR {Math.round(emi).toLocaleString()}
                <span className="font-mono-code text-xs font-normal text-[#111111]/60 ml-1">/ month</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 border border-[#111111] bg-[#f8f7f4]">
                <span className="label block">{t.totalInterest}</span>
                <span className="font-syne font-extrabold text-sm text-[#111111] mt-1 block">
                  NPR {Math.round(totalInterest).toLocaleString()}
                </span>
              </div>
              <div className="p-3 border border-[#111111] bg-[#f8f7f4]">
                <span className="label block">{t.totalPayment}</span>
                <span className="font-syne font-extrabold text-sm text-[#111111] mt-1 block">
                  NPR {Math.round(totalPayment).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Proportion Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between font-mono-code text-[11px] font-bold">
                <span>Principal: {principalRatio}%</span>
                <span>Interest: {interestRatio}%</span>
              </div>
              <div className="w-full h-3 border border-[#111111] bg-slate-200 flex">
                <div
                  className="h-full bg-[#111111]"
                  style={{ width: `${principalRatio}%` }}
                ></div>
                <div
                  className="h-full bg-[#d6a943]"
                  style={{ width: `${interestRatio}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Action button */}
          <button
            type="button"
            onClick={handleApplyClick}
            className="btn-brutal-primary w-full"
          >
            <span>{lang === 'ne' ? 'यस हिसाब अनुसार कर्जा आवेदन पेश गर्नुहोस्' : 'Apply with This Loan Estimate'}</span>
            <ArrowRight className="w-4 h-4 text-[#d6a943]" />
          </button>
        </div>
      </div>
    </div>
  );
};
