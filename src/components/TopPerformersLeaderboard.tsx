import React, { useState, useRef, useEffect } from 'react';

export type LeaderboardPeriod = 'current-month' | 'previous-month' | 'ytd';

export interface Performer {
  id: string;
  name: string;
  avatar: string;
  location: string;
  tier: 'Crown Ambassador' | 'Diamond Principal' | 'Platinum Lead' | 'Gold Partner';
  tierColor: string;
  tierBg: string;
  ytdEarnings: number;
  activationBonus: number;
  recurringShare: number;
  currentMonthEarnings: number;
  previousMonthEarnings: number;
  activeSalons: number;
  conversionRate: number;
  topSalon: string;
  currentMonthGrowth: string;
  prevMonthGrowth: string;
  ytdGrowth: string;
  joinedDate: string;
  badges: string[];
  julyRank?: number;
  q2Rank?: number;
}

export interface RankChangeBadgeProps {
  change: number; // positive = climbed (+1), negative = dropped (-1), 0 = unchanged
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const RankChangeBadge: React.FC<RankChangeBadgeProps> = ({
  change,
  showLabel = true,
  size = 'md'
}) => {
  if (change > 0) {
    return (
      <span
        title={`Rank improved by ${change} ${change === 1 ? 'place' : 'places'} since last reporting period`}
        className={`inline-flex items-center gap-0.5 font-extrabold rounded-md border transition-all ${
          size === 'sm'
            ? 'text-[10px] px-1.5 py-0.5'
            : size === 'lg'
            ? 'text-xs px-2.5 py-1'
            : 'text-[11px] px-2 py-0.5'
        } bg-[#e6f4ea] text-[#137333] border-[#a8dab5] shadow-2xs`}
      >
        <span className="material-symbols-outlined text-[13px] font-black leading-none text-[#137333]">
          arrow_upward
        </span>
        <span>+{change}</span>
        {showLabel && (
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#137333] hidden sm:inline ml-0.5">
            Up
          </span>
        )}
      </span>
    );
  }

  if (change < 0) {
    return (
      <span
        title={`Rank declined by ${Math.abs(change)} ${Math.abs(change) === 1 ? 'place' : 'places'} since last reporting period`}
        className={`inline-flex items-center gap-0.5 font-extrabold rounded-md border transition-all ${
          size === 'sm'
            ? 'text-[10px] px-1.5 py-0.5'
            : size === 'lg'
            ? 'text-xs px-2.5 py-1'
            : 'text-[11px] px-2 py-0.5'
        } bg-[#fce8e6] text-[#c5221f] border-[#f5b7b1] shadow-2xs`}
      >
        <span className="material-symbols-outlined text-[13px] font-black leading-none text-[#c5221f]">
          arrow_downward
        </span>
        <span>{change}</span>
        {showLabel && (
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#c5221f] hidden sm:inline ml-0.5">
            Down
          </span>
        )}
      </span>
    );
  }

  return (
    <span
      title="Rank unchanged since last reporting period"
      className={`inline-flex items-center gap-0.5 font-semibold rounded-md border transition-all ${
        size === 'sm'
          ? 'text-[10px] px-1.5 py-0.5'
          : size === 'lg'
          ? 'text-xs px-2.5 py-1'
          : 'text-[11px] px-2 py-0.5'
      } bg-[#f0ede9] text-[#786e68] border-[#e5e2dd]`}
    >
      <span className="material-symbols-outlined text-[13px] leading-none text-[#786e68]">
        remove
      </span>
      <span>0</span>
      {showLabel && (
        <span className="text-[9px] font-medium text-[#786e68] hidden sm:inline ml-0.5">
          Same
        </span>
      )}
    </span>
  );
};

export const formatRupees = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export interface YtdBreakdownTooltipProps {
  performer: Performer;
  children: React.ReactNode;
  position?: 'top' | 'bottom';
  align?: 'center' | 'left' | 'right';
  className?: string;
}

export const YtdBreakdownTooltip: React.FC<YtdBreakdownTooltipProps> = ({
  performer,
  children,
  position = 'top',
  align = 'center',
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 150);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible((prev) => !prev);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const total = performer.ytdEarnings || 1;
  const activationAmt = performer.activationBonus;
  const recurringAmt = performer.recurringShare;
  const activationPct = Math.round((activationAmt / total) * 100);
  const recurringPct = Math.max(0, 100 - activationPct);

  // Positioning logic
  const positionClasses =
    position === 'top'
      ? 'bottom-full mb-2.5'
      : 'top-full mt-2.5';

  const alignClasses =
    align === 'center'
      ? 'left-1/2 -translate-x-1/2'
      : align === 'left'
      ? 'left-0'
      : 'right-0';

  const arrowClasses =
    position === 'top'
      ? 'top-full border-t-[#1c1c19] border-x-transparent border-b-transparent border-t-[7px] border-x-[7px] border-b-0'
      : 'bottom-full border-b-[#1c1c19] border-x-transparent border-t-transparent border-b-[7px] border-x-[7px] border-t-0';

  const arrowAlign =
    align === 'center'
      ? 'left-1/2 -translate-x-1/2'
      : align === 'left'
      ? 'left-6'
      : 'right-6';

  return (
    <div
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      onClick={handleToggle}
    >
      {children}

      {/* Floating Tooltip Breakdown Card */}
      {isVisible && (
        <div
          role="tooltip"
          onClick={(e) => e.stopPropagation()}
          className={`absolute ${positionClasses} ${alignClasses} z-50 w-[295px] sm:w-[325px] rounded-2xl bg-[#1c1c19] text-white p-3.5 shadow-[0_16px_36px_rgba(0,0,0,0.45)] border border-[#3c3a36] animate-in fade-in zoom-in-95 duration-150 select-none cursor-default text-left`}
        >
          {/* Arrow Pointer */}
          <div className={`absolute w-0 h-0 ${arrowClasses} ${arrowAlign}`} />

          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#34322e] pb-2.5 mb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#fda4c9]">pie_chart</span>
              <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                YTD Earnings Split
              </span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#2d2b27] text-[#ffd9e2] border border-[#44413b]">
              Jan – Sep 2026
            </span>
          </div>

          {/* Partner & Total YTD Banner */}
          <div className="flex items-center justify-between mb-3 px-2.5 py-1.5 rounded-xl bg-[#282622] border border-[#3c3a36]">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-semibold text-[#a8a29e]">
                {performer.name}
              </span>
              <span className="text-[10px] text-[#cca730] font-bold">
                {performer.tier}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[9px] uppercase font-semibold text-[#a8a29e] block">Total YTD</span>
              <span className="text-sm font-extrabold text-[#ffe088] tracking-tight">
                {formatRupees(total)}
              </span>
            </div>
          </div>

          {/* Components Breakdown: Activation Bonus & Recurring Share */}
          <div className="flex flex-col gap-2 text-xs">
            {/* 1. Activation Bonus Component */}
            <div className="p-2.5 rounded-xl bg-[#282622]/90 border border-[#3c3a36] flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#d91b77] shadow-[0_0_8px_rgba(217,27,119,0.7)] shrink-0" />
                  <span className="font-bold text-white text-[11px]">Activation Bonus</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-[#fda4c9] text-xs">
                    {formatRupees(activationAmt)}
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-[#d91b77]/25 text-[#fda4c9] border border-[#d91b77]/40">
                    {activationPct}%
                  </span>
                </div>
              </div>
              <p className="text-[10px] text-[#b4aba4] pl-4 leading-tight">
                Upfront QR onboarding &amp; merchant hardware setup incentives
              </p>
            </div>

            {/* 2. Recurring Share Component */}
            <div className="p-2.5 rounded-xl bg-[#282622]/90 border border-[#3c3a36] flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#cca730] shadow-[0_0_8px_rgba(204,167,48,0.7)] shrink-0" />
                  <span className="font-bold text-white text-[11px]">Recurring Share</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-[#ffe088] text-xs">
                    {formatRupees(recurringAmt)}
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-[#cca730]/25 text-[#ffe088] border border-[#cca730]/40">
                    {recurringPct}%
                  </span>
                </div>
              </div>
              <p className="text-[10px] text-[#b4aba4] pl-4 leading-tight">
                Monthly passive transaction commission split &amp; volume retainers
              </p>
            </div>
          </div>

          {/* Segmented Visual Progress Ratio Bar */}
          <div className="mt-3 pt-2.5 border-t border-[#34322e]">
            <div className="flex items-center justify-between text-[9px] uppercase font-bold text-[#a8a29e] mb-1">
              <span>Split Composition</span>
              <span className="text-[#ffe088]">{recurringPct}% Recurring Passive</span>
            </div>
            <div className="h-2 rounded-full bg-[#34322e] overflow-hidden flex shadow-inner">
              <div
                style={{ width: `${activationPct}%` }}
                className="bg-[#d91b77] h-full transition-all duration-300"
                title={`Activation Bonus: ${activationPct}%`}
              />
              <div
                style={{ width: `${recurringPct}%` }}
                className="bg-[#cca730] h-full transition-all duration-300"
                title={`Recurring Share: ${recurringPct}%`}
              />
            </div>
            <div className="flex items-center justify-between text-[9px] text-[#b4aba4] mt-1.5">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d91b77]" />
                <span>Activation ({activationPct}%)</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cca730]" />
                <span>Recurring ({recurringPct}%)</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export interface MonthPeriodOption {
  id: LeaderboardPeriod;
  title: string;
  shortLabel: string;
  badge: string;
  badgeBg: string;
  badgeColor: string;
  monthName: string;
  cycleNote: string;
  dateRange: string;
  earningsLabel: string;
  totalDistributed: string;
  topEarnerAmount: string;
  avgTop10: string;
}

const PERIOD_CONFIGS: Record<LeaderboardPeriod, MonthPeriodOption> = {
  'current-month': {
    id: 'current-month',
    title: 'Current Month',
    shortLabel: 'Sep 2026',
    badge: 'Live Cycle',
    badgeBg: '#ffd9e2',
    badgeColor: '#b1005e',
    monthName: 'September 2026',
    cycleNote: 'Live commission settlements & salon sweeps in progress',
    dateRange: 'Sep 1 – Sep 30, 2026',
    earningsLabel: 'September Earnings',
    totalDistributed: '₹21.50 Lakh',
    topEarnerAmount: '₹3.42 Lakh',
    avgTop10: '₹1.82 Lakh'
  },
  'previous-month': {
    id: 'previous-month',
    title: 'Previous Month',
    shortLabel: 'Aug 2026',
    badge: 'Disbursed',
    badgeBg: '#ffe088',
    badgeColor: '#735c00',
    monthName: 'August 2026',
    cycleNote: '100% audited & settled merchant commission payouts',
    dateRange: 'Aug 1 – Aug 31, 2026',
    earningsLabel: 'August Earnings',
    totalDistributed: '₹19.85 Lakh',
    topEarnerAmount: '₹3.55 Lakh',
    avgTop10: '₹1.74 Lakh'
  },
  ytd: {
    id: 'ytd',
    title: 'Year-to-Date (YTD)',
    shortLabel: 'YTD 2026',
    badge: 'Cumulative',
    badgeBg: '#c3e8ff',
    badgeColor: '#005b82',
    monthName: 'Jan – Sep 2026',
    cycleNote: 'Gross verified commissions & recurring salon retainer fleet',
    dateRange: 'Jan 1 – Sep 15, 2026',
    earningsLabel: 'Settled YTD Earnings',
    totalDistributed: '₹1.48 Crore',
    topEarnerAmount: '₹28.45 Lakh',
    avgTop10: '₹14.85 Lakh'
  }
};

interface TopPerformersLeaderboardProps {
  onNavigateToAuth?: () => void;
  onNavigateToHub?: () => void;
  onNavigateToWorkspace?: () => void;
  onNavigateToSalonIntelligence?: () => void;
  onNavigateToReferralTimeline?: () => void;
}

export const TopPerformersLeaderboard: React.FC<TopPerformersLeaderboardProps> = ({
  onNavigateToAuth,
  onNavigateToHub,
  onNavigateToWorkspace,
  onNavigateToSalonIntelligence,
  onNavigateToReferralTimeline
}) => {
  const [activeNav, setActiveNav] = useState<string>('leaderboards');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [selectedPeriod, setSelectedPeriod] = useState<LeaderboardPeriod>('current-month');
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState<boolean>(false);
  const [selectedTierFilter, setSelectedTierFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPerformerId, setSelectedPerformerId] = useState<string | null>(null);
  const [quickInviteCopied, setQuickInviteCopied] = useState<boolean>(false);

  const monthDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (monthDropdownRef.current && !monthDropdownRef.current.contains(event.target as Node)) {
        setIsMonthDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const referralUrl = 'https://nexora.network/join?ref=NEX-88219';

  const handleQuickInvite = () => {
    navigator.clipboard.writeText(referralUrl);
    setQuickInviteCopied(true);
    setTimeout(() => setQuickInviteCopied(false), 2000);
  };

  const performers: Performer[] = [
    {
      id: 'NX-P-0012',
      name: 'Aarav Singhania',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      location: 'Mumbai, MH',
      tier: 'Crown Ambassador',
      tierColor: '#735c00',
      tierBg: '#ffe088',
      ytdEarnings: 2845000,
      activationBonus: 710000,
      recurringShare: 2135000,
      currentMonthEarnings: 342000,
      previousMonthEarnings: 318000,
      activeSalons: 84,
      conversionRate: 94.2,
      topSalon: 'Envi Salon & Spa (Bandra)',
      currentMonthGrowth: '+7.5% vs Aug',
      prevMonthGrowth: '+14.2% vs Jul',
      ytdGrowth: '+32.4% vs last Qtr',
      joinedDate: 'Jan 2024',
      badges: ['Apex Producer', '100% SLA Record', 'Soundbox Fleet'],
      julyRank: 1,
      q2Rank: 1
    },
    {
      id: 'NX-P-0045',
      name: 'Meera Nambiar',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      location: 'Bengaluru, KA',
      tier: 'Crown Ambassador',
      tierColor: '#735c00',
      tierBg: '#ffe088',
      ytdEarnings: 2410000,
      activationBonus: 675000,
      recurringShare: 1735000,
      currentMonthEarnings: 298000,
      previousMonthEarnings: 355000,
      activeSalons: 71,
      conversionRate: 91.8,
      topSalon: 'Bounce Hair Lounge (Indiranagar)',
      currentMonthGrowth: '-16.0% vs Aug',
      prevMonthGrowth: '+31.2% (Rank #1 Aug)',
      ytdGrowth: '+28.1% vs last Qtr',
      joinedDate: 'Feb 2024',
      badges: ['Fastest Scale 50', 'Karnataka Lead', 'VIP Retainer'],
      julyRank: 2,
      q2Rank: 3
    },
    {
      id: 'NX-P-0089',
      name: 'Kabir Oberoi',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      location: 'Delhi NCR',
      tier: 'Diamond Principal',
      tierColor: '#005b82',
      tierBg: '#c3e8ff',
      ytdEarnings: 1985000,
      activationBonus: 595000,
      recurringShare: 1390000,
      currentMonthEarnings: 245000,
      previousMonthEarnings: 228000,
      activeSalons: 59,
      conversionRate: 88.5,
      topSalon: 'Geetanjali Salon (Khan Market)',
      currentMonthGrowth: '+7.4% vs Aug',
      prevMonthGrowth: '+9.8% vs Jul',
      ytdGrowth: '+21.5% vs last Qtr',
      joinedDate: 'Mar 2024',
      badges: ['Delhi NCR Pioneer', 'Volume Champion', 'Zero Discrepancy'],
      julyRank: 3,
      q2Rank: 2
    },
    {
      id: 'NX-P-0164',
      name: 'Rohan Kulkarni',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      location: 'Hyderabad, TS',
      tier: 'Diamond Principal',
      tierColor: '#005b82',
      tierBg: '#c3e8ff',
      ytdEarnings: 1475000,
      activationBonus: 470000,
      recurringShare: 1005000,
      currentMonthEarnings: 215000,
      previousMonthEarnings: 242000,
      activeSalons: 42,
      conversionRate: 89.1,
      topSalon: 'Mirrors Luxury Salons (Jubilee Hills)',
      currentMonthGrowth: '+4.8% vs Aug',
      prevMonthGrowth: '+11.5% vs Jul',
      ytdGrowth: '+24.7%',
      joinedDate: 'May 2024',
      badges: ['Telangana Ace', 'Fastest KYC Dispatch'],
      julyRank: 4,
      q2Rank: 4
    },
    {
      id: 'NX-P-0112',
      name: 'Ananya Deshmukh',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      location: 'Pune, MH',
      tier: 'Diamond Principal',
      tierColor: '#005b82',
      tierBg: '#c3e8ff',
      ytdEarnings: 1620000,
      activationBonus: 485000,
      recurringShare: 1135000,
      currentMonthEarnings: 188000,
      previousMonthEarnings: 210000,
      activeSalons: 48,
      conversionRate: 86.4,
      topSalon: 'Looks Unisex Salon (FC Road)',
      currentMonthGrowth: '-10.5% vs Aug',
      prevMonthGrowth: '+18.4% vs Jul',
      ytdGrowth: '+19.2%',
      joinedDate: 'Apr 2024',
      badges: ['Top Conversion', 'Pune Growth Lead'],
      julyRank: 5,
      q2Rank: 5
    },
    {
      id: 'NX-P-0198',
      name: 'Sneha Chawla',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      location: 'Chandigarh, PB',
      tier: 'Platinum Lead',
      tierColor: '#533f86',
      tierBg: '#e6deff',
      ytdEarnings: 1190000,
      activationBonus: 380000,
      recurringShare: 810000,
      currentMonthEarnings: 152000,
      previousMonthEarnings: 134000,
      activeSalons: 36,
      conversionRate: 84.6,
      topSalon: 'Toni&Guy Studio (Sec 35)',
      currentMonthGrowth: '+5.1% vs Aug',
      prevMonthGrowth: '+8.3% vs Jul',
      ytdGrowth: '+15.8%',
      joinedDate: 'Jun 2024',
      badges: ['Punjab Star', 'Soundbox Champion'],
      julyRank: 6,
      q2Rank: 6
    },
    {
      id: 'NX-P-0221',
      name: 'Vikramaditya Roy',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
      location: 'Kolkata, WB',
      tier: 'Platinum Lead',
      tierColor: '#533f86',
      tierBg: '#e6deff',
      ytdEarnings: 980000,
      activationBonus: 320000,
      recurringShare: 660000,
      currentMonthEarnings: 138000,
      previousMonthEarnings: 145000,
      activeSalons: 31,
      conversionRate: 82.3,
      topSalon: 'Head Turners Salon (Park St)',
      currentMonthGrowth: '+3.4% vs Aug',
      prevMonthGrowth: '+6.1% vs Jul',
      ytdGrowth: '+12.4%',
      joinedDate: 'Jul 2024',
      badges: ['East Hub Pioneer', 'Retention Master'],
      julyRank: 8,
      q2Rank: 8
    },
    {
      id: 'NX-P-0255',
      name: 'Divya Sundaram',
      avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=200&q=80',
      location: 'Chennai, TN',
      tier: 'Platinum Lead',
      tierColor: '#533f86',
      tierBg: '#e6deff',
      ytdEarnings: 865000,
      activationBonus: 285000,
      recurringShare: 580000,
      currentMonthEarnings: 112000,
      previousMonthEarnings: 105000,
      activeSalons: 28,
      conversionRate: 85.0,
      topSalon: 'Limelite Studio (Nungambakkam)',
      currentMonthGrowth: '+5.9% vs Aug',
      prevMonthGrowth: '+7.4% vs Jul',
      ytdGrowth: '+14.1%',
      joinedDate: 'Aug 2024',
      badges: ['Tamil Nadu Lead', 'e-NACH Master'],
      julyRank: 7,
      q2Rank: 7
    },
    {
      id: 'NX-P-0284',
      name: 'Gaurav Bhatia',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      location: 'Ahmedabad, GJ',
      tier: 'Platinum Lead',
      tierColor: '#533f86',
      tierBg: '#e6deff',
      ytdEarnings: 740000,
      activationBonus: 260000,
      recurringShare: 480000,
      currentMonthEarnings: 96000,
      previousMonthEarnings: 78000,
      activeSalons: 24,
      conversionRate: 79.8,
      topSalon: 'Shades Unisex Salon (Bodakdev)',
      currentMonthGrowth: '+6.8% vs Aug',
      prevMonthGrowth: '+9.2% vs Jul',
      ytdGrowth: '+11.2%',
      joinedDate: 'Sep 2024',
      badges: ['Gujarat Rising Star'],
      julyRank: 9,
      q2Rank: 9
    },
    {
      id: 'NX-P-0319',
      name: 'Tanvi Kapoor',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80',
      location: 'Jaipur, RJ',
      tier: 'Gold Partner',
      tierColor: '#8e4767',
      tierBg: '#ffd8e5',
      ytdEarnings: 590000,
      activationBonus: 220000,
      recurringShare: 370000,
      currentMonthEarnings: 82000,
      previousMonthEarnings: 88000,
      activeSalons: 21,
      conversionRate: 81.2,
      topSalon: 'Sensation Hair & Beauty (C-Scheme)',
      currentMonthGrowth: '+7.0% vs Aug',
      prevMonthGrowth: '+12.4% vs Jul',
      ytdGrowth: '+18.5%',
      joinedDate: 'Oct 2024',
      badges: ['Rajasthan Momentum'],
      julyRank: 10,
      q2Rank: 10
    },
    {
      id: 'NEX-88219',
      name: 'Marcus Vance (You)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      location: 'Indiranagar, Bengaluru',
      tier: 'Gold Partner',
      tierColor: '#8e4767',
      tierBg: '#ffd8e5',
      ytdEarnings: 385000,
      activationBonus: 155000,
      recurringShare: 230000,
      currentMonthEarnings: 72500,
      previousMonthEarnings: 52000,
      activeSalons: 18,
      conversionRate: 77.8,
      topSalon: 'Glow & Grace Unisex Salon',
      currentMonthGrowth: '+22.5% this month',
      prevMonthGrowth: '+18.2% in Aug',
      ytdGrowth: '+64.0% since onboarding',
      joinedDate: 'Nov 2024',
      badges: ['Rising Star Q3', '77.8% Velocity', 'Verified KYC'],
      julyRank: 12,
      q2Rank: 11
    },
    {
      id: 'NX-P-0348',
      name: 'Harsh Vardhan',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      location: 'Lucknow, UP',
      tier: 'Gold Partner',
      tierColor: '#8e4767',
      tierBg: '#ffd8e5',
      ytdEarnings: 475000,
      activationBonus: 185000,
      recurringShare: 290000,
      currentMonthEarnings: 61000,
      previousMonthEarnings: 65000,
      activeSalons: 19,
      conversionRate: 76.5,
      topSalon: 'Affinity Salon (Gomti Nagar)',
      currentMonthGrowth: '+10.9% vs Aug',
      prevMonthGrowth: '+5.3% vs Jul',
      ytdGrowth: '+9.4%',
      joinedDate: 'Oct 2024',
      badges: ['UP Central Growth'],
      julyRank: 11,
      q2Rank: 12
    }
  ];

  const currentConfig = PERIOD_CONFIGS[selectedPeriod];

  const getPerformerEarnings = (p: Performer, period: LeaderboardPeriod) => {
    if (period === 'current-month') return p.currentMonthEarnings;
    if (period === 'previous-month') return p.previousMonthEarnings;
    return p.ytdEarnings;
  };

  const getPerformerGrowth = (p: Performer, period: LeaderboardPeriod) => {
    if (period === 'current-month') return p.currentMonthGrowth;
    if (period === 'previous-month') return p.prevMonthGrowth;
    return p.ytdGrowth;
  };

  // Pre-calculate August rankings sorted by previousMonthEarnings for accurate baseline comparison
  const augSortedPerformers = [...performers].sort((a, b) => b.previousMonthEarnings - a.previousMonthEarnings);

  // Dynamically sort performers by selected period earnings and compute rank change vs prior reporting period
  const rankedPerformers = [...performers]
    .sort((a, b) => getPerformerEarnings(b, selectedPeriod) - getPerformerEarnings(a, selectedPeriod))
    .map((p, index) => {
      const periodRank = index + 1;
      let prevPeriodRank = periodRank;

      if (selectedPeriod === 'current-month') {
        // Compared to August (previous-month) standing
        prevPeriodRank = augSortedPerformers.findIndex((x) => x.id === p.id) + 1;
      } else if (selectedPeriod === 'previous-month') {
        // Compared to July baseline standing
        prevPeriodRank = p.julyRank || periodRank;
      } else {
        // Compared to Mid-Year Q2 standing
        prevPeriodRank = p.q2Rank || periodRank;
      }

      // Positive = improved (e.g. was #2, now #1 -> +1)
      // Negative = declined (e.g. was #1, now #2 -> -1)
      const rankChange = prevPeriodRank - periodRank;

      return {
        ...p,
        periodRank,
        prevPeriodRank,
        rankChange,
        displayEarnings: getPerformerEarnings(p, selectedPeriod),
        displayGrowth: getPerformerGrowth(p, selectedPeriod)
      };
    });

  const filteredPerformers = rankedPerformers.filter((p) => {
    const matchesTier =
      selectedTierFilter === 'all' ||
      (selectedTierFilter === 'crown' && p.tier === 'Crown Ambassador') ||
      (selectedTierFilter === 'diamond' && p.tier === 'Diamond Principal') ||
      (selectedTierFilter === 'platinum' && p.tier === 'Platinum Lead') ||
      (selectedTierFilter === 'gold' && p.tier === 'Gold Partner');

    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTier && matchesSearch;
  });

  const topThree = rankedPerformers.slice(0, 3);
  const userPerformer = rankedPerformers.find((p) => p.id === 'NEX-88219')!;
  const selectedPerformer = selectedPerformerId
    ? rankedPerformers.find((p) => p.id === selectedPerformerId) || null
    : null;

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    const escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    const parts = text.split(regex);
    if (parts.length === 1) return text;
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.trim().toLowerCase() ? (
            <mark key={i} className="bg-[#ffd9e2] text-[#b1005e] px-0.5 rounded-xs font-black">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#fcf9f4] text-[#1c1c19] flex relative font-sans">
      {/* Modal: Performer Deep-Dive Card */}
      {selectedPerformer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-[#e5e2dd] relative flex flex-col gap-5">
            <button
              onClick={() => setSelectedPerformerId(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f0ede9] text-[#594047] flex items-center justify-center hover:bg-[#e5e2dd] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={selectedPerformer.avatar}
                  alt={selectedPerformer.name}
                  className="w-16 h-16 rounded-2xl object-cover shadow-sm border-2 border-white"
                />
                <div
                  className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs text-white shadow-xs ${
                    selectedPerformer.periodRank === 1
                      ? 'bg-[#cca730]'
                      : selectedPerformer.periodRank === 2
                      ? 'bg-[#72304f]'
                      : selectedPerformer.periodRank === 3
                      ? 'bg-[#735c00]'
                      : 'bg-[#1c1c19]'
                  }`}
                >
                  #{selectedPerformer.periodRank}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg font-bold text-[#1c1c19]">{selectedPerformer.name}</h3>
                  <RankChangeBadge change={selectedPerformer.rankChange} size="sm" />
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                    style={{ backgroundColor: selectedPerformer.tierBg, color: selectedPerformer.tierColor }}
                  >
                    {selectedPerformer.tier}
                  </span>
                </div>
                <span className="text-xs text-[#594047] flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-[14px]">location_on</span>
                  {selectedPerformer.location} • Partner ID: <strong>{selectedPerformer.id}</strong>
                </span>
              </div>
            </div>

            {/* Selected Period Spotlight Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#ffd9e2]/30 via-[#f6f3ee] to-white border border-[#fda4c9]/60 flex items-center justify-between">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-[#8e4767] font-bold uppercase tracking-wider">
                    {currentConfig.title} ({currentConfig.monthName})
                  </span>
                  <span
                    className="px-1.5 py-0.2 rounded-full text-[9px] font-bold"
                    style={{ backgroundColor: currentConfig.badgeBg, color: currentConfig.badgeColor }}
                  >
                    {currentConfig.badge}
                  </span>
                </div>
                <span className="text-2xl font-extrabold text-[#b1005e] mt-0.5">
                  {formatRupees(selectedPerformer.displayEarnings)}
                </span>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-[11px] text-[#735c00] font-semibold">
                    Rank #{selectedPerformer.periodRank} in {currentConfig.shortLabel} • {selectedPerformer.displayGrowth}
                  </span>
                  <RankChangeBadge change={selectedPerformer.rankChange} size="sm" />
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-[#594047]">Merchant Fleet</span>
                <span className="text-xl font-bold text-[#1c1c19] block">{selectedPerformer.activeSalons} Salons</span>
                <span className="text-[10px] text-[#b1005e] font-bold">{selectedPerformer.conversionRate}% Velocity</span>
              </div>
            </div>

            {/* Multi-Period Horizon Comparison Grid */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1c1c19] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#b1005e]">compare_arrows</span>
                  <span>Earnings Horizon Breakdown</span>
                </span>
                <span className="text-[10px] text-[#8e4767] font-semibold">Click horizon to switch view</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedPeriod('current-month')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedPeriod === 'current-month'
                      ? 'bg-[#ffd9e2]/40 border-[#d91b77] shadow-xs ring-1 ring-[#d91b77]/30'
                      : 'bg-[#f6f3ee] border-[#e5e2dd] hover:bg-[#ebe8e3]'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase text-[#594047] block">Current Month</span>
                  <span className="text-xs text-[#8e4767] block">Sep 2026</span>
                  <span className="text-sm font-extrabold text-[#b1005e] mt-1 block">
                    {formatRupees(selectedPerformer.currentMonthEarnings)}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPeriod('previous-month')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedPeriod === 'previous-month'
                      ? 'bg-[#ffe088]/40 border-[#cca730] shadow-xs ring-1 ring-[#cca730]/30'
                      : 'bg-[#f6f3ee] border-[#e5e2dd] hover:bg-[#ebe8e3]'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase text-[#594047] block">Previous Month</span>
                  <span className="text-xs text-[#735c00] block">Aug 2026</span>
                  <span className="text-sm font-extrabold text-[#1c1c19] mt-1 block">
                    {formatRupees(selectedPerformer.previousMonthEarnings)}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPeriod('ytd')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedPeriod === 'ytd'
                      ? 'bg-[#c3e8ff]/40 border-[#005b82] shadow-xs ring-1 ring-[#005b82]/30'
                      : 'bg-[#f6f3ee] border-[#e5e2dd] hover:bg-[#ebe8e3]'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase text-[#594047] block">Year-To-Date</span>
                  <span className="text-xs text-[#005b82] block">YTD 2026</span>
                  <span className="text-sm font-extrabold text-[#b1005e] mt-1 block">
                    {formatRupees(selectedPerformer.ytdEarnings)}
                  </span>
                </button>
              </div>
            </div>

            {/* YTD Earnings Breakdown Card */}
            <div className="p-3.5 rounded-2xl bg-[#1c1c19] text-white border border-[#3c3a36] flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#fda4c9]">pie_chart</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    YTD Earnings Breakdown
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#2d2b27] text-[#ffd9e2] border border-[#44413b]">
                  Jan – Sep 2026
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {/* Activation Bonus */}
                <div className="p-2.5 rounded-xl bg-[#282622] border border-[#3c3a36] flex flex-col">
                  <div className="flex items-center justify-between text-[10px] text-[#a8a29e] mb-0.5">
                    <span className="flex items-center gap-1 font-bold text-[#fda4c9]">
                      <span className="w-2 h-2 rounded-full bg-[#d91b77]" />
                      Activation Bonus
                    </span>
                    <span className="font-bold text-white">
                      {Math.round((selectedPerformer.activationBonus / selectedPerformer.ytdEarnings) * 100)}%
                    </span>
                  </div>
                  <span className="text-sm font-extrabold text-[#fda4c9]">
                    {formatRupees(selectedPerformer.activationBonus)}
                  </span>
                  <span className="text-[9px] text-[#a8a29e] mt-1 leading-tight">
                    Upfront QR terminal onboarding bonuses
                  </span>
                </div>

                {/* Recurring Share */}
                <div className="p-2.5 rounded-xl bg-[#282622] border border-[#3c3a36] flex flex-col">
                  <div className="flex items-center justify-between text-[10px] text-[#a8a29e] mb-0.5">
                    <span className="flex items-center gap-1 font-bold text-[#ffe088]">
                      <span className="w-2 h-2 rounded-full bg-[#cca730]" />
                      Recurring Share
                    </span>
                    <span className="font-bold text-white">
                      {Math.round((selectedPerformer.recurringShare / selectedPerformer.ytdEarnings) * 100)}%
                    </span>
                  </div>
                  <span className="text-sm font-extrabold text-[#ffe088]">
                    {formatRupees(selectedPerformer.recurringShare)}
                  </span>
                  <span className="text-[9px] text-[#a8a29e] mt-1 leading-tight">
                    Monthly passive commission &amp; volume retainers
                  </span>
                </div>
              </div>

              {/* Segmented Bar */}
              <div className="flex flex-col gap-1">
                <div className="h-2 rounded-full bg-[#34322e] overflow-hidden flex">
                  <div
                    style={{
                      width: `${Math.round((selectedPerformer.activationBonus / selectedPerformer.ytdEarnings) * 100)}%`
                    }}
                    className="bg-[#d91b77] h-full"
                  />
                  <div
                    style={{
                      width: `${Math.round((selectedPerformer.recurringShare / selectedPerformer.ytdEarnings) * 100)}%`
                    }}
                    className="bg-[#cca730] h-full"
                  />
                </div>
              </div>
            </div>

            {/* Top Producing Salon */}
            <div className="p-3.5 rounded-xl bg-white border border-[#e5e2dd] flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-[#8e4767] tracking-wider">
                  Top Volume Merchant
                </span>
                <span className="text-xs font-bold text-[#1c1c19] mt-0.5">
                  {selectedPerformer.topSalon}
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#ffd9e2] text-[#b1005e] text-[11px] font-bold">
                {selectedPerformer.displayGrowth}
              </span>
            </div>

            {/* Badges Earned */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-[#1c1c19]">Verified Accreditations &amp; Badges</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedPerformer.badges.map((b) => (
                  <span
                    key={b}
                    className="px-2.5 py-1 rounded-full bg-[#f0ede9] text-[#1c1c19] text-[11px] font-semibold flex items-center gap-1 border border-[#e5e2dd]"
                  >
                    <span className="material-symbols-outlined text-[14px] text-[#b1005e]">verified</span>
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedPerformerId(null)}
              className="w-full py-2.5 rounded-xl bg-[#d91b77] text-white text-xs font-bold shadow-md hover:bg-[#b1005e] transition-all cursor-pointer"
            >
              Close Profile
            </button>
          </div>
        </div>
      )}

      {/* Desktop Sidebar (aside) */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-72 bg-[#f6f3ee]/90 backdrop-blur-xl z-40 flex-col justify-between py-6 px-4 shadow-[0_8px_32px_0_rgba(74,14,46,0.04)] border-r border-[#e5e2dd]">
        <div className="flex flex-col gap-4">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-2 px-2 py-1">
            <img
              alt="Nexora Brand Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1XZxTb-KtdsPjo0U0odHwDY485hRuwmfDBk7sy7hvncIa4xg3AdjCaLVTut6pSuuRiQJj_3YtSdqJ3TLo2klHSJMNebL6mVq0uWtOhluaULb7Cy_34No2AloAlRtDCW1-HCFGFyKGQkrv2OMGEMkXFJpEFLcxUma8v2Z1hXG0pFOlEix77UvOTw-NfNuX20oyBgVrPL--0n2ZNjrI0vKNBImBop03G0p3fTT3hR_Chdf05d_h_ZbzfoKQ"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-lg text-[#1c1c19] tracking-tight">Nexora</span>
              <span className="text-[11px] font-bold text-[#8e4767] uppercase tracking-wider">
                Growth Partner
              </span>
            </div>
          </div>

          <div className="h-px w-full bg-[#e5e2dd]/60 my-1"></div>

          {/* Primary Navigation */}
          <div className="px-2 text-[11px] font-bold uppercase tracking-wider text-[#594047]/70">
            Primary Navigation
          </div>

          <nav className="flex flex-col gap-1">
            {[
              { id: 'overview', label: 'Overview', icon: 'space_dashboard' },
              { id: 'my-referral-code', label: 'My Referral Code', icon: 'qr_code_2' },
              { id: 'referred-salons', label: 'Referred Salons', icon: 'storefront' },
              { id: 'referral-status-timeline', label: 'Referral Status Timeline', icon: 'timeline' },
              { id: 'rewards-and-milestones', label: 'Rewards & Milestones', icon: 'military_tech' },
              { id: 'extra-onboarding-reward', label: 'Extra Onboarding Reward', icon: 'featured_seasonal_and_gifts' },
              { id: 'profile-and-settings', label: 'Profile & Settings', icon: 'settings' }
            ].map((item) => {
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveNav(item.id);
                    if (item.id === 'overview' && onNavigateToSalonIntelligence) {
                      onNavigateToSalonIntelligence();
                    } else if (item.id === 'referral-status-timeline' && onNavigateToReferralTimeline) {
                      onNavigateToReferralTimeline();
                    }
                  }}
                  className={`flex items-center gap-3 px-4 py-2.5 transition-all text-xs font-semibold cursor-pointer rounded-xl text-left ${
                    isActive
                      ? 'bg-[#d91b77] text-white shadow-[0_4px_16px_rgba(217,27,119,0.28)]'
                      : 'text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Expansion Modules */}
          <div className="px-2 pt-1 text-[11px] font-bold uppercase tracking-wider text-[#594047]/70">
            Expansion Modules
          </div>

          <div className="flex flex-col gap-1">
            {/* Active Leaderboards Tab */}
            <button
              onClick={() => setActiveNav('leaderboards')}
              className={`flex items-center justify-between px-4 py-2 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeNav === 'leaderboards'
                  ? 'bg-[#d91b77] text-white shadow-[0_4px_16px_rgba(217,27,119,0.28)]'
                  : 'text-[#1c1c19] hover:bg-[#ebe8e3]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[18px]">leaderboard</span>
                <span>Top Performers</span>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeNav === 'leaderboards' ? 'bg-white/20 text-white' : 'bg-[#ffe088] text-[#241a00]'
                }`}
              >
                Live
              </span>
            </button>

            {[
              { label: 'Earnings', icon: 'payments' },
              { label: 'Withdrawals', icon: 'account_balance' },
              { label: 'Marketing Material', icon: 'campaign' },
              { label: 'Support Desk', icon: 'support_agent' }
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between px-4 py-2 rounded-xl text-[#594047]/60 text-xs select-none"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#e5e2dd] text-[#594047] text-[10px] font-bold">
                  Soon
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Footer Badge */}
        <div className="p-3 rounded-xl bg-[#f0ede9]/70 flex items-center gap-2.5 border border-[#e5e2dd]">
          <span className="material-symbols-outlined text-[#b1005e] text-[20px]">verified</span>
          <div className="flex flex-col">
            <span className="text-[11px] text-[#1c1c19] font-bold">Nexora Network</span>
            <span className="text-[11px] text-[#594047]">v2.4 Enterprise Partner</span>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="lg:pl-72 flex-1 flex flex-col min-h-screen w-full">
        {/* Top Header */}
        <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-[#fcf9f4]/85 backdrop-blur-xl z-30 px-4 sm:px-6 shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex items-center justify-between border-b border-[#e5e2dd]">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1 text-[#594047] hover:text-[#1c1c19] cursor-pointer"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>

            <img
              alt="Nexora Brand Logo"
              className="h-8 w-auto object-contain shrink-0"
              src="https://lh3.googleusercontent.com/aida/AEtjO1XZxTb-KtdsPjo0U0odHwDY485hRuwmfDBk7sy7hvncIa4xg3AdjCaLVTut6pSuuRiQJj_3YtSdqJ3TLo2klHSJMNebL6mVq0uWtOhluaULb7Cy_34No2AloAlRtDCW1-HCFGFyKGQkrv2OMGEMkXFJpEFLcxUma8v2Z1hXG0pFOlEix77UvOTw-NfNuX20oyBgVrPL--0n2ZNjrI0vKNBImBop03G0p3fTT3hR_Chdf05d_h_ZbzfoKQ"
            />
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffe088] text-[#241a00] text-[11px] font-bold shadow-[0_2px_8px_rgba(115,92,0,0.1)]">
              <span className="material-symbols-outlined text-[16px] text-[#735c00]">workspace_premium</span>
              <span>Gold Partner • NEX-88219</span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={handleQuickInvite}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#d91b77] text-white font-bold text-xs shadow-[0_4px_16px_rgba(217,27,119,0.28)] hover:bg-[#b1005e] transition-all cursor-pointer active:scale-95"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">
                {quickInviteCopied ? 'check' : 'person_add'}
              </span>
              <span>{quickInviteCopied ? 'Link Copied!' : 'Quick Invite'}</span>
            </button>

            <button
              aria-label="Notifications"
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors relative cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#d91b77]"></span>
            </button>

            <div className="h-6 w-px bg-[#e5e2dd]"></div>

            <div className="flex items-center gap-2.5 pl-1">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs text-[#1c1c19] leading-tight font-bold">Marcus Vance</span>
                <span className="text-[11px] text-[#8e4767] leading-tight font-medium">Rank #12 • Gold</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#b1005e] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                MV
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex">
            <div className="w-72 bg-[#fcf9f4] h-full p-4 flex flex-col justify-between overflow-y-auto shadow-2xl border-r border-[#e5e2dd]">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#e5e2dd]">
                  <div className="flex items-center gap-2">
                    <img
                      alt="Nexora Brand Logo"
                      className="h-7 w-auto object-contain"
                      src="https://lh3.googleusercontent.com/aida/AEtjO1XZxTb-KtdsPjo0U0odHwDY485hRuwmfDBk7sy7hvncIa4xg3AdjCaLVTut6pSuuRiQJj_3YtSdqJ3TLo2klHSJMNebL6mVq0uWtOhluaULb7Cy_34No2AloAlRtDCW1-HCFGFyKGQkrv2OMGEMkXFJpEFLcxUma8v2Z1hXG0pFOlEix77UvOTw-NfNuX20oyBgVrPL--0n2ZNjrI0vKNBImBop03G0p3fTT3hR_Chdf05d_h_ZbzfoKQ"
                    />
                    <span className="font-bold text-base text-[#1c1c19]">Nexora</span>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-[#594047]">
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>
                <div className="flex flex-col gap-1 mt-4">
                  {[
                    { id: 'overview', label: 'Overview', icon: 'space_dashboard' },
                    { id: 'my-referral-code', label: 'My Referral Code', icon: 'qr_code_2' },
                    { id: 'referred-salons', label: 'Referred Salons', icon: 'storefront' },
                    { id: 'referral-status-timeline', label: 'Referral Status Timeline', icon: 'timeline' },
                    { id: 'rewards-and-milestones', label: 'Rewards & Milestones', icon: 'military_tech' },
                    { id: 'leaderboards', label: 'Top Performers Leaderboard', icon: 'leaderboard' },
                    { id: 'extra-onboarding-reward', label: 'Extra Onboarding Reward', icon: 'featured_seasonal_and_gifts' },
                    { id: 'profile-and-settings', label: 'Profile & Settings', icon: 'settings' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveNav(item.id);
                        setMobileMenuOpen(false);
                        if (item.id === 'overview' && onNavigateToSalonIntelligence) {
                          onNavigateToSalonIntelligence();
                        } else if (item.id === 'referral-status-timeline' && onNavigateToReferralTimeline) {
                          onNavigateToReferralTimeline();
                        }
                      }}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold ${
                        activeNav === item.id ? 'bg-[#d91b77] text-white' : 'text-[#1c1c19] hover:bg-[#f0ede9]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#e5e2dd] flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onNavigateToSalonIntelligence) onNavigateToSalonIntelligence();
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-[#f0ede9] text-xs font-bold text-[#b1005e] text-center"
                >
                  💈 Open Salon Intelligence
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onNavigateToReferralTimeline) onNavigateToReferralTimeline();
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-[#f0ede9] text-xs font-bold text-[#1c1c19] text-center"
                >
                  ⏱️ Referral Timeline
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="w-full pt-20 px-4 sm:px-6 py-6 flex-1">
          <div className="flex flex-col w-full gap-8 max-w-6xl mx-auto">
            {/* Top Leaderboard Header Banner */}
            <div className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#f6f3ee] via-white to-[#ffd9e2]/30 p-6 sm:p-8 border border-[#e5e2dd] shadow-xs">
              <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-[#cca730]/15 blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-[#d91b77]/10 blur-3xl pointer-events-none"></div>

              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-[#8e4767] text-xs uppercase tracking-wider mb-1 font-bold">
                    <span className="material-symbols-outlined text-[18px] text-[#cca730]">military_tech</span>
                    <span>Nexora Network Elite</span>
                    <span className="text-[#e1bdc6]">•</span>
                    <span className="text-[#594047] font-medium">{currentConfig.dateRange}</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1c1c19] tracking-tight flex items-center gap-2.5 flex-wrap">
                    <span>Top Performers Leaderboard</span>
                    <span
                      className="text-xs px-2.5 py-0.5 rounded-full font-bold shadow-xs align-middle"
                      style={{ backgroundColor: currentConfig.badgeBg, color: currentConfig.badgeColor }}
                    >
                      {currentConfig.title}
                    </span>
                  </h1>
                  <p className="text-xs sm:text-sm text-[#594047] max-w-2xl mt-1.5 leading-relaxed">
                    Celebrating the network's highest-earning growth partners. Showing verified earnings and salon expansion
                    metrics for <strong className="text-[#1c1c19]">{currentConfig.monthName}</strong> ({currentConfig.cycleNote}).
                  </p>
                </div>

                {/* Key Network Stats Cards - Dynamically updated based on month */}
                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                  <div className="p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-[#e5e2dd] shadow-xs flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-[#594047] tracking-wider">
                      Total Distributed ({currentConfig.shortLabel})
                    </span>
                    <span className="text-lg sm:text-xl font-extrabold text-[#b1005e] mt-0.5">
                      {currentConfig.totalDistributed}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-[#e5e2dd] shadow-xs flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-[#735c00] tracking-wider">
                      Top Earner ({currentConfig.shortLabel})
                    </span>
                    <span className="text-lg sm:text-xl font-extrabold text-[#1c1c19] mt-0.5">
                      {currentConfig.topEarnerAmount}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-[#e5e2dd] shadow-xs flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-[#8e4767] tracking-wider">
                      Avg Top 10 Payout
                    </span>
                    <span className="text-lg sm:text-xl font-extrabold text-[#72304f] mt-0.5">
                      {currentConfig.avgTop10}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Current User Standings Sticky Banner (Marcus Vance) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#ffd9e2]/40 via-white to-[#ffe088]/30 border border-[#fda4c9] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3.5">
                <div className="relative shrink-0">
                  <img
                    src={userPerformer.avatar}
                    alt={userPerformer.name}
                    className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-xs"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#d91b77] text-white flex items-center justify-center text-[10px] font-bold">
                    #{userPerformer.periodRank}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs sm:text-sm font-bold text-[#1c1c19]">
                      Your Standing: <strong className="text-[#b1005e]">Marcus Vance</strong>
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#ffe088] text-[#241a00] text-[10px] font-bold">
                      Gold Partner (NEX-88219)
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#f6f3ee] text-[#594047] font-semibold flex items-center gap-1.5">
                      <span>Rank #{userPerformer.periodRank} in {currentConfig.shortLabel}</span>
                      <RankChangeBadge change={userPerformer.rankChange} size="sm" />
                    </span>
                  </div>
                  <div className="text-xs text-[#594047] mt-0.5 flex items-center gap-1.5 flex-wrap">
                    <span>
                      {currentConfig.title} Earnings:{' '}
                      <strong className="text-[#1c1c19]">{formatRupees(userPerformer.displayEarnings)}</strong>
                    </span>
                    <YtdBreakdownTooltip performer={userPerformer} position="bottom" align="left">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full bg-white border border-[#e5e2dd] text-[#8e4767] font-bold hover:bg-[#ffd9e2] hover:text-[#b1005e] hover:border-[#fda4c9] transition-all cursor-pointer shadow-2xs"
                      >
                        <span className="material-symbols-outlined text-[10px] font-bold text-[#b1005e]">pie_chart</span>
                        <span>YTD Split</span>
                      </button>
                    </YtdBreakdownTooltip>
                    <span>• 18 Verified Salons •</span>
                    {selectedPeriod === 'current-month' ? (
                      <span className="text-[#b1005e] font-semibold">Only ₹33,500 to enter Top 10 this month</span>
                    ) : selectedPeriod === 'previous-month' ? (
                      <span className="text-[#735c00] font-semibold">Audited August payout reconciled</span>
                    ) : (
                      <span className="text-[#b1005e] font-semibold">Only ₹90,000 to enter Top 10 YTD</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end md:self-auto">
                <div className="flex flex-col text-right">
                  <span className="text-[10px] uppercase font-bold text-[#8e4767]">Velocity</span>
                  <span className="text-xs font-bold text-[#735c00]">{userPerformer.displayGrowth}</span>
                </div>
                <button
                  onClick={() => setSelectedPerformerId(userPerformer.id)}
                  className="px-4 py-2 rounded-xl bg-[#d91b77] text-white text-xs font-bold shadow-xs hover:bg-[#b1005e] transition-all cursor-pointer whitespace-nowrap"
                >
                  View My Metrics
                </button>
              </div>
            </div>

            {/* Filter & Search Bar with Month Selection Dropdown */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-[#e5e2dd] shadow-xs relative">
              {/* MONTH SELECTION DROPDOWN */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="relative" ref={monthDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
                    className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#f6f3ee] hover:bg-[#ebe8e3] border border-[#e5e2dd] shadow-xs transition-all cursor-pointer text-left min-w-[210px] sm:min-w-[240px]"
                    aria-haspopup="listbox"
                    aria-expanded={isMonthDropdownOpen}
                  >
                    <div className="w-8 h-8 rounded-lg bg-white text-[#b1005e] flex items-center justify-center shrink-0 shadow-xs border border-[#e5e2dd]">
                      <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                    </div>
                    <div className="flex flex-col flex-1 leading-tight min-w-0">
                      <span className="text-[9px] font-bold text-[#8e4767] uppercase tracking-wider">
                        Month / Horizon
                      </span>
                      <span className="text-xs font-extrabold text-[#1c1c19] flex items-center gap-1.5 mt-0.5 truncate">
                        <span className="truncate">{currentConfig.title}</span>
                        <span
                          className="text-[9px] px-1.5 py-0.2 rounded-full font-bold shrink-0"
                          style={{ backgroundColor: currentConfig.badgeBg, color: currentConfig.badgeColor }}
                        >
                          {currentConfig.shortLabel}
                        </span>
                      </span>
                    </div>
                    <span
                      className={`material-symbols-outlined text-[20px] text-[#594047] transition-transform duration-200 shrink-0 ${
                        isMonthDropdownOpen ? 'rotate-180 text-[#d91b77]' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>

                  {/* Dropdown Menu Popover */}
                  {isMonthDropdownOpen && (
                    <div
                      role="listbox"
                      className="absolute top-full left-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-[#e5e2dd] p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                    >
                      <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#594047] border-b border-[#e5e2dd]/70 mb-1 flex items-center justify-between">
                        <span>Select Leaderboard Month</span>
                        <span className="text-[9px] text-[#8e4767] font-semibold">3 Horizons</span>
                      </div>

                      {(['current-month', 'previous-month', 'ytd'] as LeaderboardPeriod[]).map((periodKey) => {
                        const conf = PERIOD_CONFIGS[periodKey];
                        const isSelected = selectedPeriod === periodKey;

                        return (
                          <button
                            key={periodKey}
                            type="button"
                            role="option"
                            aria-selected={isSelected}
                            onClick={() => {
                              setSelectedPeriod(periodKey);
                              setIsMonthDropdownOpen(false);
                            }}
                            className={`w-full text-left p-2.5 rounded-xl transition-all cursor-pointer flex items-start justify-between gap-2.5 my-0.5 ${
                              isSelected
                                ? 'bg-[#ffd9e2]/40 border border-[#d91b77]/40 text-[#1c1c19]'
                                : 'hover:bg-[#f6f3ee] text-[#594047]'
                            }`}
                          >
                            <div className="flex items-start gap-2.5 min-w-0">
                              <span
                                className={`material-symbols-outlined text-[20px] mt-0.5 shrink-0 ${
                                  isSelected ? 'text-[#d91b77]' : 'text-[#8d6f77]'
                                }`}
                              >
                                {periodKey === 'current-month'
                                  ? 'bolt'
                                  : periodKey === 'previous-month'
                                  ? 'history'
                                  : 'insights'}
                              </span>
                              <div className="flex flex-col min-w-0">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span
                                    className={`text-xs font-bold ${
                                      isSelected ? 'text-[#b1005e]' : 'text-[#1c1c19]'
                                    }`}
                                  >
                                    {conf.title}
                                  </span>
                                  <span
                                    className="text-[9px] px-1.5 py-0.2 rounded-full font-bold"
                                    style={{ backgroundColor: conf.badgeBg, color: conf.badgeColor }}
                                  >
                                    {conf.badge}
                                  </span>
                                </div>
                                <span className="text-[11px] font-semibold text-[#1c1c19] mt-0.5">
                                  {conf.monthName}
                                </span>
                                <span className="text-[10px] text-[#8d6f77] mt-0.5 line-clamp-1">
                                  {conf.cycleNote}
                                </span>
                              </div>
                            </div>

                            {isSelected && (
                              <span className="material-symbols-outlined text-[#d91b77] text-[18px] shrink-0 mt-0.5">
                                check_circle
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Quick Switch Horizon Pills */}
                <div className="hidden sm:flex items-center gap-1 bg-[#f6f3ee] p-1 rounded-xl border border-[#e5e2dd]">
                  {(['current-month', 'previous-month', 'ytd'] as LeaderboardPeriod[]).map((pKey) => {
                    const conf = PERIOD_CONFIGS[pKey];
                    const isSel = selectedPeriod === pKey;
                    return (
                      <button
                        key={pKey}
                        onClick={() => setSelectedPeriod(pKey)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isSel
                            ? 'bg-white text-[#b1005e] shadow-xs'
                            : 'text-[#594047] hover:text-[#1c1c19]'
                        }`}
                      >
                        {conf.shortLabel}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tier Filters & Search Box */}
              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                {/* Tier Filters */}
                <div className="flex items-center gap-1 overflow-x-auto py-1">
                  <span className="text-[10px] font-bold uppercase text-[#8d6f77] mr-1 hidden sm:inline">
                    Tier:
                  </span>
                  {[
                    { key: 'all', label: 'All Tiers' },
                    { key: 'crown', label: '👑 Crown' },
                    { key: 'diamond', label: '💎 Diamond' },
                    { key: 'platinum', label: '⭐ Platinum' },
                    { key: 'gold', label: '🏅 Gold' }
                  ].map((tier) => (
                    <button
                      key={tier.key}
                      onClick={() => setSelectedTierFilter(tier.key)}
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                        selectedTierFilter === tier.key
                          ? 'bg-[#d91b77] text-white shadow-xs'
                          : 'bg-[#f6f3ee] text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19]'
                      }`}
                    >
                      {tier.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* DEDICATED PARTNER NAME SEARCH BAR */}
              <div className="pt-2.5 border-t border-[#e5e2dd]/70 flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="relative flex-1">
                    <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-[#b1005e] text-[20px]">
                      search
                    </span>
                    <input
                      type="text"
                      placeholder="Search partner by name to find their ranking (e.g. Aarav, Priya, Marcus, Tanvi)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-24 py-2.5 bg-[#f6f3ee] hover:bg-[#f0ede9] focus:bg-white rounded-xl text-xs sm:text-sm border border-[#e5e2dd] focus:border-[#d91b77] focus:ring-2 focus:ring-[#d91b77]/20 outline-none text-[#1c1c19] placeholder:text-[#8d6f77] transition-all"
                    />
                    <div className="absolute right-2.5 top-2 flex items-center gap-1.5">
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery('')}
                          className="h-6 w-6 rounded-full bg-[#e5e2dd] hover:bg-[#d91b77] hover:text-white text-[#594047] flex items-center justify-center transition-colors cursor-pointer"
                          title="Clear search"
                        >
                          <span className="material-symbols-outlined text-[14px]">close</span>
                        </button>
                      )}
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#e5e2dd] text-[#594047] font-semibold hidden sm:inline-block">
                        {filteredPerformers.length} {filteredPerformers.length === 1 ? 'partner' : 'partners'}
                      </span>
                    </div>
                  </div>

                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="px-3 py-2 rounded-xl bg-[#ffd9e2] text-[#b1005e] hover:bg-[#b1005e] hover:text-white text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1 shrink-0"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                      <span>Clear Search</span>
                    </button>
                  )}
                </div>

                {/* Quick Partner Name Suggestions */}
                <div className="flex items-center gap-1.5 flex-wrap text-xs text-[#594047]">
                  <span className="text-[10px] font-bold uppercase text-[#8d6f77] flex items-center gap-1 shrink-0">
                    <span className="material-symbols-outlined text-[14px] text-[#b1005e]">bolt</span>
                    Quick name search:
                  </span>
                  {[
                    { name: 'Aarav Singhania', label: 'Aarav' },
                    { name: 'Priya Sharma', label: 'Priya' },
                    { name: 'Marcus Vance', label: 'Marcus (You)' },
                    { name: 'Tanvi Kapoor', label: 'Tanvi' },
                    { name: 'Vikramaditya Roy', label: 'Vikramaditya' },
                    { name: 'Harsh Vardhan', label: 'Harsh' }
                  ].map((chip) => {
                    const isSelected = searchQuery.toLowerCase() === chip.name.toLowerCase();
                    return (
                      <button
                        key={chip.name}
                        type="button"
                        onClick={() => setSearchQuery(isSelected ? '' : chip.name)}
                        className={`px-2.5 py-0.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-[#d91b77] text-white border-[#d91b77] shadow-2xs'
                            : 'bg-[#f6f3ee] text-[#594047] border-[#e5e2dd] hover:bg-[#e5e2dd] hover:text-[#1c1c19]'
                        }`}
                      >
                        {chip.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Active search banner if podium partners don't match */}
            {searchQuery.trim() && topThree.every((p) => !p.name.toLowerCase().includes(searchQuery.toLowerCase())) && (
              <div className="p-3 px-4 rounded-2xl bg-[#f0ede9] border border-[#e5e2dd] flex items-center justify-between gap-3 text-xs text-[#594047]">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="material-symbols-outlined text-[#8e4767] text-[18px] shrink-0">info</span>
                  <span className="truncate">
                    Showing overall Top 3 Podium below. Matching partner rankings for <strong className="text-[#1c1c19]">"{searchQuery}"</strong> appear in Network Standings.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-[#b1005e] font-bold hover:underline shrink-0 cursor-pointer"
                >
                  Clear filter
                </button>
              </div>
            )}

            {/* TOP 3 PODIUM CARDS (Gold, Silver, Bronze) - Ranked for current horizon */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {topThree.map((p) => {
                const isFirst = p.periodRank === 1;
                const isSecond = p.periodRank === 2;
                const isThird = p.periodRank === 3;

                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPerformerId(p.id)}
                    className={`relative rounded-3xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer flex flex-col justify-between border ${
                      isFirst
                        ? 'bg-gradient-to-b from-[#ffe088]/40 via-white to-white border-[#cca730] shadow-[0_12px_36px_rgba(204,167,48,0.18)] md:-translate-y-2'
                        : isSecond
                        ? 'bg-gradient-to-b from-[#ffd8e5]/40 via-white to-white border-[#8e4767]/30 shadow-[0_8px_30px_rgba(142,71,103,0.1)]'
                        : 'bg-gradient-to-b from-[#e5e2dd]/40 via-white to-white border-[#e5e2dd] shadow-[0_8px_30px_rgba(0,0,0,0.04)]'
                    }`}
                  >
                    {/* Podium Crown / Medal Badge */}
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2 flex-wrap">
                        <div
                          className={`w-9 h-9 rounded-2xl flex items-center justify-center font-extrabold text-sm shadow-xs ${
                            isFirst
                              ? 'bg-[#cca730] text-[#241a00]'
                              : isSecond
                              ? 'bg-[#8e4767] text-white'
                              : 'bg-[#735c00] text-white'
                          }`}
                        >
                          #{p.periodRank}
                        </div>
                        <RankChangeBadge change={p.rankChange} size="md" />
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                          style={{ backgroundColor: p.tierBg, color: p.tierColor }}
                        >
                          {p.tier}
                        </span>
                      </div>

                      {isFirst && (
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ffe088] text-[#241a00] text-[10px] font-bold shadow-xs">
                          <span className="material-symbols-outlined text-[14px]">crown</span>
                          <span>{currentConfig.shortLabel} Leader</span>
                        </div>
                      )}
                    </div>

                    {/* Performer Visual & Info */}
                    <div className="flex flex-col items-center text-center my-4">
                      <div className="relative">
                        <img
                          src={p.avatar}
                          alt={p.name}
                          className={`w-20 h-20 rounded-2xl object-cover shadow-md border-4 ${
                            isFirst ? 'border-[#cca730]' : isSecond ? 'border-[#8e4767]' : 'border-[#e5e2dd]'
                          }`}
                        />
                        <span className="material-symbols-outlined absolute -top-2 -right-2 text-[#b1005e] bg-white rounded-full p-0.5 shadow-xs text-[18px]">
                          verified
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-[#1c1c19] mt-3">
                        {highlightMatch(p.name, searchQuery)}
                      </h3>
                      <span className="text-xs text-[#594047] flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-[14px]">location_on</span>
                        {p.location}
                      </span>
                    </div>

                    {/* Earnings Highlight Box with YTD Breakdown Tooltip */}
                    <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] flex flex-col gap-1 text-center">
                      <YtdBreakdownTooltip performer={p} position="top" align="center" className="w-full flex justify-center">
                        <div className="flex flex-col items-center cursor-help group/podiumEarnings w-full">
                          <div className="flex items-center justify-center gap-1.5 flex-wrap mb-1">
                            <span className="text-[10px] uppercase font-bold text-[#594047] tracking-wider group-hover/podiumEarnings:text-[#b1005e] transition-colors">
                              {currentConfig.earningsLabel}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full bg-white border border-[#e5e2dd] text-[#8e4767] font-bold group-hover/podiumEarnings:bg-[#ffd9e2] group-hover/podiumEarnings:text-[#b1005e] group-hover/podiumEarnings:border-[#fda4c9] transition-all shadow-2xs">
                              <span className="material-symbols-outlined text-[11px] font-bold text-[#b1005e]">pie_chart</span>
                              <span>YTD Split</span>
                            </span>
                          </div>
                          <span className="text-2xl font-extrabold text-[#b1005e] tracking-tight group-hover/podiumEarnings:underline decoration-dotted decoration-[#b1005e]/50 underline-offset-4 transition-all">
                            {formatRupees(p.displayEarnings)}
                          </span>
                        </div>
                      </YtdBreakdownTooltip>
                      <div className="flex items-center justify-between text-[11px] text-[#594047] pt-2 border-t border-[#e5e2dd] mt-1">
                        <span>{p.activeSalons} Salons</span>
                        <span className="text-[#b1005e] font-bold">{p.conversionRate}% Velocity</span>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="flex items-center justify-between mt-4 text-xs">
                      <span className="text-[11px] text-[#735c00] font-bold">{p.displayGrowth}</span>
                      <span className="text-[#d91b77] font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                        <span>Deep-dive</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* FULL LEADERBOARD CARDS */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#1c1c19] flex items-center gap-2 flex-wrap">
                    <span>Network Standings — {currentConfig.title}</span>
                    {searchQuery.trim() && (
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#ffd9e2] text-[#b1005e] font-bold">
                        Filtered by "{searchQuery}"
                      </span>
                    )}
                  </h2>
                  <p className="text-xs text-[#594047]">
                    {searchQuery.trim()
                      ? `Found ${filteredPerformers.length} partner${filteredPerformers.length === 1 ? '' : 's'} matching your search in ${currentConfig.monthName}`
                      : `Showing ${filteredPerformers.length} top performing partners for ${currentConfig.monthName}`}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Visual rank change legend */}
                  <div className="flex items-center gap-1.5 text-[10px] bg-[#f0ede9] px-2.5 py-1 rounded-full border border-[#e5e2dd]">
                    <span className="text-[#594047] font-semibold">Rank Shift:</span>
                    <span className="inline-flex items-center text-[#137333] font-bold">
                      <span className="material-symbols-outlined text-[12px] font-black mr-0.5">arrow_upward</span> Improved
                    </span>
                    <span className="text-[#d5d2cd]">|</span>
                    <span className="inline-flex items-center text-[#c5221f] font-bold">
                      <span className="material-symbols-outlined text-[12px] font-black mr-0.5">arrow_downward</span> Declined
                    </span>
                  </div>

                  {searchQuery.trim() && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="text-xs font-bold text-[#b1005e] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                      <span>Clear Search</span>
                    </button>
                  )}
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#f0ede9] text-[#594047] font-semibold">
                    Cycle: {currentConfig.dateRange}
                  </span>
                  <span className="text-xs font-bold text-[#b1005e]">Audited Live</span>
                </div>
              </div>

              {filteredPerformers.length === 0 ? (
                <div className="py-12 px-6 rounded-3xl bg-white border border-[#e5e2dd] text-center flex flex-col items-center justify-center shadow-xs">
                  <div className="w-16 h-16 rounded-2xl bg-[#ffd9e2]/60 text-[#b1005e] flex items-center justify-center mb-3">
                    <span className="material-symbols-outlined text-[32px]">person_search</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1c1c19]">
                    No partners found matching "{searchQuery}"
                  </h3>
                  <p className="text-xs sm:text-sm text-[#594047] max-w-md mt-1.5 leading-relaxed">
                    We couldn't find any partner by that name in the <strong>{currentConfig.title}</strong> leaderboard. Check your spelling or reset the search to view all partners.
                  </p>
                  <div className="flex items-center gap-3 mt-5">
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedTierFilter('all');
                      }}
                      className="px-4 py-2 rounded-xl bg-[#d91b77] text-white text-xs font-bold shadow-xs hover:bg-[#b1005e] transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                      <span>Reset Search & Filters</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredPerformers.map((p) => {
                    const isCurrentUser = p.id === 'NEX-88219';

                    return (
                      <div
                        key={p.id}
                        onClick={() => setSelectedPerformerId(p.id)}
                        className={`relative rounded-2xl p-4 transition-all duration-200 hover:shadow-md cursor-pointer flex flex-col justify-between border ${
                          isCurrentUser
                            ? 'bg-[#ffd9e2]/30 border-[#d91b77] shadow-xs ring-2 ring-[#d91b77]/20'
                            : 'bg-white border-[#e5e2dd] hover:bg-[#f6f3ee]'
                        }`}
                      >
                        {/* Top Rank Badge + Rank Indicator + Tier */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span
                              className={`w-7 h-7 rounded-xl flex items-center justify-center font-extrabold text-xs shadow-2xs ${
                                p.periodRank <= 3
                                  ? 'bg-[#cca730] text-[#241a00]'
                                  : p.periodRank <= 5
                                  ? 'bg-[#c3e8ff] text-[#005b82]'
                                  : p.periodRank <= 9
                                  ? 'bg-[#e6deff] text-[#533f86]'
                                  : 'bg-[#ffd8e5] text-[#8e4767]'
                              }`}
                            >
                              #{p.periodRank}
                            </span>
                            <RankChangeBadge change={p.rankChange} size="sm" />
                            <span
                              className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                              style={{ backgroundColor: p.tierBg, color: p.tierColor }}
                            >
                              {p.tier}
                            </span>
                          </div>

                          {isCurrentUser && (
                            <span className="px-2 py-0.5 rounded-full bg-[#d91b77] text-white text-[10px] font-bold animate-pulse">
                              YOU
                            </span>
                          )}
                        </div>

                        {/* Partner Avatar + Identity */}
                        <div className="flex items-center gap-3 mb-3">
                          <img
                            src={p.avatar}
                            alt={p.name}
                            className="w-12 h-12 rounded-xl object-cover border border-[#e5e2dd] shadow-xs shrink-0"
                          />
                          <div className="flex flex-col min-w-0">
                            <h4 className="text-xs sm:text-sm font-bold text-[#1c1c19] truncate">
                              {highlightMatch(p.name, searchQuery)}
                            </h4>
                            <span className="text-[11px] text-[#594047] flex items-center gap-1">
                              <span className="material-symbols-outlined text-[13px]">location_on</span>
                              {p.location}
                            </span>
                          </div>
                        </div>

                        {/* Metrics Card Row */}
                        <div className="p-3 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] flex items-center justify-between mb-2">
                          <YtdBreakdownTooltip performer={p} position="top" align="left">
                            <div className="flex flex-col cursor-help group/cardEarnings">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-[10px] font-semibold text-[#594047] uppercase group-hover/cardEarnings:text-[#b1005e] transition-colors">
                                  {currentConfig.earningsLabel}
                                </span>
                                <span className="inline-flex items-center gap-0.5 text-[9px] px-1.5 py-0.2 rounded-full bg-white border border-[#e5e2dd] text-[#8e4767] font-bold group-hover/cardEarnings:bg-[#ffd9e2] group-hover/cardEarnings:text-[#b1005e] group-hover/cardEarnings:border-[#fda4c9] transition-all shadow-2xs">
                                  <span className="material-symbols-outlined text-[10px] font-bold text-[#b1005e]">pie_chart</span>
                                  <span>YTD Split</span>
                                </span>
                              </div>
                              <span className="text-base font-extrabold text-[#b1005e] tracking-tight group-hover/cardEarnings:underline decoration-dotted decoration-[#b1005e]/50 underline-offset-2 transition-all">
                                {formatRupees(p.displayEarnings)}
                              </span>
                            </div>
                          </YtdBreakdownTooltip>
                          <div className="flex flex-col text-right">
                            <span className="text-[10px] font-semibold text-[#594047] uppercase">Network Size</span>
                            <span className="text-xs font-bold text-[#1c1c19]">{p.activeSalons} Salons</span>
                          </div>
                        </div>

                        {/* Card Footer Micro Badges */}
                        <div className="flex items-center justify-between text-[11px] text-[#594047] pt-1">
                          <span className="text-[#8e4767] font-semibold truncate max-w-[170px]">
                            Top: {p.topSalon}
                          </span>
                          <span className="text-[#735c00] font-bold shrink-0">{p.displayGrowth}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Tier Qualification Ladder Summary Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#f0ede9] to-[#f6f3ee] border border-[#e5e2dd] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-[#735c00] text-xs font-bold uppercase tracking-wider mb-1">
                  <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
                  <span>Partner Tier Requirements</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#1c1c19]">
                  How to climb to Crown Ambassador Status
                </h3>
                <p className="text-xs text-[#594047] max-w-xl mt-1 leading-relaxed">
                  Earn higher commission multipliers, priority merchant hardware logistics, and direct quarterly cash
                  pools by maintaining active QR conversion velocity above 80%.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (onNavigateToHub) onNavigateToHub();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#d91b77] text-white text-xs font-bold shadow-md hover:bg-[#b1005e] transition-all cursor-pointer whitespace-nowrap"
                >
                  View Rewards Ladder →
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
