import React, { useState } from 'react';
import { Swatch, Product } from '../types';
import { Sparkles, Eye, Check, SlidersHorizontal } from 'lucide-react';

interface ProductVisualizerProps {
  product: Product;
  currentImage: string;
  selectedWood?: Swatch;
  selectedFabric?: Swatch;
  className?: string;
  showCustomBadge?: boolean;
  interactiveToggle?: boolean;
}

export const ProductVisualizer: React.FC<ProductVisualizerProps> = ({
  product,
  currentImage,
  selectedWood,
  selectedFabric,
  className = '',
  showCustomBadge = true,
  interactiveToggle = true,
}) => {
  const [customEffectEnabled, setCustomEffectEnabled] = useState(true);
  const [showCompareSplit, setShowCompareSplit] = useState(false);

  // Check if any non-default swatch is active
  const hasCustomWood = !!selectedWood;
  const hasCustomFabric = !!selectedFabric && product.availableFabrics.length > 0;
  const isCustomized = hasCustomWood || hasCustomFabric;

  // Determine finish overlay styles and filter classes based on selected wood & fabric
  const getCustomShaderStyle = () => {
    if (!isCustomEffectActive) return {};

    const primaryColor = selectedFabric?.hex || selectedWood?.hex || '#C17D3C';
    const secondaryColor = selectedWood?.hex;

    return {
      backgroundColor: primaryColor,
    };
  };

  const isCustomEffectActive = isCustomized && customEffectEnabled;

  // Determine tone filter adjustments
  const getImageFilterStyle = () => {
    if (!isCustomEffectActive) return {};

    let brightness = 1;
    let contrast = 1;
    let saturate = 1;

    // Subtle tone calibrations for realistic look
    if (selectedFabric?.id === 'f-boucle-ivory') {
      brightness = 1.04;
      contrast = 0.98;
      saturate = 0.92;
    } else if (selectedFabric?.id === 'f-charcoal-weave' || selectedWood?.id === 'w-smoked-oak') {
      brightness = 0.94;
      contrast = 1.08;
      saturate = 0.95;
    } else if (selectedFabric?.id === 'f-ochre-velvet' || selectedWood?.id === 'w-burnt-ochre') {
      saturate = 1.15;
      contrast = 1.02;
    } else if (selectedFabric?.id === 'f-sage-chenille') {
      saturate = 0.95;
      contrast = 1.02;
    }

    return {
      filter: `brightness(${brightness}) contrast(${contrast}) saturate(${saturate})`,
    };
  };

  return (
    <div className={`relative overflow-hidden group select-none ${className}`}>
      {/* Base Genuine Furniture Product Image */}
      <img
        src={currentImage}
        alt={product.name}
        referrerPolicy="no-referrer"
        style={getImageFilterStyle()}
        className="w-full h-full object-cover object-center transition-all duration-500 ease-out"
      />

      {/* Dynamic Material / Finish Shader Overlay (Preserves authentic highlights & contours) */}
      {isCustomEffectActive && (
        <>
          {/* Subtle color blend layer */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 mix-blend-color opacity-25"
            style={getCustomShaderStyle()}
          />
          {/* Subtle warm soft-light finish layer */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 mix-blend-soft-light opacity-30"
            style={getCustomShaderStyle()}
          />
          {/* Shadow & grain retention layer */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 mix-blend-multiply opacity-15"
            style={{
              backgroundColor: selectedWood?.hex || '#332C2A',
            }}
          />
        </>
      )}

      {/* Live Customization Active Floating Tag */}
      {showCustomBadge && isCustomized && (
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 pointer-events-none">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#2B2220]/90 backdrop-blur-md text-white text-[10px] font-semibold tracking-wider uppercase rounded-md shadow-md border border-white/10">
            <Sparkles size={11} className="text-[#C17D3C] animate-pulse" />
            <span>Customized Finish</span>
          </div>

          <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-[#2B2220] font-medium shadow-xs border border-[#E6DDD0]">
            {selectedWood && (
              <div className="flex items-center gap-1">
                <span
                  className="w-2.5 h-2.5 rounded-full border border-black/20"
                  style={{ backgroundColor: selectedWood.hex }}
                />
                <span className="truncate max-w-[100px]">{selectedWood.name}</span>
              </div>
            )}
            {selectedWood && selectedFabric && <span className="text-[#9E8E87]">&bull;</span>}
            {selectedFabric && (
              <div className="flex items-center gap-1">
                <span
                  className="w-2.5 h-2.5 rounded-full border border-black/20"
                  style={{ backgroundColor: selectedFabric.hex }}
                />
                <span className="truncate max-w-[100px]">{selectedFabric.name}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Interactive Toggle Pill on Bottom-Left */}
      {interactiveToggle && isCustomized && (
        <div className="absolute bottom-3 left-3 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setCustomEffectEnabled(!customEffectEnabled);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 hover:bg-white text-[#2B2220] text-[11px] font-medium shadow-md border border-[#E6DDD0] backdrop-blur-xs transition-all cursor-pointer"
            title="Toggle between custom finish preview and natural state"
          >
            <SlidersHorizontal size={12} className="text-[#C17D3C]" />
            <span>{customEffectEnabled ? 'Preview: Custom Finish' : 'Preview: Original'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
