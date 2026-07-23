import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Lock, Truck, Cookie, Check } from 'lucide-react';

interface TermsPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'solid-wood' | 'terms' | 'privacy' | 'shipping' | 'cookies';
}

export const TermsPolicyModal: React.FC<TermsPolicyModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'solid-wood',
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'solid-wood' | 'terms' | 'privacy' | 'shipping' | 'cookies'>(
    defaultTab
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl border border-[#E6DDD0] shadow-2xl overflow-hidden my-8 p-6 sm:p-8 space-y-6 max-h-[85vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-[#FAF6F0] hover:bg-[#2B2220] hover:text-white rounded-full transition-colors text-[#2B2220] cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="border-b border-[#E6DDD0] pb-4">
          <h3 className="font-serif-brand font-medium text-2xl text-[#2B2220]">
            The Ochre Lifestyle Guidelines & Policies
          </h3>
          <p className="text-xs text-[#6B5B54]">
            Transparent terms, binding 100% solid wood guarantees, and privacy commitments
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-[#E6DDD0] pb-3 text-xs font-semibold">
          {[
            { id: 'solid-wood', label: '100% Solid Timber Guarantee', icon: ShieldCheck },
            { id: 'terms', label: 'Terms & Conditions', icon: FileText },
            { id: 'privacy', label: 'Privacy Policy', icon: Lock },
            { id: 'shipping', label: 'White Glove Shipping', icon: Truck },
            { id: 'cookies', label: 'Cookie Policy', icon: Cookie },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#2B2220] text-white font-bold shadow-xs'
                    : 'bg-[#FAF6F0] text-[#2B2220] hover:bg-[#E6DDD0]'
                }`}
              >
                <Icon size={14} className={activeTab === tab.id ? 'text-[#C17D3C]' : ''} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto space-y-6 text-xs text-[#2B2220] leading-relaxed pr-2">
          {/* TAB 1: SOLID WOOD GUARANTEE */}
          {activeTab === 'solid-wood' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#E6DDD0] flex items-center gap-3">
                <ShieldCheck size={28} className="text-[#C17D3C] shrink-0" />
                <div>
                  <h4 className="font-serif-brand font-bold text-sm text-[#2B2220]">
                    Binding Zero Compressed Wood Commitment
                  </h4>
                  <p className="text-[11px] text-[#6B5B54]">
                    We never use MDF, particle board, compressed wood chips, or hollow core paper laminates in any furniture item.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-sm text-[#2B2220]">1. Material Integrity</h5>
                <p>
                  At The Ochre Lifestyle, every bed frame, dining table, sofa structure, and sideboard is crafted strictly from 100% solid timber species — including sustainably harvested Indian Plantation Teak, Sheesham (Indian Rosewood), European White Oak, and Kiln-Dried Ash.
                </p>

                <h5 className="font-bold text-sm text-[#2B2220]">2. Mortise & Tenon Joinery</h5>
                <p>
                  Our artisan woodworkers in Jodhpur and Rajasthan construct internal frameworks using classical mortise-and-tenon wood joinery rather than cheap metal brackets or glue-only joints. This ensures superior load capacity and structural longevity spanning decades.
                </p>

                <h5 className="font-bold text-sm text-[#2B2220]">3. Kiln-Drying & Moisture Control</h5>
                <p>
                  All raw timber undergoes a 21-day solar kiln-drying seasoning process to achieve an optimal moisture content between 8% to 12%. This prevents swelling, warping, or cracking under fluctuating humidity conditions across Indian states.
                </p>

                <h5 className="font-bold text-sm text-[#2B2220]">4. 10-Year Frame Structural Warranty</h5>
                <p>
                  If any solid wood frame exhibits structural failure, termite infestation, or joint looseness within 10 years of purchase, we will repair or replace the unit free of charge.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: TERMS & CONDITIONS */}
          {activeTab === 'terms' && (
            <div className="space-y-5">
              <h4 className="font-serif-brand font-bold text-sm text-[#2B2220]">
                Terms & Conditions
              </h4>

              <div className="space-y-4">
                <div>
                  <h5 className="font-bold text-xs text-[#2B2220]">1. General Warranty Coverage</h5>
                  <p className="text-[11px] text-[#6B5B54] mt-1">
                    We offer a 6-month limited warranty against manufacturing defects, effective from the date of delivery. This warranty covers:
                  </p>
                  <ul className="list-disc pl-4 text-[11px] text-[#6B5B54] space-y-0.5 mt-1">
                    <li><strong>Severe Structural Failure:</strong> Full cracking of solid wood or wood splitting completely apart.</li>
                    <li><strong>Extreme Warping:</strong> Bending or warping that compromises structural integrity or renders the product unusable.</li>
                    <li><strong>Finish & Polish Defects:</strong> Spontaneous peeling or flaking of the top layer (excludes damage from spills, heat, or chemicals).</li>
                    <li><strong>Joinery & Hardware:</strong> Failure of structural joints or malfunctioning of fitted hardware like hinges and drawer glides.</li>
                    <li><strong>Upholstery:</strong> Premature unraveling of stitching on fabric or faux leather components under normal intended use.</li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-bold text-xs text-[#2B2220]">2. Termite & Pest Infestation</h5>
                  <p className="text-[11px] text-[#6B5B54] mt-1">
                    <strong>Reporting Window:</strong> Any termite or wood-borer infestation must be reported strictly within 45 days of receiving the product.
                  </p>
                  <p className="text-[11px] text-[#6B5B54]">
                    <strong>Exclusion:</strong> Infestations reported after this 45-day window are excluded from coverage.
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-xs text-[#2B2220]">3. Transit & Delivery Claims (The 24-Hour Rule)</h5>
                  <p className="text-[11px] text-[#6B5B54] mt-1">
                    <strong>Reporting:</strong> Damage must be reported within 24 hours of delivery.
                  </p>
                  <p className="text-[11px] text-[#6B5B54]">
                    <strong>Mandatory Evidence:</strong> A complete, unedited unboxing video is strictly required. The video must show the package being opened and the condition of the item as it is removed.
                  </p>
                  <p className="text-[11px] text-red-600 font-semibold mt-0.5">
                    Note: Claims for transit damage will not be entertained without this video evidence.
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-xs text-[#2B2220]">4. Common Solid Wood Exclusions</h5>
                  <p className="text-[11px] text-[#6B5B54] mt-1">The following are not considered manufacturing defects:</p>
                  <ul className="list-disc pl-4 text-[11px] text-[#6B5B54] space-y-0.5 mt-1">
                    <li><strong>Natural Movement:</strong> Slight expansion, contraction, or minor hairline cracks due to environmental changes.</li>
                    <li><strong>Appearance Variations:</strong> Unique wood grains, textures, or color variations compared to photography.</li>
                    <li><strong>Natural Characteristics:</strong> Wood knots, natural splits, and minor blemishes intrinsic to raw timber.</li>
                    <li><strong>Post-Delivery Wear:</strong> Any scratches, dents, or wear-and-tear resulting from daily usage after the initial 24-hour window.</li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-bold text-xs text-[#2B2220]">5. Order Finality & Cancellation Policy</h5>
                  <p className="text-[11px] text-[#6B5B54] mt-1">
                    <strong>Cancellation Window:</strong> You may cancel your order within 24 hours of placing it.
                  </p>
                  <p className="text-[11px] text-[#6B5B54]">
                    <strong>Cancellation Fee:</strong> A 10% deduction of the total order amount will be applied to all cancellations made within this 24-hour window.
                  </p>
                  <p className="text-[11px] text-[#6B5B54]">
                    <strong>Finality:</strong> After the 24-hour window, the order enters production and cannot be canceled or modified.
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-xs text-[#2B2220]">6. Return & Refund Eligibility</h5>
                  <p className="text-[11px] text-[#6B5B54] mt-1">
                    We maintain strict criteria for returns and refunds to ensure the sustainability of our bespoke manufacturing process.
                  </p>
                  <div className="mt-1 space-y-1 text-[11px] text-[#6B5B54]">
                    <p><strong>We accept returns/refunds ONLY for:</strong> Damaged or Dead on Arrival (requires 24-hour notification and unboxing video), Manufacturing Defect (covered under 6-month warranty), or Incorrect/Incomplete Product.</p>
                    <p><strong>We DO NOT accept returns/refunds for:</strong> "Change of heart" / No longer needed, or subjective dislikes regarding natural wood characteristics.</p>
                    <p>If approved, the refund will be credited in 7-10 days. If approved, the replacement will be delivered within 10-15 days.</p>
                  </div>
                </div>

                <div>
                  <h5 className="font-bold text-xs text-[#2B2220]">7. Resolution Process</h5>
                  <p className="text-[11px] text-[#6B5B54] mt-1">
                    Once a valid claim is verified via your unboxing video and photos, our team will determine if the item requires a repair, a part replacement, or a full product replacement. Refunds are only issued if a replacement is unavailable for a verified defective or damaged product.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h4 className="font-serif-brand font-bold text-sm text-[#2B2220]">
                Privacy & Data Security Commitment
              </h4>
              <p>
                Your privacy is paramount. We collect personal information solely to fulfill orders, deliver free swatch boxes, and coordinate White Glove assembly.
              </p>

              <div className="space-y-3">
                <div>
                  <strong className="block font-bold text-[#2B2220]">Information We Collect:</strong>
                  Full name, shipping address, contact phone number, pincode, email, and room planning preferences.
                </div>

                <div>
                  <strong className="block font-bold text-[#2B2220]">Zero Data Selling:</strong>
                  We do not rent, trade, or sell customer phone numbers or email addresses to any third-party marketing brokers.
                </div>

                <div>
                  <strong className="block font-bold text-[#2B2220]">Payment Security:</strong>
                  All online payments are encrypted via Razorpay/UPI gateway interfaces. No credit card details are stored on our servers.
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: WHITE GLOVE SHIPPING */}
          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <h4 className="font-serif-brand font-bold text-sm text-[#2B2220]">
                White Glove Delivery Guidelines
              </h4>
              <p>
                We provide complete door-to-room delivery service across 28 states and union territories in India.
              </p>

              <div className="space-y-3">
                <div>
                  <strong className="block font-bold text-[#2B2220]">Complimentary Room Placement:</strong>
                  Our trained technicians will carry your solid wood furniture into your designated living or bedroom space, uncrate the protective wooden crates, assemble legs/headboards, and remove all packaging materials.
                </div>

                <div>
                  <strong className="block font-bold text-[#2B2220]">Staircase & Elevator Clearance:</strong>
                  Please verify staircase width and elevator dimensions using our dimension specifications before placing orders for large sectional sofas or 8-seater dining tables.
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: COOKIE POLICY */}
          {activeTab === 'cookies' && (
            <div className="space-y-4">
              <h4 className="font-serif-brand font-bold text-sm text-[#2B2220]">
                Cookie & Storage Policy
              </h4>
              <p>
                We use browser local storage and essential cookies to ensure your cart bag, saved wishlist items, and 3D room planner layouts persist between visits.
              </p>

              <div className="space-y-2">
                <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#E6DDD0]">
                  <strong className="text-[#2B2220]">Essential Cookies (Required):</strong>
                  <p className="text-[11px] text-[#6B5B54] mt-0.5">
                    Maintains active shopping bag items, custom swatch requests, and wishlist items.
                  </p>
                </div>

                <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#E6DDD0]">
                  <strong className="text-[#2B2220]">Analytics & Experience Cookies:</strong>
                  <p className="text-[11px] text-[#6B5B54] mt-0.5">
                    Helps us understand which furniture collections and fabrics are popular to improve designs.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
