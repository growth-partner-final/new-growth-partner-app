import React, { useState } from 'react';

interface PartnerDashboardProps {
  onNavigateToAuth?: () => void;
  onNavigateToHub?: () => void;
  onNavigateToLeaderboard?: () => void;
  onNavigateToEarningsLedger?: () => void;
  onNavigateToWithdrawals?: () => void;
  onNavigateToMarketingMaterial?: () => void;
  onNavigateToPartnerLevels?: () => void;
  onNavigateToNotifications?: () => void;
  onNavigateToSupport?: () => void;
}

export const PartnerDashboard: React.FC<PartnerDashboardProps> = ({
  onNavigateToAuth,
  onNavigateToHub,
  onNavigateToLeaderboard,
  onNavigateToEarningsLedger,
  onNavigateToWithdrawals,
  onNavigateToMarketingMaterial,
  onNavigateToPartnerLevels,
  onNavigateToNotifications,
  onNavigateToSupport
}) => {
  const [activeState, setActiveState] = useState<'active' | 'empty' | 'restricted' | 'skeleton' | 'error'>('active');
  const [copied, setCopied] = useState<boolean>(false);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeSidebarNav, setActiveSidebarNav] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const referralUrl = 'nexora.io/p/REF-5A45019655';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${referralUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleRetrySync = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
      setActiveState('active');
    }, 1200);
  };

  const downloadQRMock = () => {
    alert('Generating vector SVG for Partner QR (Code: REF-5A45019655)... Ready for digital display or print.');
  };

  return (
    <div className="w-full min-h-screen bg-[#fcf9f4] text-[#1c1c19] flex">
      {/* Desktop Sidebar (aside) */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-72 bg-white/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex-col justify-between overflow-y-auto border-r border-[#e5e2dd]">
        <div className="flex flex-col">
          {/* Sidebar Brand Header */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-[#e5e2dd]/60">
            <div className="flex items-center gap-2">
              <img
                alt="Brand logo"
                className="h-8 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/AEtjO1XZxTb-KtdsPjo0U0odHwDY485hRuwmfDBk7sy7hvncIa4xg3AdjCaLVTut6pSuuRiQJj_3YtSdqJ3TLo2klHSJMNebL6mVq0uWtOhluaULb7Cy_34No2AloAlRtDCW1-HCFGFyKGQkrv2OMGEMkXFJpEFLcxUma8v2Z1hXG0pFOlEix77UvOTw-NfNuX20oyBgVrPL--0n2ZNjrI0vKNBImBop03G0p3fTT3hR_Chdf05d_h_ZbzfoKQ"
              />
              <span className="font-bold text-lg text-[#1c1c19] tracking-tight">Nexora</span>
            </div>
            <div className="px-2 py-0.5 rounded-full bg-[#ffd8e5] text-[#3c0223] font-bold text-[11px]">
              PARTNER
            </div>
          </div>

          {/* Core Management Category */}
          <div className="px-6 pt-4 pb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#594047]">
              Core Management
            </span>
          </div>

          <nav className="flex flex-col gap-1 px-4">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: 'grid_view' },
              { id: 'my-referral-code', label: 'My Referral Code', icon: 'qr_code_2' },
              { id: 'referred-users', label: 'Referred Users', icon: 'group' },
              { id: 'referral-status', label: 'Referral Status', icon: 'query_stats' },
              { id: 'rewards', label: 'Rewards', icon: 'military_tech' },
              { id: 'extra-onboarding-reward', label: 'Extra Onboarding Reward', icon: 'redeem' },
              { id: 'profile', label: 'Profile', icon: 'person' }
            ].map((item) => {
              const isActive = activeSidebarNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSidebarNav(item.id)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 text-left text-xs font-semibold cursor-pointer ${
                    isActive
                      ? 'bg-[#d91b77] text-white shadow-[0_4px_16px_rgba(217,27,119,0.2)]'
                      : 'text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Future Expansion Category */}
          <div className="px-6 pt-6 pb-2 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#594047]">
              Future Expansion
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#ebe8e3] text-[#594047] text-[10px] font-bold">
              Upcoming
            </span>
          </div>

          <div className="flex flex-col gap-1 px-4 pb-6">
            <button
              onClick={() => {
                if (onNavigateToLeaderboard) onNavigateToLeaderboard();
              }}
              className="flex items-center justify-between px-4 py-2 rounded-lg text-xs font-bold text-[#1c1c19] hover:bg-[#ebe8e3] transition-all cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] text-[#cca730]">leaderboard</span>
                <span>Top Performers</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ffe088] text-[#241a00] font-bold">
                Live
              </span>
            </button>

            {[
              { label: 'Earnings', icon: 'account_balance_wallet', action: onNavigateToEarningsLedger },
              { label: 'Withdrawals', icon: 'payments', action: onNavigateToWithdrawals },
              { label: 'Marketing Material', icon: 'campaign', action: onNavigateToMarketingMaterial },
              { label: 'Partner Levels', icon: 'stars', action: onNavigateToPartnerLevels },
              { label: 'Notifications', icon: 'notifications', action: onNavigateToNotifications },
              { label: 'Support', icon: 'headset_mic', action: onNavigateToSupport }
            ].map((item) => {
              if (item.action) {
                return (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className="flex items-center justify-between px-4 py-2 rounded-lg text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] text-xs font-bold transition-all cursor-pointer text-left w-full"
                    type="button"
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                      Active
                    </span>
                  </button>
                );
              }
              return (
                <div
                  key={item.label}
                  className="flex items-center justify-between px-4 py-2 rounded-lg text-[#594047] opacity-75 text-xs font-medium"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#e5e2dd] text-[#594047]">
                    Soon
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Tier Footer in Sidebar */}
        <div className="p-4 mx-4 mb-4 rounded-xl bg-[#f6f3ee] flex items-center justify-between border border-[#e5e2dd]">
          <div className="flex flex-col">
            <span className="text-[11px] text-[#594047] font-semibold">Current Tier</span>
            <span className="font-bold text-sm text-[#b1005e]">Gold Partner</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#ffe088] flex items-center justify-center">
            <span className="material-symbols-outlined text-[#241a00] text-[18px]">verified</span>
          </div>
        </div>
      </aside>

      {/* Main Workspace Area (with offset on lg screens) */}
      <div className="lg:pl-72 flex flex-col min-h-screen flex-1 w-full">
        {/* Top Header */}
        <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-white/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-30 flex items-center justify-between px-4 sm:px-6 border-b border-[#e5e2dd]">
          <div className="flex items-center gap-4">
            {/* Mobile Logo */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1 text-[#594047] hover:text-[#1c1c19] cursor-pointer"
                aria-label="Toggle menu"
              >
                <span className="material-symbols-outlined text-[24px]">menu</span>
              </button>
              <img
                alt="Brand logo"
                className="h-7 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/AEtjO1XZxTb-KtdsPjo0U0odHwDY485hRuwmfDBk7sy7hvncIa4xg3AdjCaLVTut6pSuuRiQJj_3YtSdqJ3TLo2klHSJMNebL6mVq0uWtOhluaULb7Cy_34No2AloAlRtDCW1-HCFGFyKGQkrv2OMGEMkXFJpEFLcxUma8v2Z1hXG0pFOlEix77UvOTw-NfNuX20oyBgVrPL--0n2ZNjrI0vKNBImBop03G0p3fTT3hR_Chdf05d_h_ZbzfoKQ"
              />
              <span className="font-bold text-base text-[#1c1c19]">Nexora</span>
            </div>

            {/* Tier Pill Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#cca730]/20 border border-[#cca730]/30">
              <span className="material-symbols-outlined text-[#735c00] text-[18px]">workspace_premium</span>
              <span className="text-xs font-bold text-[#1c1c19]">Tier: Gold Partner</span>
            </div>
          </div>

          {/* Search, Notifications & User Avatar */}
          <div className="flex items-center gap-3">
            <div className="relative hidden md:flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-[#594047] text-[18px]">
                search
              </span>
              <input
                className="pl-9 pr-4 py-1.5 bg-[#f6f3ee] rounded-full text-xs text-[#1c1c19] placeholder:text-[#594047]/60 focus:outline-none focus:ring-1 focus:ring-[#b1005e] w-56 border border-[#e5e2dd] transition-all"
                placeholder="Search referrals, codes..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors relative cursor-pointer"
              type="button"
              onClick={() => alert('No new notifications')}
              aria-label="Notifications"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#d91b77] ring-2 ring-white"></span>
            </button>

            <div className="flex items-center gap-2 pl-1">
              <div className="hidden md:flex flex-col text-right">
                <span className="text-xs font-bold text-[#1c1c19]">Growth Partner [DEV SAMPLE]</span>
                <span className="text-[10px] text-[#594047]">Growth Lead</span>
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
            <div className="w-72 bg-white h-full p-4 flex flex-col justify-between overflow-y-auto shadow-2xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#e5e2dd]">
                  <span className="font-bold text-base text-[#1c1c19]">Nexora Partner</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 text-[#594047]"
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>
                <div className="flex flex-col gap-1 mt-4">
                  {[
                    { id: 'dashboard', label: 'Dashboard', icon: 'grid_view' },
                    { id: 'my-referral-code', label: 'My Referral Code', icon: 'qr_code_2' },
                    { id: 'referred-users', label: 'Referred Users', icon: 'group' },
                    { id: 'referral-status', label: 'Referral Status', icon: 'query_stats' },
                    { id: 'rewards', label: 'Rewards', icon: 'military_tech' },
                    { id: 'extra-onboarding-reward', label: 'Extra Onboarding Reward', icon: 'redeem' },
                    { id: 'profile', label: 'Profile', icon: 'person' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSidebarNav(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-[#1c1c19] hover:bg-[#f0ede9]"
                    >
                      <span className="material-symbols-outlined text-[18px] text-[#b1005e]">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#e5e2dd]">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onNavigateToHub) onNavigateToHub();
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-[#f0ede9] text-xs font-bold text-[#b1005e] text-center"
                >
                  🚀 Open Program Hub &amp; Ladder
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Main Content Body */}
        <main className="w-full pt-20 pb-24 lg:pb-12 px-4 sm:px-6 flex-1 bg-[#fcf9f4]">
          <div className="flex flex-col w-full gap-6 max-w-6xl mx-auto">
            {/* Dynamic Ambient Glow Backdrops */}
            <div className="relative w-full">
              <div className="absolute -top-12 left-1/4 w-96 h-96 rounded-full bg-[#d91b77]/5 blur-3xl pointer-events-none -z-10"></div>
              <div className="absolute top-24 right-10 w-80 h-80 rounded-full bg-[#cca730]/10 blur-3xl pointer-events-none -z-10"></div>

              {/* Partner Header Glass Canopy */}
              <div className="relative w-full rounded-2xl bg-white/80 backdrop-blur-xl p-5 sm:p-6 shadow-xs border border-[#e5e2dd]">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Portrait & Executive Details */}
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-md shrink-0 bg-[#ffd8e5]">
                      <img
                        className="w-full h-full object-cover"
                        alt="Growth partner profile avatar"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5nFKwiNJHVG6WXK8xCxUCFyLPE85vQy9YLBrF5W_hs5i4e1JqGTa5AWS5rrKx7rhZlfAP4jQ4XL4znPjpLgXbSxRWNioOWHGpTTFNT1iKxtBmssf5bvNIFRFS6z4NbV2YW_Ek71PMYUTp9ILSGvmZSDmxjeYhWzu9EwVaq5EF5mXWOhGEE70pj7JrrQew8kXiTBeqAXeF4oWXipghdPjy2_YI4xyPNUnKU6GRZjyc2pe7Gq9MOTPi"
                      />
                      <span
                        className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-[#b1005e] ring-2 ring-white"
                        title="Active System Status"
                      ></span>
                    </div>

                    <div className="flex flex-col">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xl sm:text-2xl font-bold text-[#1c1c19]">
                          Growth Partner [DEV SAMPLE]
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffd9e2] text-[#3e001d] text-[11px] font-bold">
                          <span className="material-symbols-outlined text-[14px]">verified</span>
                          KYC Verified
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffe088] text-[#241a00] text-[11px] font-bold">
                          <span className="material-symbols-outlined text-[14px]">stars</span>
                          Level 1: Rising Star
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mt-1 text-[#594047] text-xs flex-wrap">
                        <span className="font-mono tracking-wider font-bold text-[#8e4767]">
                          REF-5A45019655
                        </span>
                        <span className="w-1 h-1 rounded-full bg-[#e1bdc6]"></span>
                        <span>Growth Partner Program</span>
                        <span className="w-1 h-1 rounded-full bg-[#e1bdc6]"></span>
                        <span className="text-[#735c00] text-[11px] uppercase font-bold tracking-wide">
                          Next Payout: Mon, 10:00 AM IST
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Referral Trigger Link & Share Capsule */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <div className="flex items-center bg-[#f6f3ee] rounded-full px-3 py-1.5 border border-[#e5e2dd]">
                      <span className="material-symbols-outlined text-[#b1005e] text-[18px] mr-2">link</span>
                      <span className="font-mono text-xs font-bold text-[#1c1c19] select-all mr-3">
                        {referralUrl}
                      </span>
                      <button
                        className="px-3 py-1 rounded-full bg-white text-[#1c1c19] text-[11px] font-bold hover:bg-[#ebe8e3] transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                        onClick={handleCopyLink}
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          {copied ? 'check' : 'content_copy'}
                        </span>
                        <span>{copied ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>

                    <button
                      className="px-5 py-2.5 rounded-full bg-[#d91b77] text-white font-bold text-xs shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2 cursor-pointer active:scale-95"
                      onClick={() => setActiveState('active')}
                    >
                      <span className="material-symbols-outlined text-[18px]">share</span>
                      <span>Quick Invite</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Verified KPI Figures Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {/* Active Referrals */}
              <div className="rounded-xl bg-white/80 backdrop-blur-xl p-4 shadow-xs border border-[#e5e2dd] transition-transform duration-200 hover:scale-[1.01]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#594047]">
                    Active Referrals
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#f0ede9] flex items-center justify-center text-[#b1005e]">
                    <span className="material-symbols-outlined text-[20px]">group</span>
                  </div>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-[#1c1c19] tracking-tight">0</span>
                  <span className="text-xs text-[#594047]">Accounts</span>
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-[#594047] text-[11px]">
                  <span className="material-symbols-outlined text-[16px] text-[#735c00]">info</span>
                  <span>Awaiting first signed contract</span>
                </div>
              </div>

              {/* Total Verified Clients */}
              <div className="rounded-xl bg-white/80 backdrop-blur-xl p-4 shadow-xs border border-[#e5e2dd] transition-transform duration-200 hover:scale-[1.01]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#594047]">
                    Verified Clients
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#f0ede9] flex items-center justify-center text-[#8e4767]">
                    <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                  </div>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-[#1c1c19] tracking-tight">0</span>
                  <span className="text-xs text-[#594047]">KYC Approved</span>
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-[#594047] text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-[#8d6f77]"></span>
                  <span>Real-time identity clearance</span>
                </div>
              </div>

              {/* Payout Pipeline */}
              <div className="rounded-xl bg-white/80 backdrop-blur-xl p-4 shadow-xs border border-[#e5e2dd] transition-transform duration-200 hover:scale-[1.01]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#594047]">
                    Payout Pipeline
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#ffe088] flex items-center justify-center text-[#241a00]">
                    <span className="material-symbols-outlined text-[20px]">currency_rupee</span>
                  </div>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-[#1c1c19] tracking-tight font-mono">₹0.00</span>
                  <span className="text-xs text-[#735c00] font-bold">Net Liquid</span>
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-[#594047] text-[11px]">
                  <span className="material-symbols-outlined text-[16px] text-[#b1005e]">schedule</span>
                  <span>Reconciled every Monday</span>
                </div>
              </div>

              {/* Pending Activations */}
              <div className="rounded-xl bg-white/80 backdrop-blur-xl p-4 shadow-xs border border-[#e5e2dd] transition-transform duration-200 hover:scale-[1.01]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#594047]">
                    Pending Activations
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#f0ede9] flex items-center justify-center text-[#d91b77]">
                    <span className="material-symbols-outlined text-[20px]">hourglass_top</span>
                  </div>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-[#1c1c19] tracking-tight">0</span>
                  <span className="text-xs text-[#594047]">In Funnel</span>
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-[#594047] text-[11px]">
                  <span className="material-symbols-outlined text-[16px] text-[#735c00]">bolt</span>
                  <span>Ready for invitation link</span>
                </div>
              </div>
            </div>

            {/* Interactive System Viewport Controller */}
            <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#f6f3ee] rounded-xl p-4 border border-[#e5e2dd]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#b1005e] text-[22px]">tune</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#1c1c19]">System Viewport Controller</span>
                  <span className="text-[11px] text-[#594047]">
                    Inspect live dashboard fallback, onboarding, and error states
                  </span>
                </div>
              </div>

              {/* State Buttons Pill Matrix */}
              <div className="flex flex-wrap items-center gap-1 bg-white p-1 rounded-full border border-[#e5e2dd]">
                {[
                  { key: 'active', label: 'Active Normal' },
                  { key: 'empty', label: 'Empty Onboarding (0 Ref)' },
                  { key: 'restricted', label: 'Restricted KYC' },
                  { key: 'skeleton', label: 'Loading Skeleton' },
                  { key: 'error', label: 'Network Error' }
                ].map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setActiveState(s.key as any)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      activeState === s.key
                        ? 'bg-[#d91b77] text-white shadow-xs'
                        : 'text-[#594047] hover:text-[#1c1c19] hover:bg-[#f0ede9]'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* STATE 1: ACTIVE NORMAL */}
            {activeState === 'active' && (
              <div className="w-full flex flex-col gap-6">
                {/* Level 2 Progression Banner */}
                <div className="w-full rounded-2xl bg-white/90 backdrop-blur-xl p-5 shadow-xs border border-[#e5e2dd]">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#ffd8e5] text-[#3c0223] text-[10px] font-bold uppercase tracking-wider">
                          Level 1 Milestone
                        </span>
                        <span className="text-[#594047] text-xs">Partner Tier Track</span>
                      </div>
                      <h2 className="text-lg sm:text-xl font-bold text-[#1c1c19] mt-1">
                        Ascension to Level 2: Catalyst Partner
                      </h2>
                      <p className="text-xs sm:text-sm text-[#594047] mt-0.5">
                        Maintain 5 activated portfolios to boost base revenue share from 18% to 26%.
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex flex-col text-right">
                        <span className="text-lg font-bold text-[#b1005e]">0 / 5</span>
                        <span className="text-[11px] text-[#594047]">Clients Converted</span>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-[#f6f3ee] flex items-center justify-center text-[#b1005e] border border-[#e5e2dd]">
                        <span className="material-symbols-outlined text-[24px]">military_tech</span>
                      </div>
                    </div>
                  </div>

                  {/* Progression Rail Nodes */}
                  <div className="relative w-full py-1">
                    <div className="w-full h-2 rounded-full bg-[#f0ede9]">
                      <div className="h-2 rounded-full bg-gradient-to-r from-[#b1005e] to-[#d91b77]" style={{ width: '8%' }}></div>
                    </div>
                    <div className="flex justify-between items-center mt-2.5 text-[11px]">
                      <span className="text-[#b1005e] font-bold">Level 1: Rising Star (0)</span>
                      <span className="text-[#594047]">Milestone A (2 Clients)</span>
                      <span className="text-[#594047]">Milestone B (4 Clients)</span>
                      <span className="text-[#8e4767] font-bold">Level 2: Catalyst (5 Clients)</span>
                    </div>
                  </div>
                </div>

                {/* Active Grid: 3 Actions Mosaic Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Action 1: WhatsApp Launchpad */}
                  <div className="rounded-2xl bg-white/85 backdrop-blur-xl p-5 shadow-xs border border-[#e5e2dd] flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-[#f0ede9] flex items-center justify-center text-[#d91b77] mb-4">
                        <span className="material-symbols-outlined text-[26px]">chat</span>
                      </div>
                      <h3 className="text-base font-bold text-[#1c1c19]">Direct WhatsApp Invite</h3>
                      <p className="text-xs text-[#594047] mt-2 leading-relaxed">
                        Send an instant onboarding invitation with your encoded tracking ID straight into client WhatsApp chats.
                      </p>
                    </div>
                    <div className="mt-5 pt-4 border-t border-[#e5e2dd]">
                      <a
                        className="w-full py-2.5 px-4 rounded-full bg-[#f6f3ee] text-[#1c1c19] text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#d91b77] hover:text-white transition-colors"
                        href="https://api.whatsapp.com/send?text=Join%20Nexora%20Merchant%20Network%20via%20my%20growth%20partner%20link:%20https://nexora.io/p/REF-5A45019655"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="material-symbols-outlined text-[18px]">send</span>
                        <span>Broadcast to Contacts</span>
                      </a>
                    </div>
                  </div>

                  {/* Action 2: Digital QR Standee */}
                  <div className="rounded-2xl bg-white/85 backdrop-blur-xl p-5 shadow-xs border border-[#e5e2dd] flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-[#ffe088] flex items-center justify-center text-[#241a00] mb-4">
                        <span className="material-symbols-outlined text-[26px]">qr_code_scanner</span>
                      </div>
                      <h3 className="text-base font-bold text-[#1c1c19]">Digital QR Standee</h3>
                      <p className="text-xs text-[#594047] mt-2 leading-relaxed">
                        High-res vector QR asset with embedded UTM tags suited for in-person advisory desks and investor cards.
                      </p>
                    </div>
                    <div className="mt-5 pt-4 border-t border-[#e5e2dd]">
                      <button
                        className="w-full py-2.5 px-4 rounded-full bg-[#f6f3ee] text-[#1c1c19] text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#e5e2dd] transition-colors cursor-pointer"
                        onClick={downloadQRMock}
                      >
                        <span className="material-symbols-outlined text-[18px]">file_download</span>
                        <span>Download High-Res SVG</span>
                      </button>
                    </div>
                  </div>

                  {/* Action 3: Campaign Tracking Tags */}
                  <div className="rounded-2xl bg-white/85 backdrop-blur-xl p-5 shadow-xs border border-[#e5e2dd] flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-[#ffd8e5] flex items-center justify-center text-[#3c0223] mb-4">
                        <span className="material-symbols-outlined text-[26px]">campaign</span>
                      </div>
                      <h3 className="text-base font-bold text-[#1c1c19]">Campaign Tracking Tags</h3>
                      <p className="text-xs text-[#594047] mt-2 leading-relaxed">
                        Add custom campaign attributes (`?src=linkedin` or `?src=hni_meet`) to analyze acquisition yield.
                      </p>
                    </div>
                    <div className="mt-5 pt-4 border-t border-[#e5e2dd]">
                      <button
                        className="w-full py-2.5 px-4 rounded-full bg-[#f6f3ee] text-[#1c1c19] text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#e5e2dd] transition-colors cursor-pointer"
                        onClick={() => alert('Tracking Tag Generator: Feature active in Nexora Pro Partner Suite.')}
                      >
                        <span className="material-symbols-outlined text-[18px]">add_link</span>
                        <span>Create Campaign URL</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Active Referral Table Real Zero-State Fallback */}
                <div className="rounded-2xl bg-white/90 backdrop-blur-xl p-5 shadow-xs border border-[#e5e2dd]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div className="flex flex-col">
                      <h3 className="text-base font-bold text-[#1c1c19]">Real-Time Referral Ingestion Log</h3>
                      <span className="text-xs text-[#594047]">Live telemetry from partner gateway REF-5A45019655</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f6f3ee] text-[#1c1c19] text-[11px] font-semibold border border-[#e5e2dd]">
                        <span className="w-2 h-2 rounded-full bg-[#b1005e] animate-pulse"></span>
                        Sync Listener Active
                      </span>
                    </div>
                  </div>

                  <div className="w-full overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-[#f6f3ee] text-[#594047] text-[11px] font-bold uppercase tracking-wider">
                          <th className="py-3 px-4 rounded-l-lg">Referred Client</th>
                          <th className="py-3 px-4">Contact / Hash</th>
                          <th className="py-3 px-4">KYC Status</th>
                          <th className="py-3 px-4">Portfolio Value</th>
                          <th className="py-3 px-4">Est. Share</th>
                          <th className="py-3 px-4 rounded-r-lg text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-12 px-4 text-center" colSpan={6}>
                            <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                              <div className="w-12 h-12 rounded-full bg-[#f6f3ee] flex items-center justify-center text-[#594047] mb-3">
                                <span className="material-symbols-outlined text-[24px]">inbox</span>
                              </div>
                              <span className="text-sm font-bold text-[#1c1c19]">
                                No referrals captured for current cycle
                              </span>
                              <p className="text-xs text-[#594047] mt-1 text-center leading-relaxed">
                                Share your partner invitation link. All clicks, signups, and KYC progressions appear here instantly.
                              </p>
                              <button
                                className="mt-4 px-4 py-1.5 rounded-full bg-[#f6f3ee] text-[#1c1c19] text-xs font-bold hover:bg-[#e5e2dd] transition-colors cursor-pointer border border-[#e5e2dd]"
                                onClick={() => setActiveState('empty')}
                              >
                                View Onboarding Checklist
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* STATE 2: EMPTY STATE (HINDI INCENTIVE + STEP-BY-STEP) */}
            {activeState === 'empty' && (
              <div className="w-full flex flex-col gap-4">
                <div className="rounded-2xl bg-white/90 backdrop-blur-xl p-6 sm:p-8 shadow-xs border border-[#e5e2dd] relative overflow-hidden">
                  <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-[#ffd9e2]/30 blur-2xl pointer-events-none"></div>

                  <div className="max-w-3xl flex flex-col gap-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ffd8e5] text-[#3c0223] text-xs font-bold w-max">
                      <span className="material-symbols-outlined text-[16px]">celebration</span>
                      <span>₹2,500 Kickstart Activation Bonus</span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#1c1c19] tracking-tight">
                      कोई रेफरल अभी नहीं मिला — अपनी पहली क्लाइंट ऑनबोर्डिंग शुरू करें
                    </h2>

                    <p className="text-xs sm:text-sm text-[#594047] leading-relaxed">
                      Complete these three fundamental steps to inaugurate your Nexora Partner pipeline. Upon your first client&apos;s verified trade, unlock an immediate <strong className="text-[#1c1c19]">₹2,500 onboarding incentive</strong> credited directly to your bank account.
                    </p>

                    {/* 3-Step Guided Roadmap */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                      {/* Step 1 */}
                      <div className="rounded-xl bg-[#f6f3ee] p-4 flex flex-col justify-between border border-[#e5e2dd] hover:bg-white transition-all">
                        <div className="flex flex-col">
                          <div className="flex items-center justify-between mb-2">
                            <span className="w-7 h-7 rounded-full bg-[#b1005e] text-white text-xs flex items-center justify-center font-bold">
                              1
                            </span>
                            <span className="material-symbols-outlined text-[#b1005e] text-[20px]">share</span>
                          </div>
                          <h4 className="text-sm font-bold text-[#1c1c19]">Share Partner Link</h4>
                          <p className="text-xs text-[#594047] mt-1.5 leading-relaxed">
                            Forward your unique link or dynamic QR code to investors exploring institutional portfolio management.
                          </p>
                        </div>
                        <button
                          className="mt-4 text-left text-xs text-[#b1005e] font-bold flex items-center gap-1 hover:underline cursor-pointer"
                          onClick={handleCopyLink}
                        >
                          <span>Copy Link Now</span>
                          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </button>
                      </div>

                      {/* Step 2 */}
                      <div className="rounded-xl bg-[#f6f3ee] p-4 flex flex-col justify-between border border-[#e5e2dd] hover:bg-white transition-all">
                        <div className="flex flex-col">
                          <div className="flex items-center justify-between mb-2">
                            <span className="w-7 h-7 rounded-full bg-[#735c00] text-white text-xs flex items-center justify-center font-bold">
                              2
                            </span>
                            <span className="material-symbols-outlined text-[#735c00] text-[20px]">badge</span>
                          </div>
                          <h4 className="text-sm font-bold text-[#1c1c19]">Client KYC Check</h4>
                          <p className="text-xs text-[#594047] mt-1.5 leading-relaxed">
                            Our digital verification clears their PAN, Aadhaar, and depository accounts in under 90 seconds.
                          </p>
                        </div>
                        <span className="mt-4 text-xs text-[#594047] font-semibold">Automatic Tracking</span>
                      </div>

                      {/* Step 3 */}
                      <div className="rounded-xl bg-[#f6f3ee] p-4 flex flex-col justify-between border border-[#e5e2dd] hover:bg-white transition-all">
                        <div className="flex flex-col">
                          <div className="flex items-center justify-between mb-2">
                            <span className="w-7 h-7 rounded-full bg-[#d91b77] text-white text-xs flex items-center justify-center font-bold">
                              3
                            </span>
                            <span className="material-symbols-outlined text-[#d91b77] text-[20px]">payments</span>
                          </div>
                          <h4 className="text-sm font-bold text-[#1c1c19]">Unlock ₹2,500</h4>
                          <p className="text-xs text-[#594047] mt-1.5 leading-relaxed">
                            Your kickoff reward dispatches automatically alongside your weekly Monday commission payout.
                          </p>
                        </div>
                        <span className="mt-4 text-xs text-[#b1005e] font-bold">Zero Commission Cap</span>
                      </div>
                    </div>

                    {/* CTA Ribbon */}
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <button
                        className="px-6 py-3 rounded-full bg-[#d91b77] text-white font-bold text-xs shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                        onClick={handleCopyLink}
                      >
                        <span className="material-symbols-outlined text-[18px]">content_copy</span>
                        <span>Copy Link (REF-5A45019655)</span>
                      </button>
                      <button
                        className="px-6 py-3 rounded-full bg-[#f0ede9] text-[#1c1c19] font-bold text-xs hover:bg-[#e5e2dd] transition-colors flex items-center gap-2 cursor-pointer border border-[#e5e2dd]"
                        onClick={downloadQRMock}
                      >
                        <span className="material-symbols-outlined text-[18px]">qr_code</span>
                        <span>Download Welcome Standee</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STATE 3: RESTRICTED / INCOMPLETE KYC */}
            {activeState === 'restricted' && (
              <div className="w-full flex flex-col gap-4">
                <div className="rounded-2xl bg-white/90 backdrop-blur-xl p-5 sm:p-6 shadow-xs border-l-4 border-l-[#cca730] border border-[#e5e2dd]">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#ffe088] flex items-center justify-center text-[#241a00] shrink-0">
                        <span className="material-symbols-outlined text-[28px]">account_balance</span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-[#ffe088] text-[#241a00] text-[10px] font-bold">
                            Action Required
                          </span>
                          <span className="text-[#735c00] text-[11px] uppercase font-bold">
                            Payout Gate Locked
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-[#1c1c19] mt-1">
                          Bank Verification Pending — Add IFSC &amp; Account
                        </h3>
                        <p className="text-xs text-[#594047] max-w-2xl mt-1 leading-relaxed">
                          Your partner referral links remain fully operational and continue tracking leads. However, direct automated weekly withdrawals to your banking institution require account verification.
                        </p>
                      </div>
                    </div>

                    <button
                      className="px-5 py-2.5 rounded-full bg-[#8e4767] text-white font-bold text-xs shadow-sm hover:bg-[#b1005e] transition-all duration-200 flex items-center gap-2 shrink-0 cursor-pointer"
                      onClick={() => alert('Redirecting to Bank & Profile Verification form...')}
                    >
                      <span className="material-symbols-outlined text-[18px]">manage_accounts</span>
                      <span>Update Profile &amp; Banking</span>
                    </button>
                  </div>
                </div>

                {/* Payout Sandbox Disabled Preview */}
                <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-5 shadow-xs border border-[#e5e2dd] opacity-85">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold text-[#1c1c19]">Weekly Settlement Vault</h4>
                    <span className="px-3 py-1 rounded-full bg-[#f6f3ee] text-[#594047] text-[11px] font-bold border border-[#e5e2dd]">
                      Disabled Pending KYC
                    </span>
                  </div>
                  <div className="p-5 rounded-xl bg-[#f6f3ee] flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#e5e2dd]">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#ebe8e3] flex items-center justify-center text-[#594047]">
                        <span className="material-symbols-outlined text-[20px]">lock</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#1c1c19]">Primary Bank Disbursal Node</span>
                        <span className="text-[11px] text-[#594047]">
                          HDFC / ICICI / SBI Direct NEFT/RTGS Transfer
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-base font-bold text-[#594047]">₹0.00 INACTIVE</span>
                  </div>
                </div>
              </div>
            )}

            {/* STATE 4: LOADING SKELETON */}
            {activeState === 'skeleton' && (
              <div className="w-full flex flex-col gap-4">
                {/* Header Skeleton */}
                <div className="w-full rounded-2xl bg-white/80 backdrop-blur-xl p-6 shadow-xs border border-[#e5e2dd] animate-pulse">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 w-full sm:w-1/2">
                      <div className="w-14 h-14 rounded-2xl bg-[#ebe8e3]"></div>
                      <div className="flex flex-col gap-2 w-2/3">
                        <div className="h-6 w-3/4 bg-[#ebe8e3] rounded-full"></div>
                        <div className="h-4 w-1/2 bg-[#ebe8e3] rounded-full"></div>
                      </div>
                    </div>
                    <div className="h-10 w-48 bg-[#ebe8e3] rounded-full"></div>
                  </div>
                </div>

                {/* 4 Cards Skeleton Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 animate-pulse">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-32 rounded-xl bg-white/80 p-4 flex flex-col justify-between border border-[#e5e2dd]">
                      <div className="h-4 w-24 bg-[#ebe8e3] rounded-full"></div>
                      <div className="h-8 w-16 bg-[#ebe8e3] rounded-full"></div>
                      <div className="h-3 w-32 bg-[#ebe8e3] rounded-full"></div>
                    </div>
                  ))}
                </div>

                {/* Big Table Skeleton */}
                <div className="w-full rounded-2xl bg-white/80 backdrop-blur-xl p-6 shadow-xs border border-[#e5e2dd] animate-pulse flex flex-col gap-4">
                  <div className="h-6 w-56 bg-[#ebe8e3] rounded-full"></div>
                  <div className="h-10 w-full bg-[#f6f3ee] rounded-lg"></div>
                  <div className="h-10 w-full bg-[#f6f3ee] rounded-lg"></div>
                  <div className="h-10 w-full bg-[#f6f3ee] rounded-lg"></div>
                </div>
              </div>
            )}

            {/* STATE 5: NETWORK ERROR */}
            {activeState === 'error' && (
              <div className="w-full rounded-2xl bg-[#ffdad6]/40 backdrop-blur-xl p-8 shadow-xs border border-[#ffdad6] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[32px]">sync_problem</span>
                </div>
                <h3 className="text-lg font-bold text-[#1c1c19]">
                  Failed to Fetch Live Referral Sync — Network Timeout
                </h3>
                <p className="text-xs sm:text-sm text-[#594047] max-w-lg mt-2 leading-relaxed">
                  The partner ledger server did not respond within the 5000ms SLA window. No transactions have been compromised.
                </p>
                <div className="flex items-center gap-3 mt-5">
                  <button
                    className="px-6 py-2.5 rounded-full bg-[#b1005e] text-white text-xs font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
                    onClick={handleRetrySync}
                    disabled={isRetrying}
                  >
                    <span className={`material-symbols-outlined text-[18px] ${isRetrying ? 'animate-spin' : ''}`}>
                      refresh
                    </span>
                    <span>{isRetrying ? 'Reconnecting...' : 'Retry Connection'}</span>
                  </button>
                  <button
                    className="px-5 py-2.5 rounded-full bg-[#f0ede9] text-[#1c1c19] text-xs font-bold hover:bg-[#e5e2dd] transition-colors cursor-pointer border border-[#e5e2dd]"
                    onClick={() => setActiveState('active')}
                  >
                    Dismiss &amp; Show Offline Cache
                  </button>
                </div>
                <div className="mt-5 flex items-center gap-2 font-mono text-[11px] text-[#594047]">
                  <span>ERR_SOCKET_TIMEOUT: GATEWAY_504</span>
                  <span>•</span>
                  <span>Telemetry Pod: BOM-01</span>
                </div>
              </div>
            )}

            {/* Photographic Partner Milestone Spotlight */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
              <div className="lg:col-span-8 rounded-2xl bg-white/80 backdrop-blur-xl p-5 sm:p-6 shadow-xs border border-[#e5e2dd] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#ffd8e5] text-[#3c0223] text-[10px] font-bold uppercase tracking-wider">
                      Growth Academy
                    </span>
                    <span className="material-symbols-outlined text-[#b1005e] text-[26px]">auto_stories</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1c1c19]">
                    High-Net-Worth Advisory Playbook 2025
                  </h3>
                  <p className="text-xs sm:text-sm text-[#594047] mt-2 leading-relaxed">
                    Review our compliant pitching modules covering automated rebalancing, algorithmic hedged returns, and institutional custodial security for HNIs.
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#e5e2dd] flex items-center justify-between flex-wrap gap-2">
                  <button
                    className="px-4 py-2 rounded-full bg-[#f6f3ee] text-[#1c1c19] text-xs font-bold hover:bg-[#e5e2dd] transition-colors flex items-center gap-1.5 cursor-pointer border border-[#e5e2dd]"
                    onClick={() => alert('Downloading Nexora Partner Guidebook PDF...')}
                  >
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    <span>Download PDF Guide</span>
                  </button>
                  <span className="text-[11px] text-[#594047]">Updated yesterday • 14 min read</span>
                </div>
              </div>

              {/* Editorial Partner Visual */}
              <div className="lg:col-span-4 rounded-2xl overflow-hidden shadow-xs h-64 relative bg-[#f0ede9] border border-[#e5e2dd]">
                <img
                  className="w-full h-full object-cover"
                  alt="Sophisticated clean architectural glass boardroom overlooking Mumbai financial district"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsZ2EHom_zV4KF1gpXpYQwbnlnoAnyNVSC30DEQkWtyxavkUB6BazQUs4iCjJF277vd3tRZVzEnBZnjHNvkHP2z-JUaPXGC00TgmG-ffxnu7xrqu4v8S9hfNPSDy6xlPb16pezrZL-T0Gyr70mI_7UtvOVwqQ4TzI9MLZEeOcDod9zs78j_WMKFyRhfZe3gmEhKTirloFA6dTXE9p4RqQvW9-K3Jcy05x3CWEtT0zhzNCnIaiNLFmC"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#31302d]/90 via-transparent to-transparent flex items-end p-4">
                  <div className="flex flex-col text-white">
                    <span className="text-[10px] uppercase tracking-wider opacity-80 font-bold">
                      Institutional Standard
                    </span>
                    <span className="text-sm font-bold">Private Wealth Network</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-xl shadow-[0_-1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-around px-2 border-t border-[#e5e2dd]">
          <button
            onClick={() => setActiveSidebarNav('dashboard')}
            className={`flex flex-col items-center justify-center gap-0.5 text-xs font-semibold cursor-pointer ${
              activeSidebarNav === 'dashboard' ? 'text-[#b1005e]' : 'text-[#594047]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">grid_view</span>
            <span className="text-[10px]">Home</span>
          </button>
          <button
            onClick={() => setActiveSidebarNav('referred-users')}
            className={`flex flex-col items-center justify-center gap-0.5 text-xs font-semibold cursor-pointer ${
              activeSidebarNav === 'referred-users' ? 'text-[#b1005e]' : 'text-[#594047]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">group</span>
            <span className="text-[10px]">Referrals</span>
          </button>
          <button
            onClick={() => {
              if (onNavigateToHub) onNavigateToHub();
            }}
            className="flex flex-col items-center justify-center gap-0.5 text-xs font-semibold text-[#594047] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">military_tech</span>
            <span className="text-[10px]">Rewards</span>
          </button>
          <button
            onClick={() => setActiveSidebarNav('profile')}
            className={`flex flex-col items-center justify-center gap-0.5 text-xs font-semibold cursor-pointer ${
              activeSidebarNav === 'profile' ? 'text-[#b1005e]' : 'text-[#594047]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">person</span>
            <span className="text-[10px]">Profile</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex flex-col items-center justify-center gap-0.5 text-xs font-semibold text-[#594047] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">more_horiz</span>
            <span className="text-[10px]">More</span>
          </button>
        </nav>
      </div>
    </div>
  );
};
