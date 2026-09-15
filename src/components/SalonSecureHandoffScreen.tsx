import React, { useState } from 'react';
import { NotificationBell } from './NotificationBell';

interface SalonSecureHandoffScreenProps {
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
}

export const SalonSecureHandoffScreen: React.FC<SalonSecureHandoffScreenProps> = ({
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
  onNavigateToProfileSettings
}) => {
  // Active Flow Simulation State
  const [activeStage, setActiveStage] = useState<'processing' | 'success' | 'expired' | 'used' | 'retry'>('processing');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedDomain, setCopiedDomain] = useState<boolean>(false);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyDomain = () => {
    navigator.clipboard?.writeText('elegance.nexora.salon');
    setCopiedDomain(true);
    showToast('Subdomain elegance.nexora.salon copied to clipboard!');
    setTimeout(() => setCopiedDomain(false), 2500);
  };

  const handleRetryHandoff = () => {
    setIsRetrying(true);
    showToast('Re-initiating POS webhook pairing with ap-south-1 node...');
    setTimeout(() => {
      setIsRetrying(false);
      setActiveStage('processing');
      setTimeout(() => {
        setActiveStage('success');
        showToast('Handoff completed! Maison Elegance is 100% Live.');
      }, 1500);
    }, 1000);
  };

  return (
    <div className="bg-[#fcf9f4] font-sans text-[#1c1c19] min-h-screen flex flex-col justify-between relative selection:bg-[#fda4c9]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#31302d] text-white shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200 border border-white/10 max-w-sm text-center">
          <span className="material-symbols-outlined text-[18px] text-[#ffe088]">check_circle</span>
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="fixed top-8 sm:top-7 inset-x-0 z-40 bg-[#fcf9f4]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(74,14,46,0.04)] border-b border-[#e5e2dd]">
        <div className="h-16 px-4 max-w-md mx-auto sm:max-w-xl md:max-w-2xl flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <button
              aria-label="Go back"
              onClick={() => {
                if (onNavigateToWebsiteTemplates) onNavigateToWebsiteTemplates();
                else if (onNavigateToStepAuditWorkspace) onNavigateToStepAuditWorkspace();
              }}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#1c1c19] hover:bg-[#ebe8e3] transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#b1005e] to-[#d91b77] text-white flex items-center justify-center font-black text-sm shadow-xs">
              N
            </div>
            <div className="flex flex-col ml-1">
              <span className="text-[11px] uppercase tracking-wider text-[#b1005e] font-black">Nexora</span>
              <span className="text-sm font-black text-[#1c1c19] truncate max-w-[150px] sm:max-w-none">
                Secure Handoff Overview
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-[#f0ede9] px-2 py-1 rounded-full text-[#594047] border border-[#e5e2dd]">
              <span className="material-symbols-outlined text-[14px] text-[#735c00]">lock</span>
              <span className="text-[11px] font-extrabold hidden sm:inline">SECURE</span>
            </div>
            <div className="flex items-center gap-1 bg-[#ffd8e5] text-[#3c0223] px-2.5 py-1 rounded-full border border-[#fda4c9]/60">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              <span className="text-[11px] font-black">TOKEN #NX</span>
            </div>
            <NotificationBell onNavigateToReferrals={onNavigateToReferralTimeline} />
            <button
              onClick={() => onNavigateToProfileSettings && onNavigateToProfileSettings()}
              className="w-8 h-8 rounded-full bg-[#b1005e] text-white flex items-center justify-center shadow-xs ml-1 cursor-pointer"
              title="Partner Profile"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex flex-col relative w-full pt-28 pb-32 bg-[#fcf9f4] flex-grow max-w-md mx-auto sm:max-w-xl md:max-w-2xl px-4">
        <div className="flex flex-col w-full space-y-4">
          {/* Mobile Clean Trust Anchor Bar */}
          <div className="w-full bg-[#f6f3ee] rounded-2xl px-4 py-2.5 shadow-2xs border border-[#e5e2dd] flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-full bg-[#b1005e]/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#b1005e] text-[15px]">encrypted</span>
              </div>
              <div className="flex items-center gap-1 truncate text-xs">
                <span className="text-[#594047] font-semibold">launch.nexora.app</span>
                <span className="text-[#e1bdc6]">/</span>
                <span className="text-[#b1005e] font-black">handoff</span>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0 bg-[#ffd8e5] text-[#3c0223] px-2.5 py-0.5 rounded-full border border-[#fda4c9]/60">
              <span className="material-symbols-outlined text-[12px]">security</span>
              <span className="text-[10px] font-black tracking-wide uppercase">TLS 1.3</span>
            </div>
          </div>

          {/* State Switcher Pills (Horizontal Scrolling) */}
          <div className="w-full">
            <div className="flex items-center justify-between mb-1.5 px-1">
              <span className="text-[11px] font-black text-[#594047] uppercase tracking-wider">
                Simulate Flow Stage
              </span>
              <span className="text-[11px] font-bold text-[#8e4767]">Active Session #NX-8821</span>
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {[
                { id: 'processing', label: '1. Processing', icon: 'pulse' },
                { id: 'success', label: '2. Success', icon: 'check_circle' },
                { id: 'expired', label: '3. Expired', icon: 'schedule' },
                { id: 'used', label: '4. Claimed', icon: 'lock_reset' },
                { id: 'retry', label: '5. Retry', icon: 'sync_problem' }
              ].map(stage => {
                const isActive = activeStage === stage.id;
                return (
                  <button
                    key={stage.id}
                    onClick={() => setActiveStage(stage.id as any)}
                    className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-black transition-all duration-200 flex items-center gap-1.5 cursor-pointer border ${
                      isActive
                        ? 'bg-[#b1005e] text-white shadow-xs border-[#b1005e]'
                        : 'bg-[#f0ede9] text-[#594047] hover:bg-[#e5e2dd] border-[#e5e2dd]'
                    }`}
                    type="button"
                  >
                    {stage.icon === 'pulse' ? (
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    ) : (
                      <span className="material-symbols-outlined text-[14px]">{stage.icon}</span>
                    )}
                    <span>{stage.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STATE 1: PROCESSING */}
          {activeStage === 'processing' && (
            <div className="flex flex-col space-y-4 animate-in fade-in duration-200">
              {/* Main Progress Card */}
              <div className="relative overflow-hidden bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-md border border-[#e5e2dd] flex flex-col items-center text-center">
                {/* Pulsing Radar Animation */}
                <div className="relative my-4 flex items-center justify-center">
                  <div className="absolute w-28 h-28 rounded-full bg-[#b1005e]/10 animate-ping" />
                  <div className="absolute w-24 h-24 rounded-full bg-[#fda4c9]/30 animate-pulse" />
                  <div className="relative w-20 h-20 rounded-full bg-[#f6f3ee] shadow-inner flex items-center justify-center border border-[#e5e2dd]">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                      <circle
                        className="text-[#ebe8e3]"
                        cx="32"
                        cy="32"
                        fill="transparent"
                        r="26"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <circle
                        className="text-[#b1005e] transition-all duration-700"
                        cx="32"
                        cy="32"
                        fill="transparent"
                        r="26"
                        stroke="currentColor"
                        strokeDasharray="163.36"
                        strokeDashoffset="54"
                        strokeLinecap="round"
                        strokeWidth="4.5"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="material-symbols-outlined text-[#b1005e] text-[26px]">key</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 mt-1">
                  <span className="inline-flex items-center gap-1 bg-[#ffd8e5] text-[#3c0223] px-3 py-0.5 rounded-full text-xs font-black border border-[#fda4c9]/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b1005e] animate-pulse" />
                    ENCRYPTED HANDOFF
                  </span>
                  <h2 className="text-xl font-black text-[#1c1c19] pt-1">Initializing Salon Workspace</h2>
                  <p className="text-xs text-[#594047] max-w-xs leading-relaxed">
                    Binding your certified merchant profile, DNS mapping, and payment settlement keys.
                  </p>
                </div>

                {/* Step Tracker */}
                <div className="w-full mt-6 pt-4 bg-[#f6f3ee] rounded-2xl p-4 text-left space-y-3 border border-[#e5e2dd]">
                  {/* Step 1 Done */}
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#b1005e] text-white flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-[#1c1c19] truncate">Securing one-time token</p>
                      <p className="text-[11px] text-[#594047] truncate">ECDSA-verified 256-bit handshake</p>
                    </div>
                    <span className="text-xs text-[#b1005e] font-black shrink-0">OK</span>
                  </div>

                  {/* Step 2 In Progress */}
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#d91b77] text-white flex items-center justify-center shrink-0 animate-pulse">
                      <span className="material-symbols-outlined text-[14px]">cloud_sync</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-[#1c1c19] truncate">Deploying luxury store template</p>
                      <p className="text-[11px] text-[#b1005e] font-semibold truncate">
                        CDN propagation across Singapore &amp; Mumbai
                      </p>
                    </div>
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-[#b1005e] border-t-transparent animate-spin shrink-0" />
                  </div>

                  {/* Step 3 Pending */}
                  <div className="flex items-center gap-3 opacity-60">
                    <div className="w-6 h-6 rounded-full bg-[#ebe8e3] text-[#594047] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[14px]">qr_code_scanner</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-[#1c1c19] truncate">
                        Linking Counter QR POS &amp; Soundbox
                      </p>
                      <p className="text-[11px] text-[#594047] truncate">Auto-pairing with merchant UPI gateway</p>
                    </div>
                    <span className="material-symbols-outlined text-[#8d6f77] text-[16px]">hourglass_empty</span>
                  </div>

                  {/* Step 4 Pending */}
                  <div className="flex items-center gap-3 opacity-60">
                    <div className="w-6 h-6 rounded-full bg-[#ebe8e3] text-[#594047] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[14px]">stars</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-[#1c1c19] truncate">
                        Ready for First Client Booking
                      </p>
                      <p className="text-[11px] text-[#594047] truncate">Issuing manager cryptographic passkey</p>
                    </div>
                    <span className="material-symbols-outlined text-[#8d6f77] text-[16px]">lock</span>
                  </div>
                </div>

                {/* Keep Window Open Advisory */}
                <div className="flex items-center gap-2 mt-4 text-[#594047] text-xs">
                  <span className="material-symbols-outlined text-[#735c00] text-[18px]">info</span>
                  <span className="font-bold">Please keep this browser window active</span>
                </div>
              </div>

              {/* Live Salon Preview Teaser Card */}
              <div className="bg-[#f6f3ee] rounded-2xl p-4 flex items-center gap-3 shadow-2xs border border-[#e5e2dd]">
                <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-[#ebe8e3] relative">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLKiUfHueYR0ew0D8ZE_ZdKp3MsbJpPkNDpIlePsEJqN2-lfWnR7ujRkur3-xCfUKPZv0ouSAbcRddW28JjlVUsWkasqcF8MbGmeOtCrYbwzJiozJ_gyoywoHG0Gp1Vm0xVVVQavCJutTHfBOQKUVYQ-WX6IGutWmVFqa6KX0Nq-SGlBMi3x5Pkeafxg5Ns65wUCPXZCqxahQps2vdkmQVrRwOwUvI2B4_62vOnfvzkXwbt05Q4yw3"
                    alt="Maison Elegance interior"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-[#b1005e] uppercase font-black tracking-wider block">
                    Tenant Provision
                  </span>
                  <p className="text-sm font-black text-[#1c1c19] truncate">Maison Elegance &amp; Spa</p>
                  <p className="text-xs text-[#594047] truncate font-mono">Assigned subdomain: elegance.nexora.salon</p>
                </div>
              </div>
            </div>
          )}

          {/* STATE 2: SUCCESS */}
          {activeStage === 'success' && (
            <div className="flex flex-col space-y-4 animate-in fade-in duration-200">
              {/* Hero Celebration Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col items-center text-center relative overflow-hidden border border-[#e5e2dd]">
                {/* Subtle Decorative Radial Glow */}
                <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-[#fda4c9]/30 blur-2xl pointer-events-none" />

                {/* Success Icon with Sparkle */}
                <div className="relative my-2">
                  <div className="w-20 h-20 rounded-full bg-[#ffd9e2] text-[#8e004a] flex items-center justify-center shadow-lg">
                    <span className="material-symbols-outlined text-[44px]">verified</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-[#ffe088] text-[#241a00] flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-[16px]">celebration</span>
                  </div>
                </div>

                <div className="space-y-1 mt-1">
                  <span className="inline-flex items-center gap-1 bg-[#ffe088] text-[#241a00] px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[12px]">bolt</span> 100% Live &amp; Deployed
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-[#1c1c19] pt-1">
                    Your Salon Website is Live!
                  </h2>
                  <p className="text-xs sm:text-sm text-[#594047] max-w-xs leading-relaxed">
                    Smart booking engine, automated catalog, and real-time counter settlement are operational.
                  </p>
                </div>

                {/* Published Domain Bar */}
                <div className="w-full mt-5 bg-[#f6f3ee] rounded-2xl p-2.5 sm:p-3 flex items-center justify-between gap-2 border border-[#e5e2dd]">
                  <div className="flex items-center gap-2 min-w-0 ml-1">
                    <span className="material-symbols-outlined text-[#b1005e] text-[18px]">public</span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-[#1c1c19] truncate">
                      elegance.nexora.salon
                    </span>
                  </div>
                  <button
                    className="shrink-0 h-9 px-3.5 bg-white text-[#1c1c19] hover:bg-[#ebe8e3] rounded-xl text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer border border-[#e5e2dd] shadow-2xs"
                    onClick={handleCopyDomain}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[15px]">
                      {copiedDomain ? 'done' : 'content_copy'}
                    </span>
                    <span>{copiedDomain ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>

                {/* Live Salon Visual Preview */}
                <div className="w-full mt-4 rounded-2xl overflow-hidden relative shadow-sm h-40 border border-[#e5e2dd]">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlrgAiq2dETZQ8masTD4Ec1RzA-yBixqwkHxvVWpJEUzes-XI1aE771hnJnS315DbXZHTZTMxanhHNNxLjI4SmS0U0OfT3lZHvqQoGiXffLX7UU3BWZyeTBGx-RMvzGutGTgvhg3KW9lh2FzTkjrLmJNC15A46V-fXc-9rL9gAQjyAo99HT1xXri-q6drn8vftMu7cyAC8GfW02fn9mfVfC6m37pvS9Dx30mCqa6mDspo2rFDSnvIG"
                    alt="Salon preview"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                    <div className="flex items-center justify-between w-full text-white text-xs">
                      <span className="bg-black/50 backdrop-blur-xs px-2.5 py-0.5 rounded-full flex items-center gap-1 font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" /> Online
                      </span>
                      <span className="text-white/90 text-[11px] font-semibold">SSL Valid until 2026</span>
                    </div>
                  </div>
                </div>

                {/* Primary Action: Admin Launch */}
                <button
                  onClick={() => {
                    showToast('Redirecting to Salon Admin Dashboard...');
                    if (onNavigateToDashboard) onNavigateToDashboard();
                  }}
                  className="w-full mt-6 h-12 rounded-full bg-gradient-to-r from-[#d91b77] to-[#b1005e] text-white text-xs sm:text-sm font-black shadow-lg shadow-[#b1005e]/25 flex items-center justify-center gap-2 hover:opacity-95 transition-opacity cursor-pointer"
                  type="button"
                >
                  <span>Go to Salon Admin Panel</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>

                {/* Instant 1-Tap Share to WhatsApp */}
                <a
                  className="w-full mt-2.5 h-12 rounded-full bg-[#ebe8e3] text-[#1c1c19] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#e5e2dd] transition-colors border border-[#e5e2dd]"
                  href="https://wa.me/?text=Hi%20Team!%20Our%20new%20Nexora%20Salon%20booking%20storefront%20is%20live%20at%20https://elegance.nexora.salon"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="material-symbols-outlined text-[#8e4767] text-[20px]">share</span>
                  <span>1-Tap WhatsApp Share to Team</span>
                </a>
              </div>

              {/* Partner Growth Metric Pill Card */}
              <div className="bg-[#f6f3ee] rounded-2xl p-4 flex items-center justify-between border border-[#e5e2dd] shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#ffe088] text-[#241a00] flex items-center justify-center shrink-0 font-bold shadow-2xs">
                    <span className="material-symbols-outlined text-[20px]">monetization_on</span>
                  </div>
                  <div>
                    <p className="text-xs font-black text-[#1c1c19]">Activation Bounty Unlocked</p>
                    <p className="text-[11px] text-[#594047]">Tier-1 reward credited to partner ledger</p>
                  </div>
                </div>
                <span className="text-base font-black text-[#735c00]">+₹2,450</span>
              </div>
            </div>
          )}

          {/* STATE 3: EXPIRED TOKEN */}
          {activeStage === 'expired' && (
            <div className="flex flex-col space-y-4 animate-in fade-in duration-200">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col items-center text-center border border-[#e5e2dd]">
                {/* Amber Expiry Icon Container */}
                <div className="w-20 h-20 rounded-full bg-[#ffdad6] text-[#93000a] flex items-center justify-center my-2 shadow-xs">
                  <span className="material-symbols-outlined text-[42px]">timer_off</span>
                </div>
                <div className="space-y-1 mt-1">
                  <span className="inline-flex items-center gap-1 bg-[#ffdad6] text-[#93000a] px-3 py-0.5 rounded-full text-xs uppercase font-black border border-[#ba1a1a]/30">
                    <span className="material-symbols-outlined text-[13px]">warning</span> Session Expired
                  </span>
                  <h2 className="text-xl font-black text-[#1c1c19] pt-1">Security Token Timed Out</h2>
                  <p className="text-xs text-[#594047] max-w-xs leading-relaxed">
                    Nexora salon handoff tokens automatically expire after 15 minutes of inactivity to protect client transactional infrastructure.
                  </p>
                </div>

                {/* Detail Box with Token Digest */}
                <div className="w-full mt-5 bg-[#f6f3ee] rounded-2xl p-4 text-left space-y-2 border border-[#e5e2dd]">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#594047]">Expired Token:</span>
                    <span className="font-mono font-bold text-[#1c1c19]">NX-SEC-•••-8821</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#594047]">Issued for:</span>
                    <span className="font-bold text-[#1c1c19]">Maison Elegance</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#594047]">Assigned Mobile:</span>
                    <span className="font-bold text-[#b1005e]">+91 98421 04472</span>
                  </div>
                </div>

                {/* Action: Request New Link */}
                <button
                  onClick={() => showToast('New SMS link dispatched to +91 98421 04472')}
                  className="w-full mt-6 h-12 rounded-full bg-[#b1005e] hover:bg-[#d91b77] text-white text-xs sm:text-sm font-black shadow-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">sms</span>
                  <span>Send New SMS Link to +91 98421 04472</span>
                </button>
                <button
                  onClick={() => setActiveStage('processing')}
                  className="w-full mt-2.5 h-12 rounded-full bg-[#ebe8e3] text-[#1c1c19] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#e5e2dd] transition-colors border border-[#e5e2dd] cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">refresh</span>
                  <span>Check Token Again</span>
                </button>
              </div>

              {/* Security Info Note */}
              <div className="bg-[#f6f3ee] rounded-2xl p-4 flex items-start gap-3 border border-[#e5e2dd]">
                <span className="material-symbols-outlined text-[#594047] text-[20px] shrink-0 mt-0.5">
                  shield
                </span>
                <p className="text-xs text-[#594047] leading-relaxed">
                  Instant SMS links are cryptographically sealed and can only be decrypted on the owner's authenticated device.
                </p>
              </div>
            </div>
          )}

          {/* STATE 4: ALREADY USED TOKEN */}
          {activeStage === 'used' && (
            <div className="flex flex-col space-y-4 animate-in fade-in duration-200">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col items-center text-center border border-[#e5e2dd]">
                {/* Shield Used Icon */}
                <div className="w-20 h-20 rounded-full bg-[#ffd8e5] text-[#3c0223] flex items-center justify-center my-2 shadow-xs border border-[#fda4c9]/60">
                  <span className="material-symbols-outlined text-[42px]">vpn_key_off</span>
                </div>
                <div className="space-y-1 mt-1">
                  <span className="inline-flex items-center gap-1 bg-[#ebe8e3] text-[#594047] px-3 py-0.5 rounded-full text-xs uppercase font-black">
                    CLAIMED TOKEN
                  </span>
                  <h2 className="text-xl font-black text-[#1c1c19] pt-1">Token Already Claimed</h2>
                  <p className="text-xs text-[#594047] max-w-xs leading-relaxed">
                    This one-time handoff link was already successfully used to initialize your salon workspace on an authenticated browser.
                  </p>
                </div>

                {/* Claim Record Card */}
                <div className="w-full mt-5 bg-[#f6f3ee] rounded-2xl p-4 text-left space-y-2 border border-[#e5e2dd]">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#594047]">Claimed Timestamp</span>
                    <span className="font-bold text-[#1c1c19]">Today, 14:22 IST</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#594047]">Associated Salon</span>
                    <span className="font-black text-[#b1005e]">Maison Elegance</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#594047]">Active Admin Email</span>
                    <span className="font-semibold text-[#1c1c19]">contact@elegance.com</span>
                  </div>
                </div>

                {/* Primary Action: Login Direct */}
                <button
                  onClick={() => {
                    showToast('Navigating to Salon Login...');
                    if (onNavigateToDashboard) onNavigateToDashboard();
                  }}
                  className="w-full mt-6 h-12 rounded-full bg-[#b1005e] hover:bg-[#d91b77] text-white text-xs sm:text-sm font-black shadow-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">login</span>
                  <span>Log In to Salon Suite</span>
                </button>

                {/* Secondary: Password Reset */}
                <button
                  onClick={() => showToast('Passkey reset link sent to contact@elegance.com')}
                  className="w-full mt-2.5 h-12 rounded-full bg-[#ebe8e3] text-[#1c1c19] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#e5e2dd] transition-colors border border-[#e5e2dd] cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">lock_reset</span>
                  <span>Reset Admin Passkey</span>
                </button>
              </div>

              {/* Safety Banner */}
              <div className="bg-[#f6f3ee] rounded-2xl p-4 flex items-center gap-3 border border-[#e5e2dd]">
                <span className="material-symbols-outlined text-[#8e4767] text-[22px] shrink-0">
                  help_center
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#1c1c19]">Didn't initiate this setup?</p>
                  <p className="text-[11px] text-[#594047]">
                    Lock your store credentials immediately via partner hotline.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STATE 5: ERROR & RETRY */}
          {activeStage === 'retry' && (
            <div className="flex flex-col space-y-4 animate-in fade-in duration-200">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col items-center text-center border border-[#e5e2dd]">
                {/* Interrupted Icon */}
                <div className="w-20 h-20 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center my-2 shadow-xs">
                  <span className="material-symbols-outlined text-[42px]">cloud_off</span>
                </div>
                <div className="space-y-1 mt-1">
                  <span className="inline-flex items-center gap-1 bg-[#ffdad6] text-[#ba1a1a] px-3 py-0.5 rounded-full text-xs uppercase font-black border border-[#ba1a1a]/30">
                    ERROR #NX-504
                  </span>
                  <h2 className="text-xl font-black text-[#1c1c19] pt-1">Connection Interrupted</h2>
                  <p className="text-xs text-[#594047] max-w-xs leading-relaxed">
                    The handoff sequence halted while provisioning your counter QR Soundbox webhook. No data was lost.
                  </p>
                </div>

                {/* Diagnostic Snapshot */}
                <div className="w-full mt-5 bg-[#f6f3ee] rounded-2xl p-4 text-left space-y-2 border border-[#e5e2dd]">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#594047]">Cloud Node:</span>
                    <span className="font-bold text-[#1c1c19]">ap-south-1 (Mumbai)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#594047]">Failed Step:</span>
                    <span className="font-bold text-[#ba1a1a]">POS Gateway Sync Timeout</span>
                  </div>
                </div>

                {/* Retry CTA */}
                <button
                  onClick={handleRetryHandoff}
                  disabled={isRetrying}
                  className="w-full mt-6 h-12 rounded-full bg-[#b1005e] hover:bg-[#d91b77] text-white text-xs sm:text-sm font-black shadow-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {isRetrying ? 'progress_activity' : 'refresh'}
                  </span>
                  <span>{isRetrying ? 'Re-establishing Webhook...' : 'Retry Handoff Now'}</span>
                </button>

                {/* Advisor Direct Connect Button */}
                <a
                  className="w-full mt-2.5 h-12 rounded-full bg-[#ebe8e3] text-[#1c1c19] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#e5e2dd] transition-colors border border-[#e5e2dd]"
                  href="https://wa.me/?text=Hi%20Marcus,%20my%20salon%20handoff%20showed%20NX-504%20error.%20Can%20you%20help?"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="material-symbols-outlined text-[#8e4767] text-[20px]">support_agent</span>
                  <span>Chat with Marcus (Partner Advisor)</span>
                </a>
              </div>

              {/* Human Touch Advisor Card */}
              <div className="bg-[#f6f3ee] rounded-2xl p-4 flex items-center gap-3 shadow-2xs border border-[#e5e2dd]">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-[#ebe8e3] relative">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkIZAm1DTlWBF2SRFArZ-5qgbKngU2U4TOV7_y_r-vwdzXpKeLIcqSUSJpygcOZ4EQJhhazYeoNhMBvhgwkxKBZyfTj-YTvd_wo8beqfmR62C-oXc5Uz7as5afX_WumXbA4mjuSB5E52QdrhphUerYE-Gjw6cPc5d6Ph2Rs4AWOpYY2QTuyW4Emn0gmmStok_YWpdW329thJ6yTgVH-6enEHmPYs4wUsABeURt_2mAbATRd131fQHA"
                    alt="Marcus Vance portrait"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#1c1c19] truncate">Marcus Vance</span>
                    <span className="text-[11px] text-[#b1005e] font-semibold">• Online</span>
                  </div>
                  <p className="text-[11px] text-[#594047] truncate">Dedicated Growth Partner Lead</p>
                </div>
              </div>
            </div>
          )}

          {/* Global Footer Reassurance */}
          <div className="w-full text-center pt-2 pb-4">
            <div className="flex items-center justify-center gap-1.5 text-[#594047] text-xs">
              <span className="material-symbols-outlined text-[15px] text-[#735c00]">lock</span>
              <span>Nexora Sovereign Trust Engine • Bank-Grade AES-256</span>
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Navigation Bar */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/90 backdrop-blur-xl border-t border-[#e5e2dd] shadow-[0_-4px_20px_rgba(74,14,46,0.04)]">
        <div className="flex items-center justify-around h-16 max-w-md mx-auto sm:max-w-xl md:max-w-2xl px-4">
          <button
            onClick={() => onNavigateToWebsiteTemplates && onNavigateToWebsiteTemplates()}
            className="flex flex-col items-center justify-center w-16 h-12 text-[#594047] hover:text-[#1c1c19] transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">dashboard_customize</span>
            <span className="text-[10px] font-bold mt-0.5">Templates</span>
          </button>
          <button
            onClick={() => onNavigateToWebsiteTemplates && onNavigateToWebsiteTemplates()}
            className="flex flex-col items-center justify-center w-16 h-12 text-[#594047] hover:text-[#1c1c19] transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">tune</span>
            <span className="text-[10px] font-bold mt-0.5">Filters</span>
          </button>
          <button
            onClick={() => onNavigateToSalonIntelligence && onNavigateToSalonIntelligence()}
            className="flex flex-col items-center justify-center w-16 h-12 text-[#594047] hover:text-[#1c1c19] transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">spa</span>
            <span className="text-[10px] font-bold mt-0.5">Portfolio</span>
          </button>
          <button
            className="flex flex-col items-center justify-center w-16 h-12 text-[#b1005e] font-black transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">vpn_key</span>
            <span className="text-[10px] font-black mt-0.5">Handoff</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
