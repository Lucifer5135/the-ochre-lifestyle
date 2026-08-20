import React, { useState, useEffect } from 'react';
import {
  X,
  Star,
  ShieldCheck,
  Truck,
  Ruler,
  Check,
  ShoppingBag,
  Sparkles,
  MapPin,
  Heart,
  Layers,
  Clock
} from 'lucide-react';
import { Product, Swatch } from '../types';
import { ProductVisualizer } from './ProductVisualizer';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, woodFinish?: Swatch, fabric?: Swatch, whiteGlove?: boolean) => void;
  onOpenSwatchKit: () => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenSwatchKit,
  onToggleWishlist,
  isWishlisted,
}) => {
  if (!product) return null;

  const [selectedWood, setSelectedWood] = useState<Swatch | undefined>(
    product.availableWoodFinishes[0]
  );
  const [selectedFabric, setSelectedFabric] = useState<Swatch | undefined>(
    product.availableFabrics[0]
  );

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [includeWhiteGlove, setIncludeWhiteGlove] = useState(true);
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState<string | null>(null);

  // Sync selected state if product changes
  useEffect(() => {
    if (product) {
      setSelectedWood(product.availableWoodFinishes[0]);
      setSelectedFabric(product.availableFabrics[0]);
      setSelectedImage(product.image);
    }
  }, [product]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleWoodSelect = (wood: Swatch) => {
    setSelectedWood(wood);
  };

  const handleFabricSelect = (fabric: Swatch) => {
    setSelectedFabric(fabric);
  };

  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeResult(
        `Verified! Eligible for White Glove Express Delivery in 4-6 business days to Pincode ${pincode}.`
      );
    } else {
      setPincodeResult('Please enter a valid 6-digit Indian PIN code (e.g. 400001).');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/70 backdrop-blur-xs overscroll-contain overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-[#E6DDD0] overflow-y-auto md:overflow-hidden my-auto max-h-[92vh] md:max-h-[85vh] flex flex-col md:flex-row overscroll-contain"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close product quick view"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 p-2 bg-white/95 hover:bg-[#2B2220] hover:text-white rounded-full transition-colors text-[#2B2220] shadow-md border border-[#E6DDD0] cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Left: Image Gallery & Dimensions */}
        <div className="w-full md:w-1/2 bg-[#FAF6F0] p-4 sm:p-6 flex flex-col justify-start md:overflow-y-auto md:max-h-[85vh] shrink-0 border-b md:border-b-0 md:border-r border-[#E6DDD0] space-y-4">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white border border-[#E6DDD0] shadow-xs">
            <ProductVisualizer
              product={product}
              currentImage={selectedImage}
              selectedWood={selectedWood}
              selectedFabric={selectedFabric}
              className="w-full h-full"
              showCustomBadge={true}
              interactiveToggle={true}
            />

            <button
              onClick={() => onToggleWishlist(product)}
              className={`absolute top-3 right-3 z-20 p-2 rounded-full shadow-md transition-all ${
                isWishlisted
                  ? 'bg-[#C17D3C] text-white'
                  : 'bg-white/90 text-[#2B2220] hover:text-[#C17D3C]'
              }`}
              title="Save to Wishlist"
            >
              <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                  selectedImage === img
                    ? 'border-[#C17D3C] scale-105 shadow-sm'
                    : 'border-[#E6DDD0] opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} preview ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Comprehensive Item Dimensions & Physical Specifications Banner */}
          <div className="p-4 bg-white rounded-xl border border-[#E6DDD0] text-xs text-[#2B2220] space-y-2.5 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E6DDD0] pb-2">
              <div className="flex items-center gap-2 text-[#C17D3C]">
                <Ruler size={18} />
                <span className="font-bold uppercase tracking-wider text-xs">Item Dimensions & Specifications</span>
              </div>
              <span className="text-[11px] font-semibold text-[#6B5B54] bg-[#FAF6F0] px-2 py-0.5 rounded border border-[#E6DDD0]">
                Solid Wood Structure
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="p-2 rounded-lg bg-[#FAF6F0] border border-[#E6DDD0]">
                <span className="text-[10px] uppercase font-bold text-[#6B5B54] block">Width</span>
                <span className="font-serif-brand font-bold text-sm text-[#2B2220] block">{product.dimensions.widthCm} cm</span>
                <span className="text-[10px] text-[#9E8E87]">{Math.round(product.dimensions.widthCm * 0.3937)}" inches</span>
              </div>

              <div className="p-2 rounded-lg bg-[#FAF6F0] border border-[#E6DDD0]">
                <span className="text-[10px] uppercase font-bold text-[#6B5B54] block">Depth</span>
                <span className="font-serif-brand font-bold text-sm text-[#2B2220] block">{product.dimensions.depthCm} cm</span>
                <span className="text-[10px] text-[#9E8E87]">{Math.round(product.dimensions.depthCm * 0.3937)}" inches</span>
              </div>

              <div className="p-2 rounded-lg bg-[#FAF6F0] border border-[#E6DDD0]">
                <span className="text-[10px] uppercase font-bold text-[#6B5B54] block">Height</span>
                <span className="font-serif-brand font-bold text-sm text-[#2B2220] block">{product.dimensions.heightCm} cm</span>
                <span className="text-[10px] text-[#9E8E87]">{Math.round(product.dimensions.heightCm * 0.3937)}" inches</span>
              </div>
            </div>

            <div className="pt-1.5 border-t border-[#FAF6F0] flex items-center justify-between text-[11px] text-[#6B5B54]">
              <span><strong>Item Weight:</strong> {product.dimensions.weightKg} kg ({Math.round(product.dimensions.weightKg * 2.20462)} lbs)</span>
              {product.dimensions.seatingCapacity && (
                <span><strong>Seating:</strong> {product.dimensions.seatingCapacity} Persons</span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Specifications & Customization */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 md:overflow-y-auto md:max-h-[85vh] space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C17D3C]">
                <span>{product.category} Collection</span>
                <span>&bull;</span>
                <span className="text-emerald-700 font-bold">In Stock & Ready to Ship</span>
              </div>

              <h2 className="font-serif-brand text-2xl sm:text-3xl font-medium text-[#2B2220] mt-1 pr-8">
                {product.name}
              </h2>

              <p className="text-xs text-[#6B5B54] mt-1">{product.subtitle}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-[#C17D3C]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#2B2220]">{product.rating}</span>
                <span className="text-xs text-[#6B5B54]">({product.reviewCount} customer reviews)</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="p-4 bg-[#FAF6F0] rounded-xl border border-[#E6DDD0] flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-[#2B2220]">
                  {formatINR(product.priceINR)}
                </div>
                <div className="text-xs text-[#6B5B54]">
                  Inclusive of all taxes & GST &bull; EMI starting at ₹{Math.round(product.priceINR / 12).toLocaleString('en-IN')}/mo
                </div>
              </div>

              {product.mrpINR > product.priceINR && (
                <div className="text-right">
                  <span className="line-through text-xs text-[#9E8E87] block">
                    {formatINR(product.mrpINR)}
                  </span>
                  <span className="text-xs font-bold text-[#C17D3C]">
                    Save {formatINR(product.mrpINR - product.priceINR)}
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-xs text-[#2B2220] leading-relaxed">
              {product.description}
            </p>

            {/* Artisan Heritage Badge */}
            <div className="flex items-center gap-2 px-3 py-2 bg-[#FAF6F0] rounded-lg border border-[#E6DDD0] text-xs text-[#2B2220]">
              <ShieldCheck size={16} className="text-[#C17D3C] shrink-0" />
              <span>Handcrafted in Rajasthan by master woodworkers with <strong>over 5 decades (50+ years)</strong> of artisan experience.</span>
            </div>

            {/* Wood Finish Selector */}
            {product.availableWoodFinishes.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-[#2B2220]">
                    1. Select Wood Finish:
                  </span>
                  <span className="text-[#C17D3C] font-medium">
                    {selectedWood?.name}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {product.availableWoodFinishes.map((wood) => (
                    <button
                      key={wood.id}
                      onClick={() => handleWoodSelect(wood)}
                      className={`p-2 rounded-lg border text-left flex items-center gap-2 transition-all cursor-pointer ${
                        selectedWood?.id === wood.id
                          ? 'border-[#C17D3C] bg-[#C17D3C]/5 font-semibold shadow-xs'
                          : 'border-[#E6DDD0] hover:border-[#2B2220]'
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-black/20 shrink-0"
                        style={{ backgroundColor: wood.hex }}
                      />
                      <span className="text-xs text-[#2B2220] truncate">{wood.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Fabric Upholstery Selector */}
            {product.availableFabrics.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-[#2B2220]">
                    2. Select Fabric / Leather:
                  </span>
                  <span className="text-[#C17D3C] font-medium">
                    {selectedFabric?.name}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {product.availableFabrics.map((fabric) => (
                    <button
                      key={fabric.id}
                      onClick={() => handleFabricSelect(fabric)}
                      className={`p-2 rounded-lg border text-left flex items-center gap-2 transition-all cursor-pointer ${
                        selectedFabric?.id === fabric.id
                          ? 'border-[#C17D3C] bg-[#C17D3C]/5 font-semibold shadow-xs'
                          : 'border-[#E6DDD0] hover:border-[#2B2220]'
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-black/20 shrink-0"
                        style={{ backgroundColor: fabric.hex }}
                      />
                      <span className="text-xs text-[#2B2220] truncate">{fabric.name}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-1 text-right">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenSwatchKit();
                    }}
                    className="text-xs text-[#C17D3C] font-semibold underline hover:text-[#9E5B23] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles size={12} />
                    <span>Order Free Swatch Sample Kit to test fabrics at home</span>
                  </button>
                </div>
              </div>
            )}

            {/* Delivery PIN Code Checker */}
            <div className="p-4 bg-white rounded-xl border border-[#E6DDD0] space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2220] flex items-center gap-1.5">
                <Truck size={14} className="text-[#C17D3C]" />
                <span>Check Delivery & Assembly in Your City:</span>
              </label>

              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode (e.g. 400001)"
                  className="flex-1 px-3 py-2 border border-[#E6DDD0] rounded-lg text-xs focus:outline-none focus:border-[#C17D3C]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2B2220] text-white rounded-lg text-xs font-semibold hover:bg-[#C17D3C] transition-colors cursor-pointer"
                >
                  Check
                </button>
              </form>

              {pincodeResult && (
                <p className="text-xs text-[#C17D3C] font-medium pt-1">
                  {pincodeResult}
                </p>
              )}
            </div>

            {/* White Glove Assembly Option */}
            <label className="flex items-center gap-3 p-3 bg-[#FAF6F0] rounded-xl border border-[#E6DDD0] cursor-pointer">
              <input
                type="checkbox"
                checked={includeWhiteGlove}
                onChange={(e) => setIncludeWhiteGlove(e.target.checked)}
                className="accent-[#C17D3C] w-4 h-4"
              />
              <div className="text-xs">
                <span className="font-bold text-[#2B2220]">
                  Include White Glove Assembly & Packaging Removal
                </span>
                <span className="block text-[#6B5B54] text-[11px]">
                  Complimentary room placement and expert setup by Ochre technicians
                </span>
              </div>
            </label>
          </div>

          {/* Add to Cart CTA */}
          <div className="pt-4 mt-2">
            <button
              onClick={() => {
                onAddToCart(product, selectedWood, selectedFabric, includeWhiteGlove);
                onClose();
              }}
              className="w-full py-4 bg-[#2B2220] hover:bg-[#C17D3C] text-white rounded-xl text-xs font-bold tracking-widest uppercase transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag size={18} />
              <span>Add to Bag &bull; {formatINR(product.priceINR)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

