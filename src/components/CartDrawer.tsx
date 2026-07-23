import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, ShieldCheck, Truck, ArrowRight, Tag, Check, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  onOpenStylist: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenStylist,
}) => {
  if (!isOpen) return null;

  const [coupon, setCoupon] = useState('OCHRE10');
  const [appliedDiscount, setAppliedDiscount] = useState(0.1); // 10%
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.product.priceINR * item.quantity, 0);
  const discountAmount = subtotal * appliedDiscount;
  const isFreeDelivery = subtotal >= 150000;
  const shippingFee = isFreeDelivery ? 0 : 3500;
  const grandTotal = subtotal - discountAmount + shippingFee;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === 'OCHRE10') {
      setAppliedDiscount(0.1);
    } else if (coupon.trim().toUpperCase() === 'OCHRE5000') {
      setAppliedDiscount(0.15);
    }
  };

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      onClearCart();
      setCheckoutSuccess(false);
      onClose();
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl border-l border-[#E6DDD0] flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Cart Header */}
        <div className="p-5 bg-[#FAF6F0] border-b border-[#E6DDD0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-[#C17D3C]" />
            <h3 className="font-serif-brand font-medium text-lg text-[#2B2220]">
              Your Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-[#2B2220] hover:text-white rounded-full transition-colors text-[#2B2220] cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {checkoutSuccess ? (
            <div className="text-center space-y-4 py-16">
              <div className="w-16 h-16 bg-[#C17D3C] text-white rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
                <Check size={32} />
              </div>

              <h3 className="font-serif-brand text-2xl text-[#2B2220]">
                Order Successfully Placed!
              </h3>

              <p className="text-xs text-[#6B5B54] max-w-xs mx-auto">
                Thank you for choosing The Ochre Lifestyle. Your order reference code is <strong>OCHRE-ORD-{Math.floor(100000 + Math.random() * 900000)}</strong>. Our White Glove logistics desk will contact you shortly.
              </p>
            </div>
          ) : cart.length === 0 ? (
            <div className="text-center space-y-4 py-20 text-[#6B5B54]">
              <div className="w-16 h-16 bg-[#FAF6F0] rounded-full flex items-center justify-center mx-auto text-[#9E8E87]">
                <ShoppingBag size={28} />
              </div>
              <p className="text-xs">Your shopping bag is currently empty.</p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#2B2220] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#C17D3C] transition-colors cursor-pointer"
              >
                Explore Living Collection
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div
                key={idx}
                className="p-3 bg-[#FAF6F0] rounded-xl border border-[#E6DDD0] flex gap-3 relative group"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-lg object-cover bg-white shrink-0"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="font-serif-brand font-medium text-xs text-[#2B2220] truncate">
                    {item.product.name}
                  </h4>

                  {/* Swatch selections */}
                  <div className="text-[10px] text-[#6B5B54] space-y-0.5">
                    {item.selectedWoodFinish && (
                      <div className="flex items-center gap-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block border border-black/20"
                          style={{ backgroundColor: item.selectedWoodFinish.hex }}
                        />
                        <span>Wood: {item.selectedWoodFinish.name}</span>
                      </div>
                    )}

                    {item.selectedFabric && (
                      <div className="flex items-center gap-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block border border-black/20"
                          style={{ backgroundColor: item.selectedFabric.hex }}
                        />
                        <span>Fabric: {item.selectedFabric.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="font-bold text-xs text-[#C17D3C]">
                      {formatINR(item.product.priceINR * item.quantity)}
                    </span>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 border border-[#E6DDD0] bg-white rounded-md px-2 py-0.5 text-xs">
                      <button
                        onClick={() => onUpdateQuantity(idx, -1)}
                        className="hover:text-[#C17D3C] font-bold"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(idx, 1)}
                        className="hover:text-[#C17D3C] font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(idx)}
                  className="p-1 text-[#9E8E87] hover:text-rose-700 transition-colors"
                  title="Remove"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cart.length > 0 && !checkoutSuccess && (
          <div className="p-5 bg-[#FAF6F0] border-t border-[#E6DDD0] space-y-3 text-xs">
            {/* Coupon Box */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Coupon Code"
                className="flex-1 px-3 py-1.5 bg-white border border-[#E6DDD0] rounded-lg focus:outline-none focus:border-[#C17D3C] text-xs uppercase tracking-wider"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-[#2B2220] text-white rounded-lg font-semibold hover:bg-[#C17D3C] transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            <div className="space-y-1.5 text-[#6B5B54]">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-[#2B2220]">{formatINR(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#C17D3C]">
                  <span>Member Discount (10%):</span>
                  <span className="font-semibold">-{formatINR(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>White Glove Express Shipping:</span>
                <span className="font-semibold text-[#2B2220]">
                  {isFreeDelivery ? 'FREE (Orders > ₹1.5L)' : formatINR(shippingFee)}
                </span>
              </div>

              <div className="border-t border-[#E6DDD0] pt-2 flex justify-between items-end text-sm">
                <span className="font-bold text-[#2B2220]">Grand Total:</span>
                <span className="font-bold text-[#C17D3C] text-lg">
                  {formatINR(grandTotal)}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3.5 bg-[#2B2220] hover:bg-[#C17D3C] text-white rounded-xl font-bold uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Express Checkout</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
