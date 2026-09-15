import React from 'react';
import { ACTIVATION_TIERS } from '../data/partnerData';

export const ActivationRewards: React.FC = () => {
  return (
    <section className="px-4 py-6 flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-[#d91b77]">
          <span className="material-symbols-outlined text-[18px]">payments</span>
          <span className="text-xs font-bold tracking-wider uppercase">Direct Activation Payout</span>
        </div>
        <h2 className="text-xl font-bold text-[#1c1c19]">
          वन-टाइम एक्टिवेशन रिवॉर्ड्स
        </h2>
        <p className="text-xs sm:text-sm text-[#594047]">
          क्लाइंट ऑनबोर्ड होते ही सेम-डे आपके बैंक या UPI में डायरेक्ट क्रेडिट।
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {ACTIVATION_TIERS.map((tier) => (
          <div
            key={tier.id}
            className="p-4 rounded-xl bg-[#f6f3ee] shadow-xs border border-[#e5e2dd] flex items-center justify-between transition-all hover:border-[#fda4c9] hover:bg-white"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                  tier.id === 'standard'
                    ? 'bg-[#fda4c9]/50 text-[#7a3656]'
                    : tier.id === 'pro'
                    ? 'bg-[#ffd9e2] text-[#b1005e]'
                    : 'bg-[#ffe088] text-[#241a00]'
                }`}
              >
                <span className="material-symbols-outlined text-[24px]">{tier.icon}</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-sm sm:text-base font-bold text-[#1c1c19]">
                    {tier.name}
                  </span>
                  {tier.badge && (
                    <span className="px-1.5 py-0.5 rounded bg-[#d91b77] text-white text-[10px] font-bold">
                      {tier.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs text-[#594047]">
                  {tier.subtitle}
                </span>
                <div className="flex items-center gap-2 text-[10px] text-[#8e4767] mt-1">
                  <span className="flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[12px] text-emerald-600">check_circle</span>
                    Same Day Transfer
                  </span>
                  <span className="text-[#e5e2dd]">•</span>
                  <span>Direct Bank / UPI</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end shrink-0 pl-2">
              <span
                className={`text-xl font-extrabold ${
                  tier.id === 'enterprise' ? 'text-[#735c00]' : 'text-[#d91b77]'
                }`}
              >
                {tier.payout}
              </span>
              <span className="text-[11px] text-[#594047] font-medium">
                प्रति एक्टिवेशन
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
