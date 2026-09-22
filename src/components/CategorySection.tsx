import { useRef } from 'react';
import { CATEGORIES } from '../data/products';
import { Category } from '../types';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { handleImageError } from '../data/images';

interface CategorySectionProps {
  onSelectCategory: (categoryId: string) => void;
}

export default function CategorySection({ onSelectCategory }: CategorySectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 380;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="categories" className="py-24 md:py-32 bg-[#FAF7F2] border-t border-b border-[#EDE3D8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.28em] uppercase text-[#8D7F77] mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BFA37C]" />
            <span>CURATED BEAUTY PILLARS</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#1F1A18] tracking-tight font-normal">
            EXPLORE YOUR BEAUTY RITUAL
          </h2>
          <p className="text-sm sm:text-base text-[#6E635D] max-w-lg mt-2 font-sans font-light">
            Formulated without compromise. Discover 10 targeted beauty disciplines organized by bespoke ritual and finish.
          </p>
        </div>

        {/* Scroll Controls */}
        <div className="flex items-center space-x-3">
          <button
            id="cat-scroll-left"
            onClick={() => scroll('left')}
            className="p-3.5 rounded-full border border-[#D5C6B7] bg-[#FAF7F2] hover:bg-[#2B231F] hover:text-[#FAF7F2] hover:border-[#2B231F] transition-all duration-300 text-[#2B231F] shadow-sm cursor-pointer"
            aria-label="Scroll categories left"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            id="cat-scroll-right"
            onClick={() => scroll('right')}
            className="p-3.5 rounded-full border border-[#D5C6B7] bg-[#FAF7F2] hover:bg-[#2B231F] hover:text-[#FAF7F2] hover:border-[#2B231F] transition-all duration-300 text-[#2B231F] shadow-sm cursor-pointer"
            aria-label="Scroll categories right"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scrolling Carousel of Editorial Cards */}
      <div
        ref={scrollContainerRef}
        className="flex space-x-6 overflow-x-auto px-6 md:px-12 pb-8 scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {CATEGORIES.map((category: Category, idx: number) => {
          // Asymmetrical card aspect ratios for high-fashion editorial variety
          const isWide = idx % 3 === 0;

          return (
            <div
              key={category.id}
              id={`category-card-${category.id}`}
              onClick={() => onSelectCategory(category.name)}
              className={`snap-start shrink-0 group relative rounded-[28px] overflow-hidden cursor-pointer select-none transition-all duration-500 hover:-translate-y-2 border border-[#EADBCE] ${
                isWide ? 'w-[320px] sm:w-[390px]' : 'w-[280px] sm:w-[330px]'
              } h-[460px] sm:h-[500px] shadow-[0_12px_30px_rgba(43,35,31,0.06)] hover:shadow-[0_20px_45px_rgba(43,35,31,0.12)]`}
            >
              {/* Background Product / Editorial Photography - 100% container filling */}
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-full object-cover object-center block transition-transform duration-1000 ease-out group-hover:scale-110 filter brightness-[0.93] contrast-[1.02]"
                loading={idx < 3 ? 'eager' : 'lazy'}
                onError={(e) => handleImageError(e)}
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1A18]/85 via-[#1F1A18]/25 to-transparent transition-opacity duration-300 group-hover:from-[#1F1A18]/90" />

              {/* Soft Golden Glow on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 bg-radial from-[#BFA37C]/40 via-transparent to-transparent pointer-events-none" />

              {/* Top Tag */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white/90">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  {category.count}
                </span>
                <span className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-[#2B231F] opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>

              {/* Bottom Editorial Caption */}
              <div className="absolute bottom-6 left-6 right-6 space-y-1.5 text-white">
                <div className="text-[9px] font-mono uppercase tracking-[0.28em] text-[#C5A880]">
                  DISCIPLINE {String(idx + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display text-3xl font-medium tracking-tight leading-tight">
                  {category.name}
                </h3>
                <p className="text-xs text-[#E3D9D0] font-sans font-light line-clamp-2 leading-relaxed pt-0.5">
                  {category.description}
                </p>
                <div className="pt-2 text-[10px] font-mono uppercase tracking-[0.22em] text-[#EADFD3] group-hover:text-[#C5A880] transition-colors flex items-center space-x-1.5">
                  <span>EXPLORE FORMULAS</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
