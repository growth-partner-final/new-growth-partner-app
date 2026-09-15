import React from 'react';

export const FraudNotice: React.FC = () => {
  return (
    <section className="px-4 py-2">
      <div className="p-4 rounded-xl bg-[#ffdad6]/35 text-[#93000a] shadow-xs border border-[#ffdad6] flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[#ba1a1a]">
          <span className="material-symbols-outlined text-[24px]">shield_with_heart</span>
          <span className="text-sm font-bold">महत्वपूर्ण सुरक्षा एवं फ्रॉड चेतावनी</span>
        </div>
        <p className="text-xs sm:text-sm text-[#1c1c19] leading-relaxed">
          <strong>Nexora कभी भी पार्टनर बनने के लिए कोई फीस, डिपॉजिट या एडवांस पैसे नहीं मांगता।</strong> अनऑथराइज्ड व्हाट्सएप ग्रुप्स, टेलीग्राम चैनल्स या फर्जी कॉल्स से सावधान रहें। केवल आधिकारिक पोर्टल <span className="font-bold text-[#b1005e]">nexora.com</span> पर ही रजिस्टर करें। किसी भी व्यक्ति को अपना पासवर्ड, बैंक पिन या OTP कभी साझा न करें।
        </p>
      </div>
    </section>
  );
};
