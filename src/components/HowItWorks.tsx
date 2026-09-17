import React from 'react';

export const HowItWorks: React.FC = () => {
  return (
    <section className="w-full py-8 px-4 sm:px-6 lg:px-8 rounded-3xl bg-[#f6f3ee] border border-[#e5e2dd] flex flex-col gap-6">
      <div className="flex flex-col gap-1 text-left">
        <div className="flex items-center gap-2 text-[#d91b77]">
          <span className="material-symbols-outlined text-[18px]">alt_route</span>
          <span className="text-xs font-bold tracking-wider uppercase">3 Simple Steps</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#1c1c19]">
          Nexora कैसे काम करता है? (How Nexora Works)
        </h2>
        <p className="text-sm text-[#594047]">
          कोई जटिल प्रक्रिया नहीं — सिर्फ 3 आसान चरणों में अपनी फाइनेंशियल स्वतंत्रता शुरू करें।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Step 1 */}
        <div className="p-5 rounded-2xl bg-white shadow-xs border border-[#e5e2dd] flex flex-col gap-3.5 transition-all hover:border-[#fda4c9] hover:shadow-sm">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#fda4c9]/40 text-[#d91b77] flex items-center justify-center font-black text-lg">
              1
            </div>
            <span className="material-symbols-outlined text-[24px] text-[#d91b77]">how_to_reg</span>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-bold text-[#1c1c19]">Free Sign-up &amp; Instant KYC</h3>
            <p className="text-xs sm:text-sm text-[#594047] leading-relaxed">
              सिर्फ 2 मिनट में डिजिटल वेरिफिकेशन और बैंक/UPI अकाउंट लिंक करें। कोई जॉइनिंग फीस या सिक्योरिटी डिपॉजिट नहीं।
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="p-5 rounded-2xl bg-white shadow-xs border border-[#e5e2dd] flex flex-col gap-3.5 transition-all hover:border-[#fda4c9] hover:shadow-sm">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#ffd9e2] text-[#d91b77] flex items-center justify-center font-black text-lg">
              2
            </div>
            <span className="material-symbols-outlined text-[24px] text-[#d91b77]">share</span>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-bold text-[#1c1c19]">Share QR &amp; Onboard Salons</h3>
            <p className="text-xs sm:text-sm text-[#594047] leading-relaxed">
              अपने यूनिक डिजिटल रेफरल कोड व इन-स्टोर क्यूआर से प्रीमियम सैलून, स्पा और वेलनेस स्टोर्स को Nexora से जोड़ें।
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="p-5 rounded-2xl bg-white shadow-xs border border-[#e5e2dd] flex flex-col gap-3.5 transition-all hover:border-[#fda4c9] hover:shadow-sm">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#ffe088] text-[#241a00] flex items-center justify-center font-black text-lg">
              3
            </div>
            <span className="material-symbols-outlined text-[24px] text-[#cca730]">payments</span>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-bold text-[#1c1c19]">Earn Instant &amp; Recurring Payouts</h3>
            <p className="text-xs sm:text-sm text-[#594047] leading-relaxed">
              हर सफल एक्टिवेशन पर ₹10,000 तक डायरेक्ट कैश और लाइफटाइम 2% तक मंथली रेवेन्यू शेयर सीधे अपने खाते में पाएं।
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
