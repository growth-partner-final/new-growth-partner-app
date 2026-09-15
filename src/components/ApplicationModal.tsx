import React, { useState } from 'react';
import { PartnerFormData } from '../types';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterSuccess: (partner: { name: string; partnerId: string; referralLink: string }) => void;
  currentPartner: { name: string; partnerId: string; referralLink: string } | null;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  onRegisterSuccess,
  currentPartner
}) => {
  const [step, setStep] = useState<'form' | 'success'>(currentPartner ? 'success' : 'form');
  const [formData, setFormData] = useState<PartnerFormData>({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    profession: 'Financial Advisor',
    upiId: '',
    agreedToTerms: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `NX-${Math.floor(10000 + Math.random() * 90000)}`;
      const refLink = `https://nexora.com/ref/${generatedId}`;
      const partner = {
        name: formData.fullName,
        partnerId: generatedId,
        referralLink: refLink
      };
      onRegisterSuccess(partner);
      setIsSubmitting(false);
      setStep('success');
    }, 900);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#fcf9f4] w-full max-w-md rounded-2xl shadow-2xl border border-[#e5e2dd] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 bg-white border-b border-[#e5e2dd] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#ffd9e2] text-[#d91b77] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">
                {step === 'success' ? 'verified' : 'rocket_launch'}
              </span>
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm font-bold text-[#1c1c19]">
                {step === 'success' ? 'Nexora Partner Dashboard' : 'Free Partner Registration'}
              </h3>
              <span className="text-[11px] text-[#594047]">Zero Investment • Instant KYC</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#f0ede9] text-[#594047] flex items-center justify-center cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1">
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <div className="p-3 rounded-xl bg-[#ffd9e2]/30 border border-[#fda4c9]/50 text-xs text-[#7a3656] flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#d91b77] shrink-0">info</span>
                <span>जॉइनिंग 100% फ्री है। किसी भी प्रकार की फीस या कार्ड डिटेल्स की आवश्यकता नहीं है।</span>
              </div>

              {/* Full Name */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-[#1c1c19]">
                  पूरा नाम (Full Name as per PAN): <span className="text-[#ba1a1a]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. राहुल शर्मा"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="px-3 py-2 rounded-xl bg-white border border-[#e5e2dd] text-sm text-[#1c1c19] focus:outline-none focus:border-[#d91b77]"
                />
              </div>

              {/* Mobile / WhatsApp */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-[#1c1c19]">
                  व्हाट्सएप नंबर (WhatsApp Number): <span className="text-[#ba1a1a]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="उदा. 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="px-3 py-2 rounded-xl bg-white border border-[#e5e2dd] text-sm text-[#1c1c19] focus:outline-none focus:border-[#d91b77]"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-[#1c1c19]">ईमेल (Email Address):</label>
                <input
                  type="email"
                  placeholder="rahul@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="px-3 py-2 rounded-xl bg-white border border-[#e5e2dd] text-sm text-[#1c1c19] focus:outline-none focus:border-[#d91b77]"
                />
              </div>

              {/* City & Profession in 2 Cols */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-[#1c1c19]">शहर (City / State):</label>
                  <input
                    type="text"
                    placeholder="उदा. मुंबई, दिल्ली"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="px-3 py-2 rounded-xl bg-white border border-[#e5e2dd] text-sm text-[#1c1c19] focus:outline-none focus:border-[#d91b77]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-[#1c1c19]">प्रोफेशन (Profession):</label>
                  <select
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    className="px-3 py-2 rounded-xl bg-white border border-[#e5e2dd] text-xs text-[#1c1c19] focus:outline-none focus:border-[#d91b77]"
                  >
                    <option value="Financial Advisor">वित्तीय सलाहकार</option>
                    <option value="Active Trader">ट्रेडर / इन्वेस्टर</option>
                    <option value="Digital Marketer">डिजिटल मार्केटर</option>
                    <option value="Business Owner">बिज़नेस ओनर</option>
                    <option value="Working Professional">जॉब / सर्विस</option>
                    <option value="Student">विद्यार्थी (Student)</option>
                  </select>
                </div>
              </div>

              {/* UPI ID for Direct Payout */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-[#1c1c19] flex items-center justify-between">
                  <span>पेआउट UPI ID / बैंक खाता (वैकल्पिक):</span>
                  <span className="text-[10px] text-emerald-700 font-semibold">Weekly Direct Payout</span>
                </label>
                <input
                  type="text"
                  placeholder="name@okaxis / upi"
                  value={formData.upiId}
                  onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                  className="px-3 py-2 rounded-xl bg-white border border-[#e5e2dd] text-sm text-[#1c1c19] focus:outline-none focus:border-[#d91b77]"
                />
              </div>

              {/* Agree checkbox */}
              <label className="flex items-start gap-2 text-xs text-[#594047] cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={formData.agreedToTerms}
                  onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                  className="mt-0.5 accent-[#d91b77]"
                  required
                />
                <span>
                  मैं Nexora के पार्टनर कोड ऑफ कंडक्ट (Zero Spam, No False Guarantees) और नियमों से सहमत हूँ।
                </span>
              </label>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 h-12 rounded-full bg-[#d91b77] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#b1005e] transition-all active:scale-95 shadow-lg shadow-[#d91b77]/25 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                    एक्टिवेट किया जा रहा है...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px]">verified</span>
                    फ्री पार्टनर अकाउंट एक्टिवेट करें
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Success & Partner Pass View */
            <div className="flex flex-col gap-4 text-center items-center py-2">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl shadow-inner animate-bounce">
                🎉
              </div>

              <div className="flex flex-col gap-1">
                <h4 className="text-lg font-extrabold text-[#1c1c19]">
                  बधाई हो! आपका पार्टनर अकाउंट एक्टिव हो गया है
                </h4>
                <p className="text-xs text-[#594047]">
                  अब आप तुरंत अपने रेफरल लिंक से क्लाइंट्स जोड़ना और अनलिमिटेड पेआउट कमाना शुरू कर सकते हैं।
                </p>
              </div>

              {/* Official Digital Partner Card */}
              <div className="w-full p-4 rounded-2xl bg-gradient-to-br from-[#fcf9f4] via-[#f0ede9] to-[#ffd9e2] border-2 border-[#d91b77] shadow-lg text-left flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-[#e5e2dd] pb-2">
                  <span className="text-xs font-extrabold text-[#b1005e] tracking-wider uppercase">
                    Nexora Certified Growth Partner
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                    Active
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-[#594047] block">Partner Name:</span>
                    <span className="font-bold text-[#1c1c19]">{currentPartner?.name || formData.fullName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#594047] block">Partner ID:</span>
                    <span className="font-bold text-[#d91b77]">{currentPartner?.partnerId || 'NX-58291'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#594047] block">Rank:</span>
                    <span className="font-bold text-[#735c00]">Level 1: Rising Star</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#594047] block">Payout Mode:</span>
                    <span className="font-bold text-emerald-700">Weekly Auto-Credit</span>
                  </div>
                </div>

                {/* Referral Link Box */}
                <div className="mt-1 p-2.5 rounded-xl bg-white border border-[#e5e2dd] flex items-center justify-between gap-2">
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] text-[#594047] font-semibold">आपका यूनिक डिजिटल रेफरल लिंक:</span>
                    <span className="text-xs font-mono font-bold text-[#d91b77] truncate">
                      {currentPartner?.referralLink || `https://nexora.com/ref/${currentPartner?.partnerId || 'NX-58291'}`}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(currentPartner?.referralLink || `https://nexora.com/ref/${currentPartner?.partnerId || 'NX-58291'}`)}
                    className="px-3 py-1.5 rounded-lg bg-[#d91b77] text-white text-xs font-bold shrink-0 hover:bg-[#b1005e] cursor-pointer transition-colors"
                  >
                    {copied ? 'कॉपी हो गया ✓' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Share actions */}
              <div className="flex flex-col w-full gap-2 pt-1">
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    `Nexora Growth Partner के साथ जुड़ें और अपनी ट्रेडिंग व फाइनेंशियल जर्नी शुरू करें। आधिकारिक लिंक: ${currentPartner?.referralLink || 'https://nexora.com'}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="h-11 px-4 rounded-xl bg-[#25D366] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs hover:opacity-95 transition-opacity"
                >
                  <span className="material-symbols-outlined text-[18px]">share</span>
                  व्हाट्सएप पर शेयर करें
                </a>
                <button
                  onClick={onClose}
                  className="h-10 px-4 rounded-xl bg-[#f0ede9] text-[#1c1c19] text-xs font-bold hover:bg-[#e5e2dd] transition-colors cursor-pointer"
                >
                  डैशबोर्ड बंद करें
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
