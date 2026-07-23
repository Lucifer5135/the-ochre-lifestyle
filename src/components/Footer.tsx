import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { ShieldCheck, Truck, Sparkles, RefreshCw, Mail, ArrowRight, MapPin, Phone, Instagram, Facebook } from 'lucide-react';

export const Footer: React.FC<{
  onOpenStylist: () => void;
  onOpenSwatchKit: () => void;
  onOpenTrackOrder: () => void;
  onOpenTerms: () => void;
  onOpenCustomFurniture: () => void;
  onOpenOurStory?: () => void;
  onOpenContact?: () => void;
  onOpenPrivacy?: () => void;
  onOpenTermsOfService?: () => void;
}> = ({
  onOpenStylist,
  onOpenSwatchKit,
  onOpenTrackOrder,
  onOpenTerms,
  onOpenCustomFurniture,
  onOpenOurStory,
  onOpenContact,
  onOpenPrivacy,
  onOpenTermsOfService,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#2B2220] text-[#FAF6F0] border-t border-[#3A2E2B] mt-20">
      {/* Brand Value Pillars */}
      <div className="border-b border-[#423430] bg-[#231B19]">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="p-3 bg-[#C17D3C]/10 rounded-full text-[#C17D3C]">
              <Truck size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-sm">White Glove Direct Delivery</h4>
              <p className="text-xs text-[#D8CEBD] mt-0.5">Uncrating, assembly & placement in your room</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="p-3 bg-[#C17D3C]/10 rounded-full text-[#C17D3C]">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-sm">100% Solid Timber Guarantee</h4>
              <p className="text-xs text-[#D8CEBD] mt-0.5">0% MDF or compressed wood &bull; 10-Year Warranty</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="p-3 bg-[#C17D3C]/10 rounded-full text-[#C17D3C]">
              <Sparkles size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Free Swatch Sample Box</h4>
              <p className="text-xs text-[#D8CEBD] mt-0.5">Test fabrics & teak wood stains at home</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="p-3 bg-[#C17D3C]/10 rounded-full text-[#C17D3C]">
              <RefreshCw size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-sm">30-Day Living Promise</h4>
              <p className="text-xs text-[#D8CEBD] mt-0.5">Hassle-free returns & custom room fitting</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="text-left inline-block">
            <BrandLogo size="md" showTagline={true} theme="dark" />
          </div>
          <p className="text-xs text-[#D8CEBD] leading-relaxed max-w-sm">
            Crafting soulful, timeless furniture for modern Indian homes. Every piece is constructed strictly from 100% solid timber species with zero MDF, hand-carved by master woodworkers with over 5 decades of artisan experience in Rajasthan.
          </p>

          <div className="pt-2 flex items-center gap-4 text-[#D8CEBD]">
            <a href="#" className="p-2 rounded-full bg-[#3A2E2B] hover:text-[#C17D3C] transition-colors">
              <Instagram size={18} />
            </a>
            <a href="#" className="p-2 rounded-full bg-[#3A2E2B] hover:text-[#C17D3C] transition-colors">
              <Facebook size={18} />
            </a>
          </div>
        </div>

        {/* Direct Artisan Workshop & Solid Wood Commitment */}
        <div className="space-y-3">
          <h4 className="font-serif-brand font-medium text-sm tracking-wider uppercase text-[#C17D3C]">
            Artisan Workshop Direct
          </h4>
          <ul className="space-y-3 text-xs text-[#D8CEBD]">
            <li className="flex items-start gap-2">
              <ShieldCheck size={14} className="text-[#C17D3C] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">50+ Years Artisan Heritage</strong>
                <span>Over 5 decades of Rajasthan woodworking mastery</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck size={14} className="text-[#C17D3C] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">0% Middlemen Markup</strong>
                <span>Direct delivery from Jodhpur & Rajasthan workshops</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck size={14} className="text-[#C17D3C] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">100% Kiln-Dried Teak</strong>
                <span>Seasoned to 8%-12% moisture content</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck size={14} className="text-[#C17D3C] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Zero MDF or Particle Board</strong>
                <span>10-Year solid frame structural guarantee</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Design Services */}
        <div className="space-y-3">
          <h4 className="font-serif-brand font-medium text-sm tracking-wider uppercase text-[#C17D3C]">
            Design & Client Care
          </h4>
          <ul className="space-y-2 text-xs text-[#D8CEBD]">
            <li>
              <button onClick={onOpenCustomFurniture} className="hover:text-white transition-colors cursor-pointer text-left font-bold text-[#C17D3C]">
                Custom Furniture Studio &rarr;
              </button>
            </li>
            {onOpenOurStory && (
              <li>
                <button onClick={onOpenOurStory} className="hover:text-white transition-colors cursor-pointer text-left font-medium">
                  Our Story (50+ Years Heritage)
                </button>
              </li>
            )}
            {onOpenContact && (
              <li>
                <button onClick={onOpenContact} className="hover:text-white transition-colors cursor-pointer text-left font-medium">
                  Contact Us & Rajasthan Studio
                </button>
              </li>
            )}
            <li>
              <button onClick={onOpenTrackOrder} className="hover:text-white transition-colors cursor-pointer text-left">
                Track Order & Delivery Status
              </button>
            </li>
            <li>
              <button onClick={onOpenStylist} className="hover:text-white transition-colors cursor-pointer text-left">
                Book Complimentary Interior Stylist
              </button>
            </li>
            <li>
              <button onClick={onOpenSwatchKit} className="hover:text-white transition-colors cursor-pointer text-left">
                Order Free Swatch Box
              </button>
            </li>
            <li>
              <button onClick={onOpenTermsOfService || onOpenTerms} className="hover:text-white transition-colors cursor-pointer text-left">
                Terms of Service & Warranty
              </button>
            </li>
          </ul>
        </div>

        {/* Newsletter Box */}
        <div className="space-y-3">
          <h4 className="font-serif-brand font-medium text-sm tracking-wider uppercase text-[#C17D3C]">
            Ochre Insider
          </h4>
          <p className="text-xs text-[#D8CEBD]">
            Subscribe to receive private preview invitations and an instant <strong>₹2,500 welcome voucher</strong> toward your first order.
          </p>

          {subscribed ? (
            <div className="p-3 bg-[#C17D3C]/20 border border-[#C17D3C] text-xs text-[#FAF6F0] rounded-md">
              ✨ Welcome to The Ochre Circle! Use voucher code <strong className="text-[#C17D3C]">OCHRE2500</strong> at checkout.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-[#3A2E2B] border border-[#423430] text-xs px-3 py-2.5 rounded-md text-white placeholder-[#9E8E87] focus:outline-none focus:border-[#C17D3C]"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 bg-[#C17D3C] text-white px-3 rounded-md hover:bg-[#9E5B23] transition-colors flex items-center justify-center cursor-pointer"
                >
                  <ArrowRight size={14} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#3A2E2B] py-6 bg-[#211918]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#9E8E87] gap-4">
          <div>
            &copy; {new Date().getFullYear()} The Ochre Lifestyle Private Limited. All rights reserved. Prices inclusive of GST.
          </div>
          <div className="flex flex-wrap items-center gap-6">
            {onOpenOurStory && (
              <button onClick={onOpenOurStory} className="hover:text-white cursor-pointer">
                Our Story
              </button>
            )}
            {onOpenContact && (
              <button onClick={onOpenContact} className="hover:text-white cursor-pointer">
                Contact Us
              </button>
            )}
            <button onClick={onOpenPrivacy || onOpenTerms} className="hover:text-white cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={onOpenTermsOfService || onOpenTerms} className="hover:text-white cursor-pointer">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
