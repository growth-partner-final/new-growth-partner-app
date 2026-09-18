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
  Coins,
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
  Calendar,
  MapPin,
  Copy,
  Check,
  HelpCircle,
  Send,
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
  CheckCheck,
  Building,
  Edit3,
  ChevronDown,
  ChevronUp,
  PackageCheck,
  Sparkle
} from 'lucide-react';

interface PartnerMilestoneUnlockCelebrationScreenProps {
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
}

export const PartnerMilestoneUnlockCelebrationScreen: React.FC<PartnerMilestoneUnlockCelebrationScreenProps> = ({
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
  onNavigateToRewardsMilestones
}) => {
  // Modal visibility & view mode
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [viewMode, setViewMode] = useState<'modal' | 'embedded'>('modal');

  // Interactive Claim State
  const [claimState, setClaimState] = useState<'initial' | 'locking' | 'dispatched'>('initial');
  const [dispatchedTrackingId, setDispatchedTrackingId] = useState<string>('BLD-991823');

  // Form State
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressData, setAddressData] = useState({
    suite: 'Prestige Technostar, Suite 402, 4th Floor',
    street: 'Brookefield Main Road, IT Corridor, Bengaluru, Karnataka 560066',
    landmark: 'Opposite SAP Labs Campus Gate 2',
    phone: '+91 98421 04472',
    carrier: 'BlueDart Express'
  });

  // Statutory Declarations Checkboxes
  const [nonTransferableChecked, setNonTransferableChecked] = useState(true);
  const [merchantVeracityChecked, setMerchantVeracityChecked] = useState(true);

  // Accordion details toggle
  const [taxNoticeOpen, setTaxNoticeOpen] = useState(true);

  // Quick invite copied state
  const [copiedLink, setCopiedLink] = useState(false);

  // Secondary modals
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [dispatchReceiptOpen, setDispatchReceiptOpen] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://nexora.network/join?ref=REF-5A45019655');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleConfirmClaim = () => {
    if (!nonTransferableChecked || !merchantVeracityChecked) {
      alert('Please accept all statutory declarations before dispatching the asset claim.');
      return;
    }
    setClaimState('locking');
    setTimeout(() => {
      setClaimState('dispatched');
      setDispatchReceiptOpen(true);
    }, 1400);
  };

  const handleResetSimulation = () => {
    setClaimState('initial');
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fcf9f4] text-[#1c1c19] flex relative">
      {/* LEFT SIDEBAR NAVIGATION (Nexora Brand System) */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-[#ffffff] z-40 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-[#f0ede9]">
        <div className="flex flex-col">
          {/* Logo & Platform Branding */}
          <div className="h-20 flex items-center px-6 gap-3 bg-[#ffffff] border-b border-[#f0ede9]">
            <div className="w-10 h-10 rounded-xl bg-[#b1005e] flex items-center justify-center text-white font-black text-xl shadow-sm">
              N
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-[#1c1c19]">NEXORA</span>
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#8e4767]">Growth Partner</span>
            </div>
          </div>

          {/* Partner Identity Card */}
          <div className="px-4 py-3">
            <div className="bg-[#f6f3ee] rounded-xl p-3 flex items-center justify-between border border-[#e5e2dd]/60">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#b1005e]/10 text-[#b1005e] flex items-center justify-center font-bold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#1c1c19]">Growth Partner</span>
                  <span className="text-[10px] text-[#594047] font-mono">REF-5A45019655</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#fda4c9]/40 text-[#7a3656] text-[10px] font-bold">
                Active
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-1 px-3 mt-1 text-sm font-semibold">
            <button
              onClick={() => onNavigateToHub && onNavigateToHub()}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors font-bold text-left cursor-pointer"
              type="button"
            >
              <Store className="w-4 h-4" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => onNavigateToShareEarn && onNavigateToShareEarn()}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors font-bold text-left cursor-pointer"
              type="button"
            >
              <QrCode className="w-4 h-4" />
              <span>My Referral Code</span>
            </button>
            <button
              onClick={() => onNavigateToSalonIntelligence && onNavigateToSalonIntelligence()}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors font-bold text-left cursor-pointer"
              type="button"
            >
              <Users className="w-4 h-4" />
              <span>Referred Salons</span>
            </button>
            <button
              onClick={() => onNavigateToReferralTimeline && onNavigateToReferralTimeline()}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors font-bold text-left cursor-pointer"
              type="button"
            >
              <Activity className="w-4 h-4" />
              <span>Referral Status Timeline</span>
            </button>
            <button
              onClick={() => onNavigateToEarningsLedger && onNavigateToEarningsLedger()}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors font-bold text-left cursor-pointer"
              type="button"
            >
              <Wallet className="w-4 h-4" />
              <span>Earnings &amp; Ledger</span>
            </button>
            <button
              onClick={() => onNavigateToExtraOnboardingReward && onNavigateToExtraOnboardingReward()}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors font-bold text-left cursor-pointer"
              type="button"
            >
              <Gift className="w-4 h-4" />
              <span>Extra Onboarding Reward</span>
            </button>
            <button
              onClick={() => onNavigateToRewardsMilestones && onNavigateToRewardsMilestones()}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#d91b77] text-white font-bold text-left shadow-xs cursor-default"
              type="button"
            >
              <Award className="w-4 h-4" />
              <span>Rewards &amp; Milestones</span>
            </button>
          </nav>
        </div>

        {/* Compliance Footer in Sidebar */}
        <div className="p-4 bg-[#f6f3ee] m-4 rounded-xl flex flex-col gap-1 border border-[#e5e2dd]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#594047] uppercase font-bold tracking-wider">Compliance ID</span>
            <Lock className="w-3.5 h-3.5 text-[#8d6f77]" />
          </div>
          <span className="text-xs font-mono font-bold text-[#1c1c19]">COMPLIANCE-POLICY-AUDITED</span>
          <span className="text-[11px] text-[#594047]">Strict payout audit schedule enabled.</span>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="pl-72 w-full flex flex-col min-h-screen">
        {/* TOP FLOATING APP BAR */}
        <header className="sticky top-0 right-0 h-20 bg-[#fcf9f4]/90 backdrop-blur-xl border-b border-[#f0ede9] z-30 flex items-center justify-between px-4 sm:px-8 lg:px-12 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ebe8e3] border border-[#e5e2dd]">
              <span className="w-2 h-2 rounded-full bg-[#cca730] animate-pulse"></span>
              <span className="text-xs font-bold text-[#594047]">Cycle Sync: Live (T-14:32)</span>
            </div>
            <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffd9e2] text-[#3e001d] font-bold text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#b1005e]" />
              <span>Growth Partner (REF-5A45019655)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Controls */}
            {!isModalOpen && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ffd9e2] text-[#b1005e] font-bold text-xs hover:bg-[#fda4c9] transition-all cursor-pointer"
                type="button"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Re-open Milestone 3 Claim Modal</span>
              </button>
            )}

            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#b1005e] text-white font-bold text-xs shadow-md hover:bg-[#d91b77] transition-all cursor-pointer"
              type="button"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied!' : 'Quick Invite'}</span>
            </button>
            <div className="relative">
              <button
                className="w-9 h-9 rounded-full bg-[#f0ede9] hover:bg-[#ebe8e3] flex items-center justify-center text-[#594047] transition-colors cursor-pointer"
                type="button"
              >
                <Radio className="w-4 h-4 text-[#b1005e]" />
              </button>
              <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-[#b1005e] ring-2 ring-white"></span>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#b1005e] flex items-center justify-center text-white font-bold text-xs shadow-sm">
              MV
            </div>
          </div>
        </header>

        {/* MAIN BODY: BACKGROUND DASHBOARD CONTEXT LAYER */}
        <main className="px-4 sm:px-8 lg:px-12 py-6 space-y-8 flex-1">
          {/* Top KPI Progress Row */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#ffffff] p-6 rounded-xl shadow-xs border border-[#f0ede9] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider text-[#8e4767] font-bold">
                  Verified Lifetime Onboardings
                </span>
                <ShieldCheck className="w-5 h-5 text-[#b1005e]" />
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-4xl font-extrabold text-[#1c1c19]">100</span>
                <span className="text-lg font-semibold text-[#594047]">/ 1,000</span>
              </div>
              <p className="text-xs text-[#594047] mt-2">
                Current Milestone Status: <strong className="text-[#b1005e]">Tier 3 Cleared 100%</strong>
              </p>
            </div>

            <div className="bg-[#ffffff] p-6 rounded-xl shadow-xs border border-[#f0ede9] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider text-[#8e4767] font-bold">
                  Claim Velocity Index
                </span>
                <Zap className="w-5 h-5 text-[#735c00]" />
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-4xl font-extrabold text-[#b1005e]">Top 2%</span>
                <span className="text-xs font-semibold text-[#594047]">Nationwide</span>
              </div>
              <p className="text-xs text-[#594047] mt-2">
                Audit Score: <strong className="text-[#1c1c19]">99.8% clean GMV qualification rate</strong>
              </p>
            </div>

            <div className="bg-[#ffffff] p-6 rounded-xl shadow-xs border border-[#f0ede9] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider text-[#8e4767] font-bold">
                  Cumulative Asset Grants
                </span>
                <Gift className="w-5 h-5 text-[#8d6f77]" />
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-4xl font-extrabold text-[#1c1c19]">₹1,18,000</span>
                <span className="px-2 py-0.5 rounded-full bg-[#ffe088] text-[#241a00] text-[10px] font-bold">
                  EST. VALUE
                </span>
              </div>
              <p className="text-xs text-[#594047] mt-2">
                Includes 2 Delivered Grants &amp; 1 Active Pending Claim
              </p>
            </div>
          </section>

          {/* 7 TIER MILESTONE ROADMAP GRID (Charter Schedule FY24-25) */}
          <section className="bg-[#ffffff] p-6 rounded-xl shadow-xs border border-[#f0ede9]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#8e4767] font-bold">
                  Growth Partner Ladder
                </span>
                <h2 className="text-xl font-bold text-[#1c1c19] mt-0.5">Honor &amp; Asset Tiers</h2>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ffd8e5] text-[#7a3656] text-xs font-bold">
                <Award className="w-4 h-4" />
                <span>Charter Schedule FY24-25</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
              {/* Tier 1: 25 Salons */}
              <div className="p-4 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#594047] font-bold">TIER 1</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#e5e2dd] text-[#1c1c19] text-[10px] font-bold">
                      Delivered
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-[#1c1c19]">25</div>
                  <div className="text-xs font-bold text-[#1c1c19] mt-1">Official Nexora T-Shirt</div>
                  <p className="text-[11px] text-[#594047] mt-1">Premium dry-fit executive polo</p>
                </div>
                <div className="mt-4 pt-2 border-t border-[#e5e2dd] flex items-center gap-1 text-[#8e4767] text-[11px] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Dispatched #NEX-881</span>
                </div>
              </div>

              {/* Tier 2: 50 Salons */}
              <div className="p-4 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#594047] font-bold">TIER 2</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#e5e2dd] text-[#1c1c19] text-[10px] font-bold">
                      Delivered
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-[#1c1c19]">50</div>
                  <div className="text-xs font-bold text-[#1c1c19] mt-1">Samsung Tablet</div>
                  <p className="text-[11px] text-[#594047] mt-1">Galaxy Tab S6 Lite 64GB LTE</p>
                </div>
                <div className="mt-4 pt-2 border-t border-[#e5e2dd] flex items-center gap-1 text-[#8e4767] text-[11px] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Dispatched #NEX-904</span>
                </div>
              </div>

              {/* Tier 3: 100 Salons (ACTIVE / READY) */}
              <div className="p-4 rounded-xl bg-[#ffd9e2] text-[#3e001d] border-2 border-[#b1005e] flex flex-col justify-between shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-12 h-12 bg-[#b1005e]/10 rounded-bl-full pointer-events-none"></div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold text-[#3e001d]">TIER 3</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#b1005e] text-white text-[10px] font-bold animate-pulse">
                      Claim Ready
                    </span>
                  </div>
                  <div className="text-2xl font-extrabold text-[#3e001d]">100</div>
                  <div className="text-xs font-bold text-[#3e001d] mt-1">HP ProBook Laptop</div>
                  <p className="text-[11px] text-[#3e001d]/90 mt-1">15.6" G10 Business Edition</p>
                </div>
                <div className="mt-4 pt-2 border-t border-[#b1005e]/20 flex items-center gap-1 text-[#b1005e] text-[11px] font-extrabold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>100/100 QUALIFIED</span>
                </div>
              </div>

              {/* Tier 4: 250 Salons */}
              <div className="p-4 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#594047] font-bold">TIER 4</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#ebe8e3] text-[#594047] text-[10px] font-bold">
                      Progress
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-[#1c1c19]">250</div>
                  <div className="text-xs font-bold text-[#1c1c19] mt-1">Electric Scooter</div>
                  <p className="text-[11px] text-[#594047] mt-1">Ather 450X Gen-3 Smart EV</p>
                </div>
                <div className="mt-4 pt-2 border-t border-[#e5e2dd] flex items-center gap-1 text-[#594047] text-[11px] font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>100 / 250 Salons</span>
                </div>
              </div>

              {/* Tier 5: 500 Salons */}
              <div className="p-4 rounded-xl bg-[#ebe8e3] opacity-75 border border-[#e5e2dd] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#594047] font-bold">TIER 5</span>
                    <Lock className="w-3.5 h-3.5 text-[#8d6f77]" />
                  </div>
                  <div className="text-2xl font-bold text-[#1c1c19]">500</div>
                  <div className="text-xs font-bold text-[#1c1c19] mt-1">Latest iPhone Pro</div>
                  <p className="text-[11px] text-[#594047] mt-1">256GB Titanium Edition</p>
                </div>
                <div className="mt-4 pt-2 border-t border-[#e5e2dd] text-[11px] text-[#594047]">
                  Requires 400 more
                </div>
              </div>

              {/* Tier 6: 750 Salons */}
              <div className="p-4 rounded-xl bg-[#ebe8e3] opacity-75 border border-[#e5e2dd] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#594047] font-bold">TIER 6</span>
                    <Lock className="w-3.5 h-3.5 text-[#8d6f77]" />
                  </div>
                  <div className="text-2xl font-bold text-[#1c1c19]">750</div>
                  <div className="text-xs font-bold text-[#1c1c19] mt-1">Royal Enfield 350</div>
                  <p className="text-[11px] text-[#594047] mt-1">Hunter 350 Dapper Grey</p>
                </div>
                <div className="mt-4 pt-2 border-t border-[#e5e2dd] text-[11px] text-[#594047]">
                  Requires 650 more
                </div>
              </div>

              {/* Tier 7: 1000+ Salons */}
              <div className="p-4 rounded-xl bg-[#ebe8e3] opacity-75 border border-[#e5e2dd] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#735c00] font-bold">APEX</span>
                    <Lock className="w-3.5 h-3.5 text-[#8d6f77]" />
                  </div>
                  <div className="text-2xl font-bold text-[#1c1c19]">1000+</div>
                  <div className="text-xs font-bold text-[#1c1c19] mt-1">District Partner SUV</div>
                  <p className="text-[11px] text-[#594047] mt-1">Hyundai Creta SX Executive</p>
                </div>
                <div className="mt-4 pt-2 border-t border-[#e5e2dd] text-[11px] text-[#735c00] font-bold">
                  Charter Pinnacle Grant
                </div>
              </div>
            </div>
          </section>

          {/* SIMULATION RESET / QUICK CONTROLS */}
          <div className="flex items-center justify-between bg-[#f6f3ee] p-4 rounded-xl border border-[#e5e2dd]">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-[#594047]">Verification Protocol Simulation:</span>
              <span className="text-xs text-[#1c1c19]">
                State: <strong className="text-[#b1005e] uppercase">{claimState}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleResetSimulation}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ffffff] text-xs font-bold text-[#594047] hover:text-[#1c1c19] border border-[#e5e2dd] shadow-xs cursor-pointer"
                type="button"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Simulation</span>
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* ========================================================================= */}
      {/* CELEBRATION & CLAIM PROTOCOL MODAL OVERLAY (Active High-Contrast Layer)  */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-6 bg-[#31302d]/70 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-5xl bg-[#ffffff] rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col border border-[#e5e2dd]"
            >
              {/* Festive Header Banner with Atmospheric Gradient & Confetti Lighting */}
              <div className="relative bg-gradient-to-r from-[#b1005e] via-[#d91b77] to-[#8e4767] p-6 lg:p-8 text-white overflow-hidden">
                {/* Decorative Atmospheric Glows */}
                <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
                <div className="absolute left-1/3 -top-10 w-48 h-48 rounded-full bg-[#ffe088]/20 blur-xl pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shrink-0 shadow-inner">
                      🎉
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#ffe088] text-[#241a00] text-[11px] font-extrabold uppercase tracking-wide">
                          PERFORMANCE PROTOCOL UNLOCKED
                        </span>
                        <span className="font-mono text-xs text-white/90">
                          AUDIT ID: #VER-2024-NEX100
                        </span>
                      </div>
                      <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                        Milestone 3 Unlocked! 100 Qualified Salons Achieved
                      </h1>
                      <p className="text-sm text-white/90 mt-1 max-w-2xl leading-relaxed">
                        Congratulations Growth Partner. Your referral portfolio has cleared all commercial activation audits. Proceed with statutory confirmation to dispatch your enterprise asset.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="self-start md:self-center w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all cursor-pointer"
                    title="Close Overlay"
                    type="button"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Body: Split View (Asset Showcase & Lifecycle Steps vs Delivery Form) */}
              <div className="p-6 lg:p-8 grid grid-cols-12 gap-6 bg-[#fcf9f4]">
                {/* Left Column: Asset Visual Card & Lifecycle Protocol Tracker (5 cols) */}
                <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
                  {/* Asset Profile Card */}
                  <div className="bg-[#ffffff] p-5 rounded-xl shadow-xs border border-[#f0ede9] flex flex-col">
                    <div className="relative w-full h-48 rounded-lg overflow-hidden bg-[#f0ede9] flex items-center justify-center mb-4">
                      <img
                        className="w-full h-full object-cover"
                        alt="High-end sleek HP ProBook 15 G10 Business Laptop"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWh3WfG0kR26uX4u280lIJjB-ccZJDP5j0zi8bAOQn7ZZKExpwHOj9OvcKljFRxZRL9KUMfrPQ48bUBIosuXTVY2xWMgBAFZNwwvynqCKFyuK7CLUhep7B4npLWWYI5tB9PbtfohVZytdCHEDMo7mDgFlGcPcYH4A95QHUzoJYp-fNCsNgANapSVIQ8TKfXPH5yO5VzbtyvxSv18T577gTJ5HneDIDP5gGDTYRCk-Dd6_NP2InxTYm"
                      />
                      <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-[#ffffff]/90 backdrop-blur-md text-[#1c1c19] text-[11px] font-bold flex items-center gap-1 shadow-xs">
                        <Laptop className="w-3.5 h-3.5 text-[#b1005e]" />
                        <span>OEM Hardware Asset</span>
                      </div>
                      <div className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-full bg-[#cca730] text-white text-[11px] font-bold shadow-xs">
                        MSRP: ₹68,500
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-[#1c1c19]">HP ProBook 15 G10 Business Laptop</h3>
                    <p className="text-xs text-[#594047] mt-1 leading-relaxed">
                      Enterprise Productivity Package exclusively configured for Tier 3 Partners.
                    </p>

                    {/* Tech Specs Chips */}
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <div className="p-2.5 rounded-lg bg-[#f6f3ee] flex flex-col border border-[#e5e2dd]/60">
                        <span className="text-[10px] text-[#594047] font-semibold">Processor</span>
                        <span className="text-xs font-bold text-[#1c1c19]">Intel 13th Gen i5</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#f6f3ee] flex flex-col border border-[#e5e2dd]/60">
                        <span className="text-[10px] text-[#594047] font-semibold">Memory &amp; SSD</span>
                        <span className="text-xs font-bold text-[#1c1c19]">16GB DDR5 / 512GB NVMe</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#f6f3ee] flex flex-col border border-[#e5e2dd]/60">
                        <span className="text-[10px] text-[#594047] font-semibold">Display</span>
                        <span className="text-xs font-bold text-[#1c1c19]">15.6" FHD Anti-Glare</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#f6f3ee] flex flex-col border border-[#e5e2dd]/60">
                        <span className="text-[10px] text-[#594047] font-semibold">Firmware Spec</span>
                        <span className="text-xs font-bold text-[#b1005e]">Nexora OS + Laser Engraved</span>
                      </div>
                    </div>
                  </div>

                  {/* Lifecycle Protocol Step Tracker */}
                  <div className="bg-[#ffffff] p-5 rounded-xl shadow-xs border border-[#f0ede9] flex flex-col">
                    <span className="text-xs uppercase tracking-wider text-[#8e4767] font-bold mb-4">
                      Dispatch &amp; Fulfillment Lifecycle
                    </span>
                    <div className="flex flex-col gap-4 relative">
                      {/* Step 1: Cleared */}
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-[#b1005e] text-white flex items-center justify-center shrink-0 shadow-xs">
                          <Check className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-[#1c1c19]">Step 1: Merchant Integrity Audit</span>
                          <span className="text-xs text-[#8e4767] font-semibold">
                            100/100 Salons Cleared Anti-Gaming Check
                          </span>
                        </div>
                      </div>

                      {/* Step 2: Active / Dispatched */}
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-xs ${
                            claimState === 'dispatched'
                              ? 'bg-[#b1005e] text-white'
                              : 'bg-[#d91b77] text-white ring-4 ring-[#d91b77]/20 animate-pulse'
                          }`}
                        >
                          {claimState === 'dispatched' ? <Check className="w-4 h-4" /> : <FileText className="w-3.5 h-3.5" />}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-[#b1005e]">
                            Step 2: KYC &amp; Shipping Confirmation
                          </span>
                          <span className="text-xs text-[#594047]">
                            {claimState === 'dispatched' ? 'KYC & Shipping Locked' : 'Reviewing statutory verification parameters'}
                          </span>
                        </div>
                      </div>

                      {/* Step 3: Pending / Active if dispatched */}
                      <div className={`flex items-start gap-3 ${claimState === 'dispatched' ? '' : 'opacity-60'}`}>
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                            claimState === 'dispatched'
                              ? 'bg-[#ffe088] text-[#241a00] ring-4 ring-[#ffe088]/40 animate-pulse'
                              : 'bg-[#e5e2dd] text-[#1c1c19]'
                          }`}
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-[#1c1c19]">Step 3: Regional Hub Approval</span>
                          <span className="text-xs text-[#594047]">
                            {claimState === 'dispatched'
                              ? 'Allocating Serial OEM Warranty & Engraving'
                              : 'Serial OEM warranty binding & laser engraving'}
                          </span>
                        </div>
                      </div>

                      {/* Step 4: BlueDart */}
                      <div className="flex items-start gap-3 opacity-60">
                        <div className="w-7 h-7 rounded-full bg-[#e5e2dd] text-[#1c1c19] flex items-center justify-center shrink-0">
                          <Truck className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-[#1c1c19]">Step 4: BlueDart Secure Logistics</span>
                          <span className="text-xs text-[#594047]">
                            Tracked shipment with two-factor OTP handover
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Verification & Physical Dispatch Form (7 cols) */}
                <div className="col-span-12 lg:col-span-7 flex flex-col gap-4">
                  <div className="bg-[#ffffff] p-6 rounded-xl shadow-xs border border-[#f0ede9] flex flex-col">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#f0ede9]">
                      <div>
                        <h3 className="text-lg font-bold text-[#1c1c19]">Shipping &amp; Consignee Verification</h3>
                        <p className="text-xs text-[#594047]">
                          Verify high-value delivery details. Amendments require re-verification.
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#ebe8e3] text-[#1c1c19] text-xs font-mono font-bold flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5" /> SSL Secure
                      </span>
                    </div>

                    {/* Form Fields Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Consignee Name */}
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-[#594047] font-semibold">Full Consignee Name</label>
                        <div className="p-3 bg-[#f6f3ee] rounded-lg flex items-center justify-between border border-[#e5e2dd]">
                          <span className="text-sm font-bold text-[#1c1c19]">Growth Partner [DEV SAMPLE]</span>
                          <CheckCircle2 className="w-4 h-4 text-[#8e4767]" />
                        </div>
                      </div>

                      {/* Phone Verification */}
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-[#594047] font-semibold">Contact Number (Courier OTP)</label>
                        <div className="p-3 bg-[#f6f3ee] rounded-lg flex items-center justify-between border border-[#e5e2dd]">
                          <span className="text-sm font-mono text-[#1c1c19] font-bold">{addressData.phone}</span>
                          <span className="px-2 py-0.5 rounded-full bg-[#fda4c9]/40 text-[#7a3656] text-[10px] font-bold">
                            OTP VERIFIED
                          </span>
                        </div>
                      </div>

                      {/* Commercial Shipping Address (Full Width) */}
                      <div className="col-span-1 md:col-span-2 flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <label className="text-xs text-[#594047] font-semibold">
                            Physical Delivery Commercial Address
                          </label>
                          <button
                            onClick={() => setIsEditingAddress(!isEditingAddress)}
                            className="text-[#b1005e] hover:text-[#d91b77] text-xs font-bold flex items-center gap-1 cursor-pointer"
                            type="button"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>{isEditingAddress ? 'Done Editing' : 'Edit Address'}</span>
                          </button>
                        </div>

                        {isEditingAddress ? (
                          <div className="p-3 bg-[#ffffff] border-2 border-[#b1005e] rounded-lg flex flex-col gap-2">
                            <input
                              type="text"
                              value={addressData.suite}
                              onChange={(e) => setAddressData({ ...addressData, suite: e.target.value })}
                              placeholder="Building / Suite"
                              className="text-xs p-2 rounded bg-[#f6f3ee] border border-[#e5e2dd] focus:outline-none"
                            />
                            <input
                              type="text"
                              value={addressData.street}
                              onChange={(e) => setAddressData({ ...addressData, street: e.target.value })}
                              placeholder="Street Address, City, Pin"
                              className="text-xs p-2 rounded bg-[#f6f3ee] border border-[#e5e2dd] focus:outline-none"
                            />
                            <input
                              type="text"
                              value={addressData.landmark}
                              onChange={(e) => setAddressData({ ...addressData, landmark: e.target.value })}
                              placeholder="Landmark"
                              className="text-xs p-2 rounded bg-[#f6f3ee] border border-[#e5e2dd] focus:outline-none"
                            />
                          </div>
                        ) : (
                          <div className="p-4 bg-[#f6f3ee] rounded-lg flex items-start gap-3 border border-[#e5e2dd]">
                            <Building className="w-5 h-5 text-[#b1005e] mt-0.5 shrink-0" />
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-[#1c1c19]">{addressData.suite}</span>
                              <span className="text-xs text-[#594047]">{addressData.street}</span>
                              <span className="text-[11px] text-[#8e4767] font-semibold mt-1">
                                Landmark: {addressData.landmark}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* GSTIN & PAN Attribution */}
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-[#594047] font-semibold">Tax Attribution ID (GST / PAN)</label>
                        <div className="p-3 bg-[#f6f3ee] rounded-lg flex items-center justify-between border border-[#e5e2dd]">
                          <span className="text-sm font-mono font-bold text-[#1c1c19]">ABCPV1234F</span>
                          <span className="px-2 py-0.5 rounded-full bg-[#e5e2dd] text-[#1c1c19] text-[10px] font-bold">
                            DigiLocker Linked
                          </span>
                        </div>
                      </div>

                      {/* Preferred Logistics Carrier */}
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-[#594047] font-semibold">Transit Routing Method</label>
                        <div className="p-3 bg-[#f6f3ee] rounded-lg flex items-center justify-between border border-[#e5e2dd]">
                          <div className="flex items-center gap-2">
                            <Truck className="w-4 h-4 text-[#8e4767]" />
                            <span className="text-xs font-bold text-[#1c1c19]">{addressData.carrier}</span>
                          </div>
                          <span className="text-[11px] text-[#594047]">2-3 Business Days</span>
                        </div>
                      </div>
                    </div>

                    {/* Anti-Encashment & Strict Compliance Declarations */}
                    <div className="mt-5 p-4 bg-[#f0ede9] rounded-xl flex flex-col gap-3 border border-[#e5e2dd]">
                      <span className="text-xs uppercase tracking-wider text-[#8e4767] font-bold">
                        Statutory Declarations
                      </span>

                      {/* Checkbox 1 */}
                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={nonTransferableChecked}
                          onChange={(e) => setNonTransferableChecked(e.target.checked)}
                          className="mt-1 w-4 h-4 rounded text-[#b1005e] focus:ring-[#b1005e] accent-[#b1005e]"
                        />
                        <span className="text-xs text-[#1c1c19] leading-snug">
                          <strong className="font-bold">Non-Transferable Asset Grant:</strong> I acknowledge this hardware asset is a physical grant under Nexora Partner Charter Sec 8.4. Zero cash alternative, buy-back, or credit ledger redemption is permitted.
                        </span>
                      </label>

                      {/* Checkbox 2 */}
                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={merchantVeracityChecked}
                          onChange={(e) => setMerchantVeracityChecked(e.target.checked)}
                          className="mt-1 w-4 h-4 rounded text-[#b1005e] focus:ring-[#b1005e] accent-[#b1005e]"
                        />
                        <span className="text-xs text-[#1c1c19] leading-snug">
                          <strong className="font-bold">Merchant Veracity Confirmation:</strong> I affirm that all 100 attributed salon entities represent authentic, operational beauty businesses verified through POS activation transactions.
                        </span>
                      </label>
                    </div>

                    {/* Tax & Warranty Accordion Details */}
                    <div className="mt-4 p-3 rounded-lg bg-[#f6f3ee] border border-[#e5e2dd] flex flex-col gap-1">
                      <button
                        onClick={() => setTaxNoticeOpen(!taxNoticeOpen)}
                        className="flex items-center justify-between text-left cursor-pointer"
                        type="button"
                      >
                        <div className="flex items-center gap-2 text-[#594047]">
                          <Receipt className="w-4 h-4" />
                          <span className="text-xs font-bold text-[#1c1c19]">
                            TDS Sec 194R &amp; OEM Warranty Notice
                          </span>
                        </div>
                        {taxNoticeOpen ? (
                          <ChevronUp className="w-4 h-4 text-[#8d6f77]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#8d6f77]" />
                        )}
                      </button>

                      {taxNoticeOpen && (
                        <p className="text-[11px] text-[#594047] leading-relaxed pt-2 border-t border-[#e5e2dd]/60 mt-1">
                          Asset commercial value (₹68,500) will be reflected in Form 16A under Section 194R of the Income Tax Act for Business Perquisites. 1-Year HP On-Site Manufacturer Warranty automatically activates upon shipment scan.
                        </p>
                      )}
                    </div>

                    {/* Primary CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-end gap-3 mt-6 pt-4 border-t border-[#f0ede9]">
                      <button
                        onClick={() => setTermsModalOpen(true)}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#f0ede9] hover:bg-[#ebe8e3] text-[#1c1c19] text-xs font-bold transition-all cursor-pointer"
                        type="button"
                      >
                        Save Draft &amp; Review Terms
                      </button>

                      <button
                        onClick={handleConfirmClaim}
                        disabled={claimState === 'locking' || claimState === 'dispatched'}
                        className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-xs shadow-md transition-all cursor-pointer ${
                          claimState === 'dispatched'
                            ? 'bg-[#cca730] text-[#241a00] shadow-none'
                            : claimState === 'locking'
                            ? 'bg-[#b1005e]/80 text-white cursor-wait'
                            : 'bg-gradient-to-r from-[#b1005e] to-[#d91b77] text-white hover:shadow-lg hover:scale-[1.01]'
                        }`}
                        type="button"
                      >
                        {claimState === 'locking' ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Locking Hardware Dispatch...</span>
                          </>
                        ) : claimState === 'dispatched' ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Asset Claim Dispatched (#{dispatchedTrackingId})</span>
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="w-4 h-4" />
                            <span>Confirm Dispatch &amp; Lock Asset Claim</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer Status Line */}
              <div className="px-6 lg:px-8 py-3 bg-[#f6f3ee] border-t border-[#e5e2dd] flex flex-col sm:flex-row items-center justify-between gap-2 text-[#594047] text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#8e4767]"></span>
                  <span>
                    Regional Allocation Center: <strong>Bangalore Central Dispatch Hub</strong>
                  </span>
                </div>
                <div className="flex items-center gap-3 font-mono text-[11px]">
                  <span>SERIAL LOCK: #HP-PB15-G10-9942</span>
                  <span>•</span>
                  <span className="text-[#b1005e] font-bold">VALID UNTIL: 72H 00M</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DISPATCH SUCCESS DOSSIER MODAL */}
      <AnimatePresence>
        {dispatchReceiptOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl border border-[#e5e2dd]"
            >
              <div className="flex items-center justify-between border-b pb-3 border-[#f0ede9]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#1c1c19]">Dispatch Order Confirmed</h3>
                    <p className="text-[11px] text-[#594047]">Consignment Lock: #{dispatchedTrackingId}</p>
                  </div>
                </div>
                <button
                  onClick={() => setDispatchReceiptOpen(false)}
                  className="text-[#594047] hover:text-[#1c1c19] p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-[#f6f3ee] flex flex-col gap-1 border border-[#e5e2dd]">
                  <span className="text-[10px] uppercase tracking-wider text-[#8e4767] font-bold">
                    Allocated Asset Unit
                  </span>
                  <span className="font-bold text-sm text-[#1c1c19]">HP ProBook 15 G10 Laptop (Intel Core i5)</span>
                  <span className="text-[11px] text-[#594047]">Serial OEM: HP-PB15-G10-9942 • 16GB DDR5</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-lg bg-[#f6f3ee] border border-[#e5e2dd]">
                    <span className="text-[10px] text-[#594047]">Consignee</span>
                    <p className="font-bold text-[#1c1c19]">Growth Partner [DEV SAMPLE]</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#f6f3ee] border border-[#e5e2dd]">
                    <span className="text-[10px] text-[#594047]">Carrier</span>
                    <p className="font-bold text-[#1c1c19]">BlueDart Air Cargo</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#ffd9e2]/60 text-[#3e001d] text-[11px] leading-relaxed">
                  <strong>Handover Protocol:</strong> The consignment requires OTP verification on delivery (+91 98421 04472). DigiLocker Form 16A TDS entry will be generated automatically upon receipt.
                </div>
              </div>

              <div className="mt-5 flex items-center justify-end gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-lg bg-[#f0ede9] text-[#1c1c19] font-bold text-xs hover:bg-[#ebe8e3] flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={() => setDispatchReceiptOpen(false)}
                  className="px-5 py-2 rounded-lg bg-[#b1005e] text-white font-bold text-xs hover:bg-[#d91b77]"
                >
                  Return to Dashboard
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TERMS DRAFT MODAL */}
      <AnimatePresence>
        {termsModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-[#e5e2dd]"
            >
              <div className="flex items-center justify-between border-b pb-3 border-[#f0ede9]">
                <h3 className="font-bold text-sm text-[#1c1c19]">Nexora Charter Section 8.4 Policy</h3>
                <button onClick={() => setTermsModalOpen(false)} className="text-[#594047] p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-4 text-xs text-[#594047] space-y-2 leading-relaxed">
                <p>
                  <strong>1. Zero Cash Alternative:</strong> Milestone asset awards are non-encashable physical hardware units configured for partner operational scalability.
                </p>
                <p>
                  <strong>2. Statutory Section 194R:</strong> In compliance with the Finance Act 2022, a 10% TDS withholding report is generated on fair market valuation.
                </p>
                <p>
                  <strong>3. 30-Day Terminal Heartbeat:</strong> Attributed salons must maintain verified transaction heartbeat before physical asset release.
                </p>
              </div>
              <div className="mt-5 flex justify-end">
                <button
                  onClick={() => setTermsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#b1005e] text-white font-bold text-xs"
                >
                  I Understand
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
