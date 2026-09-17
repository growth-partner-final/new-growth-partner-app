import React from 'react';
import { NavLink } from 'react-router-dom';

interface BottomNavProps {
  onOpenSupport: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ onOpenSupport }) => {
  const navItems = [
    { to: '/', icon: 'home', label: 'Home' },
    { to: '/dashboard', icon: 'space_dashboard', label: 'Portal' },
    { to: '/partner/referral-status', icon: 'group', label: 'Referrals' },
    { to: '/partner/rewards', icon: 'military_tech', label: 'Rewards' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-40 pb-safe bg-[#fcf9f4]/95 backdrop-blur-xl border-t border-[#e5e2dd] shadow-[0_-4px_20px_rgba(74,14,46,0.06)]">
      <div className="max-w-lg mx-auto h-16 px-2 flex items-center justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `flex flex-col items-center justify-center min-w-[50px] min-h-[44px] gap-0.5 transition-colors cursor-pointer ${
              isActive ? 'text-[#b1005e] font-bold' : 'text-[#594047] hover:text-[#1c1c19]'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
            <span className="text-[10px]">{item.label}</span>
          </NavLink>
        ))}
        <button
          onClick={onOpenSupport}
          className="flex flex-col items-center justify-center min-w-[50px] min-h-[44px] gap-0.5 transition-colors cursor-pointer text-[#594047] hover:text-[#1c1c19]"
        >
          <span className="material-symbols-outlined text-[22px]">support_agent</span>
          <span className="text-[10px]">Help</span>
        </button>
      </div>
    </nav>
  );
};
