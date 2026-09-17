import React from 'react';

export const RulesSection: React.FC = () => {
  return (
    <section className="w-full py-8 flex flex-col gap-6">
      <div className="flex flex-col gap-1 text-left">
        <div className="flex items-center gap-2 text-[#8e4767]">
          <span className="material-symbols-outlined text-[20px]">gavel</span>
          <span className="text-xs font-bold tracking-wider uppercase">Code of Conduct</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#1c1c19]">
          Nexora Partner Work &amp; Compliance Rules (पार्टनर का काम और नियम)
        </h2>
        <p className="text-sm text-[#594047]">
          स्वच्छ और भरोसेमंद इकोसिस्टम ही आपकी स्थायी कमाई की गारंटी है।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Responsibilities (Do's) */}
        <div className="p-6 rounded-3xl bg-white shadow-xs border border-[#e5e2dd] flex flex-col gap-4">
          <div className="flex items-center gap-2.5 text-[#d91b77]">
            <div className="w-10 h-10 rounded-xl bg-[#ffd9e2] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">task_alt</span>
            </div>
            <h3 className="text-lg font-bold text-[#1c1c19]">आपकी ज़िम्मेदारियां (Do's)</h3>
          </div>
          <ul className="flex flex-col gap-3 text-xs sm:text-sm text-[#1c1c19]">
            <li className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-emerald-600 text-[20px] shrink-0 mt-0.5">check_circle</span>
              <span className="leading-relaxed">सैलून और स्पा ओनर्स को Nexora OS के अपॉइंटमेंट व बिलिंग फीचर्स का सही लाभ समझाना।</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-emerald-600 text-[20px] shrink-0 mt-0.5">check_circle</span>
              <span className="leading-relaxed">जेनुइन और एक्टिव आउटलेट्स को ऑनबोर्ड करके डिजिटल क्यूआर कोड एक्टिवेट करवाना।</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-emerald-600 text-[20px] shrink-0 mt-0.5">check_circle</span>
              <span className="leading-relaxed">कंपनी की गाइडलाइन्स और एथिकल फाइनेंशियल प्रैक्टिसेज का निष्ठा से पालन करना।</span>
            </li>
          </ul>
        </div>

        {/* Strict Restrictions (Don'ts) */}
        <div className="p-6 rounded-3xl bg-[#ffdad6]/30 text-[#93000a] shadow-xs border border-[#ffdad6] flex flex-col gap-4">
          <div className="flex items-center gap-2.5 text-[#ba1a1a]">
            <div className="w-10 h-10 rounded-xl bg-[#ffdad6] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">block</span>
            </div>
            <h3 className="text-lg font-bold text-[#93000a]">सख्त प्रतिबंध (Don'ts)</h3>
          </div>
          <ul className="flex flex-col gap-3 text-xs sm:text-sm text-[#1c1c19]">
            <li className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[#ba1a1a] text-[20px] shrink-0 mt-0.5">cancel</span>
              <span className="leading-relaxed">
                <strong>Zero Spam Policy:</strong> सोशल मीडिया या व्हाट्सएप पर गैर-ज़रूरी और अनाधिकृत स्पैमिंग सख्त वर्जित है।
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[#ba1a1a] text-[20px] shrink-0 mt-0.5">cancel</span>
              <span className="leading-relaxed">
                <strong>No Fake Guarantees:</strong> मर्चेंट्स को अवास्तविक कमाई या झूठे वादे न करें। केवल वास्तविक फीचर्स की जानकारी दें।
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[#ba1a1a] text-[20px] shrink-0 mt-0.5">cancel</span>
              <span className="leading-relaxed">
                <strong>No Upfront Cash:</strong> किसी भी सैलून से व्यक्तिगत नकद शुल्क या अवैध डिपॉजिट न लें।
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Reward Release Verification & Required Documents Policy */}
      <div className="p-6 rounded-3xl bg-white shadow-xs border border-[#e5e2dd] flex flex-col gap-5">
        <div className="flex items-center justify-between border-b border-[#e5e2dd] pb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2.5 text-[#b1005e]">
            <div className="w-10 h-10 rounded-xl bg-[#ffd9e2] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">verified_user</span>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#1c1c19]">
                Reward Release से पहले Growth Partner से मांगे जा सकने वाले Documents
              </h3>
              <p className="text-xs text-[#8d6f77] font-medium">
                Documents That May Be Required Before Reward Release
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#f6f3ee] text-[#594047] text-xs font-bold border border-[#e5e2dd]">
            Compliance &amp; Statutory Guidelines
          </span>
        </div>

        {/* 8 Required Documents Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] flex items-center gap-3">
            <span className="material-symbols-outlined text-[#b1005e] text-[22px] shrink-0">badge</span>
            <div>
              <div className="text-xs font-bold text-[#1c1c19]">PAN</div>
              <div className="text-[10px] text-[#594047]">Statutory Tax Verification</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] flex items-center gap-3">
            <span className="material-symbols-outlined text-[#b1005e] text-[22px] shrink-0">fingerprint</span>
            <div>
              <div className="text-xs font-bold text-[#1c1c19]">Aadhaar या Valid Identity Proof</div>
              <div className="text-[10px] text-[#594047]">Govt Identity Authentication</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] flex items-center gap-3">
            <span className="material-symbols-outlined text-[#b1005e] text-[22px] shrink-0">home</span>
            <div>
              <div className="text-xs font-bold text-[#1c1c19]">Address Proof</div>
              <div className="text-[10px] text-[#594047]">Physical Asset Shipping Verification</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] flex items-center gap-3">
            <span className="material-symbols-outlined text-[#b1005e] text-[22px] shrink-0">account_box</span>
            <div>
              <div className="text-xs font-bold text-[#1c1c19]">Photograph</div>
              <div className="text-[10px] text-[#594047]">Partner Record Dossier</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] flex items-center gap-3">
            <span className="material-symbols-outlined text-[#b1005e] text-[22px] shrink-0">account_balance</span>
            <div>
              <div className="text-xs font-bold text-[#1c1c19]">Bank Details, जहाँ Required हों</div>
              <div className="text-[10px] text-[#594047]">Account Settlement Record</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] flex items-center gap-3">
            <span className="material-symbols-outlined text-[#b1005e] text-[22px] shrink-0">two_wheeler</span>
            <div>
              <div className="text-xs font-bold text-[#1c1c19]">Driving Licence — Vehicle Rewards के लिए</div>
              <div className="text-[10px] text-[#594047]">RTO Registration &amp; Insurance</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] flex items-center gap-3">
            <span className="material-symbols-outlined text-[#b1005e] text-[22px] shrink-0">description</span>
            <div>
              <div className="text-xs font-bold text-[#1c1c19]">Tax Declaration</div>
              <div className="text-[10px] text-[#594047]">Section 194R Compliance</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] flex items-center gap-3">
            <span className="material-symbols-outlined text-[#b1005e] text-[22px] shrink-0">assignment_turned_in</span>
            <div>
              <div className="text-xs font-bold text-[#1c1c19]">Reward Acceptance Form</div>
              <div className="text-[10px] text-[#594047]">Official Physical Asset Delivery Form</div>
            </div>
          </div>
        </div>

        {/* Important Notice & Tax Responsibility Clauses */}
        <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] flex flex-col gap-2.5 text-xs text-[#594047]">
          <div className="flex items-start gap-2 text-[#1c1c19]">
            <span className="material-symbols-outlined text-[#b1005e] text-[18px] shrink-0 mt-0.5">info</span>
            <p className="leading-relaxed">
              <strong>Reward release से पहले applicable verification, documentation और compliance requirements पूरी करना आवश्यक हो सकता है। Required documents reward type, eligibility और applicable requirements के अनुसार अलग-अलग हो सकते हैं।</strong>
            </p>
          </div>

          <div className="pt-2 border-t border-[#e5e2dd] flex flex-col gap-1">
            <p className="font-bold text-[#1c1c19]">
              Final tax responsibility signed Growth Partner Agreement में clearly लिखी जाए।
            </p>
            <p className="text-[11px] text-[#8d6f77] font-semibold">
              Final tax responsibility must be clearly stated in the signed Growth Partner Agreement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
