import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GalleryItem } from '../../types';
import { X, ZoomIn } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const { lang, t, gallery } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const categories = ['All', 'AGM', 'Community Work', 'Financial Education', 'Branch Office'];

  const filteredItems =
    selectedCategory === 'All' ? gallery : gallery.filter((g) => g.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      {/* Header (Variation 2 Brutalist Banner) */}
      <div className="bg-[#111111] text-[#f8f7f4] border-2 border-[#111111] shadow-[8px_8px_0_#d6a943] p-8">
        <span className="label text-[#d6a943] block mb-2">
          {lang === 'ne' ? '[ ०७ ] संस्थाका मुख्य झलकहरू' : '[ 07 ] PHOTO ARCHIVE & MOMENTS'}
        </span>
        <h1 className="font-syne text-3xl md:text-5xl font-extrabold text-white">
          {t.gallery}
        </h1>
        <p className="text-xs md:text-sm text-slate-300 mt-3 max-w-2xl leading-relaxed">
          {lang === 'ne'
            ? 'वार्षिक साधारण सभा, सामाजिक सेवा, वित्तीय साक्षरता तालिम तथा कार्यालयका गतिविधिहरूका तस्विर संग्रह।'
            : 'Explore photos and glimpses of our Annual General Meetings, CSR welfare, blood donation, and member gatherings.'}
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
              {cat === 'All' ? (lang === 'ne' ? 'सबै तस्विर' : 'All') : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActivePhoto(item)}
            className="group relative bg-white border-2 border-[#111111] shadow-[4px_4px_0_#111111] hover:shadow-[8px_8px_0_#111111] hover:-translate-x-0.5 hover:-translate-y-0.5 transition duration-200 cursor-pointer overflow-hidden"
          >
            <div className="aspect-4/3 overflow-hidden bg-slate-200 border-b-2 border-[#111111] relative">
              <img
                src={item.imageUrl}
                alt={item.titleEn}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-[#d6a943]">
                <ZoomIn className="w-8 h-8" />
              </div>
            </div>
            <div className="p-3.5 space-y-1">
              <div className="flex items-center justify-between font-mono-code text-[10px]">
                <span className="label text-[#111111]">{item.category}</span>
                <span className="text-[#111111]/60">{item.date}</span>
              </div>
              <h4 className="font-syne font-bold text-xs text-[#111111] line-clamp-1">
                {lang === 'ne' ? item.titleNe : item.titleEn}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111111]/85 backdrop-blur-xs cursor-pointer"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] bg-[#f8f7f4] border-2 border-white shadow-[12px_12px_0_#d6a943] overflow-hidden flex flex-col cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-[#111111] text-white border border-white hover:text-[#d6a943] transition cursor-pointer hover:bg-white/10"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex-1 flex items-center justify-center bg-black overflow-hidden p-2">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.titleEn}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
            <div className="p-4 bg-[#111111] text-white flex items-center justify-between border-t-2 border-[#111111]">
              <div>
                <span className="label text-[#d6a943] block mb-0.5">{activePhoto.category}</span>
                <h4 className="font-syne font-bold text-sm text-white">
                  {lang === 'ne' ? activePhoto.titleNe : activePhoto.titleEn}
                </h4>
              </div>
              <span className="font-mono-code text-xs text-slate-400">{activePhoto.date}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
