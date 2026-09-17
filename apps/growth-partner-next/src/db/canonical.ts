/**
 * Canonical database contract — Phase 0.
 *
 * This list is the single source of truth for the EXISTING live schema of
 * Supabase project `qwaehqsmodekbgvnaavz`. The Growth Partner implementation
 * REUSES and MAPS these tables; it must never create parallel camelCase
 * duplicates such as `GrowthPartner`, `Salon`, `ShopPayments` or
 * `PartnerEarnings`.
 *
 * The contract tests in src/db/schema.contract.test.ts enforce:
 *   - the Drizzle schema exports EXACTLY these tables (set equality),
 *   - no forbidden duplicate model name is introduced,
 *   - every table name stays snake_case.
 */

export const CANONICAL_TABLE_NAMES = [
  // Identity & partner graph
  'profiles',
  'growth_partners',
  'partner_referrals',
  'organizations',
  'organization_members',
  // Merchant (shop/salon) onboarding & attribution
  'salons',
  'shop_onboarding_applications',
  'shop_attributions',
  // Commission engine
  'commission_plans',
  'commission_plan_versions',
  'commission_events',
  'payments',
  // Qualification & rewards
  'partner_shop_daily_qualification',
  'partner_shop_onboarding_rewards',
  'partner_reward_milestones',
  'partner_reward_claims',
  // Template handoff security
  'template_handoffs',
] as const;

export type CanonicalTableName = (typeof CANONICAL_TABLE_NAMES)[number];

/**
 * Duplicate/legacy model names that must NEVER be (re)introduced.
 * Any exported Drizzle table or generated table name equal to one of these
 * (case-insensitive) fails the contract tests.
 */
export const FORBIDDEN_MODEL_NAMES = [
  'GrowthPartner',
  'growthPartner',
  'growth-partner',
  'Salon',
  'ShopPayments',
  'shopPayments',
  'shop_payments',
  'PartnerEarnings',
  'partnerEarnings',
  'partner_earnings',
  'Partner',
  'partners',
  'Merchant',
  'merchants',
] as const;
