import React from 'react';
import { ShieldCheck, Award, Hammer, Heart, Sparkles, Truck, Users, TreePine } from 'lucide-react';

import heroImg from '../assets/images/hero_living_room_1784804151279.jpg';
import diningImg from '../assets/images/dining_collection_1784804162563.jpg';
import bedroomImg from '../assets/images/bedroom_sanctuary_1784804174221.jpg';

export const OurStoryPage: React.FC<{
  onSelectTab?: (tab: any) => void;
  onOpenStylistModal?: () => void;
}> = ({ onSelectTab, onOpenStylistModal }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 animate-in fade-in duration-300">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-[#2B2220] text-[#FAF6F0] p-8 sm:p-16 border border-[#423430] shadow-2xl">
        <div className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none" style={{ backgroundImage: `url(${heroImg})` }} />
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C17D3C]/20 border border-[#C17D3C]/40 text-[#C17D3C] text-xs font-bold uppercase tracking-wider">
            <Award size={14} />
            <span>Over 5 Decades (50+ Years) of Rajasthan Woodworking Mastery</span>
          </div>

          <h1 className="font-serif-brand text-3xl sm:text-6xl font-bold tracking-tight leading-tight">
            Soulful Furniture Built for Generations
          </h1>

          <p className="text-sm sm:text-lg text-[#D8CEBD] leading-relaxed">
            The Ochre Lifestyle was founded on a simple, non-negotiable principle: authentic furniture should be carved from 100% solid natural timber, free from cheap particle boards, synthetic veneers, or toxic MDF.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#D8CEBD]">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-[#C17D3C]" />
              <span className="font-semibold">0% Compressed Wood / MDF</span>
            </div>
            <div className="flex items-center gap-2">
              <Hammer size={18} className="text-[#C17D3C]" />
              <span className="font-semibold">Master Jodhpur Guild Woodworkers</span>
            </div>
            <div className="flex items-center gap-2">
              <TreePine size={18} className="text-[#C17D3C]" />
              <span className="font-semibold">Sustainable Plantation Teak</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Decades Heritage Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C17D3C]">
            <Sparkles size={16} />
            <span>Heritage & Craftsmanship</span>
          </div>
          <h2 className="font-serif-brand text-3xl sm:text-4xl font-bold text-[#2B2220] leading-tight">
            Five Decades of Hand-Carved Excellence
          </h2>
          <p className="text-xs sm:text-sm text-[#6B5B54] leading-relaxed">
            Our story originates in the historic artisan workshops of Jodhpur and Marwar, Rajasthan. For over 50 years, three generations of master woodworkers have perfected classical timber carving, hand-sanding, and mortise-and-tenon structural joinery.
          </p>
          <p className="text-xs sm:text-sm text-[#6B5B54] leading-relaxed">
            While commercial furniture manufacturing shifted toward fast, disposable MDF and cheap lamination, our workshops preserved time-honored woodworking techniques. Every slab of teak, sheesham, and oak is selected by eye, seasoned for 21 days in solar kilns, and sculpted with respect for the timber's natural grain.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#E6DDD0]">
              <span className="font-serif-brand font-bold text-2xl text-[#C17D3C] block">50+ Years</span>
              <span className="text-xs text-[#6B5B54]">Artisan Guild Heritage</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#E6DDD0]">
              <span className="font-serif-brand font-bold text-2xl text-[#C17D3C] block">100% Solid</span>
              <span className="text-xs text-[#6B5B54]">Kiln-Dried Timber</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          <img
            src={diningImg}
            alt="Artisan Dining Collection"
            className="rounded-2xl border border-[#E6DDD0] object-cover h-64 sm:h-80 w-full shadow-md"
          />
          <img
            src={bedroomImg}
            alt="Bedroom Sanctuary Craft"
            className="rounded-2xl border border-[#E6DDD0] object-cover h-64 sm:h-80 w-full shadow-md mt-8"
          />
        </div>
      </div>

      {/* Core Craft Values */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="font-serif-brand text-3xl font-bold text-[#2B2220]">
            Our Guiding Pillars
          </h2>
          <p className="text-xs sm:text-sm text-[#6B5B54]">
            Why discerning homeowners and interior architects choose The Ochre Lifestyle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-[#E6DDD0] space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#C17D3C]/10 text-[#C17D3C] flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-serif-brand text-lg font-bold text-[#2B2220]">Binding Zero MDF Guarantee</h3>
            <p className="text-xs text-[#6B5B54] leading-relaxed">
              We pledge never to use particle board, paper laminates, or engineered wood chips. Every frame, drawer box, and tabletop is 100% solid hardwood.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[#E6DDD0] space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#C17D3C]/10 text-[#C17D3C] flex items-center justify-center">
              <Hammer size={24} />
            </div>
            <h3 className="font-serif-brand text-lg font-bold text-[#2B2220]">Hand-Carved Traditional Joinery</h3>
            <p className="text-xs text-[#6B5B54] leading-relaxed">
              Instead of flimsy metal brackets or chemical glue, our frames use classical mortise-and-tenon joints, engineered to hold up to 450 kg without squeaking.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[#E6DDD0] space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#C17D3C]/10 text-[#C17D3C] flex items-center justify-center">
              <Truck size={24} />
            </div>
            <h3 className="font-serif-brand text-lg font-bold text-[#2B2220]">Direct Workshop to Living Room</h3>
            <p className="text-xs text-[#6B5B54] leading-relaxed">
              By removing retail showrooms and middlemen markups, we deliver heirloom-quality solid wood furniture straight from Rajasthan artisans to your doorstep.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-[#FAF6F0] rounded-3xl p-8 sm:p-12 border border-[#E6DDD0] text-center space-y-6">
        <h2 className="font-serif-brand text-2xl sm:text-4xl font-bold text-[#2B2220]">
          Ready to Craft Your Heirloom Living Space?
        </h2>
        <p className="text-xs sm:text-sm text-[#6B5B54] max-w-xl mx-auto">
          Explore our solid teak collections, order a free fabric & wood swatch kit, or consult with our Rajasthan design studio for custom dimensions.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          {onSelectTab && (
            <button
              onClick={() => onSelectTab('shop')}
              className="px-8 py-3.5 bg-[#2B2220] text-white font-bold rounded-xl text-xs hover:bg-[#C17D3C] transition-colors cursor-pointer"
            >
              Explore Furniture Collections
            </button>
          )}
          {onSelectTab && (
            <button
              onClick={() => onSelectTab('custom-furniture')}
              className="px-8 py-3.5 bg-white border border-[#2B2220] text-[#2B2220] font-bold rounded-xl text-xs hover:bg-[#FAF6F0] transition-colors cursor-pointer"
            >
              Custom Blueprint Studio
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
