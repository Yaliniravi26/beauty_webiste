import { Product } from '../types';
import { X, Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { handleImageError } from '../data/images';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onQuickView
}: WishlistDrawerProps) {
  if (!isOpen) return null;

  return (
    <div
      id="wishlist-drawer-overlay"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between border-l border-[#E8DEC2] animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#EADDD0] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-[#BFA37C] fill-current" />
            <h2 className="font-display text-2xl text-[#1F1A18] font-normal tracking-wide">
              YOUR WISHLIST
            </h2>
            <span className="text-xs font-mono text-[#8D7F77] bg-[#F2EAE0] px-2 py-0.5 rounded-full">
              ({wishlistProducts.length})
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#F2EAE0] text-[#5C534D] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="w-16 h-16 rounded-full bg-[#F3EAE1] flex items-center justify-center text-[#BFA37C]">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl text-[#1F1A18]">Your wishlist is empty</h3>
              <p className="text-xs text-[#7A6E67] font-sans max-w-xs leading-relaxed">
                Save your favorite formulations while exploring the collection for easy access to your personal beauty ritual.
              </p>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center space-x-4 p-3 rounded-2xl bg-white border border-[#EADBCE] shadow-sm"
              >
                <div
                  onClick={() => {
                    onQuickView(product);
                    onClose();
                  }}
                  className="w-16 h-20 rounded-xl overflow-hidden bg-[#FAF7F2] shrink-0 border border-[#EADDCE] cursor-pointer"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover block"
                    onError={(e) => handleImageError(e)}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-[9px] font-mono uppercase tracking-widest text-[#BFA37C]">
                    {product.category}
                  </div>
                  <h4
                    onClick={() => {
                      onQuickView(product);
                      onClose();
                    }}
                    className="font-serif text-base font-semibold text-[#1F1A18] truncate cursor-pointer hover:text-[#BFA37C]"
                  >
                    {product.name}
                  </h4>
                  <div className="text-xs font-mono text-[#5C534D] mt-0.5">
                    ${product.price} USD
                  </div>

                  <div className="flex items-center space-x-3 mt-2">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="px-3 py-1 rounded-full bg-[#2B231F] text-white text-[10px] font-mono uppercase tracking-wider hover:bg-[#BFA37C] transition-colors flex items-center space-x-1"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>ADD TO BAG</span>
                    </button>

                    <button
                      onClick={() => onRemoveFromWishlist(product)}
                      className="text-[#968981] hover:text-red-700 transition-colors p-1"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlistProducts.length > 0 && (
          <div className="p-6 bg-white border-t border-[#EADDD0]">
            <button
              onClick={() => {
                wishlistProducts.forEach((p) => onAddToCart(p));
              }}
              className="w-full py-4 rounded-full bg-[#2B231F] text-[#FAF7F2] font-mono text-xs uppercase tracking-[0.24em] font-medium hover:bg-[#BFA37C] transition-colors shadow-md"
            >
              MOVE ALL TO SHOPPING BAG
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
