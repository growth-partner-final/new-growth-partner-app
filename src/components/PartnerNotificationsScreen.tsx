import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bell,
  BellOff,
  Check,
  CheckCircle2,
  ChevronRight,
  Download,
  FileText,
  Info,
  Lock,
  Mail,
  MessageSquare,
  Milestone,
  RefreshCw,
  Save,
  Search,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Store,
  TrendingUp,
  User,
  Wallet,
  WifiOff
} from 'lucide-react';

interface PartnerNotificationsScreenProps {
  onNavigateToHub?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToReferralTimeline?: () => void;
  onNavigateToSalonIntelligence?: () => void;
  onNavigateToShareEarn?: () => void;
  onNavigateToAddSalon?: () => void;
  onNavigateToMerchantRegister?: () => void;
  onNavigateToLockedOnboarding?: () => void;
  onNavigateToStepAuditWorkspace?: () => void;
  onNavigateToMobileFastTrack?: () => void;
  onNavigateToWebsiteTemplates?: () => void;
  onNavigateToProfileSettings?: () => void;
  onNavigateToSecureHandoff?: () => void;
  onNavigateToHandoffHub?: () => void;
  onNavigateToEarningsLedger?: () => void;
  onNavigateToExtraOnboardingReward?: () => void;
  onNavigateToRewardsMilestones?: () => void;
  onNavigateToMilestoneUnlock?: () => void;
  onNavigateToMobileRewards?: () => void;
}

interface NotificationItem {
  id: string;
  category: 'earnings' | 'verification' | 'referrals' | 'rewards' | 'withdrawals' | 'system';
  priority: 'high' | 'medium' | 'normal';
  unread: boolean;
  timeLabel: string;
  timestamp: string;
  title: string;
  summary: string;
  body: string;
  tag: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  hasFinanceTable?: boolean;
  gross?: string;
  tds?: string;
  net?: string;
  refCode: string;
  utrCode: string;
  destination: string;
  group: 'today' | 'yesterday' | 'earlier';
  primaryBtnLabel: string;
  secondaryBtnLabel: string;
}

export const PartnerNotificationsScreen: React.FC<PartnerNotificationsScreenProps> = ({
  onNavigateToHub,
  onNavigateToDashboard,
  onNavigateToReferralTimeline,
  onNavigateToSalonIntelligence,
  onNavigateToShareEarn,
  onNavigateToAddSalon,
  onNavigateToMerchantRegister,
  onNavigateToLockedOnboarding,
  onNavigateToStepAuditWorkspace,
  onNavigateToMobileFastTrack,
  onNavigateToWebsiteTemplates,
  onNavigateToProfileSettings,
  onNavigateToSecureHandoff,
  onNavigateToHandoffHub,
  onNavigateToEarningsLedger,
  onNavigateToExtraOnboardingReward,
  onNavigateToRewardsMilestones,
  onNavigateToMilestoneUnlock,
  onNavigateToMobileRewards,
}) => {
  // Sandbox views: 'active' | 'skeleton' | 'empty' | 'nounread' | 'filteredempty' | 'modal' | 'networkerror'
  const [sandboxState, setSandboxState] = useState<'active' | 'skeleton' | 'empty' | 'nounread' | 'filteredempty' | 'modal' | 'networkerror'>('active');

  // Interactive filters
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [unreadOnly, setUnreadOnly] = useState<boolean>(false);
  const [priorityHighOnly, setPriorityHighOnly] = useState<boolean>(false);

  // Search input
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Preference channels state
  const [deliveryChannels, setDeliveryChannels] = useState({
    inApp: true,
    email: true,
    sms: true,
    whatsapp: true,
  });

  const [subscriptions, setSubscriptions] = useState({
    referrals: true,
    streaks: true,
    earnings: true,
    milestones: true,
  });

  // Saving preferences status toast
  const [savingPrefs, setSavingPrefs] = useState<boolean>(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState<boolean>(false);

  // Live notification data state
  const initialNotifications: NotificationItem[] = [
    {
      id: 'notif-1',
      category: 'earnings',
      priority: 'high',
      unread: true,
      timeLabel: '10 mins ago • 14:32 IST',
      timestamp: 'Today, 18 Feb 2025 • 14:32 IST',
      title: 'Payout Dispatched — ₹4,750 Net Credited',
      summary: 'Settlement cycle WDR-2025-0891 has been cleared via nodal bank NEFT to HDFC Bank (••••1234). UTR: CMS8839201948.',
      body: 'Your requested withdrawal of **₹5,000 (Gross)** with 5% statutory TDS deduction of **-₹250** (under Sec 194H) has been successfully cleared and transmitted to your verified primary HDFC Bank Account (••••1234).',
      tag: 'Live Settlement',
      icon: <Wallet className="w-5 h-5" />,
      iconBg: 'bg-emerald-50 text-emerald-700',
      iconColor: 'text-emerald-700',
      hasFinanceTable: true,
      gross: '₹5,000.00',
      tds: '- ₹250.00',
      net: '₹4,750.00',
      refCode: 'WDR-2025-0891',
      utrCode: 'CMS8839201948',
      destination: 'HDFC Bank Limited (A/C •••• 1234)',
      group: 'today',
      primaryBtnLabel: 'View in Withdrawals Ledger',
      secondaryBtnLabel: 'Download Payout Advice (PDF)'
    },
    {
      id: 'notif-2',
      category: 'verification',
      priority: 'medium',
      unread: true,
      timeLabel: '2 hours ago • 12:15 IST',
      timestamp: 'Today, 18 Feb 2025 • 12:15 IST',
      title: 'Enchante Luxe Hair Studio — Day 15 Streak Verified!',
      summary: '15 consecutive qualifying days (₹1,000+/day) achieved. One-time ₹500 partner activation reward unlocked and credited to wallet.',
      body: 'Enchante Luxe Hair Studio has successfully generated ₹1,000+ daily volume for 15 unbroken consecutive days. This verifies their active Soundbox terminal and auto-releases your one-time activation reward.',
      tag: 'Bonus Unlocked',
      icon: <CheckCircle2 className="w-5 h-5" />,
      iconBg: 'bg-cyan-50 text-cyan-700',
      iconColor: 'text-cyan-700',
      hasFinanceTable: false,
      net: '₹500.00 (Wallet Credit)',
      refCode: 'STRK-15-ENCH88',
      utrCode: 'INT-NX-CREDIT-991',
      destination: 'Growth Partner Internal Wallet',
      group: 'today',
      primaryBtnLabel: 'View Enchante Luxe Profile',
      secondaryBtnLabel: 'Inspect Transaction Log'
    },
    {
      id: 'notif-3',
      category: 'referrals',
      priority: 'normal',
      unread: true,
      timeLabel: '4 hours ago • 10:45 IST',
      timestamp: 'Today, 18 Feb 2025 • 10:45 IST',
      title: 'New Salon Onboarded via Your Code',
      summary: 'Vogue Aura Unisex Salon (Indiranagar, BLR) activated their dynamic Nexora Soundbox. 15-day qualification tracking initiated.',
      body: 'Vogue Aura Unisex Salon (Indiranagar, BLR) entered your referral code during merchant terminal registration. Day 1 of the 15-day qualification tracking cycle has officially commenced.',
      tag: '15-Day Countdown',
      icon: <Store className="w-5 h-5" />,
      iconBg: 'bg-indigo-50 text-indigo-700',
      iconColor: 'text-indigo-700',
      hasFinanceTable: false,
      net: '₹500.00 (Pending)',
      refCode: 'ONB-VOGUE-2025',
      utrCode: 'ST-INIT-7740',
      destination: 'Indiranagar 100ft Rd, BLR',
      group: 'today',
      primaryBtnLabel: 'Review Onboarding Progress',
      secondaryBtnLabel: 'Download Merchant QR Kit'
    },
    {
      id: 'notif-4',
      category: 'rewards',
      priority: 'high',
      unread: true,
      timeLabel: 'Yesterday • 18:30 IST',
      timestamp: 'Yesterday, 17 Feb 2025 • 18:30 IST',
      title: 'Milestone Claim Ready: Official Nexora Tech Soundbox',
      summary: 'You surpassed 25 verified merchants! Your milestone reward claim protocol is now unlocked for hardware dispatch to your address.',
      body: 'Congratulations Julian! Crossing the 25 verified active salons benchmark entitles you to the flagship Nexora Gold Partner physical Soundbox unit and personalized marketing collateral standee pack.',
      tag: 'Hardware Dispatch',
      icon: <Sparkles className="w-5 h-5" />,
      iconBg: 'bg-amber-50 text-amber-800',
      iconColor: 'text-amber-800',
      hasFinanceTable: false,
      gross: 'Asset Value: ₹2,499',
      net: 'Free Partner Reward',
      refCode: 'REW-MLST-25-HW',
      utrCode: 'BLUE-DART-AWB-PENDING',
      destination: 'Registered Partner Office Address',
      group: 'yesterday',
      primaryBtnLabel: 'Confirm Dispatch Address',
      secondaryBtnLabel: 'View Milestone Leaderboard'
    },
    {
      id: 'notif-5',
      category: 'withdrawals',
      priority: 'normal',
      unread: false,
      timeLabel: 'Yesterday • 11:20 IST',
      timestamp: 'Yesterday, 17 Feb 2025 • 11:20 IST',
      title: 'Withdrawal Request Under Review — ₹3,500',
      summary: 'Request WDR-2025-0874 is undergoing routine 24h compliance check before nodal bank dispatch to ICICI Bank.',
      body: 'Request WDR-2025-0874 is currently under automated compliance review. Funds will be cleared to your bank within standard banking cut-off timelines.',
      tag: 'Processing',
      icon: <Wallet className="w-5 h-5" />,
      iconBg: 'bg-blue-50 text-blue-700',
      iconColor: 'text-blue-700',
      hasFinanceTable: true,
      gross: '₹3,500.00',
      tds: '- ₹175.00',
      net: '₹3,325.00',
      refCode: 'WDR-2025-0874',
      utrCode: 'Awaiting Settlement Run',
      destination: 'ICICI Bank Limited (•••• 8820)',
      group: 'yesterday',
      primaryBtnLabel: 'Track Withdrawal Queue',
      secondaryBtnLabel: 'Cancel Withdrawal Request'
    },
    {
      id: 'notif-6',
      category: 'system',
      priority: 'high',
      unread: false,
      timeLabel: '14 Feb 2025 • 09:12 IST',
      timestamp: '14 Feb 2025 • 09:12 IST',
      title: 'Security Alert: Login from New Device Recognized',
      summary: 'Successful sign-in from Chrome on macOS (IP 103.21.***.***, Mumbai). If this was not you, lock partner credentials instantly.',
      body: 'Successful login session generated from macOS (Chrome 122.0) from IP 103.21.***.*** (Mumbai, Maharashtra). Two-factor SMS authentication was successfully satisfied.',
      tag: 'Security Audit',
      icon: <ShieldAlert className="w-5 h-5" />,
      iconBg: 'bg-purple-50 text-purple-700',
      iconColor: 'text-purple-700',
      hasFinanceTable: false,
      refCode: 'SEC-SES-991204',
      utrCode: 'AUTH-OK-2FA-PASS',
      destination: 'Chrome Browser / macOS',
      group: 'earlier',
      primaryBtnLabel: 'Terminate All Other Sessions',
      secondaryBtnLabel: 'Update Partner Security PIN'
    },
    {
      id: 'notif-7',
      category: 'referrals',
      priority: 'medium',
      unread: false,
      timeLabel: '12 Feb 2025 • 16:40 IST',
      timestamp: '12 Feb 2025 • 16:40 IST',
      title: 'Qualification Streak Warning — 2 Days Inactive',
      summary: 'Crown & Blade Barbershop has missed QR volume for 2 days. Nudge salon owner via WhatsApp to maintain the 15-day streak.',
      body: 'Crown & Blade Barbershop has missed the minimum daily collection benchmark of ₹1,000 for 2 consecutive calendar days. Current verified streak sits at 8/15 days.',
      tag: 'Streak at Risk',
      icon: <ShieldAlert className="w-5 h-5" />,
      iconBg: 'bg-amber-50 text-amber-700',
      iconColor: 'text-amber-700',
      hasFinanceTable: false,
      net: 'Bonus At Risk: ₹500',
      refCode: 'STRK-CRWN-WARN',
      utrCode: 'NON-TX-LOG',
      destination: 'Crown & Blade (Jayanagar)',
      group: 'earlier',
      primaryBtnLabel: 'Nudge Merchant on WhatsApp',
      secondaryBtnLabel: 'Call Salon Owner'
    }
  ];

  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [selectedNotifId, setSelectedNotifId] = useState<string>('notif-1');

  // Find currently selected notification
  const selectedNotif = useMemo(() => {
    return notifications.find(n => n.id === selectedNotifId) || notifications[0];
  }, [selectedNotifId, notifications]);

  // Handle read / unread toggle for a specific card
  const toggleReadStatus = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, unread: !n.unread } : n))
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  // Mark currently selected as read
  const markSelectedAsRead = () => {
    if (selectedNotif) {
      setNotifications(prev =>
        prev.map(n => (n.id === selectedNotif.id ? { ...n, unread: false } : n))
      );
    }
  };

  // Calculate filtered output
  const filteredNotifications = useMemo(() => {
    if (sandboxState === 'empty') return [];
    if (sandboxState === 'filteredempty') return [];
    if (sandboxState === 'networkerror') return [];
    if (sandboxState === 'skeleton') return [];

    let result = notifications;

    // Apply sandbox modifiers
    if (sandboxState === 'nounread') {
      result = result.map(n => ({ ...n, unread: false }));
    }

    // Unread Only filter
    if (unreadOnly) {
      result = result.filter(n => n.unread);
    }

    // High Priority filter
    if (priorityHighOnly) {
      result = result.filter(n => n.priority === 'high');
    }

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter(n => n.category === activeCategory);
    }

    // Search query filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(n =>
        n.title.toLowerCase().includes(query) ||
        n.summary.toLowerCase().includes(query) ||
        n.body.toLowerCase().includes(query) ||
        n.refCode.toLowerCase().includes(query)
      );
    }

    return result;
  }, [notifications, activeCategory, unreadOnly, priorityHighOnly, searchQuery, sandboxState]);

  // Category counts based on overall state
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: notifications.length,
      referrals: 0,
      verification: 0,
      earnings: 0,
      rewards: 0,
      withdrawals: 0,
      system: 0,
    };
    notifications.forEach(n => {
      counts[n.category] = (counts[n.category] || 0) + 1;
    });
    return counts;
  }, [notifications]);

  // Unread Count
  const totalUnreadCount = useMemo(() => {
    if (sandboxState === 'nounread') return 0;
    return notifications.filter(n => n.unread).length;
  }, [notifications, sandboxState]);

  // Save Preferences action
  const handleSavePreferences = () => {
    setSavingPrefs(true);
    setTimeout(() => {
      setSavingPrefs(false);
      setShowSaveSuccess(true);
      setTimeout(() => setShowSaveSuccess(false), 4000);
    }, 1200);
  };

  // Quick reset helper
  const resetSimulation = () => {
    setSandboxState('active');
    setNotifications(initialNotifications);
    setActiveCategory('all');
    setUnreadOnly(false);
    setPriorityHighOnly(false);
    setSearchQuery('');
  };

  // Smooth scroll to preferences section
  const scrollToPreferences = () => {
    const element = document.getElementById('preferences-section-view');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf9f4] text-[#1c1c19] font-sans antialiased pb-24 relative selection:bg-[#ffd9e2] selection:text-[#8e004a]">
      {/* HEADER SECTION */}
      <header className="sticky top-0 w-full z-40 bg-[#ffffff]/90 backdrop-blur-md border-b border-[#e5e2dd] shadow-sm">
        {/* State Simulator Panel */}
        <div className="w-full bg-[#ebe8e3]/90 px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-[#e5e2dd]">
          <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#594047] shrink-0 flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3 text-[#b1005e]" /> Simulator:
          </span>
          <button
            onClick={() => { setSandboxState('active'); }}
            className={`px-3 py-1 rounded-full text-[11px] font-bold shrink-0 transition-all cursor-pointer ${
              sandboxState === 'active' ? 'bg-[#b1005e] text-white shadow-xs' : 'bg-white text-[#594047] border border-[#e5e2dd]'
            }`}
          >
            Preview Mode (Active)
          </button>
          <button
            onClick={() => { setSandboxState('skeleton'); }}
            className={`px-3 py-1 rounded-full text-[11px] font-bold shrink-0 transition-all cursor-pointer ${
              sandboxState === 'skeleton' ? 'bg-[#b1005e] text-white shadow-xs' : 'bg-white text-[#594047] border border-[#e5e2dd]'
            }`}
          >
            Loading Skeleton
          </button>
          <button
            onClick={() => { setSandboxState('empty'); }}
            className={`px-3 py-1 rounded-full text-[11px] font-bold shrink-0 transition-all cursor-pointer ${
              sandboxState === 'empty' ? 'bg-[#b1005e] text-white shadow-xs' : 'bg-white text-[#594047] border border-[#e5e2dd]'
            }`}
          >
            No Notifications (Zero State)
          </button>
          <button
            onClick={() => { setSandboxState('nounread'); }}
            className={`px-3 py-1 rounded-full text-[11px] font-bold shrink-0 transition-all cursor-pointer ${
              sandboxState === 'nounread' ? 'bg-[#b1005e] text-white shadow-xs' : 'bg-white text-[#594047] border border-[#e5e2dd]'
            }`}
          >
            No Unread
          </button>
          <button
            onClick={() => { setSandboxState('filteredempty'); }}
            className={`px-3 py-1 rounded-full text-[11px] font-bold shrink-0 transition-all cursor-pointer ${
              sandboxState === 'filteredempty' ? 'bg-[#b1005e] text-white shadow-xs' : 'bg-white text-[#594047] border border-[#e5e2dd]'
            }`}
          >
            Filtered Empty
          </button>
          <button
            onClick={() => { setSandboxState('modal'); scrollToPreferences(); }}
            className={`px-3 py-1 rounded-full text-[11px] font-bold shrink-0 transition-all cursor-pointer ${
              sandboxState === 'modal' ? 'bg-[#b1005e] text-white shadow-xs' : 'bg-white text-[#594047] border border-[#e5e2dd]'
            }`}
          >
            Preferences View
          </button>
          <button
            onClick={() => { setSandboxState('networkerror'); }}
            className={`px-3 py-1 rounded-full text-[11px] font-bold shrink-0 transition-all cursor-pointer ${
              sandboxState === 'networkerror' ? 'bg-[#ba1a1a] text-white shadow-xs' : 'bg-white text-[#ba1a1a] border border-[#ffdad6]'
            }`}
          >
            Network Error
          </button>
        </div>

        {/* Real Brand Header bar */}
        <div className="h-16 px-6 flex items-center justify-between max-w-7xl mx-auto w-full">
          <button
            onClick={() => onNavigateToHub && onNavigateToHub()}
            className="flex items-center gap-2 text-left cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#b1005e] flex items-center justify-center text-white font-extrabold text-base shadow-md group-hover:bg-[#d91b77] transition-all">
              NX
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wider text-[#8e4767] font-black">Nexora Partner</span>
              <span className="text-base font-black text-[#1c1c19] leading-none">Notifications Hub</span>
            </div>
          </button>

          {/* Quick Stats Summary */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#f0ede9] text-[#1c1c19] text-xs font-bold border border-[#e5e2dd]">
              <span className="w-2 h-2 rounded-full bg-[#cca730] animate-pulse"></span>
              <span>Sim: Live Q3 Commission Tier</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <span className="text-xs font-extrabold text-[#1c1c19]">Julian Mercer</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#ffe088] text-[#241a00] font-black">Top 2%</span>
                </div>
                <span className="text-[10px] text-[#594047] font-bold">GP-PARTNER #4928</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#b1005e] flex items-center justify-center text-white">
                <User className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto w-full px-6 pt-6 flex flex-col gap-6">
        
        {/* TITLE AND SEARCH BOX HEADER */}
        <div className="relative overflow-hidden w-full bg-white border border-[#e5e2dd] p-6 rounded-3xl shadow-sm">
          {/* Decorative Blur Spheres */}
          <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-[#b1005e]/8 blur-2xl pointer-events-none"></div>
          <div className="absolute -left-16 -bottom-16 w-40 h-40 rounded-full bg-[#ffe088]/20 blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-3xl font-black text-[#1c1c19] tracking-tight leading-tight">Notifications</h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffd9e2] text-[#8e004a] text-xs font-black shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b1005e] animate-pulse"></span>
                  {totalUnreadCount} Unread
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ffe088] text-[#241a00] text-xs font-bold">
                  <SlidersHorizontal className="w-3 h-3 text-[#735c00]" />
                  PREVIEW DATA — Demo Mode
                </span>
              </div>
              <p className="text-sm text-[#594047] leading-relaxed max-w-3xl">
                Stay updated on your salon referrals, QR qualification streaks, earnings dispatches, and hardware milestone claims in real time.
              </p>
            </div>

            {/* Quick Actions & Search */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 shrink-0">
              <div className="relative flex items-center w-full sm:w-64">
                <Search className="w-4 h-4 text-[#8d6f77] absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search notifications, refs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-full bg-[#f6f3ee] text-[#1c1c19] placeholder:text-[#8d6f77] text-xs font-semibold focus:outline-none focus:bg-white border border-transparent focus:border-[#e5e2dd] transition-all"
                />
              </div>

              <button
                onClick={markAllAsRead}
                className="flex items-center justify-center gap-1 px-4 py-2.5 rounded-full bg-white hover:bg-[#f6f3ee] text-[#8e4767] border border-[#e5e2dd] text-xs font-black shadow-xs transition-all active:scale-95"
                type="button"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Mark All Read</span>
              </button>

              <button
                onClick={scrollToPreferences}
                className="flex items-center justify-center gap-1 px-4 py-2.5 rounded-full bg-white hover:bg-[#f6f3ee] text-[#1c1c19] border border-[#e5e2dd] text-xs font-black shadow-xs transition-all active:scale-95"
                type="button"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#b1005e]" />
                <span>Preferences</span>
              </button>
            </div>
          </div>
        </div>

        {/* STICKY SUB-HEADER: CATEGORY FILTERS */}
        <div className="sticky top-16 z-20 bg-[#fcf9f4]/90 backdrop-blur-md py-3 border-b border-[#e5e2dd]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Horizontal Filter Scroll */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {[
                { id: 'all', label: 'All', count: categoryCounts.all },
                { id: 'referrals', label: 'Referrals', count: categoryCounts.referrals },
                { id: 'verification', label: 'Verification', count: categoryCounts.verification },
                { id: 'earnings', label: 'Earnings', count: categoryCounts.earnings },
                { id: 'rewards', label: 'Rewards', count: categoryCounts.rewards },
                { id: 'withdrawals', label: 'Withdrawals', count: categoryCounts.withdrawals },
                { id: 'system', label: 'System', count: categoryCounts.system },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black shrink-0 transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-[#b1005e] text-white shadow-md shadow-[#b1005e]/20'
                      : 'bg-white hover:bg-[#f6f3ee] text-[#594047] border border-[#e5e2dd]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    activeCategory === cat.id ? 'bg-white/20 text-white' : 'bg-[#f0ede9] text-[#594047]'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Inline Toggles */}
            <div className="flex items-center gap-4 shrink-0 justify-between md:justify-end">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={unreadOnly}
                  onChange={(e) => setUnreadOnly(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-[#e5e2dd] peer-checked:bg-[#b1005e] rounded-full transition-colors relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:w-4 after:h-4 after:rounded-full after:transition-all peer-checked:after:translate-x-4 shadow-inner"></div>
                <span className="text-xs font-bold text-[#1c1c19]">Unread Only</span>
              </label>

              <button
                onClick={() => setPriorityHighOnly(!priorityHighOnly)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                  priorityHighOnly
                    ? 'bg-[#b1005e] text-white'
                    : 'bg-white hover:bg-[#f6f3ee] text-[#594047] border border-[#e5e2dd]'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${priorityHighOnly ? 'bg-white' : 'bg-[#ffd9e2]'}`}></span>
                <span>Priority High</span>
              </button>
            </div>
          </div>
        </div>

        {/* TWO COLUMN WORKSPACE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: STREAM (approx 65% width) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* SKELETON STATE VIEW */}
            {sandboxState === 'skeleton' && (
              <div className="flex flex-col gap-4">
                <div className="h-6 w-32 bg-[#e5e2dd] rounded-md animate-pulse"></div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-5 rounded-2xl bg-white border border-[#e5e2dd] flex gap-4 animate-pulse">
                    <div className="w-11 h-11 rounded-xl bg-[#e5e2dd] shrink-0"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-4 w-1/3 bg-[#e5e2dd] rounded"></div>
                      <div className="h-3 w-3/4 bg-[#e5e2dd] rounded"></div>
                      <div className="h-3 w-1/4 bg-[#e5e2dd] rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* EMPTY & ERROR VIEWS */}
            {(sandboxState === 'empty' || filteredNotifications.length === 0) && sandboxState !== 'skeleton' && sandboxState !== 'networkerror' && (
              <div className="p-12 rounded-3xl bg-white border border-[#e5e2dd] text-center flex flex-col items-center justify-center gap-4 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-[#f6f3ee] flex items-center justify-center text-[#b1005e]">
                  <BellOff className="w-8 h-8" />
                </div>
                <div className="flex flex-col gap-1 max-w-md mx-auto">
                  <h3 className="text-lg font-black text-[#1c1c19]">No Notifications Right Now</h3>
                  <p className="text-xs text-[#594047] leading-relaxed">
                    {searchQuery || activeCategory !== 'all' || unreadOnly || priorityHighOnly
                      ? 'No updates match your selected search criteria or filter configuration tags. Try resetting active filters.'
                      : 'All your referred salon stats, rewards claim dispatches, and payout cycles are fully up to date. We will notify you here of new activity.'}
                  </p>
                </div>
                <button
                  onClick={resetSimulation}
                  className="px-6 py-2.5 rounded-full bg-[#b1005e] hover:bg-[#d91b77] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  Reset Active Filters
                </button>
              </div>
            )}

            {sandboxState === 'networkerror' && (
              <div className="p-12 rounded-3xl bg-white border border-[#ffb4ab] text-center flex flex-col items-center justify-center gap-4 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a]">
                  <WifiOff className="w-8 h-8" />
                </div>
                <div className="flex flex-col gap-1 max-w-md mx-auto">
                  <h3 className="text-lg font-black text-[#ba1a1a]">Network Stream Disconnected</h3>
                  <p className="text-xs text-[#594047] leading-relaxed">
                    Unable to reach the secure Nexora fintech event gateway telemetry nodes. Please check your internet connection or reload the network gateway logs.
                  </p>
                </div>
                <button
                  onClick={resetSimulation}
                  className="px-6 py-2.5 rounded-full bg-[#ba1a1a] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  Retry Event Stream
                </button>
              </div>
            )}

            {/* NOTIFICATION GROUPS BY TIME */}
            {sandboxState !== 'skeleton' && sandboxState !== 'empty' && sandboxState !== 'networkerror' && filteredNotifications.length > 0 && (
              <div className="flex flex-col gap-6">
                
                {/* GROUP: TODAY */}
                {filteredNotifications.some(n => n.group === 'today') && (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between px-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-[#1c1c19] uppercase tracking-wider">Today</span>
                        <span className="text-xs text-[#594047]">• {filteredNotifications.filter(n => n.group === 'today').length} updates</span>
                      </div>
                      <span className="text-xs text-[#594047]">18 Feb 2025</span>
                    </div>

                    <div className="flex flex-col gap-3">
                      {filteredNotifications.filter(n => n.group === 'today').map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => setSelectedNotifId(notif.id)}
                          className={`p-4 rounded-2xl bg-white border transition-all cursor-pointer flex flex-col md:flex-row gap-4 items-start ${
                            selectedNotifId === notif.id
                              ? 'border-2 border-[#b1005e] shadow-md shadow-[#b1005e]/5'
                              : 'border-[#e5e2dd] hover:border-[#b1005e]'
                          }`}
                        >
                          {/* Icon container */}
                          <div className="flex items-center md:items-start gap-3 shrink-0">
                            <div className={`relative w-11 h-11 rounded-xl flex items-center justify-center ${notif.iconBg}`}>
                              {notif.icon}
                              {notif.unread && (
                                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#b1005e] ring-2 ring-white animate-pulse"></span>
                              )}
                            </div>
                          </div>

                          {/* Text content */}
                          <div className="flex-1 flex flex-col gap-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full bg-[#f6f3ee] text-[#8e4767]">
                                  {notif.category}
                                </span>
                                {notif.priority === 'high' && (
                                  <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full bg-[#ffd9e2] text-[#8e004a]">
                                    High Priority
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-[#594047]">{notif.timeLabel}</span>
                            </div>

                            <h3 className={`text-base font-bold tracking-tight mt-1 text-[#1c1c19] ${notif.unread ? 'font-black' : 'font-semibold'}`}>
                              {notif.title}
                            </h3>
                            <p className="text-xs text-[#594047] leading-relaxed line-clamp-2">
                              {notif.summary}
                            </p>

                            {/* Card actions line */}
                            <div className="mt-3 flex items-center justify-between gap-2 flex-wrap pt-2 border-t border-[#e5e2dd]/60">
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#f6f3ee] text-[#594047]">
                                Ref: {notif.refCode}
                              </span>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={(e) => toggleReadStatus(notif.id, e)}
                                  className="p-1.5 rounded-lg text-[#594047] hover:text-[#b1005e] hover:bg-[#f6f3ee] transition-all cursor-pointer"
                                  title="Toggle Read/Unread"
                                >
                                  <Check className={`w-4 h-4 ${notif.unread ? 'opacity-40' : 'opacity-100 text-[#b1005e] font-bold'}`} />
                                </button>
                                <button
                                  onClick={() => setSelectedNotifId(notif.id)}
                                  className="px-3 py-1 rounded-full bg-[#ffd9e2] text-[#8e004a] text-[11px] font-extrabold hover:bg-[#b1005e] hover:text-white transition-all"
                                >
                                  View Details
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* GROUP: YESTERDAY */}
                {filteredNotifications.some(n => n.group === 'yesterday') && (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between px-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-[#1c1c19] uppercase tracking-wider">Yesterday</span>
                        <span className="text-xs text-[#594047]">• {filteredNotifications.filter(n => n.group === 'yesterday').length} updates</span>
                      </div>
                      <span className="text-xs text-[#594047]">17 Feb 2025</span>
                    </div>

                    <div className="flex flex-col gap-3">
                      {filteredNotifications.filter(n => n.group === 'yesterday').map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => setSelectedNotifId(notif.id)}
                          className={`p-4 rounded-2xl bg-white border transition-all cursor-pointer flex flex-col md:flex-row gap-4 items-start ${
                            selectedNotifId === notif.id
                              ? 'border-2 border-[#b1005e] shadow-md shadow-[#b1005e]/5'
                              : 'border-[#e5e2dd] hover:border-[#b1005e]'
                          }`}
                        >
                          {/* Icon container */}
                          <div className="flex items-center md:items-start gap-3 shrink-0">
                            <div className={`relative w-11 h-11 rounded-xl flex items-center justify-center ${notif.iconBg}`}>
                              {notif.icon}
                              {notif.unread && (
                                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#b1005e] ring-2 ring-white animate-pulse"></span>
                              )}
                            </div>
                          </div>

                          {/* Text content */}
                          <div className="flex-1 flex flex-col gap-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full bg-[#f6f3ee] text-[#8e4767]">
                                  {notif.category}
                                </span>
                                {notif.priority === 'high' && (
                                  <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full bg-[#ffd9e2] text-[#8e004a]">
                                    High Priority
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-[#594047]">{notif.timeLabel}</span>
                            </div>

                            <h3 className={`text-base font-bold tracking-tight mt-1 text-[#1c1c19] ${notif.unread ? 'font-black' : 'font-semibold'}`}>
                              {notif.title}
                            </h3>
                            <p className="text-xs text-[#594047] leading-relaxed line-clamp-2">
                              {notif.summary}
                            </p>

                            {/* Card actions line */}
                            <div className="mt-3 flex items-center justify-between gap-2 flex-wrap pt-2 border-t border-[#e5e2dd]/60">
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#f6f3ee] text-[#594047]">
                                Ref: {notif.refCode}
                              </span>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={(e) => toggleReadStatus(notif.id, e)}
                                  className="p-1.5 rounded-lg text-[#594047] hover:text-[#b1005e] hover:bg-[#f6f3ee] transition-all cursor-pointer"
                                  title="Toggle Read/Unread"
                                >
                                  <Check className={`w-4 h-4 ${notif.unread ? 'opacity-40' : 'opacity-100 text-[#b1005e] font-bold'}`} />
                                </button>
                                <button
                                  onClick={() => setSelectedNotifId(notif.id)}
                                  className="px-3 py-1 rounded-full bg-[#ffd9e2] text-[#8e004a] text-[11px] font-extrabold hover:bg-[#b1005e] hover:text-white transition-all"
                                >
                                  View Details
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* GROUP: EARLIER */}
                {filteredNotifications.some(n => n.group === 'earlier') && (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between px-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-[#1c1c19] uppercase tracking-wider">Earlier this week</span>
                        <span className="text-xs text-[#594047]">• {filteredNotifications.filter(n => n.group === 'earlier').length} updates</span>
                      </div>
                      <span className="text-xs text-[#594047]">12 - 14 Feb 2025</span>
                    </div>

                    <div className="flex flex-col gap-3">
                      {filteredNotifications.filter(n => n.group === 'earlier').map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => setSelectedNotifId(notif.id)}
                          className={`p-4 rounded-2xl bg-white border transition-all cursor-pointer flex flex-col md:flex-row gap-4 items-start ${
                            selectedNotifId === notif.id
                              ? 'border-2 border-[#b1005e] shadow-md shadow-[#b1005e]/5'
                              : 'border-[#e5e2dd] hover:border-[#b1005e]'
                          }`}
                        >
                          {/* Icon container */}
                          <div className="flex items-center md:items-start gap-3 shrink-0">
                            <div className={`relative w-11 h-11 rounded-xl flex items-center justify-center ${notif.iconBg}`}>
                              {notif.icon}
                              {notif.unread && (
                                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#b1005e] ring-2 ring-white animate-pulse"></span>
                              )}
                            </div>
                          </div>

                          {/* Text content */}
                          <div className="flex-1 flex flex-col gap-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full bg-[#f6f3ee] text-[#8e4767]">
                                  {notif.category}
                                </span>
                                {notif.priority === 'high' && (
                                  <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full bg-[#ffd9e2] text-[#8e004a]">
                                    High Priority
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-[#594047]">{notif.timeLabel}</span>
                            </div>

                            <h3 className={`text-base font-bold tracking-tight mt-1 text-[#1c1c19] ${notif.unread ? 'font-black' : 'font-semibold'}`}>
                              {notif.title}
                            </h3>
                            <p className="text-xs text-[#594047] leading-relaxed line-clamp-2">
                              {notif.summary}
                            </p>

                            {/* Card actions line */}
                            <div className="mt-3 flex items-center justify-between gap-2 flex-wrap pt-2 border-t border-[#e5e2dd]/60">
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#f6f3ee] text-[#594047]">
                                Ref: {notif.refCode}
                              </span>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={(e) => toggleReadStatus(notif.id, e)}
                                  className="p-1.5 rounded-lg text-[#594047] hover:text-[#b1005e] hover:bg-[#f6f3ee] transition-all cursor-pointer"
                                  title="Toggle Read/Unread"
                                >
                                  <Check className={`w-4 h-4 ${notif.unread ? 'opacity-40' : 'opacity-100 text-[#b1005e] font-bold'}`} />
                                </button>
                                <button
                                  onClick={() => setSelectedNotifId(notif.id)}
                                  className="px-3 py-1 rounded-full bg-[#ffd9e2] text-[#8e004a] text-[11px] font-extrabold hover:bg-[#b1005e] hover:text-white transition-all"
                                >
                                  View Details
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* END OF FEED */}
                <div className="p-4 rounded-2xl bg-[#f0ede9] text-center flex items-center justify-center gap-2 text-xs text-[#594047] font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#b1005e]" />
                  <span>You have reviewed all notification updates up to 1 Feb 2025</span>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: DETAIL DRAWER (approx 35% width) */}
          <aside className="lg:col-span-4 sticky top-36 flex flex-col gap-4">
            {selectedNotif && sandboxState !== 'skeleton' && sandboxState !== 'empty' && sandboxState !== 'networkerror' ? (
              <div className="rounded-3xl bg-white border border-[#e5e2dd] p-5 shadow-sm flex flex-col gap-4 relative overflow-hidden">
                {/* Header detail */}
                <div className="flex items-center justify-between pb-3 border-b border-[#e5e2dd]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#b1005e] animate-ping"></span>
                    <span className="text-[10px] uppercase font-black tracking-wider text-[#1c1c19]">Notification Details</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={markSelectedAsRead}
                      className="p-1.5 rounded-lg text-[#594047] hover:text-[#b1005e] hover:bg-[#f6f3ee] transition-all cursor-pointer"
                      title="Mark as Read"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        // Close visual focus
                        setSelectedNotifId('');
                      }}
                      className="p-1.5 rounded-lg text-[#594047] hover:bg-[#f6f3ee] transition-all cursor-pointer"
                      title="Clear Selection"
                    >
                      <BellOff className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Category tag heading */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#f6f3ee]">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedNotif.iconBg}`}>
                      {selectedNotif.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-black uppercase text-[#1c1c19] tracking-wider">{selectedNotif.category}</span>
                      <span className="text-[9px] font-bold text-[#594047]">{selectedNotif.priority === 'high' ? 'High Priority' : 'Routine'}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ffd9e2] text-[#8e004a] text-[10px] font-black">
                    {selectedNotif.tag}
                  </span>
                </div>

                {/* Title & Body */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-black text-[#1c1c19] tracking-tight leading-tight">
                    {selectedNotif.title}
                  </h3>
                  <p className="text-xs text-[#594047] leading-relaxed">
                    {selectedNotif.body}
                  </p>
                </div>

                {/* Financial breakdown block */}
                {selectedNotif.hasFinanceTable && (
                  <div className="p-3 rounded-xl bg-[#f6f3ee] flex flex-col gap-1.5 border border-[#e5e2dd]">
                    <div className="flex justify-between items-center text-xs text-[#594047]">
                      <span>Gross Settlement Requested:</span>
                      <span className="font-extrabold text-[#1c1c19]">{selectedNotif.gross}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-[#594047]">
                      <span>Statutory TDS (Sec 194H @ 5%):</span>
                      <span className="font-extrabold text-[#ba1a1a]">{selectedNotif.tds}</span>
                    </div>
                    <div className="h-[1px] bg-[#e5e2dd] my-1"></div>
                    <div className="flex justify-between items-center text-sm font-black text-[#1c1c19]">
                      <span>Net Credited to Bank:</span>
                      <span className="text-[#b1005e] font-black text-base">{selectedNotif.net}</span>
                    </div>
                  </div>
                )}

                {/* Audit specifications list */}
                <div className="flex flex-col gap-2 pt-2 border-t border-[#e5e2dd]/60 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[#594047]">Transaction Reference:</span>
                    <span className="font-bold text-[#b1005e] font-mono">{selectedNotif.refCode}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#594047]">Nodal Bank UTR:</span>
                    <span className="font-bold font-mono text-[#1c1c19] select-all">{selectedNotif.utrCode}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#594047]">Destination Target:</span>
                    <span className="font-semibold text-[#1c1c19] truncate max-w-[180px]" title={selectedNotif.destination}>
                      {selectedNotif.destination}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#594047]">Dispatched At:</span>
                    <span className="text-[#594047]">{selectedNotif.timestamp}</span>
                  </div>
                </div>

                {/* Extra advice note */}
                <div className="p-2.5 rounded-xl bg-[#ffd8e5]/40 border border-[#fda4c9]/20 flex gap-2 text-[11px] text-[#3c0223] leading-snug">
                  <Info className="w-4 h-4 shrink-0 text-[#b1005e]" />
                  <p>
                    TDS Certificate (Form 16A) compile karke Q4 FY24-25 wrap-up cycle me download portal pe make available kar diya jaega.
                  </p>
                </div>

                {/* Direct buttons */}
                <div className="flex flex-col gap-2 pt-2">
                  <button
                    onClick={() => {
                      if (selectedNotif.category === 'earnings' || selectedNotif.category === 'withdrawals') {
                        onNavigateToEarningsLedger && onNavigateToEarningsLedger();
                      } else if (selectedNotif.category === 'rewards') {
                        onNavigateToRewardsMilestones && onNavigateToRewardsMilestones();
                      } else {
                        onNavigateToDashboard && onNavigateToDashboard();
                      }
                    }}
                    className="w-full py-2.5 px-4 rounded-full bg-[#b1005e] hover:bg-[#d91b77] text-white text-xs font-bold flex items-center justify-center gap-1 shadow-md transition-all cursor-pointer"
                  >
                    <span>{selectedNotif.primaryBtnLabel}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      alert(`Initiated action: ${selectedNotif.secondaryBtnLabel}`);
                    }}
                    className="w-full py-2 px-4 rounded-full bg-[#f6f3ee] hover:bg-[#ebe8e3] text-[#1c1c19] text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#b1005e]" />
                    <span>{selectedNotif.secondaryBtnLabel}</span>
                  </button>
                </div>

                {/* Lock Authorization details */}
                <div className="text-center pt-2">
                  <span className="text-[10px] text-[#8d6f77] font-medium leading-none block">
                    Record strictly authorized for Growth Partner <strong className="text-[#1c1c19]">REF-5A45019655</strong>.
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-3xl bg-white border border-[#e5e2dd] text-center flex flex-col items-center justify-center gap-2 shadow-xs min-h-[300px]">
                <Bell className="w-8 h-8 text-[#8e4767] opacity-40" />
                <p className="text-xs text-[#594047] max-w-[200px]">
                  Select any notification from the event stream column to view full transaction auditing ledgers & ledger records.
                </p>
              </div>
            )}

            {/* QUICK STREAM STATUS CHIP WIDGET */}
            <div className="rounded-3xl bg-[#f0ede9] border border-[#e5e2dd] p-5 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black text-[#1c1c19] uppercase tracking-wider">Unread Stream Summary</span>
                <span className="text-[11px] text-[#b1005e] font-black">{totalUnreadCount} Pending</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Earnings & Payouts', value: 25, color: 'bg-emerald-600', count: '1 unread' },
                  { label: 'Verifications & Streaks', value: 25, color: 'bg-cyan-600', count: '1 unread' },
                  { label: 'Salon Referrals', value: 25, color: 'bg-indigo-600', count: '1 unread' },
                  { label: 'Milestones & Hardware', value: 25, color: 'bg-amber-500', count: '1 unread' },
                ].map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-xs text-[#594047]">
                      <span>{item.label}</span>
                      <span className="font-extrabold text-[#1c1c19]">{item.count}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#e5e2dd] overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* DELIVERY CHANNELS & PREFERENCES SECTION */}
        <section
          id="preferences-section-view"
          className="p-6 rounded-3xl bg-white border border-[#e5e2dd] shadow-sm flex flex-col gap-6 mt-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-[#e5e2dd]">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-[#b1005e]" />
                <h2 className="text-xl font-black text-[#1c1c19]">Notification Delivery Channels &amp; Triggers</h2>
              </div>
              <p className="text-xs text-[#594047] leading-relaxed">
                Configure how and where you receive high-frequency operational updates, daily streak summaries, and instant settlement notices.
              </p>
            </div>

            <AnimatePresence>
              {showSaveSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5 shadow-xs shrink-0"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Preferences saved successfully</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* COLUMN 1: Active Delivery Channels */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-black text-[#8e4767] uppercase tracking-wider">Active Delivery Channels</h3>

              {/* In App toggle */}
              <div className="p-4 rounded-2xl bg-[#f6f3ee] flex items-center justify-between gap-4 border border-[#e5e2dd]/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#b1005e] shadow-xs shrink-0">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1c1c19]">In-App Notification Stream</h4>
                    <p className="text-[11px] text-[#594047]">Real-time alerts inside your Growth Partner dashboard</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={deliveryChannels.inApp}
                    onChange={(e) => setDeliveryChannels({ ...deliveryChannels, inApp: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#e5e2dd] peer-checked:bg-[#b1005e] rounded-full transition-all relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:w-5 after:h-5 after:rounded-full after:transition-all peer-checked:after:translate-x-5 shadow-inner"></div>
                </label>
              </div>

              {/* Email toggle */}
              <div className="p-4 rounded-2xl bg-[#f6f3ee] flex items-center justify-between gap-4 border border-[#e5e2dd]/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#b1005e] shadow-xs shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-[#1c1c19]">Email Transmissions</h4>
                      <span className="text-[9px] px-1.5 py-0.2 bg-[#e5e2dd] text-[#594047] font-black rounded-full uppercase">Masked</span>
                    </div>
                    <p className="text-[11px] text-[#594047]">Sent to j****@nexora.partner (Daily digests &amp; invoices)</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={deliveryChannels.email}
                    onChange={(e) => setDeliveryChannels({ ...deliveryChannels, email: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#e5e2dd] peer-checked:bg-[#b1005e] rounded-full transition-all relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:w-5 after:h-5 after:rounded-full after:transition-all peer-checked:after:translate-x-5 shadow-inner"></div>
                </label>
              </div>

              {/* SMS toggle */}
              <div className="p-4 rounded-2xl bg-[#f6f3ee] flex items-center justify-between gap-4 border border-[#e5e2dd]/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#b1005e] shadow-xs shrink-0">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1c1c19]">Instant SMS Service</h4>
                    <p className="text-[11px] text-[#594047]">Sent to +91 98765 ••••• (Payout transfers &amp; security OTPs)</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={deliveryChannels.sms}
                    onChange={(e) => setDeliveryChannels({ ...deliveryChannels, sms: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#e5e2dd] peer-checked:bg-[#b1005e] rounded-full transition-all relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:w-5 after:h-5 after:rounded-full after:transition-all peer-checked:after:translate-x-5 shadow-inner"></div>
                </label>
              </div>

              {/* WhatsApp toggle */}
              <div className="p-4 rounded-2xl bg-[#f6f3ee] flex items-center justify-between gap-4 border border-[#e5e2dd]/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#b1005e] shadow-xs shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1c1c19]">WhatsApp Concierge</h4>
                    <p className="text-[11px] text-[#594047]">Direct alerts on approved marketing collateral &amp; payouts</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={deliveryChannels.whatsapp}
                    onChange={(e) => setDeliveryChannels({ ...deliveryChannels, whatsapp: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#e5e2dd] peer-checked:bg-[#b1005e] rounded-full transition-all relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:w-5 after:h-5 after:rounded-full after:transition-all peer-checked:after:translate-x-5 shadow-inner"></div>
                </label>
              </div>
            </div>

            {/* COLUMN 2: Event Subscriptions */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-black text-[#8e4767] uppercase tracking-wider">Event Category Subscriptions</h3>
              <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] flex flex-col divide-y divide-[#e5e2dd]/60">
                
                {/* Row 1 */}
                <div className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-[#1c1c19]">Referral Status Updates</h4>
                    <p className="text-[11px] text-[#594047]">Merchant onboarding, lead captures &amp; initial QR binds</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={subscriptions.referrals}
                      onChange={(e) => setSubscriptions({ ...subscriptions, referrals: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-[#e5e2dd] peer-checked:bg-[#b1005e] rounded-full transition-colors relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:w-4 after:h-4 after:rounded-full after:transition-all peer-checked:after:translate-x-4 shadow-inner"></div>
                  </label>
                </div>

                {/* Row 2 */}
                <div className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-[#1c1c19]">Verification &amp; 15-day Streak Milestones</h4>
                    <p className="text-[11px] text-[#594047]">Consecutive daily transaction warnings and streak bonuses</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={subscriptions.streaks}
                      onChange={(e) => setSubscriptions({ ...subscriptions, streaks: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-[#e5e2dd] peer-checked:bg-[#b1005e] rounded-full transition-colors relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:w-4 after:h-4 after:rounded-full after:transition-all peer-checked:after:translate-x-4 shadow-inner"></div>
                  </label>
                </div>

                {/* Row 3 */}
                <div className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-[#1c1c19]">Earnings &amp; Nodal Dispatches</h4>
                    <p className="text-[11px] text-[#594047]">Real-time settlement notices, NEFT UTRs, and quarterly TDS summaries</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={subscriptions.earnings}
                      onChange={(e) => setSubscriptions({ ...subscriptions, earnings: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-[#e5e2dd] peer-checked:bg-[#b1005e] rounded-full transition-colors relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:w-4 after:h-4 after:rounded-full after:transition-all peer-checked:after:translate-x-4 shadow-inner"></div>
                  </label>
                </div>

                {/* Row 4 */}
                <div className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-[#1c1c19]">Reward Milestone Unlocks</h4>
                    <p className="text-[11px] text-[#594047]">Tier elevations, physical merchandise, and hardware incentives</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={subscriptions.milestones}
                      onChange={(e) => setSubscriptions({ ...subscriptions, milestones: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-[#e5e2dd] peer-checked:bg-[#b1005e] rounded-full transition-colors relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:w-4 after:h-4 after:rounded-full after:transition-all peer-checked:after:translate-x-4 shadow-inner"></div>
                  </label>
                </div>

                {/* Secure warning locked row */}
                <div className="py-3 px-2 flex items-center justify-between gap-4 bg-[#ffdad6]/40 rounded-xl mt-2 border border-[#ffb4ab]/30">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 text-[#ba1a1a]">
                      <h4 className="text-xs font-bold">Mandatory Security &amp; Compliance Alerts</h4>
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-[11px] text-[#594047] leading-relaxed mt-0.5">
                      Security and compliance alerts cannot be disabled per RBI / CERT-In guidelines.
                    </p>
                  </div>
                  <div className="opacity-50 pointer-events-none select-none">
                    <div className="w-9 h-5 bg-[#b1005e] rounded-full relative after:content-[''] after:absolute after:top-0.5 after:right-0.5 after:bg-white after:w-4 after:h-4 after:rounded-full shadow-inner"></div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Action button row */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#e5e2dd]">
            <button
              onClick={handleSavePreferences}
              disabled={savingPrefs}
              className="px-6 py-3 rounded-full bg-[#b1005e] hover:bg-[#d91b77] text-white text-xs font-bold shadow-md shadow-[#b1005e]/25 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-60"
              type="button"
            >
              {savingPrefs ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Encrypting &amp; Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Preferences</span>
                </>
              )}
            </button>
          </div>
        </section>

        {/* SECURITY COMPLIANCE GUARANTEE FOOTER */}
        <footer className="p-4 rounded-2xl bg-[#f0ede9] text-center flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#594047] border border-[#e5e2dd] mt-6">
          <div className="flex items-center gap-2 text-left">
            <ShieldCheck className="w-5 h-5 text-[#b1005e] shrink-0" />
            <span>
              <strong>Zero-Exposure Guarantee:</strong> Partner notifications strictly isolate private account records and unmasked financial credentials. All links navigate verified data bound to <strong className="text-[#1c1c19]">GP-PARTNER #4928</strong>.
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0 font-bold">
            <span className="text-emerald-700 flex items-center gap-1.5 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              256-Bit Vault Synced
            </span>
            <span>•</span>
            <span className="text-[#594047]">RBI 194H Compliant</span>
          </div>
        </footer>

      </main>
    </div>
  );
};
