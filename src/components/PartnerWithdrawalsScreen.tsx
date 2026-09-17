import React, { useState, useMemo } from 'react';
import { NotificationBell } from './NotificationBell';
import { partnerDbService } from '../services/partnerDbService';
import { BUSINESS_RULES } from '../constants/businessRules';

interface PartnerWithdrawalsScreenProps {
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

interface SettlementRecord {
  id: string;
  date: string;
  time: string;
  grossAmount: number;
  tdsAmount: number;
  netPayout: number;
  method: string;
  status: 'requested' | 'under_review' | 'processing' | 'paid' | 'failed' | 'rejected' | 'reversed';
  statusLabel: string;
  notes: string;
}

interface PayoutMethod {
  id: string;
  type: 'bank' | 'upi';
  bankName?: string;
  accNo?: string;
  ifsc?: string;
  beneficiary?: string;
  upiId?: string;
  status: string;
  isPrimary: boolean;
}

export function PartnerWithdrawalsScreen({
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
  onNavigateToMarketingMaterial,
}: PartnerWithdrawalsScreenProps) {
  // Simulator UX State: "normal" | "initial" | "first-sale" | "elite"
  const [tierState, setTierState] = useState<'normal' | 'initial' | 'first-sale' | 'elite'>('normal');
  // Flow State: "normal" | "no-method" | "pending-kyc" | "low-balance" | "empty-history" | "network-error"
  const [flowState, setFlowState] = useState<'normal' | 'no-method' | 'pending-kyc' | 'low-balance' | 'empty-history' | 'network-error'>('normal');

  // Input Amount for Payout Form
  const [withdrawAmountInput, setWithdrawAmountInput] = useState<string>(BUSINESS_RULES.WITHDRAWAL.MIN.toString());
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Payout Methods state
  const [payoutMethods, setPayoutMethods] = useState<PayoutMethod[]>([
    {
      id: 'method-1',
      type: 'bank',
      bankName: 'HDFC Bank Limited',
      accNo: '•••• •••• •••• 4829',
      ifsc: 'HDFC0000428',
      beneficiary: 'JULIAN MERCER',
      status: 'Active',
      isPrimary: true
    },
    {
      id: 'method-2',
      type: 'upi',
      upiId: 'julian.mercer@okicici',
      status: 'Verified',
      isPrimary: false
    }
  ]);

  const [selectedMethodId, setSelectedMethodId] = useState<string>('method-1');
  const [showAddMethodModal, setShowAddMethodModal] = useState<boolean>(false);
  const [newMethodTab, setNewMethodTab] = useState<'bank' | 'upi'>('bank');

  // Add payout method form fields
  const [newBankName, setNewBankName] = useState<string>('');
  const [newAccNo, setNewAccNo] = useState<string>('');
  const [newIfsc, setNewIfsc] = useState<string>('');
  const [newBeneficiary, setNewBeneficiary] = useState<string>('JULIAN MERCER');
  const [newUpiId, setNewUpiId] = useState<string>('');

  // Verification states
  const [verificationStage, setVerificationStage] = useState<'idle' | 'testing' | 'success'>('idle');
  const [verificationProgressMsg, setVerificationProgressMsg] = useState<string>('');

  const activePayoutMethods = useMemo(() => {
    if (flowState === 'no-method') return [];
    return payoutMethods;
  }, [flowState, payoutMethods]);

  // Computed state balances depending on tierState and flowState overrides
  const metrics = useMemo(() => {
    if (flowState === 'low-balance') {
      return {
        available: 450,
        pending: 300,
        totalPaid: 1200,
        status: 'verified'
      };
    }

    switch (tierState) {
      case 'initial':
        return {
          available: 0,
          pending: 0,
          totalPaid: 0,
          status: 'verified'
        };
      case 'first-sale':
        return {
          available: 1500,
          pending: 150,
          totalPaid: 0,
          status: 'verified'
        };
      case 'elite':
        return {
          available: 87500,
          pending: 12400,
          totalPaid: 142800,
          status: 'verified'
        };
      case 'normal':
      default:
        return {
          available: 14250,
          pending: 3500,
          totalPaid: 17400,
          status: flowState === 'pending-kyc' ? 'pending_kyc' : 'verified'
        };
    }
  }, [tierState, flowState]);

  // Mock records for settlements
  const defaultRecords: SettlementRecord[] = [
    {
      id: 'WDR-2025-0891',
      date: '18 Feb 2025',
      time: '14:32 IST',
      grossAmount: 5000,
      tdsAmount: 250,
      netPayout: 4750,
      method: 'HDFC (1234)',
      status: 'requested',
      statusLabel: 'Requested',
      notes: 'Awaiting admin settlement queue clearance'
    },
    {
      id: 'WDR-2025-0874',
      date: '14 Feb 2025',
      time: '09:15 IST',
      grossAmount: 3500,
      tdsAmount: 175,
      netPayout: 3325,
      method: 'ra***@icici',
      status: 'under_review',
      statusLabel: 'Under Review',
      notes: 'KYC re-validation check in progress'
    },
    {
      id: 'WDR-2025-0812',
      date: '10 Feb 2025',
      time: '11:45 IST',
      grossAmount: 8000,
      tdsAmount: 400,
      netPayout: 7600,
      method: 'HDFC (1234)',
      status: 'processing',
      statusLabel: 'Processing',
      notes: 'Sent to banking partner batch NEFT queue'
    },
    {
      id: 'WDR-2025-0750',
      date: '03 Feb 2025',
      time: '16:20 IST',
      grossAmount: 12000,
      tdsAmount: 600,
      netPayout: 11400,
      method: 'HDFC (1234)',
      status: 'paid',
      statusLabel: 'Paid',
      notes: 'UTR: CMS8839201948 • Cleared via NEFT'
    },
    {
      id: 'WDR-2025-0699',
      date: '27 Jan 2025',
      time: '18:02 IST',
      grossAmount: 2500,
      tdsAmount: 125,
      netPayout: 2375,
      method: 'HDFC (1234)',
      status: 'failed',
      statusLabel: 'Failed',
      notes: 'Bank Server Timeout / NPCI clearing reject'
    },
    {
      id: 'WDR-2025-0640',
      date: '18 Jan 2025',
      time: '10:00 IST',
      grossAmount: 4000,
      tdsAmount: 200,
      netPayout: 3800,
      method: 'ra***@icici',
      status: 'rejected',
      statusLabel: 'Rejected',
      notes: 'Name mismatch between KYC record and UPI VPA'
    },
    {
      id: 'WDR-2025-0580',
      date: '10 Jan 2025',
      time: '12:30 IST',
      grossAmount: 1500,
      tdsAmount: 75,
      netPayout: 1425,
      method: 'HDFC (1234)',
      status: 'reversed',
      statusLabel: 'Reversed',
      notes: 'Reversed under 15-day merchant clawback audit'
    }
  ];

  const filteredRecords = useMemo(() => {
    if (flowState === 'empty-history') return [];
    if (flowState === 'network-error') return [];

    let list = defaultRecords;
    if (tierState === 'initial') return [];
    if (tierState === 'first-sale') {
      return [
        {
          id: 'WDR-2025-0901',
          date: 'Nov 12, 2024',
          time: '11:00 IST',
          grossAmount: 1500,
          tdsAmount: 75,
          netPayout: 1425,
          method: 'HDFC (1234)',
          status: 'requested',
          statusLabel: 'Requested',
          notes: 'First commission reward payout queue'
        }
      ] as SettlementRecord[];
    }

    if (filterStatus !== 'all') {
      list = list.filter(r => r.status === filterStatus);
    }
    return list;
  }, [flowState, tierState, filterStatus]);

  // Tax and commission calculations
  const parsedInputAmount = parseFloat(withdrawAmountInput) || 0;
  const tdsDeduction = Math.round(parsedInputAmount * 0.05);
  const netDisbursed = Math.max(0, parsedInputAmount - tdsDeduction);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 5000);
  };

  const handleProceedWithRequest = () => {
    if (parsedInputAmount < BUSINESS_RULES.WITHDRAWAL.MIN) {
      triggerToast(`Minimum withdrawal amount is ₹${BUSINESS_RULES.WITHDRAWAL.MIN.toLocaleString('en-IN')}.`);
      return;
    }
    if (parsedInputAmount > BUSINESS_RULES.WITHDRAWAL.MAX) {
      triggerToast(`Maximum withdrawal amount is ₹${BUSINESS_RULES.WITHDRAWAL.MAX.toLocaleString('en-IN')}.`);
      return;
    }
    if (flowState === 'no-method') {
      triggerToast('Please add or verify a bank payout method first.');
      return;
    }
    if (flowState === 'pending-kyc') {
      triggerToast('KYC approval is pending. Payouts are locked.');
      return;
    }
    setShowConfirmModal(true);
  };

  const handleFinalConfirm = async () => {
    setShowConfirmModal(false);
    try {
      const partnerId = await partnerDbService.getCurrentPartnerId() || '00000000-0000-0000-0000-000000000000';
      await partnerDbService.requestWithdrawal({
        partnerId,
        amount: parsedInputAmount,
        bankAccountDetails: {
          bankName: 'HDFC Bank',
          accountNumber: '•••• 4829',
          ifscCode: 'HDFC0000428'
        }
      });
      triggerToast(`Request Queued Successfully! ₹${netDisbursed.toLocaleString('en-IN')} net payout dispatched to settlement audit queue.`);
    } catch (err: any) {
      triggerToast(err.message || 'Withdrawal request failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf9f4] text-[#1c1c19] flex">
      {/* SIDEBAR NAVIGATION */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-[#f6f3ee] z-40 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-[#e5e2dd] hidden lg:flex">
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Brand header */}
          <div className="px-6 pt-6 pb-4 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#b1005e] flex items-center justify-center text-white shadow-[0_4px_16px_rgba(217,27,119,0.28)] animate-pulse">
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
                  <span className="text-xs font-black text-[#1c1c19] leading-tight">Julian Mercer</span>
                  <span className="text-[10px] text-[#594047] font-mono leading-none mt-0.5">GP-PARTNER #4928</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#cca730]/20 text-[#4f3d00] text-[10px] font-black uppercase tracking-wide border border-[#cca730]/40">
                Platinum
              </span>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="flex-1 px-4 py-2 flex flex-col gap-1 text-xs">
            <button
              onClick={() => onNavigateToHub && onNavigateToHub()}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#b1005e] bg-[#ffd9e2]/50 hover:bg-[#ffd9e2] font-bold border border-[#fda4c9]/60 transition-colors text-left cursor-pointer mb-1 shadow-2xs"
              type="button"
              title="Return to Main Landing Hub"
            >
              <span className="material-symbols-outlined text-[20px]">home</span>
              <span>Home (Landing Page)</span>
            </button>
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
              onClick={() => onNavigateToEarningsLedger && onNavigateToEarningsLedger()}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors font-bold text-left cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">payments</span>
              <span>Earnings &amp; Ledger</span>
            </button>
            <button
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#d91b77] text-white font-black text-left shadow-[0_4px_16px_rgba(217,27,119,0.2)] cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
              <span>Withdrawals</span>
            </button>
            <button
              onClick={() => onNavigateToExtraOnboardingReward && onNavigateToExtraOnboardingReward()}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors font-bold text-left cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
              <span>Extra Onboarding Reward</span>
            </button>
            <button
              onClick={() => onNavigateToRewardsMilestones && onNavigateToRewardsMilestones()}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors font-bold text-left cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">military_tech</span>
              <span>Rewards &amp; Milestones</span>
            </button>
            <button
              onClick={() => onNavigateToMarketingMaterial && onNavigateToMarketingMaterial()}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#594047] hover:bg-[#ebe8e3] hover:text-[#1c1c19] transition-colors font-bold text-left cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">campaign</span>
              <span>Marketing Material</span>
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
            <span className="text-xs font-black text-[#1c1c19]">Platinum Growth</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#ffd8e5] flex items-center justify-center text-[#3c0223] font-bold">
            <span className="material-symbols-outlined text-[18px]">stars</span>
          </div>
        </div>
      </aside>

      {/* BODY CONTENT WRAPPER */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        {/* TOP UX SIMULATOR STATUS PANEL */}
        <div className="w-full bg-[#31302d] text-white py-1.5 px-4 text-xs flex flex-col gap-2 shadow-md">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffd9e2] text-[16px]">tune</span>
              <span className="font-bold">Partner Account Tier Simulator:</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => {
                  setTierState('initial');
                  setWithdrawAmountInput('0');
                  triggerToast('Switched account state: Initial Phase (₹0 earnings)');
                }}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  tierState === 'initial' ? 'bg-[#d91b77] text-white' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Initial State
              </button>
              <button
                onClick={() => {
                  setTierState('first-sale');
                  setWithdrawAmountInput('1500');
                  triggerToast('Switched account state: First Sale Pending (₹1,500 available)');
                }}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  tierState === 'first-sale' ? 'bg-[#d91b77] text-white' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                First Sale Pending
              </button>
              <button
                onClick={() => {
                  setTierState('normal');
                  setWithdrawAmountInput('5000');
                  triggerToast('Switched account state: Scale Phase (₹14,250 available)');
                }}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  tierState === 'normal' ? 'bg-[#d91b77] text-white' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Scale Phase
              </button>
              <button
                onClick={() => {
                  setTierState('elite');
                  setWithdrawAmountInput('25000');
                  triggerToast('Switched account state: Elite Tier (₹87,500 available)');
                }}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  tierState === 'elite' ? 'bg-[#d91b77] text-white' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Elite Tier
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-white/10">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#cca730] text-[16px]">flowsheet</span>
              <span className="font-bold text-[#e1bdc6]">Partner Flow Simulator:</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => {
                  setFlowState('normal');
                  triggerToast('Flow State: Default Normal Mode');
                }}
                className={`px-2.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                  flowState === 'normal' ? 'bg-[#cca730] text-black' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Normal
              </button>
              <button
                onClick={() => {
                  setFlowState('no-method');
                  triggerToast('Flow State: No Payout Method Associated');
                }}
                className={`px-2.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                  flowState === 'no-method' ? 'bg-[#cca730] text-black' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                No Payout Method
              </button>
              <button
                onClick={() => {
                  setFlowState('pending-kyc');
                  triggerToast('Flow State: KYC Audit Approval Pending');
                }}
                className={`px-2.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                  flowState === 'pending-kyc' ? 'bg-[#cca730] text-black' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Verification Pending
              </button>
              <button
                onClick={() => {
                  setFlowState('low-balance');
                  setWithdrawAmountInput('450');
                  triggerToast('Flow State: Low Balance (<₹1,000 threshold)');
                }}
                className={`px-2.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                  flowState === 'low-balance' ? 'bg-[#cca730] text-black' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Low Balance
              </button>
              <button
                onClick={() => {
                  setFlowState('empty-history');
                  triggerToast('Flow State: Empty Settlement Ledger History');
                }}
                className={`px-2.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                  flowState === 'empty-history' ? 'bg-[#cca730] text-black' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Empty History
              </button>
              <button
                onClick={() => {
                  setFlowState('network-error');
                  triggerToast('Flow State: Simulated Network Outage');
                }}
                className={`px-2.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                  flowState === 'network-error' ? 'bg-[#cca730] text-black' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Network Error
              </button>
            </div>
          </div>
        </div>

        {/* HEADER BAR */}
        <header className="sticky top-0 z-30 h-16 bg-[#fcf9f4]/85 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6 shadow-sm border-b border-[#e5e2dd]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateToDashboard && onNavigateToDashboard()}
              className="lg:hidden p-2 rounded-xl bg-white border border-[#e5e2dd] flex items-center justify-center text-[#594047]"
              type="button"
              title="Back"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateToHub && onNavigateToHub()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#594047] bg-white hover:bg-[#ebe8e3] hover:text-[#b1005e] border border-[#e5e2dd] transition-all cursor-pointer shadow-2xs active:scale-95"
              title="Return to Main Home Landing Page"
            >
              <span className="material-symbols-outlined text-[16px] text-[#b1005e]">home</span>
              <span>Home</span>
            </button>
            <div className="px-3 py-1 rounded-full bg-[#ffd9e2]/60 text-[#8e004a] text-xs font-bold flex items-center gap-2 border border-[#fda4c9]/50">
              <span className="w-2 h-2 rounded-full bg-[#b1005e] animate-pulse" />
              <span>Live Ledger &amp; Settlement System</span>
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

        {/* TOAST MESSAGE BANNER */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 max-w-md bg-[#31302d] text-white p-4 rounded-2xl shadow-2xl flex items-start gap-3 border-l-4 border-[#d91b77] animate-bounce">
            <span className="material-symbols-outlined text-[#ffd9e2] text-[24px]">verified</span>
            <div className="flex flex-col flex-1">
              <span className="font-bold text-xs">Clearing Notification</span>
              <p className="text-[11px] text-[#e5e2dd] mt-0.5">{toastMessage}</p>
            </div>
            <button className="text-white/60 hover:text-white" onClick={() => setToastMessage(null)}>
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        )}

        {/* MAIN WORKSPACE CONTENT */}
        <main className="w-full pb-24 bg-[#fcf9f4] px-4 sm:px-6 max-w-7xl mx-auto flex-grow pt-6">
          <div className="flex flex-col w-full space-y-6">
            
            {/* Page Title Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-xs text-[#8e4767] uppercase font-bold tracking-wider">
                  <span>Partner Growth Ecosystem</span>
                  <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                  <span>Payouts &amp; Settlements</span>
                  <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                  <span className="text-[#b1005e] font-black">Withdrawals</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#1c1c19] tracking-tight leading-tight">
                  Withdrawals &amp; Settlements
                </h1>
                <p className="text-xs sm:text-sm text-[#594047]">
                  Available partner commission payouts requested securely. Funds process under strict Section 194H tax audit.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => triggerToast('Generating consolidated partner financial statement PDF...')}
                  className="h-9 px-4 rounded-full bg-white text-[#1c1c19] text-xs font-black flex items-center gap-1.5 shadow-2xs hover:bg-[#f6f3ee] transition-colors border border-[#e5e2dd]"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  <span>Statement</span>
                </button>
              </div>
            </div>

            {/* BENTO GRID: 3-COLUMN METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1: Available */}
              <div className="relative overflow-hidden rounded-3xl bg-white/95 backdrop-blur-xl p-5 border border-[#e5e2dd] shadow-xs flex flex-col justify-between">
                <div className="absolute -right-8 -top-8 w-24 h-24 bg-[#d91b77]/5 rounded-full blur-xl pointer-events-none"></div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#8e4767] uppercase tracking-wider">Withdrawable Pool</span>
                  <div className="p-2 rounded-xl bg-[#ffd9e2]/60 text-[#b1005e]">
                    <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                  </div>
                </div>
                <div className="my-3">
                  <div className="text-3xl sm:text-4xl font-black text-[#1c1c19] tracking-tight leading-none">
                    ₹{metrics.available.toLocaleString('en-IN')}.00
                  </div>
                  <span className="text-[11px] text-emerald-800 font-bold mt-1.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">lock_open</span>
                    Cleared earnings balance ready to transfer
                  </span>
                </div>
                <div className="pt-2 border-t border-[#e5e2dd] flex items-center justify-between text-[11px] text-[#594047]">
                  <span>Commission pool cleared</span>
                  <span className="font-bold text-[#b1005e]">100% Audited</span>
                </div>
              </div>

              {/* Card 2: Pending */}
              <div className="relative overflow-hidden rounded-3xl bg-white/95 backdrop-blur-xl p-5 border border-[#e5e2dd] shadow-xs flex flex-col justify-between">
                <div className="absolute -right-8 -top-8 w-24 h-24 bg-[#cca730]/5 rounded-full blur-xl pointer-events-none"></div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#8e4767] uppercase tracking-wider">Pending Batch Requests</span>
                  <div className="p-2 rounded-xl bg-[#ffe088]/60 text-[#735c00]">
                    <span className="material-symbols-outlined text-[20px]">hourglass_top</span>
                  </div>
                </div>
                <div className="my-3">
                  <div className="text-3xl sm:text-4xl font-black text-[#1c1c19] tracking-tight leading-none">
                    ₹{metrics.pending.toLocaleString('en-IN')}.00
                  </div>
                  <span className="text-[11px] text-[#594047] mt-1.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">rule</span>
                    Under banking verification / review
                  </span>
                </div>
                <div className="pt-2 border-t border-[#e5e2dd] flex items-center justify-between text-[11px] text-[#594047]">
                  <span>Active batch releases</span>
                  <span className="font-bold text-[#735c00]">In SLA Audit</span>
                </div>
              </div>

              {/* Card 3: Total Paid */}
              <div className="relative overflow-hidden rounded-3xl bg-white/95 backdrop-blur-xl p-5 border border-[#e5e2dd] shadow-xs flex flex-col justify-between">
                <div className="absolute -right-8 -top-8 w-24 h-24 bg-emerald-50 rounded-full blur-xl pointer-events-none"></div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#8e4767] uppercase tracking-wider">Total Dispatched (NEFT)</span>
                  <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                    <span className="material-symbols-outlined text-[20px]">verified_user</span>
                  </div>
                </div>
                <div className="my-3">
                  <div className="text-3xl sm:text-4xl font-black text-[#1c1c19] tracking-tight leading-none">
                    ₹{metrics.totalPaid.toLocaleString('en-IN')}.00
                  </div>
                  <span className="text-[11px] text-[#594047] mt-1.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    Successfully dispatched to primary bank
                  </span>
                </div>
                <div className="pt-2 border-t border-[#e5e2dd] flex items-center justify-between text-[11px] text-[#594047]">
                  <span>Lifetime settled payouts</span>
                  <span className="font-bold text-[#1c1c19]">Bank Reconciled</span>
                </div>
              </div>
            </div>

            {/* MANDATORY STATUTORY REGULATORY DECLARATION */}
            <div className="rounded-2xl bg-[#f0ede9] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-[#e5e2dd]">
              <div className="flex items-start gap-3 min-w-0">
                <span className="material-symbols-outlined text-[#8e4767] mt-0.5 text-[22px]">gavel</span>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-[#1c1c19] uppercase tracking-wide">Statutory Compliance &amp; Payout Guardrails</span>
                  <p className="text-xs text-[#594047] mt-0.5 leading-relaxed">
                    Minimum single withdrawal limit: <strong>₹{BUSINESS_RULES.WITHDRAWAL.MIN.toLocaleString('en-IN')}</strong>. Maximum: <strong>₹{BUSINESS_RULES.WITHDRAWAL.MAX.toLocaleString('en-IN')}</strong>. Commission payouts attract <strong>5% TDS under Section 194H</strong> of the Income Tax Act with verified PAN, or 20% standard default rate. Automated clearing runs weekly on Mondays.
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded bg-[#e5e2dd] text-[10px] font-black text-[#594047] tracking-wider uppercase shrink-0 border border-[#8d6f77]/30">
                TDS Compliant
              </span>
            </div>

            {/* SPLIT SCREEN LAYOUT: COMPLIANCE METHODS + WITHDRAWAL SUBMISSION FORM */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* LEFT COLUMN: Payout Destination Cards (5 cols) */}
              <div className="lg:col-span-5 flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#b1005e] text-[20px]">account_balance</span>
                    <h2 className="text-lg font-black text-[#1c1c19] tracking-tight">Payout Methods</h2>
                  </div>
                  <button
                    onClick={() => {
                      setNewBankName('');
                      setNewAccNo('');
                      setNewIfsc('');
                      setNewBeneficiary('JULIAN MERCER');
                      setNewUpiId('');
                      setVerificationStage('idle');
                      setShowAddMethodModal(true);
                    }}
                    className="text-xs font-black text-[#d91b77] hover:underline flex items-center gap-0.5 cursor-pointer animate-pulse"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">add_circle</span>
                    <span>Add New</span>
                  </button>
                </div>

                {activePayoutMethods.map((method) => {
                  const isSelected = selectedMethodId === method.id;
                  if (method.type === 'bank') {
                    return (
                      <div
                        key={method.id}
                        onClick={() => setSelectedMethodId(method.id)}
                        className={`relative p-5 rounded-3xl border transition-all flex flex-col justify-between cursor-pointer ${
                          isSelected
                            ? 'border-[#d91b77] bg-gradient-to-br from-white to-[#ffd9e2]/10 ring-2 ring-[#d91b77]/20 shadow-md'
                            : 'border-[#e5e2dd] bg-gradient-to-br from-white to-[#f6f3ee] hover:border-[#8d6f77] shadow-xs'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-2xl bg-[#ffd9e2] text-[#b1005e] flex items-center justify-center font-bold">
                              <span className="material-symbols-outlined text-[24px]">account_balance</span>
                            </div>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-1.5">
                                <span className="text-sm font-black text-[#1c1c19]">{method.bankName}</span>
                                {method.isPrimary && (
                                  <span className="px-1.5 py-0.5 rounded-full bg-[#ffd8e5] text-[#3c0223] text-[9px] font-black uppercase tracking-wider">Primary</span>
                                )}
                              </div>
                              <span className="text-xs text-[#594047] font-mono mt-0.5">A/C: {method.accNo}</span>
                            </div>
                          </div>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 ${
                            isSelected
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : 'bg-white text-[#594047] border-[#e5e2dd]'
                          }`}>
                            <span className="material-symbols-outlined text-[12px]">{isSelected ? 'check_circle' : 'circle'}</span>
                            {isSelected ? 'Selected' : 'Active'}
                          </span>
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#e5e2dd] grid grid-cols-2 gap-3 text-xs text-[#594047]">
                          <div>
                            <span className="text-[10px] font-bold text-[#8d6f77] uppercase tracking-wide block">IFSC Code</span>
                            <span className="font-mono text-[#1c1c19] font-bold">{method.ifsc}</span>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-[#8d6f77] uppercase tracking-wide block">Beneficiary</span>
                            <span className="font-bold text-[#1c1c19]">JULIAN MERCER</span>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between text-[10px] text-[#8d6f77]">
                          <span>Clearing SLA: Weekly NEFT Cycle</span>
                          {method.isPrimary && <span className="font-bold text-[#b1005e]">Default Selection</span>}
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={method.id}
                        onClick={() => setSelectedMethodId(method.id)}
                        className={`relative p-4 rounded-3xl border transition-all flex flex-col justify-between cursor-pointer ${
                          isSelected
                            ? 'border-[#d91b77] bg-gradient-to-br from-white to-[#ffd9e2]/10 ring-2 ring-[#d91b77]/20 shadow-md'
                            : 'border-[#e5e2dd] bg-white hover:border-[#8d6f77] shadow-2xs'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                              <span className="material-symbols-outlined text-[22px]">qr_code_scanner</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-black text-[#1c1c19]">Virtual Payment Address (UPI)</span>
                              <span className="text-xs text-[#594047] font-mono mt-0.5">{method.upiId}</span>
                            </div>
                          </div>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 ${
                            isSelected
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : 'bg-white text-[#594047] border-[#e5e2dd]'
                          }`}>
                            <span className="material-symbols-outlined text-[12px]">{isSelected ? 'check_circle' : 'circle'}</span>
                            {isSelected ? 'Selected' : 'Verified'}
                          </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between text-[10px] text-[#8d6f77]">
                          <span>Standard batch payment routing</span>
                          {!method.isPrimary ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setPayoutMethods(payoutMethods.map(m => ({ ...m, isPrimary: m.id === method.id })));
                                triggerToast('UPI selected as primary payout method');
                              }}
                              className="font-bold text-[#d91b77] hover:underline cursor-pointer"
                            >
                              Make Primary
                            </button>
                          ) : (
                            <span className="font-bold text-[#b1005e]">Primary Payout Method</span>
                          )}
                        </div>
                      </div>
                    );
                  }
                })}

                {activePayoutMethods.length === 0 && (
                  <div className="p-6 text-center flex flex-col items-center justify-center space-y-3 bg-white border border-dashed border-[#e5e2dd] rounded-2xl">
                    <span className="material-symbols-outlined text-[44px] text-[#8d6f77]">payments</span>
                    <h3 className="font-black text-sm text-[#1c1c19]">No Payout Methods Connected</h3>
                    <p className="text-xs text-[#594047] max-w-sm leading-relaxed">
                      Please add a bank account or UPI VPA to receive your earnings.
                    </p>
                  </div>
                )}

                {/* Secure Masking Disclaimer */}
                <div className="p-4 rounded-2xl bg-white border border-[#e5e2dd] flex items-start gap-3 shadow-2xs">
                  <span className="material-symbols-outlined text-[#8d6f77] text-[18px] mt-0.5">lock</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-[#1c1c19]">Masked Banking Safeguards</span>
                    <p className="text-[11px] text-[#594047] mt-0.5 leading-relaxed">
                      All banking credentials remain heavily encrypted and masked. Bank account beneficiary names must correspond identically to your onboarding KYC proof files to avoid clearing freezes.
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Interactive Form with TDS Audit Calculator (7 cols) */}
              <div className="lg:col-span-7 rounded-3xl bg-white border border-[#e5e2dd] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#e5e2dd] mb-4">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-[#ffd9e2] text-[#b1005e]">
                        <span className="material-symbols-outlined text-[20px]">send_money</span>
                      </div>
                      <h2 className="text-lg font-black text-[#1c1c19] tracking-tight">Request Payout</h2>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#8d6f77] block font-bold uppercase">Ready Pool</span>
                      <span className="text-lg font-black text-[#b1005e]">₹{metrics.available.toLocaleString('en-IN')}.00</span>
                    </div>
                  </div>

                  {flowState === 'pending-kyc' ? (
                    <div className="p-6 text-center flex flex-col items-center justify-center space-y-3 bg-[#ffe088]/20 rounded-2xl border border-[#cca730]/40">
                      <span className="material-symbols-outlined text-[44px] text-[#735c00]">shield_person</span>
                      <h3 className="font-black text-sm text-[#1c1c19]">KYC Audit Pending Approval</h3>
                      <p className="text-xs text-[#594047] max-w-sm leading-relaxed">
                        Weekly withdrawals remain restricted for Julian Mercer while our compliance team completes your Platinum Tier verification audit. Release scheduled in 1-2 working days.
                      </p>
                      <button
                        onClick={() => triggerToast('Uploading additional verification documents...')}
                        className="h-9 px-4 rounded-full bg-[#cca730] text-[#241a00] font-bold text-xs"
                      >
                        Upload Documents
                      </button>
                    </div>
                  ) : flowState === 'no-method' ? (
                    <div className="p-6 text-center flex flex-col items-center justify-center space-y-3 bg-white border border-dashed border-[#e5e2dd] rounded-2xl">
                      <span className="material-symbols-outlined text-[44px] text-[#8d6f77]">payments</span>
                      <h3 className="font-black text-sm text-[#1c1c19]">No Bank Destinations Connected</h3>
                      <p className="text-xs text-[#594047] max-w-sm leading-relaxed">
                        To submit payout requests, you must associate at least one validated bank account or UPI VPA matching your KYC full name.
                      </p>
                      <button
                        onClick={() => triggerToast('Connecting new banking destination...')}
                        className="h-10 px-5 rounded-full bg-[#d91b77] text-white text-xs font-black shadow-xs"
                      >
                        Connect Bank Account
                      </button>
                    </div>
                  ) : (
                    <form className="flex flex-col space-y-4" onSubmit={(e) => e.preventDefault()}>
                      {/* Amount Input */}
                      <div className="flex flex-col space-y-1.5">
                        <div className="flex justify-between text-xs font-bold text-[#1c1c19]">
                          <label htmlFor="withdraw-amount">Payout Sum (INR)</label>
                          <span className="text-[#8d6f77]">Single limit: ₹1k – ₹50k</span>
                        </div>
                        <div className="relative flex items-center">
                          <span className="absolute left-4 text-xl font-bold text-[#594047]">₹</span>
                          <input
                            id="withdraw-amount"
                            type="number"
                            className="w-full bg-[#f6f3ee] pl-9 pr-4 py-3 rounded-2xl font-black text-xl text-[#1c1c19] outline-none focus:bg-white focus:ring-1 focus:ring-[#d91b77] transition-all"
                            value={withdrawAmountInput}
                            onChange={(e) => setWithdrawAmountInput(e.target.value)}
                            max={metrics.available}
                            disabled={metrics.available < 1000}
                          />
                        </div>

                        {/* Quick Selection Pills */}
                        <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                          <span className="text-[10px] text-[#8d6f77] font-black uppercase mr-1">Quick Select:</span>
                          <button
                            type="button"
                            onClick={() => {
                              const v = Math.min(1000, metrics.available);
                              setWithdrawAmountInput(v.toString());
                            }}
                            className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${
                              parsedInputAmount === 1000
                                ? 'bg-[#ffd9e2] text-[#8e004a] font-bold border border-[#fda4c9]'
                                : 'bg-[#f6f3ee] text-[#594047] hover:bg-[#ebe8e3]'
                            }`}
                          >
                            ₹1,000 (Min)
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const v = Math.min(5000, metrics.available);
                              setWithdrawAmountInput(v.toString());
                            }}
                            className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${
                              parsedInputAmount === 5000
                                ? 'bg-[#ffd9e2] text-[#8e004a] font-bold border border-[#fda4c9]'
                                : 'bg-[#f6f3ee] text-[#594047] hover:bg-[#ebe8e3]'
                            }`}
                          >
                            ₹5,000
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const v = Math.min(10000, metrics.available);
                              setWithdrawAmountInput(v.toString());
                            }}
                            className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${
                              parsedInputAmount === 10000
                                ? 'bg-[#ffd9e2] text-[#8e004a] font-bold border border-[#fda4c9]'
                                : 'bg-[#f6f3ee] text-[#594047] hover:bg-[#ebe8e3]'
                            }`}
                          >
                            ₹10,000
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setWithdrawAmountInput(metrics.available.toString());
                            }}
                            className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${
                              parsedInputAmount === metrics.available && metrics.available > 0
                                ? 'bg-[#ffd9e2] text-[#8e004a] font-bold border border-[#fda4c9]'
                                : 'bg-[#f6f3ee] text-[#594047] hover:bg-[#ebe8e3]'
                            }`}
                          >
                            Max (₹{metrics.available.toLocaleString()})
                          </button>
                        </div>

                        {/* Minimum limits messages */}
                        {metrics.available < 1000 && (
                          <p className="text-[11px] text-[#ba1a1a] font-bold flex items-center gap-1 mt-1">
                            <span className="material-symbols-outlined text-[14px]">warning</span>
                            Available balance is below the minimum threshold of ₹1,000.
                          </p>
                        )}
                        {parsedInputAmount > metrics.available && metrics.available >= 1000 && (
                          <p className="text-[11px] text-[#ba1a1a] font-bold flex items-center gap-1 mt-1">
                            <span className="material-symbols-outlined text-[14px]">warning</span>
                            Requested amount exceeds your withdrawable pool of ₹{metrics.available.toLocaleString()}.
                          </p>
                        )}
                      </div>

                      {/* Destination Method Display */}
                      <div className="flex flex-col space-y-1.5 pt-2">
                        <span className="text-xs font-bold text-[#1c1c19]">Destination Channel</span>
                        {payoutMethods.find(m => m.id === selectedMethodId) ? (() => {
                          const method = payoutMethods.find(m => m.id === selectedMethodId)!;
                          return (
                            <div className="p-3 bg-[#f6f3ee] rounded-xl flex items-center justify-between border border-[#e5e2dd]">
                              <div className="flex items-center gap-2.5">
                                <span className="material-symbols-outlined text-[#b1005e] text-[18px]">
                                  {method.type === 'bank' ? 'account_balance' : 'qr_code_scanner'}
                                </span>
                                <div className="flex flex-col">
                                  <span className="text-xs font-bold text-[#1c1c19]">
                                    {method.type === 'bank' ? `${method.bankName} (${method.accNo})` : `UPI ID: ${method.upiId}`}
                                  </span>
                                  <span className="text-[10px] text-[#594047] font-mono leading-none mt-0.5">
                                    {method.type === 'bank' ? `${method.beneficiary} • IFSC: ${method.ifsc}` : `Julian Mercer • Verified VPA`}
                                  </span>
                                </div>
                              </div>
                              <span className="material-symbols-outlined text-[#cca730] text-[16px]">check_circle</span>
                            </div>
                          );
                        })() : (
                          <div className="p-3 bg-[#ba1a1a]/10 text-[#ba1a1a] text-xs font-bold rounded-xl border border-[#ba1a1a]/20">
                            No payout method selected. Please select or add a payout method.
                          </div>
                        )}
                      </div>

                      {/* Real-time Math Calculation Breakdown Card */}
                      <div className="rounded-2xl bg-[#f6f3ee]/80 border border-[#e5e2dd] p-4 space-y-2">
                        <div className="flex items-center justify-between text-xs text-[#594047]">
                          <span>Gross Payout Sum Requested:</span>
                          <span className="font-mono font-bold text-[#1c1c19]">
                            ₹{parsedInputAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-[#594047]">
                          <span className="flex items-center gap-1">
                            <span>Statutory TDS Withholding (Section 194H @ 5%):</span>
                            <span
                              className="material-symbols-outlined text-[14px] text-[#8d6f77] cursor-help"
                              title="As per Section 194H of IT Act 1961, 5% Tax Deducted at Source (TDS) applies to commission payouts."
                            >
                              help
                            </span>
                          </span>
                          <span className="font-mono font-bold text-[#ba1a1a]">
                            -₹{tdsDeduction.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-[#594047]">
                          <span>Banking NEFT Processing Gateway Fee:</span>
                          <span className="font-mono text-[#b1005e] font-black">₹0.00 (Waived)</span>
                        </div>

                        <div className="pt-2 mt-2 border-t border-[#e5e2dd] flex items-center justify-between">
                          <span className="text-xs font-black text-[#1c1c19]">Net Settled Disbursement:</span>
                          <span className="text-lg font-black text-[#b1005e] font-mono">
                            ₹{netDisbursed.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>

                      {/* Legal & Audit Checklist Acknowledgment */}
                      <div className="flex items-start gap-2.5 pt-1">
                        <input
                          id="ack-payout-terms"
                          type="checkbox"
                          defaultChecked
                          className="mt-1 w-4 h-4 rounded text-[#b1005e] focus:ring-[#b1005e] accent-[#b1005e] cursor-pointer"
                        />
                        <label htmlFor="ack-payout-terms" className="text-[11px] text-[#594047] leading-relaxed cursor-pointer select-none">
                          I hereby authorize the statutory 5% TDS deduction under Section 194H for this batch payout, verify my linked PAN is legitimate, and acknowledge that actual funds disburse solely in scheduled weekly cycles subject to regulatory clearing.
                        </label>
                      </div>

                      {/* Action Submission Button */}
                      <button
                        type="button"
                        onClick={handleProceedWithRequest}
                        disabled={parsedInputAmount < 1000 || parsedInputAmount > metrics.available}
                        className="w-full mt-2 py-3 px-4 rounded-full bg-[#d91b77] text-white text-xs font-black shadow-[0_4px_16px_rgba(217,27,119,0.25)] hover:bg-[#b1005e] disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>Proceed with Request (₹{netDisbursed.toLocaleString()} Net)</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* LEDGER SETTLE RECORDS TABLE */}
            <div className="flex flex-col space-y-4" id="payout-records">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#b1005e] text-[20px]">history</span>
                  <h2 className="text-lg font-black text-[#1c1c19] tracking-tight">Audited Settlement Records</h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#e5e2dd] text-[#1c1c19] text-[10px] font-black">
                    {filteredRecords.length} Rows
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-white rounded-xl p-1 shadow-2xs border border-[#e5e2dd]">
                    <span className="material-symbols-outlined text-[#8d6f77] ml-2 text-[16px]">filter_list</span>
                    <select
                      className="bg-transparent text-xs font-bold text-[#1c1c19] py-1 px-2.5 outline-none cursor-pointer"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">All Payout Statuses</option>
                      <option value="requested">Requested Settlements</option>
                      <option value="under_review">KYC Under Review</option>
                      <option value="processing">Disbursed Processing</option>
                      <option value="paid">Cleared Paid</option>
                      <option value="failed">Failed / NPCI Reject</option>
                      <option value="rejected">Rejected Details</option>
                      <option value="reversed">Reversed Audits</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Interactive Table Container */}
              <div className="overflow-x-auto rounded-2xl bg-white border border-[#e5e2dd] shadow-2xs">
                {flowState === 'network-error' ? (
                  <div className="p-12 text-center flex flex-col items-center justify-center space-y-3 bg-[#ffdad6]/20 text-[#93000a]">
                    <span className="material-symbols-outlined text-[44px]">wifi_off</span>
                    <h3 className="font-bold text-sm">Ledger Communication Interrupted</h3>
                    <p className="text-xs text-[#594047] max-w-sm">
                      Unable to fetch banking logs or NPCI clearing receipts. Your account funds remain protected on our secure distributed ledger.
                    </p>
                    <button
                      onClick={() => setFlowState('normal')}
                      className="h-9 px-4 rounded-full bg-[#ba1a1a] text-white text-xs font-bold"
                    >
                      Retry Connection
                    </button>
                  </div>
                ) : filteredRecords.length === 0 ? (
                  <div className="p-12 text-center flex flex-col items-center justify-center space-y-3">
                    <span className="material-symbols-outlined text-[44px] text-[#8d6f77]">payments</span>
                    <h3 className="font-bold text-sm text-[#1c1c19]">No Settlement History</h3>
                    <p className="text-xs text-[#594047] max-w-sm">
                      Switched state has empty history logs. Complete referrals to trigger first auto-settlement.
                    </p>
                  </div>
                ) : (
                  <table className="w-full text-left font-sans text-xs min-w-[900px]">
                    <thead>
                      <tr className="bg-[#f6f3ee]/70 text-[#594047] font-black uppercase tracking-wider border-b border-[#e5e2dd]">
                        <th className="py-3.5 px-5">Request ID</th>
                        <th className="py-3.5 px-4">Date &amp; Time</th>
                        <th className="py-3.5 px-4 text-right">Gross Amount</th>
                        <th className="py-3.5 px-4 text-right">TDS (5% 194H)</th>
                        <th className="py-3.5 px-4 text-right">Net Cleared</th>
                        <th className="py-3.5 px-4">Payout Method</th>
                        <th className="py-3.5 px-4 text-center">Status</th>
                        <th className="py-3.5 px-5">Audit Notes / Clearing SLA</th>
                        <th className="py-3.5 px-5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e5e2dd] font-medium text-[#1c1c19]">
                      {filteredRecords.map((r) => {
                        let statusColor = 'bg-[#f6f3ee] text-[#1c1c19]';
                        if (r.status === 'requested') statusColor = 'bg-[#ffe088] text-[#241a00] border border-[#cca730]/40';
                        if (r.status === 'under_review') statusColor = 'bg-[#fda4c9]/40 text-[#7a3656] border border-[#fda4c9]';
                        if (r.status === 'processing') statusColor = 'bg-[#ffd9e2]/60 text-[#8e004a] border border-[#fda4c9]/50';
                        if (r.status === 'paid') statusColor = 'bg-emerald-50 text-emerald-800 border border-emerald-300';
                        if (r.status === 'failed') statusColor = 'bg-[#ffdad6] text-[#93000a] border border-[#ffdad6]';
                        if (r.status === 'rejected') statusColor = 'bg-[#ffdad6]/80 text-[#93000a] border border-[#ffdad6]';
                        if (r.status === 'reversed') statusColor = 'bg-[#ba1a1a]/10 text-[#ba1a1a] border border-[#ba1a1a]/30';

                        return (
                          <tr key={r.id} className="hover:bg-[#f6f3ee]/40 transition-colors">
                            <td className="py-4 px-5 font-mono font-bold">{r.id}</td>
                            <td className="py-4 px-4 whitespace-nowrap">
                              <span>{r.date}</span>
                              <span className="block text-[10px] text-[#8d6f77] font-mono leading-none mt-0.5">{r.time}</span>
                            </td>
                            <td className="py-4 px-4 text-right font-mono font-bold">
                              ₹{r.grossAmount.toLocaleString('en-IN')}.00
                            </td>
                            <td className="py-4 px-4 text-right font-mono text-[#ba1a1a]">
                              -₹{r.tdsAmount.toLocaleString('en-IN')}.00
                            </td>
                            <td className="py-4 px-4 text-right font-mono font-bold text-[#b1005e]">
                              ₹{r.netPayout.toLocaleString('en-IN')}.00
                            </td>
                            <td className="py-4 px-4">
                              <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                                <span className="material-symbols-outlined text-[15px] text-[#8d6f77]">account_balance_wallet</span>
                                <span>{r.method}</span>
                              </span>
                            </td>
                            <td className="py-4 px-4 text-center whitespace-nowrap">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider inline-block ${statusColor}`}>
                                {r.statusLabel}
                              </span>
                            </td>
                            <td className="py-4 px-5 text-[#594047] leading-relaxed max-w-xs">{r.notes}</td>
                            <td className="py-4 px-5 text-right whitespace-nowrap">
                              <button
                                onClick={() => triggerToast(`Displaying clearing trace log for payout request ${r.id}...`)}
                                className="text-xs font-black text-[#d91b77] hover:underline cursor-pointer"
                                type="button"
                              >
                                View Trace
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* VERBATIM CALCULATION MEMOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-5 rounded-3xl bg-white border border-[#e5e2dd] shadow-2xs space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#ffd9e2] text-[#b1005e] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">verified_user</span>
                  </div>
                  <h3 className="text-sm font-black text-[#1c1c19]">15-Day Minimum SLA Benchmarks</h3>
                </div>
                <p className="text-xs text-[#594047] leading-relaxed">
                  One-time GP activation bonuses trigger strictly after the referred salon achieves ₹1,000 QR transaction volume each day for 15 consecutive trial days:
                </p>
                <div className="space-y-1.5 bg-[#f6f3ee] p-3 rounded-2xl text-xs text-[#1c1c19]">
                  <div className="flex justify-between">
                    <span>₹15,000 GMV Trial Pool:</span>
                    <strong>₹150 GP Reward (10% Corp Comm.)</strong>
                  </div>
                  <div className="flex justify-between border-t border-[#e5e2dd] pt-1.5">
                    <span>₹50,000 GMV Trial Pool:</span>
                    <strong>₹500 GP Reward (10% Corp Comm.)</strong>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-[#fda4c9]/10 border border-[#fda4c9]/40 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-[#7a3656] text-[20px]">rule</span>
                    <h3 className="text-sm font-black text-[#7a3656]">Operational Mandate Statement</h3>
                  </div>
                  <p className="text-xs text-[#7a3656] leading-relaxed italic">
                    “Har qualifying shop par minimum ₹1,000 genuine QR transaction har din, lagatar 15 consecutive days tak zaroori hai. Minimum 15-day QR business ₹15,000 hoga. Company commission 10%, minimum ₹1,500 hoga.”
                  </p>
                </div>
                <div className="text-[10px] text-[#8e4767] uppercase font-bold tracking-wider pt-3">
                  Nexora Compliance Department • Approved October 2024
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* CONFIRMATION OVERLAY MODAL */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white border border-[#e5e2dd] p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between pb-2 border-b border-[#e5e2dd]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#ffd9e2] text-[#b1005e]">
                  <span className="material-symbols-outlined text-[24px]">verified</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg font-black text-[#1c1c19] tracking-tight">Confirm Settlement Batch</h3>
                  <span className="text-[10px] text-[#8d6f77] uppercase font-bold">Clearing House Request</span>
                </div>
              </div>
              <button
                className="w-8 h-8 rounded-full bg-[#f6f3ee] flex items-center justify-center text-[#594047]"
                onClick={() => setShowConfirmModal(false)}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="rounded-2xl bg-[#f6f3ee] p-4 flex flex-col gap-2.5 text-xs text-[#1c1c19]">
              <div className="flex justify-between items-center">
                <span className="text-[#594047]">Requested Gross Amount:</span>
                <span className="font-mono font-bold">₹{parsedInputAmount.toLocaleString('en-IN')}.00</span>
              </div>
              <div className="flex justify-between items-center text-[#ba1a1a]">
                <span>Section 194H TDS Withholding (5%):</span>
                <span className="font-mono font-bold">-₹{tdsDeduction.toLocaleString('en-IN')}.00</span>
              </div>
              <div className="pt-2 bg-[#ebe8e3] -mx-4 px-4 py-2 flex justify-between items-center border-t border-[#e5e2dd]">
                <span className="font-black">Payable Disbursal Amount:</span>
                <span className="text-base font-black text-[#b1005e] font-mono">
                  ₹{netDisbursed.toLocaleString('en-IN')}.00
                </span>
              </div>
              <div className="flex justify-between items-center pt-1 text-[11px] text-[#594047]">
                <span>Receiving Payout Method:</span>
                <span className="font-bold text-[#1c1c19]">
                  {payoutMethods.find(m => m.id === selectedMethodId)?.type === 'bank'
                    ? `${payoutMethods.find(m => m.id === selectedMethodId)?.bankName} (${payoutMethods.find(m => m.id === selectedMethodId)?.accNo})`
                    : `UPI ID: ${payoutMethods.find(m => m.id === selectedMethodId)?.upiId}`}
                </span>
              </div>
              <div className="flex justify-between items-center text-[11px] text-[#594047]">
                <span>Disbursement Cycle:</span>
                <span className="font-bold text-[#735c00]">Scheduled Next Monday 10:00 IST</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-[11px] leading-relaxed flex items-start gap-2">
              <span className="material-symbols-outlined text-[16px] text-[#735c00] shrink-0 mt-0.5">info</span>
              <p>
                Withdrawals process through automated clearing runs. We do not provide instant transfer options as audits verify anti-fraud compliance and 15-day consecutive QR streaks.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 rounded-full bg-[#f6f3ee] hover:bg-[#ebe8e3] text-[#1c1c19] text-xs font-black transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleFinalConfirm}
                className="flex-1 py-3 rounded-full bg-[#d91b77] hover:bg-[#b1005e] text-white text-xs font-black shadow-md transition-all flex items-center justify-center gap-1"
              >
                <span>Confirm Settlement</span>
                <span className="material-symbols-outlined text-[16px]">check</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD PAYOUT METHOD MODAL */}
      {showAddMethodModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white border border-[#e5e2dd] p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200 relative overflow-hidden">
            
            {/* Top header */}
            <div className="flex items-start justify-between pb-2 border-b border-[#e5e2dd]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#ffd9e2] text-[#b1005e]">
                  <span className="material-symbols-outlined text-[24px]">account_balance_wallet</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg font-black text-[#1c1c19] tracking-tight">Add Payout Method</h3>
                  <span className="text-[10px] text-[#8d6f77] uppercase font-bold">Secure Settlement Gateway</span>
                </div>
              </div>
              <button
                className="w-8 h-8 rounded-full bg-[#f6f3ee] flex items-center justify-center text-[#594047] cursor-pointer hover:bg-[#ebe8e3]"
                onClick={() => {
                  if (verificationStage !== 'testing') {
                    setShowAddMethodModal(false);
                  }
                }}
                disabled={verificationStage === 'testing'}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* TAB SELECTOR FOR BANK OR UPI */}
            {verificationStage === 'idle' && (
              <div className="flex bg-[#f6f3ee] p-1 rounded-2xl border border-[#e5e2dd]">
                <button
                  type="button"
                  onClick={() => setNewMethodTab('bank')}
                  className={`flex-1 py-2 text-center rounded-xl text-xs font-black transition-all cursor-pointer ${
                    newMethodTab === 'bank'
                      ? 'bg-white text-[#1c1c19] shadow-2xs'
                      : 'text-[#594047] hover:text-[#1c1c19]'
                  }`}
                >
                  Bank Account Transfer
                </button>
                <button
                  type="button"
                  onClick={() => setNewMethodTab('upi')}
                  className={`flex-1 py-2 text-center rounded-xl text-xs font-black transition-all cursor-pointer ${
                    newMethodTab === 'upi'
                      ? 'bg-white text-[#1c1c19] shadow-2xs'
                      : 'text-[#594047] hover:text-[#1c1c19]'
                  }`}
                >
                  UPI VPA Instant Routing
                </button>
              </div>
            )}

            {/* MAIN CONTENT AREA */}
            {verificationStage === 'idle' ? (
              <div className="flex flex-col gap-3.5">
                {newMethodTab === 'bank' ? (
                  <>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-[#8d6f77] uppercase tracking-wide">Bank Name</label>
                      <input
                        type="text"
                        placeholder="e.g. ICICI Bank Ltd, State Bank of India"
                        value={newBankName}
                        onChange={(e) => setNewBankName(e.target.value)}
                        className="w-full bg-[#f6f3ee] px-4 py-2.5 rounded-xl text-xs text-[#1c1c19] outline-none border border-[#e5e2dd] focus:bg-white focus:ring-1 focus:ring-[#d91b77] focus:border-[#d91b77] transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-[#8d6f77] uppercase tracking-wide">Account Number</label>
                      <input
                        type="text"
                        placeholder="e.g. 5010023489104"
                        value={newAccNo}
                        onChange={(e) => setNewAccNo(e.target.value)}
                        className="w-full bg-[#f6f3ee] px-4 py-2.5 rounded-xl text-xs font-mono text-[#1c1c19] outline-none border border-[#e5e2dd] focus:bg-white focus:ring-1 focus:ring-[#d91b77] focus:border-[#d91b77] transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-[#8d6f77] uppercase tracking-wide">IFSC Code</label>
                        <input
                          type="text"
                          placeholder="e.g. ICIC0000104"
                          value={newIfsc}
                          onChange={(e) => setNewIfsc(e.target.value.toUpperCase())}
                          className="w-full bg-[#f6f3ee] px-4 py-2.5 rounded-xl text-xs font-mono text-[#1c1c19] uppercase outline-none border border-[#e5e2dd] focus:bg-white focus:ring-1 focus:ring-[#d91b77] focus:border-[#d91b77] transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-[#8d6f77] uppercase tracking-wide">Beneficiary Name</label>
                        <input
                          type="text"
                          disabled
                          value={newBeneficiary}
                          className="w-full bg-[#ebe8e3] px-4 py-2.5 rounded-xl text-xs font-bold text-[#594047] cursor-not-allowed border border-[#e5e2dd]"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col gap-3.5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-[#8d6f77] uppercase tracking-wide">UPI Virtual Payment Address (VPA)</label>
                      <input
                        type="text"
                        placeholder="e.g. julian.mercer@hdfcbank"
                        value={newUpiId}
                        onChange={(e) => setNewUpiId(e.target.value)}
                        className="w-full bg-[#f6f3ee] px-4 py-2.5 rounded-xl text-xs font-mono text-[#1c1c19] outline-none border border-[#e5e2dd] focus:bg-white focus:ring-1 focus:ring-[#d91b77] focus:border-[#d91b77] transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-[#8d6f77] uppercase tracking-wide">Beneficiary Name Matching</label>
                      <div className="px-4 py-2.5 bg-[#f6f3ee] rounded-xl text-xs text-[#594047] border border-[#e5e2dd] flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px]">info</span>
                        <span>UPI handle must register to <strong>JULIAN MERCER</strong></span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-3 rounded-xl bg-[#ffd9e2]/30 text-[#8e4767] border border-[#ffd9e2] text-[11px] leading-relaxed flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#b1005e] shrink-0 mt-0.5">shield</span>
                  <p>
                    Nexora uses automated penny drop testing (₹1.00 credit verification) via NPCI bank routes to authenticate and clear newly added payout destinations instantly.
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setShowAddMethodModal(false)}
                    className="flex-1 py-2.5 rounded-full bg-[#f6f3ee] hover:bg-[#ebe8e3] text-[#1c1c19] text-xs font-black transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Validation
                      if (newMethodTab === 'bank') {
                        if (!newBankName.trim()) {
                          triggerToast('Please enter a bank name.');
                          return;
                        }
                        if (newAccNo.trim().length < 8) {
                          triggerToast('Please enter a valid account number.');
                          return;
                        }
                        if (newIfsc.trim().length < 11) {
                          triggerToast('IFSC Code must be 11 characters.');
                          return;
                        }
                      } else {
                        if (!newUpiId.trim() || !newUpiId.includes('@')) {
                          triggerToast('Please enter a valid UPI VPA handle.');
                          return;
                        }
                      }

                      // Start mock penny drop progress
                      setVerificationStage('testing');
                      setVerificationProgressMsg('Initiating bank connection bridge...');
                      
                      setTimeout(() => {
                        setVerificationProgressMsg('Performing ₹1.00 Penny Drop verification via NPCI...');
                      }, 1200);

                      setTimeout(() => {
                        setVerificationProgressMsg('Name match validated with banking ledger: JULIAN MERCER.');
                      }, 2400);

                      setTimeout(() => {
                        // Create the new method
                        const newId = `method-${Date.now()}`;
                        const newMethodRecord: PayoutMethod = newMethodTab === 'bank' ? {
                          id: newId,
                          type: 'bank',
                          bankName: newBankName.trim(),
                          accNo: `•••• •••• •••• ${newAccNo.slice(-4)}`,
                          ifsc: newIfsc.trim(),
                          beneficiary: newBeneficiary,
                          status: 'Active',
                          isPrimary: payoutMethods.length === 0
                        } : {
                          id: newId,
                          type: 'upi',
                          upiId: newUpiId.trim(),
                          status: 'Verified',
                          isPrimary: payoutMethods.length === 0
                        };

                        setPayoutMethods([...payoutMethods, newMethodRecord]);
                        setSelectedMethodId(newId);
                        
                        // Transition out of empty states if we were in no-method state
                        if (flowState === 'no-method') {
                          setFlowState('normal');
                        }

                        setVerificationStage('success');
                      }, 3600);
                    }}
                    className="flex-1 py-2.5 rounded-full bg-[#d91b77] hover:bg-[#b1005e] text-white text-xs font-black shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Link &amp; Verify</span>
                    <span className="material-symbols-outlined text-[16px]">task_alt</span>
                  </button>
                </div>
              </div>
            ) : verificationStage === 'testing' ? (
              <div className="py-8 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 rounded-full border-4 border-[#ffd9e2] border-t-[#d91b77] animate-spin"></div>
                <div className="flex flex-col space-y-1">
                  <h4 className="font-black text-[#1c1c19] text-sm">NPCI Live Check Pending</h4>
                  <p className="text-xs text-[#594047] max-w-xs">{verificationProgressMsg}</p>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[32px]">verified</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <h4 className="font-black text-[#1c1c19] text-base">Payout Method Authenticated</h4>
                  <p className="text-xs text-[#594047] max-w-sm">
                    {newMethodTab === 'bank' ? `${newBankName} account ending in ••••${newAccNo.slice(-4)}` : `UPI handle ${newUpiId}`} has been authorized as a secure settlement destination.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowAddMethodModal(false);
                    setVerificationStage('idle');
                    triggerToast('New payout method successfully integrated!');
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#d91b77] text-white text-xs font-black shadow-md"
                >
                  Continue
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
