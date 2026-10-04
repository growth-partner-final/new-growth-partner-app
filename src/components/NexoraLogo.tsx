import React from 'react';

export interface NexoraLogoProps {
  variant?: 'horizontal' | 'vertical' | 'emblem' | 'full';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  theme?: 'light' | 'dark';
}

export const NexoraLogo: React.FC<NexoraLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  showTagline = false,
  className = '',
  theme = 'light'
}) => {
  const isDark = theme === 'dark';

  // Sizing definitions
  const imageSizeMap = {
    xs: 'w-7 h-7',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20 sm:w-24 sm:h-24'
  };

  const titleSizeMap = {
    xs: 'text-sm',
    sm: 'text-base',
    md: 'text-lg sm:text-xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-4xl md:text-5xl'
  };

  const subtitleSizeMap = {
    xs: 'text-[9px] tracking-widest',
    sm: 'text-[10px] tracking-widest',
    md: 'text-xs tracking-[0.2em]',
    lg: 'text-xs sm:text-sm tracking-[0.25em]',
    xl: 'text-sm sm:text-base tracking-[0.3em]'
  };

  const taglineSizeMap = {
    xs: 'text-[8px]',
    sm: 'text-[9px]',
    md: 'text-[10px] tracking-wider',
    lg: 'text-xs tracking-wider',
    xl: 'text-xs sm:text-sm tracking-widest'
  };

  // Emblem Only Variant
  if (variant === 'emblem') {
    return (
      <div className={`relative inline-flex items-center justify-center shrink-0 ${imageSizeMap[size]} ${className}`}>
        <img
          src="/nexora-logo.jpg"
          alt="Nexora Salon OS Emblem"
          className="w-full h-full object-contain rounded-full shadow-xs ring-1 ring-[#b1005e]/20"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // Vertical Stacked Variant (Centered, ideal for cinematic showcase, splash, or modals)
  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {/* Emblem */}
        <div className={`relative ${imageSizeMap[size]} mb-2.5 sm:mb-3`}>
          <div className="absolute inset-0 rounded-full bg-[#E6007E]/20 blur-md pointer-events-none scale-110" />
          <img
            src="/nexora-logo.jpg"
            alt="Nexora Salon OS Logo"
            className="w-full h-full object-contain rounded-full relative z-10 shadow-md ring-2 ring-[#E6007E]/30"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Wordmark */}
        <div className="flex flex-col items-center">
          <span
            className={`font-serif font-black tracking-[0.12em] uppercase leading-none ${titleSizeMap[size]} ${
              isDark ? 'text-white' : 'text-[#1c1c19]'
            }`}
          >
            NEXORA
          </span>

          {/* Elegant Star Divider */}
          <div className="flex items-center gap-2 my-1.5 opacity-80">
            <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-[#d91b77]" />
            <span className="text-[#E6007E] text-[10px]">✦</span>
            <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-[#d91b77]" />
          </div>

          <span
            className={`font-black uppercase leading-none text-[#b1005e] ${subtitleSizeMap[size]}`}
          >
            SALON OS
          </span>

          {showTagline && (
            <span
              className={`mt-2 font-bold uppercase ${
                isDark ? 'text-white/75' : 'text-[#594047]'
              } ${taglineSizeMap[size]}`}
            >
              YOUR SALON<span className="text-[#E6007E] mx-1">•</span>YOUR BRAND
              <span className="text-[#E6007E] mx-1">•</span>YOUR SUCCESS.
            </span>
          )}
        </div>
      </div>
    );
  }

  // Full Cinematic Hero / Showcase Variant
  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {/* Glowing Halo Emblem */}
        <div className="relative mb-4 group">
          <div className="absolute -inset-2 bg-gradient-to-r from-[#E6007E] via-[#b1005e] to-[#701a40] rounded-full blur-xl opacity-40 group-hover:opacity-65 transition-opacity duration-700" />
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 p-1 rounded-full bg-gradient-to-b from-white/90 to-white/40 backdrop-blur-md shadow-2xl ring-1 ring-white/60">
            <img
              src="/nexora-logo.jpg"
              alt="Nexora Salon OS Official Artwork"
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Serif Wordmark */}
        <div className="flex flex-col items-center">
          <h1
            className={`font-serif font-black tracking-[0.16em] uppercase leading-none ${titleSizeMap[size]} ${
              isDark ? 'text-white' : 'text-[#1c1c19]'
            }`}
          >
            NEXORA
          </h1>

          {/* Star Divider Line */}
          <div className="flex items-center gap-3 my-2.5 w-full max-w-[280px]">
            <span className="flex-1 h-[1.5px] bg-gradient-to-r from-transparent via-[#d91b77]/60 to-[#b1005e]" />
            <span className="text-[#E6007E] text-xs animate-pulse">✦</span>
            <span className="flex-1 h-[1.5px] bg-gradient-to-l from-transparent via-[#d91b77]/60 to-[#b1005e]" />
          </div>

          <span
            className={`font-black uppercase tracking-[0.35em] text-[#d91b77] leading-none ${subtitleSizeMap[size]}`}
          >
            SALON OS
          </span>

          {showTagline && (
            <p
              className={`mt-3 font-extrabold tracking-widest uppercase text-xs sm:text-sm ${
                isDark ? 'text-white/80' : 'text-[#594047]'
              }`}
            >
              YOUR SALON<span className="text-[#E6007E] mx-1.5">•</span>YOUR BRAND
              <span className="text-[#E6007E] mx-1.5">•</span>YOUR SUCCESS.
            </p>
          )}
        </div>
      </div>
    );
  }

  // Default: Horizontal Variant (Header, Navbar, Breadcrumbs)
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 min-w-0 ${className}`}>
      {/* Emblem */}
      <div className={`relative shrink-0 ${imageSizeMap[size]}`}>
        <img
          src="/nexora-logo.jpg"
          alt="Nexora Salon OS"
          className="w-full h-full object-contain rounded-full ring-1 ring-[#b1005e]/25 shadow-2xs"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Typography */}
      <div className="flex flex-col min-w-0 text-left">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-serif font-black tracking-tight leading-none ${titleSizeMap[size]} ${
              isDark ? 'text-white' : 'text-[#1c1c19]'
            }`}
          >
            NEXORA
          </span>
          <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-[#ffd9e2] text-[#b1005e]">
            OS
          </span>
        </div>
        <span
          className={`font-bold tracking-widest uppercase text-[10px] leading-tight ${
            isDark ? 'text-white/70' : 'text-[#8e4767]'
          }`}
        >
          SALON OS
        </span>
        {showTagline && (
          <span className="text-[9px] text-[#7d6f72] truncate hidden sm:inline-block font-semibold">
            Your Salon • Your Brand • Your Success
          </span>
        )}
      </div>
    </div>
  );
};
