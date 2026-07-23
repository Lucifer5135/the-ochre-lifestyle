import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl border-l border-[#E6DDD0] flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
        <div className="p-5 bg-[#FAF6F0] border-b border-[#E6DDD0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart size={20} className="text-[#C17D3C]" fill="currentColor" />
            <h3 className="font-serif-brand font-medium text-lg text-[#2B2220]">
              Saved Wishlist ({wishlist.length})
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-[#2B2220] hover:text-white rounded-full transition-colors text-[#2B2220] cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlist.length === 0 ? (
            <div className="text-center space-y-3 py-20 text-[#6B5B54]">
              <Heart size={32} className="mx-auto text-[#9E8E87]" />
              <p className="text-xs">No saved items in your wishlist yet.</p>
            </div>
          ) : (
            wishlist.map((product) => (
              <div
                key={product.id}
                className="p-3 bg-[#FAF6F0] rounded-xl border border-[#E6DDD0] flex gap-3 items-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-lg object-cover bg-white shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-serif-brand font-medium text-xs text-[#2B2220] truncate">
                    {product.name}
                  </h4>
                  <p className="font-bold text-xs text-[#C17D3C] mt-0.5">
                    {formatINR(product.priceINR)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onAddToCart(product);
                      onRemoveWishlist(product);
                    }}
                    className="p-2 bg-[#2B2220] hover:bg-[#C17D3C] text-white rounded-lg text-xs transition-colors cursor-pointer"
                    title="Move to Bag"
                  >
                    <ShoppingBag size={14} />
                  </button>

                  <button
                    onClick={() => onRemoveWishlist(product)}
                    className="p-2 text-[#9E8E87] hover:text-rose-700 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
