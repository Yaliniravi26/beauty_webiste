import { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles, Check } from 'lucide-react';
import { handleImageError } from '../data/images';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 120;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const discount = discountApplied ? subtotal * 0.15 : 0;
  const finalTotal = Math.max(0, subtotal - discount);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'VELORA15' || promoCode.trim().toUpperCase() === 'GLOW') {
      setDiscountApplied(true);
    }
  };

  return (
    <div
      id="cart-drawer-overlay"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between border-l border-[#E8DEC2] animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#EADDD0] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-[#2B231F]" />
            <h2 className="font-display text-2xl text-[#1F1A18] font-normal tracking-wide">
              SHOPPING BAG
            </h2>
            <span className="text-xs font-mono text-[#8D7F77] bg-[#F2EAE0] px-2 py-0.5 rounded-full">
              ({items.reduce((sum, item) => sum + item.quantity, 0)})
            </span>
          </div>

          <button
            id="close-cart-btn"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#F2EAE0] text-[#5C534D] transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#F4ECE3] px-6 py-3.5 border-b border-[#EADDD0]">
          <div className="flex items-center justify-between text-xs font-mono text-[#2B231F] mb-1.5">
            <span>
              {remainingForFreeShipping > 0
                ? `Add $${remainingForFreeShipping.toFixed(2)} for complimentary shipping`
                : '✓ You have unlocked complimentary global delivery'}
            </span>
            <span className="text-[10px] text-[#8D7F77]">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full bg-[#EADBCE] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#BFA37C] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="w-16 h-16 rounded-full bg-[#F3EAE1] flex items-center justify-center text-[#BFA37C]">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl text-[#1F1A18]">Your bag is currently empty</h3>
              <p className="text-xs text-[#7A6E67] font-sans max-w-xs leading-relaxed">
                Discover the couture formulations chosen in The Velora Edit to begin your beauty ritual.
              </p>
              <button
                id="empty-cart-shop-now"
                onClick={onClose}
                className="mt-2 px-6 py-3 rounded-full bg-[#2B231F] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#BFA37C] transition-colors"
              >
                EXPLORE EDIT
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center space-x-4 p-3 rounded-2xl bg-white border border-[#EADBCE] shadow-sm"
              >
                <div className="w-16 h-20 rounded-xl overflow-hidden bg-[#FAF7F2] shrink-0 border border-[#EADDCE]">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-full h-full object-cover block"
                    onError={(e) => handleImageError(e)}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-[9px] font-mono uppercase tracking-widest text-[#BFA37C]">
                    {item.product.category}
                  </div>
                  <h4 className="font-serif text-base font-semibold text-[#1F1A18] truncate">
                    {item.product.name}
                  </h4>
                  <div className="text-xs font-mono text-[#5C534D] mt-0.5">
                    ${item.product.price} USD
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center space-x-3 mt-2">
                    <div className="flex items-center border border-[#D5C6B7] rounded-full px-2 py-0.5 bg-[#FAF7F2]">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="text-xs text-[#5C534D] hover:text-black px-1.5"
                      >
                        -
                      </button>
                      <span className="text-xs font-mono px-2 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="text-xs text-[#5C534D] hover:text-black px-1.5"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-[#968981] hover:text-red-700 transition-colors p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-mono text-sm font-semibold text-[#1F1A18]">
                    ${item.product.price * item.quantity}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-[#EADDD0] space-y-4">
            {/* Promo Code Input */}
            <form onSubmit={applyPromo} className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="PROMO CODE (TRY: GLOW)"
                className="px-3 py-2 bg-[#FAF7F2] border border-[#D5C6B7] rounded-xl text-xs font-mono uppercase text-[#2B231F] flex-1 focus:outline-none focus:border-[#2B231F]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#2B231F] text-white rounded-xl text-xs font-mono uppercase tracking-widest hover:bg-[#BFA37C] transition-colors"
              >
                APPLY
              </button>
            </form>

            {discountApplied && (
              <div className="flex justify-between text-xs text-emerald-800 font-mono">
                <span>15% VELORA RITUAL PRIVILEGE</span>
                <span>-${discount.toFixed(2)} USD</span>
              </div>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-[#7A6E67] font-mono">
              <div className="flex justify-between">
                <span>SUBTOTAL</span>
                <span className="text-[#1F1A18] font-medium">${subtotal.toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between">
                <span>DELIVERY</span>
                <span>{remainingForFreeShipping === 0 ? 'COMPLIMENTARY' : '$12.00 USD'}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#1F1A18] pt-2 border-t border-[#EADDD0]">
                <span>ESTIMATED TOTAL</span>
                <span className="font-mono text-base">${finalTotal.toFixed(2)} USD</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              id="cart-checkout-btn"
              onClick={onCheckout}
              className="w-full py-4 rounded-full bg-[#2B231F] text-[#FAF7F2] font-mono text-xs uppercase tracking-[0.24em] font-medium hover:bg-[#BFA37C] transition-all duration-300 shadow-md flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>PROCEED TO SECURE CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center space-x-2 text-[10px] font-mono text-[#8D7F77] uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-[#BFA37C]" />
              <span>ENCRYPTED 256-BIT TRANSACTIONS • CARBON NEUTRAL</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
