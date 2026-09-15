export interface PartnerProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  referralCode: string; // REF-5A45019655
  verificationStatus: 'unverified' | 'pending_kyc' | 'verified' | 'suspended';
  partnerTier: 'Tier 1' | 'Tier 2' | 'Tier 3' | 'Gold Partner';
  joinedAt: string;
}

export interface SalonReferral {
  id: string;
  salonName: string;
  ownerName: string;
  phone: string;
  city: string;
  referralCodeUsed: string; // REF-5A45019655
  status: 'invited' | 'registered' | 'kyc_pending' | 'in_qualification' | 'qualified' | 'settled';
  consecutiveDaysCompleted: number; // Required: 15 consecutive days
  totalQrVolume15Days: number; // Minimum required: ₹15,000
  dailyMinVolumeAchieved: boolean; // Minimum ₹1,000/day
  companyCommissionEarned: number; // 10% of QR business (min ₹1,500)
  partnerOnboardingRewardEarned: number; // 10% of company commission (e.g. ₹150 for ₹15k, ₹500 for ₹50k)
  createdAt: string;
  qualifiedAt?: string;
  isDevelopmentSample?: boolean;
}

export interface PartnerEarningsSummary {
  totalSettledOnboardingRewards: number;
  totalCompanyCommissionGenerated: number;
  qualifiedSalonsCount: number;
  pendingQualificationCount: number;
  lastPayoutDate?: string;
}

export interface MilestoneProgressItem {
  threshold: number; // 25, 50, 100, 250, 500, 750, 1000
  rewardName: string;
  tierTitle: string;
  description: string;
  status: 'locked' | 'in_progress' | 'eligible' | 'under_review' | 'approved' | 'dispatched' | 'delivered' | 'rejected';
  claimedAt?: string;
  trackingNumber?: string;
}

export interface ServiceState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  isEmpty: boolean;
}

export interface PartnerRepositoryInterface {
  getProfile(): Promise<PartnerProfile>;
  getReferrals(): Promise<SalonReferral[]>;
  getEarningsSummary(): Promise<PartnerEarningsSummary>;
  getMilestones(): Promise<MilestoneProgressItem[]>;
  submitClaim(milestoneThreshold: number, deliveryAddress: string, otp: string): Promise<{ success: boolean; claimId?: string; error?: string }>;
}

export interface MilestoneLevel {
  id: string;
  level: number;
  name: string;
  subtitle: string;
  cashBonus: string;
  cashBonusNum: number;
  perks: string;
  clientsRequired: number;
  highlight?: boolean;
  colorClass: string;
  icon: string;
}

export interface ActivationTier {
  id: string;
  name: string;
  badge?: string;
  subtitle: string;
  payout: string;
  payoutNum: number;
  icon: string;
  features: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface PartnerFormData {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  profession: string;
  upiId: string;
  agreedToTerms: boolean;
}
