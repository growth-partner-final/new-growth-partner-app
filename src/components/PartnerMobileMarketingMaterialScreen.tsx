import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PartnerMobileMarketingMaterialScreenProps {
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
  onNavigateToProfileSettings?: () => void;
  onNavigateToSecureHandoff?: () => void;
  onNavigateToHandoffHub?: () => void;
  onNavigateToEarningsLedger?: () => void;
  onNavigateToExtraOnboardingReward?: () => void;
  onNavigateToRewardsMilestones?: () => void;
  onNavigateToMilestoneUnlock?: () => void;
  onNavigateToMobileRewards?: () => void;
}

interface CreativeItem {
  id: string;
  title: string;
  tags: string[];
  badge: string;
  badgeType: 'rewards' | 'onboarding' | 'compliance' | 'qr';
  meta: string;
  description: string;
  caption: string;
  imgUrl?: string;
  disclaimer?: string;
}

export const PartnerMobileMarketingMaterialScreen: React.FC<PartnerMobileMarketingMaterialScreenProps> = ({
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
  onNavigateToProfileSettings,
  onNavigateToSecureHandoff,
  onNavigateToHandoffHub,
  onNavigateToEarningsLedger,
  onNavigateToExtraOnboardingReward,
  onNavigateToRewardsMilestones,
  onNavigateToMilestoneUnlock,
  onNavigateToMobileRewards,
}) => {
  // Simulator state: 'preview' | 'skeleton' | 'empty' | 'downloading' | 'downloaded' | 'share_error' | 'network_error'
  const [simState, setSimState] = useState<'preview' | 'skeleton' | 'empty' | 'downloading' | 'downloaded' | 'share_error' | 'network_error'>('preview');

  // Interactive filtering states
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  // Interactive Bottom Sheet Preview
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [sheetTitle, setSheetTitle] = useState<string>('Creative Preview');
  const [sheetImg, setSheetImg] = useState<string>('https://lh3.googleusercontent.com/aida-public/AB6AXuCiHHzaXcQdipVFxAPoG8TxzHjElND3cfrfXs4XlmagxMiGaD6ONbbMPSZk4Tm7_Ok2B5yS2E2hduF1LR-MtLYIxic0JuNup6VDe90oRfXSZvND7sQlESAzhc8OQN3QsR7NO4Lf2BSRRrDwpYqdW5-jLgfZwtkbQJju8DV5fAjpA-sXeD8tBiMLNzUVdgMTTgEsBRb5HjMtyn2VbBniV2sILWaOf27G1KqnOkVS5YjCKDXFK05CAcvy');
  const [sheetCaption, setSheetCaption] = useState<string>('');
  const [embedPartnerCode, setEmbedPartnerCode] = useState<boolean>(true);

  // Toast Notifications
  const [toast, setToast] = useState<{ message: string; icon: string } | null>(null);

  const referralCode = 'REF-5A45019655';
  const trackingUrl = `https://nexora.com/partner/join?ref=${referralCode}`;

  const triggerToast = (message: string, icon = 'check_circle') => {
    setToast({ message, icon });
    setTimeout(() => {
      setToast(null);
    }, 2400);
  };

  const copyToClipboard = (text: string, label = 'Text') => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        triggerToast(`${label} copied!`);
      }).catch(() => {
        triggerToast(`${label} copied to buffer!`);
      });
    } else {
      triggerToast(`${label} copied!`);
    }
  };

  const shareViaWhatsApp = (creativeId: string) => {
    if (simState === 'share_error') {
      triggerToast('WhatsApp client not detected on device.', 'error');
      return;
    }
    const messageText = `*Nexora Growth Partner Opportunity*\nGrow your salon income with instant QR payments and earn up to ₹5,00,000 milestones!\n\nJoin with my referral code: *${referralCode}*\nRegister here: ${trackingUrl}`;
    const message = encodeURIComponent(messageText);
    window.open(`https://wa.me/?text=${message}`, '_blank');
    triggerToast('Redirecting to WhatsApp...', 'chat');
  };

  const triggerDownload = (filename: string, e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const originalText = btn.innerHTML;
    btn.innerHTML = `<span class="material-symbols-outlined text-[18px] animate-spin">progress_activity</span> Downloading`;
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = `<span class="material-symbols-outlined text-[18px] text-emerald-600">task_alt</span> Saved`;
      triggerToast(`${filename} saved to gallery!`);
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
      }, 2000);
    }, 1200);
  };

  const openPreviewSheet = (title: string, img: string, caption: string) => {
    setSheetTitle(title);
    setSheetImg(img);
    setSheetCaption(caption);
    setIsSheetOpen(true);
  };

  const closePreviewSheet = () => {
    setIsSheetOpen(false);
  };

  // State switcher helper
  const handleStateChange = (state: typeof simState) => {
    setSimState(state);
    if (state === 'preview') {
      openPreviewSheet(
        '7-Stage Growth Ladder Creative',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCiHHzaXcQdipVFxAPoG8TxzHjElND3cfrfXs4XlmagxMiGaD6ONbbMPSZk4Tm7_Ok2B5yS2E2hduF1LR-MtLYIxic0JuNup6VDe90oRfXSZvND7sQlESAzhc8OQN3QsR7NO4Lf2BSRRrDwpYqdW5-jLgfZwtkbQJju8DV5fAjpA-sXeD8tBiMLNzUVdgMTTgEsBRb5HjMtyn2VbBniV2sILWaOf27G1KqnOkVS5YjCKDXFK05CAcvy',
        `✨ Unlock high-yield fintech earnings with Nexora! Onboard your salon, accept easy payments, and scale up to ₹5,00,000 in cash bonuses. Register using my verified code: ${referralCode}`
      );
    } else if (state === 'downloading') {
      triggerToast('Downloading all asset zip packages (14.2 MB)...', 'downloading');
    } else if (state === 'downloaded') {
      triggerToast('All 5 approved collateral assets saved to device.', 'verified');
    } else if (state === 'share_error') {
      triggerToast('State: Native WhatsApp Share disabled on device', 'warning');
    }
  };

  // static list of approved creatives
  const approvedCreatives: CreativeItem[] = useMemo(() => [
    {
      id: '7stage',
      title: '7-Stage Growth Ladder Creative',
      tags: ['rewards', 'posters', 'english'],
      badge: 'Official Milestone Poster',
      badgeType: 'rewards',
      meta: 'ID: CREAT-77',
      description: 'Level 1 (₹5k Bonus) se lekar Level 7 Global Ambassador (₹5 Lakh + recurring) tak ka official income roadmap.',
      caption: `Nexora Growth Partner: Unlock up to ₹5,00,000 in cash milestones and recurring salon transaction commissions. Onboard your salon today with Code: ${referralCode}`,
      imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7cw5G8FsDdU3h88yDo2jnJIs-qWVS4vvvGckLdTp0MyMhsuZa2D6QBIwzmYgELcMLNITSmgqlwlOR2cS-vpjB6tYQzeySM9GlHg6mu-UrRscrzdHUXLZASshAp9xqVU8NbTBZxa2PTc8xYtMP1Lxh_JtJKHbIzj241Mb9WuNND4V5QR9cGQ08saAOMYKHAz7Ko1heA5v3H-sbCeNTmtVT_JZ2EstfZCAcaLuhoLRvVrjZE3I7Oj9R',
      disclaimer: 'Mandatory Rule: Rewards and earnings verified performance, eligible settled transactions, approval and programme terms ke adheen hain.'
    },
    {
      id: 'qualification',
      title: 'Salon Qualification Criteria Card',
      tags: ['onboarding', 'hindi'],
      badge: 'Salon Qualification Rule',
      badgeType: 'onboarding',
      meta: 'Infographic • PNG',
      description: 'Merchant education flyer: Unhe samjhaiye kaise simple 15 din transaction se unka account premium tier par verify hota hai.',
      caption: `Onboard your salon today on Nexora! Minimum business qualification requires active QR transactions of at least ₹15,000 with ₹1,000 daily threshold across 15 active days. Referral Code: ${referralCode}`
    },
    {
      id: 'payout_slab',
      title: 'Earnings & Commission Slabs',
      tags: ['rewards', 'hindi', 'english'],
      badge: 'Payout Formula',
      badgeType: 'qr',
      meta: 'Calculator Card',
      description: 'Clear payout and recurring commissions structure detailing one-time reward and lifetime annuity values.',
      caption: `Nexora Partner Commission Breakdown: One-Time ₹150 - ₹500, Month 1-6 (10%), Month 7-12 (5%), and post 12 Months (2% recurring lifetime). Referral Code: ${referralCode}`
    },
    {
      id: 'qr_invite',
      title: 'Direct QR Invitation Card',
      tags: ['whatsapp', 'qr'],
      badge: 'Instant Scan Flyer',
      badgeType: 'qr',
      meta: 'Personalized',
      description: 'Salon owner instant scan flyer. Camera se scan karega aur direct aapke partner tree me bind ho jayega.',
      caption: `Salon owners, scan this QR code instantly to register under my verified partner profile REF-5A45019655 and enjoy zero-fee UPI payments! Link: ${trackingUrl}`
    },
    {
      id: 'compliance',
      title: 'Partner Code of Ethics',
      tags: ['onboarding', 'hindi', 'english'],
      badge: 'Compliance Card',
      badgeType: 'compliance',
      meta: 'Mandatory',
      description: 'Circulate this to salon partners so they clearly understand fake billing or circular QR swiping penalties.',
      caption: `Nexora Compliance Guidelines: Strict anti-fraud enforcement. No circular self-transactions or fake billing allowed on QR terminals. All referral actions are monitored under AML audits.`
    }
  ], [referralCode, trackingUrl]);

  // Filter items based on selected category tag
  const filteredCreatives = useMemo(() => {
    if (simState === 'empty' || simState === 'network_error') return [];
    return approvedCreatives.filter(item => {
      if (activeFilter === 'all') return true;
      return item.tags.includes(activeFilter);
    });
  }, [activeFilter, simState, approvedCreatives]);

  return (
    <div className="min-h-screen bg-[#fcf9f4] text-[#1c1c19] flex justify-center pb-24 font-body-md text-body-md antialiased selection:bg-[#fda4c9] relative">
      <div className="w-full max-w-md relative flex flex-col bg-[#fcf9f4] shadow-lg min-h-screen">
        
        {/* HEADER BAR */}
        <header className="sticky top-0 w-full z-40 pt-safe bg-[#fcf9f4]/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] border-b border-[#f0ede9]">
          <div className="h-16 px-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#b1005e] flex items-center justify-center text-white font-bold shrink-0">
                NX
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#b1005e] truncate">Nexora Partner</span>
                <h1 className="text-sm text-[#1c1c19] font-black truncate leading-tight">Approved Marketing Hub</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-1 shrink-0">
              <button 
                onClick={() => onNavigateToDashboard && onNavigateToDashboard()}
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#594047] hover:text-[#b1005e] hover:bg-black/5"
                title="Go to Dashboard"
              >
                <span className="material-symbols-outlined text-[20px]">space_dashboard</span>
              </button>
              <button 
                onClick={() => onNavigateToHub && onNavigateToHub()}
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#594047] hover:text-red-600 hover:bg-black/5"
                title="Exit to Hub"
              >
                <span className="material-symbols-outlined text-[20px]">logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* MAIN BODY SCROLL */}
        <main className="flex-1 flex flex-col p-4 space-y-4">
          
          {/* 1. STATE SIMULATOR BAR */}
          <div className="w-full bg-[#f6f3ee] p-2.5 rounded-xl border border-[#e5e2dd] space-y-1.5">
            <div className="flex items-center gap-1 text-xs font-bold text-[#594047]">
              <span className="material-symbols-outlined text-[15px] text-[#b1005e]">tune</span>
              <span>STATE SIMULATOR BAR</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none whitespace-nowrap">
              <button 
                onClick={() => handleStateChange('preview')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${simState === 'preview' ? 'bg-[#b1005e] text-white shadow-xs' : 'bg-white text-[#594047] border border-[#e5e2dd]'}`}
              >
                Preview Data
              </button>
              <button 
                onClick={() => handleStateChange('skeleton')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${simState === 'skeleton' ? 'bg-[#b1005e] text-white shadow-xs' : 'bg-white text-[#594047] border border-[#e5e2dd]'}`}
              >
                Loading Skeletons
              </button>
              <button 
                onClick={() => handleStateChange('empty')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${simState === 'empty' ? 'bg-[#b1005e] text-white shadow-xs' : 'bg-white text-[#594047] border border-[#e5e2dd]'}`}
              >
                Empty State
              </button>
              <button 
                onClick={() => handleStateChange('downloading')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${simState === 'downloading' ? 'bg-[#b1005e] text-white shadow-xs' : 'bg-white text-[#594047] border border-[#e5e2dd]'}`}
              >
                ZIP Progress
              </button>
              <button 
                onClick={() => handleStateChange('downloaded')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${simState === 'downloaded' ? 'bg-[#b1005e] text-white shadow-xs' : 'bg-white text-[#594047] border border-[#e5e2dd]'}`}
              >
                Downloaded
              </button>
              <button 
                onClick={() => handleStateChange('share_error')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${simState === 'share_error' ? 'bg-[#b1005e] text-white shadow-xs' : 'bg-white text-[#594047] border border-[#e5e2dd]'}`}
              >
                Share N/A
              </button>
              <button 
                onClick={() => handleStateChange('network_error')}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${simState === 'network_error' ? 'bg-[#b1005e] text-white shadow-xs' : 'bg-white text-[#594047] border border-[#e5e2dd]'}`}
              >
                Network Error
              </button>
            </div>
          </div>

          {/* 2. COMPACT MOBILE HEADER */}
          <div className="flex flex-col space-y-1">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffd9e2] text-[#8e004a] text-[10px] font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[12px]">verified</span> Approved Collateral
              </div>
              <span className="text-[11px] font-semibold text-[#594047]">Updated Today</span>
            </div>
            <h2 className="text-xl font-extrabold text-[#1c1c19] leading-tight">Approved Creative Hub</h2>
            <p className="text-xs text-[#594047]">
              High-fidelity approved templates share karke genuine salons onboard karein aur transparent commissions unlock karein.
            </p>
          </div>

          {/* 3. COMPACT REFERRAL SHARE CARD */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white via-[#f6f3ee] to-[#ffd9e2]/30 p-4 shadow-sm border border-[#e5e2dd]">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8e4767]">Your Active Partner ID</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-lg font-black text-[#1c1c19] tracking-wide font-mono">{referralCode}</span>
                  <button 
                    aria-label="Copy Code" 
                    className="p-1 rounded-full hover:bg-black/5 text-[#b1005e] active:scale-95 transition-all cursor-pointer" 
                    onClick={() => copyToClipboard(referralCode, 'Referral Code')}
                  >
                    <span className="material-symbols-outlined text-[18px]">content_copy</span>
                  </button>
                </div>
              </div>
              <div className="shrink-0 w-10 h-10 rounded-full bg-[#d91b77] text-white flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[20px]">share_reviews</span>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="grid grid-cols-1 gap-2 pt-1">
              <button 
                className="w-full min-h-[44px] px-4 py-2 rounded-full bg-[#b1005e] hover:bg-[#d91b77] active:scale-[0.98] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(177,0,94,0.2)] transition-all cursor-pointer" 
                onClick={() => shareViaWhatsApp('default')}
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Share Referral Gateway</span>
              </button>
              
              <div className="grid grid-cols-2 gap-2">
                <button 
                  className="min-h-[40px] px-2.5 py-1.5 rounded-full bg-white text-[#1c1c19] text-[11px] font-bold flex items-center justify-center gap-1 border border-[#e5e2dd] active:bg-gray-100 transition-colors cursor-pointer" 
                  onClick={() => copyToClipboard(trackingUrl, 'Referral Link')}
                >
                  <span className="material-symbols-outlined text-[15px] text-[#b1005e]">link</span>
                  <span>Copy Link</span>
                </button>
                <button 
                  className="min-h-[40px] px-2.5 py-1.5 rounded-full bg-white text-[#1c1c19] text-[11px] font-bold flex items-center justify-center gap-1 border border-[#e5e2dd] active:bg-gray-100 transition-colors cursor-pointer" 
                  onClick={() => copyToClipboard(`✨ Join Nexora Fintech as a verified Growth Partner! Onboard salons, manage high-volume transactions, and unlock up to ₹5,00,000 cash milestones. Register using my verified code: ${referralCode}`, 'Approved Caption')}
                >
                  <span className="material-symbols-outlined text-[15px] text-[#8e4767]">notes</span>
                  <span>Copy Caption</span>
                </button>
              </div>
            </div>
          </div>

          {/* 4. HORIZONTALLY SCROLLABLE FILTER CHIPS */}
          <div className="w-full overflow-x-auto scrollbar-none py-1">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              {[
                { id: 'all', label: 'All (Active)' },
                { id: 'rewards', label: 'Rewards' },
                { id: 'onboarding', label: 'Onboarding' },
                { id: 'qr', label: 'QR Edu' },
                { id: 'whatsapp', label: 'WhatsApp' },
                { id: 'posters', label: 'Posters' },
                { id: 'hindi', label: 'Hindi' },
                { id: 'english', label: 'English' }
              ].map(chip => (
                <button 
                  key={chip.id}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${activeFilter === chip.id ? 'bg-[#b1005e] text-white shadow-xs' : 'bg-[#f0ede9] text-[#594047] hover:bg-[#e5e2dd]'}`}
                  onClick={() => setActiveFilter(chip.id)}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* SKELETON STATE CONTAINER */}
          {simState === 'skeleton' && (
            <div className="flex flex-col space-y-4 animate-pulse">
              <div className="h-48 bg-[#e5e2dd] rounded-xl w-full"></div>
              <div className="h-32 bg-[#e5e2dd] rounded-xl w-full"></div>
              <div className="h-32 bg-[#e5e2dd] rounded-xl w-full"></div>
            </div>
          )}

          {/* EMPTY STATE CONTAINER */}
          {simState === 'empty' && (
            <div className="flex flex-col items-center justify-center p-8 text-center bg-[#f6f3ee] rounded-xl space-y-3 border border-dashed border-[#e5e2dd]">
              <div className="w-12 h-12 rounded-full bg-[#ffd8e5] flex items-center justify-center text-[#b1005e]">
                <span className="material-symbols-outlined text-[24px]">folder_off</span>
              </div>
              <h3 className="text-sm font-bold text-[#1c1c19]">No Creatives Found</h3>
              <p className="text-xs text-[#594047] max-w-xs">
                Is filter category me abhi koi official poster uplift nahi hua hai. Kripya doosre tags ya standard mode check karein.
              </p>
              <button 
                className="px-4 py-2 rounded-full bg-[#b1005e] text-white text-xs font-bold cursor-pointer hover:bg-[#d91b77] transition-all" 
                onClick={() => {
                  setActiveFilter('all');
                  setSimState('preview');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* NETWORK ERROR VIEW */}
          {simState === 'network_error' && (
            <div className="flex flex-col items-center justify-center p-8 text-center bg-[#ffdad6] text-[#93000a] rounded-xl space-y-3 border border-red-200">
              <span className="material-symbols-outlined text-[32px] text-red-600">cloud_off</span>
              <h3 className="text-sm font-bold">Network Connection Error</h3>
              <p className="text-xs text-red-900 max-w-xs">
                Creatives sync nahi ho paye. Apne internet security configuration aur active connectivity check karein.
              </p>
              <button 
                className="px-4 py-2 rounded-full bg-red-600 text-white text-xs font-bold cursor-pointer hover:bg-red-700 transition-all" 
                onClick={() => setSimState('preview')}
              >
                Retry Sync Connection
              </button>
            </div>
          )}

          {/* EMPTY FILTER VIEW */}
          {simState === 'preview' && filteredCreatives.length === 0 && (
            <div className="flex flex-col items-center justify-center p-8 text-center bg-[#f6f3ee] rounded-xl space-y-3 border border-dashed border-[#e5e2dd]">
              <div className="w-12 h-12 rounded-full bg-[#ffe088] flex items-center justify-center text-amber-800">
                <span className="material-symbols-outlined text-[24px]">filter_alt_off</span>
              </div>
              <h3 className="text-sm font-bold text-[#1c1c19]">No matching items</h3>
              <p className="text-xs text-[#594047] max-w-xs">
                Is selective filter tag ke liye koi matching materials matched nahi hain.
              </p>
              <button 
                className="px-3 py-1.5 rounded-full bg-[#f0ede9] text-[#1c1c19] text-xs font-bold cursor-pointer hover:bg-gray-300" 
                onClick={() => setActiveFilter('all')}
              >
                Show All Creatives
              </button>
            </div>
          )}

          {/* 5. MOBILE STACKED MATERIAL CARDS */}
          {simState !== 'skeleton' && simState !== 'empty' && simState !== 'network_error' && (
            <div className="flex flex-col space-y-4">
              {filteredCreatives.map(creative => (
                <article 
                  key={creative.id}
                  className="rounded-xl bg-white p-3.5 shadow-xs space-y-3 border border-[#e5e2dd] hover:shadow-md transition-shadow relative"
                >
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                      creative.badgeType === 'rewards' ? 'bg-[#ffe088] text-[#241a00]' :
                      creative.badgeType === 'onboarding' ? 'bg-[#ffd8e5] text-[#3c0223]' :
                      creative.badgeType === 'compliance' ? 'bg-[#ffdad6] text-[#ba1a1a]' :
                      'bg-[#e5e2dd] text-[#1c1c19]'
                    }`}>
                      <span className="material-symbols-outlined text-[12px]">
                        {creative.badgeType === 'rewards' ? 'workspace_premium' :
                         creative.badgeType === 'onboarding' ? 'checklist' :
                         creative.badgeType === 'compliance' ? 'gavel' : 'qr_code_2'}
                      </span>
                      {creative.badge}
                    </span>
                    <span className="text-[11px] text-[#594047] font-mono font-bold">{creative.meta}</span>
                  </div>

                  {/* If there is an image (Hero Poster) */}
                  {creative.imgUrl ? (
                    <div className="relative rounded-lg overflow-hidden bg-gray-200">
                      <img 
                        className="w-full h-auto object-cover max-h-[220px] rounded-lg shadow-inner" 
                        alt={creative.title}
                        src={creative.imgUrl} 
                      />
                      <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center bg-white/90 backdrop-blur-md px-2 py-1 rounded-md shadow-xs">
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-amber-500 text-[13px]">stars</span>
                          <span className="text-[10px] font-bold text-[#1c1c19]">₹5,00,000 Bonus Pool</span>
                        </div>
                        <span className="text-[9px] text-[#b1005e] font-bold">HQ WebP • 2.4 MB</span>
                      </div>
                    </div>
                  ) : null}

                  {/* Criteria specific visualization for Salon Qualification Criteria */}
                  {creative.id === 'qualification' && (
                    <div className="rounded-lg bg-gradient-to-r from-[#f6f3ee] to-[#f0ede9] p-3.5 space-y-2 border border-[#e5e2dd]">
                      <div className="flex items-center justify-between text-xs font-bold text-[#1c1c19]">
                        <span>Minimum Verified Monthly Biz</span>
                        <span className="text-[#b1005e]">₹15,000 / mo</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div className="bg-[#b1005e] h-full rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <div className="p-2 rounded bg-white border border-[#e5e2dd]">
                          <span className="text-[9px] text-[#594047] block font-bold uppercase">Sustenance Period</span>
                          <span className="text-xs font-extrabold text-[#1c1c19]">15 Active Days</span>
                        </div>
                        <div className="p-2 rounded bg-white border border-[#e5e2dd]">
                          <span className="text-[9px] text-[#594047] block font-bold uppercase">Your 10% Cut</span>
                          <span className="text-xs font-extrabold text-emerald-600">₹1,500 Payout</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Commission slabs specific visual for Activation Reward */}
                  {creative.id === 'payout_slab' && (
                    <div className="p-3 rounded-lg bg-[#f6f3ee] border border-[#e5e2dd] space-y-2 text-xs">
                      <div className="flex items-center justify-between pb-1.5 border-b border-gray-300 font-bold">
                        <span>One-Time Onboard Fee</span>
                        <span className="text-[#b1005e]">₹150 – ₹500 / salon</span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] text-[#594047] font-black uppercase tracking-wider block">Recurring Revenue Share:</span>
                        <div className="flex justify-between items-center bg-white px-2 py-1 rounded border border-gray-200 text-[11px]">
                          <span>Month 1 – 6 (Initial Booster)</span>
                          <span className="font-bold text-[#b1005e]">10% of revenue</span>
                        </div>
                        <div className="flex justify-between items-center bg-white px-2 py-1 rounded border border-gray-200 text-[11px]">
                          <span>Month 7 – 12 (Scale Booster)</span>
                          <span className="font-bold text-[#8e4767]">5% of revenue</span>
                        </div>
                        <div className="flex justify-between items-center bg-white px-2 py-1 rounded border border-gray-200 text-[11px]">
                          <span>Month 12+ (Lifetime Annuity)</span>
                          <span className="font-bold text-amber-700">2% recurring</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Inline Scan QR visualization */}
                  {creative.id === 'qr_invite' && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-[#f0ede9] border border-[#e5e2dd]">
                      <div className="w-16 h-16 bg-white rounded-lg p-1.5 shrink-0 flex items-center justify-center shadow-xs border border-gray-200">
                        <svg className="w-full h-full text-black" fill="currentColor" viewBox="0 0 100 100">
                          <path d="M0 0h30v30H0zm4 4h22v22H4zm4 4h14v14H8zM70 0h30v30H70zm4 4h22v22H74zm4 4h14v14H78zM0 70h30v30H0zm4 4h22v22H4zm4 4h14v14H8zM40 10h10v10H40zm10 20h10v10H50zm10 10h10v10H60zm-20 20h10v10H40zm30 10h10v10H70zm-10 20h10v10H60zm20 0h10v10H80z" />
                        </svg>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-black text-[#1c1c19] truncate">Automatic Partner Binder</span>
                        <span className="text-[11px] text-[#594047] line-clamp-2 mt-0.5">
                          Onboarder automatically detects REF-5A45019655 on scan to prevent merchant attribution loss.
                        </span>
                        <span className="text-[10px] text-[#b1005e] font-extrabold mt-1 uppercase font-mono">Disclosing active node binding</span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <h3 className="text-sm font-black text-[#1c1c19]">{creative.title}</h3>
                    <p className="text-xs text-[#594047] leading-relaxed">{creative.description}</p>
                  </div>

                  {/* Action Grid */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button 
                      className="min-h-[40px] px-3 py-1.5 rounded-full bg-[#f0ede9] hover:bg-[#e5e2dd] text-[#1c1c19] text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors" 
                      onClick={() => openPreviewSheet(creative.title, creative.imgUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiHHzaXcQdipVFxAPoG8TxzHjElND3cfrfXs4XlmagxMiGaD6ONbbMPSZk4Tm7_Ok2B5yS2E2hduF1LR-MtLYIxic0JuNup6VDe90oRfXSZvND7sQlESAzhc8OQN3QsR7NO4Lf2BSRRrDwpYqdW5-jLgfZwtkbQJju8DV5fAjpA-sXeD8tBiMLNzUVdgMTTgEsBRb5HjMtyn2VbBniV2sILWaOf27G1KqnOkVS5YjCKDXFK05CAcvy', creative.caption)}
                    >
                      <span className="material-symbols-outlined text-[16px]">visibility</span> 
                      <span>Preview</span>
                    </button>
                    <button 
                      className="min-h-[40px] px-3 py-1.5 rounded-full bg-[#f0ede9] hover:bg-[#e5e2dd] text-[#1c1c19] text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors" 
                      onClick={(e) => triggerDownload(`${creative.id}_approved_asset.png`, e)}
                    >
                      <span className="material-symbols-outlined text-[16px] text-[#b1005e]">download</span> 
                      <span>Download</span>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      className="min-h-[40px] px-3 py-1.5 rounded-full bg-[#b1005e] text-white text-xs font-bold flex items-center justify-center gap-1 cursor-pointer hover:bg-[#d91b77]" 
                      onClick={() => shareViaWhatsApp(creative.id)}
                    >
                      <span className="material-symbols-outlined text-[16px]">chat</span> 
                      <span>WhatsApp</span>
                    </button>
                    <button 
                      className="min-h-[40px] px-3 py-1.5 rounded-full bg-[#f0ede9] hover:bg-[#e5e2dd] text-[#1c1c19] text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors" 
                      onClick={() => copyToClipboard(creative.caption, 'Caption')}
                    >
                      <span className="material-symbols-outlined text-[16px]">content_copy</span> 
                      <span>Caption</span>
                    </button>
                  </div>

                  {creative.disclaimer ? (
                    <div className="p-2.5 rounded-lg bg-[#f6f3ee] text-[#594047] text-[10px] leading-tight flex items-start gap-1.5 border border-dashed border-[#e5e2dd]">
                      <span className="material-symbols-outlined text-[12px] text-[#b1005e] shrink-0 mt-0.5">policy</span>
                      <span><strong>Notice:</strong> {creative.disclaimer}</span>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          )}

          {/* 7. FOOTER COMPLIANCE NOTICE */}
          <footer className="p-4 rounded-xl bg-[#f6f3ee] text-center space-y-1.5 border border-[#e5e2dd]">
            <div className="flex items-center justify-center gap-1 text-[#594047] text-[10px] font-black uppercase tracking-wider">
              <span className="material-symbols-outlined text-[14px] text-amber-600">shield</span>
              <span>Fair Practice &amp; Governance Standard</span>
            </div>
            <p className="text-[10px] text-[#594047] leading-relaxed">
              No guaranteed claims or multi-level rewards. All incentives and recurring shares are credited post genuine, audited merchant settlements. Strictly compliant with RBI digital payment directives and Nexora Code of Conduct.
            </p>
          </footer>
        </main>

        {/* BOTTOM NAVIGATION BAR */}
        <nav className="sticky bottom-0 w-full z-40 pb-safe bg-[#fcf9f4]/90 backdrop-blur-md shadow-[0_-4px_24px_rgba(74,14,46,0.06)] border-t border-[#e5e2dd]">
          <div className="h-16 flex items-center justify-around">
            <button 
              onClick={() => onNavigateToDashboard && onNavigateToDashboard()}
              className="flex-1 flex flex-col items-center justify-center min-h-[44px] py-1 text-[#594047] hover:text-[#b1005e] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">space_dashboard</span>
              <span className="text-[9px] mt-0.5 font-bold tracking-tight">Dashboard</span>
            </button>
            <button 
              onClick={() => onNavigateToShareEarn && onNavigateToShareEarn()}
              className="flex-1 flex flex-col items-center justify-center min-h-[44px] py-1 text-[#594047] hover:text-[#b1005e] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">share_reviews</span>
              <span className="text-[9px] mt-0.5 font-bold tracking-tight">Referrals</span>
            </button>
            <button 
              onClick={() => onNavigateToEarningsLedger && onNavigateToEarningsLedger()}
              className="flex-1 flex flex-col items-center justify-center min-h-[44px] py-1 text-[#594047] hover:text-[#b1005e] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">payments</span>
              <span className="text-[9px] mt-0.5 font-bold tracking-tight">Earnings</span>
            </button>
            <button 
              className="flex-1 flex flex-col items-center justify-center min-h-[44px] py-1 text-[#b1005e] font-bold cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">campaign</span>
              <span className="text-[9px] mt-0.5 font-black tracking-tight">Marketing</span>
            </button>
            <button 
              onClick={() => onNavigateToProfileSettings && onNavigateToProfileSettings()}
              className="flex-1 flex flex-col items-center justify-center min-h-[44px] py-1 text-[#594047] hover:text-[#b1005e] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">account_circle</span>
              <span className="text-[9px] mt-0.5 font-bold tracking-tight">Profile</span>
            </button>
          </div>
        </nav>

        {/* MOBILE PREVIEW SHEET */}
        <AnimatePresence>
          {isSheetOpen && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end">
              {/* Backdrop close area */}
              <div className="absolute inset-0 -z-10" onClick={closePreviewSheet}></div>
              
              <motion.div 
                initial={{ translateY: '100%' }}
                animate={{ translateY: 0 }}
                exit={{ translateY: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="bg-white rounded-t-2xl max-h-[85vh] flex flex-col w-full overflow-hidden shadow-2xl border-t border-[#e5e2dd]"
              >
                {/* Sheet Header */}
                <div className="p-3.5 flex items-center justify-between border-b border-[#f0ede9]">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-4 rounded-full bg-[#b1005e]"></span>
                    <h4 className="text-sm font-black text-[#1c1c19]">{sheetTitle}</h4>
                  </div>
                  <button 
                    aria-label="Close Preview" 
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[#594047] hover:bg-black/5 active:scale-90 transition-all cursor-pointer" 
                    onClick={closePreviewSheet}
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>

                {/* Scrollable Sheet Body */}
                <div className="p-4 overflow-y-auto space-y-4">
                  {/* Image Preview */}
                  <div className="rounded-xl overflow-hidden bg-gray-100 p-1 flex justify-center border border-[#e5e2dd]">
                    <img 
                      className="w-full h-auto object-contain rounded-lg max-h-[200px]" 
                      alt="Sheet Preview" 
                      src={sheetImg} 
                    />
                  </div>

                  {/* Pre-Approved Caption */}
                  <div className="p-3 rounded-xl bg-[#f6f3ee] space-y-2 border border-[#e5e2dd]">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-[#1c1c19] uppercase tracking-wider">Pre-Approved Caption</span>
                      <button 
                        className="text-[10px] text-[#b1005e] font-extrabold flex items-center gap-0.5 hover:underline cursor-pointer" 
                        onClick={() => {
                          const text = embedPartnerCode ? sheetCaption : sheetCaption.replace(trackingUrl, '').trim();
                          copyToClipboard(text, 'Caption');
                        }}
                      >
                        <span className="material-symbols-outlined text-[14px]">content_copy</span> 
                        <span>Copy Caption</span>
                      </button>
                    </div>
                    <p className="text-xs text-[#594047] leading-relaxed bg-white p-2.5 rounded-lg border border-gray-200">
                      {embedPartnerCode ? sheetCaption : sheetCaption.replace(trackingUrl, '').trim()}
                    </p>
                  </div>

                  {/* Referral Toggle */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#f0ede9] border border-[#e5e2dd]">
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-[#1c1c19]">Embed Partner Code</span>
                      <span className="text-[10px] text-[#594047]">Auto-attach {referralCode} disclosure tag</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={embedPartnerCode} 
                        onChange={(e) => setEmbedPartnerCode(e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b1005e]"></div>
                    </label>
                  </div>

                  {/* Formats & Actions */}
                  <div className="space-y-2 pt-2">
                    <button 
                      className="w-full min-h-[44px] py-2.5 rounded-full bg-[#b1005e] hover:bg-[#d91b77] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-[0.98]" 
                      onClick={() => shareViaWhatsApp('sheet')}
                    >
                      <span className="material-symbols-outlined text-[20px]">chat</span> 
                      <span>Share on WhatsApp</span>
                    </button>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        className="min-h-[40px] py-2 rounded-full bg-[#f0ede9] hover:bg-[#e5e2dd] text-[#1c1c19] text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors" 
                        onClick={(e) => triggerDownload('approved_story_9_16.webp', e)}
                      >
                        <span className="material-symbols-outlined text-[16px] text-[#b1005e]">photo_camera</span> 
                        <span>Story (9:16)</span>
                      </button>
                      <button 
                        className="min-h-[40px] py-2 rounded-full bg-[#f0ede9] hover:bg-[#e5e2dd] text-[#1c1c19] text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors" 
                        onClick={(e) => triggerDownload('approved_feed_1_1.webp', e)}
                      >
                        <span className="material-symbols-outlined text-[16px] text-[#8e4767]">crop_square</span> 
                        <span>Feed (1:1)</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* TOAST NOTIFICATION */}
        <AnimatePresence>
          {toast && (
            <motion.div 
              initial={{ opacity: 0, translateY: 16 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: 16 }}
              className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
            >
              <div className="bg-[#31302d] text-white px-4 py-2 rounded-full shadow-lg text-xs font-bold flex items-center gap-2 border border-gray-700">
                <span className="material-symbols-outlined text-[16px] text-amber-400">
                  {toast.icon === 'chat' ? 'chat' : toast.icon === 'downloading' ? 'download' : 'check_circle'}
                </span>
                <span>{toast.message}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
