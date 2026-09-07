import React, { useState } from 'react';
import { Sparkles, Sliders, CheckCircle2, ShieldCheck, Ruler, ArrowRight, Upload, HelpCircle, FileText, AlertCircle } from 'lucide-react';
import { CustomFurnitureRequest } from '../types';
import { sanitizeText, sanitizeEmail, sanitizePhone, clampNumber, isValidEmail, rateLimiter } from '../lib/security';
import { atelierStore } from '../lib/store';

interface CustomFurnitureStudioProps {
  onSubmitRequest?: (request: CustomFurnitureRequest) => void;
  onOpenStylist?: () => void;
}

export const CustomFurnitureStudio: React.FC<CustomFurnitureStudioProps> = ({
  onSubmitRequest,
  onOpenStylist,
}) => {
  const [itemType, setItemType] = useState<CustomFurnitureRequest['itemType']>('sectional');
  const [widthCm, setWidthCm] = useState<number>(240);
  const [depthCm, setDepthCm] = useState<number>(100);
  const [heightCm, setHeightCm] = useState<number>(85);
  const [woodSpecies, setWoodSpecies] = useState<CustomFurnitureRequest['woodSpecies']>('solid-teak');
  const [upholsteryFabric, setUpholsteryFabric] = useState<CustomFurnitureRequest['upholsteryFabric']>('ochre-velvet');
  const [hasBrassAccents, setHasBrassAccents] = useState<boolean>(true);
  const [hasFlutedSlats, setHasFlutedSlats] = useState<boolean>(false);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  // Customer Contact State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedRequest, setSubmittedRequest] = useState<CustomFurnitureRequest | null>(null);

  // Dynamic Price Estimator formula
  const calculateEstimatedPrice = () => {
    let basePrice = 50000;
    if (itemType === 'sectional') basePrice = 145000;
    if (itemType === 'dining-table') basePrice = 95000;
    if (itemType === 'canopy-bed') basePrice = 110000;
    if (itemType === 'credenza') basePrice = 82000;
    if (itemType === 'accent-chair') basePrice = 45000;
    if (itemType === 'desk') basePrice = 68000;
    if (itemType === 'wardrobe') basePrice = 125000;
    if (itemType === 'bar-cabinet') basePrice = 78000;

    const safeW = clampNumber(widthCm, 40, 500, 240);
    const safeD = clampNumber(depthCm, 30, 300, 100);
    const safeH = clampNumber(heightCm, 30, 300, 85);

    // Dimension volume multiplier
    const volumeFactor = (safeW * safeD * safeH) / (200 * 90 * 80);
    let total = basePrice * Math.max(0.8, volumeFactor);

    // Wood premium
    if (woodSpecies === 'solid-teak') total *= 1.15;
    if (woodSpecies === 'white-oak') total *= 1.10;

    // Brass / Fluted accents
    if (hasBrassAccents) total += 8000;
    if (hasFlutedSlats) total += 12000;

    return Math.round(total / 500) * 500;
  };

  const estimatedPriceINR = calculateEstimatedPrice();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const rateCheck = rateLimiter.isAllowed('bespoke-request', 3, 60000);
    if (!rateCheck.allowed) {
      setFormError(`Too many custom quote requests submitted. Please wait ${rateCheck.waitSeconds} seconds.`);
      return;
    }

    const cleanName = sanitizeText(name, 80);
    const cleanPhone = sanitizePhone(phone, 20);
    const cleanEmail = sanitizeEmail(email, 100);
    const cleanCity = sanitizeText(city, 60);
    const cleanNotes = sanitizeText(specialInstructions, 600);

    if (!cleanName || cleanName.length < 2) {
      setFormError('Please enter a valid name (minimum 2 characters).');
      return;
    }

    if (!cleanPhone || cleanPhone.length < 8) {
      setFormError('Please enter a valid phone number with area/country code.');
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    if (!cleanCity || cleanCity.length < 2) {
      setFormError('Please enter your city/location in India.');
      return;
    }

    const safeW = clampNumber(widthCm, 40, 500, 240);
    const safeD = clampNumber(depthCm, 30, 300, 100);
    const safeH = clampNumber(heightCm, 30, 300, 85);

    const req: CustomFurnitureRequest = {
      requestId: `OCHRE-BESPOKE-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      city: cleanCity,
      itemType,
      customWidthCm: safeW,
      customDepthCm: safeD,
      customHeightCm: safeH,
      woodSpecies,
      upholsteryFabric,
      hasBrassAccents,
      hasFlutedSlats,
      specialInstructions: cleanNotes,
      estimatedPriceINR,
      submittedAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      status: 'Submitted for Artisan Quote',
    };

    setSubmittedRequest(req);
    atelierStore.addBespokeRequest(req);
    if (onSubmitRequest) onSubmitRequest(req);
  };

  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-in fade-in duration-300">
      {/* Hero Header */}
      <div className="bg-[#2B2220] text-[#FAF6F0] rounded-3xl p-5 sm:p-12 lg:p-16 border border-[#423430] relative overflow-hidden space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C17D3C]/20 border border-[#C17D3C]/40 text-[#C17D3C] text-xs font-bold uppercase tracking-widest">
          <Sparkles size={14} />
          <span>Bespoke Artisan Studio</span>
        </div>

        <div className="max-w-3xl space-y-3">
          <h1 className="font-serif-brand text-3xl sm:text-5xl font-medium leading-tight">
            Tailor Any Furniture Piece To Your Exact Room Dimensions.
          </h1>
          <p className="text-xs sm:text-sm text-[#D8CEBD] leading-relaxed">
            Need a 12-seater teak dining table, a custom L-shaped sofa for an awkward nook, or a carved wardrobe? Our master woodworkers in Rajasthan, backed by over 5 decades of artisan woodworking heritage, build custom solid timber pieces according to your blueprints.
          </p>
        </div>

        {/* 100% Solid Timber Commitment Badge */}
        <div className="inline-flex flex-wrap items-center gap-4 pt-2 border-t border-white/10 text-xs text-[#D8CEBD]">
          <div className="flex items-center gap-1.5 text-[#C17D3C] font-bold">
            <ShieldCheck size={16} />
            <span>50+ Years Artisan Experience</span>
          </div>
          <span className="text-white/40">&bull;</span>
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <ShieldCheck size={16} />
            <span>100% Solid Wood Guarantee</span>
          </div>
          <span className="text-white/40">&bull;</span>
          <span>0% Compressed Wood / MDF / Particle Board</span>
          <span className="text-white/40">&bull;</span>
          <span>10-Year Frame Structural Warranty</span>
        </div>
      </div>

      {submittedRequest ? (
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#E6DDD0] shadow-xl text-center max-w-2xl mx-auto space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 bg-[#C17D3C]/10 rounded-full flex items-center justify-center text-[#C17D3C] mx-auto">
            <CheckCircle2 size={36} />
          </div>

          <div className="space-y-2">
            <h2 className="font-serif-brand text-2xl sm:text-3xl font-bold text-[#2B2220]">
              Custom Order Quote Submitted!
            </h2>
            <p className="text-xs text-[#6B5B54]">
              Thank you, <strong>{submittedRequest.customerName}</strong>. Request Reference:{' '}
              <span className="text-[#C17D3C] font-mono font-bold">{submittedRequest.requestId}</span>
            </p>
          </div>

          <div className="p-4 bg-[#FAF6F0] rounded-xl border border-[#E6DDD0] text-left text-xs space-y-2">
            <div className="flex justify-between border-b border-[#E6DDD0] pb-2 font-bold text-[#2B2220]">
              <span>Estimated Custom Price:</span>
              <span className="text-[#C17D3C] font-extrabold">{formatINR(submittedRequest.estimatedPriceINR)}</span>
            </div>
            <div className="flex justify-between text-[#6B5B54]">
              <span>Selected Wood Species:</span>
              <span className="font-semibold capitalize">{submittedRequest.woodSpecies.replace('-', ' ')}</span>
            </div>
            <div className="flex justify-between text-[#6B5B54]">
              <span>Custom Dimensions:</span>
              <span className="font-semibold">
                {submittedRequest.customWidthCm}W x {submittedRequest.customDepthCm}D x {submittedRequest.customHeightCm}H cm
              </span>
            </div>
            <div className="flex justify-between text-[#6B5B54]">
              <span>City:</span>
              <span className="font-semibold">{submittedRequest.city}</span>
            </div>
          </div>

          <p className="text-xs text-[#6B5B54]">
            An Ochre Senior Design Stylist will call you within <strong>4 hours</strong> at <strong>{submittedRequest.phone}</strong> to confirm wood grain samples, CAD drawing specs, and final production timelines.
          </p>

          <button
            onClick={() => setSubmittedRequest(null)}
            className="px-6 py-3 bg-[#2B2220] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#C17D3C] transition-colors cursor-pointer"
          >
            Create Another Custom Design
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form Column */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-4 sm:p-8 border border-[#E6DDD0] shadow-sm space-y-6 sm:space-y-8">
            <h3 className="font-serif-brand text-2xl font-medium text-[#2B2220]">
              1. Select Furniture Blueprint
            </h3>

            {/* Furniture Category Selector Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'sectional', label: 'Custom Sofa / Sectional', icon: '🛋️' },
                { id: 'dining-table', label: 'Dining Table', icon: '🍽️' },
                { id: 'canopy-bed', label: 'Bed Frame', icon: '🛏️' },
                { id: 'credenza', label: 'Sideboard / Credenza', icon: '📺' },
                { id: 'accent-chair', label: 'Accent Armchair', icon: '🪑' },
                { id: 'desk', label: 'Executive Writing Desk', icon: '💻' },
                { id: 'wardrobe', label: 'Solid Teak Wardrobe', icon: '🚪' },
                { id: 'bar-cabinet', label: 'Bar Cabinet', icon: '🍷' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setItemType(item.id as any)}
                  className={`p-4 rounded-xl border text-center space-y-2 transition-all cursor-pointer ${
                    itemType === item.id
                      ? 'border-[#C17D3C] bg-[#C17D3C]/5 font-bold shadow-xs'
                      : 'border-[#E6DDD0] hover:border-[#2B2220] bg-[#FAF6F0]/50'
                  }`}
                >
                  <div className="text-2xl">{item.icon}</div>
                  <div className="text-xs text-[#2B2220] font-medium leading-snug">{item.label}</div>
                </button>
              ))}
            </div>

            {/* Custom Dimensions Slider/Inputs */}
            <div className="space-y-4 pt-4 border-t border-[#E6DDD0]">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-brand text-2xl font-medium text-[#2B2220] flex items-center gap-2">
                  <Ruler size={20} className="text-[#C17D3C]" />
                  <span>2. Specify Custom Dimensions (Centimeters)</span>
                </h3>
                <span className="text-xs text-[#6B5B54]">1 inch = 2.54 cm</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-[#FAF6F0] p-5 rounded-xl border border-[#E6DDD0]">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#2B2220]">
                    Width: <span className="text-[#C17D3C] font-mono">{widthCm} cm</span> ({Math.round(widthCm / 2.54)} in)
                  </label>
                  <input
                    type="range"
                    min={60}
                    max={400}
                    value={widthCm}
                    onChange={(e) => setWidthCm(Number(e.target.value))}
                    className="w-full accent-[#C17D3C] cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#2B2220]">
                    Depth: <span className="text-[#C17D3C] font-mono">{depthCm} cm</span> ({Math.round(depthCm / 2.54)} in)
                  </label>
                  <input
                    type="range"
                    min={40}
                    max={200}
                    value={depthCm}
                    onChange={(e) => setDepthCm(Number(e.target.value))}
                    className="w-full accent-[#C17D3C] cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#2B2220]">
                    Height: <span className="text-[#C17D3C] font-mono">{heightCm} cm</span> ({Math.round(heightCm / 2.54)} in)
                  </label>
                  <input
                    type="range"
                    min={40}
                    max={240}
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full accent-[#C17D3C] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* 100% Solid Timber Selection */}
            <div className="space-y-4 pt-4 border-t border-[#E6DDD0]">
              <h3 className="font-serif-brand text-2xl font-medium text-[#2B2220]">
                3. Choose 100% Solid Timber Species
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: 'solid-teak',
                    name: 'Reclaimed Indian Teak Wood (CP / Giri Teak)',
                    desc: 'High natural resin, water-resistant, rich warm golden grain.',
                  },
                  {
                    id: 'solid-sheesham',
                    name: 'Solid Sheesham Wood (Indian Rosewood)',
                    desc: 'High density, prominent organic dark grain stripes.',
                  },
                  {
                    id: 'white-oak',
                    name: 'European Solid White Oak',
                    desc: 'Nordic aesthetic, tight straight grain with smoked matte finish.',
                  },
                  {
                    id: 'solid-ash',
                    name: 'Kiln-Dried Solid Ash Timber',
                    desc: 'Light honey tone with excellent flexibility and strength.',
                  },
                ].map((wood) => (
                  <button
                    key={wood.id}
                    type="button"
                    onClick={() => setWoodSpecies(wood.id as any)}
                    className={`p-4 rounded-xl border text-left space-y-1 transition-all cursor-pointer ${
                      woodSpecies === wood.id
                        ? 'border-[#C17D3C] bg-[#C17D3C]/10'
                        : 'border-[#E6DDD0] hover:border-[#2B2220] bg-white'
                    }`}
                  >
                    <div className="font-bold text-xs text-[#2B2220]">{wood.name}</div>
                    <div className="text-[11px] text-[#6B5B54]">{wood.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Upholstery Fabric Selection */}
            <div className="space-y-4 pt-4 border-t border-[#E6DDD0]">
              <h3 className="font-serif-brand text-2xl font-medium text-[#2B2220]">
                4. Select Fabric & Craft Details
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'ochre-velvet', label: 'Terracotta Velvet' },
                  { id: 'belgian-boucle', label: 'Belgian Bouclé Ivory' },
                  { id: 'washed-linen', label: 'Washed Linen Oatmeal' },
                  { id: 'saddle-leather', label: 'Italian Cognac Leather' },
                  { id: 'none', label: 'None (Pure Wood Only)' },
                ].map((fab) => (
                  <button
                    key={fab.id}
                    type="button"
                    onClick={() => setUpholsteryFabric(fab.id as any)}
                    className={`p-3 rounded-lg border text-xs font-semibold text-center transition-all cursor-pointer ${
                      upholsteryFabric === fab.id
                        ? 'border-[#C17D3C] bg-[#C17D3C] text-white'
                        : 'border-[#E6DDD0] hover:border-[#2B2220] text-[#2B2220]'
                    }`}
                  >
                    {fab.label}
                  </button>
                ))}
              </div>

              {/* Accents Checkboxes */}
              <div className="flex flex-wrap gap-4 pt-2">
                <label className="flex items-center gap-2 text-xs font-medium text-[#2B2220] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasBrassAccents}
                    onChange={(e) => setHasBrassAccents(e.target.checked)}
                    className="accent-[#C17D3C]"
                  />
                  <span>Add Antiqued Solid Brass Foot Caps & Pulls (+₹8,000)</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-medium text-[#2B2220] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasFlutedSlats}
                    onChange={(e) => setHasFlutedSlats(e.target.checked)}
                    className="accent-[#C17D3C]"
                  />
                  <span>Hand-Carved Fluted Wood Slat Panels (+₹12,000)</span>
                </label>
              </div>
            </div>

            {/* Special Instructions */}
            <div className="space-y-2 pt-4 border-t border-[#E6DDD0]">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-[#2B2220]">
                  5. Room Layout Notes or Blueprint Requests:
                </label>
                <span className="text-[10px] text-[#9E8E87]">{specialInstructions.length}/600</span>
              </div>
              <textarea
                maxLength={600}
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(sanitizeText(e.target.value, 600))}
                placeholder="Mention specific room entrance clearance, wall socket cutouts, or custom stain requests..."
                rows={3}
                className="w-full p-3 bg-[#FAF6F0] border border-[#E6DDD0] rounded-xl text-xs focus:outline-none focus:border-[#C17D3C]"
              />
            </div>
          </div>

          {/* Right Live Estimate & Contact Form Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#2B2220] text-[#FAF6F0] rounded-2xl p-4 sm:p-6 border border-[#423430] shadow-lg space-y-6 lg:sticky lg:top-24">
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C17D3C] block">
                  Estimated Custom Investment
                </span>
                <div className="text-3xl font-serif-brand font-medium text-white mt-1">
                  {formatINR(estimatedPriceINR)}
                </div>
                <p className="text-[11px] text-[#D8CEBD] mt-1">
                  Includes 100% Solid Timber, custom CAD blueprints, GST, and White Glove Delivery in India.
                </p>
              </div>

              {formError && (
                <div className="p-3 bg-rose-950/80 border border-rose-600/50 text-rose-200 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0 text-rose-400" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Form Input for Quote Request */}
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <h4 className="font-serif-brand font-medium text-lg text-white">
                  Request Custom Consultation
                </h4>

                <div className="space-y-3">
                  <div>
                    <input
                      type="text"
                      required
                      maxLength={80}
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(sanitizeText(e.target.value, 80))}
                      className="w-full px-3 py-2.5 bg-[#3A2E2B] border border-[#423430] rounded-lg text-xs text-white placeholder-[#9E8E87] focus:outline-none focus:border-[#C17D3C]"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      required
                      maxLength={20}
                      placeholder="Phone Number (e.g. +91 98765 43210)"
                      value={phone}
                      onChange={(e) => setPhone(sanitizePhone(e.target.value, 20))}
                      className="w-full px-3 py-2.5 bg-[#3A2E2B] border border-[#423430] rounded-lg text-xs text-white placeholder-[#9E8E87] focus:outline-none focus:border-[#C17D3C]"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      required
                      maxLength={100}
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(sanitizeEmail(e.target.value, 100))}
                      className="w-full px-3 py-2.5 bg-[#3A2E2B] border border-[#423430] rounded-lg text-xs text-white placeholder-[#9E8E87] focus:outline-none focus:border-[#C17D3C]"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      required
                      maxLength={60}
                      placeholder="City / Location in India"
                      value={city}
                      onChange={(e) => setCity(sanitizeText(e.target.value, 60))}
                      className="w-full px-3 py-2.5 bg-[#3A2E2B] border border-[#423430] rounded-lg text-xs text-white placeholder-[#9E8E87] focus:outline-none focus:border-[#C17D3C]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#C17D3C] hover:bg-[#9E5B23] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Submit Custom Quote Request</span>
                  <ArrowRight size={16} />
                </button>
              </form>

              {/* Assistance Callout */}
              <div className="pt-4 border-t border-white/10 text-xs text-[#D8CEBD] space-y-2">
                <p>Prefer talking to an architect or interior designer first?</p>
                {onOpenStylist && (
                  <button
                    type="button"
                    onClick={onOpenStylist}
                    className="text-[#C17D3C] font-bold underline hover:text-white transition-colors cursor-pointer"
                  >
                    Schedule Free Virtual Design Call &rarr;
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
