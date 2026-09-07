import React from 'react';
import { X, Layers, Check, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { useBodyScrollLock } from '../lib/useBodyScrollLock';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparedProducts: Product[];
  onRemoveCompare: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  comparedProducts,
  onRemoveCompare,
  onAddToCart,
}) => {
  useBodyScrollLock(isOpen);

  if (!isOpen) return null;

  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/60 backdrop-blur-xs overscroll-contain animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-5xl bg-white rounded-2xl border border-[#E6DDD0] shadow-2xl overflow-y-auto max-h-[92vh] sm:max-h-[90vh] my-auto p-4 sm:p-8 space-y-4 sm:space-y-6 overscroll-contain touch-pan-y"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-[#FAF6F0] hover:bg-[#2B2220] hover:text-white rounded-full transition-colors text-[#2B2220] cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2">
          <Layers size={22} className="text-[#C17D3C]" />
          <h3 className="font-serif-brand font-medium text-2xl text-[#2B2220]">
            Furniture Comparison ({comparedProducts.length}/4)
          </h3>
        </div>

        {comparedProducts.length === 0 ? (
          <div className="text-center py-16 text-[#6B5B54] text-xs">
            No products selected for comparison. Click the compare icon on product cards to view side-by-side specs.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E6DDD0]">
                  <th className="p-3 w-36 bg-[#FAF6F0] font-bold text-[#2B2220]">Specification</th>
                  {comparedProducts.map((p) => (
                    <th key={p.id} className="p-3 min-w-[200px] align-top">
                      <div className="relative group space-y-2">
                        <button
                          onClick={() => onRemoveCompare(p)}
                          className="absolute -top-1 -right-1 p-1 bg-white hover:bg-rose-600 hover:text-white rounded-full border border-[#E6DDD0] text-[#9E8E87]"
                        >
                          <X size={12} />
                        </button>
                        <img
                          src={p.image}
                          alt={p.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-32 object-cover rounded-lg bg-[#FAF6F0]"
                        />
                        <h4 className="font-serif-brand font-bold text-[#2B2220]">{p.name}</h4>
                        <div className="text-sm font-bold text-[#C17D3C]">{formatINR(p.priceINR)}</div>
                        <button
                          onClick={() => onAddToCart(p)}
                          className="w-full py-2 bg-[#2B2220] hover:bg-[#C17D3C] text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <ShoppingBag size={12} />
                          <span>Add to Bag</span>
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6DDD0]">
                <tr>
                  <td className="p-3 bg-[#FAF6F0] font-semibold text-[#2B2220]">Category</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-3 text-[#6B5B54] capitalize">{p.category}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 bg-[#FAF6F0] font-semibold text-[#2B2220]">Dimensions (WxDxH)</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-3 text-[#2B2220] font-medium">
                      {p.dimensions.widthCm} x {p.dimensions.depthCm} x {p.dimensions.heightCm} cm
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 bg-[#FAF6F0] font-semibold text-[#2B2220]">Materials</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-3 text-[#6B5B54]">{p.materials.join(', ')}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 bg-[#FAF6F0] font-semibold text-[#2B2220]">Warranty</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-3 text-[#2B2220] font-semibold">{p.warrantyYears} Years Solid Frame</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 bg-[#FAF6F0] font-semibold text-[#2B2220]">Delivery Lead Time</td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-3 text-[#6B5B54]">{p.leadTimeDays} Business Days</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
