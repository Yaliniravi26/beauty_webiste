import { useState, useRef, MouseEvent } from 'react';
import { ArrowRight, Sparkles, Droplets } from 'lucide-react';
import { Product } from '../types';
import { beautyImages, handleImageError, FALLBACK_BEAUTY_IMAGE } from '../data/images';
import LuxuryImage from './LuxuryImage';

interface HeroProps {
  onShopCollection: () => void;
  onExploreBeauty: () => void;
  onQuickViewProduct: (product: Product) => void;
  featuredProduct: Product;
}

export default function Hero({
  onShopCollection,
  onExploreBeauty,
  onQuickViewProduct,
  featuredProduct
}: HeroProps) {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[96vh] pt-32 pb-20 md:py-36 bg-[#FAF7F2] flex items-center overflow-hidden luxury-grain"
    >
      {/* Subtle Warm Luxury Ambient Light */}
      <div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none opacity-40 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #F3E2D3 0%, rgba(250, 247, 242, 0) 70%)',
          transform: `translate(${mouseOffset.x * 25}px, ${mouseOffset.y * 25}px)`
        }}
      />
      <div
        className="absolute bottom-10 left-10 w-[350px] h-[350px] rounded-full pointer-events-none opacity-30 blur-2xl"
        style={{
          background: 'radial-gradient(circle, #EEDCD8 0%, rgba(250, 247, 242, 0) 70%)'
        }}
      />

      {/* Luxury Editorial Geometry Lines */}
      <div className="absolute top-28 left-8 sm:left-14 text-[9px] font-mono tracking-[0.3em] uppercase text-[#A3968C] hidden md:block">
        AUTUMN / WINTER MMXXVI • CAMPAIGN EDITION
      </div>
      <div className="absolute top-28 right-8 sm:right-14 text-[9px] font-mono tracking-[0.3em] uppercase text-[#A3968C] hidden md:block">
        THE FORMULATION EDIT
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative z-10">
        
        {/* LEFT SIDE: Editorial Typography & Brand Narrative */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-7">
          
          {/* Subtle Tagline Badge */}
          <div className="inline-flex items-center space-x-2.5">
            <span className="w-2 h-2 rounded-full bg-[#BFA37C] animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-[0.28em] text-[#8C7E76]">
              BEAUTY, REFINED
            </span>
            <span className="text-xs text-[#D8CECA]">•</span>
            <span className="text-[11px] font-sans uppercase tracking-[0.22em] text-[#9E9088]">
              COUTURE FORMULATIONS
            </span>
          </div>

          {/* Large Split-Screen Brand Headline */}
          <div className="space-y-1">
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] tracking-tight text-[#1F1A18] leading-[0.92] uppercase">
              VELORA
            </h1>
            <div className="font-serif italic font-light text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-[#8E7966] leading-[0.95]">
              BEAUTY
            </div>
          </div>

          {/* Small Editorial Subtext */}
          <p className="text-base sm:text-lg text-[#5C534D] max-w-md font-sans font-normal leading-relaxed pt-1">
            “Beauty, refined for every version of you.”
          </p>

          <p className="text-xs sm:text-sm text-[#7D736C] max-w-lg leading-relaxed font-sans">
            Crafted at the threshold of cellular dermatology and haute cosmetics. Silken textures, pure botanical extracts, and light-refracting pigments designed for effortless everyday grace.
          </p>

          {/* Buttons: SHOP COLLECTION & EXPLORE BEAUTY */}
          <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              id="hero-shop-collection-btn"
              onClick={onShopCollection}
              className="group px-8 py-4 bg-[#2B231F] text-[#FAF7F2] text-xs font-medium tracking-[0.24em] uppercase transition-all duration-300 hover:bg-[#453730] shadow-[0_12px_32px_rgba(43,35,31,0.15)] flex items-center justify-center space-x-3 cursor-pointer"
            >
              <span>SHOP COLLECTION</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5 text-[#BFA37C]" />
            </button>

            <button
              id="hero-explore-beauty-btn"
              onClick={onExploreBeauty}
              className="px-7 py-4 border border-[#D5C6B7] text-[#2B231F] hover:border-[#2B231F] hover:bg-[#F4ECE3] text-xs font-medium tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#BFA37C]" />
              <span>EXPLORE BEAUTY</span>
            </button>
          </div>

          {/* Luxury Brand Pillar Strip */}
          <div className="pt-6 border-t border-[#E8DEC2]/60 grid grid-cols-3 gap-4 text-left">
            <div>
              <div className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#968981]">ETHOS</div>
              <div className="text-xs font-medium text-[#2B231F] mt-0.5">Cruelty-Free & Clean</div>
            </div>
            <div>
              <div className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#968981]">TEXTURE</div>
              <div className="text-xs font-medium text-[#2B231F] mt-0.5">Weightless Cashmere</div>
            </div>
            <div>
              <div className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#968981]">ORIGIN</div>
              <div className="text-xs font-medium text-[#2B231F] mt-0.5">Alpine & Provençal</div>
            </div>
          </div>

        </div>

        {/* RIGHT SIDE: 3D Floating Beauty Product Composition */}
        <div className="lg:col-span-6 relative perspective-1500 py-6 sm:py-10 flex items-center justify-center">
          
          {/* Main Campaign Stage Container with Parallax & Soft Shadow */}
          <div
            className="relative w-full max-w-[500px] aspect-[4/5] rounded-[32px] overflow-hidden bg-gradient-to-tr from-[#EEDFD2] via-[#F6ECE2] to-[#FAF7F2] p-4 sm:p-6 shadow-[0_30px_70px_rgba(43,35,31,0.12)] border border-[#E9DDD0] preserve-3d"
            style={{
              transform: `rotateX(${-mouseOffset.y * 6}deg) rotateY(${mouseOffset.x * 8}deg)`,
              transition: 'transform 0.25s cubic-bezier(0.2, 0, 0.2, 1)',
            }}
          >
            {/* Background Photographic Campaign Backdrop (Serum bottle, cream jar, lipstick, perfume, brush) */}
            <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-[#EDE3D8]">
              <img
                src={beautyImages.hero}
                alt="Velora Luxury Beauty Editorial Composition - Serum, Cream Jar, Lipstick, Perfume"
                className="w-full h-full object-cover filter brightness-[0.98] contrast-[1.02] transform transition-transform duration-1000 scale-105 block"
                loading="eager"
                decoding="async"
                onError={(e) => handleImageError(e, beautyImages.heroFallback)}
              />

              {/* Silk Draping & Lighting Reflection Sheen */}
              <div
                className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
                style={{
                  background: `linear-gradient(${120 + mouseOffset.x * 20}deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 60%)`
                }}
              />

              {/* Floating Layer 1: Serum Dropper Highlight Pill */}
              <div
                className="absolute top-6 left-6 glass-panel px-4 py-2.5 rounded-full shadow-lg flex items-center space-x-2 transition-transform duration-300"
                style={{
                  transform: `translate(${mouseOffset.x * 12}px, ${mouseOffset.y * 12}px) translateZ(30px)`,
                }}
              >
                <Droplets className="w-3.5 h-3.5 text-[#BFA37C]" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#2B231F]">
                  CELLULAR GLOW COMPLEX
                </span>
              </div>

              {/* Floating Layer 2: Perfume & Powder Badge */}
              <div
                className="absolute bottom-6 right-6 glass-panel px-4 py-2.5 rounded-full shadow-lg flex items-center space-x-2 transition-transform duration-300"
                style={{
                  transform: `translate(${-mouseOffset.x * 14}px, ${-mouseOffset.y * 14}px) translateZ(40px)`,
                }}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#BFA37C]" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#2B231F]">
                  SOLAR IRIS & ROSE VEIL
                </span>
              </div>
            </div>

            {/* Floating Product Highlight Card at Bottom */}
            <div
              onClick={() => onQuickViewProduct(featuredProduct)}
              className="absolute -bottom-4 -left-3 sm:-left-6 right-8 sm:right-auto glass-panel p-4 rounded-2xl shadow-[0_16px_36px_rgba(43,35,31,0.12)] border border-white/60 cursor-pointer hover:border-[#BFA37C] transition-all group"
              style={{
                transform: `translate(${mouseOffset.x * 8}px, ${mouseOffset.y * 8}px) translateZ(45px)`,
              }}
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#FAF7F2] border border-[#EADBCE]">
                  <img
                    src={featuredProduct.imageUrl}
                    alt={featuredProduct.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 block"
                    loading="eager"
                    onError={(e) => handleImageError(e, FALLBACK_BEAUTY_IMAGE)}
                  />
                </div>
                <div>
                  <div className="text-[9px] font-mono uppercase tracking-widest text-[#BFA37C]">
                    FEATURED ICON
                  </div>
                  <div className="font-serif text-base font-semibold text-[#1F1A18] leading-tight">
                    {featuredProduct.name}
                  </div>
                  <div className="text-xs text-[#7A6E67] font-mono mt-0.5">
                    ${featuredProduct.price} USD • ★ {featuredProduct.rating}
                  </div>
                </div>
                <div className="p-2 rounded-full bg-[#2B231F] text-[#FAF7F2] group-hover:bg-[#BFA37C] transition-colors ml-2">
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
