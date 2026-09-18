import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy,
  Award,
  Medal,
  TrendingUp,
  TrendingDown,
  Minus,
  Search,
  Filter,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Store,
  Info,
  Calendar,
  Share2,
  HelpCircle,
  ExternalLink,
  CheckCircle2,
  ArrowUpRight,
  UserCheck,
  Zap,
  Gift
} from 'lucide-react';
import { MilestoneRankDefinition, LeaderboardPartnerItem } from '../types';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export const MILESTONE_RANKS: MilestoneRankDefinition[] = [
  {
    level: 7,
    name: 'District Partner SUV Legend',
    title: 'Grand Legend',
    minSalons: 1000,
    reward: 'District Partner SUV Car (Mahindra XUV700) + Royalty',
    rewardIcon: 'directions_car',
    badgeTag: 'Level 7 Legend',
    colorName: 'rose-gold',
    bgGradient: 'from-amber-500/15 via-rose-500/15 to-purple-600/15',
    borderColor: 'border-amber-400',
    textColor: 'text-amber-900',
    pillColor: 'bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-sm'
  },
  {
    level: 6,
    name: 'Cruiser Motorcycle Director',
    title: 'Regional Director',
    minSalons: 750,
    maxSalons: 999,
    reward: 'Royal Enfield Classic 350 CC',
    rewardIcon: 'two_wheeler',
    badgeTag: 'Level 6 Director',
    colorName: 'deep-indigo',
    bgGradient: 'from-indigo-500/15 to-purple-500/15',
    borderColor: 'border-indigo-400',
    textColor: 'text-indigo-900',
    pillColor: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm'
  },
  {
    level: 5,
    name: 'Flagship iPhone Executive',
    title: 'Executive Leader',
    minSalons: 500,
    maxSalons: 749,
    reward: 'Latest iPhone 16 Pro (Titanium 256GB)',
    rewardIcon: 'smartphone',
    badgeTag: 'Level 5 Executive',
    colorName: 'fuchsia',
    bgGradient: 'from-fuchsia-500/15 to-pink-500/15',
    borderColor: 'border-fuchsia-400',
    textColor: 'text-fuchsia-900',
    pillColor: 'bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white shadow-sm'
  },
  {
    level: 4,
    name: 'Smart EV Scooter Leader',
    title: 'Senior Team Leader',
    minSalons: 250,
    maxSalons: 499,
    reward: 'Smart Electric Scooter (Ather 450X / Ola S1)',
    rewardIcon: 'electric_scooter',
    badgeTag: 'Level 4 Senior Leader',
    colorName: 'emerald',
    bgGradient: 'from-emerald-500/15 to-teal-500/15',
    borderColor: 'border-emerald-400',
    textColor: 'text-emerald-900',
    pillColor: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm'
  },
  {
    level: 3,
    name: 'Enterprise Laptop Pro',
    title: 'Professional Partner',
    minSalons: 100,
    maxSalons: 249,
    reward: 'Branded HP Laptop (AI Ultra Core i5)',
    rewardIcon: 'laptop',
    badgeTag: 'Level 3 Pro',
    colorName: 'blue',
    bgGradient: 'from-blue-500/15 to-cyan-500/15',
    borderColor: 'border-blue-400',
    textColor: 'text-blue-900',
    pillColor: 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-sm'
  },
  {
    level: 2,
    name: 'Smart Tablet Associate',
    title: 'Associate Partner',
    minSalons: 50,
    maxSalons: 99,
    reward: 'Samsung Galaxy Tab A9+ (5G)',
    rewardIcon: 'tablet',
    badgeTag: 'Level 2 Associate',
    colorName: 'amber',
    bgGradient: 'from-amber-500/15 to-yellow-500/15',
    borderColor: 'border-amber-400',
    textColor: 'text-amber-900',
    pillColor: 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white shadow-sm'
  },
  {
    level: 1,
    name: 'Starter Kit Partner',
    title: 'Certified Partner',
    minSalons: 25,
    maxSalons: 49,
    reward: 'Official Nexora T-Shirt & Welcome Merch Kit',
    rewardIcon: 'checkroom',
    badgeTag: 'Level 1 Entry',
    colorName: 'rose',
    bgGradient: 'from-rose-500/15 to-orange-500/15',
    borderColor: 'border-rose-300',
    textColor: 'text-rose-900',
    pillColor: 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-sm'
  }
];

export const INITIAL_LEADERBOARD_PARTNERS: LeaderboardPartnerItem[] = [
  {
    rank: 1,
    id: 'GP-1008',
    name: 'Julian Mercer',
    initials: 'JM',
    city: 'Bengaluru',
    state: 'Karnataka',
    salonOnboardingCount: 1148,
    verifiedCount: 1112,
    inProgressCount: 36,
    growthTrend: 'up',
    trendRanks: 2,
    milestoneLevel: 7,
    milestoneTitle: 'District Partner SUV Legend',
    milestoneReward: 'Mahindra XUV700 SUV + Lifetime Royalty',
    milestoneRewardIcon: 'directions_car',
    nextMilestoneNeeded: 0,
    nextMilestoneTitle: 'Maximum Milestone Achieved',
    nextMilestoneReward: 'District Royalty Boost (15%)',
    progressToNextMilestone: 100,
    estimatedMonthlyEarnings: 345000,
    joinedDate: 'Jan 2024'
  },
  {
    rank: 2,
    id: 'GP-2204',
    name: 'Vikramaditya Rathore',
    initials: 'VR',
    city: 'Jaipur',
    state: 'Rajasthan',
    salonOnboardingCount: 862,
    verifiedCount: 835,
    inProgressCount: 27,
    growthTrend: 'up',
    trendRanks: 1,
    milestoneLevel: 6,
    milestoneTitle: 'Cruiser Motorcycle Director',
    milestoneReward: 'Royal Enfield Classic 350 CC',
    milestoneRewardIcon: 'two_wheeler',
    nextMilestoneNeeded: 138,
    nextMilestoneTitle: 'Level 7: District Partner SUV',
    nextMilestoneReward: 'Mahindra XUV700 SUV',
    progressToNextMilestone: 86,
    estimatedMonthlyEarnings: 258000,
    joinedDate: 'Feb 2024'
  },
  {
    rank: 3,
    id: 'GP-3190',
    name: 'Priya Sharma',
    initials: 'PS',
    city: 'Mumbai',
    state: 'Maharashtra',
    salonOnboardingCount: 612,
    verifiedCount: 588,
    inProgressCount: 24,
    growthTrend: 'neutral',
    trendRanks: 0,
    milestoneLevel: 5,
    milestoneTitle: 'Flagship iPhone Executive',
    milestoneReward: 'Apple iPhone 16 Pro Titanium',
    milestoneRewardIcon: 'smartphone',
    nextMilestoneNeeded: 138,
    nextMilestoneTitle: 'Level 6: Royal Enfield 350',
    nextMilestoneReward: 'Cruiser Motorcycle 350 CC',
    progressToNextMilestone: 81,
    estimatedMonthlyEarnings: 184000,
    joinedDate: 'Mar 2024'
  },
  {
    rank: 4,
    id: 'GP-8821',
    name: 'Rohit Verma',
    initials: 'RV',
    city: 'Nagpur',
    state: 'Maharashtra',
    salonOnboardingCount: 342,
    verifiedCount: 328,
    inProgressCount: 14,
    growthTrend: 'up',
    trendRanks: 3,
    milestoneLevel: 4,
    milestoneTitle: 'Smart EV Scooter Leader',
    milestoneReward: 'Electric Scooter (Ather 450X / Ola)',
    milestoneRewardIcon: 'electric_scooter',
    nextMilestoneNeeded: 158,
    nextMilestoneTitle: 'Level 5: Apple iPhone 16 Pro',
    nextMilestoneReward: 'iPhone 16 Pro (Titanium)',
    progressToNextMilestone: 68,
    estimatedMonthlyEarnings: 102500,
    joinedDate: 'Apr 2024'
  },
  {
    rank: 5,
    id: 'GP-5510',
    name: 'Amanpreet Singh',
    initials: 'AS',
    city: 'Chandigarh',
    state: 'Punjab',
    salonOnboardingCount: 278,
    verifiedCount: 265,
    inProgressCount: 13,
    growthTrend: 'up',
    trendRanks: 1,
    milestoneLevel: 4,
    milestoneTitle: 'Smart EV Scooter Leader',
    milestoneReward: 'Electric Scooter (Ather 450X / Ola)',
    milestoneRewardIcon: 'electric_scooter',
    nextMilestoneNeeded: 222,
    nextMilestoneTitle: 'Level 5: Apple iPhone 16 Pro',
    nextMilestoneReward: 'iPhone 16 Pro (Titanium)',
    progressToNextMilestone: 55,
    estimatedMonthlyEarnings: 83400,
    joinedDate: 'May 2024'
  },
  {
    rank: 6,
    id: 'GP-4402',
    name: 'Sunita Deshmukh',
    initials: 'SD',
    city: 'Thane',
    state: 'Maharashtra',
    salonOnboardingCount: 194,
    verifiedCount: 186,
    inProgressCount: 8,
    growthTrend: 'neutral',
    trendRanks: 0,
    milestoneLevel: 3,
    milestoneTitle: 'Enterprise Laptop Pro',
    milestoneReward: 'Branded HP Laptop (AI Ultra Core i5)',
    milestoneRewardIcon: 'laptop',
    nextMilestoneNeeded: 56,
    nextMilestoneTitle: 'Level 4: Smart EV Scooter',
    nextMilestoneReward: 'Electric Scooter',
    progressToNextMilestone: 77,
    estimatedMonthlyEarnings: 58200,
    joinedDate: 'Jun 2024'
  },
  {
    rank: 7,
    id: 'GP-9110',
    name: 'Deepak Joshi',
    initials: 'DJ',
    city: 'New Delhi',
    state: 'Delhi NCR',
    salonOnboardingCount: 156,
    verifiedCount: 148,
    inProgressCount: 8,
    growthTrend: 'up',
    trendRanks: 2,
    milestoneLevel: 3,
    milestoneTitle: 'Enterprise Laptop Pro',
    milestoneReward: 'Branded HP Laptop (AI Ultra Core i5)',
    milestoneRewardIcon: 'laptop',
    nextMilestoneNeeded: 94,
    nextMilestoneTitle: 'Level 4: Smart EV Scooter',
    nextMilestoneReward: 'Electric Scooter',
    progressToNextMilestone: 62,
    estimatedMonthlyEarnings: 46800,
    joinedDate: 'Jun 2024'
  },
  {
    rank: 8,
    id: 'GP-7729',
    name: 'Ananya Agrawal',
    initials: 'AA',
    city: 'Indore',
    state: 'Madhya Pradesh',
    salonOnboardingCount: 122,
    verifiedCount: 115,
    inProgressCount: 7,
    growthTrend: 'down',
    trendRanks: 1,
    milestoneLevel: 3,
    milestoneTitle: 'Enterprise Laptop Pro',
    milestoneReward: 'Branded HP Laptop (AI Ultra Core i5)',
    milestoneRewardIcon: 'laptop',
    nextMilestoneNeeded: 128,
    nextMilestoneTitle: 'Level 4: Smart EV Scooter',
    nextMilestoneReward: 'Electric Scooter',
    progressToNextMilestone: 48,
    estimatedMonthlyEarnings: 36600,
    joinedDate: 'Jul 2024'
  },
  {
    rank: 9,
    id: 'GP-6612',
    name: 'Manish Kumar',
    initials: 'MK',
    city: 'Pune',
    state: 'Maharashtra',
    salonOnboardingCount: 88,
    verifiedCount: 82,
    inProgressCount: 6,
    growthTrend: 'up',
    trendRanks: 4,
    milestoneLevel: 2,
    milestoneTitle: 'Smart Tablet Associate',
    milestoneReward: 'Samsung Galaxy Tab A9+ (5G)',
    milestoneRewardIcon: 'tablet',
    nextMilestoneNeeded: 12,
    nextMilestoneTitle: 'Level 3: HP OmniBook Laptop',
    nextMilestoneReward: 'HP Laptop (100 Shops)',
    progressToNextMilestone: 88,
    estimatedMonthlyEarnings: 26400,
    joinedDate: 'Jul 2024'
  },
  {
    rank: 10,
    id: 'GP-8921',
    name: 'Vijay Singhania',
    initials: 'VS',
    city: 'Hyderabad',
    state: 'Telangana',
    salonOnboardingCount: 76,
    verifiedCount: 71,
    inProgressCount: 5,
    growthTrend: 'neutral',
    trendRanks: 0,
    milestoneLevel: 2,
    milestoneTitle: 'Smart Tablet Associate',
    milestoneReward: 'Samsung Galaxy Tab A9+ (5G)',
    milestoneRewardIcon: 'tablet',
    nextMilestoneNeeded: 24,
    nextMilestoneTitle: 'Level 3: HP OmniBook Laptop',
    nextMilestoneReward: 'HP Laptop (100 Shops)',
    progressToNextMilestone: 76,
    estimatedMonthlyEarnings: 22800,
    joinedDate: 'Aug 2024'
  },
  {
    rank: 11,
    id: 'GP-7301',
    name: 'Deepak Lodhi',
    initials: 'DL',
    city: 'Bengaluru',
    state: 'Karnataka',
    salonOnboardingCount: 64,
    verifiedCount: 59,
    inProgressCount: 5,
    growthTrend: 'down',
    trendRanks: 2,
    milestoneLevel: 2,
    milestoneTitle: 'Smart Tablet Associate',
    milestoneReward: 'Samsung Galaxy Tab A9+ (5G)',
    milestoneRewardIcon: 'tablet',
    nextMilestoneNeeded: 36,
    nextMilestoneTitle: 'Level 3: HP OmniBook Laptop',
    nextMilestoneReward: 'HP Laptop (100 Shops)',
    progressToNextMilestone: 64,
    estimatedMonthlyEarnings: 19200,
    joinedDate: 'Aug 2024'
  },
  {
    rank: 12,
    id: 'GP-6610',
    name: 'Shruti Mishra',
    initials: 'SM',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    salonOnboardingCount: 46,
    verifiedCount: 43,
    inProgressCount: 3,
    growthTrend: 'up',
    trendRanks: 2,
    milestoneLevel: 1,
    milestoneTitle: 'Starter Kit Partner',
    milestoneReward: 'Official Nexora T-Shirt & Welcome Kit',
    milestoneRewardIcon: 'checkroom',
    nextMilestoneNeeded: 4,
    nextMilestoneTitle: 'Level 2: Samsung Galaxy Tab',
    nextMilestoneReward: 'Samsung Tablet (50 Shops)',
    progressToNextMilestone: 92,
    estimatedMonthlyEarnings: 13800,
    joinedDate: 'Aug 2024'
  },
  {
    rank: 13,
    id: 'GP-1876',
    name: 'Naveen Goyal',
    initials: 'NG',
    city: 'Gurugram',
    state: 'Haryana',
    salonOnboardingCount: 39,
    verifiedCount: 36,
    inProgressCount: 3,
    growthTrend: 'down',
    trendRanks: 1,
    milestoneLevel: 1,
    milestoneTitle: 'Starter Kit Partner',
    milestoneReward: 'Official Nexora T-Shirt & Welcome Kit',
    milestoneRewardIcon: 'checkroom',
    nextMilestoneNeeded: 11,
    nextMilestoneTitle: 'Level 2: Samsung Galaxy Tab',
    nextMilestoneReward: 'Samsung Tablet (50 Shops)',
    progressToNextMilestone: 78,
    estimatedMonthlyEarnings: 11700,
    joinedDate: 'Sep 2024'
  },
  {
    rank: 14,
    id: 'GP-1093',
    name: 'Alok Patel',
    initials: 'AP',
    city: 'Ahmedabad',
    state: 'Gujarat',
    salonOnboardingCount: 33,
    verifiedCount: 30,
    inProgressCount: 3,
    growthTrend: 'neutral',
    trendRanks: 0,
    milestoneLevel: 1,
    milestoneTitle: 'Starter Kit Partner',
    milestoneReward: 'Official Nexora T-Shirt & Welcome Kit',
    milestoneRewardIcon: 'checkroom',
    nextMilestoneNeeded: 17,
    nextMilestoneTitle: 'Level 2: Samsung Galaxy Tab',
    nextMilestoneReward: 'Samsung Tablet (50 Shops)',
    progressToNextMilestone: 66,
    estimatedMonthlyEarnings: 9900,
    joinedDate: 'Sep 2024'
  },
  {
    rank: 15,
    id: 'GP-5021',
    name: 'Rajeshwari Reddy',
    initials: 'RR',
    city: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    salonOnboardingCount: 28,
    verifiedCount: 26,
    inProgressCount: 2,
    growthTrend: 'up',
    trendRanks: 1,
    milestoneLevel: 1,
    milestoneTitle: 'Starter Kit Partner',
    milestoneReward: 'Official Nexora T-Shirt & Welcome Kit',
    milestoneRewardIcon: 'checkroom',
    nextMilestoneNeeded: 22,
    nextMilestoneTitle: 'Level 2: Samsung Galaxy Tab',
    nextMilestoneReward: 'Samsung Tablet (50 Shops)',
    progressToNextMilestone: 56,
    estimatedMonthlyEarnings: 8400,
    joinedDate: 'Sep 2024'
  }
];

export interface PartnerLeaderboardProps {
  onNavigateToRewards?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToShareEarn?: () => void;
}

export const PartnerLeaderboard: React.FC<PartnerLeaderboardProps> = ({
  onNavigateToRewards,
  onNavigateToDashboard,
  onNavigateToShareEarn
}) => {
  const { registeredPartner } = useAuth();
  const [selectedMilestoneFilter, setSelectedMilestoneFilter] = useState<number | 'all'>('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'all-time' | 'month' | 'week'>('month');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'onboardings' | 'earnings' | 'growth'>('onboardings');
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
  const [selectedPartnerForDetail, setSelectedPartnerForDetail] = useState<LeaderboardPartnerItem | null>(null);

  // Helper to get milestone rank config
  const getMilestoneConfig = (level: number) => {
    return MILESTONE_RANKS.find((r) => r.level === level) || MILESTONE_RANKS[MILESTONE_RANKS.length - 1];
  };

  // Helper for rank icon
  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-600 flex items-center justify-center text-white shadow-md font-extrabold text-sm border-2 border-white">
          <Trophy className="w-4 h-4 text-white" />
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 flex items-center justify-center text-slate-800 shadow-md font-extrabold text-sm border-2 border-white">
          <Medal className="w-4 h-4 text-slate-700" />
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 flex items-center justify-center text-white shadow-md font-extrabold text-sm border-2 border-white">
          <Award className="w-4 h-4 text-amber-100" />
        </div>
      );
    }
    return (
      <div className="w-8 h-8 rounded-full bg-[#f0ede9] text-[#594047] font-black text-xs flex items-center justify-center border border-[#e5e2dd]">
        #{rank}
      </div>
    );
  };

  // Filter and sort items
  const filteredAndSortedPartners = useMemo(() => {
    return INITIAL_LEADERBOARD_PARTNERS
      .filter((partner) => {
        // Milestone filter
        if (selectedMilestoneFilter !== 'all' && partner.milestoneLevel !== selectedMilestoneFilter) {
          return false;
        }
        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = partner.name.toLowerCase().includes(q);
          const matchId = partner.id.toLowerCase().includes(q);
          const matchCity = partner.city.toLowerCase().includes(q);
          const matchState = partner.state.toLowerCase().includes(q);
          const matchReward = partner.milestoneReward.toLowerCase().includes(q);
          return matchName || matchId || matchCity || matchState || matchReward;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'onboardings') {
          return b.salonOnboardingCount - a.salonOnboardingCount;
        }
        if (sortBy === 'earnings') {
          return b.estimatedMonthlyEarnings - a.estimatedMonthlyEarnings;
        }
        if (sortBy === 'growth') {
          return b.trendRanks - a.trendRanks;
        }
        return 0;
      });
  }, [selectedMilestoneFilter, searchQuery, sortBy]);

  // Top 3 Podium
  const podiumTop3 = useMemo(() => {
    return INITIAL_LEADERBOARD_PARTNERS.slice(0, 3);
  }, []);

  // Current logged in user standing (mocked or bound to Auth)
  const currentUserStanding = useMemo(() => {
    const partnerId = registeredPartner?.partnerId || 'GP-8821';
    const partnerName = registeredPartner?.name || 'Rohit Verma';
    const matched = INITIAL_LEADERBOARD_PARTNERS.find(
      (p) => p.id === partnerId || p.name.toLowerCase() === partnerName.toLowerCase()
    );
    if (matched) return matched;
    // Default preview partner standing
    return {
      rank: 4,
      id: partnerId,
      name: partnerName,
      initials: 'RV',
      city: 'Nagpur',
      state: 'Maharashtra',
      salonOnboardingCount: 342,
      verifiedCount: 328,
      inProgressCount: 14,
      growthTrend: 'up' as const,
      trendRanks: 3,
      milestoneLevel: 4,
      milestoneTitle: 'Smart EV Scooter Leader',
      milestoneReward: 'Electric Scooter (Ather 450X / Ola)',
      milestoneRewardIcon: 'electric_scooter',
      nextMilestoneNeeded: 158,
      nextMilestoneTitle: 'Level 5: Apple iPhone 16 Pro',
      nextMilestoneReward: 'iPhone 16 Pro (Titanium)',
      progressToNextMilestone: 68,
      estimatedMonthlyEarnings: 102500,
      joinedDate: 'Apr 2024',
      isCurrentUser: true
    };
  }, [registeredPartner]);

  return (
    <div className="w-full bg-[#fcf9f4] min-h-screen text-[#1c1c19] pb-24">
      {/* 1. HERO & METRIC HEADER */}
      <section className="w-full mx-auto px-4 sm:px-8 lg:px-12 pt-6 pb-4">
        <div className="bg-gradient-to-br from-[#ffffff] via-[#fcfaf7] to-[#f9f3ea] p-6 sm:p-8 rounded-3xl border border-[#ebe7e0] shadow-xs relative overflow-hidden">
          {/* Subtle Ambient Background Light */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-amber-400/10 via-rose-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-gradient-to-tr from-[#b1005e]/5 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fae8f0] border border-[#f3c8db] text-[#b1005e] text-xs font-black uppercase tracking-wider">
                <Trophy className="w-3.5 h-3.5" />
                <span>Nexora Growth Partner Network</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#b1005e] animate-ping" />
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1c1c19] tracking-tight">
                Partner Leaderboard
              </h1>
              <p className="text-sm sm:text-base text-[#594047] max-w-2xl leading-relaxed">
                Top-performing growth partners ranked by verified salon onboarding count, active merchant activations, and unlockable milestone tier ranks.
              </p>
            </div>

            {/* Quick Action Bar */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsMilestoneModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-[#e5e2dd] hover:border-[#b1005e]/40 hover:bg-[#fff9fc] text-xs font-extrabold text-[#1c1c19] transition-all shadow-2xs"
              >
                <HelpCircle className="w-4 h-4 text-[#b1005e]" />
                <span>Milestone Ranks Guide</span>
              </button>

              <Link
                to="/partner/rewards"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#b1005e] to-[#701a40] hover:from-[#92004d] hover:to-[#551330] text-white text-xs font-black shadow-[0_4px_16px_rgba(177,0,94,0.25)] transition-all"
              >
                <Gift className="w-4 h-4" />
                <span>View Reward Claims</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-[#f0ede9]">
            <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-[#f0ede9]">
              <span className="text-[11px] font-bold text-[#7d6f72] uppercase tracking-wider">Total Onboardings</span>
              <p className="text-xl sm:text-2xl font-black text-[#1c1c19] mt-0.5">4,380+</p>
              <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +18.4% this month
              </span>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-[#f0ede9]">
              <span className="text-[11px] font-bold text-[#7d6f72] uppercase tracking-wider">Active Partners</span>
              <p className="text-xl sm:text-2xl font-black text-[#1c1c19] mt-0.5">5,240</p>
              <span className="text-[10px] text-[#594047] font-semibold">Across 42 Indian Cities</span>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-[#f0ede9]">
              <span className="text-[11px] font-bold text-[#7d6f72] uppercase tracking-wider">SUV &amp; Bike Unlocks</span>
              <p className="text-xl sm:text-2xl font-black text-[#b1005e] mt-0.5">18 Claims</p>
              <span className="text-[10px] text-amber-700 font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" /> 1 District SUV Awarded
              </span>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-[#f0ede9]">
              <span className="text-[11px] font-bold text-[#7d6f72] uppercase tracking-wider">Top Commission Paid</span>
              <p className="text-xl sm:text-2xl font-black text-emerald-800 mt-0.5">₹3,45,000</p>
              <span className="text-[10px] text-emerald-700 font-bold">Highest Monthly Earner</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PODIUM SPOTLIGHT (TOP 3 CHAMPIONS) */}
      <section className="w-full mx-auto px-4 sm:px-8 lg:px-12 py-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#cca730] text-[22px]">workspace_premium</span>
            <h2 className="text-lg sm:text-xl font-black text-[#1c1c19]">Hall of Champions</h2>
          </div>
          <span className="text-xs font-bold text-[#7d6f72]">Top 3 National Onboarding Leaders</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          {/* #2 PODIUM: SILVER STAR */}
          {podiumTop3[1] && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-5 border-2 border-slate-300 shadow-xs relative flex flex-col justify-between order-2 md:order-1 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-black border border-slate-200">
                  <Medal className="w-3.5 h-3.5 text-slate-500" />
                  <span>2nd Place</span>
                </div>
                {/* Milestone Visual Indicator */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-[11px] font-black">
                  <span className="material-symbols-outlined text-[16px] text-purple-700">{podiumTop3[1].milestoneRewardIcon}</span>
                  <span>Lvl {podiumTop3[1].milestoneLevel}</span>
                </div>
              </div>

              <div className="my-4 text-center">
                <div className="relative inline-block mx-auto mb-2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-200 to-slate-400 flex items-center justify-center text-slate-800 font-black text-xl border-4 border-white shadow-sm">
                    {podiumTop3[1].initials}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-700 text-white flex items-center justify-center text-[10px] font-black border-2 border-white">
                    2
                  </div>
                </div>
                <h3 className="font-extrabold text-base text-[#1c1c19] truncate">{podiumTop3[1].name}</h3>
                <span className="text-xs text-[#7d6f72] font-semibold">{podiumTop3[1].city}, {podiumTop3[1].state}</span>
              </div>

              {/* Onboarding count metric */}
              <div className="bg-[#fcfaf7] p-3.5 rounded-2xl border border-[#f0ede9] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#594047]">Salons Onboarded</span>
                  <span className="font-black text-lg text-[#1c1c19]">{podiumTop3[1].salonOnboardingCount}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#7d6f72]">
                  <span>Verified: {podiumTop3[1].verifiedCount}</span>
                  <span className="text-purple-700 font-extrabold">{podiumTop3[1].milestoneTitle}</span>
                </div>
                {/* Unlocked Reward Badge */}
                <div className="pt-2 border-t border-[#ebe7e0] flex items-center gap-1.5 text-xs text-purple-900 font-bold">
                  <Gift className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span className="truncate">{podiumTop3[1].milestoneReward}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* #1 PODIUM: GOLD CHAMPION */}
          {podiumTop3[0] && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="bg-gradient-to-b from-amber-50/70 via-white to-amber-50/30 rounded-3xl p-6 border-2 border-amber-400 shadow-md relative flex flex-col justify-between order-1 md:order-2 hover:shadow-lg transition-all md:-translate-y-2"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-[11px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                <Trophy className="w-3 h-3 text-white" />
                <span>Grand Champion</span>
              </div>

              <div className="flex items-start justify-between pt-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black border border-amber-300">
                  <Trophy className="w-3.5 h-3.5 text-amber-600" />
                  <span>1st Place</span>
                </div>
                {/* Milestone Visual Indicator */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-rose-600 text-white text-xs font-black shadow-xs">
                  <span className="material-symbols-outlined text-[16px] text-white">{podiumTop3[0].milestoneRewardIcon}</span>
                  <span>Level {podiumTop3[0].milestoneLevel} Legend</span>
                </div>
              </div>

              <div className="my-5 text-center">
                <div className="relative inline-block mx-auto mb-2">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-500 flex items-center justify-center text-white font-black text-2xl border-4 border-white shadow-md">
                    {podiumTop3[0].initials}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 text-white flex items-center justify-center text-xs font-black border-2 border-white shadow-xs">
                    👑
                  </div>
                </div>
                <h3 className="font-black text-lg text-[#1c1c19]">{podiumTop3[0].name}</h3>
                <span className="text-xs text-[#7d6f72] font-bold">{podiumTop3[0].city}, {podiumTop3[0].state}</span>
              </div>

              {/* Onboarding count metric */}
              <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-2xs space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#594047]">Total Salons Onboarded</span>
                  <span className="font-black text-2xl text-amber-900">{podiumTop3[0].salonOnboardingCount}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#7d6f72]">
                  <span>Verified: <strong className="text-emerald-700">{podiumTop3[0].verifiedCount}</strong></span>
                  <span className="text-emerald-700 font-extrabold">₹{podiumTop3[0].estimatedMonthlyEarnings.toLocaleString('en-IN')}/mo</span>
                </div>
                {/* Unlocked Reward Badge */}
                <div className="pt-2 border-t border-amber-100 flex items-center gap-1.5 text-xs text-amber-950 font-black">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="truncate">{podiumTop3[0].milestoneReward}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* #3 PODIUM: BRONZE LEADER */}
          {podiumTop3[2] && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white rounded-3xl p-5 border-2 border-amber-600/50 shadow-xs relative flex flex-col justify-between order-3 md:order-3 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-black border border-amber-200">
                  <Award className="w-3.5 h-3.5 text-amber-700" />
                  <span>3rd Place</span>
                </div>
                {/* Milestone Visual Indicator */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-fuchsia-50 border border-fuchsia-200 text-fuchsia-800 text-[11px] font-black">
                  <span className="material-symbols-outlined text-[16px] text-fuchsia-700">{podiumTop3[2].milestoneRewardIcon}</span>
                  <span>Lvl {podiumTop3[2].milestoneLevel}</span>
                </div>
              </div>

              <div className="my-4 text-center">
                <div className="relative inline-block mx-auto mb-2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-white font-black text-xl border-4 border-white shadow-sm">
                    {podiumTop3[2].initials}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-800 text-white flex items-center justify-center text-[10px] font-black border-2 border-white">
                    3
                  </div>
                </div>
                <h3 className="font-extrabold text-base text-[#1c1c19] truncate">{podiumTop3[2].name}</h3>
                <span className="text-xs text-[#7d6f72] font-semibold">{podiumTop3[2].city}, {podiumTop3[2].state}</span>
              </div>

              {/* Onboarding count metric */}
              <div className="bg-[#fcfaf7] p-3.5 rounded-2xl border border-[#f0ede9] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#594047]">Salons Onboarded</span>
                  <span className="font-black text-lg text-[#1c1c19]">{podiumTop3[2].salonOnboardingCount}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#7d6f72]">
                  <span>Verified: {podiumTop3[2].verifiedCount}</span>
                  <span className="text-fuchsia-700 font-extrabold">{podiumTop3[2].milestoneTitle}</span>
                </div>
                {/* Unlocked Reward Badge */}
                <div className="pt-2 border-t border-[#ebe7e0] flex items-center gap-1.5 text-xs text-fuchsia-900 font-bold">
                  <Gift className="w-3.5 h-3.5 text-fuchsia-600 shrink-0" />
                  <span className="truncate">{podiumTop3[2].milestoneReward}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* 3. YOUR STANDING STICKY CARD (Current User Position) */}
      <section className="w-full mx-auto px-4 sm:px-8 lg:px-12 py-3">
        <div className="bg-gradient-to-r from-[#fae8f0] via-[#fff5f9] to-[#ffffff] border-2 border-[#f3c8db] p-5 rounded-3xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#b1005e] text-white flex items-center justify-center font-black text-lg shadow-sm shrink-0">
              #{currentUserStanding.rank}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base font-black text-[#1c1c19]">
                  {currentUserStanding.name} <span className="text-xs font-normal text-[#7d6f72]">({currentUserStanding.id})</span>
                </h4>
                <span className="px-2 py-0.5 rounded-full bg-[#b1005e] text-white text-[10px] font-black uppercase">
                  You
                </span>
              </div>
              <p className="text-xs text-[#594047]">
                You have onboarded <strong className="text-[#1c1c19]">{currentUserStanding.salonOnboardingCount} salons</strong> ({currentUserStanding.verifiedCount} fully verified).
              </p>
            </div>
          </div>

          {/* Visual Milestone Indicator for Current User */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-[#e5e2dd] shadow-2xs">
              <span className="material-symbols-outlined text-[20px] text-emerald-600">{currentUserStanding.milestoneRewardIcon}</span>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-bold text-[#7d6f72] uppercase">Milestone Rank</span>
                <span className="text-xs font-black text-emerald-800">
                  Level {currentUserStanding.milestoneLevel}: {currentUserStanding.milestoneReward}
                </span>
              </div>
            </div>

            {/* Progress to Next Milestone */}
            <div className="min-w-[200px] flex flex-col justify-center">
              <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                <span className="text-[#594047]">Next: {currentUserStanding.nextMilestoneReward}</span>
                <span className="text-[#b1005e]">{currentUserStanding.nextMilestoneNeeded} more</span>
              </div>
              <div className="w-full bg-[#ebe7e0] rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#b1005e] to-emerald-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${currentUserStanding.progressToNextMilestone}%` }}
                />
              </div>
            </div>

            <Link
              to="/partner/rewards"
              className="px-4 py-2 rounded-xl bg-[#b1005e] text-white text-xs font-extrabold hover:bg-[#8e004b] transition-all shrink-0 text-center"
            >
              Claim Rewards
            </Link>
          </div>
        </div>
      </section>

      {/* 4. VISUAL MILESTONE RANKS LEGEND & QUICK FILTER BAR */}
      <section className="w-full mx-auto px-4 sm:px-8 lg:px-12 py-3">
        <div className="bg-white p-4 rounded-3xl border border-[#ebe7e0] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#b1005e]" />
              <span className="text-xs font-black text-[#1c1c19] uppercase tracking-wider">
                Filter by Milestone Rank
              </span>
            </div>
            <span className="text-[11px] text-[#7d6f72]">Click a level to filter leaderboard</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
            {/* All Tiers Button */}
            <button
              onClick={() => setSelectedMilestoneFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                selectedMilestoneFilter === 'all'
                  ? 'bg-[#1c1c19] text-white shadow-xs'
                  : 'bg-[#f6f3ee] text-[#594047] hover:bg-[#ece8e2]'
              }`}
            >
              <span>All Partners</span>
              <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]">
                {INITIAL_LEADERBOARD_PARTNERS.length}
              </span>
            </button>

            {/* Individual Milestone Ranks */}
            {MILESTONE_RANKS.map((rank) => {
              const countAtRank = INITIAL_LEADERBOARD_PARTNERS.filter((p) => p.milestoneLevel === rank.level).length;
              const isSelected = selectedMilestoneFilter === rank.level;

              return (
                <button
                  key={rank.level}
                  onClick={() => setSelectedMilestoneFilter(isSelected ? 'all' : rank.level)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 border ${
                    isSelected
                      ? `${rank.pillColor} border-transparent scale-105`
                      : 'bg-[#faf8f5] border-[#e5e2dd] text-[#594047] hover:border-[#b1005e]/30'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">{rank.rewardIcon}</span>
                  <span>Lvl {rank.level}: {rank.minSalons}+ Shops</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                      isSelected ? 'bg-white/25 text-white' : 'bg-[#e5e2dd] text-[#1c1c19]'
                    }`}
                  >
                    {countAtRank}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. SEARCH, SORT, & TIMEFRAME CONTROLLER BAR */}
      <section className="w-full mx-auto px-4 sm:px-8 lg:px-12 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-[#ebe7e0] shadow-xs">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#7d6f72] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by partner name, partner ID, city (e.g. Nagpur, Mumbai, GP-8821)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#faf8f5] border border-[#e5e2dd] focus:border-[#b1005e] focus:bg-white text-xs font-semibold text-[#1c1c19] placeholder:text-[#998b8e] outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#7d6f72] hover:text-[#1c1c19]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Controls: Timeframe & Sorting */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Timeframe selector */}
            <div className="flex items-center bg-[#f6f3ee] p-1 rounded-xl border border-[#e5e2dd]">
              <button
                onClick={() => setSelectedTimeframe('month')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedTimeframe === 'month' ? 'bg-white text-[#1c1c19] shadow-2xs' : 'text-[#7d6f72]'
                }`}
              >
                This Month
              </button>
              <button
                onClick={() => setSelectedTimeframe('week')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedTimeframe === 'week' ? 'bg-white text-[#1c1c19] shadow-2xs' : 'text-[#7d6f72]'
                }`}
              >
                This Week
              </button>
              <button
                onClick={() => setSelectedTimeframe('all-time')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedTimeframe === 'all-time' ? 'bg-white text-[#1c1c19] shadow-2xs' : 'text-[#7d6f72]'
                }`}
              >
                All Time
              </button>
            </div>

            {/* Sort selector */}
            <div className="flex items-center gap-1.5 pl-2 border-l border-[#e5e2dd]">
              <span className="text-[11px] font-bold text-[#7d6f72]">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#f6f3ee] border border-[#e5e2dd] text-xs font-bold text-[#1c1c19] rounded-xl px-2.5 py-1.5 outline-none cursor-pointer"
              >
                <option value="onboardings">Salon Count (High to Low)</option>
                <option value="earnings">Monthly Earnings</option>
                <option value="growth">Fastest Rising (+Ranks)</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MAIN LEADERBOARD DATA TABLE / CARDS */}
      <section className="w-full mx-auto px-4 sm:px-8 lg:px-12 py-3">
        {filteredAndSortedPartners.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#ebe7e0] shadow-xs space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#f8f5f0] flex items-center justify-center text-[#7d6f72] mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-[#1c1c19]">No partners found</h3>
            <p className="text-xs text-[#7d6f72] max-w-sm mx-auto">
              No growth partners matched your query &ldquo;{searchQuery}&rdquo;. Try clearing filters or searching another city or ID.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedMilestoneFilter('all');
              }}
              className="px-4 py-2 rounded-xl bg-[#b1005e] text-white text-xs font-bold hover:bg-[#8e004b] transition-all"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-[#ebe7e0] shadow-xs overflow-hidden">
            {/* Desktop Table Header */}
            <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3.5 bg-[#faf8f5] border-b border-[#ebe7e0] text-[11px] font-black uppercase tracking-wider text-[#7d6f72]">
              <div className="col-span-1">Rank</div>
              <div className="col-span-3">Partner Profile</div>
              <div className="col-span-2 text-center">Salon Onboardings</div>
              <div className="col-span-3">Milestone Rank &amp; Reward</div>
              <div className="col-span-2 text-right">Est. Monthly Payout</div>
              <div className="col-span-1 text-center">Action</div>
            </div>

            {/* List Rows */}
            <div className="divide-y divide-[#f0ede9]">
              {filteredAndSortedPartners.map((partner) => {
                const milestoneConfig = getMilestoneConfig(partner.milestoneLevel);
                const isCurrentUser = partner.id === currentUserStanding.id;

                return (
                  <div
                    key={partner.id}
                    onClick={() => setSelectedPartnerForDetail(partner)}
                    className={`p-4 sm:p-5 lg:px-6 lg:py-4 transition-all cursor-pointer hover:bg-[#fcfaf7] ${
                      isCurrentUser ? 'bg-[#fff5f9]/70 border-l-4 border-l-[#b1005e]' : ''
                    }`}
                  >
                    {/* Responsive Grid for Desktop */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                      {/* 1. Rank + Trend */}
                      <div className="flex items-center justify-between lg:justify-start gap-3 col-span-1">
                        <div className="flex items-center gap-2">
                          {getRankBadge(partner.rank)}
                          {/* Growth Trend */}
                          <div className="text-[10px] font-bold flex items-center">
                            {partner.growthTrend === 'up' && (
                              <span className="text-emerald-700 flex items-center">
                                <TrendingUp className="w-3 h-3" />+{partner.trendRanks}
                              </span>
                            )}
                            {partner.growthTrend === 'down' && (
                              <span className="text-rose-700 flex items-center">
                                <TrendingDown className="w-3 h-3" />-{partner.trendRanks}
                              </span>
                            )}
                            {partner.growthTrend === 'neutral' && (
                              <span className="text-slate-400 flex items-center">
                                <Minus className="w-3 h-3" />
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Mobile view top indicators */}
                        <div className="lg:hidden flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${milestoneConfig.pillColor}`}>
                            Lvl {partner.milestoneLevel}
                          </span>
                        </div>
                      </div>

                      {/* 2. Partner Profile */}
                      <div className="col-span-3 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#f0ede9] text-[#594047] font-black text-sm flex items-center justify-center shrink-0 border border-[#e5e2dd]">
                          {partner.initials}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-sm text-[#1c1c19] truncate">{partner.name}</span>
                            {isCurrentUser && (
                              <span className="px-1.5 py-0.2 rounded-md bg-[#b1005e] text-white text-[9px] font-black uppercase">
                                You
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-[#7d6f72]">
                            <span className="font-mono font-bold text-[#8e4767]">{partner.id}</span>
                            <span>•</span>
                            <span className="truncate">{partner.city}, {partner.state}</span>
                          </div>
                        </div>
                      </div>

                      {/* 3. Salon Onboarding Count (Primary Metric) */}
                      <div className="col-span-2 text-left lg:text-center">
                        <div className="flex lg:flex-col items-baseline lg:items-center justify-between lg:justify-center gap-1">
                          <span className="lg:hidden text-xs font-bold text-[#7d6f72]">Salons Onboarded:</span>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-base sm:text-lg font-black text-[#1c1c19]">
                              {partner.salonOnboardingCount}
                            </span>
                            <span className="text-[11px] font-extrabold text-[#7d6f72]">salons</span>
                          </div>
                        </div>
                        <div className="text-[10px] text-emerald-700 font-bold">
                          {partner.verifiedCount} fully verified
                        </div>
                      </div>

                      {/* 4. Visual Indicator for Milestone Rank */}
                      <div className="col-span-3 space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-black bg-white shadow-2xs border-[#e5e2dd]">
                            <span className="material-symbols-outlined text-[16px] text-amber-600">
                              {partner.milestoneRewardIcon}
                            </span>
                            <span className="text-[#1c1c19]">Level {partner.milestoneLevel}:</span>
                            <span className="text-[#b1005e]">{partner.milestoneTitle}</span>
                          </div>
                        </div>

                        {/* Visual Progress toward next milestone */}
                        {partner.nextMilestoneNeeded > 0 ? (
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-[10px] text-[#7d6f72] font-semibold">
                              <span>Reward: <strong className="text-[#1c1c19]">{partner.milestoneReward}</strong></span>
                              <span className="text-[#b1005e] font-bold">{partner.nextMilestoneNeeded} shops to next</span>
                            </div>
                            <div className="w-full bg-[#f0ede9] rounded-full h-1.5 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-amber-500 to-[#b1005e] h-1.5 rounded-full"
                                style={{ width: `${partner.progressToNextMilestone}%` }}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="text-[10px] text-amber-700 font-black flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            <span>Top Milestone Crown Achieved!</span>
                          </div>
                        )}
                      </div>

                      {/* 5. Monthly Earnings */}
                      <div className="col-span-2 text-left lg:text-right">
                        <div className="flex lg:flex-col items-baseline lg:items-end justify-between lg:justify-center">
                          <span className="lg:hidden text-xs font-bold text-[#7d6f72]">Est. Earnings:</span>
                          <span className="text-sm sm:text-base font-black text-emerald-800">
                            ₹{partner.estimatedMonthlyEarnings.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#7d6f72] font-semibold">recurring + bonuses</span>
                      </div>

                      {/* 6. Action Button */}
                      <div className="col-span-1 flex items-center justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPartnerForDetail(partner);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-[#faf8f5] hover:bg-[#fae8f0] border border-[#e5e2dd] hover:border-[#b1005e]/30 text-xs font-bold text-[#b1005e] flex items-center gap-1 transition-all"
                        >
                          <span>Profile</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* 7. MOTIVATIONAL FOOTER BANNER: How to Rank Up */}
      <section className="w-full mx-auto px-4 sm:px-8 lg:px-12 py-6">
        <div className="bg-gradient-to-r from-[#701a40] via-[#92004d] to-[#b1005e] rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider backdrop-blur-xs">
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>Rank Acceleration Tip</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Want to climb the leaderboard and unlock the next milestone?
            </h3>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              Every salon onboarding with 15 active billing days advances your milestone rank and gets you closer to the Smart EV Scooter, Apple iPhone 16 Pro, Royal Enfield 350, and District Partner SUV!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/partner/share-earn"
              className="px-5 py-3 rounded-2xl bg-white text-[#701a40] text-xs font-black hover:bg-[#fff0f5] shadow-md transition-all flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Referral Link</span>
            </Link>

            <button
              onClick={() => setIsMilestoneModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-black border border-white/30 backdrop-blur-xs transition-all"
            >
              View Milestone Ladder
            </button>
          </div>
        </div>
      </section>

      {/* 8. MODAL: MILESTONE RANKS GUIDE */}
      <AnimatePresence>
        {isMilestoneModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-[#e5e2dd] space-y-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fae8f0] text-[#b1005e] text-xs font-black uppercase">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Rank &amp; Milestone Hierarchy</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#1c1c19] mt-2">
                    Nexora Milestone Ranks Guide
                  </h3>
                  <p className="text-xs text-[#594047] mt-1">
                    Complete salon onboardings to permanently unlock certified rank badges and physical milestone rewards.
                  </p>
                </div>

                <button
                  onClick={() => setIsMilestoneModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#f0ede9] text-[#1c1c19] flex items-center justify-center font-bold text-xs hover:bg-[#e5e2dd]"
                >
                  ✕
                </button>
              </div>

              {/* Ranks list */}
              <div className="space-y-3">
                {MILESTONE_RANKS.map((rank) => (
                  <div
                    key={rank.level}
                    className={`p-4 rounded-2xl border ${rank.borderColor} bg-[#faf8f5] flex items-start justify-between gap-4`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-2xl ${rank.pillColor} flex items-center justify-center text-white shrink-0`}>
                        <span className="material-symbols-outlined text-[20px]">{rank.rewardIcon}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-[#1c1c19]">{rank.name}</span>
                          <span className="px-2 py-0.2 rounded-full text-[10px] font-extrabold bg-white border border-[#e5e2dd]">
                            {rank.minSalons}+ Salons
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-[#b1005e] mt-0.5">{rank.reward}</p>
                        <span className="text-[11px] text-[#7d6f72]">Official physical reward handover upon reaching target.</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-black text-emerald-800">100% Guaranteed</span>
                      <p className="text-[10px] text-[#7d6f72]">Zero deduction</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#f0ede9] flex items-center justify-between">
                <span className="text-xs text-[#7d6f72]">Qualification: 15 consecutive active billing days per salon.</span>
                <button
                  onClick={() => setIsMilestoneModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#b1005e] text-white text-xs font-black hover:bg-[#8e004b] transition-all"
                >
                  Got It, Thanks!
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 9. PARTNER DETAIL MODAL */}
      <AnimatePresence>
        {selectedPartnerForDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#e5e2dd] space-y-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-[#fae8f0] text-[#b1005e] font-black text-xl flex items-center justify-center border-2 border-[#f3c8db]">
                    {selectedPartnerForDetail.initials}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#1c1c19]">{selectedPartnerForDetail.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-[#7d6f72]">
                      <span className="font-mono font-bold text-[#b1005e]">{selectedPartnerForDetail.id}</span>
                      <span>•</span>
                      <span>{selectedPartnerForDetail.city}, {selectedPartnerForDetail.state}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPartnerForDetail(null)}
                  className="w-8 h-8 rounded-full bg-[#f0ede9] text-[#1c1c19] flex items-center justify-center font-bold text-xs hover:bg-[#e5e2dd]"
                >
                  ✕
                </button>
              </div>

              {/* Stats Card */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#faf8f5] p-3.5 rounded-2xl border border-[#ebe7e0]">
                  <span className="text-[11px] font-bold text-[#7d6f72] uppercase">Salons Onboarded</span>
                  <p className="text-xl font-black text-[#1c1c19] mt-0.5">{selectedPartnerForDetail.salonOnboardingCount}</p>
                  <span className="text-[10px] text-emerald-700 font-bold">{selectedPartnerForDetail.verifiedCount} Verified</span>
                </div>

                <div className="bg-[#faf8f5] p-3.5 rounded-2xl border border-[#ebe7e0]">
                  <span className="text-[11px] font-bold text-[#7d6f72] uppercase">National Rank</span>
                  <p className="text-xl font-black text-[#b1005e] mt-0.5">#{selectedPartnerForDetail.rank}</p>
                  <span className="text-[10px] text-[#7d6f72] font-semibold">Active Leader</span>
                </div>
              </div>

              {/* Milestone Rank Indicator */}
              <div className="p-4 rounded-2xl border border-amber-300 bg-amber-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-900 uppercase tracking-wide">
                    Milestone Rank Indicator
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-600 text-white text-[10px] font-black">
                    Level {selectedPartnerForDetail.milestoneLevel}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-700 text-[24px]">
                    {selectedPartnerForDetail.milestoneRewardIcon}
                  </span>
                  <div>
                    <h4 className="text-sm font-black text-[#1c1c19]">{selectedPartnerForDetail.milestoneTitle}</h4>
                    <p className="text-xs text-amber-900 font-bold">{selectedPartnerForDetail.milestoneReward}</p>
                  </div>
                </div>
              </div>

              {/* Progress to next */}
              {selectedPartnerForDetail.nextMilestoneNeeded > 0 && (
                <div className="space-y-1.5 bg-[#faf8f5] p-3.5 rounded-2xl border border-[#ebe7e0]">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#594047] font-bold">Progress to {selectedPartnerForDetail.nextMilestoneTitle}</span>
                    <span className="text-[#b1005e] font-black">{selectedPartnerForDetail.progressToNextMilestone}%</span>
                  </div>
                  <div className="w-full bg-[#e5e2dd] rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-[#b1005e] h-2 rounded-full"
                      style={{ width: `${selectedPartnerForDetail.progressToNextMilestone}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-[#7d6f72]">
                    Requires <strong>{selectedPartnerForDetail.nextMilestoneNeeded} more verified salons</strong> to unlock {selectedPartnerForDetail.nextMilestoneReward}.
                  </span>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setSelectedPartnerForDetail(null)}
                  className="px-5 py-2.5 rounded-xl bg-[#1c1c19] text-white text-xs font-bold hover:bg-[#333330] transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PartnerLeaderboard;
