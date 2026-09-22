import { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { Heart, Star, Eye, Sparkles } from 'lucide-react';
import { handleImageError } from '../data/images';

interface BestsellersSectionProps {
  onQuickView: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  initialCategoryFilter?: string;
}

export default function BestsellersSection({
  onQuickView,
  onToggleWishlist,
  wishlistIds,
  initialCategoryFilter = 'All'
}: BestsellersSectionProps) {
  const [selectedFilter, setSelectedFilter] = useState(initialCategoryFilter);

  const categories = ['All', 'Skincare', 'Makeup', 'Lip', 'Eyes', 'Fragrance', 'Body'];

  const filteredProducts = PRODUCTS.filter((product) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Makeup') {
      return product.category === 'Makeup' || product.category === 'Lip' || product.category === 'Eyes';
    }
    return product.category.toLowerCase() === selectedFilter.toLowerCase();
  });

  return (
    <section id="bestsellers" className="py-24 md:py-32 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#EADDD0] pb-10 gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.28em] uppercase text-[#8D7F77]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BFA37C]" />
              <span>THE COUTURE CURATION</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#1F1A18] tracking-tight font-normal">
              THE VELORA EDIT
            </h2>
            <p className="text-base sm:text-lg text-[#6E635D] max-w-xl font-serif italic">
              “Beauty essentials chosen for your everyday ritual.”
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`filter-pill-${cat.toLowerCase()}`}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-[0.16em] uppercase transition-all duration-300 ${
                  selectedFilter === cat
                    ? 'bg-[#2B231F] text-[#FAF7F2] shadow-sm'
                    : 'bg-[#F2EAE0] text-[#5C534D] hover:bg-[#EADBCE] hover:text-[#1F1A18]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);

            return (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className="group relative bg-[#F7F2EA] rounded-[24px] p-4 sm:p-5 border border-[#EADDCE] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(43,35,31,0.08)] flex flex-col justify-between"
              >
                {/* Product Image Stage */}
                <div className="relative aspect-[4/5] rounded-[18px] overflow-hidden bg-[#FAF7F2] border border-[#EADBCE] flex items-center justify-center cursor-pointer">
                  {/* Primary Image */}
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover block transition-opacity duration-700 ease-out group-hover:opacity-0"
                    loading="lazy"
                    onError={(e) => handleImageError(e)}
                    onClick={() => onQuickView(product)}
                  />

                  {/* Hover Second Angle Image */}
                  <img
                    src={product.hoverImageUrl}
                    alt={`${product.name} lifestyle angle`}
                    className="absolute inset-0 w-full h-full object-cover block opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out transform group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => handleImageError(e, product.imageUrl)}
                    onClick={() => onQuickView(product)}
                  />

                  {/* Corner Badges */}
                  <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5">
                    {product.isBestseller && (
                      <span className="px-2.5 py-1 rounded-full bg-[#2B231F] text-white text-[9px] font-mono tracking-widest uppercase shadow-sm">
                        ICON
                      </span>
                    )}
                    {product.isNew && (
                      <span className="px-2.5 py-1 rounded-full bg-[#BFA37C] text-white text-[9px] font-mono tracking-widest uppercase shadow-sm">
                        NEW
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    id={`wishlist-btn-${product.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product);
                    }}
                    className={`absolute top-3.5 right-3.5 p-2.5 rounded-full transition-all duration-300 shadow-sm ${
                      isWishlisted
                        ? 'bg-[#BFA37C] text-white'
                        : 'bg-white/80 backdrop-blur-md text-[#5C534D] hover:text-[#BFA37C] hover:bg-white'
                    }`}
                    title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                    aria-label="Toggle Wishlist"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>

                  {/* Quick View Button on Hover */}
                  <div className="absolute bottom-3.5 inset-x-3.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <button
                      id={`quick-view-btn-${product.id}`}
                      onClick={() => onQuickView(product)}
                      className="w-full py-2.5 rounded-xl bg-white/95 backdrop-blur-md text-[#2B231F] text-xs font-mono uppercase tracking-widest flex items-center justify-center space-x-1.5 hover:bg-white shadow-md transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#BFA37C]" />
                      <span>DETAILS</span>
                    </button>
                  </div>
                </div>

                {/* Product Metadata & Editorial Copy */}
                <div className="pt-4 flex flex-col justify-between flex-1">
                  <div>
                    {/* Category & Rating */}
                    <div className="flex items-center justify-between text-xs text-[#8D7F77] font-mono">
                      <span className="uppercase tracking-widest">{product.category}</span>
                      <div className="flex items-center space-x-1 text-[#BFA37C]">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-[11px] font-sans font-medium text-[#2B231F]">
                          {product.rating} ({product.reviewsCount})
                        </span>
                      </div>
                    </div>

                    {/* Product Name */}
                    <h3
                      onClick={() => onQuickView(product)}
                      className="font-serif text-xl sm:text-2xl font-semibold text-[#1F1A18] hover:text-[#BFA37C] transition-colors mt-1 leading-snug cursor-pointer"
                    >
                      {product.name}
                    </h3>

                    <p className="text-xs text-[#7A6E67] font-serif italic mt-0.5 line-clamp-1">
                      {product.subtitle}
                    </p>

                    <p className="text-xs text-[#635852] font-sans mt-2 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="pt-4 mt-2 border-t border-[#E8DDD0]">
                    <div>
                      <span className="text-lg font-mono font-medium text-[#1F1A18]">
                        ${product.price}
                      </span>
                      <span className="text-[10px] font-mono text-[#8D7F77] ml-1">USD</span>
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
