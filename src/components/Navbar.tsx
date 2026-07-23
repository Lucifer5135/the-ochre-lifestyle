import React, { useState } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  Layers,
  Sparkles,
  PhoneCall,
  Menu,
  X,
  MapPin,
  ChevronRight,
  Truck
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { CategoryId } from '../types';

interface NavbarProps {
  activeCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  activeTab: 'shop' | 'room-planner' | 'lookbook' | 'swatch-kit' | 'custom-furniture' | 'contact' | 'our-story' | 'privacy' | 'terms';
  onSelectTab: (tab: 'shop' | 'room-planner' | 'lookbook' | 'swatch-kit' | 'custom-furniture' | 'contact' | 'our-story' | 'privacy' | 'terms') => void;
  cartCount: number;
  wishlistCount: number;
  compareCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenCompare: () => void;
  onOpenSearch: () => void;
  onOpenStylistModal: () => void;
  onOpenTrackOrder: () => void;
  onOpenTerms: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  activeTab,
  onSelectTab,
  cartCount,
  wishlistCount,
  compareCount,
  onOpenCart,
  onOpenWishlist,
  onOpenCompare,
  onOpenSearch,
  onOpenStylistModal,
  onOpenTrackOrder,
  onOpenTerms,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories: { id: CategoryId; label: string }[] = [
    { id: 'all', label: 'Shop All' },
    { id: 'living', label: 'Living Room' },
    { id: 'dining', label: 'Dining & Kitchen' },
    { id: 'bedroom', label: 'Bedroom' },
    { id: 'office', label: 'Study & Office' },
    { id: 'outdoor', label: 'Outdoor' },
    { id: 'lighting-rugs', label: 'Lighting & Rugs' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6F0] border-b border-[#E6DDD0] transition-shadow duration-200">
      {/* Top Announcement Bar */}
      <div className="bg-[#2B2220] text-[#FAF6F0] text-[11px] sm:text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-between">
        <div className="hidden lg:flex items-center gap-2 text-[#E6DDD0]">
          <Sparkles size={12} className="text-[#C17D3C]" />
          <span>100% Solid Timber Guarantee &bull; 0% Compressed Wood / MDF &bull; Direct From Artisan Workshops</span>
        </div>

        <div className="mx-auto lg:mx-0 flex items-center gap-2">
          <span>
            Complimentary White Glove Delivery on orders above <strong>₹1,50,000</strong> &bull; Code <strong className="text-[#C17D3C]">OCHRE10</strong>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-4 text-[#E6DDD0]">
          <button
            onClick={onOpenTrackOrder}
            className="hover:text-[#C17D3C] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Truck size={12} />
            <span>Track Order</span>
          </button>
          <span>&bull;</span>
          <button
            onClick={onOpenTerms}
            className="hover:text-[#C17D3C] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Guarantee & Terms</span>
          </button>
        </div>
      </div>

      {/* Main Brand & Actions Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-4">
        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#2B2220] hover:text-[#C17D3C] transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Brand Logo Header */}
        <button
          onClick={() => {
            onSelectTab('shop');
            onSelectCategory('all');
          }}
          className="cursor-pointer group text-left"
        >
          <BrandLogo size="md" showTagline={true} />
        </button>

        {/* Action Controls (Search, Wishlist, Compare, Cart) */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E6DDD0] hover:border-[#C17D3C] text-xs text-[#6B5B54] bg-white transition-all shadow-xs group"
          >
            <Search size={15} className="text-[#2B2220] group-hover:text-[#C17D3C]" />
            <span className="hidden sm:inline">Search furniture, fabrics...</span>
          </button>

          {/* Book Stylist Quick Button */}
          <button
            onClick={onOpenStylistModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#2B2220] hover:text-[#C17D3C] transition-colors"
          >
            <PhoneCall size={14} className="text-[#C17D3C]" />
            <span>Design Studio</span>
          </button>

          {/* Compare Button */}
          <button
            onClick={onOpenCompare}
            className="relative p-2 text-[#2B2220] hover:text-[#C17D3C] transition-colors cursor-pointer"
            title="Compare Products"
          >
            <Layers size={20} />
            {compareCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C17D3C] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {compareCount}
              </span>
            )}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-[#2B2220] hover:text-[#C17D3C] transition-colors cursor-pointer"
            title="Saved Wishlist"
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C17D3C] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative bg-[#2B2220] text-[#FAF6F0] hover:bg-[#C17D3C] px-3.5 py-2 rounded-full flex items-center gap-2 text-xs font-semibold tracking-wider transition-all shadow-sm cursor-pointer"
          >
            <ShoppingBag size={16} />
            <span className="hidden sm:inline">BAG</span>
            {cartCount > 0 && (
              <span className="bg-[#C17D3C] text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Desktop Navigation Links */}
      <nav className="hidden lg:block border-t border-[#E6DDD0] bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-xs font-medium tracking-widest uppercase">
          {/* Shop Categories */}
          <div className="flex items-center space-x-8 py-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectTab('shop');
                  onSelectCategory(cat.id);
                }}
                className={`transition-all relative py-1 cursor-pointer ${
                  activeTab === 'shop' && activeCategory === cat.id
                    ? 'text-[#C17D3C] font-bold'
                    : 'text-[#2B2220] hover:text-[#C17D3C]'
                }`}
              >
                {cat.label}
                {activeTab === 'shop' && activeCategory === cat.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C17D3C] rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Special Pottery Barn Style Interactive Features */}
          <div className="flex items-center space-x-6 py-3 border-l border-[#E6DDD0] pl-6">
            <button
              onClick={() => onSelectTab('custom-furniture')}
              className={`flex items-center gap-1.5 transition-all py-1 cursor-pointer ${
                activeTab === 'custom-furniture'
                  ? 'text-[#C17D3C] font-bold'
                  : 'text-[#2B2220] hover:text-[#C17D3C]'
              }`}
            >
              <Sparkles size={14} className="text-[#C17D3C]" />
              <span>Custom Furniture</span>
            </button>

            <button
              onClick={() => onSelectTab('room-planner')}
              className={`flex items-center gap-1.5 transition-all py-1 cursor-pointer ${
                activeTab === 'room-planner'
                  ? 'text-[#C17D3C] font-bold'
                  : 'text-[#2B2220] hover:text-[#C17D3C]'
              }`}
            >
              <span>3D Room Stager</span>
            </button>

            <button
              onClick={() => onSelectTab('lookbook')}
              className={`transition-all py-1 cursor-pointer ${
                activeTab === 'lookbook'
                  ? 'text-[#C17D3C] font-bold'
                  : 'text-[#2B2220] hover:text-[#C17D3C]'
              }`}
            >
              <span>Shop Lookbook</span>
            </button>

            <button
              onClick={() => onSelectTab('swatch-kit')}
              className={`transition-all py-1 cursor-pointer ${
                activeTab === 'swatch-kit'
                  ? 'text-[#C17D3C]'
                  : 'text-[#2B2220] hover:text-[#C17D3C]'
              }`}
            >
              <span>Free Swatch Kit</span>
            </button>

            <button
              onClick={() => onSelectTab('our-story')}
              className={`transition-all py-1 cursor-pointer ${
                activeTab === 'our-story'
                  ? 'text-[#C17D3C] font-bold'
                  : 'text-[#2B2220] hover:text-[#C17D3C]'
              }`}
            >
              <span>Our Story</span>
            </button>

            <button
              onClick={() => onSelectTab('contact')}
              className={`transition-all py-1 cursor-pointer ${
                activeTab === 'contact'
                  ? 'text-[#C17D3C] font-bold'
                  : 'text-[#2B2220] hover:text-[#C17D3C]'
              }`}
            >
              <span>Contact Us</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E6DDD0] bg-[#FAF6F0] p-4 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#6B5B54] mb-2">
              Collections
            </div>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectTab('shop');
                  onSelectCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-lg text-sm font-medium ${
                  activeTab === 'shop' && activeCategory === cat.id
                    ? 'bg-[#C17D3C]/10 text-[#C17D3C] font-semibold'
                    : 'text-[#2B2220] hover:bg-white/60'
                }`}
              >
                <span>{cat.label}</span>
                <ChevronRight size={16} />
              </button>
            ))}
          </div>

          <div className="border-t border-[#E6DDD0] pt-3 space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#6B5B54] mb-2">
              Design & Planning Studio
            </div>
            <button
              onClick={() => {
                onSelectTab('custom-furniture');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-lg text-sm font-medium text-[#2B2220] hover:bg-white"
            >
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#C17D3C]" />
                <span>Custom Furniture Studio</span>
              </div>
              <ChevronRight size={16} />
            </button>

            <button
              onClick={() => {
                onSelectTab('room-planner');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-lg text-sm font-medium text-[#2B2220] hover:bg-white"
            >
              <span>3D Room Stager (Interactive)</span>
              <ChevronRight size={16} />
            </button>

            <button
              onClick={() => {
                onOpenTrackOrder();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-lg text-sm font-medium text-[#2B2220] hover:bg-white"
            >
              <span>Track Order & Swatch Kit</span>
              <ChevronRight size={16} />
            </button>

            <button
              onClick={() => {
                onSelectTab('lookbook');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-lg text-sm font-medium text-[#2B2220] hover:bg-white"
            >
              <span>Shop Lookbook Hotspots</span>
              <ChevronRight size={16} />
            </button>

            <button
              onClick={() => {
                onSelectTab('swatch-kit');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-lg text-sm font-medium text-[#2B2220] hover:bg-white"
            >
              <span>Order Free Swatch Box</span>
              <ChevronRight size={16} />
            </button>

            <button
              onClick={() => {
                onSelectTab('our-story');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-lg text-sm font-medium text-[#2B2220] hover:bg-white"
            >
              <span>Our Story (50+ Years Heritage)</span>
              <ChevronRight size={16} />
            </button>

            <button
              onClick={() => {
                onSelectTab('contact');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-lg text-sm font-medium text-[#2B2220] hover:bg-white"
            >
              <span>Contact Us & Studio</span>
              <ChevronRight size={16} />
            </button>

            <button
              onClick={() => {
                onOpenStylistModal();
                setMobileMenuOpen(false);
              }}
              className="w-full mt-2 bg-[#2B2220] text-white p-3 rounded-lg text-xs font-semibold uppercase tracking-wider text-center"
            >
              Book Complimentary Interior Stylist
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
