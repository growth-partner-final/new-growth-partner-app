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
