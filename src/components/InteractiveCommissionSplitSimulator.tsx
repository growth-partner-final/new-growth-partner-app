import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TrendingUp,
  Percent,
  Sliders,
  DollarSign,
  Sparkles,
  Store,
  Layers,
  Award,
  Zap,
  ShieldCheck,
  Calendar,
  PieChart,
  BarChart3,
  ArrowRight,
  Info,
  ChevronRight,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

interface CommissionSimulatorProps {
  initialSalons?: number;
  initialAvgRevenue?: number;
  className?: string;
  onNavigateToLedger?: () => void;
  onNavigateToRewards?: () => void;
}

export interface SalonTier {
  id: string;
  name: string;
  category: string;
  minMonthlyRev: number;
  maxMonthlyRev: number;
  defaultAvgTicket: number;
  monthlyBookings: number;
  takeRate: number; // Nexora platform take rate (e.g. 10%)
  badgeColor: string;
  description: string;
}

const REVENUE_TIERS: SalonTier[] = [
  {
    id: 'boutique',
    name: 'Boutique / Single-Chair Studio',
    category: 'Tier 1 • Emerging',
    minMonthlyRev: 50000,
    maxMonthlyRev: 200000,
    defaultAvgTicket: 850,
    monthlyBookings: 180,
    takeRate: 0.10,
    badgeColor: 'bg-[#f0ede9] text-[#594047] border-[#e5e2dd]',
    description: 'Compact independent studios, nail bars, and solo artistry hubs.'
  },
  {
    id: 'premium',
    name: 'Mid-Scale Urban Salon',
    category: 'Tier 2 • Growth Engine',
    minMonthlyRev: 200000,
    maxMonthlyRev: 750000,
    defaultAvgTicket: 1450,
    monthlyBookings: 320,
    takeRate: 0.10,
    badgeColor: 'bg-[#ffd9e2]/60 text-[#8e004a] border-[#ffd9e2]',
    description: 'Standard 4-8 station city salon with recurring weekly clientele.'
  },
  {
    id: 'luxury',
    name: 'High-Volume Luxury Spa & Salon',
    category: 'Tier 3 • High Grossing',
    minMonthlyRev: 750000,
    maxMonthlyRev: 2500000,
    defaultAvgTicket: 2800,
    monthlyBookings: 650,
    takeRate: 0.10,
    badgeColor: 'bg-[#ffe088]/40 text-[#4f3d00] border-[#cca730]',
    description: 'Multi-chair luxury chains, bridal studios, and wellness spas.'
  },
  {
    id: 'flagship',
    name: 'Enterprise Multi-Branch Franchise',
    category: 'Tier 4 • Enterprise Flagship',
    minMonthlyRev: 2500000,
    maxMonthlyRev: 8000000,
    defaultAvgTicket: 4200,
    monthlyBookings: 1200,
    takeRate: 0.10,
    badgeColor: 'bg-[#ffd8e5] text-[#3c0223] border-[#8e4767]',
    description: 'High-throughput flagship outlets and regional salon franchises.'
  }
];

export const InteractiveCommissionSplitSimulator: React.FC<CommissionSimulatorProps> = ({
  initialSalons = 8,
  initialAvgRevenue = 350000,
  className = '',
  onNavigateToLedger,
  onNavigateToRewards
}) => {
  // Slider state
  const [salonCount, setSalonCount] = useState<number>(initialSalons);
  const [salonMonthlyRevenue, setSalonMonthlyRevenue] = useState<number>(initialAvgRevenue);
  const [selectedTierId, setSelectedTierId] = useState<string>('premium');
  
  // Commission split percentage override (default Nexora model: Month 1-6 = 10% of platform revenue, Month 7-12 = 5%)
  const [partnerSharePct, setPartnerSharePct] = useState<number>(10);
  const [timeHorizon, setTimeHorizon] = useState<'monthly' | 'halfYear' | 'annual'>('monthly');
  const [platformTakeRate] = useState<number>(0.10); // 10% platform take rate

  // Determine current active tier automatically from slider
  const activeTier = useMemo(() => {
    return REVENUE_TIERS.find(
      t => salonMonthlyRevenue >= t.minMonthlyRev && salonMonthlyRevenue <= t.maxMonthlyRev
    ) || (salonMonthlyRevenue < REVENUE_TIERS[0].minMonthlyRev ? REVENUE_TIERS[0] : REVENUE_TIERS[REVENUE_TIERS.length - 1]);
  }, [salonMonthlyRevenue]);

  // Quick select tier handler
  const handleSelectTier = (tier: SalonTier) => {
    setSelectedTierId(tier.id);
    const mid = (tier.minMonthlyRev + tier.maxMonthlyRev) / 2;
    setSalonMonthlyRevenue(mid);
  };

  // Calculations
  const metrics = useMemo(() => {
    // Total Network GMV generated per month by referred salons
    const totalNetworkGmv = salonMonthlyRevenue * salonCount;

    // Platform gross commission collected by Nexora (e.g. 10% Take Rate)
    const platformMonthlyCommission = totalNetworkGmv * platformTakeRate;

    // Partner brokerage monthly recurring share (partnerSharePct % of Nexora's platform commission)
    const partnerMonthlyPayout = platformMonthlyCommission * (partnerSharePct / 100);

    // M1-M6 High Acceleration Phase (10% partner split)
    const m1to6Monthly = platformMonthlyCommission * 0.10;
    const m1to6Total = m1to6Monthly * 6;

    // M7-M12 Sustained Royalty Phase (5% partner split)
    const m7to12Monthly = platformMonthlyCommission * 0.05;
    const m7to12Total = m7to12Monthly * 6;

    // Total Year 1 Recurring Contract Value
    const totalYearOneRecurring = m1to6Total + m7to12Total;

    // Extra Onboarding 15-Day Ramp Bounty (10% on first 15-day revenue, ~50% of 1st month GMV)
    const extraRampBounty = (totalNetworkGmv * 0.50 * platformTakeRate) * 0.10;

    // Total Combined 1st Year Earnings (Recurring + Onboarding Ramp)
    const totalCombinedYear1 = totalYearOneRecurring + extraRampBounty;

    // Average payout per salon per month
    const payoutPerSalon = salonCount > 0 ? partnerMonthlyPayout / salonCount : 0;

    // Milestone Progress Indicator
    let unlockedMilestone = 'None yet';
    let nextMilestone = 'Tier 1: Tech Pack (5 Salons)';
    let milestoneTarget = 5;

    if (salonCount >= 100) {
      unlockedMilestone = 'Tier 7: Mahindra XUV700 (100 Salons)';
      nextMilestone = 'Max Milestone Unlocked!';
      milestoneTarget = 100;
    } else if (salonCount >= 50) {
      unlockedMilestone = 'Tier 6: Rolex Submariner (50 Salons)';
      nextMilestone = 'Tier 7: Mahindra XUV700 (100 Salons)';
      milestoneTarget = 100;
    } else if (salonCount >= 30) {
      unlockedMilestone = 'Tier 5: Europe Partner Retreat (30 Salons)';
      nextMilestone = 'Tier 6: Rolex Submariner (50 Salons)';
      milestoneTarget = 50;
    } else if (salonCount >= 20) {
      unlockedMilestone = 'Tier 4: Ather 450X EV Scooter (20 Salons)';
      nextMilestone = 'Tier 5: Europe Partner Retreat (30 Salons)';
      milestoneTarget = 30;
    } else if (salonCount >= 10) {
      unlockedMilestone = 'Tier 3: HP ProBook Laptop (10 Salons)';
      nextMilestone = 'Tier 4: Ather 450X EV Scooter (20 Salons)';
      milestoneTarget = 20;
    } else if (salonCount >= 5) {
      unlockedMilestone = 'Tier 1: Tech Pack (5 Salons)';
      nextMilestone = 'Tier 2: Samsung Galaxy Tab (8 Salons)';
      milestoneTarget = 8;
    }

    return {
      totalNetworkGmv,
      platformMonthlyCommission,
      partnerMonthlyPayout,
      m1to6Monthly,
      m1to6Total,
      m7to12Monthly,
      m7to12Total,
      totalYearOneRecurring,
      extraRampBounty,
      totalCombinedYear1,
      payoutPerSalon,
      unlockedMilestone,
      nextMilestone,
      milestoneTarget
    };
  }, [salonCount, salonMonthlyRevenue, partnerSharePct, platformTakeRate]);

  // Format currency in Indian Rupees notation
  const formatINR = (val: number) => {
    return '₹' + Math.round(val).toLocaleString('en-IN');
  };

  return (
    <div className={`w-full bg-[#ffffff] rounded-2xl border border-[#e5e2dd] shadow-sm overflow-hidden flex flex-col ${className}`}>
      {/* Header with Title & Badge */}
      <div className="p-6 bg-gradient-to-r from-[#fcf9f4] to-[#f6f3ee] border-b border-[#e5e2dd] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#d91b77] text-white flex items-center justify-center shadow-[0_4px_16px_rgba(217,27,119,0.25)] flex-shrink-0">
            <Percent className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-[#ffd9e2] text-[#8e004a] text-[10px] font-extrabold uppercase tracking-wider">
                Dynamic Brokerage Model
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#ffe088]/40 text-[#4f3d00] text-[10px] font-extrabold uppercase tracking-wider">
                10% Take-Rate Split
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-[#1c1c19] tracking-tight mt-1">
              Interactive Commission Split Simulator
            </h3>
            <p className="text-xs text-[#594047] mt-0.5">
              Drag the sliders below to simulate how different salon revenue tiers and merchant counts impact your monthly recurring cash flow.
            </p>
          </div>
        </div>

        {/* Time Horizon Filter Tabs */}
        <div className="flex items-center bg-[#f0ede9] p-1 rounded-xl border border-[#e5e2dd] self-stretch md:self-auto">
          <button
            onClick={() => setTimeHorizon('monthly')}
            className={`flex-1 md:flex-none px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              timeHorizon === 'monthly'
                ? 'bg-[#ffffff] text-[#b1005e] shadow-xs'
                : 'text-[#594047] hover:text-[#1c1c19]'
            }`}
            type="button"
          >
            Monthly Run-Rate
          </button>
          <button
            onClick={() => setTimeHorizon('halfYear')}
            className={`flex-1 md:flex-none px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              timeHorizon === 'halfYear'
                ? 'bg-[#ffffff] text-[#b1005e] shadow-xs'
                : 'text-[#594047] hover:text-[#1c1c19]'
            }`}
            type="button"
          >
            6-Month Peak (10%)
          </button>
          <button
            onClick={() => setTimeHorizon('annual')}
            className={`flex-1 md:flex-none px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              timeHorizon === 'annual'
                ? 'bg-[#ffffff] text-[#b1005e] shadow-xs'
                : 'text-[#594047] hover:text-[#1c1c19]'
            }`}
            type="button"
          >
            Full Year 1 Projection
          </button>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: INTERACTIVE SLIDERS & TIER SELECTORS (7 Columns)             */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Quick Archetype Preset Cards */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#1c1c19] uppercase tracking-wider flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-[#b1005e]" />
                <span>1. Select Salon Revenue Tier Archetype</span>
              </label>
              <span className="text-[11px] font-semibold text-[#8e4767]">Click to apply baseline</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {REVENUE_TIERS.map(tier => {
                const isSelected = activeTier.id === tier.id;
                return (
                  <button
                    key={tier.id}
                    onClick={() => handleSelectTier(tier)}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#fcf9f4] border-[#b1005e] ring-2 ring-[#b1005e]/20 shadow-xs'
                        : 'bg-[#f6f3ee]/60 border-[#e5e2dd] hover:bg-[#f6f3ee] opacity-80 hover:opacity-100'
                    }`}
                    type="button"
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold border ${tier.badgeColor}`}>
                        {tier.id.toUpperCase()}
                      </span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#b1005e]" />}
                    </div>
                    <span className="text-xs font-extrabold text-[#1c1c19] line-clamp-1 leading-tight">
                      {tier.name.split('/')[0]}
                    </span>
                    <span className="text-[10px] text-[#594047] font-mono mt-1 font-semibold">
                      {formatINR(tier.minMonthlyRev)} - {formatINR(tier.maxMonthlyRev)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SLIDER 1: Average Monthly GMV per Salon */}
          <div className="p-4 rounded-xl bg-[#f6f3ee]/80 border border-[#e5e2dd] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#1c1c19] uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-[#b1005e]" />
                  <span>2. Average Monthly Gross Revenue (GMV) per Salon</span>
                </span>
                <span className="text-[11px] text-[#594047]">
                  Estimated client billings, treatments, and retail sales per salon outlet.
                </span>
              </div>
              <div className="px-3 py-1 rounded-xl bg-[#ffffff] border border-[#b1005e]/30 shadow-xs text-right">
                <span className="text-base font-extrabold text-[#b1005e] font-mono">
                  {formatINR(salonMonthlyRevenue)}
                </span>
                <span className="text-[10px] text-[#594047] block font-semibold">/ month / salon</span>
              </div>
            </div>

            {/* Range Input */}
            <div className="relative flex items-center pt-2">
              <input
                type="range"
                min={50000}
                max={5000000}
                step={25000}
                value={salonMonthlyRevenue}
                onChange={e => setSalonMonthlyRevenue(Number(e.target.value))}
                className="w-full h-2.5 bg-[#e5e2dd] rounded-lg appearance-none cursor-pointer accent-[#b1005e]"
              />
            </div>

            {/* Slider Markers */}
            <div className="flex justify-between text-[10px] font-bold text-[#8d6f77] px-1 font-mono">
              <span>₹50K (Boutique)</span>
              <span>₹500K (Mid-Scale)</span>
              <span>₹1.5M (Luxury)</span>
              <span>₹3.5M+ (Franchise)</span>
            </div>
          </div>

          {/* SLIDER 2: Number of Active Referred Salons */}
          <div className="p-4 rounded-xl bg-[#f6f3ee]/80 border border-[#e5e2dd] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#1c1c19] uppercase tracking-wider flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5 text-[#cca730]" />
                  <span>3. Active Referred Salon Network Size</span>
                </span>
                <span className="text-[11px] text-[#594047]">
                  Total verified salons processing customer appointments on Nexora.
                </span>
              </div>
              <div className="px-3 py-1 rounded-xl bg-[#ffffff] border border-[#cca730]/40 shadow-xs text-right">
                <span className="text-base font-extrabold text-[#735c00] font-mono">
                  {salonCount} {salonCount === 1 ? 'Salon' : 'Salons'}
                </span>
                <span className="text-[10px] text-[#594047] block font-semibold">in active portfolio</span>
              </div>
            </div>

            {/* Range Input */}
            <div className="relative flex items-center pt-2">
              <input
                type="range"
                min={1}
                max={100}
                step={1}
                value={salonCount}
                onChange={e => setSalonCount(Number(e.target.value))}
                className="w-full h-2.5 bg-[#e5e2dd] rounded-lg appearance-none cursor-pointer accent-[#735c00]"
              />
            </div>

            {/* Slider Markers */}
            <div className="flex justify-between text-[10px] font-bold text-[#8d6f77] px-1 font-mono">
              <span>1 Salon</span>
              <span>10 (Laptop)</span>
              <span>20 (Ather EV)</span>
              <span>50 (Rolex)</span>
              <span>100 (Mahindra SUV)</span>
            </div>
          </div>

          {/* SLIDER 3: Partner Commission Split Pct (Default 10% for M1-6) */}
          <div className="p-4 rounded-xl bg-[#f6f3ee]/80 border border-[#e5e2dd] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#1c1c19] uppercase tracking-wider flex items-center gap-1.5">
                  <Percent className="w-3.5 h-3.5 text-[#8e4767]" />
                  <span>4. Partner Commission Split Share</span>
                </span>
                <span className="text-[11px] text-[#594047]">
                  Standard contract: 10% during M1-M6, 5% during M7-M12 perpetual.
                </span>
              </div>
              <div className="px-3 py-1 rounded-xl bg-[#ffffff] border border-[#8e4767]/30 shadow-xs text-right">
                <span className="text-base font-extrabold text-[#8e4767] font-mono">
                  {partnerSharePct}% Share
                </span>
                <span className="text-[10px] text-[#594047] block font-semibold">of platform commission</span>
              </div>
            </div>

            {/* Range Input */}
            <div className="relative flex items-center pt-2">
              <input
                type="range"
                min={2.5}
                max={20}
                step={0.5}
                value={partnerSharePct}
                onChange={e => setPartnerSharePct(Number(e.target.value))}
                className="w-full h-2.5 bg-[#e5e2dd] rounded-lg appearance-none cursor-pointer accent-[#8e4767]"
              />
            </div>

            {/* Quick buttons for split presets */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] font-bold text-[#594047]">Contract Presets:</span>
              <button
                onClick={() => setPartnerSharePct(10)}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                  partnerSharePct === 10
                    ? 'bg-[#b1005e] text-white'
                    : 'bg-[#e5e2dd] text-[#1c1c19] hover:bg-[#dcdad5]'
                }`}
              >
                10% (Peak M1-M6)
              </button>
              <button
                onClick={() => setPartnerSharePct(5)}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                  partnerSharePct === 5
                    ? 'bg-[#b1005e] text-white'
                    : 'bg-[#e5e2dd] text-[#1c1c19] hover:bg-[#dcdad5]'
                }`}
              >
                5% (Sustained M7-M12)
              </button>
              <button
                onClick={() => setPartnerSharePct(15)}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                  partnerSharePct === 15
                    ? 'bg-[#b1005e] text-white'
                    : 'bg-[#e5e2dd] text-[#1c1c19] hover:bg-[#dcdad5]'
                }`}
              >
                15% (VIP Super-Partner)
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: REAL-TIME PAYOUT ENGINE & EARNINGS DASHBOARD (5 Columns)     */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Main Recurring Revenue Hero Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1c1c19] to-[#31302d] text-white shadow-lg flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#d91b77]/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-[#ffffff]/15 text-[#ffd9e2] text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-sm">
                  <Zap className="w-3 h-3 text-[#ffb1c8]" />
                  {timeHorizon === 'monthly'
                    ? 'Estimated Monthly Recurring Cashflow'
                    : timeHorizon === 'halfYear'
                    ? '6-Month Peak Horizon (10% Tier)'
                    : 'Total Year 1 Contract Value'}
                </span>
                <span className="text-[11px] font-mono text-[#e5e2dd] font-semibold">
                  {salonCount} {salonCount === 1 ? 'Salon' : 'Salons'}
                </span>
              </div>

              {/* Main Calculated Number */}
              <div className="flex flex-col my-1">
                <span className="text-3xl md:text-4xl font-extrabold text-[#ffffff] font-mono tracking-tight">
                  {timeHorizon === 'monthly' && formatINR(metrics.partnerMonthlyPayout)}
                  {timeHorizon === 'halfYear' && formatINR(metrics.m1to6Total)}
                  {timeHorizon === 'annual' && formatINR(metrics.totalCombinedYear1)}
                </span>
                <div className="flex items-center gap-2 mt-1 text-xs text-[#ffd9e2]">
                  <span className="font-semibold">
                    ≈ {formatINR(metrics.payoutPerSalon)} / salon / month
                  </span>
                  <span>•</span>
                  <span className="text-[#ffd8e5]/80">
                    Net after {partnerSharePct}% split
                  </span>
                </div>
              </div>

              {/* Split Breakdown Bar */}
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex flex-col gap-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#e5e2dd]">Total Network Monthly GMV</span>
                  <span className="font-mono text-white font-bold">{formatINR(metrics.totalNetworkGmv)}</span>
                </div>
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#e5e2dd]">Nexora Platform Gross (10%)</span>
                  <span className="font-mono text-[#ffd9e2] font-bold">{formatINR(metrics.platformMonthlyCommission)}</span>
                </div>
                <div className="w-full h-px bg-white/15"></div>
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-[#ffb1c8]">Your {partnerSharePct}% Brokerage Take</span>
                  <span className="font-mono text-[#ffffff]">{formatINR(metrics.partnerMonthlyPayout)}/mo</span>
                </div>
              </div>
            </div>

            {/* Bottom Horizon Progression */}
            <div className="mt-4 pt-4 border-t border-white/10 relative z-10 grid grid-cols-2 gap-2 text-xs">
              <div className="flex flex-col">
                <span className="text-[10px] text-[#e5e2dd] uppercase font-bold">M1-M6 Peak (10%)</span>
                <span className="font-bold text-white font-mono">{formatINR(metrics.m1to6Total)}</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[10px] text-[#e5e2dd] uppercase font-bold">M7-M12 Base (5%)</span>
                <span className="font-bold text-white font-mono">{formatINR(metrics.m7to12Total)}</span>
              </div>
            </div>
          </div>

          {/* Extra Onboarding Reward Bonus Banner */}
          <div className="p-4 rounded-xl bg-[#ffd9e2]/30 border border-[#ffd9e2] flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#d91b77] text-white flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-extrabold text-[#8e004a] uppercase tracking-wider">
                  + 15-Day Ramp Onboarding Bonus
                </span>
                <span className="text-xs text-[#594047]">
                  Instant payout: <strong className="text-[#1c1c19] font-mono">{formatINR(metrics.extraRampBounty)}</strong> upon merchant launch.
                </span>
              </div>
            </div>
            <button
              onClick={() => onNavigateToLedger && onNavigateToLedger()}
              className="px-2.5 py-1 rounded-lg bg-[#ffffff] hover:bg-[#f6f3ee] text-[#8e004a] border border-[#ffd9e2] text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer flex-shrink-0"
              type="button"
            >
              <span>Ledger</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* Physical Milestone Unlocked Card */}
          <div className="p-4 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#735c00]" />
                <span className="text-xs font-extrabold text-[#1c1c19] uppercase tracking-wider">
                  Milestone Asset Unlock
                </span>
              </div>
              <span className="text-[10px] font-extrabold text-[#735c00] px-2 py-0.5 rounded-full bg-[#ffe088]/40 border border-[#cca730]/40">
                {salonCount} / {metrics.milestoneTarget} Salons
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#ffffff] border border-[#e5e2dd] flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] text-[#594047] uppercase font-bold">Current Unlocked Asset:</span>
                <span className="text-xs font-bold text-[#1c1c19]">{metrics.unlockedMilestone}</span>
              </div>
              <button
                onClick={() => onNavigateToRewards && onNavigateToRewards()}
                className="px-2.5 py-1 rounded-lg bg-[#735c00] hover:bg-[#574500] text-white text-[10px] font-extrabold uppercase tracking-wider transition-colors cursor-pointer"
                type="button"
              >
                Claim
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#594047] pt-1">
              <span>Next Reward Tier:</span>
              <strong className="text-[#1c1c19]">{metrics.nextMilestone}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Audit Guarantee Notice */}
      <div className="px-6 py-3.5 bg-[#f6f3ee] border-t border-[#e5e2dd] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#594047]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#735c00] flex-shrink-0" />
          <span>
            Strict Anti-Encashment Protocol: Brokerage commissions disburse bi-weekly on the 1st and 16th via direct bank IMPS/NEFT.
          </span>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0 font-bold">
          <button
            onClick={() => {
              setSalonCount(12);
              setSalonMonthlyRevenue(450000);
              setPartnerSharePct(10);
            }}
            className="text-[#b1005e] hover:underline flex items-center gap-1 cursor-pointer"
            type="button"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>
    </div>
  );
};
