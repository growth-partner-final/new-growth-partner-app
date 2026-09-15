export type VerificationStatus = 'unverified' | 'pending_kyc' | 'verified' | 'suspended';
export type PartnerTier = 'Tier 1' | 'Tier 2' | 'Tier 3' | 'Gold Partner';
export type ReferralStatus = 'invited' | 'registered' | 'kyc_pending' | 'in_qualification' | 'qualified' | 'settled';
export type LedgerStatus = 'paid' | 'pending' | 'disputed' | 'available' | 'under_verification' | 'reversed' | 'rejected';

/**
 * --------------------------------------------------------------------------------
 * Comprehensive Entities Mapping to Supabase Database Tables and Client Types
 * --------------------------------------------------------------------------------
 */

/**
 * Entity: Partner
 * Maps to the "partners" table. Represents a registered Growth Partner.
 */
export interface Partner {
  id: string; // Matches auth.users UUID or custom unique partner reference
  full_name: string;
  email: string;
  phone: string;
  referral_code: string; // Unique code generated for referrals
  verification_status: VerificationStatus;
  partner_tier: PartnerTier;
  city?: string | null;
  profession?: string | null;
  upi_id?: string | null; // UPI ID for financial settlement
  joined_at: string;
  created_at: string;
  updated_at?: string | null;
}

export type PartnerRow = Partner;

export interface PartnerInsert {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  referral_code: string;
  verification_status?: VerificationStatus;
  partner_tier?: PartnerTier;
  city?: string | null;
  profession?: string | null;
  upi_id?: string | null;
  joined_at?: string;
  created_at?: string;
  updated_at?: string | null;
}

export interface PartnerUpdate {
  id?: string;
  full_name?: string;
  email?: string;
  phone?: string;
  referral_code?: string;
  verification_status?: VerificationStatus;
  partner_tier?: PartnerTier;
  city?: string | null;
  profession?: string | null;
  upi_id?: string | null;
  joined_at?: string;
  created_at?: string;
  updated_at?: string | null;
}


/**
 * Entity: Salon
 * Maps to the "salons" table. Represents a premium merchant referred by a Growth Partner.
 */
export interface Salon {
  id: string; // Primary Key
  salon_name: string;
  owner_name: string;
  phone: string;
  city: string;
  locality?: string | null;
  address?: string | null;
  salon_code?: string | null; // Allocated unique Nexora code
  status: ReferralStatus;
  lifecycle_stage?: string | null; // "15-Day Active Trial", "Payout Cleared", etc.
  lifecycle_stage_desc?: string | null; // Milestone notes
  consecutive_days_completed: number; // Consecutive transaction days
  total_qr_volume_15_days: number; // Aggregate trial GMV
  daily_min_volume_achieved: boolean; // Flag if current day's target was achieved
  kyc_verified_at?: string | null;
  partner_onboarding_reward_earned?: number | null; // ₹5000 standard reward
  estimated_recurring_payout?: number | null; // Calculated monthly commission
  is_development_sample?: boolean | null; // For simulated demo datasets
  created_at: string;
  qualified_at?: string | null;
}

export type SalonRow = Salon;

export interface SalonInsert {
  id?: string;
  salon_name: string;
  owner_name: string;
  phone: string;
  city: string;
  locality?: string | null;
  address?: string | null;
  salon_code?: string | null;
  status?: ReferralStatus;
  lifecycle_stage?: string | null;
  lifecycle_stage_desc?: string | null;
  consecutive_days_completed?: number;
  total_qr_volume_15_days?: number;
  daily_min_volume_achieved?: boolean;
  kyc_verified_at?: string | null;
  partner_onboarding_reward_earned?: number | null;
  estimated_recurring_payout?: number | null;
  is_development_sample?: boolean | null;
  created_at?: string;
  qualified_at?: string | null;
}

export interface SalonUpdate {
  id?: string;
  salon_name?: string;
  owner_name?: string;
  phone?: string;
  city?: string;
  locality?: string | null;
  address?: string | null;
  salon_code?: string | null;
  status?: ReferralStatus;
  lifecycle_stage?: string | null;
  lifecycle_stage_desc?: string | null;
  consecutive_days_completed?: number;
  total_qr_volume_15_days?: number;
  daily_min_volume_achieved?: boolean;
  kyc_verified_at?: string | null;
  partner_onboarding_reward_earned?: number | null;
  estimated_recurring_payout?: number | null;
  is_development_sample?: boolean | null;
  created_at?: string;
  qualified_at?: string | null;
}


/**
 * Entity: Referral
 * Maps to the "referrals" table. Manages link tracking between Partners and Salons.
 */
export interface Referral {
  id: string; // Primary Key
  partner_id: string; // Foreign Key to partners.id
  salon_id: string; // Foreign Key to salons.id
  referral_code_used: string;
  status: ReferralStatus;
  company_commission_earned: number; // Commission earned by platform
  partner_onboarding_reward_earned: number; // Commission earned by GP
  created_at: string;
  qualified_at?: string | null;
  settled_at?: string | null;
}

export type ReferralRow = Referral;

export interface ReferralInsert {
  id?: string;
  partner_id: string;
  salon_id: string;
  referral_code_used: string;
  status?: ReferralStatus;
  company_commission_earned?: number;
  partner_onboarding_reward_earned?: number;
  created_at?: string;
  qualified_at?: string | null;
  settled_at?: string | null;
}

export interface ReferralUpdate {
  id?: string;
  partner_id?: string;
  salon_id?: string;
  referral_code_used?: string;
  status?: ReferralStatus;
  company_commission_earned?: number;
  partner_onboarding_reward_earned?: number;
  created_at?: string;
  qualified_at?: string | null;
  settled_at?: string | null;
}


/**
 * Entity: EarningsLedger
 * Maps to the "earnings_ledger" table. Tracks auditing details and settlement rows.
 */
export interface EarningsLedger {
  id: string; // Primary Key (UUID)
  partner_id: string; // Foreign Key to partners.id
  salon_id?: string | null; // Foreign Key to salons.id
  transaction_code: string; // Unique transaction reference code
  date: string;
  stream_name: string; // "One-Time Activation Reward", "Recurring Growth Share", etc.
  stream_detail?: string | null; // "10% First 15-Days", etc.
  base_gmv: number; // Gross volume processed by shop
  share_percent: number; // Percentage share (e.g., 10, 5, 2)
  net_payout: number; // Net payout in INR
  status: LedgerStatus;
  status_label?: string | null;
  trace_detail?: string | null; // Full mathematical breakdown tracing calculation steps
  is_negative?: boolean | null; // True for reversals or statutory chargebacks
  created_at: string;
}

export type EarningsLedgerRow = EarningsLedger;

export interface EarningsLedgerInsert {
  id?: string;
  partner_id: string;
  salon_id?: string | null;
  transaction_code: string;
  date?: string;
  stream_name: string;
  stream_detail?: string | null;
  base_gmv: number;
  share_percent: number;
  net_payout: number;
  status?: LedgerStatus;
  status_label?: string | null;
  trace_detail?: string | null;
  is_negative?: boolean | null;
  created_at?: string;
}

export interface EarningsLedgerUpdate {
  id?: string;
  partner_id?: string;
  salon_id?: string | null;
  transaction_code?: string;
  date?: string;
  stream_name?: string;
  stream_detail?: string | null;
  base_gmv?: number;
  share_percent?: number;
  net_payout?: number;
  status?: LedgerStatus;
  status_label?: string | null;
  trace_detail?: string | null;
  is_negative?: boolean | null;
  created_at?: string;
}


/**
 * Comprehensive Database mapping for Supabase Client typed integration
 */
export interface Database {
  public: {
    Tables: {
      partners: {
        Row: PartnerRow;
        Insert: PartnerInsert;
        Update: PartnerUpdate;
      };
      salons: {
        Row: SalonRow;
        Insert: SalonInsert;
        Update: SalonUpdate;
      };
      referrals: {
        Row: ReferralRow;
        Insert: ReferralInsert;
        Update: ReferralUpdate;
      };
      earnings_ledger: {
        Row: EarningsLedgerRow;
        Insert: EarningsLedgerInsert;
        Update: EarningsLedgerUpdate;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
