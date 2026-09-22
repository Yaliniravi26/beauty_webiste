import { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, User, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onNavigate: (sectionId: string, categoryFilter?: string) => void;
}

export default function Navbar({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onNavigate
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'HOME', section: 'hero' },
    { label: 'SHOP', section: 'bestsellers' },
    { label: 'SKINCARE', section: 'bestsellers', category: 'Skincare' },
    { label: 'MAKEUP', section: 'makeup-editorial', category: 'Makeup' },
    { label: 'BODY', section: 'categories', category: 'Body' },
    { label: 'FRAGRANCE', section: 'categories', category: 'Fragrance' },
    { label: 'ABOUT', section: 'brand-story' },
  ];

  const handleLinkClick = (section: string, category?: string) => {
    setMobileMenuOpen(false);
    onNavigate(section, category);
  };

  return (
    <>
      <header
        id="velora-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 flex justify-center ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div
          className={`w-[94%] max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between transition-all duration-500 rounded-full ${
            isScrolled
              ? 'glass-panel shadow-[0_8px_32px_rgba(43,35,31,0.06)] py-3'
              : 'bg-[#FAF7F2]/80 backdrop-blur-md border border-[#EADBCE]/50 py-3.5'
          }`}
        >
          {/* Brand Logo */}
          <button
            id="nav-logo-btn"
            onClick={() => handleLinkClick('hero')}
            className="group flex flex-col text-left focus:outline-none"
          >
            <span className="font-display tracking-[0.28em] text-2xl md:text-[1.65rem] font-medium text-[#1F1A18] group-hover:text-[#BFA37C] transition-colors leading-none">
              VELORA
            </span>
            <span className="text-[8px] tracking-[0.3em] uppercase text-[#8D7F77] font-sans mt-0.5">
              BEAUTY • REFINED
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navItems.map((item) => (
              <button
                key={item.label}
                id={`nav-link-${item.label.toLowerCase()}`}
                onClick={() => handleLinkClick(item.section, item.category)}
                className="text-[11px] font-medium tracking-[0.22em] text-[#4A423D] hover:text-[#1F1A18] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#BFA37C] hover:after:w-full after:transition-all after:duration-300"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4 text-[#2B231F]">
            {/* Search */}
            <button
              id="nav-search-btn"
              onClick={onOpenSearch}
              className="p-2 hover:text-[#BFA37C] transition-colors rounded-full hover:bg-[#F3EAE1]"
              title="Search collection"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist */}
            <button
              id="nav-wishlist-btn"
              onClick={onOpenWishlist}
              className="p-2 hover:text-[#BFA37C] transition-colors relative rounded-full hover:bg-[#F3EAE1]"
              title="View Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#BFA37C] text-white text-[9px] font-mono flex items-center justify-center rounded-full leading-none">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              id="nav-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#2B231F] hover:bg-[#F3EAE1] rounded-full transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="fixed inset-0 z-30 bg-[#FAF7F2]/98 backdrop-blur-2xl flex flex-col justify-between pt-28 pb-10 px-8 lg:hidden animate-in fade-in duration-300"
        >
          <div className="space-y-6">
            <div className="text-[10px] tracking-[0.3em] uppercase text-[#8D7F77] border-b border-[#EADDD0] pb-2 font-mono">
              VELORA REFINED NAVIGATION
            </div>
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleLinkClick(item.section, item.category)}
                  className="text-left font-serif text-3xl text-[#2B231F] hover:text-[#BFA37C] transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-mono text-[#BFA37C]">→</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-[#EADDD0]">
            <div className="text-center text-[10px] tracking-[0.2em] text-[#8D7F77] uppercase font-sans">
              Complimentary Global Delivery On Orders Above $120
            </div>
          </div>
        </div>
      )}
    </>
  );
}
