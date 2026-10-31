import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PHP_SOURCE_FILES, PhpFileEntry } from '../../data/phpSourceCode';
import JSZip from 'jszip';
import {
  Download,
  FileCode,
  FolderTree,
  Database,
  Server,
  Copy,
  Check,
} from 'lucide-react';

export const PhpPackageExporter: React.FC = () => {
  const { showToast } = useApp();
  const [selectedFile, setSelectedFile] = useState<PhpFileEntry>(PHP_SOURCE_FILES[0]);
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [activeGuideTab, setActiveGuideTab] = useState<'xampp' | 'cpanel' | 'sql'>('xampp');

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    showToast(`Copied ${selectedFile.path} to clipboard!`);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();

      // Add all PHP source files
      PHP_SOURCE_FILES.forEach((f) => {
        zip.file(f.path, f.content);
      });

      // Generate the zip blob
      const content = await zip.generateAsync({ type: 'blob' });
      const downloadUrl = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'Aadhunik_Jana_SACCOS_PHP8.4_MySQL_Package.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);

      showToast('Downloaded complete PHP 8.4 & MySQL package for XAMPP/cPanel!');
    } catch (err) {
      console.error(err);
      showToast('Failed to create ZIP package', 'error');
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      {/* Top Banner (Variation 2 Brutalist Banner) */}
      <div className="bg-[#111111] text-[#f8f7f4] border-2 border-[#111111] shadow-[8px_8px_0_#d6a943] p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="badge-brutal">
              CORE PHP 8.4 & MYSQL 8
            </span>
            <span className="font-mono-code text-xs text-[#d6a943]">XAMPP & cPanel Ready</span>
          </div>
          <h1 className="font-syne text-2xl md:text-3xl font-extrabold text-white mt-2">
            Core PHP 8.4 Architecture & Deployment Hub
          </h1>
          <p className="font-mono-code text-xs text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Standalone, framework-free Core PHP 8.4 object-oriented codebase with PDO, normalized MySQL 8 schema,
            CSRF protection, XSS escaping, and Apache .htaccess rewrite rules.
          </p>
        </div>

        <button
          onClick={handleDownloadZip}
          disabled={isZipping}
          className="btn-brutal-primary bg-[#d6a943] text-[#111111] hover:bg-white shrink-0 shadow-[4px_4px_0_#ffffff]"
        >
          <Download className="w-4 h-4" />
          <span>{isZipping ? 'Generating ZIP...' : 'Download Full ZIP (.zip)'}</span>
        </button>
      </div>

      {/* Deployment Guides Tabs */}
      <div className="bg-white border-2 border-[#111111] shadow-[6px_6px_0_#111111] overflow-hidden">
        <div className="flex border-b-2 border-[#111111] bg-[#f8f7f4] text-xs font-mono-code font-bold uppercase">
          <button
            onClick={() => setActiveGuideTab('xampp')}
            className={`px-5 py-3 border-r-2 border-[#111111] transition flex items-center gap-2 ${
              activeGuideTab === 'xampp' ? 'bg-[#111111] text-[#f8f7f4]' : 'text-[#111111] hover:bg-[#111111]/5'
            }`}
          >
            <Server className="w-4 h-4 text-[#d6a943]" />
            <span>XAMPP Setup Guide</span>
          </button>
          <button
            onClick={() => setActiveGuideTab('cpanel')}
            className={`px-5 py-3 border-r-2 border-[#111111] transition flex items-center gap-2 ${
              activeGuideTab === 'cpanel' ? 'bg-[#111111] text-[#f8f7f4]' : 'text-[#111111] hover:bg-[#111111]/5'
            }`}
          >
            <Database className="w-4 h-4 text-[#d6a943]" />
            <span>cPanel Deployment</span>
          </button>
          <button
            onClick={() => setActiveGuideTab('sql')}
            className={`px-5 py-3 transition flex items-center gap-2 ${
              activeGuideTab === 'sql' ? 'bg-[#111111] text-[#f8f7f4]' : 'text-[#111111] hover:bg-[#111111]/5'
            }`}
          >
            <FileCode className="w-4 h-4 text-[#d6a943]" />
            <span>install.sql Schema</span>
          </button>
        </div>

        <div className="p-6 text-xs font-mono-code text-[#111111] leading-relaxed">
          {activeGuideTab === 'xampp' && (
            <div className="space-y-3">
              <h3 className="font-syne font-bold text-base text-[#111111]">
                How to Run Locally on XAMPP (Windows / macOS / Linux):
              </h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  Click the <strong>Download Full ZIP (.zip)</strong> button above and extract the folder.
                </li>
                <li>
                  Move the extracted folder into your XAMPP web root directory:{' '}
                  <code className="bg-[#f8f7f4] border border-[#111111] px-2 py-0.5 text-[#111111] font-bold">
                    C:\xampp\htdocs\aadhunik-jana\
                  </code>
                </li>
                <li>Start <strong>Apache</strong> and <strong>MySQL</strong> from the XAMPP Control Panel.</li>
                <li>
                  Open your browser and visit{' '}
                  <code className="bg-[#f8f7f4] border border-[#111111] px-2 py-0.5 text-[#111111]">
                    http://localhost/phpmyadmin
                  </code>
                  .
                </li>
                <li>
                  Create a database named{' '}
                  <code className="bg-[#d6a943] text-[#111111] px-2 py-0.5 font-bold">
                    aadhunik_cooperative
                  </code>{' '}
                  with collation <code>utf8mb4_unicode_ci</code>.
                </li>
                <li>
                  Click <strong>Import</strong> tab in phpMyAdmin and choose the file{' '}
                  <code>database/install.sql</code>.
                </li>
                <li>
                  Open your browser and navigate to:{' '}
                  <code className="bg-[#111111] text-[#d6a943] font-bold px-2 py-0.5">
                    http://localhost/aadhunik-jana/
                  </code>
                </li>
                <li>
                  Default Admin Credentials: Username: <strong>admin</strong> | Password:{' '}
                  <strong>admin123</strong> at <code>/admin/</code>.
                </li>
              </ol>
            </div>
          )}

          {activeGuideTab === 'cpanel' && (
            <div className="space-y-3">
              <h3 className="font-syne font-bold text-base text-[#111111]">How to Deploy on Production cPanel Hosting:</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Log in to your web hosting cPanel dashboard.</li>
                <li>
                  Under <strong>Databases</strong>, open <strong>MySQL Database Wizard</strong> and create user & database with ALL PRIVILEGES.
                </li>
                <li>
                  Open <strong>phpMyAdmin</strong> from cPanel and click <strong>Import</strong> to upload <code>database/install.sql</code>.
                </li>
                <li>
                  Open <strong>File Manager</strong>, navigate to <code>public_html/</code>, and upload all files from this package.
                </li>
                <li>
                  Ensure <code>.htaccess</code> is enabled and verify credentials in <code>config/database.php</code>.
                </li>
              </ol>
            </div>
          )}

          {activeGuideTab === 'sql' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#111111]">MySQL 8 Table Structure:</span>
                <span className="text-xs text-[#111111]/70">utf8mb4_unicode_ci</span>
              </div>
              <p className="text-xs text-[#111111]/80">
                Includes normalized tables: <code>admins</code>, <code>members</code>, <code>savings_schemes</code>,{' '}
                <code>loan_schemes</code>, <code>loan_applications</code>, <code>notices</code>, <code>news</code>,{' '}
                <code>documents</code>, <code>contact_messages</code>, <code>website_settings</code>, and{' '}
                <code>activity_logs</code>.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Code Viewer */}
      <div className="bg-white border-2 border-[#111111] shadow-[8px_8px_0_#111111] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left: File Tree List (4 cols) */}
        <div className="lg:col-span-4 border-r-2 border-[#111111] bg-[#f8f7f4] p-4 space-y-2 font-mono-code">
          <div className="flex items-center gap-2 pb-2 border-b-2 border-[#111111] text-xs font-bold text-[#111111] uppercase">
            <FolderTree className="w-4 h-4 text-[#111111]" />
            <span>Project File Hierarchy</span>
          </div>

          <div className="space-y-1">
            {PHP_SOURCE_FILES.map((f) => (
              <button
                key={f.path}
                onClick={() => setSelectedFile(f)}
                className={`w-full text-left p-2.5 text-xs font-mono transition flex items-center justify-between border ${
                  selectedFile.path === f.path
                    ? 'bg-[#111111] text-[#f8f7f4] border-[#111111] font-bold'
                    : 'border-transparent text-[#111111] hover:bg-[#111111]/5'
                }`}
              >
                <span className="truncate">{f.path}</span>
                <span
                  className={`text-[9px] uppercase px-1.5 py-0.5 border ${
                    selectedFile.path === f.path
                      ? 'bg-[#d6a943] text-[#111111] border-[#d6a943]'
                      : 'bg-white border-[#111111]/20 text-[#111111]'
                  }`}
                >
                  {f.category}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Code Inspector (8 cols) */}
        <div className="lg:col-span-8 flex flex-col bg-[#111111] text-[#f8f7f4]">
          <div className="p-3 bg-black flex items-center justify-between border-b-2 border-[#111111] text-xs font-mono-code">
            <div className="flex items-center gap-2 text-[#d6a943] font-bold">
              <FileCode className="w-4 h-4" />
              <span>{selectedFile.path}</span>
            </div>
            <button
              onClick={handleCopyCode}
              className="px-3 py-1 bg-white text-[#111111] border border-white hover:bg-[#d6a943] text-xs font-bold flex items-center gap-1.5 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>

          <div className="p-4 overflow-x-auto overflow-y-auto max-h-[550px] font-mono text-xs leading-relaxed text-slate-200">
            <pre className="whitespace-pre">{selectedFile.content}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};
