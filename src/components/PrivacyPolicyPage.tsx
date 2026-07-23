import React from 'react';
import { Lock, ShieldCheck, Eye, Database, CreditCard, Mail } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10 animate-in fade-in duration-300">
      {/* Header */}
      <div className="border-b border-[#E6DDD0] pb-6 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF6F0] border border-[#E6DDD0] text-[#C17D3C] text-xs font-bold uppercase tracking-wider">
          <Lock size={14} />
          <span>Data Protection & Privacy Policy</span>
        </div>
        <h1 className="font-serif-brand text-3xl sm:text-4xl font-bold text-[#2B2220]">
          Privacy & Security Policy
        </h1>
        <p className="text-xs text-[#6B5B54]">
          Last updated: July 23, 2026 &bull; Effective for all clients of The Ochre Lifestyle Private Limited
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#E6DDD0] p-6 sm:p-10 shadow-xs space-y-8 text-xs sm:text-sm text-[#2B2220] leading-relaxed">
        {/* Intro */}
        <div className="space-y-3">
          <p>
            At <strong>The Ochre Lifestyle Private Limited</strong> ("Ochre", "we", "our", "us"), respecting and protecting your personal privacy is a foundational priority. This Privacy Policy details how we gather, utilize, safeguard, and disclose personal information when you browse our website, request swatch sample boxes, utilize our 3D Room Planner, or place custom solid wood furniture orders.
          </p>
        </div>

        {/* Section 1: Information Collection */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-serif-brand font-bold text-lg text-[#2B2220] border-b border-[#FAF6F0] pb-2">
            <Database size={18} className="text-[#C17D3C]" />
            <h2>1. Information We Collect</h2>
          </div>
          <p>We collect only the essential personal details required to process bespoke orders and deliver client care services:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#6B5B54]">
            <li><strong>Contact Details:</strong> Full name, primary phone number, WhatsApp number, and email address.</li>
            <li><strong>Delivery Location:</strong> Shipping address, landmark, pincode, city, and state for White Glove assembly logistics.</li>
            <li><strong>Custom Blueprint Data:</strong> Room measurements, wood finish preferences, upholstery fabric choices, and custom CAD drawings submitted via our Custom Furniture Studio.</li>
            <li><strong>Transaction Records:</strong> Order item history, invoice totals, GST numbers (for business clients), and payment confirmation IDs.</li>
          </ul>
        </div>

        {/* Section 2: Zero Data Selling */}
        <div className="space-y-3 p-5 bg-[#FAF6F0] rounded-2xl border border-[#E6DDD0]">
          <div className="flex items-center gap-2 font-serif-brand font-bold text-base text-[#2B2220]">
            <ShieldCheck size={20} className="text-[#C17D3C]" />
            <h3>2. Binding Zero Data Selling Commitment</h3>
          </div>
          <p className="text-xs text-[#6B5B54]">
            We <strong>never sell, rent, trade, or leak</strong> customer phone numbers, email addresses, or personal contact details to third-party telemarketing companies, ad networks, or data brokers. Your contact details are strictly utilized for direct order fulfillment, delivery coordination, and Ochre warranty communications.
          </p>
        </div>

        {/* Section 3: Payment Security */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-serif-brand font-bold text-lg text-[#2B2220] border-b border-[#FAF6F0] pb-2">
            <CreditCard size={18} className="text-[#C17D3C]" />
            <h2>3. Payment Security & Encryption</h2>
          </div>
          <p className="text-[#6B5B54]">
            All online monetary payments are processed securely through RBI-compliant, PCI-DSS certified payment gateways (including Razorpay, PayU, and UPI interfaces). We utilize 256-bit SSL encryption. <strong>The Ochre Lifestyle never stores or accesses your complete credit card numbers, debit card PINs, or UPI security credentials on our internal servers.</strong>
          </p>
        </div>

        {/* Section 4: Cookies & Local Storage */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-serif-brand font-bold text-lg text-[#2B2220] border-b border-[#FAF6F0] pb-2">
            <Eye size={18} className="text-[#C17D3C]" />
            <h2>4. Browser Local Storage & Cookies</h2>
          </div>
          <p className="text-[#6B5B54]">
            Our web application uses browser Local Storage and essential session cookies to preserve your active cart bag, saved wishlist items, custom room layout configurations in the 3D Stager, and swatch box requests between browser sessions. You can clear local storage or cookies at any time via your browser settings.
          </p>
        </div>

        {/* Section 5: Client Rights */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-serif-brand font-bold text-lg text-[#2B2220] border-b border-[#FAF6F0] pb-2">
            <Mail size={18} className="text-[#C17D3C]" />
            <h2>5. Your Data Rights & Contact</h2>
          </div>
          <p className="text-[#6B5B54]">
            You have the right to inspect, update, or request the permanent erasure of your personal address data or past order history from our active records. To submit a data request or raise privacy inquiries, email our privacy desk at <a href="mailto:privacy@ochrelifestyle.com" className="text-[#C17D3C] font-bold hover:underline">privacy@ochrelifestyle.com</a> or write to:
          </p>
          <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E6DDD0] text-xs text-[#2B2220]">
            <strong>Privacy Desk — The Ochre Lifestyle Pvt. Ltd.</strong><br />
            Plot 42, Artisan Handicraft Estate, Boranada Industrial Area, Jodhpur, Rajasthan 342012, India
          </div>
        </div>
      </div>
    </div>
  );
};
