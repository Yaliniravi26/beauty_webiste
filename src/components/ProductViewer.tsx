import { useState, useEffect } from 'react';
import { Product } from '../types';
import { X, Star, Heart, ShieldCheck, Sparkles, Droplets, ArrowRight } from 'lucide-react';
import { handleImageError } from '../data/images';

interface ProductViewerProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, shade?: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export default function ProductViewer({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted
}: ProductViewerProps) {
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'howToUse'>('benefits');
  const [currentImage, setCurrentImage] = useState(product.imageUrl);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      id="product-detail-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#FAF7F2] rounded-[32px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-[#E8DEC2] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Button */}
        <button
          id="product-modal-close"
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2.5 rounded-full bg-white/80 hover:bg-[#2B231F] hover:text-white transition-colors shadow-sm text-[#2B231F]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
          
          {/* Left Column: Large Product Imagery & Angles */}
          <div className="lg:col-span-6 bg-[#F3EAE1] p-6 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E8DDD0]">
            
            {/* Active Hero Image Frame with 3D Float */}
            <div className="relative aspect-square rounded-[24px] overflow-hidden bg-white shadow-md border border-[#EADDCE]">
              <img
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-cover block transition-all duration-500 transform hover:scale-105"
                onError={(e) => handleImageError(e, product.imageUrl)}
              />
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                <span className="px-3 py-1 rounded-full bg-[#2B231F] text-white text-[9px] font-mono tracking-widest uppercase">
                  {product.category}
                </span>
                {product.isBestseller && (
                  <span className="px-3 py-1 rounded-full bg-[#BFA37C] text-white text-[9px] font-mono tracking-widest uppercase">
                    ICONIC FORMULA
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Switcher & 3D Interactive Tag */}
            <div className="pt-6 flex items-center justify-between">
              <div className="flex space-x-3">
                <button
                  onClick={() => setCurrentImage(product.imageUrl)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    currentImage === product.imageUrl ? 'border-[#2B231F] scale-105' : 'border-transparent opacity-70'
                  }`}
                >
                  <img
                    src={product.imageUrl}
                    alt="Front View"
                    className="w-full h-full object-cover block"
                    onError={(e) => handleImageError(e)}
                  />
                </button>
                <button
                  onClick={() => setCurrentImage(product.hoverImageUrl)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    currentImage === product.hoverImageUrl ? 'border-[#2B231F] scale-105' : 'border-transparent opacity-70'
                  }`}
                >
                  <img
                    src={product.hoverImageUrl}
                    alt="Lifestyle Angle"
                    className="w-full h-full object-cover block"
                    onError={(e) => handleImageError(e, product.imageUrl)}
                  />
                </button>
              </div>

              <div className="text-[10px] font-mono text-[#8D7F77] uppercase tracking-wider flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#BFA37C]" />
                <span>VOLUME: {product.volume}</span>
              </div>
            </div>

          </div>

            {/* Right Column: Editorial Specifications and Ingredients */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              
              {/* Category, Rating & Wishlist */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-mono text-[#8D7F77]">
                  <span className="uppercase tracking-widest">{product.concern} FOCUS</span>
                  <span>•</span>
                  <div className="flex items-center text-[#BFA37C]">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-[#2B231F] ml-1 font-medium">{product.rating}</span>
                    <span className="text-[#8D7F77] ml-0.5">({product.reviewsCount} reviews)</span>
                  </div>
                </div>

                <button
                  id="modal-wishlist-toggle"
                  onClick={() => onToggleWishlist(product)}
                  className={`p-2 rounded-full border transition-colors ${
                    isWishlisted
                      ? 'border-[#BFA37C] bg-[#BFA37C] text-white'
                      : 'border-[#D5C6B7] text-[#5C534D] hover:text-[#BFA37C]'
                  }`}
                  title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h2 className="font-display text-3xl sm:text-4xl text-[#1F1A18] font-normal leading-tight">
                  {product.name}
                </h2>
                <div className="font-serif italic text-base sm:text-lg text-[#8E7966] mt-1">
                  {product.subtitle}
                </div>
              </div>

              {/* Price & Shade */}
              <div className="flex items-baseline space-x-3 pt-1 border-b border-[#EADDD0] pb-4">
                <span className="font-mono text-3xl font-medium text-[#1F1A18]">
                  ${product.price}
                </span>
                <span className="text-xs font-mono text-[#8D7F77]">USD (Taxes Included)</span>
                {product.shade && (
                  <span className="ml-auto text-xs font-sans text-[#2B231F] bg-[#F0E6DC] px-3 py-1 rounded-full font-medium">
                    {product.shade}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#5C534D] font-sans leading-relaxed">
                {product.description}
              </p>

              {/* Tabs: Benefits / Ingredients / How To Use */}
              <div className="pt-2">
                <div className="flex border-b border-[#EADDD0] space-x-6 text-xs font-mono tracking-widest uppercase">
                  {(['benefits', 'ingredients', 'howToUse'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-2 transition-all relative ${
                        activeTab === tab
                          ? 'text-[#1F1A18] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#BFA37C]'
                          : 'text-[#8D7F77] hover:text-[#1F1A18]'
                      }`}
                    >
                      {tab === 'benefits' ? 'BENEFITS' : tab === 'ingredients' ? 'INGREDIENTS' : 'HOW TO USE'}
                    </button>
                  ))}
                </div>

                <div className="pt-3 min-h-[100px]">
                  {activeTab === 'benefits' && (
                    <ul className="space-y-1.5 text-xs text-[#5C534D]">
                      {product.benefits.map((b, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <Check className="w-3.5 h-3.5 text-[#BFA37C] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeTab === 'ingredients' && (
                    <p className="text-xs text-[#5C534D] leading-relaxed font-sans">
                      {product.ingredients}
                    </p>
                  )}

                  {activeTab === 'howToUse' && (
                    <p className="text-xs text-[#5C534D] leading-relaxed font-sans">
                      {product.howToUse}
                    </p>
                  )}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
