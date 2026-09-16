import {
  pgTable,
  uuid,
  text,
  integer,
  boolean,
  timestamp,
  date,
  jsonb,
  uniqueIndex,
  index,
} from 'drizzle-orm/pg-core';

/**
 * Canonical Drizzle ORM mappings — Phase 0.
 *
 * These declarations MAP the existing snake_case tables of Supabase project
 * `qwaehqsmodekbgvnaavz`. They are read/write mappings only:
 *
 *   - NO migration is generated or applied from this file (no drizzle-kit
 *     migration folder is part of Phase 0, per the PRD rollout plan).
 *   - NO production data is ever mutated by Phase 0 code.
 *   - NO parallel camelCase models (GrowthPartner/Salon/ShopPayments/
 *     PartnerEarnings) exist here — see src/db/canonical.ts.
 *
 * Conventions:
 *   - All money amounts are integer paise (1 INR = 100 paise) → `*_paise`.
 *   - All rates are integer basis points (1% = 100 bps) → `*_bps`.
 *   - Timestamps are `timestamptz` in UTC.
 */

const timestamps = {
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
};

/* ------------------------------------------------------------------------- */
/* Identity & partner graph                                                  */
/* ------------------------------------------------------------------------- */

/**
 * profiles — mirrors auth.users (Supabase Auth, same as the Template App).
 * id === auth.users.id.
 */
export const profiles = pgTable(
  'profiles',
  {
    id: uuid('id').primaryKey(),
    fullName: text('full_name'),
    email: text('email'),
    phone: text('phone'),
    avatarUrl: text('avatar_url'),
    role: text('role').notNull().default('user'),
    ...timestamps,
  },
  (table) => [index('profiles_role_idx').on(table.role)],
);

/**
 * growth_partners — a profile enrolled in the Growth Partner program.
 * One row per enrolled partner; referral_code is the public share code.
 */
export const growthPartners = pgTable(
  'growth_partners',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    profileId: uuid('profile_id')
      .notNull()
      .references(() => profiles.id),
    referralCode: text('referral_code').notNull().unique(),
    status: text('status').notNull().default('active'),
    verificationStatus: text('verification_status')
      .notNull()
      .default('unverified'),
    tier: text('tier').notNull().default('Tier 1'),
    city: text('city'),
    profession: text('profession'),
    upiId: text('upi_id'),
    kycVerifiedAt: timestamp('kyc_verified_at', { withTimezone: true }),
    joinedAt: timestamp('joined_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    ...timestamps,
  },
  (table) => [
    uniqueIndex('growth_partners_profile_id_key').on(table.profileId),
    index('growth_partners_status_idx').on(table.status),
  ],
);

/**
 * partner_referrals — partner → referred partner/shop lead graph edges.
 */
export const partnerReferrals = pgTable(
  'partner_referrals',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    partnerId: uuid('partner_id')
      .notNull()
      .references(() => growthPartners.id),
    referredProfileId: uuid('referred_profile_id').references(
      () => profiles.id,
    ),
    referralCode: text('referral_code'),
    status: text('status').notNull().default('invited'),
    qualifiedAt: timestamp('qualified_at', { withTimezone: true }),
    settledAt: timestamp('settled_at', { withTimezone: true }),
    ...timestamps,
  },
  (table) => [index('partner_referrals_partner_idx').on(table.partnerId)],
);

/**
 * organizations — team/agency shells (used when a partner runs a team).
 */
export const organizations = pgTable('organizations', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  type: text('type').notNull().default('partner_team'),
  createdByProfileId: uuid('created_by_profile_id').references(
    () => profiles.id,
  ),
  ...timestamps,
});

/**
 * organization_members — membership of profiles in organizations.
 */
export const organizationMembers = pgTable(
  'organization_members',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    organizationId: uuid('organization_id')
      .notNull()
      .references(() => organizations.id),
    profileId: uuid('profile_id')
      .notNull()
      .references(() => profiles.id),
    role: text('role').notNull().default('member'),
    ...timestamps,
  },
  (table) => [
    uniqueIndex('organization_members_org_profile_key').on(
      table.organizationId,
      table.profileId,
    ),
  ],
);

/* ------------------------------------------------------------------------- */
/* Merchant (shop/salon) onboarding & attribution                            */
/* ------------------------------------------------------------------------- */

/**
 * salons — canonical merchant entity ("shop" in program language).
 * Qualification progress lives in partner_shop_daily_qualification, NOT here.
 */
export const salons = pgTable(
  'salons',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    salonName: text('salon_name').notNull(),
    ownerName: text('owner_name'),
    phone: text('phone'),
    email: text('email'),
    city: text('city'),
    locality: text('locality'),
    address: text('address'),
    salonCode: text('salon_code').unique(),
    status: text('status').notNull().default('registered'),
    kycVerifiedAt: timestamp('kyc_verified_at', { withTimezone: true }),
    ...timestamps,
  },
  (table) => [index('salons_status_idx').on(table.status)],
);

/**
 * shop_onboarding_applications — the locked multi-step onboarding flow for a
 * salon (documents, KYC, QR activation). One active application per salon.
 */
export const shopOnboardingApplications = pgTable(
  'shop_onboarding_applications',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    salonId: uuid('salon_id')
      .notNull()
      .references(() => salons.id),
    partnerId: uuid('partner_id').references(() => growthPartners.id),
    organizationId: uuid('organization_id').references(() => organizations.id),
    status: text('status').notNull().default('draft'),
    currentStep: integer('current_step').notNull().default(1),
    payload: jsonb('payload'),
    submittedAt: timestamp('submitted_at', { withTimezone: true }),
    reviewedAt: timestamp('reviewed_at', { withTimezone: true }),
    reviewedByProfileId: uuid('reviewed_by_profile_id').references(
      () => profiles.id,
    ),
    ...timestamps,
  },
  (table) => [
    index('shop_onboarding_applications_salon_idx').on(table.salonId),
    index('shop_onboarding_applications_status_idx').on(table.status),
  ],
);

/**
 * shop_attributions — EXACTLY ONE partner is attributed per salon; the
 * attribution is locked once made (anti-poaching rule from the PRD).
 */
export const shopAttributions = pgTable(
  'shop_attributions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    salonId: uuid('salon_id')
      .notNull()
      .references(() => salons.id),
    partnerId: uuid('partner_id')
      .notNull()
      .references(() => growthPartners.id),
    referralCode: text('referral_code'),
    source: text('source').notNull().default('referral_link'),
    attributedAt: timestamp('attributed_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    lockedAt: timestamp('locked_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex('shop_attributions_salon_key').on(table.salonId),
    index('shop_attributions_partner_idx').on(table.partnerId),
  ],
);

/* ------------------------------------------------------------------------- */
/* Commission engine                                                         */
/* ------------------------------------------------------------------------- */

/**
 * commission_plans — named plan shells (e.g. "standard_growth_partner").
 * Rates are versioned in commission_plan_versions.
 */
export const commissionPlans = pgTable('commission_plans', {
  id: uuid('id').primaryKey().defaultRandom(),
  key: text('key').notNull().unique(),
  name: text('name').notNull(),
  description: text('description'),
  status: text('status').notNull().default('active'),
  ...timestamps,
});

/**
 * commission_plan_versions — immutable, effective-dated rule versions.
 * Defaults below mirror the PRD exactly:
 *   min ₹1,000 genuine QR/day · 15 consecutive days · 10% company commission
 *   activation reward 10% of company commission from first 15 qualifying days
 *   recurring share 10% (months 1–6) / 5% (7–12) / 2% (>12)
 */
export const commissionPlanVersions = pgTable(
  'commission_plan_versions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    planId: uuid('plan_id')
      .notNull()
      .references(() => commissionPlans.id),
    version: integer('version').notNull(),
    effectiveFrom: timestamp('effective_from', { withTimezone: true })
      .notNull()
      .defaultNow(),
    effectiveTo: timestamp('effective_to', { withTimezone: true }),
    minDailyQrAmountPaise: integer('min_daily_qr_amount_paise')
      .notNull()
      .default(100_000), // ₹1,000
    consecutiveQualifyingDays: integer('consecutive_qualifying_days')
      .notNull()
      .default(15),
    companyCommissionBps: integer('company_commission_bps')
      .notNull()
      .default(1_000), // 10%
    activationRewardBps: integer('activation_reward_bps')
      .notNull()
      .default(1_000), // 10% of company commission (first 15 qualifying days)
    recurringMonths16Bps: integer('recurring_months_1_6_bps')
      .notNull()
      .default(1_000), // 10%
    recurringMonths712Bps: integer('recurring_months_7_12_bps')
      .notNull()
      .default(500), // 5%
    recurringAfter12Bps: integer('recurring_after_12_bps')
      .notNull()
      .default(200), // 2%
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex('commission_plan_versions_plan_version_key').on(
      table.planId,
      table.version,
    ),
  ],
);

/**
 * commission_events — every money movement owed to/earned by a partner.
 * Ledger types (see COMMISSION_EVENT_TYPES): company_commission ·
 * onboarding_reward · recurring_growth_share (one row per month_index).
 * One-time rewards and recurring shares are ALWAYS separate rows.
 * Append-only ledger rows; settlement rows live in payments.
 */
export const commissionEvents = pgTable(
  'commission_events',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    partnerId: uuid('partner_id')
      .notNull()
      .references(() => growthPartners.id),
    salonId: uuid('salon_id').references(() => salons.id),
    planVersionId: uuid('plan_version_id').references(
      () => commissionPlanVersions.id,
    ),
    eventType: text('event_type').notNull(),
    monthIndex: integer('month_index'),
    amountPaise: integer('amount_paise').notNull(),
    currency: text('currency').notNull().default('INR'),
    status: text('status').notNull().default('accrued'),
    occurredAt: timestamp('occurred_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index('commission_events_partner_idx').on(table.partnerId),
    index('commission_events_type_status_idx').on(
      table.eventType,
      table.status,
    ),
  ],
);

/**
 * payments — settlement of commission_events / rewards to the partner
 * (UPI or bank transfer). Never stored in browser-reachable env vars.
 */
export const payments = pgTable(
  'payments',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    partnerId: uuid('partner_id').references(() => growthPartners.id),
    commissionEventId: uuid('commission_event_id').references(
      () => commissionEvents.id,
    ),
    amountPaise: integer('amount_paise').notNull(),
    currency: text('currency').notNull().default('INR'),
    method: text('method').notNull().default('upi'),
    status: text('status').notNull().default('initiated'),
    reference: text('reference'),
    paidAt: timestamp('paid_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [index('payments_partner_idx').on(table.partnerId)],
);

/* ------------------------------------------------------------------------- */
/* Qualification & rewards                                                   */
/* ------------------------------------------------------------------------- */

/**
 * partner_shop_daily_qualification — one row per salon per business day.
 * A day qualifies iff qr_amount_paise >= ₹1,000 AND is_genuine (anti-fraud).
 */
export const partnerShopDailyQualification = pgTable(
  'partner_shop_daily_qualification',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    partnerId: uuid('partner_id')
      .notNull()
      .references(() => growthPartners.id),
    salonId: uuid('salon_id')
      .notNull()
      .references(() => salons.id),
    businessDate: date('business_date').notNull(),
    qrAmountPaise: integer('qr_amount_paise').notNull(),
    meetsMinimum: boolean('meets_minimum').notNull().default(false),
    isGenuine: boolean('is_genuine').notNull().default(true),
    qualifies: boolean('qualifies').notNull().default(false),
    streakDayIndex: integer('streak_day_index'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex('partner_shop_daily_qualification_salon_date_key').on(
      table.salonId,
      table.businessDate,
    ),
    index('partner_shop_daily_qualification_partner_idx').on(table.partnerId),
  ],
);

/**
 * partner_shop_onboarding_rewards — the one-time activation reward:
 * 10% of the company commission from the first 15 consecutive qualifying
 * days. Canonical example: ₹15,000 QR → ₹1,500 company commission → ₹150.
 */
export const partnerShopOnboardingRewards = pgTable(
  'partner_shop_onboarding_rewards',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    partnerId: uuid('partner_id')
      .notNull()
      .references(() => growthPartners.id),
    salonId: uuid('salon_id')
      .notNull()
      .references(() => salons.id),
    qualifiedDaysCount: integer('qualified_days_count').notNull().default(0),
    windowStart: date('window_start'),
    windowEnd: date('window_end'),
    companyCommissionPaise: integer('company_commission_paise'),
    activationRewardPaise: integer('activation_reward_paise'),
    status: text('status').notNull().default('pending'),
    paidAt: timestamp('paid_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex('partner_shop_onboarding_rewards_salon_key').on(table.salonId),
    index('partner_shop_onboarding_rewards_partner_idx').on(table.partnerId),
  ],
);

/**
 * partner_reward_milestones — the locked reward ladder (names are canonical):
 *   25 Shops — Official Nexora T-Shirt · 50 Shops — Samsung Tablet ·
 *   100 Shops — Branded HP Laptop · 250 Shops — Electric Scooter ·
 *   500 Shops — Latest iPhone · 750 Shops — Royal Enfield 350 CC ·
 *   1000+ Shops — District Partner SUV Car
 * (src/lib/constants/rewards.ts holds the enforced names; a later phase seeds
 * this table with them.)
 */
export const partnerRewardMilestones = pgTable(
  'partner_reward_milestones',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    shopThreshold: integer('shop_threshold').notNull().unique(),
    rewardName: text('reward_name').notNull(),
    sortOrder: integer('sort_order').notNull(),
    isActive: boolean('is_active').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [index('partner_reward_milestones_sort_idx').on(table.sortOrder)],
);

/**
 * partner_reward_claims — a partner's claim against a milestone. One claim
 * per partner per milestone.
 */
export const partnerRewardClaims = pgTable(
  'partner_reward_claims',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    partnerId: uuid('partner_id')
      .notNull()
      .references(() => growthPartners.id),
    milestoneId: uuid('milestone_id')
      .notNull()
      .references(() => partnerRewardMilestones.id),
    status: text('status').notNull().default('locked'),
    claimedAt: timestamp('claimed_at', { withTimezone: true }),
    fulfilledAt: timestamp('fulfilled_at', { withTimezone: true }),
    notes: text('notes'),
    ...timestamps,
  },
  (table) => [
    uniqueIndex('partner_reward_claims_partner_milestone_key').on(
      table.partnerId,
      table.milestoneId,
    ),
  ],
);

/* ------------------------------------------------------------------------- */
/* Template handoff security                                                 */
/* ------------------------------------------------------------------------- */

/**
 * template_handoffs — signed, expiring handoff of a shop's website template
 * to its salon owner. Only a HASH of the token is stored; the raw secret
 * never touches the browser (see env rules).
 */
export const templateHandoffs = pgTable(
  'template_handoffs',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    salonId: uuid('salon_id')
      .notNull()
      .references(() => salons.id),
    applicationId: uuid('application_id').references(
      () => shopOnboardingApplications.id,
    ),
    templateKey: text('template_key'),
    handoffTokenHash: text('handoff_token_hash').notNull(),
    status: text('status').notNull().default('pending'),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    acceptedAt: timestamp('accepted_at', { withTimezone: true }),
    revokedAt: timestamp('revoked_at', { withTimezone: true }),
    createdByProfileId: uuid('created_by_profile_id').references(
      () => profiles.id,
    ),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index('template_handoffs_salon_idx').on(table.salonId),
    index('template_handoffs_status_idx').on(table.status),
  ],
);
