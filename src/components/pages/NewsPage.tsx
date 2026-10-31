import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NewsArticle } from '../../types';
import { ArrowRight, X } from 'lucide-react';

export const NewsPage: React.FC = () => {
  const { lang, t, news } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

  const categories = ['All', 'CSR', 'Financial Literacy', 'Community', 'Training'];

  const filteredNews =
    selectedCategory === 'All' ? news : news.filter((n) => n.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      {/* Page Header (Variation 2 Brutalist Banner) */}
      <div className="bg-[#111111] text-[#f8f7f4] border-2 border-[#111111] shadow-[8px_8px_0_#d6a943] p-8">
        <span className="label text-[#d6a943] block mb-2">
          {lang === 'ne' ? '[ ०५ ] संस्थागत गतिविधि तथा समाचार' : '[ 05 ] NEWS & ACTIVITIES'}
        </span>
        <h1 className="font-syne text-3xl md:text-5xl font-extrabold text-white">
          {t.news}
        </h1>
        <p className="text-xs md:text-sm text-slate-300 mt-3 max-w-2xl leading-relaxed">
          {lang === 'ne'
            ? 'वित्तीय साक्षरता, सामाजिक उत्तरदायित्व (CSR), रक्तदान, तालिम तथा संस्थाका विविध कार्यक्रमहरूको सचित्र विवरण।'
            : 'Keep abreast of our community outreach, CSR initiatives, member workshops, and cooperative milestones.'}
        </p>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-white/15">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 font-mono-code text-xs uppercase font-bold border-2 transition ${
                selectedCategory === cat
                  ? 'bg-[#d6a943] text-[#111111] border-[#d6a943]'
                  : 'bg-transparent text-white border-white/30 hover:border-white'
              }`}
            >
              {cat === 'All' ? (lang === 'ne' ? 'सबै समाचार' : 'All') : cat}
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((article) => (
          <div
            key={article.id}
            className="bg-white border-2 border-[#111111] shadow-[6px_6px_0_#111111] hover:shadow-[10px_10px_0_#111111] hover:-translate-x-0.5 hover:-translate-y-0.5 transition duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 border-b-2 border-[#111111] overflow-hidden bg-slate-200">
                <img
                  src={article.imageUrl}
                  alt={article.titleEn}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#111111] text-[#d6a943] font-mono-code text-[10px] font-bold border border-white">
                  {article.category.toUpperCase()}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2 font-mono-code text-[11px] text-[#111111]/60">
                  <span>{article.publishedDate}</span>
                  <span>·</span>
                  <span>{article.readTime}</span>
                </div>

                <h3
                  onClick={() => setActiveArticle(article)}
                  className="font-syne font-bold text-base md:text-lg text-[#111111] hover:text-[#d6a943] cursor-pointer line-clamp-2 leading-snug"
                >
                  {lang === 'ne' ? article.titleNe : article.titleEn}
                </h3>

                <p className="text-xs text-[#111111]/70 line-clamp-3 leading-relaxed">
                  {lang === 'ne' ? article.summaryNe : article.summaryEn}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => setActiveArticle(article)}
                className="w-full btn-brutal-primary text-xs py-2"
              >
                <span>{t.readMore}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#d6a943]" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111111]/75 backdrop-blur-xs cursor-pointer"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="bg-[#f8f7f4] border-2 border-[#111111] max-w-2xl w-full shadow-[12px_12px_0_#111111] overflow-hidden flex flex-col max-h-[85vh] cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#111111] text-[#f8f7f4] p-5 flex items-center justify-between border-b-2 border-[#111111]">
              <div>
                <span className="label text-[#d6a943]">
                  [ {activeArticle.category.toUpperCase()} ]
                </span>
                <h3 className="font-syne font-bold text-lg text-white mt-1">
                  {lang === 'ne' ? activeArticle.titleNe : activeArticle.titleEn}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="text-white hover:text-[#d6a943] p-1.5 border border-white/20 transition cursor-pointer hover:bg-white/10"
                aria-label="Close article modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs md:text-sm">
              <div className="flex items-center justify-between pb-3 border-b border-[#111111]/15 font-mono-code text-[11px] text-[#111111]/60">
                <span>Date: {activeArticle.publishedDate}</span>
                <span>Category: {activeArticle.category}</span>
              </div>

              <div className="text-[#111111]/80 leading-relaxed whitespace-pre-line">
                {lang === 'ne' ? activeArticle.contentNe : activeArticle.contentEn}
              </div>

              <div className="pt-4 border-t border-[#111111]/15 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="btn-brutal-primary text-xs py-2 px-4 cursor-pointer"
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
