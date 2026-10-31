import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldAlert,
  LogOut,
  LayoutDashboard,
  PiggyBank,
  Banknote,
  Bell,
  Newspaper,
  FileCheck,
  MessageSquare,
  Settings,
  Activity,
  Plus,
  Trash2,
  Edit3,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  Save,
  Check,
  Lock,
  Download,
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const {
    lang,
    t,
    adminUser,
    loginAdmin,
    logoutAdmin,
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
    deleteNews,
    loanApplications,
    updateLoanApplicationStatus,
    contactMessages,
    updateContactMessageStatus,
    deleteContactMessage,
    activityLogs,
    setCurrentPage,
  } = useApp();

  const [passwordInput, setPasswordInput] = useState('');
  const [activeModule, setActiveModule] = useState<
    'overview' | 'savings' | 'loans' | 'applications' | 'notices' | 'news' | 'inquiries' | 'settings' | 'logs'
  >('overview');

  // New item modal forms states
  const [showAddSavings, setShowAddSavings] = useState(false);
  const [newSavNameEn, setNewSavNameEn] = useState('');
  const [newSavNameNe, setNewSavNameNe] = useState('');
  const [newSavRate, setNewSavRate] = useState('8.50% p.a.');
  const [newSavMin, setNewSavMin] = useState('NPR 500');
  const [newSavCat, setNewSavCat] = useState<'Regular' | 'Periodic' | 'Special' | 'Child' | 'Senior'>('Regular');

  const [showAddNotice, setShowAddNotice] = useState(false);
  const [newNoticeTitleEn, setNewNoticeTitleEn] = useState('');
  const [newNoticeTitleNe, setNewNoticeTitleNe] = useState('');
  const [newNoticeCategory, setNewNoticeCategory] = useState<'General' | 'AGM' | 'Financial Report' | 'Tender'>('General');
  const [newNoticeContentEn, setNewNoticeContentEn] = useState('');
  const [newNoticeContentNe, setNewNoticeContentNe] = useState('');
  const [newNoticePinned, setNewNoticePinned] = useState(false);

  // Editable settings form state
  const [editSettings, setEditSettings] = useState({ ...settings });

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAdmin(passwordInput);
  };

  const handleQuickDemoAdmin = () => {
    loginAdmin('admin123');
  };

  const handleCreateSavings = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSavNameEn) return;
    addSavingsScheme({
      nameEn: newSavNameEn,
      nameNe: newSavNameNe || newSavNameEn,
      category: newSavCat,
      interestRate: newSavRate,
      minimumDeposit: newSavMin,
      durationEn: 'Flexible open ended',
      durationNe: 'लचिलो खुला अवधि',
      descriptionEn: 'Custom savings plan created via admin CMS.',
      descriptionNe: 'प्रशासकीय सीएमएस मार्फत थप गरिएको बचत योजना।',
      featuresEn: ['Daily interest computation', 'Free SMS alerts'],
      featuresNe: ['दैनिक मौज्दातमा ब्याज', 'निःशुल्क एसएमएस'],
      eligibilityEn: 'Registered cooperative members.',
      eligibilityNe: 'संस्थाका सेयर सदस्यहरू।',
      isActive: true,
    });
    setNewSavNameEn('');
    setNewSavNameNe('');
    setShowAddSavings(false);
  };

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitleEn) return;
    addNotice({
      titleEn: newNoticeTitleEn,
      titleNe: newNoticeTitleNe || newNoticeTitleEn,
      category: newNoticeCategory,
      publishedDate: new Date().toISOString().slice(0, 10),
      contentEn: newNoticeContentEn,
      contentNe: newNoticeContentNe || newNoticeContentEn,
      isPinned: newNoticePinned,
      hasPdf: true,
      pdfFileName: `${newNoticeCategory}_Notice.pdf`,
      pdfSize: '512 KB',
    });
    setNewNoticeTitleEn('');
    setNewNoticeTitleNe('');
    setNewNoticeContentEn('');
    setNewNoticeContentNe('');
    setShowAddNotice(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(editSettings);
  };

  if (!adminUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white border-2 border-[#111111] shadow-[12px_12px_0_#111111] p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-[#111111] border-2 border-[#d6a943] text-[#d6a943] flex items-center justify-center mx-auto shadow-[4px_4px_0_#111111]">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <h2 className="font-syne text-2xl font-bold text-[#111111]">{t.adminLogin}</h2>
            <p className="font-mono-code text-xs text-[#111111]/70">
              Aadhunik Jana SACCOS Content Management System
            </p>
          </div>

          <div className="p-3 bg-[#f8f7f4] border border-[#111111] font-mono-code text-xs text-[#111111] leading-relaxed">
            <span className="label block mb-1">Administrative Access Security:</span>
            Protected with role-based authorization, prepared statement safety, and full activity audit logging.
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs font-mono-code">
            <div>
              <label className="label block mb-1">Admin Username</label>
              <input
                type="text"
                disabled
                value="admin"
                className="w-full px-3 py-2 bg-[#f8f7f4] border-2 border-[#111111] text-[#111111] font-bold cursor-not-allowed"
              />
            </div>

            <div>
              <label className="label block mb-1">Password</label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password (demo: admin123)"
                className="w-full px-3 py-2 border-2 border-[#111111] bg-white text-xs focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="btn-brutal-primary w-full text-xs py-2.5"
            >
              Sign In to CMS Dashboard
            </button>

            <button
              type="button"
              onClick={handleQuickDemoAdmin}
              className="btn-brutal-outline w-full text-xs py-2"
            >
              Quick Sign In (Demo Admin Account)
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Top Admin Header Bar */}
      <div className="bg-[#111111] text-[#f8f7f4] border-2 border-[#111111] shadow-[8px_8px_0_#d6a943] p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="badge-brutal">
              {adminUser.role.toUpperCase()}
            </span>
            <span className="font-mono-code text-xs text-[#d6a943]">ID: {adminUser.id}</span>
          </div>
          <h1 className="font-syne text-xl md:text-2xl font-extrabold text-white mt-1">
            Cooperative Administration CMS
          </h1>
          <p className="font-mono-code text-xs text-slate-300">
            Aadhunik Jana Saving & Credit Co-operative Ltd. · Nagarjun-4, Kathmandu
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentPage('source-export')}
            className="btn-brutal-primary bg-[#d6a943] text-[#111111] hover:bg-white text-xs py-2 px-3 shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export PHP 8.4</span>
          </button>
          <button
            onClick={logoutAdmin}
            className="font-mono-code text-xs font-bold uppercase px-3.5 py-2 border-2 border-white text-white hover:bg-white hover:text-[#111111] transition flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Admin Layout: Sidebar Tabs + Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Navigation (3 cols) */}
        <div className="lg:col-span-3 space-y-1 bg-white rounded-2xl p-3 border border-slate-200 shadow-xs h-fit">
          <button
            onClick={() => setActiveModule('overview')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
              activeModule === 'overview'
                ? 'bg-[#12345A] text-[#D6A943]'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview & Analytics</span>
            </div>
          </button>

          <button
            onClick={() => setActiveModule('applications')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
              activeModule === 'applications'
                ? 'bg-[#12345A] text-[#D6A943]'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileCheck className="w-4 h-4" />
              <span>Loan Applications</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px]">
              {loanApplications.length}
            </span>
          </button>

          <button
            onClick={() => setActiveModule('savings')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
              activeModule === 'savings'
                ? 'bg-[#12345A] text-[#D6A943]'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <PiggyBank className="w-4 h-4" />
              <span>Savings Schemes</span>
            </div>
            <span className="text-[10px] text-slate-400">{savingsSchemes.length}</span>
          </button>

          <button
            onClick={() => setActiveModule('loans')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
              activeModule === 'loans'
                ? 'bg-[#12345A] text-[#D6A943]'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Banknote className="w-4 h-4" />
              <span>Loan Facilities</span>
            </div>
            <span className="text-[10px] text-slate-400">{loanSchemes.length}</span>
          </button>

          <button
            onClick={() => setActiveModule('notices')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
              activeModule === 'notices'
                ? 'bg-[#12345A] text-[#D6A943]'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Bell className="w-4 h-4" />
              <span>Notices & AGM</span>
            </div>
            <span className="text-[10px] text-slate-400">{notices.length}</span>
          </button>

          <button
            onClick={() => setActiveModule('news')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
              activeModule === 'news'
                ? 'bg-[#12345A] text-[#D6A943]'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Newspaper className="w-4 h-4" />
              <span>News & CSR</span>
            </div>
            <span className="text-[10px] text-slate-400">{news.length}</span>
          </button>

          <button
            onClick={() => setActiveModule('inquiries')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
              activeModule === 'inquiries'
                ? 'bg-[#12345A] text-[#D6A943]'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4" />
              <span>Contact Inquiries</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-[#1769AA] text-[10px]">
              {contactMessages.length}
            </span>
          </button>

          <button
            onClick={() => setActiveModule('settings')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
              activeModule === 'settings'
                ? 'bg-[#12345A] text-[#D6A943]'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Settings className="w-4 h-4" />
              <span>Website Settings</span>
            </div>
          </button>

          <button
            onClick={() => setActiveModule('logs')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
              activeModule === 'logs'
                ? 'bg-[#12345A] text-[#D6A943]'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Activity className="w-4 h-4" />
              <span>Activity Audit Log</span>
            </div>
            <span className="text-[10px] text-slate-400">{activityLogs.length}</span>
          </button>
        </div>

        {/* Right Content Work Area (9 cols) */}
        <div className="lg:col-span-9 space-y-6">
          {/* Module: Overview & Analytics */}
          {activeModule === 'overview' && (
            <div className="space-y-6 animate-in fade-in">
              {/* Metric Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <span className="text-slate-400 text-xs block">Loan Applications</span>
                  <div className="text-2xl font-extrabold text-[#12345A] mt-1">
                    {loanApplications.length}
                  </div>
                  <span className="text-[11px] text-amber-600 font-semibold">Active Inquiries</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <span className="text-slate-400 text-xs block">Contact Messages</span>
                  <div className="text-2xl font-extrabold text-[#1769AA] mt-1">
                    {contactMessages.length}
                  </div>
                  <span className="text-[11px] text-emerald-600 font-semibold">Saved in Database</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <span className="text-slate-400 text-xs block">Savings Schemes</span>
                  <div className="text-2xl font-extrabold text-[#12345A] mt-1">
                    {savingsSchemes.length}
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">All Active</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <span className="text-slate-400 text-xs block">Published Notices</span>
                  <div className="text-2xl font-extrabold text-[#D6A943] mt-1">
                    {notices.length}
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">AGM & Circulars</span>
                </div>
              </div>

              {/* Visual Analytics Chart Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-[#12345A]">
                    Loan Distribution & Application Status Ratio
                  </h3>
                  <span className="text-xs text-slate-400">Chart Visualizer</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Category Breakdown Bar */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3">
                    <span className="text-xs font-bold text-slate-700 block">
                      Active Loan Schemes Breakdown
                    </span>
                    <div className="space-y-2 text-xs">
                      {loanSchemes.map((loan) => (
                        <div key={loan.id} className="space-y-1">
                          <div className="flex justify-between text-[11px]">
                            <span className="font-medium text-slate-600">{loan.nameEn}</span>
                            <span className="font-bold text-[#1769AA]">{loan.interestRate}</span>
                          </div>
                          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-[#12345A] rounded-full w-4/5"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Operational Security & Audit */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3 text-xs">
                    <span className="text-xs font-bold text-slate-700 block">
                      System Security & Architecture Status
                    </span>
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Database: Normalized MySQL 8 / PDO Prepared Statements</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>XSS & CSRF Protection Configured</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Bilingual (Nepali & English) Real-time Sync</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>cPanel / XAMPP Apache .htaccess Clean URLs Ready</span>
                      </li>
                    </ul>

                    <div className="pt-2">
                      <button
                        onClick={() => setCurrentPage('source-export')}
                        className="w-full py-2 bg-[#12345A] text-white font-bold rounded-lg hover:bg-[#1769AA] text-xs transition"
                      >
                        Inspect Complete PHP 8.4 Source Code
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Latest Applications */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-[#12345A]">Recent Loan Applications</h3>
                  <button
                    onClick={() => setActiveModule('applications')}
                    className="text-xs font-bold text-[#1769AA] hover:underline"
                  >
                    View All
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#12345A] text-white">
                      <tr>
                        <th className="py-2.5 px-3">App No</th>
                        <th className="py-2.5 px-3">Applicant Name</th>
                        <th className="py-2.5 px-3">Scheme</th>
                        <th className="py-2.5 px-3">Amount</th>
                        <th className="py-2.5 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {loanApplications.slice(0, 4).map((app) => (
                        <tr key={app.id}>
                          <td className="py-2.5 px-3 font-mono font-bold text-slate-700">{app.applicationNo}</td>
                          <td className="py-2.5 px-3 font-semibold text-[#12345A]">{app.applicantName}</td>
                          <td className="py-2.5 px-3">{app.loanSchemeName}</td>
                          <td className="py-2.5 px-3 font-bold text-[#1769AA]">
                            NPR {app.requestedAmount.toLocaleString()}
                          </td>
                          <td className="py-2.5 px-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                app.status === 'Approved'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : app.status === 'Under Review'
                                  ? 'bg-blue-100 text-[#1769AA]'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {app.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Module: Loan Applications Review */}
          {activeModule === 'applications' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-lg text-[#12345A]">Loan Applications Management</h3>
                  <p className="text-xs text-slate-500">
                    Review member loan requests, update review status, and add Credit Committee remarks.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {loanApplications.map((app) => (
                  <div
                    key={app.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="font-mono text-xs font-bold text-slate-400">{app.applicationNo}</span>
                        <h4 className="font-bold text-base text-[#12345A]">
                          {app.applicantName} ({app.applicantPhone})
                        </h4>
                        <span className="text-xs text-slate-500">{app.loanSchemeName} • Address: {app.applicantAddress}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={app.status}
                          onChange={(e) =>
                            updateLoanApplicationStatus(app.id, e.target.value as any)
                          }
                          className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-[#12345A] outline-hidden"
                        >
                          <option value="Submitted">Status: Submitted</option>
                          <option value="Under Review">Status: Under Review</option>
                          <option value="Approved">Status: Approved</option>
                          <option value="Rejected">Status: Rejected</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-white p-3 rounded-xl border border-slate-200">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Requested Amount</span>
                        <span className="font-bold text-[#1769AA] text-sm">
                          NPR {app.requestedAmount.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Tenure</span>
                        <span className="font-bold text-slate-700">{app.requestedTenureMonths} Months</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Monthly Income</span>
                        <span className="font-bold text-slate-700">NPR {app.monthlyIncome.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Collateral</span>
                        <span className="font-bold text-slate-700 truncate block">{app.collateralType}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-100">
                      <span className="font-bold text-slate-700">Purpose: </span>
                      {app.purpose}
                    </p>

                    {/* Admin remarks editor */}
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        defaultValue={app.adminRemarks || ''}
                        onBlur={(e) => updateLoanApplicationStatus(app.id, app.status, e.target.value)}
                        placeholder="Add Credit Committee remarks or visit notes..."
                        className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-hidden"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Module: Savings Schemes Management */}
          {activeModule === 'savings' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-lg text-[#12345A]">Savings Schemes Management</h3>
                  <p className="text-xs text-slate-500">
                    Add new deposit schemes, adjust interest rates, and manage scheme availability.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddSavings(!showAddSavings)}
                  className="px-3 py-1.5 bg-[#12345A] hover:bg-[#1769AA] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Scheme</span>
                </button>
              </div>

              {/* Add Scheme Form */}
              {showAddSavings && (
                <form
                  onSubmit={handleCreateSavings}
                  className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs"
                >
                  <h4 className="font-bold text-sm text-[#12345A]">Create New Savings Scheme</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Scheme Name (English)"
                      value={newSavNameEn}
                      onChange={(e) => setNewSavNameEn(e.target.value)}
                      className="px-3 py-2 bg-white border border-slate-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Scheme Name (Nepali)"
                      value={newSavNameNe}
                      onChange={(e) => setNewSavNameNe(e.target.value)}
                      className="px-3 py-2 bg-white border border-slate-300 rounded-lg"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Interest Rate (e.g. 8.75% p.a.)"
                      value={newSavRate}
                      onChange={(e) => setNewSavRate(e.target.value)}
                      className="px-3 py-2 bg-white border border-slate-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Minimum Deposit (e.g. NPR 1,000)"
                      value={newSavMin}
                      onChange={(e) => setNewSavMin(e.target.value)}
                      className="px-3 py-2 bg-white border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddSavings(false)}
                      className="px-3 py-1.5 bg-slate-200 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#12345A] text-white font-bold rounded-lg"
                    >
                      Save Scheme
                    </button>
                  </div>
                </form>
              )}

              {/* Schemes List */}
              <div className="space-y-3">
                {savingsSchemes.map((s) => (
                  <div
                    key={s.id}
                    className="p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-300"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#12345A]">{s.nameEn}</span>
                        <span className="text-xs text-slate-400">({s.nameNe})</span>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-blue-50 text-[#1769AA] font-bold">
                          {s.category}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Interest: <strong className="text-[#1769AA]">{s.interestRate}</strong> • Min: {s.minimumDeposit}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const newRate = prompt('Enter updated interest rate:', s.interestRate);
                          if (newRate) updateSavingsScheme(s.id, { interestRate: newRate });
                        }}
                        className="p-1.5 text-slate-600 hover:text-[#12345A] hover:bg-slate-100 rounded-lg transition"
                        title="Edit rate"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete ${s.nameEn}?`)) {
                            deleteSavingsScheme(s.id);
                          }
                        }}
                        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Module: Loan Facilities Management */}
          {activeModule === 'loans' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-lg text-[#12345A]">Loan Schemes & Policy Control</h3>
                  <p className="text-xs text-slate-500">
                    Adjust cooperative credit ceilings, interest caps, and tenure limits.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {loanSchemes.map((loan) => (
                  <div
                    key={loan.id}
                    className="p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#12345A]">{loan.nameEn}</span>
                        <span className="text-xs text-slate-400">({loan.nameNe})</span>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-amber-50 text-amber-900 border border-amber-200 font-bold">
                          {loan.category}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Rate: <strong className="text-[#1769AA]">{loan.interestRate}</strong> • Limit: {loan.loanLimitEn}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const newRate = prompt('Enter updated interest rate:', loan.interestRate);
                          if (newRate) updateLoanScheme(loan.id, { interestRate: newRate });
                        }}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold"
                      >
                        Edit Rate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Module: Notices & Announcements */}
          {activeModule === 'notices' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-lg text-[#12345A]">Notice & AGM Publication CMS</h3>
                  <p className="text-xs text-slate-500">
                    Publish official board circulars, meeting notices, and pin important announcements.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddNotice(!showAddNotice)}
                  className="px-3 py-1.5 bg-[#12345A] hover:bg-[#1769AA] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Notice</span>
                </button>
              </div>

              {/* Add Notice Form */}
              {showAddNotice && (
                <form
                  onSubmit={handleCreateNotice}
                  className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs"
                >
                  <h4 className="font-bold text-sm text-[#12345A]">Publish New Notice</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Notice Title (English)"
                      value={newNoticeTitleEn}
                      onChange={(e) => setNewNoticeTitleEn(e.target.value)}
                      className="px-3 py-2 bg-white border border-slate-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Notice Title (Nepali)"
                      value={newNoticeTitleNe}
                      onChange={(e) => setNewNoticeTitleNe(e.target.value)}
                      className="px-3 py-2 bg-white border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <textarea
                      rows={3}
                      required
                      placeholder="Notice Content / Full text..."
                      value={newNoticeContentEn}
                      onChange={(e) => setNewNoticeContentEn(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                    ></textarea>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="pinCheck"
                      checked={newNoticePinned}
                      onChange={(e) => setNewNoticePinned(e.target.checked)}
                    />
                    <label htmlFor="pinCheck">Pin to Homepage ticker (Featured Notice)</label>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddNotice(false)}
                      className="px-3 py-1.5 bg-slate-200 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#12345A] text-white font-bold rounded-lg"
                    >
                      Publish
                    </button>
                  </div>
                </form>
              )}

              {/* Notice list */}
              <div className="space-y-3">
                {notices.map((n) => (
                  <div
                    key={n.id}
                    className="p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {n.isPinned && (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 font-bold">
                            Pinned
                          </span>
                        )}
                        <span className="font-bold text-sm text-[#12345A]">{n.titleEn}</span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">{n.contentEn}</p>
                      <span className="text-[11px] text-slate-400">Date: {n.publishedDate}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateNotice(n.id, { isPinned: !n.isPinned })}
                        className="px-2.5 py-1 text-xs border rounded-lg hover:bg-slate-50"
                      >
                        {n.isPinned ? 'Unpin' : 'Pin'}
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Delete this notice?')) deleteNotice(n.id);
                        }}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Module: Contact Messages & Inquiries */}
          {activeModule === 'inquiries' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-lg text-[#12345A]">Member & Visitor Inquiries</h3>
                  <p className="text-xs text-slate-500">
                    Messages submitted from the public contact form stored in database.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {contactMessages.map((msg) => (
                  <div key={msg.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-[#12345A]">{msg.fullName}</h4>
                        <span className="text-xs text-slate-500">
                          Phone: {msg.phone} • Email: {msg.email} • {msg.createdAt}
                        </span>
                      </div>
                      <select
                        value={msg.status}
                        onChange={(e) => updateContactMessageStatus(msg.id, e.target.value as any)}
                        className="px-2.5 py-1 bg-white border border-slate-300 rounded text-xs font-semibold"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Read">Read</option>
                        <option value="Replied">Replied</option>
                      </select>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-slate-100 text-xs text-slate-700">
                      <span className="font-bold block text-slate-800 mb-1">{msg.subject}</span>
                      <p>{msg.message}</p>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <input
                        type="text"
                        defaultValue={msg.notes || ''}
                        onBlur={(e) => updateContactMessageStatus(msg.id, msg.status, e.target.value)}
                        placeholder="Internal staff follow-up note..."
                        className="w-3/4 px-2.5 py-1 text-xs bg-white border border-slate-200 rounded"
                      />
                      <button
                        onClick={() => deleteContactMessage(msg.id)}
                        className="text-rose-500 hover:text-rose-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Module: Website Settings */}
          {activeModule === 'settings' && (
            <form onSubmit={handleSaveSettings} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-lg text-[#12345A]">Cooperative Website Settings</h3>
                  <p className="text-xs text-slate-500">
                    Changes immediately reflect on the live website and save to persistent storage.
                  </p>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#12345A] hover:bg-[#1769AA] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-sm"
                >
                  <Save className="w-4 h-4 text-[#D6A943]" />
                  <span>Save Settings</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Organization Name (English)</label>
                  <input
                    type="text"
                    value={editSettings.orgNameEn}
                    onChange={(e) => setEditSettings({ ...editSettings, orgNameEn: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Organization Name (Nepali)</label>
                  <input
                    type="text"
                    value={editSettings.orgNameNe}
                    onChange={(e) => setEditSettings({ ...editSettings, orgNameNe: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Primary Phone</label>
                  <input
                    type="text"
                    value={editSettings.phone}
                    onChange={(e) => setEditSettings({ ...editSettings, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Primary Email</label>
                  <input
                    type="email"
                    value={editSettings.email}
                    onChange={(e) => setEditSettings({ ...editSettings, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Address (English)</label>
                  <input
                    type="text"
                    value={editSettings.addressEn}
                    onChange={(e) => setEditSettings({ ...editSettings, addressEn: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Address (Nepali)</label>
                  <input
                    type="text"
                    value={editSettings.addressNe}
                    onChange={(e) => setEditSettings({ ...editSettings, addressNe: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1 text-xs">
                  Google Maps Embed URL
                </label>
                <input
                  type="text"
                  value={editSettings.googleMapsEmbedUrl}
                  onChange={(e) => setEditSettings({ ...editSettings, googleMapsEmbedUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono"
                />
              </div>
            </form>
          )}

          {/* Module: Activity Audit Log */}
          {activeModule === 'logs' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4 animate-in fade-in">
              <div className="pb-3 border-b border-slate-100">
                <h3 className="font-bold text-lg text-[#12345A]">Administrative Activity Audit Log</h3>
                <p className="text-xs text-slate-500">
                  Immutable record of administrative logins, edits, loan approvals, and content modifications.
                </p>
              </div>

              <div className="space-y-2">
                {activityLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-[#12345A] mr-2">[{log.action}]</span>
                      <span className="text-slate-700">{log.details}</span>
                      <span className="text-slate-400 block text-[10px]">By: {log.user}</span>
                    </div>
                    <div className="text-right text-[11px] text-slate-400">
                      <span>{log.timestamp}</span>
                      <span className="block font-mono text-[10px]">{log.ipAddress}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
