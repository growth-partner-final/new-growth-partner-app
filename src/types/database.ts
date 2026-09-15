export type VerificationStatus = 'unverified' | 'pending_kyc' | 'verified' | 'suspended';
export type PartnerTier = 'Tier 1' | 'Tier 2' | 'Tier 3' | 'Gold Partner';
export type ReferralStatus = 'invited' | 'registered' | 'kyc_pending' | 'in_qualification' | 'qualified' | 'settled';
export type LedgerStatus = 'paid' | 'pending' | 'disputed';

export interface PartnerRow {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  referral_code: string;
  verification_status: VerificationStatus;
  partner_tier: PartnerTier;
  city?: string | null;
  profession?: string | null;
  upi_id?: string | null;
  joined_at: string;
  created_at: string;
  updated_at?: string | null;
}

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

export interface SalonRow {
  id: string;
  salon_name: string;
  owner_name: string;
  phone: string;
  city: string;
  locality?: string | null;
  address?: string | null;
  salon_code?: string | null;
  status: ReferralStatus;
  consecutive_days_completed: number;
  total_qr_volume_15_days: number;
  daily_min_volume_achieved: boolean;
  is_development_sample?: boolean | null;
  created_at: string;
  qualified_at?: string | null;
}

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
  consecutive_days_completed?: number;
  total_qr_volume_15_days?: number;
  daily_min_volume_achieved?: boolean;
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
  consecutive_days_completed?: number;
  total_qr_volume_15_days?: number;
  daily_min_volume_achieved?: boolean;
  is_development_sample?: boolean | null;
  created_at?: string;
  qualified_at?: string | null;
}

export interface ReferralRow {
  id: string;
  partner_id: string;
  salon_id: string;
  referral_code_used: string;
  status: ReferralStatus;
  company_commission_earned: number;
  partner_onboarding_reward_earned: number;
  created_at: string;
  qualified_at?: string | null;
  settled_at?: string | null;
}

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

export interface EarningsLedgerRow {
  id: string;
  partner_id: string;
  salon_id?: string | null;
  transaction_code: string;
  date: string;
  stream_name: string;
  stream_detail?: string | null;
  base_gmv: number;
  share_percent: number;
  net_payout: number;
  status: LedgerStatus;
  status_label?: string | null;
  trace_detail?: string | null;
  is_negative?: boolean | null;
  created_at: string;
}

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
