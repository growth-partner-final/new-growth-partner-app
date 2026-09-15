import React from 'react';

export const HowItWorks: React.FC = () => {
  return (
    <section className="px-4 py-6 flex flex-col gap-4 bg-[#f6f3ee]/80 border-y border-[#e5e2dd]/60">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-[#d91b77]">
          <span className="material-symbols-outlined text-[18px]">alt_route</span>
          <span className="text-xs font-bold tracking-wider uppercase">3 Simple Steps</span>
        </div>
        <h2 className="text-xl font-bold text-[#1c1c19]">
          यह कैसे काम करता है?
        </h2>
        <p className="text-xs sm:text-sm text-[#594047]">
          कोई जटिल प्रोसेस नहीं — आसान 3 स्टेप्स में अपनी फाइनेंशियल जर्नी शुरू करें।
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {/* Step 1 */}
        <div className="p-4 rounded-xl bg-white shadow-xs border border-[#e5e2dd] flex items-start gap-3.5 transition-all hover:border-[#fda4c9]">
          <div className="w-9 h-9 rounded-full bg-[#fda4c9]/40 text-[#d91b77] flex items-center justify-center font-bold text-base shrink-0">
            1
          </div>
          <div className="flex flex-col gap-0.5">
            <h3 className="text-sm font-bold text-[#1c1c19]">Free Sign-up &amp; Verification</h3>
            <p className="text-xs text-[#594047] leading-relaxed">
              सिर्फ 2 मिनट में KYC और बैंक डिटेल्स लिंक करें। कोई जॉइनिंग फीस या सिक्योरिटी डिपॉजिट नहीं।
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="p-4 rounded-xl bg-white shadow-xs border border-[#e5e2dd] flex items-start gap-3.5 transition-all hover:border-[#fda4c9]">
          <div className="w-9 h-9 rounded-full bg-[#ffd9e2] text-[#d91b77] flex items-center justify-center font-bold text-base shrink-0">
            2
          </div>
          <div className="flex flex-col gap-0.5">
            <h3 className="text-sm font-bold text-[#1c1c19]">Share &amp; Onboard Clients</h3>
            <p className="text-xs text-[#594047] leading-relaxed">
              अपने यूनिक डिजिटल रेफरल लिंक से बिज़नेस, ट्रेडर्स और इन्वेस्टर्स को Nexora से जोड़ें।
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="p-4 rounded-xl bg-white shadow-xs border border-[#e5e2dd] flex items-start gap-3.5 transition-all hover:border-[#fda4c9]">
          <div className="w-9 h-9 rounded-full bg-[#ffe088] text-[#241a00] flex items-center justify-center font-bold text-base shrink-0">
            3
          </div>
          <div className="flex flex-col gap-0.5">
            <h3 className="text-sm font-bold text-[#1c1c19]">Earn Instant &amp; Recurring Payouts</h3>
            <p className="text-xs text-[#594047] leading-relaxed">
              हर सफल एक्टिवेशन पर डायरेक्ट कैश बोनस और लाइफटाइम 20% तक रेवेन्यू शेयर हर महीने पाएं।
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
