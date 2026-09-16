# 01_PRD — Nexora Growth Partner Program

**Phase 0 baseline.** This is the binding product specification for the application at `apps/growth-partner-next`.

## 1. Product

**Nexora Growth Partner** is a zero-investment partner program. A Growth
Partner onboards shops (salons) onto Nexora using their referral code. Shops
complete a locked onboarding flow, receive their website template via a
signed **template handoff**, and start transacting via QR. Partners earn an
one-time activation reward, a recurring brokerage share, and milestone
rewards as their portfolio of onboarded shops grows.

## 2. Canonical qualification rules

- Minimum **₹1,000 genuine QR business per day** (fraud-flagged days never
  qualify).
- **15 consecutive qualifying days** complete the activation window.
- **Company commission: 10%** of QR business.
- **One-time activation reward: 10% of the company commission** earned during
  the first 15 qualifying days.
- Canonical worked example: **₹15,000 QR business → ₹1,500 company commission
  → ₹150 activation reward.**
- **Recurring share** of company commission:
  - months 1–6 = **10%**
  - months 7–12 = **5%**
  - after 12 months = **2%**

## 3. Milestone reward ladder (final names — locked)

| Shops  | Reward                              |
| ------ | ----------------------------------- |
| 25     | 25 Shops — Official Nexora T-Shirt  |
| 50     | 50 Shops — Samsung Tablet           |
| 100    | 100 Shops — Branded HP Laptop       |
| 250    | 250 Shops — Electric Scooter        |
| 500    | 500 Shops — Latest iPhone           |
| 750    | 750 Shops — Royal Enfield 350 CC    |
| 1000+  | 1000+ Shops — District Partner SUV Car |

## 4. Canonical data contract

The implementation **reuses and maps** the existing snake_case tables of
Supabase project `qwaehqsmodekbgvnaavz`; creating parallel camelCase models
(`GrowthPartner`, `Salon`, `ShopPayments`, `PartnerEarnings`, …) is
forbidden. Canonical tables:

`profiles` · `growth_partners` · `partner_referrals` · `salons` ·
`organizations` · `organization_members` · `shop_onboarding_applications` ·
`shop_attributions` · `commission_plans` · `commission_plan_versions` ·
`commission_events` · `partner_shop_daily_qualification` ·
`partner_shop_onboarding_rewards` · `partner_reward_milestones` ·
`partner_reward_claims` · `template_handoffs` · `payments`

## 5. Environment & security

- Stack: Next.js App Router, TypeScript, Drizzle ORM, Supabase (existing
  project `qwaehqsmodekbgvnaavz`) with the **same Supabase Auth as the
  Template App** (`profiles.id = auth.users.id`).
- No new Supabase project may be created.
- `NEXT_PUBLIC_SUPABASE_URL` is locked to
  `https://qwaehqsmodekbgvnaavz.supabase.co`.
- Service-role keys, database URLs and template-handoff secrets are
  server-only and must never appear in `NEXT_PUBLIC_*` variables.
- Phase 0 applies **no migration** and mutates **no production data**.
