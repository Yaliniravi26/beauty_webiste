import { useState } from 'react';
import { CartItem } from '../types';
import { X, Check, ShieldCheck, ArrowRight } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  items,
  onOrderSuccess
}: CheckoutModalProps) {
  const [step, setStep] = useState<'shipping' | 'confirmation'>('shipping');
  const [formData, setFormData] = useState({
    name: 'Eleanor Vance',
    email: 'eleanor.vance@couture.com',
    address: '742 Evergreen Promenade, Suite 4B',
    city: 'San Francisco',
    postal: '94107',
    country: 'United States'
  });

  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirmation');
    setTimeout(() => {
      onOrderSuccess();
    }, 4500);
  };

  return (
    <div
      id="checkout-modal-overlay"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#FAF7F2] rounded-[32px] p-6 sm:p-10 shadow-2xl border border-[#E8DEC2] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#F2EAE0] text-[#5C534D] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'shipping' ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-b border-[#EADDD0] pb-4">
              <div className="text-[10px] font-mono tracking-[0.25em] text-[#BFA37C] uppercase">
                VELORA CONCIERGE CHECKOUT
              </div>
              <h2 className="font-display text-3xl text-[#1F1A18] font-normal mt-1">
                DELIVERY DETAILS
              </h2>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-[#7A6E67] mb-1">
                  FULL NAME
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D5C6B7] text-xs font-sans text-[#1F1A18] focus:outline-none focus:border-[#2B231F]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-[#7A6E67] mb-1">
                  EMAIL FOR ORDER TRACKING
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D5C6B7] text-xs font-sans text-[#1F1A18] focus:outline-none focus:border-[#2B231F]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-[#7A6E67] mb-1">
                  SHIPPING ADDRESS
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D5C6B7] text-xs font-sans text-[#1F1A18] focus:outline-none focus:border-[#2B231F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-[#7A6E67] mb-1">
                    CITY
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D5C6B7] text-xs font-sans text-[#1F1A18] focus:outline-none focus:border-[#2B231F]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-[#7A6E67] mb-1">
                    POSTAL CODE
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postal}
                    onChange={(e) => setFormData({ ...formData, postal: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D5C6B7] text-xs font-sans text-[#1F1A18] focus:outline-none focus:border-[#2B231F]"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F4ECE3] border border-[#EADBCE] flex items-center justify-between text-xs font-mono">
              <span className="text-[#5C534D]">TOTAL CHARGE ({items.length} items)</span>
              <span className="text-base font-semibold text-[#1F1A18]">${total.toFixed(2)} USD</span>
            </div>

            <button
              id="submit-order-btn"
              type="submit"
              className="w-full py-4 rounded-full bg-[#2B231F] text-white font-mono text-xs uppercase tracking-[0.24em] font-medium hover:bg-[#BFA37C] transition-colors shadow-md flex items-center justify-center space-x-2"
            >
              <span>COMPLETE RITUAL ORDER</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="text-center py-10 space-y-5 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-[#C5A880]/20 text-[#BFA37C] flex items-center justify-center mx-auto">
              <Check className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#BFA37C]">
                TRANSACTION CONFIRMED • #VB-89241
              </div>
              <h3 className="font-display text-4xl text-[#1F1A18] font-normal">
                THANK YOU, {formData.name.toUpperCase()}
              </h3>
              <p className="text-sm text-[#6B5F57] font-sans max-w-sm mx-auto leading-relaxed">
                Your Velora beauty parcel is being assembled in our climate-controlled botanical laboratory. A tracking confirmation will arrive shortly at {formData.email}.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-8 py-3 rounded-full bg-[#2B231F] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#BFA37C] transition-colors"
              >
                RETURN TO MAISON
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
