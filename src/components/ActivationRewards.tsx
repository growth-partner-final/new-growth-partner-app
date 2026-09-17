import React from 'react';
import { ACTIVATION_TIERS } from '../data/partnerData';

export const ActivationRewards: React.FC = () => {
  return (
    <section className="w-full py-8 flex flex-col gap-6">
      <div className="flex flex-col gap-1.5 text-left">
        <div className="flex items-center gap-2 text-[#d91b77]">
          <span className="material-symbols-outlined text-[20px]">payments</span>
          <span className="text-xs font-bold tracking-wider uppercase">Direct Activation Payouts</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#1c1c19]">
          Nexora One-Time Activation Rewards (वन-टाइम एक्टिवेशन रिवॉर्ड्स)
        </h2>
        <p className="text-sm text-[#594047]">
          क्लाइंट और सैलून ऑनबोर्ड होते ही सेम-डे आपके बैंक खाते या UPI आईडी में डायरेक्ट क्रेडिट।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {ACTIVATION_TIERS.map((tier) => (
          <div
            key={tier.id}
            className="p-5 rounded-3xl bg-white shadow-xs border border-[#e5e2dd] flex flex-col justify-between gap-4 transition-all hover:border-[#fda4c9] hover:shadow-md"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                    tier.id === 'standard'
                      ? 'bg-[#fda4c9]/40 text-[#7a3656]'
                      : tier.id === 'pro'
                      ? 'bg-[#ffd9e2] text-[#b1005e]'
                      : 'bg-[#ffe088] text-[#241a00]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[26px]">{tier.icon}</span>
                </div>
                {tier.badge && (
                  <span className="px-2.5 py-1 rounded-full bg-[#d91b77] text-white text-[11px] font-black tracking-wide">
                    {tier.badge}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-[#1c1c19]">
                  {tier.name}
                </h3>
                <span className="text-xs text-[#594047]">
                  {tier.subtitle}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd]/60 flex items-baseline justify-between">
                <span className="text-xs text-[#594047] font-semibold">Per Salon Payout</span>
                <span className="text-2xl font-black text-[#d91b77]">
                  {tier.payout}
                </span>
              </div>

              <div className="flex flex-col gap-2 pt-1 text-xs text-[#1c1c19]">
                {tier.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-emerald-600 text-[16px] shrink-0 mt-0.5">check_circle</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#e5e2dd] flex items-center gap-2 text-[11px] text-[#8e4767] font-semibold">
              <span className="material-symbols-outlined text-[15px] text-emerald-600">bolt</span>
              <span>Same Day Direct Settlement</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
