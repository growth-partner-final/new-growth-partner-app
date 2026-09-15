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

  const milestoneBonus = reachedMilestone ? reachedMilestone.cashBonusNum : 0;
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
    <section className="px-4 py-6 flex flex-col gap-4 bg-[#ebe8e3]/60 border-y border-[#e5e2dd]" id="calculator">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-[#d91b77]">
          <span className="material-symbols-outlined text-[18px]">functions</span>
          <span className="text-xs font-bold tracking-wider uppercase">Income Algorithm</span>
        </div>
        <h2 className="text-xl font-bold text-[#1c1c19]">
          अर्निंग फॉर्मूला कैसे कैलकुलेट होता है?
        </h2>
        <p className="text-xs sm:text-sm text-[#594047]">
          पारदर्शी और स्वचालित पेआउट कैलकुलेशन हर महीने सीधे आपके खाते में।
        </p>
      </div>

      {/* Formula Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white shadow-md border border-[#e5e2dd] flex flex-col gap-4">
        {/* The Mathematical Formula Display */}
        <div className="p-3.5 rounded-xl bg-[#f6f3ee] text-[#1c1c19] flex flex-col gap-2 border border-[#e5e2dd]/80">
          <span className="text-xs text-[#d91b77] font-bold uppercase tracking-wider">
            मासिक आय सूत्र (Monthly Income Formula)
          </span>
          <p className="text-base sm:text-lg font-bold text-[#1c1c19] leading-snug">
            Total Monthly Income =
          </p>
          <div className="flex flex-col gap-1.5 text-xs text-[#594047] pt-1">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#d91b77] shrink-0"></span>
              <strong>[Active Client Activations × ₹2,500]</strong>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8e4767] shrink-0"></span>
              <strong>+ [Team Turnover × 3.5% Recurring Share]</strong>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#cca730] shrink-0"></span>
              <strong>+ [Milestone Rank Bonus up to ₹5,00,000]</strong>
            </span>
          </div>
        </div>

        {/* Interactive Controls */}
        <div className="flex flex-col gap-4 pt-1">
          {/* Quick Preset Buttons */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-[#594047]">त्वरित प्रीसेट चुनें:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: 'शुरुआती (5)', count: 5, to: 1.5 },
                { label: 'सक्रिय (10)', count: 10, to: 3.8 },
                { label: 'सुपर (25)', count: 25, to: 12.0 },
                { label: 'लीडर (50)', count: 50, to: 30.0 }
              ].map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setActiveClients(preset.count);
                    setTurnoverLakhs(preset.to);
                  }}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeClients === preset.count
                      ? 'bg-[#d91b77] text-white shadow-xs'
                      : 'bg-[#f0ede9] text-[#594047] hover:bg-[#e5e2dd]'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Slider 1: Active Clients */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor={clientsInputId} className="font-bold text-[#1c1c19] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#d91b77]">person_add</span>
                मासिक एक्टिव क्लाइंट्स (Active Clients):
              </label>
              <span className="text-sm font-extrabold text-[#d91b77] bg-[#ffd9e2] px-2.5 py-0.5 rounded-full">
                {activeClients} Clients
              </span>
            </div>
            <input
              id={clientsInputId}
              type="range"
              min={1}
              max={60}
              step={1}
              value={activeClients}
              onChange={(e) => setActiveClients(Number(e.target.value))}
              className="w-full accent-[#d91b77] cursor-pointer h-2 bg-[#f0ede9] rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-[#594047]">
              <span>1 Client</span>
              <span>15 Associate</span>
              <span>35 Manager</span>
              <span>60+ Director</span>
            </div>
          </div>

          {/* Average Payout Per Client Selector */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-[#1c1c19]">औसत एक्टिवेशन पेआउट (Average Payout Tier):</span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Standard', val: 1500, tag: '₹1.5K' },
                { label: 'Average Mix', val: 2500, tag: '₹2.5K' },
                { label: 'Pro / VIP', val: 3500, tag: '₹3.5K' }
              ].map((tier) => (
                <button
                  key={tier.label}
                  type="button"
                  onClick={() => setAvgPayout(tier.val)}
                  className={`p-2 rounded-xl text-center flex flex-col items-center justify-center border transition-all cursor-pointer ${
                    avgPayout === tier.val
                      ? 'border-[#d91b77] bg-[#ffd9e2]/30 text-[#b1005e]'
                      : 'border-[#e5e2dd] bg-[#f6f3ee] text-[#594047]'
                  }`}
                >
                  <span className="text-[11px] font-medium">{tier.label}</span>
                  <span className="text-xs font-bold">{tier.tag}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Slider 2: Estimated Turnover */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor={turnoverInputId} className="font-bold text-[#1c1c19] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#8e4767]">trending_up</span>
                क्लाइंट्स मासिक टर्नओवर (Monthly Turnover):
              </label>
              <span className="text-xs font-extrabold text-[#8e4767] bg-[#ffd8e5] px-2.5 py-0.5 rounded-full">
                ₹{turnoverLakhs} Lakhs
              </span>
            </div>
            <input
              id={turnoverInputId}
              type="range"
              min={0.5}
              max={50}
              step={0.5}
              value={turnoverLakhs}
              onChange={(e) => setTurnoverLakhs(Number(e.target.value))}
              className="w-full accent-[#8e4767] cursor-pointer h-2 bg-[#f0ede9] rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-[#594047]">
              <span>₹50,000</span>
              <span>₹10 Lakhs</span>
              <span>₹25 Lakhs</span>
              <span>₹50 Lakhs+</span>
            </div>
          </div>
        </div>

        {/* Live Calculation Results Breakdown */}
        <div className="p-4 rounded-xl bg-[#fda4c9]/20 border border-[#fda4c9]/50 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#3c0223]">
              {activeClients} एक्टिव क्लाइंट्स + रिकरिंग शेयर:
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#d91b77] text-white text-[11px] font-bold shadow-xs">
              अनुमानित कुल मासिक आय
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <div className="flex flex-col text-xs text-[#594047]">
              <span>
                ({activeClients} × {formatINR(avgPayout)}) एक्टिवेशन + 3.5% टर्नओवर शेयर
              </span>
              {reachedMilestone && (
                <span className="text-[#b1005e] font-bold flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-[14px]">military_tech</span>
                  {reachedMilestone.name} रीच! (+{reachedMilestone.cashBonus} वन-टाइम)
                </span>
              )}
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#d91b77]">
              {formatINR(totalMonthlyIncome)}
              <span className="text-xs font-normal text-[#594047]"> /माह</span>
            </span>
          </div>

          {/* Visual Progress Bar */}
          <div className="flex flex-col gap-1 mt-1">
            <div className="w-full bg-[#e5e2dd] h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#d91b77] to-[#b1005e] h-full rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(100, Math.max(15, (activeClients / 30) * 100))}%`
                }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#594047]">
              <span>स्टार्टर टियर</span>
              <span className="font-semibold text-[#1c1c19]">
                {activeClients >= 10 ? '68% पार्टनर्स दूसरे महीने ही यह लक्ष्य छू लेते हैं' : 'शुरुआत के लिए आसान लक्ष्य'}
              </span>
              <span>टॉप 5% अर्नर</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
