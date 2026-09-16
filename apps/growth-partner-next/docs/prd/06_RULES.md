# 06_RULES — locked commercial, fraud and security rules

**Status:** final. Any change requires a PRD revision + contract-test update.

## 1. Shop qualification

- Minimum **genuine QR collection: ₹1,000 per day**.
- **Company commission: 10%** of QR collection ⇒ minimum daily company
  commission **₹100**. *(₹100 is the company's commission floor — never
  describe it as the salon's daily business.)*
- Qualification period: **15 consecutive days**.
- Minimum 15-day QR collection: **₹15,000**; minimum 15-day company
  commission: **₹1,500**.
- **Excluded transactions**: refunds, reversals, duplicate/self-funded shops,
  self-payments, circular payments, artificial transactions. An excluded day
  does not qualify and breaks the consecutive streak.
- Required before anything counts: **KYC ✓ · QR activation ✓ · settlement ✓ ·
  fraud verification ✓**.

## 2. One-time new-shop onboarding reward

Separate from recurring commission. Formula (exact):

`Growth Partner reward = 10% of company commission collected during the first qualifying 15 days`

- ₹15,000 collection produces ₹1,500 company commission and ₹150 onboarding
  reward. ₹50,000 produces ₹5,000 and ₹500.
- **There is no maximum cap**, but minimum ₹1,000 genuine collection on every
  qualifying day for 15 consecutive days is compulsory.
- **Never calculate the partner reward as 10% of the complete QR
  collection** — it is 10% of the company's eligible commission (i.e. 1% of
  eligible window collection). Code enforces this by construction
  (`computeOnboardingRewardFromQrPaise` composes commission → reward).

## 3. Recurring growth share (documented separately)

Applies to **eligible company commission**, never to total QR business.
Programme eligibility and terms apply.

| Period | Share of eligible company commission |
| ------ | ------------------------------------ |
| Months 1–6 | **10%** |
| Months 7–12 | **5%** |
| After 12 months | **2% — lifetime growth share** |

Ledger separation: one-time rewards use event type `onboarding_reward`;
recurring shares use `recurring_growth_share` (one row per `month_index`).
They must never be merged or summed into a single line item.

## 4. Milestone rewards — the only valid structure

1. 25 Shops — Official Nexora T-Shirt
2. 50 Shops — Samsung Tablet
3. 100 Shops — Branded HP Laptop
4. 250 Shops — Electric Scooter
5. 500 Shops — Latest iPhone
6. 750 Shops — Royal Enfield 350 CC
7. 1000+ Shops — District Partner SUV Car

Notice (shown near rewards in every UI):
`Rewards verified qualifying shops, fraud clearance, programme rules, availability, documentation aur written approval ke subject hain. Cash alternative available nahi hai.`

Rewards are subject to verified qualifying shops, fraud clearance, programme
rules, availability, documentation and written approval. No cash alternative.

## 5. Attribution & handoff integrity

- One partner is attributed per shop, once, server-side (`shop_attributions`
  unique per `salon_id`); client-supplied partner IDs are never trusted.
- Template handoffs are signed, expiring links; only token hashes are stored
  (`template_handoffs.handoff_token_hash`).

## 6. Forbidden legacy reward naming

The following retired names must not appear in any reward surface, constant,
seed or copy: **Welcome Package**, **Brezza Contribution** (any Brezza
wording), **Cash Bonus**, **Global Ambassador**, **President**, **Vice
President**, **Director rewards**.

## 7. RLS & access rules (documented now, applied in a later migration)

- Growth Partners: only their profile, referrals, referred shops, earnings
  and claims.
- Shop owners: only their shop.
- Public users: no KYC, earnings, payments or audit data.
- Admin: explicit admin role; referral validation, commission math and
  service-role operations are server-only; manual admin changes require
  audit logs.

## 8. Security baselines (Phase 0-enforced)

- Only approved project `https://qwaehqsmodekbgvnaavz.supabase.co`; env
  validation rejects foreign URLs.
- Service-role keys, DB URLs, handoff secrets: server-only, blocked from
  `NEXT_PUBLIC_*` by `assertNoSecretsInPublicEnv` + tests.
- No migrations, no destructive SQL, no production data mutation in Phase 0.
