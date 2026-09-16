import React from 'react';

interface BackButtonProps {
  onClick: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => (
  <button 
    onClick={onClick} 
    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold text-[#594047] bg-[#f0ede9] rounded-full hover:bg-[#e5e2dd] hover:text-[#b1005e] transition-all cursor-pointer shadow-sm border border-[#e5e2dd]"
  >
    <span className="material-symbols-outlined text-lg">arrow_back</span>
    Back
  </button>
);
