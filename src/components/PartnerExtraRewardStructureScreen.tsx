import React, { useState, useMemo } from 'react';
import { NotificationBell } from './NotificationBell';
import { InteractiveCommissionSplitSimulator } from './InteractiveCommissionSplitSimulator';

interface PartnerExtraRewardStructureScreenProps {
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
  onNavigateToRewardsMilestones?: () => void;
}

export const PartnerExtraRewardStructureScreen: React.FC<PartnerExtraRewardStructureScreenProps> = ({
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
  onNavigateToRewardsMilestones
}) => {
  // Calculator state
  const [monthlyGmv, setMonthlyGmv] = useState<number>(250000);
  const [salonsCount, setSalonsCount] = useState<number>(12);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText('https://nexora.network/join?ref=NEX-88219');
    showToast('Partner referral link copied to clipboard!');
  };

  // Calculations
  const calculations = useMemo(() => {
    const platformFeeRatio = 0.10; // 10% platform fee
    const rampGmvPerSalon = monthlyGmv * 0.50; // 15-day ramp capture is ~50%
    const rampCompanyCommission = rampGmvPerSalon * platformFeeRatio;
    const partnerAcceleratorPerSalon = rampCompanyCommission * 0.10; // 10% of company commission
    const totalAccelerator = partnerAcceleratorPerSalon * salonsCount;

    const monthlyCommissionPerSalon = monthlyGmv * platformFeeRatio;
    const tierAPerSalon = monthlyCommissionPerSalon * 0.10 * 6; // 6 months at 10%
    const tierBPerSalon = monthlyCommissionPerSalon * 0.05 * 6; // 6 months at 5%
    const totalYearOne = (tierAPerSalon + tierBPerSalon) * salonsCount;

    const annualTierCPerSalon = monthlyCommissionPerSalon * 0.02 * 12; // 12 months at 2%
    const totalAnnualLifetime = annualTierCPerSalon * salonsCount;

    const formatINR = (val: number) => '₹' + Math.round(val).toLocaleString('en-IN');

    return {
      acceleratorFormatted: formatINR(totalAccelerator),
      yearOneFormatted: formatINR(totalYearOne),
      lifetimeAnnualFormatted: formatINR(totalAnnualLifetime),
      gmvFormatted: formatINR(monthlyGmv)
    };
  }, [monthlyGmv, salonsCount]);

  return (
    <div className="bg-[#fcf9f4] font-sans text-[#1c1c19] min-h-screen flex selection:bg-[#fda4c9]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#31302d] text-white shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200 border border-white/10 max-w-md text-center">
          <span className="material-symbols-outlined text-[18px] text-[#ffe088]">check_circle</span>
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* LEFT SIDEBAR NAVIGATION */}
      <aside className="fixed left-0 top-8 sm:top-7 bottom-0 w-72 bg-[#f6f3ee]/90 backdrop-blur-xl z-40 hidden lg:flex flex-col justify-between shadow-[0_1px_8px_rgba(74,14,46,0.04)] border-r border-[#e5e2dd]">
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Brand header */}
          <div className="px-6 pt-6 pb-4 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#b1005e] flex items-center justify-center text-white shadow-[0_4px_16px_rgba(217,27,119,0.28)]">
                <span className="material-symbols-outlined text-[20px]">token</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-[#1c1c19] tracking-tight leading-none">Nexora</span>
                <span className="text-[11px] text-[#8e4767] tracking-wider uppercase font-bold mt-0.5">
                  Growth Partner
                </span>
              </div>
            </div>

            {/* Partner quick chip */}
            <div className="mt-2 p-3 rounded-2xl bg-white shadow-2xs flex items-center justify-between border border-[#e5e2dd]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#ffe088] flex items-center justify-center text-[#241a00] font-bold">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-[#1c1c19] leading-tight">Marcus Vance</span>
                  <span className="text-[10px] text-[#594047] font-mono leading-none mt-0.5">NEX-88219</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#cca730]/20 text-[#4f3d00] text-[10px] font-black uppercase tracking-wide border border-[#cca730]/40">
                Gold
              </span>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="flex-1 px-4 py-2 flex flex-col gap-1 text-xs">
            <span className="px-3 text-[10px] font-black text-[#8d6f77] uppercase tracking-wider mb-1">
              Performance
            </span>
            <button
              onClick={() => onNavigateToDashboard && onNavigateToDashboard()}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors font-bold text-left cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">grid_view</span>
              <span>Overview</span>
            </button>
            <button
              onClick={() => onNavigateToShareEarn && onNavigateToShareEarn()}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors font-bold text-left cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">qr_code_2</span>
              <span>My Referral Code</span>
            </button>
            <button
              onClick={() => onNavigateToSalonIntelligence && onNavigateToSalonIntelligence()}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors font-bold text-left cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">storefront</span>
              <span>Referred Salons</span>
            </button>
            <button
              onClick={() => onNavigateToReferralTimeline && onNavigateToReferralTimeline()}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors font-bold text-left cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">pending_actions</span>
              <span>Referral Status Timeline</span>
            </button>

            <span className="px-3 text-[10px] font-black text-[#8d6f77] uppercase tracking-wider mt-4 mb-1">
              Finance &amp; Rewards
            </span>
            <button
              onClick={() => onNavigateToEarningsLedger && onNavigateToEarningsLedger()}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors font-bold text-left cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
              <span>Earnings &amp; Ledger</span>
            </button>
            <button
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#d91b77] text-white font-black text-left shadow-[0_4px_16px_rgba(217,27,119,0.2)] cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
              <span>Extra Onboarding Reward</span>
            </button>
            <button
              onClick={() => {
                if (onNavigateToRewardsMilestones) {
                  onNavigateToRewardsMilestones();
                } else if (onNavigateToLeaderboard) {
                  onNavigateToLeaderboard();
                }
              }}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors font-bold text-left cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">military_tech</span>
              <span>Rewards &amp; Milestones</span>
            </button>

            <span className="px-3 text-[10px] font-black text-[#8d6f77] uppercase tracking-wider mt-4 mb-1">
              System
            </span>
            <button
              onClick={() => onNavigateToProfileSettings && onNavigateToProfileSettings()}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors font-bold text-left cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">tune</span>
              <span>Profile &amp; Settings</span>
            </button>
          </nav>
        </div>

        {/* Partner Tier card */}
        <div className="p-4 m-4 rounded-2xl bg-white shadow-[0_8px_32px_0_rgba(74,14,46,0.04)] flex items-center justify-between border border-[#e5e2dd]">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#8e4767] uppercase tracking-wider">Partner Tier</span>
            <span className="text-xs font-black text-[#1c1c19]">Gold Accelerator</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#ffd8e5] flex items-center justify-center text-[#3c0223] font-bold">
            <span className="material-symbols-outlined text-[18px]">stars</span>
          </div>
        </div>
      </aside>

      {/* MAIN BODY CONTENT AREA */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="fixed top-8 sm:top-7 left-0 lg:left-72 right-0 h-16 bg-[#fcf9f4]/85 backdrop-blur-xl z-40 flex items-center justify-between px-4 sm:px-6 shadow-[0_1px_8px_rgba(74,14,46,0.04)] border-b border-[#e5e2dd]">
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 rounded-full bg-[#ffd9e2]/60 text-[#8e004a] text-xs font-bold flex items-center gap-2 border border-[#fda4c9]/50">
              <span className="w-2 h-2 rounded-full bg-[#b1005e] animate-pulse" />
              <span>Live Production Sync</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateToShareEarn && onNavigateToShareEarn()}
              className="h-9 px-4 rounded-full bg-[#d91b77] text-white text-xs font-black flex items-center gap-1.5 shadow-[0_4px_16px_rgba(217,27,119,0.28)] hover:bg-[#b1005e] transition-all cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">share</span>
              <span>Quick Invite</span>
            </button>

            <NotificationBell onNavigateToReferrals={onNavigateToReferralTimeline} />

            <button
              onClick={() => onNavigateToProfileSettings && onNavigateToProfileSettings()}
              className="w-8 h-8 rounded-full bg-[#b1005e] text-white flex items-center justify-center shadow-xs cursor-pointer"
              title="Partner Profile"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>
          </div>
        </header>

        {/* Main Content Workspace */}
        <main className="w-full pt-28 pb-24 bg-[#fcf9f4] px-4 sm:px-6 max-w-7xl mx-auto flex-grow">
          <div className="flex flex-col w-full space-y-8">
            {/* Ambient Lighting & Header */}
            <div className="relative w-full overflow-hidden">
              <div className="absolute -top-32 left-1/3 w-96 h-96 rounded-full bg-[#d91b77]/10 blur-3xl pointer-events-none" />
              <div className="absolute -top-20 right-10 w-72 h-72 rounded-full bg-[#ffe088]/20 blur-3xl pointer-events-none" />

              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-3 py-0.5 rounded-full bg-[#ffd9e2] text-[#3e001d] font-black uppercase tracking-wider">
                      Revenue Protocol v3.4
                    </span>
                    <span className="text-[#8d6f77]">/</span>
                    <span className="text-[#594047] font-semibold">Partner Yield Architecture</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#594047] text-xs font-semibold">
                    <span className="material-symbols-outlined text-[16px] text-[#735c00]">verified_user</span>
                    <span>Fintech Audited Split Rates • Instant Settlement Enabled</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1 max-w-4xl">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1c1c19] tracking-tight leading-tight">
                    Extra Onboarding Reward &amp; Commission Structure
                  </h1>
                  <p className="text-xs sm:text-base text-[#594047] leading-relaxed">
                    Maximize partner yields through early salon activation velocity and multi-year recurring growth dividends. Two decoupled, compounding earning vectors built for scale.
                  </p>
                </div>

                {/* High-Visibility Architectural Distinction Alert */}
                <div className="p-5 sm:p-6 rounded-3xl bg-[#f6f3ee]/90 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(74,14,46,0.06)] border border-[#e5e2dd] relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#d91b77] via-[#b1005e] to-[#8e4767]" />
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pl-2">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-[#ffd9e2] text-[#b1005e] flex items-center justify-center shrink-0 shadow-2xs">
                        <span className="material-symbols-outlined text-[24px]">balance</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] uppercase tracking-wider text-[#b1005e] font-black">
                            Critical Distinction
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#b1005e]" />
                          <span className="text-[11px] text-[#594047] font-bold">Independent Revenue Flows</span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#1c1c19] leading-relaxed">
                          <strong className="font-bold">Activation Rewards</strong> are velocity incentives paid upfront during the initial 15-day ramp window, <span className="text-[#b1005e] font-bold">entirely separate and non-deductible</span> from your perpetual <strong className="font-bold">Recurring Growth Share</strong> dividends. Both streams calculate concurrently.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
                      <div className="px-4 py-2 rounded-2xl bg-white shadow-2xs flex items-center gap-2 border border-[#e5e2dd]">
                        <span className="material-symbols-outlined text-[#b1005e] text-[18px]">check_circle</span>
                        <span className="text-xs font-black text-[#1c1c19]">Zero Cannibalization</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* MODULE 1: The 15-Day Onboarding Accelerator */}
            <section className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-0.5 rounded-full bg-[#fda4c9]/40 text-[#7a3656] text-[10px] font-black uppercase tracking-wider">
                      Module 01
                    </span>
                    <span className="text-xs text-[#8e4767] uppercase tracking-wider font-black">
                      Velocity Incentive
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#1c1c19] tracking-tight">
                    The 15-Day Onboarding Accelerator
                  </h2>
                </div>
                <div className="px-4 py-1.5 rounded-full bg-[#ebe8e3] text-[#594047] text-xs font-bold border border-[#e5e2dd] self-start md:self-auto">
                  First 15 Qualifying Days Post-Activation
                </div>
              </div>

              {/* Rule Banner & Milestone Map */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-8 p-6 rounded-3xl bg-white/90 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(74,14,46,0.04)] border border-[#e5e2dd] flex flex-col justify-between gap-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#8d6f77] uppercase tracking-wider font-black">
                        Commercial Accelerator Mandate
                      </span>
                      <span className="text-xs font-black text-[#b1005e]">10% Platform Revenue Share</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#1c1c19] leading-relaxed">
                      During each merchant salon’s initial 15 calendar days post-activation, partner earnings scale with terminal throughput. You receive an immediate <strong className="text-[#b1005e] font-black">10% dividend of Nexora’s net eligible platform commission</strong> derived from all processed QR and POS volumes—delivering an immediate capital injection before regular billing cycles engage.
                    </p>
                  </div>

                  {/* 15-Day Progress Milestone Map */}
                  <div className="p-5 rounded-2xl bg-[#f6f3ee] flex flex-col gap-4 border border-[#e5e2dd]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-[#1c1c19]">15-Day Golden Activation Runway</span>
                      <span className="text-xs text-[#8e4767] font-black">Uncapped Bonus Zone</span>
                    </div>

                    {/* Connecting Track */}
                    <div className="relative w-full py-2">
                      <div className="h-1.5 w-full bg-[#e5e2dd] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#b1005e] via-[#d91b77] to-[#cca730] w-4/5 rounded-full" />
                      </div>
                      {/* Multi-node Markers */}
                      <div className="flex justify-between items-center -mt-3.5 px-1">
                        {/* Node 1 */}
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-6 h-6 rounded-full bg-[#b1005e] flex items-center justify-center text-white shadow-[0_0_0_3px_rgba(217,27,119,0.2)]">
                            <span className="material-symbols-outlined text-[14px]">check</span>
                          </div>
                          <span className="text-[11px] font-black text-[#1c1c19]">Day 1</span>
                          <span className="text-[10px] text-[#594047]">KYC Live</span>
                        </div>
                        {/* Node 2 */}
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-6 h-6 rounded-full bg-[#b1005e] flex items-center justify-center text-white shadow-[0_0_0_3px_rgba(217,27,119,0.2)]">
                            <span className="material-symbols-outlined text-[14px]">check</span>
                          </div>
                          <span className="text-[11px] font-black text-[#1c1c19]">Day 5</span>
                          <span className="text-[10px] text-[#594047]">Terminal Sync</span>
                        </div>
                        {/* Node 3 (Active pulse) */}
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-6 h-6 rounded-full bg-[#d91b77] flex items-center justify-center text-white animate-pulse shadow-[0_0_0_4px_rgba(217,27,119,0.25)]">
                            <span className="material-symbols-outlined text-[14px]">bolt</span>
                          </div>
                          <span className="text-[11px] font-black text-[#b1005e]">Day 10</span>
                          <span className="text-[10px] text-[#b1005e] font-bold">Peak Velocity</span>
                        </div>
                        {/* Node 4 */}
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-6 h-6 rounded-full bg-[#ebe8e3] flex items-center justify-center text-[#594047]">
                            <span className="material-symbols-outlined text-[14px]">flag</span>
                          </div>
                          <span className="text-[11px] font-black text-[#1c1c19]">Day 15</span>
                          <span className="text-[10px] text-[#594047]">Transition to M1</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-xs text-[#594047]">
                      <span className="flex items-center gap-1 font-semibold">
                        <span className="material-symbols-outlined text-[14px] text-[#b1005e]">schedule</span> Settles weekly on Mondays
                      </span>
                      <span className="font-bold text-[#1c1c19]">Auto-switches to Recurring Tier A</span>
                    </div>
                  </div>
                </div>

                {/* Quick Benchmark Highlight Card */}
                <div className="lg:col-span-4 p-6 rounded-3xl bg-gradient-to-br from-white to-[#f6f3ee] shadow-[0_8px_32px_0_rgba(74,14,46,0.04)] border border-[#e5e2dd] flex flex-col justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#735c00]" />
                      <span className="text-[10px] text-[#8e4767] uppercase tracking-wider font-black">
                        Velocity Metric
                      </span>
                    </div>
                    <span className="text-2xl font-black text-[#1c1c19]">Up to ₹2,500+</span>
                    <span className="text-xs text-[#594047] leading-relaxed">
                      Typical upfront onboarding payout per high-density aesthetic clinic or luxury salon.
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white flex items-center gap-3 border border-[#e5e2dd]">
                    <span className="material-symbols-outlined text-[#b1005e] text-[24px]">speed</span>
                    <p className="text-xs text-[#1c1c19] font-medium leading-tight">
                      Zero ceiling limit on transaction throughput during the 15-day window.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-[#8d6f77]">Partner Multiplier</span>
                    <span className="font-black text-[#1c1c19]">Active (1.0x)</span>
                  </div>
                </div>
              </div>

              {/* Practical Worked Examples Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Example 1 */}
                <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-xl shadow-sm border border-[#e5e2dd] flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#f6f3ee] flex items-center justify-center text-[#1c1c19] border border-[#e5e2dd]">
                        <span className="material-symbols-outlined text-[18px]">storefront</span>
                      </div>
                      <div>
                        <span className="text-sm text-[#1c1c19] font-black block">Example 1: Starter Boutique</span>
                        <span className="text-[11px] text-[#594047]">Neighborhood salon baseline</span>
                      </div>
                    </div>
                    <span className="px-3 py-0.5 rounded-full bg-[#ebe8e3] text-[#594047] text-[10px] font-bold">
                      Starter Baseline
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] text-center">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#8d6f77] uppercase font-bold">15-Day GMV</span>
                      <span className="text-sm font-black text-[#1c1c19] mt-0.5">₹15,000</span>
                      <span className="text-[10px] text-[#594047]">QR Volume</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#8d6f77] uppercase font-bold">Platform Fee</span>
                      <span className="text-sm font-black text-[#8e4767] mt-0.5">₹1,500</span>
                      <span className="text-[10px] text-[#594047]">10% Fee</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#8d6f77] uppercase font-bold">Accelerator</span>
                      <span className="text-sm font-black text-[#b1005e] mt-0.5">₹150</span>
                      <span className="text-[10px] text-[#b1005e] font-black">10% Bonus</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#594047]">
                    <span className="flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-[16px] text-[#735c00]">check_circle</span> Settles cleanly to partner ledger
                    </span>
                    <span className="font-bold text-[#1c1c19]">Net: 1.00% of GMV</span>
                  </div>
                </div>

                {/* Example 2 */}
                <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-xl shadow-sm border border-[#e5e2dd] flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#ffd9e2] flex items-center justify-center text-[#b1005e]">
                        <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
                      </div>
                      <div>
                        <span className="text-sm text-[#1c1c19] font-black block">Example 2: Luxury Aesthetic Spa</span>
                        <span className="text-[11px] text-[#594047]">High-frequency terminal client</span>
                      </div>
                    </div>
                    <span className="px-3 py-0.5 rounded-full bg-[#ffd9e2] text-[#3e001d] text-[10px] font-black">
                      High Volume Tier
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] text-center">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#8d6f77] uppercase font-bold">15-Day GMV</span>
                      <span className="text-sm font-black text-[#1c1c19] mt-0.5">₹50,000</span>
                      <span className="text-[10px] text-[#594047]">Processed Vol</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#8d6f77] uppercase font-bold">Platform Fee</span>
                      <span className="text-sm font-black text-[#8e4767] mt-0.5">₹5,000</span>
                      <span className="text-[10px] text-[#594047]">10% Fee</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#8d6f77] uppercase font-bold">Accelerator</span>
                      <span className="text-sm font-black text-[#b1005e] mt-0.5">₹500</span>
                      <span className="text-[10px] text-[#b1005e] font-black">10% Instant</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#594047]">
                    <span className="flex items-center gap-1 text-[#b1005e] font-bold">
                      <span className="material-symbols-outlined text-[16px]">bolt</span> 3.3x greater velocity realization
                    </span>
                    <span className="font-bold text-[#b1005e]">Accelerated Payout</span>
                  </div>
                </div>
              </div>
            </section>

            {/* MODULE 2: Recurring Growth Share Model */}
            <section className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-0.5 rounded-full bg-[#cca730]/20 text-[#4f3d00] text-[10px] font-black uppercase tracking-wider">
                      Module 02
                    </span>
                    <span className="text-xs text-[#8e4767] uppercase tracking-wider font-black">
                      Perpetual Dividend
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#1c1c19] tracking-tight">
                    Recurring Growth Share Schedule
                  </h2>
                </div>
                <span className="text-xs text-[#594047] font-semibold">Post-15 Day Activation Longevity Royalty</span>
              </div>

              {/* Tier Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Tier A */}
                <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-xl shadow-sm border border-[#e5e2dd] flex flex-col justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-0.5 rounded-full bg-[#ffd9e2] text-[#3e001d] text-xs font-black">
                        Tier A
                      </span>
                      <span className="text-xs text-[#8d6f77] font-bold">Months 1 – 6</span>
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-4xl font-black text-[#b1005e]">10%</span>
                      <span className="text-xs text-[#594047]">of Net Eligible Revenue</span>
                    </div>
                    <p className="text-xs text-[#594047] leading-relaxed">
                      High stabilization incentive designed to reward close partner engagement during the critical initial half-year operational phase.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#e5e2dd] flex flex-col gap-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#594047]">Billing Cadence</span>
                      <span className="font-bold text-[#1c1c19]">Monthly Recurrent</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#594047]">Focus</span>
                      <span className="font-black text-[#b1005e]">Volume Stabilization</span>
                    </div>
                  </div>
                </div>

                {/* Tier B */}
                <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-xl shadow-sm border border-[#e5e2dd] flex flex-col justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-0.5 rounded-full bg-[#ffd8e5] text-[#3c0223] text-xs font-black">
                        Tier B
                      </span>
                      <span className="text-xs text-[#8d6f77] font-bold">Months 7 – 12</span>
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-4xl font-black text-[#8e4767]">5%</span>
                      <span className="text-xs text-[#594047]">of Net Eligible Revenue</span>
                    </div>
                    <p className="text-xs text-[#594047] leading-relaxed">
                      Maturation dividend compensating sustained terminal utilization as the salon transitions to self-sustaining daily payment flows.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#e5e2dd] flex flex-col gap-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#594047]">Billing Cadence</span>
                      <span className="font-bold text-[#1c1c19]">Monthly Recurrent</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#594047]">Focus</span>
                      <span className="font-black text-[#8e4767]">Merchant Maturity</span>
                    </div>
                  </div>
                </div>

                {/* Tier C */}
                <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-xl shadow-sm border border-[#e5e2dd] flex flex-col justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-0.5 rounded-full bg-[#ffe088] text-[#241a00] text-xs font-black">
                        Tier C
                      </span>
                      <span className="text-xs text-[#8d6f77] font-bold">12+ Months / Lifetime</span>
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-4xl font-black text-[#735c00]">2%</span>
                      <span className="text-xs text-[#594047]">Perpetual Portfolio Royalty</span>
                    </div>
                    <p className="text-xs text-[#594047] leading-relaxed">
                      Lifetime annuity share on every future billing cycle for as long as the merchant processes payments on the Nexora platform.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#e5e2dd] flex flex-col gap-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#594047]">Billing Cadence</span>
                      <span className="font-bold text-[#1c1c19]">Infinite Recurring</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#594047]">Focus</span>
                      <span className="font-black text-[#735c00]">Compounding Annuity</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comparative Matrix Table */}
              <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-xl shadow-sm border border-[#e5e2dd] flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#b1005e] text-[20px]">table_chart</span>
                    <span className="text-base font-black text-[#1c1c19]">Comparative Dual-Stream Specification Matrix</span>
                  </div>
                  <span className="text-xs text-[#8d6f77] font-bold">Independent Contractual Vectors</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="text-[#594047] font-bold border-b border-[#e5e2dd]">
                        <th className="pb-3 pr-4 font-black text-[#8d6f77] uppercase text-[10px]">Specification Vector</th>
                        <th className="pb-3 px-4 font-black text-[#b1005e]">Activation Reward (Days 1–15)</th>
                        <th className="pb-3 pl-4 font-black text-[#8e4767]">Recurring Share (Months 1–12+)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e5e2dd]">
                      <tr className="bg-[#f6f3ee]/60">
                        <td className="py-3 pr-4 font-bold text-[#1c1c19]">Frequency &amp; Nature</td>
                        <td className="py-3 px-4 text-[#1c1c19]">One-Time Velocity Bonus</td>
                        <td className="py-3 pl-4 text-[#1c1c19]">Continuous Monthly Recurrent Royalty</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 font-bold text-[#1c1c19]">Calculation Foundation</td>
                        <td className="py-3 px-4 text-[#1c1c19]">10% of Nexora eligible platform commission</td>
                        <td className="py-3 pl-4 text-[#1c1c19]">10% (M1-6), 5% (M7-12), 2% (M13+) of net revenue</td>
                      </tr>
                      <tr className="bg-[#f6f3ee]/60">
                        <td className="py-3 pr-4 font-bold text-[#1c1c19]">Payout Velocity</td>
                        <td className="py-3 px-4 text-[#b1005e] font-black">Immediate on 15th-Day Closure</td>
                        <td className="py-3 pl-4 text-[#1c1c19]">Every Monday 10:00 AM IST (Automated Ledger)</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 font-bold text-[#1c1c19]">Merchant Eligibility</td>
                        <td className="py-3 px-4 text-[#1c1c19]">≥ ₹5,000 terminal/QR GMV in 15 days</td>
                        <td className="py-3 pl-4 text-[#1c1c19]">Active terminal transaction in current month</td>
                      </tr>
                      <tr className="bg-[#f6f3ee]/60">
                        <td className="py-3 pr-4 font-bold text-[#1c1c19]">Portfolio Impact</td>
                        <td className="py-3 px-4 text-[#1c1c19]">Boosts Day-1 Acquisition Yield</td>
                        <td className="py-3 pl-4 text-[#735c00] font-black">Builds Passive Valuation Multiple</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* INTERACTIVE COMMISSION SPLIT SIMULATOR (SLIDER & MULTI-TIER REVENUE IMPACT) */}
            <section className="flex flex-col gap-4">
              <InteractiveCommissionSplitSimulator
                initialSalons={salonsCount}
                initialAvgRevenue={monthlyGmv}
                onNavigateToLedger={onNavigateToEarningsLedger}
                onNavigateToRewards={onNavigateToRewardsMilestones || onNavigateToLeaderboard}
              />
            </section>

            {/* MODULE 3: Interactive Yield Calculator Widget */}
            <section className="p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(74,14,46,0.06)] border border-[#e5e2dd] flex flex-col gap-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#b1005e] animate-pulse" />
                    <span className="text-[10px] text-[#b1005e] uppercase tracking-wider font-black">
                      Dynamic Simulation
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#1c1c19] tracking-tight">
                    Interactive Yield Calculator
                  </h2>
                  <p className="text-xs text-[#594047]">
                    Model both velocity upfront rewards and compounding monthly growth royalties simultaneously.
                  </p>
                </div>
                <div className="px-4 py-1.5 rounded-full bg-[#f6f3ee] text-[#1c1c19] text-xs font-bold border border-[#e5e2dd]">
                  Platform Fee Benchmark: <span className="font-black text-[#b1005e]">10% Gross Net</span>
                </div>
              </div>

              {/* Sliders and Inputs Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-6 flex flex-col gap-6 justify-center p-6 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd]">
                  {/* Slider 1: Monthly GMV per salon */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-[#1c1c19] font-black" htmlFor="gmvRange">
                        Estimated Monthly GMV Per Salon
                      </label>
                      <span className="text-base font-black text-[#b1005e]">
                        {calculations.gmvFormatted}
                      </span>
                    </div>
                    <input
                      className="w-full accent-[#d91b77] cursor-pointer h-2.5 bg-[#e5e2dd] rounded-lg appearance-none"
                      id="gmvRange"
                      max={1500000}
                      min={50000}
                      step={25000}
                      type="range"
                      value={monthlyGmv}
                      onChange={(e) => setMonthlyGmv(parseFloat(e.target.value))}
                    />
                    <div className="flex justify-between text-[10px] text-[#8d6f77] font-semibold">
                      <span>₹50k</span>
                      <span>₹5 Lakhs</span>
                      <span>₹10 Lakhs</span>
                      <span>₹15 Lakhs</span>
                    </div>
                  </div>

                  {/* Slider 2: Number of Salons Onboarded */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-[#1c1c19] font-black" htmlFor="salonsRange">
                        Salons Onboarded (Monthly Cohort)
                      </label>
                      <span className="text-base font-black text-[#8e4767]">
                        {salonsCount} {salonsCount === 1 ? 'Salon' : 'Salons'}
                      </span>
                    </div>
                    <input
                      className="w-full accent-[#8e4767] cursor-pointer h-2.5 bg-[#e5e2dd] rounded-lg appearance-none"
                      id="salonsRange"
                      max={50}
                      min={1}
                      step={1}
                      type="range"
                      value={salonsCount}
                      onChange={(e) => setSalonsCount(parseInt(e.target.value, 10))}
                    />
                    <div className="flex justify-between text-[10px] text-[#8d6f77] font-semibold">
                      <span>1 Salon</span>
                      <span>15 Salons</span>
                      <span>30 Salons</span>
                      <span>50 Salons</span>
                    </div>
                  </div>

                  {/* Metric Helper Note */}
                  <div className="p-3 rounded-xl bg-white flex items-start gap-2 border border-[#e5e2dd]">
                    <span className="material-symbols-outlined text-[16px] text-[#594047] shrink-0 mt-0.5">info</span>
                    <span className="text-[11px] text-[#594047] leading-relaxed">
                      Assumes standard 15-day ramp capture is ~50% of monthly projected GMV run-rate. Calculations include both isolated streams.
                    </span>
                  </div>
                </div>

                {/* Real-Time Calculated Output Display */}
                <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Output 1: 15-Day Accelerator Payout */}
                  <div className="p-5 rounded-2xl bg-white shadow-2xs flex flex-col justify-between gap-1 border border-[#e5e2dd]">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#b1005e] font-black uppercase tracking-wider">
                        Stream 1: Upfront
                      </span>
                      <span className="material-symbols-outlined text-[18px] text-[#b1005e]">bolt</span>
                    </div>
                    <div className="flex flex-col my-1">
                      <span className="text-3xl font-black text-[#1c1c19]">
                        {calculations.acceleratorFormatted}
                      </span>
                      <span className="text-xs text-[#594047] font-semibold">15-Day Immediate Accelerator</span>
                    </div>
                    <span className="text-[10px] text-[#8d6f77]">Instant one-off velocity bonus</span>
                  </div>

                  {/* Output 2: Year 1 Recurring Yield */}
                  <div className="p-5 rounded-2xl bg-white shadow-2xs flex flex-col justify-between gap-1 border border-[#e5e2dd]">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#8e4767] font-black uppercase tracking-wider">
                        Stream 2: Year 1
                      </span>
                      <span className="material-symbols-outlined text-[18px] text-[#8e4767]">repeat</span>
                    </div>
                    <div className="flex flex-col my-1">
                      <span className="text-3xl font-black text-[#1c1c19]">
                        {calculations.yearOneFormatted}
                      </span>
                      <span className="text-xs text-[#594047] font-semibold">M1–M12 Cumulative Share</span>
                    </div>
                    <span className="text-[10px] text-[#8d6f77]">Combines Tier A (10%) &amp; Tier B (5%)</span>
                  </div>

                  {/* Output 3: Lifetime Portfolio Annuity */}
                  <div className="sm:col-span-2 p-5 rounded-2xl bg-gradient-to-r from-[#f6f3ee] via-[#f0ede9] to-[#f6f3ee] border border-[#e5e2dd] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#735c00] uppercase tracking-wider font-black">
                          Lifetime Yield Engine
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#735c00]" />
                        <span className="text-xs text-[#594047] font-semibold">Tier C Perpetual (2%)</span>
                      </div>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-2xl sm:text-3xl font-black text-[#1c1c19]">
                          {calculations.lifetimeAnnualFormatted}
                        </span>
                        <span className="text-xs text-[#594047]">/ Year in Pure Annuity Royalty</span>
                      </div>
                    </div>
                    <button
                      onClick={() => showToast('Simulating compounding portfolio scaling across 36 months...')}
                      className="px-5 py-2.5 rounded-full bg-[#d91b77] hover:bg-[#b1005e] text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-[0_4px_16px_rgba(217,27,119,0.28)] hover:scale-[1.02] transition-transform cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">account_balance</span>
                      <span>Simulate Portfolio</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ & PARTNER ADVISORY GUIDE */}
            <section className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-[#8e4767] uppercase tracking-wider font-black">
                  Partner Advisory Guide
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#1c1c19] tracking-tight">
                  Frequently Answered Operational Questions
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* FAQ 1 */}
                <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-xl shadow-sm border border-[#e5e2dd] flex flex-col gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#f6f3ee] flex items-center justify-center text-[#b1005e] border border-[#e5e2dd]">
                    <span className="material-symbols-outlined text-[20px]">help_outline</span>
                  </div>
                  <h3 className="text-sm font-black text-[#1c1c19]">How is Nexora Eligible Commission defined?</h3>
                  <p className="text-xs text-[#594047] leading-relaxed">
                    Eligible Commission represents the platform’s net contractual revenue charged to merchants for processing, CRM, and digital billing after interchange deduction (~10% of processed transaction throughput).
                  </p>
                </div>

                {/* FAQ 2 */}
                <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-xl shadow-sm border border-[#e5e2dd] flex flex-col gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#f6f3ee] flex items-center justify-center text-[#8e4767] border border-[#e5e2dd]">
                    <span className="material-symbols-outlined text-[20px]">undo</span>
                  </div>
                  <h3 className="text-sm font-black text-[#1c1c19]">Does a salon refund affect my 15-day accelerator?</h3>
                  <p className="text-xs text-[#594047] leading-relaxed">
                    Refunds and chargebacks are reconciled in real time against gross GMV. If an onboarding transaction is formally reversed prior to weekly ledger closure, the accelerator reward updates proportionally without penalty.
                  </p>
                </div>

                {/* FAQ 3 */}
                <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-xl shadow-sm border border-[#e5e2dd] flex flex-col gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#f6f3ee] flex items-center justify-center text-[#735c00] border border-[#e5e2dd]">
                    <span className="material-symbols-outlined text-[20px]">alarm_on</span>
                  </div>
                  <h3 className="text-sm font-black text-[#1c1c19]">When are recurring share payouts settled to my bank?</h3>
                  <p className="text-xs text-[#594047] leading-relaxed">
                    All accumulated Recurring Growth Share dividends execute automated settlement runs every <strong className="text-[#1c1c19] font-bold">Monday at 10:00 AM IST</strong> directly via IMPS / NEFT into your verified business bank account on file.
                  </p>
                </div>
              </div>
            </section>

            {/* Contextual Quick Action Footer Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#b1005e] via-[#d91b77] to-[#8e4767] text-white shadow-[0_8px_32px_0_rgba(217,27,119,0.2)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
                  <span className="material-symbols-outlined text-[28px]">rocket_launch</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-black leading-tight">Ready to Onboard New Salons?</span>
                  <span className="text-xs text-white/90 mt-0.5">
                    Unlock instant 15-day accelerator rewards on your very next partner referral.
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopyLink}
                  className="h-11 px-6 rounded-full bg-white text-[#b1005e] text-xs font-black shadow-md hover:scale-105 transition-all cursor-pointer"
                  type="button"
                >
                  Copy Referral Link
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
