import React from 'react';

export const RecurringShare: React.FC = () => {
  return (
    <section className="px-4 py-6 flex flex-col gap-4 bg-[#fda4c9]/15 border-y border-[#fda4c9]/30">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-[#8e4767]">
          <span className="material-symbols-outlined text-[18px]">autorenew</span>
          <span className="text-xs font-bold tracking-wider uppercase">Compounding Wealth</span>
        </div>
        <h2 className="text-xl font-bold text-[#1c1c19]">
          मंथली पैसिव इनकम (Recurring Share)
        </h2>
        <p className="text-xs sm:text-sm text-[#594047]">
          &ldquo;काम एक बार, कमाई हर महीने&rdquo; — जब भी आपके क्लाइंट्स ट्रेड या सर्विस इस्तेमाल करेंगे, आपको कमीशन मिलेगा।
        </p>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl bg-white shadow-xs border border-[#e5e2dd] flex flex-col gap-3.5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#d91b77] text-[26px]">trending_up</span>
            <span className="text-sm sm:text-base font-bold text-[#1c1c19]">
              Up to 20% Lifetime Brokerage Share
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#ffe088] text-[#241a00] text-xs font-bold shadow-xs">
            Lifetime Recurring
          </span>
        </div>

        <p className="text-xs sm:text-sm text-[#594047] leading-relaxed">
          आपके क्लाइंट्स जितने सालों तक Nexora पर एक्टिव रहेंगे, उनके ट्रेडिंग शुल्क और सेवा शुल्क से आपका निश्चित हिस्सा ऑटो-क्रेडिट होता रहेगा। कोई लिमिट नहीं, कोई कैपिंग नहीं!
        </p>

        {/* Mini Visual Progress */}
        <div className="p-3.5 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-xs text-[#594047]">100 एक्टिव क्लाइंट्स =</span>
            <span className="text-lg sm:text-xl font-extrabold text-[#1c1c19]">
              ₹75,000 – ₹1,20,000
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffd8e5] text-[#7a3656] text-xs font-bold self-start sm:self-center">
            <span className="material-symbols-outlined text-[16px]">account_balance_wallet</span>
            मंथली पैसिव इनकम
          </div>
        </div>
      </div>
    </section>
  );
};
