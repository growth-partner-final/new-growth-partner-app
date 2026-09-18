import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import nexoraTshirtImg from '../assets/images/nexora_tshirt_gift_1789626886832.jpg';
import { partnerDbService } from '../services/partnerDbService';
import {
  Award,
  CheckCircle2,
  Truck,
  Lock,
  Shield,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Sparkles,
  Gift,
  FileText,
  Download,
  ChevronRight,
  ArrowRight,
  X,
  Search,
  Info,
  Coins,
  TrendingUp,
  Laptop,
  Smartphone,
  Bike,
  Car,
  Store,
  Users,
  QrCode,
  Wallet,
  Receipt,
  Calendar,
  MapPin,
  Copy,
  Check,
  HelpCircle,
  Send,
  Share2,
  RotateCcw,
  Sliders,
  Eye,
  Activity,
  Layers,
  BarChart3,
  ExternalLink,
  Zap,
  Phone,
  Radio,
  CheckCheck
} from 'lucide-react';

interface PartnerMilestoneClaimsScreenProps {
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
}

export const PartnerMilestoneClaimsScreen: React.FC<PartnerMilestoneClaimsScreenProps> = ({
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
  onNavigateToMilestoneUnlock
}) => {
  // Filter Tabs
  const [activeCategory, setActiveCategory] = useState<'all' | 'dispatched' | 'in-progress' | 'locked'>('all');
  
  // Simulator State: 'default' | 'eligible' | 'review' | 'approved' | 'all-delivered'
  const [simulatorState, setSimulatorState] = useState<'default' | 'eligible' | 'review' | 'approved' | 'all-delivered'>('default');

  // Modals state
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [selectedAssetForClaim, setSelectedAssetForClaim] = useState<string>('Ather 450X EV Scooter');
  const [shippingAddressInput, setShippingAddressInput] = useState<string>('Flat 402, Prestige Heights, Indiranagar, Bangalore, KA 560038');
  const [phoneInput, setPhoneInput] = useState<string>('+91 9876543210');
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>('m4');
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [claimSuccessAlert, setClaimSuccessAlert] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Tracking Modal
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [trackingData, setTrackingData] = useState<{
    asset: string;
    awb: string;
    carrier: string;
    estimatedDelivery: string;
  }>({
    asset: 'HP ProBook Laptop (Intel Core i5)',
    awb: 'REF-AIR-5A450',
    carrier: 'BlueDart Express Air Cargo',
    estimatedDelivery: 'Nov 18, 2024 (In 48 Hours)'
  });

  // Proof of Delivery Modal
  const [podModalOpen, setPodModalOpen] = useState(false);
  const [podData, setPodData] = useState<{
    asset: string;
    deliveredDate: string;
    carrierAwb: string;
    signedBy: string;
    serial: string;
  }>({
    asset: 'Partner Welcome Merch Kit (Tier 1)',
    deliveredDate: 'Oct 14, 2024',
    carrierAwb: 'BlueDart #88391023',
    signedBy: 'Growth Partner [DEV SAMPLE]',
    serial: 'REF-KIT-2025-SAMPLE'
  });

  // Criteria & Guidelines Modal
  const [criteriaModalOpen, setCriteriaModalOpen] = useState(false);
  const [criteriaData, setCriteriaData] = useState<{ title: string; count: number; desc: string }>({
    title: 'Apple iPhone 16 Pro Max',
    count: 500,
    desc: 'Requires 500 cumulative active salons with 30-day continuous heartbeat.'
  });

  // Fleet Guidelines Modal
  const [fleetModalOpen, setFleetModalOpen] = useState(false);
  
  // Velocity Tips Modal
  const [velocityTipsOpen, setVelocityTipsOpen] = useState(false);

  // Expansion Advisor Modal
  const [advisorModalOpen, setAdvisorModalOpen] = useState(false);
  const [advisorSubmitted, setAdvisorSubmitted] = useState(false);

  // Copied alert
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://nexora.network/join?ref=REF-5A45019655');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };



  const handleAuthorizeClaim = async () => {
    setIsAuthorizing(true);
    try {
      const partnerId = await partnerDbService.getCurrentPartnerId() || '00000000-0000-0000-0000-000000000000';
      await partnerDbService.claimMilestoneReward({
        partnerId,
        milestoneId: selectedMilestoneId,
        shippingAddress: shippingAddressInput,
        contactPhone: phoneInput
      });
      setIsAuthorizing(false);
      setClaimModalOpen(false);
      setSimulatorState('review');
      setClaimSuccessAlert(true);
      setTimeout(() => setClaimSuccessAlert(false), 6000);
    } catch (err: any) {
      setIsAuthorizing(false);
      showToast(err.message || 'Claim registration failed.');
    }
  };

  const openPodModal = (asset: string, deliveredDate: string, carrierAwb: string, signedBy: string, serial: string) => {
    setPodData({ asset, deliveredDate, carrierAwb, signedBy, serial });
    setPodModalOpen(true);
  };

  const openTracking = (asset: string, awb: string, carrier: string, est: string) => {
    setTrackingData({ asset, awb, carrier, estimatedDelivery: est });
    setTrackingModalOpen(true);
  };

  const openCriteria = (title: string, count: number, desc: string) => {
    setCriteriaData({ title, count, desc });
    setCriteriaModalOpen(true);
  };

  // Milestone list data
  const milestones = [
    {
      id: 1,
      tier: 'Tier 1',
      salons: 25,
      category: 'dispatched',
      title: 'Official Nexora Partner T-Shirt',
      subtitle: 'NEXORA SALONOS Branded Logo • 240 GSM Organic Cotton',
      image: nexoraTshirtImg,
      progressCount: 25,
      progressTarget: 25,
      percentage: 100,
      statusLabel: 'Delivered',
      statusColor: 'delivered',
      carrier: 'BlueDart #88391023',
      date: 'Oct 14, 2024',
      actionType: 'pod',
      serial: 'REF-KIT-2025-SAMPLE',
      recipient: 'Growth Partner [DEV SAMPLE]'
    },
    {
      id: 2,
      tier: 'Tier 2',
      salons: 50,
      category: 'dispatched',
      title: 'Samsung Galaxy Tab A9+',
      subtitle: '5G + 128GB • Nexora Suite Preloaded',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAz0YHtJsvxfCuJTieOwHVcjmef3XeGJdBV5aHewmye-m7TiHdwlTNTWJl8n_4puFKeG6Yu4OTJglF1J6YaM6SH4rPCS3571_oWMHi7YHaJtGGVNx50JC_GLCRTfBSePi4emohxcmieO823_Z_RRP-I8q8_dGPSGGJIc9QK_ERg4wa0kQBvX5cLz7HqvXY_2cn-Fw0gc-Ki1fA2WEgrneKkF92wUelo7sNh-5rB6LoYri_yxFkOwPme',
      progressCount: 50,
      progressTarget: 50,
      percentage: 100,
      statusLabel: 'Delivered',
      statusColor: 'delivered',
      carrier: 'Delhivery #449102938',
      date: 'Nov 02, 2024',
      actionType: 'pod',
      serial: 'IMEI: 35829104-99120-01',
      recipient: 'Growth Partner [DEV SAMPLE]'
    },
    {
      id: 3,
      tier: 'Tier 3',
      salons: 100,
      category: 'dispatched',
      title: 'HP OmniBook / ProBook AI Laptop (Latest Model)',
      subtitle: 'Intel Core Ultra 7 / i5 • 16GB RAM • 512GB SSD',
      image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80',
      progressCount: 100,
      progressTarget: 100,
      percentage: 100,
      statusLabel: 'In-Transit',
      statusColor: 'in-transit',
      carrier: 'BlueDart Express Air #REF-AIR-5A450',
      date: 'Est: Nov 18, 2024',
      actionType: 'tracking',
      serial: 'HP-OB-ULTRA7-2026-SAMPLE',
      recipient: 'Growth Partner [DEV SAMPLE]'
    },
    {
      id: 4,
      tier: 'Tier 4',
      salons: 250,
      category: simulatorState === 'all-delivered' ? 'dispatched' : 'in-progress',
      title: 'Ather 450X / Ola S1 Pro',
      subtitle: 'Flagship Electric Smart Scooter • 0-40km/h 3.3s',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD87ZVwdW0ZQTDSAj7TRrdxtiXhATovQLR4AMstn1hlM9bf_YI8AkJXu32RtYn6aZoYu3HVVSBMFoVVNkFJxOCzsiGTrjyC3fMVFFOzNP1sv9fUPE5qiEPj2dfxBc-OSoFOAMQs9mgCQ6RQsxVxzpxWMnB0c8axbclLzKjhdMpFh30IQoCx7CWoaVnL2BKAsHomYwTceriM0LCAzkskYXHxOoseHsq5gkAgyGlW9Gj4Zc5UX1ujWb0v',
      progressCount: simulatorState === 'eligible' || simulatorState === 'review' || simulatorState === 'approved' || simulatorState === 'all-delivered' ? 250 : 118,
      progressTarget: 250,
      percentage: simulatorState === 'eligible' || simulatorState === 'review' || simulatorState === 'approved' || simulatorState === 'all-delivered' ? 100 : 47.2,
      statusLabel: simulatorState === 'eligible' ? 'Eligible to Claim' : simulatorState === 'review' ? 'Under Review (48h)' : simulatorState === 'approved' ? 'Logistics Approved' : simulatorState === 'all-delivered' ? 'Delivered' : 'Active Goal',
      statusColor: simulatorState === 'eligible' ? 'eligible' : simulatorState === 'review' ? 'review' : simulatorState === 'approved' ? 'approved' : simulatorState === 'all-delivered' ? 'delivered' : 'active',
      remaining: simulatorState === 'eligible' || simulatorState === 'review' || simulatorState === 'approved' || simulatorState === 'all-delivered' ? 0 : 132,
      actionType: 'tier4-special'
    },
    {
      id: 5,
      tier: 'Tier 5',
      salons: 500,
      category: simulatorState === 'all-delivered' ? 'dispatched' : 'locked',
      title: 'iPhone 16 Pro Max',
      subtitle: '256GB Titanium • AppleCare+ Included',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpb1Oda_xLQlU4ytPLZ_4_KT80X4nzJoheyINoIf_8tWO8LC7yfiY16yuK7tCS6uyd9pwy9n0KioeoAv409MZGtmScM9dxuQJnstJkIXe5_FWLDy3n-jLqyW7JVre756_j7wkYqR_JxSBmihO8I62yAJ3XzNr1H1V_0YgezxzVvhEWPQmZGKRNH_7y_Nv7An8R27Vux_lqp-XqvM_gt3weEZNTKKwMvz3_XSof2Tf6uZvc1rn8HOvI',
      progressCount: simulatorState === 'all-delivered' ? 500 : 118,
      progressTarget: 500,
      percentage: simulatorState === 'all-delivered' ? 100 : 23.6,
      statusLabel: simulatorState === 'all-delivered' ? 'Delivered' : 'Locked',
      statusColor: simulatorState === 'all-delivered' ? 'delivered' : 'locked',
      remaining: simulatorState === 'all-delivered' ? 0 : 382,
      actionType: 'criteria',
      grantValue: 'Flagship Electronics Grant'
    },
    {
      id: 6,
      tier: 'Tier 6',
      salons: 750,
      category: simulatorState === 'all-delivered' ? 'dispatched' : 'locked',
      title: 'Royal Enfield Classic 350',
      subtitle: 'Chrome & Stealth Black • Full On-Road Local Showroom Handover',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyaJz_ASu4-x7k0myBEceY0p85BsDLCdNtcwNrJ5sGe-OxyAP73iB1LUKmA9TNIPRZTvs9kOTSISCBog7-sRKcWd_tDQMsT096rH-pHjeuZmU5-BXecEesu3G6LWtRrTawAtsiAFKIM9I8KhWQNXWFXfiBrL3nNxxljqsxXP6pBV6xctgUAJu538x2uyDV1w7rx7dFeqHBW7S2pjbNDpfmrZoZ5rjLksetCXgn5YcV-KM7xfUl4pjN',
      progressCount: simulatorState === 'all-delivered' ? 750 : 118,
      progressTarget: 750,
      percentage: simulatorState === 'all-delivered' ? 100 : 15.7,
      statusLabel: simulatorState === 'all-delivered' ? 'Delivered' : 'Locked',
      statusColor: simulatorState === 'all-delivered' ? 'delivered' : 'locked',
      remaining: simulatorState === 'all-delivered' ? 0 : 632,
      actionType: 'criteria',
      grantValue: 'Authorized Local Showroom Handover'
    },
    {
      id: 7,
      tier: 'Tier 7',
      salons: 1000,
      category: simulatorState === 'all-delivered' ? 'dispatched' : 'locked',
      title: 'District Partner SUV Car',
      subtitle: 'Mahindra XUV700 / Creta • Brand New Vehicle Handover',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
      progressCount: simulatorState === 'all-delivered' ? 1000 : 118,
      progressTarget: 1000,
      percentage: simulatorState === 'all-delivered' ? 100 : 11.8,
      statusLabel: simulatorState === 'all-delivered' ? 'Delivered' : 'Locked',
      statusColor: simulatorState === 'all-delivered' ? 'delivered' : 'locked',
      remaining: simulatorState === 'all-delivered' ? 0 : 882,
      actionType: 'criteria',
      grantValue: 'District Fleet Asset Grant + Lifetime Royalty'
    }
  ];

  const filteredMilestones = milestones.filter(m => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'dispatched') return m.category === 'dispatched';
    if (activeCategory === 'in-progress') return m.category === 'in-progress';
    if (activeCategory === 'locked') return m.category === 'locked';
    return true;
  });

  return (
    <div className="min-h-full bg-[#fcf9f4] text-[#1c1c19] flex flex-col">
      {/* Dynamic Success Alert Banner */}
      <AnimatePresence>
        {claimSuccessAlert && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mx-8 mt-4 p-4 rounded-xl bg-gradient-to-r from-[#b1005e] to-[#8e4767] text-white flex items-center justify-between shadow-lg"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#ffd9e2]" />
              <div>
                <h4 className="font-bold text-sm">Asset Claim Dispatched to Audit Queue!</h4>
                <p className="text-xs text-white/90">
                  Dispatch Order #NX-CLAIM-4402 has been queued for warehouse allocation. Verification window: 48 hours.
                </p>
              </div>
            </div>
            <button
              onClick={() => setClaimSuccessAlert(false)}
              className="text-white/80 hover:text-white p-1"
              type="button"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN BODY CONTAINER */}
      <main className="w-full mx-auto px-4 sm:px-8 lg:px-12 py-6 space-y-8 flex-1 pb-24 lg:pb-12">
          {/* Header Section with Breadcrumb & Operational Health */}
          <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-widest text-[#8e4767] font-bold">
                  Incentive Infrastructure
                </span>
                <span className="text-[#e1bdc6]">•</span>
                <span className="text-[11px] text-[#594047] font-semibold">Tier 4 Accelerator Target</span>
              </div>
              <div className="flex items-baseline gap-3">
                <h1 className="text-3xl font-extrabold text-[#1c1c19] tracking-tight">
                  Nexora Milestone Rewards &amp; Asset Claims
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#ffe088] text-[#241a00] text-xs font-bold tracking-wide">
                  Gold Tier
                </span>
              </div>
              <p className="text-sm text-[#594047] max-w-2xl mt-0.5">
                Audit-verified physical performance rewards for high-velocity Nexora partner expansion. All hardware units are dispatched via tamper-evident air freight.
              </p>
            </div>

            {/* Live Compliance & Verification Meta Badge */}
            <div className="flex items-center gap-3 bg-[#ffffff] p-3 px-4 rounded-xl shadow-xs border border-[#f0ede9]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#b1005e] animate-ping"></div>
              <div className="flex flex-col">
                <span className="text-[11px] text-[#1c1c19] font-bold uppercase tracking-wider">Telemetry Live</span>
                <span className="text-xs text-[#594047]">Heartbeat Audit: 118 Confirmed Nodes</span>
              </div>
              <div className="ml-2 text-[#b1005e] bg-[#b1005e]/10 p-1.5 rounded-lg">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
          </section>

          {/* CELEBRATORY PROMPT BANNER FOR MILESTONE 3 UNLOCK */}
          {onNavigateToMilestoneUnlock && (
            <div className="bg-gradient-to-r from-[#b1005e] via-[#d91b77] to-[#8e4767] p-4 lg:p-5 rounded-2xl text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shrink-0">
                  🎉
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-[#ffe088] text-[#241a00] text-[10px] font-extrabold uppercase tracking-wide">
                      UNLOCKED PROTOCOL
                    </span>
                    <span className="text-xs font-mono text-white/90">#VER-2024-NEX100</span>
                  </div>
                  <h3 className="text-base font-extrabold text-white mt-0.5">
                    Milestone 3 Unlocked! HP ProBook 15 G10 Business Laptop Ready
                  </h3>
                  <p className="text-xs text-white/90 mt-0.5">
                    100 qualified salon activation audits cleared. Review statutory consignee details and dispatch hardware.
                  </p>
                </div>
              </div>
              <button
                onClick={onNavigateToMilestoneUnlock}
                className="w-full md:w-auto px-5 py-2.5 rounded-full bg-white text-[#b1005e] font-extrabold text-xs shadow-md hover:bg-[#ffd9e2] transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5"
                type="button"
              >
                <span>Open Milestone 3 Claim Window</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* TOP EXECUTIVE METRIC BENTO GRID (4 Core High-Impact KPIs) */}
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {/* Metric 1: Total Verified Salons */}
            <div className="bg-[#ffffff] rounded-xl p-5 shadow-xs border border-[#f0ede9] flex flex-col justify-between relative overflow-hidden group hover:shadow-sm transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#594047] font-semibold">
                  Audited Deployments
                </span>
                <span className="w-9 h-9 rounded-lg bg-[#f0ede9] flex items-center justify-center text-[#b1005e]">
                  <Store className="w-5 h-5" />
                </span>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#1c1c19]">118</span>
                <span className="text-xs font-bold text-[#8e4767]">/ 250 goal</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-[#594047] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#b1005e]" /> 30+ Day Run-Rate
                </span>
                <span className="font-bold text-[#b1005e]">+14 this cycle</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#f0ede9]">
                <div className="h-full bg-[#b1005e] rounded-full" style={{ width: '47.2%' }}></div>
              </div>
            </div>

            {/* Metric 2: Next Hardware Target */}
            <div className="bg-[#ffffff] rounded-xl p-5 shadow-xs border border-[#f0ede9] flex flex-col justify-between relative overflow-hidden group hover:shadow-sm transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#594047] font-semibold">
                  Next Unlock: Tier 4
                </span>
                <span className="w-9 h-9 rounded-lg bg-[#fda4c9]/40 text-[#7a3656] flex items-center justify-center">
                  <Bike className="w-5 h-5" />
                </span>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#b1005e]">
                  {simulatorState === 'eligible' || simulatorState === 'review' || simulatorState === 'approved' || simulatorState === 'all-delivered' ? '0' : '132'}
                </span>
                <span className="text-xs font-semibold text-[#594047]">Salons Needed</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="font-semibold text-[#1c1c19]">Ather 450X EV</span>
                <span className="font-bold text-[#b1005e]">
                  {simulatorState === 'eligible' || simulatorState === 'review' || simulatorState === 'approved' || simulatorState === 'all-delivered' ? '100% Reached' : '47.2% Reached'}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#f0ede9]">
                <div
                  className="h-full bg-gradient-to-r from-[#8e4767] to-[#b1005e] rounded-full"
                  style={{ width: simulatorState === 'eligible' || simulatorState === 'review' || simulatorState === 'approved' || simulatorState === 'all-delivered' ? '100%' : '47.2%' }}
                ></div>
              </div>
            </div>

            {/* Metric 3: Total Assets Claimed & In-Transit */}
            <div className="bg-[#ffffff] rounded-xl p-5 shadow-xs border border-[#f0ede9] flex flex-col justify-between relative overflow-hidden group hover:shadow-sm transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#594047] font-semibold">
                  Hardware Delivered
                </span>
                <span className="w-9 h-9 rounded-lg bg-[#ebe8e3] text-[#1c1c19] flex items-center justify-center">
                  <Truck className="w-5 h-5 text-[#8e4767]" />
                </span>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#1c1c19]">
                  {simulatorState === 'all-delivered' ? '7' : '3'} <span className="text-lg font-semibold text-[#594047]">/ 7</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#ffd9e2] text-[#3e001d] text-[11px] font-bold">
                  {simulatorState === 'all-delivered' ? 'Completed' : '1 in Transit'}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-[#594047]">T-Shirt, Tablet, ProBook</span>
                <span className="font-bold text-[#1c1c19]">100% SLA Score</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#f0ede9]">
                <div
                  className="h-full bg-[#8e4767] rounded-full"
                  style={{ width: simulatorState === 'all-delivered' ? '100%' : '42.8%' }}
                ></div>
              </div>
            </div>

            {/* Metric 4: Compliance & Custody Assurance */}
            <div className="bg-[#ffffff] rounded-xl p-5 shadow-xs border border-[#f0ede9] flex flex-col justify-between relative overflow-hidden group hover:shadow-sm transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#594047] font-semibold">
                  Regulatory Protocol
                </span>
                <span className="w-9 h-9 rounded-lg bg-[#e9c349]/30 text-[#241a00] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-[#735c00]" />
                </span>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-xl font-bold text-[#1c1c19] tracking-tight">Zero-Encashment</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-[#594047]">194R Compliant</span>
                <span className="px-2 py-0.5 rounded bg-[#ebe8e3] text-[#1c1c19] font-bold">ISO 9001:2015</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#f0ede9]">
                <div className="h-full bg-[#cca730] rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
          </section>

          {/* INTERACTIVE LIFECYCLE SIMULATOR BAR & FILTER TABS */}
          <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#f6f3ee] p-3.5 rounded-xl border border-[#e5e2dd]">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-[#d91b77] text-white shadow-xs'
                    : 'bg-[#ffffff] text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19]'
                }`}
                type="button"
              >
                All 7 Milestones (7)
              </button>
              <button
                onClick={() => setActiveCategory('dispatched')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === 'dispatched'
                    ? 'bg-[#d91b77] text-white shadow-xs'
                    : 'bg-[#ffffff] text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19]'
                }`}
                type="button"
              >
                Claimed &amp; Dispatched (3)
              </button>
              <button
                onClick={() => setActiveCategory('in-progress')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === 'in-progress'
                    ? 'bg-[#d91b77] text-white shadow-xs'
                    : 'bg-[#ffffff] text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19]'
                }`}
                type="button"
              >
                Active Target (1)
              </button>
              <button
                onClick={() => setActiveCategory('locked')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === 'locked'
                    ? 'bg-[#d91b77] text-white shadow-xs'
                    : 'bg-[#ffffff] text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19]'
                }`}
                type="button"
              >
                Locked Goals (3)
              </button>
            </div>

            {/* State Simulator Controller (Interactive state preview selector) */}
            <div className="flex items-center gap-2 bg-[#ffffff] px-3.5 py-2 rounded-lg shadow-xs border border-[#f0ede9]">
              <Sliders className="w-4 h-4 text-[#b1005e]" />
              <span className="text-[11px] uppercase tracking-wider text-[#594047] font-bold whitespace-nowrap">
                Lifecycle Simulator:
              </span>
              <select
                value={simulatorState}
                onChange={(e) => setSimulatorState(e.target.value as any)}
                className="bg-transparent text-xs text-[#1c1c19] font-bold focus:outline-none cursor-pointer pr-2"
              >
                <option value="default">Default Live State (118 Salons)</option>
                <option value="eligible">Preview: Eligible to Claim (250/250 - 100%)</option>
                <option value="review">Preview: Under Review (48h Audit)</option>
                <option value="approved">Preview: Logistics Approved (Carrier Staged)</option>
                <option value="all-delivered">Preview: All 7 Completed</option>
              </select>
            </div>
          </section>

          {/* INTERACTIVE ELIGIBLE CLAIM HIGHLIGHT BANNER (Shows when state is 'eligible') */}
          <AnimatePresence>
            {simulatorState === 'eligible' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-gradient-to-r from-[#d91b77] via-[#b1005e] to-[#8e4767] text-white p-6 rounded-xl shadow-lg relative overflow-hidden"
              >
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white text-[#b1005e] flex items-center justify-center font-bold shadow-md">
                      <Gift className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#ffe088] text-[#241a00] text-[11px] font-bold uppercase">
                          Milestone Reached!
                        </span>
                        <span className="text-xs text-white/90">Audit Passed • 250 / 250 Nodes Active</span>
                      </div>
                      <h2 className="text-lg font-bold mt-0.5">Ather 450X EV Scooter Ready for Claim Allocation</h2>
                      <p className="text-xs text-white/90 mt-0.5">
                        Please confirm your regional delivery depot &amp; authorized Aadhaar/PAN signatory for insurance registration.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedAssetForClaim('Ather 450X EV Scooter');
                      setClaimModalOpen(true);
                    }}
                    className="px-5 py-2.5 rounded-full bg-white text-[#b1005e] text-xs font-bold hover:bg-[#f6f3ee] shadow-md transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
                    type="button"
                  >
                    <span>Instant OTP Claim Authorization</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* MILESTONE PROGRESSION MAP / VISUAL CONNECTOR TRACKER */}
          <section className="bg-[#ffffff] p-6 rounded-xl shadow-xs border border-[#f0ede9]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wider text-[#8e4767] font-bold">
                  Partner Ladder Architecture
                </span>
                <h2 className="text-lg font-bold text-[#1c1c19]">Growth Milestone Journey</h2>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-[#f0ede9] text-[#594047] font-bold">
                Current Speed: +3.2 Salons/Day
              </span>
            </div>

            {/* Stepper Multi-node Bar */}
            <div className="relative flex items-center justify-between w-full overflow-x-auto pb-4 pt-2">
              {/* Background Track Line */}
              <div className="absolute left-6 right-6 top-5 h-1 bg-[#ebe8e3] -z-0"></div>
              {/* Filled Track Line */}
              <div
                className="absolute left-6 top-5 h-1 bg-gradient-to-r from-[#b1005e] to-[#8e4767] -z-0 transition-all duration-500"
                style={{
                  width:
                    simulatorState === 'all-delivered'
                      ? '100%'
                      : simulatorState === 'eligible' || simulatorState === 'review' || simulatorState === 'approved'
                      ? '55%'
                      : '48%'
                }}
              ></div>

              {/* Node 1: T-Shirt (25) */}
              <div className="flex flex-col items-center relative z-10 min-w-[100px] text-center">
                <div className="w-10 h-10 rounded-full bg-[#b1005e] text-white flex items-center justify-center shadow-md">
                  <Check className="w-5 h-5" />
                </div>
                <span className="mt-2 text-xs font-bold text-[#1c1c19]">25 Salons</span>
                <span className="text-[11px] text-[#b1005e] font-semibold">T-Shirt Kit</span>
              </div>

              {/* Node 2: Samsung Tab (50) */}
              <div className="flex flex-col items-center relative z-10 min-w-[100px] text-center">
                <div className="w-10 h-10 rounded-full bg-[#b1005e] text-white flex items-center justify-center shadow-md">
                  <Check className="w-5 h-5" />
                </div>
                <span className="mt-2 text-xs font-bold text-[#1c1c19]">50 Salons</span>
                <span className="text-[11px] text-[#b1005e] font-semibold">Samsung Tab</span>
              </div>

              {/* Node 3: HP Laptop (100) */}
              <div className="flex flex-col items-center relative z-10 min-w-[100px] text-center">
                <div className="w-10 h-10 rounded-full bg-[#b1005e] text-white flex items-center justify-center shadow-md">
                  <Truck className="w-4 h-4" />
                </div>
                <span className="mt-2 text-xs font-bold text-[#1c1c19]">100 Salons</span>
                <span className="text-[11px] text-[#8e4767] font-semibold">HP ProBook</span>
              </div>

              {/* Node 4: Scooter (250) - ACTIVE */}
              <div className="flex flex-col items-center relative z-10 min-w-[100px] text-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                    simulatorState === 'eligible' || simulatorState === 'review' || simulatorState === 'approved' || simulatorState === 'all-delivered'
                      ? 'bg-[#b1005e] text-white'
                      : 'bg-white text-[#b1005e] ring-4 ring-[#d91b77]/30 animate-pulse'
                  }`}
                >
                  <Bike className="w-5 h-5" />
                </div>
                <span className="mt-2 text-xs font-bold text-[#b1005e]">250 Salons</span>
                <span className="text-[11px] text-[#1c1c19] font-bold">EV Scooter</span>
              </div>

              {/* Node 5: iPhone 16 Pro Max (500) */}
              <div
                className={`flex flex-col items-center relative z-10 min-w-[100px] text-center ${
                  simulatorState === 'all-delivered' ? '' : 'opacity-60'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    simulatorState === 'all-delivered'
                      ? 'bg-[#b1005e] text-white'
                      : 'bg-[#f0ede9] text-[#8d6f77]'
                  }`}
                >
                  {simulatorState === 'all-delivered' ? <Check className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
                </div>
                <span className="mt-2 text-xs font-bold text-[#594047]">500 Salons</span>
                <span className="text-[11px] text-[#594047]">iPhone Pro Max</span>
              </div>

              {/* Node 6: Royal Enfield (750) */}
              <div
                className={`flex flex-col items-center relative z-10 min-w-[100px] text-center ${
                  simulatorState === 'all-delivered' ? '' : 'opacity-60'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    simulatorState === 'all-delivered'
                      ? 'bg-[#b1005e] text-white'
                      : 'bg-[#f0ede9] text-[#8d6f77]'
                  }`}
                >
                  {simulatorState === 'all-delivered' ? <Check className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
                </div>
                <span className="mt-2 text-xs font-bold text-[#594047]">750 Salons</span>
                <span className="text-[11px] text-[#594047]">Bullet 350cc</span>
              </div>

              {/* Node 7: Mahindra SUV (1000) */}
              <div
                className={`flex flex-col items-center relative z-10 min-w-[100px] text-center ${
                  simulatorState === 'all-delivered' ? '' : 'opacity-60'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    simulatorState === 'all-delivered'
                      ? 'bg-[#cca730] text-white'
                      : 'bg-[#f0ede9] text-[#735c00]'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="mt-2 text-xs font-bold text-[#594047]">1,000+ Salons</span>
                <span className="text-[11px] text-[#735c00] font-bold">Mahindra SUV</span>
              </div>
            </div>
          </section>

          {/* 7 COMPREHENSIVE MILESTONE CARDS GRID */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#1c1c19]">Detailed Asset Inventory &amp; Dispatch Log</h2>
                <p className="text-xs text-[#594047]">
                  Each incentive is governed by verified QR merchant integration telemetry.
                </p>
              </div>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#f0ede9] hover:bg-[#ebe8e3] text-[#1c1c19] text-xs font-bold transition-colors cursor-pointer"
                type="button"
              >
                <Download className="w-4 h-4" />
                <span>Export Dispatch Dossier</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredMilestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className="bg-[#ffffff] rounded-xl p-6 shadow-xs border border-[#f0ede9] flex flex-col justify-between group hover:shadow-md transition-all"
                >
                  <div>
                    {/* Header Badges */}
                    <div className="flex items-start justify-between gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#f0ede9] text-[#8e4767] text-[11px] font-bold uppercase tracking-wider">
                        {milestone.tier} • {milestone.salons} Salons
                      </span>
                      {milestone.statusLabel === 'Delivered' ? (
                        <span className="px-2.5 py-1 rounded-full bg-[#fda4c9]/40 text-[#7a3656] text-[11px] font-bold flex items-center gap-1">
                          <CheckCheck className="w-3.5 h-3.5" /> Delivered
                        </span>
                      ) : milestone.statusLabel === 'In-Transit' ? (
                        <span className="px-2.5 py-1 rounded-full bg-[#b1005e] text-white text-[11px] font-bold flex items-center gap-1 animate-pulse">
                          <Truck className="w-3.5 h-3.5" /> In-Transit
                        </span>
                      ) : milestone.statusLabel === 'Eligible to Claim' ? (
                        <span className="px-2.5 py-1 rounded-full bg-[#d91b77] text-white text-[11px] font-bold flex items-center gap-1 animate-bounce">
                          <Sparkles className="w-3.5 h-3.5" /> Ready to Claim
                        </span>
                      ) : milestone.statusLabel === 'Under Review (48h)' ? (
                        <span className="px-2.5 py-1 rounded-full bg-[#ffe088] text-[#241a00] text-[11px] font-bold flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> Under Review
                        </span>
                      ) : milestone.statusLabel === 'Logistics Approved' ? (
                        <span className="px-2.5 py-1 rounded-full bg-[#fda4c9] text-[#7a3656] text-[11px] font-bold flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5" /> Approved
                        </span>
                      ) : milestone.statusLabel === 'Active Goal' ? (
                        <span className="px-2.5 py-1 rounded-full bg-[#ffd9e2] text-[#3e001d] text-[11px] font-bold flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#b1005e] animate-pulse"></span> Active Goal
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-[#ebe8e3] text-[#8d6f77] text-[11px] font-bold flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5" /> Locked
                        </span>
                      )}
                    </div>

                    {/* Image & Asset Title */}
                    <div className="mt-4 flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#f0ede9] flex-shrink-0 border border-[#e5e2dd]">
                        <img
                          src={milestone.image}
                          alt={milestone.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-[#1c1c19]">{milestone.title}</h3>
                        <span className="text-xs text-[#594047]">{milestone.subtitle}</span>
                      </div>
                    </div>

                    {/* Progress Bar Details */}
                    <div className="mt-5 space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-[#594047]">
                          {milestone.statusLabel === 'In-Transit' ? 'Audit Cleared' : 'Qualified Onboarding'}
                        </span>
                        <span className="font-bold text-[#1c1c19]">
                          {milestone.progressCount} / {milestone.progressTarget} ({milestone.percentage}%)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#f0ede9] overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#8e4767] to-[#b1005e] rounded-full transition-all duration-500"
                          style={{ width: `${milestone.percentage}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Audit / Logistics Metadata Box */}
                    <div className="mt-4 p-3 rounded-lg bg-[#f6f3ee] border border-[#e5e2dd] flex flex-col gap-1 text-xs">
                      {milestone.carrier && (
                        <div className="flex items-center justify-between text-[#1c1c19]">
                          <span className="text-[#594047]">Carrier &amp; AWB:</span>
                          <span className="font-mono font-bold">{milestone.carrier}</span>
                        </div>
                      )}
                      {milestone.date && (
                        <div className="flex items-center justify-between text-[#1c1c19]">
                          <span className="text-[#594047]">Date / SLA:</span>
                          <span className="font-semibold">{milestone.date}</span>
                        </div>
                      )}
                      {milestone.remaining !== undefined && milestone.remaining > 0 && (
                        <div className="flex items-center justify-between text-[#1c1c19]">
                          <span className="text-[#594047]">Remaining Salons:</span>
                          <span className="font-bold text-[#b1005e]">{milestone.remaining} Verified Nodes</span>
                        </div>
                      )}
                      {milestone.grantValue && (
                        <div className="flex items-center justify-between text-[#1c1c19]">
                          <span className="text-[#594047]">Reward Category:</span>
                          <span className="font-semibold">{milestone.grantValue}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Action Button */}
                  <div className="mt-6 pt-4 border-t border-[#f0ede9]">
                    {milestone.actionType === 'pod' ? (
                      <button
                        onClick={() =>
                          openPodModal(
                            milestone.title,
                            milestone.date || 'Oct 2024',
                            milestone.carrier || 'Direct Depot',
                            milestone.recipient || 'Growth Partner [DEV SAMPLE]',
                            milestone.serial || 'NX-SLA-001'
                          )
                        }
                        className="w-full py-2.5 px-4 rounded-xl bg-[#f0ede9] hover:bg-[#ebe8e3] text-[#1c1c19] text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        type="button"
                      >
                        <FileText className="w-4 h-4 text-[#8e4767]" />
                        <span>View Delivery Receipt &amp; POD</span>
                      </button>
                    ) : milestone.actionType === 'tracking' ? (
                      <button
                        onClick={() =>
                          openTracking(
                            milestone.title,
                            '#NX-AIR-99201',
                            'BlueDart Express Air Cargo',
                            'In 48 Hours (Nov 18)'
                          )
                        }
                        className="w-full py-2.5 px-4 rounded-xl bg-[#b1005e] text-white hover:bg-[#d91b77] text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                        type="button"
                      >
                        <Truck className="w-4 h-4" />
                        <span>Track Courier Telemetry Live</span>
                      </button>
                    ) : milestone.actionType === 'tier4-special' ? (
                      <div className="flex flex-col gap-2">
                        {simulatorState === 'eligible' ? (
                          <button
                            onClick={() => {
                              setSelectedAssetForClaim('Ather 450X EV Scooter');
                              setClaimModalOpen(true);
                            }}
                            className="w-full py-2.5 px-4 rounded-xl bg-[#d91b77] text-white hover:bg-[#b1005e] text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                            type="button"
                          >
                            <Sparkles className="w-4 h-4" />
                            <span>Claim Now: Milestone Achieved!</span>
                          </button>
                        ) : simulatorState === 'review' ? (
                          <button
                            disabled
                            className="w-full py-2.5 px-4 rounded-xl bg-[#ffe088] text-[#241a00] text-xs font-bold flex items-center justify-center gap-2"
                            type="button"
                          >
                            <Clock className="w-4 h-4" />
                            <span>Under Review (SLA: 48h Audit)</span>
                          </button>
                        ) : simulatorState === 'approved' ? (
                          <button
                            disabled
                            className="w-full py-2.5 px-4 rounded-xl bg-[#fda4c9] text-[#7a3656] text-xs font-bold flex items-center justify-center gap-2"
                            type="button"
                          >
                            <Truck className="w-4 h-4" />
                            <span>Approved • Awaiting Carrier Pickup</span>
                          </button>
                        ) : (
                          <button
                            disabled
                            className="w-full py-2.5 px-4 rounded-xl bg-[#f0ede9] text-[#8d6f77] text-xs font-bold cursor-not-allowed flex items-center justify-center gap-2"
                            type="button"
                          >
                            <Lock className="w-4 h-4" />
                            <span>Locked: Need 132 More Salons</span>
                          </button>
                        )}
                        <button
                          onClick={() => setVelocityTipsOpen(true)}
                          className="w-full py-1 text-center text-[#b1005e] hover:text-[#d91b77] text-xs font-bold transition-colors cursor-pointer"
                          type="button"
                        >
                          View Regional Acceleration Playbook →
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          openCriteria(
                            milestone.title,
                            milestone.salons,
                            `Requires ${milestone.salons} verified salon onboardings with active QR volume.`
                          )
                        }
                        className="w-full py-2.5 px-4 rounded-xl bg-[#f0ede9] hover:bg-[#ebe8e3] text-[#1c1c19] text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        type="button"
                      >
                        <Info className="w-4 h-4 text-[#8d6f77]" />
                        <span>View Milestone Criteria</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* CARD 7: Tier 7 - Mahindra XUV700 / Tata Harrier SUV (ELITE PINNACLE HERO BANNER) */}
            <div className="bg-gradient-to-br from-[#ffffff] via-[#f6f3ee] to-[#ffe088]/20 rounded-xl p-6 shadow-sm border border-[#e5e2dd] flex flex-col lg:flex-row items-center justify-between gap-6 group hover:shadow-md transition-all">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                <div className="w-36 h-28 rounded-xl overflow-hidden bg-[#f0ede9] flex-shrink-0 border border-[#e5e2dd]">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDW0FCTadox8R1WQKiEQ5a_bTQcTrLIIry9-gKN8Q8blaR0hK_JCqIwxPqe8JTfLcApOwxat0bTfD4lPDJimgteXudsRp0sjKpGvCVNwLF8fETJwxnFYjg97V7TZGOOpX_Mwl6x10JjI7im1F1E72AsEta4O9zbBzNCQ2R7yaf4MjnWzUfftEtODOzKt0GOE8_Olzo52NGx7fhvDhDVTRiArxuQbQ2ou67sh6TES0FujcaEWmgVg86I"
                    alt="Mahindra XUV700 Luxury SUV"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#ffe088] text-[#241a00] text-[11px] font-bold uppercase tracking-wider">
                      Tier 7 • Pinnacle Landmark
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#ebe8e3] text-[#1c1c19] text-[11px] font-bold flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-[#cca730]" /> District Fleet Grant
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1c1c19] mt-1">
                    District Partner Mahindra XUV700 / Tata Harrier SUV
                  </h3>
                  <p className="text-xs text-[#594047] max-w-2xl mt-1">
                    Top-spec luxury executive SUV awarded upon securing 1,000 verified, active merchant nodes across designated commercial districts. Includes comprehensive partner maintenance pack and official partner livery option.
                  </p>
                  <div className="mt-4 flex items-center gap-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-extrabold text-[#1c1c19]">
                        {simulatorState === 'all-delivered' ? '1,000' : '118'}
                      </span>
                      <span className="text-xs text-[#594047]">/ 1,000 (11.8%)</span>
                    </div>
                    <div className="w-48 h-2 rounded-full bg-[#f0ede9] overflow-hidden">
                      <div
                        className="h-full bg-[#cca730] rounded-full"
                        style={{ width: simulatorState === 'all-delivered' ? '100%' : '11.8%' }}
                      ></div>
                    </div>
                    <span className="text-xs text-[#8e4767] font-bold">
                      {simulatorState === 'all-delivered' ? 'Pinnacle Reached' : '882 Salons to Elite Tier'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
                <button
                  onClick={() => setFleetModalOpen(true)}
                  className="px-6 py-3 rounded-xl bg-[#ebe8e3] hover:bg-[#e5e2dd] text-[#1c1c19] text-xs font-bold transition-all whitespace-nowrap flex items-center justify-center gap-2 cursor-pointer"
                  type="button"
                >
                  <FileText className="w-4 h-4 text-[#8e4767]" />
                  <span>Fleet Contract Guidelines</span>
                </button>
                <button
                  onClick={() => setAdvisorModalOpen(true)}
                  className="px-6 py-3 rounded-xl bg-[#b1005e] text-white hover:bg-[#d91b77] text-xs font-bold transition-all shadow-md whitespace-nowrap flex items-center justify-center gap-2 cursor-pointer"
                  type="button"
                >
                  <Users className="w-4 h-4" />
                  <span>Request Territory Expansion Support</span>
                </button>
              </div>
            </div>
          </section>

          {/* NEXORA ASSET DISTRIBUTION & REGULATORY TERMS (SECTION 194R) */}
          <section className="bg-[#ffffff] rounded-xl p-6 shadow-xs border border-[#f0ede9]">
            <div className="flex items-center justify-between border-b border-[#f0ede9] pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ffd9e2] text-[#3e001d] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5 text-[#b1005e]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#1c1c19]">
                    Nexora Asset Distribution &amp; Regulatory Terms
                  </h2>
                  <span className="text-xs text-[#594047]">
                    Compliance SLA: ISO 9001:2015 Registered • Strict Performance Incentives
                  </span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#f0ede9] text-[#594047] text-xs font-bold">
                Updated Nov 2024
              </span>
            </div>

            {/* STRICT ANTI-ENCASHMENT DISCLAIMER BANNER */}
            <div className="p-4 rounded-xl bg-[#d91b77]/10 border border-[#d91b77]/20 mb-6 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#b1005e] flex-shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#b1005e] tracking-wide uppercase">
                  Strict Anti-Encashment Mandate
                </span>
                <p className="text-xs text-[#1c1c19] mt-0.5 font-medium leading-relaxed">
                  <strong>No Cash Alternative or Unconditional Disbursal:</strong> Milestone assets are strictly physical performance incentive grants and cannot under any circumstance be converted to cash, cryptocurrency, or credited toward partner commission ledgers.
                </p>
              </div>
            </div>

            {/* 3 Key Compliance Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-lg bg-[#f6f3ee] border border-[#e5e2dd] flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#1c1c19] text-xs font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#8e4767]" />
                  <span>30-Day Terminal Heartbeat</span>
                </div>
                <p className="text-xs text-[#594047] leading-relaxed">
                  Each qualifying salon entity must maintain active terminal heartbeat for at least 30 consecutive calendar days with a minimum of 10 genuine patron settlements to satisfy anti-fraud velocity gates.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#f6f3ee] border border-[#e5e2dd] flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#1c1c19] text-xs font-bold">
                  <Receipt className="w-4 h-4 text-[#735c00]" />
                  <span>Section 194R TDS Direct Compliance</span>
                </div>
                <p className="text-xs text-[#594047] leading-relaxed">
                  Physical asset awards conform directly to Indian / Statutory Section 194R TDS guidelines on business perquisites. TDS certificates (Form 16A) are issued digitally at quarter end.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#f6f3ee] border border-[#e5e2dd] flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#1c1c19] text-xs font-bold">
                  <Lock className="w-4 h-4 text-[#b1005e]" />
                  <span>Audit Lock &amp; Title Transfer</span>
                </div>
                <p className="text-xs text-[#594047] leading-relaxed">
                  Vehicles &amp; high-value computing assets are titled directly in the accredited Growth Partner's registered business or personal PAN name with comprehensive factory warranty handover.
                </p>
              </div>
            </div>

            {/* Documents That May Be Required Before Reward Release */}
            <div className="mt-6 pt-6 border-t border-[#e5e2dd] space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#b1005e]" />
                <h4 className="font-bold text-sm text-[#1c1c19]">
                  Reward Release से पहले Growth Partner से मांगे जा सकने वाले Documents
                </h4>
                <span className="text-xs text-[#8d6f77] font-medium hidden sm:inline">
                  (Documents That May Be Required Before Reward Release)
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#b1005e] shrink-0" />
                  <span className="font-bold text-[#1c1c19]">PAN</span>
                </div>

                <div className="p-3 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#b1005e] shrink-0" />
                  <span className="font-bold text-[#1c1c19]">Aadhaar या Valid Identity Proof</span>
                </div>

                <div className="p-3 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#b1005e] shrink-0" />
                  <span className="font-bold text-[#1c1c19]">Address Proof</span>
                </div>

                <div className="p-3 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#b1005e] shrink-0" />
                  <span className="font-bold text-[#1c1c19]">Photograph</span>
                </div>

                <div className="p-3 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#b1005e] shrink-0" />
                  <span className="font-bold text-[#1c1c19]">Bank Details, जहाँ Required हों</span>
                </div>

                <div className="p-3 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#b1005e] shrink-0" />
                  <span className="font-bold text-[#1c1c19]">Driving Licence — Vehicle Rewards के लिए</span>
                </div>

                <div className="p-3 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#b1005e] shrink-0" />
                  <span className="font-bold text-[#1c1c19]">Tax Declaration</span>
                </div>

                <div className="p-3 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#b1005e] shrink-0" />
                  <span className="font-bold text-[#1c1c19]">Reward Acceptance Form</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] space-y-2 text-xs text-[#594047]">
                <p className="leading-relaxed">
                  <strong>Reward release से पहले applicable verification, documentation और compliance requirements पूरी करना आवश्यक हो सकता है। Required documents reward type, eligibility और applicable requirements के अनुसार अलग-अलग हो सकते हैं।</strong>
                </p>
                <div className="pt-2 border-t border-[#e5e2dd] flex flex-col gap-0.5">
                  <p className="font-bold text-[#1c1c19]">
                    Final tax responsibility signed Growth Partner Agreement में clearly लिखी जाए।
                  </p>
                  <p className="text-[11px] text-[#8d6f77] font-semibold">
                    Final tax responsibility must be clearly stated in the signed Growth Partner Agreement.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      
      {/* MODAL 1: INSTANT OTP CLAIM MODAL */}
      <AnimatePresence>
        {claimModalOpen && (
          <div className="fixed inset-0 bg-[#31302d]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#ffffff] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-[#f0ede9]"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#f0ede9]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#ffd9e2] flex items-center justify-center text-[#b1005e]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-base font-bold text-[#1c1c19]">Confirm Physical Asset Claim</span>
                </div>
                <button
                  onClick={() => setClaimModalOpen(false)}
                  className="text-[#594047] hover:text-[#1c1c19] p-1"
                  type="button"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-4">
                <div className="p-4 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd]">
                  <span className="text-[11px] text-[#594047] uppercase font-bold">Claiming Asset:</span>
                  <h4 className="text-lg font-bold text-[#b1005e]">{selectedAssetForClaim}</h4>
                  <p className="text-xs text-[#594047] mt-1">
                    Recipient: <strong>Growth Partner [DEV SAMPLE] (REF-5A45019655)</strong> • Delivery Address: Flat 402, Prestige Heights, Indiranagar, Bangalore, KA 560038.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1c1c19] mb-1">
                      Shipping Address (Detailed)
                    </label>
                    <textarea
                      rows={2}
                      value={shippingAddressInput}
                      onChange={(e) => setShippingAddressInput(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-[#f6f3ee] text-xs text-[#1c1c19] border border-[#e5e2dd] focus:ring-2 focus:ring-[#b1005e] focus:outline-none"
                      placeholder="Enter exact delivery address with pin code"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1c1c19] mb-1">
                      Contact Phone Number
                    </label>
                    <input
                      type="text"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-[#f6f3ee] text-xs text-[#1c1c19] border border-[#e5e2dd] focus:ring-2 focus:ring-[#b1005e] focus:outline-none"
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#ebe8e3] text-xs text-[#1c1c19] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#b1005e] flex-shrink-0" />
                  <span>
                    By clicking authorize, you consent to statutory asset allocation under Nexora Partner Terms &amp; Section 194R.
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-[#f0ede9]">
                <button
                  onClick={() => setClaimModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#f0ede9] hover:bg-[#ebe8e3] text-[#1c1c19] text-xs font-bold cursor-pointer"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAuthorizeClaim}
                  disabled={isAuthorizing}
                  className="px-6 py-2.5 rounded-lg bg-[#b1005e] hover:bg-[#d91b77] text-white text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer"
                  type="button"
                >
                  {isAuthorizing ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Authorizing...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Authorize Claim &amp; Dispatch</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: TELEMETRY & LIVE COURIER TRACKER */}
      <AnimatePresence>
        {trackingModalOpen && (
          <div className="fixed inset-0 bg-[#31302d]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#ffffff] rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-[#f0ede9]"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#f0ede9]">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#b1005e]" />
                  <span className="text-base font-bold text-[#1c1c19]">Dispatch Telemetry Live</span>
                </div>
                <button
                  onClick={() => setTrackingModalOpen(false)}
                  className="text-[#594047] hover:text-[#1c1c19] p-1"
                  type="button"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-4">
                <div className="p-3.5 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd]">
                  <span className="text-[11px] text-[#594047] uppercase font-bold">Air Waybill Telemetry:</span>
                  <span className="text-sm font-mono font-bold text-[#b1005e] block">{trackingData.awb}</span>
                  <span className="text-xs text-[#1c1c19] font-bold mt-0.5 block">{trackingData.asset}</span>
                  <span className="text-[11px] text-[#594047]">{trackingData.carrier}</span>
                </div>

                {/* Vertical Timeline Checkpoints */}
                <div className="space-y-4 pl-3 border-l-2 border-[#b1005e] ml-3 text-xs">
                  <div className="relative pl-4">
                    <span className="absolute -left-[19px] top-0 w-3 h-3 rounded-full bg-[#b1005e] ring-4 ring-[#ffd9e2]"></span>
                    <span className="font-bold text-[#b1005e]">In-Transit to Final Distribution Depot</span>
                    <p className="text-[#594047] text-[11px]">Bangalore Airport Cargo Terminal • Nov 16, 18:24 IST</p>
                  </div>
                  <div className="relative pl-4">
                    <span className="absolute -left-[19px] top-0 w-3 h-3 rounded-full bg-[#8e4767]"></span>
                    <span className="font-bold text-[#1c1c19]">Customs &amp; Serial Clearance Passed</span>
                    <p className="text-[#594047] text-[11px]">Mumbai Tech Hub Depot • Nov 15, 11:10 IST</p>
                  </div>
                  <div className="relative pl-4">
                    <span className="absolute -left-[19px] top-0 w-3 h-3 rounded-full bg-[#8e4767]"></span>
                    <span className="font-bold text-[#1c1c19]">Dispatched by Nexora Central Logistics</span>
                    <p className="text-[#594047] text-[11px]">Package ID #HP-99120-BLR • Nov 14, 09:30 IST</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setTrackingModalOpen(false)}
                  className="w-full py-2.5 rounded-lg bg-[#f0ede9] hover:bg-[#ebe8e3] text-[#1c1c19] text-xs font-bold cursor-pointer"
                  type="button"
                >
                  Close Telemetry View
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 3: PROOF OF DELIVERY (POD) DOSSIER */}
      <AnimatePresence>
        {podModalOpen && (
          <div className="fixed inset-0 bg-[#31302d]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#ffffff] rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-[#f0ede9]"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#f0ede9]">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#8e4767]" />
                  <span className="text-base font-bold text-[#1c1c19]">Proof of Delivery (POD) Dossier</span>
                </div>
                <button
                  onClick={() => setPodModalOpen(false)}
                  className="text-[#594047] hover:text-[#1c1c19] p-1"
                  type="button"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#f6f3ee] border border-[#e5e2dd] space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-[#594047]">Asset Handed Over:</span>
                    <span className="font-bold text-[#1c1c19]">{podData.asset}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#594047]">Delivered Date:</span>
                    <span className="font-semibold text-[#1c1c19]">{podData.deliveredDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#594047]">Carrier &amp; Consignment:</span>
                    <span className="font-mono font-bold text-[#b1005e]">{podData.carrierAwb}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#594047]">Signature on File:</span>
                    <span className="font-semibold text-[#1c1c19]">{podData.signedBy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#594047]">Audit Serial ID:</span>
                    <span className="font-mono text-[#594047]">{podData.serial}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#fda4c9]/20 border border-[#fda4c9]/40 flex items-center gap-2 text-[#7a3656]">
                  <CheckCheck className="w-4 h-4 text-[#b1005e] flex-shrink-0" />
                  <span>Immutable Hash Confirmed on Nexora Asset Vault Ledger (Tx #0x892a...f41).</span>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <button
                  onClick={() => {
                    showToast('Official PDF POD document has been saved to your downloads.');
                    setPodModalOpen(false);
                  }}
                  className="flex-1 py-2.5 rounded-lg bg-[#b1005e] text-white hover:bg-[#d91b77] text-xs font-bold shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                  type="button"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Signed POD</span>
                </button>
                <button
                  onClick={() => setPodModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg bg-[#f0ede9] hover:bg-[#ebe8e3] text-[#1c1c19] text-xs font-bold cursor-pointer"
                  type="button"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 4: MILESTONE CRITERIA MODAL */}
      <AnimatePresence>
        {criteriaModalOpen && (
          <div className="fixed inset-0 bg-[#31302d]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#ffffff] rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-[#f0ede9]"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#f0ede9]">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#b1005e]" />
                  <span className="text-base font-bold text-[#1c1c19]">Milestone Unlock Criteria</span>
                </div>
                <button
                  onClick={() => setCriteriaModalOpen(false)}
                  className="text-[#594047] hover:text-[#1c1c19] p-1"
                  type="button"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs">
                <h4 className="text-base font-bold text-[#b1005e]">{criteriaData.title}</h4>
                <p className="text-[#594047] leading-relaxed">{criteriaData.desc}</p>

                <div className="space-y-2 p-3 bg-[#f6f3ee] rounded-xl border border-[#e5e2dd]">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#b1005e] flex-shrink-0 mt-0.5" />
                    <span>Minimum <strong>{criteriaData.count}</strong> confirmed merchant integrations.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#b1005e] flex-shrink-0 mt-0.5" />
                    <span>At least 30 active trading days per terminal with live QR settlement.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#b1005e] flex-shrink-0 mt-0.5" />
                    <span>Compliance review under Section 194R statutory guidelines.</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setCriteriaModalOpen(false)}
                  className="w-full py-2.5 rounded-lg bg-[#b1005e] text-white hover:bg-[#d91b77] text-xs font-bold cursor-pointer"
                  type="button"
                >
                  Got It, Back to Milestones
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 5: FLEET GUIDELINES MODAL */}
      <AnimatePresence>
        {fleetModalOpen && (
          <div className="fixed inset-0 bg-[#31302d]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#ffffff] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-[#f0ede9]"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#f0ede9]">
                <div className="flex items-center gap-2">
                  <Car className="w-5 h-5 text-[#cca730]" />
                  <span className="text-base font-bold text-[#1c1c19]">District Fleet Executive Guidelines</span>
                </div>
                <button
                  onClick={() => setFleetModalOpen(false)}
                  className="text-[#594047] hover:text-[#1c1c19] p-1"
                  type="button"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs leading-relaxed text-[#594047]">
                <p>
                  Upon securing <strong>1,000 verified merchant salons</strong>, Nexora allocates a fully paid 36-month zero down-payment operational lease with complete statutory on-road taxes, comprehensive zero-depreciation insurance, and manufacturer service pack.
                </p>
                <div className="p-3.5 bg-[#f6f3ee] rounded-xl border border-[#e5e2dd] space-y-2">
                  <div className="font-bold text-[#1c1c19] text-xs">Included Executive Perks:</div>
                  <ul className="list-disc pl-4 space-y-1 text-[11px]">
                    <li>Direct title handover or company-managed fuel &amp; chauffeur stipend.</li>
                    <li>Official Nexora Gold Partner metallic door crest (removable).</li>
                    <li>Priority access to future equity-linked partner trust shares.</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setFleetModalOpen(false)}
                  className="px-6 py-2.5 rounded-lg bg-[#b1005e] text-white hover:bg-[#d91b77] text-xs font-bold cursor-pointer"
                  type="button"
                >
                  Acknowledge Guidelines
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 6: VELOCITY TIPS ACCELERATION PLAYBOOK */}
      <AnimatePresence>
        {velocityTipsOpen && (
          <div className="fixed inset-0 bg-[#31302d]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#ffffff] rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-[#f0ede9]"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#f0ede9]">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#b1005e]" />
                  <span className="text-base font-bold text-[#1c1c19]">Regional Velocity Playbook</span>
                </div>
                <button
                  onClick={() => setVelocityTipsOpen(false)}
                  className="text-[#594047] hover:text-[#1c1c19] p-1"
                  type="button"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs text-[#594047]">
                <div className="p-3 bg-[#f6f3ee] rounded-xl border border-[#e5e2dd]">
                  <h5 className="font-bold text-[#1c1c19] text-xs">1. High-Density Salon Commercial Strips</h5>
                  <p className="text-[11px] mt-0.5">Focus your field outreach on salon clusters in top commercial malls to register 5+ salons per visit.</p>
                </div>
                <div className="p-3 bg-[#f6f3ee] rounded-xl border border-[#e5e2dd]">
                  <h5 className="font-bold text-[#1c1c19] text-xs">2. Bundle Nexora Soundbox Voice Hub</h5>
                  <p className="text-[11px] mt-0.5">Merchants using the Voice Soundbox hit 30-day heartbeat criteria 3.8x faster.</p>
                </div>
                <div className="p-3 bg-[#f6f3ee] rounded-xl border border-[#e5e2dd]">
                  <h5 className="font-bold text-[#1c1c19] text-xs">3. Salon Handoff Hub QR Placement</h5>
                  <p className="text-[11px] mt-0.5">Ensure QR standees are placed at cashier reception for immediate activation velocity.</p>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setVelocityTipsOpen(false)}
                  className="w-full py-2.5 rounded-lg bg-[#b1005e] text-white hover:bg-[#d91b77] text-xs font-bold cursor-pointer"
                  type="button"
                >
                  Close Playbook
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 7: EXPANSION ADVISOR REQUEST */}
      <AnimatePresence>
        {advisorModalOpen && (
          <div className="fixed inset-0 bg-[#31302d]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#ffffff] rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-[#f0ede9]"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#f0ede9]">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#b1005e]" />
                  <span className="text-base font-bold text-[#1c1c19]">Territory Expansion Concierge</span>
                </div>
                <button
                  onClick={() => {
                    setAdvisorModalOpen(false);
                    setAdvisorSubmitted(false);
                  }}
                  className="text-[#594047] hover:text-[#1c1c19] p-1"
                  type="button"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {advisorSubmitted ? (
                <div className="mt-4 p-4 bg-[#ffd9e2] rounded-xl text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-[#b1005e] mx-auto" />
                  <h4 className="font-bold text-sm text-[#3e001d]">Request Registered!</h4>
                  <p className="text-xs text-[#3e001d]">
                    A Senior Growth Manager will contact the Growth Partner (+91 •••• 9104) within 4 business hours with territory mapping tools.
                  </p>
                </div>
              ) : (
                <div className="mt-4 space-y-3 text-xs">
                  <p className="text-[#594047]">
                    Request dedicated field team resources and localized marketing support to accelerate your trajectory toward the 1,000-salon Tier 7 Pinnacle SUV Grant.
                  </p>
                  <div>
                    <label className="block font-bold text-[#1c1c19] mb-1">Target District / City</label>
                    <input
                      type="text"
                      defaultValue="Bangalore Central & Indiranagar Cluster"
                      className="w-full px-3 py-2 rounded-lg bg-[#f0ede9] text-[#1c1c19] border border-[#e5e2dd] focus:ring-2 focus:ring-[#b1005e] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#1c1c19] mb-1">Expected Monthly Salon Velocity</label>
                    <select className="w-full px-3 py-2 rounded-lg bg-[#f0ede9] text-[#1c1c19] border border-[#e5e2dd] focus:ring-2 focus:ring-[#b1005e] focus:outline-none">
                      <option>25 - 50 Salons / Month</option>
                      <option>50 - 100 Salons / Month</option>
                      <option>100+ Salons / Month (District Master)</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => {
                    setAdvisorModalOpen(false);
                    setAdvisorSubmitted(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-[#f0ede9] hover:bg-[#ebe8e3] text-[#1c1c19] text-xs font-bold cursor-pointer"
                  type="button"
                >
                  Close
                </button>
                {!advisorSubmitted && (
                  <button
                    onClick={() => setAdvisorSubmitted(true)}
                    className="px-6 py-2 rounded-lg bg-[#b1005e] text-white hover:bg-[#d91b77] text-xs font-bold shadow-md cursor-pointer"
                    type="button"
                  >
                    Submit Request
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-[#1c1c19] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs font-medium border border-white/10"
          >
            <CheckCircle2 className="w-4 h-4 text-[#b1005e]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
