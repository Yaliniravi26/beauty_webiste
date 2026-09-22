import { useState } from 'react';
import { ArrowRight, Sparkles, Check } from 'lucide-react';
import { Product } from '../types';
import { beautyImages, handleImageError } from '../data/images';

interface DailyRitualSectionProps {
  onQuickViewProduct: (productName: string) => void;
}

export default function DailyRitualSection({ onQuickViewProduct }: DailyRitualSectionProps) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'CLEANSE',
      subtitle: 'Gentle Botanical Melt',
      formula: 'Botanical Cleansing Elixir',
      time: '1 MINUTE • MORNING & EVENING',
      desc: 'Dissolve residual sebum, mineral SPF, and micro-pollutants without disrupting the epidermal mantle. Warm golden oils emulsify into a soothing silk milk upon contact with warm water.',
      action: 'Press 2 pumps into dry skin, inhale the pure chamomile aroma, and rinse thoroughly.',
      imageUrl: beautyImages.rituals.step1
    },
    {
      num: '02',
      title: 'PREPARE',
      subtitle: 'Lipid Balancing & Hydration Channeling',
      formula: 'Lumière Hydrating Essence',
      time: '30 SECONDS • POST-CLEANSE',
      desc: 'Infuse cellular reservoirs with bio-compatible electrolytes and rose damascena distillates. Calms redness instantly and primes receptive pathways for intensive lipid absorption.',
      action: 'Pat gently onto forehead, cheeks, and neck using flat palms until fully absorbed.',
      imageUrl: beautyImages.rituals.step2
    },
    {
      num: '03',
      title: 'GLOW',
      subtitle: 'Cellular Radiance & Multi-Weight Peptides',
      formula: 'Velvet Glow Serum',
      time: '1 MINUTE • CORE TREATMENT',
      desc: 'Deliver triple-molecular hyaluronic acid, niacinamide, and cold-pressed camellia lipids deep within the skin. Imparts immediate candlelit luminosity and continuous moisture retention.',
      action: 'Dispense 3-4 drops across fingertips. Sweep in upward circular motions along the cheekbones and jawline.',
      imageUrl: beautyImages.rituals.step3
    },
    {
      num: '04',
      title: 'FINISH',
      subtitle: 'Ceramide Seal & Cashmere Protection',
      formula: 'Lumière Face Cream',
      time: 'ALL-DAY COMFORT • SEAL',
      desc: 'Lock in active nutrients with biomimetic ceramides and white truffle extracts. Leaves skin velvety to the touch with zero oily residue—an ideal primer for sheer makeup or bare-faced radiance.',
      action: 'Warm a pearl-sized amount between fingertips and smooth across facial contours to seal your ritual.',
      imageUrl: beautyImages.rituals.step4
    }
  ];

  const currentStep = steps[activeStep];

  return (
    <section id="daily-ritual" className="py-24 md:py-36 bg-[#FAF7F2] border-t border-[#E8DEC2] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#EADDD0] pb-10 mb-14 gap-6">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.3em] uppercase text-[#8D7F77] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BFA37C]" />
              <span>THE 4-STEP PROTOCOL</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#1F1A18] tracking-tight font-normal">
              YOUR DAILY RITUAL
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#6E635D] max-w-md font-sans">
            A serene four-step ceremonial cadence designed to honor your skin’s biological chronobiology.
          </p>
        </div>

        {/* Step Tabs Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {steps.map((st, idx) => (
            <button
              key={st.num}
              id={`ritual-step-${st.num}`}
              onClick={() => setActiveStep(idx)}
              className={`p-4 sm:p-5 rounded-2xl text-left border transition-all duration-300 cursor-pointer ${
                activeStep === idx
                  ? 'bg-[#2B231F] text-[#FAF7F2] border-[#2B231F] shadow-md'
                  : 'bg-[#F4ECE3] text-[#5C534D] border-[#EADBCE] hover:border-[#2B231F]'
              }`}
            >
              <div className="text-[10px] font-mono uppercase tracking-widest opacity-60">
                STEP {st.num}
              </div>
              <div className="font-display text-xl sm:text-2xl font-normal mt-0.5">
                {st.title}
              </div>
            </button>
          ))}
        </div>

        {/* Interactive Step Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch bg-[#F6EFE6] rounded-[32px] p-6 sm:p-10 border border-[#EADBCE]">
          
          {/* Step Photography */}
          <div className="lg:col-span-6 relative aspect-square sm:aspect-[4/3] lg:aspect-auto rounded-[24px] overflow-hidden min-h-[360px] shadow-md">
            <img
              src={currentStep.imageUrl}
              alt={currentStep.title}
              className="w-full h-full object-cover block transition-all duration-700 filter brightness-[0.96]"
              loading="lazy"
              onError={(e) => handleImageError(e)}
            />
            <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase">
              PHASE {currentStep.num}
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-white/85 backdrop-blur-md p-4 rounded-xl text-[#2B231F] border border-white/40">
              <div className="text-[9px] font-mono uppercase tracking-widest text-[#BFA37C]">
                APPLICATION TIME
              </div>
              <div className="font-mono text-xs font-medium">
                {currentStep.time}
              </div>
            </div>
          </div>

          {/* Step Narrative & Formula Link */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-[0.24em] text-[#BFA37C]">
                STEP {currentStep.num} OF 04 • {currentStep.subtitle}
              </div>

              <h3 className="font-display text-3xl sm:text-4xl text-[#1F1A18] font-normal">
                {currentStep.title}
              </h3>

              <div className="p-4 rounded-2xl bg-[#EFE5D9] border border-[#E0D3C3] space-y-1">
                <div className="text-[9px] font-mono uppercase tracking-widest text-[#85776F]">
                  RECOMMENDED FORMULATION
                </div>
                <div className="font-serif text-lg font-medium text-[#2B231F]">
                  {currentStep.formula}
                </div>
              </div>

              <p className="text-sm text-[#5C534D] font-sans leading-relaxed">
                {currentStep.desc}
              </p>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EADBCE] text-xs text-[#6B5E55] space-y-1">
                <span className="font-mono uppercase tracking-wider text-[9px] text-[#BFA37C] block">
                  THE METHOD
                </span>
                <p className="italic">
                  “{currentStep.action}”
                </p>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                id={`ritual-view-${currentStep.formula.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => onQuickViewProduct(currentStep.formula)}
                className="px-7 py-3.5 bg-[#2B231F] text-[#FAF7F2] text-xs font-mono tracking-widest uppercase hover:bg-[#BFA37C] transition-colors flex items-center space-x-2 rounded-xl cursor-pointer"
              >
                <span>VIEW FORMULA DETAILS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
