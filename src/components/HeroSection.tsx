import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Play,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Award,
  Zap,
  CheckCircle2,
  Clock,
  ChevronRight,
  Smartphone,
  Layers,
  Store,
  DollarSign,
  Users,
  X,
  Volume2
} from 'lucide-react';
import { NexoraLogo } from './NexoraLogo';

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
  const [activeTab, setActiveTab] = useState<'salon-os' | 'partner-engine' | 'cinematic-reel'>('salon-os');
  const [showShowreelModal, setShowShowreelModal] = useState(false);
  const [liveTickerIndex, setLiveTickerIndex] = useState(0);

  const LIVE_ACTIVITIES = [
    { text: 'Luxe Salon & Spa, Bandra completed ₹4,850 checkout on Nexora POS', tag: 'Live Billing', icon: '💇' },
    { text: 'Partner Rohit Verma unlocked ₹3,500 Pro Merchant Activation Reward', tag: 'Partner Payout', icon: '💰' },
    { text: 'Glamour Room, Indiranagar booked 8 bridal slots via WhatsApp Bot', tag: 'Smart Booking', icon: '✨' },
    { text: 'Level 4 Milestone achieved: Apple iPhone 16 Pro claimed by Priya M.', tag: 'Milestone Reward', icon: '👑' },
    { text: 'Truefitt & Hill connected 3 new branches to Nexora Cloud OS', tag: 'Franchise Sync', icon: '🏢' }
  ];

  // Rotate live activity toast
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveTickerIndex((prev) => (prev + 1) % LIVE_ACTIVITIES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [LIVE_ACTIVITIES.length]);

  // Lock body scroll when showreel modal is active
  useEffect(() => {
    if (showShowreelModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showShowreelModal]);

  return (
    <section id="hero-section" className="w-full max-w-full flex flex-col gap-4 sm:gap-6 lg:gap-8 relative pb-2 sm:pb-4">
      {/* 1. CINEMATIC HERO THEATER BANNER */}
      <div className="relative rounded-2xl sm:rounded-3xl md:rounded-[36px] overflow-hidden bg-[#0d0309] text-white shadow-2xl border border-white/10 ring-1 ring-[#b1005e]/30">
        {/* Cinematic Backdrop Image with Layered Atmospheric Shimmer */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/cinematic-hero-bg.jpg"
            alt="Nexora Salon OS Cinematic High-End Flagship Showroom"
            className="w-full h-full object-cover object-center opacity-30 sm:opacity-40 scale-105 filter contrast-110 brightness-90 animate-pulse duration-[10000ms]"
            referrerPolicy="no-referrer"
          />
          {/* Moody Anamorphic Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0309] via-[#0d0309]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0309] via-[#0d0309]/85 to-[#0d0309]/50" />
          {/* Magenta & Champagne Ambient Lens Flare Blooms */}
          <div className="absolute -top-24 -left-24 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#E6007E]/25 blur-[100px] sm:blur-[120px]" />
          <div className="absolute top-1/2 -right-24 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#f59e0b]/15 blur-[100px] sm:blur-[130px]" />
          <div className="absolute bottom-0 left-1/3 w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-[#b1005e]/20 blur-[80px] sm:blur-[100px]" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 p-4 sm:p-7 md:p-10 lg:p-14 flex flex-col gap-5 sm:gap-8">
          {/* Top Cinematic Status Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 sm:pb-5">
            {/* Live Ticker Pill */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs text-white/90 shadow-sm max-w-full overflow-hidden">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E6007E] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E6007E]" />
              </span>
              <span className="font-extrabold tracking-wider uppercase text-[10px] sm:text-[11px] text-[#fda4c9] shrink-0">
                Live Network
              </span>
              <span className="text-white/30">|</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={liveTickerIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="font-medium text-[10px] sm:text-xs text-white/90 truncate flex-1"
                >
                  <span className="mr-1">{LIVE_ACTIVITIES[liveTickerIndex].icon}</span>
                  {LIVE_ACTIVITIES[liveTickerIndex].text}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Quick Action Navigation */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setShowShowreelModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[11px] sm:text-xs font-bold transition-all cursor-pointer backdrop-blur-xs active:scale-95 group"
              >
                <Play className="w-3 h-3 text-[#fda4c9] fill-[#fda4c9] group-hover:scale-110 transition-transform" />
                <span>60s Tour</span>
              </button>

              {onNavigateToLeaderboard && (
                <button
                  type="button"
                  onClick={onNavigateToLeaderboard}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ffd9e2]/15 hover:bg-[#ffd9e2]/25 text-[#fda4c9] border border-[#fda4c9]/30 text-[11px] sm:text-xs font-bold transition-all cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5 text-[#fda4c9]" />
                  <span>Leaderboard</span>
                </button>
              )}
            </div>
          </div>

          {/* Main Hero Visual Split: Left Value & Centerpiece, Right Interactive OS Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Left Column: Official Logo Branding, Title & Value Prop */}
            <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-5 text-left">
              {/* Official Brand Logo Centerpiece Badge */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="p-2 sm:p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg inline-flex items-center gap-2.5 sm:gap-3">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-[#E6007E] to-amber-300 shrink-0 shadow-md">
                    <img
                      src="/nexora-logo.jpg"
                      alt="Nexora Salon OS Official Artwork Logo"
                      className="w-full h-full object-cover rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col pr-1 sm:pr-2">
                    <span className="font-serif font-black text-base sm:text-xl tracking-[0.14em] uppercase text-white leading-none">
                      NEXORA
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-black tracking-[0.25em] text-[#fda4c9] uppercase leading-tight mt-0.5 sm:mt-1">
                      SALON OS
                    </span>
                    <span className="text-[8px] sm:text-[9px] text-white/70 font-semibold uppercase tracking-wider hidden sm:block">
                      YOUR SALON • YOUR BRAND • YOUR SUCCESS.
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f59e0b]/15 border border-[#f59e0b]/40 text-[#fcd34d] text-[10px] sm:text-xs font-bold">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Salon OS 2026</span>
                </div>
              </div>

              {/* High-Impact Bilingual Cinematic Headline */}
              <div className="space-y-1.5 sm:space-y-2">
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[46px] font-serif font-black text-white tracking-tight leading-[1.18] sm:leading-[1.12]">
                  The Operating System for Every Salon.{' '}
                  <span className="bg-gradient-to-r from-[#fda4c9] via-[#E6007E] to-[#ffd269] bg-clip-text text-transparent font-sans">
                    Zero Investment
                  </span>{' '}
                  for Growth Partners.
                </h1>
                <p className="text-xs sm:text-base text-[#fda4c9] font-medium tracking-wide font-sans">
                  सैलून, स्पा और वेलनेस स्टोर्स का संपूर्ण डिजिटल पॉवरहाउस — ₹0 निवेश में अनलिमिटेड लाइफटाइम रिकरिंग ब्रोकरेज।
                </p>
              </div>

              {/* Tagline Showcase Banner */}
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-white/[0.08] via-white/[0.04] to-transparent border border-white/10 backdrop-blur-md flex items-center justify-between gap-3">
                <div className="flex flex-col">
                  <span className="text-[9px] sm:text-[10px] font-bold text-white/50 tracking-widest uppercase">
                    Brand Philosophy
                  </span>
                  <span className="text-[11px] sm:text-sm font-extrabold text-white tracking-wider">
                    YOUR SALON<span className="text-[#E6007E] mx-1">•</span>YOUR BRAND
                    <span className="text-[#E6007E] mx-1">•</span>YOUR SUCCESS.
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-xs text-[#fcd34d] font-bold bg-[#f59e0b]/20 px-3 py-1 rounded-full border border-[#f59e0b]/30 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                  <span>ISO &amp; SEBI Compliant</span>
                </div>
              </div>

              {/* Core Value Statement */}
              <p className="text-xs sm:text-base text-white/80 leading-relaxed font-sans">
                Join India's most prestigious beauty fintech ecosystem. Enable local salon owners with
                lightning-fast smart billing POS, staff commission tracking, and automated client rebooking —
                while earning <strong className="text-white">₹1,500 to ₹10,000 instant activation rewards</strong> and
                milestone cars, bikes, and international vacations.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-1 w-full sm:w-auto">
                {registeredPartner ? (
                  <button
                    type="button"
                    onClick={onNavigateToDashboard}
                    className="w-full sm:w-auto min-h-[44px] h-12 sm:h-14 px-6 sm:px-8 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#E6007E] via-[#d91b77] to-[#b1005e] text-white font-bold text-xs sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-[#E6007E]/30 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                  >
                    <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Open Partner Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onOpenApply}
                    className="w-full sm:w-auto min-h-[44px] h-12 sm:h-14 px-6 sm:px-8 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#E6007E] via-[#d91b77] to-[#b1005e] text-white font-bold text-xs sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-[#E6007E]/30 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer ring-2 ring-[#fda4c9]/40"
                  >
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
                    <span>Join Free Partner Program (₹0 Fee)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={onScrollToCalculator}
                  className="w-full sm:w-auto min-h-[44px] h-12 sm:h-14 px-5 sm:px-6 rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs sm:text-base flex items-center justify-center gap-2 backdrop-blur-md transition-all cursor-pointer active:scale-95"
                >
                  <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-[#fda4c9]" />
                  <span>Calculate Earnings</span>
                </button>
              </div>

              {/* Freedom Chips Strip */}
              <div className="flex items-center gap-1.5 sm:gap-2.5 flex-wrap pt-1">
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg sm:rounded-xl bg-white/10 border border-white/15 text-[10px] sm:text-xs font-bold text-white/90 backdrop-blur-xs">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Zero Target</span>
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg sm:rounded-xl bg-white/10 border border-white/15 text-[10px] sm:text-xs font-bold text-white/90 backdrop-blur-xs">
                  <Clock className="w-3 h-3 text-amber-300" />
                  <span>100% Freedom</span>
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg sm:rounded-xl bg-white/10 border border-white/15 text-[10px] sm:text-xs font-bold text-white/90 backdrop-blur-xs">
                  <ShieldCheck className="w-3 h-3 text-blue-300" />
                  <span>Monday Payouts</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Cinematic Showcase Card */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden bg-black/60 backdrop-blur-xl border border-white/15 p-4 sm:p-5 shadow-2xl relative">
                {/* Interactive Mode Tabs */}
                <div className="flex items-center gap-1.5 p-1 bg-white/10 rounded-2xl mb-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab('salon-os')}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeTab === 'salon-os'
                        ? 'bg-[#E6007E] text-white shadow-md'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>Salon OS</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('partner-engine')}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeTab === 'partner-engine'
                        ? 'bg-[#E6007E] text-white shadow-md'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Partner Engine</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('cinematic-reel')}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeTab === 'cinematic-reel'
                        ? 'bg-[#E6007E] text-white shadow-md'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Features</span>
                  </button>
                </div>

                {/* Tab 1: Live Salon OS POS Showcase */}
                {activeTab === 'salon-os' && (
                  <div className="space-y-3.5">
                    {/* Live Terminal Header */}
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-[#ffd9e2]/20 border border-[#E6007E]/40 flex items-center justify-center text-[#fda4c9]">
                          <Store className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-white">Nexora Express Billing POS</span>
                          <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            Live Terminal Connected
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-amber-300">₹4,850.00</span>
                    </div>

                    {/* Active Order Item Preview */}
                    <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
                        <span className="text-white/70">Client: Rhea Kapoor</span>
                        <span className="text-[#fda4c9] font-bold">Stylist: Sameer (Chair 2)</span>
                      </div>
                      <div className="space-y-1.5 text-[11px]">
                        <div className="flex justify-between text-white/80">
                          <span>Balayage Color + Hair Spa</span>
                          <span className="font-mono text-white">₹3,800</span>
                        </div>
                        <div className="flex justify-between text-white/80">
                          <span>Moroccanoil Treatment Serum</span>
                          <span className="font-mono text-white">₹1,050</span>
                        </div>
                      </div>
                    </div>

                    {/* Split Payout Breakdown */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-[10px] text-white/60 block">Salon Net Margin</span>
                        <span className="text-sm font-extrabold text-emerald-400">₹4,120</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-[10px] text-white/60 block">Partner Brokerage</span>
                        <span className="text-sm font-extrabold text-amber-300">₹350 Instant</span>
                      </div>
                    </div>

                    {/* Action */}
                    {onNavigateToSalonIntelligence && (
                      <button
                        type="button"
                        onClick={onNavigateToSalonIntelligence}
                        className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-white/10"
                      >
                        <span>Open Salon Intelligence CRM</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}

                {/* Tab 2: Partner Growth Engine Showcase */}
                {activeTab === 'partner-engine' && (
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#E6007E]/20 to-transparent border border-[#E6007E]/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-extrabold text-[#fda4c9]">Partner Payout Engine</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                          Zero Investment
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div className="p-2 rounded-xl bg-black/40 border border-white/10">
                          <span className="text-[10px] text-white/60 block">Instant Activation</span>
                          <span className="text-base font-black text-white">₹1,500 - ₹10,000</span>
                        </div>
                        <div className="p-2 rounded-xl bg-black/40 border border-white/10">
                          <span className="text-[10px] text-white/60 block">Top Milestone Fund</span>
                          <span className="text-base font-black text-amber-300">₹5,00,000</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-amber-300 text-sm">🏍️</span>
                          <span className="text-white/90">Royal Enfield Hunter 350</span>
                        </div>
                        <span className="text-[11px] font-bold text-[#fda4c9]">500 Salons</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-blue-300 text-sm">📱</span>
                          <span className="text-white/90">Apple iPhone 16 Pro Max</span>
                        </div>
                        <span className="text-[11px] font-bold text-[#fda4c9]">250 Salons</span>
                      </div>
                    </div>

                    {onNavigateToMilestones && (
                      <button
                        type="button"
                        onClick={onNavigateToMilestones}
                        className="w-full py-2.5 rounded-xl bg-[#E6007E] hover:bg-[#d91b77] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <span>View All 7 Milestone Ranks</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}

                {/* Tab 3: Cinematic Features Grid */}
                {activeTab === 'cinematic-reel' && (
                  <div className="space-y-2.5">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
                        <Smartphone className="w-4 h-4 text-[#fda4c9]" />
                        <span className="text-xs font-bold text-white">WhatsApp Bot</span>
                        <span className="text-[10px] text-white/60">Automated re-engagement &amp; reminders</span>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
                        <Users className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold text-white">Staff Ledger</span>
                        <span className="text-[10px] text-white/60">Automated chair &amp; tip commissions</span>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
                        <Layers className="w-4 h-4 text-amber-300" />
                        <span className="text-xs font-bold text-white">Multi-Branch Cloud</span>
                        <span className="text-[10px] text-white/60">Franchise inventory &amp; analytics</span>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
                        <ShieldCheck className="w-4 h-4 text-blue-300" />
                        <span className="text-xs font-bold text-white">Zero Chargebacks</span>
                        <span className="text-[10px] text-white/60">SEBI &amp; NPCI direct UPI routing</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowShowreelModal(true)}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-[#E6007E] text-white text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Launch Cinematic Visual Reel</span>
                    </button>
                  </div>
                )}

                {/* Footer Brand Slogan Watermark */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-white/60">
                  <span className="font-extrabold text-[#fda4c9] uppercase tracking-wider">
                    Nexora Salon OS
                  </span>
                  <span>Your Salon • Your Brand • Your Success</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cinematic Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 pt-4 sm:pt-6 border-t border-white/10">
            <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex flex-col">
              <span className="text-lg sm:text-2xl md:text-3xl font-black text-white font-serif">14,800+</span>
              <span className="text-[10px] sm:text-xs text-white/70 font-medium">Salons &amp; Spas Powered</span>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex flex-col">
              <span className="text-lg sm:text-2xl md:text-3xl font-black text-[#fda4c9] font-serif">₹142 Cr+</span>
              <span className="text-[10px] sm:text-xs text-white/70 font-medium">Processed Billing Volume</span>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex flex-col">
              <span className="text-lg sm:text-2xl md:text-3xl font-black text-amber-300 font-serif">₹5 Lakh</span>
              <span className="text-[10px] sm:text-xs text-white/70 font-medium">Top Tier Partner Bonus</span>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex flex-col">
              <span className="text-lg sm:text-2xl md:text-3xl font-black text-emerald-400 font-serif">99.98%</span>
              <span className="text-[10px] sm:text-xs text-white/70 font-medium">System Uptime &amp; SLA</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CINEMATIC SHOWREEL MODAL */}
      <AnimatePresence>
        {showShowreelModal && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#12050e] w-[calc(100%-16px)] sm:w-full max-w-2xl max-h-[90dvh] overflow-y-auto rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl flex flex-col text-white"
            >
              {/* Modal Header */}
              <div className="p-3.5 sm:p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden p-0.5 bg-[#E6007E] shrink-0">
                    <img
                      src="/nexora-logo.jpg"
                      alt="Nexora Salon OS"
                      className="w-full h-full object-cover rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] sm:text-xs font-black tracking-wider uppercase text-white">
                      Nexora Salon OS Showreel
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-[#fda4c9]">
                      YOUR SALON • YOUR BRAND • YOUR SUCCESS.
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowShowreelModal(false)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Video Teaser Simulated Showcase */}
              <div className="relative aspect-16/9 bg-black overflow-hidden flex items-center justify-center">
                <img
                  src="/cinematic-hero-bg.jpg"
                  alt="Cinematic Salon Flagship Showroom"
                  className="w-full h-full object-cover opacity-60 scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                
                {/* Center Audio/Video Visualizer */}
                <div className="relative z-10 flex flex-col items-center text-center p-4 sm:p-6 gap-2 sm:gap-3">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#E6007E] text-white flex items-center justify-center shadow-xl shadow-[#E6007E]/50 animate-pulse">
                    <Volume2 className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-base sm:text-xl font-serif font-black text-white">
                    Nexora Salon Operating System Showreel
                  </h3>
                  <p className="text-[11px] sm:text-xs text-white/80 max-w-md">
                    Experience how India's elite salons leverage Nexora Smart POS, stylist commission tracking, and recurring growth partner networks.
                  </p>
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="p-3.5 sm:p-4 bg-white/5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-white/70">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                  <span>Cloud Synchronized • 24/7 Priority Desk</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowShowreelModal(false);
                    onOpenApply();
                  }}
                  className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E6007E] to-[#b1005e] text-white text-xs font-black transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
                >
                  Apply as Growth Partner
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. LIGHT THEME QUICK ACCESS TILES & CAPABILITIES (Desktop Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-[#e5e2dd] shadow-xs hover:border-[#E6007E]/40 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-[#ffd9e2] text-[#b1005e] flex items-center justify-center shrink-0">
            <Zap className="w-6 h-6 text-[#b1005e]" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#1c1c19]">Smart Salon Billing POS</span>
            <span className="text-xs text-[#594047]">3-second checkout with direct UPI routing &amp; WhatsApp slips</span>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-[#e5e2dd] shadow-xs hover:border-amber-400/50 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-[#ffe088] text-[#735c00] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-[#735c00]" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#1c1c19]">Zero Target Partner Freedom</span>
            <span className="text-xs text-[#594047]">Work on your own terms with automated weekly Monday settlements</span>
          </div>
        </div>

        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-[#e5e2dd] shadow-xs hover:border-[#E6007E]/40 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-[#f6f3ee] text-[#1c1c19] flex items-center justify-center shrink-0 border border-[#e5e2dd]">
            <Award className="w-6 h-6 text-[#E6007E]" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#1c1c19]">5,200+ Active Partners</span>
            <span className="text-xs text-[#594047]">Pan-India growth network with ₹5 Lakh car fund milestone</span>
          </div>
        </div>
      </div>
    </section>
  );
};
