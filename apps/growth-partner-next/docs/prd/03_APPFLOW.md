# 03_APPFLOW — programme flows

**Phase:** 0 (baseline) · **Status:** binding. Phase 0 ships no interactive
flow; it lands the baseline, canonical rules and contracts that the flows in
this document build on. Phase 1 implements the public landing page only
(§2). Target routes may render clearly-labelled placeholders until their
owning phase — never 404s.

## 1. Public programme flow (Phase 1 scope)

`/` presents the programme in this order:

1. Hero — main message `Salon onboard karein, business grow karein aur rewards unlock karein.`
   with `Genuine salon onboarding, verified QR business aur transparent milestone tracking.`
2. How It Works (onboard → qualify → earn → climb milestones).
3. Partner work & rules.
4. Shop qualification formula (₹1,000/day genuine, 15 consecutive days,
   10% company commission, ₹100/day min, ₹15,000/₹1,500 window minimums).
5. One-Time Extra Onboarding (Activation) Reward — clearly labelled separate
   from the recurring commission, with both canonical examples and **no cap
   display**.
6. Recurring Growth Share (10% / 5% / 2% of eligible company commission).
7. Seven reward milestones (final names only) + the official reward poster.
8. Fraud prevention notice (excluded transactions listed).
9. FAQ.
10. Legal/verification notice.
11. Footer.

CTAs: `Growth Partner Banein → /partner/signup`, `Rewards Dekhein → /rewards
(section)`, `Apna Progress Check Karein → /partner/login`. No dead buttons.

## 2. Partner onboarding & sharing flow (Phase 2+, specified)

1. Sign-up/login through the shared Supabase Auth (`/partner/signup`,
   `/partner/login`). `profiles.id = auth.users.id`.
2. Partner completes profile + KYC; ops approval flips
   `growth_partners.status` to active.
3. Dashboard issues the immutable `referral_code` and share tools
   (link/QR). Sharing is the only attribution entry point.

## 3. Referral capture & attribution (Phase 2+)

1. Landing through a referral link records the referral (server-side
   validation of the code; client-supplied partner IDs are untrusted).
2. On shop registration, `shop_attributions` is written **once**
   (unique `salon_id`) and locked. Poaching/re-attribution is impossible by
   construction.

## 4. Shop onboarding flow (Phase 3+)

Locked, stepped, server-authoritative (`shop_onboarding_applications`):

`details → documents → KYC → payout/settlement setup → QR activation →
review → template handoff → go-live`

- Each step stores validated server-side state in `payload` (jsonb) with
  `current_step` and review metadata.
- On approval, a signed **template handoff** link is issued
  (`template_handoffs`: hash only, expiring, single-use). Accepting the
  handoff activates the shop's website.

## 5. Qualification & earning flow (Phase 4+)

1. Ingested QR settlements create canonical payment records (idempotent,
   atomic with earning creation; duplicates rejected).
2. Each business day is scored into `partner_shop_daily_qualification`:
   genuine ≥ ₹1,000 ⇒ qualifying day; exclusions: refunds, reversals,
   self-funding, circular, artificial transactions.
3. After **15 consecutive** qualifying days, the first window closes:
   - company commission = 10% of window collection (min ₹15,000 ⇒ min
     ₹1,500);
   - **one-time onboarding reward** = 10% of that company commission
     (₹15,000 → ₹1,500 → ₹150; ₹50,000 → ₹5,000 → ₹500), recorded in
     `partner_shop_onboarding_rewards` + a `commission_events` row of type
     `onboarding_reward`.
4. Thereafter, monthly **recurring growth share** rows of type
   `recurring_growth_share` accrue: months 1–6 → 10%, 7–12 → 5%, after 12 →
   2% of eligible company commission (lifetime). These are separate ledger
   rows from the one-time reward.
5. Partners request withdrawal; ops settles via `payments`
   (UPI/bank, status lifecycle `initiated → processing → completed/failed`).

## 6. Milestone flow (Phase 5+)

1. Each fraud-cleared qualifying shop increments the partner's count.
2. Crossing a threshold marks the matching `partner_reward_claims` row
   `eligible`; the partner claims it.
3. Ops verifies (KYC, settlement, documentation) and approves/fulfills.
   Rewards: 25 T-Shirt → 50 Tablet → 100 Laptop → 250 Scooter → 500 iPhone →
   750 Royal Enfield 350 CC → 1000+ District Partner SUV Car
   (names: `01_PRD.md` §3.4). No cash alternative.

## 7. Fraud & compliance gates (all phases)

Qualification, rewards and payouts pass only with KYC ✓, QR activation ✓,
settlement ✓, fraud verification ✓. Any flag freezes the affected shop's
streak/claims pending ops review.
