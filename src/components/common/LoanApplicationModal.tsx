import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, X, CheckCircle2, Send } from 'lucide-react';

export const LoanApplicationModal: React.FC = () => {
  const {
    isLoanModalOpen,
    selectedLoanForApplication,
    closeLoanApplicationModal,
    loanSchemes,
    submitLoanApplication,
    memberUser,
    lang,
    t,
  } = useApp();

  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantAddress, setApplicantAddress] = useState('');
  const [schemeId, setSchemeId] = useState('');
  const [requestedAmount, setRequestedAmount] = useState<number>(300000);
  const [requestedTenure, setRequestedTenure] = useState<number>(24);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(45000);
  const [collateralType, setCollateralType] = useState('Land & Building (Lalpurja)');
  const [purpose, setPurpose] = useState('');

  const [submittedAppNo, setSubmittedAppNo] = useState<string | null>(null);

  useEffect(() => {
    if (selectedLoanForApplication) {
      setSchemeId(selectedLoanForApplication.id);
    } else if (loanSchemes.length > 0) {
      setSchemeId(loanSchemes[0].id);
    }

    if (memberUser) {
      setApplicantName(memberUser.fullName);
      setApplicantPhone(memberUser.phone);
      setApplicantEmail(memberUser.email);
      setApplicantAddress(memberUser.address);
    }
  }, [selectedLoanForApplication, memberUser, loanSchemes]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLoanApplicationModal();
      }
    };
    if (isLoanModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLoanModalOpen, closeLoanApplicationModal]);

  if (!isLoanModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantPhone || !purpose) return;

    const chosenScheme = loanSchemes.find((s) => s.id === schemeId) || loanSchemes[0];

    try {
      const refNo = await submitLoanApplication({
        applicantName,
        applicantPhone,
        applicantEmail: applicantEmail || 'n/a',
        applicantAddress: applicantAddress || 'Nagarjun, Kathmandu',
        memberId: memberUser?.memberId,
        loanSchemeId: chosenScheme.id,
        loanSchemeName: lang === 'ne' ? chosenScheme.nameNe : chosenScheme.nameEn,
        requestedAmount,
        requestedTenureMonths: requestedTenure,
        monthlyIncome,
        collateralType,
        purpose,
      });

      setSubmittedAppNo(refNo);
    } catch {
      // toast shown by context
    }
  };

  const handleClose = () => {
    setSubmittedAppNo(null);
    closeLoanApplicationModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111111]/75 backdrop-blur-xs cursor-pointer"
      onClick={handleClose}
    >
      <div
        className="bg-[#f8f7f4] border-2 border-[#111111] max-w-2xl w-full shadow-[12px_12px_0_#111111] overflow-hidden max-h-[92vh] flex flex-col cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#111111] text-[#f8f7f4] p-5 flex items-center justify-between shrink-0 border-b-2 border-[#111111]">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 border border-[#d6a943] bg-black text-[#d6a943]">
              <FileText className="w-4 h-4 font-bold" />
            </div>
            <div>
              <h3 className="font-syne font-bold text-base md:text-lg text-white">{t.loanAppTitle}</h3>
              <p className="font-mono-code text-[11px] text-[#d6a943] uppercase">Aadhunik Jana Saving & Credit Co-operative Ltd.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="text-white hover:text-[#d6a943] p-1.5 border border-white/20 transition cursor-pointer hover:bg-white/10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          {submittedAppNo ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-[#111111] border-2 border-[#d6a943] text-[#d6a943] flex items-center justify-center mx-auto shadow-[4px_4px_0_#111111]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-syne font-bold text-xl text-[#111111]">
                {lang === 'ne' ? 'ऋण आवेदन सफलतापूर्वक प्राप्त भयो!' : 'Loan Application Submitted!'}
              </h4>
              <p className="font-mono-code text-xs text-[#111111]/70 max-w-md mx-auto">
                {lang === 'ne'
                  ? 'तपाईंको आवेदन नम्बर तल दिइएको छ। हाम्रो कर्जा उप-समितिले ३ कार्यदिनभित्र सम्पर्क गर्नेछ।'
                  : 'Your application has been logged into the cooperative loan management registry.'}
              </p>

              <div className="p-4 bg-white border-2 border-[#111111] max-w-xs mx-auto shadow-[4px_4px_0_#111111]">
                <span className="label block">{lang === 'ne' ? 'आवेदन संकेत नम्बर' : 'APPLICATION REF'}</span>
                <span className="font-mono-code font-bold text-xl text-[#111111] block mt-1">{submittedAppNo}</span>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="btn-brutal-primary"
                >
                  {lang === 'ne' ? 'बन्द गर्नुहोस्' : 'Close Form'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label block mb-1">{t.applicantName} *</label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="Full Name / पूरा नाम"
                    className="w-full px-3 py-2 border-2 border-[#111111] bg-white text-xs font-mono-code focus:outline-none"
                  />
                </div>

                <div>
                  <label className="label block mb-1">{t.applicantPhone} *</label>
                  <input
                    type="tel"
                    required
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    placeholder="+977-98xxxxxxxx"
                    className="w-full px-3 py-2 border-2 border-[#111111] bg-white text-xs font-mono-code focus:outline-none"
                  />
                </div>

                <div>
                  <label className="label block mb-1">{t.applicantEmail}</label>
                  <input
                    type="email"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 border-2 border-[#111111] bg-white text-xs font-mono-code focus:outline-none"
                  />
                </div>

                <div>
                  <label className="label block mb-1">{t.applicantAddress} *</label>
                  <input
                    type="text"
                    required
                    value={applicantAddress}
                    onChange={(e) => setApplicantAddress(e.target.value)}
                    placeholder="e.g. Nagarjun Ward 4, Raniban"
                    className="w-full px-3 py-2 border-2 border-[#111111] bg-white text-xs font-mono-code focus:outline-none"
                  />
                </div>

                <div>
                  <label className="label block mb-1">{t.selectScheme} *</label>
                  <select
                    value={schemeId}
                    onChange={(e) => setSchemeId(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-[#111111] bg-white text-xs font-mono-code focus:outline-none"
                  >
                    {loanSchemes.map((s) => (
                      <option key={s.id} value={s.id}>
                        {lang === 'ne' ? s.nameNe : s.nameEn} ({s.interestRate})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label block mb-1">{t.requestedAmount} *</label>
                  <input
                    type="number"
                    min={20000}
                    step={10000}
                    required
                    value={requestedAmount}
                    onChange={(e) => setRequestedAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 border-2 border-[#111111] bg-white text-xs font-mono-code font-bold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="label block mb-1">{t.requestedTenure} (MONTHS) *</label>
                  <input
                    type="number"
                    min={6}
                    max={120}
                    required
                    value={requestedTenure}
                    onChange={(e) => setRequestedTenure(Number(e.target.value))}
                    className="w-full px-3 py-2 border-2 border-[#111111] bg-white text-xs font-mono-code focus:outline-none"
                  />
                </div>

                <div>
                  <label className="label block mb-1">{t.monthlyIncome}</label>
                  <input
                    type="number"
                    min={10000}
                    step={5000}
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                    className="w-full px-3 py-2 border-2 border-[#111111] bg-white text-xs font-mono-code focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="label block mb-1">{t.collateralDesc} *</label>
                <select
                  value={collateralType}
                  onChange={(e) => setCollateralType(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-[#111111] bg-white text-xs font-mono-code focus:outline-none mb-2"
                >
                  <option value="Land & Building (Lalpurja)">Land & Building (घर/जग्गाको लालपुर्जा धितो)</option>
                  <option value="Fixed Deposit Certificate">Fixed Deposit Certificate (मुद्दती रसिद धितो)</option>
                  <option value="Group / Institutional Guarantee">Group / Member Guarantee (सामूहिक वा संस्थागत जमानी)</option>
                  <option value="Salary Certificate & Personal Guarantee">Salary Certificate & Personal Guarantee (तलब तथा व्यक्तिगत जमानी)</option>
                </select>
              </div>

              <div>
                <label className="label block mb-1">{t.loanPurpose} *</label>
                <textarea
                  rows={2}
                  required
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder={
                    lang === 'ne'
                      ? 'ऋण उपयोग गरिने व्यवसाय, घर निर्माण वा आवश्यकता सम्बन्धी संक्षिप्त विवरण खुलाउनुहोस्...'
                      : 'Provide brief purpose of how the credit will be utilized...'
                  }
                  className="w-full px-3 py-2 border-2 border-[#111111] bg-white text-xs font-mono-code focus:outline-none"
                ></textarea>
              </div>

              <div className="flex items-start gap-2 pt-2 text-xs text-[#111111]/80">
                <input type="checkbox" required id="consent" className="mt-1 accent-[#111111]" />
                <label htmlFor="consent" className="cursor-pointer font-mono-code text-[11px]">
                  {lang === 'ne'
                    ? 'म स्वीकार गर्दछु कि माथि उल्लिखित सम्पूर्ण विवरण सत्य हुन्। यो आवेदन पश्चात संस्थाको नीति, धितो मूल्याङ्कन तथा ऋण उप-समितिको निर्णय मलाई मान्य हुनेछ।'
                    : 'I declare that the information provided is accurate and acknowledge that final loan sanction is strictly governed by cooperative credit policies and physical verification.'}
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-brutal-primary w-full"
                >
                  <Send className="w-4 h-4 text-[#d6a943]" />
                  <span>{t.submitApplication}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
