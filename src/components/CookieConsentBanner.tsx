import React, { useState, useEffect } from 'react';
import { Cookie, X, Check, ShieldCheck } from 'lucide-react';
import { CookiePreferences } from '../types';
import { safeStorage } from '../lib/security';

interface CookieConsentBannerProps {
  onOpenPreferences: () => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ onOpenPreferences }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const saved = safeStorage.getItem<CookiePreferences | null>('ochre_cookie_consent', null);
    if (!saved) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const prefs: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
      acceptedAt: new Date().toISOString(),
    };
    safeStorage.setItem('ochre_cookie_consent', prefs);
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    const prefs: CookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
      acceptedAt: new Date().toISOString(),
    };
    safeStorage.setItem('ochre_cookie_consent', prefs);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-xl z-50 bg-[#2B2220] text-[#FAF6F0] p-5 rounded-2xl border border-[#423430] shadow-2xl animate-in slide-in-from-bottom duration-300 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-[#C17D3C]/20 rounded-lg text-[#C17D3C]">
            <Cookie size={20} />
          </div>
          <h4 className="font-serif-brand font-medium text-sm text-white">
            Cookie & Storage Preferences
          </h4>
        </div>

        <button
          onClick={handleEssentialOnly}
          className="text-[#9E8E87] hover:text-white transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>
      </div>

      <p className="text-xs text-[#D8CEBD] leading-relaxed">
        We use essential cookies to maintain your shopping bag, saved wishlist, and 3D room planner state. Zero tracking cookies are sold to third parties.
      </p>

      <div className="flex flex-wrap items-center gap-2 pt-1">
        <button
          onClick={handleAcceptAll}
          className="px-4 py-2 bg-[#C17D3C] hover:bg-[#9E5B23] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
        >
          Accept All
        </button>

        <button
          onClick={handleEssentialOnly}
          className="px-4 py-2 bg-[#3A2E2B] hover:bg-white/20 text-[#FAF6F0] border border-white/10 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
        >
          Essential Only
        </button>

        <button
          onClick={() => {
            setIsVisible(false);
            onOpenPreferences();
          }}
          className="px-3 py-2 text-xs text-[#C17D3C] hover:underline cursor-pointer"
        >
          Manage Policy
        </button>
      </div>
    </div>
  );
};
