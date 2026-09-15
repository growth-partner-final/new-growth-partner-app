import React from 'react';

interface FinalCTAProps {
  onOpenApply: () => void;
  onOpenSupport: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenApply, onOpenSupport }) => {
  return (
    <section className="px-4 py-6 flex flex-col gap-5" id="apply">
      {/* Final Punchy Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#d91b77] via-[#b1005e] to-[#3c0223] text-white shadow-xl flex flex-col gap-3 text-center items-center">
        <span className="material-symbols-outlined text-[48px] text-[#ffe088]">military_tech</span>
        <h2 className="text-xl sm:text-2xl font-extrabold leading-tight">
          आज ही अपनी फाइनेंशियल फ्रीडम की शुरुआत करें!
        </h2>
        <p className="text-xs sm:text-sm text-white/90 max-w-sm leading-relaxed">
          5,200+ पार्टनर्स के साथ जुड़ें और Nexora के साथ अनलिमिटेड मंथली रेवेन्यू अनलॉक करें।
        </p>
        <button
          onClick={onOpenApply}
          className="mt-2 h-12 px-8 rounded-full bg-white text-[#d91b77] font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 hover:bg-[#fcf9f4] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
          रजिस्टर करें — बिल्कुल मुफ्त
        </button>
        <span className="text-xs text-white/80 flex items-center gap-1 mt-1">
          <span className="material-symbols-outlined text-[15px]">lock</span>
          100% सुरक्षित एवं SEBI/Fintech कम्प्लायंट
        </span>
      </div>

      {/* Quick Links, Helpline & Compliance Disclaimers */}
      <div className="p-4 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] flex flex-col gap-3 text-[#594047]">
        <div className="flex items-center justify-around text-center py-2 flex-wrap gap-2">
          <button
            onClick={onOpenSupport}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#1c1c19] hover:text-[#b1005e] cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] text-[#25D366]">chat</span>
            WhatsApp Helpline
          </button>
          <span className="text-[#e1bdc6]">|</span>
          <a
            href="mailto:partners@nexora.com"
            className="flex items-center gap-1.5 text-xs font-semibold text-[#1c1c19] hover:text-[#b1005e] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] text-[#d91b77]">mail</span>
            partners@nexora.com
          </a>
        </div>

        <p className="text-[11px] leading-relaxed text-[#594047] text-center border-t border-[#e5e2dd] pt-3">
          <strong>अस्वीकरण (Disclaimer):</strong> Nexora केवल अधिकृत रेफरल पार्टनर प्रोग्राम संचालित करता है। किसी भी प्रकार की पोंजी या फिक्स्ड रिटर्न स्कीम का समर्थन नहीं किया जाता। कमीशन और इंसेंटिव पूरी तरह से आपके द्वारा रेफर किए गए वास्तविक क्लाइंट्स के बिज़नेस वॉल्यूम और सेबी कम्प्लायंट फिनटेक सेवाओं पर आधारित होते हैं।
        </p>

        <div className="text-center text-[11px] text-[#594047] font-medium">
          © 2025 Nexora Fintech Technologies Private Limited. All rights reserved.
        </div>
      </div>
    </section>
  );
};
