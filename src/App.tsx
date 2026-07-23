import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProductCard } from './components/ProductCard';
import { ProductQuickView } from './components/ProductQuickView';
import { RoomPlanner } from './components/RoomPlanner';
import { ShopTheRoom } from './components/ShopTheRoom';
import { SwatchKitBuilder } from './components/SwatchKitBuilder';
import { StylistBookingModal } from './components/StylistBookingModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CompareModal } from './components/CompareModal';
import { SearchBar } from './components/SearchBar';
import { CustomFurnitureStudio } from './components/CustomFurnitureStudio';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { TermsPolicyModal } from './components/TermsPolicyModal';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { ContactUsPage } from './components/ContactUsPage';
import { OurStoryPage } from './components/OurStoryPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsOfServicePage } from './components/TermsOfServicePage';

import { CategoryId, Product, CartItem, Swatch, FilterState } from './types';
import { PRODUCTS } from './data/products';

import heroImg from './assets/images/hero_living_room_1784804151279.jpg';
import { Sparkles, SlidersHorizontal, ArrowRight, ShieldCheck, Truck, Clock } from 'lucide-react';

export default function App() {
  // Navigation tab state
  const [activeTab, setActiveTab] = useState<
    'shop' | 'room-planner' | 'lookbook' | 'swatch-kit' | 'custom-furniture' | 'contact' | 'our-story' | 'privacy' | 'terms'
  >('shop');
  
  // Filter state
  const [filter, setFilter] = useState<FilterState>({
    category: 'all',
    priceRange: [10000, 300000],
    materials: [],
    colors: [],
    inStockOnly: false,
    sortBy: 'featured',
    searchQuery: '',
  });

  // Drawer / Modal states
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isStylistOpen, setIsStylistOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  // Cart, Wishlist, Compare states
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      selectedWoodFinish: PRODUCTS[0].availableWoodFinishes[0],
      selectedFabric: PRODUCTS[0].availableFabrics[0],
      quantity: 1,
      includeWhiteGlove: true,
    }
  ]);
  const [wishlist, setWishlist] = useState<Product[]>([PRODUCTS[1]]);
  const [compareList, setCompareList] = useState<Product[]>([PRODUCTS[0], PRODUCTS[1]]);

  // Cart actions
  const handleAddToCart = (
    product: Product,
    selectedWoodFinish?: Swatch,
    selectedFabric?: Swatch,
    includeWhiteGlove = true
  ) => {
    const existingIndex = cart.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.selectedWoodFinish?.id === selectedWoodFinish?.id &&
        item.selectedFabric?.id === selectedFabric?.id
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      setCart(updated);
    } else {
      setCart([
        ...cart,
        {
          product,
          selectedWoodFinish: selectedWoodFinish || product.availableWoodFinishes[0],
          selectedFabric: selectedFabric || product.availableFabrics[0],
          quantity: 1,
          includeWhiteGlove,
        },
      ]);
    }
    setIsCartOpen(true);
  };

  const handleAddMultipleToCart = (
    items: { product: Product; woodFinishId?: string; fabricId?: string }[]
  ) => {
    let newCart = [...cart];
    items.forEach(({ product, woodFinishId, fabricId }) => {
      const wood = product.availableWoodFinishes.find((w) => w.id === woodFinishId);
      const fabric = product.availableFabrics.find((f) => f.id === fabricId);
      newCart.push({
        product,
        selectedWoodFinish: wood || product.availableWoodFinishes[0],
        selectedFabric: fabric || product.availableFabrics[0],
        quantity: 1,
        includeWhiteGlove: true,
      });
    });
    setCart(newCart);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index: number, delta: number) => {
    const updated = [...cart];
    updated[index].quantity += delta;
    if (updated[index].quantity <= 0) {
      updated.splice(index, 1);
    }
    setCart(updated);
  };

  const handleRemoveCartItem = (index: number) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
  };

  // Wishlist actions
  const handleToggleWishlist = (product: Product) => {
    if (wishlist.some((p) => p.id === product.id)) {
      setWishlist(wishlist.filter((p) => p.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  // Compare actions
  const handleToggleCompare = (product: Product) => {
    if (compareList.some((p) => p.id === product.id)) {
      setCompareList(compareList.filter((p) => p.id !== product.id));
    } else {
      if (compareList.length < 4) {
        setCompareList([...compareList, product]);
      }
    }
  };

  // Filter products catalog
  const filteredProducts = PRODUCTS.filter((p) => {
    if (filter.category !== 'all' && p.category !== filter.category) return false;
    if (p.priceINR < filter.priceRange[0] || p.priceINR > filter.priceRange[1]) return false;
    if (filter.inStockOnly && !p.inStock) return false;
    return true;
  }).sort((a, b) => {
    if (filter.sortBy === 'price-asc') return a.priceINR - b.priceINR;
    if (filter.sortBy === 'price-desc') return b.priceINR - a.priceINR;
    if (filter.sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#2B2220] flex flex-col font-sans">
      {/* Sticky Navigation Bar */}
      <Navbar
        activeCategory={filter.category}
        onSelectCategory={(cat) => setFilter({ ...filter, category: cat })}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        wishlistCount={wishlist.length}
        compareCount={compareList.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenStylistModal={() => setIsStylistOpen(true)}
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        onOpenTerms={() => setIsTermsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Main Hero Banner (Shown when tab is 'shop') */}
        {activeTab === 'shop' && (
          <section className="relative bg-[#2B2220] text-[#FAF6F0] overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
              {/* Left Content */}
              <div className="lg:col-span-5 p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6 z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C17D3C]/20 border border-[#C17D3C]/40 text-[#C17D3C] text-xs font-bold uppercase tracking-widest">
                  <Sparkles size={14} />
                  <span>100% Solid Timber Guarantee</span>
                </div>

                <h1 className="font-serif-brand text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-tight">
                  Crafted For Living.
                </h1>

                <p className="text-xs sm:text-sm text-[#D8CEBD] leading-relaxed max-w-md">
                  Solid reclaimed teak timber, hand-carved in Rajasthan by master woodworkers with over 5 decades of artisan experience. Paired with stain-resistant terracottas, warm bouclé, and Belgian linens. Zero MDF or compressed wood. Designed for generations.
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveTab('custom-furniture')}
                    className="px-6 py-3.5 bg-[#C17D3C] hover:bg-[#9E5B23] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                  >
                    <span>Custom Furniture Studio</span>
                    <ArrowRight size={16} />
                  </button>

                  <button
                    onClick={() => setActiveTab('swatch-kit')}
                    className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-[#FAF6F0] border border-white/20 rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
                  >
                    Order Free Swatch Box
                  </button>
                </div>

                {/* Micro trust stats */}
                <div className="pt-6 border-t border-white/10 grid grid-cols-4 gap-3 text-[11px] text-[#D8CEBD]">
                  <div>
                    <strong className="block text-white font-bold text-sm">50+ Years</strong>
                    <span>Artisan Craft</span>
                  </div>
                  <div>
                    <strong className="block text-white font-bold text-sm">0% MDF</strong>
                    <span>100% Solid Timber</span>
                  </div>
                  <div>
                    <strong className="block text-white font-bold text-sm">10-Year</strong>
                    <span>Frame Guarantee</span>
                  </div>
                  <div>
                    <strong className="block text-white font-bold text-sm">Direct</strong>
                    <span>Workshop</span>
                  </div>
                </div>
              </div>

              {/* Right Hero Image */}
              <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-full">
                <img
                  src={heroImg}
                  alt="The Ochre Lifestyle Editorial Furniture"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#2B2220] via-transparent to-transparent lg:block hidden" />
              </div>
            </div>
          </section>
        )}

        {/* Tab Route Switching */}
        {activeTab === 'custom-furniture' && (
          <CustomFurnitureStudio onOpenStylist={() => setIsStylistOpen(true)} />
        )}

        {activeTab === 'room-planner' && (
          <RoomPlanner onAddMultipleToCart={handleAddMultipleToCart} />
        )}

        {activeTab === 'lookbook' && (
          <ShopTheRoom
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={handleAddToCart}
          />
        )}

        {activeTab === 'swatch-kit' && <SwatchKitBuilder />}

        {activeTab === 'contact' && (
          <ContactUsPage
            onOpenStylistModal={() => setIsStylistOpen(true)}
            onSelectTab={setActiveTab}
          />
        )}

        {activeTab === 'our-story' && (
          <OurStoryPage
            onSelectTab={setActiveTab}
            onOpenStylistModal={() => setIsStylistOpen(true)}
          />
        )}

        {activeTab === 'privacy' && <PrivacyPolicyPage />}

        {activeTab === 'terms' && <TermsOfServicePage />}

        {/* Primary Shop Catalog View */}
        {activeTab === 'shop' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
            {/* Filter and Category Title Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E6DDD0] pb-6">
              <div>
                <h2 className="font-serif-brand text-2xl sm:text-3xl font-medium text-[#2B2220] capitalize">
                  {filter.category === 'all' ? 'All Furniture Collections' : `${filter.category} Collection`}
                </h2>
                <p className="text-xs text-[#6B5B54] mt-0.5">
                  Showing {filteredProducts.length} handcrafted pieces in competitive Indian Rupee (INR) pricing
                </p>
              </div>

              {/* Sorting and Quick Controls */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 bg-white border border-[#E6DDD0] rounded-lg px-3 py-1.5 text-xs">
                  <SlidersHorizontal size={14} className="text-[#C17D3C]" />
                  <span className="text-[#6B5B54] font-medium">Sort by:</span>
                  <select
                    value={filter.sortBy}
                    onChange={(e) => setFilter({ ...filter, sortBy: e.target.value as any })}
                    className="bg-transparent font-bold text-[#2B2220] focus:outline-none cursor-pointer"
                  >
                    <option value="featured">Featured Picks</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>

                <label className="flex items-center gap-2 bg-white border border-[#E6DDD0] rounded-lg px-3 py-1.5 text-xs text-[#2B2220] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filter.inStockOnly}
                    onChange={(e) => setFilter({ ...filter, inStockOnly: e.target.checked })}
                    className="accent-[#C17D3C]"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>
            </div>

            {/* Product Catalog Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  isWishlisted={wishlist.some((w) => w.id === product.id)}
                  onToggleCompare={handleToggleCompare}
                  isCompared={compareList.some((c) => c.id === product.id)}
                />
              ))}
            </div>

            {/* Interactive Section Showcase Cards */}
            <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 3D Room Planner Callout */}
              <div
                onClick={() => setActiveTab('room-planner')}
                className="p-8 bg-[#2B2220] text-white rounded-2xl border border-[#423430] hover:border-[#C17D3C] transition-all cursor-pointer group space-y-4 relative overflow-hidden"
              >
                <div className="w-10 h-10 bg-[#C17D3C] rounded-xl flex items-center justify-center text-white">
                  <Sparkles size={20} />
                </div>
                <h3 className="font-serif-brand text-2xl font-medium">3D Room Stager</h3>
                <p className="text-xs text-[#D8CEBD] leading-relaxed">
                  Drag and drop living or dining items onto floorplan grids to check clearance and calculate full room pricing in INR.
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C17D3C] group-hover:translate-x-1 transition-transform">
                  <span>Start Staging Room</span>
                  <ArrowRight size={14} />
                </div>
              </div>

              {/* Lookbook Callout */}
              <div
                onClick={() => setActiveTab('lookbook')}
                className="p-8 bg-white text-[#2B2220] rounded-2xl border border-[#E6DDD0] hover:border-[#C17D3C] transition-all cursor-pointer group space-y-4 relative overflow-hidden shadow-sm"
              >
                <div className="w-10 h-10 bg-[#FAF6F0] rounded-xl flex items-center justify-center text-[#C17D3C] border border-[#E6DDD0]">
                  <Sparkles size={20} />
                </div>
                <h3 className="font-serif-brand text-2xl font-medium">Shop The Lookbook</h3>
                <p className="text-xs text-[#6B5B54] leading-relaxed">
                  Explore curated residential living scenes with interactive hotspot pins to add full sets directly to your bag.
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C17D3C] group-hover:translate-x-1 transition-transform">
                  <span>View Lookbook Scene</span>
                  <ArrowRight size={14} />
                </div>
              </div>

              {/* Free Swatch Kit Callout */}
              <div
                onClick={() => setActiveTab('swatch-kit')}
                className="p-8 bg-[#FAF6F0] text-[#2B2220] rounded-2xl border border-[#E6DDD0] hover:border-[#C17D3C] transition-all cursor-pointer group space-y-4 relative overflow-hidden shadow-sm"
              >
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#C17D3C] border border-[#E6DDD0]">
                  <Sparkles size={20} />
                </div>
                <h3 className="font-serif-brand text-2xl font-medium">Free Swatch Box</h3>
                <p className="text-xs text-[#6B5B54] leading-relaxed">
                  Select up to 5 wood stains and stain-resistant velvet fabric swatches delivered free to your home in India.
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C17D3C] group-hover:translate-x-1 transition-transform">
                  <span>Order Sample Kit</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenStylist={() => setIsStylistOpen(true)}
        onOpenSwatchKit={() => setActiveTab('swatch-kit')}
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        onOpenTerms={() => setIsTermsOpen(true)}
        onOpenCustomFurniture={() => setActiveTab('custom-furniture')}
        onOpenOurStory={() => setActiveTab('our-story')}
        onOpenContact={() => setActiveTab('contact')}
        onOpenPrivacy={() => setActiveTab('privacy')}
        onOpenTermsOfService={() => setActiveTab('terms')}
      />

      {/* Modals & Slide-over Drawers */}
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenSwatchKit={() => setActiveTab('swatch-kit')}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={wishlist.some((w) => w.id === quickViewProduct?.id)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCart([])}
        onOpenStylist={() => setIsStylistOpen(true)}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        comparedProducts={compareList}
        onRemoveCompare={handleToggleCompare}
        onAddToCart={handleAddToCart}
      />

      <SearchBar
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      <StylistBookingModal
        isOpen={isStylistOpen}
        onClose={() => setIsStylistOpen(false)}
      />

      <OrderTrackingModal
        isOpen={isTrackOrderOpen}
        onClose={() => setIsTrackOrderOpen(false)}
      />

      <TermsPolicyModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />

      <CookieConsentBanner
        onOpenPreferences={() => setIsTermsOpen(true)}
      />
    </div>
  );
}
