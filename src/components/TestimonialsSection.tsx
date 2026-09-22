import { useState } from 'react';
import { TESTIMONIALS } from '../data/products';
import { Star, Sparkles, Quote, ArrowLeft, ArrowRight } from 'lucide-react';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <section id="testimonials" className="py-24 md:py-36 bg-[#F6ECE2] border-t border-[#E8DEC2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#DFCFC0] pb-10 mb-14 gap-6">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.3em] uppercase text-[#8D7F77] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BFA37C]" />
              <span>THE VELORA CIRCLE</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#1F1A18] tracking-tight font-normal">
              LOVED BY YOUR BEAUTY RITUAL
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#6E635D] max-w-md font-sans">
            Reflections from patrons who have embraced the quiet luxury of intentional beauty.
          </p>
        </div>

        {/* Editorial Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={t.id}
              id={`testimonial-card-${t.id}`}
              className="group bg-[#FAF7F2] rounded-[24px] p-6 sm:p-7 border border-[#EADBCE] shadow-[0_10px_25px_rgba(43,35,31,0.04)] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="space-y-4">
                {/* Rating & Quote Mark */}
                <div className="flex items-center justify-between">
                  <div className="flex text-[#BFA37C] space-x-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-[#E0D0C0]" />
                </div>

                {/* Review Text */}
                <p className="font-serif italic text-base sm:text-lg text-[#2B231F] leading-snug">
                  “{t.review}”
                </p>
              </div>

              {/* Author & Product Information */}
              <div className="pt-6 mt-4 border-t border-[#EADBCE]">
                <div className="font-display text-lg text-[#1F1A18] font-semibold">
                  {t.name}
                </div>
                <div className="text-[11px] text-[#8D7F77] font-mono">
                  {t.location} • {t.skinType}
                </div>
                <div className="text-[10px] text-[#BFA37C] font-mono uppercase tracking-wider mt-1">
                  Ritual: {t.productUsed}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Curatorial Guarantee Bar */}
        <div className="mt-14 p-6 sm:p-8 rounded-[24px] bg-[#FAF7F2] border border-[#EADBCE] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <span className="w-10 h-10 rounded-full bg-[#F3EAE1] flex items-center justify-center text-[#BFA37C]">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <div className="font-serif text-lg font-semibold text-[#1F1A18]">
                Velora 30-Day Experience Guarantee
              </div>
              <div className="text-xs text-[#6B5F57] font-sans">
                Experience every formulation in your personal lighting. Complimentary returns on all domestic orders.
              </div>
            </div>
          </div>
          <div className="text-xs font-mono tracking-widest uppercase text-[#2B231F] font-semibold">
            SATISFACTION RATE: 99.4%
          </div>
        </div>

      </div>
    </section>
  );
}
