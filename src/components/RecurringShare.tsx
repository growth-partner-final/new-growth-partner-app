import React from 'react';

export const RecurringShare: React.FC = () => {
  return (
    <section className="w-full max-w-full py-5 sm:py-8 px-3.5 sm:px-6 lg:px-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#fda4c9]/15 via-[#ffe088]/10 to-[#ffd9e2]/15 border border-[#fda4c9]/30 flex flex-col gap-4 sm:gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        <div className="flex flex-col gap-1 text-left">
          <div className="flex items-center gap-2 text-[#8e4767]">
            <span className="material-symbols-outlined text-[18px] sm:text-[20px]">autorenew</span>
            <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase">Compounding Wealth</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#1c1c19]">
            Nexora Monthly Passive Income (Recurring Growth Share)
          </h2>
          <p className="text-xs sm:text-sm text-[#594047]">
            &ldquo;काम एक बार, कमाई हर महीने&rdquo; — जब भी आपके रेफर किए गए सैलून व मर्चेंट्स सर्विस व बिलिंग प्रोसेस करेंगे, आपका फिक्स्ड कट सीधे आपके अकाउंट में आएगा।
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-[#ffe088] text-[#241a00] text-xs sm:text-sm font-black shadow-xs self-start md:self-auto shrink-0">
          <span className="material-symbols-outlined text-[16px] sm:text-[18px]">verified</span>
          <span>Up to 2% Lifetime Share</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5">
        <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white shadow-xs border border-[#e5e2dd] flex flex-col justify-between gap-2.5 sm:gap-3">
          <div className="flex flex-col gap-0.5 sm:gap-1">
            <span className="text-[11px] sm:text-xs font-bold text-[#594047]">Tier 1: 1-15 Salons</span>
            <span className="text-lg sm:text-xl font-black text-[#1c1c19]">₹15,000 – ₹25,000</span>
            <span className="text-[10px] sm:text-xs text-[#594047]">प्रति माह रिकरिंग अनुमान</span>
          </div>
          <div className="w-full bg-[#e5e2dd] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#d91b77] h-full w-1/3"></div>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white shadow-xs border border-[#e5e2dd] flex flex-col justify-between gap-2.5 sm:gap-3">
          <div className="flex flex-col gap-0.5 sm:gap-1">
            <span className="text-[11px] sm:text-xs font-bold text-[#594047]">Tier 2: 16-50 Salons</span>
            <span className="text-lg sm:text-xl font-black text-[#d91b77]">₹45,000 – ₹85,000</span>
            <span className="text-[10px] sm:text-xs text-[#594047]">प्रति माह रिकरिंग अनुमान</span>
          </div>
          <div className="w-full bg-[#e5e2dd] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#d91b77] h-full w-2/3"></div>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white shadow-xs border border-[#e5e2dd] flex flex-col justify-between gap-2.5 sm:gap-3">
          <div className="flex flex-col gap-0.5 sm:gap-1">
            <span className="text-[11px] sm:text-xs font-bold text-[#594047]">Tier 3: 50+ Salons</span>
            <span className="text-lg sm:text-xl font-black text-[#735c00]">₹1,20,000+ Unlimited</span>
            <span className="text-[10px] sm:text-xs text-[#594047]">प्रति माह लाइफटाइम रॉयल्टी</span>
          </div>
          <div className="w-full bg-[#e5e2dd] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#cca730] h-full w-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
