import React, { useState } from 'react';
import { Heart, Layers, Eye, Star, ShoppingBag, Check } from 'lucide-react';
import { Product, Swatch } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, woodFinish?: Swatch, fabric?: Swatch) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onToggleCompare: (product: Product) => void;
  isCompared: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onToggleCompare,
  isCompared,
}) => {
  const [selectedWood, setSelectedWood] = useState<Swatch | undefined>(
    product.availableWoodFinishes[0]
  );
  const [selectedFabric, setSelectedFabric] = useState<Swatch | undefined>(
    product.availableFabrics[0]
  );
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Compute active image based on swatch selection
  const getDisplayImage = () => {
    if (selectedFabric && product.swatchImageMap?.[selectedFabric.id]) {
      return product.swatchImageMap[selectedFabric.id];
    }
    if (selectedWood && product.swatchImageMap?.[selectedWood.id]) {
      return product.swatchImageMap[selectedWood.id];
    }
    return product.image;
  };

  const activeImage = getDisplayImage();

  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedWood, selectedFabric);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative bg-white border border-[#E6DDD0] rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.isBestseller && (
          <span className="bg-[#2B2220] text-[#FAF6F0] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-xs">
            Bestseller
          </span>
        )}
        {product.isNewArrival && (
          <span className="bg-[#C17D3C] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-xs">
            New Arrival
          </span>
        )}
      </div>

      {/* Action Floating Buttons */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
            isWishlisted
              ? 'bg-[#C17D3C] text-white'
              : 'bg-white/80 text-[#2B2220] hover:bg-white hover:text-[#C17D3C]'
          }`}
          title="Save to Wishlist"
        >
          <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleCompare(product);
          }}
          className={`p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
            isCompared
              ? 'bg-[#2B2220] text-white'
              : 'bg-white/80 text-[#2B2220] hover:bg-white hover:text-[#C17D3C]'
          }`}
          title="Compare Specifications"
        >
          <Layers size={16} />
        </button>
      </div>

      {/* Image Container with Hover Shift */}
      <div className="relative aspect-[4/3] bg-[#FAF6F0] overflow-hidden">
        <img
          src={activeImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Quick View Hover Button */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full py-2 bg-white/95 text-[#2B2220] hover:bg-[#C17D3C] hover:text-white rounded-md text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-1.5"
          >
            <Eye size={14} />
            <span>Quick View & Customizer</span>
          </button>
        </div>
      </div>

      {/* Swatch Previews */}
      <div className="px-4 pt-3 flex items-center justify-between border-b border-[#FAF6F0] pb-2">
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
          {/* Wood Swatches */}
          {product.availableWoodFinishes.slice(0, 3).map((swatch) => (
            <button
              key={swatch.id}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedWood(swatch);
              }}
              title={`Wood Finish: ${swatch.name}`}
              className={`w-4 h-4 rounded-full border transition-all ${
                selectedWood?.id === swatch.id
                  ? 'border-[#2B2220] scale-110 shadow-xs'
                  : 'border-transparent hover:scale-105'
              }`}
              style={{ backgroundColor: swatch.hex }}
            />
          ))}

          {/* Fabric Swatches */}
          {product.availableFabrics.slice(0, 3).map((swatch) => (
            <button
              key={swatch.id}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFabric(swatch);
              }}
              title={`Upholstery: ${swatch.name}`}
              className={`w-4 h-4 rounded-full border transition-all ${
                selectedFabric?.id === swatch.id
                  ? 'border-[#2B2220] scale-110 shadow-xs'
                  : 'border-transparent hover:scale-105'
              }`}
              style={{ backgroundColor: swatch.hex }}
            />
          ))}
        </div>

        <span className="text-[10px] text-[#6B5B54] uppercase tracking-wider font-medium">
          {product.warrantyYears}-Yr Warranty
        </span>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 mb-1">
            <div className="flex text-[#C17D3C]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                />
              ))}
            </div>
            <span className="text-[11px] font-semibold text-[#2B2220] ml-1">
              {product.rating}
            </span>
            <span className="text-[10px] text-[#6B5B54]">
              ({product.reviewCount})
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-serif-brand font-medium text-base text-[#2B2220] group-hover:text-[#C17D3C] transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-[#6B5B54] line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="mt-4 pt-3 border-t border-[#FAF6F0] flex items-end justify-between gap-2">
          <div>
            <div className="text-sm font-bold text-[#2B2220]">
              {formatINR(product.priceINR)}
            </div>
            {product.mrpINR > product.priceINR && (
              <div className="flex items-center gap-1.5 text-[11px]">
                <span className="line-through text-[#9E8E87]">
                  {formatINR(product.mrpINR)}
                </span>
                <span className="text-[#C17D3C] font-semibold">
                  {Math.round(((product.mrpINR - product.priceINR) / product.mrpINR) * 100)}% OFF
                </span>
              </div>
            )}
          </div>

          <button
            onClick={handleAdd}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              addedAnimation
                ? 'bg-emerald-700 text-white'
                : 'bg-[#FAF6F0] hover:bg-[#2B2220] text-[#2B2220] hover:text-white border border-[#E6DDD0]'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check size={14} />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag size={14} />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
