import { PartnerProfile, SalonReferral, PartnerEarningsSummary, MilestoneProgressItem, PartnerRepositoryInterface } from '../types';

export const STANDARD_REFERRAL_CODE = 'REF-5A45019655';

export const DEV_SAMPLE_PROFILE: PartnerProfile = {
  id: 'DEV-GP-001',
  fullName: 'Growth Partner [DEV SAMPLE]',
  email: 'partner.dev@nexora.network',
  phone: '+91 98765 43210',
  referralCode: STANDARD_REFERRAL_CODE,
  verificationStatus: 'verified',
  partnerTier: 'Tier 1',
  joinedAt: '2025-01-15'
};

export const DEV_SAMPLE_REFERRALS: SalonReferral[] = [
  {
    id: 'DEV-REF-101',
    salonName: 'Apex Beauty Hub [DEV SAMPLE]',
    ownerName: 'Salon Partner A',
    phone: '+91 98111 22233',
    city: 'Bengaluru',
    referralCodeUsed: STANDARD_REFERRAL_CODE,
    status: 'qualified',
    consecutiveDaysCompleted: 15,
    totalQrVolume15Days: 15000, // min ₹15,000
    dailyMinVolumeAchieved: true, // min ₹1,000/day for 15 consecutive days
    companyCommissionEarned: 1500, // 10% of ₹15,000
    partnerOnboardingRewardEarned: 150, // 10% of ₹1,500 company commission
    createdAt: '2025-02-01',
    qualifiedAt: '2025-02-16',
    isDevelopmentSample: true
  },
  {
    id: 'DEV-REF-102',
    salonName: 'Aura Unisex Lounge [DEV SAMPLE]',
    ownerName: 'Salon Partner B',
    phone: '+91 98222 33344',
    city: 'Mumbai',
    referralCodeUsed: STANDARD_REFERRAL_CODE,
    status: 'qualified',
    consecutiveDaysCompleted: 15,
    totalQrVolume15Days: 50000,
    dailyMinVolumeAchieved: true,
    companyCommissionEarned: 5000, // 10% of ₹50,000
    partnerOnboardingRewardEarned: 500, // 10% of ₹5,000 company commission
    createdAt: '2025-02-05',
    qualifiedAt: '2025-02-20',
    isDevelopmentSample: true
  },
  {
    id: 'DEV-REF-103',
    salonName: 'Velvet Cuts & Spa [DEV SAMPLE]',
    ownerName: 'Salon Partner C',
    phone: '+91 98333 44455',
    city: 'Delhi NCR',
    referralCodeUsed: STANDARD_REFERRAL_CODE,
    status: 'in_qualification',
    consecutiveDaysCompleted: 9,
    totalQrVolume15Days: 11200,
    dailyMinVolumeAchieved: true,
    companyCommissionEarned: 0,
    partnerOnboardingRewardEarned: 0,
    createdAt: '2025-03-01',
    isDevelopmentSample: true
  }
];

export const EXACT_MILESTONES: MilestoneProgressItem[] = [
  {
    threshold: 25,
    rewardName: 'Official Nexora T-Shirt',
    tierTitle: 'Level 1: Rising Star',
    description: 'Custom partner welcome merchandise kit awarded upon 25 qualified onboardings.',
    status: 'eligible'
  },
  {
    threshold: 50,
    rewardName: 'Samsung Tablet',
    tierTitle: 'Level 2: Associate',
    description: 'Dedicated partner digital presentation tablet awarded upon 50 qualified onboardings.',
    status: 'in_progress'
  },
  {
    threshold: 100,
    rewardName: 'Branded HP Laptop',
    tierTitle: 'Level 3: Manager',
    description: 'Enterprise laptop awarded upon 100 qualified onboardings.',
    status: 'locked'
  },
  {
    threshold: 250,
    rewardName: 'Electric Scooter',
    tierTitle: 'Level 4: Director',
    description: 'Eco-mobility partner vehicle grant awarded upon 250 qualified onboardings.',
    status: 'locked'
  },
  {
    threshold: 500,
    rewardName: 'Latest iPhone',
    tierTitle: 'Level 5: Vice President',
    description: 'Flagship executive smartphone awarded upon 500 qualified onboardings.',
    status: 'locked'
  },
  {
    threshold: 750,
    rewardName: 'Royal Enfield 350 CC',
    tierTitle: 'Level 6: President',
    description: 'Classic cruiser motorcycle grant awarded upon 750 qualified onboardings.',
    status: 'locked'
  },
  {
    threshold: 1000,
    rewardName: 'District Partner SUV Car',
    tierTitle: 'Level 7: Global Ambassador',
    description: 'Apex district partner automobile award upon 1,000+ qualified onboardings.',
    status: 'locked'
  }
];

export class MockPartnerService implements PartnerRepositoryInterface {
  async getProfile(): Promise<PartnerProfile> {
    return Promise.resolve(DEV_SAMPLE_PROFILE);
  }

  async getReferrals(): Promise<SalonReferral[]> {
    return Promise.resolve(DEV_SAMPLE_REFERRALS);
  }

  async getEarningsSummary(): Promise<PartnerEarningsSummary> {
    const referrals = DEV_SAMPLE_REFERRALS;
    const qualified = referrals.filter(r => r.status === 'qualified');
    const totalCompanyCommission = qualified.reduce((acc, r) => acc + r.companyCommissionEarned, 0);
    const totalPartnerReward = qualified.reduce((acc, r) => acc + r.partnerOnboardingRewardEarned, 0);

    return Promise.resolve({
      totalSettledOnboardingRewards: totalPartnerReward,
      totalCompanyCommissionGenerated: totalCompanyCommission,
      qualifiedSalonsCount: qualified.length,
      pendingQualificationCount: referrals.filter(r => r.status === 'in_qualification' || r.status === 'registered').length,
      lastPayoutDate: '2025-03-01'
    });
  }

  async getMilestones(): Promise<MilestoneProgressItem[]> {
    return Promise.resolve(EXACT_MILESTONES);
  }

  async submitClaim(milestoneThreshold: number, deliveryAddress: string, otp: string): Promise<{ success: boolean; claimId?: string; error?: string }> {
    if (!otp || otp.trim().length !== 6) {
      return Promise.resolve({ success: false, error: 'Please enter a valid 6-digit authorization OTP.' });
    }
    if (!deliveryAddress || deliveryAddress.trim().length < 10) {
      return Promise.resolve({ success: false, error: 'Please enter a complete delivery destination address.' });
    }
    return Promise.resolve({
      success: true,
      claimId: `CLAIM-${milestoneThreshold}-${Date.now().toString().slice(-6)}`
    });
  }
}

export const partnerService = new MockPartnerService();
