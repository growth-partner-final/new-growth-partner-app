import React from 'react';

interface HeroSectionProps {
  onOpenApply: () => void;
  onScrollToCalculator: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToSalonIntelligence?: () => void;
  onNavigateToLeaderboard?: () => void;
  onNavigateToMilestones?: () => void;
  registeredPartner?: { name: string; partnerId: string } | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenApply,
  onScrollToCalculator,
  onNavigateToDashboard,
  onNavigateToSalonIntelligence,
  onNavigateToLeaderboard,
  onNavigateToMilestones,
  registeredPartner
}) => {
  return (
    <section id="hero-section" className="w-full pt-2 pb-6 flex flex-col justify-center min-h-[85vh] gap-6 lg:gap-8">
      {/* 1. TOP ANNOUNCEMENT BADGE */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-[#e5e2dd]/70">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/75 backdrop-blur-md text-[#3c0223] shadow-xs border border-white/80 ring-1 ring-[#fda4c9]/40 hover:scale-[1.02] transition-transform duration-300">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E6007E] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E6007E]"></span>
          </span>
          <span className="text-xs font-extrabold tracking-wide">
            Nexora Official Partner Program 2025 • ₹0 Investment • Zero Monthly Target
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onNavigateToDashboard && (
            <button
              type="button"
              onClick={onNavigateToDashboard}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#3c0223] text-white text-xs font-bold hover:bg-[#1c1c19] transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px] text-[#fda4c9]">space_dashboard</span>
              <span>Open Partner Portal</span>
            </button>
          )}
          {onNavigateToSalonIntelligence && (
            <button
              type="button"
              onClick={onNavigateToSalonIntelligence}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#e5e2dd] text-[#1c1c19] text-xs font-bold hover:border-[#E6007E] hover:text-[#E6007E] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-[#E6007E]">storefront</span>
              <span>Salon CRM</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Hero Grid Layout: 2 Columns on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column: Core Value Proposition & CTAs */}
        <div className="lg:col-span-7 flex flex-col gap-5 text-left">
          {/* Badge & Rating Strip */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#ffe088]/60 border border-[#cca730]/40 text-[#574500] text-xs font-bold">
              <span className="material-symbols-outlined text-[16px] text-[#cca730]">verified</span>
              <span>SEBI &amp; ISO Compliant Platform</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#594047] font-semibold">
              <div className="flex text-amber-500">
                {'★★★★★'.split('').map((_, idx) => (
                  <span key={idx} className="text-amber-500 text-xs">★</span>
                ))}
              </div>
              <span><strong>4.9/5</strong> (5,200+ Active Partners)</span>
            </div>
          </div>

          {/* High-Impact Bilingual Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] font-black text-[#1c1c19] tracking-tight leading-[1.15]">
            Nexora Growth Partner बनें —{' '}
            <span className="bg-gradient-to-r from-[#E6007E] via-[#d91b77] to-[#b1005e] bg-clip-text text-transparent">
              Zero Investment
            </span>{' '}
            में हर महीने <span className="underline decoration-[#fda4c9] decoration-4 underline-offset-4">₹1,00,000+</span> कमाएं
          </h1>

          {/* 2. HERO SUB-TEXT HIGHLIGHTS: Premium Glassmorphism Bar with 2 Equal Sections */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/90 shadow-[0_8px_30px_rgba(230,0,126,0.06)] ring-1 ring-black/[0.03] grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-center transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_36px_rgba(230,0,126,0.1)]">
            {/* Left Section: Zero Monthly Target */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ffd9e2] to-[#ffc2d4] text-[#E6007E] flex items-center justify-center shrink-0 border border-[#fda4c9]/50 shadow-xs">
                <span className="material-symbols-outlined text-[22px]">verified_user</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs sm:text-sm font-black text-[#1c1c19] tracking-tight">Zero Monthly Target</span>
                <span className="text-[11px] sm:text-xs text-[#594047] font-medium leading-tight">Koi pressure nahi, kitna bhi kaam karein</span>
              </div>
            </div>

            {/* Right Section: Apni Marzi Ke Malik */}
            <div className="flex items-center gap-3 sm:border-l sm:border-[#e5e2dd]/80 sm:pl-3.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ffe088] to-[#ffd269] text-[#735c00] flex items-center justify-center shrink-0 border border-[#cca730]/40 shadow-xs">
                <span className="material-symbols-outlined text-[22px]">schedule</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs sm:text-sm font-black text-[#1c1c19] tracking-tight">Apni Marzi Ke Malik</span>
                <span className="text-[11px] sm:text-xs text-[#594047] font-medium leading-tight">Apne time aur schedule par boss ban ke kaam karein</span>
              </div>
            </div>
          </div>

          <p className="text-base sm:text-lg text-[#594047] leading-relaxed">
            सैलून, स्पा और वेलनेस मर्चेंट्स को भारत के सबसे एडवांस्ड डिजिटल वेल्थ व सैलून OS से जोड़ें। पाएं <strong className="text-[#1c1c19]">अनलिमिटेड रिकरिंग पेआउट्स</strong>, <strong className="text-[#1c1c19]">₹5,00,000 तक माइलस्टोन रिवॉर्ड्स</strong> और डेडिकेटेड ग्रोथ मैनेजर सपोर्ट।
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            {onNavigateToDashboard ? (
              <button
                type="button"
                onClick={onNavigateToDashboard}
                className="h-12 sm:h-14 px-7 rounded-2xl bg-gradient-to-r from-[#E6007E] via-[#d91b77] to-[#b1005e] text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-[#E6007E]/25 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[22px]">space_dashboard</span>
                <span>Open Partner Dashboard</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onOpenApply}
                className="h-12 sm:h-14 px-8 rounded-2xl bg-gradient-to-r from-[#E6007E] via-[#d91b77] to-[#b1005e] text-white font-bold text-base flex items-center justify-center gap-2.5 shadow-lg shadow-[#E6007E]/25 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[22px]">rocket_launch</span>
                <span>Join Partner Program (Free)</span>
              </button>
            )}
            
            <button
              type="button"
              onClick={onScrollToCalculator}
              className="h-12 sm:h-14 px-6 rounded-2xl bg-white/90 backdrop-blur-md text-[#3c0223] font-bold text-base flex items-center justify-center gap-2 border border-[#e5e2dd] transition-all hover:bg-[#f6f3ee] hover:border-[#E6007E] cursor-pointer shadow-xs active:scale-95"
            >
              <span className="material-symbols-outlined text-[22px] text-[#E6007E]">calculate</span>
              <span>Calculate Your Earnings</span>
            </button>
          </div>

          {/* 3. KEY FEATURE CHIPS (Prominent Freedom & Independence Badges) */}
          <div className="flex items-center gap-2.5 flex-wrap pt-1">
            {/* Prominent Chip 1: Zero Monthly Target */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-white via-white to-pink-50/60 backdrop-blur-md border border-[#fda4c9] text-xs font-extrabold text-[#1c1c19] shadow-xs ring-1 ring-[#fda4c9]/30 transition-all duration-200 hover:scale-105 cursor-default">
              <span className="material-symbols-outlined text-[17px] text-emerald-600">check_circle</span>
              <span>Zero Monthly Target</span>
            </div>
            {/* Prominent Chip 2: 100% Work Independence */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-white via-white to-amber-50/60 backdrop-blur-md border border-[#fde68a] text-xs font-extrabold text-[#1c1c19] shadow-xs ring-1 ring-[#fde68a]/40 transition-all duration-200 hover:scale-105 cursor-default">
              <span className="material-symbols-outlined text-[17px] text-[#E6007E]">lock_open</span>
              <span>100% Work Independence</span>
            </div>
            {/* Chip 3: No Fixed Working Hours */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/80 backdrop-blur-md border border-[#e5e2dd] text-xs font-bold text-[#594047] shadow-2xs transition-all duration-200 hover:scale-105 cursor-default">
              <span className="material-symbols-outlined text-[17px] text-amber-600">hourglass_disabled</span>
              <span>No Fixed Working Hours</span>
            </div>
          </div>

          {/* Live Partner Highlights Strip */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#e5e2dd]/80 max-w-xl">
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black text-[#1c1c19]">₹1.84 Cr+</span>
              <span className="text-xs text-[#594047] font-medium">Disbursed Payouts</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black text-[#E6007E]">Same Day</span>
              <span className="text-xs text-[#594047] font-medium">Direct Bank / UPI</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black text-[#735c00]">₹0 Cost</span>
              <span className="text-xs text-[#594047] font-medium">100% Free Lifetime</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Graphic Card & Partner Lifestyle Showcase */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-white/80 bg-white/90 backdrop-blur-xl p-4 sm:p-5">
            {/* Visual Header Image Banner */}
            <div className="relative rounded-2xl overflow-hidden aspect-4/3 mb-4 shadow-sm group">
              <img
                src="https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80"
                alt="Fintech Growth Partner onboarding premium merchant in modern salon lifestyle setting"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-[11px] font-bold self-start mb-1 backdrop-blur-xs">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  <span>Active Salon Onboarding</span>
                </div>
                <h3 className="text-base font-bold text-white leading-snug">
                  Transform Local Salons into High-Growth Businesses
                </h3>
                <p className="text-xs text-white/80">Earn on salon POS setup + recurring merchant billing</p>
              </div>
            </div>

            {/* Micro Floating Metric Badges with Clean White Card Styling */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white border border-[#e5e2dd] shadow-xs flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#ffd9e2] text-[#b1005e] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-[#594047] font-medium">Highest Monthly Payout</span>
                  <span className="text-sm font-extrabold text-[#1c1c19]">₹3,48,500</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#e5e2dd] shadow-xs flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#ffe088] text-[#735c00] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">emoji_events</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-[#594047] font-medium">Top Reward Tier</span>
                  <span className="text-sm font-extrabold text-[#735c00]">₹5,00,000 Car Fund</span>
                </div>
              </div>
            </div>

            {/* Quick Navigation Action Strip inside Graphic Card */}
            <div className="mt-4 pt-3 border-t border-[#e5e2dd] flex items-center justify-between text-xs">
              <span className="text-[#594047] font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-[#E6007E]">workspace_premium</span>
                <span>Verified Partner Network</span>
              </span>
              {onNavigateToMilestones && (
                <button
                  type="button"
                  onClick={onNavigateToMilestones}
                  className="text-[#E6007E] font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  <span>View 7 Milestones</span>
                  <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Feature Navigation Quick Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-2">
        {onNavigateToDashboard && (
          <button
            type="button"
            onClick={onNavigateToDashboard}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#e5e2dd] text-xs font-bold text-[#1c1c19] hover:border-[#E6007E] hover:text-[#E6007E] transition-all whitespace-nowrap shadow-xs cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[18px] text-[#E6007E]">analytics</span>
            <span>Earnings &amp; Stats</span>
          </button>
        )}
        {onNavigateToSalonIntelligence && (
          <button
            type="button"
            onClick={onNavigateToSalonIntelligence}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#e5e2dd] text-xs font-bold text-[#1c1c19] hover:border-[#E6007E] hover:text-[#E6007E] transition-all whitespace-nowrap shadow-xs cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[18px] text-[#E6007E]">storefront</span>
            <span>Salon Intelligence CRM</span>
          </button>
        )}
        {onNavigateToLeaderboard && (
          <button
            type="button"
            onClick={onNavigateToLeaderboard}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#e5e2dd] text-xs font-bold text-[#1c1c19] hover:border-[#E6007E] hover:text-[#E6007E] transition-all whitespace-nowrap shadow-xs cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[18px] text-[#cca730]">leaderboard</span>
            <span>Leaderboard</span>
          </button>
        )}
        {onNavigateToMilestones && (
          <button
            type="button"
            onClick={onNavigateToMilestones}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#e5e2dd] text-xs font-bold text-[#1c1c19] hover:border-[#E6007E] hover:text-[#E6007E] transition-all whitespace-nowrap shadow-xs cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[18px] text-[#E6007E]">military_tech</span>
            <span>Milestones Ladder</span>
          </button>
        )}
        <button
          type="button"
          onClick={onScrollToCalculator}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#e5e2dd] text-xs font-bold text-[#1c1c19] hover:border-[#E6007E] hover:text-[#E6007E] transition-all whitespace-nowrap shadow-xs cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-[18px] text-emerald-600">functions</span>
          <span>Income Calculator</span>
        </button>
      </div>

      {/* Trust & Capability Metric Cards: 3 Column Desktop Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-[#e5e2dd] shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-[#ffd9e2] text-[#b1005e] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[26px]">bolt</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#1c1c19]">Instant Activation &amp; KYC</span>
            <span className="text-xs text-[#594047]">2-minute paperless digital setup with automated verification</span>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-[#e5e2dd] shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-[#ffe088] text-[#735c00] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[26px]">verified_user</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#1c1c19]">Guaranteed Weekly Settlements</span>
            <span className="text-xs text-[#594047]">Direct bank transfer &amp; UPI credit every single Monday</span>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-[#e5e2dd] shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-[#f6f3ee] text-[#1c1c19] flex items-center justify-center shrink-0 border border-[#e5e2dd]">
            <span className="material-symbols-outlined text-[26px] text-[#E6007E]">groups</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#1c1c19]">5,200+ Active Growth Partners</span>
            <span className="text-xs text-[#594047]">Pan-India salon referral network with dedicated RM</span>
          </div>
        </div>
      </div>
    </section>
  );
};
