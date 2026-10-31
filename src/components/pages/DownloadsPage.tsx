import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DocumentDownload } from '../../types';
import {
  FileText,
  Download,
  Search,
} from 'lucide-react';

export const DownloadsPage: React.FC = () => {
  const { lang, t, documents, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', 'Forms', 'KYC', 'Reports', 'Bylaws'];

  const filteredDocs = documents.filter((doc) => {
    const matchCat = category === 'All' || doc.category === category;
    const matchSearch =
      doc.titleEn.toLowerCase().includes(search.toLowerCase()) ||
      doc.titleNe.includes(search) ||
      doc.descriptionEn.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleDownload = (doc: DocumentDownload) => {
    showToast(
      lang === 'ne'
        ? `"${doc.titleNe}" डाउनलोड सुरु भयो (${doc.fileSize})`
        : `Downloading "${doc.titleEn}" (${doc.fileSize})`
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      {/* Header (Variation 2 Brutalist Banner) */}
      <div className="bg-[#111111] text-[#f8f7f4] border-2 border-[#111111] shadow-[8px_8px_0_#d6a943] p-8">
        <span className="label text-[#d6a943] block mb-2">
          {lang === 'ne' ? '[ ०६ ] आधिकारिक फारम तथा कागजातहरू' : '[ 06 ] DOWNLOAD RESOURCE CENTER'}
        </span>
        <h1 className="font-syne text-3xl md:text-5xl font-extrabold text-white">
          {t.downloads}
        </h1>
        <p className="text-xs md:text-sm text-slate-300 mt-3 max-w-2xl leading-relaxed">
          {lang === 'ne'
            ? 'नयाँ सदस्यता, ग्राहक पहिचान (KYC), कर्जा आवेदन फारम, वार्षिक लेखापरीक्षण प्रतिवेदन तथा विनियमहरू यहाँबाट डाउनलोड गर्नुहोस्।'
            : 'Download official cooperative application forms, KYC templates, annual financial reports, and regulatory bylaws.'}
        </p>

        {/* Search & Categories Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mt-6 pt-5 border-t border-white/15">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3.5 py-1.5 font-mono-code text-xs uppercase font-bold border-2 transition ${
                  category === cat
                    ? 'bg-[#d6a943] text-[#111111] border-[#d6a943]'
                    : 'bg-transparent text-white border-white/30 hover:border-white'
                }`}
              >
                {cat === 'All' ? (lang === 'ne' ? 'सबै कागजात' : 'All') : cat}
              </button>
            ))}
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={lang === 'ne' ? 'फारम खोज्नुहोस्...' : 'Search documents...'}
              className="w-full pl-9 pr-3 py-1.5 bg-black/60 text-white placeholder-slate-400 text-xs font-mono-code border border-white/30 focus:outline-none focus:border-[#d6a943]"
            />
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="space-y-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white border-2 border-[#111111] p-6 shadow-[6px_6px_0_#111111] hover:shadow-[10px_10px_0_#111111] transition duration-200 flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 bg-[#111111] text-[#d6a943] border border-[#111111] flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono-code">
                  <span className="label text-[#111111]">
                    [ {doc.category.toUpperCase()} ]
                  </span>
                  <span className="text-[11px] text-[#111111]/60">PDF · {doc.fileSize}</span>
                  <span className="text-[11px] text-[#111111]/60 hidden sm:inline">· {doc.downloadsCount} downloads</span>
                </div>
                <h3 className="font-syne font-bold text-base md:text-lg text-[#111111]">
                  {lang === 'ne' ? doc.titleNe : doc.titleEn}
                </h3>
                <p className="text-xs text-[#111111]/70 leading-relaxed max-w-2xl">
                  {lang === 'ne' ? doc.descriptionNe : doc.descriptionEn}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleDownload(doc)}
              className="btn-brutal-primary text-xs py-2.5 px-5 shrink-0"
            >
              <Download className="w-4 h-4 text-[#d6a943]" />
              <span>{t.downloadPdf}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
