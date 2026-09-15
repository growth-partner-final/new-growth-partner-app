import React, { useState } from 'react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScrollToFAQ: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({
  isOpen,
  onClose,
  onScrollToFAQ
}) => {
  const [callRequested, setCallRequested] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  if (!isOpen) return null;

  const handleRequestCall = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setCallRequested(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#fcf9f4] w-full max-w-md rounded-2xl shadow-2xl border border-[#e5e2dd] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-4 bg-white border-b border-[#e5e2dd] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#ffd9e2] text-[#d91b77] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">support_agent</span>
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm font-bold text-[#1c1c19]">Nexora Partner Support Desk</h3>
              <span className="text-[11px] text-[#594047]">Dedicated 7-Days Partner Assistance</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#f0ede9] text-[#594047] flex items-center justify-center cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-5 flex flex-col gap-4">
          {/* WhatsApp Direct Connect */}
          <div className="p-4 rounded-xl bg-white border border-[#e5e2dd] flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1c1c19] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#25D366]">chat</span>
                Instant WhatsApp Helpline
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                Online (Active)
              </span>
            </div>
            <p className="text-xs text-[#594047]">
              पार्टनर प्रोग्राम, ऑनबोर्डिंग या पेआउट संबंधित किसी भी प्रश्न के लिए हमारे सीनियर पार्टनर रिलेशनशिप मैनेजर से सीधे व्हाट्सएप पर बात करें।
            </p>
            <a
              href="https://wa.me/919876543210?text=Hello%20Nexora%20Team%2C%20I%20want%20to%20know%20more%20about%20the%20Growth%20Partner%20Program"
              target="_blank"
              rel="noreferrer"
              className="h-10 px-4 rounded-lg bg-[#25D366] text-white font-bold text-xs flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              व्हाट्सएप पर चैट शुरू करें (+91 98765 43210)
            </a>
          </div>

          {/* Email Support */}
          <div className="p-3.5 rounded-xl bg-white border border-[#e5e2dd] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#ffd9e2] text-[#d91b77] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">mail</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#1c1c19]">ईमेल सपोर्ट</span>
                <span className="text-[11px] text-[#594047]">24 घंटे के भीतर आधिकारिक उत्तर</span>
              </div>
            </div>
            <a
              href="mailto:partners@nexora.com"
              className="px-3 py-1.5 rounded-lg bg-[#f0ede9] text-[#b1005e] text-xs font-bold hover:bg-[#ffd9e2] transition-colors"
            >
              partners@nexora.com
            </a>
          </div>

          {/* Request Callback Form */}
          <div className="p-4 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] flex flex-col gap-2.5">
            <span className="text-xs font-bold text-[#1c1c19]">
              कॉल बैक अनुरोध (Request a Call Back):
            </span>
            {callRequested ? (
              <div className="p-3 rounded-lg bg-emerald-50 text-emerald-800 text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
                <span>धन्यवाद! हमारे रिलेशनशिप मैनेजर 15 मिनट के भीतर आपसे संपर्क करेंगे।</span>
              </div>
            ) : (
              <form onSubmit={handleRequestCall} className="flex gap-2">
                <input
                  type="tel"
                  required
                  placeholder="अपना 10-अंकीय मोबाइल नंबर डालें"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg bg-white border border-[#e5e2dd] text-xs text-[#1c1c19] focus:outline-none focus:border-[#d91b77]"
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-lg bg-[#d91b77] text-white text-xs font-bold hover:bg-[#b1005e] transition-colors cursor-pointer shrink-0"
                >
                  रिक्वेस्ट भेजें
                </button>
              </form>
            )}
          </div>

          {/* FAQ quick redirect */}
          <button
            onClick={() => {
              onClose();
              onScrollToFAQ();
            }}
            className="text-xs font-semibold text-[#b1005e] hover:underline text-center cursor-pointer"
          >
            अक्सर पूछे जाने वाले सवाल (FAQ) देखें →
          </button>
        </div>
      </div>
    </div>
  );
};
