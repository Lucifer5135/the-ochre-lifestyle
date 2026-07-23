import React, { useState } from 'react';
import { X, Search, Truck, Clock, ShieldCheck, MapPin, CheckCircle2, ChevronRight, PackageCheck } from 'lucide-react';
import { OrderTrackInfo } from '../types';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DEMO_ORDERS: Record<string, OrderTrackInfo> = {
  'OCHRE-8921': {
    orderId: 'OCHRE-8921',
    customerName: 'Ananya Sharma',
    phone: '9819238472',
    orderDate: '18 Jul 2026',
    estimatedDeliveryDate: '26 Jul 2026',
    currentStepIndex: 2,
    deliveryAddress: '402 Sunset Towers, Worli Sea Face, Mumbai - 400018',
    carrierName: 'The Ochre White-Glove Direct Logistics',
    trackingNumber: 'OG-MUM-884912',
    isCustomOrder: false,
    items: [
      {
        name: 'The Ochre Curved Sectional Sofa',
        finish: 'Raw Plantation Teak / Terracotta Velvet',
        qty: 1,
        priceINR: 185000,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=300&q=80',
      },
      {
        name: 'Aura Hand-Tufted Wool & Jute Area Rug',
        finish: '8x10 ft Ivory/Terracotta',
        qty: 1,
        priceINR: 38500,
        image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=300&q=80',
      },
    ],
    steps: [
      {
        title: 'Order Confirmed & Solid Timber Selected',
        description: 'Kiln-dried plantation teak planks hand-selected for zero flaws.',
        date: '18 Jul 2026, 10:30 AM',
        isCompleted: true,
        isCurrent: false,
      },
      {
        title: 'Master Artisan Hand-Carving & Joinery',
        description: 'Frame crafted using mortise-and-tenon joinery in Jodhpur workshop.',
        date: '21 Jul 2026, 04:15 PM',
        isCompleted: true,
        isCurrent: false,
      },
      {
        title: 'Upholstery & High-Resilience Cushioning',
        description: 'Cotton velvet upholstery tailored with stain-resistant protective coat.',
        date: '23 Jul 2026, 09:00 AM',
        isCompleted: false,
        isCurrent: true,
      },
      {
        title: 'Quality Inspection & Wooden Crating',
        description: '100% Solid frame stress-test audit & climate-sealed crating.',
        isCompleted: false,
        isCurrent: false,
      },
      {
        title: 'White Glove Transit & In-Home Assembly',
        description: 'Scheduled room placement and packaging removal by Ochre technicians.',
        isCompleted: false,
        isCurrent: false,
      },
    ],
  },
  'OCHRE-SWATCH-341': {
    orderId: 'OCHRE-SWATCH-341',
    customerName: 'Rohan Verma',
    phone: '9876543210',
    orderDate: '21 Jul 2026',
    estimatedDeliveryDate: '24 Jul 2026',
    currentStepIndex: 3,
    deliveryAddress: 'House No 14, Koramangala 4th Block, Bengaluru - 560034',
    carrierName: 'Bluedart Express Courier',
    trackingNumber: 'BD-BLR-9921',
    isCustomOrder: false,
    items: [
      {
        name: 'Free Ochre Swatch Box (5 Swatches)',
        finish: 'Teak Stains + Terracotta Velvet & Bouclé',
        qty: 1,
        priceINR: 0,
        image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=300&q=80',
      },
    ],
    steps: [
      {
        title: 'Swatch Kit Requested',
        description: 'Fabric and teak wood chips packaged in presentation box.',
        date: '21 Jul 2026',
        isCompleted: true,
        isCurrent: false,
      },
      {
        title: 'Dispatched via Bluedart Express',
        description: 'Air express transit initiated from Jodhpur hub.',
        date: '22 Jul 2026',
        isCompleted: true,
        isCurrent: false,
      },
      {
        title: 'Out for Local Delivery in Bengaluru',
        description: 'On route with delivery agent (Ramesh - 9821019283).',
        date: '23 Jul 2026',
        isCompleted: false,
        isCurrent: true,
      },
      {
        title: 'Delivered to Doorstep',
        description: 'Swatch box delivered for home testing.',
        isCompleted: false,
        isCurrent: false,
      },
    ],
  },
};

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [inputQuery, setInputQuery] = useState('OCHRE-8921');
  const [activeOrder, setActiveOrder] = useState<OrderTrackInfo | null>(DEMO_ORDERS['OCHRE-8921']);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputQuery.trim().toUpperCase();
    if (DEMO_ORDERS[clean]) {
      setActiveOrder(DEMO_ORDERS[clean]);
      setErrorMsg(null);
    } else {
      setErrorMsg(`No active order found for "${inputQuery}". Try sample ID "OCHRE-8921" or "OCHRE-SWATCH-341".`);
    }
  };

  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl border border-[#E6DDD0] shadow-2xl overflow-hidden my-8 p-6 sm:p-8 space-y-6">
        {/* Header & Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-[#FAF6F0] hover:bg-[#2B2220] hover:text-white rounded-full transition-colors text-[#2B2220] cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 border-b border-[#E6DDD0] pb-4">
          <div className="p-2.5 bg-[#C17D3C]/10 rounded-xl text-[#C17D3C]">
            <Truck size={24} />
          </div>
          <div>
            <h3 className="font-serif-brand font-medium text-2xl text-[#2B2220]">
              Track Furniture Order & Swatch Kit
            </h3>
            <p className="text-xs text-[#6B5B54]">
              Real-time craftsman timeline, solid timber seasoning logs & White Glove delivery status
            </p>
          </div>
        </div>

        {/* Order ID Input Form */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3.5 top-3.5 text-[#C17D3C]" />
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Enter Order ID (e.g. OCHRE-8921 or OCHRE-SWATCH-341)"
              className="w-full pl-10 pr-4 py-3 bg-[#FAF6F0] border border-[#E6DDD0] rounded-xl text-xs font-semibold focus:outline-none focus:border-[#C17D3C] text-[#2B2220]"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-[#2B2220] hover:bg-[#C17D3C] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Track Status
          </button>
        </form>

        {/* Sample Quick Preset Chips */}
        <div className="flex items-center gap-2 text-xs text-[#6B5B54]">
          <span className="font-bold text-[#2B2220]">Sample Order IDs:</span>
          <button
            onClick={() => {
              setInputQuery('OCHRE-8921');
              setActiveOrder(DEMO_ORDERS['OCHRE-8921']);
              setErrorMsg(null);
            }}
            className="px-2.5 py-1 bg-[#FAF6F0] hover:bg-[#C17D3C] hover:text-white rounded-md text-[11px] font-mono transition-colors cursor-pointer"
          >
            OCHRE-8921 (Sectional Sofa)
          </button>

          <button
            onClick={() => {
              setInputQuery('OCHRE-SWATCH-341');
              setActiveOrder(DEMO_ORDERS['OCHRE-SWATCH-341']);
              setErrorMsg(null);
            }}
            className="px-2.5 py-1 bg-[#FAF6F0] hover:bg-[#C17D3C] hover:text-white rounded-md text-[11px] font-mono transition-colors cursor-pointer"
          >
            OCHRE-SWATCH-341 (Sample Kit)
          </button>
        </div>

        {errorMsg && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl">
            {errorMsg}
          </div>
        )}

        {activeOrder && (
          <div className="space-y-6 pt-2">
            {/* Order Brief Summary Header */}
            <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#E6DDD0] grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-[#6B5B54] block">Order Number:</span>
                <strong className="text-[#2B2220] font-mono text-sm">{activeOrder.orderId}</strong>
              </div>
              <div>
                <span className="text-[#6B5B54] block">Customer Name:</span>
                <strong className="text-[#2B2220] font-medium">{activeOrder.customerName}</strong>
              </div>
              <div>
                <span className="text-[#6B5B54] block">Estimated Delivery:</span>
                <strong className="text-[#C17D3C] font-bold">{activeOrder.estimatedDeliveryDate}</strong>
              </div>
              <div>
                <span className="text-[#6B5B54] block">Courier Partner:</span>
                <strong className="text-[#2B2220] font-medium">{activeOrder.carrierName}</strong>
              </div>
            </div>

            {/* Delivery Timeline Progress Bar */}
            <div className="space-y-4">
              <h4 className="font-serif-brand font-medium text-lg text-[#2B2220]">
                Production & Delivery Stage Logs
              </h4>

              <div className="space-y-4 relative pl-6 border-l-2 border-[#E6DDD0]">
                {activeOrder.steps.map((step, index) => (
                  <div key={index} className="relative pl-4 space-y-1">
                    {/* Status Circle Bullet */}
                    <div
                      className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        step.isCompleted
                          ? 'bg-[#C17D3C] text-white'
                          : step.isCurrent
                          ? 'bg-[#2B2220] text-white ring-4 ring-[#C17D3C]/30 animate-pulse'
                          : 'bg-[#FAF6F0] text-[#9E8E87] border border-[#E6DDD0]'
                      }`}
                    >
                      {step.isCompleted ? <CheckCircle2 size={14} /> : index + 1}
                    </div>

                    <div className="flex items-center justify-between">
                      <h5 className={`font-serif-brand font-bold text-sm ${step.isCurrent ? 'text-[#C17D3C]' : 'text-[#2B2220]'}`}>
                        {step.title}
                      </h5>
                      {step.date && <span className="text-[11px] text-[#9E8E87]">{step.date}</span>}
                    </div>

                    <p className="text-xs text-[#6B5B54] leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Ordered Items List */}
            <div className="pt-4 border-t border-[#E6DDD0] space-y-3">
              <h4 className="font-serif-brand font-medium text-sm text-[#2B2220]">
                Items in This Shipment:
              </h4>

              <div className="space-y-2">
                {activeOrder.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#FAF6F0] rounded-xl border border-[#E6DDD0] flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-lg object-cover bg-white"
                      />
                      <div>
                        <h5 className="font-serif-brand font-bold text-[#2B2220]">{item.name}</h5>
                        <p className="text-[11px] text-[#6B5B54]">{item.finish}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-[#2B2220]">
                        {item.priceINR === 0 ? 'FREE' : formatINR(item.priceINR)}
                      </span>
                      <span className="block text-[11px] text-[#9E8E87]">Qty: {item.qty}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Address & Assistance Callout */}
            <div className="p-4 bg-white rounded-xl border border-[#E6DDD0] text-xs space-y-1 flex items-start gap-2">
              <MapPin size={16} className="text-[#C17D3C] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#2B2220]">White-Glove Delivery Destination:</strong>
                <p className="text-[#6B5B54]">{activeOrder.deliveryAddress}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
