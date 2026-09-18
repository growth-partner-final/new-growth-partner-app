import React from 'react';

interface FinalCTAProps {
  onOpenApply: () => void;
  onOpenSupport: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenApply, onOpenSupport }) => {
  return (
    <section className="w-full py-8 flex flex-col gap-6" id="apply">
      {/* Final Punchy Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#d91b77] via-[#b1005e] to-[#3c0223] text-white shadow-xl flex flex-col items-center text-center gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-[#ffe088] shadow-inner">
          <span className="material-symbols-outlined text-[32px]">military_tech</span>
        </div>
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight">
          आज ही अपनी फाइनेंशियल फ्रीडम की शुरुआत करें!
        </h2>
        <p className="text-sm sm:text-base text-white/90 leading-relaxed">
          5,200+ पार्टनर्स के साथ जुड़ें और Nexora के साथ अनलिमिटेड मंथली रेवेन्यू व माइलस्टोन रिवॉर्ड्स अनलॉक करें।
        </p>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={onOpenApply}
            className="h-12 sm:h-14 px-8 rounded-2xl bg-white text-[#d91b77] font-black text-base flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02] active:scale-95 hover:bg-[#fcf9f4] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
            <span>रजिस्टर करें — बिल्कुल मुफ्त (₹0)</span>
          </button>
          
          <button
            type="button"
            onClick={onOpenSupport}
            className="h-12 sm:h-14 px-6 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 backdrop-blur-xs cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[20px] text-[#25D366]">chat</span>
            <span>WhatsApp Support</span>
          </button>
        </div>

        <div className="flex items-center gap-4 text-xs text-white/80 pt-2">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-emerald-400">lock</span>
            100% Secure Platform
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-emerald-400">verified</span>
            SEBI Compliant Payouts
          </span>
        </div>
      </div>

      {/* Footer & Brand Identity Section */}
      <footer className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e5e2dd] flex flex-col gap-6 text-[#594047] shadow-xs">
        {/* Top Brand Header Row */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 border-b border-[#e5e2dd] pb-6 text-center md:text-left">
          {/* Brand Logo & Name */}
          <div className="flex flex-col items-center md:items-start gap-3 max-w-md">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#ffd9e2] p-1.5 flex items-center justify-center shadow-xs border border-[#b1005e]/20">
                <img
                  src="https://lh3.googleusercontent.com/aida/AEtjO1XZxTb-KtdsPjo0U0odHwDY485hRuwmfDBk7sy7hvncIa4xg3AdjCaLVTut6pSuuRiQJj_3YtSdqJ3TLo2klHSJMNebL6mVq0uWtOhluaULb7Cy_34No2AloAlRtDCW1-HCFGFyKGQkrv2OMGEMkXFJpEFLcxUma8v2Z1hXG0pFOlEix77UvOTw-NfNuX20oyBgVrPL--0n2ZNjrI0vKNBImBop03G0p3fTT3hR_Chdf05d_h_ZbzfoKQ"
                  alt="NEXORA Logo"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-2xl font-black text-[#1c1c19] tracking-wider uppercase">NEXORA</span>
                <span className="text-[10px] font-extrabold text-[#b1005e] tracking-widest uppercase">
                  SALONOS • Growth Partner Ecosystem
                </span>
              </div>
            </div>
            <p className="text-xs text-[#594047] leading-relaxed">
              Nexora is India's premier salon fintech and growth partner network empowering salons, beauty parlors, and growth advisors with zero-cost digital onboarding, instant rewards, and weekly automated payouts.
            </p>
          </div>

          {/* Quick Helplines */}
          <div className="flex flex-col items-center md:items-end gap-2 shrink-0">
            <span className="text-xs font-bold text-[#1c1c19] uppercase tracking-wider">Official Partner Support</span>
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <button
                type="button"
                onClick={onOpenSupport}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] text-xs font-bold transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>WhatsApp Helpline</span>
              </button>
              <a
                href="mailto:partners@nexora.com"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#d91b77]/10 hover:bg-[#d91b77]/20 text-[#b1005e] text-xs font-bold transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">mail</span>
                <span>partners@nexora.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer Line */}
        <p className="text-[11px] leading-relaxed text-[#594047] text-center md:text-left bg-[#fcf9f4] p-4 rounded-xl border border-[#e5e2dd]">
          <strong>अस्वीकरण (Disclaimer):</strong> Nexora केवल अधिकृत रेफरल पार्टनर प्रोग्राम संचालित करता है। किसी भी प्रकार की पोंजी या फिक्स्ड रिटर्न स्कीम का समर्थन नहीं किया जाता। कमीशन और इंसेंटिव पूरी तरह से आपके द्वारा रेफर किए गए वास्तविक सैलून क्लाइंट्स के बिज़नेस वॉल्यूम और सेबी कम्प्लायंट फिनटेक सेवाओं पर आधारित होते हैं।
        </p>

        {/* Copyright & Legal Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-[#e5e2dd] text-xs text-[#594047]">
          <div className="font-bold text-[#1c1c19] flex items-center gap-2">
            <span>© 2026 Nexora. All rights reserved.</span>
          </div>
          <div className="text-[11px] text-[#8d6f77] text-center sm:text-right font-medium">
            Nexora Fintech Technologies Private Limited • SEBI Compliant Payout Infrastructure
          </div>
        </div>
      </footer>
    </section>
  );
};
