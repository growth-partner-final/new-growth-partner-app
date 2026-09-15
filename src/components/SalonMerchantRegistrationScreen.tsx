import React, { useState } from 'react';
import { NotificationBell } from './NotificationBell';

interface SalonMerchantRegistrationScreenProps {
  onNavigateToHub?: () => void;
  onNavigateToSalonIntelligence?: () => void;
  onNavigateToLeaderboard?: () => void;
  onNavigateToReferralTimeline?: () => void;
  onNavigateToShareEarn?: () => void;
  onNavigateToAddSalon?: () => void;
  onNavigateToDashboard?: () => void;
}

export const SalonMerchantRegistrationScreen: React.FC<SalonMerchantRegistrationScreenProps> = ({
  onNavigateToHub,
  onNavigateToSalonIntelligence,
  onNavigateToLeaderboard,
  onNavigateToReferralTimeline,
  onNavigateToShareEarn,
  onNavigateToAddSalon,
  onNavigateToDashboard
}) => {
  // Referral State
  const [referralState, setReferralState] = useState<'valid' | 'invalid' | 'suspended' | 'expired' | 'standard'>('valid');
  const [customRefCode, setCustomRefCode] = useState<string>('REF-5A45019655');

  // Form Fields
  const [salonName, setSalonName] = useState<string>('');
  const [salonCategory, setSalonCategory] = useState<string>('');
  const [proprietorName, setProprietorName] = useState<string>('');
  const [salonPhone, setSalonPhone] = useState<string>('');
  const [salonEmail, setSalonEmail] = useState<string>('');
  const [salonPincode, setSalonPincode] = useState<string>('560038');
  const [detectedLocation, setDetectedLocation] = useState<string>('Indiranagar, Bengaluru - Karnataka');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [attributionConsent, setAttributionConsent] = useState<boolean>(true);

  // Validation / Duplicate Triggers
  const [showDupPhone, setShowDupPhone] = useState<boolean>(false);
  const [showDupEmail, setShowDupEmail] = useState<boolean>(false);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otpToast, setOtpToast] = useState<string | null>(null);

  // Modals
  const [isLoadingOverlay, setIsLoadingOverlay] = useState<boolean>(false);
  const [isSuccessModal, setIsSuccessModal] = useState<boolean>(false);

  // Language
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');

  // Pincode handler
  const handlePincodeChange = (val: string) => {
    setSalonPincode(val);
    if (val === '560038') {
      setDetectedLocation('Indiranagar, Bengaluru - Karnataka');
    } else if (val === '560034') {
      setDetectedLocation('Koramangala, Bengaluru - Karnataka');
    } else if (val.length === 6) {
      setDetectedLocation('Bengaluru Metro Grid, Karnataka');
    }
  };

  // Password strength calculation
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { label: 'Enter password', percent: 0, color: 'bg-surface-variant', score: 0 };
    if (pwd.length < 6) return { label: 'Weak (30%)', percent: 30, color: 'bg-[#ba1a1a]', score: 1 };
    if (pwd.length < 10) return { label: 'Medium (65%)', percent: 65, color: 'bg-[#cca730]', score: 2 };
    return { label: 'Strong (100%)', percent: 100, color: 'bg-[#b1005e]', score: 3 };
  };

  const pwdStrength = getPasswordStrength(password);

  const triggerOtp = () => {
    const phone = salonPhone || '9876543210';
    setSalonPhone(phone);
    setOtpSent(true);
    setOtpToast(`OTP 492018 dispatched to +91 ${phone} via FastRail Gateway.`);
    setTimeout(() => setOtpToast(null), 4000);
  };

  // Quick Preset Handlers
  const handlePresetMode = (mode: 'normal' | 'validated' | 'duplicate' | 'loading') => {
    setShowDupPhone(false);
    setShowDupEmail(false);
    if (mode === 'normal') {
      setSalonName('');
      setProprietorName('');
      setSalonPhone('');
      setSalonEmail('');
      setPassword('');
      setSalonCategory('');
    } else if (mode === 'validated') {
      setSalonName('Aura Lumière Day Spa');
      setSalonCategory('day-spa');
      setProprietorName('Rohan Mehra');
      setSalonPhone('9876543210');
      setSalonEmail('contact@auralumiere.in');
      setPassword('AuraSecure#2025');
    } else if (mode === 'duplicate') {
      setSalonPhone('9876543210');
      setSalonEmail('salon.accounts@glowgrace.com');
      setShowDupPhone(true);
      setShowDupEmail(true);
    } else if (mode === 'loading') {
      setIsLoadingOverlay(true);
      setTimeout(() => {
        setIsLoadingOverlay(false);
        setIsSuccessModal(true);
      }, 1600);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingOverlay(true);
    setTimeout(() => {
      setIsLoadingOverlay(false);
      setIsSuccessModal(true);
    }, 1500);
  };

  const promptNewCode = () => {
    const input = window.prompt('Please enter your 12-character Nexora Growth Partner Code:');
    if (input && input.trim()) {
      setCustomRefCode(input.toUpperCase().trim());
      setReferralState('valid');
    }
  };

  return (
    <div className="bg-[#fcf9f4] font-sans text-[#1c1c19] min-h-screen flex flex-col justify-between relative selection:bg-[#fda4c9]">
      {/* Toast popup */}
      {otpToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#31302d] text-white shadow-xl animate-in fade-in slide-in-from-top-4 duration-200 border border-white/10">
          <span className="material-symbols-outlined text-[18px] text-[#ffe088]">sms</span>
          <span className="text-xs font-bold">{otpToast}</span>
        </div>
      )}

      {/* Top Fixed Header */}
      <header className="fixed top-8 sm:top-7 inset-x-0 z-40 bg-[#fcf9f4]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(74,14,46,0.04)] border-b border-[#e5e2dd]">
        <div className="h-16 w-full px-4 sm:px-6 max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#b1005e] to-[#d91b77] text-white flex items-center justify-center font-black text-base shadow-sm">
              N
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-extrabold text-[#1c1c19] leading-tight">
                Nexora Partner Portal
              </span>
              <span className="text-[11px] text-[#594047] font-medium">
                Salon Merchant Direct Onboarding
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 bg-[#f6f3ee] px-4 py-1.5 rounded-full border border-[#e5e2dd]">
            <span className="material-symbols-outlined text-[#b1005e] text-[18px]">
              verified_user
            </span>
            <span className="text-xs text-[#594047] font-medium tracking-wide">
              256-Bit Encrypted Merchant Onboarding • RBI/SEBI Partner Compliant
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-[#ebe8e3] p-1 rounded-full border border-[#e5e2dd]">
              <button
                onClick={() => setLang('EN')}
                className={`px-3 py-0.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  lang === 'EN' ? 'bg-white text-[#b1005e] shadow-xs' : 'text-[#594047]'
                }`}
                type="button"
              >
                EN
              </button>
              <button
                onClick={() => setLang('HI')}
                className={`px-3 py-0.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  lang === 'HI' ? 'bg-white text-[#b1005e] shadow-xs' : 'text-[#594047]'
                }`}
                type="button"
              >
                हिं (Hinglish)
              </button>
            </div>

            <NotificationBell onNavigateToReferrals={onNavigateToReferralTimeline} />

            <button
              onClick={() => {
                if (onNavigateToSalonIntelligence) onNavigateToSalonIntelligence();
              }}
              title="Open Salon Intelligence"
              className="w-9 h-9 rounded-full bg-[#b1005e] text-white flex items-center justify-center shrink-0 shadow-sm cursor-pointer hover:opacity-90"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">storefront</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full pt-28 pb-20 flex-1 flex flex-col items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          {/* Interactive Presentation Mode Toggle Bar */}
          <div className="w-full bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-sm border border-[#e5e2dd] flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#d91b77]/15 flex items-center justify-center text-[#b1005e]">
                <span className="material-symbols-outlined text-[20px]">tune</span>
              </div>
              <div>
                <p className="text-xs font-bold text-[#1c1c19] uppercase tracking-wider">
                  QA &amp; Verification State Simulator
                </p>
                <p className="text-xs text-[#594047]">
                  Test dynamic partner referral verification states &amp; form validation behaviors
                </p>
              </div>
            </div>

            {/* State Selectors Group */}
            <div className="flex flex-wrap items-center gap-2.5 w-full xl:w-auto">
              <div className="flex items-center bg-[#f6f3ee] p-1 rounded-full border border-[#e5e2dd] flex-wrap gap-1">
                <button
                  onClick={() => setReferralState('valid')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                    referralState === 'valid'
                      ? 'bg-[#d91b77] text-white shadow-xs'
                      : 'text-[#594047] hover:text-[#1c1c19]'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  <span>State A (Valid)</span>
                </button>
                <button
                  onClick={() => setReferralState('invalid')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                    referralState === 'invalid'
                      ? 'bg-[#ba1a1a] text-white shadow-xs'
                      : 'text-[#594047] hover:text-[#1c1c19]'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[14px]">error</span>
                  <span>State B (Invalid)</span>
                </button>
                <button
                  onClick={() => setReferralState('suspended')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                    referralState === 'suspended'
                      ? 'bg-[#cca730] text-white shadow-xs'
                      : 'text-[#594047] hover:text-[#1c1c19]'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[14px]">shield_person</span>
                  <span>State C (Review)</span>
                </button>
                <button
                  onClick={() => setReferralState('expired')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                    referralState === 'expired'
                      ? 'bg-[#31302d] text-white shadow-xs'
                      : 'text-[#594047] hover:text-[#1c1c19]'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[14px]">event_busy</span>
                  <span>State D (Expired)</span>
                </button>
              </div>

              {/* Form Presets */}
              <div className="flex items-center bg-[#f6f3ee] p-1 rounded-full border border-[#e5e2dd]">
                <button
                  onClick={() => handlePresetMode('normal')}
                  className="px-2.5 py-1 rounded-full text-xs font-bold bg-white text-[#b1005e] shadow-2xs cursor-pointer"
                  type="button"
                >
                  Clear
                </button>
                <button
                  onClick={() => handlePresetMode('validated')}
                  className="px-2.5 py-1 rounded-full text-xs font-medium text-[#594047] hover:text-[#1c1c19] cursor-pointer"
                  type="button"
                >
                  Autofill
                </button>
                <button
                  onClick={() => handlePresetMode('duplicate')}
                  className="px-2.5 py-1 rounded-full text-xs font-medium text-[#594047] hover:text-[#1c1c19] cursor-pointer"
                  type="button"
                >
                  Dup Check
                </button>
                <button
                  onClick={() => handlePresetMode('loading')}
                  className="px-2.5 py-1 rounded-full text-xs font-medium text-[#594047] hover:text-[#1c1c19] cursor-pointer"
                  type="button"
                >
                  Simulate Submit
                </button>
              </div>
            </div>
          </div>

          {/* SECTION 1: DYNAMIC REFERRAL STATUS BANNER */}
          <div className="w-full">
            {/* STATE A: VALID REFERRAL */}
            {referralState === 'valid' && (
              <div className="relative overflow-hidden rounded-3xl bg-white/95 backdrop-blur-xl shadow-md border border-[#e5e2dd] p-5 sm:p-6">
                <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#d91b77]/5 blur-3xl pointer-events-none" />
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  <div className="flex items-start gap-4 max-w-3xl">
                    <div className="w-12 h-12 rounded-2xl bg-[#d91b77] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#d91b77]/20">
                      <span className="material-symbols-outlined text-[26px]">workspace_premium</span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-[#ffd9e2] text-[#b1005e] uppercase tracking-wider font-extrabold">
                          Valid Referral Applied
                        </span>
                        <span className="text-xl sm:text-2xl text-[#1c1c19] tracking-tight font-black font-mono">
                          {customRefCode}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-[#ffe088] text-[#241a00] font-extrabold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px] text-[#735c00]">
                            stars
                          </span>
                          Gold Growth Partner
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#594047] leading-relaxed">
                        Growth Partner referral applied —{' '}
                        <strong className="text-[#1c1c19] font-bold">
                          Growth Partner [DEV SAMPLE] (REF-5A45019655)
                        </strong>
                        . Authorized Tier-1 Onboarding Associate.
                      </p>
                      <div className="flex items-center gap-1.5 text-[#594047] text-[11px]">
                        <span className="material-symbols-outlined text-[16px] text-[#b1005e]">
                          lock
                        </span>
                        <span>
                          Partner attribution is locked &amp; cryptographically secured to safeguard partner commission.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Salon Unlocked Perks Bento Capsule */}
                  <div className="w-full lg:w-auto bg-[#f6f3ee] rounded-2xl p-4 border border-[#e5e2dd] shadow-xs flex flex-col gap-2 shrink-0">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[11px] text-[#b1005e] uppercase font-extrabold tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">redeem</span>
                        Unlocked Salon Welcome Perks
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#e5e2dd] text-[#594047] font-bold">
                        Value ₹7,499
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                      <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-[#e5e2dd]/60 shadow-2xs">
                        <span className="material-symbols-outlined text-[#b1005e] text-[18px]">
                          account_balance_wallet
                        </span>
                        <span className="text-xs text-[#1c1c19]">
                          <strong>₹500</strong> Credit
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-[#e5e2dd]/60 shadow-2xs">
                        <span className="material-symbols-outlined text-[#735c00] text-[18px]">
                          percent
                        </span>
                        <span className="text-xs text-[#1c1c19]">
                          <strong>0% MDR</strong> 30 Days
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-[#e5e2dd]/60 shadow-2xs">
                        <span className="material-symbols-outlined text-[#8e4767] text-[18px]">
                          speaker
                        </span>
                        <span className="text-xs text-[#1c1c19]">
                          <strong>Free Soundbox</strong> Kit
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STATE B: INVALID REFERRAL */}
            {referralState === 'invalid' && (
              <div className="rounded-3xl bg-[#ffdad6]/60 backdrop-blur-xl border border-[#ba1a1a]/30 shadow-md p-5 sm:p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#ba1a1a] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <span className="material-symbols-outlined text-[26px]">cancel</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-[#ba1a1a]/15 text-[#ba1a1a] font-bold uppercase">
                          Invalid Code
                        </span>
                        <span className="text-xl font-bold text-[#1c1c19] line-through opacity-60">
                          NEXORA-INVALID99
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#1c1c19] mt-1">
                        Referral code not found in the Nexora Partner Registry. This identifier may have been mistyped or deactivated.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={promptNewCode}
                      className="px-4 py-2 rounded-full bg-white text-[#1c1c19] font-bold text-xs shadow-xs hover:bg-[#f6f3ee] transition-colors flex items-center gap-1.5 cursor-pointer border border-[#e5e2dd]"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">edit</span>
                      <span>Enter New Code</span>
                    </button>
                    <a
                      href="https://wa.me"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-full bg-white text-[#1c1c19] font-bold text-xs shadow-xs hover:bg-[#f6f3ee] transition-colors flex items-center gap-1.5 cursor-pointer border border-[#e5e2dd]"
                    >
                      <span className="material-symbols-outlined text-[16px] text-emerald-600">chat</span>
                      <span>Request on WhatsApp</span>
                    </a>
                    <button
                      onClick={() => setReferralState('standard')}
                      className="px-4 py-2 rounded-full bg-[#ba1a1a] text-white font-bold text-xs shadow-xs hover:opacity-95 cursor-pointer"
                      type="button"
                    >
                      Continue Standard Onboarding
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STATE C: SUSPENDED / REVIEW */}
            {referralState === 'suspended' && (
              <div className="rounded-3xl bg-[#ffe088]/40 backdrop-blur-xl border border-[#cca730]/40 shadow-md p-5 sm:p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#cca730] text-[#241a00] flex items-center justify-center shrink-0 shadow-sm">
                      <span className="material-symbols-outlined text-[26px]">gavel</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-[#cca730]/20 text-[#4f3d00] font-bold uppercase">
                          Compliance Hold
                        </span>
                        <span className="text-xl font-bold text-[#1c1c19]">NEXORA-REV881</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#1c1c19] mt-1">
                        Partner account is currently under scheduled quarterly compliance review. Partner incentives cannot be locked at this moment.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href="tel:18008916396"
                      className="px-4 py-2 rounded-full bg-white text-[#735c00] font-bold text-xs shadow-xs hover:bg-[#f6f3ee] flex items-center gap-1 border border-[#e5e2dd]"
                    >
                      <span className="material-symbols-outlined text-[16px]">headset_mic</span>
                      <span>Contact Partner Desk</span>
                    </a>
                    <button
                      onClick={() => setReferralState('standard')}
                      className="px-4 py-2 rounded-full bg-[#735c00] text-white font-bold text-xs shadow-xs cursor-pointer"
                      type="button"
                    >
                      Submit Salon Inquiry
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STATE D: EXPIRED */}
            {referralState === 'expired' && (
              <div className="rounded-3xl bg-white/95 backdrop-blur-xl border border-[#e5e2dd] shadow-md p-5 sm:p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#594047] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <span className="material-symbols-outlined text-[26px]">schedule</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-[#e5e2dd] text-[#594047] font-bold uppercase">
                          Campaign Concluded
                        </span>
                        <span className="text-xl font-bold text-[#1c1c19] line-through opacity-70">
                          NEXORA-FESTIVE24
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#594047] mt-1">
                        Campaign promotion expired on Oct 31, 2024. The partner must issue a revalidated link for Q1 allocations.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert('Fresh link generation request sent to partner via push notification.')}
                    className="px-4 py-2.5 rounded-full bg-[#b1005e] text-white font-bold text-xs shadow-xs hover:bg-[#d91b77] cursor-pointer"
                    type="button"
                  >
                    Request Fresh Link from Partner
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* SECTION 2: MAIN WORKSPACE (Bento Grid: Form Column + Benefit/Security Showcase) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT & CENTER: REGISTRATION FORM CANVAS (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-lg border border-[#e5e2dd]">
                {/* Locked Partner Referral Non-Editable Card */}
                <div className="mb-6 rounded-2xl bg-[#f6f3ee] p-4 border border-[#e5e2dd]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] text-[#b1005e] uppercase tracking-wider font-extrabold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                      Commission Lock Architecture
                    </span>
                    <span
                      title="Attribution permanently bound to partner upon registration."
                      className="material-symbols-outlined text-[18px] text-[#594047] cursor-help"
                    >
                      info
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3 bg-white px-4 py-3 rounded-xl border border-[#e5e2dd]/70 shadow-inner">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="material-symbols-outlined text-[#b1005e] text-[22px]">
                        lock
                      </span>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] text-[#594047] uppercase font-bold tracking-wider">
                          Partner Referral Code
                        </span>
                        <span className="text-base sm:text-lg text-[#1c1c19] font-black truncate font-mono">
                          {referralState === 'valid'
                            ? customRefCode
                            : referralState === 'standard'
                            ? 'NONE (DIRECT SELF ONBOARDING)'
                            : 'INVALID-OR-UNSET'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 px-3 py-1 rounded-full bg-[#ffd9e2] text-[#b1005e]">
                      <span className="w-2 h-2 rounded-full bg-[#b1005e] animate-pulse" />
                      <span className="text-xs font-bold">Locked &amp; Verified</span>
                    </div>
                  </div>
                </div>

                {/* Form Heading Area */}
                <div className="mb-6">
                  <p className="text-xs text-[#8e4767] uppercase font-bold tracking-wider mb-1">
                    Direct Merchant Enrollment
                  </p>
                  <h1 className="text-2xl sm:text-3xl text-[#1c1c19] font-black tracking-tight">
                    Register Your Salon Entity
                  </h1>
                  <p className="text-xs sm:text-sm text-[#594047] mt-1 leading-relaxed">
                    Complete merchant registration to claim your{' '}
                    <span className="text-[#b1005e] font-bold">₹500 Nexora Credit</span> and unlock priority payout rails.
                  </p>
                </div>

                {/* Duplicate Alert Banners */}
                {showDupPhone && (
                  <div className="mb-4 p-4 rounded-2xl bg-[#ffdad6] text-[#93000a] border border-[#ba1a1a]/30 shadow-xs">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[22px] text-[#ba1a1a] shrink-0">
                        warning
                      </span>
                      <div className="flex flex-col gap-1">
                        <p className="text-xs font-bold uppercase tracking-wide">
                          Duplicate Mobile Identifier Detected
                        </p>
                        <p className="text-xs leading-relaxed">
                          This mobile number (<strong className="font-bold">+91 98765 43210</strong>) is already registered with entity <em>Glow &amp; Grace Luxury Studio</em>.
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <button
                            onClick={() => setShowDupPhone(false)}
                            className="text-xs font-bold text-[#b1005e] underline cursor-pointer"
                            type="button"
                          >
                            Dismiss
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {showDupEmail && (
                  <div className="mb-4 p-4 rounded-2xl bg-[#ffdad6] text-[#93000a] border border-[#ba1a1a]/30 shadow-xs">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[22px] text-[#ba1a1a] shrink-0">
                        mark_email_unread
                      </span>
                      <div className="flex flex-col gap-1">
                        <p className="text-xs font-bold uppercase tracking-wide">
                          Official Email Already Registered
                        </p>
                        <p className="text-xs leading-relaxed">
                          <strong>salon.accounts@glowgrace.com</strong> is actively tied to a Nexora profile.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* FORM CORE */}
                <form className="space-y-4" onSubmit={handleFormSubmit}>
                  {/* Field 1: Salon Business Legal Name */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-[#1c1c19]" htmlFor="salon-name">
                        Salon Business Legal Name
                      </label>
                      <span className="text-[11px] text-[#594047] font-semibold">
                        {salonName.length} / 60
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        id="salon-name"
                        value={salonName}
                        onChange={(e) => setSalonName(e.target.value)}
                        maxLength={60}
                        placeholder="e.g. Elysian Artistry Wellness Pvt Ltd"
                        required
                        className="w-full bg-[#f6f3ee] px-4 py-3 rounded-xl text-xs sm:text-sm text-[#1c1c19] border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all"
                        type="text"
                      />
                      {salonName.length > 3 && (
                        <div className="absolute right-3.5 top-3.5 text-[#b1005e]">
                          <span className="material-symbols-outlined text-[20px]">check_circle</span>
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] text-[#594047] mt-1">
                      Must match your GST or Trade License certificate.
                    </p>
                  </div>

                  {/* Field 2: Salon Category & Proprietor Full Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#1c1c19] block mb-1" htmlFor="salon-category">
                        Salon Category
                      </label>
                      <div className="relative">
                        <select
                          id="salon-category"
                          value={salonCategory}
                          onChange={(e) => setSalonCategory(e.target.value)}
                          required
                          className="w-full bg-[#f6f3ee] px-4 py-3 rounded-xl text-xs sm:text-sm text-[#1c1c19] border border-[#e5e2dd] appearance-none focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all cursor-pointer"
                        >
                          <option disabled value="">
                            Select Business Category
                          </option>
                          <option value="unisex">Unisex Luxury Salon</option>
                          <option value="hair">Hair Studio &amp; Color Bar</option>
                          <option value="nail-skin">Nail &amp; Skin Aesthetic Lounge</option>
                          <option value="day-spa">Day Spa &amp; Holistic Wellness</option>
                        </select>
                        <div className="absolute right-3.5 top-3.5 pointer-events-none text-[#594047]">
                          <span className="material-symbols-outlined text-[20px]">expand_more</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#1c1c19] block mb-1" htmlFor="proprietor-name">
                        Proprietor Full Name
                      </label>
                      <div className="relative">
                        <input
                          id="proprietor-name"
                          value={proprietorName}
                          onChange={(e) => setProprietorName(e.target.value)}
                          placeholder="As per Government PAN Card"
                          required
                          className="w-full bg-[#f6f3ee] px-4 py-3 rounded-xl text-xs sm:text-sm text-[#1c1c19] border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all"
                          type="text"
                        />
                        {proprietorName.length > 2 && (
                          <div className="absolute right-3.5 top-3.5 text-[#b1005e]">
                            <span className="material-symbols-outlined text-[20px]">verified</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Field 3: Mobile Number with SMS Trigger */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-[#1c1c19]" htmlFor="salon-phone">
                        Proprietor Mobile Number
                      </label>
                      <span className="text-[11px] text-[#8e4767] font-semibold">
                        Instant OTP Verification
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex items-center bg-[#ebe8e3] px-3.5 py-3 rounded-xl text-xs font-bold text-[#1c1c19] shrink-0 border border-[#e5e2dd]">
                        +91
                      </div>
                      <div className="relative flex-1">
                        <input
                          id="salon-phone"
                          value={salonPhone}
                          onChange={(e) => setSalonPhone(e.target.value)}
                          maxLength={10}
                          placeholder="98765 43210"
                          required
                          className="w-full bg-[#f6f3ee] px-4 py-3 rounded-xl text-xs sm:text-sm text-[#1c1c19] border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all"
                          type="tel"
                        />
                        {salonPhone.length === 10 && (
                          <div className="absolute right-3.5 top-3.5 text-emerald-600">
                            <span className="material-symbols-outlined text-[20px]">check_circle</span>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={triggerOtp}
                        className="px-4 py-3 rounded-xl bg-[#e5e2dd] hover:bg-[#dcdad5] text-xs font-bold text-[#1c1c19] transition-colors shrink-0 cursor-pointer"
                        type="button"
                      >
                        {otpSent ? 'Resend OTP' : 'Send OTP'}
                      </button>
                    </div>
                  </div>

                  {/* Field 4: Official Email ID */}
                  <div>
                    <label className="text-xs font-bold text-[#1c1c19] block mb-1" htmlFor="salon-email">
                      Official Salon Business Email
                    </label>
                    <div className="relative">
                      <input
                        id="salon-email"
                        value={salonEmail}
                        onChange={(e) => setSalonEmail(e.target.value)}
                        placeholder="billing@elysiansalon.in"
                        required
                        className="w-full bg-[#f6f3ee] px-4 py-3 rounded-xl text-xs sm:text-sm text-[#1c1c19] border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all"
                        type="email"
                      />
                      {salonEmail.includes('@') && salonEmail.includes('.') && (
                        <div className="absolute right-3.5 top-3.5 text-emerald-600">
                          <span className="material-symbols-outlined text-[20px]">check_circle</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Field 5: City & Pin Code */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-5">
                      <label className="text-xs font-bold text-[#1c1c19] block mb-1" htmlFor="salon-pincode">
                        Postal PIN Code
                      </label>
                      <div className="relative">
                        <input
                          id="salon-pincode"
                          value={salonPincode}
                          onChange={(e) => handlePincodeChange(e.target.value)}
                          maxLength={6}
                          placeholder="560038"
                          required
                          className="w-full bg-[#f6f3ee] px-4 py-3 rounded-xl text-xs sm:text-sm text-[#1c1c19] border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all font-mono"
                          type="text"
                        />
                        <div className="absolute right-3.5 top-3.5 text-[#b1005e]">
                          <span className="material-symbols-outlined text-[20px]">location_on</span>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-7">
                      <label className="text-xs font-bold text-[#1c1c19] block mb-1">
                        Detected Zone &amp; State
                      </label>
                      <div className="flex items-center justify-between bg-[#f6f3ee] px-4 py-3 rounded-xl border border-[#e5e2dd]">
                        <div className="flex items-center gap-2 truncate">
                          <span className="w-2 h-2 rounded-full bg-[#b1005e] shrink-0" />
                          <span className="text-xs font-bold text-[#1c1c19] truncate">
                            {detectedLocation}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#594047] uppercase font-bold shrink-0">
                          Auto-Resolved
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Field 6: Password with Live Strength Meter */}
                  <div>
                    <label className="text-xs font-bold text-[#1c1c19] block mb-1" htmlFor="salon-password">
                      Create Admin Access Password
                    </label>
                    <div className="relative">
                      <input
                        id="salon-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        required
                        type={showPassword ? 'text' : 'password'}
                        className="w-full bg-[#f6f3ee] px-4 py-3 rounded-xl text-xs sm:text-sm text-[#1c1c19] border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3.5 text-[#594047] hover:text-[#1c1c19] cursor-pointer"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>

                    {/* Password Strength Metrics */}
                    <div className="mt-2 space-y-1.5 bg-[#f6f3ee] p-3 rounded-xl border border-[#e5e2dd]/60">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#594047]">Security Strength</span>
                        <span className="font-bold text-[#b1005e]">{pwdStrength.label}</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#e5e2dd] rounded-full overflow-hidden flex">
                        <div
                          className={`h-full w-1/3 transition-all duration-300 ${
                            pwdStrength.score >= 1 ? pwdStrength.color : 'bg-transparent'
                          }`}
                        />
                        <div
                          className={`h-full w-1/3 transition-all duration-300 ${
                            pwdStrength.score >= 2 ? pwdStrength.color : 'bg-transparent'
                          }`}
                        />
                        <div
                          className={`h-full w-1/3 transition-all duration-300 ${
                            pwdStrength.score >= 3 ? pwdStrength.color : 'bg-transparent'
                          }`}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-1 pt-1 text-[11px]">
                        <div
                          className={`flex items-center gap-1 ${
                            password.length >= 8 ? 'text-[#b1005e] font-bold' : 'text-[#594047]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            {password.length >= 8 ? 'check' : 'circle'}
                          </span>
                          <span>8+ Chars</span>
                        </div>
                        <div
                          className={`flex items-center gap-1 ${
                            /[A-Z]/.test(password) && /[a-z]/.test(password)
                              ? 'text-[#b1005e] font-bold'
                              : 'text-[#594047]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            {/[A-Z]/.test(password) && /[a-z]/.test(password) ? 'check' : 'circle'}
                          </span>
                          <span>Upper &amp; Lower</span>
                        </div>
                        <div
                          className={`flex items-center gap-1 ${
                            /[0-9!@#$%^&*]/.test(password)
                              ? 'text-[#b1005e] font-bold'
                              : 'text-[#594047]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[14px]">
                            {/[0-9!@#$%^&*]/.test(password) ? 'check' : 'circle'}
                          </span>
                          <span>Symbol &amp; Num</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mandatory Partner Attribution Agreement */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        checked={attributionConsent}
                        onChange={(e) => setAttributionConsent(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded text-[#b1005e] accent-[#b1005e] cursor-pointer shrink-0"
                        required
                        type="checkbox"
                      />
                      <span className="text-xs text-[#594047] leading-relaxed">
                        I agree to the <strong className="text-[#b1005e]">Nexora Merchant Master Terms</strong>, RBI Merchant Guidelines, and verify that the partner referral attribution (
                        <strong className="text-[#b1005e]">Growth Partner #REF-5A45019655</strong>) displayed above is accurate and authorized for my onboarding allocation.
                      </span>
                    </label>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      className="w-full sm:flex-1 py-4 px-6 rounded-full bg-[#d91b77] hover:bg-[#b1005e] text-white font-extrabold text-sm shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      type="submit"
                    >
                      <span>Create Salon Account &amp; Claim ₹500 Bonus</span>
                      <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                    </button>
                    <button
                      onClick={() => {
                        if (onNavigateToHub) onNavigateToHub();
                      }}
                      className="w-full sm:w-auto px-6 py-4 rounded-full bg-[#f0ede9] hover:bg-[#e5e2dd] text-[#1c1c19] font-bold text-xs text-center transition-colors cursor-pointer"
                      type="button"
                    >
                      Already Registered? Log In
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* RIGHT: INCENTIVE CALCULATOR & PARTNER CREDENTIALS (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Partner Trust Bento Card */}
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-md border border-[#e5e2dd] flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-[#b1005e]">
                      <img
                        className="w-full h-full object-cover"
                        alt="Growth Partner Advisor"
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-[#1c1c19]">Growth Partner [DEV SAMPLE]</h3>
                      <p className="text-[11px] text-[#594047]">
                        Nexora Senior Growth Advisor • Bengaluru Metro
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#ffe088] text-[#241a00] text-[10px] font-extrabold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">military_tech</span>
                    Tier 1
                  </span>
                </div>

                <div className="bg-[#f6f3ee] rounded-2xl p-4 space-y-2 border border-[#e5e2dd]/60 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#594047]">Merchant Portfolios Scaled</span>
                    <span className="font-bold text-[#1c1c19]">148 Luxury Salons</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#594047]">Annualized GMV Processed</span>
                    <span className="font-extrabold text-[#b1005e]">₹28.4 Cr</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#594047]">Average Onboarding Velocity</span>
                    <span className="font-bold text-[#1c1c19]">14 Minutes</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-xl bg-[#f0ede9] text-xs text-[#594047] leading-relaxed">
                  <span className="material-symbols-outlined text-[#b1005e] text-[20px] shrink-0">
                    verified_user
                  </span>
                  <p>
                    Attributed onboarding guarantees Marcus serves as your direct point of contact for hardware dispatch, POS terminals, and MDR rates.
                  </p>
                </div>
              </div>

              {/* Salon Welcome Perks Breakdown */}
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-md border border-[#e5e2dd] space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-extrabold text-[#1c1c19]">
                    Partner Onboarding Benefits
                  </h2>
                  <span className="material-symbols-outlined text-[#b1005e] text-[24px]">
                    redeem
                  </span>
                </div>

                <div className="space-y-3">
                  {/* Perk 1 */}
                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd]/60">
                    <div className="w-9 h-9 rounded-xl bg-[#ffd9e2] text-[#b1005e] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px]">
                        account_balance_wallet
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-bold text-[#1c1c19]">₹500 Instant Credit</p>
                        <span className="text-[10px] text-[#b1005e] font-bold">Auto-Deposited</span>
                      </div>
                      <p className="text-[11px] text-[#594047] mt-0.5 leading-relaxed">
                        Pre-credited to your Nexora Merchant settlement wallet upon GST verification.
                      </p>
                    </div>
                  </div>

                  {/* Perk 2 */}
                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd]/60">
                    <div className="w-9 h-9 rounded-xl bg-[#ffe088] text-[#735c00] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px]">savings</span>
                    </div>
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-bold text-[#1c1c19]">0% MDR for 30 Days</p>
                        <span className="text-[10px] text-[#735c00] font-bold">Save ~₹14,500</span>
                      </div>
                      <p className="text-[11px] text-[#594047] mt-0.5 leading-relaxed">
                        Zero merchant discount rate fees across UPI, RuPay, and Visa/Mastercard debit cards.
                      </p>
                    </div>
                  </div>

                  {/* Perk 3 */}
                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd]/60">
                    <div className="w-9 h-9 rounded-xl bg-[#fda4c9]/40 text-[#8e4767] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px]">qr_code_2</span>
                    </div>
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-bold text-[#1c1c19]">Smart Soundbox &amp; Stand</p>
                        <span className="text-[10px] text-[#8e4767] font-bold">Zero Setup Fee</span>
                      </div>
                      <p className="text-[11px] text-[#594047] mt-0.5 leading-relaxed">
                        4G LTE audio-announcement unit plus dual-sided branded NFC tap-to-pay counter stand.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Priority Dispatch Preview */}
                <div className="p-3 bg-[#31302d] rounded-2xl text-white flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#ffd9e2] text-[18px]">
                      local_shipping
                    </span>
                    <span className="font-semibold">Priority Dispatch via BlueDart</span>
                  </div>
                  <span className="text-[10px] text-zinc-300 font-mono">Ref #NEX-HW-88</span>
                </div>
              </div>

              {/* Live Salon Territory Map & Settlement Hub */}
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-md border border-[#e5e2dd] space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#b1005e] text-[20px]">hub</span>
                    <span className="text-xs font-bold text-[#1c1c19]">
                      Indiranagar Regional Banking Node
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    99.98% Payout SLA
                  </span>
                </div>
                <p className="text-xs text-[#594047] leading-relaxed">
                  Linked directly to ICICI / HDFC nodal processing for 15-minute batched T+0 payouts directly to your business account.
                </p>
                <div className="p-3 bg-[#f6f3ee] rounded-2xl border border-[#e5e2dd] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#b1005e] animate-ping" />
                    <span className="font-bold text-[#1c1c19]">Partner Onboarding Corridor</span>
                  </div>
                  <span className="text-[10px] text-[#594047] font-semibold">Live Territory</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL 1: LOADING OVERLAY */}
      {isLoadingOverlay && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center text-center border border-[#e5e2dd]">
            <div className="w-16 h-16 rounded-full border-4 border-[#ffd9e2] border-t-[#b1005e] animate-spin mb-4" />
            <h4 className="text-lg font-black text-[#1c1c19] mb-1">Verifying Credentials</h4>
            <p className="text-xs sm:text-sm text-[#594047] mb-4">
              Locking attribution to <strong className="text-[#b1005e]">Growth Partner (REF-5A45019655)</strong> and generating 256-bit salon cryptographic token...
            </p>
            <div className="w-full bg-[#f0ede9] rounded-full h-2 overflow-hidden mb-2">
              <div className="bg-[#b1005e] h-full w-2/3 animate-pulse" />
            </div>
            <span className="text-[10px] text-[#594047] font-mono">
              SEBI/RBI Gateway Handshake In Progress
            </span>
          </div>
        </div>
      )}

      {/* MODAL 2: SUCCESS / CONFIRMATION MODAL */}
      {isSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col relative overflow-hidden border border-[#e5e2dd]">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#d91b77] text-white flex items-center justify-center shrink-0 shadow-md">
                <span className="material-symbols-outlined text-[28px]">check</span>
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-[#ffd9e2] text-[#b1005e] font-extrabold uppercase">
                  Registration Initiated
                </span>
                <h3 className="text-xl font-black text-[#1c1c19]">Welcome to Nexora!</h3>
              </div>
            </div>

            <div className="bg-[#f6f3ee] rounded-2xl p-4 space-y-2 mb-4 border border-[#e5e2dd] text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#594047]">Attributed Partner</span>
                <span className="font-bold text-[#1c1c19]">Growth Partner (#REF-5A45019655)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#594047]">Welcome Bonus Allocated</span>
                <span className="font-bold text-[#b1005e]">₹500 Instant Credit</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#594047]">Verification Mobile</span>
                <span className="font-mono text-[#1c1c19]">
                  +91 {salonPhone || '98765 43210'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#594047]">Assigned Portal Hub</span>
                <span className="font-semibold text-[#1c1c19]">Bengaluru East Salon Grid</span>
              </div>
            </div>

            <p className="text-xs text-[#594047] mb-6 leading-relaxed">
              Please check your registered phone for the 6-digit SMS verification code to finalize statutory GST/PAN verification and schedule hardware delivery.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setIsSuccessModal(false);
                  if (onNavigateToReferralTimeline) onNavigateToReferralTimeline();
                }}
                className="flex-1 py-3.5 rounded-full bg-[#d91b77] hover:bg-[#b1005e] text-white font-extrabold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
                type="button"
              >
                Track Referral Timeline &amp; Status →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full bg-white border-t border-[#e5e2dd] py-6 text-xs text-[#594047]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span>© 2025 Nexora Fintech Ecosystem. Partner Authorization Portal.</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-[#8e4767] font-semibold">ISO 27001 Certified Infrastructure</span>
          </div>
          <div className="flex items-center gap-6 flex-wrap justify-center">
            <div className="flex items-center gap-1.5 text-[#b1005e] font-bold">
              <span className="material-symbols-outlined text-[16px]">support_agent</span>
              <span>Dedicated Salon Desk: 1800-891-NEXO</span>
            </div>
            <span className="hover:text-[#1c1c19] cursor-pointer">Regulatory Disclosures</span>
            <span className="hover:text-[#1c1c19] cursor-pointer">Privacy Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
