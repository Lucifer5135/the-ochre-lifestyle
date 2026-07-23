import React, { useState } from 'react';
import { Sparkles, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product, Swatch } from '../types';
import { LOOKBOOK_HOTSPOTS, PRODUCTS } from '../data/products';
import lookbookImg from '../assets/images/lookbook_hotspot_1784804183436.jpg';

interface ShopTheRoomProps {
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, woodFinish?: Swatch, fabric?: Swatch) => void;
}

export const ShopTheRoom: React.FC<ShopTheRoomProps> = ({ onQuickView, onAddToCart }) => {
  const [activePinId, setActivePinId] = useState<string | null>(LOOKBOOK_HOTSPOTS[0].id);
  const [addedPinId, setAddedPinId] = useState<string | null>(null);

  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C17D3C]/10 text-[#C17D3C] text-xs font-semibold uppercase tracking-widest border border-[#C17D3C]/20">
          <Sparkles size={14} />
          <span>Shop The Lookbook Scene</span>
        </div>

        <h2 className="font-serif-brand text-3xl sm:text-4xl font-medium text-[#2B2220]">
          The Autumn Solstice Residence
        </h2>

        <p className="text-xs sm:text-sm text-[#6B5B54]">
          Click any glowing pulse pin below to reveal furniture details, custom wood stains, and instant cart addition.
        </p>
      </div>

      {/* Lookbook Hotspot Scene */}
      <div className="relative rounded-2xl overflow-hidden border border-[#E6DDD0] shadow-2xl bg-[#FAF6F0] aspect-[16/9]">
        <img
          src={lookbookImg}
          alt="Editorial Living Room Lookbook"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />

        {/* Hotspot Pins */}
        {LOOKBOOK_HOTSPOTS.map((pin) => {
          const product = PRODUCTS.find((p) => p.id === pin.productId);
          if (!product) return null;
          const isActive = activePinId === pin.id;

          return (
            <div
              key={pin.id}
              style={{ top: `${pin.yPercent}%`, left: `${pin.xPercent}%` }}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
            >
              {/* Pulsing Pin Button */}
              <button
                onClick={() => setActivePinId(isActive ? null : pin.id)}
                className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center transition-transform cursor-pointer shadow-lg ${
                  isActive ? 'bg-[#2B2220] scale-125' : 'bg-[#C17D3C] hotspot-pulse hover:scale-110'
                }`}
              >
                <div className="w-3 h-3 bg-white rounded-full" />
              </button>

              {/* Popover Product Card */}
              {isActive && (
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-[#E6DDD0] shadow-2xl z-30 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex gap-3 items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-lg object-cover bg-[#FAF6F0]"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif-brand font-medium text-xs text-[#2B2220] truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs font-bold text-[#C17D3C] mt-0.5">
                        {formatINR(product.priceINR)}
                      </p>
                      <span className="text-[10px] text-[#6B5B54] uppercase tracking-wider block">
                        {product.materials[0]}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#E6DDD0] flex gap-2">
                    <button
                      onClick={() => onQuickView(product)}
                      className="flex-1 py-1.5 bg-[#FAF6F0] hover:bg-[#2B2220] hover:text-white text-[#2B2220] rounded-md text-[11px] font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Eye size={12} />
                      <span>Details</span>
                    </button>

                    <button
                      onClick={() => {
                        onAddToCart(product);
                        setAddedPinId(pin.id);
                        setTimeout(() => setAddedPinId(null), 1500);
                      }}
                      className="flex-1 py-1.5 bg-[#2B2220] hover:bg-[#C17D3C] text-white rounded-md text-[11px] font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      {addedPinId === pin.id ? (
                        <>
                          <Check size={12} />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={12} />
                          <span>Add to Bag</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
