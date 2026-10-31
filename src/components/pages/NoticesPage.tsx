import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NoticeItem } from '../../types';
import {
  Bell,
  Search,
  Download,
  X,
} from 'lucide-react';

export const NoticesPage: React.FC = () => {
  const { lang, t, notices, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeNoticeModal, setActiveNoticeModal] = useState<NoticeItem | null>(null);

  const categories = ['All', 'General', 'AGM', 'Financial Report', 'Tender', 'Holiday'];

  const filteredNotices = notices.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.titleNe.includes(searchQuery) ||
      item.contentEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.contentNe.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (notice: NoticeItem) => {
    showToast(
      lang === 'ne'
        ? `"${notice.titleNe}" को आधिकारिक सूचना डाउनलोड सुरु भयो`
        : `Downloading document: ${notice.pdfFileName || 'Notice.pdf'}`
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      {/* Page Header (Variation 2 Brutalist Banner) */}
      <div className="bg-[#111111] text-[#f8f7f4] border-2 border-[#111111] shadow-[8px_8px_0_#d6a943] p-8">
        <span className="label text-[#d6a943] block mb-2">
          {lang === 'ne' ? '[ ०४ ] आधिकारिक सूचना तथा जानकारी' : '[ 04 ] OFFICIAL NOTICES & CIRCULARS'}
        </span>
        <h1 className="font-syne text-3xl md:text-5xl font-extrabold text-white">
          {t.notices}
        </h1>
        <p className="text-xs md:text-sm text-slate-300 mt-3 max-w-2xl leading-relaxed">
          {lang === 'ne'
            ? 'साधारण सभा, वार्षिक प्रतिवेदन, परिमार्जित ब्याजदर तथा संस्थाका महत्त्वपूर्ण निर्णयहरूका आधिकारिक सूचनाहरू।'
            : 'Access official circulars, Annual General Meeting (AGM) convocations, audit reports, and public tenders.'}
        </p>

        {/* Search & Categories Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mt-6 pt-5 border-t border-white/15">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 font-mono-code text-xs uppercase font-bold border-2 transition ${
                  selectedCategory === cat
                    ? 'bg-[#d6a943] text-[#111111] border-[#d6a943]'
                    : 'bg-transparent text-white border-white/30 hover:border-white'
                }`}
              >
                {cat === 'All' ? (lang === 'ne' ? 'सबै सूचना' : 'All') : cat}
              </button>
            ))}
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'ne' ? 'सूचना खोज्नुहोस्...' : 'Search notices...'}
              className="w-full pl-9 pr-3 py-1.5 bg-black/60 text-white placeholder-slate-400 text-xs font-mono-code border border-white/30 focus:outline-none focus:border-[#d6a943]"
            />
          </div>
        </div>
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {filteredNotices.length === 0 ? (
          <div className="text-center py-12 bg-white border-2 border-[#111111] shadow-[6px_6px_0_#111111]">
            <Bell className="w-8 h-8 mx-auto text-[#111111]/40 mb-2" />
            <p className="font-syne font-bold text-[#111111]">{lang === 'ne' ? 'कुनै सूचना फेला परेन' : 'No notices found'}</p>
          </div>
        ) : (
          filteredNotices.map((notice) => (
            <div
              key={notice.id}
              className={`bg-white border-2 border-[#111111] p-6 shadow-[6px_6px_0_#111111] hover:shadow-[10px_10px_0_#111111] transition duration-200 flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                notice.isPinned ? 'border-2 border-[#111111]' : ''
              }`}
            >
              <div className="space-y-2 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="label text-[#111111]">[ {notice.category.toUpperCase()} ]</span>
                  {notice.isPinned && (
                    <span className="badge-brutal">
                      {lang === 'ne' ? 'महत्त्वपूर्ण सूचना' : 'PINNED'}
                    </span>
                  )}
                  <span className="font-mono-code text-[11px] text-[#111111]/60">
                    {notice.publishedDate}
                  </span>
                </div>

                <h3 className="font-syne text-xl font-bold text-[#111111] leading-snug">
                  {lang === 'ne' ? notice.titleNe : notice.titleEn}
                </h3>

                <p className="text-xs sm:text-sm text-[#111111]/75 leading-relaxed line-clamp-2">
                  {lang === 'ne' ? notice.contentNe : notice.contentEn}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setActiveNoticeModal(notice)}
                  className="btn-brutal-primary text-xs py-2 px-4"
                >
                  {lang === 'ne' ? 'पूरा सूचना' : 'Read Notice'}
                </button>

                <button
                  onClick={() => handleDownload(notice)}
                  className="btn-brutal-outline text-xs py-2 px-3"
                  title="Download Document PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Notice Detail Modal */}
      {activeNoticeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111111]/75 backdrop-blur-xs cursor-pointer"
          onClick={() => setActiveNoticeModal(null)}
        >
          <div
            className="bg-[#f8f7f4] border-2 border-[#111111] max-w-2xl w-full shadow-[12px_12px_0_#111111] overflow-hidden flex flex-col max-h-[85vh] cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#111111] text-[#f8f7f4] p-5 flex items-center justify-between border-b-2 border-[#111111]">
              <div>
                <span className="label text-[#d6a943]">
                  [ {activeNoticeModal.category.toUpperCase()} ]
                </span>
                <h3 className="font-syne font-bold text-lg text-white mt-1">
                  {lang === 'ne' ? activeNoticeModal.titleNe : activeNoticeModal.titleEn}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveNoticeModal(null)}
                className="text-white hover:text-[#d6a943] p-1.5 border border-white/20 transition cursor-pointer hover:bg-white/10"
                aria-label="Close notice modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs md:text-sm">
              <div className="flex items-center justify-between pb-3 border-b border-[#111111]/15 font-mono-code text-[11px] text-[#111111]/60">
                <span>Published: {activeNoticeModal.publishedDate}</span>
                <span>Ref: {activeNoticeModal.id.toUpperCase()}</span>
              </div>

              <div className="text-[#111111]/80 leading-relaxed whitespace-pre-line">
                {lang === 'ne' ? activeNoticeModal.contentNe : activeNoticeModal.contentEn}
              </div>

              <div className="pt-4 border-t border-[#111111]/15 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleDownload(activeNoticeModal)}
                  className="btn-brutal-primary text-xs py-2 px-4 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Official PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveNoticeModal(null)}
                  className="btn-brutal-outline text-xs py-2 px-4 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
