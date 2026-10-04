import React from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { NexoraLogo } from './NexoraLogo';

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
    <header className="fixed top-0 inset-x-0 w-full z-50 pt-safe bg-[#fcf9f4]/95 backdrop-blur-xl border-b border-[#e5e2dd]/80 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="w-full max-w-full h-14 sm:h-16 px-3 sm:px-6 lg:px-12 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo & Name: scales seamlessly */}
        <NavLink
          to="/"
          className="flex items-center gap-2 min-w-0 shrink-0 cursor-pointer group select-none text-left no-underline"
        >
          <NexoraLogo variant="horizontal" size="sm" showTagline={false} className="sm:hidden" />
          <NexoraLogo variant="horizontal" size="sm" showTagline={true} className="hidden sm:flex" />
        </NavLink>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Desktop Navigation Links */}
          <button
            type="button"
            onClick={() => navigate('/')}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95 shrink-0 ${
              isHome
                ? 'bg-[#ffd9e2] text-[#b1005e] border border-[#d91b77]/40 shadow-xs'
                : 'text-[#594047] bg-[#f0ede9] hover:bg-[#e5e2dd] hover:text-[#b1005e] border border-[#e5e2dd]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">home</span>
            <span>Home</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/partner/leaderboard')}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95 shrink-0 ${
              location.pathname === '/partner/leaderboard'
                ? 'bg-[#ffd9e2] text-[#b1005e] border border-[#d91b77]/40 shadow-xs'
                : 'text-[#594047] bg-[#f0ede9] hover:bg-[#e5e2dd] hover:text-[#b1005e] border border-[#e5e2dd]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">emoji_events</span>
            <span>Leaderboard</span>
          </button>

          {registeredPartner && (
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-[#d91b77] hover:bg-[#b1005e] shadow-xs active:scale-95 cursor-pointer transition-all shrink-0"
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
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#f0ede9] border border-[#d91b77]/20 text-[#1c1c19] cursor-pointer hover:bg-[#e5e2dd] transition-colors"
              >
                <span className="text-[11px] sm:text-xs font-bold text-[#b1005e] truncate max-w-[80px] sm:max-w-[120px]">{registeredPartner.name}</span>
                <span className="material-symbols-outlined text-[18px] text-[#b1005e]">account_circle</span>
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 sm:w-56 rounded-2xl bg-white shadow-xl border border-[#e5e2dd] py-2 z-50">
                  <NavLink to="/partner/profile" className="block px-4 py-2.5 text-xs font-semibold text-[#594047] hover:bg-[#f6f3ee] hover:text-[#b1005e] flex items-center gap-2.5" onClick={() => setIsProfileMenuOpen(false)}>
                    <span className="material-symbols-outlined text-[18px]">person</span>
                    <span>Profile &amp; Settings</span>
                  </NavLink>
                  <NavLink to="/dashboard" className="sm:hidden block px-4 py-2.5 text-xs font-semibold text-[#594047] hover:bg-[#f6f3ee] hover:text-[#b1005e] flex items-center gap-2.5" onClick={() => setIsProfileMenuOpen(false)}>
                    <span className="material-symbols-outlined text-[18px]">dashboard</span>
                    <span>Portal Dashboard</span>
                  </NavLink>
                  {onLogout && (
                    <button onClick={() => { setIsProfileMenuOpen(false); onLogout(); }} className="w-full text-left px-4 py-2.5 text-xs font-bold text-[#ba1a1a] hover:bg-[#fff0f2] flex items-center gap-2.5 border-t border-[#e5e2dd]/60 cursor-pointer">
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      <span>Log Out</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenApply}
              className="min-h-[36px] sm:min-h-[40px] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#d91b77] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all hover:opacity-95 active:scale-95 shadow-[0_4px_16px_rgba(217,27,119,0.25)] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
              <span>Apply ₹0</span>
            </button>
          )}

          <button onClick={onOpenSupport} aria-label="Support and Help" className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#f0ede9] text-[#594047] hover:bg-[#e5e2dd] hover:text-[#b1005e] flex items-center justify-center shrink-0 transition-colors cursor-pointer border border-[#e5e2dd]">
            <span className="material-symbols-outlined text-[18px] sm:text-[20px]">support_agent</span>
          </button>
        </div>
      </div>
    </header>
  );
};
