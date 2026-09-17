import React from 'react';

export type SidebarItemKey =
  | 'dashboard'
  | 'my-referral-code'
  | 'referred-users'
  | 'referral-status'
  | 'rewards'
  | 'extra-onboarding-reward'
  | 'profile'
  | 'top-performers'
  | 'earnings'
  | 'withdrawals'
  | 'marketing-material'
  | 'partner-levels';

export interface SidebarProps {
  activeItem?: SidebarItemKey | string;
  onNavigateItem: (key: SidebarItemKey) => void;
  onNavigateToHub?: () => void;
  onNavigateToSupport?: () => void;
  onLogout?: () => void;
  partnerName?: string;
  partnerId?: string;
  partnerTier?: string;
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
}

interface NavItemConfig {
  id: SidebarItemKey;
  label: string;
  icon: string;
  badge?: string;
  badgeColor?: string;
}

const CORE_MANAGEMENT_ITEMS: NavItemConfig[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'grid_view' },
  { id: 'my-referral-code', label: 'My Referral Code', icon: 'qr_code_2' },
  { id: 'referred-users', label: 'Referred Users', icon: 'group' },
  { id: 'referral-status', label: 'Referral Status', icon: 'query_stats' },
  { id: 'rewards', label: 'Nexora Rewards', icon: 'military_tech', badge: '7 Tiers', badgeColor: 'bg-[#ffe088] text-[#241a00]' },
  { id: 'extra-onboarding-reward', label: 'Nexora Activation', icon: 'redeem', badge: '10% Split', badgeColor: 'bg-emerald-100 text-emerald-800' },
  { id: 'profile', label: 'Profile', icon: 'person' }
];

const PERFORMANCE_FINANCE_ITEMS: NavItemConfig[] = [
  { id: 'top-performers', label: 'Top Performers', icon: 'leaderboard', badge: 'Live', badgeColor: 'bg-[#ffe088] text-[#241a00]' },
  { id: 'earnings', label: 'Earnings', icon: 'account_balance_wallet' },
  { id: 'withdrawals', label: 'Withdrawals', icon: 'payments' },
  { id: 'marketing-material', label: 'Marketing Material', icon: 'campaign' },
  { id: 'partner-levels', label: 'Partner Levels', icon: 'stars' }
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeItem = 'dashboard',
  onNavigateItem,
  onNavigateToHub,
  onNavigateToSupport,
  onLogout,
  partnerName = 'Growth Partner',
  partnerId = 'PENDING',
  partnerTier = 'Partner',
  isMobileDrawer = false,
  onCloseMobileDrawer
}) => {
  const handleItemClick = (key: SidebarItemKey) => {
    onNavigateItem(key);
    if (isMobileDrawer && onCloseMobileDrawer) {
      onCloseMobileDrawer();
    }
  };

  const handleHomeClick = () => {
    if (onNavigateToHub) {
      onNavigateToHub();
    }
    if (isMobileDrawer && onCloseMobileDrawer) {
      onCloseMobileDrawer();
    }
  };

  // Helper to normalize active item comparison
  const isItemActive = (id: SidebarItemKey) => {
    if (activeItem === id) return true;
    if (id === 'earnings' && activeItem === 'earnings-ledger') return true;
    if (id === 'rewards' && (activeItem === 'milestone-claims' || activeItem === 'milestones')) return true;
    if (id === 'profile' && (activeItem === 'profile-settings' || activeItem === 'settings')) return true;
    if (id === 'top-performers' && (activeItem === 'leaderboard')) return true;
    if (id === 'my-referral-code' && (activeItem === 'share-earn')) return true;
    if (id === 'referred-users' && (activeItem === 'referral-history' || activeItem === 'salon-intelligence')) return true;
    if (id === 'referral-status' && (activeItem === 'referral-timeline')) return true;
    return false;
  };

  const containerClasses = isMobileDrawer
    ? 'flex flex-col h-full w-full bg-white text-[#1c1c19] overflow-y-auto'
    : 'hidden lg:flex fixed left-0 top-0 h-full w-72 bg-white/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex-col justify-between overflow-y-auto border-r border-[#e5e2dd]';

  return (
    <aside className={containerClasses}>
      <div className="flex flex-col">
        {/* Sidebar Brand Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-[#e5e2dd]/60 shrink-0">
          <button
            type="button"
            onClick={handleHomeClick}
            className="flex items-center gap-2 cursor-pointer group select-none text-left bg-transparent border-0 p-0"
            title="Return to Main Landing Hub"
          >
            <img
              alt="Nexora Brand Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida/AEtjO1XZxTb-KtdsPjo0U0odHwDY485hRuwmfDBk7sy7hvncIa4xg3AdjCaLVTut6pSuuRiQJj_3YtSdqJ3TLo2klHSJMNebL6mVq0uWtOhluaULb7Cy_34No2AloAlRtDCW1-HCFGFyKGQkrv2OMGEMkXFJpEFLcxUma8v2Z1hXG0pFOlEix77UvOTw-NfNuX20oyBgVrPL--0n2ZNjrI0vKNBImBop03G0p3fTT3hR_Chdf05d_h_ZbzfoKQ"
            />
            <span className="font-extrabold text-lg text-[#1c1c19] tracking-tight group-hover:text-[#b1005e] transition-colors">
              Nexora
            </span>
          </button>
          <div className="flex items-center gap-2">
            <div className="px-2 py-0.5 rounded-full bg-[#ffd8e5] text-[#3c0223] font-extrabold text-[11px] border border-[#fda4c9]/60">
              PARTNER
            </div>
            {isMobileDrawer && onCloseMobileDrawer && (
              <button
                type="button"
                onClick={onCloseMobileDrawer}
                className="p-1 rounded-lg text-[#594047] hover:bg-[#f6f3ee] cursor-pointer"
                aria-label="Close drawer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            )}
          </div>
        </div>

        {/* Partner Info Quick Chip */}
        <div className="mx-4 mt-3 p-3 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#ffd9e2] flex items-center justify-center text-[#b1005e] font-bold shrink-0">
              <span className="material-symbols-outlined text-[16px]">verified</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-black text-[#1c1c19] truncate">{partnerName}</span>
              <span className="text-[10px] text-[#8e4767] font-mono font-bold">{partnerId}</span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#ffe088] text-[#241a00] text-[10px] font-black uppercase tracking-wide shrink-0">
            Gold
          </span>
        </div>

        {/* Core Management Navigation Section */}
        <div className="px-6 pt-4 pb-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#594047]">
            Core Management
          </span>
        </div>

        <nav className="flex flex-col gap-1 px-4">
          <button
            onClick={handleHomeClick}
            className="flex items-center gap-3 px-3.5 py-2 rounded-xl transition-all duration-200 text-left text-xs font-bold cursor-pointer text-[#b1005e] bg-[#ffd9e2]/40 hover:bg-[#ffd9e2] border border-[#fda4c9]/50 mb-1 shadow-2xs"
            type="button"
            title="Return to Main Landing Hub"
          >
            <span className="material-symbols-outlined text-[20px]">home</span>
            <span>Home (Landing Page)</span>
          </button>

          {CORE_MANAGEMENT_ITEMS.map((item) => {
            const active = isItemActive(item.id);
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-200 text-left text-xs font-bold cursor-pointer ${
                  active
                    ? 'bg-[#d91b77] text-white shadow-[0_4px_16px_rgba(217,27,119,0.25)]'
                    : 'text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19]'
                }`}
                type="button"
              >
                <div className="flex items-center gap-3">
                  <span className={`material-symbols-outlined text-[20px] ${active ? 'text-white' : 'text-[#8e4767]'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      active ? 'bg-white/20 text-white' : item.badgeColor || 'bg-[#e5e2dd] text-[#594047]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Performance & Finance Section */}
        <div className="px-6 pt-5 pb-2 flex items-center justify-between">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#594047]">
            Finance &amp; Growth
          </span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
            Live
          </span>
        </div>

        <nav className="flex flex-col gap-1 px-4 pb-4">
          {PERFORMANCE_FINANCE_ITEMS.map((item) => {
            const active = isItemActive(item.id);
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-200 text-left text-xs font-bold cursor-pointer ${
                  active
                    ? 'bg-[#d91b77] text-white shadow-[0_4px_16px_rgba(217,27,119,0.25)]'
                    : 'text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19]'
                }`}
                type="button"
              >
                <div className="flex items-center gap-3">
                  <span className={`material-symbols-outlined text-[20px] ${active ? 'text-white' : 'text-[#8e4767]'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      active ? 'bg-white/20 text-white' : item.badgeColor || 'bg-[#e5e2dd] text-[#594047]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {onNavigateToSupport && (
            <button
              onClick={onNavigateToSupport}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-all duration-200 text-left text-xs font-bold cursor-pointer mt-1"
              type="button"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] text-[#8e4767]">headset_mic</span>
                <span>Support Desk</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#f0ede9] text-[#594047] font-bold">
                24/7
              </span>
            </button>
          )}

          {onLogout && (
            <button
              onClick={onLogout}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[#ba1a1a] hover:bg-[#fff0f2] transition-all duration-200 text-left text-xs font-bold cursor-pointer mt-1 border border-[#ba1a1a]/10"
              type="button"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] text-[#ba1a1a]">logout</span>
                <span>Log Out</span>
              </div>
            </button>
          )}
        </nav>
      </div>

      {/* Current Tier Footer in Sidebar */}
      <div className="p-4 mx-4 mb-4 rounded-2xl bg-[#f6f3ee] flex items-center justify-between border border-[#e5e2dd] shadow-2xs shrink-0">
        <div className="flex flex-col">
          <span className="text-[11px] text-[#594047] font-semibold">Current Tier</span>
          <span className="font-extrabold text-sm text-[#b1005e]">{partnerTier}</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#ffe088] flex items-center justify-center shadow-xs">
          <span className="material-symbols-outlined text-[#241a00] text-[18px]">verified</span>
        </div>
      </div>
    </aside>
  );
};
