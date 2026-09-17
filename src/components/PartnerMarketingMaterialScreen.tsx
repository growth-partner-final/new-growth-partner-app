import React, { useState, useMemo } from 'react';
import { NotificationBell } from './NotificationBell';

interface PartnerMarketingMaterialScreenProps {
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
  onNavigateToExtraOnboardingReward?: () => void;
  onNavigateToRewardsMilestones?: () => void;
  onNavigateToEarningsLedger?: () => void;
  onNavigateToWithdrawals?: () => void;
  onNavigateToMarketingMaterial?: () => void;
}

interface MarketingAsset {
  id: string;
  title: string;
  category: 'growth-program' | 'milestones' | 'salon-onboarding' | 'qr-education' | 'fraud-awareness' | 'training';
  format: 'poster' | 'whatsapp' | 'instagram' | 'pdf';
  formatLabel: string;
  languages: 'english' | 'hindi' | 'hinglish';
  langLabel: string;
  badge: string;
  badgeColor: string;
  description: string;
  caption: string;
  downloadFileName: string;
  disclaimer: string;
}

export function PartnerMarketingMaterialScreen({
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
  onNavigateToExtraOnboardingReward,
  onNavigateToRewardsMilestones,
  onNavigateToEarningsLedger,
  onNavigateToWithdrawals,
  onNavigateToMarketingMaterial
}: PartnerMarketingMaterialScreenProps) {
  // State simulation variables
  const [simState, setSimState] = useState<'preview' | 'skeleton' | 'empty' | 'downloading' | 'downloaded' | 'error'>('preview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastIcon, setToastIcon] = useState<string>('info');
  const [toastBg, setToastBg] = useState<string>('bg-surface-container-high text-on-surface');
  
  // Filtering and search states
  const [searchText, setSearchText] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');

  // Interactive controls
  const [autoAttachToggle, setAutoAttachToggle] = useState<boolean>(true);
  const [previewAssetId, setPreviewAssetId] = useState<string | null>(null);
  const [selectedFormatOption, setSelectedFormatOption] = useState<'png' | 'pdf' | 'webp'>('png');

  // Referral properties
  const referralCode = "REF-5A45019655";
  const trackingUrl = `https://nexora.app/p/salon-onboard?ref=${referralCode}`;

  // Trigger temporary simulator feedback toast
  const triggerToast = (msg: string, icon = 'info', bgClass = 'bg-surface-container-high text-on-surface') => {
    setToastMessage(msg);
    setToastIcon(icon);
    setToastBg(bgClass);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Base list of 6 compliant promotional assets
  const assets: MarketingAsset[] = [
    {
      id: 'NX-MIL-2024-07',
      title: '7-Stage Milestone Rewards & Income Ladder',
      category: 'milestones',
      format: 'poster',
      formatLabel: 'POSTER / A4',
      languages: 'english',
      langLabel: 'ENG',
      badge: 'Approved Hero Poster',
      badgeColor: 'bg-primary/10 text-primary',
      description: 'High-resolution vertical poster showcasing the ₹5,00,000 cumulative bonus trajectory from Rising Star to Global Ambassador.',
      caption: `Nexora ke sath banein certified Growth Partner! Onboard genuine salons & earn milestone rewards up to ₹5,00,000 + monthly lifetime recurring revenue. Register today: ${trackingUrl}`,
      downloadFileName: '7-Stage-Milestone-Poster.png',
      disclaimer: 'Rewards and earnings verified performance, eligible settled transactions, approval and programme terms ke adheen hain.'
    },
    {
      id: 'NX-QR-2024-11',
      title: '15-Day Salon QR Qualification Guide',
      category: 'qr-education',
      format: 'whatsapp',
      formatLabel: 'WHATSAPP (4:5)',
      languages: 'hinglish',
      langLabel: 'HINGLISH',
      badge: 'Active Requirement',
      badgeColor: 'bg-secondary/10 text-secondary',
      description: 'Explains exact salon onboarding verification criteria: ₹1,000 daily QR settlement for 15 consecutive days to trigger partner activation payout.',
      caption: `Nexora QR lagwane wale salons ke liye smart guide! Sirf ₹1,00,000 rojana transactions 15 dinon tak, aur payein VIP merchant rates aur zero rental standee. Jaaniye poori process: ${trackingUrl}`,
      downloadFileName: 'Salon-15Day-Qualification-Guide.png',
      disclaimer: 'Synthetic / Circular self-transactions disqualified permanently. Direct ledger deductions apply.'
    },
    {
      id: 'NX-REV-2024-03',
      title: 'Activation Reward & Recurring Share Breakdown',
      category: 'growth-program',
      format: 'whatsapp',
      formatLabel: 'INFOGRAPHIC',
      languages: 'hinglish',
      langLabel: 'EN/HI',
      badge: 'Revenue Architecture',
      badgeColor: 'bg-tertiary-container/30 text-tertiary',
      description: 'Clear 3-tier commission timeline showing M1-6 (10%), M7-12 (5%), and 12M+ (2%) perpetual trail earnings for transparent partner talks.',
      caption: `Nexora ke sath onboard kiye har salon se lifetime income paayein! 10% activation share se lekar perpetual lifetime revenue tak. Details dekhein: ${trackingUrl}`,
      downloadFileName: 'Recurring-Commission-Architecture.png',
      disclaimer: 'RBI fair advertising compliant. No unrealistic income projections.'
    },
    {
      id: 'NX-INV-2024-09',
      title: 'Salon Referral QR Standee & Invite Card',
      category: 'salon-onboarding',
      format: 'poster',
      formatLabel: 'PRINT STANDEE',
      languages: 'hindi',
      langLabel: 'HINDI',
      badge: 'Merchant Kit',
      badgeColor: 'bg-secondary-container/40 text-on-secondary-container',
      description: 'Professional printable template highlighting zero rental fee, free audio soundbox, and fast digital onboarding for barbers, spas, and salons.',
      caption: `Kya aapka salon abhi tak normal QR use kar raha hai? Aaj hi lagwaiye Nexora Voice Soundbox aur zero transaction charges. Apply karein: ${trackingUrl}`,
      downloadFileName: 'Salon-Standee-Printable.pdf',
      disclaimer: 'Custom QR Standee with Salon Name & UPI ID'
    },
    {
      id: 'NX-FRD-2024-05',
      title: 'Merchant Anti-Fraud & Self-Scan Safeguards',
      category: 'fraud-awareness',
      format: 'instagram',
      formatLabel: 'INSTAGRAM (1:1)',
      languages: 'english',
      langLabel: 'ENG',
      badge: 'Essential Compliance',
      badgeColor: 'bg-error-container text-on-error-container',
      description: 'Educates partners and salon owners on authentic walk-in billing. Strictly prohibits self-transactions, artificial volume pumping, and multi-swiping.',
      caption: `Important update for Nexora Growth Partners & Salon Owners: Ensure only genuine client payments are processed via QR. Read anti-fraud compliance rules: ${trackingUrl}`,
      downloadFileName: 'Nexora-AntiFraud-Guidelines.png',
      disclaimer: 'Self-scan activity leads to instant forfeiting of commissions.'
    },
    {
      id: 'NX-PIT-2024-02',
      title: 'Partner Training & Pitch Handbook (PDF)',
      category: 'training',
      format: 'pdf',
      formatLabel: 'PDF HANDBOOK',
      languages: 'hinglish',
      langLabel: '14 PAGES',
      badge: 'Field Enablement',
      badgeColor: 'bg-surface-container-highest text-on-surface',
      description: 'End-to-end field manual containing objection handling, script templates, salon onboarding documentation steps, and milestone optimization.',
      caption: `Nexora Growth Partner Master Playbook! Step-by-step guidance on signing up salons, solving doubts, and reaching ₹5 Lakh milestone faster. Download guide: ${trackingUrl}`,
      downloadFileName: 'Nexora-Partner-Pitchbook.pdf',
      disclaimer: 'Includes merchant case studies and ROI calculations.'
    }
  ];

  // Simulator state handler
  const handleSimStateChange = (state: 'preview' | 'skeleton' | 'empty' | 'downloading' | 'downloaded' | 'error') => {
    setSimState(state);
    if (state === 'preview') {
      triggerToast('Displaying all 6 active verified compliance promotional creatives.', 'check_circle', 'bg-surface-container text-on-surface');
    } else if (state === 'skeleton') {
      triggerToast('Simulating high-latency network fetch: Shimmer skeletons enabled.', 'pending', 'bg-secondary-fixed text-on-secondary-fixed');
    } else if (state === 'empty') {
      triggerToast('No records found matching simulator empty condition.', 'filter_alt_off', 'bg-surface-container-high text-on-surface');
    } else if (state === 'downloading') {
      triggerToast('Generating vector-rendered print package in background... (14.8 MB)', 'cloud_download', 'bg-tertiary-container/30 text-on-tertiary-container');
    } else if (state === 'downloaded') {
      triggerToast('Material successfully saved to local device cache.', 'file_download_done', 'bg-primary-fixed text-on-primary-fixed');
    } else if (state === 'error') {
      triggerToast('Share intent error: WhatsApp API or network handoff failed. Please retry.', 'error', 'bg-error-container text-on-error-container');
    }
  };

  // Filter and search logic
  const filteredAssets = useMemo(() => {
    if (simState === 'empty') return [];
    if (simState === 'error') return [];

    return assets.filter(asset => {
      // Category tag filter
      if (selectedCategory !== 'all' && asset.category !== selectedCategory) {
        return false;
      }
      // Language filter select
      if (selectedLanguage !== 'all' && asset.languages !== selectedLanguage) {
        return false;
      }
      // Format filter select
      if (selectedFormat !== 'all') {
        if (selectedFormat === 'whatsapp' && asset.format !== 'whatsapp') return false;
        if (selectedFormat === 'instagram' && asset.format !== 'instagram') return false;
        if (selectedFormat === 'poster' && asset.format !== 'poster') return false;
        if (selectedFormat === 'pdf' && asset.format !== 'pdf') return false;
      }
      // Text search
      if (searchText.trim().length > 0) {
        const query = searchText.toLowerCase();
        const matchesTitle = asset.title.toLowerCase().includes(query);
        const matchesDesc = asset.description.toLowerCase().includes(query);
        const matchesBadge = asset.badge.toLowerCase().includes(query);
        const matchesFormat = asset.formatLabel.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesBadge && !matchesFormat) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, selectedLanguage, selectedFormat, searchText, simState]);

  // Actions
  const copyReferralLink = () => {
    navigator.clipboard.writeText(trackingUrl).then(() => {
      triggerToast('Referral link copied to clipboard!', 'content_copy', 'bg-surface-container-high text-on-surface');
    });
  };

  const shareDirectWhatsApp = () => {
    const text = encodeURIComponent(`Namaste! Join Nexora as an elite Growth Partner and earn recurring lifetime commissions from top salons. Register using my verified link: ${trackingUrl}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const copyCaption = (textElementId: string) => {
    const targetAsset = assets.find(a => a.id === textElementId);
    if (!targetAsset) return;
    
    let finalCaption = targetAsset.caption;
    if (!autoAttachToggle) {
      // Strip off the link if autoAttach is off
      finalCaption = finalCaption.replace(trackingUrl, '').trim();
    }

    navigator.clipboard.writeText(finalCaption).then(() => {
      triggerToast('Approved caption copied!', 'content_copy', 'bg-surface-container-high text-on-surface');
    });
  };

  const shareWhatsApp = (textElementId: string) => {
    const targetAsset = assets.find(a => a.id === textElementId);
    if (!targetAsset) return;
    
    let finalCaption = targetAsset.caption;
    if (!autoAttachToggle) {
      finalCaption = finalCaption.replace(trackingUrl, '').trim();
    }

    window.open(`https://wa.me/?text=${encodeURIComponent(finalCaption)}`, "_blank");
  };

  const triggerDownload = (fileName: string) => {
    triggerToast(`Downloading ${fileName}...`, 'download', 'bg-surface-container-high text-on-surface');
  };

  const resetFilters = () => {
    setSearchText('');
    setSelectedCategory('all');
    setSelectedLanguage('all');
    setSelectedFormat('all');
  };

  const selectedPreviewAsset = useMemo(() => {
    return assets.find(a => a.id === previewAssetId) || null;
  }, [previewAssetId]);

  return (
    <div className="min-h-screen bg-surface text-on-surface flex">
      
      {/* SIDEBAR NAVIGATION - MATCHING TELEMETRY LAYOUT */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-low z-50 flex flex-col justify-between overflow-y-auto shadow-[0_1px_8px_rgba(0,0,0,0.04)] hidden lg:flex border-r border-outline-variant/35">
        <div className="flex flex-col">
          {/* Brand Logo and Title */}
          <div className="p-space-lg flex items-center gap-space-sm">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-[0_4px_16px_rgba(217,27,119,0.28)]">
              <span className="material-symbols-outlined text-[20px]">token</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface">Nexora</span>
              <span className="font-label-sm text-label-sm tracking-wide text-secondary uppercase font-bold">Partner Portal</span>
            </div>
          </div>

          {/* User Status Chip */}
          <div className="px-space-lg pb-space-md">
            <div className="p-space-sm rounded-xl bg-surface-container-high/80 backdrop-blur-md flex items-center gap-space-sm border border-outline-variant/20">
              <div className="w-7 h-7 rounded-full bg-tertiary-container/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-tertiary text-[18px]">verified</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary font-bold">Platinum Growth</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant leading-none">Top 2% Network</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-space-xs px-space-md py-space-sm">
            <button
              onClick={() => onNavigateToHub && onNavigateToHub()}
              className="flex items-center gap-space-sm px-space-md py-2.5 rounded-xl font-label-lg text-label-lg text-[#b1005e] bg-[#ffd9e2]/50 hover:bg-[#ffd9e2] font-bold border border-[#fda4c9]/60 transition-all text-left cursor-pointer mb-1 shadow-2xs"
              type="button"
              title="Return to Main Landing Hub"
            >
              <span className="material-symbols-outlined text-[20px]">home</span>
              <span>Home (Landing Page)</span>
            </button>
            <span className="px-3 text-[10px] font-black text-[#8d6f77] uppercase tracking-wider mb-1">Performance</span>
            
            <button
              onClick={() => onNavigateToDashboard && onNavigateToDashboard()}
              className="flex items-center gap-space-sm px-space-md py-2.5 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">space_dashboard</span>
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => onNavigateToShareEarn && onNavigateToShareEarn()}
              className="flex items-center gap-space-sm px-space-md py-2.5 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">qr_code_2</span>
              <span>My Referral Code</span>
            </button>

            <button
              onClick={() => onNavigateToSalonIntelligence && onNavigateToSalonIntelligence()}
              className="flex items-center gap-space-sm px-space-md py-2.5 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">storefront</span>
              <span>Referred Salons</span>
            </button>

            <button
              onClick={() => onNavigateToReferralTimeline && onNavigateToReferralTimeline()}
              className="flex items-center gap-space-sm px-space-md py-2.5 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">pending_actions</span>
              <span>Referral Status</span>
            </button>

            <span className="px-3 text-[10px] font-black text-[#8d6f77] uppercase tracking-wider mt-4 mb-1">Financial &amp; Rewards</span>

            <button
              onClick={() => onNavigateToEarningsLedger && onNavigateToEarningsLedger()}
              className="flex items-center gap-space-sm px-space-md py-2.5 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">payments</span>
              <span>Earnings</span>
            </button>

            <button
              onClick={() => onNavigateToWithdrawals && onNavigateToWithdrawals()}
              className="flex items-center gap-space-sm px-space-md py-2.5 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">account_balance</span>
              <span>Withdrawals</span>
            </button>

            <button
              onClick={() => onNavigateToRewardsMilestones && onNavigateToRewardsMilestones()}
              className="flex items-center gap-space-sm px-space-md py-2.5 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">military_tech</span>
              <span>Rewards</span>
            </button>

            <button
              onClick={() => onNavigateToExtraOnboardingReward && onNavigateToExtraOnboardingReward()}
              className="flex items-center gap-space-sm px-space-md py-2.5 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">stars</span>
              <span>Extra Onboarding Reward</span>
            </button>

            <button
              onClick={() => onNavigateToLeaderboard && onNavigateToLeaderboard()}
              className="flex items-center gap-space-sm px-space-md py-2.5 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">leaderboard</span>
              <span>Top Performers</span>
            </button>

            <button
              onClick={() => onNavigateToMarketingMaterial && onNavigateToMarketingMaterial()}
              className="flex items-center gap-space-sm px-space-md py-2.5 font-label-lg rounded-xl bg-primary-container text-on-primary-container shadow-[0_4px_16px_rgba(217,27,119,0.28)] transition-all text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">campaign</span>
              <span>Marketing Material</span>
            </button>
          </nav>
        </div>

        <div className="p-space-md flex flex-col gap-space-xs">
          <div className="h-px bg-outline-variant/40 mx-space-sm my-space-xs"></div>
          <button
            onClick={() => onNavigateToProfileSettings && onNavigateToProfileSettings()}
            className="flex items-center gap-space-sm px-space-md py-2.5 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all text-left cursor-pointer w-full"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
            <span>Profile Settings</span>
          </button>
          <button
            onClick={() => onNavigateToHub && onNavigateToHub()}
            className="flex items-center gap-space-sm px-space-md py-2.5 rounded-xl font-label-lg text-label-lg text-error hover:bg-error-container hover:text-on-error-container transition-all text-left cursor-pointer w-full"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen relative">
        
        {/* HEADER BAR */}
        <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-space-lg">
          <div className="flex items-center gap-space-sm text-on-surface-variant font-label-md text-label-md">
            <button
              type="button"
              onClick={() => onNavigateToHub && onNavigateToHub()}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-[#594047] bg-white hover:bg-[#ebe8e3] hover:text-[#b1005e] border border-[#e5e2dd] transition-all cursor-pointer shadow-2xs active:scale-95 mr-2"
              title="Return to Main Home Landing Page"
            >
              <span className="material-symbols-outlined text-[16px] text-[#b1005e]">home</span>
              <span>Home</span>
            </button>
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">hub</span>
            <span className="hover:text-on-surface cursor-pointer" onClick={() => onNavigateToDashboard && onNavigateToDashboard()}>Nexora Partner</span>
            <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
            <span className="text-on-surface font-semibold">Portal Console</span>
          </div>

          <div className="flex items-center gap-space-md">
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-[18px] text-on-surface-variant">search</span>
              <input 
                className="h-10 pl-9 pr-4 rounded-full bg-surface-container-low font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/40 w-64 transition-all" 
                placeholder="Search salons, payouts, resources..." 
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <button className="relative p-2 rounded-full hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary-container"></span>
            </button>
            <div className="h-8 w-px bg-outline-variant/50"></div>
            <div className="flex items-center gap-space-sm pl-space-xs">
              <div className="flex flex-col items-end">
                <span className="font-label-md text-label-md text-on-surface font-bold leading-tight">Julian Mercer</span>
                <span className="font-label-sm text-label-sm text-secondary leading-tight">GP-PARTNER</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
              </div>
            </div>
          </div>
        </header>

        {/* WORKSPACE MAIN CONTAINER */}
        <main className="w-full pt-16 bg-surface flex-1 flex flex-col">
          
          {/* Simulation Controller Bar */}
          <aside aria-label="Interactive State Simulator" className="sticky top-16 z-30 w-full bg-surface-container-high/90 backdrop-blur-md px-space-md py-space-xs shadow-sm">
            <div className="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-space-sm text-label-sm">
              <div className="flex items-center gap-space-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px] text-primary animate-pulse">science</span>
                <span className="font-label-sm uppercase tracking-wider text-on-surface font-bold">State Preview:</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5" id="simControls">
                <button 
                  className={`px-3 py-1.5 rounded-full font-label-sm transition-all cursor-pointer ${simState === 'preview' ? 'bg-primary-container text-on-primary-container shadow-sm font-bold' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-highest'}`}
                  onClick={() => handleSimStateChange('preview')}
                >
                  Preview Data
                </button>
                <button 
                  className={`px-3 py-1.5 rounded-full font-label-sm transition-all cursor-pointer ${simState === 'skeleton' ? 'bg-primary-container text-on-primary-container shadow-sm font-bold' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-highest'}`}
                  onClick={() => handleSimStateChange('skeleton')}
                >
                  Loading Skeleton
                </button>
                <button 
                  className={`px-3 py-1.5 rounded-full font-label-sm transition-all cursor-pointer ${simState === 'empty' ? 'bg-primary-container text-on-primary-container shadow-sm font-bold' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-highest'}`}
                  onClick={() => handleSimStateChange('empty')}
                >
                  Empty
                </button>
                <button 
                  className={`px-3 py-1.5 rounded-full font-label-sm transition-all cursor-pointer ${simState === 'downloading' ? 'bg-primary-container text-on-primary-container shadow-sm font-bold' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-highest'}`}
                  onClick={() => handleSimStateChange('downloading')}
                >
                  Downloading
                </button>
                <button 
                  className={`px-3 py-1.5 rounded-full font-label-sm transition-all cursor-pointer ${simState === 'downloaded' ? 'bg-primary-container text-on-primary-container shadow-sm font-bold' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-highest'}`}
                  onClick={() => handleSimStateChange('downloaded')}
                >
                  Downloaded
                </button>
                <button 
                  className={`px-3 py-1.5 rounded-full font-label-sm transition-all cursor-pointer ${simState === 'error' ? 'bg-primary-container text-on-primary-container shadow-sm font-bold' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-highest'}`}
                  onClick={() => handleSimStateChange('error')}
                >
                  Share Error
                </button>
              </div>
            </div>
          </aside>

          {/* Simulated State Notification Toast / Banner */}
          {toastMessage && (
            <div className="w-full px-space-md pt-space-sm" id="simFeedback">
              <div className={`max-w-[1360px] mx-auto p-space-sm rounded-xl flex items-center justify-between shadow-md transition-all ${toastBg}`} id="simFeedbackBox">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-[20px]" id="simFeedbackIcon">{toastIcon}</span>
                  <span className="font-label-md" id="simFeedbackText">{toastMessage}</span>
                </div>
                <button aria-label="Dismiss feedback" className="p-1 rounded-full hover:bg-black/5 cursor-pointer" onClick={() => setToastMessage(null)}>
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            </div>
          )}

          {/* CONTENT INNER WRAPPER */}
          <div className="w-full max-w-[1360px] mx-auto px-4 md:px-6 lg:px-8 py-space-md space-y-space-lg">
            
            {/* Header Section */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm uppercase tracking-wider font-bold">
                    Nexora Compliance Certified
                  </span>
                  <span className="font-label-sm text-secondary">Updated 2h ago</span>
                </div>
                <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight font-black">
                  Marketing Material
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                  Approved creatives share karke genuine salons onboard karein aur transparent recurring commissions unlock karein.
                </p>
              </div>
              <div className="flex items-center gap-2 bg-surface-container-low p-2.5 rounded-2xl self-start md:self-auto shadow-sm border border-outline-variant/25">
                <div className="w-9 h-9 rounded-xl bg-tertiary-container/30 flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined text-[20px]">badge</span>
                </div>
                <div className="pr-2">
                  <span className="block font-label-sm text-on-surface-variant uppercase text-[10px]">Partner Code</span>
                  <span className="font-label-lg text-on-surface font-bold tracking-wide select-all">{referralCode}</span>
                </div>
              </div>
            </header>

            {/* Sticky Referral Link & Instant Share Card */}
            <section className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-space-md md:p-space-lg shadow-md border border-outline-variant/30">
              <div className="absolute -right-16 -top-16 w-56 h-56 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-center relative z-10">
                <div className="lg:col-span-5 space-y-2">
                  <div className="inline-flex items-center gap-1.5 text-primary font-label-md">
                    <span className="material-symbols-outlined text-[18px]">link</span>
                    <span className="font-bold">Your Personalised Tracking Gateway</span>
                  </div>
                  <p className="font-headline-sm text-headline-sm text-on-surface font-black">Auto-Affixed Referral Engine</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Jab bhi aap creative share karenge, yeh link automatically aapke WhatsApp share caption ke end me lag jayega.
                  </p>
                </div>
                <div className="lg:col-span-7 flex flex-col gap-space-sm">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-surface-container-low p-2 rounded-xl border border-outline-variant/20">
                    <div className="flex-1 flex items-center gap-2 px-3 py-1.5 min-w-0">
                      <span className="material-symbols-outlined text-outline text-[20px] shrink-0">qr_code_2</span>
                      <span className="font-body-sm text-body-sm text-on-surface font-medium truncate select-all" id="referralUrlText">
                        {trackingUrl}
                      </span>
                    </div>
                    <button 
                      className="h-11 px-4 rounded-lg bg-surface-container-highest hover:bg-surface text-on-surface font-label-md flex items-center justify-center gap-1.5 transition-colors shrink-0 cursor-pointer"
                      onClick={copyReferralLink}
                    >
                      <span className="material-symbols-outlined text-[18px]">content_copy</span>
                      <span>Copy Link</span>
                    </button>
                    <button 
                      className="h-11 px-5 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-md flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg transition-all shrink-0 cursor-pointer"
                      onClick={shareDirectWhatsApp}
                    >
                      <span className="material-symbols-outlined text-[18px]">share</span>
                      <span>1-Tap WhatsApp</span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between px-1 text-label-sm">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input 
                        checked={autoAttachToggle} 
                        onChange={(e) => setAutoAttachToggle(e.target.checked)}
                        className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer" 
                        type="checkbox"
                      />
                      <span className="text-on-surface-variant text-[11px] font-semibold">Auto-attach referral link &amp; partner disclosure to all shared captions</span>
                    </label>
                    <span className="text-secondary hidden sm:inline font-label-sm font-bold">Verified Secure Tag</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Horizontal Category Scroll & Dropdown Filters */}
            <nav aria-label="Creative Categories" className="space-y-space-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm pb-1">
                {/* Scrollable Category Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full" id="categoryTabs">
                  {[
                    { id: 'all', label: 'All Creatives (6)' },
                    { id: 'growth-program', label: 'Growth Programme' },
                    { id: 'milestones', label: 'Reward Milestones' },
                    { id: 'salon-onboarding', label: 'Salon Onboarding' },
                    { id: 'qr-education', label: 'QR Qualification' },
                    { id: 'fraud-awareness', label: 'Fraud Safeguards' },
                    { id: 'training', label: 'Training Guides' }
                  ].map(pill => (
                    <button 
                      key={pill.id}
                      className={`px-4 py-2 rounded-full font-label-sm whitespace-nowrap transition-all cursor-pointer ${selectedCategory === pill.id ? 'bg-primary text-on-primary shadow-sm font-bold' : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'}`}
                      onClick={() => setSelectedCategory(pill.id)}
                    >
                      {pill.label}
                    </button>
                  ))}
                </div>

                {/* Filter Dropdowns */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                  <div className="relative inline-block text-left">
                    <select 
                      aria-label="Filter by Language" 
                      className="appearance-none h-10 pl-3 pr-8 rounded-xl bg-surface-container-low font-label-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer shadow-sm border border-outline-variant/20 font-bold"
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                    >
                      <option value="all">Language: All</option>
                      <option value="hindi">Hindi (हिंदी)</option>
                      <option value="hinglish">Hinglish</option>
                      <option value="english">English</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-[18px] pointer-events-none text-on-surface-variant">expand_more</span>
                  </div>
                  <div className="relative inline-block text-left">
                    <select 
                      aria-label="Filter by Creative Format" 
                      className="appearance-none h-10 pl-3 pr-8 rounded-xl bg-surface-container-low font-label-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer shadow-sm border border-outline-variant/20 font-bold"
                      value={selectedFormat}
                      onChange={(e) => setSelectedFormat(e.target.value)}
                    >
                      <option value="all">Format: All</option>
                      <option value="whatsapp">WhatsApp Banner (4:5)</option>
                      <option value="poster">HQ Poster / A4</option>
                      <option value="instagram">Square (1:1)</option>
                      <option value="pdf">Document / PDF</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-[18px] pointer-events-none text-on-surface-variant font-bold">tune</span>
                  </div>
                </div>
              </div>
            </nav>

            {/* Empty State Container */}
            {filteredAssets.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 px-4 bg-surface-container-low rounded-2xl text-center space-y-4 shadow-sm border border-outline-variant/15" id="emptyView">
                <div className="w-16 h-16 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shadow">
                  <span className="material-symbols-outlined text-[32px]">folder_off</span>
                </div>
                <div className="space-y-1 max-w-md">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">No Marketing Creatives Found</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Selected filter criteria ke liye koi approved promotional material uplabdh nahi hai. Filters reset karein ya doosri category select karein.
                  </p>
                </div>
                <button 
                  className="px-5 py-2.5 rounded-full bg-primary text-on-primary font-label-md shadow-md hover:bg-primary-container transition-all cursor-pointer font-bold"
                  onClick={resetFilters}
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Skeleton Loading View Container */}
            {simState === 'skeleton' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg" id="skeletonView">
                {[1, 2].map((num) => (
                  <div key={num} className="bg-surface-container-low rounded-2xl p-space-md space-y-space-md animate-pulse border border-outline-variant/15">
                    <div className="w-full h-80 bg-surface-container-high rounded-xl"></div>
                    <div className="h-6 w-2/3 bg-surface-container-high rounded"></div>
                    <div className="h-4 w-full bg-surface-container-high rounded"></div>
                    <div className="h-10 w-full bg-surface-container-high rounded-xl"></div>
                  </div>
                ))}
              </div>
            )}

            {/* Responsive 2-Column Creative Grid */}
            {simState !== 'skeleton' && filteredAssets.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg" id="creativeGrid">
                
                {/* CARD 1: Official 7-Stage Milestone Rewards Poster */}
                {filteredAssets.some(a => a.id === 'NX-MIL-2024-07') && (
                  <article className="creative-card flex flex-col justify-between bg-surface-container-lowest rounded-2xl p-space-md md:p-space-lg shadow-sm hover:shadow-md transition-all border border-outline-variant/20">
                    <div className="space-y-space-md">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary font-label-sm font-bold">
                          <span className="material-symbols-outlined text-[14px]">verified</span> Approved Hero Poster
                        </span>
                        <span className="font-label-sm text-on-surface-variant font-mono text-[11px] font-bold">POSTER / A4 • ENG</span>
                      </div>
                      
                      {/* Poster Visual Container */}
                      <div 
                        className="group relative w-full rounded-xl overflow-hidden cursor-pointer bg-gradient-to-b from-[#3a001b] via-[#59042b] to-[#240011] p-5 text-white shadow-inner flex flex-col justify-between aspect-[3/4]" 
                        onClick={() => setPreviewAssetId('NX-MIL-2024-07')}
                      >
                        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]"></div>
                        <div className="relative z-10 flex justify-between items-start">
                          <div>
                            <span className="font-label-sm tracking-widest text-[#ffd9e2] uppercase text-[9px] font-bold">Nexora Growth Partner</span>
                            <h3 className="font-headline-md text-headline-md tracking-tight text-white font-black leading-tight mt-0.5">
                              7-STAGE MILESTONE
                            </h3>
                            <p className="font-label-md text-secondary-fixed uppercase tracking-wider text-[11px] font-bold">Rewards &amp; Income Ladder</p>
                          </div>
                          <div className="bg-gradient-to-br from-tertiary-container to-tertiary text-on-tertiary-fixed p-2 rounded-xl text-center shadow-lg w-24">
                            <span className="material-symbols-outlined text-[20px]">shield</span>
                            <div className="font-label-sm uppercase font-bold text-[9px] leading-tight">Cash Bonus Up To</div>
                            <div className="font-label-lg font-extrabold text-[14px] leading-none mt-0.5">₹5,00,000</div>
                          </div>
                        </div>

                        {/* Visual Ladder Schematic Nodes */}
                        <div className="relative z-10 my-auto py-2 space-y-2">
                          <div className="flex items-center gap-2 pl-12">
                            <div className="w-6 h-6 rounded-full bg-amber-400 text-black flex items-center justify-center text-[12px] font-bold shadow">7</div>
                            <div className="bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-medium">
                              <span className="text-amber-300 font-bold">L7: Global Ambassador</span> (₹5L + Ultimate Rev)
                            </div>
                          </div>
                          <div className="flex items-center gap-2 pl-9">
                            <div className="w-6 h-6 rounded-full bg-amber-400/90 text-black flex items-center justify-center text-[12px] font-bold shadow">6</div>
                            <div className="bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-medium">
                              <span className="text-amber-200 font-bold">L6: President</span> (₹3,00,000 + Elite Rev)
                            </div>
                          </div>
                          <div className="flex items-center gap-2 pl-6">
                            <div className="w-6 h-6 rounded-full bg-pink-300 text-[#500028] flex items-center justify-center text-[12px] font-bold shadow">5</div>
                            <div className="bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-medium">
                              <span className="text-pink-200 font-bold">L5: Vice President</span> (₹1,50,000)
                            </div>
                          </div>
                          <div className="flex items-center gap-2 pl-3">
                            <div className="w-6 h-6 rounded-full bg-pink-400 text-[#500028] flex items-center justify-center text-[12px] font-bold shadow">4</div>
                            <div className="bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-medium">
                              <span className="text-pink-100 font-bold">L4: Director</span> (₹75,000 Bonus)
                            </div>
                          </div>
                          <div className="flex items-center gap-2 pl-0">
                            <div className="w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center text-[12px] font-bold shadow">1</div>
                            <div className="bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-medium">
                              <span className="text-white font-bold">L1: Rising Star</span> (₹5,000 Bonus)
                            </div>
                          </div>
                        </div>

                        {/* Footer of Poster Visual */}
                        <div className="relative z-10 pt-2 flex items-center justify-between text-[10px] text-pink-200/80">
                          <span>Unlock Your Financial Future • Nexora Luxury Fintech</span>
                          <span className="font-mono">nexora.com</span>
                        </div>
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <span className="px-4 py-2 rounded-full bg-white text-on-surface font-label-md shadow-lg flex items-center gap-1.5 font-bold">
                            <span className="material-symbols-outlined text-[18px]">zoom_in</span> Click for Full Uncropped Preview
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">7-Stage Milestone &amp; Income Ladder</h2>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          High-resolution vertical poster showcasing the ₹5,00,000 cumulative bonus trajectory from Rising Star to Global Ambassador.
                        </p>
                      </div>

                      {/* Caption box */}
                      <div className="p-space-sm rounded-xl bg-surface-container-low space-y-1.5 border border-outline-variant/15">
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-on-surface-variant font-bold text-[11px]">Compliance Approved Caption:</span>
                          <button 
                            className="text-primary font-label-sm flex items-center gap-1 hover:underline cursor-pointer font-bold"
                            onClick={() => copyCaption('NX-MIL-2024-07')}
                          >
                            <span className="material-symbols-outlined text-[14px]">content_copy</span> Copy Caption
                          </button>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface line-clamp-2 select-all font-mono leading-relaxed" id="capMilestone">
                          {autoAttachToggle ? `Nexora ke sath banein certified Growth Partner! Onboard genuine salons & earn milestone rewards up to ₹5,00,000 + monthly lifetime recurring revenue. Register today: ${trackingUrl}` : `Nexora ke sath banein certified Growth Partner! Onboard genuine salons & earn milestone rewards up to ₹5,00,000 + monthly lifetime recurring revenue.`}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-space-sm pt-space-md">
                      <div className="flex items-center gap-2">
                        <button 
                          className="flex-1 h-11 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer font-bold"
                          onClick={() => triggerDownload('7-Stage-Milestone-Poster.png')}
                        >
                          <span className="material-symbols-outlined text-[18px]">download</span>
                          <span>Download (HQ)</span>
                        </button>
                        <button 
                          className="h-11 px-4 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md flex items-center justify-center cursor-pointer"
                          onClick={() => setPreviewAssetId('NX-MIL-2024-07')}
                          title="Full Screen Preview"
                        >
                          <span className="material-symbols-outlined text-[20px]">fullscreen</span>
                        </button>
                        <button 
                          className="flex-1 h-11 px-3 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-label-md flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer font-bold"
                          onClick={() => shareWhatsApp('NX-MIL-2024-07')}
                        >
                          <span className="material-symbols-outlined text-[18px]">share</span>
                          <span>Share WhatsApp</span>
                        </button>
                      </div>
                      <p className="font-label-sm text-[11px] text-on-surface-variant leading-tight bg-surface-container-low/50 p-2 rounded-lg">
                        <strong>Statutory:</strong> Rewards and earnings verified performance, eligible settled transactions, approval and programme terms ke adheen hain.
                      </p>
                    </div>
                  </article>
                )}

                {/* CARD 2: 15-Day Salon QR Qualification Guide */}
                {filteredAssets.some(a => a.id === 'NX-QR-2024-11') && (
                  <article className="creative-card flex flex-col justify-between bg-surface-container-lowest rounded-2xl p-space-md md:p-space-lg shadow-sm hover:shadow-md transition-all border border-outline-variant/20">
                    <div className="space-y-space-md">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary/10 text-secondary font-label-sm font-bold">
                          <span className="material-symbols-outlined text-[14px]">fact_check</span> Active Requirement
                        </span>
                        <span className="font-label-sm text-on-surface-variant font-mono text-[11px] font-bold">WHATSAPP (4:5) • HINGLISH</span>
                      </div>

                      {/* Qualification Infographic Container */}
                      <div 
                        className="group relative w-full rounded-xl overflow-hidden cursor-pointer bg-surface-container p-5 shadow-inner flex flex-col justify-between aspect-[3/4]"
                        onClick={() => setPreviewAssetId('NX-QR-2024-11')}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                              <span className="material-symbols-outlined text-[18px]">event_repeat</span>
                            </div>
                            <span className="font-label-md text-primary uppercase font-bold text-xs">15-Day QR Rule</span>
                          </div>
                          <span className="px-2.5 py-1 rounded-full bg-surface-container-highest text-on-surface font-label-sm font-bold text-[11px]">₹15,000 Target</span>
                        </div>

                        {/* Interactive schematic nodes */}
                        <div className="space-y-3 my-auto">
                          <div className="p-3 bg-surface-container-lowest rounded-xl shadow-sm space-y-1">
                            <div className="flex justify-between font-label-sm text-on-surface-variant text-xs">
                              <span>Daily QR Volume</span>
                              <span className="font-bold text-on-surface">Min ₹1,000 / Day</span>
                            </div>
                            <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                              <div className="bg-primary h-full rounded-full" style={{ width: '100%' }}></div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="p-3 bg-surface-container-lowest rounded-xl shadow-sm">
                              <span className="block font-label-sm text-on-surface-variant text-[10px]">Duration</span>
                              <span className="font-headline-sm text-headline-sm text-on-surface font-black">15 Days</span>
                              <span className="text-[11px] text-secondary font-semibold">Consecutive Cycle</span>
                            </div>
                            <div className="p-3 bg-surface-container-lowest rounded-xl shadow-sm">
                              <span className="block font-label-sm text-on-surface-variant text-[10px]">Your Partner 10%</span>
                              <span className="font-headline-sm text-headline-sm text-primary font-black">₹1,500</span>
                              <span className="text-[11px] text-on-surface-variant">Instant Commission</span>
                            </div>
                          </div>
                          <div className="p-2.5 bg-surface-container-high rounded-xl text-center border border-outline-variant/15">
                            <span className="font-label-sm text-on-surface text-xs">Total Qualifying Turnaround: <strong>₹15,000 QR Volume</strong></span>
                          </div>
                        </div>

                        <div className="text-center font-label-sm text-on-surface-variant text-[10px]">
                          Guaranteed settlement via Nexora Smart Soundbox &amp; QR
                        </div>
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="px-4 py-2 rounded-full bg-white text-on-surface font-label-md shadow-lg flex items-center gap-1.5 font-bold">
                            <span className="material-symbols-outlined text-[18px]">zoom_in</span> Inspect Qualification Card
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">15-Day Salon QR Qualification Guide</h2>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Explains exact salon onboarding verification criteria: ₹1,000 daily QR settlement for 15 consecutive days to trigger partner activation payout.
                        </p>
                      </div>

                      {/* Caption box */}
                      <div className="p-space-sm rounded-xl bg-surface-container-low space-y-1.5 border border-outline-variant/15">
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-on-surface-variant font-bold text-[11px]">Hindi/Hinglish Caption:</span>
                          <button 
                            className="text-primary font-label-sm flex items-center gap-1 hover:underline cursor-pointer font-bold"
                            onClick={() => copyCaption('NX-QR-2024-11')}
                          >
                            <span className="material-symbols-outlined text-[14px]">content_copy</span> Copy Caption
                          </button>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface line-clamp-2 select-all font-mono leading-relaxed" id="capQual">
                          {autoAttachToggle ? `Nexora QR lagwane wale salons ke liye smart guide! Sirf ₹1,00,000 rojana transactions 15 dinon tak, aur payein VIP merchant rates aur zero rental standee. Jaaniye poori process: ${trackingUrl}` : `Nexora QR lagwane wale salons ke liye smart guide! Sirf ₹1,00,000 rojana transactions 15 dinon tak, aur payein VIP merchant rates aur zero rental standee. Jaaniye poori process:`}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-space-sm pt-space-md">
                      <div className="flex items-center gap-2">
                        <button 
                          className="flex-1 h-11 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer font-bold"
                          onClick={() => triggerDownload('Salon-15Day-Qualification-Guide.png')}
                        >
                          <span className="material-symbols-outlined text-[18px]">download</span>
                          <span>Download</span>
                        </button>
                        <button 
                          className="flex-1 h-11 px-3 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-label-md flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer font-bold"
                          onClick={() => shareWhatsApp('NX-QR-2024-11')}
                        >
                          <span className="material-symbols-outlined text-[18px]">share</span>
                          <span>Share WhatsApp</span>
                        </button>
                      </div>
                      <p className="font-label-sm text-[11px] text-on-surface-variant leading-tight bg-surface-container-low/50 p-2 rounded-lg">
                        <strong>Statutory:</strong> Rewards and earnings verified performance, eligible settled transactions, approval and programme terms ke adheen hain.
                      </p>
                    </div>
                  </article>
                )}

                {/* CARD 3: Activation Reward & Recurring Share Breakdown */}
                {filteredAssets.some(a => a.id === 'NX-REV-2024-03') && (
                  <article className="creative-card flex flex-col justify-between bg-surface-container-lowest rounded-2xl p-space-md md:p-space-lg shadow-sm hover:shadow-md transition-all border border-outline-variant/20">
                    <div className="space-y-space-md">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary-container/30 text-tertiary font-label-sm font-bold">
                          <span className="material-symbols-outlined text-[14px]">monetization_on</span> Revenue Architecture
                        </span>
                        <span className="font-label-sm text-on-surface-variant font-mono text-[11px] font-bold">INFOGRAPHIC • EN/HI</span>
                      </div>

                      {/* Visual Revenue ladder */}
                      <div 
                        className="group relative w-full rounded-xl overflow-hidden cursor-pointer bg-surface-container p-5 shadow-inner flex flex-col justify-between aspect-[3/4]"
                        onClick={() => setPreviewAssetId('NX-REV-2024-03')}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-label-sm text-secondary uppercase tracking-wider font-bold text-[10px]">Payout Structure</span>
                            <div className="font-headline-sm text-headline-sm text-on-surface font-black">Recurring Trail Share</div>
                          </div>
                          <div className="w-9 h-9 rounded-full bg-secondary-container/40 flex items-center justify-center text-secondary">
                            <span className="material-symbols-outlined text-[20px]">trending_up</span>
                          </div>
                        </div>

                        {/* Interactive commission bars */}
                        <div className="space-y-2.5 my-auto">
                          <div className="p-3 bg-surface-container-lowest rounded-xl flex items-center justify-between shadow-sm border border-outline-variant/10">
                            <div>
                              <span className="block font-label-sm text-primary font-bold text-xs">1st 15-Day Activation</span>
                              <span className="font-body-sm text-on-surface-variant text-[11px]">Qualification Milestone</span>
                            </div>
                            <span className="font-headline-sm text-headline-sm text-primary font-black">10% Split</span>
                          </div>
                          <div className="p-3 bg-surface-container-lowest rounded-xl flex items-center justify-between shadow-sm border border-outline-variant/10">
                            <div>
                              <span className="block font-label-sm text-on-surface font-bold text-xs">Months 1 to 6</span>
                              <span className="font-body-sm text-on-surface-variant text-[11px]">Early Growth Period</span>
                            </div>
                            <span className="font-headline-sm text-headline-sm text-on-surface font-black">10% Rev</span>
                          </div>
                          <div className="p-3 bg-surface-container-lowest rounded-xl flex items-center justify-between shadow-sm border border-outline-variant/10">
                            <div>
                              <span className="block font-label-sm text-on-surface font-bold text-xs">Months 7 to 12</span>
                              <span className="font-body-sm text-on-surface-variant text-[11px]">Matured Partner Share</span>
                            </div>
                            <span className="font-headline-sm text-headline-sm text-on-surface font-black">5% Rev</span>
                          </div>
                          <div className="p-3 bg-surface-container-lowest rounded-xl flex items-center justify-between shadow-sm border border-outline-variant/10">
                            <div>
                              <span className="block font-label-sm text-on-surface font-bold text-xs">Month 13 Onwards</span>
                              <span className="font-body-sm text-on-surface-variant text-[11px]">Perpetual Lifetime Yield</span>
                            </div>
                            <span className="font-headline-sm text-headline-sm text-tertiary font-black">2% Lifetime</span>
                          </div>
                        </div>

                        <div className="text-[10px] text-center text-on-surface-variant">
                          Full transparent accounting direct to bank account.
                        </div>
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="px-4 py-2 rounded-full bg-white text-on-surface font-label-md shadow-lg flex items-center gap-1.5 font-bold">
                            <span className="material-symbols-outlined text-[18px]">zoom_in</span> Inspect Breakdown
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Activation Reward &amp; Recurring Share</h2>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Clear 3-tier commission timeline showing M1-6 (10%), M7-12 (5%), and 12M+ (2%) perpetual trail earnings for transparent partner talks.
                        </p>
                      </div>

                      {/* Caption Box */}
                      <div className="p-space-sm rounded-xl bg-surface-container-low space-y-1.5 border border-outline-variant/15">
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-on-surface-variant font-bold text-[11px]">Recommended Caption:</span>
                          <button 
                            className="text-primary font-label-sm flex items-center gap-1 hover:underline cursor-pointer font-bold"
                            onClick={() => copyCaption('NX-REV-2024-03')}
                          >
                            <span className="material-symbols-outlined text-[14px]">content_copy</span> Copy Caption
                          </button>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface line-clamp-2 select-all font-mono leading-relaxed" id="capRev">
                          {autoAttachToggle ? `Nexora ke sath onboard kiye har salon se lifetime income paayein! 10% activation share se lekar perpetual lifetime revenue tak. Details dekhein: ${trackingUrl}` : `Nexora ke sath onboard kiye har salon se lifetime income paayein! 10% activation share se lekar perpetual lifetime revenue tak. Details dekhein:`}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-space-sm pt-space-md">
                      <div className="flex items-center gap-2">
                        <button 
                          className="flex-1 h-11 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer font-bold"
                          onClick={() => triggerDownload('Recurring-Commission-Architecture.png')}
                        >
                          <span className="material-symbols-outlined text-[18px]">download</span>
                          <span>Download</span>
                        </button>
                        <button 
                          className="flex-1 h-11 px-3 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-label-md flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer font-bold"
                          onClick={() => shareWhatsApp('NX-REV-2024-03')}
                        >
                          <span className="material-symbols-outlined text-[18px]">share</span>
                          <span>Share WhatsApp</span>
                        </button>
                      </div>
                      <p className="font-label-sm text-[11px] text-on-surface-variant leading-tight bg-surface-container-low/50 p-2 rounded-lg">
                        <strong>Statutory:</strong> Rewards and earnings verified performance, eligible settled transactions, approval and programme terms ke adheen hain.
                      </p>
                    </div>
                  </article>
                )}

                {/* CARD 4: Salon Referral QR Standee & Invite Card */}
                {filteredAssets.some(a => a.id === 'NX-INV-2024-09') && (
                  <article className="creative-card flex flex-col justify-between bg-surface-container-lowest rounded-2xl p-space-md md:p-space-lg shadow-sm hover:shadow-md transition-all border border-outline-variant/20">
                    <div className="space-y-space-md">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm font-bold">
                          <span className="material-symbols-outlined text-[14px]">storefront</span> Merchant Kit
                        </span>
                        <span className="font-label-sm text-on-surface-variant font-mono text-[11px] font-bold">PRINT STANDEE • HINDI</span>
                      </div>

                      {/* Standee Graphic Widget */}
                      <div 
                        className="group relative w-full rounded-xl overflow-hidden cursor-pointer bg-surface-container p-5 shadow-inner flex flex-col justify-between aspect-[3/4]"
                        onClick={() => setPreviewAssetId('NX-INV-2024-09')}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-label-sm text-primary font-bold uppercase tracking-wider text-xs">Nexora Salon QR Standee</span>
                          <span className="material-symbols-outlined text-primary text-[20px]">qr_code_scanner</span>
                        </div>
                        <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm text-center space-y-3 my-auto mx-auto max-w-xs w-full border border-outline-variant/10">
                          <div className="font-headline-sm text-on-surface font-bold text-sm">Apne Salon Me Lagwayein</div>
                          <div className="w-24 h-24 mx-auto bg-surface-container-high rounded-xl flex items-center justify-center p-2 shadow-inner">
                            <span className="material-symbols-outlined text-[72px] text-on-surface">qr_code_2</span>
                          </div>
                          <div className="space-y-0.5">
                            <div className="font-label-md text-primary font-bold text-xs">0% UPI Fees • Zero Machine Rent</div>
                            <div className="font-label-sm text-on-surface-variant text-[10px]">Instant Voice Alerts in Hindi</div>
                          </div>
                        </div>

                        <div className="text-center font-label-sm text-on-surface-variant text-[10px]">
                          Custom QR Standee with Salon Name &amp; UPI ID
                        </div>
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="px-4 py-2 rounded-full bg-white text-on-surface font-label-md shadow-lg flex items-center gap-1.5 font-bold">
                            <span className="material-symbols-outlined text-[18px]">zoom_in</span> Standee Preview
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Salon Referral Standee &amp; Invite Card</h2>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Professional printable template highlighting zero rental fee, free audio soundbox, and fast digital onboarding for barbers, spas, and salons.
                        </p>
                      </div>

                      {/* Caption box */}
                      <div className="p-space-sm rounded-xl bg-surface-container-low space-y-1.5 border border-outline-variant/15">
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-on-surface-variant font-bold text-[11px]">Hindi Caption:</span>
                          <button 
                            className="text-primary font-label-sm flex items-center gap-1 hover:underline cursor-pointer font-bold"
                            onClick={() => copyCaption('NX-INV-2024-09')}
                          >
                            <span className="material-symbols-outlined text-[14px]">content_copy</span> Copy Caption
                          </button>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface line-clamp-2 select-all font-mono leading-relaxed" id="capStandee">
                          {autoAttachToggle ? `Kya aapka salon abhi tak normal QR use kar raha hai? Aaj hi lagwaiye Nexora Voice Soundbox aur zero transaction charges. Apply karein: ${trackingUrl}` : `Kya aapka salon abhi tak normal QR use kar raha hai? Aaj hi lagwaiye Nexora Voice Soundbox aur zero transaction charges. Apply karein:`}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-space-sm pt-space-md">
                      <div className="flex items-center gap-2">
                        <button 
                          className="flex-1 h-11 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer font-bold"
                          onClick={() => triggerDownload('Salon-Standee-Printable.pdf')}
                        >
                          <span className="material-symbols-outlined text-[18px]">download</span>
                          <span>Download PDF</span>
                        </button>
                        <button 
                          className="flex-1 h-11 px-3 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-label-md flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer font-bold"
                          onClick={() => shareWhatsApp('NX-INV-2024-09')}
                        >
                          <span className="material-symbols-outlined text-[18px]">share</span>
                          <span>Share WhatsApp</span>
                        </button>
                      </div>
                      <p className="font-label-sm text-[11px] text-on-surface-variant leading-tight bg-surface-container-low/50 p-2 rounded-lg">
                        <strong>Statutory:</strong> Rewards and earnings verified performance, eligible settled transactions, approval and programme terms ke adheen hain.
                      </p>
                    </div>
                  </article>
                )}

                {/* CARD 5: Merchant Anti-Fraud & Self-Scan Safeguards */}
                {filteredAssets.some(a => a.id === 'NX-FRD-2024-05') && (
                  <article className="creative-card flex flex-col justify-between bg-surface-container-lowest rounded-2xl p-space-md md:p-space-lg shadow-sm hover:shadow-md transition-all border border-outline-variant/20">
                    <div className="space-y-space-md">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-sm font-bold">
                          <span className="material-symbols-outlined text-[14px]">shield</span> Essential Compliance
                        </span>
                        <span className="font-label-sm text-on-surface-variant font-mono text-[11px] font-bold">INSTAGRAM (1:1) • ENG</span>
                      </div>

                      {/* Anti fraud preview panel */}
                      <div 
                        className="group relative w-full rounded-xl overflow-hidden cursor-pointer bg-surface-container p-5 shadow-inner flex flex-col justify-between aspect-[3/4]"
                        onClick={() => setPreviewAssetId('NX-FRD-2024-05')}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-label-sm text-error font-bold uppercase tracking-wider text-xs">Nexora Security Protocol</span>
                          <span className="material-symbols-outlined text-error text-[20px]">gpp_maybe</span>
                        </div>
                        <div className="space-y-2.5 my-auto">
                          <div className="p-3 bg-error/10 text-error rounded-xl flex items-center gap-3 border border-error/25">
                            <span className="material-symbols-outlined text-[24px] shrink-0">block</span>
                            <span className="font-label-sm text-xs font-semibold">No Self-Scans: Do not scan own cards/wallets</span>
                          </div>
                          <div className="p-3 bg-surface-container-lowest rounded-xl flex items-center gap-3 shadow-sm border border-outline-variant/5">
                            <span className="material-symbols-outlined text-tertiary text-[24px] shrink-0">check_circle</span>
                            <span className="font-label-sm text-on-surface text-xs font-semibold">Genuine customer payments only</span>
                          </div>
                          <div className="p-3 bg-surface-container-lowest rounded-xl flex items-center gap-3 shadow-sm border border-outline-variant/5">
                            <span className="material-symbols-outlined text-primary text-[24px] shrink-0">lock</span>
                            <span className="font-label-sm text-on-surface text-xs font-semibold">Automated anti-fraud algorithm monitoring</span>
                          </div>
                        </div>

                        <div className="text-center font-label-sm text-error font-bold text-[10px]">
                          Fraudulent registrations result in permanent de-activation.
                        </div>
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="px-4 py-2 rounded-full bg-white text-on-surface font-label-md shadow-lg flex items-center gap-1.5 font-bold">
                            <span className="material-symbols-outlined text-[18px]">zoom_in</span> View Security Notice
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Merchant Anti-Fraud &amp; Self-Scan Safeguards</h2>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Educates partners and salon owners on authentic walk-in billing. Strictly prohibits self-transactions, artificial volume pumping, and multi-swiping.
                        </p>
                      </div>

                      {/* Caption box */}
                      <div className="p-space-sm rounded-xl bg-surface-container-low space-y-1.5 border border-outline-variant/15">
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-on-surface-variant font-bold text-[11px]">Security Caption:</span>
                          <button 
                            className="text-primary font-label-sm flex items-center gap-1 hover:underline cursor-pointer font-bold"
                            onClick={() => copyCaption('NX-FRD-2024-05')}
                          >
                            <span className="material-symbols-outlined text-[14px]">content_copy</span> Copy Caption
                          </button>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface line-clamp-2 select-all font-mono leading-relaxed" id="capFraud">
                          {autoAttachToggle ? `Important update for Nexora Growth Partners & Salon Owners: Ensure only genuine client payments are processed via QR. Read anti-fraud compliance rules: ${trackingUrl}` : `Important update for Nexora Growth Partners & Salon Owners: Ensure only genuine client payments are processed via QR. Read anti-fraud compliance rules:`}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-space-sm pt-space-md">
                      <div className="flex items-center gap-2">
                        <button 
                          className="flex-1 h-11 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer font-bold"
                          onClick={() => triggerDownload('Nexora-AntiFraud-Guidelines.png')}
                        >
                          <span className="material-symbols-outlined text-[18px]">download</span>
                          <span>Download</span>
                        </button>
                        <button 
                          className="flex-1 h-11 px-3 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-label-md flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer font-bold"
                          onClick={() => shareWhatsApp('NX-FRD-2024-05')}
                        >
                          <span className="material-symbols-outlined text-[18px]">share</span>
                          <span>Share WhatsApp</span>
                        </button>
                      </div>
                      <p className="font-label-sm text-[11px] text-on-surface-variant leading-tight bg-surface-container-low/50 p-2 rounded-lg">
                        <strong>Statutory:</strong> Rewards and earnings verified performance, eligible settled transactions, approval and programme terms ke adheen hain.
                      </p>
                    </div>
                  </article>
                )}

                {/* CARD 6: Partner Training & Pitch Handbook (PDF) */}
                {filteredAssets.some(a => a.id === 'NX-PIT-2024-02') && (
                  <article className="creative-card flex flex-col justify-between bg-surface-container-lowest rounded-2xl p-space-md md:p-space-lg shadow-sm hover:shadow-md transition-all border border-outline-variant/20">
                    <div className="space-y-space-md">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-highest text-on-surface font-label-sm font-bold">
                          <span className="material-symbols-outlined text-[14px]">menu_book</span> Field Enablement
                        </span>
                        <span className="font-label-sm text-on-surface-variant font-mono text-[11px] font-bold">PDF HANDBOOK • 14 PAGES</span>
                      </div>

                      {/* PDF visual */}
                      <div 
                        className="group relative w-full rounded-xl overflow-hidden cursor-pointer bg-surface-container p-5 shadow-inner flex flex-col justify-between aspect-[3/4]"
                        onClick={() => setPreviewAssetId('NX-PIT-2024-02')}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-label-sm text-primary font-bold uppercase tracking-wider text-xs">Nexora Field Playbook</span>
                          <span className="material-symbols-outlined text-primary text-[20px]">picture_as_pdf</span>
                        </div>
                        <div className="p-4 bg-surface-container-lowest rounded-2xl shadow-sm space-y-2.5 my-auto border border-outline-variant/10">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-[24px]">school</span>
                          </div>
                          <div className="font-headline-sm text-on-surface font-bold leading-tight text-xs">Mastering Salon Onboarding Pitches</div>
                          <ul className="text-[11px] text-on-surface-variant space-y-1">
                            <li>• Salon owner objection handling guide</li>
                            <li>• Daily visit checklist &amp; KYC collection scripts</li>
                            <li>• Fast-track to Level 4 Director in 45 days</li>
                          </ul>
                        </div>

                        <div className="text-center font-label-sm text-on-surface-variant text-[10px]">
                          Comprehensive Partner Training Manual (Updated Edition)
                        </div>
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="px-4 py-2 rounded-full bg-white text-on-surface font-label-md shadow-lg flex items-center gap-1.5 font-bold">
                            <span className="material-symbols-outlined text-[18px]">zoom_in</span> Read Guide
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Partner Training &amp; Pitch Guide (PDF)</h2>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          End-to-end field manual containing objection handling, script templates, salon onboarding documentation steps, and milestone optimization.
                        </p>
                      </div>

                      {/* Caption box */}
                      <div className="p-space-sm rounded-xl bg-surface-container-low space-y-1.5 border border-outline-variant/15">
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-on-surface-variant font-bold text-[11px]">Field Intro Caption:</span>
                          <button 
                            className="text-primary font-label-sm flex items-center gap-1 hover:underline cursor-pointer font-bold"
                            onClick={() => copyCaption('NX-PIT-2024-02')}
                          >
                            <span className="material-symbols-outlined text-[14px]">content_copy</span> Copy Caption
                          </button>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface line-clamp-2 select-all font-mono leading-relaxed" id="capTrain">
                          {autoAttachToggle ? `Nexora Growth Partner Master Playbook! Step-by-step guidance on signing up salons, solving doubts, and reaching ₹5 Lakh milestone faster. Download guide: ${trackingUrl}` : `Nexora Growth Partner Master Playbook! Step-by-step guidance on signing up salons, solving doubts, and reaching ₹5 Lakh milestone faster. Download guide:`}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-space-sm pt-space-md">
                      <div className="flex items-center gap-2">
                        <button 
                          className="flex-1 h-11 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer font-bold"
                          onClick={() => triggerDownload('Nexora-Partner-Pitchbook.pdf')}
                        >
                          <span className="material-symbols-outlined text-[18px]">download</span>
                          <span>Download PDF</span>
                        </button>
                        <button 
                          className="flex-1 h-11 px-3 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-label-md flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer font-bold"
                          onClick={() => shareWhatsApp('NX-PIT-2024-02')}
                        >
                          <span className="material-symbols-outlined text-[18px]">share</span>
                          <span>Share WhatsApp</span>
                        </button>
                      </div>
                      <p className="font-label-sm text-[11px] text-on-surface-variant leading-tight bg-surface-container-low/50 p-2 rounded-lg">
                        <strong>Statutory:</strong> Rewards and earnings verified performance, eligible settled transactions, approval and programme terms ke adheen hain.
                      </p>
                    </div>
                  </article>
                )}

              </div>
            )}

            {/* Statutory Legal Compliance Notice */}
            <footer className="mt-space-xl p-space-md rounded-2xl bg-surface-container-low text-on-surface-variant text-label-sm space-y-2 border border-outline-variant/15">
              <div className="flex items-center gap-2 text-on-surface font-label-md font-bold">
                <span className="material-symbols-outlined text-[18px] text-tertiary">verified_user</span>
                <span>Nexora Growth Partner Legal &amp; Promotional Compliance Charter</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                <strong>Strictly Prohibited:</strong> Making false or unrealistic income promises, committing guaranteed loan/capital disbursements to salons without underwriter verification, or altering the approved graphics and captions above. All partner commission payouts, stage incentives, and recurring payouts are strictly governed by authentic UPI transactions settled through authorized Nexora merchant soundbox terminals.
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[10px] text-secondary font-semibold">
                <span>Charter ID: NX-COMPL-2024-V4</span>
                <span>Nexora Fintech Technologies Ltd. • All Rights Reserved</span>
              </div>
            </footer>

          </div>

          {/* Interactive Preview Modal */}
          {selectedPreviewAsset && (
            <div className="fixed inset-0 z-50 w-full h-full bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
              <div className="relative w-full max-w-2xl bg-surface-container-lowest rounded-2xl p-space-md md:p-space-lg shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto border border-outline-variant/30">
                <div className="flex items-center justify-between pb-space-sm border-b border-outline-variant/15">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[22px]">visibility</span>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface font-black" id="modalTitle">
                      {selectedPreviewAsset.title}
                    </h4>
                  </div>
                  <button 
                    aria-label="Close Preview Modal" 
                    className="w-9 h-9 rounded-full bg-surface-container-high hover:bg-surface-container-highest flex items-center justify-center text-on-surface-variant cursor-pointer border border-outline-variant/10" 
                    onClick={() => setPreviewAssetId(null)}
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>

                {/* Rendered Modal Core Design Graphic */}
                <div className="w-full my-space-sm rounded-xl overflow-hidden shadow-inner bg-surface-container p-6" id="modalVisualBody">
                  {selectedPreviewAsset.id === 'NX-MIL-2024-07' ? (
                    <div className="p-6 bg-gradient-to-b from-[#3a001b] via-[#59042b] to-[#240011] text-white flex flex-col justify-between aspect-[3/4] max-w-sm mx-auto rounded-xl shadow-lg relative">
                      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]"></div>
                      <div className="relative z-10 flex justify-between items-start">
                        <div>
                          <span className="font-label-sm text-[#ffd9e2] uppercase text-[9px] tracking-widest font-bold">Nexora Growth Partner</span>
                          <h3 className="font-headline-md font-black tracking-tight text-white leading-tight">7-STAGE MILESTONE</h3>
                          <p className="font-label-sm text-secondary-fixed uppercase tracking-wider text-[11px] font-bold">Rewards &amp; Income Ladder</p>
                        </div>
                        <div className="bg-gradient-to-br from-tertiary-container to-tertiary text-on-tertiary-fixed p-2 rounded-xl text-center shadow">
                          <span className="font-label-sm uppercase font-bold text-[9px] leading-tight">CASH BONUS UP TO</span>
                          <div className="font-headline-sm font-extrabold text-[15px]">₹5,00,000</div>
                        </div>
                      </div>
                      <div className="space-y-2 py-4 relative z-10">
                        <div className="flex items-center gap-2 pl-12"><div className="w-5 h-5 rounded-full bg-amber-400 text-black flex items-center justify-center text-[10px] font-bold">7</div><span className="bg-white/10 px-2 py-0.5 rounded text-[11px]">Level 7: Global Ambassador (₹5,00,000)</span></div>
                        <div className="flex items-center gap-2 pl-9"><div className="w-5 h-5 rounded-full bg-amber-300 text-black flex items-center justify-center text-[10px] font-bold">6</div><span className="bg-white/10 px-2 py-0.5 rounded text-[11px]">Level 6: President (₹3,00,000)</span></div>
                        <div className="flex items-center gap-2 pl-6"><div className="w-5 h-5 rounded-full bg-pink-300 text-black flex items-center justify-center text-[10px] font-bold">5</div><span className="bg-white/10 px-2 py-0.5 rounded text-[11px]">Level 5: Vice President (₹1,50,000)</span></div>
                        <div className="flex items-center gap-2 pl-3"><div className="w-5 h-5 rounded-full bg-pink-400 text-white flex items-center justify-center text-[10px] font-bold">4</div><span className="bg-white/10 px-2 py-0.5 rounded text-[11px]">Level 4: Director (₹75,000)</span></div>
                        <div className="flex items-center gap-2 pl-0"><div className="w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center text-[10px] font-bold">1</div><span className="bg-white/10 px-2 py-0.5 rounded text-[11px]">Level 1: Rising Star (₹5,000)</span></div>
                      </div>
                      <div className="text-[10px] text-pink-200 text-center relative z-10">Unlock Your Financial Future • Nexora Luxury Fintech 2024</div>
                    </div>
                  ) : selectedPreviewAsset.id === 'NX-QR-2024-11' ? (
                    <div className="p-6 bg-surface-container-high rounded-xl text-center space-y-4 max-w-sm mx-auto shadow-md border border-outline-variant/15">
                      <div className="font-headline-sm text-primary font-bold text-base">15 Consecutive Days Qualification</div>
                      <div className="p-4 bg-surface rounded-xl space-y-2 text-left border border-outline-variant/10">
                        <div className="flex justify-between font-label-sm text-xs"><span>Daily Minimum Settlement</span><strong>₹1,000/day</strong></div>
                        <div className="flex justify-between font-label-sm text-xs"><span>Total Cycle Target</span><strong>₹15,000</strong></div>
                        <div className="flex justify-between font-label-sm text-primary text-xs"><span>Your Immediate Bonus</span><strong>₹1,500 (10%)</strong></div>
                      </div>
                      <div className="text-[10px] text-on-surface-variant leading-relaxed">
                        Process daily transactions via official standee terminal to accumulate sequential streak nodes dynamically.
                      </div>
                    </div>
                  ) : selectedPreviewAsset.id === 'NX-REV-2024-03' ? (
                    <div className="p-6 bg-surface-container rounded-xl text-center space-y-3 max-w-sm mx-auto shadow border border-outline-variant/10">
                      <div className="font-headline-sm text-on-surface font-black text-sm">Commission Release Lifecycle</div>
                      <div className="space-y-2 text-left">
                        <div className="p-2.5 bg-white rounded-lg flex justify-between text-xs font-semibold"><span>Month 1-6 Yield</span><span className="text-primary font-bold">10% Trail</span></div>
                        <div className="p-2.5 bg-white rounded-lg flex justify-between text-xs font-semibold"><span>Month 7-12 Yield</span><span className="text-secondary font-bold">5% Trail</span></div>
                        <div className="p-2.5 bg-white rounded-lg flex justify-between text-xs font-semibold"><span>Month 13+ Perpetuity</span><span className="text-tertiary font-bold">2% Trail</span></div>
                      </div>
                    </div>
                  ) : selectedPreviewAsset.id === 'NX-INV-2024-09' ? (
                    <div className="p-6 bg-white rounded-xl text-center space-y-4 max-w-sm mx-auto border border-outline-variant/20 shadow-md">
                      <div className="text-primary font-bold uppercase text-[11px] tracking-widest">Nexora Salon QR Standee</div>
                      <div className="w-20 h-20 bg-surface-container mx-auto rounded-lg flex items-center justify-center p-2 shadow-inner">
                        <span className="material-symbols-outlined text-[64px] text-on-surface">qr_code_2</span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-on-surface">0% UPI Fees • Zero Machine Rental Charges</p>
                        <p className="text-[10px] text-on-surface-variant">Instant Audio Box Broadcast alerts verified safely.</p>
                      </div>
                    </div>
                  ) : selectedPreviewAsset.id === 'NX-FRD-2024-05' ? (
                    <div className="p-6 bg-error/10 text-error rounded-xl max-w-sm mx-auto space-y-3 border border-error/25 text-center">
                      <span className="material-symbols-outlined text-[48px]">gpp_maybe</span>
                      <h4 className="font-bold text-sm">Anti-Fraud Safeguards Notice</h4>
                      <p className="text-[11px] leading-relaxed">
                        Self-scanning using partner-related payment instruments or recycling payments is permanently banned. System registers automated telemetry triggers instantly.
                      </p>
                    </div>
                  ) : (
                    <div className="p-8 bg-surface-container text-center space-y-2 max-w-sm mx-auto rounded-xl border border-outline-variant/10 shadow-sm">
                      <span className="material-symbols-outlined text-[48px] text-primary">verified</span>
                      <p className="font-label-md text-on-surface font-bold">Compliance Verified Partner Playbook</p>
                      <p className="text-[11px] text-on-surface-variant">14 comprehensive chapters optimized for walk-in negotiation pitches.</p>
                    </div>
                  )}
                </div>

                {/* Caption with quick-edit / copy */}
                <div className="space-y-space-xs mt-space-sm">
                  <label className="font-label-sm text-on-surface-variant text-[11px] font-bold" htmlFor="modalCaptionText">Approved Caption &amp; Disclosure</label>
                  <div className="relative">
                    <textarea 
                      className="w-full p-3 rounded-xl bg-surface-container-low font-body-sm text-body-sm text-on-surface resize-none focus:outline-none border border-outline-variant/15 select-all leading-relaxed font-mono" 
                      id="modalCaptionText" 
                      readOnly 
                      rows={3} 
                      value={autoAttachToggle ? selectedPreviewAsset.caption : selectedPreviewAsset.caption.replace(trackingUrl, '').trim()}
                    />
                    <button 
                      className="absolute right-2.5 bottom-2.5 px-3 py-1.5 rounded-lg bg-surface-container-highest hover:bg-surface-container font-label-sm text-on-surface flex items-center gap-1 shadow-sm border border-outline-variant/10 cursor-pointer font-bold text-[10px]" 
                      onClick={() => copyCaption(selectedPreviewAsset.id)}
                    >
                      <span className="material-symbols-outlined text-[14px]">content_copy</span> Copy
                    </button>
                  </div>
                </div>

                {/* Modal Bottom Actions & Format selector */}
                <div className="pt-space-md mt-auto flex flex-wrap items-center justify-between gap-space-sm border-t border-outline-variant/15">
                  <div className="flex items-center gap-2">
                    <label className="font-label-sm text-on-surface-variant text-[11px] font-bold" htmlFor="modalFormatSelect">Format:</label>
                    <select 
                      className="h-10 px-3 rounded-xl bg-surface-container-low font-label-sm text-on-surface focus:outline-none border border-outline-variant/20 font-bold text-[11px]" 
                      id="modalFormatSelect"
                      value={selectedFormatOption}
                      onChange={(e) => setSelectedFormatOption(e.target.value as 'png' | 'pdf' | 'webp')}
                    >
                      <option value="png">PNG (HQ 2160x2700)</option>
                      <option value="pdf">PDF (Printable Vector)</option>
                      <option value="webp">WebP (Optimized)</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      className="h-11 px-5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md flex items-center gap-1.5 cursor-pointer font-bold"
                      onClick={() => {
                        triggerDownload(selectedPreviewAsset.downloadFileName);
                        setPreviewAssetId(null);
                      }}
                    >
                      <span className="material-symbols-outlined text-[18px]">download</span> Download
                    </button>
                    <button 
                      className="h-11 px-6 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-label-md flex items-center gap-1.5 shadow-md cursor-pointer font-bold"
                      onClick={() => {
                        shareWhatsApp(selectedPreviewAsset.id);
                        setPreviewAssetId(null);
                      }}
                    >
                      <span className="material-symbols-outlined text-[18px]">share</span> WhatsApp Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
