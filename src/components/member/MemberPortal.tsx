import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  ShieldCheck,
  LogOut,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export const MemberPortal: React.FC = () => {
  const {
    lang,
    t,
    memberUser,
    loginMember,
    logoutMember,
    loanApplications,
    openLoanApplicationModal,
  } = useApp();

  const [memberIdInput, setMemberIdInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'loans' | 'profile'>('overview');

  const myApplications = memberUser
    ? loanApplications.filter(
        (a) => a.memberId === memberUser.memberId || a.applicantPhone === memberUser.phone
      )
    : [];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMember(memberIdInput || 'AJ-2075-0142');
  };

  const handleDemoLogin = () => {
    loginMember('AJ-2075-0142');
  };

  if (!memberUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white border-2 border-[#111111] shadow-[12px_12px_0_#111111] p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-[#111111] border-2 border-[#d6a943] text-[#d6a943] flex items-center justify-center mx-auto shadow-[4px_4px_0_#111111]">
              <User className="w-7 h-7" />
            </div>
            <h2 className="font-syne text-2xl font-bold text-[#111111]">{t.memberLogin}</h2>
            <p className="font-mono-code text-xs text-[#111111]/70">{t.memberPortalSubtitle}</p>
          </div>

          {/* Privacy & Regulatory banner */}
          <div className="p-3 bg-[#f8f7f4] border border-[#111111] font-mono-code text-[11px] text-[#111111] leading-relaxed flex items-start gap-2">
            <Lock className="w-4 h-4 text-[#d6a943] shrink-0 mt-0.5" />
            <span>{t.memberDisclaimer}</span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs font-mono-code">
            <div>
              <label className="label block mb-1">
                {lang === 'ne' ? 'सदस्यता नम्बर' : 'MEMBER ID / ACC NO'} *
              </label>
              <input
                type="text"
                required
                value={memberIdInput}
                onChange={(e) => setMemberIdInput(e.target.value)}
                placeholder="e.g. AJ-2075-0142"
                className="w-full px-3 py-2 border-2 border-[#111111] bg-white text-xs font-mono-code focus:outline-none"
              />
            </div>

            <div>
              <label className="label block mb-1">
                {lang === 'ne' ? 'पासवर्ड / पिन' : 'PASSWORD / PIN'} *
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 border-2 border-[#111111] bg-white text-xs font-mono-code focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="btn-brutal-primary w-full text-xs py-2.5"
            >
              {lang === 'ne' ? 'पोर्टलमा प्रवेश गर्नुहोस्' : 'Sign In to Portal'}
            </button>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleDemoLogin}
                className="btn-brutal-outline w-full text-xs py-2"
              >
                {t.demoLoginBtn}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      {/* Member Header Card */}
      <div className="bg-[#111111] text-[#f8f7f4] border-2 border-[#111111] shadow-[8px_8px_0_#d6a943] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[#d6a943] border-2 border-white text-[#111111] flex items-center justify-center font-syne font-bold text-xl shrink-0">
            {memberUser.fullName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="label text-[#d6a943]">[ VERIFIED MEMBER ]</span>
              <span className="badge-brutal">KYC {memberUser.kycStatus.toUpperCase()}</span>
            </div>
            <h1 className="font-syne text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {memberUser.fullName}
            </h1>
            <p className="font-mono-code text-xs text-slate-300">
              Account ID: {memberUser.memberId} · Joined {memberUser.joinDate}
            </p>
          </div>
        </div>

        <button
          onClick={logoutMember}
          className="font-mono-code text-xs font-bold uppercase px-4 py-2 border-2 border-white text-white hover:bg-white hover:text-[#111111] transition flex items-center gap-2 self-start md:self-auto"
        >
          <LogOut className="w-4 h-4" />
          <span>{lang === 'ne' ? 'लगआउट' : 'Sign Out'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b-2 border-[#111111] pb-3">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'loans', label: 'My Loan Inquiries' },
          { id: 'profile', label: 'Shareholder Profile' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-1.5 font-mono-code text-xs uppercase font-bold border-2 transition ${
              activeTab === tab.id
                ? 'bg-[#111111] text-[#f8f7f4] border-[#111111]'
                : 'bg-white text-[#111111] border-[#111111]/30 hover:border-[#111111]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono-code">
            <div className="bg-white p-5 border-2 border-[#111111] shadow-[4px_4px_0_#111111] space-y-1">
              <span className="label block">Membership Status</span>
              <div className="font-syne text-lg font-bold text-[#111111] flex items-center gap-1.5 mt-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Active Shareholder</span>
              </div>
              <p className="text-[11px] text-[#111111]/60">Joined: {memberUser.joinDate}</p>
            </div>

            <div className="bg-white p-5 border-2 border-[#111111] shadow-[4px_4px_0_#111111] space-y-1">
              <span className="label block">KYC Verification</span>
              <div className="font-syne text-lg font-bold text-[#111111] flex items-center gap-1.5 mt-1">
                <ShieldCheck className="w-4 h-4 text-[#d6a943]" />
                <span>Verified (2081)</span>
              </div>
              <p className="text-[11px] text-[#111111]/60">National ID on Record</p>
            </div>

            <div className="bg-white p-5 border-2 border-[#111111] shadow-[4px_4px_0_#111111] space-y-1">
              <span className="label block">Loan Applications</span>
              <div className="font-syne text-lg font-bold text-[#111111] mt-1">
                {myApplications.length} Request(s)
              </div>
              <p className="text-[11px] text-[#111111]/60">Logged in system</p>
            </div>
          </div>

          {/* Applications Table */}
          <div className="bg-white border-2 border-[#111111] shadow-[6px_6px_0_#111111] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-syne font-bold text-lg text-[#111111]">{t.myLoanApps}</h3>
              <button
                onClick={() => openLoanApplicationModal()}
                className="font-mono-code text-xs font-bold uppercase underline hover:text-[#d6a943]"
              >
                + New Inquiry
              </button>
            </div>

            {myApplications.length === 0 ? (
              <p className="font-mono-code text-xs text-[#111111]/60 py-6 text-center">
                No active loan applications submitted yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left font-mono-code">
                  <thead className="bg-[#111111] text-[#f8f7f4] uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-3">App No</th>
                      <th className="py-2.5 px-3">Scheme</th>
                      <th className="py-2.5 px-3">Requested Amount</th>
                      <th className="py-2.5 px-3">Tenure</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Officer Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#111111]/15 text-[#111111]">
                    {myApplications.map((app) => (
                      <tr key={app.id}>
                        <td className="py-2.5 px-3 font-bold">{app.applicationNo}</td>
                        <td className="py-2.5 px-3 font-semibold">{app.loanSchemeName}</td>
                        <td className="py-2.5 px-3 font-bold">
                          NPR {app.requestedAmount.toLocaleString()}
                        </td>
                        <td className="py-2.5 px-3">{app.requestedTenureMonths} mo</td>
                        <td className="py-2.5 px-3">
                          <span className="badge-brutal">
                            {app.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-[#111111]/70 italic max-w-xs truncate">
                          {app.adminRemarks || 'Under preliminary desk screening'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Loans Tab */}
      {activeTab === 'loans' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-syne font-bold text-lg text-[#111111]">My Loan Inquiries & Applications</h3>
            <button
              onClick={() => openLoanApplicationModal()}
              className="btn-brutal-primary text-xs py-2 px-4"
            >
              + Submit New Application
            </button>
          </div>

          <div className="space-y-4">
            {myApplications.map((app) => (
              <div key={app.id} className="bg-white p-5 border-2 border-[#111111] shadow-[4px_4px_0_#111111] space-y-3 font-mono-code">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#111111]/15 pb-3">
                  <div>
                    <span className="text-xs font-bold text-[#111111]/70">{app.applicationNo}</span>
                    <h4 className="font-syne font-bold text-base text-[#111111]">{app.loanSchemeName}</h4>
                  </div>
                  <span className="badge-brutal">
                    STATUS: {app.status.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="label block text-[10px]">Requested Amount</span>
                    <span className="font-bold text-[#111111]">NPR {app.requestedAmount.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="label block text-[10px]">Tenure</span>
                    <span className="font-bold text-[#111111]">{app.requestedTenureMonths} Months</span>
                  </div>
                  <div>
                    <span className="label block text-[10px]">Submitted On</span>
                    <span className="font-bold text-[#111111]">{app.submittedAt}</span>
                  </div>
                  <div>
                    <span className="label block text-[10px]">Proposed Collateral</span>
                    <span className="font-bold text-[#111111] truncate block">{app.collateralType}</span>
                  </div>
                </div>

                {app.adminRemarks && (
                  <div className="p-3 bg-[#f8f7f4] border border-[#111111] text-xs text-[#111111]">
                    <span className="label block mb-0.5">Loan Department Feedback:</span>
                    <p>{app.adminRemarks}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="bg-white border-2 border-[#111111] shadow-[6px_6px_0_#111111] p-6 max-w-2xl space-y-5 font-mono-code text-xs">
          <h3 className="font-syne font-bold text-lg text-[#111111] pb-2 border-b border-[#111111]/15">
            Registered Shareholder Profile
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-[#111111]/10">
              <span className="text-[#111111]/60">Member ID:</span>
              <span className="font-bold text-[#111111]">{memberUser.memberId}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#111111]/10">
              <span className="text-[#111111]/60">Full Legal Name:</span>
              <span className="font-bold text-[#111111]">{memberUser.fullName}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#111111]/10">
              <span className="text-[#111111]/60">Mobile Phone:</span>
              <span className="font-bold text-[#111111]">{memberUser.phone}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#111111]/10">
              <span className="text-[#111111]/60">Email Address:</span>
              <span className="font-bold text-[#111111]">{memberUser.email}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#111111]/10">
              <span className="text-[#111111]/60">Address:</span>
              <span className="font-bold text-[#111111]">{memberUser.address}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#111111]/10">
              <span className="text-[#111111]/60">KYC Status:</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {memberUser.kycStatus}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
