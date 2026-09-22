import { useState } from 'react';
import { CONCERNS } from '../data/products';
import { ArrowRight, Sparkles } from 'lucide-react';
import { handleImageError } from '../data/images';

interface ShopByConcernProps {
  onSelectConcern: (concernId: string) => void;
}

export default function ShopByConcern({ onSelectConcern }: ShopByConcernProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(CONCERNS[2].id); // Default GLOW

  return (
    <section id="concerns" className="py-24 md:py-32 bg-[#FAF7F2] border-t border-[#E8DEC2] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-[0.28em] uppercase text-[#8D7F77]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BFA37C]" />
            <span>CELLULAR TARGETING</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#1F1A18] tracking-tight font-normal">
            WHAT DOES YOUR SKIN NEED?
          </h2>
          <p className="text-sm sm:text-base text-[#6E635D] font-sans font-light">
            Every barrier is distinct. Select your focal point to uncover formulas targeted to your current skin rhythm.
          </p>
        </div>

        {/* Dynamic Expanding Concern Accordion / Editorial Cards */}
        <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[480px]">
          {CONCERNS.map((concern) => {
            const isHovered = hoveredId === concern.id;

            return (
              <div
                key={concern.id}
                id={`concern-card-${concern.id.toLowerCase()}`}
                onMouseEnter={() => setHoveredId(concern.id)}
                onClick={() => onSelectConcern(concern.id)}
                className={`group relative rounded-[24px] overflow-hidden cursor-pointer transition-all duration-700 ease-out border border-[#EADBCE] ${
                  isHovered
                    ? 'lg:flex-[2.5] h-[360px] lg:h-full shadow-[0_20px_45px_rgba(43,35,31,0.12)]'
                    : 'lg:flex-1 h-[140px] lg:h-full opacity-90 lg:opacity-75 hover:opacity-100'
                }`}
              >
                {/* Background Photography */}
                <img
                  src={concern.imageUrl}
                  alt={concern.title}
                  className="w-full h-full object-cover block filter brightness-[0.88] contrast-[1.05] transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => handleImageError(e)}
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F1A18]/90 via-[#1F1A18]/40 to-transparent transition-opacity duration-300" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between text-white">
                  
                  {/* Top Identifier */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-[0.25em] text-[#E0D0C0] uppercase bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                      RITUAL FOCUS
                    </span>
                    <span className={`w-8 h-8 rounded-full glass-panel flex items-center justify-center text-[#2B231F] transition-all duration-300 ${
                      isHovered ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                    }`}>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Bottom Text Content */}
                  <div className="space-y-2">
                    <h3 className="font-display text-3xl sm:text-4xl text-white font-normal tracking-wide">
                      {concern.title}
                    </h3>

                    <div className="font-serif italic text-sm text-[#E0D0C0]">
                      {concern.subtitle}
                    </div>

                    <div className={`overflow-hidden transition-all duration-500 ${
                      isHovered ? 'max-h-24 opacity-100 pt-2' : 'max-h-0 opacity-0'
                    }`}>
                      <p className="text-xs text-white/85 font-sans leading-relaxed max-w-sm">
                        {concern.description}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectConcern(concern.id);
                        }}
                        className="mt-3 text-[11px] font-mono tracking-widest uppercase text-[#BFA37C] hover:text-white flex items-center space-x-1.5"
                      >
                        <span>EXPLORE FORMULAS</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
