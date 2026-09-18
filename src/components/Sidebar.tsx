import React from 'react';
import { NavLink } from 'react-router-dom';

export interface SidebarProps {
  onLogout?: () => void;
  partnerName?: string;
  partnerId?: string;
  partnerTier?: string;
}

const NAV_ITEMS = [
  { group: 'Core Management', items: [
    { to: '/dashboard', label: 'Dashboard', icon: 'grid_view' },
    { to: '/partner/share-earn', label: 'My Referral Code', icon: 'qr_code_2' },
    { to: '/partner/referred-salons', label: 'Referred Users', icon: 'group' },
    { to: '/partner/referral-status', label: 'Referral Status', icon: 'query_stats' },
    { to: '/partner/rewards', label: 'Nexora Rewards', icon: 'military_tech', badge: '7 Tiers' },
    { to: '/partner/activation-reward', label: 'Nexora Activation', icon: 'redeem' },
    { to: '/partner/profile', label: 'Profile', icon: 'person' }
  ]},
  { group: 'Finance & Growth', items: [
    { to: '/partner/leaderboard', label: 'Partner Leaderboard', icon: 'emoji_events', badge: 'Live Ranks' },
    { to: '/partner/top-performers', label: 'Top Performers', icon: 'leaderboard' },
    { to: '/partner/earnings', label: 'Earnings', icon: 'account_balance_wallet' },
    { to: '/partner/withdrawals', label: 'Withdrawals', icon: 'payments' },
    { to: '/partner/marketing', label: 'Marketing Material', icon: 'campaign' },
    { to: '/partner/levels', label: 'Partner Levels', icon: 'stars' }
  ]}
];

export const Sidebar: React.FC<SidebarProps> = ({
  onLogout,
  partnerName = 'Growth Partner',
  partnerId = 'PENDING',
  partnerTier = 'Partner',
}) => {
  return (
    <aside className="hidden lg:flex sticky top-16 h-[calc(100vh-4rem)] w-72 bg-white/80 backdrop-blur-xl border-r border-[#e5e2dd] flex-col justify-between overflow-y-auto z-40">
      <div className="flex flex-col py-4">
        {/* Partner Info Quick Chip */}
        <div className="mx-4 mb-6 p-3 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] flex items-center justify-between shadow-2xs">
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

        {NAV_ITEMS.map((group) => (
          <div key={group.group} className="mb-6">
            <div className="px-6 pb-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#594047]">
                {group.group}
              </span>
            </div>
            <nav className="flex flex-col gap-1 px-4">
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-200 text-left text-xs font-bold cursor-pointer ${
                    isActive
                      ? 'bg-[#d91b77] text-white shadow-[0_4px_16px_rgba(217,27,119,0.25)]'
                      : 'text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px]">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-[#ffe088] text-[#241a00]">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-[#e5e2dd]">
        {onLogout && (
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#ba1a1a] hover:bg-[#fff0f2] transition-all duration-200 text-xs font-bold cursor-pointer border border-[#ba1a1a]/10"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span>Log Out</span>
          </button>
        )}
      </div>
    </aside>
  );
};
