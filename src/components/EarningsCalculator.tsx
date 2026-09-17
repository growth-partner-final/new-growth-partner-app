import React, { useState, useId } from 'react';
import { MILESTONE_LEVELS } from '../data/partnerData';

export const EarningsCalculator: React.FC = () => {
  const [activeClients, setActiveClients] = useState<number>(10);
  const [avgPayout, setAvgPayout] = useState<number>(2500);
  const [turnoverLakhs, setTurnoverLakhs] = useState<number>(3.8); // in Lakhs
  const clientsInputId = useId();
  const turnoverInputId = useId();

  // Calculations
  const directActivationIncome = activeClients * avgPayout;
  const recurringBrokerageIncome = Math.round((turnoverLakhs * 100000) * 0.035);
  
  // Find highest milestone reached based on active clients
  const reachedMilestone = [...MILESTONE_LEVELS]
    .reverse()
    .find((m) => activeClients >= m.clientsRequired) || null;

  const totalMonthlyIncome = directActivationIncome + recurringBrokerageIncome;

  // Format currency in Indian format
  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section className="w-full py-8 px-4 sm:px-6 lg:px-8 rounded-3xl bg-[#f6f3ee] border border-[#e5e2dd]" id="calculator">
      <div className="flex flex-col gap-1.5 text-left mb-6">
        <div className="flex items-center gap-2 text-[#d91b77]">
          <span className="material-symbols-outlined text-[20px]">functions</span>
          <span className="text-xs font-bold tracking-wider uppercase">Interactive Income Simulator</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#1c1c19]">
          Earnings Calculator &amp; Monthly Projection
        </h2>
        <p className="text-sm text-[#594047]">
          पारदर्शी और स्वचालित पेआउट कैलकुलेशन — अपनी मासिक अर्निंग का लाइव अनुमान लगाएं।
        </p>
      </div>

      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Sliders & Inputs */}
        <div className="lg:col-span-7 p-5 sm:p-6 rounded-3xl bg-white shadow-xs border border-[#e5e2dd] flex flex-col gap-5">
          <h3 className="text-base font-bold text-[#1c1c19] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#d91b77] text-[20px]">tune</span>
            <span>Adjust Your Monthly Target</span>
          </h3>

          {/* Slider 1: Active Salons Onboarded */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-sm font-semibold">
              <label htmlFor={clientsInputId} className="text-[#1c1c19]">
                Active Salons Onboarded this Month:
              </label>
              <span className="text-base font-bold text-[#d91b77] bg-[#ffd9e2]/50 px-2.5 py-0.5 rounded-lg">
                {activeClients} Salons
              </span>
            </div>
            <input
              id={clientsInputId}
              type="range"
              min="1"
              max="50"
              value={activeClients}
              onChange={(e) => setActiveClients(Number(e.target.value))}
              className="w-full accent-[#d91b77] cursor-pointer h-2 bg-[#e5e2dd] rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-[#594047]">
              <span>1 Salon</span>
              <span>25 Salons</span>
              <span>50+ Salons</span>
            </div>
          </div>

          {/* Slider 2: Salon Monthly Billing Turnover */}
          <div className="flex flex-col gap-2 pt-2 border-t border-[#e5e2dd]/60">
            <div className="flex justify-between items-center text-sm font-semibold">
              <label htmlFor={turnoverInputId} className="text-[#1c1c19]">
                Estimated Total Salon Billing Volume:
              </label>
              <span className="text-base font-bold text-[#735c00] bg-[#ffe088]/50 px-2.5 py-0.5 rounded-lg">
                ₹{turnoverLakhs} Lakhs
              </span>
            </div>
            <input
              id={turnoverInputId}
              type="range"
              min="0.5"
              max="20"
              step="0.1"
              value={turnoverLakhs}
              onChange={(e) => setTurnoverLakhs(Number(e.target.value))}
              className="w-full accent-[#cca730] cursor-pointer h-2 bg-[#e5e2dd] rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-[#594047]">
              <span>Low Volume</span>
              <span>₹10 Lakhs</span>
              <span>₹20+ Lakhs</span>
            </div>
          </div>

          {/* Tier Selection Radio Buttons */}
          <div className="flex flex-col gap-2 pt-2 border-t border-[#e5e2dd]/60">
            <span className="text-xs font-bold text-[#594047]">Average Activation Tier:</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setAvgPayout(1500)}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  avgPayout === 1500
                    ? 'bg-[#d91b77] text-white border-[#d91b77] shadow-xs'
                    : 'bg-[#f6f3ee] text-[#1c1c19] border-[#e5e2dd] hover:border-[#fda4c9]'
                }`}
              >
                Standard (₹1.5k)
              </button>
              <button
                type="button"
                onClick={() => setAvgPayout(2500)}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  avgPayout === 2500
                    ? 'bg-[#d91b77] text-white border-[#d91b77] shadow-xs'
                    : 'bg-[#f6f3ee] text-[#1c1c19] border-[#e5e2dd] hover:border-[#fda4c9]'
                }`}
              >
                Pro Salon (₹2.5k)
              </button>
              <button
                type="button"
                onClick={() => setAvgPayout(3500)}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  avgPayout === 3500
                    ? 'bg-[#d91b77] text-white border-[#d91b77] shadow-xs'
                    : 'bg-[#f6f3ee] text-[#1c1c19] border-[#e5e2dd] hover:border-[#fda4c9]'
                }`}
              >
                Luxury Chain (₹3.5k)
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Calculation Summary Card */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-gradient-to-br from-[#3c0223] via-[#b1005e] to-[#d91b77] text-white shadow-xl flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#fda4c9]">
                Estimated Monthly Earnings
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-bold">
                Auto-Disbursed
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                {formatINR(totalMonthlyIncome)}
              </span>
              <span className="text-xs text-white/80 mt-1 font-medium">
                Recurring + Direct Instant Payouts combined
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-black/20 border border-white/10 flex flex-col gap-2.5 text-xs text-white/90">
              <div className="flex justify-between items-center">
                <span>Direct Activation Income:</span>
                <span className="font-bold text-white">{formatINR(directActivationIncome)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Monthly Recurring Share:</span>
                <span className="font-bold text-[#ffe088]">{formatINR(recurringBrokerageIncome)}</span>
              </div>
              {reachedMilestone && (
                <div className="flex justify-between items-center pt-2 border-t border-white/10 text-amber-300 font-bold">
                  <span>🎁 Physical Milestone Reward Unlocked:</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded-lg text-white text-[11px]">{reachedMilestone.rewardGift}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-white/80 pt-2 border-t border-white/20">
            <span className="material-symbols-outlined text-[18px] text-emerald-400">verified</span>
            <span>Weekly payouts automatically credited every Monday to bank/UPI.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
