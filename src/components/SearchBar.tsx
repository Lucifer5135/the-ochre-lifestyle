import React, { useState } from 'react';
import { Search, X, Eye, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ isOpen, onClose, onSelectProduct }) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const filteredProducts = PRODUCTS.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.materials.some((m) => m.toLowerCase().includes(q))
    );
  });

  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-[#E6DDD0] shadow-2xl overflow-hidden p-4 space-y-4">
        {/* Search Input Bar */}
        <div className="relative flex items-center">
          <Search size={20} className="absolute left-4 text-[#C17D3C]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search teak sofas, velvet chairs, dining tables, rugs..."
            className="w-full pl-12 pr-12 py-3.5 bg-[#FAF6F0] border border-[#E6DDD0] rounded-xl text-sm focus:outline-none focus:border-[#C17D3C] text-[#2B2220]"
          />
          <button
            onClick={onClose}
            className="absolute right-3 p-1.5 hover:bg-[#2B2220] hover:text-white rounded-full text-[#2B2220] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto space-y-2">
          {query.trim() === '' ? (
            <div className="p-4 text-xs text-[#6B5B54]">
              <span className="font-bold text-[#2B2220] uppercase tracking-wider block mb-2">
                Popular Searches:
              </span>
              <div className="flex flex-wrap gap-2">
                {['Curved Velvet Sofa', 'Solid Teak Dining Table', 'Low Profile Bed', 'Wool Rug', 'Terracotta Lamp'].map(
                  (term, idx) => (
                    <button
                      key={idx}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1 bg-[#FAF6F0] hover:bg-[#C17D3C] hover:text-white rounded-full text-xs transition-colors cursor-pointer"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#6B5B54]">
              No matching furniture found for "{query}". Try searching for teak, velvet, bed, or table.
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="p-3 bg-[#FAF6F0] hover:bg-white rounded-xl border border-[#E6DDD0] flex items-center justify-between gap-3 cursor-pointer transition-all hover:shadow-md group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-lg object-cover bg-white"
                  />
                  <div>
                    <h4 className="font-serif-brand font-medium text-xs text-[#2B2220] group-hover:text-[#C17D3C] transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-[#6B5B54]">{product.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-bold text-xs text-[#C17D3C]">
                    {formatINR(product.priceINR)}
                  </span>
                  <ArrowRight size={16} className="text-[#2B2220] group-hover:text-[#C17D3C]" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
