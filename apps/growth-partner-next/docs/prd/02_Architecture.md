# 02_Architecture — shared backend architecture

The application uses Next.js App Router, TypeScript strict mode, Drizzle ORM,
PostgreSQL, and the existing Supabase project
`https://qwaehqsmodekbgvnaavz.supabase.co`. `profiles.id` equals the Supabase
Auth user ID. No other Supabase project is permitted.

`growth_partners` extends a profile with a unique referral code. A referral is
recorded in `partner_referrals`; a shop is attributed exactly once through
`shop_attributions`. `salons` is the canonical shop entity and its onboarding
state is stored in `shop_onboarding_applications`. Qualification is recorded
per business day in `partner_shop_daily_qualification`.

`commission_plans` and immutable `commission_plan_versions` define rates.
`commission_events` is the earning ledger; `payments` records settlement.
`partner_shop_onboarding_rewards` records the single reward for a qualifying
shop, while recurring growth share is a separate `commission_events` row.
Milestones and claims live in `partner_reward_milestones` and
`partner_reward_claims`. `template_handoffs` stores only token hashes.

All later writes must be server-authoritative and use one atomic PostgreSQL
transaction for payment ingestion plus earning creation. Duplicate transaction
IDs and earning idempotency keys must be rejected. Phase 0 maps existing tables
only: it creates no migration and changes no live data.
