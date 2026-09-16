# 01_PRD — Nexora Growth Partner Programme

**Status:** binding specification · **Phase:** 0 baseline
**App:** `apps/growth-partner-next` (Next.js App Router + TypeScript + Drizzle ORM)
**Supabase project (only approved):** `qwaehqsmodekbgvnaavz` → `https://qwaehqsmodekbgvnaavz.supabase.co`

---

## 1. Product summary

**Nexora Growth Partner Programme** is a zero-investment partnership in which
independent partners onboard local shops (salons) onto Nexora. The partner
shares a personal referral code; a shop that joins through it is permanently
attributed to that partner, completes a locked onboarding + KYC + QR
activation flow, receives its website template through a signed, expiring
**template handoff**, and starts collecting genuine QR payments.

Partner economics have three strictly separate components:

1. **One-time new-shop onboarding reward** — a fixed share of the company's
   commission from the shop's first qualifying window (see §3.2).
2. **Recurring growth share** — a declining share of the company's eligible
   commission, paid monthly (see §3.3).
3. **Milestone rewards** — physical product rewards unlocked by the count of
   qualifying onboarded shops (see §3.4).

Public message (Hinglish, verbatim for Phase 1 UI):

- Main: `Salon onboard karein, business grow karein aur rewards unlock karein.`
- Supporting: `Genuine salon onboarding, verified QR business aur transparent milestone tracking.`

## 2. Personas

| Persona | Needs |
| ------- | ----- |
| Growth Partner | Referral link/code, onboarding progress per shop, earnings ledger, milestone ladder, payouts |
| Shop (salon) owner | Guided onboarding, KYC, QR activation, website template handoff, settlement visibility |
| Nexora ops/admin | Fraud review, qualification verification, milestone claim approval, audit trail |

## 3. Commercial rules (locked in code)

### 3.1 Shop qualification

- Minimum **genuine QR collection: ₹1,000 per day**.
- **Company commission: 10%** of QR collection → minimum **₹100 per day**.
- Qualification period: **15 consecutive days** of genuine qualifying business.
- Minimum 15-day QR collection: **₹15,000**; minimum 15-day company
  commission: **₹1,500**.
- **Refunds, reversals, self-funding, circular and artificial transactions
  are excluded.** A day that fails genuineness checks never qualifies and
  breaks the consecutive streak.
- KYC, QR activation, settlement and fraud verification are all required
  before a shop counts toward rewards.

### 3.2 One-time new-shop onboarding reward

**This reward is separate from the recurring commission.** Formula:

`Growth Partner reward = 10% of company commission collected during the first qualifying 15 days`

- ₹15,000 collection → ₹1,500 company commission → **₹150** partner reward.
- ₹50,000 collection → ₹5,000 company commission → **₹500** partner reward.
- **No maximum cap**, but minimum ₹1,000 collection on every qualifying day
  for 15 consecutive days is compulsory.
- The reward must **never** be calculated as 10% of the complete QR
  collection.

### 3.3 Recurring growth share (documented separately by design)

Percentages apply to **eligible company commission** — not to total QR
business. Programme eligibility and terms apply.

- **Months 1–6: 10%** of eligible company commission.
- **Months 7–12: 5%** of eligible company commission.
- **After 12 months: 2%** lifetime growth share.

### 3.4 Milestone rewards (final names — the only list allowed)

| # | Shops | Reward |
| - | ----- | ------ |
| 1 | 25 | 25 Shops — Official Nexora T-Shirt |
| 2 | 50 | 50 Shops — Samsung Tablet |
| 3 | 100 | 100 Shops — Branded HP Laptop |
| 4 | 250 | 250 Shops — Electric Scooter |
| 5 | 500 | 500 Shops — Latest iPhone |
| 6 | 750 | 750 Shops — Royal Enfield 350 CC |
| 7 | 1000+ | 1000+ Shops — District Partner SUV Car |

Milestone rewards are subject to verified qualifying shops, fraud clearance,
programme rules, availability, documentation and written approval. There is
no cash alternative. Legacy/retired reward names are forbidden (see
`06_RULES.md` §6). The official reward poster is required before the Phase 1
public UI ships (see `09_Phases.md`).

## 4. Canonical data contract

The implementation **reuses and maps** the existing snake_case tables of the
approved Supabase project only; parallel camelCase models (`GrowthPartner`,
`Salon`, `ShopPayments`, `PartnerEarnings`, …) are forbidden.

`profiles` · `growth_partners` · `partner_referrals` · `salons` ·
`organizations` · `organization_members` · `shop_onboarding_applications` ·
`shop_attributions` · `commission_plans` · `commission_plan_versions` ·
`commission_events` · `partner_shop_daily_qualification` ·
`partner_shop_onboarding_rewards` · `partner_reward_milestones` ·
`partner_reward_claims` · `template_handoffs` · `payments`

Full mapping: `05_SCHEMA.md`. Ledger separation: one-time rewards vs
recurring shares are different `commission_events` rows.

## 5. Platform & security mandates

- Next.js App Router + TypeScript (strict) + Drizzle ORM.
- Supabase = existing project `qwaehqsmodekbgvnaavz` **only**; the same
  Supabase Auth model as the Template App (`profiles.id = auth.users.id`).
  Creating a new project is prohibited; env validation rejects any other URL.
- Only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` may
  reach the browser. Service-role keys, database URLs and handoff secrets are
  server-only and are blocked from `NEXT_PUBLIC_*` by code and tests.
- No database migrations in Phase 0; no production data access or mutation.
- Money is integer paise; rates are integer basis points; never floats.

## 6. Acceptance anchors (test-enforced)

| Rule | Enforcement |
| ---- | ----------- |
| Supabase URL lock | `src/env.ts` + `src/env.test.ts` + `src/prd.contract.test.ts` |
| All 10 PRD documents present, complete | `src/prd.contract.test.ts` |
| Commission examples (₹15k→₹150, ₹50k→₹500) | `src/lib/constants/commissions.test.ts` |
| Onboarding reward ≠ 10% of QR collection | code shape + tests |
| Seven milestones exact, forbidden rewards absent | `src/lib/constants/rewards.contract.test.ts`, `src/prd.contract.test.ts` |
| Canonical snake_case schema, integer paise | `src/db/schema.contract.test.ts` |
