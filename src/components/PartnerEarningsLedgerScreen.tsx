import React, { useState, useMemo } from 'react';
import { NotificationBell } from './NotificationBell';
import { InteractiveCommissionSplitSimulator } from './InteractiveCommissionSplitSimulator';

interface PartnerEarningsLedgerScreenProps {
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
}

interface LedgerTransaction {
  id: string;
  date: string;
  salonName: string;
  location: string;
  salonCode: string;
  streamName: string;
  streamDetail: string;
  streamBadgeClass: string;
  baseGmv: string;
  sharePercent: string;
  netPayout: string;
  status: 'paid' | 'pending' | 'disputed';
  statusLabel: string;
  statusBadgeClass: string;
  traceDetail: string;
  isNegative?: boolean;
}

const LEDGER_TRANSACTIONS: LedgerTransaction[] = [
  {
    id: 'TXN-88219-094',
    date: 'Nov 12, 2024 • 14:32 IST',
    salonName: 'Glow & Grace Unisex Salon',
    location: 'Bandra West, Mumbai',
    salonCode: 'NEX-BL-102',
    streamName: 'Recurring Share M1-6',
    streamDetail: 'SaaS Core Subscription + Booking Fee',
    streamBadgeClass: 'bg-[#ffd9e2]/60 text-[#8e004a]',
    baseGmv: '₹1,45,000.00',
    sharePercent: '10.0%',
    netPayout: '+₹14,500.00',
    status: 'paid',
    statusLabel: 'Paid',
    statusBadgeClass: 'bg-[#ffd8e5] text-[#3c0223]',
    traceDetail: 'UTR: HDFC882910398'
  },
  {
    id: 'TXN-88219-091',
    date: 'Nov 10, 2024 • 11:15 IST',
    salonName: 'Elegance Studio & Spa',
    location: 'Indiranagar, Bangalore',
    salonCode: 'NEX-BL-108',
    streamName: '15-Day Activation Reward',
    streamDetail: 'Onboard verification completed early',
    streamBadgeClass: 'bg-[#fda4c9]/40 text-[#7a3656]',
    baseGmv: '₹3,000 Flat Bounty',
    sharePercent: '100%',
    netPayout: '+₹3,000.00',
    status: 'paid',
    statusLabel: 'Paid',
    statusBadgeClass: 'bg-[#ffd8e5] text-[#3c0223]',
    traceDetail: 'UTR: HDFC771092841'
  },
  {
    id: 'TXN-88219-099',
    date: 'Nov 15, 2024 • 18:40 IST',
    salonName: 'Crown & Blade Club',
    location: 'Koramangala, Bangalore',
    salonCode: 'NEX-BL-114',
    streamName: '30-Day Escrow Milestone',
    streamDetail: 'Awaiting GMV threshold cross (₹12k / ₹25k)',
    streamBadgeClass: 'bg-[#cca730]/20 text-[#4f3d00]',
    baseGmv: '₹5,000 Bounty',
    sharePercent: '100%',
    netPayout: '₹5,000.00',
    status: 'pending',
    statusLabel: 'Pending (Day 19/30)',
    statusBadgeClass: 'bg-[#ffe088] text-[#241a00]',
    traceDetail: 'Releases Nov 26'
  },
  {
    id: 'TXN-88219-088',
    date: 'Nov 04, 2024 • 09:00 IST',
    salonName: 'Nexora Growth Engine',
    location: 'Platform Milestone Reward',
    salonCode: 'NEX-SYS-001',
    streamName: 'Milestone Tier 2 Cash Reward',
    streamDetail: 'Hit 20 Active Salons Onboarded',
    streamBadgeClass: 'bg-[#ffe088] text-[#241a00]',
    baseGmv: '₹25,000.00',
    sharePercent: 'Bonus',
    netPayout: '+₹25,000.00',
    status: 'paid',
    statusLabel: 'Paid',
    statusBadgeClass: 'bg-[#ffd8e5] text-[#3c0223]',
    traceDetail: 'UTR: HDFC665910221'
  },
  {
    id: 'TXN-88219-102',
    date: 'Nov 16, 2024 • 16:20 IST',
    salonName: 'Royal Looks Salon',
    location: 'Juhu, Mumbai',
    salonCode: 'NEX-BL-119',
    streamName: 'Recurring Share M7-12',
    streamDetail: 'Ongoing SaaS Commission Tier',
    streamBadgeClass: 'bg-[#ffd9e2]/60 text-[#8e004a]',
    baseGmv: '₹1,25,000.00',
    sharePercent: '5.0%',
    netPayout: '₹6,250.00',
    status: 'pending',
    statusLabel: 'Reconciling (Cycle End)',
    statusBadgeClass: 'bg-[#ffe088] text-[#241a00]',
    traceDetail: 'Monday Batch Ingestion'
  },
  {
    id: 'TXN-88219-074',
    date: 'Nov 02, 2024 • 19:10 IST',
    salonName: 'Velvet Touch Lounge',
    location: 'Powai, Mumbai',
    salonCode: 'NEX-BL-098',
    streamName: 'Early Cancellation Clawback',
    streamDetail: 'Merchant subscription dispute (Day 11)',
    streamBadgeClass: 'bg-[#ffdad6] text-[#93000a]',
    baseGmv: '-₹15,000 Base',
    sharePercent: '10.0%',
    netPayout: '-₹1,500.00',
    status: 'disputed',
    statusLabel: 'Reversed',
    statusBadgeClass: 'bg-[#ffdad6] text-[#ba1a1a]',
    traceDetail: 'Dispute Case #DSP-401',
    isNegative: true
  }
];

export const PartnerEarningsLedgerScreen: React.FC<PartnerEarningsLedgerScreenProps> = ({
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
  onNavigateToRewardsMilestones
}) => {
  const [activeLedgerTab, setActiveLedgerTab] = useState<'all' | 'paid' | 'pending' | 'disputed'>('all');
  const [cycleFilter, setCycleFilter] = useState<string>('current');
  const [isExportMenuOpen, setIsExportMenuOpen] = useState<boolean>(false);
  const [isSlaModalOpen, setIsSlaModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedTxnAudit, setSelectedTxnAudit] = useState<LedgerTransaction | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredLedger = useMemo(() => {
    if (activeLedgerTab === 'all') return LEDGER_TRANSACTIONS;
    return LEDGER_TRANSACTIONS.filter(t => t.status === activeLedgerTab);
  }, [activeLedgerTab]);

  return (
    <div className="bg-[#fcf9f4] font-sans text-[#1c1c19] min-h-screen flex selection:bg-[#fda4c9]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#31302d] text-white shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200 border border-white/10 max-w-md text-center">
          <span className="material-symbols-outlined text-[18px] text-[#ffe088]">check_circle</span>
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* LEFT SIDEBAR NAVIGATION */}
      <aside className="fixed left-0 top-8 sm:top-7 bottom-0 w-72 bg-[#f6f3ee]/90 backdrop-blur-xl z-40 hidden lg:flex flex-col justify-between shadow-[0_1px_8px_rgba(74,14,46,0.04)] border-r border-[#e5e2dd]">
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Brand header */}
          <div className="px-6 pt-6 pb-4 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#b1005e] flex items-center justify-center text-white shadow-[0_4px_16px_rgba(217,27,119,0.28)]">
                <span className="material-symbols-outlined text-[20px]">token</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-[#1c1c19] tracking-tight leading-none">Nexora</span>
                <span className="text-[11px] text-[#8e4767] tracking-wider uppercase font-bold mt-0.5">
                  Growth Partner
                </span>
              </div>
            </div>

            {/* Partner quick chip */}
            <div className="mt-2 p-3 rounded-2xl bg-white shadow-2xs flex items-center justify-between border border-[#e5e2dd]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#ffe088] flex items-center justify-center text-[#241a00] font-bold">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-[#1c1c19] leading-tight">Growth Partner [DEV SAMPLE]</span>
                  <span className="text-[10px] text-[#594047] font-mono leading-none mt-0.5">REF-5A45019655</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#cca730]/20 text-[#4f3d00] text-[10px] font-black uppercase tracking-wide border border-[#cca730]/40">
                Gold
              </span>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="flex-1 px-4 py-2 flex flex-col gap-1 text-xs">
            <span className="px-3 text-[10px] font-black text-[#8d6f77] uppercase tracking-wider mb-1">
              Performance
            </span>
            <button
              onClick={() => onNavigateToDashboard && onNavigateToDashboard()}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors font-bold text-left cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">grid_view</span>
              <span>Overview</span>
            </button>
            <button
              onClick={() => onNavigateToShareEarn && onNavigateToShareEarn()}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors font-bold text-left cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">qr_code_2</span>
              <span>My Referral Code</span>
            </button>
            <button
              onClick={() => onNavigateToSalonIntelligence && onNavigateToSalonIntelligence()}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors font-bold text-left cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">storefront</span>
              <span>Referred Salons</span>
            </button>
            <button
              onClick={() => onNavigateToReferralTimeline && onNavigateToReferralTimeline()}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors font-bold text-left cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">pending_actions</span>
              <span>Referral Status Timeline</span>
            </button>

            <span className="px-3 text-[10px] font-black text-[#8d6f77] uppercase tracking-wider mt-4 mb-1">
              Finance &amp; Rewards
            </span>
            <button
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#d91b77] text-white font-black text-left shadow-[0_4px_16px_rgba(217,27,119,0.2)] cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
              <span>Earnings &amp; Ledger</span>
            </button>
            <button
              onClick={() => {
                if (onNavigateToExtraOnboardingReward) {
                  onNavigateToExtraOnboardingReward();
                } else if (onNavigateToHub) {
                  onNavigateToHub();
                }
              }}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors font-bold text-left cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
              <span>Extra Onboarding Reward</span>
            </button>
            <button
              onClick={() => {
                if (onNavigateToRewardsMilestones) {
                  onNavigateToRewardsMilestones();
                } else if (onNavigateToLeaderboard) {
                  onNavigateToLeaderboard();
                }
              }}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors font-bold text-left cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">military_tech</span>
              <span>Rewards &amp; Milestones</span>
            </button>

            <span className="px-3 text-[10px] font-black text-[#8d6f77] uppercase tracking-wider mt-4 mb-1">
              System
            </span>
            <button
              onClick={() => onNavigateToProfileSettings && onNavigateToProfileSettings()}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors font-bold text-left cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">tune</span>
              <span>Profile &amp; Settings</span>
            </button>
          </nav>
        </div>

        {/* Partner Tier card */}
        <div className="p-4 m-4 rounded-2xl bg-white shadow-[0_8px_32px_0_rgba(74,14,46,0.04)] flex items-center justify-between border border-[#e5e2dd]">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#8e4767] uppercase tracking-wider">Partner Tier</span>
            <span className="text-xs font-black text-[#1c1c19]">Gold Accelerator</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#ffd8e5] flex items-center justify-center text-[#3c0223] font-bold">
            <span className="material-symbols-outlined text-[18px]">stars</span>
          </div>
        </div>
      </aside>

      {/* MAIN BODY CONTENT AREA */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="fixed top-8 sm:top-7 left-0 lg:left-72 right-0 h-16 bg-[#fcf9f4]/85 backdrop-blur-xl z-40 flex items-center justify-between px-4 sm:px-6 shadow-[0_1px_8px_rgba(74,14,46,0.04)] border-b border-[#e5e2dd]">
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 rounded-full bg-[#ffd9e2]/60 text-[#8e004a] text-xs font-bold flex items-center gap-2 border border-[#fda4c9]/50">
              <span className="w-2 h-2 rounded-full bg-[#b1005e] animate-pulse" />
              <span>Live Production Sync</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateToShareEarn && onNavigateToShareEarn()}
              className="h-9 px-4 rounded-full bg-[#d91b77] text-white text-xs font-black flex items-center gap-1.5 shadow-[0_4px_16px_rgba(217,27,119,0.28)] hover:bg-[#b1005e] transition-all cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">share</span>
              <span>Quick Invite</span>
            </button>

            <NotificationBell onNavigateToReferrals={onNavigateToReferralTimeline} />

            <button
              onClick={() => onNavigateToProfileSettings && onNavigateToProfileSettings()}
              className="w-8 h-8 rounded-full bg-[#b1005e] text-white flex items-center justify-center shadow-xs cursor-pointer"
              title="Partner Profile"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>
          </div>
        </header>

        {/* Main Workspace */}
        <main className="w-full pt-28 pb-24 bg-[#fcf9f4] px-4 sm:px-6 max-w-7xl mx-auto flex-grow">
          <div className="flex flex-col w-full space-y-6">
            {/* Payout Announcement Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-white/90 backdrop-blur-xl p-5 sm:p-6 shadow-[0_8px_32px_0_rgba(74,14,46,0.05)] border border-[#e5e2dd] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-2xl bg-[#ffd9e2] text-[#b1005e] flex items-center justify-center shrink-0 shadow-xs border border-[#fda4c9]/50">
                  <span className="material-symbols-outlined text-[26px]">account_balance</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-base font-black text-[#1c1c19]">Next Disbursal Scheduled</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#ffe088] text-[#241a00] text-[11px] font-black uppercase tracking-wider flex items-center gap-1 border border-[#cca730]/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#735c00] animate-ping" />
                      Reconciled &amp; Locked
                    </span>
                  </div>
                  <p className="text-xs text-[#594047] truncate mt-0.5">
                    Upcoming Monday, 10:00 AM IST via Direct NEFT Batch <strong className="text-[#1c1c19] font-mono">#NEFT-NX-88219</strong> to verified <span className="font-bold text-[#1c1c19]">HDFC Bank (••••4829)</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end md:self-auto shrink-0">
                <div className="text-right">
                  <span className="text-[10px] text-[#8e4767] tracking-wider uppercase font-bold block">
                    Scheduled Amount
                  </span>
                  <span className="text-2xl font-black text-[#b1005e] tracking-tight">₹42,500.00</span>
                </div>
                <button
                  onClick={() => showToast('Opening Pre-settlement Batch #NEFT-NX-88219 breakdown...')}
                  className="h-10 px-4 rounded-full bg-[#d91b77] text-white text-xs font-black flex items-center gap-1.5 shadow-[0_4px_16px_rgba(217,27,119,0.25)] hover:bg-[#b1005e] transition-all cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                  <span>View Batch</span>
                </button>
              </div>
            </div>

            {/* Page Header Area */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] text-[#8e4767] uppercase tracking-widest font-black">
                    Partner Treasury
                  </span>
                  <span className="text-[#8d6f77]">•</span>
                  <span className="text-xs text-[#594047] font-semibold">Tier: Gold Accelerator</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#1c1c19] tracking-tight leading-tight">
                  Earnings &amp; Commission Ledger
                </h1>
                <p className="text-xs sm:text-sm text-[#594047] mt-1 leading-relaxed">
                  Real-time financial audits, escrow settlements, recurring SaaS shares, and milestone bonuses.
                </p>
              </div>

              {/* Cycle Filter & Export Actions */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center bg-white rounded-2xl p-1 shadow-2xs border border-[#e5e2dd]">
                  <span className="material-symbols-outlined text-[#8e4767] ml-3 text-[18px]">calendar_today</span>
                  <select
                    className="bg-transparent text-xs font-bold text-[#1c1c19] py-2 px-3 outline-none cursor-pointer"
                    value={cycleFilter}
                    onChange={(e) => {
                      setCycleFilter(e.target.value);
                      showToast(`Ledger updated to: ${e.target.value}`);
                    }}
                  >
                    <option value="current">Current Cycle: Oct 18 - Nov 17, 2024</option>
                    <option value="q1">Q1 FY25 (Apr 01 - Jun 30)</option>
                    <option value="q2">Q2 FY25 (Jul 01 - Sep 30)</option>
                    <option value="all">All-time Consolidated</option>
                  </select>
                </div>

                <div className="relative inline-block text-left">
                  <button
                    className="h-10 px-4 rounded-2xl bg-white text-[#1c1c19] text-xs font-black flex items-center gap-1.5 shadow-2xs hover:bg-[#f6f3ee] transition-colors border border-[#e5e2dd] cursor-pointer"
                    onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#8e4767]">file_download</span>
                    <span>Export Ledger</span>
                    <span className="material-symbols-outlined text-[16px] text-[#8d6f77]">expand_more</span>
                  </button>
                  {isExportMenuOpen && (
                    <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white shadow-xl z-30 py-1.5 border border-[#e5e2dd] animate-in fade-in duration-150">
                      <button
                        onClick={() => {
                          setIsExportMenuOpen(false);
                          showToast('Downloading Raw CSV statement...');
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-[#1c1c19] hover:bg-[#f6f3ee] transition-colors text-left cursor-pointer"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px] text-[#b1005e]">csv</span>
                        <span>Download CSV (Raw)</span>
                      </button>
                      <button
                        onClick={() => {
                          setIsExportMenuOpen(false);
                          showToast('Generating Audited PDF Invoice...');
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-[#1c1c19] hover:bg-[#f6f3ee] transition-colors text-left cursor-pointer"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px] text-[#8e4767]">picture_as_pdf</span>
                        <span>Audited PDF Invoice</span>
                      </button>
                      <button
                        onClick={() => {
                          setIsExportMenuOpen(false);
                          showToast('Exporting CA Signed Tax Ledger (194H)...');
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-[#1c1c19] hover:bg-[#f6f3ee] transition-colors text-left cursor-pointer"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px] text-[#735c00]">fact_check</span>
                        <span>CA Signed Tax Ledger</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Key Metric Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {/* Stat 1: Total Earned */}
              <div className="rounded-3xl bg-white/90 backdrop-blur-xl p-5 shadow-[0_8px_32px_0_rgba(74,14,46,0.04)] border border-[#e5e2dd] flex flex-col justify-between hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[11px] text-[#8e4767] uppercase tracking-wider font-extrabold">
                    Total Earned to Date
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#ffd9e2] text-[#b1005e] flex items-center justify-center shadow-2xs">
                    <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                  </div>
                </div>
                <div>
                  <span className="text-3xl font-black text-[#1c1c19] tracking-tight">₹1,84,500</span>
                  <div className="flex items-center gap-1.5 mt-1 text-xs">
                    <span className="material-symbols-outlined text-[16px] text-[#735c00] font-bold">trending_up</span>
                    <span className="text-xs text-[#735c00] font-black">+28.4%</span>
                    <span className="text-xs text-[#594047]">vs previous 30 days</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-[#e5e2dd] flex items-center justify-between text-xs text-[#594047]">
                  <span>24 Credit Settlements</span>
                  <span className="text-[#b1005e] font-black">100% Audited</span>
                </div>
              </div>

              {/* Stat 2: Available Payout */}
              <div className="rounded-3xl bg-white/90 backdrop-blur-xl p-5 shadow-[0_8px_32px_0_rgba(74,14,46,0.04)] border border-[#e5e2dd] flex flex-col justify-between hover:shadow-md transition-all relative overflow-hidden">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[11px] text-[#8e4767] uppercase tracking-wider font-extrabold">
                    Available / Upcoming Payout
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#ffd8e5] text-[#3c0223] flex items-center justify-center shadow-2xs">
                    <span className="material-symbols-outlined text-[18px]">payments</span>
                  </div>
                </div>
                <div>
                  <span className="text-3xl font-black text-[#b1005e] tracking-tight">₹42,500</span>
                  <div className="flex items-center gap-1.5 mt-1 text-xs">
                    <span className="w-2 h-2 rounded-full bg-[#b1005e]" />
                    <span className="text-xs font-bold text-[#1c1c19]">Reconciled for Monday</span>
                    <span className="text-xs text-[#8d6f77]">| No hold</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-[#e5e2dd] flex items-center justify-between text-xs">
                  <span className="text-[#594047]">Direct Deposit</span>
                  <span className="text-[#8e004a] font-bold">Auto-Trigger Enabled</span>
                </div>
              </div>

              {/* Stat 3: Pending Clearance */}
              <div className="rounded-3xl bg-white/90 backdrop-blur-xl p-5 shadow-[0_8px_32px_0_rgba(74,14,46,0.04)] border border-[#e5e2dd] flex flex-col justify-between hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[11px] text-[#8e4767] uppercase tracking-wider font-extrabold">
                    Pending Clearance
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#ffe088] text-[#241a00] flex items-center justify-center shadow-2xs">
                    <span className="material-symbols-outlined text-[18px]">schedule</span>
                  </div>
                </div>
                <div>
                  <span className="text-3xl font-black text-[#1c1c19] tracking-tight">₹11,250</span>
                  <div className="flex items-center gap-1.5 mt-1 text-xs">
                    <span className="text-xs text-[#594047]">In escrow verification</span>
                    <span className="px-2 py-0.5 rounded bg-[#f6f3ee] text-[#1c1c19] font-bold text-[10px] border border-[#e5e2dd]">
                      4 Salons
                    </span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-[#e5e2dd] flex items-center justify-between text-xs text-[#594047]">
                  <span>Matures in 4-11 days</span>
                  <span className="text-[#735c00] font-bold">Avg 98% pass</span>
                </div>
              </div>

              {/* Stat 4: Reversed / Deducted */}
              <div className="rounded-3xl bg-white/90 backdrop-blur-xl p-5 shadow-[0_8px_32px_0_rgba(74,14,46,0.04)] border border-[#e5e2dd] flex flex-col justify-between hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[11px] text-[#8e4767] uppercase tracking-wider font-extrabold">
                    Clawback / Deducted
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#ffdad6] text-[#93000a] flex items-center justify-center shadow-2xs">
                    <span className="material-symbols-outlined text-[18px]">rule</span>
                  </div>
                </div>
                <div>
                  <span className="text-3xl font-black text-[#1c1c19] tracking-tight">₹1,500</span>
                  <div className="flex items-center gap-1.5 mt-1 text-xs">
                    <span className="material-symbols-outlined text-[16px] text-[#ba1a1a]">info</span>
                    <span className="text-xs text-[#ba1a1a] font-bold">1 SLA Refund Hold</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-[#e5e2dd] flex items-center justify-between text-xs">
                  <span className="text-[#594047]">Transparency Log</span>
                  <button
                    className="text-[#b1005e] hover:underline font-bold cursor-pointer"
                    onClick={() => setIsSlaModalOpen(true)}
                    type="button"
                  >
                    View Audit
                  </button>
                </div>
              </div>
            </div>

            {/* Middle Section: Visual Split & Partner Banking */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Earnings Source Breakdown (7 Cols) */}
              <div className="lg:col-span-7 rounded-3xl bg-white/90 backdrop-blur-xl p-6 sm:p-7 shadow-[0_8px_32px_0_rgba(74,14,46,0.04)] border border-[#e5e2dd] flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-[10px] text-[#8e4767] uppercase tracking-wider font-black block">
                        Revenue Attribution Matrix
                      </span>
                      <h2 className="text-lg font-black text-[#1c1c19] mt-0.5">Earnings Streams Breakdown</h2>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#f6f3ee] text-[#594047] text-xs font-bold border border-[#e5e2dd]">
                      All Time Total: ₹1,84,500
                    </span>
                  </div>

                  {/* Segmented Bar Visual */}
                  <div className="w-full mb-4">
                    <div className="w-full h-3.5 rounded-full bg-[#f6f3ee] flex overflow-hidden p-0.5 gap-0.5 border border-[#e5e2dd]">
                      <div className="h-full rounded-full bg-[#b1005e] transition-all" style={{ width: '44%' }} title="Recurring Growth Share (44%)" />
                      <div className="h-full rounded-full bg-[#fda4c9]" style={{ width: '42%' }} title="Activation Accelerators (42%)" />
                      <div className="h-full rounded-full bg-[#cca730]" style={{ width: '14%' }} title="Milestone Tier Bonuses (14%)" />
                    </div>
                    <div className="flex items-center justify-between mt-1.5 text-[11px] text-[#594047] font-semibold">
                      <span>Recurring 44%</span>
                      <span>Activation 42%</span>
                      <span>Milestone 14%</span>
                    </div>
                  </div>

                  {/* Three Source Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div className="p-4 rounded-2xl bg-[#f6f3ee] flex flex-col justify-between border border-[#e5e2dd]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#b1005e] shrink-0" />
                        <span className="text-xs font-bold text-[#1c1c19] truncate">Monthly SaaS Share</span>
                      </div>
                      <div>
                        <div className="text-xl font-black text-[#1c1c19]">₹81,500</div>
                        <div className="text-[11px] text-[#594047] mt-0.5">44% of cumulative</div>
                      </div>
                      <div className="mt-3 text-[10px] text-[#b1005e] font-bold">10% GMV/SaaS baseline</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#f6f3ee] flex flex-col justify-between border border-[#e5e2dd]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#fda4c9] shrink-0" />
                        <span className="text-xs font-bold text-[#1c1c19] truncate">Activation Bonuses</span>
                      </div>
                      <div>
                        <div className="text-xl font-black text-[#1c1c19]">₹78,000</div>
                        <div className="text-[11px] text-[#594047] mt-0.5">42% of cumulative</div>
                      </div>
                      <div className="mt-3 text-[10px] text-[#8e4767] font-bold">₹3,000 per verified salon</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#f6f3ee] flex flex-col justify-between border border-[#e5e2dd]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#cca730] shrink-0" />
                        <span className="text-xs font-bold text-[#1c1c19] truncate">Milestone Boost</span>
                      </div>
                      <div>
                        <div className="text-xl font-black text-[#1c1c19]">₹25,000</div>
                        <div className="text-[11px] text-[#594047] mt-0.5">14% of cumulative</div>
                      </div>
                      <div className="mt-3 text-[10px] text-[#735c00] font-bold">Gold Tier Cashout</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Settlement Banking Info Card (5 Cols) */}
              <div className="lg:col-span-5 rounded-3xl bg-white/90 backdrop-blur-xl p-6 sm:p-7 shadow-[0_8px_32px_0_rgba(74,14,46,0.04)] border border-[#e5e2dd] flex flex-col justify-between gap-4">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#8e4767] uppercase tracking-wider font-black">
                      Disbursal Setup
                    </span>
                    <h2 className="text-lg font-black text-[#1c1c19]">Auto-NACH Bank Account</h2>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#ffe088] text-[#241a00] text-xs font-bold flex items-center gap-1 border border-[#cca730]/40">
                    <span className="material-symbols-outlined text-[14px]">verified_user</span>
                    DigiLocker Verified
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#f6f3ee] to-[#ebe8e3] border border-[#e5e2dd]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white text-[#b1005e] font-black flex items-center justify-center shadow-2xs text-sm border border-[#e5e2dd]">
                        HDFC
                      </div>
                      <div>
                        <div className="text-xs font-black text-[#1c1c19]">HDFC Bank Limited</div>
                        <div className="text-[11px] text-[#594047]">Savings A/C ••••••••••••4829</div>
                      </div>
                    </div>
                    <span className="w-7 h-7 rounded-full bg-[#ffd9e2] text-[#b1005e] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[#8d6f77] uppercase text-[10px] font-bold block">IFSC Code</span>
                      <span className="font-bold text-[#1c1c19] tracking-wider font-mono">HDFC0000128</span>
                    </div>
                    <div>
                      <span className="text-[#8d6f77] uppercase text-[10px] font-bold block">Branch</span>
                      <span className="font-bold text-[#1c1c19] truncate block">Bandra Kurla Complex</span>
                    </div>
                    <div>
                      <span className="text-[#8d6f77] uppercase text-[10px] font-bold block">Schedule</span>
                      <span className="font-bold text-[#1c1c19]">Every Mon 10:00 AM</span>
                    </div>
                    <div>
                      <span className="text-[#8d6f77] uppercase text-[10px] font-bold block">Threshold</span>
                      <span className="font-bold text-[#b1005e]">₹5,000 (Met ₹42,500)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    className="text-xs text-[#b1005e] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                    onClick={() => {
                      if (onNavigateToProfileSettings) onNavigateToProfileSettings();
                    }}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">tune</span>
                    <span>Adjust Disbursal Threshold</span>
                  </button>
                  <button
                    className="h-8 px-3 rounded-lg bg-[#ebe8e3] text-[#1c1c19] text-xs font-bold hover:bg-[#e5e2dd] transition-colors cursor-pointer"
                    onClick={() => {
                      if (onNavigateToProfileSettings) onNavigateToProfileSettings();
                    }}
                    type="button"
                  >
                    Manage Accounts
                  </button>
                </div>
              </div>
            </div>

            {/* INTERACTIVE COMMISSION SPLIT SIMULATOR */}
            <InteractiveCommissionSplitSimulator
              initialSalons={12}
              initialAvgRevenue={350000}
              onNavigateToRewards={onNavigateToRewardsMilestones || onNavigateToLeaderboard}
            />

            {/* Financial Ledger Table Section */}
            <div className="rounded-3xl bg-white/90 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(74,14,46,0.04)] border border-[#e5e2dd] overflow-hidden">
              {/* Table Toolbar & Interactive Filter Tabs */}
              <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e5e2dd]">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-black text-[#1c1c19]">Itemized Financial Ledger</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#ffd9e2] text-[#8e004a] text-xs font-bold">
                      {filteredLedger.length} Total Events
                    </span>
                  </div>
                  <p className="text-xs text-[#594047] mt-0.5">
                    Immutable transactional audit trace with merchant volume breakdown and banking UTR references.
                  </p>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                  {[
                    { id: 'all', label: 'All Transactions (24)' },
                    { id: 'paid', label: 'Paid (18)' },
                    { id: 'pending', label: 'Pending Clearance (4)' },
                    { id: 'disputed', label: 'Reversed / Disputed (2)' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveLedgerTab(tab.id as any)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                        activeLedgerTab === tab.id
                          ? 'bg-[#b1005e] text-white shadow-xs'
                          : 'bg-[#f6f3ee] text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] border border-[#e5e2dd]'
                      }`}
                      type="button"
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Responsive Table */}
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#f6f3ee] text-[#594047] font-bold text-[11px] tracking-wider uppercase border-b border-[#e5e2dd]">
                      <th className="py-3.5 px-6">Transaction ID &amp; Date</th>
                      <th className="py-3.5 px-4">Salon / Merchant Entity</th>
                      <th className="py-3.5 px-4">Revenue Stream</th>
                      <th className="py-3.5 px-4 text-right">Base GMV / Fee</th>
                      <th className="py-3.5 px-4 text-center">Share %</th>
                      <th className="py-3.5 px-4 text-right">Net Payout</th>
                      <th className="py-3.5 px-4 text-center">Status &amp; Trace</th>
                      <th className="py-3.5 px-6 text-right">Audit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e5e2dd] text-xs text-[#1c1c19]">
                    {filteredLedger.map(txn => (
                      <tr key={txn.id} className="hover:bg-[#f6f3ee]/60 transition-colors">
                        <td className="py-4 px-6 whitespace-nowrap">
                          <div className="font-bold text-[#1c1c19] font-mono">{txn.id}</div>
                          <div className="text-[11px] text-[#594047]">{txn.date}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-bold text-[#1c1c19]">{txn.salonName}</div>
                          <div className="text-[11px] text-[#594047] flex items-center gap-1">
                            <span className="material-symbols-outlined text-[13px] text-[#8e4767]">location_on</span>
                            <span>{txn.location} • {txn.salonCode}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] inline-block ${txn.streamBadgeClass}`}>
                            {txn.streamName}
                          </span>
                          <div className="text-[10px] text-[#594047] mt-0.5">{txn.streamDetail}</div>
                        </td>
                        <td className="py-4 px-4 text-right whitespace-nowrap font-semibold">
                          {txn.baseGmv}
                        </td>
                        <td className="py-4 px-4 text-center whitespace-nowrap">
                          <span className="font-black text-[#b1005e]">{txn.sharePercent}</span>
                        </td>
                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <span
                            className={`text-sm font-black ${
                              txn.isNegative
                                ? 'text-[#ba1a1a]'
                                : txn.status === 'pending'
                                ? 'text-[#735c00]'
                                : 'text-[#1c1c19]'
                            }`}
                          >
                            {txn.netPayout}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center whitespace-nowrap">
                          <span
                            className={`px-2.5 py-1 rounded-full font-bold text-[11px] inline-flex items-center gap-1 ${txn.statusBadgeClass}`}
                          >
                            <span className="material-symbols-outlined text-[14px]">
                              {txn.status === 'paid'
                                ? 'verified'
                                : txn.status === 'pending'
                                ? 'timelapse'
                                : 'cancel'}
                            </span>
                            {txn.statusLabel}
                          </span>
                          <div className="text-[10px] text-[#8d6f77] font-mono mt-0.5">{txn.traceDetail}</div>
                        </td>
                        <td className="py-4 px-6 text-right whitespace-nowrap">
                          <button
                            onClick={() => {
                              if (txn.status === 'disputed') {
                                setIsSlaModalOpen(true);
                              } else {
                                setSelectedTxnAudit(txn);
                              }
                            }}
                            className="w-8 h-8 rounded-lg bg-[#f6f3ee] hover:bg-[#ebe8e3] text-[#594047] hover:text-[#1c1c19] inline-flex items-center justify-center transition-colors cursor-pointer border border-[#e5e2dd]"
                            title="View Audit Breakdown"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              {txn.status === 'disputed' ? 'policy' : 'receipt'}
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination & Summary Footer */}
              <div className="p-4 bg-[#f6f3ee]/40 border-t border-[#e5e2dd] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#594047]">
                <div className="flex items-center gap-2">
                  <span>Showing <strong className="text-[#1c1c19] font-black">{filteredLedger.length} of 24</strong> audited ledger events</span>
                  <span className="text-[#8d6f77]">•</span>
                  <span className="text-[#8e4767] font-semibold">Digitally signed via SHA-256</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#1c1c19] disabled:opacity-40 border border-[#e5e2dd] cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                  </button>
                  {[1, 2, 3, 4].map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        currentPage === page
                          ? 'bg-[#d91b77] text-white'
                          : 'bg-white text-[#1c1c19] hover:bg-[#f6f3ee] border border-[#e5e2dd]'
                      }`}
                      type="button"
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    disabled={currentPage === 4}
                    onClick={() => setCurrentPage(p => Math.min(4, p + 1))}
                    className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#1c1c19] disabled:opacity-40 border border-[#e5e2dd] cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* SLA / CLAWBACK TRANSPARENCY MODAL */}
      {isSlaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#31302d]/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-[#e5e2dd] flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ffdad6] text-[#93000a] flex items-center justify-center border border-[#ba1a1a]/20">
                  <span className="material-symbols-outlined text-[20px]">policy</span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#1c1c19]">Clawback Transparency Note</h3>
                  <span className="text-xs text-[#594047]">Reference: DSP-401 • Velvet Touch Lounge</span>
                </div>
              </div>
              <button
                className="text-[#594047] hover:text-[#1c1c19] cursor-pointer"
                onClick={() => setIsSlaModalOpen(false)}
                type="button"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#594047]">
              <div className="p-3.5 rounded-2xl bg-[#ffdad6]/40 text-[#93000a] flex items-start gap-2 font-bold border border-[#ba1a1a]/30">
                <span className="material-symbols-outlined text-[18px] text-[#ba1a1a] shrink-0 mt-0.5">error</span>
                <span>Deduction: ₹1,500.00 will be adjusted in the upcoming Monday payout cycle.</span>
              </div>
              <p className="leading-relaxed">
                <strong>Reason:</strong> Velvet Touch Lounge initiated a merchant cancellation on Day 11 due to operational reorganization. Under the <em className="text-[#1c1c19] font-bold">Nexora Partner Fair-Use Policy Clause 4.2</em>, SaaS recurring commissions refunded to merchants within the initial 14-day evaluation window are clawed back automatically.
              </p>
              <div className="p-3.5 rounded-2xl bg-[#f6f3ee] text-[#1c1c19] space-y-1.5 border border-[#e5e2dd]">
                <div className="flex justify-between">
                  <span className="text-[#594047]">Refund Authorized By:</span>
                  <span className="font-bold">Nexora Merchant Operations (P. Sharma)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#594047]">Dispute Status:</span>
                  <span className="text-[#ba1a1a] font-bold">Closed - Merchant Refund Settled</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#594047]">Partner Impact:</span>
                  <span className="font-bold text-[#735c00]">Zero penalty to Gold Accelerator partner rating.</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#e5e2dd]">
              <button
                className="px-4 py-2 rounded-full bg-[#ebe8e3] text-[#1c1c19] text-xs font-bold hover:bg-[#e5e2dd] transition-colors cursor-pointer"
                onClick={() => setIsSlaModalOpen(false)}
                type="button"
              >
                Dismiss
              </button>
              <button
                onClick={() => {
                  setIsSlaModalOpen(false);
                  showToast('Appeal ticket #APP-884 submitted to partner compliance desk.');
                }}
                className="px-5 py-2 rounded-full bg-[#b1005e] hover:bg-[#d91b77] text-white text-xs font-bold transition-colors cursor-pointer"
                type="button"
              >
                Submit Partner Appeal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TRANSACTION AUDIT RECEIPT MODAL */}
      {selectedTxnAudit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#31302d]/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-[#e5e2dd] flex flex-col gap-4">
            <div className="flex items-start justify-between pb-2 border-b border-[#e5e2dd]">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#ffd9e2] text-[#b1005e] flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[20px]">receipt</span>
                </div>
                <div>
                  <h3 className="text-base font-black text-[#1c1c19]">{selectedTxnAudit.id}</h3>
                  <span className="text-xs text-[#594047]">{selectedTxnAudit.date}</span>
                </div>
              </div>
              <button
                className="text-[#594047] hover:text-[#1c1c19] cursor-pointer"
                onClick={() => setSelectedTxnAudit(null)}
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-[#e5e2dd]">
                <span className="text-[#594047]">Salon / Merchant</span>
                <span className="font-bold text-[#1c1c19]">{selectedTxnAudit.salonName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#e5e2dd]">
                <span className="text-[#594047]">Location</span>
                <span className="font-bold text-[#1c1c19]">{selectedTxnAudit.location}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#e5e2dd]">
                <span className="text-[#594047]">Stream Type</span>
                <span className="font-bold text-[#b1005e]">{selectedTxnAudit.streamName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#e5e2dd]">
                <span className="text-[#594047]">Base Transaction GMV</span>
                <span className="font-bold text-[#1c1c19]">{selectedTxnAudit.baseGmv}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#e5e2dd]">
                <span className="text-[#594047]">Commission Percentage</span>
                <span className="font-black text-[#b1005e]">{selectedTxnAudit.sharePercent}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#e5e2dd]">
                <span className="text-[#594047]">Status &amp; Settlement</span>
                <span className="font-bold text-[#735c00]">{selectedTxnAudit.statusLabel} ({selectedTxnAudit.traceDetail})</span>
              </div>
              <div className="flex justify-between py-2 bg-[#f6f3ee] px-3 rounded-xl">
                <span className="text-xs font-black text-[#1c1c19]">Net Partner Payout</span>
                <span className="text-sm font-black text-[#b1005e]">{selectedTxnAudit.netPayout}</span>
              </div>
            </div>

            <button
              onClick={() => {
                showToast(`Receipt for ${selectedTxnAudit.id} downloaded.`);
                setSelectedTxnAudit(null);
              }}
              className="w-full h-11 rounded-full bg-[#d91b77] hover:bg-[#b1005e] text-white text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Download Tax Invoice (PDF)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
