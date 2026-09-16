import React from 'react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSupport: () => void;
  onScrollTo: (id: string) => void;
  onNavigateToHome: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenSupport,
  onScrollTo,
  onNavigateToHome
}) => {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-40 pb-safe bg-[#fcf9f4]/90 backdrop-blur-xl border-t border-[#e5e2dd] shadow-[0_-4px_20px_rgba(74,14,46,0.06)]">
      <div className="max-w-md mx-auto h-16 px-4 flex items-center justify-around">
        {/* Home */}
        <button
          onClick={() => {
            setActiveTab('home');
            onNavigateToHome();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-colors cursor-pointer ${
            activeTab === 'home' ? 'text-[#b1005e] font-bold' : 'text-[#594047] hover:text-[#1c1c19]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">dashboard</span>
          <span className="text-[11px]">Home</span>
        </button>

        {/* Earnings */}
        <button
          onClick={() => {
            setActiveTab('earnings');
            onScrollTo('calculator');
          }}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-colors cursor-pointer ${
            activeTab === 'earnings' ? 'text-[#b1005e] font-bold' : 'text-[#594047] hover:text-[#1c1c19]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">payments</span>
          <span className="text-[11px]">Earnings</span>
        </button>

        {/* Rewards */}
        <button
          onClick={() => {
            setActiveTab('rewards');
            onScrollTo('rewards');
          }}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-colors cursor-pointer ${
            activeTab === 'rewards' ? 'text-[#b1005e] font-bold' : 'text-[#594047] hover:text-[#1c1c19]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">military_tech</span>
          <span className="text-[11px]">Rewards</span>
        </button>

        {/* Help */}
        <button
          onClick={() => {
            setActiveTab('help');
            onOpenSupport();
          }}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-0.5 transition-colors cursor-pointer ${
            activeTab === 'help' ? 'text-[#b1005e] font-bold' : 'text-[#594047] hover:text-[#1c1c19]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">support_agent</span>
          <span className="text-[11px]">Help</span>
        </button>
      </div>
    </nav>
  );
};
