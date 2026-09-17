import React from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { ASSETS } from '../data/partnerData';

interface HeaderProps {
  onOpenApply: () => void;
  onOpenSupport: () => void;
  registeredPartner: { name: string; partnerId: string } | null;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenApply, 
  onOpenSupport, 
  registeredPartner,
  onLogout
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isProfileMenuOpen, setIsProfileMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#fcf9f4]/95 backdrop-blur-xl border-b border-[#e5e2dd]/80 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="w-full max-w-full h-16 px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
        <NavLink
          to="/"
          className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer group select-none text-left no-underline"
        >
          <img
            src={ASSETS.logo}
            alt="Nexora Growth Partner Logo"
            className="h-8 w-auto object-contain shrink-0 rounded transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-lg tracking-tight text-[#1c1c19] truncate group-hover:text-[#b1005e] transition-colors">Nexora</span>
            <span className="text-xs text-[#594047] truncate font-medium">Growth Partner Hub</span>
          </div>
        </NavLink>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => navigate('/')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95 shrink-0 ${
              isHome
                ? 'bg-[#ffd9e2] text-[#b1005e] border border-[#d91b77]/40 shadow-xs'
                : 'text-[#594047] bg-[#f0ede9] hover:bg-[#e5e2dd] hover:text-[#b1005e] border border-[#e5e2dd]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">home</span>
            <span>Home</span>
          </button>

          {registeredPartner && (
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-[#d91b77] hover:bg-[#b1005e] shadow-xs active:scale-95 cursor-pointer transition-all shrink-0"
            >
              <span className="material-symbols-outlined text-[16px]">dashboard</span>
              <span>Dashboard</span>
            </button>
          )}

          {registeredPartner ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f0ede9] border border-[#d91b77]/20 text-[#1c1c19] cursor-pointer hover:bg-[#e5e2dd] transition-colors"
              >
                <span className="text-xs font-bold text-[#b1005e] truncate max-w-[120px]">{registeredPartner.name}</span>
                <span className="material-symbols-outlined text-[18px] text-[#b1005e]">account_circle</span>
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-xl border border-[#e5e2dd] py-2 z-50">
                  <NavLink to="/partner/profile" className="block px-4 py-2.5 text-xs font-semibold text-[#594047] hover:bg-[#f6f3ee] hover:text-[#b1005e] flex items-center gap-2.5" onClick={() => setIsProfileMenuOpen(false)}>
                    <span className="material-symbols-outlined text-[18px]">person</span>
                    <span>Profile &amp; Settings</span>
                  </NavLink>
                  {onLogout && (
                    <button onClick={() => { setIsProfileMenuOpen(false); onLogout(); }} className="w-full text-left px-4 py-2.5 text-xs font-bold text-[#ba1a1a] hover:bg-[#fff0f2] flex items-center gap-2.5 border-t border-[#e5e2dd]/60">
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      <span>Log Out</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <button onClick={onOpenApply} className="min-h-[40px] px-4 py-2 rounded-full bg-[#d91b77] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all hover:opacity-95 active:scale-95 shadow-[0_4px_16px_rgba(217,27,119,0.25)] cursor-pointer">
              <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
              Apply Now
            </button>
          )}

          <button onClick={onOpenSupport} aria-label="Support and Help" className="w-9 h-9 rounded-full bg-[#f0ede9] text-[#594047] hover:bg-[#e5e2dd] hover:text-[#b1005e] flex items-center justify-center shrink-0 transition-colors cursor-pointer border border-[#e5e2dd]">
            <span className="material-symbols-outlined text-[20px]">support_agent</span>
          </button>
        </div>
      </div>
    </header>
  );
};
