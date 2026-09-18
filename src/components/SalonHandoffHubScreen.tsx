import React, { useState } from 'react';
import { NotificationBell } from './NotificationBell';

interface SalonHandoffHubScreenProps {
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

export const SalonHandoffHubScreen: React.FC<SalonHandoffHubScreenProps> = ({
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
  // Simulator State
  const [activeState, setActiveState] = useState<'state-processing' | 'state-success' | 'state-expired' | 'state-used' | 'state-error'>('state-processing');
  const [isRetrying, setIsRetrying] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    showToast(`${label} copied to clipboard!`);
  };

  const handleRetrySimulation = () => {
    setIsRetrying(true);
    showToast('Retrying connection to upstream payment switch...');
    setTimeout(() => {
      setIsRetrying(false);
      setActiveState('state-success');
      showToast('Connection established! Salon launchpad is 100% Live.');
    }, 1500);
  };

  return (
    <div className="bg-[#fcf9f4] font-sans text-[#1c1c19] min-h-screen flex flex-col justify-between relative selection:bg-[#fda4c9]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#31302d] text-white shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200 border border-white/10 max-w-md text-center">
          <span className="material-symbols-outlined text-[18px] text-[#ffe088]">check_circle</span>
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="fixed top-8 sm:top-7 inset-x-0 z-40 bg-[#fcf9f4]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(74,14,46,0.04)] border-b border-[#e5e2dd]">
        <div className="h-20 w-full px-4 sm:px-6 max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigateToHub && onNavigateToHub()}
              className="flex items-center gap-2.5 bg-transparent border-0 p-0 text-left cursor-pointer hover:opacity-90"
              title="Return to Main Home Landing Page"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#b1005e] to-[#d91b77] text-white flex items-center justify-center font-black text-lg shadow-sm">
                N
              </div>
              <span className="text-lg font-black text-[#1c1c19] tracking-tight hidden sm:inline-block">
                Nexora
              </span>
              <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#ffd8e5] text-[#3c0223] text-[11px] font-extrabold uppercase tracking-wider border border-[#fda4c9]/60">
                Growth Partner
              </span>
            </button>

            <div className="hidden lg:flex items-center gap-1.5 text-[#594047] text-xs font-semibold">
              <button
                onClick={() => onNavigateToHub && onNavigateToHub()}
                className="hover:text-[#b1005e] transition-colors cursor-pointer"
                type="button"
              >
                Portal
              </button>
              <span className="material-symbols-outlined text-[#8d6f77] text-[16px]">chevron_right</span>
              <button
                onClick={() => onNavigateToSalonIntelligence && onNavigateToSalonIntelligence()}
                className="hover:text-[#b1005e] transition-colors cursor-pointer"
                type="button"
              >
                Salon Launchpad
              </button>
              <span className="material-symbols-outlined text-[#8d6f77] text-[16px]">chevron_right</span>
              <span className="text-[#1c1c19] font-bold">Cryptographic Handoff Hub</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigateToHub && onNavigateToHub()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#594047] bg-white hover:bg-[#ebe8e3] hover:text-[#b1005e] border border-[#e5e2dd] transition-all cursor-pointer shadow-xs active:scale-95"
              title="Return to Main Home Landing Page"
            >
              <span className="material-symbols-outlined text-[16px] text-[#b1005e]">home</span>
              <span>Home</span>
            </button>
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f6f3ee] text-[#594047] text-xs font-semibold border border-[#e5e2dd]">
              <span className="material-symbols-outlined text-[#b1005e] text-[14px]">lock</span>
              <span className="font-mono">nexora.growth/portal/launchpad/templates</span>
              <span className="text-[#8d6f77] font-normal">(Clean URL)</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffd9e2]/60 text-[#8e004a] text-xs font-bold shadow-2xs border border-[#fda4c9]/50">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>
                Referral Applied: <strong className="tracking-wide">REF-5A45019655</strong>
              </span>
            </div>

            <NotificationBell onNavigateToReferrals={onNavigateToReferralTimeline} />

            <button
              onClick={() => onNavigateToProfileSettings && onNavigateToProfileSettings()}
              className="w-9 h-9 rounded-full bg-[#b1005e] text-white flex items-center justify-center shadow-sm cursor-pointer"
              title="Partner Settings"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full pt-6 pb-24 bg-[#fcf9f4]">
        <div className="relative w-full overflow-hidden bg-[#fcf9f4]">
          <div className="absolute -top-24 left-1/4 w-96 h-96 bg-[#b1005e]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 right-10 w-80 h-80 bg-[#cca730]/5 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 flex flex-col gap-6 relative z-10">
            {/* Top Utility & Clean URL Bar */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 sm:p-5 shadow-sm border border-[#e5e2dd] flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full lg:w-auto">
                <div className="w-10 h-10 rounded-full bg-[#ffd9e2]/60 text-[#8e004a] flex items-center justify-center shrink-0 border border-[#fda4c9]/60">
                  <span className="material-symbols-outlined text-[#b1005e]">verified_user</span>
                </div>
                <div className="min-w-0 flex flex-col">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs uppercase tracking-wider text-[#b1005e] font-black">
                      Public Handoff Session
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b1005e] animate-pulse" />
                    <span className="text-xs text-[#594047] font-medium">
                      No Internal Partner or Salon IDs Exposed
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-[#1c1c19] truncate font-mono">
                      https://launch.nexora.app/handoff/session
                    </span>
                    <button
                      className="hover:text-[#b1005e] transition-colors text-[#8d6f77] cursor-pointer"
                      onClick={() => handleCopy('https://launch.nexora.app/handoff/session', 'Clean Handoff URL')}
                      title="Copy Clean URL"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">content_copy</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 self-stretch lg:self-auto justify-end">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#ebe8e3] text-[#1c1c19] text-xs font-semibold border border-[#e5e2dd]">
                  <span className="material-symbols-outlined text-[#735c00] text-[16px]">tag</span>
                  <span className="font-mono text-[#594047]">SHA-256 Nonce:</span>
                  <span className="font-mono font-bold text-[#1c1c19]">nx_pub_9a8f...b2e</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f6f3ee] text-[#594047] text-xs font-bold border border-[#e5e2dd]">
                  <span className="material-symbols-outlined text-[#b1005e] text-[15px]">enhanced_encryption</span>
                  <span>256-Bit E2EE Vault</span>
                </div>
              </div>
            </div>

            {/* Simulator Bar (State Switcher) */}
            <div className="bg-[#f6f3ee] rounded-2xl p-2.5 shadow-2xs border border-[#e5e2dd] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 px-2 text-[#594047] text-xs font-bold shrink-0">
                <span className="material-symbols-outlined text-[#b1005e] text-[18px]">tune</span>
                <span className="uppercase tracking-wider">Lifecycle State Simulator</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'state-processing', label: '1. Processing (Active)', icon: 'sync' },
                  { id: 'state-success', label: '2. Success & Launch', icon: 'check_circle' },
                  { id: 'state-expired', label: '3. Token Expired', icon: 'timer_off' },
                  { id: 'state-used', label: '4. Already Redeemed', icon: 'history_toggle_off' },
                  { id: 'state-error', label: '5. Webhook Error', icon: 'error' }
                ].map(item => {
                  const isActive = activeState === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveState(item.id as any)}
                      className={`px-3.5 py-1.5 rounded-full text-xs transition-all flex items-center gap-1.5 cursor-pointer font-bold border ${
                        isActive
                          ? 'bg-[#b1005e] text-white shadow-xs border-[#b1005e]'
                          : 'bg-[#ebe8e3] hover:bg-[#e5e2dd] text-[#594047] hover:text-[#1c1c19] border-[#e5e2dd]'
                      }`}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[14px]">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* MAIN LIFECYCLE CONTAINER */}
            <div className="w-full">
              {/* ============================================== */}
              {/* STATE 1: PROCESSING (ACTIVE)                   */}
              {/* ============================================== */}
              {activeState === 'state-processing' && (
                <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left 8-cols: Progress pipeline */}
                    <div className="lg:col-span-8 bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-md border border-[#e5e2dd] flex flex-col gap-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-0.5 rounded-full bg-[#ffd8e5] text-[#3c0223] text-xs font-black uppercase border border-[#fda4c9]/60">
                              Stage 4 of 4
                            </span>
                            <span className="text-[#735c00] text-xs flex items-center gap-1 font-bold">
                              <span className="material-symbols-outlined text-[15px]">bolt</span> Real-time Pipeline
                            </span>
                          </div>
                          <h1 className="text-xl sm:text-2xl font-black text-[#1c1c19] tracking-tight mt-1">
                            Deploying Cryptographic Handoff
                          </h1>
                          <p className="text-xs sm:text-sm text-[#594047] mt-1 leading-relaxed">
                            Establishing isolated multi-tenant parameters, issuing tokenized merchant keys, and binding Nexora POS endpoints.
                          </p>
                        </div>

                        {/* Progress Ring */}
                        <div className="flex items-center gap-4 bg-[#f6f3ee] p-3 rounded-2xl shrink-0 border border-[#e5e2dd]">
                          <div className="relative w-16 h-16 flex items-center justify-center">
                            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                              <path
                                className="text-[#ebe8e3]"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3.5"
                              />
                              <path
                                className="text-[#d91b77]"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeDasharray="78, 100"
                                strokeLinecap="round"
                                strokeWidth="3.5"
                              />
                            </svg>
                            <span className="absolute text-base font-black text-[#1c1c19]">78%</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] uppercase text-[#594047] font-black tracking-wider">
                              Est. Completion
                            </span>
                            <span className="text-sm font-black text-[#b1005e]">~4 Seconds</span>
                          </div>
                        </div>
                      </div>

                      {/* Pipeline Nodes */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 relative">
                        {/* Node 1 */}
                        <div className="bg-[#f6f3ee] rounded-2xl p-4 flex flex-col gap-1 border border-[#e5e2dd]">
                          <div className="flex items-center justify-between">
                            <span className="w-7 h-7 rounded-full bg-[#b1005e] text-white flex items-center justify-center shadow-xs text-xs font-bold">
                              <span className="material-symbols-outlined text-[16px]">check</span>
                            </span>
                            <span className="text-xs font-black text-[#b1005e]">0.4s</span>
                          </div>
                          <span className="text-xs font-black text-[#1c1c19] mt-2">1. Securing Attribution</span>
                          <span className="text-[11px] text-[#594047] leading-relaxed">
                            Referral signature verified and escrow unlocked.
                          </span>
                        </div>

                        {/* Node 2 */}
                        <div className="bg-[#f6f3ee] rounded-2xl p-4 flex flex-col gap-1 border border-[#e5e2dd]">
                          <div className="flex items-center justify-between">
                            <span className="w-7 h-7 rounded-full bg-[#b1005e] text-white flex items-center justify-center shadow-xs text-xs font-bold">
                              <span className="material-symbols-outlined text-[16px]">check</span>
                            </span>
                            <span className="text-xs font-black text-[#b1005e]">1.2s</span>
                          </div>
                          <span className="text-xs font-black text-[#1c1c19] mt-2">2. Compiling Tokens</span>
                          <span className="text-[11px] text-[#594047] leading-relaxed">
                            Tailwind theme primitives, typography &amp; styles baked.
                          </span>
                        </div>

                        {/* Node 3 */}
                        <div className="bg-[#f6f3ee] rounded-2xl p-4 flex flex-col gap-1 border border-[#e5e2dd]">
                          <div className="flex items-center justify-between">
                            <span className="w-7 h-7 rounded-full bg-[#b1005e] text-white flex items-center justify-center shadow-xs text-xs font-bold">
                              <span className="material-symbols-outlined text-[16px]">check</span>
                            </span>
                            <span className="text-xs font-black text-[#b1005e]">2.1s</span>
                          </div>
                          <span className="text-xs font-black text-[#1c1c19] mt-2">3. Generating Keys</span>
                          <span className="text-[11px] text-[#594047] leading-relaxed">
                            Ed25519 cryptographic keypairs provisioned.
                          </span>
                        </div>

                        {/* Node 4 (Active) */}
                        <div className="bg-[#ffd9e2]/30 rounded-2xl p-4 flex flex-col gap-1 border border-[#fda4c9]/60 shadow-xs">
                          <div className="flex items-center justify-between">
                            <span className="w-7 h-7 rounded-full bg-[#b1005e] text-white flex items-center justify-center animate-pulse shadow-xs">
                              <span className="material-symbols-outlined text-[16px]">hourglass_top</span>
                            </span>
                            <span className="text-[11px] font-black text-[#b1005e] uppercase animate-pulse">
                              Live
                            </span>
                          </div>
                          <span className="text-xs font-black text-[#b1005e] mt-2">4. POS Webhooks</span>
                          <span className="text-[11px] text-[#594047] leading-relaxed">
                            Subscribing salon terminal &amp; UPI intent hooks.
                          </span>
                        </div>
                      </div>

                      {/* Realtime Terminal Console Output */}
                      <div className="bg-[#31302d] rounded-2xl p-4 font-mono text-xs text-[#f3f0eb] flex flex-col gap-2 shadow-inner border border-black/20">
                        <div className="flex items-center justify-between pb-1 border-b border-white/10">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#cca730]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#b1005e]" />
                            <span className="text-white/60 text-[11px] font-bold ml-2">
                              Telemetry Stream: /dev/nexora-launchpad
                            </span>
                          </div>
                          <span className="text-[11px] text-[#ffd9e2] font-black uppercase">Socket: Connected</span>
                        </div>
                        <div className="space-y-1 text-[11px] pt-1 leading-relaxed">
                          <p className="text-[#e5e2dd]">
                            <span className="text-[#e9c349]">[11:43:01.102]</span> Attestation proof valid:{' '}
                            <span className="text-[#ffb1c8]">0x4c88...e831</span> verified by Nexora Key Authority.
                          </p>
                          <p className="text-[#e5e2dd]">
                            <span className="text-[#e9c349]">[11:43:02.441]</span> Compiled 142 component styles, asset bundle mounted at CDN edge POP (BOM-1).
                          </p>
                          <p className="text-[#e5e2dd]">
                            <span className="text-[#e9c349]">[11:43:03.018]</span> Merchant ledger created. ₹500 kickstart liquidity voucher reserved.
                          </p>
                          <p className="text-[#ffd9e2] flex items-center gap-1.5">
                            <span className="text-[#e9c349]">[11:43:03.955]</span>{' '}
                            <span className="inline-block w-2 h-2 bg-[#ffd9e2] rounded-full animate-ping" />{' '}
                            Exchanging ephemeral HMAC signature with Payment Gateway Webhook...
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right 4-cols: Verification Specs */}
                    <div className="lg:col-span-4 flex flex-col gap-4">
                      <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-md border border-[#e5e2dd] flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-black text-[#1c1c19]">Handoff Ledger</h3>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#ffd9e2] text-[#8e004a] text-[10px] font-black uppercase border border-[#fda4c9]/60">
                            Dynamic
                          </span>
                        </div>
                        <div className="space-y-3 text-xs">
                          <div className="flex items-center justify-between pb-2 border-b border-[#e5e2dd]">
                            <span className="text-[#594047]">Merchant Type</span>
                            <span className="font-bold text-[#1c1c19]">Luxury Salon &amp; Spa</span>
                          </div>
                          <div className="flex items-center justify-between pb-2 border-b border-[#e5e2dd]">
                            <span className="text-[#594047]">Assigned Domain</span>
                            <span className="font-mono font-bold text-[#b1005e] truncate max-w-[160px]">
                              elegance.nexora.salon
                            </span>
                          </div>
                          <div className="flex items-center justify-between pb-2 border-b border-[#e5e2dd]">
                            <span className="text-[#594047]">Partner Attribution</span>
                            <span className="font-mono text-[#1c1c19] font-bold">REF-5A45019655</span>
                          </div>
                          <div className="flex items-center justify-between pb-2 border-b border-[#e5e2dd]">
                            <span className="text-[#594047]">Escrow Credit</span>
                            <span className="font-black text-[#735c00]">₹500.00 Ready</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[#594047]">Token Validity</span>
                            <span className="font-bold text-[#1c1c19] flex items-center gap-1">
                              <span className="material-symbols-outlined text-[16px] text-[#735c00]">timer</span> 14m 28s remaining
                            </span>
                          </div>
                        </div>
                        <div className="p-3 rounded-2xl bg-[#f6f3ee] flex items-start gap-2.5 border border-[#e5e2dd]">
                          <span className="material-symbols-outlined text-[#b1005e] text-[20px] shrink-0 mt-0.5">
                            lock_clock
                          </span>
                          <p className="text-[11px] text-[#594047] leading-relaxed">
                            Do not close or reload this window. Session will transition automatically once edge TLS certificates are issued.
                          </p>
                        </div>
                      </div>

                      {/* Security Attestation Badges */}
                      <div className="bg-[#f6f3ee] rounded-2xl p-4 flex items-center justify-around text-center gap-2 border border-[#e5e2dd]">
                        <div className="flex flex-col items-center">
                          <span className="material-symbols-outlined text-[#b1005e] text-[24px]">verified</span>
                          <span className="text-xs font-black text-[#1c1c19] mt-1">ISO 27001</span>
                          <span className="text-[10px] text-[#594047]">Audited Infra</span>
                        </div>
                        <div className="w-px h-8 bg-[#e5e2dd]" />
                        <div className="flex flex-col items-center">
                          <span className="material-symbols-outlined text-[#735c00] text-[24px]">account_balance</span>
                          <span className="text-xs font-black text-[#1c1c19] mt-1">RBI PA/PG</span>
                          <span className="text-[10px] text-[#594047]">Intermediary</span>
                        </div>
                        <div className="w-px h-8 bg-[#e5e2dd]" />
                        <div className="flex flex-col items-center">
                          <span className="material-symbols-outlined text-[#8e4767] text-[24px]">shield</span>
                          <span className="text-xs font-black text-[#1c1c19] mt-1">PCI-DSS 4.0</span>
                          <span className="text-[10px] text-[#594047]">Level 1 Direct</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ============================================== */}
              {/* STATE 2: HANDOFF SUCCESS & LIVE LAUNCH         */}
              {/* ============================================== */}
              {activeState === 'state-success' && (
                <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                  <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-xl border border-[#e5e2dd] flex flex-col gap-8 relative overflow-hidden">
                    <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#b1005e]/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#e5e2dd]">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-[#b1005e] flex items-center justify-center text-white shadow-lg shadow-[#b1005e]/30 shrink-0">
                          <span className="material-symbols-outlined text-[32px]">task_alt</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-0.5 rounded-full bg-[#ffe088] text-[#241a00] text-xs font-black uppercase tracking-wide border border-[#cca730]/40">
                              Ready for Business
                            </span>
                            <span className="text-xs text-[#594047] font-semibold">Provisioned in 4.2 seconds</span>
                          </div>
                          <h2 className="text-2xl sm:text-3xl font-black text-[#1c1c19] tracking-tight mt-1">
                            Salon Launchpad Live &amp; Handed Off
                          </h2>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 flex-wrap">
                        <button
                          className="px-5 py-3 rounded-full bg-[#ebe8e3] hover:bg-[#e5e2dd] text-[#1c1c19] text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer border border-[#e5e2dd]"
                          onClick={() => handleCopy('sk_live_98ab42_c9efb011', 'Encrypted Handoff Secret')}
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">key</span>
                          <span>Copy Handoff Secret</span>
                        </button>
                        <button
                          onClick={() => {
                            showToast('Launching Salon Merchant Dashboard...');
                            if (onNavigateToDashboard) onNavigateToDashboard();
                          }}
                          className="px-6 py-3 rounded-full bg-[#d91b77] hover:bg-[#b1005e] text-white text-xs sm:text-sm font-black flex items-center gap-2 transition-all shadow-md cursor-pointer"
                          type="button"
                        >
                          <span>Open Salon Dashboard</span>
                          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </button>
                      </div>
                    </div>

                    {/* Bento Mosaic for Success State */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Card 1: Clean Web Address */}
                      <div className="bg-[#f6f3ee] rounded-2xl p-6 flex flex-col justify-between gap-4 border border-[#e5e2dd]">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase text-[#594047] tracking-wider">
                              Live Public Link
                            </span>
                            <span className="w-2.5 h-2.5 rounded-full bg-[#b1005e]" />
                          </div>
                          <h3 className="text-base font-black text-[#1c1c19]">Production URL</h3>
                          <div className="p-3 bg-white rounded-xl flex items-center justify-between gap-2 mt-2 shadow-inner border border-[#e5e2dd]">
                            <span className="font-mono text-xs font-bold text-[#b1005e] truncate">
                              https://elegance.nexora.salon
                            </span>
                            <button
                              className="hover:text-[#b1005e] text-[#8d6f77] cursor-pointer"
                              onClick={() => handleCopy('https://elegance.nexora.salon', 'Production URL')}
                              type="button"
                            >
                              <span className="material-symbols-outlined text-[18px]">content_copy</span>
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#594047]">
                          <span className="material-symbols-outlined text-[#b1005e] text-[16px]">
                            domain_verification
                          </span>
                          <span>Global DNS propagation finished</span>
                        </div>
                      </div>

                      {/* Card 2: One-Time Merchant Credentials */}
                      <div className="bg-[#f6f3ee] rounded-2xl p-6 flex flex-col justify-between gap-4 border border-[#e5e2dd]">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase text-[#594047] tracking-wider">
                              Security Access
                            </span>
                            <span className="px-2 py-0.5 rounded bg-[#ffdad6] text-[#93000a] text-[10px] font-black">
                              ONE-TIME EXPORT
                            </span>
                          </div>
                          <h3 className="text-base font-black text-[#1c1c19]">Merchant Master Key</h3>
                          <div className="p-3 bg-white rounded-xl font-mono text-xs text-[#1c1c19] flex items-center justify-between mt-2 shadow-inner border border-[#e5e2dd]">
                            <span className="truncate font-bold">nx_merch_live_9a77e108</span>
                            <button
                              className="text-[#b1005e] hover:underline text-xs font-bold cursor-pointer"
                              onClick={() => showToast('Merchant credentials .env bundle exported to downloads.')}
                              type="button"
                            >
                              Download .env
                            </button>
                          </div>
                        </div>
                        <p className="text-[11px] text-[#594047] leading-relaxed">
                          Store this master token safely. Nexora zero-knowledge protocol permanently deletes plaintext keys in 60s.
                        </p>
                      </div>

                      {/* Card 3: ₹500 Growth Credit Applied */}
                      <div className="bg-[#ffd8e5]/40 rounded-2xl p-6 flex flex-col justify-between gap-4 border border-[#fda4c9]/60">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase text-[#3c0223] tracking-wider">
                              Partner Incentive
                            </span>
                            <span className="material-symbols-outlined text-[#b1005e]">redeem</span>
                          </div>
                          <h3 className="text-base font-black text-[#1c1c19]">₹500.00 Applied</h3>
                          <p className="text-xs text-[#594047] mt-1 leading-relaxed">
                            Kickstart ledger balance credited via Growth Partner <strong>REF-5A45019655</strong>.
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-[#fda4c9]/40">
                          <span className="text-xs font-semibold text-[#594047]">Gateway Status</span>
                          <span className="text-xs font-bold text-[#b1005e] flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#b1005e]" /> 0% Fee Tier Active
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Action Steps */}
                    <div className="bg-[#f6f3ee] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 border border-[#e5e2dd]">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#ffe088] text-[#241a00] flex items-center justify-center shrink-0 shadow-2xs font-bold">
                          <span className="material-symbols-outlined text-[24px]">point_of_sale</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-[#1c1c19]">
                            Next Milestone: Pair Countertop Terminal
                          </h4>
                          <p className="text-xs text-[#594047]">
                            Connect your salon tablet or POS reader to start accepting soundbox and card payments.
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => showToast('Initiating hardware pairing dialog for counter standee...')}
                        className="px-5 py-2.5 rounded-full bg-[#ebe8e3] hover:bg-[#e5e2dd] text-[#1c1c19] text-xs font-bold shrink-0 cursor-pointer border border-[#e5e2dd]"
                        type="button"
                      >
                        Setup Hardware
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ============================================== */}
              {/* STATE 3: TOKEN EXPIRED (15M TIMEOUT)           */}
              {/* ============================================== */}
              {activeState === 'state-expired' && (
                <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                  <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-xl border border-[#e5e2dd] flex flex-col items-center text-center max-w-3xl mx-auto gap-6">
                    <div className="w-20 h-20 rounded-full bg-[#f6f3ee] flex items-center justify-center text-[#735c00] shadow-md border border-[#e5e2dd]">
                      <span className="material-symbols-outlined text-[40px]">timer_off</span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-[#f6f3ee] text-[#594047] text-xs mx-auto font-bold border border-[#e5e2dd]">
                        <span className="material-symbols-outlined text-[16px] text-[#735c00]">lock</span>
                        <span>Session Timed Out</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-black text-[#1c1c19] tracking-tight mt-2">
                        Handoff Session Expired
                      </h2>
                      <p className="text-xs sm:text-base text-[#594047] max-w-xl mx-auto leading-relaxed">
                        For security against unauthorized URL replay and terminal hijacking, this handoff session expired after 15 minutes of inactivity.
                      </p>
                    </div>

                    <div className="bg-[#f6f3ee] rounded-2xl p-5 w-full max-w-lg text-left flex flex-col gap-3 text-xs border border-[#e5e2dd]">
                      <div className="flex items-center justify-between text-[#594047]">
                        <span>Attempted Token Hash</span>
                        <span className="font-mono text-[#1c1c19] font-bold">nx_tk_expired_00192e</span>
                      </div>
                      <div className="flex items-center justify-between text-[#594047]">
                        <span>Associated Salon</span>
                        <span className="font-bold text-[#1c1c19]">Elegance Luxury Hair &amp; Nails</span>
                      </div>
                      <div className="flex items-center justify-between text-[#594047]">
                        <span>Designated Partner</span>
                        <span className="font-bold text-[#b1005e]">Growth Partner (REF-5A45019655)</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md justify-center">
                      <button
                        className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#d91b77] text-white text-xs sm:text-sm font-black hover:bg-[#b1005e] shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                        onClick={() => showToast('Fresh OTP dispatched to salon owner +91 98***-***12.')}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">sms</span>
                        <span>Request Fresh OTP Token</span>
                      </button>
                      <a
                        className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#ebe8e3] hover:bg-[#e5e2dd] text-[#1c1c19] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all border border-[#e5e2dd]"
                        href="https://wa.me/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="material-symbols-outlined text-[18px]">support_agent</span>
                        <span>Contact Partner Support</span>
                      </a>
                    </div>

                    <p className="text-[11px] text-[#8d6f77] font-mono">
                      Reference Error:{' '}
                      <code className="font-bold text-[#594047]">SEC_TOKEN_LIFECYCLE_TTL_EXCEEDED</code>
                    </p>
                  </div>
                </div>
              )}

              {/* ============================================== */}
              {/* STATE 4: TOKEN ALREADY USED / REVOKED          */}
              {/* ============================================== */}
              {activeState === 'state-used' && (
                <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                  <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-xl border border-[#e5e2dd] flex flex-col max-w-3xl mx-auto gap-6">
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-[#ffdad6] text-[#93000a] flex items-center justify-center shrink-0 shadow-md border border-[#ba1a1a]/20">
                        <span className="material-symbols-outlined text-[34px]">gpp_bad</span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-xs font-black uppercase tracking-wider border border-[#ba1a1a]/30">
                            Single-Use Invalidation
                          </span>
                          <span className="text-xs text-[#594047]">Revocation Event ID: #REV-99214</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-[#1c1c19] tracking-tight mt-1">
                          Handoff Token Already Redeemed
                        </h2>
                        <p className="text-xs sm:text-sm text-[#594047] mt-1 leading-relaxed">
                          This cryptographic link was previously redeemed and cannot be processed again. To prevent dual-claiming, Nexora single-use nonces are destroyed upon successful handshake.
                        </p>
                      </div>
                    </div>

                    {/* Forensic details */}
                    <div className="bg-[#f6f3ee] rounded-2xl p-5 flex flex-col gap-3 border border-[#e5e2dd]">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#594047]">
                        Audit Redemption Fingerprint
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                        <div>
                          <span className="text-[11px] text-[#594047] block">Redeemed Timestamp</span>
                          <span className="text-xs font-bold text-[#1c1c19]">Today at 11:42:18 AM IST</span>
                        </div>
                        <div>
                          <span className="text-[11px] text-[#594047] block">Client IP &amp; Region</span>
                          <span className="font-mono font-bold text-[#1c1c19] text-xs">103.21.58.12 (Mumbai, IN)</span>
                        </div>
                        <div>
                          <span className="text-[11px] text-[#594047] block">Authenticated Browser</span>
                          <span className="text-xs font-bold text-[#1c1c19]">Chrome / macOS 14.5</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-[#e5e2dd]">
                      <div className="flex items-center gap-2 text-[#594047] text-xs">
                        <span className="material-symbols-outlined text-[#b1005e] text-[18px]">verified</span>
                        <span>Salon is currently live and active under this credential.</span>
                      </div>
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button
                          className="px-4 py-2.5 rounded-full bg-[#ebe8e3] hover:bg-[#e5e2dd] text-[#ba1a1a] text-xs font-bold transition-all cursor-pointer border border-[#e5e2dd]"
                          onClick={() => showToast('Security flag raised for manual review by partner compliance desk.')}
                          type="button"
                        >
                          Flag Unauthorized Access
                        </button>
                        <button
                          onClick={() => {
                            if (onNavigateToDashboard) onNavigateToDashboard();
                          }}
                          className="px-6 py-2.5 rounded-full bg-[#d91b77] hover:bg-[#b1005e] text-white text-xs font-black transition-all shadow-md cursor-pointer"
                          type="button"
                        >
                          Log In to Salon Portal
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ============================================== */}
              {/* STATE 5: VERIFICATION ERROR & RETRY            */}
              {/* ============================================== */}
              {activeState === 'state-error' && (
                <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                  <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-xl border border-[#e5e2dd] flex flex-col max-w-3xl mx-auto gap-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-[#ba1a1a] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#ba1a1a]/20">
                        <span className="material-symbols-outlined text-[34px]">sync_problem</span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-xs font-black uppercase tracking-wider border border-[#ba1a1a]/30">
                            Error Code: ERR_WEBHOOK_TIMEOUT
                          </span>
                          <span className="text-xs text-[#594047]">Failure at Step 4</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-[#1c1c19] tracking-tight mt-1">
                          Unable to Bind Salon Terminal
                        </h2>
                        <p className="text-xs sm:text-sm text-[#594047] mt-1 leading-relaxed">
                          The upstream payment switch failed to respond within the allocated 10-second synchronization window. Your configured theme tokens and referral bonuses remain securely staged.
                        </p>
                      </div>
                    </div>

                    {/* Diagnostic Card */}
                    <div className="bg-[#f6f3ee] rounded-2xl p-5 flex flex-col gap-2 font-mono text-xs text-[#1c1c19] border border-[#e5e2dd]">
                      <div className="flex items-center justify-between text-[11px] font-bold text-[#594047] uppercase font-sans pb-1">
                        <span>Diagnostic Stack</span>
                        <span className="text-[#ba1a1a]">HTTP 504 Gateway Timeout</span>
                      </div>
                      <div className="p-3 bg-white rounded-xl text-[#ba1a1a] space-y-1 text-[11px] shadow-inner border border-[#e5e2dd]">
                        <p>&gt; POST https://pos-gateway.nexora.internal/v2/tenant/bind</p>
                        <p>&gt; Connection reset by remote peer (timed out waiting for POS terminal ack)</p>
                        <p className="text-[#594047]">&gt; Safe rollback executed: No duplicate merchant charges incurred.</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-[#e5e2dd]">
                      <div className="flex items-center gap-2 text-[#594047] text-xs">
                        <span className="material-symbols-outlined text-[#735c00] text-[18px]">info</span>
                        <span>Retry will resume from Step 4 without token regeneration.</span>
                      </div>
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <a
                          className="px-4 py-2.5 rounded-full bg-[#ebe8e3] hover:bg-[#e5e2dd] text-[#1c1c19] text-xs font-bold flex items-center gap-1.5 transition-all border border-[#e5e2dd]"
                          href="https://wa.me/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span className="material-symbols-outlined text-[16px] text-[#735c00]">chat</span>
                          <span>WhatsApp Growth Support</span>
                        </a>
                        <button
                          className="px-6 py-2.5 rounded-full bg-[#d91b77] hover:bg-[#b1005e] text-white text-xs font-black shadow-md flex items-center gap-2 transition-all cursor-pointer"
                          disabled={isRetrying}
                          onClick={handleRetrySimulation}
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {isRetrying ? 'progress_activity' : 'replay'}
                          </span>
                          <span>{isRetrying ? 'Retrying Connection...' : 'Retry Handoff (Attempt 2/3)'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Compliance & Clean Architecture Note */}
            <div className="bg-white/80 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xs text-[#594047] text-xs border border-[#e5e2dd]">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#b1005e] text-[20px]">verified_user</span>
                <span>
                  Nexora Zero-Knowledge Architecture: No raw partner commission percentages or private salon identifiers are transmitted over public query params.
                </span>
              </div>
              <div className="flex items-center gap-4 shrink-0 font-bold">
                <a className="text-[#b1005e] hover:underline" href="#">
                  Cryptographic Whitepaper
                </a>
                <a className="text-[#1c1c19] hover:text-[#b1005e]" href="#">
                  API Telemetry
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#f6f3ee] py-8 border-t border-[#e5e2dd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#594047]">
          <div>© 2025 Nexora Fintech Growth Network. Certified Salon Launch Partner Ecosystem.</div>
          <div className="flex items-center gap-4 font-semibold">
            <a className="hover:text-[#1c1c19] transition-colors" href="#">
              Partner Agreement
            </a>
            <a className="hover:text-[#1c1c19] transition-colors" href="#">
              Security &amp; Clean URL Policy
            </a>
            <a className="hover:text-[#1c1c19] transition-colors" href="#">
              Support Desk
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
