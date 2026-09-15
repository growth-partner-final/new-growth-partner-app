import React, { useState } from 'react';
import { NotificationBell } from './NotificationBell';

interface ShareAndEarnScreenProps {
  onNavigateToSalonIntelligence?: () => void;
  onNavigateToLeaderboard?: () => void;
  onNavigateToReferralTimeline?: () => void;
  onNavigateToAddSalon?: () => void;
  onNavigateToHub?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToAuth?: () => void;
}

export const ShareAndEarnScreen: React.FC<ShareAndEarnScreenProps> = ({
  onNavigateToSalonIntelligence,
  onNavigateToLeaderboard,
  onNavigateToReferralTimeline,
  onNavigateToAddSalon,
  onNavigateToHub,
  onNavigateToDashboard,
  onNavigateToAuth
}) => {
  const codeVal = 'REF-5A45019655';
  const shortLink = 'https://nexora.link/ref/5A45019655';
  const longLink = 'https://portal.nexora.finance/growth/partner/register?ref=REF-5A45019655';

  const [isShortUrl, setIsShortUrl] = useState<boolean>(true);
  const [isScriptOpen, setIsScriptOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const currentLink = isShortUrl ? shortLink : longLink;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeVal).then(() => {
      showToast('Referral Code copied to clipboard!');
    }).catch(() => {
      showToast('Code copied: ' + codeVal);
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentLink).then(() => {
      showToast('Partner invite link copied!');
    }).catch(() => {
      showToast('Link copied: ' + currentLink);
    });
  };

  const handleDownloadQr = () => {
    showToast('Downloading high-res QR badge PNG...');
  };

  const handleSaveGallery = () => {
    showToast('Saved QR Code to photo gallery!');
  };

  const handleWhatsAppShare = () => {
    const waPitch = encodeURIComponent(
      'Namaste! Aapke salon ke daily billing and appointments ko grow karne ke liye Nexora check kijiye. Partner Code use karein: REF-5A45019655 (Free Setup): ' +
        shortLink
    );
    window.open(`https://api.whatsapp.com/send?text=${waPitch}`, '_blank');
  };

  const handleEmailInvite = () => {
    const subject = encodeURIComponent('Nexora Fintech Growth Partner Invitation');
    const body = encodeURIComponent(
      `Hi there,\n\nI invite you to explore the Nexora Salon Operating Suite. Register with my partner code REF-5A45019655 to receive complimentary setup.\n\nLink: ${shortLink}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Nexora Partner Invite',
          text: 'Join Nexora Salon Operating Suite with Partner Code REF-5A45019655',
          url: shortLink
        });
      } catch {
        // user cancelled or share failed
      }
    } else {
      handleCopyLink();
    }
  };

  const pitchScriptText =
    'Namaste! Aapke salon ke daily appointments aur automated billing ko streamline karne ke liye Nexora Partner App check kijiye. Sign up karte waqt mera Partner code lagayein: REF-5A45019655 aur payein premium onboarding. Demo link: https://nexora.link/ref/5A45019655';

  const handleCopyScript = () => {
    navigator.clipboard.writeText(pitchScriptText).then(() => {
      showToast('Hinglish outreach pitch copied!');
    }).catch(() => {
      showToast('Pitch script copied!');
    });
  };

  return (
    <div className="bg-[#fcf9f4] font-sans text-[#1c1c19] flex flex-col min-h-screen relative pb-28">
      {/* Top Header */}
      <header className="fixed top-8 sm:top-7 inset-x-0 z-40 bg-[#fcf9f4]/85 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(74,14,46,0.04)] border-b border-[#e5e2dd]">
        <div className="h-16 px-4 sm:px-6 max-w-4xl mx-auto flex items-center justify-between gap-3">
          {/* Brand & Partner ID */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#b1005e] to-[#d91b77] text-white flex items-center justify-center font-black text-sm shadow-sm shrink-0">
              N
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base text-[#1c1c19] tracking-tight truncate">
                  NEXORA
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#ffe088] text-[#241a00] text-[10px] uppercase tracking-wider font-extrabold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px] text-[#735c00]">
                    workspace_premium
                  </span>
                  Gold Partner
                </span>
              </div>
              <span className="text-[11px] text-[#594047] tracking-wider font-semibold">
                Growth Partner [DEV SAMPLE] • REF-5A45019655
              </span>
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (onNavigateToAddSalon) onNavigateToAddSalon();
              }}
              className="hidden sm:flex px-3 py-1.5 rounded-full bg-[#d91b77] text-white text-xs font-bold items-center gap-1 shadow-xs hover:bg-[#b1005e] transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">person_add</span>
              <span>Refer Salon</span>
            </button>

            <NotificationBell onNavigateToReferrals={onNavigateToReferralTimeline} />

            <div
              onClick={() => {
                if (onNavigateToAuth) onNavigateToAuth();
              }}
              title="Partner Account"
              className="w-9 h-9 rounded-full bg-[#b1005e] text-white flex items-center justify-center shrink-0 shadow-sm cursor-pointer hover:opacity-90"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex flex-col relative w-full pt-28 px-4 sm:px-6 max-w-3xl mx-auto space-y-6">
        {/* Dynamic Atmospheric Glow Accent */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#d91b77]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#31302d] text-white shadow-xl animate-in fade-in slide-in-from-top-4 duration-200 border border-white/10">
            <span className="material-symbols-outlined text-[18px] text-[#ffe088]">
              check_circle
            </span>
            <span className="text-xs font-bold tracking-wide">{toastMessage}</span>
          </div>
        )}

        {/* Screen Header Greeting & Tier Status */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[11px] text-[#b1005e] uppercase tracking-widest font-extrabold">
                Partner Hub
              </span>
              <span className="inline-flex w-1.5 h-1.5 rounded-full bg-[#b1005e] animate-pulse" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1c1c19] tracking-tight">
              Share &amp; Earn
            </h1>
          </div>
          <div className="flex flex-col items-end bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-2xl border border-[#e5e2dd]">
            <span className="text-[11px] text-[#594047] font-bold">Commission Rate</span>
            <span className="text-lg font-black text-[#b1005e]">18.5%</span>
          </div>
        </div>

        {/* 1. Referral Code Hero Card */}
        <div className="w-full bg-white/90 backdrop-blur-xl rounded-3xl p-5 sm:p-6 shadow-[0_8px_32px_rgba(74,14,46,0.06)] border border-[#e5e2dd] space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#d91b77]" />
              <span className="text-xs font-bold text-[#1c1c19] uppercase tracking-wider">
                Your Exclusive Code
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#ffd9e2] text-[#b1005e] font-extrabold text-[11px]">
              Active • Lifetime
            </span>
          </div>

          {/* Big Code Display & Copy Box */}
          <div className="bg-[#f6f3ee] rounded-2xl p-4 flex items-center justify-between shadow-inner border border-[#e5e2dd]/60">
            <div className="min-w-0 pr-3">
              <span className="text-[10px] text-[#594047] uppercase tracking-wider block font-bold mb-0.5">
                Partner Referral Code
              </span>
              <span className="text-lg sm:text-2xl tracking-wider text-[#1c1c19] font-black select-all font-mono">
                {codeVal}
              </span>
            </div>
            <button
              aria-label="Copy Referral Code"
              onClick={handleCopyCode}
              className="h-11 px-4 sm:px-5 rounded-full bg-[#b1005e] hover:bg-[#d91b77] active:scale-95 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-[#b1005e]/25 transition-all duration-200 cursor-pointer shrink-0"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">content_copy</span>
              <span>Copy Code</span>
            </button>
          </div>

          {/* Referral Link with Shortener Toggle */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#594047] font-bold uppercase tracking-wider">
                Direct Invite Link
              </span>

              {/* URL Shortener Toggle */}
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <span className="text-xs text-[#594047] font-semibold">Short URL</span>
                <div
                  onClick={() => setIsShortUrl(!isShortUrl)}
                  className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                    isShortUrl ? 'bg-[#b1005e]' : 'bg-[#e5e2dd]'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
                      isShortUrl ? 'left-[18px]' : 'left-0.5'
                    }`}
                  />
                </div>
              </label>
            </div>

            <div className="flex items-center justify-between bg-[#f6f3ee] rounded-xl px-3.5 py-2.5 border border-[#e5e2dd]/60">
              <span className="text-xs sm:text-sm text-[#1c1c19] truncate font-semibold">
                {currentLink}
              </span>
              <button
                aria-label="Copy Referral Link"
                onClick={handleCopyLink}
                className="p-1.5 -mr-1 rounded-full text-[#594047] hover:text-[#b1005e] active:scale-90 transition-transform shrink-0 cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">link</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. Centered Mobile Scannable QR Code Card */}
        <div className="w-full bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-[0_8px_32px_rgba(74,14,46,0.06)] border border-[#e5e2dd] flex flex-col items-center text-center space-y-4">
          <div className="flex flex-col items-center">
            <span className="text-[11px] uppercase tracking-widest text-[#b1005e] font-extrabold mb-1">
              Instant In-Store Scanner
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-[#1c1c19]">
              Salon Owner Express Scan
            </h2>
            <p className="text-xs text-[#594047] max-w-sm mt-1 leading-relaxed">
              Present this QR code during on-ground salon demos for immediate partner attribution and express digital KYC.
            </p>
          </div>

          {/* Scannable Stylized Vector QR Frame */}
          <div className="relative p-4 bg-white rounded-2xl shadow-lg shadow-[#b1005e]/5 border border-[#e5e2dd] flex items-center justify-center">
            <div className="w-48 h-48 bg-white relative flex items-center justify-center">
              <svg className="w-full h-full text-[#1c1c19]" fill="currentColor" viewBox="0 0 160 160">
                {/* Top Left Corner Marker */}
                <rect fill="#1c1c19" height="40" rx="6" width="40" x="10" y="10" />
                <rect fill="#ffffff" height="24" rx="3" width="24" x="18" y="18" />
                <rect fill="#d91b77" height="14" rx="2" width="14" x="23" y="23" />
                {/* Top Right Corner Marker */}
                <rect fill="#1c1c19" height="40" rx="6" width="40" x="110" y="10" />
                <rect fill="#ffffff" height="24" rx="3" width="24" x="118" y="18" />
                <rect fill="#d91b77" height="14" rx="2" width="14" x="123" y="23" />
                {/* Bottom Left Corner Marker */}
                <rect fill="#1c1c19" height="40" rx="6" width="40" x="10" y="110" />
                <rect fill="#ffffff" height="24" rx="3" width="24" x="18" y="118" />
                <rect fill="#d91b77" height="14" rx="2" width="14" x="23" y="123" />
                {/* Data Grid Representation */}
                <rect height="8" rx="1.5" width="8" x="60" y="15" />
                <rect height="18" rx="1.5" width="8" x="74" y="15" />
                <rect height="8" rx="1.5" width="12" x="88" y="15" />
                <rect height="18" rx="1.5" width="8" x="60" y="30" />
                <rect height="14" rx="1.5" width="12" x="88" y="30" />
                <rect height="8" rx="1.5" width="18" x="15" y="60" />
                <rect height="16" rx="1.5" width="8" x="40" y="60" />
                <rect height="14" rx="1.5" width="14" x="56" y="55" />
                <rect height="10" rx="1.5" width="18" x="76" y="55" />
                <rect height="8" rx="1.5" width="16" x="100" y="60" />
                <rect height="8" rx="1.5" width="22" x="124" y="58" />
                <rect height="20" rx="1.5" width="10" x="15" y="76" />
                <rect height="8" rx="1.5" width="16" x="32" y="82" />
                <rect height="24" rx="1.5" width="8" x="118" y="74" />
                <rect height="8" rx="1.5" width="12" x="134" y="80" />
                <rect height="8" rx="1.5" width="16" x="60" y="105" />
                <rect height="14" rx="1.5" width="16" x="84" y="105" />
                <rect height="18" rx="1.5" width="8" x="108" y="105" />
                <rect height="8" rx="1.5" width="22" x="124" y="105" />
                <rect height="24" rx="1.5" width="8" x="60" y="120" />
                <rect height="8" rx="1.5" width="24" x="76" y="128" />
                <rect height="14" rx="1.5" width="18" x="108" y="130" />
                <rect height="22" rx="1.5" width="12" x="134" y="122" />
              </svg>
              {/* Centered Nexora Brand Emblem Overlay */}
              <div className="absolute inset-0 m-auto w-11 h-11 bg-[#b1005e] rounded-xl flex items-center justify-center shadow-md shadow-[#b1005e]/40 border-2 border-white">
                <span className="material-symbols-outlined text-white text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  spa
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action QR Buttons */}
          <div className="grid grid-cols-2 gap-3 w-full pt-1">
            <button
              onClick={handleDownloadQr}
              className="py-2.5 px-4 rounded-xl bg-[#f0ede9] text-[#1c1c19] hover:bg-[#e5e2dd] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors duration-200 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Download QR</span>
            </button>
            <button
              onClick={handleSaveGallery}
              className="py-2.5 px-4 rounded-xl bg-[#f0ede9] text-[#1c1c19] hover:bg-[#e5e2dd] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors duration-200 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">photo_library</span>
              <span>Save to Gallery</span>
            </button>
          </div>
        </div>

        {/* 3. High-Priority Share Actions */}
        <div className="space-y-3 w-full">
          <span className="text-[11px] text-[#594047] font-bold uppercase tracking-wider px-1 block">
            Instant Messaging Dispatch
          </span>

          {/* WhatsApp Prominent Button */}
          <button
            onClick={handleWhatsAppShare}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#25d366] to-[#128c7e] hover:opacity-95 active:scale-[0.98] text-white font-bold text-sm flex items-center justify-between px-4 shadow-lg shadow-emerald-500/20 transition-all duration-200 cursor-pointer"
            type="button"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px] text-white">chat</span>
              </div>
              <div className="flex flex-col text-left min-w-0">
                <span className="font-bold tracking-tight truncate">Share via WhatsApp</span>
                <span className="text-[11px] text-white/90 truncate font-normal">
                  1-tap Hinglish demo invite with VIP link
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[22px]">arrow_forward</span>
          </button>

          {/* Secondary Share Grid: Email & Device Native Share */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={handleEmailInvite}
              className="h-12 rounded-2xl bg-white text-[#1c1c19] hover:bg-[#f0ede9] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs border border-[#e5e2dd] transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-[#8e4767]">mail</span>
              <span>Email Invite</span>
            </button>
            <button
              onClick={handleNativeShare}
              className="h-12 rounded-2xl bg-white text-[#1c1c19] hover:bg-[#f0ede9] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs border border-[#e5e2dd] transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-[#b1005e]">share</span>
              <span>Device Share</span>
            </button>
          </div>
        </div>

        {/* 4. Quick Outreach Script Accordion */}
        <div className="w-full bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-[0_8px_32px_rgba(74,14,46,0.04)] border border-[#e5e2dd] space-y-3">
          <button
            onClick={() => setIsScriptOpen(!isScriptOpen)}
            className="w-full flex items-center justify-between text-left group cursor-pointer"
            type="button"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[20px] text-[#735c00]">
                record_voice_over
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#1c1c19] group-hover:text-[#b1005e] transition-colors">
                Salon Pitch Script (Hinglish)
              </span>
            </div>
            <span
              className={`material-symbols-outlined text-[20px] text-[#594047] transition-transform duration-200 ${
                isScriptOpen ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>

          {isScriptOpen && (
            <div className="pt-1 space-y-3 animate-in fade-in duration-150">
              <div className="p-3.5 bg-[#f6f3ee] rounded-xl border border-[#e5e2dd]/60">
                <p className="text-xs sm:text-sm text-[#1c1c19] leading-relaxed select-all">
                  &ldquo;Namaste! Aapke salon ke daily appointments aur automated billing ko streamline
                  karne ke liye Nexora Partner App check kijiye. Sign up karte waqt mera VIP Partner code
                  lagayein: <strong className="text-[#b1005e] font-bold">REF-5A45019655</strong> aur
                  payein 30 days premium free trial + zero onboarding fees. Demo link: {shortLink}&rdquo;
                </p>
              </div>
              <div className="flex items-center justify-end">
                <button
                  onClick={handleCopyScript}
                  className="px-4 py-2 rounded-xl bg-[#8e4767] text-white font-bold text-xs flex items-center gap-1.5 hover:bg-[#72304f] transition-colors shadow-xs cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">file_copy</span>
                  <span>Copy Script</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 5. Mobile Scan Telemetry Module */}
        <div className="w-full bg-white/95 backdrop-blur-xl rounded-3xl p-5 sm:p-6 shadow-[0_8px_32px_rgba(74,14,46,0.06)] border border-[#e5e2dd] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#b1005e]">
                insights
              </span>
              <h3 className="text-xs font-bold text-[#1c1c19] uppercase tracking-wider">
                Live Conversion Telemetry
              </h3>
            </div>
            <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Real-time sync
            </span>
          </div>

          {/* 3 Telemetry Data Metric Blocks */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {/* Scans */}
            <div className="p-3 bg-[#f6f3ee] rounded-2xl text-center flex flex-col justify-center border border-[#e5e2dd]/40">
              <span className="text-xl sm:text-2xl font-black text-[#1c1c19]">134</span>
              <span className="text-[11px] text-[#594047] font-semibold mt-0.5">Scans</span>
            </div>
            {/* Visitors */}
            <div className="p-3 bg-[#f6f3ee] rounded-2xl text-center flex flex-col justify-center border border-[#e5e2dd]/40">
              <span className="text-xl sm:text-2xl font-black text-[#8e4767]">86</span>
              <span className="text-[11px] text-[#594047] font-semibold mt-0.5">Visitors</span>
            </div>
            {/* Signups */}
            <div className="p-3 bg-[#ffd9e2] rounded-2xl text-center flex flex-col justify-center border border-[#d91b77]/20">
              <span className="text-xl sm:text-2xl font-black text-[#b1005e]">26</span>
              <span className="text-[11px] text-[#8e004a] font-bold mt-0.5">Signups</span>
            </div>
          </div>

          {/* Micro Funnel Bar Visualization */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#594047] font-medium">Conversion Velocity (Scans to Signups)</span>
              <span className="text-[#b1005e] font-extrabold">19.4%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#ebe8e3] overflow-hidden flex">
              <div className="h-full bg-[#8d6f77]/50" style={{ width: '35%' }} title="Scans" />
              <div className="h-full bg-[#8e4767]" style={{ width: '35%' }} title="Visitors" />
              <div className="h-full bg-[#b1005e]" style={{ width: '30%' }} title="Signups" />
            </div>
          </div>
        </div>

        {/* Salon Partnership Support Guarantee Note */}
        <div className="flex items-center justify-center gap-1.5 py-2">
          <span className="material-symbols-outlined text-[16px] text-[#735c00]">
            verified_user
          </span>
          <span className="text-[11px] text-[#594047] text-center font-medium">
            Nexora Fintech Partner Protection Guarantee applies to all scans &amp; merchant referrals.
          </span>
        </div>
      </main>

      {/* Persistent Bottom Navigation Bar */}
      <nav className="fixed bottom-0 inset-x-0 z-40 pb-safe bg-white/95 backdrop-blur-xl border-t border-[#e5e2dd] shadow-[0_-2px_16px_rgba(74,14,46,0.05)]">
        <div className="flex justify-around items-center h-16 px-2 max-w-lg mx-auto">
          <button
            onClick={() => {
              if (onNavigateToSalonIntelligence) onNavigateToSalonIntelligence();
            }}
            className="flex flex-col items-center justify-center min-w-[56px] h-12 text-[#594047] hover:text-[#b1005e] transition-colors group cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px] mb-0.5 group-hover:scale-105 transition-transform">
              dashboard
            </span>
            <span className="text-[10px] font-semibold leading-tight text-center tracking-tight">
              Overview
            </span>
          </button>

          <button
            className="flex flex-col items-center justify-center min-w-[56px] h-12 text-[#b1005e] font-bold transition-colors group cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px] mb-0.5 group-hover:scale-105 transition-transform">
              qr_code_2
            </span>
            <span className="text-[10px] leading-tight text-center tracking-tight">
              Referral
            </span>
          </button>

          <button
            onClick={() => {
              if (onNavigateToAddSalon) onNavigateToAddSalon();
            }}
            className="flex flex-col items-center justify-center min-w-[56px] h-12 text-[#594047] hover:text-[#b1005e] transition-colors group cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px] mb-0.5 group-hover:scale-105 transition-transform">
              add_circle
            </span>
            <span className="text-[10px] font-semibold leading-tight text-center tracking-tight">
              Add Salon
            </span>
          </button>

          <button
            onClick={() => {
              if (onNavigateToReferralTimeline) onNavigateToReferralTimeline();
            }}
            className="flex flex-col items-center justify-center min-w-[56px] h-12 text-[#594047] hover:text-[#b1005e] transition-colors group cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px] mb-0.5 group-hover:scale-105 transition-transform">
              timeline
            </span>
            <span className="text-[10px] font-semibold leading-tight text-center tracking-tight">
              Status
            </span>
          </button>

          <button
            onClick={() => {
              if (onNavigateToLeaderboard) onNavigateToLeaderboard();
            }}
            className="flex flex-col items-center justify-center min-w-[56px] h-12 text-[#594047] hover:text-[#b1005e] transition-colors group cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px] mb-0.5 group-hover:scale-105 transition-transform">
              military_tech
            </span>
            <span className="text-[10px] font-semibold leading-tight text-center tracking-tight">
              Rewards
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
};
