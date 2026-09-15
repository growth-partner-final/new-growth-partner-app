import React, { useState } from 'react';
import { ASSETS, MILESTONE_LEVELS } from '../data/partnerData';
import { MilestoneLevel } from '../types';

export const MilestoneLadder: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<MilestoneLevel>(MILESTONE_LEVELS[0]);
  const [isPosterOpen, setIsPosterOpen] = useState<boolean>(false);

  return (
    <section className="px-4 py-6 flex flex-col gap-4" id="rewards">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-[#d91b77]">
          <span className="material-symbols-outlined text-[18px]">military_tech</span>
          <span className="text-xs font-bold tracking-wider uppercase">Official Ladder</span>
        </div>
        <h2 className="text-xl font-bold text-[#1c1c19]">
          7-Stage Milestone Rewards &amp; Income Ladder
        </h2>
        <p className="text-xs sm:text-sm text-[#594047]">
          टोटल कैश बोनस ₹5,00,000 तक + लाइफटाइम रिकरिंग रेवेन्यू शेयर।
        </p>
      </div>

      {/* Official Infographic Poster Card */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-[#e5e2dd] border border-[#e5e2dd] group">
        <img
          src={ASSETS.poster}
          alt="Nexora 7-Stage Milestone Rewards and Income Ladder infographic displaying rank bonuses from Level 1 Rising Star to Level 7 Global Ambassador"
          className="w-full h-auto object-contain block transition-transform duration-300 group-hover:scale-[1.01]"
        />
        <button
          onClick={() => setIsPosterOpen(true)}
          className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 shadow-md hover:bg-black/90 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">zoom_in</span>
          फुल पोस्टर देखें (Zoom)
        </button>
      </div>

      {/* Lightbox Modal for Poster */}
      {isPosterOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setIsPosterOpen(false)}
        >
          <div className="relative max-w-2xl w-full max-h-[90vh] overflow-auto flex flex-col items-center">
            <button
              onClick={() => setIsPosterOpen(false)}
              className="sticky top-2 right-2 self-end mb-2 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
            <img
              src={ASSETS.poster}
              alt="Full view of Nexora Milestone Poster"
              className="w-full h-auto rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Interactive Level Detail Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-[#ffd9e2]/40 to-[#ffe088]/30 border border-[#fda4c9]/60 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-[#d91b77] text-white flex items-center justify-center font-bold text-sm">
            L{selectedLevel.level}
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-[#594047] font-semibold">चुना गया लेवल विवरण</span>
            <span className="text-sm font-bold text-[#1c1c19]">{selectedLevel.name}</span>
            <span className="text-[11px] text-[#8e4767] font-medium">आवश्यकता: {selectedLevel.clientsRequired} एक्टिव क्लाइंट्स</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-base font-extrabold text-[#d91b77]">{selectedLevel.cashBonus}</span>
          <span className="text-[11px] text-[#735c00] font-bold">{selectedLevel.perks}</span>
        </div>
      </div>

      {/* 7 Levels Structured Breakdown Cards */}
      <div className="flex flex-col gap-2.5">
        {MILESTONE_LEVELS.map((milestone) => {
          const isSelected = selectedLevel.id === milestone.id;

          if (milestone.level === 7) {
            return (
              <div
                key={milestone.id}
                onClick={() => setSelectedLevel(milestone)}
                className={`p-4 rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-between border ${
                  isSelected ? 'ring-2 ring-[#735c00] scale-[1.01]' : ''
                } bg-[#ffe088] text-[#241a00] border-[#cca730]`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#241a00] text-[#ffe088] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[24px]">crown</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm sm:text-base font-extrabold text-[#241a00]">
                      {milestone.name}
                    </span>
                    <span className="text-xs text-[#574500] font-medium">
                      {milestone.subtitle}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end shrink-0 pl-2">
                  <span className="text-lg sm:text-xl font-black text-[#241a00]">
                    {milestone.cashBonus}
                  </span>
                  <span className="text-[11px] text-[#574500] font-bold">
                    {milestone.perks}
                  </span>
                </div>
              </div>
            );
          }

          return (
            <div
              key={milestone.id}
              onClick={() => setSelectedLevel(milestone)}
              className={`p-3.5 rounded-xl bg-[#f6f3ee] shadow-xs border transition-all cursor-pointer flex items-center justify-between ${
                isSelected
                  ? 'border-[#d91b77] bg-white ring-1 ring-[#d91b77]/30'
                  : 'border-[#e5e2dd] hover:border-[#fda4c9]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                    milestone.level === 6
                      ? 'bg-[#d91b77] text-white'
                      : 'bg-[#fda4c9]/60 text-[#d91b77]'
                  }`}
                >
                  L{milestone.level}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-bold text-[#1c1c19]">
                    {milestone.name}
                  </span>
                  <span className="text-[11px] text-[#594047]">
                    {milestone.subtitle}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end shrink-0 pl-2">
                <span className="text-xs sm:text-sm font-bold text-[#d91b77]">
                  {milestone.cashBonus}
                </span>
                <span className="text-[10px] text-[#594047] font-medium">
                  {milestone.perks}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
