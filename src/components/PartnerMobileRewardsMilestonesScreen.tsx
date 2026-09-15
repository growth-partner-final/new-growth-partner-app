import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  CheckCircle2,
  Truck,
  Lock,
  Shield,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Sparkles,
  Gift,
  FileText,
  Download,
  ChevronRight,
  ArrowRight,
  X,
  Search,
  Info,
  TrendingUp,
  Laptop,
  Smartphone,
  Bike,
  Car,
  Store,
  Users,
  QrCode,
  Wallet,
  Receipt,
  MapPin,
  Copy,
  Check,
  HelpCircle,
  Share2,
  RotateCcw,
  Sliders,
  Eye,
  Activity,
  Layers,
  BarChart3,
  ExternalLink,
  Zap,
  Phone,
  Radio,
  Building,
  Edit3,
  ChevronDown,
  ChevronUp,
  PackageCheck,
  Shirt,
  Tablet,
  Navigation,
  CheckCheck,
  Compass,
  FileCheck,
  Flame,
  BadgePercent,
  Timer
} from 'lucide-react';

interface PartnerMobileRewardsMilestonesScreenProps {
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
  onNavigateToMilestoneUnlock?: () => void;
}

export const PartnerMobileRewardsMilestonesScreen: React.FC<PartnerMobileRewardsMilestonesScreenProps> = ({
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
  onNavigateToMilestoneUnlock
}) => {
  // Category Filter Tabs
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'claimed' | 'locked'>('all');

  // Bottom Navigation Active Item
  const [activeBottomNav, setActiveBottomNav] = useState<'overview' | 'referral' | 'salons' | 'status' | 'rewards'>('rewards');

  // Modals & Drawers
  const [podModalOpen, setPodModalOpen] = useState(false);
  const [assetDetailsModalOpen, setAssetDetailsModalOpen] = useState(false);
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);

  // Quick invite toast
  const [copiedLink, setCopiedLink] = useState(false);

  // Compliance accordion state
  const [complianceOpen, setComplianceOpen] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://nexora.network/join?ref=NEX-88219');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleOpenPod = () => {
    setPodModalOpen(true);
  };

  const handleOpenAssetDetails = () => {
    setAssetDetailsModalOpen(true);
  };

  const handleOpenTracking = () => {
    setTrackingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fcf9f4] text-[#1c1c19] flex flex-col justify-between max-w-md mx-auto shadow-2xl relative border-x border-[#e5e2dd] select-none pb-24">
      {/* MOBILE STICKY TOP APP BAR */}
      <header className="fixed top-0 max-w-md w-full z-50 pt-safe bg-[#fcf9f4]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#f0ede9]">
        <div className="h-16 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="w-7 h-7 rounded-lg bg-[#b1005e] text-white font-black text-sm flex items-center justify-center shadow-xs">
                N
              </span>
              <span className="font-extrabold text-xl text-[#b1005e] tracking-tight">Nexora</span>
            </div>
            <span className="bg-[#ffe088] text-[#241a00] text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-xs">
              NEX-88219
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopyLink}
              aria-label="Share Link"
              className="w-10 h-10 flex items-center justify-center text-[#594047] hover:text-[#b1005e] transition-colors rounded-full active:scale-95"
              type="button"
            >
              {copiedLink ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
            </button>
            <button
              aria-label="Notifications"
              className="w-10 h-10 flex items-center justify-center text-[#594047] hover:text-[#b1005e] transition-colors rounded-full active:scale-95 relative"
              type="button"
            >
              <Activity className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#b1005e]"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#b1005e] flex items-center justify-center shrink-0 shadow-xs text-white text-xs font-bold">
              MV
            </div>
          </div>
        </div>
      </header>

      {/* MAIN MOBILE STREAM CONTENT */}
      <main className="flex flex-col relative w-full pt-16 px-4 pb-6 space-y-4">
        {/* Partner Header Status Card */}
        <div className="relative overflow-hidden rounded-2xl bg-[#ffffff] shadow-sm p-4 flex flex-col gap-3 border border-[#f0ede9] mt-2">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <h2 className="text-lg font-bold text-[#1c1c19]">Marcus Vance</h2>
                <ShieldCheck className="w-4 h-4 text-[#cca730]" />
              </div>
              <p className="text-xs font-semibold text-[#594047]">NEX-88219 • District Partner</p>
            </div>
            <span className="bg-[#ffe088] text-[#241a00] text-[11px] font-extrabold px-3 py-1 rounded-full flex items-center gap-1 shadow-xs">
              <Award className="w-3.5 h-3.5" />
              <span>Gold Accelerator</span>
            </span>
          </div>

          {/* Qualified Salons Metric */}
          <div className="flex items-baseline justify-between pt-1 border-t border-[#f6f3ee]">
            <div className="flex flex-col">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#594047]">
                Qualified Salons
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-[#b1005e] tracking-tight">118</span>
                <span className="text-xs font-semibold text-[#8e4767]">Active Merchants</span>
              </div>
            </div>
            <div className="text-right flex flex-col items-end">
              <span className="text-[11px] font-semibold text-[#594047]">Next Milestone</span>
              <span className="text-sm font-extrabold text-[#d91b77]">250 Salons</span>
            </div>
          </div>

          {/* Next Reward Target Banner */}
          <div className="rounded-xl bg-[#f6f3ee] p-3 flex flex-col gap-1.5 border border-[#e5e2dd]/60">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#1c1c19] font-bold flex items-center gap-1.5">
                <Bike className="w-4 h-4 text-[#b1005e]" />
                <span>Ather 450X / Ola S1 Pro</span>
              </span>
              <span className="text-[#b1005e] font-extrabold">47.2%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#ebe8e3] overflow-hidden">
              <div className="h-full bg-[#d91b77] rounded-full transition-all duration-500" style={{ width: '47.2%' }}></div>
            </div>
            <p className="text-[11px] text-[#594047] text-right font-medium">
              132 salons remaining to unlock vehicle dispatch
            </p>
          </div>

          {/* Quick Summary Status Pills */}
          <div className="flex items-center gap-2 pt-0.5 overflow-x-auto no-scrollbar">
            <span className="bg-[#fda4c9]/40 text-[#7a3656] text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 3 Claimed
            </span>
            <span className="bg-[#ffd9e2] text-[#3e001d] text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#b1005e]" /> 1 In Progress
            </span>
            <span className="bg-[#ebe8e3] text-[#594047] text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0 flex items-center gap-1">
              <Lock className="w-3 h-3" /> 3 Locked
            </span>
          </div>
        </div>

        {/* PROMPT BANNER FOR MILESTONE 3 (LAPTOP UNLOCK) */}
        {onNavigateToMilestoneUnlock && (
          <div className="bg-gradient-to-r from-[#b1005e] to-[#d91b77] p-3.5 rounded-2xl text-white shadow-md flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shrink-0">
                🎉
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded-full bg-[#ffe088] text-[#241a00] text-[9px] font-extrabold uppercase">
                    UNLOCKED
                  </span>
                  <span className="text-[10px] font-mono text-white/90">#VER-100</span>
                </div>
                <span className="text-xs font-bold leading-tight mt-0.5">
                  Tier 3 Laptop Claim Unlocked (100/100)
                </span>
              </div>
            </div>
            <button
              onClick={onNavigateToMilestoneUnlock}
              className="px-3 py-1.5 rounded-full bg-white text-[#b1005e] font-extrabold text-xs shadow-xs hover:bg-[#ffd9e2] transition-all cursor-pointer whitespace-nowrap"
              type="button"
            >
              Claim
            </button>
          </div>
        )}

        {/* Filter Pills (Scrollable) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#b1005e] text-white shadow-xs'
                : 'bg-[#f0ede9] text-[#594047] hover:bg-[#ebe8e3]'
            }`}
            type="button"
          >
            All 7 Tiers
          </button>
          <button
            onClick={() => setActiveFilter('active')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeFilter === 'active'
                ? 'bg-[#b1005e] text-white shadow-xs'
                : 'bg-[#f0ede9] text-[#594047] hover:bg-[#ebe8e3]'
            }`}
            type="button"
          >
            Active (1)
          </button>
          <button
            onClick={() => setActiveFilter('claimed')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeFilter === 'claimed'
                ? 'bg-[#b1005e] text-white shadow-xs'
                : 'bg-[#f0ede9] text-[#594047] hover:bg-[#ebe8e3]'
            }`}
            type="button"
          >
            Claimed (3)
          </button>
          <button
            onClick={() => setActiveFilter('locked')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeFilter === 'locked'
                ? 'bg-[#b1005e] text-white shadow-xs'
                : 'bg-[#f0ede9] text-[#594047] hover:bg-[#ebe8e3]'
            }`}
            type="button"
          >
            Locked (3)
          </button>
        </div>

        {/* MILESTONE CARDS STREAM */}
        <div className="flex flex-col gap-4">
          {/* Tier 1: Claimed & Delivered */}
          {(activeFilter === 'all' || activeFilter === 'claimed') && (
            <div className="relative overflow-hidden rounded-2xl bg-[#ffffff] shadow-xs p-4 flex flex-col gap-3 border border-[#f0ede9]">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#f6f3ee] flex items-center justify-center shrink-0 border border-[#e5e2dd]">
                    <Shirt className="w-5 h-5 text-[#8e4767]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#8e4767] font-extrabold tracking-wide uppercase">
                      TIER 1 • 25 SALONS
                    </span>
                    <h3 className="text-sm font-bold text-[#1c1c19]">Official Nexora Partner T-Shirt</h3>
                  </div>
                </div>
                <span className="bg-[#f0ede9] text-[#1c1c19] text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0">
                  <Truck className="w-3.5 h-3.5 text-[#b1005e]" /> Delivered
                </span>
              </div>
              <div className="rounded-xl bg-[#f6f3ee] p-3 flex flex-col gap-1 border border-[#e5e2dd]/60">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#1c1c19] font-semibold">Requirement Completed</span>
                  <span className="text-[#8e4767] font-bold">25 / 25 (100%)</span>
                </div>
                <p className="text-[11px] text-[#594047]">Delivered Oct 14 • BlueDart Waybill #88391023</p>
              </div>
              <div className="flex justify-end pt-0.5">
                <button
                  onClick={handleOpenPod}
                  className="px-4 py-2 rounded-full bg-[#ebe8e3] hover:bg-[#e5e2dd] text-[#1c1c19] text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-transform cursor-pointer"
                  type="button"
                >
                  <Receipt className="w-3.5 h-3.5" /> View POD
                </button>
              </div>
            </div>
          )}

          {/* Tier 2: Claimed & Delivered */}
          {(activeFilter === 'all' || activeFilter === 'claimed') && (
            <div className="relative overflow-hidden rounded-2xl bg-[#ffffff] shadow-xs p-4 flex flex-col gap-3 border border-[#f0ede9]">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#f6f3ee] flex items-center justify-center shrink-0 border border-[#e5e2dd]">
                    <Tablet className="w-5 h-5 text-[#8e4767]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#8e4767] font-extrabold tracking-wide uppercase">
                      TIER 2 • 50 SALONS
                    </span>
                    <h3 className="text-sm font-bold text-[#1c1c19]">Samsung Galaxy Tab A9+</h3>
                  </div>
                </div>
                <span className="bg-[#f0ede9] text-[#1c1c19] text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0">
                  <CheckCheck className="w-3.5 h-3.5 text-[#b1005e]" /> Delivered
                </span>
              </div>
              <div className="rounded-xl bg-[#f6f3ee] p-3 flex flex-col gap-1 border border-[#e5e2dd]/60">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#1c1c19] font-semibold">Requirement Completed</span>
                  <span className="text-[#8e4767] font-bold">50 / 50 (100%)</span>
                </div>
                <p className="text-[11px] text-[#594047]">Delivered Nov 02 • Delhivery #449102938</p>
              </div>
              <div className="flex justify-end pt-0.5">
                <button
                  onClick={handleOpenAssetDetails}
                  className="px-4 py-2 rounded-full bg-[#ebe8e3] hover:bg-[#e5e2dd] text-[#1c1c19] text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-transform cursor-pointer"
                  type="button"
                >
                  <Laptop className="w-3.5 h-3.5" /> Asset Details
                </button>
              </div>
            </div>
          )}

          {/* Tier 3: Dispatched & In-Transit */}
          {(activeFilter === 'all' || activeFilter === 'claimed') && (
            <div className="relative overflow-hidden rounded-2xl bg-[#ffffff] shadow-xs p-4 flex flex-col gap-3 border border-[#f0ede9]">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#ffd8e5] flex items-center justify-center shrink-0 border border-[#fda4c9]">
                    <Laptop className="w-5 h-5 text-[#3c0223]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#8e4767] font-extrabold tracking-wide uppercase">
                      TIER 3 • 100 SALONS
                    </span>
                    <h3 className="text-sm font-bold text-[#1c1c19]">Nexora Enterprise HP Laptop</h3>
                  </div>
                </div>
                <span className="bg-[#8e4767] text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0 shadow-xs">
                  <Truck className="w-3.5 h-3.5" /> Dispatched
                </span>
              </div>
              <div className="rounded-xl bg-[#f6f3ee] p-3 flex flex-col gap-1.5 border border-[#e5e2dd]/60">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#1c1c19] font-semibold">Progress</span>
                  <span className="text-[#b1005e] font-extrabold">100 / 100 (100%)</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#594047] text-xs">
                  <span className="w-2 h-2 rounded-full bg-[#b1005e] animate-pulse"></span>
                  <span>Live Tracker: In-Transit • Arriving in 2 Days</span>
                </div>
              </div>
              <div className="flex justify-end pt-0.5">
                <button
                  onClick={handleOpenTracking}
                  className="px-5 py-2 rounded-full bg-[#b1005e] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform cursor-pointer"
                  type="button"
                >
                  <MapPin className="w-3.5 h-3.5" /> Track Shipment
                </button>
              </div>
            </div>
          )}

          {/* Tier 4: Active Target (Electric Scooter) */}
          {(activeFilter === 'all' || activeFilter === 'active') && (
            <div className="relative overflow-hidden rounded-2xl bg-[#ffffff] shadow-md p-4 flex flex-col gap-3.5 bg-gradient-to-br from-[#ffffff] via-[#ffd9e2]/20 to-[#ffffff] border-2 border-[#d91b77]">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#d91b77] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Bike className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#b1005e] font-extrabold tracking-wider uppercase">
                      ACTIVE PERFORMANCE GOAL
                    </span>
                    <h3 className="text-base font-bold text-[#1c1c19]">Ather 450X / Ola S1 Pro</h3>
                  </div>
                </div>
                <span className="bg-[#d91b77] text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shrink-0 shadow-xs">
                  <TrendingUp className="w-3.5 h-3.5" /> In Progress
                </span>
              </div>

              {/* Vehicle Image Banner */}
              <div className="h-36 w-full rounded-xl overflow-hidden relative shadow-xs">
                <img
                  className="w-full h-full object-cover"
                  alt="Modern high tech electric scooter"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkBkbjlseQ4tGKkyrQEWMbpcm81JO6maHYze4dH4z7gzrwAir1n-Oood-SQaiv36UDtt_lL1l2rjpxAdpj84BtTk7_LjqssNQ5DQwia0aPwuUvyBJRQNZwpndmLnESyigQuP75qmHtQpfJIAypxJ11LqlkOskLdeTSpb9zlgW3J-7pgbmjtsLsurcDUqkTtuTVQqlirG3vwJh0jPzsnVTn3svO4iplaaHuH8bNUgIPq1KJUZclXwYI"
                />
                <div className="absolute bottom-2 left-2 bg-[#31302d]/85 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[11px] font-bold">
                  Brand New Dual Disc Edition
                </div>
              </div>

              <div className="rounded-xl bg-[#f6f3ee] p-3 flex flex-col gap-1.5 border border-[#e5e2dd]">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#1c1c19] font-bold">118 / 250 Qualified Salons</span>
                  <span className="bg-[#b1005e] text-white px-2 py-0.5 rounded-full text-[10px] font-extrabold">
                    47.2%
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[#ebe8e3] overflow-hidden">
                  <div
                    className="h-full bg-[#b1005e] rounded-full transition-all duration-500"
                    style={{ width: '47.2%' }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-[11px] pt-0.5">
                  <span className="text-[#b1005e] font-bold">132 more salon activations needed</span>
                  <span className="text-[#594047]">Tier 4 Target</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 pt-0.5">
                <button
                  disabled
                  className="w-full py-3 rounded-full bg-[#e5e2dd] text-[#594047] text-xs font-bold flex items-center justify-center gap-2 cursor-not-allowed opacity-90 shadow-none"
                  type="button"
                >
                  <Lock className="w-4 h-4" /> Claim Locked (Need 132 Salons)
                </button>
                <button
                  onClick={() => setQrModalOpen(true)}
                  className="flex items-center justify-center gap-1 text-xs text-[#b1005e] font-bold py-1 hover:underline cursor-pointer"
                  type="button"
                >
                  <QrCode className="w-4 h-4" /> Speed up activations with Referral QR
                </button>
              </div>
            </div>
          )}

          {/* Tier 5: Locked (iPhone Pro Max) */}
          {(activeFilter === 'all' || activeFilter === 'locked') && (
            <div className="relative overflow-hidden rounded-2xl bg-[#f6f3ee] p-4 flex flex-col gap-3 border border-[#e5e2dd] opacity-90">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#ebe8e3] flex items-center justify-center shrink-0 border border-[#e5e2dd]">
                    <Smartphone className="w-5 h-5 text-[#594047]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#594047] font-bold tracking-wide uppercase">
                      TIER 5 • 500 SALONS
                    </span>
                    <h3 className="text-sm font-bold text-[#1c1c19]">Apple iPhone 15 Pro Max</h3>
                  </div>
                </div>
                <span className="bg-[#ebe8e3] text-[#594047] text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0">
                  <Lock className="w-3.5 h-3.5" /> Locked
                </span>
              </div>
              <div className="rounded-xl bg-[#f0ede9] p-3 flex flex-col gap-1 border border-[#e5e2dd]/60">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#594047] font-semibold">Progress Ratio</span>
                  <span className="text-[#594047] font-bold">118 / 500 Salons</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#e5e2dd] overflow-hidden">
                  <div className="h-full bg-[#8e4767] rounded-full" style={{ width: '23.6%' }}></div>
                </div>
                <p className="text-[11px] text-[#594047] text-right">382 activations remaining</p>
              </div>
            </div>
          )}

          {/* Tier 6: Locked (Royal Enfield) */}
          {(activeFilter === 'all' || activeFilter === 'locked') && (
            <div className="relative overflow-hidden rounded-2xl bg-[#f6f3ee] p-4 flex flex-col gap-3 border border-[#e5e2dd] opacity-90">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#ebe8e3] flex items-center justify-center shrink-0 border border-[#e5e2dd]">
                    <Bike className="w-5 h-5 text-[#594047]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#594047] font-bold tracking-wide uppercase">
                      TIER 6 • 750 SALONS
                    </span>
                    <h3 className="text-sm font-bold text-[#1c1c19]">Royal Enfield Classic 350 CC</h3>
                  </div>
                </div>
                <span className="bg-[#ebe8e3] text-[#594047] text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0">
                  <Lock className="w-3.5 h-3.5" /> Locked
                </span>
              </div>
              <div className="rounded-xl bg-[#f0ede9] p-3 flex flex-col gap-1 border border-[#e5e2dd]/60">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#594047] font-semibold">Progress Ratio</span>
                  <span className="text-[#594047] font-bold">118 / 750 Salons</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#e5e2dd] overflow-hidden">
                  <div className="h-full bg-[#8e4767] rounded-full" style={{ width: '15.7%' }}></div>
                </div>
                <p className="text-[11px] text-[#594047] text-right">632 activations remaining</p>
              </div>
            </div>
          )}

          {/* Tier 7: Locked (Mahindra XUV700 SUV) */}
          {(activeFilter === 'all' || activeFilter === 'locked') && (
            <div className="relative overflow-hidden rounded-2xl bg-[#f6f3ee] p-4 flex flex-col gap-3 border border-[#e5e2dd] opacity-95">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#ffe088] flex items-center justify-center shrink-0 border border-[#cca730]">
                    <Car className="w-5 h-5 text-[#241a00]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#735c00] font-extrabold tracking-wide uppercase">
                      PINNACLE TIER 7 • 1,000+ SALONS
                    </span>
                    <h3 className="text-sm font-bold text-[#1c1c19]">Mahindra XUV700 Partner SUV</h3>
                  </div>
                </div>
                <span className="bg-[#ffe088] text-[#241a00] text-[11px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" /> Pinnacle
                </span>
              </div>

              <div className="h-32 w-full rounded-xl overflow-hidden relative shadow-xs">
                <img
                  className="w-full h-full object-cover"
                  alt="Luxurious dark metallic SUV driving on highway"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAE1sNJr9V1ZCR07TqoM3CPhqJ5a0gQrnxB2yYGdsTSHagSY22QNkywlOBbj4RZr9LPNrw6Brge0qc2hhL9-sQmKGA4JW3KAQwCJW052f0ZAF5dLjxWoEUqnqU8pbWQ1pJVSIlCQlexfTElBhAct-8sfUoYP3Ihuv42qC0z16JcSbR1el92rcub9x3h9GciUKNi1QizK3AciOOErMFuk6jaNyncKjRP5DyqKlX5VIl-UVkqdrM0my3b"
                />
                <div className="absolute inset-0 bg-[#31302d]/40 flex items-center justify-center">
                  <span className="bg-[#ffffff]/90 backdrop-blur-md px-3 py-1 rounded-full text-xs text-[#1c1c19] font-bold flex items-center gap-1 shadow-sm">
                    <Award className="w-3.5 h-3.5 text-[#b1005e]" /> District Director Honor
                  </span>
                </div>
              </div>

              <div className="rounded-xl bg-[#f0ede9] p-3 flex flex-col gap-1 border border-[#e5e2dd]/60">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#594047] font-semibold">Progress Ratio</span>
                  <span className="text-[#594047] font-bold">118 / 1,000 Salons</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#e5e2dd] overflow-hidden">
                  <div className="h-full bg-[#cca730] rounded-full" style={{ width: '11.8%' }}></div>
                </div>
                <p className="text-[11px] text-[#594047] text-right">882 activations remaining</p>
              </div>
            </div>
          )}
        </div>

        {/* Compliance & Help Section */}
        <div className="rounded-2xl bg-[#f0ede9] p-4 flex flex-col gap-3 border border-[#e5e2dd] mt-2">
          <div>
            <button
              onClick={() => setComplianceOpen(!complianceOpen)}
              className="w-full flex items-center justify-between text-xs font-bold text-[#1c1c19] cursor-pointer"
              type="button"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#b1005e]" />
                <span>Asset Terms &amp; Compliance</span>
              </span>
              {complianceOpen ? (
                <ChevronUp className="w-4 h-4 text-[#8d6f77]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#8d6f77]" />
              )}
            </button>
            {complianceOpen && (
              <div className="pt-2.5 flex flex-col gap-2 text-[11px] text-[#594047] border-t border-[#e5e2dd]/60 mt-2">
                <p>
                  • <strong>Strict Non-Cash Policy:</strong> No cash encashment or wallet credit available. Non-transferable physical merchant performance grants solely issued in partner's verified entity name.
                </p>
                <p>
                  • <strong>Verification Standard:</strong> 30-day minimum terminal activity verification required per onboarded salon prior to release.
                </p>
                <p>
                  • <strong>Registration &amp; Insurance:</strong> RTO registration, insurance, and road taxes for automotive tiers are processed in partnership with regional dealer hubs.
                </p>
              </div>
            )}
          </div>

          <div className="pt-1">
            <button
              onClick={() => alert('Connecting to Merchant Logistics Support Desk on WhatsApp (+91 80 4910 8820)...')}
              className="w-full py-3 rounded-full bg-[#ebe8e3] hover:bg-[#e5e2dd] text-[#1c1c19] text-xs font-bold flex items-center justify-center gap-2 shadow-xs active:scale-95 transition-transform cursor-pointer"
              type="button"
            >
              <Phone className="w-4 h-4 text-[#b1005e]" />
              <span>Questions regarding delivery? Chat with Logistics</span>
            </button>
          </div>
        </div>
      </main>

      {/* FIXED MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="fixed bottom-0 max-w-md w-full z-50 pb-safe bg-[#fcf9f4]/90 backdrop-blur-xl shadow-[0_-1px_12px_rgba(74,14,46,0.06)] border-t border-[#f0ede9]">
        <div className="flex justify-around items-center h-16 px-2">
          <button
            onClick={() => onNavigateToHub && onNavigateToHub()}
            className="flex flex-col items-center justify-center w-14 h-12 text-[#594047] hover:text-[#b1005e] transition-colors cursor-pointer"
            type="button"
          >
            <Store className="w-5 h-5" />
            <span className="text-[10px] font-bold mt-0.5">Overview</span>
          </button>

          <button
            onClick={() => onNavigateToShareEarn && onNavigateToShareEarn()}
            className="flex flex-col items-center justify-center w-14 h-12 text-[#594047] hover:text-[#b1005e] transition-colors cursor-pointer"
            type="button"
          >
            <QrCode className="w-5 h-5" />
            <span className="text-[10px] font-bold mt-0.5">Referral</span>
          </button>

          <button
            onClick={() => onNavigateToSalonIntelligence && onNavigateToSalonIntelligence()}
            className="flex flex-col items-center justify-center w-14 h-12 text-[#594047] hover:text-[#b1005e] transition-colors cursor-pointer"
            type="button"
          >
            <Users className="w-5 h-5" />
            <span className="text-[10px] font-bold mt-0.5">Salons</span>
          </button>

          <button
            onClick={() => onNavigateToReferralTimeline && onNavigateToReferralTimeline()}
            className="flex flex-col items-center justify-center w-14 h-12 text-[#594047] hover:text-[#b1005e] transition-colors cursor-pointer"
            type="button"
          >
            <Activity className="w-5 h-5" />
            <span className="text-[10px] font-bold mt-0.5">Status</span>
          </button>

          <button
            onClick={() => setActiveBottomNav('rewards')}
            className="flex flex-col items-center justify-center w-14 h-12 text-[#b1005e] font-bold cursor-pointer"
            type="button"
          >
            <Award className="w-5 h-5 text-[#b1005e]" />
            <span className="text-[10px] font-extrabold mt-0.5 text-[#b1005e]">Rewards</span>
          </button>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* INTERACTIVE MODALS FOR MOBILE                                              */}
      {/* ========================================================================= */}

      {/* 1. PROOF OF DELIVERY (POD) MODAL */}
      <AnimatePresence>
        {podModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#31302d]/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#ffffff] rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-[#e5e2dd] flex flex-col gap-4"
            >
              <div className="flex items-center justify-between border-b border-[#f0ede9] pb-3">
                <div className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-[#b1005e]" />
                  <h3 className="text-base font-bold text-[#1c1c19]">Proof of Delivery (POD)</h3>
                </div>
                <button
                  onClick={() => setPodModalOpen(false)}
                  className="w-7 h-7 rounded-full bg-[#f0ede9] hover:bg-[#ebe8e3] flex items-center justify-center text-[#594047] cursor-pointer"
                  type="button"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-[#f6f3ee] rounded-xl flex flex-col gap-1.5 border border-[#e5e2dd]">
                  <div className="flex justify-between">
                    <span className="text-[#594047]">Consignment Number</span>
                    <span className="font-mono font-bold text-[#1c1c19]">BLD-88391023</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#594047]">Recipient Name</span>
                    <span className="font-bold text-[#1c1c19]">Marcus Vance</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#594047]">Delivered Date</span>
                    <span className="font-bold text-emerald-700">Oct 14, 2024 • 14:32 IST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#594047]">Carrier</span>
                    <span className="font-bold text-[#1c1c19]">BlueDart Air Cargo</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span>Physical signature &amp; OTP verification verified on record.</span>
                </div>
              </div>

              <button
                onClick={() => setPodModalOpen(false)}
                className="w-full py-2.5 rounded-full bg-[#b1005e] text-white text-xs font-bold shadow-xs hover:bg-[#d91b77] cursor-pointer"
                type="button"
              >
                Close Receipt
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. ASSET DETAILS MODAL */}
      <AnimatePresence>
        {assetDetailsModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#31302d]/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#ffffff] rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-[#e5e2dd] flex flex-col gap-4"
            >
              <div className="flex items-center justify-between border-b border-[#f0ede9] pb-3">
                <div className="flex items-center gap-2">
                  <Tablet className="w-5 h-5 text-[#b1005e]" />
                  <h3 className="text-base font-bold text-[#1c1c19]">Samsung Tab A9+ Spec</h3>
                </div>
                <button
                  onClick={() => setAssetDetailsModalOpen(false)}
                  className="w-7 h-7 rounded-full bg-[#f0ede9] hover:bg-[#ebe8e3] flex items-center justify-center text-[#594047] cursor-pointer"
                  type="button"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-[#f6f3ee] rounded-xl flex flex-col gap-1 border border-[#e5e2dd]">
                  <span className="text-[10px] text-[#594047] font-bold uppercase">Hardware Details</span>
                  <div className="flex justify-between py-0.5">
                    <span className="text-[#594047]">Model</span>
                    <span className="font-bold text-[#1c1c19]">Galaxy Tab A9+ 5G (64GB)</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-[#594047]">Serial / IMEI</span>
                    <span className="font-mono text-[#1c1c19]">358291049281923</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span className="text-[#594047]">Warranty</span>
                    <span className="text-emerald-700 font-bold">1-Yr Samsung Care+ Active</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setAssetDetailsModalOpen(false)}
                className="w-full py-2.5 rounded-full bg-[#b1005e] text-white text-xs font-bold shadow-xs hover:bg-[#d91b77] cursor-pointer"
                type="button"
              >
                Close Details
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. LIVE TRACKING MODAL */}
      <AnimatePresence>
        {trackingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#31302d]/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#ffffff] rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-[#e5e2dd] flex flex-col gap-4"
            >
              <div className="flex items-center justify-between border-b border-[#f0ede9] pb-3">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#b1005e]" />
                  <h3 className="text-base font-bold text-[#1c1c19]">Live Consignment Tracker</h3>
                </div>
                <button
                  onClick={() => setTrackingModalOpen(false)}
                  className="w-7 h-7 rounded-full bg-[#f0ede9] hover:bg-[#ebe8e3] flex items-center justify-center text-[#594047] cursor-pointer"
                  type="button"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-[#f6f3ee] rounded-xl flex items-center justify-between border border-[#e5e2dd]">
                  <div>
                    <span className="text-[10px] text-[#594047] uppercase font-bold">Waybill</span>
                    <p className="font-mono font-bold text-[#1c1c19]">BLD-NX-99201</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    In-Transit
                  </span>
                </div>

                <div className="space-y-2 relative pl-4 border-l-2 border-[#b1005e]">
                  <div className="relative">
                    <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#b1005e]"></span>
                    <p className="font-bold text-[#1c1c19]">Out for Regional Hub Connection</p>
                    <span className="text-[10px] text-[#594047]">Bangalore Air Cargo Terminal • Today 09:30</span>
                  </div>
                  <div className="relative pt-2 opacity-70">
                    <span className="absolute -left-[21px] top-3 w-2.5 h-2.5 rounded-full bg-[#e5e2dd]"></span>
                    <p className="font-semibold text-[#1c1c19]">Custom Engraving Cleared</p>
                    <span className="text-[10px] text-[#594047]">Nexora Hardware Lab • Yesterday</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setTrackingModalOpen(false)}
                className="w-full py-2.5 rounded-full bg-[#b1005e] text-white text-xs font-bold shadow-xs hover:bg-[#d91b77] cursor-pointer"
                type="button"
              >
                Close Tracker
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. SPEED UP QR MODAL */}
      <AnimatePresence>
        {qrModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#31302d]/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#ffffff] rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-[#e5e2dd] flex flex-col gap-4 text-center items-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#ffd9e2] text-[#b1005e] flex items-center justify-center">
                <QrCode className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-base font-bold text-[#1c1c19]">Your Partner Referral QR</h3>
                <p className="text-xs text-[#594047] mt-1">
                  Present this QR to salon directors during on-site meetings for instant attribution.
                </p>
              </div>

              {/* QR Container */}
              <div className="p-4 bg-[#ffffff] rounded-2xl border-2 border-dashed border-[#b1005e] shadow-sm flex flex-col items-center">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://nexora.network/join?ref=NEX-88219"
                  alt="Referral QR Code"
                  className="w-36 h-36 rounded-lg"
                />
                <span className="text-xs font-mono font-bold text-[#b1005e] mt-2">NEX-88219</span>
              </div>

              <div className="flex gap-2 w-full">
                <button
                  onClick={handleCopyLink}
                  className="flex-1 py-2.5 rounded-full bg-[#b1005e] text-white text-xs font-bold shadow-xs hover:bg-[#d91b77] cursor-pointer flex items-center justify-center gap-1.5"
                  type="button"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                </button>
                <button
                  onClick={() => setQrModalOpen(false)}
                  className="px-4 py-2.5 rounded-full bg-[#f0ede9] text-[#1c1c19] text-xs font-bold hover:bg-[#ebe8e3] cursor-pointer"
                  type="button"
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
