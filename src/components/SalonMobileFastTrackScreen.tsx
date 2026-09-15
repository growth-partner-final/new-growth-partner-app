import React, { useState, useEffect } from 'react';

interface SalonMobileFastTrackScreenProps {
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
}

export const SalonMobileFastTrackScreen: React.FC<SalonMobileFastTrackScreenProps> = ({
  onNavigateToHub,
  onNavigateToSalonIntelligence,
  onNavigateToLeaderboard,
  onNavigateToReferralTimeline,
  onNavigateToShareEarn,
  onNavigateToAddSalon,
  onNavigateToDashboard,
  onNavigateToMerchantRegister,
  onNavigateToLockedOnboarding,
  onNavigateToStepAuditWorkspace
}) => {
  // Form State
  const [pincode, setPincode] = useState<string>('560038');
  const [resolvedLocation, setResolvedLocation] = useState<string>('Indiranagar, Bengaluru');
  const [isPinValid, setIsPinValid] = useState<boolean>(true);
  const [streetAddress, setStreetAddress] = useState<string>(
    'Shop 4, Ground Floor, 100ft Road, Near Metro Pillar 124'
  );
  const [landmark, setLandmark] = useState<string>('Opposite Toit Brewpub');
  const [city, setCity] = useState<string>('Bengaluru');
  const [stateVal, setStateVal] = useState<string>('Karnataka');
  const [coordinates, setCoordinates] = useState<string>('12.9783° N, 77.6408° E');
  const [isMapModalOpen, setIsMapModalOpen] = useState<boolean>(false);

  // Status & Timing State
  const [autosaveStatus, setAutosaveStatus] = useState<string>('Autosaved 10s ago');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Owner & Salon expandable edit states
  const [editingOwner, setEditingOwner] = useState<boolean>(false);
  const [ownerName, setOwnerName] = useState<string>('Aarav Singhania');
  const [ownerPhone, setOwnerPhone] = useState<string>('+91 98450 33210');

  const [editingSalon, setEditingSalon] = useState<boolean>(false);
  const [salonName, setSalonName] = useState<string>('Luxe Aura Hair & Spa');
  const [gstin, setGstin] = useState<string>('29AABCS1429B1ZB');

  // Interactive Pin Auto-Resolver
  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPincode(val);

    if (val.length === 6) {
      setIsPinValid(true);
      if (val === '560038') {
        setResolvedLocation('Indiranagar, Bengaluru');
        setCity('Bengaluru');
        setStateVal('Karnataka');
        setCoordinates('12.9783° N, 77.6408° E');
      } else if (val.startsWith('560')) {
        setResolvedLocation('Bengaluru Urban Zone');
        setCity('Bengaluru');
        setStateVal('Karnataka');
        setCoordinates('12.9352° N, 77.6245° E');
      } else if (val.startsWith('400')) {
        setResolvedLocation('Mumbai Central Zone');
        setCity('Mumbai');
        setStateVal('Maharashtra');
        setCoordinates('18.9690° N, 72.8205° E');
      } else if (val.startsWith('110')) {
        setResolvedLocation('South Delhi District');
        setCity('Delhi NCR');
        setStateVal('Delhi');
        setCoordinates('28.5355° N, 77.2410° E');
      } else {
        setResolvedLocation('Commercial Hub Zone');
      }
      setAutosaveStatus('Auto-saved just now');
      showToast('Pincode verified! Delivery hub coordinates synchronized.');
    } else {
      setIsPinValid(false);
      setResolvedLocation('Enter 6 digits...');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveAndContinue = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast('Location saved! Progressing to Step 4: Business Operations');
      if (onNavigateToStepAuditWorkspace) {
        onNavigateToStepAuditWorkspace();
      }
    }, 900);
  };

  return (
    <div className="bg-[#fcf9f4] text-[#1c1c19] font-sans flex flex-col min-h-screen selection:bg-[#fda4c9]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#31302d] text-white shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200 border border-white/10 max-w-sm text-center">
          <span className="material-symbols-outlined text-[18px] text-[#ffe088]">check_circle</span>
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex flex-col relative w-full bg-[#fcf9f4] min-h-screen max-w-md mx-auto sm:max-w-xl md:max-w-2xl px-3 sm:px-4 pb-36 pt-4">
        {/* Top Ambient Glow */}
        <div className="relative w-full overflow-hidden">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-[#d91b77]/10 blur-3xl pointer-events-none" />

          {/* Partner Lock & Cloud Status Header */}
          <div className="pt-2 pb-2 flex flex-col gap-2 relative z-10">
            <div className="flex items-center justify-between text-[#1c1c19]">
              <div className="flex items-center gap-1.5 bg-[#ebe8e3] px-3 py-1 rounded-full shadow-2xs border border-[#e5e2dd]">
                <span className="material-symbols-outlined text-[#8e4767] text-base leading-none">
                  lock
                </span>
                <span className="text-xs font-bold text-[#8e4767] truncate max-w-[200px] sm:max-w-none">
                  Partner: Marcus Vance (NEX-88219)
                </span>
              </div>
              <button
                onClick={() => {
                  showToast('Draft retained for 14 days in cloud storage.');
                  if (onNavigateToSalonIntelligence) onNavigateToSalonIntelligence();
                }}
                className="text-[#8e4767] text-xs font-bold flex items-center gap-1 active:opacity-70 transition-opacity cursor-pointer"
                type="button"
              >
                <span>Resume later</span>
                <span className="material-symbols-outlined text-sm">schedule</span>
              </button>
            </div>

            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-1.5" id="autosave-indicator">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#cca730] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#cca730]" />
                </span>
                <span className="text-xs text-[#594047] font-semibold">{autosaveStatus}</span>
              </div>
              <span className="text-xs text-[#b1005e] font-black tracking-tight">
                Fast-Track Onboarding
              </span>
            </div>
          </div>

          {/* Step Stepper Card */}
          <div className="py-2">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-xs border border-[#e5e2dd] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs text-[#b1005e] font-black uppercase tracking-wider">
                    Step 3 of 5
                  </span>
                  <h1 className="text-xl sm:text-2xl font-black text-[#1c1c19]">
                    Address &amp; Location
                  </h1>
                </div>
                {/* Radial Progress / Percentage */}
                <div className="relative flex items-center justify-center w-12 h-12">
                  <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-[#e5e2dd]"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                    <path
                      className="text-[#d91b77] transition-all duration-500"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray="60, 100"
                      strokeLinecap="round"
                      strokeWidth="3"
                    />
                  </svg>
                  <span className="absolute text-xs font-black text-[#1c1c19]">60%</span>
                </div>
              </div>

              {/* Progress track horizontal scroll pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigateToStepAuditWorkspace) onNavigateToStepAuditWorkspace();
                  }}
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#f0ede9] text-[#594047] text-xs font-bold whitespace-nowrap cursor-pointer hover:bg-[#e5e2dd]"
                >
                  <span
                    className="material-symbols-outlined text-xs text-[#b1005e]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  1. Owner
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigateToStepAuditWorkspace) onNavigateToStepAuditWorkspace();
                  }}
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#f0ede9] text-[#594047] text-xs font-bold whitespace-nowrap cursor-pointer hover:bg-[#e5e2dd]"
                >
                  <span
                    className="material-symbols-outlined text-xs text-[#b1005e]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  2. Salon
                </button>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d91b77] text-white text-xs font-extrabold shadow-xs whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  3. Address • Active
                </div>
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#f6f3ee] text-[#8d6f77] text-xs font-semibold whitespace-nowrap opacity-60">
                  4. Business
                </div>
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#f6f3ee] text-[#8d6f77] text-xs font-semibold whitespace-nowrap opacity-60">
                  5. Review
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Form */}
          <div className="flex flex-col gap-4">
            {/* Section 1: Collapsed Owner Details */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xs border border-[#e5e2dd] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-[#ebe8e3] flex items-center justify-center text-[#b1005e] shrink-0">
                    <span
                      className="material-symbols-outlined text-lg"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      person_check
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-[#1c1c19] truncate">{ownerName}</span>
                      <span className="bg-[#ebe8e3] text-[#594047] text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    </div>
                    <span className="text-xs text-[#594047] truncate">
                      {ownerPhone} • Primary Owner
                    </span>
                  </div>
                </div>
                <button
                  aria-label="Edit Owner Details"
                  onClick={() => setEditingOwner(!editingOwner)}
                  className="p-2 rounded-full hover:bg-[#f0ede9] text-[#8e4767] active:scale-95 transition-transform cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-lg">
                    {editingOwner ? 'check' : 'edit'}
                  </span>
                </button>
              </div>

              {editingOwner && (
                <div className="pt-2 border-t border-[#e5e2dd] grid grid-cols-1 sm:grid-cols-2 gap-2 animate-in fade-in duration-150">
                  <input
                    className="px-3 py-2 bg-[#f6f3ee] rounded-lg text-xs font-semibold border border-[#e5e2dd] focus:outline-none focus:border-[#b1005e]"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="Owner Full Name"
                  />
                  <input
                    className="px-3 py-2 bg-[#f6f3ee] rounded-lg text-xs font-semibold border border-[#e5e2dd] focus:outline-none focus:border-[#b1005e]"
                    value={ownerPhone}
                    onChange={(e) => setOwnerPhone(e.target.value)}
                    placeholder="Mobile Number"
                  />
                </div>
              )}
            </div>

            {/* Section 2: Collapsed Salon Details */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xs border border-[#e5e2dd] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-[#ebe8e3] flex items-center justify-center text-[#b1005e] shrink-0">
                    <span
                      className="material-symbols-outlined text-lg"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      store
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-[#1c1c19] truncate">{salonName}</span>
                      <span className="bg-[#ffd8e5] text-[#3c0223] text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-[#fda4c9]/60">
                        Premium
                      </span>
                    </div>
                    <span className="text-xs text-[#594047] truncate">GSTIN: {gstin}</span>
                  </div>
                </div>
                <button
                  aria-label="Edit Salon Details"
                  onClick={() => setEditingSalon(!editingSalon)}
                  className="p-2 rounded-full hover:bg-[#f0ede9] text-[#8e4767] active:scale-95 transition-transform cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-lg">
                    {editingSalon ? 'check' : 'edit'}
                  </span>
                </button>
              </div>

              {editingSalon && (
                <div className="pt-2 border-t border-[#e5e2dd] grid grid-cols-1 sm:grid-cols-2 gap-2 animate-in fade-in duration-150">
                  <input
                    className="px-3 py-2 bg-[#f6f3ee] rounded-lg text-xs font-semibold border border-[#e5e2dd] focus:outline-none focus:border-[#b1005e]"
                    value={salonName}
                    onChange={(e) => setSalonName(e.target.value)}
                    placeholder="Salon Name"
                  />
                  <input
                    className="px-3 py-2 bg-[#f6f3ee] rounded-lg text-xs font-semibold border border-[#e5e2dd] focus:outline-none focus:border-[#b1005e]"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    placeholder="GSTIN Number"
                  />
                </div>
              )}
            </div>

            {/* Section 3: ACTIVE EXPANDED Address & Location */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-md border border-[#e5e2dd] flex flex-col gap-4">
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#d91b77] text-white font-black text-xs flex items-center justify-center">
                    3
                  </span>
                  <h2 className="text-lg font-black text-[#1c1c19]">Salon Location</h2>
                </div>
                <span className="text-[11px] font-black text-[#b1005e] bg-[#ffd9e2] px-2.5 py-0.5 rounded-full">
                  In Progress
                </span>
              </div>
              <p className="text-xs text-[#594047] leading-relaxed">
                Provide accurate physical location details. This geo-tag is used for Nexora Pay Terminal sync and walk-in client discovery.
              </p>

              {/* PIN Code input with auto-resolver */}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-bold text-[#1c1c19] flex items-center justify-between"
                  htmlFor="pincode-input"
                >
                  <span>
                    PIN Code <span className="text-[#ba1a1a]">*</span>
                  </span>
                  <span className="text-[11px] text-[#735c00] font-black flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-xs">bolt</span> Instant Auto-detect
                  </span>
                </label>
                <div className="relative">
                  <input
                    className="w-full h-12 bg-[#f6f3ee] text-[#1c1c19] rounded-xl px-4 pr-10 text-sm font-mono font-bold focus:outline-none focus:bg-white focus:border-[#b1005e] border border-[#e5e2dd] focus:shadow-xs transition-all placeholder:text-[#8d6f77]"
                    id="pincode-input"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="e.g. 560038"
                    type="text"
                    value={pincode}
                    onChange={handlePincodeChange}
                  />
                  <span className="material-symbols-outlined absolute right-3 top-3.5 text-[#b1005e] text-lg">
                    pin_drop
                  </span>
                </div>

                {/* Auto-resolved badge & validation hint */}
                <div className="flex items-center justify-between mt-1 px-1">
                  <div className="inline-flex items-center gap-1.5 bg-[#ebe8e3] px-2.5 py-1 rounded-lg border border-[#e5e2dd]">
                    <span className="material-symbols-outlined text-[#b1005e] text-sm">
                      location_on
                    </span>
                    <span className="text-xs text-[#1c1c19] font-bold">{resolvedLocation}</span>
                  </div>
                  <span
                    className={`text-xs flex items-center gap-0.5 font-bold ${
                      isPinValid ? 'text-[#735c00]' : 'text-[#ba1a1a]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-xs">
                      {isPinValid ? 'check_circle' : 'error'}
                    </span>
                    {isPinValid ? '6-digit valid' : 'Incomplete PIN'}
                  </span>
                </div>
              </div>

              {/* Full Street Address */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#1c1c19]" htmlFor="address-textarea">
                  Full Street Address / Building <span className="text-[#ba1a1a]">*</span>
                </label>
                <textarea
                  className="w-full bg-[#f6f3ee] text-[#1c1c19] rounded-xl p-3 text-xs sm:text-sm font-medium focus:outline-none focus:bg-white focus:border-[#b1005e] border border-[#e5e2dd] focus:shadow-xs transition-all placeholder:text-[#8d6f77] resize-none"
                  id="address-textarea"
                  placeholder="Shop / Unit number, building name, street"
                  rows={3}
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                />
                <span className="text-[11px] text-[#594047] px-1">
                  Include floor &amp; wing if inside a commercial arcade.
                </span>
              </div>

              {/* Locality / Landmark */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#1c1c19]" htmlFor="landmark-input">
                  Prominent Landmark <span className="text-[#ba1a1a]">*</span>
                </label>
                <input
                  className="w-full h-12 bg-[#f6f3ee] text-[#1c1c19] rounded-xl px-4 text-xs sm:text-sm font-medium focus:outline-none focus:bg-white focus:border-[#b1005e] border border-[#e5e2dd] focus:shadow-xs transition-all placeholder:text-[#8d6f77]"
                  id="landmark-input"
                  placeholder="Nearby landmark or junction"
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                />
              </div>

              {/* City & State Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#1c1c19]" htmlFor="city-select">
                    City
                  </label>
                  <div className="relative">
                    <select
                      className="w-full h-12 bg-[#f6f3ee] text-[#1c1c19] rounded-xl px-3 pr-8 text-xs sm:text-sm font-semibold focus:outline-none border border-[#e5e2dd] appearance-none"
                      id="city-select"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    >
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Chennai">Chennai</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-2.5 top-3.5 text-[#594047] pointer-events-none text-base">
                      expand_more
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[#1c1c19]" htmlFor="state-select">
                    State
                  </label>
                  <div className="relative">
                    <select
                      className="w-full h-12 bg-[#f6f3ee] text-[#1c1c19] rounded-xl px-3 pr-8 text-xs sm:text-sm font-semibold focus:outline-none border border-[#e5e2dd] appearance-none"
                      id="state-select"
                      value={stateVal}
                      onChange={(e) => setStateVal(e.target.value)}
                    >
                      <option value="Karnataka">Karnataka</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-2.5 top-3.5 text-[#594047] pointer-events-none text-base">
                      expand_more
                    </span>
                  </div>
                </div>
              </div>

              {/* Geo-Location Interactive Mock Pin */}
              <div className="bg-[#f0ede9] rounded-xl p-3 flex items-center justify-between mt-1 border border-[#e5e2dd]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#b1005e]">my_location</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-extrabold text-[#1c1c19]">
                      GPS Coordinates Latched
                    </span>
                    <span className="text-[11px] text-[#594047]">{coordinates}</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMapModalOpen(true)}
                  className="text-xs text-[#b1005e] font-black px-3 py-1.5 rounded-lg bg-white shadow-xs active:scale-95 transition-transform cursor-pointer border border-[#e5e2dd]"
                  type="button"
                >
                  Adjust Map
                </button>
              </div>
            </div>

            {/* CRITICAL ADMIN-CONTROLLED VERIFICATION CARD */}
            <div className="bg-[#ebe8e3] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col gap-3 relative overflow-hidden border border-[#e5e2dd]">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#fda4c9] flex items-center justify-center text-[#7a3656] shrink-0">
                    <span className="material-symbols-outlined text-base">verified_user</span>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#8e4767] font-black block">
                      Nexora Shield Gate
                    </span>
                    <h3 className="text-sm font-black text-[#1c1c19] leading-tight">
                      Platform KYC Verification
                    </h3>
                  </div>
                </div>
                <span className="bg-[#ffe088] text-[#241a00] px-2.5 py-0.5 rounded-full text-xs font-black tracking-wide shadow-2xs">
                  PENDING
                </span>
              </div>

              <div className="bg-white/80 rounded-xl p-3 flex flex-col gap-2 border border-[#e5e2dd]/60">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#8e4767] text-sm mt-0.5">lock</span>
                  <p className="text-xs text-[#594047] leading-relaxed">
                    <strong className="text-[#1c1c19]">Admin-Controlled Gate:</strong> This verification status cannot be toggled by the salon owner. Nexora Compliance audits merchant documents within 4 business hours.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-[#e5e2dd]/60">
                  <span className="text-xs text-[#8e4767] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">local_shipping</span>
                    Hardware Standee Dispatched
                  </span>
                  <span className="text-[11px] text-[#8d6f77] font-semibold">
                    Awaiting Step 5 Approval
                  </span>
                </div>
              </div>
            </div>

            {/* Preview Sections: 4 & 5 Combined Peek */}
            <div className="bg-white/50 rounded-2xl p-4 shadow-xs flex flex-col gap-3 opacity-90 border border-[#e5e2dd]">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#8d6f77] uppercase font-black tracking-wider">
                  Upcoming Steps Preview
                </span>
                <span className="material-symbols-outlined text-[#8d6f77] text-base">
                  lock_clock
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[#f6f3ee] p-2.5 rounded-xl flex flex-col border border-[#e5e2dd]/50">
                  <span className="text-[11px] text-[#594047]">Business Hours</span>
                  <span className="text-xs text-[#1c1c19] font-bold">9:30 AM – 9:00 PM</span>
                </div>
                <div className="bg-[#f6f3ee] p-2.5 rounded-xl flex flex-col border border-[#e5e2dd]/50">
                  <span className="text-[11px] text-[#594047]">Active Stylists</span>
                  <span className="text-xs text-[#1c1c19] font-bold">12 Staff Members</span>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <div className="w-4 h-4 rounded-full bg-[#b1005e] text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[10px]">check</span>
                </div>
                <span className="text-xs text-[#594047]">
                  Standard Merchant Agreement &amp; Fee Schedule pre-consented
                </span>
              </div>
            </div>

            {/* Visual Trust Element: Salon Elevation Preview */}
            <div className="bg-white rounded-2xl p-3 shadow-xs flex items-center gap-3 border border-[#e5e2dd]">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-[#8e4767] to-[#d91b77] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <span className="material-symbols-outlined text-[26px]">storefront</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-[#b1005e] font-black">Location Preview Active</span>
                <p className="text-xs text-[#594047] truncate">
                  Indiranagar hub will unlock instant UPI QR split settlement upon completion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Bottom Action Bar with Safe Area Support */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl shadow-2xl px-4 py-3 pb-safe flex flex-col gap-2 border-t border-[#e5e2dd] max-w-md mx-auto sm:max-w-xl md:max-w-2xl">
        {/* Partner WhatsApp Helpline Banner */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5 text-[#594047]">
            <span className="material-symbols-outlined text-[#735c00] text-sm">support_agent</span>
            <span className="text-xs font-semibold">Need help filling this?</span>
          </div>
          <a
            className="text-xs text-[#b1005e] font-extrabold flex items-center gap-1 active:opacity-75 hover:underline"
            href="https://wa.me/?text=Hi%20Marcus,%20can%20you%20help%20me%20complete%20my%20salon%20location%20step?"
            target="_blank"
            rel="noreferrer"
          >
            <span>Chat with Marcus</span>
            <span className="material-symbols-outlined text-xs">open_in_new</span>
          </a>
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center gap-3">
          {/* Back button */}
          <button
            aria-label="Previous Step"
            onClick={() => {
              if (onNavigateToLockedOnboarding) onNavigateToLockedOnboarding();
            }}
            className="h-12 w-12 rounded-full bg-[#f0ede9] flex items-center justify-center text-[#1c1c19] active:scale-95 transition-transform shrink-0 cursor-pointer border border-[#e5e2dd] hover:bg-[#e5e2dd]"
            type="button"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
          </button>

          {/* Primary Save & Continue Button */}
          <button
            onClick={handleSaveAndContinue}
            disabled={isSaving}
            className="flex-1 h-12 rounded-full bg-gradient-to-r from-[#d91b77] to-[#b1005e] text-white text-xs sm:text-sm font-black flex items-center justify-between px-5 shadow-lg shadow-[#b1005e]/25 active:scale-[0.98] transition-transform cursor-pointer"
            id="continue-button"
            type="button"
          >
            <div className="flex items-center gap-2">
              <span>{isSaving ? 'Saving Location...' : 'Save & Continue'}</span>
              <span className="material-symbols-outlined text-sm">
                {isSaving ? 'progress_activity' : 'arrow_forward'}
              </span>
            </div>
            <span className="bg-white/20 text-white text-[11px] font-black px-2.5 py-1 rounded-full backdrop-blur-xs">
              Claim ₹500 Credit
            </span>
          </button>
        </div>
      </div>

      {/* Adjust Map Modal */}
      {isMapModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-[#e5e2dd] flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#b1005e]">pin_drop</span>
                <h3 className="text-lg font-black text-[#1c1c19]">Adjust Store Geotag</h3>
              </div>
              <button
                onClick={() => setIsMapModalOpen(false)}
                className="p-1 rounded-full text-[#594047] hover:bg-[#f0ede9] cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="h-44 bg-gradient-to-tr from-[#ebe8e3] to-[#dcdad5] rounded-2xl relative flex items-center justify-center border border-[#e5e2dd] overflow-hidden">
              <div className="w-10 h-10 rounded-full bg-[#d91b77] text-white flex items-center justify-center shadow-lg animate-bounce">
                <span className="material-symbols-outlined text-[24px]">location_on</span>
              </div>
              <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-xs p-2 rounded-xl text-center text-xs font-bold text-[#1c1c19]">
                {streetAddress}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#1c1c19]">Selected GPS Coordinates</label>
              <input
                className="w-full px-4 py-2.5 bg-[#f6f3ee] rounded-xl text-xs font-mono font-bold border border-[#e5e2dd]"
                value={coordinates}
                onChange={(e) => setCoordinates(e.target.value)}
              />
            </div>

            <button
              onClick={() => {
                setIsMapModalOpen(false);
                showToast('Pin position updated and latched for soundbox delivery.');
              }}
              className="w-full h-11 rounded-full bg-[#d91b77] hover:bg-[#b1005e] text-white text-xs font-black shadow-md cursor-pointer"
              type="button"
            >
              Confirm Store Location
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
