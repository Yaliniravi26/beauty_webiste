import { useState } from 'react';
import { JOURNAL_ARTICLES } from '../data/products';
import { JournalArticle } from '../types';
import { ArrowRight, BookOpen, Clock, X } from 'lucide-react';
import { handleImageError } from '../data/images';

export default function JournalSection() {
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);

  return (
    <section id="journal" className="py-24 md:py-36 bg-[#FAF7F2] border-t border-[#E8DEC2] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#EADDD0] pb-10 mb-14 gap-6">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.3em] uppercase text-[#8D7F77] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BFA37C]" />
              <span>EDITORIAL PERSPECTIVES</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#1F1A18] tracking-tight font-normal">
              THE VELORA JOURNAL
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#6E635D] max-w-md font-sans">
            Essays on cellular vitality, the philosophy of slow cosmetic craft, and seasonal skin chronobiology.
          </p>
        </div>

        {/* Magazine Editorial Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {JOURNAL_ARTICLES.map((article) => (
            <div
              key={article.id}
              id={`journal-card-${article.id}`}
              onClick={() => setSelectedArticle(article)}
              className="group cursor-pointer flex flex-col justify-between space-y-4"
            >
              {/* Photo Frame */}
              <div className="relative aspect-[3/4] rounded-[24px] overflow-hidden bg-[#EDE3D8] border border-[#EADBCE] shadow-sm">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover block transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-[0.96]"
                  loading="lazy"
                  onError={(e) => handleImageError(e)}
                />
                <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md text-white text-[9px] font-mono tracking-widest uppercase px-3 py-1 rounded-full border border-white/10">
                  {article.category}
                </div>
                <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full glass-panel flex items-center justify-center text-[#2B231F] opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Editorial Headline & Metadata */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#8D7F77] uppercase tracking-wider">
                  <span>{article.date}</span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-[#BFA37C]" />
                    <span>{article.readTime}</span>
                  </span>
                </div>

                <h3 className="font-display text-2xl text-[#1F1A18] group-hover:text-[#BFA37C] transition-colors font-normal leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-[#6B5F57] font-sans line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="pt-1 text-[11px] font-mono uppercase tracking-widest text-[#BFA37C] flex items-center space-x-1">
                  <span>READ ESSAY</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Reader Modal */}
      {selectedArticle && (
        <div
          id="journal-reader-modal"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-[32px] p-8 sm:p-12 overflow-y-auto max-h-[90vh] shadow-2xl border border-[#EADBCE]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/80 hover:bg-[#2B231F] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#BFA37C]">
                {selectedArticle.category} • {selectedArticle.date} • {selectedArticle.readTime}
              </div>

              <h2 className="font-display text-4xl sm:text-5xl text-[#1F1A18] font-normal leading-tight">
                {selectedArticle.title}
              </h2>

              <div className="font-serif italic text-base text-[#8D7F77]">
                Words by {selectedArticle.author}
              </div>

              <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-sm">
                <img
                  src={selectedArticle.imageUrl}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover block"
                  onError={(e) => handleImageError(e)}
                />
              </div>

              <div className="space-y-4 text-sm text-[#4A423D] font-sans leading-relaxed">
                <p className="font-serif text-lg italic text-[#2B231F]">
                  “{selectedArticle.excerpt}”
                </p>
                <p>
                  In the sensory architecture of skincare, the tactile connection between the fingertips and the skin triggers an immediate parasympathetic response. When we rush through cosmetic application as though it were a mechanical chore, the nervous system remains in a heightened state of alert.
                </p>
                <p>
                  By contrast, pausing to warm cold-pressed botanical lipids between the palms and inhaling the unadulterated botanical notes allows cellular absorption to occur in tandem with vascular relaxation. The result is not merely aesthetic luminosity, but a profound sense of grounded well-being.
                </p>
              </div>

              <div className="pt-6 border-t border-[#E8DEC2] flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-2.5 rounded-full bg-[#2B231F] text-white text-xs font-mono uppercase tracking-widest cursor-pointer"
                >
                  CLOSE ESSAY
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
