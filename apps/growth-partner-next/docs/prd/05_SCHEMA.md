# 05_SCHEMA — canonical data mapping

**Phase:** 0 · **Status:** binding. This inventory documents the existing
snake_case schema of Supabase project `qwaehqsmodekbgvnaavz`. Phase 0 maps
these tables only — **no migration is created or applied, no production data
is read or mutated.** Live introspection (read-only) is available via
`npm run audit:schema` when CI provides `SUPABASE_DB_URL`.

*Conventions: money = integer paise (`*_paise`), rates = integer basis points
(`*_bps`), timestamps = `timestamptz` UTC. `id` columns are UUIDs.*

## Identity & partner graph

### `profiles`
Mirrors Supabase Auth (`id = auth.users.id`). Columns: `id` PK · `full_name` · `email` · `phone` · `avatar_url` · `role` (default `user`) · `created_at` · `updated_at`.

### `growth_partners`
One row per enrolled partner. `id` PK · `profile_id` FK→profiles (unique) · `referral_code` (unique, public share code) · `status` (default `active`) · `verification_status` (default `unverified`) · `tier` (default `Tier 1`) · `city` · `profession` · `upi_id` · `kyc_verified_at` · `joined_at` · `created_at` · `updated_at`.

### `partner_referrals`
Partner → referred lead edges. `id` PK · `partner_id` FK· `referred_profile_id` FK (nullable) · `referral_code` · `status` (default `invited`) · `qualified_at` · `settled_at` · timestamps.

### `organizations` / `organization_members`
Team shells for partner agencies. organizations: `id` PK · `name` · `slug` unique · `type` · `created_by_profile_id` FK. members: `id` PK · `organization_id` FK · `profile_id` FK · `role` · unique(`organization_id`,`profile_id`).

## Shop onboarding & attribution

### `salons`
Canonical merchant entity. `id` PK · `salon_name` · `owner_name` · `phone` · `email` · `city` · `locality` · `address` · `salon_code` unique · `status` (default `registered`) · `kyc_verified_at` · timestamps. Qualification progress is **not** stored here.

### `shop_onboarding_applications`
Locked step flow per shop. `id` PK · `salon_id` FK · `partner_id` FK · `organization_id` FK · `status` (default `draft`) · `current_step` (default 1) · `payload` jsonb · `submitted_at` · `reviewed_at` · `reviewed_by_profile_id` FK · timestamps.

### `shop_attributions`
Exactly one partner per shop, locked. `id` PK · `salon_id` FK (**unique**) · `partner_id` FK · `referral_code` · `source` (default `referral_link`) · `attributed_at` · `locked_at` · `created_at`.

## Commission engine

### `commission_plans`
Plan shells. `id` PK · `key` unique · `name` · `description` · `status` (default `active`) · timestamps.

### `commission_plan_versions`
Immutable, effective-dated rules. `id` PK · `plan_id` FK · `version` · `effective_from/to` · `min_daily_qr_amount_paise` (**100000**) · `consecutive_qualifying_days` (**15**) · `company_commission_bps` (**1000**) · `activation_reward_bps` (**1000**) · `recurring_months_1_6_bps` (**1000**) · `recurring_months_7_12_bps` (**500**) · `recurring_after_12_bps` (**200**) · unique(`plan_id`,`version`). Defaults equal the locked PRD rules.

### `commission_events`
Append-only earning ledger. `id` PK · `partner_id` FK · `salon_id` FK · `plan_version_id` FK · `event_type` ∈ {`company_commission`, `onboarding_reward`, `recurring_growth_share`} · `month_index` (recurring rows) · `amount_paise` · `currency` (INR) · `status` (`accrued|approved|paid|reversed`) · `occurred_at` · `created_at`. **One-time reward and recurring share are always separate rows.**

### `payments`
Settlement of earnings/rewards. `id` PK · `partner_id` FK · `commission_event_id` FK · `amount_paise` · `currency` · `method` (`upi` default) · `status` (`initiated|processing|completed|failed`) · `reference` (external txn id, unique at integration) · `paid_at` · `created_at`.

## Qualification & rewards

### `partner_shop_daily_qualification`
Daily truth per shop. `id` PK · `partner_id` FK · `salon_id` FK · `business_date` · `qr_amount_paise` · `meets_minimum` · `is_genuine` · `qualifies` · `streak_day_index` · unique(`salon_id`,`business_date`). Genuine ≥ ₹1,000/day ⇒ qualifies; exclusions per `06_RULES.md` §2.

### `partner_shop_onboarding_rewards`
Window outcome per shop (one-time). `id` PK · `partner_id` FK · `salon_id` FK (unique) · `qualified_days_count` · `window_start/end` · `company_commission_paise` · `activation_reward_paise` · `status` · `paid_at`.

### `partner_reward_milestones`
Locked ladder (seeded later from `src/lib/constants/rewards.ts`). `id` PK · `shop_threshold` unique · `reward_name` · `sort_order` · `is_active`.

### `partner_reward_claims`
One claim per partner per milestone. `id` PK · `partner_id` FK · `milestone_id` FK · `status` (`locked|eligible|claimed|fulfilled|rejected`) · `claimed_at` · `fulfilled_at` · `notes` · unique(`partner_id`,`milestone_id`).

## Template handoff security

### `template_handoffs`
Signed, expiring template delivery. `id` PK · `salon_id` FK · `application_id` FK · `template_key` · `handoff_token_hash` (**hash only**) · `status` (`pending|accepted|expired|revoked`) · `expires_at` · `accepted_at` · `revoked_at` · `created_by_profile_id` FK.

## Integrity notes (for later migrations)

Unique keys enforce: one attribution per shop; one daily row per shop/date;
one onboarding reward per shop; one claim per partner/milestone; one row per
plan version. Payment ingestion keeps unique external `reference`, amount +
company commission in paise, refund/reversal flags and timestamps, and runs
atomically with earning creation; duplicate transaction IDs are rejected.
