import React from 'react';

interface HeroSectionProps {
  onOpenApply: () => void;
  onScrollToCalculator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenApply,
  onScrollToCalculator
}) => {
  return (
    <section className="px-4 pt-5 pb-6 flex flex-col gap-4">
      {/* Live Status Pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fda4c9]/30 text-[#3c0223] self-start shadow-xs border border-[#fda4c9]/40">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d91b77] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d91b77]"></span>
        </span>
        <span className="text-xs font-bold tracking-wide">Nexora Official Partner Portal 2025</span>
      </div>

      {/* High-Impact Hinglish Headline */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1c1c19] tracking-tight leading-tight">
          Nexora Growth Partner बनें —{' '}
          <span className="text-[#d91b77] underline decoration-[#fda4c9] underline-offset-4">
            Zero Investment
          </span>{' '}
          में हर महीने ₹1,00,000+ तक कमाएं
        </h1>
        <p className="text-sm sm:text-base text-[#594047] leading-relaxed">
          Nexora के साथ अपने नेटवर्क को मोनेटाइज करें। Unlimited recurring payouts, milestone cash rewards और dedicated manager support.
        </p>
      </div>

      {/* Dual Action CTAs */}
      <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
        <button
          onClick={onOpenApply}
          className="h-12 px-6 rounded-full bg-[#d91b77] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#d91b77]/25 transition-transform duration-200 active:scale-95 hover:bg-[#b1005e] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
          Partner Program Join करें (Free)
        </button>
        <button
          onClick={onScrollToCalculator}
          className="h-12 px-5 rounded-full bg-[#e5e2dd] text-[#3c0223] font-bold text-sm flex items-center justify-center gap-2 transition-colors active:scale-95 hover:bg-[#dcdad5] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">calculate</span>
          Earnings Calculator देखें
        </button>
      </div>

      {/* Verified Trust Badges */}
      <div className="grid grid-cols-3 gap-2.5 pt-2">
        <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#f6f3ee] text-center gap-1 shadow-xs border border-[#e5e2dd]">
          <span className="material-symbols-outlined text-[#d91b77] text-[24px]">bolt</span>
          <span className="text-xs text-[#1c1c19] font-bold">Instant Activation</span>
          <span className="text-[10px] text-[#594047] font-medium">2 Min KYC</span>
        </div>
        <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#f6f3ee] text-center gap-1 shadow-xs border border-[#e5e2dd]">
          <span className="material-symbols-outlined text-[#735c00] text-[24px]">verified_user</span>
          <span className="text-xs text-[#1c1c19] font-bold">100% Verified</span>
          <span className="text-[10px] text-[#594047] font-medium">Direct Bank Transfer</span>
        </div>
        <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#f6f3ee] text-center gap-1 shadow-xs border border-[#e5e2dd]">
          <span className="material-symbols-outlined text-[#8e4767] text-[24px]">groups</span>
          <span className="text-xs text-[#1c1c19] font-bold">5,200+ Partners</span>
          <span className="text-[10px] text-[#594047] font-medium">Active Pan-India</span>
        </div>
      </div>
    </section>
  );
};
