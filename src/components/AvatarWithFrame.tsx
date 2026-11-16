import React from 'react';
import { getFramePreset, isCustomImageValue } from '../constants/membershipDesigns';
import { OrnateFrameSvg } from './OrnateFrameSvg';

export interface AvatarWithFrameProps {
  src: string;
  alt: string;
  frame?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  presenceState?: 'online' | 'away' | 'offline';
  isGhost?: boolean;
  isVoice?: boolean;
  className?: string;
  imgClassName?: string;
  grayscale?: boolean;
  showPresenceDot?: boolean;
  presenceTitle?: string;
}

const SIZE_CLASSES: Record<NonNullable<AvatarWithFrameProps['size']>, { box: string; dot: string; overlayInset: string }> = {
  xs: { box: 'w-9 h-9', dot: 'w-2.5 h-2.5 -top-0.5 -right-0.5', overlayInset: '-inset-[24%] w-[148%] h-[148%]' },
  sm: { box: 'w-11 h-11', dot: 'w-3 h-3 -top-0.5 -right-0.5', overlayInset: '-inset-[27%] w-[154%] h-[154%]' },
  md: { box: 'w-12 h-12', dot: 'w-3 h-3 -top-0.5 -right-0.5', overlayInset: '-inset-[27%] w-[154%] h-[154%]' },
  lg: { box: 'w-20 h-20', dot: 'w-4 h-4 bottom-0 left-0', overlayInset: '-inset-[27%] w-[154%] h-[154%]' },
  xl: { box: 'w-24 h-24', dot: 'w-4 h-4 bottom-0 left-0', overlayInset: '-inset-[27%] w-[154%] h-[154%]' }
};

export const AvatarWithFrame: React.FC<AvatarWithFrameProps> = ({
  src,
  alt,
  frame,
  size = 'md',
  presenceState,
  isGhost,
  isVoice,
  className = '',
  imgClassName = '',
  grayscale = false,
  showPresenceDot = false,
  presenceTitle
}) => {
  const dim = SIZE_CLASSES[size];
  const preset = getFramePreset(frame);
  const customFrameUrl = !preset && isCustomImageValue(frame) ? frame : undefined;
  const radiusClass = preset ? 'rounded-full' : size === 'lg' || size === 'xl' ? 'rounded-full' : 'rounded-lg';

  const renderPresenceDot = () => {
    if (!showPresenceDot && !isVoice) return null;
    if (showPresenceDot) {
      if (isGhost) {
        return (
          <span
            className={`absolute z-30 rounded-full bg-blue-500 border-2 border-slate-900 shadow-xs ring-1 ring-blue-400 ${dim.dot}`}
            title={presenceTitle || 'متواجد ولكن بوضع مخفي 🔵'}
          />
        );
      }
      if (presenceState === 'away') {
        return (
          <span
            className={`absolute z-30 rounded-full bg-amber-400 border-2 border-slate-900 shadow-xs animate-pulse ${dim.dot}`}
            title={presenceTitle || 'في الخلفية (بالانتظار) 🟡'}
          />
        );
      }
      if (presenceState === 'offline') {
        return (
          <span
            className={`absolute z-30 rounded-full bg-slate-400 border-2 border-slate-900 ${dim.dot}`}
            title={presenceTitle || 'غير متصل ⚪'}
          />
        );
      }
      return (
        <span
          className={`absolute z-30 rounded-full bg-emerald-500 border-2 border-slate-900 shadow-xs ${dim.dot}`}
          title={presenceTitle || 'متواجد ونشط 🟢'}
        />
      );
    }
    if (isVoice) {
      return <span className="absolute z-30 bottom-0 left-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" />;
    }
    return null;
  };

  // Case 1: Built-in luxury ornate 3D SVG + animated frame preset
  if (preset) {
    return (
      <div
        className={`relative inline-flex items-center justify-center shrink-0 overflow-visible ${dim.box} ${className}`}
        style={{ filter: `drop-shadow(0 0 6px ${preset.glowColor})` }}
      >
        {/* Subtle animated metallic halo under-ring */}
        <div
          aria-hidden="true"
          className={`absolute inset-[-2px] rounded-full opacity-75 ${
            preset.animated ? (preset.spinFast ? 'avatar-frame-spin-fast' : 'avatar-frame-spin') : ''
          }`}
          style={{ background: preset.gradient }}
        />

        {/* Circular profile picture nested cleanly inside transparent SVG frame aperture */}
        <div className="relative z-10 w-full h-full overflow-hidden rounded-full bg-slate-950">
          <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover rounded-full ${grayscale ? 'grayscale' : ''} ${imgClassName}`}
          />
        </div>

        {/* High-detail sculpted SVG overlay (wings, crowns, dragon waves, orbiting planets, halos, VIP ribbons) */}
        <OrnateFrameSvg
          variant={preset.svgVariant}
          className={`absolute z-20 ${dim.overlayInset}`}
        />

        {renderPresenceDot()}
      </div>
    );
  }

  // Case 2: Uploaded custom image frame overlay from device
  if (customFrameUrl) {
    return (
      <div className={`relative inline-flex items-center justify-center shrink-0 ${dim.box} ${className}`}>
        <img
          src={src}
          alt={alt}
          className={`w-full h-full ${radiusClass} object-cover shadow-sm ${grayscale ? 'grayscale' : ''} ${imgClassName}`}
        />
        <img
          src={customFrameUrl}
          alt="إطار العضوية"
          aria-hidden="true"
          className="pointer-events-none select-none absolute inset-0 w-full h-full scale-[1.24] object-contain z-20 drop-shadow-md"
        />
        {renderPresenceDot()}
      </div>
    );
  }

  // Case 3: Default standard avatar (no frame)
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${dim.box} ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`w-full h-full ${radiusClass} object-cover border border-amber-500/50 shadow-sm ${grayscale ? 'grayscale' : ''} ${imgClassName}`}
      />
      {renderPresenceDot()}
    </div>
  );
};
