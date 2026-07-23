import React from 'react';
import logoImg from '../assets/images/ochre_lifestyle_logo_1784805965493.jpg';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  useFullImage?: boolean;
  theme?: 'light' | 'dark';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
  useFullImage = false,
  theme = 'light',
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
  };

  const fullImageSizes = {
    sm: 'h-8',
    md: 'h-12 sm:h-14',
    lg: 'h-20 sm:h-24',
  };

  const textSizes = {
    sm: 'text-sm tracking-[0.2em]',
    md: 'text-lg sm:text-xl tracking-[0.22em]',
    lg: 'text-2xl sm:text-3xl tracking-[0.25em]',
  };

  const taglineSizes = {
    sm: 'text-[9px] tracking-[0.25em]',
    md: 'text-[10px] sm:text-xs tracking-[0.3em]',
    lg: 'text-xs sm:text-sm tracking-[0.35em]',
  };

  const isDark = theme === 'dark';
  const mainTextColor = isDark ? 'text-[#FAF6F0]' : 'text-[#2B2220]';
  const taglineTextColor = isDark ? 'text-[#D8CEBD]' : 'text-[#2B2220]';
  const dividerBg = isDark ? 'bg-[#D8CEBD]/30' : 'bg-[#2B2220]/30';

  if (useFullImage) {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <img
          src={logoImg}
          alt="The Ochre Lifestyle"
          referrerPolicy="no-referrer"
          className={`${fullImageSizes[size]} object-contain ${isDark ? 'brightness-110 contrast-125' : 'mix-blend-multiply'}`}
        />
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Monogram Symbol matching logo image */}
        <div className={`relative flex items-center justify-center shrink-0 rounded-full overflow-hidden ${iconSizes[size]} ring-1 ring-[#C17D3C]/40 shadow-xs bg-[#FAF6F0]`}>
          <img
            src={logoImg}
            alt="The Ochre Lifestyle Symbol"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover scale-110"
          />
        </div>

        {/* Brand Name Text with precise word spacing */}
        <div className="flex flex-col justify-center">
          <div className={`font-serif-brand font-medium uppercase leading-none ${mainTextColor} ${textSizes[size]} flex items-center`}>
            <span className="mr-[0.3em]">THE</span>
            <span className="text-[#C17D3C] font-semibold mr-[0.3em]">OCHRE</span>
            <span>LIFESTYLE</span>
          </div>
        </div>
      </div>

      {/* Sub-tagline with symmetrical line rules and even word spacing */}
      {showTagline && (
        <div className="w-full flex items-center justify-center gap-2 mt-2 opacity-90">
          <div className={`h-[1px] ${dividerBg} min-w-[16px] max-w-[40px] grow`} />
          <span className={`font-sans font-medium uppercase tracking-[0.25em] ${taglineTextColor} whitespace-nowrap ${taglineSizes[size]} inline-flex items-center gap-1.5`}>
            <span>FURNITURE</span>
            <span className="text-[#C17D3C] opacity-80 font-normal">|</span>
            <span>CRAFTED FOR LIVING</span>
          </span>
          <div className={`h-[1px] ${dividerBg} min-w-[16px] max-w-[40px] grow`} />
        </div>
      )}
    </div>
  );
};

