import React, { useState, useEffect } from 'react';
import { NotificationBell } from './NotificationBell';

interface ReferralStatusTimelineProps {
  onNavigateToAuth?: () => void;
  onNavigateToHub?: () => void;
  onNavigateToWorkspace?: () => void;
  onNavigateToSalonIntelligence?: () => void;
  onNavigateToLeaderboard?: () => void;
  onNavigateToShareEarn?: () => void;
  onNavigateToAddSalon?: () => void;
}

export const ReferralStatusTimeline: React.FC<ReferralStatusTimelineProps> = ({
  onNavigateToAuth,
  onNavigateToHub,
  onNavigateToWorkspace,
  onNavigateToSalonIntelligence,
  onNavigateToLeaderboard,
  onNavigateToShareEarn,
  onNavigateToAddSalon
}) => {
  const [activeNav, setActiveNav] = useState<string>('referral-status-timeline');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [selectedSalon, setSelectedSalon] = useState<'elegance' | 'velvet'>('elegance');
  const [quickInviteCopied, setQuickInviteCopied] = useState<boolean>(false);
  const [isWaReminderSent, setIsWaReminderSent] = useState<boolean>(false);
  const [isCallingOwner, setIsCallingOwner] = useState<boolean>(false);
  const [exportNotice, setExportNotice] = useState<boolean>(false);
  const [selectedStageFilter, setSelectedStageFilter] = useState<number | null>(null);

  // Live countdown timer state (starts at 4h 22m 18s)
  const [secondsRemaining, setSecondsRemaining] = useState<number>(4 * 3600 + 22 * 60 + 18);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (totalSecs: number) => {
    const hrs = String(Math.floor(totalSecs / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSecs % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSecs % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  const referralUrl = 'https://nexora.network/join?ref=REF-5A45019655';

  const handleQuickInvite = () => {
    navigator.clipboard.writeText(referralUrl);
    setQuickInviteCopied(true);
    setTimeout(() => setQuickInviteCopied(false), 2000);
  };

  const handleSendWhatsAppReminder = () => {
    setIsWaReminderSent(true);
    setTimeout(() => {
      setIsWaReminderSent(false);
    }, 4500);
  };

  const handleExportLog = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Merchant ID,Salon Name,Stage,SLA Status,Assigned Lead,Referral Date,Commission Projected\n"
      + "NX-M-90214,Elegance Studio & Spa,Stage 4: Hardware & Live,Optimal,Rahul Sharma,2024-11-12,₹7500\n"
      + "NX-M-90382,Velvet Touch Lounge,Stage 2: Digital KYC,Flagged Address Mismatch,Sanjay Mehta,2024-11-14,₹7500\n"
      + "NX-M-88412,Glow & Grace Unisex Salon,Stage 5: Full Qualified,Achieved,Rajesh Sharma,2024-10-28,₹7500\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Nexora_SLA_Audit_Export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
  };

  return (
    <div className="w-full min-h-screen bg-[#fcf9f4] text-[#1c1c19] flex relative font-sans">
      {/* Toast notifications */}
      {exportNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1c1c19] text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 border border-white/10 text-xs font-semibold animate-bounce">
          <span className="material-symbols-outlined text-[#d91b77] text-[18px]">check_circle</span>
          <span>SLA Audit Log exported successfully (.CSV)</span>
        </div>
      )}

      {isCallingOwner && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-[#e5e2dd] flex flex-col items-center text-center gap-3">
            <div className="w-14 h-14 rounded-full bg-[#ffd8e5] text-[#b1005e] flex items-center justify-center animate-pulse">
              <span className="material-symbols-outlined text-[28px]">call</span>
            </div>
            <h3 className="font-bold text-base text-[#1c1c19]">Connecting to Salon Owner</h3>
            <p className="text-xs text-[#594047]">
              Dialing Velvet Touch Lounge primary contact <br />
              <strong className="text-[#1c1c19]">+91 98204 88392 (Pooja Deshmukh)</strong>
            </p>
            <div className="flex gap-2 w-full mt-2">
              <button
                onClick={() => setIsCallingOwner(false)}
                className="flex-1 py-2 rounded-xl bg-[#ba1a1a] text-white text-xs font-bold hover:bg-[#93000a] transition-colors"
              >
                End Call
              </button>
            </div>
          </div>
        </div>
      )}

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

          {/* Primary Navigation */}
          <div className="px-2 text-[11px] font-bold uppercase tracking-wider text-[#594047]/70">
            Primary Navigation
          </div>

          <nav className="flex flex-col gap-1">
            {[
              { id: 'overview', label: 'Overview', icon: 'space_dashboard' },
              { id: 'my-referral-code', label: 'My Referral Code', icon: 'qr_code_2' },
              { id: 'referred-salons', label: 'Referred Salons', icon: 'storefront' },
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
                    setActiveNav(item.id);
                    if (item.id === 'overview' && onNavigateToSalonIntelligence) {
                      onNavigateToSalonIntelligence();
                    }
                  }}
                  className={`flex items-center gap-3 px-4 py-2.5 transition-all text-xs font-semibold cursor-pointer rounded-xl text-left ${
                    isActive
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

      {/* Main Container */}
      <div className="lg:pl-72 flex-1 flex flex-col min-h-screen w-full">
        {/* Top Header */}
        <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-[#fcf9f4]/85 backdrop-blur-xl z-30 px-4 sm:px-6 shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex items-center justify-between border-b border-[#e5e2dd]">
          <div className="flex items-center gap-3 sm:gap-4">
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

            <NotificationBell />

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
                        setActiveNav(item.id);
                        setMobileMenuOpen(false);
                        if (item.id === 'overview' && onNavigateToSalonIntelligence) {
                          onNavigateToSalonIntelligence();
                        }
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
                    if (onNavigateToSalonIntelligence) onNavigateToSalonIntelligence();
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-[#f0ede9] text-xs font-bold text-[#b1005e] text-center"
                >
                  💈 Open Salon Intelligence
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onNavigateToHub) onNavigateToHub();
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-[#f0ede9] text-xs font-bold text-[#1c1c19] text-center"
                >
                  🚀 Program Hub &amp; Ladder
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="w-full pt-20 px-4 sm:px-6 py-6 flex-1">
          <div className="flex flex-col w-full gap-8 max-w-6xl mx-auto">
            {/* Dynamic Ambient Backdrops & Top Headline Metric Strip */}
            <div className="relative w-full overflow-hidden rounded-2xl bg-[#f6f3ee] p-5 sm:p-7 shadow-xs border border-[#e5e2dd]">
              <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-[#b1005e]/5 blur-3xl pointer-events-none"></div>
              <div className="absolute left-1/3 -bottom-24 w-80 h-80 rounded-full bg-[#e9c349]/10 blur-3xl pointer-events-none"></div>

              {/* Top Headline Metric Strip */}
              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-[#8e4767] text-xs uppercase tracking-wider mb-1 font-bold">
                    <span className="material-symbols-outlined text-[16px] text-[#b1005e]">hub</span>
                    <span>Pipeline Intelligence</span>
                    <span className="text-[#e1bdc6]">•</span>
                    <span className="text-[#594047] font-medium">Real-Time SLA Audits</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1c1c19] tracking-tight">
                    Referral Lifecycle &amp; Milestone Roadmap
                  </h1>
                </div>

                {/* Live Pipeline Overview Pills */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-xs border border-[#e5e2dd]">
                    <span className="w-2 h-2 rounded-full bg-[#d91b77] animate-pulse"></span>
                    <span className="text-xs text-[#1c1c19]">
                      Active Pipeline: <strong className="text-[#b1005e] font-bold">14 Salons</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-xs border border-[#e5e2dd]">
                    <span className="material-symbols-outlined text-[#735c00] text-[18px]">monetization_on</span>
                    <span className="text-xs text-[#1c1c19]">
                      Projected Commission: <strong className="text-[#1c1c19] font-bold">₹1,18,500</strong>
                    </span>
                  </div>
                  <button
                    onClick={handleExportLog}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#d91b77] text-white text-xs font-bold shadow-md hover:bg-[#b1005e] transition-all cursor-pointer active:scale-95"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">file_download</span>
                    <span>Export Audit Log</span>
                  </button>
                </div>
              </div>

              {/* 1. REFERRAL LIFECYCLE ROADMAP (Stage Pipeline 1-5) */}
              <div className="relative z-10 w-full bg-white/90 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-[0_8px_32px_0_rgba(74,14,46,0.04)] border border-[#e5e2dd]">
                <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#ffd9e2] flex items-center justify-center text-[#3e001d]">
                      <span className="material-symbols-outlined text-[18px]">route</span>
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-[#1c1c19]">
                        Standard Merchant Onboarding Trajectory
                      </h2>
                      <p className="text-xs text-[#594047]">
                        Click any lifecycle phase below to isolate bottleneck cohorts across all active referrals.
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-4 text-xs font-semibold text-[#8e4767]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#b1005e]"></span> Optimal Speed
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#735c00]"></span> SLA Watch
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span> Discrepancy
                    </span>
                  </div>
                </div>

                {/* Five Milestone Nodes Connected by Precision Track */}
                <div className="relative grid grid-cols-1 md:grid-cols-5 gap-4">
                  {/* Connecting baseline track (desktop only) */}
                  <div className="hidden md:block absolute top-7 left-12 right-12 h-0.5 bg-[#e5e2dd] z-0"></div>

                  {/* Stage 1 */}
                  <div
                    onClick={() => setSelectedStageFilter(selectedStageFilter === 1 ? null : 1)}
                    className={`relative z-10 flex flex-col items-start p-4 rounded-xl transition-all duration-200 hover:shadow-md cursor-pointer group border ${
                      selectedStageFilter === 1
                        ? 'bg-[#ffd9e2]/50 border-[#d91b77]'
                        : 'bg-[#f6f3ee] border-[#e5e2dd]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <div className="w-10 h-10 rounded-full bg-[#b1005e] text-white flex items-center justify-center text-xs font-bold shadow-[0_2px_10px_rgba(217,27,119,0.3)] group-hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-[20px]">check</span>
                      </div>
                      <span className="text-[11px] text-[#594047] bg-[#e5e2dd] px-2 py-0.5 rounded-full font-bold">
                        Avg 2 min
                      </span>
                    </div>
                    <span className="text-[11px] text-[#b1005e] uppercase tracking-wider font-bold">Stage 01</span>
                    <h3 className="text-xs sm:text-sm text-[#1c1c19] font-bold mt-0.5">Lead &amp; Signup</h3>
                    <p className="text-xs text-[#594047] mt-1 leading-relaxed">
                      Direct link visit, phone verification, and merchant account claim.
                    </p>
                    <div className="mt-4 pt-1 flex items-center justify-between w-full">
                      <span className="text-[11px] text-[#8e4767] font-semibold">4 Active In Queue</span>
                      <span className="material-symbols-outlined text-[16px] text-[#594047] group-hover:translate-x-1 transition-transform">
                        east
                      </span>
                    </div>
                  </div>

                  {/* Stage 2 */}
                  <div
                    onClick={() => {
                      setSelectedStageFilter(selectedStageFilter === 2 ? null : 2);
                      setSelectedSalon('velvet');
                    }}
                    className={`relative z-10 flex flex-col items-start p-4 rounded-xl transition-all duration-200 hover:shadow-md cursor-pointer group border ${
                      selectedStageFilter === 2
                        ? 'bg-[#ffd9e2]/50 border-[#d91b77]'
                        : 'bg-[#f6f3ee] border-[#e5e2dd]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <div className="w-10 h-10 rounded-full bg-[#ffd9e2] text-[#3e001d] flex items-center justify-center text-xs font-bold group-hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-[20px]">badge</span>
                      </div>
                      <span className="text-[11px] text-[#b1005e] font-bold bg-[#ffd9e2]/60 px-2 py-0.5 rounded-full">
                        24h SLA
                      </span>
                    </div>
                    <span className="text-[11px] text-[#b1005e] uppercase tracking-wider font-bold">Stage 02</span>
                    <h3 className="text-xs sm:text-sm text-[#1c1c19] font-bold mt-0.5">Digital KYC &amp; Mandate</h3>
                    <p className="text-xs text-[#594047] mt-1 leading-relaxed">
                      PAN verification, GSTIN cross-check, and automated Penny-drop bank audit.
                    </p>
                    <div className="mt-4 pt-1 flex items-center justify-between w-full">
                      <span className="text-[11px] text-[#ba1a1a] font-semibold">2 Flags Alerted</span>
                      <span className="material-symbols-outlined text-[16px] text-[#594047] group-hover:translate-x-1 transition-transform">
                        east
                      </span>
                    </div>
                  </div>

                  {/* Stage 3 */}
                  <div
                    onClick={() => {
                      setSelectedStageFilter(selectedStageFilter === 3 ? null : 3);
                      setSelectedSalon('elegance');
                    }}
                    className={`relative z-10 flex flex-col items-start p-4 rounded-xl transition-all duration-200 hover:shadow-md cursor-pointer group border ${
                      selectedStageFilter === 3
                        ? 'bg-[#ffd9e2]/50 border-[#d91b77]'
                        : 'bg-[#f6f3ee] border-[#e5e2dd]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <div className="w-10 h-10 rounded-full bg-[#e5e2dd] text-[#1c1c19] flex items-center justify-center text-xs font-bold group-hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                      </div>
                      <span className="text-[11px] text-[#594047] bg-[#e5e2dd] px-2 py-0.5 rounded-full font-bold">
                        48-72h
                      </span>
                    </div>
                    <span className="text-[11px] text-[#8e4767] uppercase tracking-wider font-bold">Stage 03</span>
                    <h3 className="text-xs sm:text-sm text-[#1c1c19] font-bold mt-0.5">Hardware &amp; QR Standee</h3>
                    <p className="text-xs text-[#594047] mt-1 leading-relaxed">
                      Branded NFC acrylic standee, soundbox, and Welcome Kit dispatch.
                    </p>
                    <div className="mt-4 pt-1 flex items-center justify-between w-full">
                      <span className="text-[11px] text-[#8e4767] font-semibold">3 In Transit</span>
                      <span className="material-symbols-outlined text-[16px] text-[#594047] group-hover:translate-x-1 transition-transform">
                        east
                      </span>
                    </div>
                  </div>

                  {/* Stage 4 */}
                  <div
                    onClick={() => {
                      setSelectedStageFilter(selectedStageFilter === 4 ? null : 4);
                      setSelectedSalon('elegance');
                    }}
                    className={`relative z-10 flex flex-col items-start p-4 rounded-xl transition-all duration-200 hover:shadow-md cursor-pointer group border ${
                      selectedStageFilter === 4
                        ? 'bg-[#ffd9e2]/50 border-[#d91b77]'
                        : 'bg-[#f6f3ee] border-[#e5e2dd]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <div className="w-10 h-10 rounded-full bg-[#e5e2dd] text-[#1c1c19] flex items-center justify-center text-xs font-bold group-hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-[20px]">point_of_sale</span>
                      </div>
                      <span className="text-[11px] text-[#735c00] font-bold bg-[#ffe088]/60 px-2 py-0.5 rounded-full">
                        Day 1-7
                      </span>
                    </div>
                    <span className="text-[11px] text-[#8e4767] uppercase tracking-wider font-bold">Stage 04</span>
                    <h3 className="text-xs sm:text-sm text-[#1c1c19] font-bold mt-0.5">Live Activation</h3>
                    <p className="text-xs text-[#594047] mt-1 leading-relaxed">
                      Terminal sync and initial verified transaction threshold (min ₹500).
                    </p>
                    <div className="mt-4 pt-1 flex items-center justify-between w-full">
                      <span className="text-[11px] text-[#8e4767] font-semibold">3 Pending Sweep</span>
                      <span className="material-symbols-outlined text-[16px] text-[#594047] group-hover:translate-x-1 transition-transform">
                        east
                      </span>
                    </div>
                  </div>

                  {/* Stage 5 */}
                  <div
                    onClick={() => setSelectedStageFilter(selectedStageFilter === 5 ? null : 5)}
                    className={`relative z-10 flex flex-col items-start p-4 rounded-xl transition-all duration-200 hover:shadow-md cursor-pointer group border ${
                      selectedStageFilter === 5
                        ? 'bg-[#ffd9e2]/50 border-[#d91b77]'
                        : 'bg-[#f6f3ee] border-[#e5e2dd]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <div className="w-10 h-10 rounded-full bg-[#ffe088] text-[#241a00] flex items-center justify-center text-xs font-bold shadow-[0_2px_10px_rgba(115,92,0,0.15)] group-hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-[20px]">military_tech</span>
                      </div>
                      <span className="text-[11px] text-[#735c00] font-bold bg-[#ffe088]/70 px-2 py-0.5 rounded-full">
                        Day 30
                      </span>
                    </div>
                    <span className="text-[11px] text-[#735c00] uppercase tracking-wider font-bold">Stage 05</span>
                    <h3 className="text-xs sm:text-sm text-[#1c1c19] font-bold mt-0.5">Full Qualification</h3>
                    <p className="text-xs text-[#594047] mt-1 leading-relaxed">
                      ₹50,000 monthly GMV processed, anti-fraud lock unlocks partner payout.
                    </p>
                    <div className="mt-4 pt-1 flex items-center justify-between w-full">
                      <span className="text-[11px] text-[#735c00] font-bold">2 Ready for Payout</span>
                      <span className="material-symbols-outlined text-[16px] text-[#594047] group-hover:translate-x-1 transition-transform">
                        east
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. MULTI-SALON LIVE STATUS TIMELINE & AUDIT WORKFLOW (Asymmetric 12-Col Split) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* LEFT PANEL (4 COLS): Salon Switcher & Cohort Health */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                {/* Interactive Salon Selectors */}
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-xs border border-[#e5e2dd]">
                  <div className="flex items-center justify-between mb-3 px-1">
                    <span className="text-[11px] text-[#8e4767] uppercase tracking-wider font-bold">
                      Active Referral Feed
                    </span>
                    <span className="text-[11px] text-[#594047]">Showing 2 Featured</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {/* Card 1: Elegance Studio */}
                    <button
                      onClick={() => setSelectedSalon('elegance')}
                      className={`w-full text-left p-4 rounded-xl transition-all flex flex-col gap-1 relative overflow-hidden group cursor-pointer border ${
                        selectedSalon === 'elegance'
                          ? 'bg-[#ebe8e3] border-[#d91b77] shadow-xs'
                          : 'bg-[#f6f3ee] border-[#e5e2dd] hover:bg-white'
                      }`}
                      type="button"
                    >
                      <div
                        className={`absolute left-0 top-0 bottom-0 w-1.5 transition-all ${
                          selectedSalon === 'elegance' ? 'bg-[#d91b77]' : 'bg-transparent'
                        }`}
                      ></div>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#ffd9e2] text-[#3e001d] flex items-center justify-center font-bold text-xs">
                            ES
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-[#1c1c19] group-hover:text-[#b1005e] transition-colors">
                              Elegance Studio &amp; Spa
                            </h4>
                            <span className="text-[11px] text-[#594047] flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">location_on</span> Indiranagar, Bengaluru
                            </span>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[10px] bg-[#ffd8e5] text-[#3c0223] font-bold">
                          Stage 4: Active
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-[#594047] mt-2 pt-2 bg-[#e5e2dd]/40 rounded px-2">
                        <span>QR Hardware Kit</span>
                        <span className="text-[11px] text-[#b1005e] font-semibold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">local_shipping</span> Out for Delivery
                        </span>
                      </div>
                    </button>

                    {/* Card 2: Velvet Touch */}
                    <button
                      onClick={() => setSelectedSalon('velvet')}
                      className={`w-full text-left p-4 rounded-xl transition-all flex flex-col gap-1 relative overflow-hidden group cursor-pointer border ${
                        selectedSalon === 'velvet'
                          ? 'bg-[#ebe8e3] border-[#ba1a1a] shadow-xs'
                          : 'bg-[#f6f3ee] border-[#e5e2dd] hover:bg-white'
                      }`}
                      type="button"
                    >
                      <div
                        className={`absolute left-0 top-0 bottom-0 w-1.5 transition-all ${
                          selectedSalon === 'velvet' ? 'bg-[#ba1a1a]' : 'bg-transparent'
                        }`}
                      ></div>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#ffdad6] text-[#93000a] flex items-center justify-center font-bold text-xs">
                            VT
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-[#1c1c19] group-hover:text-[#ba1a1a] transition-colors">
                              Velvet Touch Lounge
                            </h4>
                            <span className="text-[11px] text-[#594047] flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">location_on</span> Koregaon Park, Pune
                            </span>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[10px] bg-[#ffdad6] text-[#93000a] font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">error</span> Action Req.
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-[#594047] mt-2 pt-2 bg-[#e5e2dd]/40 rounded px-2">
                        <span>KYC Discrepancy</span>
                        <span className="text-[11px] text-[#ba1a1a] font-semibold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">schedule</span> {formatCountdown(secondsRemaining)} Remaining
                        </span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Live SLA Clock Widget */}
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-xs border border-[#e5e2dd]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[#b1005e] text-[20px]">timer</span>
                      <span className="text-xs font-bold text-[#1c1c19]">Pending Audit SLA Watch</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#f0ede9] text-[#594047] text-[10px] font-bold">
                      Auto-sync 30s
                    </span>
                  </div>
                  <p className="text-xs text-[#594047] mb-3 leading-relaxed">
                    Velvet Touch Lounge KYC resubmission deadline before automatic merchant queue de-prioritization.
                  </p>

                  {/* Circular Visual Timer + Counter */}
                  <div className="p-3 rounded-xl bg-[#f6f3ee] flex items-center justify-between border border-[#e5e2dd]">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="text-[#e5e2dd]"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                          ></path>
                          <path
                            className="text-[#ba1a1a]"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeDasharray="72, 100"
                            strokeLinecap="round"
                            strokeWidth="3"
                          ></path>
                        </svg>
                        <span className="material-symbols-outlined text-[#ba1a1a] absolute text-[18px]">
                          hourglass_top
                        </span>
                      </div>
                      <div>
                        <div className="text-lg font-bold font-mono tracking-tight text-[#ba1a1a]">
                          {formatCountdown(secondsRemaining)}
                        </div>
                        <span className="text-[11px] text-[#594047]">Resolution Window closes 6:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Batch Overview Widget */}
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-xs border border-[#e5e2dd] flex flex-col gap-2">
                  <span className="text-[11px] text-[#8e4767] uppercase tracking-wider font-bold">
                    November Batch Health
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd]">
                      <span className="text-[11px] text-[#594047]">Avg Onboarding</span>
                      <div className="text-base font-bold text-[#1c1c19] mt-0.5">3.4 Days</div>
                      <span className="text-[10px] text-[#b1005e] font-semibold">18% faster than avg</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd]">
                      <span className="text-[11px] text-[#594047]">Conversion Rate</span>
                      <div className="text-base font-bold text-[#1c1c19] mt-0.5">92.8%</div>
                      <span className="text-[10px] text-[#735c00] font-semibold">Top tier partner</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT PANEL (8 COLS): Granular Lifecycle Timeline Details */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {/* ==================== VIEW 1: ELEGANCE STUDIO ==================== */}
                {selectedSalon === 'elegance' && (
                  <div className="flex flex-col gap-4">
                    {/* Header Banner with Partner Reward Tier */}
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-xs border border-[#e5e2dd] flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img
                          className="w-16 h-16 rounded-xl object-cover shadow-xs shrink-0"
                          alt="Modern upscale hair styling salon interior in Bengaluru"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQaYtKMfar9mP8mUsg8GUO5uqjKKCZInBdM6DEjDCBx70be2DFVfcWkesPLRmvwUBjeGpes6WyZ1UkI8nlneS8bJD7jpsRkV2p0dzYdJt-rjbNW_ULmptIbz0AnRZGUMTz2jwXhtg68wNGXSg2LL1FjvaDYKt_6dbNTkrzaI41XtCxhNlH9ynYEZpPr4EVPFPUahHEBj6hp2NWo1nPJH6MDLbCsubQxvrWN1wHaWLmQ7Twc2qY8bka"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-lg font-bold text-[#1c1c19]">Elegance Studio &amp; Spa</h3>
                            <span className="material-symbols-outlined text-[#b1005e] text-[20px]" title="Nexora Verified Merchant">
                              verified
                            </span>
                          </div>
                          <p className="text-xs text-[#594047] mt-0.5">
                            Assigned Merchant ID: <strong className="text-[#1c1c19]">NX-M-90214</strong> • Referral Date: Nov 12, 2024
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col md:items-end text-left md:text-right">
                        <span className="text-[11px] text-[#8e4767] uppercase font-bold">Estimated Partner Payout</span>
                        <span className="text-2xl font-bold text-[#b1005e]">₹7,500</span>
                        <span className="text-xs text-[#594047]">
                          Release Target: <strong className="text-[#1c1c19]">Dec 14, 2024</strong>
                        </span>
                      </div>
                    </div>

                    {/* Real-Time Milestone Feed */}
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-xs border border-[#e5e2dd]">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-base font-bold text-[#1c1c19]">Milestone Progress &amp; Logistics</h4>
                        <span className="px-3 py-1 rounded-full bg-[#ffd8e5] text-[#3c0223] text-xs font-bold">
                          80% Completed
                        </span>
                      </div>

                      {/* Vertical Timeline Steps */}
                      <div className="relative pl-6 space-y-4">
                        {/* Timeline vertical spine */}
                        <div className="absolute left-2.5 top-3 bottom-3 w-0.5 bg-[#e5e2dd]"></div>

                        {/* Step 1: Lead Registration */}
                        <div className="relative flex items-start gap-4 group">
                          <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-[#b1005e] text-white flex items-center justify-center text-[12px] shadow-[0_0_0_4px_rgba(255,255,255,1)]">
                            <span className="material-symbols-outlined text-[14px]">check</span>
                          </div>
                          <div className="flex-1 bg-[#f6f3ee] p-4 rounded-xl border border-[#e5e2dd]">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-bold text-[#1c1c19]">Digital Invitation Accepted</span>
                              <span className="text-[11px] text-[#594047]">Nov 12, 2024 • 10:14 AM</span>
                            </div>
                            <p className="text-xs text-[#594047] leading-relaxed">
                              Salon owner Rahul Sharma registered via partner link (Ref: <code>NX-REF-88219</code>). Contact details authenticated via WhatsApp OTP.
                            </p>
                          </div>
                        </div>

                        {/* Step 2: KYC & Bank Verification */}
                        <div className="relative flex items-start gap-4 group">
                          <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-[#b1005e] text-white flex items-center justify-center text-[12px] shadow-[0_0_0_4px_rgba(255,255,255,1)]">
                            <span className="material-symbols-outlined text-[14px]">check</span>
                          </div>
                          <div className="flex-1 bg-[#f6f3ee] p-4 rounded-xl border border-[#e5e2dd]">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-bold text-[#1c1c19]">KYC &amp; Bank Mandate Cleared</span>
                              <span className="text-[11px] text-[#594047]">Nov 12, 2024 • 02:40 PM</span>
                            </div>
                            <p className="text-xs text-[#594047] leading-relaxed">
                              Business Entity PAN, GST registration, and HDFC Bank auto-settlement e-mandate cleared in 4 hours 26 minutes (Under 24h SLA).
                            </p>
                          </div>
                        </div>

                        {/* Step 3: Courier Tracking Card (Live Active Component) */}
                        <div className="relative flex items-start gap-4 group">
                          <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-[#b1005e] text-white flex items-center justify-center text-[12px] shadow-[0_0_0_4px_rgba(255,255,255,1)]">
                            <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                          </div>
                          <div className="flex-1 bg-[#f0ede9] p-4 sm:p-5 rounded-xl border border-[#e5e2dd] shadow-xs">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                              <div>
                                <span className="text-[11px] text-[#b1005e] uppercase font-bold tracking-wider">
                                  Live Shipment Tracking
                                </span>
                                <h5 className="text-xs sm:text-sm font-bold text-[#1c1c19]">
                                  Nexora Smart QR Standee &amp; Soundbox Kit
                                </h5>
                              </div>
                              <span className="px-2.5 py-1 rounded-full bg-[#ffd9e2] text-[#3e001d] text-[11px] font-bold flex items-center gap-1.5 self-start">
                                <span className="w-2 h-2 rounded-full bg-[#b1005e] animate-pulse"></span> In Transit
                              </span>
                            </div>

                            {/* Courier Specific Info Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-3 rounded-lg bg-white border border-[#e5e2dd] mb-3">
                              <div>
                                <span className="text-[11px] text-[#594047]">Logistics Carrier</span>
                                <div className="text-xs font-bold text-[#1c1c19]">BlueDart Express</div>
                              </div>
                              <div>
                                <span className="text-[11px] text-[#594047]">Air Waybill (AWB)</span>
                                <div className="text-xs text-[#b1005e] font-mono font-bold">#9842104472</div>
                              </div>
                              <div>
                                <span className="text-[11px] text-[#594047]">Estimated Delivery</span>
                                <div className="text-xs font-bold text-[#1c1c19]">Today, by 4:30 PM</div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-xs text-[#594047] pt-1">
                              <span className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[16px] text-[#8e4767]">inventory_2</span>
                                Dispatched from Nexora Hub, Koramangala
                              </span>
                              <button
                                onClick={() => alert('BlueDart Tracking #9842104472: Package is with delivery executive Rajesh K (Bangalore Central)')}
                                className="text-xs text-[#b1005e] font-bold hover:underline cursor-pointer"
                              >
                                Track on BlueDart →
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Step 4: First Billing & Activation */}
                        <div className="relative flex items-start gap-4 group">
                          <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-[#b1005e] text-white flex items-center justify-center text-[12px] shadow-[0_0_0_4px_rgba(255,255,255,1)]">
                            <span className="material-symbols-outlined text-[14px]">done_all</span>
                          </div>
                          <div className="flex-1 bg-[#f6f3ee] p-4 rounded-xl border border-[#e5e2dd]">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-bold text-[#1c1c19]">First Billing Transaction Validated</span>
                              <span className="text-[11px] text-[#735c00] font-bold">Validated Today, 11:20 AM</span>
                            </div>
                            <p className="text-xs text-[#594047] leading-relaxed">
                              Initial live client appointment payment processed via Nexora Virtual POS for ₹1,850. First swipe bonus unlocked for merchant.
                            </p>
                          </div>
                        </div>

                        {/* Step 5: 30-Day Qualification & Commission Release */}
                        <div className="relative flex items-start gap-4 group">
                          <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-[#e5e2dd] text-[#594047] flex items-center justify-center text-[12px] shadow-[0_0_0_4px_rgba(255,255,255,1)]">
                            <span className="material-symbols-outlined text-[14px]">lock_clock</span>
                          </div>
                          <div className="flex-1 bg-[#f6f3ee] p-4 rounded-xl opacity-95 border border-[#e5e2dd]">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-bold text-[#1c1c19]">30-Day Volume Milestone &amp; Release</span>
                              <span className="text-[11px] text-[#594047]">Expected Dec 14, 2024</span>
                            </div>
                            <p className="text-xs text-[#594047] mb-2 leading-relaxed">
                              Requires ₹50,000 processed GMV across first 30 days. Current Progress: ₹1,850 / ₹50,000.
                            </p>
                            {/* Milestone Mini Progress Bar */}
                            <div className="w-full h-2 rounded-full bg-[#e5e2dd] overflow-hidden">
                              <div className="h-full bg-[#cca730] rounded-full" style={{ width: '8%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ==================== VIEW 2: VELVET TOUCH LOUNGE ==================== */}
                {selectedSalon === 'velvet' && (
                  <div className="flex flex-col gap-4">
                    {/* Red Alert Header */}
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-xs border border-[#ffdad6] flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img
                          className="w-16 h-16 rounded-xl object-cover shadow-xs shrink-0"
                          alt="Chic modern nail lounge and boutique beauty bar in Pune"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcovm4k7KmFaHEy4F8Ts-CKYu2Ycrf6nWmq9pgmuBAjcB12MtaQ3c8isna-qGB5utxzSaRA1YgduLwahDg5LzYMDwvwmZdCqjZpLTpcBHg898egm157qkwX36sWPQq6F-rwHaoBkIgeEl2t75rx9TUiXDYY9ltJtWexs_SpzizaHDvQLcNmQUs9ottK2hSQVra2E3GP0D-d5NaSAI7qsSJ7ZhQrOQPc6iE2SmKOUx5axrSAvrs4sKg"
                        />
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-lg font-bold text-[#1c1c19]">Velvet Touch Lounge</h3>
                            <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[11px] font-bold">
                              Verification Blocked
                            </span>
                          </div>
                          <p className="text-xs text-[#594047] mt-0.5">
                            Assigned Merchant ID: <strong className="text-[#1c1c19]">NX-M-90382</strong> • Referral Date: Nov 14, 2024
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col md:items-end text-left md:text-right">
                        <span className="text-[11px] text-[#8e4767] uppercase font-bold">Potential Partner Payout</span>
                        <span className="text-2xl font-bold text-[#1c1c19]">₹7,500</span>
                        <span className="text-xs text-[#ba1a1a] font-bold">Action Needed to Avoid Drop</span>
                      </div>
                    </div>

                    {/* Discrepancy Breakdown & One-Click Resolution Card */}
                    <div className="bg-[#ffdad6]/20 rounded-2xl p-5 sm:p-6 shadow-xs border border-[#ffdad6]">
                      <div className="flex items-start gap-3.5 mb-4">
                        <div className="w-10 h-10 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center shrink-0 shadow-md">
                          <span className="material-symbols-outlined text-[22px]">warning</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-base font-bold text-[#1c1c19]">
                            Discrepancy Breakdown: Address Proof Mismatch
                          </h4>
                          <p className="text-xs text-[#594047] mt-1 leading-relaxed">
                            Nexora Risk Audit team paused automated processing at{' '}
                            <strong className="text-[#1c1c19]">Stage 2 (Digital KYC)</strong>.
                          </p>
                        </div>
                      </div>

                      {/* Comparison Table of Discrepancy */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-white border border-[#e5e2dd] mb-4">
                        <div className="p-3 rounded-lg bg-[#f6f3ee] border border-[#e5e2dd]">
                          <span className="text-[11px] text-[#594047] uppercase font-semibold">
                            Registered Entity (GST/PAN)
                          </span>
                          <div className="text-xs font-bold text-[#1c1c19] mt-1">
                            Velvet Touch Wellness Pvt Ltd
                          </div>
                          <p className="text-[11px] text-[#594047] mt-0.5 leading-relaxed">
                            Plot 14, North Main Road, Koregaon Park, Pune
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-[#ffdad6]/30 border border-[#ffdad6]">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] text-[#ba1a1a] uppercase font-bold">
                              Uploaded Electricity Utility Bill
                            </span>
                            <span className="material-symbols-outlined text-[#ba1a1a] text-[18px]">close</span>
                          </div>
                          <div className="text-xs text-[#ba1a1a] font-bold mt-1">
                            Subhash R. Kulkarni (Landlord)
                          </div>
                          <p className="text-[11px] text-[#594047] mt-0.5 leading-relaxed">
                            Missing signed Commercial Lease Agreement connecting entity name to utility document.
                          </p>
                        </div>
                      </div>

                      {/* One-Click Action Trigger */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
                        <div className="flex items-center gap-1.5 text-xs text-[#594047]">
                          <span className="material-symbols-outlined text-[18px] text-[#735c00]">support_agent</span>
                          <span>
                            Dedicated Onboarding Agent: <strong className="text-[#1c1c19]">Sanjay Mehta</strong> (Queue #4)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setIsCallingOwner(true)}
                            className="px-4 py-2 rounded-full bg-[#f0ede9] text-[#1c1c19] text-xs font-bold hover:bg-[#e5e2dd] transition-colors flex items-center gap-1 cursor-pointer"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[18px]">phone</span>
                            <span>Call Owner</span>
                          </button>
                          <button
                            onClick={handleSendWhatsAppReminder}
                            disabled={isWaReminderSent}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md ${
                              isWaReminderSent
                                ? 'bg-[#f0ede9] text-[#1c1c19]'
                                : 'bg-[#d91b77] text-white hover:bg-[#b1005e]'
                            }`}
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              {isWaReminderSent ? 'check' : 'send'}
                            </span>
                            <span>
                              {isWaReminderSent
                                ? 'WhatsApp Reminder Dispatched ✓'
                                : 'Send WhatsApp Re-upload Reminder'}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Log for Velvet Touch */}
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-xs border border-[#e5e2dd]">
                      <h4 className="text-base font-bold text-[#1c1c19] mb-4">Timeline Log</h4>
                      <div className="relative pl-6 space-y-4">
                        <div className="absolute left-2.5 top-3 bottom-3 w-0.5 bg-[#e5e2dd]"></div>
                        <div className="relative flex items-start gap-4">
                          <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-[#b1005e] text-white flex items-center justify-center text-[12px] shadow-[0_0_0_4px_rgba(255,255,255,1)]">
                            <span className="material-symbols-outlined text-[14px]">check</span>
                          </div>
                          <div className="flex-1 bg-[#f6f3ee] p-3 rounded-xl border border-[#e5e2dd]">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-[#1c1c19]">Invitation Claimed by Salon Lead</span>
                              <span className="text-[11px] text-[#594047]">Nov 14, 2024 • 09:12 AM</span>
                            </div>
                          </div>
                        </div>
                        <div className="relative flex items-start gap-4">
                          <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center text-[12px] shadow-[0_0_0_4px_rgba(255,255,255,1)]">
                            <span className="material-symbols-outlined text-[14px]">priority_high</span>
                          </div>
                          <div className="flex-1 bg-[#ffdad6]/30 p-3 rounded-xl border border-[#ffdad6]">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-[#ba1a1a]">Automated OCR Validation Rejection</span>
                              <span className="text-[11px] text-[#594047]">Nov 14, 2024 • 01:45 PM</span>
                            </div>
                            <p className="text-xs text-[#594047] mt-1 leading-relaxed">
                              Automated OCR failed utility bill cross-reference. Transferred to Tier-2 manual auditor.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Persistent Bottom Navigation Bar for Mobile */}
        <nav className="fixed bottom-0 inset-x-0 z-40 pb-safe bg-white/95 backdrop-blur-xl border-t border-[#e5e2dd] shadow-[0_-2px_16px_rgba(74,14,46,0.05)] lg:hidden">
          <div className="flex justify-around items-center h-16 px-2 max-w-lg mx-auto">
            <button
              onClick={() => {
                if (onNavigateToSalonIntelligence) onNavigateToSalonIntelligence();
              }}
              className="flex flex-col items-center justify-center min-w-[56px] h-12 text-[#594047] hover:text-[#b1005e] transition-colors group cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[22px] mb-0.5 group-hover:scale-105 transition-transform">
                dashboard
              </span>
              <span className="text-[10px] font-semibold leading-tight text-center tracking-tight">
                Overview
              </span>
            </button>

            <button
              onClick={() => {
                if (onNavigateToShareEarn) onNavigateToShareEarn();
              }}
              className="flex flex-col items-center justify-center min-w-[56px] h-12 text-[#594047] hover:text-[#b1005e] transition-colors group cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[22px] mb-0.5 group-hover:scale-105 transition-transform">
                qr_code_2
              </span>
              <span className="text-[10px] font-semibold leading-tight text-center tracking-tight">
                Referral
              </span>
            </button>

            <button
              onClick={() => {
                if (onNavigateToAddSalon) onNavigateToAddSalon();
              }}
              className="flex flex-col items-center justify-center min-w-[56px] h-12 text-[#594047] hover:text-[#b1005e] transition-colors group cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[22px] mb-0.5 group-hover:scale-105 transition-transform">
                add_circle
              </span>
              <span className="text-[10px] font-semibold leading-tight text-center tracking-tight">
                Add Salon
              </span>
            </button>

            <button
              className="flex flex-col items-center justify-center min-w-[56px] h-12 text-[#b1005e] font-bold transition-colors group cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[22px] mb-0.5 group-hover:scale-105 transition-transform">
                timeline
              </span>
              <span className="text-[10px] leading-tight text-center tracking-tight">
                Status
              </span>
            </button>

            <button
              onClick={() => {
                if (onNavigateToLeaderboard) onNavigateToLeaderboard();
              }}
              className="flex flex-col items-center justify-center min-w-[56px] h-12 text-[#594047] hover:text-[#b1005e] transition-colors group cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[22px] mb-0.5 group-hover:scale-105 transition-transform">
                military_tech
              </span>
              <span className="text-[10px] font-semibold leading-tight text-center tracking-tight">
                Rewards
              </span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};
