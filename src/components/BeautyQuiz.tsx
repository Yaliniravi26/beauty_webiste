import { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { Sparkles, ArrowRight, Check, RotateCcw, Heart, ShoppingBag } from 'lucide-react';

interface BeautyQuizProps {
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function BeautyQuiz({ onQuickView, onAddToCart }: BeautyQuizProps) {
  const [selectedIntent, setSelectedIntent] = useState<string>('GLOW');

  const options = [
    {
      id: 'GLOW',
      label: 'GLOW',
      tagline: 'Candlelit radiance & light-reflecting lipids',
      icon: '✨',
      matchFilter: (p: Product) => p.concern === 'Glow' || p.name.includes('Glow') || p.name.includes('Blush')
    },
    {
      id: 'HYDRATION',
      label: 'HYDRATION',
      tagline: 'Deep barrier restoration & plump water reservoirs',
      icon: '💧',
      matchFilter: (p: Product) => p.concern === 'Hydration' || p.name.includes('Cream') || p.name.includes('Elixir')
    },
    {
      id: 'COLOR',
      label: 'COLOR',
      tagline: 'Satin lip stains & micro-milled cheek pigment',
      icon: '💄',
      matchFilter: (p: Product) => p.category === 'Lip' || p.category === 'Makeup' || p.category === 'Eyes'
    },
    {
      id: 'SELF-CARE',
      label: 'SELF-CARE',
      tagline: 'Sensorial bath rituals & velvet body elixirs',
      icon: '🌿',
      matchFilter: (p: Product) => p.category === 'Body' || p.concern === 'Calming' || p.concern === 'Nourishing'
    },
    {
      id: 'SIGNATURE SCENT',
      label: 'SIGNATURE SCENT',
      tagline: 'Solar iris, warm ambergris & intimate skin sillage',
      icon: '🕊️',
      matchFilter: (p: Product) => p.category === 'Fragrance'
    }
  ];

  const currentOption = options.find((o) => o.id === selectedIntent) || options[0];
  const recommendedProducts = PRODUCTS.filter(currentOption.matchFilter).slice(0, 3);

  return (
    <section id="beauty-discovery" className="py-24 md:py-32 bg-[#FAF7F2] border-t border-[#E8DEC2] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-[0.3em] uppercase text-[#8D7F77]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BFA37C]" />
            <span>INTERACTIVE BEAUTY DISCOVERY</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#1F1A18] tracking-tight font-normal">
            FIND YOUR VELORA
          </h2>
          <p className="font-serif italic text-xl sm:text-2xl text-[#6B5F57]">
            “What are you looking for today?”
          </p>
        </div>

        {/* Options Selector Strip */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14">
          {options.map((opt) => {
            const isSelected = selectedIntent === opt.id;
            return (
              <button
                key={opt.id}
                id={`quiz-option-${opt.id.toLowerCase().replace(' ', '-')}`}
                onClick={() => setSelectedIntent(opt.id)}
                className={`px-5 py-3 rounded-full text-xs font-mono uppercase tracking-[0.2em] transition-all duration-300 flex items-center space-x-2 shadow-sm ${
                  isSelected
                    ? 'bg-[#2B231F] text-[#FAF7F2] scale-105 shadow-[0_8px_20px_rgba(43,35,31,0.15)] ring-2 ring-[#BFA37C]/50'
                    : 'bg-[#F2EAE0] text-[#4A423D] hover:bg-[#EADBCE] hover:text-[#1F1A18]'
                }`}
              >
                <span>{opt.icon}</span>
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Recommendation Stage */}
        <div className="bg-[#F6EFE6] rounded-[32px] p-6 sm:p-10 border border-[#EADBCE] shadow-[0_16px_36px_rgba(43,35,31,0.06)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-[#DFCFC0] gap-4">
            <div>
              <div className="text-[10px] font-mono tracking-[0.25em] text-[#8D7F77] uppercase">
                TAILORED CURATION FOR YOU
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1F1A18] font-normal mt-1">
                Your Focus: <span className="italic text-[#8E7966]">{currentOption.label}</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#6B5F57] font-sans mt-0.5">
                {currentOption.tagline}
              </p>
            </div>

            <div className="text-xs font-mono text-[#8D7F77] flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5 text-[#BFA37C]" />
              <span>{recommendedProducts.length} TAILORED FORMULAS MATCHED</span>
            </div>
          </div>

          {/* Cards of Recommended Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {recommendedProducts.map((product) => (
              <div
                key={product.id}
                id={`quiz-product-${product.id}`}
                className="group bg-[#FAF7F2] rounded-[20px] p-4 border border-[#E8DDD0] flex flex-col justify-between transition-all duration-300 hover:shadow-md"
              >
                <div>
                  <div
                    onClick={() => onQuickView(product)}
                    className="aspect-[4/5] rounded-[16px] overflow-hidden bg-[#FAF7F2] relative cursor-pointer"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[#2B231F] text-white text-[9px] font-mono uppercase tracking-widest">
                      RECOMMENDED
                    </div>
                  </div>

                  <div className="pt-3">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#8D7F77]">
                      {product.category}
                    </div>
                    <h4
                      onClick={() => onQuickView(product)}
                      className="font-serif text-xl font-semibold text-[#1F1A18] hover:text-[#BFA37C] transition-colors mt-0.5 cursor-pointer leading-snug"
                    >
                      {product.name}
                    </h4>
                    <p className="text-xs text-[#7A6E67] font-serif italic line-clamp-1 mt-0.5">
                      {product.subtitle}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-2 border-t border-[#E8DDD0] flex items-center justify-between">
                  <span className="font-mono text-sm font-medium text-[#1F1A18]">
                    ${product.price} USD
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      id={`quiz-view-btn-${product.id}`}
                      onClick={() => onQuickView(product)}
                      className="px-3 py-1.5 rounded-full border border-[#D5C6B7] text-[#2B231F] text-[10px] font-mono uppercase tracking-widest hover:bg-[#2B231F] hover:text-white transition-colors"
                    >
                      DETAILS
                    </button>
                    <button
                      id={`quiz-add-btn-${product.id}`}
                      onClick={() => onAddToCart(product)}
                      className="p-2 rounded-full bg-[#2B231F] text-white hover:bg-[#BFA37C] transition-colors"
                      title="Add to bag"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
