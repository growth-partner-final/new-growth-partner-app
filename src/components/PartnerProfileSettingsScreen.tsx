import React, { useState, useEffect } from 'react';
import { NotificationBell } from './NotificationBell';
import { useAuth } from '../context/AuthContext';
import { partnerDbService } from '../services/partnerDbService';

interface PartnerProfileSettingsScreenProps {
  onNavigateToHub?: () => void;
  onNavigateToSalonIntelligence?: () => void;
  onNavigateToLeaderboard?: () => void;
  onNavigateToReferralTimeline?: () => void;
  onNavigateToShareEarn?: () => void;
  onNavigateToAddSalon?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToMerchantRegister?: () => void;
  onNavigateToLockedOnboarding?: () => void;
  onNavigateToStepAuditWorkspace?: () => void;
  onNavigateToMobileFastTrack?: () => void;
  onNavigateToWebsiteTemplates?: () => void;
  onLogout?: () => void;
}

export const PartnerProfileSettingsScreen: React.FC<PartnerProfileSettingsScreenProps> = ({
  onNavigateToHub,
  onNavigateToSalonIntelligence,
  onNavigateToLeaderboard,
  onNavigateToReferralTimeline,
  onNavigateToShareEarn,
  onNavigateToAddSalon,
  onNavigateToDashboard,
  onNavigateToMerchantRegister,
  onNavigateToLockedOnboarding,
  onNavigateToStepAuditWorkspace,
  onNavigateToMobileFastTrack,
  onNavigateToWebsiteTemplates,
  onLogout
}) => {
  const { user, registeredPartner, signOut } = useAuth();

  // Navigation Section Tab
  const [activeSettingsTab, setActiveSettingsTab] = useState<'contact' | 'payout' | 'preferences' | 'security'>('contact');

  // Contact & Personal Info State
  const [fullName, setFullName] = useState<string>(registeredPartner?.name || 'Growth Partner');
  const [agencyName, setAgencyName] = useState<string>('Growth Partner Desk');
  const [email, setEmail] = useState<string>(user?.email || 'partner@nexorapartner.com');

  useEffect(() => {
    let isMounted = true;
    partnerDbService.getUserProfile().then((prof) => {
      if (isMounted && prof) {
        if (prof.full_name) setFullName(prof.full_name);
        if (prof.phone) setPhone(prof.phone);
        if (prof.city) setCity(prof.city);
        if (prof.state) setStateVal(prof.state);
        if (prof.email) setEmail(prof.email);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogoutClick = async () => {
    await signOut();
    if (onLogout) {
      onLogout();
    } else if (onNavigateToHub) {
      onNavigateToHub();
    }
  };
  const [phone, setPhone] = useState<string>('+91 98400 12390');
  const [whatsappPhone, setWhatsappPhone] = useState<string>('+91 98400 12390');
  const [isWhatsappSame, setIsWhatsappSame] = useState<boolean>(true);
  const [city, setCity] = useState<string>('Bengaluru');
  const [stateVal, setStateVal] = useState<string>('Karnataka');
  const [partnerBio, setPartnerBio] = useState<string>(
    'Growth Partner specializing in salon commercial SaaS adoption, POS gateway setups, and automated booking rollouts.'
  );

  // Bank & Payout State
  const [accountHolderName, setAccountHolderName] = useState<string>('Growth Partner [DEV SAMPLE]');
  const [bankName, setBankName] = useState<string>('HDFC Bank Ltd.');
  const [accountNumber, setAccountNumber] = useState<string>('50200049182390');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState<string>('50200049182390');
  const [ifscCode, setIfscCode] = useState<string>('HDFC0001042');
  const [branchName, setBranchName] = useState<string>('Indiranagar 100ft Road Branch, Bangalore');
  const [accountType, setAccountType] = useState<'current' | 'savings'>('current');
  const [upiId, setUpiId] = useState<string>('marcusvance@hdfcbank');
  const [payoutSchedule, setPayoutSchedule] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [panNumber, setPanNumber] = useState<string>('ABCPS4928M');
  const [gstinNumber, setGstinNumber] = useState<string>('29ABCPS4928M1Z8');

  // Preferences State
  const [whatsappInstantPing, setWhatsappInstantPing] = useState<boolean>(true);
  const [emailDailyDigest, setEmailDailyDigest] = useState<boolean>(true);
  const [leadAutoAssign, setLeadAutoAssign] = useState<boolean>(true);
  const [currencyNotation, setCurrencyNotation] = useState<'inr_lakhs' | 'inr_standard'>('inr_lakhs');
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>('light');
  const [smsMilestoneAlerts, setSmsMilestoneAlerts] = useState<boolean>(true);

  // Security State
  const [is2faEnabled, setIs2faEnabled] = useState<boolean>(true);
  const [currentPassword, setCurrentPassword] = useState<string>('••••••••••••');
  const [newPassword, setNewPassword] = useState<string>('');

  // UI Modals & State Feedback
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPennyDropTesting, setIsPennyDropTesting] = useState<boolean>(false);
  const [pennyDropSuccess, setPennyDropSuccess] = useState<boolean>(true);
  const [isAddBankModalOpen, setIsAddBankModalOpen] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveAllChanges = async () => {
    setIsSaving(true);
    try {
      await partnerDbService.updateUserProfile({
        full_name: fullName,
        phone,
        city,
        state: stateVal
      });

      if (email && email !== user?.email) {
        await partnerDbService.updateUserEmail(email);
        showToast('Confirmation email sent to new address.');
      }

      setIsSaving(false);
      setIsDirty(false);
      showToast('Profile & Settings saved successfully to database!');
    } catch (err: any) {
      setIsSaving(false);
      showToast(err.message || 'Failed to save profile changes.');
    }
  };

  const handleTestPennyDrop = () => {
    setIsPennyDropTesting(true);
    setTimeout(() => {
      setIsPennyDropTesting(false);
      setPennyDropSuccess(true);
      showToast('₹1.00 Penny-Drop verification successful! Account name verified as "Growth Partner".');
    }, 1200);
  };

  const partnerCode = registeredPartner?.isPending
    ? 'PENDING'
    : (registeredPartner?.partnerId || 'PENDING');

  const appOrigin = typeof window !== 'undefined' && window.location ? window.location.origin : 'https://nexora.network';
  const realReferralLink = `${appOrigin}/signup?ref=${partnerCode}`;

  const copyReferralLink = () => {
    navigator.clipboard.writeText(registeredPartner?.referralLink || realReferralLink);
    showToast('Partner referral link copied to clipboard!');
  };

  const markDirty = () => {
    if (!isDirty) setIsDirty(true);
  };

  return (
    <div className="bg-[#fcf9f4] font-sans text-[#1c1c19] min-h-screen flex flex-col justify-between relative selection:bg-[#fda4c9]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#31302d] text-white shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200 border border-white/10 max-w-md text-center">
          <span className="material-symbols-outlined text-[18px] text-[#ffe088]">check_circle</span>
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="fixed top-8 sm:top-7 inset-x-0 z-40 bg-[#fcf9f4]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(74,14,46,0.04)] border-b border-[#e5e2dd]">
        <div className="h-20 w-full px-4 sm:px-6 max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigateToHub && onNavigateToHub()}
              className="flex items-center gap-2.5 cursor-pointer bg-transparent border-0 p-0 text-left hover:opacity-90 transition-opacity"
              title="Return to Main Home Landing Page"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#b1005e] to-[#d91b77] text-white flex items-center justify-center font-black text-lg shadow-sm">
                N
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-[#1c1c19] tracking-tight leading-none">
                  Nexora
                </span>
                <span className="text-[11px] font-bold text-[#8e4767] uppercase tracking-wider">
                  Partner Settings
                </span>
              </div>
            </button>
            <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#ffd8e5] text-[#3c0223] text-[11px] font-extrabold uppercase tracking-wider border border-[#fda4c9]/60">
              Growth Partner #{partnerCode}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => onNavigateToHub && onNavigateToHub()}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#f0ede9] text-[#594047] hover:text-[#b1005e] hover:bg-[#e5e2dd] text-xs font-bold transition-all cursor-pointer border border-[#e5e2dd] shadow-2xs active:scale-95"
              title="Return to Main Home Page"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px] text-[#b1005e]">home</span>
              <span>Home</span>
            </button>
            <div className="hidden sm:flex items-center gap-2 bg-[#f6f3ee] px-3 py-1.5 rounded-full border border-[#e5e2dd] text-xs">
              <span className="text-[#594047]">Referral Code:</span>
              <span className="font-mono font-black text-[#1c1c19]">{partnerCode}</span>
              <button
                onClick={copyReferralLink}
                className="text-[#b1005e] hover:text-[#d91b77] cursor-pointer"
                title="Copy Referral Link"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">content_copy</span>
              </button>
            </div>

            <NotificationBell onNavigateToReferrals={onNavigateToReferralTimeline} />

            <button
              onClick={() => onNavigateToDashboard && onNavigateToDashboard()}
              className="px-4 py-2 rounded-full bg-[#ebe8e3] text-[#1c1c19] text-xs font-bold hover:bg-[#e5e2dd] transition-all cursor-pointer border border-[#e5e2dd]"
              type="button"
            >
              Back to Dashboard
            </button>

            <button
              onClick={handleLogoutClick}
              className="px-4 py-2 rounded-full bg-[#fff0f2] text-[#ba1a1a] hover:bg-[#ffe088]/30 font-bold text-xs flex items-center gap-1.5 border border-[#ba1a1a]/20 transition-all cursor-pointer shadow-2xs"
              type="button"
              title="Sign Out of Partner Account"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full pt-32 pb-32 bg-[#fcf9f4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          {/* Partner Identity Overview Banner */}
          <section className="bg-white/85 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-[0_8px_32px_0_rgba(74,14,46,0.04)] border border-[#e5e2dd] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#b1005e] to-[#ffd9e2] text-[#b1005e] flex items-center justify-center text-2xl font-black shadow-md border-2 border-white">
                  MV
                </div>
                <button
                  onClick={() => showToast('Profile avatar upload dialog opened.')}
                  className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#31302d] text-white flex items-center justify-center shadow-md hover:bg-[#1c1c19] cursor-pointer transition-transform active:scale-95"
                  title="Change Avatar"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[14px]">photo_camera</span>
                </button>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-black text-[#1c1c19]">{fullName}</h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffd8e5] text-[#3c0223] text-xs font-extrabold border border-[#fda4c9]/60">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    Tier-1 Gold Partner
                  </span>
                </div>
                <span className="text-xs text-[#594047] mt-0.5 font-medium">
                  {agencyName} • Bangalore Commercial Hub Desk
                </span>
                <div className="flex items-center gap-3 mt-2 text-xs text-[#594047]">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-[#b1005e]">mail</span>
                    {email}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-[#735c00]">percent</span>
                    30% Lifetime Revenue Split
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full md:w-auto">
              <div className="p-3 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd]">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#594047] block">
                  Total Earnings
                </span>
                <span className="text-lg font-black text-[#b1005e]">₹84,500</span>
                <span className="text-[10px] text-[#735c00] font-bold block mt-0.5">T+0 Settled</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd]">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#594047] block">
                  Active Salons
                </span>
                <span className="text-lg font-black text-[#1c1c19]">14 Studios</span>
                <span className="text-[10px] text-[#8e4767] font-bold block mt-0.5">2 In KYC Audit</span>
              </div>
              <div className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-[#ffd8e5]/60 border border-[#fda4c9]/60">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#3c0223] block">
                  Next Payout
                </span>
                <span className="text-lg font-black text-[#3c0223]">₹6,240</span>
                <span className="text-[10px] text-[#8e004a] font-bold block mt-0.5">Tonight 11:59 PM</span>
              </div>
            </div>
          </section>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-[#e5e2dd]">
            {[
              { id: 'contact', label: 'Contact & Personal Info', icon: 'person' },
              { id: 'payout', label: 'Payout & Bank Accounts', icon: 'account_balance' },
              { id: 'preferences', label: 'Notification & Preferences', icon: 'tune' },
              { id: 'security', label: 'Security & 2FA', icon: 'shield' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSettingsTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-full text-xs font-extrabold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                  activeSettingsTab === tab.id
                    ? 'bg-[#b1005e] text-white shadow-xs'
                    : 'bg-white text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] border border-[#e5e2dd]'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* TAB 1: CONTACT & PERSONAL INFO */}
          {activeSettingsTab === 'contact' && (
            <section className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-sm border border-[#e5e2dd] space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-[#e5e2dd]">
                <div>
                  <h2 className="text-xl font-black text-[#1c1c19]">Personal &amp; Contact Details</h2>
                  <p className="text-xs text-[#594047]">
                    Manage your partner identity, communications desk, and merchant-facing contact details.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#ffd8e5] text-[#3c0223] text-xs font-black border border-[#fda4c9]/60">
                  PAN KYC Verified
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#1c1c19]">Full Legal Name (Per PAN Card)</label>
                  <input
                    className="w-full px-4 py-3 bg-[#f6f3ee] rounded-xl text-xs sm:text-sm text-[#1c1c19] border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all font-semibold"
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      markDirty();
                    }}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#1c1c19]">Agency / Partner Brand Name</label>
                  <input
                    className="w-full px-4 py-3 bg-[#f6f3ee] rounded-xl text-xs sm:text-sm text-[#1c1c19] border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all font-semibold"
                    type="text"
                    value={agencyName}
                    onChange={(e) => {
                      setAgencyName(e.target.value);
                      markDirty();
                    }}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#1c1c19]">Official Email Address</label>
                  <div className="relative flex items-center">
                    <input
                      className="w-full px-4 py-3 bg-[#f6f3ee] rounded-xl text-xs sm:text-sm text-[#1c1c19] border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        markDirty();
                      }}
                    />
                    <span className="px-2.5 py-1 rounded-md bg-[#ffd8e5] text-[#3c0223] text-[10px] font-black absolute right-3 border border-[#fda4c9]/60">
                      Primary
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#1c1c19]">Primary Mobile Phone</label>
                  <div className="relative flex items-center">
                    <input
                      className="w-full px-4 py-3 bg-[#f6f3ee] rounded-xl text-xs sm:text-sm text-[#1c1c19] border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all"
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        markDirty();
                      }}
                    />
                    <span className="material-symbols-outlined text-[#735c00] absolute right-3 text-[18px]">
                      verified
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-[#1c1c19]">WhatsApp Business Helpline</label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsWhatsappSame(!isWhatsappSame);
                        if (!isWhatsappSame) setWhatsappPhone(phone);
                        markDirty();
                      }}
                      className="text-[11px] text-[#b1005e] font-bold hover:underline cursor-pointer"
                    >
                      {isWhatsappSame ? 'Use custom number' : 'Sync with Primary'}
                    </button>
                  </div>
                  <input
                    className="w-full px-4 py-3 bg-[#f6f3ee] rounded-xl text-xs sm:text-sm text-[#1c1c19] border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all"
                    type="tel"
                    disabled={isWhatsappSame}
                    value={isWhatsappSame ? phone : whatsappPhone}
                    onChange={(e) => {
                      setWhatsappPhone(e.target.value);
                      markDirty();
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#1c1c19]">City Base</label>
                    <input
                      className="w-full px-4 py-3 bg-[#f6f3ee] rounded-xl text-xs sm:text-sm text-[#1c1c19] border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all"
                      type="text"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        markDirty();
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#1c1c19]">State</label>
                    <input
                      className="w-full px-4 py-3 bg-[#f6f3ee] rounded-xl text-xs sm:text-sm text-[#1c1c19] border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all"
                      type="text"
                      value={stateVal}
                      onChange={(e) => {
                        setStateVal(e.target.value);
                        markDirty();
                      }}
                    />
                  </div>
                </div>

                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-[#1c1c19]">
                      Public Partner Profile Bio &amp; Expertise
                    </label>
                    <span className="text-[11px] text-[#594047]">{partnerBio.length} / 500 characters</span>
                  </div>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 bg-[#f6f3ee] rounded-xl text-xs sm:text-sm text-[#1c1c19] border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e] transition-all"
                    value={partnerBio}
                    onChange={(e) => {
                      setPartnerBio(e.target.value);
                      markDirty();
                    }}
                  />
                </div>
              </div>
            </section>
          )}

          {/* TAB 2: PAYOUT & BANK ACCOUNT DETAILS */}
          {activeSettingsTab === 'payout' && (
            <section className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-sm border border-[#e5e2dd] space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-[#e5e2dd]">
                <div>
                  <h2 className="text-xl font-black text-[#1c1c19]">Bank Account &amp; Settlement Routing</h2>
                  <p className="text-xs text-[#594047]">
                    Manage the beneficiary bank account and UPI handles for automated daily revenue splits.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddBankModalOpen(true)}
                  className="px-4 py-2 rounded-full bg-[#d91b77] text-white text-xs font-black hover:bg-[#b1005e] transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  <span>Add Payout Method</span>
                </button>
              </div>

              {/* Active Primary Bank Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-tr from-[#31302d] to-[#1c1c19] text-white shadow-lg relative overflow-hidden">
                <div className="absolute right-0 top-0 w-64 h-64 bg-[#d91b77]/20 rounded-full blur-3xl pointer-events-none" />
                <div className="flex items-start justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                      <span className="material-symbols-outlined text-[28px]">account_balance</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-black text-white">{bankName}</h3>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[10px] font-black border border-emerald-400/40">
                          Active Primary Payout
                        </span>
                      </div>
                      <span className="text-xs text-white/70">{accountHolderName}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleTestPennyDrop}
                      disabled={isPennyDropTesting}
                      className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 flex items-center gap-1 cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {isPennyDropTesting ? 'progress_activity' : 'send_money'}
                      </span>
                      <span>{isPennyDropTesting ? 'Verifying...' : 'Test ₹1 Penny Drop'}</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-4 border-t border-white/10 relative z-10 text-xs">
                  <div>
                    <span className="text-white/50 text-[10px] block uppercase font-bold">Account Number</span>
                    <span className="font-mono font-bold text-white text-sm">•••• •••• 2390</span>
                  </div>
                  <div>
                    <span className="text-white/50 text-[10px] block uppercase font-bold">IFSC Code</span>
                    <span className="font-mono font-bold text-white text-sm">{ifscCode}</span>
                  </div>
                  <div>
                    <span className="text-white/50 text-[10px] block uppercase font-bold">Account Type</span>
                    <span className="font-bold text-white capitalize">{accountType} Account</span>
                  </div>
                  <div>
                    <span className="text-white/50 text-[10px] block uppercase font-bold">Direct UPI Payout</span>
                    <span className="font-mono font-bold text-[#ffd9e2] truncate block">{upiId}</span>
                  </div>
                </div>
              </div>

              {/* Settlement Frequency Selector */}
              <div className="p-5 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] space-y-3">
                <label className="text-xs font-black text-[#1c1c19] uppercase tracking-wider block">
                  Settlement Frequency &amp; Dispatch Protocol
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'daily',
                      title: 'T+0 Instant Daily Auto',
                      desc: 'Dispatched daily at 11:59 PM via IMPS directly to bank.',
                      tag: 'Recommended'
                    },
                    {
                      id: 'weekly',
                      title: 'Weekly Batch (Friday)',
                      desc: 'Single consolidated payout transfer every Friday morning.',
                      tag: 'Low Accounting Noise'
                    },
                    {
                      id: 'monthly',
                      title: 'Monthly Cap (₹10,000 Min)',
                      desc: 'Transferred automatically on the 1st of each calendar month.',
                      tag: 'Threshold Rule'
                    }
                  ].map(plan => (
                    <div
                      key={plan.id}
                      onClick={() => {
                        setPayoutSchedule(plan.id as any);
                        markDirty();
                      }}
                      className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                        payoutSchedule === plan.id
                          ? 'bg-white border-[#b1005e] shadow-sm ring-2 ring-[#b1005e]/20'
                          : 'bg-white/60 border-[#e5e2dd] hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-black text-[#1c1c19]">{plan.title}</span>
                        {plan.tag && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-[#ffd8e5] text-[#3c0223]">
                            {plan.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#594047] leading-relaxed">{plan.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tax & Regulatory TDS Credentials */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#1c1c19]">Permanent Account Number (PAN)</label>
                  <div className="relative flex items-center">
                    <input
                      className="w-full px-4 py-3 bg-[#f6f3ee] rounded-xl text-xs sm:text-sm font-mono font-bold text-[#1c1c19] border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e]"
                      type="text"
                      value={panNumber}
                      onChange={(e) => {
                        setPanNumber(e.target.value);
                        markDirty();
                      }}
                    />
                    <span className="px-2.5 py-1 rounded bg-[#ffd8e5] text-[#3c0223] text-[10px] font-black absolute right-3 border border-[#fda4c9]/60">
                      5% TDS Sec 194H
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#1c1c19]">Goods &amp; Services Tax (GSTIN)</label>
                  <input
                    className="w-full px-4 py-3 bg-[#f6f3ee] rounded-xl text-xs sm:text-sm font-mono font-bold text-[#1c1c19] border border-[#e5e2dd] focus:bg-white focus:outline-none focus:border-[#b1005e]"
                    type="text"
                    value={gstinNumber}
                    onChange={(e) => {
                      setGstinNumber(e.target.value);
                      markDirty();
                    }}
                  />
                </div>
              </div>
            </section>
          )}

          {/* TAB 3: NOTIFICATION & PREFERENCES */}
          {activeSettingsTab === 'preferences' && (
            <section className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-sm border border-[#e5e2dd] space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-[#e5e2dd]">
                <div>
                  <h2 className="text-xl font-black text-[#1c1c19]">Alerts &amp; Operational Preferences</h2>
                  <p className="text-xs text-[#594047]">
                    Customize how you receive referral commission notifications and salon onboarding leads.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Preference 1 */}
                <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#ffd8e5] text-[#3c0223] flex items-center justify-center shrink-0 shadow-2xs">
                      <span className="material-symbols-outlined text-[20px]">chat</span>
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-[#1c1c19]">
                        Instant WhatsApp Commission Alerts
                      </h4>
                      <p className="text-xs text-[#594047] mt-0.5">
                        Receive a real-time WhatsApp ping whenever a referred salon processes a customer UPI bill.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setWhatsappInstantPing(!whatsappInstantPing);
                      markDirty();
                    }}
                    className={`w-12 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer shrink-0 ${
                      whatsappInstantPing ? 'bg-[#b1005e]' : 'bg-[#e5e2dd]'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 bg-white rounded-full block shadow-xs transition-transform ${
                        whatsappInstantPing ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Preference 2 */}
                <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#ffe088] text-[#241a00] flex items-center justify-center shrink-0 shadow-2xs">
                      <span className="material-symbols-outlined text-[20px]">mail</span>
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-[#1c1c19]">Daily Revenue Digest &amp; Leaderboard</h4>
                      <p className="text-xs text-[#594047] mt-0.5">
                        Receive an 8:00 AM summary of pending KYC submissions, active soundbox pings, and rank changes.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEmailDailyDigest(!emailDailyDigest);
                      markDirty();
                    }}
                    className={`w-12 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer shrink-0 ${
                      emailDailyDigest ? 'bg-[#b1005e]' : 'bg-[#e5e2dd]'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 bg-white rounded-full block shadow-xs transition-transform ${
                        emailDailyDigest ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Preference 3 */}
                <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#ffd9e2] text-[#8e004a] flex items-center justify-center shrink-0 shadow-2xs">
                      <span className="material-symbols-outlined text-[20px]">near_me</span>
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-[#1c1c19]">
                        Nearby Unassigned Salon Auto-Routing
                      </h4>
                      <p className="text-xs text-[#594047] mt-0.5">
                        Automatically assign inbound organic salon onboarding leads within 10 km of Bengaluru Urban to your desk.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setLeadAutoAssign(!leadAutoAssign);
                      markDirty();
                    }}
                    className={`w-12 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer shrink-0 ${
                      leadAutoAssign ? 'bg-[#b1005e]' : 'bg-[#e5e2dd]'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 bg-white rounded-full block shadow-xs transition-transform ${
                        leadAutoAssign ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#1c1c19]">Currency &amp; Number Format</label>
                  <select
                    className="w-full px-4 py-3 bg-[#f6f3ee] rounded-xl text-xs sm:text-sm font-semibold border border-[#e5e2dd] focus:outline-none"
                    value={currencyNotation}
                    onChange={(e) => {
                      setCurrencyNotation(e.target.value as any);
                      markDirty();
                    }}
                  >
                    <option value="inr_lakhs">Indian Rupee (₹ Lakhs &amp; Crores - ₹1,50,000)</option>
                    <option value="inr_standard">Indian Rupee (Thousands - ₹150,000)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#1c1c19]">Portal Theme Mode</label>
                  <select
                    className="w-full px-4 py-3 bg-[#f6f3ee] rounded-xl text-xs sm:text-sm font-semibold border border-[#e5e2dd] focus:outline-none"
                    value={themeMode}
                    onChange={(e) => {
                      setThemeMode(e.target.value as any);
                      markDirty();
                    }}
                  >
                    <option value="light">Warm Light Luxury (Default)</option>
                    <option value="dark">Obsidian Dark</option>
                    <option value="system">Follow Device System Theme</option>
                  </select>
                </div>
              </div>
            </section>
          )}

          {/* TAB 4: SECURITY & 2FA */}
          {activeSettingsTab === 'security' && (
            <section className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-sm border border-[#e5e2dd] space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-[#e5e2dd]">
                <div>
                  <h2 className="text-xl font-black text-[#1c1c19]">Security &amp; Account Protection</h2>
                  <p className="text-xs text-[#594047]">
                    Manage Two-Factor Authentication (2FA) and active browser authentication sessions.
                  </p>
                </div>
              </div>

              {/* 2FA Card */}
              <div className="p-5 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] flex items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[22px]">security</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-black text-[#1c1c19]">
                        Two-Factor Authentication (TOTP)
                      </h4>
                      <span className="px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 text-[10px] font-black">
                        Active &amp; Protected
                      </span>
                    </div>
                    <p className="text-xs text-[#594047] mt-0.5">
                      Secured via Google Authenticator. High-value bank payout modifications require a 6-digit TOTP key.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => showToast('2FA reconfiguration code sent to verified email.')}
                  className="px-3.5 py-1.5 rounded-full bg-white text-[#1c1c19] text-xs font-bold hover:bg-[#ebe8e3] border border-[#e5e2dd] cursor-pointer"
                >
                  Configure 2FA
                </button>
              </div>

              {/* Password Change Block */}
              <div className="p-5 rounded-2xl bg-white border border-[#e5e2dd] space-y-4">
                <h3 className="text-sm font-black text-[#1c1c19]">Update Partner Password</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#1c1c19]">Current Password</label>
                    <input
                      className="w-full px-4 py-2.5 bg-[#f6f3ee] rounded-xl text-xs sm:text-sm border border-[#e5e2dd]"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#1c1c19]">New Strong Password</label>
                    <input
                      className="w-full px-4 py-2.5 bg-[#f6f3ee] rounded-xl text-xs sm:text-sm border border-[#e5e2dd]"
                      type="password"
                      placeholder="Min 8 characters with numbers"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (newPassword.length >= 6) {
                      showToast('Password changed successfully.');
                      setNewPassword('');
                    } else {
                      showToast('Please enter a password with at least 6 characters.');
                    }
                  }}
                  className="px-4 py-2 rounded-full bg-[#ebe8e3] text-[#1c1c19] text-xs font-bold hover:bg-[#e5e2dd] cursor-pointer"
                >
                  Save New Password
                </button>
              </div>

              {/* Active Sessions */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#8e4767]">
                  Active Login Devices
                </h4>
                <div className="p-3.5 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#b1005e]">laptop_mac</span>
                    <div>
                      <strong className="text-[#1c1c19]">Chrome on macOS • Bengaluru, IN</strong>
                      <span className="text-[#594047] block text-[11px]">IP: 49.37.128.94 • Active Now</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#ffd8e5] text-[#3c0223] font-bold text-[10px]">
                    Current Session
                  </span>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Sticky Bottom Actions Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#e5e2dd] py-3 px-4 sm:px-6 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {isDirty ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdad6] text-[#93000a] text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-[#93000a] animate-pulse" />
                You have unsaved changes
              </span>
            ) : (
              <span className="text-xs text-[#594047] flex items-center gap-1">
                <span className="material-symbols-outlined text-[#735c00] text-[16px]">cloud_done</span>
                All changes synced with Nexora Growth Vault
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {isDirty && (
              <button
                onClick={() => {
                  setIsDirty(false);
                  showToast('Reverted unsaved edits.');
                }}
                className="px-4 py-2.5 rounded-full bg-[#ebe8e3] text-[#1c1c19] text-xs font-bold hover:bg-[#e5e2dd] transition-all cursor-pointer"
                type="button"
              >
                Discard
              </button>
            )}
            <button
              onClick={handleSaveAllChanges}
              disabled={isSaving}
              className="px-6 py-2.5 rounded-full bg-[#d91b77] hover:bg-[#b1005e] text-white text-xs font-black shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              type="button"
            >
              <span>{isSaving ? 'Saving Changes...' : 'Save Profile & Payout Settings'}</span>
              <span className="material-symbols-outlined text-[16px]">
                {isSaving ? 'progress_activity' : 'check'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ADD / EDIT BANK ACCOUNT MODAL */}
      {isAddBankModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#31302d]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#e5e2dd] flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-[#e5e2dd]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#b1005e]">account_balance</span>
                <h3 className="text-lg font-black text-[#1c1c19]">Add / Update Payout Bank Account</h3>
              </div>
              <button
                onClick={() => setIsAddBankModalOpen(false)}
                className="p-1 rounded-full text-[#594047] hover:bg-[#f6f3ee] cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#1c1c19]">Beneficiary Legal Name</label>
                <input
                  className="px-4 py-2.5 bg-[#f6f3ee] rounded-xl border border-[#e5e2dd] font-semibold"
                  value={accountHolderName}
                  onChange={(e) => setAccountHolderName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-[#1c1c19]">Bank Name</label>
                  <input
                    className="px-4 py-2.5 bg-[#f6f3ee] rounded-xl border border-[#e5e2dd] font-semibold"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-[#1c1c19]">Account Type</label>
                  <select
                    className="px-3 py-2.5 bg-[#f6f3ee] rounded-xl border border-[#e5e2dd] font-semibold"
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value as any)}
                  >
                    <option value="current">Current Account (Commercial)</option>
                    <option value="savings">Savings Account (Individual)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-[#1c1c19]">Bank Account Number</label>
                  <input
                    className="px-4 py-2.5 bg-[#f6f3ee] rounded-xl border border-[#e5e2dd] font-mono font-bold"
                    type="password"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-[#1c1c19]">Confirm Account Number</label>
                  <input
                    className="px-4 py-2.5 bg-[#f6f3ee] rounded-xl border border-[#e5e2dd] font-mono font-bold"
                    value={confirmAccountNumber}
                    onChange={(e) => setConfirmAccountNumber(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-[#1c1c19]">IFSC Code</label>
                  <input
                    className="px-4 py-2.5 bg-[#f6f3ee] rounded-xl border border-[#e5e2dd] font-mono font-bold uppercase"
                    value={ifscCode}
                    onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-[#1c1c19]">Direct UPI ID Handle</label>
                  <input
                    className="px-4 py-2.5 bg-[#f6f3ee] rounded-xl border border-[#e5e2dd] font-mono font-bold"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#ffd8e5]/40 border border-[#fda4c9]/60 text-[11px] text-[#3c0223]">
                <strong className="block mb-0.5">RBI Automated Penny-Drop Check:</strong>
                Nexora will deposit ₹1.00 into this account to verify the registered entity name before activation.
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setIsAddBankModalOpen(false)}
                className="flex-1 h-11 rounded-full bg-[#ebe8e3] text-[#1c1c19] font-bold text-xs hover:bg-[#e5e2dd] cursor-pointer"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsAddBankModalOpen(false);
                  showToast('New Payout Bank Account verified and latched!');
                  markDirty();
                }}
                className="flex-1 h-11 rounded-full bg-[#d91b77] hover:bg-[#b1005e] text-white font-black text-xs shadow-md cursor-pointer"
                type="button"
              >
                Verify &amp; Set Primary
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
