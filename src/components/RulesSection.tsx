import React from 'react';

export const RulesSection: React.FC = () => {
  return (
    <section className="px-4 py-6 flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-[#8e4767]">
          <span className="material-symbols-outlined text-[18px]">gavel</span>
          <span className="text-xs font-bold tracking-wider uppercase">Code of Conduct</span>
        </div>
        <h2 className="text-xl font-bold text-[#1c1c19]">
          पार्टनर का काम और स्पष्ट नियम
        </h2>
        <p className="text-xs sm:text-sm text-[#594047]">
          स्वच्छ और भरोसेमंद इकोसिस्टम ही आपकी स्थायी कमाई की गारंटी है।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {/* Responsibilities (Do's) */}
        <div className="p-4 rounded-xl bg-[#f6f3ee] shadow-xs border border-[#e5e2dd] flex flex-col gap-3">
          <div className="flex items-center gap-2 text-[#d91b77]">
            <span className="material-symbols-outlined text-[22px]">task_alt</span>
            <span className="text-sm font-bold">आपकी ज़िम्मेदारियां (Do's)</span>
          </div>
          <ul className="flex flex-col gap-2.5 text-xs text-[#1c1c19]">
            <li className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[#d91b77] text-[18px] shrink-0 mt-0.5">check_circle</span>
              <span className="leading-relaxed">क्लाइंट्स को Nexora की वेल्थ एवं फिनटेक सॉल्यूशंस का सही लाभ समझाना।</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[#d91b77] text-[18px] shrink-0 mt-0.5">check_circle</span>
              <span className="leading-relaxed">जेनुइन बिज़नेस और एक्टिव ट्रेडर्स को ऑनबोर्ड करना।</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[#d91b77] text-[18px] shrink-0 mt-0.5">check_circle</span>
              <span className="leading-relaxed">कंपनी की गाइडलाइन्स और एथिकल फाइनेंशियल प्रैक्टिसेज का निष्ठा से पालन करना।</span>
            </li>
          </ul>
        </div>

        {/* Strict Restrictions (Don'ts) */}
        <div className="p-4 rounded-xl bg-[#ffdad6]/40 text-[#93000a] shadow-xs border border-[#ffdad6] flex flex-col gap-3">
          <div className="flex items-center gap-2 text-[#ba1a1a]">
            <span className="material-symbols-outlined text-[22px]">block</span>
            <span className="text-sm font-bold">सख्त प्रतिबंध (Don'ts)</span>
          </div>
          <ul className="flex flex-col gap-2.5 text-xs text-[#1c1c19]">
            <li className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[#ba1a1a] text-[18px] shrink-0 mt-0.5">cancel</span>
              <span className="leading-relaxed">
                <strong>Zero Spam Policy:</strong> व्हाट्सएप या सोशल मीडिया पर गैर-ज़रूरी और अनाधिकृत स्पैमिंग सख्त वर्जित है।
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[#ba1a1a] text-[18px] shrink-0 mt-0.5">cancel</span>
              <span className="leading-relaxed">
                <strong>No False Guarantees:</strong> किसी को भी गारंटीड रिटर्न या अवास्तविक मुनाफे का झूठा वादा न करें।
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[#ba1a1a] text-[18px] shrink-0 mt-0.5">cancel</span>
              <span className="leading-relaxed">
                <strong>Strict 1 Account Rule:</strong> एक व्यक्ति या पैन कार्ड पर सिर्फ 1 अधिकृत पार्टनर खाता मान्य है।
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
