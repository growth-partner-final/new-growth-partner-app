import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  Shield,
  ShieldCheck,
  Award,
  Zap,
  RotateCcw,
  Sparkles,
  WifiOff,
  Clock,
  Key,
  Layers,
  Store,
  Compass,
  ArrowRight,
  ChevronRight,
  X,
  Copy,
  ExternalLink,
  Lock,
  Hourglass,
  Check,
  Activity,
  Sliders,
  Send,
  HelpCircle,
  FileText,
  Touchpad,
  Globe,
  Trophy,
  Bell
} from 'lucide-react';

interface MobileJourneyNavigatorScreenProps {
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
  onNavigateToOpsMilestoneClaims?: () => void;
  onNavigateToPrototypeOrchestrator?: () => void;
  onNavigateToMobileMarketing?: () => void;
  onNavigateToMarketingMaterial?: () => void;
  onNavigateToPartnerLevels?: () => void;
  onNavigateToNotifications?: () => void;
}

export const MobileJourneyNavigatorScreen: React.FC<MobileJourneyNavigatorScreenProps> = ({
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
  onNavigateToOpsMilestoneClaims,
  onNavigateToPrototypeOrchestrator,
  onNavigateToMobileMarketing,
  onNavigateToMarketingMaterial,
  onNavigateToPartnerLevels,
  onNavigateToNotifications
}) => {
  // Main Journey Selector Tab: 'journey' (Salon Onboarding) | 'growth' (Partner Growth) | 'matrix' (State Matrix)
  const [mainTab, setMainTab] = useState<'journey' | 'growth' | 'matrix'>('journey');

  // Sandbox State: 'skeleton' | 'empty' | 'error' | 'network' | 'session' | 'success'
  const [sandboxState, setSandboxState] = useState<'skeleton' | 'empty' | 'error' | 'network' | 'session' | 'success'>('skeleton');

  // QR Modal Visibility
  const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);

  // Retry state text
  const [isRetrying, setIsRetrying] = useState<boolean>(false);
  const [retryText, setRetryText] = useState<string>('Retry Handshake');

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleTabChange = (tab: 'journey' | 'growth' | 'matrix') => {
    setMainTab(tab);
    if (tab === 'journey') {
      setSandboxState('skeleton');
    } else if (tab === 'growth') {
      setSandboxState('empty');
    } else if (tab === 'matrix') {
      setSandboxState('error');
    }
  };

  const simulateRetry = () => {
    setIsRetrying(true);
    setRetryText('Syncing...');
    setTimeout(() => {
      setRetryText('Handshake OK!');
      setTimeout(() => {
        setIsRetrying(false);
        setRetryText('Retry Handshake');
        setSandboxState('success');
        triggerToast('Network handshake verified with cryptographic nonce.');
      }, 700);
    }, 900);
  };

  const resolveValidationError = () => {
    triggerToast('Mock validation cleared. Field invariants passed.');
    setSandboxState('success');
  };

  return (
    <div className="min-h-screen bg-[#fcf9f4] text-[#1c1c19] font-sans antialiased relative selection:bg-[#ffd9e2] selection:text-[#8e004a]">
      {/* ========================================================================= */}
      {/* TOP STICKY HEADER                                                         */}
      {/* ========================================================================= */}
      <header className="fixed top-0 w-full z-50 bg-[#ffffff]/85 backdrop-blur-xl border-b border-[#e5e2dd] shadow-[0_1px_8px_rgba(74,14,46,0.04)]">
        <div className="h-20 w-full px-4 sm:px-6 max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#b1005e] flex items-center justify-center text-white shadow-[0_2px_10px_rgba(217,27,119,0.25)] font-bold text-xs">
                NX
              </div>
              <span className="text-xl font-bold tracking-tight text-[#1c1c19] hidden sm:inline-block">
                Nexora
              </span>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full bg-[#ffd8e5] text-[#3c0223] text-[11px] font-bold uppercase tracking-wider">
                Growth Partner
              </span>
            </div>

            {/* Breadcrumbs */}
            <div className="hidden lg:flex items-center gap-1.5 text-[#594047] text-xs font-semibold">
              <span
                onClick={() => onNavigateToDashboard && onNavigateToDashboard()}
                className="hover:text-[#b1005e] transition-colors cursor-pointer"
              >
                Portal
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-[#8d6f77]" />
              <span
                onClick={() => onNavigateToWebsiteTemplates && onNavigateToWebsiteTemplates()}
                className="hover:text-[#b1005e] transition-colors cursor-pointer"
              >
                Salon Launchpad
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-[#8d6f77]" />
              <span className="text-[#1c1c19] font-bold">Journey Navigator</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden xl:flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f6f3ee] text-[#594047] text-[11px] font-mono border border-[#e5e2dd]">
              <Lock className="w-3 h-3 text-[#b1005e]" />
              <span>nexora.growth/portal/launchpad/navigator</span>
              <span className="text-[#8d6f77] font-normal">(Clean URL)</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffd9e2]/60 text-[#8e004a] text-xs font-bold border border-[#ffd9e2]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Referral: <strong className="tracking-wide">REF-5A45019655</strong></span>
            </div>

            <nav className="flex items-center gap-1">
              <button
                onClick={() => onNavigateToWebsiteTemplates && onNavigateToWebsiteTemplates()}
                className="px-3 py-1.5 rounded-full text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] text-xs font-bold transition-all cursor-pointer"
                type="button"
              >
                Templates
              </button>
              <button
                onClick={() => onNavigateToHandoffHub && onNavigateToHandoffHub()}
                className="px-3 py-1.5 rounded-full text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] text-xs font-bold transition-all cursor-pointer"
                type="button"
              >
                Handoff
              </button>
              <button
                onClick={() => onNavigateToDashboard && onNavigateToDashboard()}
                className="px-3 py-1.5 rounded-full bg-[#d91b77] text-white font-bold text-xs shadow-xs cursor-pointer"
                type="button"
              >
                Navigator
              </button>
            </nav>

            <div className="w-8 h-8 rounded-full bg-[#b1005e] flex items-center justify-center text-white text-xs font-bold shadow-[0_2px_8px_rgba(217,27,119,0.25)]">
              MV
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN CONTAINER (Centered Mobile Shell + Responsive Desktop Wrapper)        */}
      {/* ========================================================================= */}
      <main className="w-full pt-24 pb-28 min-h-screen bg-[#fcf9f4]">
        <div className="max-w-2xl mx-auto px-4 flex flex-col gap-6">
          {/* Top Mobile Ambient Glow & Status Banner */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="inline-flex w-2.5 h-2.5 rounded-full bg-[#d91b77] animate-ping"></span>
                <span className="text-[11px] font-extrabold text-[#b1005e] uppercase tracking-wider">
                  Sandbox Active (390px Viewport)
                </span>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ebe8e3] text-[#594047] text-[11px] font-bold shadow-xs border border-[#e5e2dd]">
                <Zap className="w-3 h-3 text-[#735c00]" />
                <span>v2.4 Canary</span>
              </div>
            </div>

            <div className="flex flex-col">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1c1c19] tracking-tight">
                Journey Navigator
              </h1>
              <p className="text-xs sm:text-sm text-[#594047] mt-0.5">
                Real-time mobile simulation &amp; UX edge-case tester for certified salon growth tracks.
              </p>
            </div>

            {/* Ergonomics & Viewport Compliance Stamp Strip */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#ffffff] shadow-xs border border-[#e5e2dd]">
                <div className="w-7 h-7 rounded-lg bg-[#ffd8e5] flex items-center justify-center text-[#3c0223]">
                  <Touchpad className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-[#1c1c19] truncate">44px+ Hit Targets</span>
                  <span className="text-[10px] text-[#8e4767] font-semibold truncate">Zero Miss Targets</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#ffffff] shadow-xs border border-[#e5e2dd]">
                <div className="w-7 h-7 rounded-lg bg-[#ffe088] flex items-center justify-center text-[#241a00]">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-[#1c1c19] truncate">360px Tested</span>
                  <span className="text-[10px] text-[#735c00] font-semibold truncate">Zero Horizontal Drift</span>
                </div>
              </div>
            </div>
          </div>

          {/* 1. Mobile Journey Switcher (Pill Scroller) */}
          <div className="w-full">
            <div className="flex items-center p-1 rounded-full bg-[#ebe8e3] overflow-x-auto shadow-inner border border-[#e5e2dd]">
              <button
                onClick={() => handleTabChange('journey')}
                className={`flex-1 min-h-[44px] px-3 rounded-full text-xs font-bold text-center transition-all duration-200 cursor-pointer ${
                  mainTab === 'journey'
                    ? 'bg-[#d91b77] text-white shadow-xs'
                    : 'text-[#594047] hover:text-[#1c1c19]'
                }`}
                type="button"
              >
                Salon Onboarding
              </button>
              <button
                onClick={() => handleTabChange('growth')}
                className={`flex-1 min-h-[44px] px-3 rounded-full text-xs font-bold text-center transition-all duration-200 cursor-pointer ${
                  mainTab === 'growth'
                    ? 'bg-[#d91b77] text-white shadow-xs'
                    : 'text-[#594047] hover:text-[#1c1c19]'
                }`}
                type="button"
              >
                Partner Growth
              </button>
              <button
                onClick={() => handleTabChange('matrix')}
                className={`flex-1 min-h-[44px] px-3 rounded-full text-xs font-bold text-center transition-all duration-200 cursor-pointer ${
                  mainTab === 'matrix'
                    ? 'bg-[#d91b77] text-white shadow-xs'
                    : 'text-[#594047] hover:text-[#1c1c19]'
                }`}
                type="button"
              >
                State Matrix
              </button>
            </div>
          </div>

          {/* 2. Mobile Interactive State Sandbox Card */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#b1005e]" />
                <span className="text-base font-bold text-[#1c1c19]">Interactive State Sandbox</span>
              </div>
              <span className="text-[11px] font-extrabold text-[#b1005e] px-2 py-0.5 rounded-full bg-[#ffd9e2]">
                Interactive
              </span>
            </div>
            <p className="text-xs text-[#594047]">
              Simulate high-frequency mobile UX conditions instantly with real-time UI render.
            </p>

            {/* Quick Toggle Carousel (6 States) */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-1">
              <button
                onClick={() => setSandboxState('skeleton')}
                className={`flex flex-col items-center justify-center min-h-[48px] py-2 px-1 rounded-xl shadow-xs active:scale-95 transition-all cursor-pointer border ${
                  sandboxState === 'skeleton'
                    ? 'bg-[#ffd9e2] text-[#8e004a] border-[#b1005e]'
                    : 'bg-[#ffffff] text-[#1c1c19] border-[#e5e2dd] hover:bg-[#f6f3ee]'
                }`}
                type="button"
              >
                <Layers className="w-4 h-4 text-[#8e4767]" />
                <span className="text-[11px] font-bold text-center leading-tight mt-1">Skeleton</span>
              </button>

              <button
                onClick={() => setSandboxState('empty')}
                className={`flex flex-col items-center justify-center min-h-[48px] py-2 px-1 rounded-xl shadow-xs active:scale-95 transition-all cursor-pointer border ${
                  sandboxState === 'empty'
                    ? 'bg-[#ffd9e2] text-[#8e004a] border-[#b1005e]'
                    : 'bg-[#ffffff] text-[#1c1c19] border-[#e5e2dd] hover:bg-[#f6f3ee]'
                }`}
                type="button"
              >
                <Store className="w-4 h-4 text-[#735c00]" />
                <span className="text-[11px] font-bold text-center leading-tight mt-1">Empty State</span>
              </button>

              <button
                onClick={() => setSandboxState('error')}
                className={`flex flex-col items-center justify-center min-h-[48px] py-2 px-1 rounded-xl shadow-xs active:scale-95 transition-all cursor-pointer border ${
                  sandboxState === 'error'
                    ? 'bg-[#ffd9e2] text-[#8e004a] border-[#b1005e]'
                    : 'bg-[#ffffff] text-[#1c1c19] border-[#e5e2dd] hover:bg-[#f6f3ee]'
                }`}
                type="button"
              >
                <AlertTriangle className="w-4 h-4 text-[#ba1a1a]" />
                <span className="text-[11px] font-bold text-center leading-tight mt-1">Validation</span>
              </button>

              <button
                onClick={() => setSandboxState('network')}
                className={`flex flex-col items-center justify-center min-h-[48px] py-2 px-1 rounded-xl shadow-xs active:scale-95 transition-all cursor-pointer border ${
                  sandboxState === 'network'
                    ? 'bg-[#ffd9e2] text-[#8e004a] border-[#b1005e]'
                    : 'bg-[#ffffff] text-[#1c1c19] border-[#e5e2dd] hover:bg-[#f6f3ee]'
                }`}
                type="button"
              >
                <WifiOff className="w-4 h-4 text-[#8d6f77]" />
                <span className="text-[11px] font-bold text-center leading-tight mt-1">Timeout</span>
              </button>

              <button
                onClick={() => setSandboxState('session')}
                className={`flex flex-col items-center justify-center min-h-[48px] py-2 px-1 rounded-xl shadow-xs active:scale-95 transition-all cursor-pointer border ${
                  sandboxState === 'session'
                    ? 'bg-[#ffd9e2] text-[#8e004a] border-[#b1005e]'
                    : 'bg-[#ffffff] text-[#1c1c19] border-[#e5e2dd] hover:bg-[#f6f3ee]'
                }`}
                type="button"
              >
                <Key className="w-4 h-4 text-[#b1005e]" />
                <span className="text-[11px] font-bold text-center leading-tight mt-1">Session Exp.</span>
              </button>

              <button
                onClick={() => setSandboxState('success')}
                className={`flex flex-col items-center justify-center min-h-[48px] py-2 px-1 rounded-xl shadow-xs active:scale-95 transition-all cursor-pointer border ${
                  sandboxState === 'success'
                    ? 'bg-[#ffd9e2] text-[#8e004a] border-[#b1005e]'
                    : 'bg-[#ffffff] text-[#1c1c19] border-[#e5e2dd] hover:bg-[#f6f3ee]'
                }`}
                type="button"
              >
                <Sparkles className="w-4 h-4 text-[#d91b77]" />
                <span className="text-[11px] font-bold text-center leading-tight mt-1">Success</span>
              </button>
            </div>

            {/* State Canvas Stage (Where Simulated UI Renders) */}
            <div className="w-full rounded-2xl bg-[#ffffff] p-5 shadow-sm border border-[#e5e2dd] min-h-[280px] flex flex-col justify-center relative overflow-hidden">
              {/* SKELETON STATE */}
              {sandboxState === 'skeleton' && (
                <div className="flex flex-col gap-3 w-full animate-pulse">
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-28 bg-[#ebe8e3] rounded-full"></div>
                    <div className="h-6 w-14 bg-[#ebe8e3] rounded-full"></div>
                  </div>
                  <div className="h-10 w-3/4 bg-[#ebe8e3] rounded-xl"></div>
                  <div className="h-28 w-full bg-[#ebe8e3] rounded-2xl"></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-16 bg-[#ebe8e3] rounded-xl"></div>
                    <div className="h-16 bg-[#ebe8e3] rounded-xl"></div>
                  </div>
                  <div className="flex justify-center pt-2">
                    <span className="text-xs text-[#8d6f77] font-semibold">
                      Loading Salon Performance Data...
                    </span>
                  </div>
                </div>
              )}

              {/* EMPTY STATE */}
              {sandboxState === 'empty' && (
                <div className="flex flex-col items-center text-center gap-3 py-4">
                  <div className="w-16 h-16 rounded-full bg-[#ffd8e5] flex items-center justify-center text-[#3c0223] shadow-xs">
                    <Store className="w-8 h-8" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-[#1c1c19]">No Referred Salons Yet</span>
                    <span className="text-xs text-[#594047] px-4 mt-1 leading-relaxed">
                      Your code <strong className="text-[#b1005e] font-bold">REF-5A45019655</strong> is primed and ready to earn 10% settled commission.
                    </span>
                  </div>
                  <button
                    onClick={() => setIsQrModalOpen(true)}
                    className="mt-2 min-h-[44px] px-6 rounded-full bg-[#d91b77] text-white text-xs font-bold shadow-xs hover:bg-[#b1005e] active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                    type="button"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Present Instant QR Code</span>
                  </button>
                </div>
              )}

              {/* VALIDATION ERROR STATE */}
              {sandboxState === 'error' && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-[#ffdad6] text-[#93000a] border border-[#ba1a1a]/20">
                    <AlertTriangle className="w-5 h-5 text-[#ba1a1a] flex-shrink-0" />
                    <span className="text-xs font-bold" role="alert">
                      2 fields require revision before payout lock
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-[#ba1a1a] font-bold flex items-center justify-between">
                      <span>Merchant Processing Volume (₹)</span>
                      <span className="text-[10px] font-normal">Must exceed ₹50,000/mo</span>
                    </label>
                    <div className="relative">
                      <input
                        aria-invalid="true"
                        readOnly
                        className="w-full min-h-[44px] px-3 rounded-xl bg-[#ebe8e3] text-[#1c1c19] text-sm focus:outline-none ring-2 ring-[#ba1a1a]"
                        type="text"
                        value="₹24,500"
                      />
                      <AlertTriangle className="absolute right-3 top-3 text-[#ba1a1a] w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-[#ba1a1a] font-bold flex items-center justify-between">
                      <span>Salon Tax Registration (PAN/GSTIN)</span>
                      <span className="text-[10px] font-normal">Invalid format checksum</span>
                    </label>
                    <div className="relative">
                      <input
                        aria-invalid="true"
                        readOnly
                        className="w-full min-h-[44px] px-3 rounded-xl bg-[#ebe8e3] text-[#1c1c19] text-sm focus:outline-none ring-2 ring-[#ba1a1a]"
                        type="text"
                        value="99-INVALID-GST"
                      />
                      <AlertTriangle className="absolute right-3 top-3 text-[#ba1a1a] w-4 h-4" />
                    </div>
                  </div>
                  <button
                    onClick={resolveValidationError}
                    className="min-h-[44px] mt-1 w-full rounded-full bg-[#ba1a1a] text-white text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
                    type="button"
                  >
                    Resolve &amp; Validate Fields
                  </button>
                </div>
              )}

              {/* NETWORK TIMEOUT STATE */}
              {sandboxState === 'network' && (
                <div className="flex flex-col items-center text-center gap-3 py-4">
                  <div className="w-14 h-14 rounded-full bg-[#ebe8e3] flex items-center justify-center text-[#594047]">
                    <WifiOff className="w-7 h-7 text-[#8d6f77]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-[#1c1c19]">Connection Stalled</span>
                    <span className="text-xs text-[#594047] px-2 mt-1 leading-relaxed">
                      Nexora Secure Handshake timed out after 15,000ms. Local state is buffered securely on device cache.
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 w-full">
                    <button
                      onClick={simulateRetry}
                      disabled={isRetrying}
                      className="flex-1 min-h-[44px] rounded-full bg-[#d91b77] text-white text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      type="button"
                    >
                      <RotateCcw className={`w-3.5 h-3.5 ${isRetrying ? 'animate-spin' : ''}`} />
                      <span>{retryText}</span>
                    </button>
                    <button
                      onClick={() => triggerToast('Local offline cache exported safely.')}
                      className="min-h-[44px] px-4 rounded-full bg-[#ebe8e3] text-[#1c1c19] text-xs font-bold hover:bg-[#e5e2dd] active:scale-95 transition-all cursor-pointer"
                      type="button"
                    >
                      Inspect Cache
                    </button>
                  </div>
                </div>
              )}

              {/* SESSION EXPIRED STATE */}
              {sandboxState === 'session' && (
                <div className="flex flex-col items-center text-center gap-3 py-4">
                  <div className="w-14 h-14 rounded-full bg-[#ffd9e2] flex items-center justify-center text-[#8e004a]">
                    <Clock className="w-7 h-7 text-[#b1005e]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-[#1c1c19]">Session Expired</span>
                    <span className="text-xs text-[#594047] px-2 mt-1 leading-relaxed">
                      Security timeout activated after 10m inactivity. Marcus, re-enter your 4-digit biometric PIN.
                    </span>
                  </div>
                  <div className="flex justify-center gap-2 mt-2">
                    <input
                      className="w-10 h-12 text-center rounded-xl bg-[#ebe8e3] text-lg font-bold text-[#1c1c19]"
                      maxLength={1}
                      readOnly
                      type="password"
                      value="8"
                    />
                    <input
                      className="w-10 h-12 text-center rounded-xl bg-[#ebe8e3] text-lg font-bold text-[#1c1c19]"
                      maxLength={1}
                      readOnly
                      type="password"
                      value="8"
                    />
                    <input
                      className="w-10 h-12 text-center rounded-xl bg-[#ebe8e3] text-lg font-bold text-[#1c1c19]"
                      maxLength={1}
                      readOnly
                      type="password"
                      value="2"
                    />
                    <input
                      className="w-10 h-12 text-center rounded-xl bg-[#ffd9e2] text-lg font-bold text-[#b1005e] border-2 border-[#b1005e]"
                      maxLength={1}
                      placeholder="•"
                      type="password"
                    />
                  </div>
                  <button
                    onClick={() => {
                      setSandboxState('success');
                      triggerToast('Session unlocked with biometric token.');
                    }}
                    className="mt-2 min-h-[44px] px-6 rounded-full bg-[#d91b77] text-white text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
                    type="button"
                  >
                    Unlock Session (Biometric OTP)
                  </button>
                </div>
              )}

              {/* SUCCESS STATE */}
              {sandboxState === 'success' && (
                <div className="flex flex-col items-center text-center gap-3 py-4">
                  <div className="relative flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#ffd8e5] flex items-center justify-center text-[#b1005e] shadow-xs">
                      <Sparkles className="w-8 h-8 text-[#b1005e]" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-[#1c1c19]">Salon Onboarded!</span>
                    <span className="text-xs text-[#594047] px-2 mt-1 leading-relaxed">
                      Elysian Locks Studio locked under Marcus88 referral. First month revenue acceleration enabled.
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#ebe8e3] w-full justify-between mt-1 text-xs">
                    <span className="text-[#594047] font-mono">TXID: #NX-8842-SALON</span>
                    <span className="text-[#b1005e] font-bold font-mono">+₹4,800.00 Est.</span>
                  </div>
                  <button
                    onClick={() => setSandboxState('skeleton')}
                    className="mt-2 min-h-[44px] px-6 rounded-full bg-[#e5e2dd] text-[#1c1c19] text-xs font-bold hover:bg-[#dcdad5] active:scale-95 transition-all cursor-pointer"
                    type="button"
                  >
                    Reset Sandbox Loop
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* 3. Mobile Route Index & Clickable Nodes (11 Verified Nodes) */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#b1005e]" />
                <span className="text-base font-bold text-[#1c1c19]">Mobile Route Index</span>
              </div>
              <span className="text-xs text-[#8d6f77] font-semibold">11 Verified Nodes</span>
            </div>
            <p className="text-xs text-[#594047]">
              Direct deeplinks to production mobile screens with clean query signatures.
            </p>

            <div className="flex flex-col gap-2 pt-1">
              {/* Node 1 */}
              <button
                onClick={() => onNavigateToMerchantRegister && onNavigateToMerchantRegister()}
                className="flex items-center justify-between p-3 min-h-[56px] rounded-2xl bg-[#ffffff] border border-[#e5e2dd] shadow-xs hover:border-[#b1005e] active:scale-[0.98] transition-all text-left cursor-pointer"
                type="button"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#ffd8e5] flex items-center justify-center text-[#3c0223] flex-shrink-0">
                    <Store className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-[#1c1c19] truncate">
                      Salon Landing Intake
                    </span>
                    <span className="text-[11px] text-[#b1005e] font-mono truncate">
                      /onboard?ref=MARCUS88
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ebe8e3] text-[#594047] font-bold">
                    Intake
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#8d6f77]" />
                </div>
              </button>

              {/* Node 2 */}
              <button
                onClick={() => onNavigateToLockedOnboarding && onNavigateToLockedOnboarding()}
                className="flex items-center justify-between p-3 min-h-[56px] rounded-2xl bg-[#ffffff] border border-[#e5e2dd] shadow-xs hover:border-[#b1005e] active:scale-[0.98] transition-all text-left cursor-pointer"
                type="button"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#ffd9e2] flex items-center justify-center text-[#8e004a] flex-shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-[#1c1c19] truncate">
                      Salon 5-Step Stepper
                    </span>
                    <span className="text-[11px] text-[#b1005e] font-mono truncate">
                      /onboard/stepper (1–5)
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ebe8e3] text-[#594047] font-bold">
                    Wizard
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#8d6f77]" />
                </div>
              </button>

              {/* Node 3 */}
              <button
                onClick={() => onNavigateToWebsiteTemplates && onNavigateToWebsiteTemplates()}
                className="flex items-center justify-between p-3 min-h-[56px] rounded-2xl bg-[#ffffff] border border-[#e5e2dd] shadow-xs hover:border-[#b1005e] active:scale-[0.98] transition-all text-left cursor-pointer"
                type="button"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#ffe088] flex items-center justify-center text-[#241a00] flex-shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-[#1c1c19] truncate">
                      Curated Salon Templates
                    </span>
                    <span className="text-[11px] text-[#b1005e] font-mono truncate">
                      /launch/templates
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ebe8e3] text-[#594047] font-bold">
                    Catalog
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#8d6f77]" />
                </div>
              </button>

              {/* Node 4 */}
              <button
                onClick={() => onNavigateToHandoffHub && onNavigateToHandoffHub()}
                className="flex items-center justify-between p-3 min-h-[56px] rounded-2xl bg-[#ffffff] border border-[#e5e2dd] shadow-xs hover:border-[#b1005e] active:scale-[0.98] transition-all text-left cursor-pointer"
                type="button"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#ebe8e3] flex items-center justify-center text-[#1c1c19] flex-shrink-0">
                    <Key className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-[#1c1c19] truncate">
                      Partner Handoff Hub
                    </span>
                    <span className="text-[11px] text-[#b1005e] font-mono truncate">
                      /launch/handoff
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ebe8e3] text-[#594047] font-bold">
                    Export
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#8d6f77]" />
                </div>
              </button>

              {/* Node 5 */}
              <button
                onClick={() => onNavigateToDashboard && onNavigateToDashboard()}
                className="flex items-center justify-between p-3 min-h-[56px] rounded-2xl bg-[#ffffff] border border-[#e5e2dd] shadow-xs hover:border-[#b1005e] active:scale-[0.98] transition-all text-left cursor-pointer"
                type="button"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#ffd8e5] flex items-center justify-center text-[#3c0223] flex-shrink-0">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-[#1c1c19] truncate">
                      Partner Mobile Dashboard
                    </span>
                    <span className="text-[11px] text-[#b1005e] font-mono truncate">
                      /partner/m-dashboard
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ffd9e2] text-[#b1005e] font-bold">
                    Active
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#8d6f77]" />
                </div>
              </button>

              {/* Node 6 */}
              <button
                onClick={() => onNavigateToSalonIntelligence && onNavigateToSalonIntelligence()}
                className="flex items-center justify-between p-3 min-h-[56px] rounded-2xl bg-[#ffffff] border border-[#e5e2dd] shadow-xs hover:border-[#b1005e] active:scale-[0.98] transition-all text-left cursor-pointer"
                type="button"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#ebe8e3] flex items-center justify-center text-[#1c1c19] flex-shrink-0">
                    <Store className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-[#1c1c19] truncate">
                      Live Salon Referrals
                    </span>
                    <span className="text-[11px] text-[#b1005e] font-mono truncate">
                      /partner/m-referrals
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ebe8e3] text-[#594047] font-bold">
                    List
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#8d6f77]" />
                </div>
              </button>

              {/* Node 7 */}
              <button
                onClick={() => onNavigateToReferralTimeline && onNavigateToReferralTimeline()}
                className="flex items-center justify-between p-3 min-h-[56px] rounded-2xl bg-[#ffffff] border border-[#e5e2dd] shadow-xs hover:border-[#b1005e] active:scale-[0.98] transition-all text-left cursor-pointer"
                type="button"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#ebe8e3] flex items-center justify-center text-[#1c1c19] flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-[#1c1c19] truncate">
                      Commission Audit Timeline
                    </span>
                    <span className="text-[11px] text-[#b1005e] font-mono truncate">
                      /partner/m-timeline
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ebe8e3] text-[#594047] font-bold">
                    Feed
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#8d6f77]" />
                </div>
              </button>

              {/* Node 8 */}
              <button
                onClick={() => onNavigateToMobileRewards && onNavigateToMobileRewards()}
                className="flex items-center justify-between p-3 min-h-[56px] rounded-2xl bg-[#ffffff] border border-[#e5e2dd] shadow-xs hover:border-[#b1005e] active:scale-[0.98] transition-all text-left cursor-pointer"
                type="button"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#ffe088] flex items-center justify-center text-[#241a00] flex-shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-[#1c1c19] truncate">
                      Partner Milestone Rewards
                    </span>
                    <span className="text-[11px] text-[#b1005e] font-mono truncate">
                      /partner/m-rewards
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ffd8e5] text-[#3c0223] font-bold">
                    Tiers
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#8d6f77]" />
                </div>
              </button>

              {/* Node 9 */}
              <button
                onClick={() => onNavigateToMobileMarketing && onNavigateToMobileMarketing()}
                className="flex items-center justify-between p-3 min-h-[56px] rounded-2xl bg-[#ffffff] border border-[#e5e2dd] shadow-xs hover:border-[#b1005e] active:scale-[0.98] transition-all text-left cursor-pointer"
                type="button"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#ffd9e2] flex items-center justify-center text-[#8e004a] flex-shrink-0">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-[#1c1c19] truncate">
                      Mobile Marketing Hub
                    </span>
                    <span className="text-[11px] text-[#b1005e] font-mono truncate">
                      /partner/mobile-marketing
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ffd8e5] text-[#3c0223] font-bold">
                    Creatives
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#8d6f77]" />
                </div>
              </button>

              {/* Node 10 */}
              <button
                onClick={() => onNavigateToMarketingMaterial && onNavigateToMarketingMaterial()}
                className="flex items-center justify-between p-3 min-h-[56px] rounded-2xl bg-[#ffffff] border border-[#e5e2dd] shadow-xs hover:border-[#b1005e] active:scale-[0.98] transition-all text-left cursor-pointer"
                type="button"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#ebe8e3] flex items-center justify-center text-[#1c1c19] flex-shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-[#1c1c19] truncate">
                      Marketing Materials (Desktop)
                    </span>
                    <span className="text-[11px] text-[#b1005e] font-mono truncate">
                      /partner/marketing-materials
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ebe8e3] text-[#594047] font-bold">
                    Library
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#8d6f77]" />
                </div>
              </button>

              {/* Node 11 */}
              <button
                onClick={() => onNavigateToPartnerLevels && onNavigateToPartnerLevels()}
                className="flex items-center justify-between p-3 min-h-[56px] rounded-2xl bg-[#ffffff] border border-[#e5e2dd] shadow-xs hover:border-[#b1005e] active:scale-[0.98] transition-all text-left cursor-pointer"
                type="button"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#ffd8e5] flex items-center justify-center text-[#b1005e] flex-shrink-0">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-[#1c1c19] truncate">
                      Partner Levels Roadmap
                    </span>
                    <span className="text-[11px] text-[#b1005e] font-mono truncate">
                      /partner/levels
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ffd8e5] text-[#3c0223] font-bold">
                    Roadmap
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#8d6f77]" />
                </div>
              </button>

              {/* Node 12 */}
              <button
                onClick={() => onNavigateToNotifications && onNavigateToNotifications()}
                className="flex items-center justify-between p-3 min-h-[56px] rounded-2xl bg-[#ffffff] border border-[#e5e2dd] shadow-xs hover:border-[#b1005e] active:scale-[0.98] transition-all text-left cursor-pointer"
                type="button"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#ffd9e2] flex items-center justify-center text-[#b1005e] flex-shrink-0">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-[#1c1c19] truncate">
                      Partner Notifications Hub
                    </span>
                    <span className="text-[11px] text-[#b1005e] font-mono truncate">
                      /partner/notifications
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ffd9e2] text-[#8e004a] font-bold">
                    Realtime
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#8d6f77]" />
                </div>
              </button>
            </div>
          </section>

          {/* Visual Polish: Salon Mobile Live Mock Preview Badge */}
          <section className="w-full rounded-2xl bg-[#f6f3ee] p-4 flex items-center justify-between border border-[#e5e2dd] shadow-xs">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#d91b77] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs sm:text-sm font-bold text-[#1c1c19] truncate">
                  Target: Apple iPhone 15 Pro
                </span>
                <span className="text-[11px] text-[#594047] truncate font-mono">
                  393 x 852 px · Safe Area Inset active
                </span>
              </div>
            </div>
            <CheckCircle2 className="w-5 h-5 text-[#735c00] flex-shrink-0" />
          </section>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* QR SHARE MODAL                                                            */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isQrModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end justify-center p-0 sm:p-4">
            <motion.div
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 200, opacity: 0 }}
              className="w-full max-w-md bg-[#ffffff] rounded-t-3xl sm:rounded-3xl p-6 flex flex-col items-center gap-3 border border-[#e5e2dd] shadow-2xl"
            >
              <div className="w-12 h-1.5 bg-[#ebe8e3] rounded-full self-center mb-1"></div>
              <div className="flex items-center justify-between w-full">
                <span className="text-base font-bold text-[#1c1c19]">Salon Referral QR</span>
                <button
                  onClick={() => setIsQrModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#ebe8e3] flex items-center justify-center text-[#594047] hover:text-[#1c1c19] cursor-pointer"
                  type="button"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Generated Visual QR Code Card */}
              <div className="p-4 bg-[#fcf9f4] rounded-2xl border border-[#e5e2dd] my-1 flex flex-col items-center shadow-inner">
                <div className="w-44 h-44 bg-[#1c1c19] rounded-xl p-3 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div className="w-10 h-10 bg-white rounded-lg"></div>
                    <div className="w-10 h-10 bg-white rounded-lg"></div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-7 h-7 rounded-full bg-[#d91b77] flex items-center justify-center text-white font-bold text-[9px]">
                      NX
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="w-10 h-10 bg-white rounded-lg"></div>
                    <div className="w-6 h-6 bg-white rounded"></div>
                  </div>
                </div>
                <span className="text-xs font-mono mt-3 text-[#b1005e] font-extrabold tracking-wider">
                  REF-5A45019655
                </span>
              </div>

              <p className="text-xs text-[#594047] text-center px-4 leading-relaxed">
                Salon owner scans via default camera app to initiate instant pre-filled partner onboarding.
              </p>

              <button
                onClick={() => {
                  setIsQrModalOpen(false);
                  triggerToast('Referral code copied to clipboard!');
                }}
                className="w-full min-h-[48px] rounded-full bg-[#d91b77] text-white text-xs font-bold shadow-xs hover:bg-[#b1005e] active:scale-95 transition-all cursor-pointer"
                type="button"
              >
                Done &amp; Dismiss
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* FLOATING TOAST NOTIFICATION                                               */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-[#1c1c19] text-white text-xs font-bold shadow-xl flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-[#b1005e]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* ERGONOMIC NATIVE MOBILE BOTTOM NAVIGATION BAR (44px+ hit areas)             */}
      {/* ========================================================================= */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#ffffff]/95 backdrop-blur-lg border-t border-[#e5e2dd] shadow-[0_-2px_12px_rgba(74,14,46,0.06)] px-4 py-2 flex items-center justify-around">
        <button
          onClick={() => {
            setMainTab('journey');
            setSandboxState('skeleton');
            triggerToast('Switched to Mobile Prototype View');
          }}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] cursor-pointer ${
            mainTab === 'journey' ? 'text-[#b1005e]' : 'text-[#594047] hover:text-[#1c1c19]'
          }`}
          type="button"
        >
          <Smartphone className="w-5 h-5" />
          <span className="text-[10px] font-bold leading-tight mt-0.5">Prototype</span>
        </button>

        <button
          onClick={() => {
            handleTabChange('growth');
            triggerToast('Switched to Journeys View');
          }}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] cursor-pointer ${
            mainTab === 'growth' ? 'text-[#b1005e]' : 'text-[#594047] hover:text-[#1c1c19]'
          }`}
          type="button"
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] font-bold leading-tight mt-0.5">Journeys</span>
        </button>

        <button
          onClick={() => {
            handleTabChange('matrix');
            triggerToast('Switched to State Matrix View');
          }}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] cursor-pointer ${
            mainTab === 'matrix' ? 'text-[#b1005e]' : 'text-[#594047] hover:text-[#1c1c19]'
          }`}
          type="button"
        >
          <Sliders className="w-5 h-5" />
          <span className="text-[10px] font-bold leading-tight mt-0.5">States</span>
        </button>

        <button
          onClick={() => {
            if (onNavigateToPrototypeOrchestrator) {
              onNavigateToPrototypeOrchestrator();
            } else {
              triggerToast('Viewing full route tree (8 nodes). Click any route above.');
            }
          }}
          className="flex flex-col items-center justify-center min-w-[56px] min-h-[48px] text-[#594047] hover:text-[#1c1c19] cursor-pointer"
          type="button"
        >
          <Layers className="w-5 h-5" />
          <span className="text-[10px] font-bold leading-tight mt-0.5">Routes</span>
        </button>
      </nav>

      {/* ========================================================================= */}
      {/* FOOTER                                                                    */}
      {/* ========================================================================= */}
      <footer className="w-full bg-[#f6f3ee] py-8 border-t border-[#e5e2dd] mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#594047]">
          <div>© 2025 Nexora Fintech Growth Network. Certified Salon Launch Partner Ecosystem.</div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="hover:text-[#b1005e] transition-colors cursor-pointer">Partner Agreement</span>
            <span className="hover:text-[#b1005e] transition-colors cursor-pointer">Security &amp; Clean URL Policy</span>
            <span className="hover:text-[#b1005e] transition-colors cursor-pointer">Support Desk</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
