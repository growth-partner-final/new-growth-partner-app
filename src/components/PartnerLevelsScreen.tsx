import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Compass,
  HelpCircle,
  Layers,
  Lock,
  Phone,
  RotateCcw,
  AlertTriangle,
  ShieldCheck,
  Sparkles,
  Store,
  Smartphone,
  Trophy,
  WifiOff,
  MapPin,
  FileText,
  MessageSquare,
  ShieldAlert,
  Search,
  ArrowRight,
  TrendingUp,
  Info
} from 'lucide-react';

interface PartnerLevelsScreenProps {
  onNavigateToHub?: () => void;
  onNavigateToSalonIntelligence?: () => void;
  onNavigateToLeaderboard?: () => void;
  onNavigateToReferralTimeline?: () => void;
  onNavigateToShareEarn?: () => void;
  onNavigateToAddSalon?: () => void;
  onNavigateToDashboard?: () => void;
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

export const PartnerLevelsScreen: React.FC<PartnerLevelsScreenProps> = ({
  onNavigateToHub,
  onNavigateToSalonIntelligence,
  onNavigateToLeaderboard,
  onNavigateToReferralTimeline,
  onNavigateToShareEarn,
  onNavigateToAddSalon,
  onNavigateToDashboard,
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
  // Available states: 'in-progress' | 'new-partner' | 'achieved' | 'pending' | 'suspended' | 'empty'
  const [activeState, setActiveState] = useState<'in-progress' | 'new-partner' | 'achieved' | 'pending' | 'suspended' | 'empty'>('in-progress');

  // Interactive accordions for tiers & benefits
  const [expandedTiers, setExpandedTiers] = useState<Record<string, boolean>>({
    'starter': false,
    'growth': true, // open current by default
    'silver': false,
    'gold': false,
    'district': false
  });

  const [expandedBenefits, setExpandedBenefits] = useState<Record<string, boolean>>({
    'recognition': false,
    'training': false,
    'marketing': false,
    'support': false
  });

  // Support Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const toggleTier = (tier: string) => {
    setExpandedTiers(prev => ({
      ...prev,
      [tier]: !prev[tier]
    }));
  };

  const toggleBenefit = (benefit: string) => {
    setExpandedBenefits(prev => ({
      ...prev,
      [benefit]: !prev[benefit]
    }));
  };

  // State calculations derived dynamically from state selection
  const stateData = {
    'in-progress': {
      tierLabel: 'Growth Partner',
      progressPercentage: 72,
      statVerified: '18 / 25',
      statQualifying: '14 / 20',
      nudge: 'Sirf <strong>6 aur qualifying shops</strong> chahiye Silver level ke liye.',
      nextGoal: 'Silver Tier'
    },
    'new-partner': {
      tierLabel: 'Starter Partner',
      progressPercentage: 20,
      statVerified: '1 / 5',
      statQualifying: '1 / 5',
      nudge: 'Complete <strong>4 more shops</strong> to unlock Growth Partner tier.',
      nextGoal: 'Growth Partner'
    },
    'achieved': {
      tierLabel: 'Silver Partner',
      progressPercentage: 100,
      statVerified: '25 / 25',
      statQualifying: '20 / 20',
      nudge: 'Congratulations! Silver Level Verified. Evaluation for Gold underway.',
      nextGoal: 'Gold Level'
    },
    'pending': {
      tierLabel: 'Growth Partner',
      progressPercentage: 90,
      statVerified: '24 / 25',
      statQualifying: '19 / 20',
      nudge: 'Final review running for 1 pending shop by compliance team.',
      nextGoal: 'Silver Tier'
    },
    'suspended': {
      tierLabel: 'Growth Partner',
      progressPercentage: 72,
      statVerified: '18 / 25',
      statQualifying: '14 / 20',
      nudge: 'Sirf <strong>6 aur qualifying shops</strong> chahiye Silver level ke liye.',
      nextGoal: 'Silver Tier'
    },
    'empty': {
      tierLabel: 'Starter Partner',
      progressPercentage: 0,
      statVerified: '0 / 5',
      statQualifying: '0 / 5',
      nudge: 'No merchant referral records synced yet.',
      nextGoal: 'Starter Goal'
    }
  };

  const currentData = stateData[activeState];

  const handleContactOps = () => {
    showToast('Redirecting to Partner Helpdesk on WhatsApp...');
    setTimeout(() => {
      window.open('https://wa.me/919999999999?text=Hi%20Nexora,%20I%20need%20a%20tier%20re-evaluation%20for%20my%20salon%20referral%20milestones.', '_blank');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#fcf9f4] text-[#1c1c19] font-sans antialiased pb-24 relative selection:bg-[#ffd9e2] selection:text-[#8e004a]">
      {/* HEADER SECTION */}
      <header className="sticky top-0 w-full z-50 pt-safe bg-[#ffffff]/90 backdrop-blur-md border-b border-[#e5e2dd] shadow-sm">
        {/* Top bar state indicator */}
        <div className="w-full bg-[#ebe8e3]/90 px-4 py-2 overflow-x-auto flex items-center gap-2 no-scrollbar">
          <span className="text-[11px] uppercase tracking-wider font-bold text-[#594047] shrink-0">Simulator:</span>
          {(['in-progress', 'new-partner', 'achieved', 'pending', 'suspended', 'empty'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setActiveState(s)}
              className={`px-3 py-1 rounded-full text-[11px] font-bold shrink-0 transition-all cursor-pointer ${
                activeState === s
                  ? 'bg-[#b1005e] text-white shadow-xs'
                  : 'bg-white text-[#594047] hover:text-[#1c1c19] border border-[#e5e2dd]'
              }`}
            >
              {s === 'in-progress' && 'In Progress'}
              {s === 'new-partner' && 'New Partner'}
              {s === 'achieved' && 'Achieved'}
              {s === 'pending' && 'Verification Pending'}
              {s === 'suspended' && 'Suspended'}
              {s === 'empty' && 'Empty State'}
            </button>
          ))}
        </div>

        {/* Real Brand Header bar */}
        <div className="h-16 px-4 sm:px-8 lg:px-12 flex items-center justify-between mx-auto w-full">
          <button
            onClick={() => onNavigateToHub && onNavigateToHub()}
            className="flex items-center gap-2 text-left cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#b1005e] flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:bg-[#d91b77] transition-all">
              NX
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-[#8e4767] font-bold">Nexora Partner</span>
              <span className="text-sm font-extrabold text-[#1c1c19] leading-tight">Levels Roadmap</span>
            </div>
          </button>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onNavigateToHub && onNavigateToHub()}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-[#b1005e] bg-[#ffd9e2]/60 hover:bg-[#ffd9e2] border border-[#fda4c9]/60 cursor-pointer transition-all active:scale-95"
              title="Return to Main Home Landing Page"
            >
              <span className="material-symbols-outlined text-[16px]">home</span>
              <span>Home</span>
            </button>
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#f6f3ee] text-[#b1005e] font-extrabold border border-[#ffd9e2]">
              Canary Live
            </span>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="w-full mx-auto px-4 sm:px-8 lg:px-12 pt-6 flex flex-col gap-4">
        {/* Subtle Ambient Glow Element */}
        <div className="relative overflow-hidden w-full">
          <div className="flex flex-col gap-1.5 mb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Trophy className="w-4 h-4 text-[#b1005e]" />
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#8e4767]">Partner Tier Milestone</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#e5e2dd] text-[#594047] font-bold uppercase">
                {activeState.replace('-', ' ')}
              </span>
            </div>
            <h2 className="text-2xl font-black text-[#1c1c19] tracking-tight leading-tight">Partner Levels</h2>
            <p className="text-xs text-[#594047] leading-relaxed">
              Verified referral performance ke through apna partner level status aur milestones check kijiye.
            </p>
          </div>
        </div>

        {/* State: Suspended Alert */}
        {activeState === 'suspended' && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full p-4 rounded-2xl bg-[#ffdad6] text-[#410002] border border-[#ffb4ab] flex gap-3 shadow-xs"
          >
            <ShieldAlert className="w-5 h-5 text-[#ba1a1a] shrink-0 mt-0.5 animate-bounce" />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-black uppercase tracking-wider">Tier Status Restricted</span>
              <p className="text-xs leading-relaxed text-[#594047]">
                Verification checks flagged irregular QR activities. Verification cycle pause pe hai. Please connect with your District Lead for re-audit.
              </p>
            </div>
          </motion.div>
        )}

        {/* State: Empty View Container */}
        {activeState === 'empty' ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full py-10 px-6 rounded-3xl bg-[#f6f3ee] border border-[#e5e2dd] text-center flex flex-col items-center gap-4"
          >
            <div className="w-14 h-14 rounded-full bg-[#ebe8e3] flex items-center justify-center text-[#b1005e]">
              <Search className="w-7 h-7" />
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-base font-bold text-[#1c1c19]">No Milestone Data Sync</h4>
              <p className="text-xs text-[#594047] leading-relaxed max-w-xs">
                Abhi referral database se metrics update ho rahe hain. Agar aapne haal hi me salon register kiya hai toh thoda intezar kijiye.
              </p>
            </div>
            <button
              onClick={() => setActiveState('in-progress')}
              className="min-h-[44px] px-6 rounded-full bg-[#b1005e] text-white text-xs font-bold shadow-md hover:bg-[#d91b77] transition-all cursor-pointer"
              type="button"
            >
              Reload Active Metrics
            </button>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* HERO GLASS CARD: Current Level Metrics */}
            <div className="relative overflow-hidden rounded-3xl bg-white border border-[#e5e2dd] p-5 shadow-xs">
              {/* Decorative Blur Spheres */}
              <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-[#b1005e]/8 blur-2xl pointer-events-none"></div>
              <div className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-[#ffe088]/20 blur-2xl pointer-events-none"></div>

              <div className="relative z-10 flex flex-col gap-4">
                {/* Header Metrics */}
                <div className="flex justify-between items-start gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-[#8d6f77] font-bold">Active Tier Status</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-xl font-extrabold text-[#b1005e] tracking-tight">{currentData.tierLabel}</span>
                      <ShieldCheck className="w-4 h-4 text-[#b1005e]" />
                    </div>
                  </div>
                  <div className="flex flex-col items-end text-right">
                    <span className="text-[10px] uppercase tracking-wider text-[#8d6f77] font-bold">Next Milestone Target</span>
                    <span className="text-xs font-black text-[#1c1c19] mt-0.5 flex items-center gap-1">
                      {currentData.nextGoal} <ArrowRight className="w-3 h-3 text-[#b1005e]" />
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold text-[#1c1c19]">Tier Completion Rate</span>
                    <span className="text-sm font-black text-[#b1005e]">{currentData.progressPercentage}%</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-[#f6f3ee] p-0.5 border border-[#e5e2dd] shadow-inner overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${currentData.progressPercentage}%` }}
                      transition={{ duration: 0.6 }}
                      className="h-full rounded-full bg-gradient-to-r from-[#8e4767] to-[#b1005e]"
                    ></motion.div>
                  </div>
                </div>

                {/* Grid stats */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd]">
                    <Store className="w-5 h-5 text-[#8e4767] shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] text-[#594047] font-bold truncate">Verified Shops</span>
                      <span className="text-xs font-black text-[#1c1c19]">{currentData.statVerified}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd]">
                    <ShieldCheck className="w-5 h-5 text-[#cca730] shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] text-[#594047] font-bold truncate">Qualifying Active</span>
                      <span className="text-xs font-black text-[#1c1c19]">{currentData.statQualifying}</span>
                    </div>
                  </div>
                </div>

                {/* Nudge Notification banner */}
                <div className="p-3 rounded-xl bg-[#ffd8e5]/60 border border-[#fda4c9]/40 flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#b1005e] text-[20px] shrink-0">flag</span>
                  <p
                    className="text-xs text-[#3c0223] leading-snug"
                    dangerouslySetInnerHTML={{ __html: currentData.nudge }}
                  ></p>
                </div>
              </div>
            </div>

            {/* PROGRESSION TIERS ACCORDION LIST */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-sm font-black text-[#1c1c19] uppercase tracking-wide">Roadmap Progression</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ebe8e3] text-[#594047] font-bold font-mono">
                  5 Defined Tiers
                </span>
              </div>

              {/* TIER 1: Starter Partner */}
              <div className="rounded-2xl bg-white border border-[#e5e2dd] p-4 flex flex-col shadow-xs transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-[#ebe8e3] flex items-center justify-center shrink-0 text-[#b1005e]">
                      {activeState === 'new-partner' ? (
                        <Smartphone className="w-5 h-5 text-[#b1005e]" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-[#b1005e]" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-sm font-extrabold text-[#1c1c19]">Starter Partner</span>
                        {activeState === 'new-partner' ? (
                          <span className="text-[9px] px-1.5 py-0.5 bg-[#ffd9e2] text-[#8e004a] font-black rounded-full uppercase">CURRENT</span>
                        ) : (
                          <span className="text-[9px] px-1.5 py-0.5 bg-[#ebe8e3] text-[#594047] font-black rounded-full uppercase">PASSED</span>
                        )}
                      </div>
                      <span className="text-xs text-[#594047]">1–5 Verified Merchants referred</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleTier('starter')}
                    className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#594047] hover:text-[#b1005e] cursor-pointer"
                  >
                    {expandedTiers.starter ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                <AnimatePresence>
                  {expandedTiers.starter && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-3 pt-3 border-t border-[#e5e2dd] text-xs text-[#594047] space-y-2"
                    >
                      <div className="flex justify-between items-center text-[11px] font-bold">
                        <span className="text-[#1c1c19]">Starter Target Requirement:</span>
                        <span className="text-[#b1005e]">Completed</span>
                      </div>
                      <p className="leading-relaxed">
                        Welcome kit launch resources, bilingual physical QR display stand handouts, and primary app login telemetry permissions activated.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* TIER 2: Growth Partner */}
              <div className={`rounded-2xl bg-white border-2 p-4 flex flex-col shadow-xs transition-all relative overflow-hidden ${
                activeState === 'in-progress' || activeState === 'suspended' || activeState === 'pending'
                  ? 'border-[#b1005e]'
                  : 'border-[#e5e2dd]'
              }`}>
                {/* Active Indicator Strip */}
                {(activeState === 'in-progress' || activeState === 'suspended' || activeState === 'pending') && (
                  <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#b1005e]"></div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0 pl-1">
                    <div className="w-10 h-10 rounded-full bg-[#ffd8e5] flex items-center justify-center shrink-0 text-[#b1005e]">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-sm font-extrabold text-[#b1005e]">Growth Partner</span>
                        {(activeState === 'in-progress' || activeState === 'suspended' || activeState === 'pending') && (
                          <span className="text-[9px] px-1.5 py-0.5 bg-[#b1005e] text-white font-black rounded-full uppercase tracking-wider">CURRENT</span>
                        )}
                      </div>
                      <span className="text-xs text-[#594047]">6–20 Verified Merchants referred</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleTier('growth')}
                    className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#594047] hover:text-[#b1005e] cursor-pointer"
                  >
                    {expandedTiers.growth ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                <AnimatePresence>
                  {expandedTiers.growth && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-3 pt-3 border-t border-[#e5e2dd] text-xs text-[#594047] pl-1 space-y-2.5"
                    >
                      <div className="p-3 rounded-xl bg-[#f6f3ee] text-[#1c1c19] space-y-2">
                        <span className="text-[11px] font-black text-[#b1005e] uppercase tracking-wider">Unlocked Operational Privileges:</span>
                        <ul className="space-y-1.5 list-disc pl-4 text-xs text-[#594047] leading-relaxed">
                          <li>Priority Helpdesk access via WhatsApp Support desk (10 AM - 8 PM).</li>
                          <li>Pre-approved bilingual salon promotion templates for client handouts.</li>
                          <li>Early withdrawal eligibility on confirmed commission blocks.</li>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* TIER 3: Silver Partner */}
              <div className={`rounded-2xl bg-white border p-4 flex flex-col shadow-xs transition-all ${
                activeState === 'achieved' ? 'border-2 border-[#b1005e]' : 'border-[#e5e2dd]'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-[#ffe088] flex items-center justify-center shrink-0 text-[#735c00]">
                      <Award className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-sm font-extrabold text-[#1c1c19]">Silver Partner</span>
                        {activeState === 'achieved' ? (
                          <span className="text-[9px] px-1.5 py-0.5 bg-[#b1005e] text-white font-black rounded-full uppercase tracking-wider">CURRENT</span>
                        ) : (
                          <span className="text-[9px] px-1.5 py-0.5 bg-[#ffe088] text-[#735c00] font-black rounded-full uppercase tracking-wider">
                            {activeState === 'in-progress' || activeState === 'suspended' ? '72% PROGRESS' : '90% PROGRESS'}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-[#594047]">21–50 Verified Merchants referred</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleTier('silver')}
                    className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#594047] hover:text-[#b1005e] cursor-pointer"
                  >
                    {expandedTiers.silver ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                <AnimatePresence>
                  {expandedTiers.silver && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-3 pt-3 border-t border-[#e5e2dd] text-xs text-[#594047] space-y-2"
                    >
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-[10px] font-bold">
                          <span>Verified Runway</span>
                          <span className="text-[#b1005e] font-black">{currentData.statQualifying} Completed</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-[#f6f3ee] overflow-hidden border border-[#e5e2dd]">
                          <div
                            className="h-full bg-[#b1005e] rounded-full"
                            style={{ width: `${activeState === 'achieved' ? 100 : activeState === 'pending' ? 90 : 70}%` }}
                          ></div>
                        </div>
                      </div>
                      <p className="leading-relaxed pt-1">
                        Unlocks customized physical acrylic QR table display blocks for key referred salons, direct priority SLA helpdesk, and region-level localized marketing funds.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* TIER 4: Gold Partner */}
              <div className="rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] p-4 flex flex-col shadow-xs opacity-90">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-[#ebe8e3] flex items-center justify-center shrink-0 text-[#8d6f77]">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-sm font-extrabold text-[#594047]">Gold Partner</span>
                        <span className="text-[9px] px-1.5 py-0.5 bg-[#ebe8e3] text-[#594047] font-black rounded-full uppercase">LOCKED</span>
                      </div>
                      <span className="text-xs text-[#594047]">51–100 Verified Merchants referred</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleTier('gold')}
                    className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#594047] hover:text-[#b1005e] cursor-pointer"
                  >
                    {expandedTiers.gold ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                <AnimatePresence>
                  {expandedTiers.gold && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-3 pt-3 border-t border-[#e5e2dd] text-xs text-[#594047]"
                    >
                      <p className="leading-relaxed">
                        Gold tier unlocks high-volume QR transacting shop benefits across three consecutive compliance audit cycles, exclusive customized soundbox allotments, and specialized Partner Coach support.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* TIER 5: District Partner */}
              <div className="rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] p-4 flex flex-col shadow-xs opacity-80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-[#ebe8e3] flex items-center justify-center shrink-0 text-[#8d6f77]">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-sm font-extrabold text-[#594047]">District Partner</span>
                        <span className="text-[9px] px-1.5 py-0.5 bg-[#ebe8e3] text-[#594047] font-black rounded-full uppercase tracking-wider">TERRITORY LEAD</span>
                      </div>
                      <span className="text-xs text-[#594047]">100+ Verified Merchants referred</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleTier('district')}
                    className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#594047] hover:text-[#b1005e] cursor-pointer"
                  >
                    {expandedTiers.district ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                <AnimatePresence>
                  {expandedTiers.district && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-3 pt-3 border-t border-[#e5e2dd] text-xs text-[#594047]"
                    >
                      <p className="leading-relaxed">
                        Exclusive leadership permissions over district sub-agents, bespoke regional signing commissions, and quarterly national summit invitations.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* BENEFITS & PRIVILEGES ACCORDION */}
            <div className="rounded-2xl bg-white border border-[#e5e2dd] p-5 shadow-xs flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <h3 className="text-sm font-black text-[#1c1c19] uppercase tracking-wide">Benefits &amp; Privileges</h3>
                  <span className="text-[11px] text-[#594047]">Tier-specific operational perks</span>
                </div>
                <Sparkles className="w-6 h-6 text-[#b1005e]" />
              </div>

              <div className="flex flex-col gap-2 pt-1">
                {/* Accordion Item 1: Recognition */}
                <div className="rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] p-3 flex flex-col">
                  <button
                    onClick={() => toggleBenefit('recognition')}
                    className="w-full min-h-[44px] flex items-center justify-between text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-[#b1005e]" />
                      <span className="text-xs font-bold text-[#1c1c19]">Recognition &amp; Credentials</span>
                    </div>
                    {expandedBenefits.recognition ? <ChevronUp className="w-4 h-4 text-[#594047]" /> : <ChevronDown className="w-4 h-4 text-[#594047]" />}
                  </button>
                  <AnimatePresence>
                    {expandedBenefits.recognition && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden text-xs text-[#594047] leading-relaxed pt-1.5 pl-6"
                      >
                        Official verified Nexora field identity credentials card, verified LinkedIn profile badge, and district wall of fame highlight upon scaling to Silver level.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Accordion Item 2: Training */}
                <div className="rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] p-3 flex flex-col">
                  <button
                    onClick={() => toggleBenefit('training')}
                    className="w-full min-h-[44px] flex items-center justify-between text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-[#b1005e]" />
                      <span className="text-xs font-bold text-[#1c1c19]">Training &amp; Growth Labs</span>
                    </div>
                    {expandedBenefits.training ? <ChevronUp className="w-4 h-4 text-[#594047]" /> : <ChevronDown className="w-4 h-4 text-[#594047]" />}
                  </button>
                  <AnimatePresence>
                    {expandedBenefits.training && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden text-xs text-[#594047] leading-relaxed pt-1.5 pl-6"
                      >
                        Exclusive masterclass workshops on onboarding regional retail corridors, expert customer objection handling scripts, and financial technology literacy courses.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Accordion Item 3: Marketing Collaterals */}
                <div className="rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] p-3 flex flex-col">
                  <button
                    onClick={() => toggleBenefit('marketing')}
                    className="w-full min-h-[44px] flex items-center justify-between text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Store className="w-4 h-4 text-[#b1005e]" />
                      <span className="text-xs font-bold text-[#1c1c19]">Marketing Kits</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] px-1.5 py-0.5 bg-[#ffe088] text-[#241a00] font-black rounded-full uppercase">TBC</span>
                      {expandedBenefits.marketing ? <ChevronUp className="w-4 h-4 text-[#594047]" /> : <ChevronDown className="w-4 h-4 text-[#594047]" />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {expandedBenefits.marketing && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden text-xs text-[#594047] leading-relaxed pt-1.5 pl-6"
                      >
                        Subsidized branded physical salon door stickers, customized biometric payment soundboxes for high-tier accounts, and local event banners. Allocation subject to regional compliance audits.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Accordion Item 4: Support Priority */}
                <div className="rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] p-3 flex flex-col">
                  <button
                    onClick={() => toggleBenefit('support')}
                    className="w-full min-h-[44px] flex items-center justify-between text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#b1005e]" />
                      <span className="text-xs font-bold text-[#1c1c19]">Support Priority Tier</span>
                    </div>
                    {expandedBenefits.support ? <ChevronUp className="w-4 h-4 text-[#594047]" /> : <ChevronDown className="w-4 h-4 text-[#594047]" />}
                  </button>
                  <AnimatePresence>
                    {expandedBenefits.support && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden text-xs text-[#594047] leading-relaxed pt-1.5 pl-6"
                      >
                        Operational SLA ticket response drop from 48 hours to under 6 hours for verified Silver levels. Direct priority phone hotline with support managers during busy marketplace windows.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* MILESTONE JOURNEY TIMELINE STEPPER */}
            <div className="rounded-2xl bg-white border border-[#e5e2dd] p-5 shadow-xs flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-black text-[#1c1c19] uppercase tracking-wide">Milestone Journey</h3>
                <TrendingUp className="w-5 h-5 text-[#b1005e]" />
              </div>

              {/* Vertical Stepper timeline */}
              <div className="relative pl-6 space-y-6">
                {/* Spine */}
                <div className="absolute left-2.5 top-2 bottom-3 w-0.5 bg-[#e5e2dd]"></div>

                {/* Step 1: Joined */}
                <div className="relative flex items-start gap-3">
                  <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#b1005e] flex items-center justify-center text-white">
                    <Check className="w-3 h-3 font-bold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="text-xs font-black text-[#1c1c19]">Joined Programme</span>
                      <span className="text-[10px] text-[#594047] font-bold">Oct 2024</span>
                    </div>
                    <p className="text-xs text-[#594047] mt-0.5">KYC approved &amp; baseline documentation signed off.</p>
                  </div>
                </div>

                {/* Step 2: 1st Verified Shop */}
                <div className="relative flex items-start gap-3">
                  <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#b1005e] flex items-center justify-center text-white">
                    <Check className="w-3 h-3 font-bold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="text-xs font-black text-[#1c1c19]">1st Verified Shop</span>
                      <span className="text-[10px] text-[#594047] font-bold">Oct 2024</span>
                    </div>
                    <p className="text-xs text-[#594047] mt-0.5">First dynamic partner QR scanner configured and verified.</p>
                  </div>
                </div>

                {/* Step 3: Growth Partner Unlocked */}
                <div className="relative flex items-start gap-3">
                  <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#b1005e] flex items-center justify-center text-white">
                    <Check className="w-3 h-3 font-bold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="text-xs font-black text-[#b1005e]">Growth Partner Unlocked</span>
                      <span className="text-[10px] text-[#8e4767] font-extrabold">Nov 2024</span>
                    </div>
                    <p className="text-xs text-[#594047] mt-0.5">Surpassed initial 6 referred salons threshold.</p>
                  </div>
                </div>

                {/* Step 4: Silver Target */}
                <div className="relative flex items-start gap-3">
                  <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-white border border-[#e5e2dd] flex items-center justify-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#b1005e] animate-pulse"></span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="text-xs font-black text-[#1c1c19]">Silver Partner Benchmark</span>
                      <span className="text-xs font-black text-[#b1005e]">{currentData.statQualifying} Done</span>
                    </div>
                    <p className="text-xs text-[#594047] mt-0.5">Current active sprint run-rate targets.</p>
                  </div>
                </div>

                {/* Step 5: District Target */}
                <div className="relative flex items-start gap-3">
                  <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#f6f3ee] border border-[#e5e2dd] flex items-center justify-center text-[#8d6f77]">
                    <Clock className="w-3 h-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="text-xs font-bold text-[#594047]">District Lead Benchmark</span>
                      <span className="text-[10px] text-[#594047]">Long Term</span>
                    </div>
                    <p className="text-xs text-[#594047] mt-0.5">Sustained regional cluster merchant transactions required.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* PARTNER MOTIVATION STORIES HERO */}
            <div className="rounded-2xl overflow-hidden bg-[#f6f3ee] border border-[#e5e2dd] shadow-xs relative">
              <img
                className="w-full h-36 object-cover object-center brightness-90"
                referrerPolicy="no-referrer"
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800"
                alt="Partner community motivation"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c19]/90 via-[#1c1c19]/35 to-transparent flex flex-col justify-end p-4 text-white">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#ffe088]">Community Milestone Success</span>
                <p className="text-xs font-bold leading-snug mt-1 text-[#fcf9f4]">
                  94% of Silver Partners successfully transition into high-yielding territory leads within 90 days.
                </p>
              </div>
            </div>

            {/* LEGAL DISCLAIMER notice */}
            <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] space-y-1.5">
              <div className="flex items-center gap-1.5 text-[#594047]">
                <Info className="w-4 h-4 shrink-0 text-[#b1005e]" />
                <span className="text-[10px] uppercase font-black tracking-wider text-[#8e4767]">Legal &amp; Compliance Notice</span>
              </div>
              <p className="text-[11px] text-[#594047] leading-relaxed">
                Levels reflect promotional operational progress milestone blocks. Standard payouts and referral commissions (10%, 5%, 2%) remain strictly governed per signed-off field agreements. Custom soundboxes allocation is strictly subject to regional compliance guidelines.
              </p>
            </div>

            {/* HELP BANNER CALLOUT */}
            <div className="p-4 rounded-2xl bg-white border border-[#e5e2dd] flex items-center justify-between shadow-xs">
              <div className="min-w-0 pr-2">
                <span className="text-xs font-black text-[#1c1c19] block truncate">Need Tier Re-evaluation?</span>
                <span className="text-xs text-[#594047] block truncate">Submit pending shop receipts here</span>
              </div>
              <button
                onClick={handleContactOps}
                className="min-h-[44px] px-4 rounded-full bg-[#f6f3ee] hover:bg-[#ebe8e3] text-[#b1005e] text-xs font-extrabold border border-[#ffd9e2] transition-colors shrink-0 cursor-pointer"
                type="button"
              >
                Contact Ops
              </button>
            </div>
          </div>
        )}
      </main>

      {/* FLOAT TOAST FEEDBACK */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ y: 50, opacity: 0, x: '-50%' }}
            animate={{ y: 0, opacity: 1, x: '-50%' }}
            exit={{ y: 50, opacity: 0, x: '-50%' }}
            className="fixed bottom-24 left-1/2 z-50 px-5 py-3 rounded-full bg-[#1c1c19] text-[#fcf9f4] text-xs font-bold shadow-2xl flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-[#ffe088]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
