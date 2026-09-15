import React from 'react';
import { ASSETS } from '../data/partnerData';

interface HeaderProps {
  onOpenApply: () => void;
  onOpenSupport: () => void;
  registeredPartner: { name: string; partnerId: string } | null;
}

export const Header: React.FC<HeaderProps> = ({ onOpenApply, onOpenSupport, registeredPartner }) => {
  return (
    <header className="fixed top-0 w-full z-40 pt-safe bg-[#fcf9f4]/85 backdrop-blur-xl border-b border-[#e5e2dd]/60 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="max-w-4xl mx-auto h-16 px-4 flex items-center justify-between gap-2">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <img
            src={ASSETS.logo}
            alt="Nexora Growth Partner Logo"
            className="h-8 w-auto object-contain shrink-0 rounded"
            onError={(e) => {
              // Fallback logo placeholder if network image fails
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-bold text-lg tracking-tight text-[#1c1c19] truncate">
                Nexora
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#fda4c9]/40 text-[#7a3656] text-[11px] font-bold shrink-0">
                5000+ Partners
              </span>
            </div>
            <span className="text-xs text-[#594047] truncate font-medium">
              Growth Partner Hub
            </span>
          </div>
        </div>

        {/* Right CTA / User Status */}
        <div className="flex items-center gap-2 shrink-0">
          {registeredPartner ? (
            <div 
              onClick={onOpenApply}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f0ede9] border border-[#d91b77]/20 text-[#1c1c19] cursor-pointer hover:bg-[#e5e2dd] transition-colors"
              title="Click to view your Partner Card"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-[#b1005e]">{registeredPartner.partnerId}</span>
              <span className="material-symbols-outlined text-[18px] text-[#b1005e]">verified</span>
            </div>
          ) : (
            <button
              onClick={onOpenApply}
              className="min-h-[40px] px-4 py-2 rounded-full bg-[#d91b77] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all hover:opacity-95 active:scale-95 shadow-[0_4px_16px_rgba(217,27,119,0.25)] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
              Apply Now
            </button>
          )}

          <button
            onClick={onOpenSupport}
            aria-label="Support and Help"
            className="w-9 h-9 rounded-full bg-[#f0ede9] text-[#594047] hover:bg-[#e5e2dd] hover:text-[#b1005e] flex items-center justify-center shrink-0 transition-colors cursor-pointer border border-[#e5e2dd]"
          >
            <span className="material-symbols-outlined text-[20px]">support_agent</span>
          </button>
        </div>
      </div>
    </header>
  );
};
