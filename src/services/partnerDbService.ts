import { createClient, SupabaseClient } from '@supabase/supabase-js';

// ==============================================================================
// TYPES & DATA INTERFACES
// ==============================================================================

export interface PartnerDashboardMetrics {
  partnerId: string;
  fullName: string;
  referralCode: string;
  totalEarnings: number;
  creditedEarnings: number;
  pendingEarnings: number;
  withdrawnEarnings: number;
  activeSalonsCount: number;
  totalReferredSalonsCount: number;
  currentMilestoneLevel: {
    tierName: string;
    rewardAssetTitle: string;
    requiredShops: number;
    achieved: boolean;
    nextMilestone: {
      tierName: string;
      rewardAssetTitle: string;
      shopsNeeded: number;
    } | null;
  };
}

export interface NewSalonReferralInput {
  partnerId: string;
  businessName: string;
  ownerName: string;
  contactPhone: string;
  contactEmail?: string;
  address: string;
  city: string;
}

export interface MilestoneClaimInput {
  partnerId: string;
  milestoneId: string;
  shippingAddress: string;
  contactPhone: string;
}

export interface WithdrawalRequestInput {
  partnerId: string;
  amount: number;
  bankAccountDetails: {
    accountNumber: string;
    ifscCode: string;
    bankName: string;
    upiId?: string;
  };
}

export interface TransactionLedgerItem {
  id: string;
  amount: number;
  type: 'activation_bonus' | 'recurring_commission' | 'referral_bonus';
  status: 'pending' | 'credited' | 'withdrawn';
  description: string;
  createdAt: string;
  salonBusinessName?: string;
}

export interface WithdrawalRecord {
  id: string;
  amount: number;
  status: 'processing' | 'completed' | 'rejected';
  requestDate: string;
  settlementDate?: string;
  bankDetails: Record<string, string>;
  referenceId?: string;
}

// ==============================================================================
// NEXORA DATABASE SERVICE CLASS
// ==============================================================================

export class NexoraPartnerDbService {
  private supabase: SupabaseClient;

  constructor(supabaseUrl?: string, supabaseKey?: string) {
    const url = supabaseUrl || process.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
    const key = supabaseKey || process.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';
    this.supabase = createClient(url, key);
  }

  // ----------------------------------------------------------------------------
  // a) Fetch Partner Dashboard Metrics
  // ----------------------------------------------------------------------------
  async getPartnerDashboardMetrics(partnerId: string): Promise<PartnerDashboardMetrics> {
    if (!partnerId) throw new Error('Partner ID is required');

    // Fetch partner profile from existing growth_partners, profiles, or partners table
    let user: { id: string; full_name?: string; referral_code?: string } | null = null;

    try {
      const { data: gpData } = await this.supabase
        .from('growth_partners')
        .select('id, full_name, referral_code')
        .or(`id.eq.${partnerId},user_id.eq.${partnerId}`)
        .maybeSingle();

      if (gpData) {
        user = gpData;
      } else {
        const { data: profileData } = await this.supabase
          .from('profiles')
          .select('id, full_name, referral_code')
          .eq('id', partnerId)
          .maybeSingle();

        if (profileData) {
          user = profileData;
        } else {
          const { data: pData } = await this.supabase
            .from('partners')
            .select('id, full_name, referral_code')
            .eq('id', partnerId)
            .maybeSingle();

          if (pData) {
            user = pData;
          }
        }
      }
    } catch {
      // Ignore query errors if specific tables are absent
    }

    if (!user) {
      // Return safe default object for partner ID so metrics call does not break
      user = {
        id: partnerId,
        full_name: 'Growth Partner',
        referral_code: `REF-${partnerId.slice(0, 8).toUpperCase()}`
      };
    }

    // Fetch active salon count
    const { count: activeSalonsCount, error: activeSalonsErr } = await this.supabase
      .from('salons')
      .select('id', { count: 'exact', head: true })
      .eq('partner_id', partnerId)
      .eq('status', 'activated');

    if (activeSalonsErr) throw new Error(`Error fetching active salons: ${activeSalonsErr.message}`);

    // Fetch total salon count
    const { count: totalSalonsCount } = await this.supabase
      .from('salons')
      .select('id', { count: 'exact', head: true })
      .eq('partner_id', partnerId);

    // Fetch earnings summary from transactions
    const { data: transactions } = await this.supabase
      .from('earnings_transactions')
      .select('amount, status')
      .eq('partner_id', partnerId);

    let totalEarnings = 0;
    let creditedEarnings = 0;
    let pendingEarnings = 0;

    (transactions || []).forEach(tx => {
      const amt = Number(tx.amount) || 0;
      totalEarnings += amt;
      if (tx.status === 'credited') creditedEarnings += amt;
      if (tx.status === 'pending') pendingEarnings += amt;
    });

    // Fetch total withdrawn
    const { data: withdrawals } = await this.supabase
      .from('withdrawals')
      .select('amount')
      .eq('partner_id', partnerId)
      .eq('status', 'completed');

    const withdrawnEarnings = (withdrawals || []).reduce((sum, w) => sum + Number(w.amount), 0);

    // Fetch Milestone Ladders to calculate level
    const { data: milestones } = await this.supabase
      .from('milestone_rewards')
      .select('*')
      .order('required_active_shops', { ascending: true });

    const count = activeSalonsCount || 0;
    let currentTier = milestones?.[0] || {
      tier_name: 'Level 1: Rising Star',
      reward_asset_title: 'Official Nexora T-Shirt',
      required_active_shops: 25
    };

    let nextMilestone = null;

    if (milestones && milestones.length > 0) {
      for (let i = 0; i < milestones.length; i++) {
        if (count >= milestones[i].required_active_shops) {
          currentTier = milestones[i];
          if (i + 1 < milestones.length) {
            const next = milestones[i + 1];
            nextMilestone = {
              tierName: next.tier_name,
              rewardAssetTitle: next.reward_asset_title,
              shopsNeeded: next.required_active_shops - count
            };
          }
        } else if (i === 0) {
          // Hasn't reached first milestone yet
          nextMilestone = {
            tierName: milestones[0].tier_name,
            rewardAssetTitle: milestones[0].reward_asset_title,
            shopsNeeded: milestones[0].required_active_shops - count
          };
          break;
        }
      }
    }

    return {
      partnerId: user.id,
      fullName: user.full_name,
      referralCode: user.referral_code,
      totalEarnings,
      creditedEarnings,
      pendingEarnings,
      withdrawnEarnings,
      activeSalonsCount: count,
      totalReferredSalonsCount: totalSalonsCount || 0,
      currentMilestoneLevel: {
        tierName: currentTier.tier_name,
        rewardAssetTitle: currentTier.reward_asset_title,
        requiredShops: currentTier.required_active_shops,
        achieved: count >= currentTier.required_active_shops,
        nextMilestone
      }
    };
  }

  // ----------------------------------------------------------------------------
  // b) Add New Salon Referral
  // ----------------------------------------------------------------------------
  async addSalonReferral(input: NewSalonReferralInput) {
    if (!input.partnerId) throw new Error('Partner ID is required');
    if (!input.businessName?.trim()) throw new Error('Business Name is required');
    if (!input.ownerName?.trim()) throw new Error('Owner Name is required');
    if (!input.contactPhone || !/^\+?[0-9]{10,15}$/.test(input.contactPhone.replace(/\s/g, ''))) {
      throw new Error('Valid contact phone number is required (10-15 digits)');
    }

    const { data, error } = await this.supabase
      .from('salons')
      .insert({
        partner_id: input.partnerId,
        business_name: input.businessName.trim(),
        owner_name: input.ownerName.trim(),
        contact_phone: input.contactPhone.trim(),
        contact_email: input.contactEmail?.trim() || null,
        address: input.address.trim(),
        city: input.city.trim(),
        status: 'lead',
        registration_date: new Date().toISOString()
      })
      .select('*')
      .single();

    if (error) {
      throw new Error(`Failed to insert salon referral: ${error.message}`);
    }

    return data;
  }

  // ----------------------------------------------------------------------------
  // c) Claim a Milestone Reward
  // ----------------------------------------------------------------------------
  async claimMilestoneReward(input: MilestoneClaimInput) {
    if (!input.partnerId) throw new Error('Partner ID is required');
    if (!input.milestoneId) throw new Error('Milestone ID is required');
    if (!input.shippingAddress || input.shippingAddress.trim().length < 10) {
      throw new Error('A valid detailed shipping address is required');
    }

    // Check milestone eligibility
    const { data: milestone, error: msErr } = await this.supabase
      .from('milestone_rewards')
      .select('*')
      .eq('id', input.milestoneId)
      .single();

    if (msErr || !milestone) {
      throw new Error('Milestone reward target not found.');
    }

    // Verify active salons count meets required threshold
    const { count: activeCount } = await this.supabase
      .from('salons')
      .select('id', { count: 'exact', head: true })
      .eq('partner_id', input.partnerId)
      .eq('status', 'activated');

    if ((activeCount || 0) < milestone.required_active_shops) {
      throw new Error(
        `Eligibility criteria not met. Required active shops: ${milestone.required_active_shops}, current: ${activeCount || 0}`
      );
    }

    // Insert claim record
    const { data, error } = await this.supabase
      .from('partner_milestone_claims')
      .insert({
        partner_id: input.partnerId,
        milestone_id: input.milestoneId,
        shipping_address: input.shippingAddress.trim(),
        contact_phone: input.contactPhone.trim(),
        status: 'pending',
        claim_date: new Date().toISOString()
      })
      .select('*')
      .single();

    if (error) {
      if (error.code === '23505') {
        throw new Error('You have already claimed this milestone reward.');
      }
      throw new Error(`Claim registration failed: ${error.message}`);
    }

    return data;
  }

  // ----------------------------------------------------------------------------
  // d) Fetch Withdrawal & Earnings History
  // ----------------------------------------------------------------------------
  async getEarningsAndWithdrawalsHistory(partnerId: string) {
    if (!partnerId) throw new Error('Partner ID is required');

    const [txRes, wdrRes] = await Promise.all([
      this.supabase
        .from('earnings_transactions')
        .select(`
          id,
          amount,
          type,
          status,
          description,
          created_at,
          salons ( business_name )
        `)
        .eq('partner_id', partnerId)
        .order('created_at', { ascending: false }),

      this.supabase
        .from('withdrawals')
        .select('*')
        .eq('partner_id', partnerId)
        .order('request_date', { ascending: false })
    ]);

    if (txRes.error) throw new Error(`Transactions error: ${txRes.error.message}`);
    if (wdrRes.error) throw new Error(`Withdrawals error: ${wdrRes.error.message}`);

    const transactions: TransactionLedgerItem[] = (txRes.data || []).map(tx => ({
      id: tx.id,
      amount: Number(tx.amount),
      type: tx.type,
      status: tx.status,
      description: tx.description || 'Commission Transaction',
      createdAt: tx.created_at,
      salonBusinessName: (tx.salons as unknown as { business_name: string })?.business_name
    }));

    const withdrawals: WithdrawalRecord[] = (wdrRes.data || []).map(w => ({
      id: w.id,
      amount: Number(w.amount),
      status: w.status,
      requestDate: w.request_date,
      settlementDate: w.settlement_date,
      bankDetails: w.bank_details_json,
      referenceId: w.reference_id
    }));

    return {
      transactions,
      withdrawals
    };
  }

  // ----------------------------------------------------------------------------
  // e) Request Payout Withdrawal
  // ----------------------------------------------------------------------------
  async requestWithdrawal(input: WithdrawalRequestInput) {
    if (!input.partnerId) throw new Error('Partner ID is required');
    if (!input.amount || input.amount < 500) {
      throw new Error('Minimum withdrawal amount is ₹500');
    }

    // Verify balance
    const metrics = await this.getPartnerDashboardMetrics(input.partnerId);
    const availableBalance = metrics.creditedEarnings - metrics.withdrawnEarnings;

    if (input.amount > availableBalance) {
      throw new Error(`Insufficient credited balance. Available: ₹${availableBalance.toLocaleString('en-IN')}`);
    }

    const { data, error } = await this.supabase
      .from('withdrawals')
      .insert({
        partner_id: input.partnerId,
        amount: input.amount,
        bank_details_json: input.bankAccountDetails,
        status: 'processing',
        request_date: new Date().toISOString()
      })
      .select('*')
      .single();

    if (error) throw new Error(`Withdrawal creation failed: ${error.message}`);

    return data;
  }
}

export const partnerDbService = new NexoraPartnerDbService();
