import React, { useState } from 'react';
import { NotificationBell } from './NotificationBell';
import { BreadcrumbNavigation } from './BreadcrumbNavigation';

export interface NewSalonData {
  salonName: string;
  category: string;
  ownerName: string;
  phone: string;
  email: string;
  city: string;
  locality: string;
  address: string;
  chairs: number;
  expectedVolume: number;
  hardwareType: 'soundbox' | 'standee' | 'pos';
  preferredLanguage: string;
  settlementType: 'instant' | 'daily';
}

interface AddSalonScreenProps {
  onNavigateBack?: () => void;
  onNavigateToSalonIntelligence?: () => void;
  onNavigateToLeaderboard?: () => void;
  onNavigateToReferralTimeline?: () => void;
  onNavigateToHub?: () => void;
}

export const AddSalonScreen: React.FC<AddSalonScreenProps> = ({
  onNavigateBack,
  onNavigateToSalonIntelligence,
  onNavigateToLeaderboard,
  onNavigateToReferralTimeline,
  onNavigateToHub
}) => {
  const [activeTab, setActiveTab] = useState<'form' | 'quick-invite' | 'drafts'>('form');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedSalon, setSubmittedSalon] = useState<{
    id: string;
    name: string;
    owner: string;
    city: string;
    activationBonus: number;
    monthlyRecurring: number;
    hardware: string;
  } | null>(null);

  // Form State
  const [formData, setFormData] = useState<NewSalonData>({
    salonName: '',
    category: 'Unisex Salon',
    ownerName: '',
    phone: '',
    email: '',
    city: 'Mumbai',
    locality: 'Bandra West',
    address: 'Shop 4, Hill Road, Near Mehboob Studio',
    chairs: 6,
    expectedVolume: 30000,
    hardwareType: 'soundbox',
    preferredLanguage: 'Hindi & English',
    settlementType: 'instant'
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedMessage, setCopiedMessage] = useState<boolean>(false);
  const [quickInviteSalonName, setQuickInviteSalonName] = useState<string>('');
  const [quickInviteOwnerName, setQuickInviteOwnerName] = useState<string>('');

  // Preset Localities for quick select
  const quickCities = [
    { city: 'Mumbai', locality: 'Bandra West' },
    { city: 'Bengaluru', locality: 'Indiranagar' },
    { city: 'Delhi NCR', locality: 'Khan Market' },
    { city: 'Pune', locality: 'FC Road, Deccan' },
    { city: 'Hyderabad', locality: 'Jubilee Hills' },
    { city: 'Chennai', locality: 'Nungambakkam' }
  ];

  const categories = [
    { id: 'Unisex Salon', label: 'Unisex Salon', icon: 'content_cut', sub: 'Hair, grooming & styling' },
    { id: 'Barbershop', label: 'Premium Barbershop', icon: 'face', sub: 'Men’s grooming & shave' },
    { id: 'Nail Studio', label: 'Nail & Lash Lounge', icon: 'brush', sub: 'Manicure, pedicure, art' },
    { id: 'Day Spa', label: 'Organic Day Spa', icon: 'spa', sub: 'Ayurveda, therapy & massage' },
    { id: 'Beauty Parlour', label: 'Bridal & Beauty', icon: 'flare', sub: 'Skin care & bridal' },
    { id: 'Aesthetic Clinic', label: 'Aesthetic & Skin', icon: 'health_and_safety', sub: 'Dermatology & laser' }
  ];

  const hardwareOptions = [
    {
      id: 'soundbox',
      name: '4G Voice Soundbox',
      badge: 'RECOMMENDED',
      price: '₹0 Upfront',
      incentive: '+₹2,500 Bonus',
      desc: 'Instant multilingual voice notifications for UPI payments in 6 Indian languages with dual speakers.',
      icon: 'volume_up',
      color: '#d91b77'
    },
    {
      id: 'standee',
      name: 'Holographic QR Standee',
      badge: 'FAST DISPATCH',
      price: '₹0 Upfront',
      incentive: '+₹1,500 Bonus',
      desc: 'Durable acrylic QR standee with tamper-proof security NFC chip and branded salon display.',
      icon: 'qr_code_2',
      color: '#cca730'
    },
    {
      id: 'pos',
      name: 'Android SmartPOS Terminal',
      badge: 'HIGH VOLUME',
      price: '₹0 Setup (Deposit Req.)',
      incentive: '+₹3,000 Bonus',
      desc: 'All-in-one card tap, swipe, and dynamic QR terminal with thermal slip printing & analytics.',
      icon: 'point_of_sale',
      color: '#005b82'
    }
  ];

  // Incentive Calculation
  const calculateIncentives = () => {
    let baseActivation = 1500;
    if (formData.hardwareType === 'soundbox') baseActivation = 2500;
    if (formData.hardwareType === 'pos') baseActivation = 3000;

    // Additional chair bonus for >8 chairs
    if (formData.chairs >= 10) baseActivation += 500;

    // Monthly recurring estimate (approx 0.25% - 0.35% on volume)
    const monthlyBrokerage = Math.round(formData.expectedVolume * 0.0028);
    const yearlyValue = baseActivation + monthlyBrokerage * 12;

    return {
      baseActivation,
      monthlyBrokerage,
      yearlyValue
    };
  };

  const incentives = calculateIncentives();

  const handleInputChange = (field: keyof NewSalonData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const validateStep1 = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.salonName.trim()) errors.salonName = 'Salon name is required';
    if (!formData.ownerName.trim()) errors.ownerName = 'Owner / Manager name is required';
    if (!formData.phone.trim() || formData.phone.length < 10) {
      errors.phone = 'Enter a valid 10-digit mobile number';
    }
    if (!formData.locality.trim()) errors.locality = 'Locality / Area is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!validateStep1()) return;
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handleSubmitSalon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1()) {
      setCurrentStep(1);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const newId = `NX-SLN-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedSalon({
        id: newId,
        name: formData.salonName,
        owner: formData.ownerName,
        city: `${formData.locality}, ${formData.city}`,
        activationBonus: incentives.baseActivation,
        monthlyRecurring: incentives.monthlyBrokerage,
        hardware:
          formData.hardwareType === 'soundbox'
            ? '4G Voice Soundbox'
            : formData.hardwareType === 'pos'
            ? 'Android SmartPOS'
            : 'Holographic QR Standee'
      });
    }, 1200);
  };

  const resetForm = () => {
    setFormData({
      salonName: '',
      category: 'Unisex Salon',
      ownerName: '',
      phone: '',
      email: '',
      city: 'Mumbai',
      locality: 'Bandra West',
      address: '',
      chairs: 6,
      expectedVolume: 350000,
      hardwareType: 'soundbox',
      preferredLanguage: 'Hindi & English',
      settlementType: 'instant'
    });
    setCurrentStep(1);
    setSubmittedSalon(null);
  };

  const formatRupees = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Quick WhatsApp link generator
  const getGeneratedInviteUrl = (salon = '') => {
    const base = 'https://nexora.network/join?ref=REF-5A45019655';
    return salon ? `${base}&salon=${encodeURIComponent(salon.trim())}` : base;
  };

  const getWhatsAppMessage = (salonName = '', ownerName = '') => {
    const sName = salonName.trim() || 'your salon';
    const oName = ownerName.trim() ? `Hi ${ownerName.trim()}, ` : 'Hi, ';
    const url = getGeneratedInviteUrl(salonName);
    return `${oName}I am inviting ${sName} to partner with Nexora Merchant Network! 🌟\n\n✅ 0% MDR on UPI payments\n✅ Free 4G Multilingual Voice Soundbox\n✅ Same-day instant bank settlements (T+0)\n✅ Zero upfront setup cost\n\nActivate your salon QR in 3 minutes here: ${url}\n\nReferred by Growth Partner (Partner ID: REF-5A45019655)`;
  };

  const handleCopyQuickLink = () => {
    const url = getGeneratedInviteUrl(quickInviteSalonName);
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyWhatsAppMsg = () => {
    const msg = getWhatsAppMessage(quickInviteSalonName, quickInviteOwnerName);
    navigator.clipboard.writeText(msg);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    const msg = getWhatsAppMessage(quickInviteSalonName, quickInviteOwnerName);
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="w-full min-h-screen bg-[#fcf9f4] text-[#1c1c19] flex flex-col font-sans pb-16">
      {/* Top Header Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-[#e5e2dd] py-3.5 shadow-xs">
        <div className="w-full mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (onNavigateToSalonIntelligence) onNavigateToSalonIntelligence();
                else if (onNavigateBack) onNavigateBack();
              }}
              className="w-9 h-9 rounded-xl bg-[#f6f3ee] hover:bg-[#ebe8e3] text-[#1c1c19] flex items-center justify-center transition-colors cursor-pointer border border-[#e5e2dd]"
              title="Go Back"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-[#1c1c19] tracking-tight">
                  Refer New Salon
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-[#ffd9e2] text-[#b1005e] font-bold text-[10px] uppercase tracking-wider">
                  Direct Onboarding
                </span>
              </div>
              <span className="text-xs text-[#594047] hidden sm:block">
                Onboard merchants to earn performance-based activation rewards + lifetime monthly commission.
              </span>
            </div>
          </div>

          {/* Partner Status Pill */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-[#594047]">
                Referring as <strong className="text-[#1c1c19]">Growth Partner [DEV SAMPLE]</strong> (REF-5A45019655)
              </span>
            </div>
            <NotificationBell onNavigateToReferrals={onNavigateToReferralTimeline} />

            {onNavigateToHub && (
              <button
                onClick={onNavigateToHub}
                className="px-3.5 py-1.5 rounded-xl bg-[#f0ede9] hover:bg-[#e5e2dd] text-xs font-bold text-[#594047] hover:text-[#b1005e] flex items-center gap-1.5 transition-colors cursor-pointer border border-[#e5e2dd]"
                type="button"
                title="Return to Main Home Landing Page"
              >
                <span className="material-symbols-outlined text-[16px] text-[#b1005e]">home</span>
                <span>Home</span>
              </button>
            )}

            <button
              onClick={() => {
                if (onNavigateToSalonIntelligence) onNavigateToSalonIntelligence();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-[#f0ede9] hover:bg-[#e5e2dd] text-xs font-bold text-[#b1005e] flex items-center gap-1.5 transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">storefront</span>
              <span className="hidden sm:inline">View Salons</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mode Switcher Tabs */}
      <div className="bg-[#f6f3ee] border-b border-[#e5e2dd] py-2">
        <div className="w-full mx-auto px-4 sm:px-8 lg:px-12 flex flex-col gap-2">
          <BreadcrumbNavigation
            onNavigateToHub={onNavigateToHub}
            onNavigateToDashboard={onNavigateToSalonIntelligence}
            items={[
              { label: 'Salon Intelligence', onClick: onNavigateToSalonIntelligence, icon: 'storefront' },
              { label: 'Refer New Salon', isActive: true, icon: 'add_business' }
            ]}
          />
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-[#e5e2dd] shadow-2xs">
            <button
              onClick={() => {
                setActiveTab('form');
                setSubmittedSalon(null);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'form'
                  ? 'bg-[#d91b77] text-white shadow-xs'
                  : 'text-[#594047] hover:text-[#1c1c19]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
              <span>Direct Merchant Form</span>
            </button>
            <button
              onClick={() => setActiveTab('quick-invite')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'quick-invite'
                  ? 'bg-[#d91b77] text-white shadow-xs'
                  : 'text-[#594047] hover:text-[#1c1c19]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              <span>Quick WhatsApp Invite</span>
            </button>
            <button
              onClick={() => setActiveTab('drafts')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'drafts'
                  ? 'bg-[#d91b77] text-white shadow-xs'
                  : 'text-[#594047] hover:text-[#1c1c19]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">history</span>
              <span>Recent Submissions (4)</span>
            </button>
          </div>

          {/* Quick SLA Badge */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-[#594047]">
            <span className="material-symbols-outlined text-[#735c00] text-[18px]">verified</span>
            <span>Automated DigiLocker KYC • 24h Terminal Dispatch SLA</span>
          </div>
        </div>
      </div>
    </div>

      {/* Main Container */}
      <main className="w-full mx-auto px-4 sm:px-8 lg:px-12 py-6 flex-1">
        {/* ========================================================================= */}
        {/* TAB 1: DIRECT MERCHANT REGISTRATION FORM                                  */}
        {/* ========================================================================= */}
        {activeTab === 'form' && !submittedSalon && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: 3-Step Wizard Form */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Step Progress Tracker */}
              <div className="p-4 rounded-2xl bg-white border border-[#e5e2dd] shadow-xs flex items-center justify-between">
                {[
                  { num: 1, title: 'Salon & Owner', desc: 'Identity & Location' },
                  { num: 2, title: 'Hardware & Scale', desc: 'Soundbox & Volume' },
                  { num: 3, title: 'Incentive & Review', desc: 'Earnings & Confirm' }
                ].map((s, idx) => (
                  <React.Fragment key={s.num}>
                    <button
                      type="button"
                      onClick={() => {
                        if (s.num === 1 || validateStep1()) setCurrentStep(s.num);
                      }}
                      className="flex items-center gap-3 text-left cursor-pointer group"
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs transition-all ${
                          currentStep === s.num
                            ? 'bg-[#d91b77] text-white shadow-md shadow-[#d91b77]/25'
                            : currentStep > s.num
                            ? 'bg-emerald-500 text-white'
                            : 'bg-[#f0ede9] text-[#594047]'
                        }`}
                      >
                        {currentStep > s.num ? (
                          <span className="material-symbols-outlined text-[18px]">check</span>
                        ) : (
                          s.num
                        )}
                      </div>
                      <div className="hidden sm:flex flex-col leading-tight">
                        <span
                          className={`text-xs font-bold ${
                            currentStep === s.num ? 'text-[#b1005e]' : 'text-[#1c1c19]'
                          }`}
                        >
                          {s.title}
                        </span>
                        <span className="text-[10px] text-[#594047]">{s.desc}</span>
                      </div>
                    </button>
                    {idx < 2 && (
                      <div
                        className={`flex-1 h-0.5 mx-2 sm:mx-4 transition-colors ${
                          currentStep > s.num ? 'bg-emerald-500' : 'bg-[#e5e2dd]'
                        }`}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* FORM CARD */}
              <form
                onSubmit={handleSubmitSalon}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e5e2dd] shadow-sm flex flex-col gap-6 relative"
              >
                {/* STEP 1: SALON & OWNER DETAILS */}
                {currentStep === 1 && (
                  <div className="flex flex-col gap-5 animate-in fade-in duration-200">
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-[#1c1c19] flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#b1005e]">storefront</span>
                        <span>Step 1: Salon Identity &amp; Owner Profile</span>
                      </h2>
                      <p className="text-xs text-[#594047] mt-1">
                        Provide the merchant's trade name and primary contact details for verification and hardware shipment.
                      </p>
                    </div>

                    {/* Quick City Presets */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-[#594047] uppercase tracking-wider">
                        Quick Locality Select (Hub Clusters)
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {quickCities.map((q) => {
                          const isSelected = formData.city === q.city && formData.locality === q.locality;
                          return (
                            <button
                              key={`${q.city}-${q.locality}`}
                              type="button"
                              onClick={() => {
                                handleInputChange('city', q.city);
                                handleInputChange('locality', q.locality);
                              }}
                              className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#ffd9e2] text-[#b1005e] border-[#fda4c9] font-bold'
                                  : 'bg-[#f6f3ee] text-[#594047] border-[#e5e2dd] hover:bg-[#ebe8e3]'
                              }`}
                            >
                              📍 {q.locality}, {q.city}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Salon Name */}
                      <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <label className="text-xs font-bold text-[#1c1c19] flex items-center justify-between">
                          <span>Salon / Business Trade Name *</span>
                          {formErrors.salonName && (
                            <span className="text-[11px] text-rose-600 font-semibold">{formErrors.salonName}</span>
                          )}
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Aura Luxury Hair & Nail Lounge"
                          value={formData.salonName}
                          onChange={(e) => handleInputChange('salonName', e.target.value)}
                          className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#1c1c19] placeholder:text-[#8d6f77] outline-none transition-all ${
                            formErrors.salonName
                              ? 'border-rose-500 bg-rose-50/30 ring-2 ring-rose-200'
                              : 'border-[#e5e2dd] bg-[#fcf9f4] focus:bg-white focus:border-[#d91b77] focus:ring-2 focus:ring-[#d91b77]/20'
                          }`}
                        />
                      </div>

                      {/* Category Selection */}
                      <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <label className="text-xs font-bold text-[#1c1c19]">Business Category</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                          {categories.map((cat) => {
                            const isSelected = formData.category === cat.id;
                            return (
                              <button
                                key={cat.id}
                                type="button"
                                onClick={() => handleInputChange('category', cat.id)}
                                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                                  isSelected
                                    ? 'bg-[#ffd9e2]/50 border-[#d91b77] shadow-xs'
                                    : 'bg-[#f6f3ee] border-[#e5e2dd] hover:bg-[#ebe8e3]'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span
                                    className={`material-symbols-outlined text-[20px] ${
                                      isSelected ? 'text-[#b1005e]' : 'text-[#594047]'
                                    }`}
                                  >
                                    {cat.icon}
                                  </span>
                                  {isSelected && (
                                    <span className="material-symbols-outlined text-[16px] text-[#b1005e]">
                                      check_circle
                                    </span>
                                  )}
                                </div>
                                <span className="text-xs font-bold text-[#1c1c19]">{cat.label}</span>
                                <span className="text-[10px] text-[#594047] line-clamp-1">{cat.sub}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Owner Name */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-[#1c1c19] flex items-center justify-between">
                          <span>Owner / Manager Full Name *</span>
                          {formErrors.ownerName && (
                            <span className="text-[11px] text-rose-600 font-semibold">{formErrors.ownerName}</span>
                          )}
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Kavita Rao"
                          value={formData.ownerName}
                          onChange={(e) => handleInputChange('ownerName', e.target.value)}
                          className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#1c1c19] placeholder:text-[#8d6f77] outline-none transition-all ${
                            formErrors.ownerName
                              ? 'border-rose-500 bg-rose-50/30 ring-2 ring-rose-200'
                              : 'border-[#e5e2dd] bg-[#fcf9f4] focus:bg-white focus:border-[#d91b77] focus:ring-2 focus:ring-[#d91b77]/20'
                          }`}
                        />
                      </div>

                      {/* Phone Number */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-[#1c1c19] flex items-center justify-between">
                          <span>WhatsApp Mobile Number *</span>
                          {formErrors.phone && (
                            <span className="text-[11px] text-rose-600 font-semibold">{formErrors.phone}</span>
                          )}
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-2.5 text-xs font-bold text-[#594047]">+91</span>
                          <input
                            type="tel"
                            maxLength={10}
                            placeholder="98765 43210"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value.replace(/\D/g, ''))}
                            className={`w-full pl-12 pr-4 py-2.5 rounded-xl border text-sm text-[#1c1c19] placeholder:text-[#8d6f77] outline-none transition-all ${
                              formErrors.phone
                                ? 'border-rose-500 bg-rose-50/30 ring-2 ring-rose-200'
                              : 'border-[#e5e2dd] bg-[#fcf9f4] focus:bg-white focus:border-[#d91b77] focus:ring-2 focus:ring-[#d91b77]/20'
                            }`}
                          />
                        </div>
                      </div>

                      {/* Locality & City */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-[#1c1c19]">Locality / Suburb *</label>
                        <input
                          type="text"
                          placeholder="e.g. Bandra West, Indiranagar"
                          value={formData.locality}
                          onChange={(e) => handleInputChange('locality', e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-[#e5e2dd] bg-[#fcf9f4] focus:bg-white focus:border-[#d91b77] focus:ring-2 focus:ring-[#d91b77]/20 text-sm outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-[#1c1c19]">City *</label>
                        <select
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-[#e5e2dd] bg-[#fcf9f4] focus:bg-white focus:border-[#d91b77] text-sm outline-none cursor-pointer"
                        >
                          <option value="Mumbai">Mumbai</option>
                          <option value="Bengaluru">Bengaluru</option>
                          <option value="Delhi NCR">Delhi NCR</option>
                          <option value="Pune">Pune</option>
                          <option value="Hyderabad">Hyderabad</option>
                          <option value="Chennai">Chennai</option>
                          <option value="Ahmedabad">Ahmedabad</option>
                          <option value="Kolkata">Kolkata</option>
                          <option value="Jaipur">Jaipur</option>
                          <option value="Lucknow">Lucknow</option>
                          <option value="Other">Other City</option>
                        </select>
                      </div>

                      {/* Physical Address */}
                      <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <label className="text-xs font-bold text-[#1c1c19]">
                          Complete Street Address &amp; Landmarks
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Building name, shop number, road name, nearest landmark..."
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className="w-full px-4 py-2 rounded-xl border border-[#e5e2dd] bg-[#fcf9f4] focus:bg-white focus:border-[#d91b77] text-xs sm:text-sm outline-none resize-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: HARDWARE & SCALE CONFIGURATION */}
                {currentStep === 2 && (
                  <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-[#1c1c19] flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#b1005e]">tune</span>
                        <span>Step 2: Business Scale &amp; Hardware Selection</span>
                      </h2>
                      <p className="text-xs text-[#594047] mt-1">
                        Tailor the terminal setup to the salon’s physical capacity and transaction velocity.
                      </p>
                    </div>

                    {/* Hardware Selection Cards */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-[#1c1c19] uppercase tracking-wider">
                        Terminal Hardware Kit (Dispatched in 24h)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {hardwareOptions.map((hw) => {
                          const isSelected = formData.hardwareType === hw.id;
                          return (
                            <div
                              key={hw.id}
                              onClick={() => handleInputChange('hardwareType', hw.id)}
                              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                                isSelected
                                  ? 'bg-white border-[#d91b77] ring-2 ring-[#d91b77]/20 shadow-md'
                                  : 'bg-[#f6f3ee] border-[#e5e2dd] hover:bg-[#ebe8e3]'
                              }`}
                            >
                              <div className="flex flex-col gap-1.5">
                                <div className="flex items-center justify-between">
                                  <span
                                    className="material-symbols-outlined text-[24px]"
                                    style={{ color: hw.color }}
                                  >
                                    {hw.icon}
                                  </span>
                                  <span
                                    className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                                    style={{
                                      backgroundColor: `${hw.color}20`,
                                      color: hw.color
                                    }}
                                  >
                                    {hw.badge}
                                  </span>
                                </div>
                                <span className="text-sm font-bold text-[#1c1c19] mt-1">{hw.name}</span>
                                <p className="text-[11px] text-[#594047] leading-relaxed">{hw.desc}</p>
                              </div>

                              <div className="pt-2 border-t border-[#e5e2dd] flex items-center justify-between text-xs">
                                <span className="font-extrabold text-[#1c1c19]">{hw.price}</span>
                                <span className="font-bold text-[#d91b77]">{hw.incentive}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Number of Chairs / Treatment Stations */}
                    <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-[#1c1c19]">Styling Chairs / Stations</span>
                          <span className="text-[11px] text-[#594047]">
                            Higher chair count boosts estimated recurring volume
                          </span>
                        </div>
                        <span className="text-lg font-extrabold text-[#b1005e] px-3 py-1 rounded-xl bg-white border border-[#e5e2dd]">
                          {formData.chairs} Chairs
                        </span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={25}
                        value={formData.chairs}
                        onChange={(e) => handleInputChange('chairs', Number(e.target.value))}
                        className="w-full accent-[#d91b77] cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] font-bold text-[#594047]">
                        <span>Single Chair (Boutique)</span>
                        <span>10 Chairs (Medium Salon)</span>
                        <span>25+ Chairs (Luxury Studio)</span>
                      </div>
                    </div>

                    {/* Expected Monthly Card/UPI Volume */}
                    <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-[#1c1c19]">Estimated Monthly Volume (UPI/Cards)</span>
                          <span className="text-[11px] text-[#594047]">
                            Used to forecast your monthly 0.28% volume brokerage
                          </span>
                        </div>
                        <span className="text-base font-extrabold text-[#735c00] px-3 py-1 rounded-xl bg-[#ffe088] border border-[#cca730]/30">
                          {formatRupees(formData.expectedVolume)}/mo
                        </span>
                      </div>
                      <input
                        type="range"
                        min={100000}
                        max={1500000}
                        step={50000}
                        value={formData.expectedVolume}
                        onChange={(e) => handleInputChange('expectedVolume', Number(e.target.value))}
                        className="w-full accent-[#735c00] cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] font-bold text-[#594047]">
                        <span>₹1.0 Lakh</span>
                        <span>₹7.5 Lakhs (Average)</span>
                        <span>₹15.0 Lakhs+</span>
                      </div>
                    </div>

                    {/* Voice Confirmation Language & Settlement */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-[#1c1c19]">Soundbox Voice Audio Language</label>
                        <select
                          value={formData.preferredLanguage}
                          onChange={(e) => handleInputChange('preferredLanguage', e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-[#e5e2dd] bg-[#fcf9f4] text-xs sm:text-sm outline-none cursor-pointer"
                        >
                          <option value="Hindi & English">Hindi &amp; English (Default)</option>
                          <option value="Kannada & English">Kannada &amp; English (Bengaluru)</option>
                          <option value="Marathi & Hindi">Marathi &amp; Hindi (Maharashtra)</option>
                          <option value="Tamil & English">Tamil &amp; English (Chennai)</option>
                          <option value="Telugu & English">Telugu &amp; English (Hyderabad)</option>
                          <option value="Gujarati & Hindi">Gujarati &amp; Hindi (Gujarat)</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-[#1c1c19]">Merchant Settlement Cycle</label>
                        <select
                          value={formData.settlementType}
                          onChange={(e) => handleInputChange('settlementType', e.target.value as any)}
                          className="w-full px-4 py-2.5 rounded-xl border border-[#e5e2dd] bg-[#fcf9f4] text-xs sm:text-sm outline-none cursor-pointer"
                        >
                          <option value="instant">Instant Real-Time Payout (T+0)</option>
                          <option value="daily">End-of-Day Batch (T+1 at 11 PM)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: INCENTIVE SUMMARY & REVIEW */}
                {currentStep === 3 && (
                  <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-[#1c1c19] flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#b1005e]">payments</span>
                        <span>Step 3: Projected Earnings &amp; Confirmation</span>
                      </h2>
                      <p className="text-xs text-[#594047] mt-1">
                        Review the projected payouts for this merchant referral and submit into the onboarding pipeline.
                      </p>
                    </div>

                    {/* Partner Projected Earnings Showcase Card */}
                    <div className="p-5 rounded-3xl bg-gradient-to-br from-[#1c1c19] to-[#2d2b27] text-white border border-[#3c3a36] shadow-xl flex flex-col gap-4">
                      <div className="flex items-center justify-between border-b border-[#3c3a36] pb-3">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#fda4c9]">military_tech</span>
                          <span className="text-xs font-bold uppercase tracking-wider text-[#fda4c9]">
                            Your Estimated Earnings from {formData.salonName || 'This Salon'}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#3c3a36] text-[#ffe088]">
                          Gold Tier Rate (1.2x)
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {/* Activation Bonus */}
                        <div className="p-3 rounded-2xl bg-[#282622] border border-[#3c3a36] flex flex-col">
                          <span className="text-[10px] font-bold uppercase text-[#a8a29e]">Upfront Activation</span>
                          <span className="text-xl font-extrabold text-[#fda4c9] mt-1">
                            {formatRupees(incentives.baseActivation)}
                          </span>
                          <span className="text-[10px] text-[#b4aba4] mt-0.5">
                            Released on 50th transaction
                          </span>
                        </div>

                        {/* Monthly Recurring */}
                        <div className="p-3 rounded-2xl bg-[#282622] border border-[#3c3a36] flex flex-col">
                          <span className="text-[10px] font-bold uppercase text-[#a8a29e]">Monthly Recurring</span>
                          <span className="text-xl font-extrabold text-[#ffe088] mt-1">
                            {formatRupees(incentives.monthlyBrokerage)}/mo
                          </span>
                          <span className="text-[10px] text-[#b4aba4] mt-0.5">
                            Passive volume split (0.28%)
                          </span>
                        </div>

                        {/* 1-Year Projected Value */}
                        <div className="p-3 rounded-2xl bg-gradient-to-br from-[#d91b77]/25 to-transparent border border-[#d91b77]/40 flex flex-col">
                          <span className="text-[10px] font-bold uppercase text-[#ffd9e2]">1-Year Value</span>
                          <span className="text-xl font-extrabold text-white mt-1">
                            {formatRupees(incentives.yearlyValue)}
                          </span>
                          <span className="text-[10px] text-[#ffd9e2] mt-0.5">
                            Lifetime compounding revenue
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Merchant Summary Review Table */}
                    <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] flex flex-col gap-3">
                      <span className="text-xs font-bold uppercase text-[#594047] tracking-wider">
                        Referral Summary Breakdown
                      </span>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <div>
                          <span className="text-[10px] text-[#594047] block">Salon Name</span>
                          <strong className="text-[#1c1c19] text-sm truncate block">
                            {formData.salonName || '—'}
                          </strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#594047] block">Owner Contact</span>
                          <strong className="text-[#1c1c19] text-sm block">
                            {formData.ownerName || '—'} (+91 {formData.phone || '—'})
                          </strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#594047] block">Location</span>
                          <strong className="text-[#1c1c19] text-sm block">
                            {formData.locality}, {formData.city}
                          </strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#594047] block">Hardware Choice</span>
                          <strong className="text-[#b1005e] text-sm block">
                            {formData.hardwareType === 'soundbox'
                              ? '4G Voice Soundbox'
                              : formData.hardwareType === 'pos'
                              ? 'SmartPOS Terminal'
                              : 'QR Standee'}
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* Next Steps Info Box */}
                    <div className="p-4 rounded-2xl bg-[#ffd9e2]/30 border border-[#fda4c9] flex items-start gap-3 text-xs text-[#594047]">
                      <span className="material-symbols-outlined text-[#b1005e] text-[20px] shrink-0 mt-0.5">
                        info
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <strong className="text-[#1c1c19]">What happens next?</strong>
                        <p className="leading-relaxed">
                          1. An automated DigiLocker KYC verification link will be dispatched to {formData.ownerName || 'the owner'} via WhatsApp.<br />
                          2. Hardware kit will be queued for 24h dispatch to {formData.locality}, {formData.city}.<br />
                          3. Your partner account (REF-5A45019655) will be locked in as the referral beneficiary for all ongoing QR transactions.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Wizard Footer Navigation Buttons */}
                <div className="pt-4 border-t border-[#e5e2dd] flex items-center justify-between gap-3">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentStep((prev) => prev - 1)}
                      className="px-5 py-2.5 rounded-xl bg-[#f0ede9] hover:bg-[#e5e2dd] text-xs font-bold text-[#1c1c19] transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                      <span>Previous</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-6 py-2.5 rounded-xl bg-[#d91b77] hover:bg-[#b1005e] text-white text-xs font-bold shadow-md shadow-[#d91b77]/30 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Continue</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 rounded-xl bg-[#d91b77] hover:bg-[#b1005e] text-white text-sm font-extrabold shadow-lg shadow-[#d91b77]/30 transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="material-symbols-outlined text-[18px] animate-spin">
                            progress_activity
                          </span>
                          <span>Dispatching Referral...</span>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-[18px]">send</span>
                          <span>Complete &amp; Submit Referral</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Right 4 Cols: Live Preview & Partner Perks Card */}
            <div className="lg:col-span-4 flex flex-col gap-5 sticky top-24">
              {/* Dynamic Live Merchant ID Preview Card */}
              <div className="p-5 rounded-3xl bg-white border border-[#e5e2dd] shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-[#8e4767] tracking-wider">
                    Live Partner Card Preview
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Pending Onboarding
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#ffd9e2] text-[#b1005e] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[24px]">storefront</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-bold text-[#1c1c19] truncate">
                        {formData.salonName || 'Salon Name'}
                      </span>
                      <span className="text-[11px] text-[#594047] truncate">
                        {formData.locality}, {formData.city}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[#e5e2dd]/70">
                    <span className="text-[#594047]">Category: {formData.category}</span>
                    <span className="font-bold text-[#b1005e]">{formData.chairs} Chairs</span>
                  </div>
                </div>

                {/* Instant Incentive Quick Numbers */}
                <div className="flex flex-col gap-2 pt-2 border-t border-[#e5e2dd]">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#594047]">Activation Bonus</span>
                    <span className="font-extrabold text-[#d91b77]">
                      {formatRupees(incentives.baseActivation)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#594047]">Est. Monthly Passive</span>
                    <span className="font-extrabold text-[#735c00]">
                      {formatRupees(incentives.monthlyBrokerage)}/mo
                    </span>
                  </div>
                </div>
              </div>

              {/* Tips for Fastest Onboarding */}
              <div className="p-5 rounded-3xl bg-[#f0ede9] border border-[#e5e2dd] flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[#735c00] text-xs font-bold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                  <span>Pro-Tips for 100% SLA</span>
                </div>
                <ul className="text-xs text-[#594047] flex flex-col gap-2 leading-relaxed">
                  <li className="flex items-start gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-emerald-600 shrink-0 mt-0.5">
                      check
                    </span>
                    <span>Ensure the owner's WhatsApp number matches their Aadhaar-linked phone for instant DigiLocker approval.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-emerald-600 shrink-0 mt-0.5">
                      check
                    </span>
                    <span>Salons doing over ₹2.5L volume hit the 50-transaction milestone in an average of 14 days.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SUBMISSION SUCCESS SCREEN                                                 */}
        {/* ========================================================================= */}
        {activeTab === 'form' && submittedSalon && (
          <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-white border border-[#e5e2dd] shadow-xl flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 shadow-sm">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>

            <span className="px-3 py-1 rounded-full bg-[#ffd9e2] text-[#b1005e] text-xs font-extrabold uppercase tracking-wider mb-2">
              Referral Registered Successfully
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1c1c19] tracking-tight">
              {submittedSalon.name} is in the Onboarding Pipeline!
            </h2>

            <p className="text-xs sm:text-sm text-[#594047] max-w-md mt-2 leading-relaxed">
              Referral token <strong>{submittedSalon.id}</strong> has been linked to your partner account. DigiLocker KYC link has been sent to {submittedSalon.owner}.
            </p>

            {/* Payout Forecast Banner */}
            <div className="w-full my-6 p-4 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] grid grid-cols-2 gap-4 text-left">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-[#594047]">Activation Reward</span>
                <span className="text-lg font-extrabold text-[#d91b77]">
                  {formatRupees(submittedSalon.activationBonus)}
                </span>
                <span className="text-[10px] text-[#8d6f77]">Credited on 50th QR txn</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-[#594047]">Projected Passive</span>
                <span className="text-lg font-extrabold text-[#735c00]">
                  {formatRupees(submittedSalon.monthlyRecurring)}/mo
                </span>
                <span className="text-[10px] text-[#8d6f77]">Lifetime 0.28% volume share</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 flex-wrap justify-center w-full">
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-2.5 rounded-xl bg-[#f0ede9] hover:bg-[#e5e2dd] text-xs font-bold text-[#1c1c19] transition-colors cursor-pointer"
              >
                + Refer Another Salon
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onNavigateToSalonIntelligence) onNavigateToSalonIntelligence();
                }}
                className="px-6 py-2.5 rounded-xl bg-[#d91b77] hover:bg-[#b1005e] text-white text-xs font-bold shadow-md shadow-[#d91b77]/25 transition-all cursor-pointer"
              >
                View in Salon Intelligence →
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: QUICK WHATSAPP & QR INVITE GENERATOR                               */}
        {/* ========================================================================= */}
        {activeTab === 'quick-invite' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e5e2dd] shadow-sm flex flex-col gap-5">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#1c1c19] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#25D366]">chat</span>
                    <span>Personalized WhatsApp Invite Generator</span>
                  </h2>
                  <p className="text-xs text-[#594047] mt-1">
                    Generate an instant customized message with your unique referral link to send directly to salon owners via WhatsApp.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#1c1c19]">Salon Name (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Envi Salon"
                      value={quickInviteSalonName}
                      onChange={(e) => setQuickInviteSalonName(e.target.value)}
                      className="px-4 py-2.5 rounded-xl border border-[#e5e2dd] bg-[#fcf9f4] text-xs sm:text-sm outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-[#1c1c19]">Owner Name (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh"
                      value={quickInviteOwnerName}
                      onChange={(e) => setQuickInviteOwnerName(e.target.value)}
                      className="px-4 py-2.5 rounded-xl border border-[#e5e2dd] bg-[#fcf9f4] text-xs sm:text-sm outline-none"
                    />
                  </div>
                </div>

                {/* Pre-Formatted Message Box */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#594047] uppercase tracking-wider">
                    Generated WhatsApp Invite Preview
                  </label>
                  <div className="p-4 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] text-xs font-mono text-[#1c1c19] leading-relaxed whitespace-pre-line select-all">
                    {getWhatsAppMessage(quickInviteSalonName, quickInviteOwnerName)}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    type="button"
                    onClick={handleOpenWhatsApp}
                    className="flex-1 min-w-[200px] py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/25 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    <span>Send via WhatsApp App</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyWhatsAppMsg}
                    className="px-4 py-3 rounded-xl bg-[#f0ede9] hover:bg-[#e5e2dd] text-xs font-bold text-[#1c1c19] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {copiedMessage ? 'check' : 'content_copy'}
                    </span>
                    <span>{copiedMessage ? 'Copied Message!' : 'Copy Message'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyQuickLink}
                    className="px-4 py-3 rounded-xl bg-[#f0ede9] hover:bg-[#e5e2dd] text-xs font-bold text-[#b1005e] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {copiedLink ? 'check' : 'link'}
                    </span>
                    <span>{copiedLink ? 'Copied Link!' : 'Copy Link Only'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: In-Person QR Code Showcase */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="p-6 rounded-3xl bg-white border border-[#e5e2dd] shadow-sm flex flex-col items-center text-center gap-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8e4767]">
                  In-Person Onboarding QR
                </span>

                <div className="p-5 rounded-2xl bg-[#fcf9f4] border border-[#e5e2dd] flex flex-col items-center shadow-inner">
                  {/* Generated SVG QR Visual */}
                  <svg className="w-48 h-48" viewBox="0 0 100 100">
                    <rect width="100" height="100" fill="#ffffff" rx="10" />
                    {/* Position Detection Squares */}
                    <rect x="8" y="8" width="24" height="24" fill="#1c1c19" rx="3" />
                    <rect x="12" y="12" width="16" height="16" fill="#ffffff" rx="2" />
                    <rect x="15" y="15" width="10" height="10" fill="#d91b77" rx="1" />

                    <rect x="68" y="8" width="24" height="24" fill="#1c1c19" rx="3" />
                    <rect x="72" y="12" width="16" height="16" fill="#ffffff" rx="2" />
                    <rect x="75" y="15" width="10" height="10" fill="#d91b77" rx="1" />

                    <rect x="8" y="68" width="24" height="24" fill="#1c1c19" rx="3" />
                    <rect x="12" y="72" width="16" height="16" fill="#ffffff" rx="2" />
                    <rect x="15" y="75" width="10" height="10" fill="#d91b77" rx="1" />

                    {/* Data matrix dots */}
                    <circle cx="40" cy="18" r="2.5" fill="#1c1c19" />
                    <circle cx="48" cy="18" r="2.5" fill="#1c1c19" />
                    <circle cx="56" cy="18" r="2.5" fill="#1c1c19" />
                    <circle cx="40" cy="28" r="2.5" fill="#d91b77" />
                    <circle cx="50" cy="28" r="2.5" fill="#1c1c19" />
                    <circle cx="60" cy="28" r="2.5" fill="#1c1c19" />
                    <circle cx="45" cy="38" r="2.5" fill="#1c1c19" />
                    <circle cx="55" cy="38" r="2.5" fill="#d91b77" />
                    <circle cx="40" cy="50" r="3" fill="#1c1c19" />
                    <circle cx="50" cy="50" r="3" fill="#d91b77" />
                    <circle cx="60" cy="50" r="3" fill="#1c1c19" />
                    <circle cx="40" cy="62" r="2.5" fill="#1c1c19" />
                    <circle cx="50" cy="62" r="2.5" fill="#1c1c19" />
                    <circle cx="60" cy="62" r="2.5" fill="#d91b77" />
                    <circle cx="70" cy="62" r="2.5" fill="#1c1c19" />
                    <circle cx="80" cy="62" r="2.5" fill="#1c1c19" />
                    <circle cx="40" cy="72" r="2.5" fill="#d91b77" />
                    <circle cx="50" cy="72" r="2.5" fill="#1c1c19" />
                    <circle cx="60" cy="72" r="2.5" fill="#1c1c19" />
                    <circle cx="72" cy="72" r="2.5" fill="#1c1c19" />
                    <circle cx="82" cy="72" r="2.5" fill="#1c1c19" />
                    <circle cx="45" cy="82" r="2.5" fill="#1c1c19" />
                    <circle cx="55" cy="82" r="2.5" fill="#d91b77" />
                    <circle cx="68" cy="82" r="2.5" fill="#1c1c19" />
                    <circle cx="80" cy="82" r="2.5" fill="#1c1c19" />
                  </svg>
                  <span className="text-[11px] font-bold text-[#1c1c19] mt-3">
                    Scan with any phone camera
                  </span>
                  <span className="text-[10px] text-[#594047]">
                    Opens merchant signup with Growth Partner pre-filled
                  </span>
                </div>

                <div className="w-full text-center">
                  <span className="text-xs text-[#594047]">Partner Referral ID</span>
                  <div className="text-sm font-extrabold text-[#b1005e] tracking-wider font-mono mt-0.5">
                    REF-5A45019655
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: RECENT SUBMISSIONS / PIPELINE LIST                                 */}
        {/* ========================================================================= */}
        {activeTab === 'drafts' && (
          <div className="flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-[#1c1c19]">
                  Recent Salon Referral Pipeline
                </h2>
                <p className="text-xs text-[#594047]">
                  Monitor verification checkpoints and activation timelines for recently added salons.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('form')}
                className="px-4 py-2 rounded-xl bg-[#d91b77] text-white text-xs font-bold shadow-xs hover:bg-[#b1005e] transition-all cursor-pointer"
              >
                + Add New Salon
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {[
                {
                  id: 'NX-SLN-0841',
                  name: 'Glow & Grace Unisex Salon',
                  owner: 'Rajesh Sharma',
                  location: 'Bandra West, Mumbai',
                  status: 'Qualified (100%)',
                  bonus: '₹1,500 Released',
                  progress: '100%',
                  progressColor: 'bg-emerald-500',
                  stage: 'QR Active (Day 24, 182 Txns)'
                },
                {
                  id: 'NX-SLN-0922',
                  name: 'Elegance Studio & Spa',
                  owner: 'Priya Nair',
                  location: 'Indiranagar, Bengaluru',
                  status: 'In Progress (Day 9/30)',
                  bonus: '+₹2,500 Pending',
                  progress: '30%',
                  progressColor: 'bg-[#d91b77]',
                  stage: '44 of 50 Txns Cleared'
                },
                {
                  id: 'NX-SLN-1014',
                  name: 'Royal Looks Barbershop',
                  owner: 'Amit Verma',
                  location: 'Connaught Place, Delhi',
                  status: 'Kit In Transit',
                  bonus: '+₹2,500 Pending',
                  progress: '10%',
                  progressColor: 'bg-[#cca730]',
                  stage: 'Soundbox Delivery Tomorrow'
                },
                {
                  id: 'NX-SLN-0789',
                  name: 'Velvet Touch Lounge',
                  owner: 'Sunita Kadam',
                  location: 'Kothrud, Pune',
                  status: 'Action Required',
                  bonus: '+₹1,500 On Hold',
                  progress: '15%',
                  progressColor: 'bg-rose-500',
                  stage: 'Electricity Bill Re-upload Req.'
                }
              ].map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-white border border-[#e5e2dd] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#ffd9e2] text-[#b1005e] flex items-center justify-center shrink-0 font-bold text-xs">
                      <span className="material-symbols-outlined text-[22px]">storefront</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#1c1c19]">{item.name}</span>
                        <span className="text-[10px] text-[#8d6f77] font-mono">{item.id}</span>
                      </div>
                      <span className="text-xs text-[#594047]">
                        {item.owner} • {item.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#e5e2dd]/60">
                    <div className="flex flex-col sm:text-right">
                      <span className="text-xs font-bold text-[#1c1c19]">{item.status}</span>
                      <span className="text-[11px] text-[#594047]">{item.stage}</span>
                    </div>
                    <span className="text-xs font-extrabold text-[#d91b77] px-3 py-1 rounded-xl bg-[#ffd9e2]/50 border border-[#fda4c9]/40 whitespace-nowrap">
                      {item.bonus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
