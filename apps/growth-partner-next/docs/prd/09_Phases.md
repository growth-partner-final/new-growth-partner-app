# 09_Phases — phase definitions and tracker rows

**Status:** binding. Mirrors `07_IMPLEMENTATIONPLAN.md`; `08_TRACKER.md`
updates only the current phase's rows.

## Phase 0 — Canonical Supabase + Next.js baseline ✅ (this delivery)

| Row | Item | Exit |
| --- | ---- | ---- |
| 0.1 | Existing schema inventory | `src/db/canonical.ts` + read-only audit agree on the 17 canonical tables |
| 0.2 | Drizzle canonical mappings | `src/db/schema.ts` set-equals canonical list; contract tests green |

## Phase 1 — Design system & public programme UI

| Row | Item | Exit |
| --- | ---- | ---- |
| 1.1 | Brand/design tokens | Nexora palette tokens (magenta/deep wine/warm white/charcoal/muted lavender), glass card spec, focus/reduced-motion states |
| 1.2 | Public landing page | `/` with the 11 sections of `03_APPFLOW.md` §1, valid CTAs (`/partner/signup`, rewards section/`/rewards`, `/partner/login` — placeholders allowed, 404s forbidden) |
| 1.3 | Rewards poster section | official poster via `object-fit: contain`, un-cropped, plus semantic HTML mirror of the seven rewards |

Prerequisite: **Exact original poster required before Phase 1 public UI**
(the official Nexora reward poster with the seven final rewards). It must
not be generated or substituted.

## Phase 2 — Auth & referral capture

Supabase Auth screens (`/partner/signup`, `/partner/login`), partner profile
completion, referral-code issuance, server-side attribution write. No payment
logic.

## Phase 3 — Shop onboarding & template handoff

Locked onboarding steps, KYC/document capture, QR activation, review queue,
signed expiring template handoff (`template_handoffs`).

## Phase 4 — Payments, qualification & earnings

Canonical, idempotent payment ingestion (atomic with earning creation),
daily qualification scoring, first-window company commission + one-time
onboarding reward, monthly recurring growth share rows (separate event
types), ledger views.

## Phase 5 — Milestones & ops approvals

Threshold detection, claim lifecycle (`locked → eligible → claimed →
fulfilled/rejected`), ops verification UI, audit logging.

## Phase 6 — Payouts & withdrawals

Withdrawal requests, `payments` settlement lifecycle, partner payout views.

## Phase 7 — Reconciliation

Sweep all surfaces (including the archived Stitch prototype's copy) for
legacy reward names or figures contradicting this PRD set; reconcile.

## Phase 8 — Hardening & go-live

RLS applied via reviewed migration, monitoring, performance & accessibility
budgets, launch checklist.

---

**Rule:** later phases may only begin after the current phase's PR is
reviewed and merged. Phase 0's PR must not be merged by automation.
