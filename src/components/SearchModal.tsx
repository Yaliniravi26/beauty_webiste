import { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { Search, X, ArrowRight, Star } from 'lucide-react';
import { handleImageError } from '../data/images';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export default function SearchModal({ isOpen, onClose, onSelectProduct }: SearchModalProps) {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return PRODUCTS.slice(0, 4);
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.concern.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div
      id="search-modal"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-start justify-center pt-20 px-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#FAF7F2] rounded-[32px] p-6 sm:p-8 shadow-2xl border border-[#E8DEC2] space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#EADDD0]">
          <div className="flex items-center space-x-3 flex-1">
            <Search className="w-5 h-5 text-[#8D7F77]" />
            <input
              id="search-collection-input"
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by formula, category, or concern (e.g. serum, glow, lip)..."
              className="w-full bg-transparent text-base sm:text-lg font-serif text-[#1F1A18] placeholder-[#9E9088] focus:outline-none"
            />
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#F2EAE0] text-[#5C534D] transition-colors ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex items-center space-x-2 text-xs font-mono text-[#8D7F77]">
          <span>POPULAR:</span>
          {['Glow Serum', 'Lumière Cream', 'Nude Silk', 'Mascara'].map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="px-2.5 py-1 rounded-full bg-[#F3EBE1] hover:bg-[#2B231F] hover:text-white transition-colors"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
          {searchResults.length === 0 ? (
            <div className="text-center py-8 text-sm text-[#7A6E67] font-serif italic">
              No formulas matched your search. Try "serum", "glow", or "lip".
            </div>
          ) : (
            searchResults.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="group flex items-center justify-between p-3 rounded-2xl hover:bg-[#F3EAE1] transition-colors cursor-pointer border border-transparent hover:border-[#EADBCE]"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-14 rounded-xl overflow-hidden bg-white border border-[#EADBCE]">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover block"
                      onError={(e) => handleImageError(e)}
                    />
                  </div>
                  <div>
                    <div className="text-[9px] font-mono uppercase tracking-widest text-[#BFA37C]">
                      {product.category} • {product.concern}
                    </div>
                    <div className="font-serif text-base font-semibold text-[#1F1A18] group-hover:text-[#BFA37C] transition-colors">
                      {product.name}
                    </div>
                    <div className="text-xs font-mono text-[#7A6E67]">
                      ${product.price} USD • ★ {product.rating}
                    </div>
                  </div>
                </div>

                <div className="p-2 rounded-full text-[#8D7F77] group-hover:text-[#1F1A18] group-hover:translate-x-1 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
