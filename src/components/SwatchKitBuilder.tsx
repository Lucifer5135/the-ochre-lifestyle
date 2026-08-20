import React, { useState } from 'react';
import { Sparkles, Check, Package, MapPin, Truck, ArrowRight, AlertCircle } from 'lucide-react';
import { ALL_SWATCHES } from '../data/swatches';
import { Swatch } from '../types';
import { sanitizeText, sanitizePhone, sanitizePincode, isValidPincode, rateLimiter } from '../lib/security';
import { atelierStore } from '../lib/store';

export const SwatchKitBuilder: React.FC = () => {
  const [selectedSwatches, setSelectedSwatches] = useState<Swatch[]>([
    ALL_SWATCHES[0], // Ochre Terracotta Velvet
    ALL_SWATCHES[1], // Belgian Boucle Ivory
    ALL_SWATCHES[6], // Raw Plantation Teak
  ]);

  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: '',
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [orderedSuccess, setOrderedSuccess] = useState(false);

  const toggleSwatch = (swatch: Swatch) => {
    if (selectedSwatches.some((s) => s.id === swatch.id)) {
      setSelectedSwatches(selectedSwatches.filter((s) => s.id !== swatch.id));
    } else {
      if (selectedSwatches.length < 5) {
        setSelectedSwatches([...selectedSwatches, swatch]);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const rateCheck = rateLimiter.isAllowed('swatch-order', 3, 60000);
    if (!rateCheck.allowed) {
      setFormError(`Too many requests. Please wait ${rateCheck.waitSeconds} seconds before trying again.`);
      return;
    }

    if (selectedSwatches.length === 0) {
      setFormError('Please select at least 1 swatch sample (up to 5).');
      return;
    }

    const cleanName = sanitizeText(shippingDetails.name, 80);
    const cleanPhone = sanitizePhone(shippingDetails.phone, 20);
    const cleanPincode = sanitizePincode(shippingDetails.pincode);
    const cleanAddress = sanitizeText(shippingDetails.address, 300);

    if (!cleanName || cleanName.length < 2) {
      setFormError('Please enter a valid full name.');
      return;
    }

    if (!cleanPhone || cleanPhone.length < 8) {
      setFormError('Please enter a valid contact phone number.');
      return;
    }

    if (!isValidPincode(cleanPincode)) {
      setFormError('Please enter a valid 6-digit Indian PIN code (e.g. 400001).');
      return;
    }

    if (!cleanAddress || cleanAddress.length < 5) {
      setFormError('Please enter complete street delivery address.');
      return;
    }

    setShippingDetails({
      name: cleanName,
      phone: cleanPhone,
      pincode: cleanPincode,
      address: cleanAddress,
    });

    const swatchRecord = {
      orderId: `OCHRE-SWATCH-${Math.floor(100 + Math.random() * 900)}`,
      customerName: cleanName,
      phone: cleanPhone,
      pincode: cleanPincode,
      address: cleanAddress,
      swatches: selectedSwatches,
      status: 'Pending Dispatch' as const,
      requestedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    };

    atelierStore.addSwatchOrder(swatchRecord);
    setOrderedSuccess(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10" id="swatch-kit">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C17D3C]/10 text-[#C17D3C] text-xs font-semibold uppercase tracking-widest border border-[#C17D3C]/20">
          <Sparkles size={14} />
          <span>Complimentary At-Home Material Testing</span>
        </div>

        <h2 className="font-serif-brand text-3xl sm:text-4xl font-medium text-[#2B2220]">
          Order Your Free Swatch Sample Kit
        </h2>

        <p className="text-xs sm:text-sm text-[#6B5B54] leading-relaxed">
          Touch and test our stain-resistant velvets, Belgian flax linens, and solid teak wood finishes in your home natural lighting before purchasing. Complimentary delivery across India.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-[#E6DDD0] rounded-2xl p-6 sm:p-8 shadow-xl">
        {/* Left: Swatch Selector */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between border-b border-[#E6DDD0] pb-3">
            <h3 className="font-serif-brand font-medium text-lg text-[#2B2220]">
              Select Up to 5 Swatches ({selectedSwatches.length}/5 Selected)
            </h3>
            <span className="text-xs text-[#C17D3C] font-semibold">
              Free Delivery & Zero Fees
            </span>
          </div>

          {/* Swatches Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ALL_SWATCHES.map((swatch) => {
              const isSelected = selectedSwatches.some((s) => s.id === swatch.id);
              return (
                <div
                  key={swatch.id}
                  onClick={() => toggleSwatch(swatch)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-[#C17D3C] bg-[#C17D3C]/5 ring-2 ring-[#C17D3C]/20'
                      : 'border-[#E6DDD0] hover:border-[#2B2220] bg-[#FAF6F0]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-8 h-8 rounded-full border border-black/20 shrink-0 shadow-xs"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <div>
                      <h4 className="font-semibold text-xs text-[#2B2220] truncate max-w-[150px]">
                        {swatch.name}
                      </h4>
                      <p className="text-[10px] text-[#6B5B54] capitalize">
                        {swatch.category} finish
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#C17D3C] border-[#C17D3C] text-white'
                        : 'border-[#E6DDD0] bg-white'
                    }`}
                  >
                    {isSelected && <Check size={12} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Shipping Address Form or Confirmation */}
        <div className="lg:col-span-5 bg-[#FAF6F0] p-6 rounded-xl border border-[#E6DDD0] space-y-6">
          {orderedSuccess ? (
            <div className="text-center space-y-4 py-8">
              <div className="w-16 h-16 bg-[#C17D3C] text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Package size={32} />
              </div>
              <h3 className="font-serif-brand font-medium text-2xl text-[#2B2220]">
                Swatch Box Confirmed!
              </h3>
              <p className="text-xs text-[#6B5B54] max-w-xs mx-auto">
                Your customized swatch sample box containing {selectedSwatches.length} fabric and wood samples is being dispatched via Bluedart Express.
              </p>

              <div className="p-3 bg-white rounded-lg border border-[#E6DDD0] text-xs text-[#2B2220]">
                <strong>Tracking Code:</strong> OCHRE-SWATCH-IN-{Math.floor(100000 + Math.random() * 900000)}
              </div>

              <button
                onClick={() => setOrderedSuccess(false)}
                className="text-xs text-[#C17D3C] font-semibold underline hover:text-[#9E5B23] cursor-pointer"
              >
                Order Another Sample Box
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2B2220] border-b border-[#E6DDD0] pb-2">
                <Truck size={16} className="text-[#C17D3C]" />
                <span>Delivery Address (India)</span>
              </div>

              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0 text-rose-600" />
                  <span>{formError}</span>
                </div>
              )}

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-semibold text-[#2B2220]">
                    Full Name *
                  </label>
                  <span className="text-[10px] text-[#9E8E87]">{shippingDetails.name.length}/80</span>
                </div>
                <input
                  type="text"
                  required
                  maxLength={80}
                  value={shippingDetails.name}
                  onChange={(e) => setShippingDetails({ ...shippingDetails, name: sanitizeText(e.target.value, 80) })}
                  placeholder="e.g. Radhika Sharma"
                  className="w-full px-3 py-2 bg-white border border-[#E6DDD0] rounded-lg text-xs focus:outline-none focus:border-[#C17D3C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] font-semibold text-[#2B2220]">
                      Phone Number *
                    </label>
                    <span className="text-[10px] text-[#9E8E87]">{shippingDetails.phone.length}/20</span>
                  </div>
                  <input
                    type="tel"
                    required
                    maxLength={20}
                    value={shippingDetails.phone}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, phone: sanitizePhone(e.target.value, 20) })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 bg-white border border-[#E6DDD0] rounded-lg text-xs focus:outline-none focus:border-[#C17D3C]"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] font-semibold text-[#2B2220]">
                      6-Digit PIN Code *
                    </label>
                    <span className="text-[10px] text-[#9E8E87]">{shippingDetails.pincode.length}/6</span>
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={shippingDetails.pincode}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, pincode: sanitizePincode(e.target.value) })}
                    placeholder="400001"
                    className="w-full px-3 py-2 bg-white border border-[#E6DDD0] rounded-lg text-xs focus:outline-none focus:border-[#C17D3C]"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-semibold text-[#2B2220]">
                    Street Address *
                  </label>
                  <span className="text-[10px] text-[#9E8E87]">{shippingDetails.address.length}/300</span>
                </div>
                <textarea
                  required
                  rows={2}
                  maxLength={300}
                  value={shippingDetails.address}
                  onChange={(e) => setShippingDetails({ ...shippingDetails, address: sanitizeText(e.target.value, 300) })}
                  placeholder="Apartment, building, street, area..."
                  className="w-full px-3 py-2 bg-white border border-[#E6DDD0] rounded-lg text-xs focus:outline-none focus:border-[#C17D3C]"
                />
              </div>

              <button
                type="submit"
                disabled={selectedSwatches.length === 0}
                className="w-full py-3.5 bg-[#2B2220] hover:bg-[#C17D3C] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                <span>Dispatch Free Swatch Box</span>
                <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
