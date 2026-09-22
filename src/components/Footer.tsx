import { useState } from 'react';
import { ArrowUp, ArrowRight, Instagram, Twitter, Youtube, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string, categoryFilter?: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="velora-footer" className="bg-[#1C1715] text-[#FAF7F2] pt-24 pb-12 border-t border-[#312520]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Newsletter & Brand Statement Plaque */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 border-b border-white/10 items-start">
          
          <div className="lg:col-span-6 space-y-4">
            <span className="font-display tracking-[0.3em] text-4xl sm:text-5xl font-medium text-[#FAF7F2] block">
              VELORA
            </span>
            <div className="font-serif italic text-2xl sm:text-3xl text-[#C5A880]">
              “Beauty, refined.”
            </div>
            <p className="text-sm text-[#A3968C] font-sans max-w-md leading-relaxed pt-1">
              An independent luxury beauty maison established in 2026. Merging clinical cellular botanicals with fashion-forward editorial color.
            </p>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-6 bg-[#251E1B] p-8 rounded-3xl border border-white/10 space-y-4">
            <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A880]">
              MAISON INVITATION
            </div>
            <h3 className="font-display text-2xl sm:text-3xl text-white font-normal">
              JOIN THE VELORA WORLD
            </h3>
            <p className="text-xs text-[#B5A89E] font-sans">
              Receive beauty stories, new launches and private offers directly to your inbox.
            </p>

            {subscribed ? (
              <div className="py-3 px-4 rounded-xl bg-[#2E2522] border border-[#C5A880]/50 text-xs font-mono text-[#C5A880] flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#C5A880]" />
                <span>WELCOME TO VELORA. CHECK YOUR INBOX FOR YOUR PRIVATE OFFER.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 pt-1">
                <input
                  id="newsletter-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="px-4 py-3 bg-[#1C1715] border border-white/20 rounded-full text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#C5A880] flex-1 font-sans"
                />
                <button
                  id="newsletter-submit-btn"
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[#C5A880] text-[#1C1715] font-mono text-xs uppercase tracking-widest font-semibold hover:bg-[#DBC19D] transition-colors cursor-pointer"
                >
                  JOIN
                </button>
              </form>
            )}
          </div>

        </div>

        {/* 3 Nav Columns + About */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 gap-10 border-b border-white/10 text-xs font-sans">
          
          {/* Col 1: SHOP */}
          <div className="space-y-4">
            <div className="text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase">
              SHOP
            </div>
            <ul className="space-y-2.5 text-[#B5A89E]">
              <li>
                <button onClick={() => onNavigate('bestsellers', 'Skincare')} className="hover:text-white transition-colors">
                  SKINCARE
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('makeup-editorial', 'Makeup')} className="hover:text-white transition-colors">
                  MAKEUP
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('categories', 'Body')} className="hover:text-white transition-colors">
                  BODY CARE
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('categories', 'Fragrance')} className="hover:text-white transition-colors">
                  FRAGRANCE
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: ABOUT */}
          <div className="space-y-4">
            <div className="text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase">
              ABOUT
            </div>
            <ul className="space-y-2.5 text-[#B5A89E]">
              <li>
                <button onClick={() => onNavigate('brand-story')} className="hover:text-white transition-colors">
                  OUR STORY
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('journal')} className="hover:text-white transition-colors">
                  JOURNAL
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('testimonials')} className="hover:text-white transition-colors">
                  PATRON REVIEWS
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('daily-ritual')} className="hover:text-white transition-colors">
                  THE DAILY RITUAL
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: HELP */}
          <div className="space-y-4">
            <div className="text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase">
              HELP
            </div>
            <ul className="space-y-2.5 text-[#B5A89E]">
              <li><span className="cursor-pointer hover:text-white">SHIPPING & COMPLIMENTARY DELIVERY</span></li>
              <li><span className="cursor-pointer hover:text-white">30-DAY RETURNS</span></li>
              <li><span className="cursor-pointer hover:text-white">PRIVACY POLICY</span></li>
              <li><span className="cursor-pointer hover:text-white">TERMS OF SERVICE</span></li>
            </ul>
          </div>

          {/* Col 4: SOCIALS */}
          <div className="space-y-4">
            <div className="text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase">
              CONNECT
            </div>
            <div className="flex items-center space-x-3 text-[#B5A89E]">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-[#C5A880] hover:text-[#1C1715] transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-[#C5A880] hover:text-[#1C1715] transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-[#C5A880] hover:text-[#1C1715] transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
            <div className="text-[11px] font-mono text-[#8D7F77] pt-2">
              CLIENT CONCIERGE: CONCIERGE@VELORABEAUTY.COM
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#80756D] font-mono gap-4">
          <div>
            © 2026 VELORA BEAUTY. ALL RIGHTS RESERVED.
          </div>

          <button
            id="footer-scroll-top-btn"
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-[#C5A880] hover:text-white transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
