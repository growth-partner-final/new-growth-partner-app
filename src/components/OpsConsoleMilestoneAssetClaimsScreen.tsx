import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  ShieldCheck,
  Award,
  Truck,
  Lock,
  Search,
  Filter,
  Download,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Laptop,
  Smartphone,
  Bike,
  Car,
  Store,
  Users,
  Activity,
  Receipt,
  MapPin,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  X,
  FileText,
  Radio,
  FileCheck,
  RefreshCw,
  Building,
  Check,
  Phone,
  AlertCircle,
  Eye,
  Edit3,
  Flame,
  CheckCheck,
  ArrowRight,
  TrendingUp,
  CreditCard,
  Settings,
  HelpCircle,
  Cpu,
  BadgeCheck,
  Send,
  Zap,
  Sliders
} from 'lucide-react';

interface OpsConsoleMilestoneAssetClaimsScreenProps {
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

interface ClaimRecord {
  id: string;
  auditDate: string;
  slaRemaining: string;
  slaUrgent: boolean;
  partnerName: string;
  partnerId: string;
  hubZone: string;
  tier: string;
  tierNumber: number;
  salonsTarget: number;
  hardwareName: string;
  hardwareSupplier: string;
  assetValue: string;
  qualifiedCount: number;
  auditedCount: number;
  churnRate: string;
  avgGmv: string;
  consigneeName: string;
  panNumber: string;
  sec194RStatus: 'cleared' | 'in-review' | 'pending';
  carrier: string;
  trackingStatus: string;
  warehouseHub: string;
  auditState: 'approved' | 'in-review' | 'disqualified' | 'ready-dispatch';
  stateLabel: string;
  stateBadgeBg: string;
  stateBadgeText: string;
  rejectionReason?: string;
}

export const OpsConsoleMilestoneAssetClaimsScreen: React.FC<OpsConsoleMilestoneAssetClaimsScreenProps> = ({
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
  onNavigateToMobileRewards
}) => {
  // Sidebar navigation selection
  const [activeNavPath, setActiveNavPath] = useState<string>('milestone-asset-claims');

  // Filter tabs
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'consignee' | 'ready' | 'shipped' | 'rejected'>('all');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [selectedSla, setSelectedSla] = useState<string>('all');

  // Adjudication Modal State
  const [selectedClaim, setSelectedClaim] = useState<ClaimRecord | null>(null);
  const [isAdjudicationOpen, setIsAdjudicationOpen] = useState<boolean>(false);
  const [adjudicationAction, setAdjudicationAction] = useState<'approve' | 'hold' | 'reject'>('approve');
  const [reasonCode, setReasonCode] = useState<string>('telemetry-cleared');
  const [auditorNotes, setAuditorNotes] = useState<string>(
    'Telemetry audit completed. 100 salons maintained 100% soundbox ping rates. HP Enterprise direct order PO #HPE-88219 confirmed. Consignee identity verified via PAN database.'
  );

  // Success Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initial Claims Data
  const [claims, setClaims] = useState<ClaimRecord[]>([
    {
      id: '#CLM-2024-8839',
      auditDate: '24 Oct 2024 · 14:32 IST',
      slaRemaining: '06h 18m left',
      slaUrgent: false,
      partnerName: 'Marcus Vance',
      partnerId: 'NEX-88219',
      hubZone: 'Bangalore Urban Hub',
      tier: 'Tier 3 (100 Salons)',
      tierNumber: 3,
      salonsTarget: 100,
      hardwareName: 'HP ProBook 15 G10',
      hardwareSupplier: 'Direct OEM Consignment (HP India)',
      assetValue: '₹68,500',
      qualifiedCount: 100,
      auditedCount: 118,
      churnRate: '0% Churn',
      avgGmv: '₹1.25L / salon / mo',
      consigneeName: 'Marcus Vance',
      panNumber: 'ABCPV1294K',
      sec194RStatus: 'cleared',
      carrier: 'BlueDart Express Air',
      trackingStatus: 'Awaiting Courier Issue',
      warehouseHub: 'WH-BLR-NORTH',
      auditState: 'approved',
      stateLabel: 'Approved — Waybill Pending',
      stateBadgeBg: 'bg-[#ffd8e5]',
      stateBadgeText: 'text-[#3c0223]'
    },
    {
      id: '#CLM-2024-8842',
      auditDate: '24 Oct 2024 · 11:15 IST',
      slaRemaining: '02h 45m left',
      slaUrgent: true,
      partnerName: 'Rajesh K.',
      partnerId: 'NEX-77102',
      hubZone: 'Hyderabad Central Zone',
      tier: 'Tier 4 (250 Salons)',
      tierNumber: 4,
      salonsTarget: 250,
      hardwareName: 'Ather 450X Dual Disc EV',
      hardwareSupplier: 'Dealer: Ather Space Madhapur',
      assetValue: '₹1,55,000',
      qualifiedCount: 250,
      auditedCount: 264,
      churnRate: '1.1% Churn',
      avgGmv: '₹1.82L / salon / mo',
      consigneeName: 'Rajesh Kumar V.',
      panNumber: 'BHJPK4412L',
      sec194RStatus: 'in-review',
      carrier: 'Direct Showroom Delivery',
      trackingStatus: 'VIN Allocation Pending',
      warehouseHub: 'ATH-HYD-998',
      auditState: 'in-review',
      stateLabel: 'Audit: Fleet Verification',
      stateBadgeBg: 'bg-[#ebe8e3]',
      stateBadgeText: 'text-[#1c1c19]'
    },
    {
      id: '#CLM-2024-8791',
      auditDate: '23 Oct 2024 · 19:40 IST',
      slaRemaining: 'Audit Concluded',
      slaUrgent: false,
      partnerName: 'Vikram S.',
      partnerId: 'NEX-44910',
      hubZone: 'Delhi NCR District',
      tier: 'Tier 2 (50 Salons)',
      tierNumber: 2,
      salonsTarget: 50,
      hardwareName: 'Samsung Galaxy Tab A9+',
      hardwareSupplier: 'Retail Disbursal Allocation',
      assetValue: '₹28,000',
      qualifiedCount: 36,
      auditedCount: 50,
      churnRate: '28% Inactivity Churn',
      avgGmv: '0 Txns in last 18 days',
      consigneeName: 'Vikram Singh',
      panNumber: 'AMQPS0188M',
      sec194RStatus: 'pending',
      carrier: 'Allocation Released to Pool',
      trackingStatus: 'Dispatch Cancelled',
      warehouseHub: 'VOID-INACT-33',
      auditState: 'disqualified',
      stateLabel: 'Disqualified (Telemetry Churn)',
      stateBadgeBg: 'bg-[#ffdad6]',
      stateBadgeText: 'text-[#93000a]',
      rejectionReason: '14 of 50 merchants showed 0 transaction heartbeats for >18 consecutive days.'
    },
    {
      id: '#CLM-2024-8904',
      auditDate: '24 Oct 2024 · 16:10 IST',
      slaRemaining: '18h 40m left',
      slaUrgent: false,
      partnerName: 'Ananya Roy',
      partnerId: 'NEX-92014',
      hubZone: 'Mumbai South Hub',
      tier: 'Tier 1 (25 Salons)',
      tierNumber: 1,
      salonsTarget: 25,
      hardwareName: 'Official Nexora Partner T-Shirt & Tech Pack',
      hardwareSupplier: 'Nexora Direct Merchandising',
      assetValue: '₹4,500',
      qualifiedCount: 25,
      auditedCount: 28,
      churnRate: '0% Churn',
      avgGmv: '₹95K / salon / mo',
      consigneeName: 'Ananya Roy',
      panNumber: 'CYPAR9912E',
      sec194RStatus: 'cleared',
      carrier: 'Delhivery Surface transit',
      trackingStatus: 'Waybill #DLH-88129 Ready',
      warehouseHub: 'WH-MUM-BOM1',
      auditState: 'ready-dispatch',
      stateLabel: 'Ready for Dispatch',
      stateBadgeBg: 'bg-[#ffe088]',
      stateBadgeText: 'text-[#241a00]'
    }
  ]);

  const handleOpenAdjudication = (claim: ClaimRecord) => {
    setSelectedClaim(claim);
    setAdjudicationAction('approve');
    setReasonCode('telemetry-cleared');
    setAuditorNotes(
      `Telemetry audit completed for ${claim.partnerName} (${claim.partnerId}). ${claim.qualifiedCount} salons validated for 30-day continuous merchant activity. Sec 194R PAN attribution: ${claim.panNumber}.`
    );
    setIsAdjudicationOpen(true);
  };

  const handleAuthorizeDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClaim) return;

    if (adjudicationAction === 'approve') {
      setClaims(prev =>
        prev.map(c =>
          c.id === selectedClaim.id
            ? {
                ...c,
                auditState: 'ready-dispatch',
                stateLabel: 'Authorized — BlueDart #BLD-NX-' + Math.floor(10000 + Math.random() * 90000),
                stateBadgeBg: 'bg-emerald-100',
                stateBadgeText: 'text-emerald-900',
                trackingStatus: 'Waybill Dispatched to Courier Hub'
              }
            : c
        )
      );
      setToastMessage(`Hardware dispatch authorized for ${selectedClaim.partnerName} (${selectedClaim.hardwareName}).`);
    } else if (adjudicationAction === 'reject') {
      setClaims(prev =>
        prev.map(c =>
          c.id === selectedClaim.id
            ? {
                ...c,
                auditState: 'disqualified',
                stateLabel: 'Disqualified (Auditor Override)',
                stateBadgeBg: 'bg-[#ffdad6]',
                stateBadgeText: 'text-[#93000a]',
                trackingStatus: 'Dispatch Voided',
                rejectionReason: auditorNotes
              }
            : c
        )
      );
      setToastMessage(`Claim ${selectedClaim.id} flagged and disqualified.`);
    } else {
      setClaims(prev =>
        prev.map(c =>
          c.id === selectedClaim.id
            ? {
                ...c,
                auditState: 'in-review',
                stateLabel: 'Audit: Secondary Hold',
                stateBadgeBg: 'bg-[#ebe8e3]',
                stateBadgeText: 'text-[#1c1c19]'
              }
            : c
        )
      );
      setToastMessage(`Claim ${selectedClaim.id} placed on secondary telemetry hold.`);
    }

    setIsAdjudicationOpen(false);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered list
  const filteredClaims = claims.filter(claim => {
    if (activeTab === 'pending' && claim.auditState !== 'approved' && claim.auditState !== 'in-review') return false;
    if (activeTab === 'consignee' && claim.sec194RStatus !== 'in-review') return false;
    if (activeTab === 'ready' && claim.auditState !== 'ready-dispatch') return false;
    if (activeTab === 'shipped' && claim.trackingStatus.toLowerCase().includes('cancelled')) return false;
    if (activeTab === 'rejected' && claim.auditState !== 'disqualified') return false;

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const match =
        claim.id.toLowerCase().includes(q) ||
        claim.partnerName.toLowerCase().includes(q) ||
        claim.partnerId.toLowerCase().includes(q) ||
        claim.panNumber.toLowerCase().includes(q) ||
        claim.hardwareName.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (selectedTier !== 'all') {
      if (selectedTier === 't1' && claim.tierNumber !== 1) return false;
      if (selectedTier === 't2' && claim.tierNumber !== 2) return false;
      if (selectedTier === 't3' && claim.tierNumber !== 3) return false;
      if (selectedTier === 't4' && claim.tierNumber !== 4) return false;
      if (selectedTier === 't7' && claim.tierNumber !== 7) return false;
    }

    if (selectedSla === 'critical' && !claim.slaUrgent) return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-[#fcf9f4] text-[#1c1c19] flex">
      {/* ========================================================================= */}
      {/* OPS CONSOLE FIXED LEFT SIDEBAR (72 Width)                                   */}
      {/* ========================================================================= */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-[#f6f3ee] z-50 flex flex-col shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-[#e5e2dd]">
        {/* Brand Header */}
        <div className="h-16 px-6 flex items-center justify-between bg-[#f6f3ee] border-b border-[#e5e2dd]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#b1005e] flex items-center justify-center text-white shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-lg tracking-tight text-[#b1005e] leading-none">NEXORA</div>
              <span className="text-[11px] font-extrabold text-[#594047] tracking-wider uppercase">Ops Console</span>
            </div>
          </div>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
          {/* Applications & Merchants */}
          <div className="space-y-1">
            <div className="px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#594047]">
              Applications &amp; Merchants
            </div>
            <button
              onClick={() => onNavigateToDashboard && onNavigateToDashboard()}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors text-xs font-semibold cursor-pointer"
              type="button"
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4" />
                <span>Partner Applications</span>
              </div>
              <span className="px-1.5 py-0.5 rounded-full bg-[#ebe8e3] text-[#1c1c19] text-[10px] font-bold">24</span>
            </button>
            <button
              onClick={() => onNavigateToSalonIntelligence && onNavigateToSalonIntelligence()}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors text-xs font-semibold cursor-pointer"
              type="button"
            >
              <div className="flex items-center gap-2.5">
                <Store className="w-4 h-4" />
                <span>Salon Onboarding</span>
              </div>
              <span className="px-1.5 py-0.5 rounded-full bg-[#fda4c9] text-[#7a3656] text-[10px] font-bold">
                12 Pending
              </span>
            </button>
            <button
              onClick={() => onNavigateToStepAuditWorkspace && onNavigateToStepAuditWorkspace()}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors text-xs font-semibold cursor-pointer"
              type="button"
            >
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Duplicate &amp; Fraud</span>
              </div>
              <span className="px-1.5 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-[10px] font-bold">
                3 Critical
              </span>
            </button>
          </div>

          {/* Verifications */}
          <div className="space-y-1">
            <div className="px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#594047]">
              Verifications
            </div>
            <button
              onClick={() => onNavigateToLockedOnboarding && onNavigateToLockedOnboarding()}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors text-xs font-semibold cursor-pointer"
              type="button"
            >
              <div className="flex items-center gap-2.5">
                <BadgeCheck className="w-4 h-4" />
                <span>KYC &amp; Trade License</span>
              </div>
              <span className="px-1.5 py-0.5 rounded-full bg-[#ebe8e3] text-[#1c1c19] text-[10px] font-bold">9</span>
            </button>
            <button
              onClick={() => onNavigateToSecureHandoff && onNavigateToSecureHandoff()}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors text-xs font-semibold cursor-pointer"
              type="button"
            >
              <div className="flex items-center gap-2.5">
                <Radio className="w-4 h-4" />
                <span>Soundbox &amp; QR Map</span>
              </div>
            </button>
          </div>

          {/* Financial Audit */}
          <div className="space-y-1">
            <div className="px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#594047]">
              Financial Audit
            </div>
            <button
              onClick={() => onNavigateToEarningsLedger && onNavigateToEarningsLedger()}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors text-xs font-semibold cursor-pointer"
              type="button"
            >
              <div className="flex items-center gap-2.5">
                <Receipt className="w-4 h-4" />
                <span>Transaction Ledger</span>
              </div>
            </button>
            <button
              onClick={() => onNavigateToExtraOnboardingReward && onNavigateToExtraOnboardingReward()}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors text-xs font-semibold cursor-pointer"
              type="button"
            >
              <div className="flex items-center gap-2.5">
                <CreditCard className="w-4 h-4" />
                <span>Commission Payouts</span>
              </div>
              <span className="px-1.5 py-0.5 rounded-full bg-[#e9c349] text-[#241a00] text-[10px] font-bold">
                Batch Ready
              </span>
            </button>
            <button
              onClick={() => setActiveNavPath('milestone-asset-claims')}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#d91b77] text-white font-bold text-xs shadow-xs cursor-pointer"
              type="button"
            >
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4" />
                <span>Milestone Asset Claims</span>
              </div>
            </button>
          </div>

          {/* Security & Governance */}
          <div className="space-y-1">
            <div className="px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#594047]">
              Security &amp; Governance
            </div>
            <button
              onClick={() => onNavigateToReferralTimeline && onNavigateToReferralTimeline()}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors text-xs font-semibold cursor-pointer"
              type="button"
            >
              <div className="flex items-center gap-2.5">
                <FileCheck className="w-4 h-4" />
                <span>Compliance Audit Trail</span>
              </div>
            </button>
            <button
              onClick={() => onNavigateToProfileSettings && onNavigateToProfileSettings()}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors text-xs font-semibold cursor-pointer"
              type="button"
            >
              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4" />
                <span>Access Control</span>
              </div>
            </button>
          </div>
        </nav>

        {/* Sidebar Footer Status */}
        <div className="p-3 bg-[#f6f3ee] border-t border-[#e5e2dd]">
          <div className="p-2.5 rounded-xl bg-[#f0ede9] flex items-center justify-between border border-[#e5e2dd]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#b1005e] animate-pulse"></span>
              <span className="text-[11px] font-bold text-[#1c1c19]">Audit Sync: Active</span>
            </div>
            <span className="text-[11px] text-[#594047] font-mono">v3.4.1</span>
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MAIN OPS CONSOLE WORKSPACE (Padded 72 from left)                            */}
      {/* ========================================================================= */}
      <div className="pl-72 w-full flex flex-col min-h-screen">
        {/* TOP BAR */}
        <header className="fixed top-0 left-72 right-0 h-16 bg-[#fcf9f4]/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-6 border-b border-[#e5e2dd]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ebe8e3] text-[#1c1c19] text-xs font-bold uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#b1005e]"></span>
              <span>LIVE PRODUCTION</span>
            </div>

            {/* Quick Search */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#ffffff] text-[#594047] shadow-[0_1px_8px_rgba(0,0,0,0.04)] w-80 border border-[#e5e2dd]">
              <Search className="w-4 h-4" />
              <input
                type="text"
                placeholder="Search salons, partners, txns..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs text-[#1c1c19] w-full focus:outline-none placeholder:text-[#594047]"
              />
              <kbd className="px-1.5 py-0.5 rounded bg-[#f0ede9] text-[10px] font-mono text-[#1c1c19]">⌘K</kbd>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              aria-label="Pending Alerts"
              className="relative p-2 rounded-lg text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors cursor-pointer"
              type="button"
            >
              <Activity className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
            </button>
            <div className="h-6 w-px bg-[#e5e2dd]"></div>
            <div className="flex items-center gap-2.5">
              <div className="text-right">
                <div className="text-xs font-bold text-[#1c1c19] leading-tight">Priya S.</div>
                <div className="text-[11px] text-[#594047] leading-tight">Lead Risk Auditor</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#b1005e] flex items-center justify-center text-white text-xs font-bold shadow-xs">
                PS
              </div>
            </div>
          </div>
        </header>

        {/* MAIN BODY CONTAINER */}
        <main className="w-full pt-20 px-6 pb-12 bg-[#fcf9f4] flex-1">
          <div className="flex flex-col gap-6 w-full max-w-[1400px] mx-auto">
            {/* Operational Header & Breadcrumbs */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <nav
                  aria-label="Breadcrumbs"
                  className="flex items-center gap-1.5 text-[#594047] text-xs font-semibold"
                >
                  <span>Financial Audit</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span className="text-[#b1005e] font-bold">Milestone Asset Claims</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span className="text-[#1c1c19]">Dispatch Protocol &amp; Telemetry Gate</span>
                </nav>
                <div className="flex items-baseline gap-2.5 flex-wrap">
                  <h1 className="text-2xl font-extrabold text-[#1c1c19] tracking-tight">
                    Partner Milestone Asset Claims &amp; Dispatch Protocol
                  </h1>
                  <span className="px-2 py-0.5 rounded bg-[#ebe8e3] text-xs font-bold text-[#594047] tracking-wider uppercase">
                    Section 194R Compliant
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start md:self-auto">
                <button
                  onClick={() => alert('Exporting OEM procurement manifest CSV with Waybill serials...')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#ffffff] text-[#1c1c19] shadow-xs text-xs font-bold hover:bg-[#f0ede9] transition-colors border border-[#e5e2dd] cursor-pointer"
                  type="button"
                >
                  <Download className="w-4 h-4" />
                  <span>OEM Manifest Export</span>
                </button>
                <button
                  onClick={() => {
                    setToastMessage('Triggered bulk heartbeat check across 100+ active partner merchant queues.');
                    setTimeout(() => setToastMessage(null), 3000);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#b1005e] text-white shadow-xs text-xs font-bold hover:bg-[#d91b77] transition-all cursor-pointer"
                  type="button"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Run Bulk Telemetry Audit</span>
                </button>
              </div>
            </div>

            {/* Notification Toast */}
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-xl bg-[#b1005e] text-white text-xs font-bold shadow-md flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>{toastMessage}</span>
                </div>
                <button onClick={() => setToastMessage(null)} className="text-white/80 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* KPI Summary Bento Grid (4 Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1 */}
              <div className="p-4 rounded-xl bg-[#ffffff] shadow-xs border border-[#e5e2dd] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#594047]">
                    Pending Claims for Audit
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#fda4c9] text-[#7a3656] flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-3xl font-extrabold text-[#1c1c19] leading-none tracking-tight">
                    4 <span className="text-xs text-[#594047] font-normal">Active In Queue</span>
                  </div>
                  <div className="mt-1 text-xs text-[#594047]">2 Laptops, 1 EV Scooter, 1 Fleet SUV</div>
                </div>
                <div className="mt-3 pt-2 border-t border-[#f6f3ee] flex items-center gap-1.5 text-xs font-bold text-[#b1005e]">
                  <span className="w-2 h-2 rounded-full bg-[#b1005e] animate-pulse"></span>
                  <span>High Priority Escalation: Ather 450X</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-4 rounded-xl bg-[#ffffff] shadow-xs border border-[#e5e2dd] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#594047]">
                    Dispatched This Month
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#f0ede9] text-[#1c1c19] flex items-center justify-center">
                    <Truck className="w-4 h-4 text-[#b1005e]" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-3xl font-extrabold text-[#1c1c19] leading-none tracking-tight">
                    18 <span className="text-xs text-[#594047] font-normal">Units</span>
                  </div>
                  <div className="mt-1 text-xs text-[#1c1c19] font-bold">₹14,82,400 Asset Book Value</div>
                </div>
                <div className="mt-3 pt-2 border-t border-[#f6f3ee] flex items-center gap-1.5 text-xs font-bold text-[#735c00]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#735c00]" />
                  <span>100% Waybills Reconciled</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-4 rounded-xl bg-[#ffffff] shadow-xs border border-[#e5e2dd] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#594047]">
                    Anti-Encashment Protocol
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#f0ede9] text-[#b1005e] flex items-center justify-center">
                    <Lock className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-3xl font-extrabold text-[#b1005e] leading-none tracking-tight">100%</div>
                  <div className="mt-1 text-xs text-[#594047]">Strict Physical OEM Disbursal</div>
                </div>
                <div className="mt-3 pt-2 border-t border-[#f6f3ee] flex items-center gap-1 text-xs text-[#594047]">
                  <span className="font-bold text-[#1c1c19]">Zero</span> cash substitution requests approved
                </div>
              </div>

              {/* Card 4 */}
              <div className="p-4 rounded-xl bg-[#ffffff] shadow-xs border border-[#e5e2dd] flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#594047]">
                    30-Day Active Merchant SLA
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#f0ede9] text-[#735c00] flex items-center justify-center">
                    <Activity className="w-4 h-4 text-[#735c00]" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-3xl font-extrabold text-[#1c1c19] leading-none tracking-tight">98.4%</div>
                  <div className="mt-1 text-xs text-[#594047]">Passing Active Heartbeat Rate</div>
                </div>
                <div className="mt-3 pt-2 border-t border-[#f6f3ee] flex items-center gap-1 text-xs font-bold text-[#ba1a1a]">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>1 Fraud Cluster Flagged Today</span>
                </div>
              </div>
            </div>

            {/* Visual Banner: Physical Asset Milestone Ladder & Tier Tracking */}
            <div className="relative overflow-hidden p-4 rounded-2xl bg-[#f6f3ee] border border-[#e5e2dd] shadow-xs flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex flex-col gap-1 z-10">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#ffe088] text-[#241a00] text-[11px] font-extrabold">
                    OEM Direct Procurement
                  </span>
                  <span className="text-xs text-[#594047] font-semibold">FY2024–25 Physical Asset Schedule</span>
                </div>
                <div className="text-lg font-bold text-[#1c1c19]">
                  Physical Reward Ladder &amp; Section 194R Valuation Track
                </div>
                <div className="text-xs text-[#594047]">
                  Claims require verifiable merchant telemetry: active soundbox pings, valid 30-day UPI throughput, and PAN matching consignee.
                </div>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto py-1 z-10">
                <div className="px-3 py-2 rounded-xl bg-[#ffffff] shadow-xs border border-[#e5e2dd] flex flex-col items-center text-center min-w-[110px]">
                  <span className="text-[10px] font-bold text-[#594047]">Tier 1 (25 Salons)</span>
                  <span className="text-xs font-bold text-[#1c1c19]">Tech Pack</span>
                  <span className="text-[11px] font-bold text-[#735c00] mt-0.5">₹4,500 Val.</span>
                </div>

                <div className="px-3 py-2 rounded-xl bg-[#ffffff] shadow-xs border border-[#e5e2dd] flex flex-col items-center text-center min-w-[110px]">
                  <span className="text-[10px] font-bold text-[#594047]">Tier 2 (50 Salons)</span>
                  <span className="text-xs font-bold text-[#1c1c19]">Galaxy Tab</span>
                  <span className="text-[11px] font-bold text-[#735c00] mt-0.5">₹28,000 Val.</span>
                </div>

                <div className="px-3 py-2 rounded-xl bg-[#d91b77] text-white shadow-xs flex flex-col items-center text-center min-w-[110px]">
                  <span className="text-[10px] font-extrabold text-white/90">Tier 3 (100 Salons)</span>
                  <span className="text-xs font-extrabold">HP ProBook</span>
                  <span className="text-[11px] font-extrabold text-[#ffe088] mt-0.5">₹68,500 Val.</span>
                </div>

                <div className="px-3 py-2 rounded-xl bg-[#ffffff] shadow-xs border border-[#e5e2dd] flex flex-col items-center text-center min-w-[110px]">
                  <span className="text-[10px] font-bold text-[#594047]">Tier 4 (250 Salons)</span>
                  <span className="text-xs font-bold text-[#1c1c19]">Ather 450X EV</span>
                  <span className="text-[11px] font-bold text-[#735c00] mt-0.5">₹1,55,000 Val.</span>
                </div>

                <div className="px-3 py-2 rounded-xl bg-[#ffffff] shadow-xs border border-[#e5e2dd] flex flex-col items-center text-center min-w-[110px]">
                  <span className="text-[10px] font-bold text-[#594047]">Tier 7 (1000 Salons)</span>
                  <span className="text-xs font-bold text-[#1c1c19]">Mahindra XUV</span>
                  <span className="text-[11px] font-bold text-[#735c00] mt-0.5">₹22,00,000 Val.</span>
                </div>
              </div>
            </div>

            {/* Queue Controls: Tab Navigation and Filter Ribbon */}
            <div className="flex flex-col gap-3">
              {/* Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3.5 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === 'all'
                      ? 'bg-[#b1005e] text-white shadow-xs'
                      : 'bg-[#f0ede9] text-[#594047] hover:bg-[#ebe8e3]'
                  }`}
                  type="button"
                >
                  All Claims <span className="ml-1 px-1.5 py-0.5 rounded bg-white/20 text-[10px] font-mono">24</span>
                </button>

                <button
                  onClick={() => setActiveTab('pending')}
                  className={`px-3.5 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === 'pending'
                      ? 'bg-[#b1005e] text-white shadow-xs'
                      : 'bg-[#f0ede9] text-[#594047] hover:bg-[#ebe8e3]'
                  }`}
                  type="button"
                >
                  Pending Commercial Audit{' '}
                  <span className="ml-1 px-1.5 py-0.5 rounded bg-[#ffd9e2] text-[#3e001d] text-[10px] font-mono">4</span>
                </button>

                <button
                  onClick={() => setActiveTab('consignee')}
                  className={`px-3.5 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === 'consignee'
                      ? 'bg-[#b1005e] text-white shadow-xs'
                      : 'bg-[#f0ede9] text-[#594047] hover:bg-[#ebe8e3]'
                  }`}
                  type="button"
                >
                  Under Consignee Verification{' '}
                  <span className="ml-1 px-1.5 py-0.5 rounded bg-[#ebe8e3] text-[#1c1c19] text-[10px] font-mono">3</span>
                </button>

                <button
                  onClick={() => setActiveTab('ready')}
                  className={`px-3.5 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === 'ready'
                      ? 'bg-[#b1005e] text-white shadow-xs'
                      : 'bg-[#f0ede9] text-[#594047] hover:bg-[#ebe8e3]'
                  }`}
                  type="button"
                >
                  Ready for Dispatch{' '}
                  <span className="ml-1 px-1.5 py-0.5 rounded bg-[#ffe088] text-[#241a00] text-[10px] font-mono">5</span>
                </button>

                <button
                  onClick={() => setActiveTab('shipped')}
                  className={`px-3.5 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === 'shipped'
                      ? 'bg-[#b1005e] text-white shadow-xs'
                      : 'bg-[#f0ede9] text-[#594047] hover:bg-[#ebe8e3]'
                  }`}
                  type="button"
                >
                  Shipped / Tracking Active{' '}
                  <span className="ml-1 px-1.5 py-0.5 rounded bg-[#ebe8e3] text-[#1c1c19] text-[10px] font-mono">8</span>
                </button>

                <button
                  onClick={() => setActiveTab('rejected')}
                  className={`px-3.5 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === 'rejected'
                      ? 'bg-[#b1005e] text-white shadow-xs'
                      : 'bg-[#f0ede9] text-[#594047] hover:bg-[#ebe8e3]'
                  }`}
                  type="button"
                >
                  Rejected / Disqualified{' '}
                  <span className="ml-1 px-1.5 py-0.5 rounded bg-[#ffdad6] text-[#93000a] text-[10px] font-mono">4</span>
                </button>
              </div>

              {/* Filters Ribbon */}
              <div className="p-3.5 rounded-2xl bg-[#ffffff] shadow-xs border border-[#e5e2dd] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2.5 flex-1">
                  {/* Search */}
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#f0ede9] text-[#594047] w-full md:w-64">
                    <Search className="w-4 h-4" />
                    <input
                      className="bg-transparent text-xs text-[#1c1c19] w-full focus:outline-none placeholder:text-[#594047]"
                      placeholder="Search Partner ID, PAN, Waybill..."
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {/* Tier Dropdown */}
                  <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#f0ede9] text-[#1c1c19] text-xs font-bold">
                    <Filter className="w-3.5 h-3.5 text-[#594047]" />
                    <select
                      aria-label="Filter by Tier"
                      value={selectedTier}
                      onChange={e => setSelectedTier(e.target.value)}
                      className="bg-transparent text-xs font-bold text-[#1c1c19] focus:outline-none pr-2 cursor-pointer"
                    >
                      <option value="all">All Milestone Tiers</option>
                      <option value="t1">Tier 1: Tech Pack (25)</option>
                      <option value="t2">Tier 2: Samsung Tab (50)</option>
                      <option value="t3">Tier 3: HP ProBook (100)</option>
                      <option value="t4">Tier 4: Ather 450X EV (250)</option>
                      <option value="t7">Tier 7: Mahindra XUV700 (1000)</option>
                    </select>
                  </div>

                  {/* SLA Countdown Filter */}
                  <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#f0ede9] text-[#1c1c19] text-xs font-bold">
                    <Clock className="w-3.5 h-3.5 text-[#594047]" />
                    <select
                      aria-label="Filter by SLA Urgency"
                      value={selectedSla}
                      onChange={e => setSelectedSla(e.target.value)}
                      className="bg-transparent text-xs font-bold text-[#1c1c19] focus:outline-none pr-2 cursor-pointer"
                    >
                      <option value="all">SLA Window: All</option>
                      <option value="critical">&lt; 12 Hours (Urgent Review)</option>
                      <option value="standard">24–48 Hours</option>
                      <option value="cleared">SLA Compliant</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 text-xs text-[#594047] font-semibold">
                  <span>
                    Showing <strong>{filteredClaims.length}</strong> of 24 claims
                  </span>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedTier('all');
                      setSelectedSla('all');
                    }}
                    className="p-1.5 rounded-lg hover:bg-[#f0ede9] text-[#1c1c19] transition-colors cursor-pointer"
                    title="Reset filters"
                    type="button"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Detailed Back-Office Claims Table */}
            <div className="overflow-x-auto rounded-2xl bg-[#ffffff] shadow-xs border border-[#e5e2dd]">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#f6f3ee] text-[#594047] text-[11px] font-extrabold uppercase tracking-wider border-b border-[#e5e2dd]">
                    <th className="py-3 px-4">Claim ID &amp; Audit Date</th>
                    <th className="py-3 px-4">Partner Profile</th>
                    <th className="py-3 px-4">Milestone Tier &amp; Hardware</th>
                    <th className="py-3 px-4">30-Day Active Telemetry</th>
                    <th className="py-3 px-4">Consignee KYC &amp; Tax Status</th>
                    <th className="py-3 px-4">Dispatch Tracking</th>
                    <th className="py-3 px-4">Audit State</th>
                    <th className="py-3 px-4 text-right">Adjudication</th>
                  </tr>
                </thead>
                <tbody className="text-[#1c1c19] divide-y divide-[#f0ede9]">
                  {filteredClaims.map(claim => (
                    <tr key={claim.id} className="hover:bg-[#f6f3ee]/50 transition-colors">
                      {/* Claim ID & Audit Date */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="font-mono font-bold text-xs text-[#b1005e]">{claim.id}</div>
                        <div className="text-[#594047] text-[11px] mt-0.5">{claim.auditDate}</div>
                        <div
                          className={`mt-1 inline-flex items-center gap-1 font-mono text-[10px] font-bold ${
                            claim.slaUrgent ? 'text-[#ba1a1a]' : 'text-[#735c00]'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              claim.slaUrgent ? 'bg-[#ba1a1a] animate-ping' : 'bg-[#735c00]'
                            }`}
                          ></span>
                          <span>SLA: {claim.slaRemaining}</span>
                        </div>
                      </td>

                      {/* Partner Profile */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="font-bold text-xs text-[#1c1c19]">{claim.partnerName}</div>
                        <div className="font-mono text-[11px] text-[#594047]">ID: {claim.partnerId}</div>
                        <div className="text-[#594047] text-[11px] mt-0.5">{claim.hubZone}</div>
                      </td>

                      {/* Milestone Tier & Hardware */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#ffd9e2] text-[#3e001d] text-[10px] font-extrabold">
                          <span>{claim.tier}</span>
                        </div>
                        <div className="font-bold text-[#1c1c19] text-xs mt-1">{claim.hardwareName}</div>
                        <div className="text-[#594047] text-[11px]">{claim.hardwareSupplier}</div>
                      </td>

                      {/* 30-Day Active Telemetry */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="flex items-center gap-1.5">
                          {claim.auditState === 'disqualified' ? (
                            <X className="w-4 h-4 text-[#ba1a1a]" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-[#735c00]" />
                          )}
                          <span
                            className={`font-bold ${
                              claim.auditState === 'disqualified' ? 'text-[#ba1a1a]' : 'text-[#1c1c19]'
                            }`}
                          >
                            {claim.qualifiedCount} / {claim.salonsTarget} Qualified
                          </span>
                        </div>
                        <div
                          className={`text-[11px] ${
                            claim.auditState === 'disqualified' ? 'text-[#ba1a1a] font-bold' : 'text-[#594047]'
                          }`}
                        >
                          {claim.auditedCount} Audited · {claim.churnRate}
                        </div>
                        <div className="font-mono text-[10px] text-[#594047] mt-0.5">Avg GMV: {claim.avgGmv}</div>
                      </td>

                      {/* Consignee KYC & Tax */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="font-bold text-[#1c1c19]">{claim.consigneeName}</div>
                        <div className="font-mono text-[11px] text-[#594047]">PAN: {claim.panNumber}</div>
                        <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#f0ede9] text-[#1c1c19] text-[10px] font-bold mt-1">
                          <Check className="w-3 h-3 text-[#735c00]" />
                          <span>
                            {claim.sec194RStatus === 'cleared'
                              ? 'Sec 194R Cleared'
                              : claim.sec194RStatus === 'in-review'
                              ? 'RTO Tax Reg In-Review'
                              : 'Consent Signed'}
                          </span>
                        </div>
                      </td>

                      {/* Dispatch Tracking */}
                      <td className="py-3.5 px-4 align-top">
                        <div className="font-mono text-[11px] text-[#1c1c19] font-bold">{claim.trackingStatus}</div>
                        <div className="text-[#594047] text-[11px]">{claim.carrier}</div>
                        <div className="font-mono text-[10px] text-[#594047] mt-0.5">{claim.warehouseHub}</div>
                      </td>

                      {/* Audit State */}
                      <td className="py-3.5 px-4 align-top">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full ${claim.stateBadgeBg} ${claim.stateBadgeText} text-[10px] font-extrabold shadow-2xs`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          <span>{claim.stateLabel}</span>
                        </span>
                      </td>

                      {/* Adjudication CTA */}
                      <td className="py-3.5 px-4 align-top text-right">
                        {claim.auditState === 'approved' ? (
                          <button
                            onClick={() => handleOpenAdjudication(claim)}
                            className="px-3 py-1.5 rounded-xl bg-[#b1005e] text-white text-xs font-bold shadow-xs hover:bg-[#d91b77] transition-all cursor-pointer whitespace-nowrap"
                            type="button"
                          >
                            Adjudicate Claim
                          </button>
                        ) : claim.auditState === 'in-review' ? (
                          <button
                            onClick={() => handleOpenAdjudication(claim)}
                            className="px-3 py-1.5 rounded-xl bg-[#f0ede9] text-[#1c1c19] text-xs font-bold shadow-xs hover:bg-[#ebe8e3] transition-colors cursor-pointer whitespace-nowrap"
                            type="button"
                          >
                            Inspect Ledger
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              alert(
                                `Penalty Log for ${claim.partnerName} (${claim.id}):\n\n${
                                  claim.rejectionReason || '14 inactive merchants flagged.'
                                }`
                              )
                            }
                            className="px-3 py-1.5 rounded-xl bg-[#f0ede9] text-[#1c1c19] text-xs font-bold hover:bg-[#ebe8e3] transition-colors cursor-pointer whitespace-nowrap"
                            type="button"
                          >
                            View Penalty Log
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Active Physical Disbursals / Live Log Section (3 Columns) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Anti-Encashment Protocol Box */}
              <div className="p-4 rounded-2xl bg-[#ffffff] shadow-xs border border-[#e5e2dd] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1c1c19]">Anti-Encashment Rigor Guard</span>
                    <ShieldCheck className="w-5 h-5 text-[#b1005e]" />
                  </div>
                  <p className="text-xs text-[#594047] mt-2 leading-relaxed">
                    Nexora strictly forbids liquid conversions or bank payouts in lieu of physical hardware awards. OEM directly vouchers serial numbers against partner PANs.
                  </p>
                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-[#f0ede9]">
                      <span className="text-[#1c1c19] font-medium">Direct OEM Dispatch Bind</span>
                      <span className="font-extrabold text-[#735c00] font-mono text-[11px]">ENFORCED</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-[#f0ede9]">
                      <span className="text-[#1c1c19] font-medium">Sec 194R Tax Attribution</span>
                      <span className="font-extrabold text-[#735c00] font-mono text-[11px]">MANDATORY</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-[#f0ede9]">
                      <span className="text-[#1c1c19] font-medium">Secondary Market Resale Lock</span>
                      <span className="font-bold text-[#594047] font-mono text-[11px]">180 DAYS</span>
                    </div>
                  </div>
                </div>
                <div className="pt-4 text-[#594047] text-[11px] border-t border-[#f0ede9] mt-3">
                  Internal Compliance Directive v4.1 · Reviewed by Legal Risk Audit
                </div>
              </div>

              {/* Telemetry Heartbeat Monitor Status */}
              <div className="p-4 rounded-2xl bg-[#ffffff] shadow-xs border border-[#e5e2dd] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1c1c19]">Merchant Pulse SLA Monitor</span>
                    <Radio className="w-5 h-5 text-[#735c00]" />
                  </div>
                  <p className="text-xs text-[#594047] mt-2 leading-relaxed">
                    Automated background sweeps monitor every qualified salon. An onboarding claim requires 30 continuous calendar days with &gt;= 1 soundbox transaction daily.
                  </p>
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#594047]">Live Audit Cycle Completion</span>
                      <span className="font-mono text-[#1c1c19] font-bold">91.2%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#f0ede9] overflow-hidden">
                      <div className="h-full bg-[#b1005e] rounded-full" style={{ width: '91.2%' }}></div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[#594047] text-xs">
                    <span>Next Automated Batch Scan:</span>
                    <span className="font-mono text-[#1c1c19] font-bold">18:00:00 IST</span>
                  </div>
                </div>
                <div className="pt-4 flex items-center justify-between border-t border-[#f0ede9] mt-3">
                  <span className="text-xs font-bold text-[#735c00] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#735c00]"></span>
                    <span>All Soundbox APIs Normal</span>
                  </span>
                  <button
                    onClick={() => alert('Telemetry frequency: 6-hour polling with automatic ping failure webhooks.')}
                    className="text-xs text-[#b1005e] font-bold hover:underline cursor-pointer"
                    type="button"
                  >
                    Telemetry Settings
                  </button>
                </div>
              </div>

              {/* Integrated Logistics Partners */}
              <div className="p-4 rounded-2xl bg-[#ffffff] shadow-xs border border-[#e5e2dd] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1c1c19]">Integrated Logistics Partners</span>
                    <Truck className="w-5 h-5 text-[#594047]" />
                  </div>
                  <div className="mt-3 space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f0ede9]">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#1c1c19]">BlueDart Express</span>
                        <span className="text-[#594047] text-[11px]">Air Freight</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#ffd9e2] text-[#3e001d] text-[10px] font-bold">
                        5 Shipments Active
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f0ede9]">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#1c1c19]">Delhivery Enterprise</span>
                        <span className="text-[#594047] text-[11px]">Surface Transit</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#ebe8e3] text-[#594047] text-[10px] font-bold">
                        3 Shipments Active
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f0ede9]">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#1c1c19]">OEM Direct Showroom</span>
                        <span className="text-[#594047] text-[11px]">Fleet RTO Handover</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#ffe088] text-[#241a00] text-[10px] font-bold">
                        2 In-Transit
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pt-4 flex items-center justify-between text-xs border-t border-[#f0ede9] mt-3">
                  <span className="text-[#594047]">
                    Avg Courier SLA: <strong>2.8 Days</strong>
                  </span>
                  <button
                    onClick={() => alert('Logistics API endpoint connected to BlueDart and Delhivery B2B portal.')}
                    className="text-[#b1005e] font-bold hover:underline cursor-pointer"
                    type="button"
                  >
                    Logistics Hub
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ========================================================================= */}
      {/* ADJUDICATION MODAL OVERLAY                                                */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isAdjudicationOpen && selectedClaim && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#31302d]/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl rounded-2xl bg-[#ffffff] shadow-2xl border border-[#e5e2dd] flex flex-col overflow-hidden max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 bg-[#f6f3ee] flex items-center justify-between border-b border-[#e5e2dd]">
                <div className="flex flex-col">
                  <div className="text-[11px] font-extrabold text-[#594047] uppercase tracking-wider">
                    Hardware Claim Adjudication Protocol
                  </div>
                  <h2 className="text-lg font-bold text-[#1c1c19]">
                    Claim {selectedClaim.id} ({selectedClaim.partnerName})
                  </h2>
                </div>
                <button
                  aria-label="Close modal"
                  onClick={() => setIsAdjudicationOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#ebe8e3] hover:bg-[#e5e2dd] flex items-center justify-center text-[#594047] cursor-pointer"
                  type="button"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-4 text-xs">
                {/* Audited Ledger Confirmation Callout */}
                <div className="p-4 rounded-xl bg-[#ffffff] shadow-xs border border-[#e5e2dd] space-y-3">
                  <div className="text-xs uppercase tracking-wider text-[#1c1c19] font-extrabold flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-[#735c00]" />
                    <span>Audited Telemetry &amp; Statutory Confirmation</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#735c00] mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-xs text-[#1c1c19]">
                          {selectedClaim.qualifiedCount} Salons Cleared Section 194R
                        </strong>
                        <p className="text-[#594047] text-[11px] mt-0.5">
                          All merchants processed &gt; 30 live soundbox transactions in 30 days.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#735c00] mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-xs text-[#1c1c19]">TDS Form 16A Consent on File</strong>
                        <p className="text-[#594047] text-[11px] mt-0.5">
                          Attributed value {selectedClaim.assetValue} locked to PAN {selectedClaim.panNumber}.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 md:col-span-2">
                      <CheckCircle2 className="w-4 h-4 text-[#735c00] mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-xs text-[#1c1c19]">Anti-Encashment Protocol Validated</strong>
                        <p className="text-[#594047] text-[11px] mt-0.5">
                          Direct PO issued to HP Enterprise India (Model {selectedClaim.hardwareName}, SN allocation pending dispatch release).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Consignee & Shipping Review */}
                <div className="p-4 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] space-y-2">
                  <div className="text-xs uppercase tracking-wider text-[#1c1c19] font-extrabold">
                    Consignee &amp; Physical Shipping Details
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <span className="text-[#594047] text-[11px] block">Recipient Consignee</span>
                      <span className="font-bold text-[#1c1c19]">
                        {selectedClaim.consigneeName} (Partner ID {selectedClaim.partnerId})
                      </span>
                      <span className="text-[#594047] block font-mono text-[11px]">
                        PAN: {selectedClaim.panNumber} (Verified Gov Portal)
                      </span>
                    </div>
                    <div>
                      <span className="text-[#594047] text-[11px] block">Shipping Address (Locked)</span>
                      <span className="text-[#1c1c19]">
                        Prestige Technostar, Suite 402, 4th Floor, Brookefield, Bengaluru, Karnataka 560066
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mandatory Adjudication Reason & Action Form */}
                <form onSubmit={handleAuthorizeDispatch} className="space-y-4 pt-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-extrabold text-[#1c1c19] uppercase tracking-wider">
                      Adjudication Action <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <select
                      value={adjudicationAction}
                      onChange={e => setAdjudicationAction(e.target.value as any)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#f0ede9] text-[#1c1c19] text-xs font-semibold focus:outline-none border border-[#e5e2dd]"
                      required
                    >
                      <option value="approve">Approve &amp; Issue BlueDart Air Waybill (Recommended)</option>
                      <option value="hold">Hold for Secondary Heartbeat Verification</option>
                      <option value="reject">Reject Claim — Fraud / Encashment Policy Violation</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-extrabold text-[#1c1c19] uppercase tracking-wider">
                      Mandatory Reason Code <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <select
                      value={reasonCode}
                      onChange={e => setReasonCode(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#f0ede9] text-[#1c1c19] text-xs font-semibold focus:outline-none border border-[#e5e2dd]"
                      required
                    >
                      <option value="telemetry-cleared">All 30-day merchant telemetry thresholds verified</option>
                      <option value="suspicious-clustering">Suspicious merchant clustering / inactive POS detected</option>
                      <option value="pan-mismatch">Consignee PAN name mismatch / invalid KYC</option>
                      <option value="inventory-backorder">Asset inventory backorder with OEM supplier</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-extrabold text-[#1c1c19] uppercase tracking-wider">
                      Auditor Justification Notes <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <textarea
                      rows={3}
                      value={auditorNotes}
                      onChange={e => setAuditorNotes(e.target.value)}
                      className="w-full p-3 rounded-xl bg-[#f0ede9] text-[#1c1c19] text-xs focus:outline-none placeholder:text-[#594047] border border-[#e5e2dd]"
                      placeholder="Enter auditor ledger observations, waybill batch reference, or disqualification basis..."
                      required
                    ></textarea>
                    <span className="text-[#594047] text-[10px] block">
                      This entry is immutable and stored directly in the Section 194R statutory audit log.
                    </span>
                  </div>

                  {/* Modal Action Bar */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-2 border-t border-[#e5e2dd]">
                    <button
                      onClick={() => setIsAdjudicationOpen(false)}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#f0ede9] text-[#1c1c19] text-xs font-bold hover:bg-[#ebe8e3] transition-colors cursor-pointer"
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setAdjudicationAction('reject');
                        setTimeout(() => {
                          const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
                          handleAuthorizeDispatch(fakeEvent);
                        }, 50);
                      }}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#ba1a1a] text-white text-xs font-bold hover:bg-[#93000a] transition-all cursor-pointer"
                      type="button"
                    >
                      Decline Claim
                    </button>
                    <button
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#b1005e] text-white text-xs font-bold shadow-md hover:bg-[#d91b77] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      type="submit"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Authorize Hardware Dispatch</span>
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
