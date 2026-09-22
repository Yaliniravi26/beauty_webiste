/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategorySection from './components/CategorySection';
import BestsellersSection from './components/BestsellersSection';
import SignatureProductSection from './components/SignatureProductSection';
import ShopByConcern from './components/ShopByConcern';
import MakeupEditorial from './components/MakeupEditorial';
import BeautyQuiz from './components/BeautyQuiz';
import DailyRitualSection from './components/DailyRitualSection';
import BrandStorySection from './components/BrandStorySection';
import TestimonialsSection from './components/TestimonialsSection';
import JournalSection from './components/JournalSection';
import Footer from './components/Footer';
import ProductViewer from './components/ProductViewer';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import SearchModal from './components/SearchModal';
import CheckoutModal from './components/CheckoutModal';

export default function App() {
  // State Management
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 1 }, // Velvet Glow Serum in initial cart
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([PRODUCTS[2].id]); // Nude Silk Lip Color
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Drawers & Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Category filter state for bestsellers
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1, shade?: string) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, shade: shade || product.shade }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleOrderSuccess = () => {
    setCartItems([]);
    setIsCheckoutOpen(false);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  // Navigation helper
  const handleNavigate = (sectionId: string, category?: string) => {
    if (category) {
      setCategoryFilter(category);
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectConcern = (concernId: string) => {
    const matched = PRODUCTS.find((p) => p.concern.toUpperCase() === concernId.toUpperCase());
    if (matched) {
      setSelectedProduct(matched);
    } else {
      handleNavigate('bestsellers');
    }
  };

  const handleQuickViewFormula = (formulaName: string) => {
    const matched = PRODUCTS.find((p) => p.name.toLowerCase().includes(formulaName.toLowerCase()));
    if (matched) {
      setSelectedProduct(matched);
    }
  };

  // Wishlist products
  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#221F1E] relative selection:bg-[#2B231F] selection:text-[#FAF7F2]">
      {/* Floating Category Navigation */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigate={handleNavigate}
      />

      <main>
        {/* Editorial Split-Screen Hero */}
        <Hero
          onShopCollection={() => handleNavigate('bestsellers')}
          onExploreBeauty={() => handleNavigate('categories')}
          onQuickViewProduct={(p) => setSelectedProduct(p)}
          featuredProduct={PRODUCTS[0]}
        />

        {/* Horizontal Scrolling Beauty Category Section */}
        <CategorySection
          onSelectCategory={(categoryName) => handleNavigate('bestsellers', categoryName)}
        />

        {/* The Velora Edit (Bestsellers Section) */}
        <BestsellersSection
          onQuickView={(p) => setSelectedProduct(p)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          initialCategoryFilter={categoryFilter}
        />

        {/* Signature Hero Product Experience (3D Velora Glow Serum in Dark Espresso) */}
        <SignatureProductSection
          product={PRODUCTS[0]}
          onAddToCart={handleAddToCart}
          onQuickView={(p) => setSelectedProduct(p)}
        />

        {/* Shop By Concern (Dynamic Expanding Cards) */}
        <ShopByConcern
          onSelectConcern={handleSelectConcern}
        />

        {/* Makeup Editorial Section (Color Your Moment) */}
        <MakeupEditorial
          onShopMakeup={() => handleNavigate('bestsellers', 'Makeup')}
          onQuickView={(p) => setSelectedProduct(p)}
          makeupProducts={PRODUCTS.filter((p) => ['Lip', 'Makeup', 'Eyes'].includes(p.category))}
        />

        {/* Interactive Beauty Discovery (Find Your Velora) */}
        <BeautyQuiz
          onQuickView={(p) => setSelectedProduct(p)}
          onAddToCart={handleAddToCart}
        />

        {/* The Daily Ritual Protocol (4 Steps) */}
        <DailyRitualSection
          onQuickViewProduct={handleQuickViewFormula}
        />

        {/* Brand Story (Beauty Without Excess) */}
        <BrandStorySection
          onExploreCollection={() => handleNavigate('bestsellers')}
        />

        {/* Customer Love (Patron Testimonials) */}
        <TestimonialsSection />

        {/* The Velora Journal (Fashion Magazine Articles) */}
        <JournalSection />
      </main>

      {/* Premium Luxury Footer */}
      <Footer
        onNavigate={handleNavigate}
      />

      {/* Full-Screen Product Detail Modal */}
      {selectedProduct && (
        <ProductViewer
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={wishlistIds.includes(selectedProduct.id)}
        />
      )}

      {/* Slide-out Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onQuickView={(p) => setSelectedProduct(p)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Luxury Concierge Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={handleOrderSuccess}
      />
    </div>
  );
}
