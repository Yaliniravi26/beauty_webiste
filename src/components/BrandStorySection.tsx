import { ArrowRight, Sparkles, ShieldCheck, HeartHandshake } from 'lucide-react';
import { beautyImages, handleImageError } from '../data/images';

interface BrandStorySectionProps {
  onExploreCollection: () => void;
}

export default function BrandStorySection({ onExploreCollection }: BrandStorySectionProps) {
  return (
    <section id="brand-story" className="py-28 md:py-40 bg-[#FAF7F2] relative overflow-hidden border-t border-[#E8DEC2]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Editorial Split Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Atmospheric Editorial Portrait & Still Life */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[32px] overflow-hidden aspect-[4/5] shadow-[0_25px_60px_rgba(43,35,31,0.12)] border border-[#EADBCE]">
              <img
                src={beautyImages.brandStory.main}
                alt="Velora Brand Sanctuary"
                className="w-full h-full object-cover block filter brightness-[0.96] contrast-[1.02]"
                loading="lazy"
                onError={(e) => handleImageError(e)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Floating Plaque on Image */}
              <div className="absolute bottom-6 left-6 right-6 glass-panel p-5 rounded-2xl border border-white/60">
                <div className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#BFA37C] mb-1">
                  EST. 2026 • THE MANIFESTO
                </div>
                <div className="font-serif italic text-base sm:text-lg text-[#1F1A18]">
                  “We eliminate the extraneous so only the luminous remains.”
                </div>
              </div>
            </div>

            {/* Overlapping Secondary Editorial Photo */}
            <div className="hidden sm:block absolute -bottom-8 -right-8 w-48 sm:w-56 aspect-[3/4] rounded-2xl overflow-hidden border-4 border-[#FAF7F2] shadow-xl">
              <img
                src={beautyImages.brandStory.secondary}
                alt="Velora Botanical Harvesting"
                className="w-full h-full object-cover block"
                loading="lazy"
                onError={(e) => handleImageError(e)}
              />
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-8">
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.3em] uppercase text-[#8D7F77]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#BFA37C]" />
                <span>THE VELORA PHILOSOPHY</span>
              </div>

              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#1F1A18] tracking-tight font-normal leading-[1.02]">
                BEAUTY WITHOUT EXCESS.
              </h2>
            </div>

            <p className="font-serif italic text-2xl sm:text-3xl text-[#78695E] leading-snug">
              “Velora was created around a simple idea — beauty should feel effortless, personal and beautifully made.”
            </p>

            <div className="space-y-4 text-sm text-[#5C534D] font-sans leading-relaxed">
              <p>
                In a world saturated with twenty-step routines and synthetic fillers, Velora champions intentional restraint. We collaborate with bio-botanists and French perfume houses to engineer hyper-concentrated formulas that address multiple barrier pathways in single gestures.
              </p>
              <p>
                Every glass vessel is weighted to encourage presence during application; every cold-pressed lipid is harvested with radical ecological accountability.
              </p>
            </div>

            {/* Sourcing & Environmental Standards */}
            <div className="grid grid-cols-2 gap-6 pt-2 border-t border-[#E8DDD0]">
              <div className="space-y-1">
                <div className="font-mono text-xs uppercase tracking-wider text-[#2B231F] font-semibold">
                  CLIMATE POSITIVE
                </div>
                <p className="text-xs text-[#7A6E67]">
                  100% recyclable brushed glass, refillable lipstick brass cartridges, and FSC-certified unbleached packaging.
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-mono text-xs uppercase tracking-wider text-[#2B231F] font-semibold">
                  CELLULAR BIO-ACTIVE
                </div>
                <p className="text-xs text-[#7A6E67]">
                  Zero synthetic dyes, parabens, sulfates, or micro-plastics. Certified Cruelty-Free worldwide.
                </p>
              </div>
            </div>

            {/* OUR STORY CTA */}
            <div className="pt-2">
              <button
                id="brand-story-explore-btn"
                onClick={onExploreCollection}
                className="group text-xs font-mono uppercase tracking-[0.24em] font-semibold text-[#1F1A18] hover:text-[#BFA37C] transition-colors flex items-center space-x-2 cursor-pointer"
              >
                <span>EXPLORE ALL FORMULATIONS</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
