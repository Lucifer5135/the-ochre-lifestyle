import React from 'react';
import { ShieldCheck, AlertTriangle, Video, Clock, RefreshCcw, FileText, CheckCircle2, XCircle } from 'lucide-react';

export const TermsOfServicePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="border-b border-[#E6DDD0] pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF6F0] border border-[#E6DDD0] text-[#C17D3C] text-xs font-bold uppercase tracking-wider">
          <FileText size={14} />
          <span>Terms of Service & Warranty Guidelines</span>
        </div>
        <h1 className="font-serif-brand text-3xl sm:text-4xl font-bold text-[#2B2220]">
          Terms & Conditions
        </h1>
        <p className="text-xs text-[#6B5B54]">
          Comprehensive warranty terms, transit policies, cancellation rules, and return criteria
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#E6DDD0] p-6 sm:p-10 shadow-xs space-y-10 text-xs sm:text-sm text-[#2B2220] leading-relaxed">
        {/* SECTION 1 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 font-serif-brand font-bold text-lg text-[#2B2220] border-b border-[#FAF6F0] pb-2">
            <ShieldCheck size={20} className="text-[#C17D3C]" />
            <h2>1. General Warranty Coverage</h2>
          </div>
          <p className="text-[#6B5B54]">
            We offer a <strong>6-month limited warranty</strong> against manufacturing defects, effective from the date of delivery. This warranty covers:
          </p>
          <div className="grid grid-cols-1 gap-3">
            <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#E6DDD0] space-y-1">
              <strong className="text-[#2B2220] font-bold block">Severe Structural Failure:</strong>
              <p className="text-[#6B5B54]">Full cracking of solid wood or wood splitting completely apart.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#E6DDD0] space-y-1">
              <strong className="text-[#2B2220] font-bold block">Extreme Warping:</strong>
              <p className="text-[#6B5B54]">Bending or warping that compromises structural integrity or renders the product unusable.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#E6DDD0] space-y-1">
              <strong className="text-[#2B2220] font-bold block">Finish & Polish Defects:</strong>
              <p className="text-[#6B5B54]">Spontaneous peeling or flaking of the top layer (excludes damage from spills, heat, or chemicals).</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#E6DDD0] space-y-1">
              <strong className="text-[#2B2220] font-bold block">Joinery & Hardware:</strong>
              <p className="text-[#6B5B54]">Failure of structural joints or malfunctioning of fitted hardware like hinges and drawer glides.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#E6DDD0] space-y-1">
              <strong className="text-[#2B2220] font-bold block">Upholstery:</strong>
              <p className="text-[#6B5B54]">Premature unraveling of stitching on fabric or faux leather components under normal intended use.</p>
            </div>
          </div>
        </section>

        {/* SECTION 2 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 font-serif-brand font-bold text-lg text-[#2B2220] border-b border-[#FAF6F0] pb-2">
            <AlertTriangle size={20} className="text-[#C17D3C]" />
            <h2>2. Termite & Pest Infestation</h2>
          </div>
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2 text-amber-950">
            <p>
              <strong>Reporting Window:</strong> Any termite or wood-borer infestation must be reported strictly within <strong>45 days</strong> of receiving the product.
            </p>
            <p className="text-[#6B5B54]">
              <strong>Exclusion:</strong> Infestations reported after this 45-day window are excluded from coverage.
            </p>
          </div>
        </section>

        {/* SECTION 3 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 font-serif-brand font-bold text-lg text-[#2B2220] border-b border-[#FAF6F0] pb-2">
            <Video size={20} className="text-[#C17D3C]" />
            <h2>3. Transit & Delivery Claims (The 24-Hour Rule)</h2>
          </div>
          <div className="p-5 bg-[#FAF6F0] rounded-2xl border border-[#E6DDD0] space-y-3">
            <div className="flex items-start gap-3">
              <Clock size={20} className="text-[#C17D3C] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#2B2220] font-bold block">Reporting Window:</strong>
                <p className="text-[#6B5B54]">Damage must be reported within <strong>24 hours</strong> of delivery.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 border-t border-[#E6DDD0] pt-3">
              <Video size={20} className="text-[#C17D3C] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#2B2220] font-bold block">Mandatory Evidence:</strong>
                <p className="text-[#6B5B54]">
                  A complete, unedited unboxing video is strictly required. The video must show the package being opened and the condition of the item as it is removed.
                </p>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-red-200 text-red-900 font-semibold text-xs">
              Note: Claims for transit damage will not be entertained without this video evidence.
            </div>
          </div>
        </section>

        {/* SECTION 4 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 font-serif-brand font-bold text-lg text-[#2B2220] border-b border-[#FAF6F0] pb-2">
            <h2>4. Common Solid Wood Exclusions</h2>
          </div>
          <p className="text-[#6B5B54]">The following are not considered manufacturing defects:</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#6B5B54]">
            <li className="p-3 bg-[#FAF6F0] rounded-xl border border-[#E6DDD0]">
              <strong className="text-[#2B2220] block">Natural Movement:</strong>
              Slight expansion, contraction, or minor hairline cracks due to environmental changes.
            </li>
            <li className="p-3 bg-[#FAF6F0] rounded-xl border border-[#E6DDD0]">
              <strong className="text-[#2B2220] block">Appearance Variations:</strong>
              Unique wood grains, textures, or color variations compared to photography.
            </li>
            <li className="p-3 bg-[#FAF6F0] rounded-xl border border-[#E6DDD0]">
              <strong className="text-[#2B2220] block">Natural Characteristics:</strong>
              Wood knots, natural splits, and minor blemishes intrinsic to raw timber.
            </li>
            <li className="p-3 bg-[#FAF6F0] rounded-xl border border-[#E6DDD0]">
              <strong className="text-[#2B2220] block">Post-Delivery Wear:</strong>
              Any scratches, dents, or wear-and-tear resulting from daily usage after the initial 24-hour window.
            </li>
          </ul>
        </section>

        {/* SECTION 5 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 font-serif-brand font-bold text-lg text-[#2B2220] border-b border-[#FAF6F0] pb-2">
            <h2>5. Order Finality & Cancellation Policy</h2>
          </div>
          <div className="p-4 bg-[#FAF6F0] rounded-2xl border border-[#E6DDD0] space-y-2">
            <p>
              <strong>Cancellation Window:</strong> You may cancel your order within <strong>24 hours</strong> of placing it.
            </p>
            <p>
              <strong>Cancellation Fee:</strong> A <strong>10% deduction</strong> of the total order amount will be applied to all cancellations made within this 24-hour window.
            </p>
            <p>
              <strong>Finality:</strong> After the 24-hour window, the order enters production and cannot be canceled or modified.
            </p>
          </div>
        </section>

        {/* SECTION 6 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 font-serif-brand font-bold text-lg text-[#2B2220] border-b border-[#FAF6F0] pb-2">
            <RefreshCcw size={20} className="text-[#C17D3C]" />
            <h2>6. Return & Refund Eligibility</h2>
          </div>
          <p className="text-[#6B5B54]">
            We maintain strict criteria for returns and refunds to ensure the sustainability of our bespoke manufacturing process.
          </p>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-2">
              <div className="flex items-center gap-2 font-bold text-emerald-900">
                <CheckCircle2 size={18} className="text-emerald-600" />
                <span>We accept returns/refunds ONLY for the following reasons:</span>
              </div>
              <ul className="list-disc pl-6 space-y-1 text-xs">
                <li><strong>Damaged or Dead on Arrival:</strong> Items damaged during transit (requires 24-hour notification and unboxing video).</li>
                <li><strong>Manufacturing Defect:</strong> Issues covered under our 6-month warranty.</li>
                <li><strong>Incorrect or Incomplete Product:</strong> Receiving an item that does not match your order specifications or is missing parts.</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 space-y-2">
              <div className="flex items-center gap-2 font-bold text-rose-900">
                <XCircle size={18} className="text-rose-600" />
                <span>We DO NOT accept returns/refunds for:</span>
              </div>
              <ul className="list-disc pl-6 space-y-1 text-xs">
                <li><strong>No Longer Needed:</strong> "Change of heart" or deciding the product is no longer required.</li>
                <li><strong>Any Other Reason:</strong> This includes subjective dislikes regarding natural wood characteristics or failure to review order specifications within the 24-hour review window.</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E6DDD0]">
              <span className="font-bold text-[#2B2220] block">Refund Credit Timeline:</span>
              <span className="text-[#6B5B54]">If approved, the refund will be credited in <strong>7-10 days</strong>.</span>
            </div>
            <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E6DDD0]">
              <span className="font-bold text-[#2B2220] block">Replacement Delivery Timeline:</span>
              <span className="text-[#6B5B54]">If approved, the replacement will be delivered within <strong>10-15 days</strong>.</span>
            </div>
          </div>
        </section>

        {/* SECTION 7 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 font-serif-brand font-bold text-lg text-[#2B2220] border-b border-[#FAF6F0] pb-2">
            <h2>7. Resolution Process</h2>
          </div>
          <p className="text-[#6B5B54]">
            Once a valid claim is verified via your unboxing video and photos, our team will determine if the item requires a repair, a part replacement, or a full product replacement. Refunds are only issued if a replacement is unavailable for a verified defective or damaged product.
          </p>
        </section>
      </div>
    </div>
  );
};
