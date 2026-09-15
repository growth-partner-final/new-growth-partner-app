import React, { useState } from 'react';
import { NotificationBell } from './NotificationBell';

interface SalonIntelligenceDashboardProps {
  onNavigateToAuth?: () => void;
  onNavigateToHub?: () => void;
  onNavigateToWorkspace?: () => void;
  onNavigateToReferralTimeline?: () => void;
  onNavigateToLeaderboard?: () => void;
  onNavigateToAddSalon?: () => void;
  onNavigateToShareEarn?: () => void;
}

export const SalonIntelligenceDashboard: React.FC<SalonIntelligenceDashboardProps> = ({
  onNavigateToAuth,
  onNavigateToHub,
  onNavigateToWorkspace,
  onNavigateToReferralTimeline,
  onNavigateToLeaderboard,
  onNavigateToAddSalon,
  onNavigateToShareEarn
}) => {
  const [activeNav, setActiveNav] = useState<string>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [quickInviteCopied, setQuickInviteCopied] = useState<boolean>(false);
  const [selectedSalonFilter, setSelectedSalonFilter] = useState<'all' | 'qualified' | 'in-progress' | 'review'>('all');

  const referralUrl = 'https://nexora.network/join?ref=REF-5A45019655';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleQuickInvite = () => {
    navigator.clipboard.writeText(referralUrl);
    setQuickInviteCopied(true);
    setTimeout(() => setQuickInviteCopied(false), 2000);
  };

  return (
    <div className="w-full min-h-screen bg-[#fcf9f4] text-[#1c1c19] flex relative font-sans">
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

          {/* Primary Navigation Label */}
          <div className="px-2 text-[11px] font-bold uppercase tracking-wider text-[#594047]/70">
            Primary Navigation
          </div>

          <nav className="flex flex-col gap-1">
            {[
              { id: 'overview', label: 'Overview', icon: 'space_dashboard' },
              { id: 'my-referral-code', label: 'My Referral Code', icon: 'qr_code_2' },
              { id: 'referred-salons', label: 'Referred Salons', icon: 'storefront' },
              { id: 'refer-new-salon', label: '+ Refer New Salon', icon: 'add_business', isAction: true },
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
                    if (item.id === 'refer-new-salon' && onNavigateToAddSalon) {
                      onNavigateToAddSalon();
                      return;
                    }
                    if (item.id === 'my-referral-code' && onNavigateToShareEarn) {
                      onNavigateToShareEarn();
                      return;
                    }
                    setActiveNav(item.id);
                    if (item.id === 'referral-status-timeline' && onNavigateToReferralTimeline) {
                      onNavigateToReferralTimeline();
                    }
                  }}
                  className={`flex items-center gap-3 px-4 py-2.5 transition-all text-xs font-semibold cursor-pointer rounded-xl text-left ${
                    item.isAction
                      ? 'bg-[#ffd9e2] text-[#b1005e] font-bold hover:bg-[#ffd0dd]'
                      : isActive
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
            <button
              onClick={() => {
                if (onNavigateToLeaderboard) onNavigateToLeaderboard();
              }}
              className="flex items-center justify-between px-4 py-2 rounded-xl text-xs font-bold text-[#1c1c19] hover:bg-[#ebe8e3] transition-all cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[18px] text-[#cca730]">leaderboard</span>
                <span>Top Performers</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#ffe088] text-[#241a00] text-[10px] font-bold">
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

      {/* Main Container on lg screens with pl-72 */}
      <div className="lg:pl-72 flex-1 flex flex-col min-h-screen w-full">
        {/* Top Header */}
        <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-[#fcf9f4]/85 backdrop-blur-xl z-30 px-4 sm:px-6 shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex items-center justify-between border-b border-[#e5e2dd]">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Mobile Hamburger Menu button */}
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
              <span>Growth Partner • REF-5A45019655</span>
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

            <NotificationBell onNavigateToReferrals={onNavigateToReferralTimeline} />

            <div className="h-6 w-px bg-[#e5e2dd]"></div>

            <div className="flex items-center gap-2.5 pl-1">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs text-[#1c1c19] leading-tight font-bold">Growth Partner [DEV SAMPLE]</span>
                <span className="text-[11px] text-[#8e4767] leading-tight font-medium">Growth Lead</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#b1005e] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                GP
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
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 text-[#594047]"
                  >
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
                    { id: 'extra-onboarding-reward', label: 'Extra Onboarding Reward', icon: 'featured_seasonal_and_gifts' },
                    { id: 'profile-and-settings', label: 'Profile & Settings', icon: 'settings' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (item.id === 'my-referral-code' && onNavigateToShareEarn) {
                          setMobileMenuOpen(false);
                          onNavigateToShareEarn();
                          return;
                        }
                        setActiveNav(item.id);
                        setMobileMenuOpen(false);
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
                    if (onNavigateToHub) onNavigateToHub();
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-[#f0ede9] text-xs font-bold text-[#b1005e] text-center"
                >
                  🚀 Open Program Hub &amp; Ladder
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onNavigateToWorkspace) onNavigateToWorkspace();
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-[#f0ede9] text-xs font-bold text-[#1c1c19] text-center"
                >
                  📊 Open Partner Telemetry View
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="w-full pt-20 px-4 sm:px-6 py-6 flex-1">
          <div className="flex flex-col w-full gap-8 max-w-6xl mx-auto">
            {/* Subtle Ambient Glow Orbs */}
            <div className="relative w-full">
              <div className="absolute -top-12 left-1/4 w-96 h-96 rounded-full bg-[#b1005e]/5 blur-3xl pointer-events-none -z-10"></div>
              <div className="absolute top-1/2 right-10 w-80 h-80 rounded-full bg-[#cca730]/10 blur-3xl pointer-events-none -z-10"></div>

              {/* Section Header & Cycle Meta */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 text-[#8e4767] text-[11px] font-bold uppercase tracking-widest mb-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#b1005e] animate-pulse"></span>
                    <span>Performance Dashboard • Q3 Growth Cycle</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1c1c19] tracking-tight">
                    Growth Partner Intelligence
                  </h1>
                  <p className="text-xs sm:text-sm text-[#594047] max-w-2xl mt-1 leading-relaxed">
                    Real-time merchant acquisition metrics, tier qualification velocity, and automated settlement telemetry for your salon distribution network.
                  </p>
                </div>

                <div className="flex items-center gap-3 self-start md:self-auto bg-[#f6f3ee]/80 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-xs border border-[#e5e2dd]">
                  <div className="flex flex-col text-right">
                    <span className="text-[11px] text-[#594047] font-semibold">Cycle Window</span>
                    <span className="text-xs font-bold text-[#1c1c19]">18 Oct – 17 Nov</span>
                  </div>
                  <div className="h-8 w-px bg-[#e5e2dd]"></div>
                  <span className="material-symbols-outlined text-[#b1005e] text-[24px]">
                    calendar_today
                  </span>
                </div>
              </div>

              {/* 1. Top Overview Stat Cards (4 Cards) */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
                {/* Stat 1: Total Referred Salons */}
                <div className="group relative rounded-2xl bg-white/80 backdrop-blur-xl p-5 shadow-[0_8px_32px_0_rgba(74,14,46,0.04)] border border-[#e5e2dd] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_20px_40px_-10px_rgba(217,27,119,0.15)] flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#594047] uppercase tracking-wider">
                        Total Referred Salons
                      </span>
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#1c1c19] mt-1 tracking-tight">
                        18
                      </span>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-[#ffd9e2] flex items-center justify-center text-[#b1005e]">
                      <span className="material-symbols-outlined text-[24px]">storefront</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 mt-4 bg-[#f0ede9]/50 -mx-5 -mb-5 px-5 py-2.5 rounded-b-2xl border-t border-[#e5e2dd]">
                    <div className="flex items-center gap-1 text-[#b1005e] text-xs font-bold">
                      <span className="material-symbols-outlined text-[16px]">trending_up</span>
                      <span>+4 this month</span>
                    </div>
                    <span className="text-[11px] text-[#594047]">Pipeline: 42 leads</span>
                  </div>
                </div>

                {/* Stat 2: Active QR Activated */}
                <div className="group relative rounded-2xl bg-white/80 backdrop-blur-xl p-5 shadow-[0_8px_32px_0_rgba(74,14,46,0.04)] border border-[#e5e2dd] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_20px_40px_-10px_rgba(217,27,119,0.15)] flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#594047] uppercase tracking-wider">
                        Active QR Activated
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-3xl sm:text-4xl font-extrabold text-[#1c1c19] tracking-tight">
                          14
                        </span>
                        <span className="text-xs text-[#594047] font-semibold">/ 18 Salons</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-[#ffd8e5] flex items-center justify-center text-[#72304f]">
                      <span className="material-symbols-outlined text-[24px]">qr_code_scanner</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 mt-4 bg-[#f0ede9]/50 -mx-5 -mb-5 px-5 py-2.5 rounded-b-2xl border-t border-[#e5e2dd]">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full bg-[#b1005e]/10 text-[#b1005e] text-[11px] font-bold">
                        77.8%
                      </span>
                      <span className="text-[11px] text-[#594047]">Conversion velocity</span>
                    </div>
                    <span className="material-symbols-outlined text-[#8e4767] text-[18px]">
                      verified_user
                    </span>
                  </div>
                </div>

                {/* Stat 3: Current Cycle Earnings */}
                <div className="group relative rounded-2xl bg-white/80 backdrop-blur-xl p-5 shadow-[0_8px_32px_0_rgba(74,14,46,0.04)] border border-[#e5e2dd] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_20px_40px_-10px_rgba(217,27,119,0.15)] flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#594047] uppercase tracking-wider">
                        Current Cycle Earnings
                      </span>
                      <span className="text-3xl sm:text-4xl font-extrabold mt-1 tracking-tight text-[#d91b77]">
                        ₹42,500
                      </span>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-[#d91b77] text-white flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined text-[24px]">payments</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 mt-4 bg-[#f0ede9]/50 -mx-5 -mb-5 px-5 py-2.5 rounded-b-2xl border-t border-[#e5e2dd]">
                    <div className="flex items-center gap-1 text-[#594047] text-xs">
                      <span className="material-symbols-outlined text-[16px] text-[#735c00]">schedule</span>
                      <span>
                        Payout: <strong className="text-[#1c1c19] font-bold">Mon, 10:00 AM IST</strong>
                      </span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-[#cca730]"></span>
                  </div>
                </div>

                {/* Stat 4: Next Milestone Reward */}
                <div className="group relative rounded-2xl bg-white/80 backdrop-blur-xl p-5 shadow-[0_8px_32px_0_rgba(74,14,46,0.04)] border border-[#e5e2dd] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_20px_40px_-10px_rgba(217,27,119,0.15)] flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#735c00] uppercase tracking-wider">
                        Next Milestone Reward
                      </span>
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#1c1c19] mt-1 tracking-tight">
                        ₹25,000
                      </span>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-[#ffe088] text-[#241a00] flex items-center justify-center shadow-xs">
                      <span className="material-symbols-outlined text-[24px]">military_tech</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 mt-4 bg-[#f0ede9]/50 -mx-5 -mb-5 px-5 py-2.5 rounded-b-2xl border-t border-[#e5e2dd]">
                    <span className="px-2 py-0.5 rounded-full bg-[#735c00]/15 text-[#735c00] text-[11px] font-bold">
                      Level 3 Track
                    </span>
                    <span className="text-[11px] text-[#8e4767] font-semibold">6 Salons to unlock</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Referral Funnel Visualization */}
            <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-5 sm:p-6 shadow-[0_8px_32px_0_rgba(74,14,46,0.04)] border border-[#e5e2dd] flex flex-col gap-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 text-[#b1005e] text-xs font-bold uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[16px]">filter_alt</span>
                    <span>Acquisition Progression Pipeline</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#1c1c19]">
                    Merchant Conversion &amp; Drop-off Telemetry
                  </h2>
                </div>
                <div className="flex items-center gap-2 bg-[#f0ede9] px-3.5 py-1.5 rounded-full text-[#594047] text-xs font-semibold self-start md:self-auto border border-[#e5e2dd]">
                  <span>Network Aggregate Pass-through:</span>
                  <span className="text-[#b1005e] font-bold">21.4% (Lead-to-Qualified)</span>
                </div>
              </div>

              {/* Funnel Stage Bar Metric Cards (5 Columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
                {/* Stage 1 */}
                <div className="flex flex-col p-4 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] transition-colors hover:bg-white">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] text-[#594047] font-semibold">Step 01</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#e5e2dd] text-[#1c1c19] text-[11px] font-bold">
                      100%
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#1c1c19] truncate">Scanned / Visited</span>
                  <span className="text-lg font-extrabold text-[#b1005e] mt-1">
                    42 <span className="text-xs font-normal text-[#594047]">Leads</span>
                  </span>
                  <span className="text-[11px] text-[#8e4767] mt-2">Initial QR &amp; link interaction</span>
                </div>

                {/* Stage 2 */}
                <div className="flex flex-col p-4 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] transition-colors hover:bg-white">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] text-[#594047] font-semibold">Step 02</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#e5e2dd] text-[#1c1c19] text-[11px] font-bold">
                      61.9%
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#1c1c19] truncate">KYC Submitted</span>
                  <span className="text-lg font-extrabold text-[#b1005e] mt-1">
                    26 <span className="text-xs font-normal text-[#594047]">Salons</span>
                  </span>
                  <span className="text-[11px] text-[#ba1a1a] mt-2">Drop-off: 38.1% (16 lost)</span>
                </div>

                {/* Stage 3 */}
                <div className="flex flex-col p-4 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] transition-colors hover:bg-white">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] text-[#594047] font-semibold">Step 03</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#e5e2dd] text-[#1c1c19] text-[11px] font-bold">
                      42.8%
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#1c1c19] truncate">Mandate Verified</span>
                  <span className="text-lg font-extrabold text-[#b1005e] mt-1">
                    18 <span className="text-xs font-normal text-[#594047]">Approved</span>
                  </span>
                  <span className="text-[11px] text-[#8e4767] mt-2">Direct bank e-NACH link</span>
                </div>

                {/* Stage 4 */}
                <div className="flex flex-col p-4 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] transition-colors hover:bg-white">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] text-[#594047] font-semibold">Step 04</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#e5e2dd] text-[#1c1c19] text-[11px] font-bold">
                      33.3%
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#1c1c19] truncate">QR Kit Activated</span>
                  <span className="text-lg font-extrabold text-[#b1005e] mt-1">
                    14 <span className="text-xs font-normal text-[#594047]">Dispatched</span>
                  </span>
                  <span className="text-[11px] text-[#8e4767] mt-2">First real transaction done</span>
                </div>

                {/* Stage 5: Milestone Gate */}
                <div className="flex flex-col p-4 rounded-xl bg-[#ffd9e2]/30 border border-[#fda4c9] transition-colors hover:bg-[#ffd9e2]/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] text-[#b1005e] font-bold">Milestone Gate</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#b1005e] text-white text-[11px] font-bold">
                      21.4%
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#1c1c19] truncate">30-Day Retained</span>
                  <span className="text-lg font-extrabold text-[#b1005e] mt-1">
                    9 <span className="text-xs font-normal text-[#594047]">Qualified</span>
                  </span>
                  <span className="text-[11px] text-[#b1005e] mt-2 font-semibold">Earns Partner Multiplier</span>
                </div>
              </div>

              {/* Horizontal Multi-Stage Progress Bar */}
              <div className="flex flex-col gap-2 pt-1">
                <div className="h-3.5 w-full bg-[#e5e2dd]/60 rounded-full overflow-hidden flex gap-1 p-0.5">
                  <div className="h-full bg-[#b1005e] rounded-l-full transition-all duration-500" style={{ width: '100%' }} title="100% Leads Scanned"></div>
                  <div className="h-full bg-[#d91b77] transition-all duration-500" style={{ width: '61.9%' }} title="61.9% KYC Submitted"></div>
                  <div className="h-full bg-[#8e4767] transition-all duration-500" style={{ width: '42.8%' }} title="42.8% Verified"></div>
                  <div className="h-full bg-[#fda4c9] transition-all duration-500" style={{ width: '33.3%' }} title="33.3% QR Active"></div>
                  <div className="h-full bg-[#cca730] rounded-r-full transition-all duration-500" style={{ width: '21.4%' }} title="21.4% Qualified Retained"></div>
                </div>
                <div className="flex flex-wrap items-center justify-between text-[#594047] text-[11px] px-1 gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#b1005e]"></span>
                    <span>Lead Scan (42)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#d91b77]"></span>
                    <span>KYC In (26)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#8e4767]"></span>
                    <span>Mandate OK (18)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#fda4c9]"></span>
                    <span>Live QR (14)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#cca730]"></span>
                    <span>Milestone Qualified (9)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Current Milestone Progress & Next Reward Card */}
            <div className="rounded-2xl bg-gradient-to-br from-white via-white/95 to-[#f6f3ee] p-5 sm:p-7 shadow-[0_8px_32px_0_rgba(74,14,46,0.06)] border border-[#e5e2dd] relative overflow-hidden">
              <div className="absolute right-0 top-0 w-96 h-full bg-gradient-to-l from-[#ffd9e2]/20 to-transparent pointer-events-none"></div>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                {/* Progress Column */}
                <div className="flex flex-col flex-1 gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#ffe088] text-[#241a00] text-xs font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">workspace_premium</span>
                      Current: Level 2 • Associate Partner
                    </span>
                    <span className="material-symbols-outlined text-[#8e4767] text-[18px]">arrow_forward</span>
                    <span className="px-3 py-1 rounded-full bg-[#b1005e] text-white text-xs font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">stars</span>
                      Target: Level 3 • Growth Manager
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex items-baseline justify-between">
                      <span className="text-base sm:text-lg font-bold text-[#1c1c19]">Qualification Velocity</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-extrabold text-[#b1005e]">14</span>
                        <span className="text-xs text-[#594047]">/ 20 Onboarded (70%)</span>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-3 bg-[#e5e2dd] rounded-full overflow-hidden p-0.5">
                      <div
                        className="h-full bg-gradient-to-r from-[#d91b77] to-[#b1005e] rounded-full transition-all duration-700 shadow-xs"
                        style={{ width: '70%' }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[#594047] text-xs pt-1 flex-wrap gap-2">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-[#b1005e]">check_circle</span>
                      Only 6 verified onboardings remaining
                    </span>
                    <span className="flex items-center gap-1 text-[#b1005e] font-bold">
                      <span className="material-symbols-outlined text-[16px]">hourglass_top</span>
                      12 Days Remaining in Cycle
                    </span>
                  </div>
                </div>

                {/* Perks & Reward Showcase Envelope */}
                <div className="flex flex-col sm:flex-row gap-4 lg:w-[480px] bg-[#f0ede9]/70 backdrop-blur-md p-5 rounded-2xl border border-[#e5e2dd] shadow-inner">
                  <div className="flex flex-col justify-between flex-1">
                    <span className="text-[11px] font-bold text-[#735c00] uppercase tracking-wider">
                      Unlocked at Level 3
                    </span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#b1005e] my-1">
                      ₹25,000
                    </span>
                    <span className="text-xs text-[#594047] leading-relaxed">
                      Direct one-shot cash reward deposited straight to linked mandate bank
                    </span>
                  </div>

                  <div className="h-px sm:h-auto sm:w-px bg-[#e5e2dd]"></div>

                  <div className="flex flex-col justify-center gap-2 flex-1 text-xs">
                    <div className="flex items-center gap-2 text-[#1c1c19] font-semibold">
                      <span className="material-symbols-outlined text-[#b1005e] text-[18px]">verified</span>
                      <span>+10% Recurring Share</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#1c1c19] font-semibold">
                      <span className="material-symbols-outlined text-[#b1005e] text-[18px]">support_agent</span>
                      <span>Priority Partner Desk</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#1c1c19] font-semibold">
                      <span className="material-symbols-outlined text-[#b1005e] text-[18px]">local_shipping</span>
                      <span>Zero-Cost POS Kits</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Split Layout: Recent Salons & Live Activity Stream */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Recent Referred Salons (8 cols) */}
              <div className="lg:col-span-8 rounded-2xl bg-white/80 backdrop-blur-xl p-5 sm:p-6 shadow-[0_8px_32px_0_rgba(74,14,46,0.04)] border border-[#e5e2dd] flex flex-col gap-5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex flex-col">
                    <span className="text-[11px] text-[#8e4767] uppercase font-bold tracking-wider">
                      Merchant Network
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-[#1c1c19]">
                      Recent Referred Salons
                    </h2>
                  </div>

                  {/* Filter Pills & Refer New Button */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 bg-[#f6f3ee] p-1 rounded-full border border-[#e5e2dd]">
                      {[
                        { key: 'all', label: 'All 18' },
                        { key: 'qualified', label: 'Qualified' },
                        { key: 'in-progress', label: 'In Progress' }
                      ].map((f) => (
                        <button
                          key={f.key}
                          onClick={() => setSelectedSalonFilter(f.key as any)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                            selectedSalonFilter === f.key
                              ? 'bg-[#d91b77] text-white shadow-xs'
                              : 'text-[#594047] hover:text-[#1c1c19]'
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>

                    {onNavigateToAddSalon && (
                      <button
                        onClick={onNavigateToAddSalon}
                        className="px-3.5 py-1.5 rounded-full bg-[#d91b77] hover:bg-[#b1005e] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      >
                        <span className="material-symbols-outlined text-[16px]">add</span>
                        <span>Refer New Salon</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Salons List */}
                <div className="flex flex-col gap-3">
                  {/* Salon 1 */}
                  {(selectedSalonFilter === 'all' || selectedSalonFilter === 'qualified') && (
                    <div className="group flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl bg-[#f6f3ee] transition-all duration-200 hover:bg-white hover:shadow-xs border border-[#e5e2dd] gap-3">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-[#ffd8e5] flex items-center justify-center text-[#3c0223] shrink-0">
                          <span className="material-symbols-outlined text-[24px]">content_cut</span>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-bold text-[#1c1c19] truncate">
                              Glow &amp; Grace Unisex Salon
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-[#b1005e]/10 text-[#b1005e] text-[10px] font-bold shrink-0">
                              Mumbai
                            </span>
                          </div>
                          <span className="text-xs text-[#594047]">
                            Owner: Rajesh Sharma • Ref: #NEX-7712
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-4 shrink-0">
                        <div className="flex flex-col text-left md:text-right">
                          <span className="text-xs font-bold text-[#1c1c19]">QR Active (Day 18)</span>
                          <span className="text-[11px] text-[#594047]">KYC Verified • ₹34.8k Vol</span>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-[#b1005e] text-white text-xs font-bold flex items-center gap-1 shadow-xs">
                          <span className="material-symbols-outlined text-[14px]">check</span>
                          Qualified
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Salon 2 */}
                  {(selectedSalonFilter === 'all' || selectedSalonFilter === 'in-progress') && (
                    <div className="group flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl bg-[#f6f3ee] transition-all duration-200 hover:bg-white hover:shadow-xs border border-[#e5e2dd] gap-3">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-[#ffe088] flex items-center justify-center text-[#241a00] shrink-0">
                          <span className="material-symbols-outlined text-[24px]">spa</span>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-bold text-[#1c1c19] truncate">
                              Elegance Hair &amp; Spa Studio
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-[#e5e2dd] text-[#1c1c19] text-[10px] font-bold shrink-0">
                              Bengaluru
                            </span>
                          </div>
                          <span className="text-xs text-[#594047]">
                            Owner: Priya Nair • Ref: #NEX-8041
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-4 shrink-0">
                        <div className="flex flex-col text-left md:text-right">
                          <span className="text-xs font-bold text-[#1c1c19]">QR Active (Day 4)</span>
                          <span className="text-[11px] text-[#594047]">KYC Verified • Active Setup</span>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-[#ffd8e5] text-[#72304f] text-xs font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">autorenew</span>
                          In Progress
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Salon 3 */}
                  {(selectedSalonFilter === 'all') && (
                    <div className="group flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl bg-[#f6f3ee] transition-all duration-200 hover:bg-white hover:shadow-xs border border-[#e5e2dd] gap-3">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-[#e5e2dd] flex items-center justify-center text-[#594047] shrink-0">
                          <span className="material-symbols-outlined text-[24px]">brush</span>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-bold text-[#1c1c19] truncate">
                              Royal Looks Beauty Lounge
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-[#e5e2dd] text-[#1c1c19] text-[10px] font-bold shrink-0">
                              Delhi NCR
                            </span>
                          </div>
                          <span className="text-xs text-[#594047]">
                            Owner: Amit Verma • Ref: #NEX-9132
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-4 shrink-0">
                        <div className="flex flex-col text-left md:text-right">
                          <span className="text-xs font-bold text-[#1c1c19]">Verification Pending</span>
                          <span className="text-[11px] text-[#594047]">e-Mandate initiated</span>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-[#ffe088] text-[#241a00] text-xs font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">pending</span>
                          Under Review
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Salon 4 */}
                  {(selectedSalonFilter === 'all') && (
                    <div className="group flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl bg-[#f6f3ee] transition-all duration-200 hover:bg-white hover:shadow-xs border border-[#e5e2dd] gap-3">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a] shrink-0">
                          <span className="material-symbols-outlined text-[24px]">block</span>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-bold text-[#1c1c19] truncate">
                              Velvet Touch Salon
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-[#e5e2dd] text-[#1c1c19] text-[10px] font-bold shrink-0">
                              Pune
                            </span>
                          </div>
                          <span className="text-xs text-[#ba1a1a] font-medium truncate">
                            Reason: Address proof discrepancy
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-4 shrink-0">
                        <div className="flex flex-col text-left md:text-right">
                          <span className="text-xs font-bold text-[#ba1a1a]">Docs Failed</span>
                          <span className="text-[11px] text-[#594047]">Owner notified via SMS</span>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-[#ffdad6] text-[#93000a] text-xs font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">cancel</span>
                          Rejected
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* High Performing Visual Feature Callout */}
                <div className="p-4 rounded-xl bg-[#f0ede9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-[#e5e2dd]">
                  <div className="flex items-center gap-3.5">
                    <img
                      className="w-14 h-14 rounded-lg object-cover shadow-xs shrink-0"
                      alt="Modern high-end unisex salon interior"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuASMsIZQp4G7oM6klwazaeYsG1ocFTAF-xZA8YMYKUxo2UHudrq7AYPIBbxbWMQn4dcPRIF4tX6zC7eFiRGbcvgiXYJUDu6iDZ-6jZVRSwcVQsO08xm42BqWJc4OGTV7KaEVSc-g3xKAmAENEnuiJpGPthrw5_b9KzWURh14054MXfc5jxnN7og4BSL14CfgU5pwVbROJCZfpW9uBnYr4K-2ei3u16LIZ3tNSyTEoQZT6xmaDanA81x"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#1c1c19]">
                        Top Merchant Volume: Glow &amp; Grace
                      </span>
                      <span className="text-[11px] text-[#594047] leading-relaxed">
                        Crossed ₹30,000 threshold • Partner accelerator bonus unlocked (+₹1,500)
                      </span>
                    </div>
                  </div>
                  <button
                    className="px-4 py-2 rounded-full bg-white text-[#1c1c19] text-xs font-bold shadow-xs hover:bg-[#fcf9f4] transition-colors cursor-pointer shrink-0 border border-[#e5e2dd]"
                    type="button"
                    onClick={() => alert('Statement for Glow & Grace: Total settlement volume ₹34,800. Commission credited.')}
                  >
                    View Statement
                  </button>
                </div>
              </div>

              {/* Right Column: Live Activity Stream (4 cols) */}
              <div className="lg:col-span-4 rounded-2xl bg-white/80 backdrop-blur-xl p-5 sm:p-6 shadow-[0_8px_32px_0_rgba(74,14,46,0.04)] border border-[#e5e2dd] flex flex-col justify-between gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#d91b77] animate-ping"></span>
                      <h3 className="text-base font-bold text-[#1c1c19]">Live Stream</h3>
                    </div>
                    <span className="text-[11px] text-[#8e4767] uppercase font-bold tracking-wider">
                      Real-time
                    </span>
                  </div>

                  {/* Activity Feed List */}
                  <div className="flex flex-col gap-4 relative pt-1">
                    {/* Timeline Track Line */}
                    <div className="absolute left-4 top-3 bottom-3 w-0.5 bg-[#e5e2dd] pointer-events-none"></div>

                    {/* Event 1 */}
                    <div className="flex items-start gap-3.5 relative z-10">
                      <div className="w-8 h-8 rounded-full bg-[#b1005e] text-white flex items-center justify-center shrink-0 shadow-xs">
                        <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-bold text-[#1c1c19]">Transaction Recorded</span>
                          <span className="text-[10px] text-[#594047]">2m ago</span>
                        </div>
                        <p className="text-xs text-[#594047] mt-0.5">
                          <strong className="text-[#1c1c19]">Glow &amp; Grace</strong> processed payment of{' '}
                          <span className="text-[#b1005e] font-bold">₹1,240</span>.
                        </p>
                      </div>
                    </div>

                    {/* Event 2 */}
                    <div className="flex items-start gap-3.5 relative z-10">
                      <div className="w-8 h-8 rounded-full bg-[#cca730] text-[#4f3d00] flex items-center justify-center shrink-0 shadow-xs">
                        <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-bold text-[#1c1c19]">Kit Dispatched</span>
                          <span className="text-[10px] text-[#594047]">18m ago</span>
                        </div>
                        <p className="text-xs text-[#594047] mt-0.5">
                          Physical Soundbox &amp; QR kit dispatched for{' '}
                          <strong className="text-[#1c1c19]">Elegance Hair &amp; Spa</strong>.
                        </p>
                      </div>
                    </div>

                    {/* Event 3 */}
                    <div className="flex items-start gap-3.5 relative z-10">
                      <div className="w-8 h-8 rounded-full bg-[#ffd8e5] text-[#72304f] flex items-center justify-center shrink-0 shadow-xs">
                        <span className="material-symbols-outlined text-[16px]">qr_code_2</span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-bold text-[#1c1c19]">New Lead Scanned</span>
                          <span className="text-[10px] text-[#594047]">1h ago</span>
                        </div>
                        <p className="text-xs text-[#594047] mt-0.5">
                          Partner referral code accessed from Indiranagar hub:{' '}
                          <strong className="text-[#1c1c19]">Artisan Cuts</strong>.
                        </p>
                      </div>
                    </div>

                    {/* Event 4 */}
                    <div className="flex items-start gap-3.5 relative z-10">
                      <div className="w-8 h-8 rounded-full bg-[#ffd9e2] text-[#3e001d] flex items-center justify-center shrink-0 shadow-xs">
                        <span className="material-symbols-outlined text-[16px]">verified</span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-bold text-[#1c1c19]">Tier Accelerator</span>
                          <span className="text-[10px] text-[#594047]">3h ago</span>
                        </div>
                        <p className="text-xs text-[#594047] mt-0.5">
                          You reached 70% threshold toward <strong className="text-[#1c1c19]">Level 3 Manager</strong> tier.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Action Card inside Stream */}
                <div className="p-4 rounded-xl bg-[#f0ede9] flex flex-col gap-2 border border-[#e5e2dd]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1c1c19]">Invite Referral Link</span>
                    <span className="material-symbols-outlined text-[#b1005e] text-[18px]">share</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-[#e5e2dd]">
                    <span className="text-xs text-[#594047] truncate font-mono">
                      nexora.network/join?ref=REF-5A45019655
                    </span>
                    <button
                      onClick={handleCopyLink}
                      className="ml-auto text-[#b1005e] hover:text-[#d91b77] text-xs font-bold flex items-center gap-0.5 cursor-pointer shrink-0"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {copiedLink ? 'check' : 'content_copy'}
                      </span>
                      <span>{copiedLink ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Sticky Floating Action Button (Quick Add / Refer New Salon) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            if (onNavigateToAddSalon) onNavigateToAddSalon();
          }}
          className="group flex items-center gap-2 px-4 py-3.5 rounded-full bg-[#d91b77] text-white font-bold text-xs sm:text-sm shadow-[0_6px_20px_rgba(217,27,119,0.36)] hover:bg-[#b1005e] active:scale-95 transition-all cursor-pointer"
          type="button"
          aria-label="Refer New Salon"
        >
          <span className="material-symbols-outlined text-[20px] sm:text-[22px] group-hover:rotate-90 transition-transform">
            add
          </span>
          <span className="tracking-tight">Refer New Salon</span>
        </button>
      </div>
    </div>
  );
};
