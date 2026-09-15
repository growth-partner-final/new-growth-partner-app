import React, { useState, useEffect } from 'react';
import { NotificationBell } from './NotificationBell';

interface SalonStepAuditWorkspaceScreenProps {
  onNavigateToHub?: () => void;
  onNavigateToSalonIntelligence?: () => void;
  onNavigateToLeaderboard?: () => void;
  onNavigateToReferralTimeline?: () => void;
  onNavigateToShareEarn?: () => void;
  onNavigateToAddSalon?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToMerchantRegister?: () => void;
  onNavigateToLockedOnboarding?: () => void;
}

export const SalonStepAuditWorkspaceScreen: React.FC<SalonStepAuditWorkspaceScreenProps> = ({
  onNavigateToHub,
  onNavigateToSalonIntelligence,
  onNavigateToLeaderboard,
  onNavigateToReferralTimeline,
  onNavigateToShareEarn,
  onNavigateToAddSalon,
  onNavigateToDashboard,
  onNavigateToMerchantRegister,
  onNavigateToLockedOnboarding
}) => {
  const [currentStep, setCurrentStep] = useState<number>(3);
  const totalSteps = 5;

  // Step 1: Owner Details State
  const [ownerLegalName, setOwnerLegalName] = useState<string>('Rahul Sharma');
  const [ownerMobile, setOwnerMobile] = useState<string>('+91 98421 04472');
  const [ownerEmail, setOwnerEmail] = useState<string>('rahul.elegance@gmail.com');
  const [isWhatsappSame, setIsWhatsappSame] = useState<boolean>(true);
  const [panNumber, setPanNumber] = useState<string>('ABCPS4928M');

  // Step 2: Salon Profile State
  const [salonTradeName, setSalonTradeName] = useState<string>('Elegance Hair & Beauty Studio');
  const [salonCategory, setSalonCategory] = useState<string>('Luxury Unisex Salon');
  const [yearsInBusiness, setYearsInBusiness] = useState<string>('5+ Years (Established 2019)');
  const [seniorStylists, setSeniorStylists] = useState<string>('8 Senior Stylists');
  const [careAssistants, setCareAssistants] = useState<string>('4 Care Assistants');
  const [storeBio, setStoreBio] = useState<string>(
    'Premier styling haven catering to modern urban trends with ammonia-free colors, clinical scalp therapies, and artisanal bridal makeovers. Equipped with 12 state-of-the-art styling stations and dedicated private VIP treatment suites.'
  );

  // Step 3: Address & Location State
  const [streetAddress, setStreetAddress] = useState<string>(
    'Flat 204, 2nd Floor, Indiranagar 100ft Road, HAL 2nd Stage'
  );
  const [stateName, setStateName] = useState<string>('Karnataka');
  const [districtName, setDistrictName] = useState<string>('Bengaluru Urban');
  const [cityName, setCityName] = useState<string>('Bengaluru');
  const [localityLandmark, setLocalityLandmark] = useState<string>(
    "Opposite Metro Pillar 124, Near Glen's Bakehouse"
  );
  const [pincode, setPincode] = useState<string>('560038');
  const [floorAccessibility, setFloorAccessibility] = useState<string>(
    'Second Floor with Dedicated Commercial Elevator'
  );

  // Step 4: Business Operations State
  const [operatingHoursStart, setOperatingHoursStart] = useState<string>('09:30 AM');
  const [operatingHoursEnd, setOperatingHoursEnd] = useState<string>('09:00 PM');
  const [weeklyOffDay, setWeeklyOffDay] = useState<string>('None (Open 7 Days a Week)');
  const [servicesList, setServicesList] = useState<string[]>([
    'Bridal & Pre-Bridal',
    'Advanced Keratin Treatments',
    'Organic Scalp Spa',
    'Gel Nail Extensions & Art'
  ]);
  const [clientVolume, setClientVolume] = useState<string>('350 - 450 Verified Clients / month');
  const [averageTicket, setAverageTicket] = useState<string>('₹1,850 - ₹2,400');

  // Step 5: Review & Consent State
  const [consentSettlement, setConsentSettlement] = useState<boolean>(true);
  const [consentRbi, setConsentRbi] = useState<boolean>(true);
  const [consentPartner, setConsentPartner] = useState<boolean>(true);

  // UI States
  const [showErrorBanner, setShowErrorBanner] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [slaCountdown, setSlaCountdown] = useState<string>('03h 48m 15s');
  const [autosaveTime, setAutosaveTime] = useState<string>('just now');
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState<boolean>(false);

  // SLA Live Timer countdown
  useEffect(() => {
    let totalSecs = 3 * 3600 + 48 * 60 + 15;
    const interval = setInterval(() => {
      if (totalSecs > 0) {
        totalSecs--;
        const h = Math.floor(totalSecs / 3600);
        const m = Math.floor((totalSecs % 3600) / 60);
        const s = totalSecs % 60;
        setSlaCountdown(
          `${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`
        );
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      setAutosaveTime('just now');
      showToast(`Saved Step ${currentStep} successfully!`);
    } else {
      setIsSubmittedSuccess(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const stepLabels: Record<number, string> = {
    1: 'Save & Continue to Salon Profile',
    2: 'Save & Continue to Address & Location',
    3: 'Save & Continue to Business Details',
    4: 'Save & Continue to Review & Consent',
    5: 'Submit Application for Underwriting'
  };

  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  const addServiceItem = () => {
    const newService = window.prompt('Enter new salon specialty/service:');
    if (newService && newService.trim()) {
      setServicesList(prev => [...prev, newService.trim()]);
      showToast(`Added "${newService.trim()}" to salon catalog.`);
    }
  };

  return (
    <div className="bg-[#fcf9f4] font-sans text-[#1c1c19] min-h-screen flex flex-col justify-between relative selection:bg-[#fda4c9]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#31302d] text-white shadow-xl animate-in fade-in slide-in-from-top-4 duration-200 border border-white/10 max-w-sm text-center">
          <span className="material-symbols-outlined text-[18px] text-[#ffe088]">check_circle</span>
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Top Fixed Header */}
      <header className="fixed top-8 sm:top-7 inset-x-0 z-40 bg-[#fcf9f4]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(74,14,46,0.04)] border-b border-[#e5e2dd]">
        <div className="h-20 max-w-6xl mx-auto px-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#b1005e] to-[#d91b77] text-white flex items-center justify-center font-black text-lg shadow-sm">
              N
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black text-[#1c1c19] tracking-tight leading-none">
                Nexora
              </span>
              <span className="text-[11px] font-bold text-[#8e4767] uppercase tracking-wider">
                Growth Partner Portal
              </span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffd8e5] text-[#3c0223] text-xs font-bold border border-[#fda4c9]/60">
              <span className="material-symbols-outlined text-[16px] text-[#b1005e]">lock</span>
              <span>Referral: REF-5A45019655 (Locked)</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5 text-[#594047] text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b1005e] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b1005e]" />
              </span>
              <span>Autosaved {autosaveTime}</span>
            </div>

            <NotificationBell onNavigateToReferrals={onNavigateToReferralTimeline} />

            <button
              onClick={() => {
                if (onNavigateToSalonIntelligence) onNavigateToSalonIntelligence();
              }}
              className="hidden lg:inline-flex items-center px-4 py-2 rounded-full bg-[#ebe8e3] text-[#1c1c19] text-xs font-bold hover:bg-[#e5e2dd] transition-all cursor-pointer border border-[#e5e2dd]"
              type="button"
            >
              Exit / Resume Later
            </button>

            <button
              onClick={() => {
                if (onNavigateToLeaderboard) onNavigateToLeaderboard();
              }}
              className="w-9 h-9 rounded-full bg-[#b1005e] text-white flex items-center justify-center shrink-0 shadow-sm cursor-pointer hover:opacity-90"
              type="button"
              title="View Leaderboard"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full pt-32 pb-24 bg-[#fcf9f4]">
        <div className="max-w-6xl mx-auto py-4 px-4 space-y-6">
          {/* Top Sticky Context & Locked Referral Banner */}
          <div className="w-full flex flex-col gap-3">
            <div className="w-full bg-[#f6f3ee] rounded-2xl p-4 sm:p-5 shadow-xs border border-[#e5e2dd] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-[#ffd8e5] flex items-center justify-center shrink-0 text-[#b1005e] shadow-xs">
                  <span className="material-symbols-outlined text-[24px]">verified</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] uppercase tracking-wider text-[#8e4767] font-extrabold">
                      Partner Referral Applied:
                    </span>
                    <span className="text-sm sm:text-base font-black text-[#1c1c19] font-mono">
                      REF-5A45019655
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#fda4c9]/40 text-[#3c0223] text-[11px] font-bold">
                      <span className="material-symbols-outlined text-[12px]">lock</span> Verified Attribution
                    </span>
                  </div>
                  <span className="text-xs text-[#594047] mt-0.5">
                    Attributed to <strong className="text-[#1c1c19]">Growth Partner [DEV SAMPLE]</strong> (Partner Referral Network)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 self-stretch md:self-auto justify-between md:justify-end">
                <div className="flex items-center gap-2 text-[#594047] text-xs font-semibold bg-[#f0ede9] px-3 py-1.5 rounded-full border border-[#e5e2dd]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b1005e] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b1005e]" />
                  </span>
                  <span>Synced (Draft #NX-ONB-941)</span>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-[#e5e2dd] text-[#1c1c19] text-xs font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">schedule</span>
                  <span>Draft retained 14d</span>
                </div>
              </div>
            </div>

            {/* Step Preview Toolbar */}
            <div className="w-full bg-[#ebe8e3] rounded-xl px-4 py-2.5 flex items-center justify-between overflow-x-auto gap-3 border border-[#e5e2dd]">
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="material-symbols-outlined text-[18px] text-[#8e4767]">tune</span>
                <span className="text-xs font-extrabold text-[#1c1c19] uppercase tracking-wider">
                  Step Preview Toolbar:
                </span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {[1, 2, 3, 4, 5].map(stepNum => {
                  const names = ['1. Owner', '2. Salon', '3. Address (Live)', '4. Business', '5. Consent & Audit'];
                  return (
                    <button
                      key={stepNum}
                      onClick={() => setCurrentStep(stepNum)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        currentStep === stepNum
                          ? 'bg-[#b1005e] text-white shadow-xs'
                          : 'bg-[#e5e2dd] text-[#594047] hover:text-[#1c1c19] hover:bg-[#dcdad5]'
                      }`}
                      type="button"
                    >
                      {names[stepNum - 1]}
                    </button>
                  );
                })}
                <button
                  onClick={() => setShowErrorBanner(!showErrorBanner)}
                  className="ml-2 px-3 py-1 rounded-full text-xs font-bold transition-all bg-[#ffdad6] text-[#93000a] flex items-center gap-1 hover:opacity-90 cursor-pointer border border-[#ba1a1a]/30"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[14px]">warning</span>
                  <span>{showErrorBanner ? 'Hide Error Demo' : 'Error State'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* 5-Step Visual Stepper Bar */}
          <div className="w-full bg-white/95 backdrop-blur-xl rounded-2xl p-5 sm:p-6 shadow-sm border border-[#e5e2dd]">
            <div className="grid grid-cols-5 gap-2 relative">
              {[
                { num: 1, label: 'Owner Details', desc: 'Completed' },
                { num: 2, label: 'Salon Profile', desc: 'Completed' },
                { num: 3, label: 'Address & Location', desc: 'In Progress' },
                { num: 4, label: 'Business Operations', desc: 'Upcoming' },
                { num: 5, label: 'Review & Consent', desc: 'Upcoming' }
              ].map(step => {
                const isCompleted = step.num < currentStep;
                const isActive = step.num === currentStep;

                return (
                  <div
                    key={step.num}
                    onClick={() => setCurrentStep(step.num)}
                    className="flex flex-col items-center text-center cursor-pointer group"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-xs transition-transform group-hover:scale-105 ${
                        isCompleted
                          ? 'bg-[#8e4767] text-white'
                          : isActive
                          ? 'bg-[#d91b77] text-white ring-4 ring-[#d91b77]/20 shadow-sm'
                          : 'bg-[#ebe8e3] text-[#594047]'
                      }`}
                    >
                      {isCompleted ? (
                        <span className="material-symbols-outlined text-[20px]">check</span>
                      ) : (
                        <span>0{step.num}</span>
                      )}
                    </div>
                    <span
                      className={`text-xs font-bold mt-2 truncate max-w-[90px] sm:max-w-none ${
                        isActive ? 'text-[#b1005e]' : 'text-[#1c1c19]'
                      }`}
                    >
                      {step.label}
                    </span>
                    <span
                      className={`text-[11px] font-semibold ${
                        isActive
                          ? 'text-[#b1005e] font-extrabold'
                          : isCompleted
                          ? 'text-[#8e4767]'
                          : 'text-[#594047]/70'
                      }`}
                    >
                      {isCompleted ? 'Completed' : isActive ? 'In Progress' : 'Upcoming'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Micro progress line */}
            <div className="w-full bg-[#ebe8e3] h-1.5 rounded-full mt-5 overflow-hidden">
              <div
                className="bg-[#d91b77] h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Validation Error Notification Banner (Toggleable) */}
          {showErrorBanner && (
            <div className="w-full bg-[#ffdad6] text-[#93000a] p-5 rounded-2xl shadow-sm border border-[#ba1a1a]/30 animate-in fade-in duration-200">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[26px] text-[#ba1a1a] shrink-0 mt-0.5">
                  error
                </span>
                <div className="flex flex-col gap-1.5 flex-1">
                  <span className="text-base font-extrabold text-[#ba1a1a]">
                    Form Incomplete: 2 Required Items Need Attention
                  </span>
                  <p className="text-xs sm:text-sm leading-relaxed">
                    Before moving to Step 4, ensure all statutory location coordinates and landmarks match your commercial lease documentation.
                  </p>
                  <div className="flex flex-col gap-1 mt-1 text-xs font-bold">
                    <button
                      onClick={() => {
                        setCurrentStep(3);
                        showToast('Navigated to Landmark field in Step 3');
                      }}
                      className="underline text-left hover:opacity-80 cursor-pointer"
                      type="button"
                    >
                      • Landmark / Locality verification missing nearest Metro station or street node
                    </button>
                    <button
                      onClick={() => {
                        setCurrentStep(3);
                        showToast('Navigated to PIN code GPS field in Step 3');
                      }}
                      className="underline text-left hover:opacity-80 cursor-pointer"
                      type="button"
                    >
                      • Postal PIN 560038 requires high-precision GPS storefront geotag confirm
                    </button>
                  </div>
                </div>
                <button
                  className="text-[#93000a] hover:opacity-75 cursor-pointer"
                  onClick={() => setShowErrorBanner(false)}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
            </div>
          )}

          {/* Main Grid: 70% Form Area | 30% Right Rail */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT PANEL: Multi-Step Forms (8 Cols) */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* STEP 1: OWNER DETAILS */}
              {currentStep === 1 && (
                <section className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-sm border border-[#e5e2dd] space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-4 border-b border-[#e5e2dd]">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-[#8e4767] text-white flex items-center justify-center font-bold text-xs">
                        1
                      </span>
                      <div>
                        <h2 className="text-xl font-black text-[#1c1c19]">
                          Salon Owner Legal Identification
                        </h2>
                        <p className="text-xs text-[#594047]">
                          Primary legal beneficiary for daily settlements and tax reporting.
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#ffd8e5] text-[#3c0223] text-xs font-extrabold flex items-center gap-1 border border-[#fda4c9]/60">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      Verified Step
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#1c1c19]">
                        Owner Legal Full Name (As per PAN / Aadhaar)
                      </label>
                      <div className="relative flex items-center">
                        <input
                          className="w-full px-4 py-3 bg-[#f6f3ee] rounded-xl text-xs sm:text-sm text-[#1c1c19] border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all"
                          type="text"
                          value={ownerLegalName}
                          onChange={(e) => setOwnerLegalName(e.target.value)}
                        />
                        <span className="material-symbols-outlined text-[#8e4767] absolute right-3 text-[20px]">
                          badge
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#1c1c19]">Primary Mobile Number</label>
                      <div className="flex items-center gap-2">
                        <input
                          className="w-full px-4 py-3 bg-[#f6f3ee] rounded-xl text-xs sm:text-sm text-[#1c1c19] border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all"
                          type="tel"
                          value={ownerMobile}
                          onChange={(e) => setOwnerMobile(e.target.value)}
                        />
                        <span className="px-3 py-2.5 rounded-xl bg-[#ffd8e5] text-[#3c0223] text-xs font-extrabold shrink-0 flex items-center gap-1 border border-[#fda4c9]/60">
                          <span className="material-symbols-outlined text-[14px]">verified</span> OTP OK
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#1c1c19]">
                        WhatsApp Notification Contact
                      </label>
                      <div className="flex items-center justify-between p-3 bg-[#f6f3ee] rounded-xl border border-[#e5e2dd]">
                        <span className="text-xs text-[#1c1c19]">
                          Same as Primary Mobile ({ownerMobile})
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsWhatsappSame(!isWhatsappSame)}
                          className={`w-9 h-5 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                            isWhatsappSame ? 'bg-[#b1005e]' : 'bg-[#e5e2dd]'
                          }`}
                        >
                          <span
                            className={`w-4 h-4 bg-white rounded-full block shadow-xs transition-transform ${
                              isWhatsappSame ? 'translate-x-4' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#1c1c19]">Official Business Email</label>
                      <div className="relative flex items-center">
                        <input
                          className="w-full px-4 py-3 bg-[#f6f3ee] rounded-xl text-xs sm:text-sm text-[#1c1c19] border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all"
                          type="email"
                          value={ownerEmail}
                          onChange={(e) => setOwnerEmail(e.target.value)}
                        />
                        <span className="material-symbols-outlined text-[#8e4767] absolute right-3 text-[20px]">
                          mark_email_read
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#8e4767] text-[22px]">
                        id_card
                      </span>
                      <span className="text-xs text-[#1c1c19]">
                        PAN Verification: <strong className="font-mono">{panNumber}</strong>
                      </span>
                    </div>
                    <span className="text-xs font-extrabold text-[#8e4767]">
                      Aadhaar e-KYC Complete ✓
                    </span>
                  </div>
                </section>
              )}

              {/* STEP 2: SALON DETAILS */}
              {currentStep === 2 && (
                <section className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-sm border border-[#e5e2dd] space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-4 border-b border-[#e5e2dd]">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-[#8e4767] text-white flex items-center justify-center font-bold text-xs">
                        2
                      </span>
                      <div>
                        <h2 className="text-xl font-black text-[#1c1c19]">
                          Salon Identity &amp; Brand Profile
                        </h2>
                        <p className="text-xs text-[#594047]">
                          Store storefront setup, staff composition, and consumer positioning.
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#ffd8e5] text-[#3c0223] text-xs font-extrabold flex items-center gap-1 border border-[#fda4c9]/60">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      Completed
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#1c1c19]">Salon Trade / Brand Name</label>
                      <input
                        className="w-full px-4 py-3 bg-[#f6f3ee] rounded-xl text-xs sm:text-sm text-[#1c1c19] border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all"
                        type="text"
                        value={salonTradeName}
                        onChange={(e) => setSalonTradeName(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#1c1c19]">Salon Category</label>
                      <select
                        className="w-full px-4 py-3 bg-[#f6f3ee] rounded-xl text-xs sm:text-sm text-[#1c1c19] border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all"
                        value={salonCategory}
                        onChange={(e) => setSalonCategory(e.target.value)}
                      >
                        <option>Luxury Unisex Salon</option>
                        <option>Hair &amp; Scalp Specialized Studio</option>
                        <option>Ayurvedic Spa &amp; Wellness Retreat</option>
                        <option>Boutique Nail Bar &amp; Lash Studio</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#1c1c19]">Years in Business</label>
                      <input
                        className="w-full px-4 py-3 bg-[#f6f3ee] rounded-xl text-xs sm:text-sm text-[#1c1c19] border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all"
                        type="text"
                        value={yearsInBusiness}
                        onChange={(e) => setYearsInBusiness(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#1c1c19]">Staff &amp; Stylist Headcount</label>
                      <div className="flex items-center gap-2">
                        <input
                          className="w-1/2 px-4 py-3 bg-[#f6f3ee] rounded-xl text-xs sm:text-sm text-[#1c1c19] border border-[#e5e2dd]"
                          type="text"
                          value={seniorStylists}
                          onChange={(e) => setSeniorStylists(e.target.value)}
                        />
                        <input
                          className="w-1/2 px-4 py-3 bg-[#f6f3ee] rounded-xl text-xs sm:text-sm text-[#1c1c19] border border-[#e5e2dd]"
                          type="text"
                          value={careAssistants}
                          onChange={(e) => setCareAssistants(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2 flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-[#1c1c19]">Store Bio &amp; Specialization</label>
                        <span className="text-[11px] text-[#594047]">
                          {storeBio.length} / 500 characters
                        </span>
                      </div>
                      <textarea
                        className="w-full px-4 py-3 bg-[#f6f3ee] rounded-xl text-xs sm:text-sm text-[#1c1c19] border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all"
                        rows={3}
                        value={storeBio}
                        onChange={(e) => setStoreBio(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-[#8e4767] to-[#d91b77] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <span className="material-symbols-outlined text-[28px]">storefront</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-extrabold text-[#1c1c19]">Storefront Photo Uploaded</span>
                      <span className="text-[11px] text-[#594047]">
                        IMG_Elegance_FrontDesk_2025.webp • Geo-tagged (Lat: 12.9783, Long: 77.6408)
                      </span>
                      <span className="text-[11px] text-[#8e4767] font-bold mt-0.5">
                        Ready for compliance physical matching
                      </span>
                    </div>
                  </div>
                </section>
              )}

              {/* STEP 3: ADDRESS & LOCATION (Active Focus) */}
              {currentStep === 3 && (
                <section className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-sm border border-[#e5e2dd] space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-start justify-between pb-4 border-b border-[#e5e2dd]">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-[#d91b77] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                        3
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-xl font-black text-[#1c1c19]">
                            Salon Location &amp; Terminal Dispatch Address
                          </h2>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#ffd9e2] text-[#b1005e] text-[11px] font-black">
                            Active Section
                          </span>
                        </div>
                        <p className="text-xs text-[#594047] mt-0.5">
                          This physical location will be registered for RBI POS geofencing and physical hardware delivery.
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-1 text-[#b1005e] text-xs font-bold">
                      <span className="material-symbols-outlined text-[18px]">gps_fixed</span>
                      <span>GPS Pin Verified</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#1c1c19]">Full Commercial Street Address</label>
                      <input
                        className="w-full px-4 py-3 bg-[#f6f3ee] rounded-xl text-xs sm:text-sm text-[#1c1c19] border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all"
                        type="text"
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#1c1c19]">State</label>
                      <select
                        className="w-full px-4 py-3 bg-[#f6f3ee] rounded-xl text-xs sm:text-sm text-[#1c1c19] border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all"
                        value={stateName}
                        onChange={(e) => setStateName(e.target.value)}
                      >
                        <option>Karnataka</option>
                        <option>Maharashtra</option>
                        <option>Tamil Nadu</option>
                        <option>Telangana</option>
                        <option>Delhi NCR</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#1c1c19]">District</label>
                      <input
                        className="w-full px-4 py-3 bg-[#f6f3ee] rounded-xl text-xs sm:text-sm text-[#1c1c19] border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all"
                        type="text"
                        value={districtName}
                        onChange={(e) => setDistrictName(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#1c1c19]">City / Municipal Ward</label>
                      <input
                        className="w-full px-4 py-3 bg-[#f6f3ee] rounded-xl text-xs sm:text-sm text-[#1c1c19] border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all"
                        type="text"
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#1c1c19]">Locality &amp; Prominent Landmark</label>
                      <input
                        className="w-full px-4 py-3 bg-[#f6f3ee] rounded-xl text-xs sm:text-sm text-[#1c1c19] border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all"
                        type="text"
                        value={localityLandmark}
                        onChange={(e) => setLocalityLandmark(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-[#1c1c19]">Postal PIN Code</label>
                        <span className="text-[11px] text-[#8e4767] font-bold">Bangalore Metro Zone A</span>
                      </div>
                      <div className="relative flex items-center">
                        <input
                          className="w-full px-4 py-3 bg-[#f6f3ee] rounded-xl text-xs sm:text-sm text-[#1c1c19] font-mono font-bold border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all"
                          type="text"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                        />
                        <span className="px-2.5 py-1 rounded-lg bg-[#ffd8e5] text-[#3c0223] text-[11px] font-extrabold absolute right-3 border border-[#fda4c9]/60">
                          Core Delivery Zone
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#1c1c19]">
                        Storefront Floor &amp; Entry Accessibility
                      </label>
                      <input
                        className="w-full px-4 py-3 bg-[#f6f3ee] rounded-xl text-xs sm:text-sm text-[#1c1c19] border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all"
                        type="text"
                        value={floorAccessibility}
                        onChange={(e) => setFloorAccessibility(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Inline Visual Map Geotag Preview */}
                  <div className="p-4 bg-[#f6f3ee] rounded-2xl border border-[#e5e2dd] flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-full sm:w-44 h-28 bg-gradient-to-tr from-[#ebe8e3] to-[#dcdad5] rounded-xl flex items-center justify-center relative shrink-0 border border-[#e5e2dd] shadow-inner">
                      <div className="w-9 h-9 rounded-full bg-[#d91b77] text-white flex items-center justify-center shadow-md animate-bounce">
                        <span className="material-symbols-outlined text-[20px]">location_on</span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center gap-1 w-full">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-[#1c1c19]">
                          Soundbox &amp; QR Delivery Address Confirmed
                        </span>
                        <span className="material-symbols-outlined text-[#8e4767] text-[18px]">
                          local_shipping
                        </span>
                      </div>
                      <p className="text-xs text-[#594047] leading-relaxed">
                        Nexora Express Courier will ship the smart soundbox to <strong className="text-[#1c1c19]">{streetAddress}</strong> within 24 hours of admin compliance approval.
                      </p>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px]">
                        <span className="font-bold text-[#8e4767]">Coordinates: 12.9719° N, 77.6412° E</span>
                        <span className="text-[#594047]">• Accuracy: ±3m</span>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* STEP 4: BUSINESS DETAILS */}
              {currentStep === 4 && (
                <section className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-sm border border-[#e5e2dd] space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-4 border-b border-[#e5e2dd]">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-[#ebe8e3] text-[#1c1c19] flex items-center justify-center font-bold text-xs">
                        4
                      </span>
                      <div>
                        <h2 className="text-xl font-black text-[#1c1c19]">
                          Operating Model &amp; Revenue Estimation
                        </h2>
                        <p className="text-xs text-[#594047]">
                          Configure business hours, peak footfall, and catalog offerings.
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#ebe8e3] text-[#594047] text-xs font-bold">
                      Upcoming Step
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#1c1c19]">Daily Operating Hours</label>
                      <div className="flex items-center gap-2">
                        <input
                          className="w-1/2 px-4 py-3 bg-[#f6f3ee] rounded-xl text-xs sm:text-sm text-[#1c1c19] border border-[#e5e2dd]"
                          type="text"
                          value={operatingHoursStart}
                          onChange={(e) => setOperatingHoursStart(e.target.value)}
                        />
                        <span className="text-[#594047] font-bold text-xs">to</span>
                        <input
                          className="w-1/2 px-4 py-3 bg-[#f6f3ee] rounded-xl text-xs sm:text-sm text-[#1c1c19] border border-[#e5e2dd]"
                          type="text"
                          value={operatingHoursEnd}
                          onChange={(e) => setOperatingHoursEnd(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#1c1c19]">Weekly Off Day</label>
                      <select
                        className="w-full px-4 py-3 bg-[#f6f3ee] rounded-xl text-xs sm:text-sm text-[#1c1c19] border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all"
                        value={weeklyOffDay}
                        onChange={(e) => setWeeklyOffDay(e.target.value)}
                      >
                        <option>None (Open 7 Days a Week)</option>
                        <option>Monday Off</option>
                        <option>Tuesday Off</option>
                      </select>
                    </div>

                    <div className="md:col-span-2 flex flex-col gap-2">
                      <label className="text-xs font-bold text-[#1c1c19]">Primary Salon Services</label>
                      <div className="flex flex-wrap gap-2">
                        {servicesList.map((srv, idx) => (
                          <span
                            key={idx}
                            className="px-3.5 py-1.5 rounded-full bg-[#ffd8e5] text-[#3c0223] text-xs font-extrabold flex items-center gap-1 border border-[#fda4c9]/60"
                          >
                            <span className="material-symbols-outlined text-[14px]">done</span>
                            {srv}
                          </span>
                        ))}
                        <button
                          onClick={addServiceItem}
                          className="px-3.5 py-1.5 rounded-full bg-[#ebe8e3] text-[#1c1c19] text-xs font-bold hover:bg-[#e5e2dd] cursor-pointer"
                          type="button"
                        >
                          + Add Service
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#1c1c19]">
                        Estimated Monthly Client Volume
                      </label>
                      <input
                        className="w-full px-4 py-3 bg-[#f6f3ee] rounded-xl text-xs sm:text-sm text-[#1c1c19] border border-[#e5e2dd]"
                        type="text"
                        value={clientVolume}
                        onChange={(e) => setClientVolume(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#1c1c19]">
                        Average Ticket Size per Appointment
                      </label>
                      <input
                        className="w-full px-4 py-3 bg-[#f6f3ee] rounded-xl text-xs sm:text-sm text-[#1c1c19] border border-[#e5e2dd]"
                        type="text"
                        value={averageTicket}
                        onChange={(e) => setAverageTicket(e.target.value)}
                      />
                    </div>
                  </div>
                </section>
              )}

              {/* STEP 5: REVIEW & CONSENT */}
              {currentStep === 5 && (
                <section className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-sm border border-[#e5e2dd] space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-4 border-b border-[#e5e2dd]">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-[#ebe8e3] text-[#1c1c19] flex items-center justify-center font-bold text-xs">
                        5
                      </span>
                      <div>
                        <h2 className="text-xl font-black text-[#1c1c19]">
                          Review Application &amp; Statutory Consent
                        </h2>
                        <p className="text-xs text-[#594047]">
                          Verify compiled documentation prior to committing to risk operations queue.
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#ffd9e2] text-[#b1005e] text-xs font-black">
                      Final Approval Gate
                    </span>
                  </div>

                  {/* Summary Review Snapshot Card */}
                  <div className="bg-[#f6f3ee] rounded-2xl p-4 sm:p-5 flex flex-col gap-3 border border-[#e5e2dd]">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-[#1c1c19]">
                        Application Summary #NX-ONB-941
                      </span>
                      <span className="text-[#8e4767] text-[11px] font-extrabold">
                        All 4 Pre-requisites Populated
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-white border border-[#e5e2dd]/60">
                        <span className="text-[#594047] text-[10px] block">Owner</span>
                        <strong className="text-[#1c1c19]">{ownerLegalName}</strong>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-[#e5e2dd]/60">
                        <span className="text-[#594047] text-[10px] block">Storefront</span>
                        <strong className="text-[#1c1c19]">{salonTradeName}</strong>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-[#e5e2dd]/60">
                        <span className="text-[#594047] text-[10px] block">Location</span>
                        <strong className="text-[#1c1c19]">Indiranagar, BLR</strong>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-[#e5e2dd]/60">
                        <span className="text-[#594047] text-[10px] block">Settlement Schedule</span>
                        <strong className="text-[#b1005e] font-bold">T+0 Instant Auto</strong>
                      </div>
                    </div>
                  </div>

                  {/* Consent Checkboxes */}
                  <div className="flex flex-col gap-3">
                    <label className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] cursor-pointer hover:bg-[#f0ede9]">
                      <input
                        checked={consentSettlement}
                        onChange={(e) => setConsentSettlement(e.target.checked)}
                        className="mt-1 w-4 h-4 accent-[#b1005e] rounded cursor-pointer shrink-0"
                        type="checkbox"
                      />
                      <span className="text-xs text-[#1c1c19] leading-relaxed">
                        <strong>Merchant Settlement &amp; MDR Agreement:</strong> I accept Nexora's master terms for payment acquiring, chargeback liability terms, and authorize daily auto-settlement to my linked HDFC current account.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] cursor-pointer hover:bg-[#f0ede9]">
                      <input
                        checked={consentRbi}
                        onChange={(e) => setConsentRbi(e.target.checked)}
                        className="mt-1 w-4 h-4 accent-[#b1005e] rounded cursor-pointer shrink-0"
                        type="checkbox"
                      />
                      <span className="text-xs text-[#1c1c19] leading-relaxed">
                        <strong>RBI KYC Compliance Declaration:</strong> I certify that all entity information, address documents, and commercial photographs provided are authentic and reflect bona fide commercial activity.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] cursor-pointer hover:bg-[#f0ede9]">
                      <input
                        checked={consentPartner}
                        onChange={(e) => setConsentPartner(e.target.checked)}
                        className="mt-1 w-4 h-4 accent-[#b1005e] rounded cursor-pointer shrink-0"
                        type="checkbox"
                      />
                      <span className="text-xs text-[#1c1c19] leading-relaxed">
                        <strong>Growth Partner Commission Attribution:</strong> I acknowledge that <strong>Growth Partner [DEV SAMPLE]</strong> (Code REF-5A45019655) is assigned as my growth partner.
                      </span>
                    </label>
                  </div>
                </section>
              )}

              {/* CRITICAL ADMIN VERIFICATION AUDIT SECTION */}
              <section className="w-full bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-sm border border-[#e5e2dd] flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e5e2dd]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#ebe8e3] flex items-center justify-center text-[#594047] shadow-xs">
                      <span className="material-symbols-outlined text-[22px]">
                        admin_panel_settings
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-black text-[#1c1c19]">
                        Partner &amp; Platform Verification Audit
                      </h3>
                      <p className="text-xs text-[#594047]">
                        Automated regulatory checks and manual underwriting gateway.
                      </p>
                    </div>
                  </div>
                  <span className="px-3.5 py-1 rounded-full bg-[#ffe088] text-[#241a00] text-xs font-black flex items-center gap-1.5 self-start sm:self-auto shadow-2xs">
                    <span className="material-symbols-outlined text-[14px]">hourglass_top</span>
                    Merchant Status: [PENDING PLATFORM AUDIT]
                  </span>
                </div>

                {/* High Visibility Security Gate Notice */}
                <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] flex items-start gap-3.5">
                  <span className="material-symbols-outlined text-[#b1005e] text-[24px] shrink-0 mt-0.5">
                    lock_clock
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-extrabold text-[#1c1c19]">
                      Admin-Controlled Gate: Self-Approval Disabled
                    </span>
                    <p className="text-xs text-[#594047] leading-relaxed">
                      Verification toggles cannot be modified by the salon owner or field agents. A certified Nexora Compliance Officer validates GSTIN credentials via GSTN API, checks Aadhaar DigiLocker integrity, and verifies GPS storefront geotags within <strong>4 business hours</strong> of submission.
                    </p>
                  </div>
                </div>

                {/* Locked Admin Toggles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                  <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] flex flex-col justify-between opacity-80 cursor-not-allowed">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-bold text-[#1c1c19]">GST Verified (DigiLocker)</span>
                      <span className="material-symbols-outlined text-[#594047] text-[18px]">lock</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-[#8e4767] font-semibold">Managed by Risk Ops</span>
                      <div className="w-8 h-4.5 bg-[#e5e2dd] rounded-full relative p-0.5 pointer-events-none">
                        <span className="w-3.5 h-3.5 bg-[#8d6f77] rounded-full block" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] flex flex-col justify-between opacity-80 cursor-not-allowed">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-bold text-[#1c1c19]">Terminal Dispatched</span>
                      <span className="material-symbols-outlined text-[#594047] text-[18px]">lock</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-[#8e4767] font-semibold">Managed by Logistics</span>
                      <div className="w-8 h-4.5 bg-[#e5e2dd] rounded-full relative p-0.5 pointer-events-none">
                        <span className="w-3.5 h-3.5 bg-[#8d6f77] rounded-full block" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] flex flex-col justify-between opacity-80 cursor-not-allowed">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-bold text-[#1c1c19]">0% MDR Promo Active</span>
                      <span className="material-symbols-outlined text-[#594047] text-[18px]">lock</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-[#8e4767] font-semibold">Managed by Finance</span>
                      <div className="w-8 h-4.5 bg-[#e5e2dd] rounded-full relative p-0.5 pointer-events-none">
                        <span className="w-3.5 h-3.5 bg-[#8d6f77] rounded-full block" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#594047] pt-1">
                  <span>
                    Audit Assigned Officer: <strong className="text-[#1c1c19]">Priya S. (Underwriting L2)</strong>
                  </span>
                  <span className="font-mono text-xs font-bold text-[#b1005e]">
                    SLA Countdown: {slaCountdown}
                  </span>
                </div>
              </section>

              {/* Bottom Sticky Step Actions Bar */}
              <div className="sticky bottom-4 w-full bg-white/95 backdrop-blur-xl p-4 sm:p-5 rounded-2xl shadow-xl border border-[#e5e2dd] flex flex-col sm:flex-row items-center justify-between gap-3 z-30">
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                  <button
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-[#e5e2dd] ${
                      currentStep === 1
                        ? 'bg-[#f6f3ee] text-[#594047]/40 cursor-not-allowed'
                        : 'bg-[#ebe8e3] text-[#1c1c19] hover:bg-[#e5e2dd]'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    <span>Back</span>
                  </button>
                  <div className="text-[#594047] text-xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-[#8e4767] text-[16px]">cloud_done</span>
                    <span>Autosave active</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => showToast('Draft saved successfully to cloud storage!')}
                    className="px-4 py-2.5 rounded-full bg-[#f6f3ee] text-[#1c1c19] text-xs font-bold hover:bg-[#ebe8e3] transition-all cursor-pointer border border-[#e5e2dd]"
                    type="button"
                  >
                    Save Draft
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="px-6 py-2.5 rounded-full bg-[#d91b77] hover:bg-[#b1005e] text-white text-xs font-black shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                    type="button"
                  >
                    <span>{stepLabels[currentStep]}</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT RAIL SIDEBAR: Partner Card & Unlocked Perks (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Onboarding Progress Metric Card */}
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-[#e5e2dd] flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-[#8e4767] font-extrabold">
                    Onboarding Completion
                  </span>
                  <span className="text-xl font-black text-[#b1005e]">{progressPercent}%</span>
                </div>

                {/* Inline SVG Ring Progress */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 shrink-0 relative flex items-center justify-center">
                    <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-[#ebe8e3]"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                      />
                      <path
                        className="text-[#d91b77] transition-all duration-500"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeDasharray={`${progressPercent}, 100`}
                        strokeLinecap="round"
                        strokeWidth="3.5"
                      />
                    </svg>
                    <span className="absolute text-xs font-black text-[#1c1c19]">
                      {currentStep} / {totalSteps}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#1c1c19]">
                      {currentStep} of {totalSteps} Steps Finished
                    </span>
                    <span className="text-[11px] text-[#594047] mt-0.5">
                      Estimated ~3 mins remaining to terminal activation queue.
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] flex items-center justify-between text-xs">
                  <span className="text-[#594047] font-semibold">Priority Fast-Track:</span>
                  <span className="text-[#8e4767] font-extrabold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">bolt</span>
                    Enabled via Marcus
                  </span>
                </div>
              </div>

              {/* Assigned Growth Partner Card */}
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-[#e5e2dd] flex flex-col gap-4 relative overflow-hidden">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 shadow-md bg-[#ffd9e2] flex items-center justify-center font-bold text-lg text-[#b1005e]">
                    MV
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="text-base font-black text-[#1c1c19]">Growth Partner [DEV SAMPLE]</span>
                      <span className="material-symbols-outlined text-[#b1005e] text-[18px]">
                        verified
                      </span>
                    </div>
                    <span className="text-xs text-[#594047]">Licensed Growth Partner</span>
                    <span className="font-mono text-xs text-[#8e4767] font-bold">ID: REF-5A45019655</span>
                  </div>
                </div>
                <p className="text-xs text-[#594047] leading-relaxed italic bg-[#f6f3ee] p-3 rounded-2xl border border-[#e5e2dd]">
                  "Hi Rahul, I'm personally tracking your studio's DigiLocker audit. If you need assistance with your GST filings or terminal configuration, reach out directly."
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="tel:9840012390"
                    className="px-3 py-2.5 rounded-xl bg-[#ebe8e3] text-[#1c1c19] text-xs font-bold text-center hover:bg-[#e5e2dd] transition-colors flex items-center justify-center gap-1 cursor-pointer border border-[#e5e2dd]"
                  >
                    <span className="material-symbols-outlined text-[16px]">call</span>
                    <span>Call Marcus</span>
                  </a>
                  <a
                    href="https://wa.me/?text=Hi%20Marcus,%20following%20up%20on%20my%20salon%20onboarding"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2.5 rounded-xl bg-[#ffd8e5] text-[#3c0223] text-xs font-bold text-center hover:bg-[#fda4c9] transition-colors flex items-center justify-center gap-1 cursor-pointer border border-[#fda4c9]/60"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Unlocked Growth Benefits Checklist */}
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-[#e5e2dd] flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-base font-black text-[#1c1c19]">Partner Privileges</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#fda4c9]/60 text-[#3c0223] text-[11px] font-extrabold uppercase">
                    Locked In
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  {/* Benefit 1 */}
                  <div className="p-3 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#8e4767] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <span className="material-symbols-outlined text-[18px]">currency_rupee</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#1c1c19]">₹500 Instant Welcome Credit</span>
                      <span className="text-[11px] text-[#594047]">
                        Credited straight to settlement wallet upon first terminal ping.
                      </span>
                    </div>
                  </div>
                  {/* Benefit 2 */}
                  <div className="p-3 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#8e4767] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <span className="material-symbols-outlined text-[18px]">speaker</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#1c1c19]">Free 4G Smart Soundbox</span>
                      <span className="text-[11px] text-[#594047]">
                        No hardware rental deposit (waived under REF-5A45019655).
                      </span>
                    </div>
                  </div>
                  {/* Benefit 3 */}
                  <div className="p-3 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#8e4767] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <span className="material-symbols-outlined text-[18px]">percent</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#1c1c19]">30 Days 0% MDR Gateway Fee</span>
                      <span className="text-[11px] text-[#594047]">
                        Zero payment processing fees on UPI, RuPay, and domestic credit cards.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#ebe8e3] flex items-center gap-2 text-[#594047] text-xs">
                  <span className="material-symbols-outlined text-[16px] text-[#8e4767]">
                    verified_user
                  </span>
                  <span>Guaranteed under Nexora Growth Charter 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* SUCCESS SUBMISSION MODAL */}
      {isSubmittedSuccess && (
        <div className="fixed inset-0 z-50 bg-[#31302d]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col gap-4 border border-[#e5e2dd] animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-2xl bg-[#ffd9e2] text-[#b1005e] flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[32px]">task_alt</span>
            </div>
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#ffd9e2] text-[#b1005e] text-xs font-black uppercase">
                Underwriting Queue Committed
              </span>
              <h3 className="text-2xl font-black text-[#1c1c19] mt-1">Application Submitted!</h3>
              <p className="text-xs sm:text-sm text-[#594047] mt-1 leading-relaxed">
                Your salon application <strong className="text-[#1c1c19]">#NX-ONB-941</strong> has been sent to Senior Underwriting Officer <strong className="text-[#1c1c19]">Priya S.</strong> for 4-hour SLA clearance.
              </p>
            </div>
            <div className="bg-[#f6f3ee] p-4 rounded-2xl space-y-2 border border-[#e5e2dd]">
              <div className="flex justify-between text-xs">
                <span className="text-[#594047]">Attributed Growth Partner:</span>
                <span className="font-bold text-[#1c1c19]">Growth Partner (#REF-5A45019655)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#594047]">Soundbox Shipping Destination:</span>
                <span className="font-bold text-[#1c1c19]">Indiranagar 100ft Road, BLR</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#594047]">Welcome Bonus Voucher:</span>
                <span className="font-bold text-[#b1005e]">₹500 Instant Credit Locked</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => {
                  setIsSubmittedSuccess(false);
                  if (onNavigateToReferralTimeline) onNavigateToReferralTimeline();
                }}
                className="w-full h-12 rounded-full bg-[#d91b77] hover:bg-[#b1005e] text-white font-extrabold text-sm shadow-md cursor-pointer transition-all"
                type="button"
              >
                Track Live Status on Timeline →
              </button>
              <button
                onClick={() => setIsSubmittedSuccess(false)}
                className="w-full h-10 rounded-full bg-transparent text-[#594047] font-bold text-xs hover:bg-[#f6f3ee] cursor-pointer"
                type="button"
              >
                Return to Workspace
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full bg-[#f6f3ee] py-8 border-t border-[#e5e2dd]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#594047]">
          <span>© 2025 Nexora Technologies Inc. All rights reserved. Tier-One Commercial Partner Security.</span>
          <div className="flex items-center gap-4 font-semibold">
            <span className="flex items-center gap-1 text-[#8e4767]">
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              256-Bit Financial Encryption
            </span>
            <a className="hover:text-[#1c1c19] transition-colors" href="#">
              Terms
            </a>
            <a className="hover:text-[#1c1c19] transition-colors" href="#">
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
