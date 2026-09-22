import { ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { beautyImages, handleImageError } from '../data/images';

interface MakeupEditorialProps {
  onShopMakeup: () => void;
  onQuickView: (product: Product) => void;
  makeupProducts: Product[];
}

export default function MakeupEditorial({
  onShopMakeup,
  onQuickView,
  makeupProducts
}: MakeupEditorialProps) {
  // Find key items: lipstick, blush, eyeshadow, mascara
  const lipstick = makeupProducts.find((p) => p.category === 'Lip') || makeupProducts[0];
  const blush = makeupProducts.find((p) => p.name.includes('Blush')) || makeupProducts[1];
  const mascara = makeupProducts.find((p) => p.category === 'Eyes') || makeupProducts[2];

  return (
    <section id="makeup-editorial" className="py-24 md:py-36 bg-[#F5ECE2] relative overflow-hidden border-t border-b border-[#E8DEC2]">
      {/* Editorial Decorative Watermark */}
      <div className="absolute -top-12 -left-8 text-[12rem] font-display text-[#EADBCE]/50 select-none pointer-events-none tracking-tighter">
        VELORA
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Magazine Editorial Headline Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 border-b border-[#DFCFC0] pb-10">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.3em] uppercase text-[#8D7F77]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BFA37C]" />
              <span>THE BEAUTY EDITORIAL • VOLUME IV</span>
            </div>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#1F1A18] tracking-tight font-normal leading-[0.95]">
              COLOR YOUR MOMENT
            </h2>
            <p className="font-serif italic text-2xl sm:text-3xl text-[#78695E]">
              “Soft neutrals. Bold expressions. Your rules.”
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end space-y-4">
            <p className="text-xs sm:text-sm text-[#6B5F57] font-sans leading-relaxed">
              Breathable mineral pigments, micro-milled cashmere pearls, and nourishing botanical lipids designed to enhance your natural contour without heaviness.
            </p>
            <button
              id="editorial-shop-makeup-btn"
              onClick={onShopMakeup}
              className="self-start px-7 py-3.5 bg-[#2B231F] text-[#FAF7F2] text-xs font-mono tracking-[0.24em] uppercase hover:bg-[#BFA37C] transition-all duration-300 shadow-sm flex items-center space-x-2.5 cursor-pointer"
            >
              <span>SHOP MAKEUP</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Asymmetrical High-Fashion Magazine Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Large Vertical Hero Card: Nude Silk Lipstick / Lips */}
          <div className="md:col-span-7 group relative rounded-[28px] overflow-hidden bg-[#FAF7F2] border border-[#EADBCE] shadow-[0_16px_36px_rgba(43,35,31,0.06)] min-h-[500px] flex flex-col justify-between p-8">
            <div className="absolute inset-0">
              <img
                src={lipstick?.imageUrl || beautyImages.lips}
                alt="Velora Couture Lipstick"
                className="w-full h-full object-cover block filter brightness-[0.95] contrast-[1.03] transition-transform duration-1000 group-hover:scale-105"
                loading="lazy"
                onError={(e) => handleImageError(e, beautyImages.lips)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1A18]/85 via-transparent to-black/20" />
            </div>

            {/* Top Tag */}
            <div className="relative z-10 flex items-center justify-between text-white">
              <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-mono tracking-widest uppercase border border-white/10">
                01 • SATIN LIP COUTURE
              </span>
              <span className="font-serif italic text-sm text-[#F3E6DA]">
                {lipstick?.shade || 'Petal 02'}
              </span>
            </div>

            {/* Bottom Content Card */}
            <div className="relative z-10 text-white space-y-3 pt-48">
              <h3 className="font-display text-4xl sm:text-5xl text-white font-normal">
                {lipstick?.name || 'Nude Silk Lip Color'}
              </h3>
              <p className="text-sm font-sans text-white/80 max-w-md line-clamp-2">
                {lipstick?.description}
              </p>
              <div className="pt-2 flex items-center space-x-4">
                <button
                  id="editorial-view-lipstick"
                  onClick={() => onQuickView(lipstick)}
                  className="px-5 py-2.5 rounded-full bg-white text-[#1F1A18] text-xs font-mono uppercase tracking-widest hover:bg-[#BFA37C] hover:text-white transition-colors cursor-pointer"
                >
                  DISCOVER SHADE — ${lipstick?.price}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column with 2 Asymmetrical Stacks: Blush & Mascara */}
          <div className="md:col-span-5 flex flex-col gap-6">
            
            {/* Top Stack: Rose Veil Blush */}
            <div className="group relative rounded-[28px] overflow-hidden bg-[#FAF7F2] border border-[#EADBCE] shadow-[0_16px_36px_rgba(43,35,31,0.06)] h-[280px] p-6 flex flex-col justify-between">
              <div className="absolute inset-0">
                <img
                  src={blush?.imageUrl || beautyImages.products.roseVeilBlush}
                  alt="Velora Rose Veil Blush"
                  className="w-full h-full object-cover block transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => handleImageError(e, beautyImages.products.roseVeilBlush)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F1A18]/80 via-transparent to-transparent" />
              </div>

              <div className="relative z-10 flex items-center justify-between text-white">
                <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-mono tracking-widest uppercase border border-white/10">
                  02 • RADIANT CHEEK VEIL
                </span>
                <span className="font-mono text-xs text-white/90 font-medium">
                  ${blush?.price} USD
                </span>
              </div>

              <div className="relative z-10 text-white flex items-end justify-between">
                <div>
                  <h4 className="font-display text-2xl sm:text-3xl text-white font-normal">
                    {blush?.name || 'Rose Veil Blush'}
                  </h4>
                  <p className="text-xs text-white/80 font-serif italic mt-0.5">
                    {blush?.shade || 'Matin Rose'}
                  </p>
                </div>
                <button
                  id="editorial-view-blush"
                  onClick={() => onQuickView(blush)}
                  className="p-3 rounded-full bg-white/90 text-[#1F1A18] hover:bg-[#BFA37C] hover:text-white transition-colors cursor-pointer"
                  aria-label="View Blush"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom Stack: Midnight Lash Mascara / Eyes */}
            <div className="group relative rounded-[28px] overflow-hidden bg-[#FAF7F2] border border-[#EADBCE] shadow-[0_16px_36px_rgba(43,35,31,0.06)] h-[280px] p-6 flex flex-col justify-between">
              <div className="absolute inset-0">
                <img
                  src={mascara?.imageUrl || beautyImages.eyes}
                  alt="Velora Midnight Lash Mascara"
                  className="w-full h-full object-cover block transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => handleImageError(e, beautyImages.eyes)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F1A18]/80 via-transparent to-transparent" />
              </div>

              <div className="relative z-10 flex items-center justify-between text-white">
                <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-mono tracking-widest uppercase border border-white/10">
                  03 • SCULPTURAL LASH FILM
                </span>
                <span className="font-mono text-xs text-white/90 font-medium">
                  ${mascara?.price} USD
                </span>
              </div>

              <div className="relative z-10 text-white flex items-end justify-between">
                <div>
                  <h4 className="font-display text-2xl sm:text-3xl text-white font-normal">
                    {mascara?.name || 'Midnight Lash Mascara'}
                  </h4>
                  <p className="text-xs text-white/80 font-serif italic mt-0.5">
                    {mascara?.subtitle}
                  </p>
                </div>
                <button
                  id="editorial-view-mascara"
                  onClick={() => onQuickView(mascara)}
                  className="p-3 rounded-full bg-white/90 text-[#1F1A18] hover:bg-[#BFA37C] hover:text-white transition-colors cursor-pointer"
                  aria-label="View Mascara"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
