import React, { useState } from 'react';
import { NotificationBell } from './NotificationBell';

interface SalonLockedOnboardingScreenProps {
  onNavigateToHub?: () => void;
  onNavigateToSalonIntelligence?: () => void;
  onNavigateToLeaderboard?: () => void;
  onNavigateToReferralTimeline?: () => void;
  onNavigateToShareEarn?: () => void;
  onNavigateToAddSalon?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToMerchantRegister?: () => void;
}

export const SalonLockedOnboardingScreen: React.FC<SalonLockedOnboardingScreenProps> = ({
  onNavigateToHub,
  onNavigateToSalonIntelligence,
  onNavigateToLeaderboard,
  onNavigateToReferralTimeline,
  onNavigateToShareEarn,
  onNavigateToAddSalon,
  onNavigateToDashboard,
  onNavigateToMerchantRegister
}) => {
  // Audit Simulation State: valid, invalid, expired
  const [auditState, setAuditState] = useState<'valid' | 'invalid' | 'expired'>('valid');

  // Auth Tab: signup | login
  const [authTab, setAuthTab] = useState<'signup' | 'login'>('signup');

  // Form Fields
  const [salonName, setSalonName] = useState<string>('Elegance Hair & Beauty Studio');
  const [proprietorName, setProprietorName] = useState<string>('Rahul Sharma');
  const [mobilePhone, setMobilePhone] = useState<string>('9842104472');
  const [ownerEmail, setOwnerEmail] = useState<string>('rahul.elegance@gmail.com');
  const [salonLocation, setSalonLocation] = useState<string>('Indiranagar 100ft Road, Bangalore');
  const [password, setPassword] = useState<string>('Elegance#Secure2025');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [termsAgreed, setTermsAgreed] = useState<boolean>(true);

  // Login Form Fields
  const [loginId, setLoginId] = useState<string>('+91 98421 04472');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [showLoginPassword, setShowLoginPassword] = useState<boolean>(false);

  // Dynamic Validation States
  const [showDuplicateError, setShowDuplicateError] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);

  // Modals
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showAuditDrawer, setShowAuditDrawer] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleEmailChange = (val: string) => {
    setOwnerEmail(val);
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    setIsEmailValid(valid || val.length === 0);
  };

  const handleManualCodeEntry = () => {
    const code = prompt('Enter replacement Partner Code (e.g. NEXORA-VIP99):', 'NEXORA-MARCUS88');
    if (code && code.trim()) {
      setAuditState('valid');
      showToast(`Partner Code ${code.toUpperCase()} successfully validated and locked!`);
    }
  };

  const handleRegisterSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setShowSuccessModal(true);
  };

  const handleLoginSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    showToast('Signed in successfully with Marcus Vance referral attribution retained.');
  };

  const triggerOtpFastTrack = () => {
    setShowSuccessModal(true);
  };

  return (
    <div className="bg-[#fcf9f4] font-sans text-[#1c1c19] flex flex-col min-h-screen relative selection:bg-[#fda4c9]">
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#31302d] text-white shadow-xl animate-in fade-in slide-in-from-top-4 duration-200 border border-white/10 max-w-sm text-center">
          <span className="material-symbols-outlined text-[18px] text-[#ffe088]">info</span>
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Top Fixed Header */}
      <header className="fixed top-8 sm:top-7 inset-x-0 z-40 bg-[#fcf9f4]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#e5e2dd]">
        <div className="h-16 px-4 sm:px-6 max-w-3xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <button
              aria-label="Go Back"
              onClick={() => {
                if (onNavigateToSalonIntelligence) onNavigateToSalonIntelligence();
              }}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#1c1c19] hover:text-[#b1005e] transition-colors cursor-pointer shrink-0"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
            </button>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#b1005e] to-[#d91b77] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
              N
            </div>
            <h1 className="text-base sm:text-lg font-bold text-[#1c1c19] truncate ml-1">
              Salon Registration
            </h1>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-full bg-[#f6f3ee] border border-[#e5e2dd]">
              <span className="material-symbols-outlined text-[#b1005e] text-[16px]">verified_user</span>
              <span className="text-xs font-bold text-[#594047]">Secured</span>
            </div>

            <NotificationBell onNavigateToReferrals={onNavigateToReferralTimeline} />

            <button
              onClick={() => setShowAuditDrawer(true)}
              aria-label="Audit Drawer"
              className="w-9 h-9 rounded-full bg-[#f0ede9] text-[#594047] hover:text-[#b1005e] hover:bg-[#e5e2dd] flex items-center justify-center transition-colors cursor-pointer border border-[#e5e2dd]"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">tune</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Form Content */}
      <main className="flex flex-col relative w-full pt-28 pb-24 px-4 sm:px-6 max-w-xl mx-auto space-y-4">
        {/* Interactive Audit State Switcher (Tester Control) */}
        <div className="bg-[#ebe8e3] p-2 rounded-2xl shadow-xs border border-[#e5e2dd] space-y-1.5">
          <div className="flex items-center justify-between px-2 pt-0.5">
            <span className="text-[11px] font-bold text-[#594047] uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-[#735c00]">tune</span>
              Simulate Referral Link State
            </span>
            <span className="text-[10px] bg-white text-[#b1005e] font-extrabold px-2 py-0.5 rounded-full shadow-2xs border border-[#e5e2dd]">
              Audit Switcher
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1 p-1 bg-white rounded-xl border border-[#e5e2dd]/70">
            <button
              onClick={() => setAuditState('valid')}
              className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                auditState === 'valid'
                  ? 'bg-[#b1005e] text-white shadow-xs'
                  : 'text-[#594047] hover:text-[#1c1c19]'
              }`}
              type="button"
            >
              Valid Code
            </button>
            <button
              onClick={() => setAuditState('invalid')}
              className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                auditState === 'invalid'
                  ? 'bg-[#ba1a1a] text-white shadow-xs'
                  : 'text-[#594047] hover:text-[#1c1c19]'
              }`}
              type="button"
            >
              Invalid
            </button>
            <button
              onClick={() => setAuditState('expired')}
              className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                auditState === 'expired'
                  ? 'bg-[#31302d] text-white shadow-xs'
                  : 'text-[#594047] hover:text-[#1c1c19]'
              }`}
              type="button"
            >
              Expired
            </button>
          </div>
        </div>

        {/* STATE 1: VALID REFERRAL (Default Active View) */}
        {auditState === 'valid' && (
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-md border border-[#e5e2dd] space-y-3 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-[#d91b77]/10 pointer-events-none blur-xl" />
            <div className="flex items-start justify-between gap-2 relative z-10">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-2xl bg-[#ffe088] flex items-center justify-center text-[#241a00] shadow-xs">
                  <span className="material-symbols-outlined text-[22px]">workspace_premium</span>
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#d91b77] text-white flex items-center justify-center text-[10px] shadow-xs">
                    <span className="material-symbols-outlined text-[11px]">lock</span>
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-[#b1005e] font-extrabold tracking-wider uppercase">
                      LOCKED REFERRAL APPLIED
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b1005e] animate-ping" />
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-sm font-black text-[#1c1c19] font-mono">NEXORA-MARCUS88</span>
                    <span className="text-[10px] bg-[#cca730]/20 text-[#4f3d00] px-2 py-0.5 rounded-full font-bold flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[12px]">verified</span> Gold Partner
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowAuditDrawer(true)}
                className="w-8 h-8 rounded-full bg-[#f6f3ee] flex items-center justify-center text-[#594047] hover:text-[#b1005e] transition-colors cursor-pointer"
                type="button"
                title="Inspect Audit Details"
              >
                <span className="material-symbols-outlined text-[18px]">info</span>
              </button>
            </div>

            <div className="flex items-center gap-2 bg-[#f6f3ee] p-2.5 rounded-xl text-[#594047] border border-[#e5e2dd]/60">
              <span className="material-symbols-outlined text-[16px] text-[#b1005e] shrink-0">lock</span>
              <p className="text-[11px] leading-tight">
                Locked &amp; Read-Only. Direct partner attribution protects commission and secures your signup yield.
              </p>
            </div>

            {/* Unlocked Benefits Pill Bar */}
            <div className="bg-gradient-to-r from-[#d91b77] to-[#8e4767] p-3 rounded-xl flex items-center justify-between text-white shadow-sm">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="material-symbols-outlined text-[22px] text-[#ffe088] shrink-0">
                  celebration
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] opacity-90 uppercase font-bold tracking-wider">
                    Unlocked VIP Onboarding Perks
                  </span>
                  <span className="text-xs font-black truncate">
                    ₹500 Welcome Bonus + 0% MDR for 30 Days
                  </span>
                </div>
              </div>
              <span className="text-[10px] bg-white text-[#b1005e] px-2 py-1 rounded-full font-black shadow-xs shrink-0 ml-2">
                Guaranteed
              </span>
            </div>
          </div>
        )}

        {/* STATE 2: INVALID REFERRAL DRAWER/ALERT */}
        {auditState === 'invalid' && (
          <div className="bg-[#ffdad6] text-[#93000a] rounded-2xl p-4 shadow-md border border-[#ba1a1a]/30 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#ba1a1a] text-white flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[20px]">warning</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#ba1a1a]">
                  Unrecognized Partner Tag
                </span>
                <span className="text-base font-bold text-[#93000a]">Referral Code Inactive</span>
              </div>
            </div>
            <p className="text-xs leading-relaxed opacity-95">
              The link parameter <code className="bg-white/80 px-1.5 py-0.5 rounded text-[#1c1c19] font-bold">NEXORA-MARCUS88-ERR</code> does not match an active licensed partner registry. Choose recovery path:
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={handleManualCodeEntry}
                className="w-full h-11 px-4 rounded-full bg-white text-[#1c1c19] font-bold text-xs shadow-xs flex items-center justify-center gap-2 cursor-pointer hover:bg-[#f6f3ee]"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] text-[#b1005e]">edit</span>
                <span>Enter Partner Code Manually</span>
              </button>
              <a
                href="https://wa.me/?text=Hi%20Marcus,%20my%20Nexora%20invite%20code%20needs%20validation"
                target="_blank"
                rel="noreferrer"
                className="w-full h-11 px-4 rounded-full bg-[#d91b77] text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Ask Partner via WhatsApp</span>
              </a>
              <button
                onClick={() => setAuditState('valid')}
                className="w-full h-10 px-4 rounded-full bg-transparent text-[#93000a] font-bold text-xs hover:bg-white/30 flex items-center justify-center cursor-pointer"
                type="button"
              >
                Proceed as Standard Salon (Skip Bonus)
              </button>
            </div>
          </div>
        )}

        {/* STATE 3: EXPIRED REFERRAL DRAWER/ALERT */}
        {auditState === 'expired' && (
          <div className="bg-[#ebe8e3] rounded-2xl p-4 shadow-md border border-[#e5e2dd] space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#cca730] text-[#241a00] flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[22px]">history_toggle_off</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-extrabold text-[#735c00] uppercase tracking-wider">
                  INVITE WINDOW CLOSED
                </span>
                <span className="text-base font-bold text-[#1c1c19]">Link Expired (48h Limit)</span>
              </div>
            </div>
            <p className="text-xs text-[#594047] leading-relaxed">
              Marcus Vance’s invite token timed out yesterday. Growth Partner vouchers must be refreshed by the sponsor to activate your ₹500 bank transfer credit.
            </p>
            <a
              href="https://wa.me/?text=Hi%20Marcus,%20please%20refresh%20my%20Nexora%20salon%20onboarding%20link."
              target="_blank"
              rel="noreferrer"
              className="w-full h-11 px-4 rounded-full bg-[#d91b77] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              <span>1-Tap WhatsApp Ping for Fresh Link</span>
            </a>
          </div>
        )}

        {/* Quick Inspection Button for Success Modal Preview */}
        <button
          onClick={() => setShowSuccessModal(true)}
          className="w-full py-2 px-3.5 bg-white rounded-xl flex items-center justify-between text-left shadow-2xs border border-[#e5e2dd] hover:bg-[#f6f3ee] transition-colors cursor-pointer"
          type="button"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#cca730]">smart_button</span>
            <span className="text-xs text-[#594047]">
              Tap to inspect: <strong className="text-[#1c1c19]">Partner Verified Modal</strong>
            </span>
          </div>
          <span className="material-symbols-outlined text-[16px] text-[#594047]">arrow_forward</span>
        </button>

        {/* Tab Segment Selector */}
        <div className="bg-[#ebe8e3] rounded-2xl p-1 grid grid-cols-2 gap-1 shadow-inner border border-[#e5e2dd]">
          <button
            onClick={() => setAuthTab('signup')}
            className={`h-11 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              authTab === 'signup'
                ? 'bg-white text-[#b1005e] shadow-xs'
                : 'text-[#594047] hover:text-[#1c1c19]'
            }`}
            type="button"
          >
            <span>Sign Up</span>
            <span className="bg-[#ffd9e2] text-[#b1005e] text-[10px] px-1.5 py-0.5 rounded-full font-black">
              +₹500
            </span>
          </button>
          <button
            onClick={() => setAuthTab('login')}
            className={`h-11 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center cursor-pointer ${
              authTab === 'login'
                ? 'bg-white text-[#b1005e] shadow-xs'
                : 'text-[#594047] hover:text-[#1c1c19]'
            }`}
            type="button"
          >
            Salon Log In
          </button>
        </div>

        {/* SIGN UP TAB CONTENT */}
        {authTab === 'signup' && (
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-5 sm:p-6 shadow-md border border-[#e5e2dd] space-y-4">
            {/* Locked Partner Attribution Badge Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#1c1c19] flex items-center gap-1">
                  <span>Growth Partner Referral</span>
                  <span className="text-[11px] text-[#b1005e] font-medium">(Locked)</span>
                </label>
                <span className="text-[11px] text-[#594047] flex items-center gap-0.5 font-medium">
                  <span className="material-symbols-outlined text-[14px] text-[#b1005e]">verified</span>
                  Attribution Active
                </span>
              </div>
              <div className="relative flex items-center bg-[#f6f3ee] rounded-xl p-3 border border-[#e5e2dd]">
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <span className="material-symbols-outlined text-[20px] text-[#594047] shrink-0">lock</span>
                  <div className="flex flex-col truncate">
                    <span className="text-xs font-black text-[#1c1c19] truncate font-mono">
                      NEXORA-MARCUS88
                    </span>
                    <span className="text-[11px] text-[#594047] truncate">
                      Marcus Vance • Executive Gold Partner
                    </span>
                  </div>
                </div>
                <span className="shrink-0 bg-white text-[#b1005e] text-[11px] px-2.5 py-1 rounded-full font-bold shadow-2xs border border-[#e5e2dd]">
                  Verified
                </span>
              </div>
              <p className="text-[11px] text-[#594047] italic">
                🔒 Read-only field. Guarantees your ₹500 initial account credit and 30-day 0% payment gateway rate.
              </p>
            </div>

            {/* Salon Business Details */}
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1c1c19]" htmlFor="field-salon-name">
                  Salon / Studio Name
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-[#594047] text-[20px] pointer-events-none">
                    storefront
                  </span>
                  <input
                    id="field-salon-name"
                    value={salonName}
                    onChange={(e) => setSalonName(e.target.value)}
                    placeholder="e.g. Royal Glow Lounge"
                    required
                    className="w-full h-12 pl-10 pr-3 rounded-xl bg-[#f6f3ee] text-[#1c1c19] text-xs sm:text-sm border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all"
                    type="text"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1c1c19]" htmlFor="field-prop-name">
                  Proprietor Full Name
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-[#594047] text-[20px] pointer-events-none">
                    badge
                  </span>
                  <input
                    id="field-prop-name"
                    value={proprietorName}
                    onChange={(e) => setProprietorName(e.target.value)}
                    placeholder="Enter legal owner name"
                    required
                    className="w-full h-12 pl-10 pr-3 rounded-xl bg-[#f6f3ee] text-[#1c1c19] text-xs sm:text-sm border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all"
                    type="text"
                  />
                </div>
              </div>

              {/* Mobile Number with Interactive Duplicate Error Demo */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#1c1c19]" htmlFor="field-phone">
                    Primary Mobile Number
                  </label>
                  <button
                    onClick={() => setShowDuplicateError(!showDuplicateError)}
                    className="text-[11px] text-[#b1005e] font-bold hover:underline cursor-pointer"
                    type="button"
                  >
                    {showDuplicateError ? 'Hide Dup Alert' : 'Simulate Dup Alert'}
                  </button>
                </div>
                <div className="relative flex items-center">
                  <div className="absolute left-3 flex items-center gap-1 text-[#1c1c19] text-xs font-bold pointer-events-none">
                    <span>+91</span>
                    <span className="w-px h-4 bg-[#e5e2dd] ml-1" />
                  </div>
                  <input
                    id="field-phone"
                    value={mobilePhone}
                    onChange={(e) => setMobilePhone(e.target.value)}
                    maxLength={10}
                    placeholder="98765 43210"
                    required
                    className="w-full h-12 pl-14 pr-10 rounded-xl bg-[#f6f3ee] text-[#1c1c19] text-xs sm:text-sm border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all tracking-wide"
                    type="tel"
                  />
                  <span className="material-symbols-outlined absolute right-3 text-[#594047] text-[18px]">
                    call
                  </span>
                </div>

                {/* Inline Duplicate Error Message */}
                {showDuplicateError && (
                  <div className="mt-1 p-2.5 rounded-xl bg-[#ffdad6] text-[#93000a] border border-[#ba1a1a]/30 flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#ba1a1a] text-[18px] shrink-0 mt-0.5">
                      error
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#ba1a1a]">Duplicate Mobile Number</span>
                      <span className="text-xs leading-tight">
                        +91 {mobilePhone} is already registered. Please{' '}
                        <button
                          className="underline font-bold cursor-pointer"
                          onClick={() => setAuthTab('login')}
                          type="button"
                        >
                          log in instead
                        </button>{' '}
                        or provide an alternate owner number.
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Email ID with Real-time Format Check */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1c1c19]" htmlFor="field-email">
                  Business Email Address
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-[#594047] text-[20px] pointer-events-none">
                    mail
                  </span>
                  <input
                    id="field-email"
                    value={ownerEmail}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    placeholder="salon@domain.com"
                    required
                    className="w-full h-12 pl-10 pr-10 rounded-xl bg-[#f6f3ee] text-[#1c1c19] text-xs sm:text-sm border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all"
                    type="email"
                  />
                  {isEmailValid ? (
                    <span className="material-symbols-outlined absolute right-3 text-emerald-600 text-[20px]">
                      check_circle
                    </span>
                  ) : (
                    <span className="material-symbols-outlined absolute right-3 text-[#ba1a1a] text-[20px]">
                      cancel
                    </span>
                  )}
                </div>
                {!isEmailValid && (
                  <p className="text-[11px] text-[#ba1a1a] font-medium mt-0.5">
                    Please provide a valid business email.
                  </p>
                )}
              </div>

              {/* City / Locality */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1c1c19]" htmlFor="field-location">
                  Salon Locality / City
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-[#594047] text-[20px] pointer-events-none">
                    location_on
                  </span>
                  <input
                    id="field-location"
                    value={salonLocation}
                    onChange={(e) => setSalonLocation(e.target.value)}
                    placeholder="e.g. Bandra West, Mumbai"
                    required
                    className="w-full h-12 pl-10 pr-3 rounded-xl bg-[#f6f3ee] text-[#1c1c19] text-xs sm:text-sm border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all"
                    type="text"
                  />
                </div>
              </div>

              {/* Create Password with Strength Gauge */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1c1c19]" htmlFor="field-password">
                  Set Secure Admin Password
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-[#594047] text-[20px] pointer-events-none">
                    lock
                  </span>
                  <input
                    id="field-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="w-full h-12 pl-10 pr-10 rounded-xl bg-[#f6f3ee] text-[#1c1c19] text-xs sm:text-sm border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-[#594047] hover:text-[#1c1c19] cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
                {/* Strength Indicator */}
                <div className="flex items-center justify-between mt-1 px-0.5">
                  <div className="flex items-center gap-1.5 w-2/3">
                    <div className="h-1.5 flex-1 rounded-full bg-[#b1005e]" />
                    <div className="h-1.5 flex-1 rounded-full bg-[#b1005e]" />
                    <div className="h-1.5 flex-1 rounded-full bg-[#b1005e]" />
                    <div className="h-1.5 flex-1 rounded-full bg-[#ebe8e3]" />
                  </div>
                  <span className="text-[11px] text-[#b1005e] font-bold">Strong Password</span>
                </div>
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-start gap-2.5 mt-2 cursor-pointer select-none">
                <input
                  checked={termsAgreed}
                  onChange={(e) => setTermsAgreed(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded accent-[#b1005e] text-[#b1005e] focus:ring-0 cursor-pointer shrink-0"
                  type="checkbox"
                  required
                />
                <span className="text-xs text-[#594047] leading-tight">
                  I agree to the <strong className="text-[#b1005e]">Nexora Merchant Terms</strong> and authorize verification under Marcus Vance’s partner network.
                </span>
              </label>

              {/* High-contrast Action CTAs */}
              <div className="flex flex-col gap-2.5 pt-2">
                <button
                  type="submit"
                  className="w-full h-12 rounded-full bg-gradient-to-r from-[#d91b77] to-[#8e4767] text-white font-extrabold text-sm shadow-md hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">verified_user</span>
                  <span>Register &amp; Claim ₹500 Credit</span>
                </button>

                <div className="flex items-center justify-center gap-3 my-0.5">
                  <div className="h-px bg-[#e5e2dd] flex-1" />
                  <span className="text-[11px] text-[#594047] font-semibold">Or instant verification</span>
                  <div className="h-px bg-[#e5e2dd] flex-1" />
                </div>

                <button
                  onClick={triggerOtpFastTrack}
                  className="w-full h-11 rounded-full bg-[#f0ede9] text-[#1c1c19] font-bold text-xs hover:bg-[#e5e2dd] transition-colors flex items-center justify-center gap-2 cursor-pointer border border-[#e5e2dd]"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#b1005e]">sms</span>
                  <span>Fast 1-Tap Mobile OTP Registration</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* LOG IN TAB CONTENT */}
        {authTab === 'login' && (
          <div className="space-y-3.5">
            {/* Persisting Partner Attribution Reminder */}
            <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#e5e2dd] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#b1005e] text-[20px]">handshake</span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#594047] font-semibold uppercase">
                    Onboarding Sponsor Active
                  </span>
                  <span className="text-xs font-bold text-[#1c1c19]">Marcus Vance (Gold Partner)</span>
                </div>
              </div>
              <span className="text-[10px] bg-[#ffd9e2] text-[#b1005e] px-2.5 py-1 rounded-full font-extrabold">
                Referral Synced
              </span>
            </div>

            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-5 sm:p-6 shadow-md border border-[#e5e2dd] space-y-4">
              <div className="flex flex-col">
                <span className="text-lg font-extrabold text-[#1c1c19]">Welcome Back, Salon Owner</span>
                <span className="text-xs text-[#594047] mt-0.5">
                  Sign in to track appointments, staff, and settlement payouts.
                </span>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1c1c19]" htmlFor="login-mobile">
                    Registered Mobile or Salon ID
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-[#594047] text-[20px]">
                      phone_android
                    </span>
                    <input
                      id="login-mobile"
                      value={loginId}
                      onChange={(e) => setLoginId(e.target.value)}
                      required
                      className="w-full h-12 pl-10 pr-3 rounded-xl bg-[#f6f3ee] text-[#1c1c19] text-xs sm:text-sm border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all"
                      type="text"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#1c1c19]" htmlFor="login-pwd">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => showToast('Password reset link dispatched via SMS.')}
                      className="text-[11px] text-[#b1005e] font-bold hover:underline cursor-pointer"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-[#594047] text-[20px]">
                      key
                    </span>
                    <input
                      id="login-pwd"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter password"
                      required
                      type={showLoginPassword ? 'text' : 'password'}
                      className="w-full h-12 pl-10 pr-10 rounded-xl bg-[#f6f3ee] text-[#1c1c19] text-xs sm:text-sm border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all"
                    />
                    <button
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3 text-[#594047] hover:text-[#1c1c19] cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showLoginPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 pt-1">
                  <button
                    type="submit"
                    className="w-full h-12 rounded-full bg-[#d91b77] hover:bg-[#b1005e] text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">login</span>
                    <span>Log In to Salon Portal</span>
                  </button>
                  <button
                    onClick={triggerOtpFastTrack}
                    className="w-full h-11 rounded-full bg-[#f0ede9] text-[#1c1c19] font-bold text-xs hover:bg-[#e5e2dd] transition-colors flex items-center justify-center gap-2 cursor-pointer border border-[#e5e2dd]"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#b1005e]">
                      mark_chat_read
                    </span>
                    <span>Log In via Instant WhatsApp OTP</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Salon Trust / Partner FAQ Card */}
        <div className="bg-[#f0ede9] rounded-2xl p-4 sm:p-5 flex flex-col gap-2 border border-[#e5e2dd]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#b1005e] text-[20px]">security</span>
            <span className="text-xs font-bold text-[#1c1c19]">
              Growth Partner Guarantee &amp; Settlement
            </span>
          </div>
          <p className="text-xs text-[#594047] leading-relaxed">
            Salon accounts onboarded via verified Gold Partners receive accelerated KYC checks within 4 hours, free Smart POS hardware setup, and zero merchant discount rates during month one.
          </p>
          <div className="flex items-center gap-3 pt-1">
            <div className="flex items-center gap-1 text-[#594047] text-[11px] font-semibold">
              <span className="material-symbols-outlined text-[16px] text-[#b1005e]">verified</span>
              RBI Regulated Gateway
            </div>
            <div className="flex items-center gap-1 text-[#594047] text-[11px] font-semibold">
              <span className="material-symbols-outlined text-[16px] text-[#b1005e]">lock_clock</span>
              Same-Day Settlement
            </div>
          </div>
        </div>
      </main>

      {/* SUCCESS STATE MODAL (Slide-over Bottom Card) */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-[#31302d]/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200 border border-[#e5e2dd]">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#ffd9e2] text-[#b1005e] flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[28px]">verified</span>
              </div>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-8 h-8 rounded-full bg-[#f6f3ee] flex items-center justify-center text-[#594047] hover:bg-[#e5e2dd] transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xl font-black text-[#1c1c19]">🎉 Partner Verified!</span>
              <p className="text-xs sm:text-sm text-[#594047] leading-relaxed">
                Referral locked to <strong className="text-[#1c1c19]">Marcus Vance</strong>. ₹500 welcome reward voucher linked to Salon: <strong className="text-[#1c1c19]">{salonName || 'Elegance Hair & Beauty Studio'}</strong>.
              </p>
            </div>
            <div className="bg-[#f6f3ee] rounded-2xl p-3.5 flex items-center gap-3 border border-[#e5e2dd]/60">
              <span className="material-symbols-outlined text-[#b1005e] text-[24px]">
                phonelink_ring
              </span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#1c1c19]">
                  OTP sent to +91 {mobilePhone || '98421 04472'}
                </span>
                <span className="text-[11px] text-[#594047]">
                  Auto-fill reading message... (Valid 10:00)
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  showToast('Verification code confirmed! Redirecting to KYC documents...');
                  if (onNavigateToReferralTimeline) onNavigateToReferralTimeline();
                }}
                className="w-full h-12 rounded-full bg-[#d91b77] hover:bg-[#b1005e] text-white font-extrabold text-sm shadow-md cursor-pointer"
                type="button"
              >
                Enter 6-Digit OTP Now →
              </button>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full h-10 rounded-full bg-transparent text-[#594047] font-bold text-xs hover:bg-[#f6f3ee] cursor-pointer"
                type="button"
              >
                Dismiss Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AUDIT STATE INFO DRAWER (For QA & Verification) */}
      {showAuditDrawer && (
        <div className="fixed inset-0 z-50 bg-[#31302d]/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl flex flex-col gap-3.5 border border-[#e5e2dd]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#b1005e] text-[20px]">
                  security_update_good
                </span>
                <span className="text-base font-bold text-[#1c1c19]">Partner Audit Trail</span>
              </div>
              <button
                onClick={() => setShowAuditDrawer(false)}
                className="w-8 h-8 rounded-full bg-[#f6f3ee] flex items-center justify-center text-[#594047] hover:bg-[#e5e2dd] transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-2 text-xs text-[#594047]">
              <div className="p-3 rounded-xl bg-[#f6f3ee] flex justify-between items-center border border-[#e5e2dd]/60">
                <span className="font-semibold">Query String Param:</span>
                <span className="font-mono text-[#b1005e] font-bold">?ref=NEXORA-MARCUS88</span>
              </div>
              <div className="p-3 rounded-xl bg-[#f6f3ee] flex justify-between items-center border border-[#e5e2dd]/60">
                <span className="font-semibold">Partner Tier:</span>
                <span className="text-[#735c00] font-bold">Gold Tier Growth Architect</span>
              </div>
              <div className="p-3 rounded-xl bg-[#f6f3ee] flex justify-between items-center border border-[#e5e2dd]/60">
                <span className="font-semibold">Commission Split:</span>
                <span className="text-[#1c1c19] font-bold">30% Lifetime Processing</span>
              </div>
              <div className="p-3 rounded-xl bg-[#f6f3ee] flex justify-between items-center border border-[#e5e2dd]/60">
                <span className="font-semibold">Input Lock State:</span>
                <span className="text-[#b1005e] font-bold">Enforced Read-Only</span>
              </div>
            </div>
            <button
              onClick={() => setShowAuditDrawer(false)}
              className="w-full h-11 rounded-full bg-[#b1005e] text-white font-bold text-xs shadow-xs cursor-pointer hover:bg-[#d91b77]"
              type="button"
            >
              Close Audit Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
