# 07_IMPLEMENTATIONPLAN — delivery plan

**Status:** binding · **Current phase:** 0 (complete) → next is Phase 1.

## Phase 0 boundary (this delivery)

**In scope**

- Production-buildable App Router + TypeScript + Drizzle baseline in
  `apps/growth-partner-next` on Supabase project `qwaehqsmodekbgvnaavz`.
- Canonical Drizzle mappings for exactly the 17 existing snake_case tables.
- Hard environment lock + public-secret guard; placeholder-only `.env.example`.
- Locked business constants (qualification, onboarding reward, growth share,
  milestones) + unit/contract test suites.
- Read-only schema audit utility + Phase 0 audit reports.
- Full PRD document set (this directory) and `08_TRACKER.md` Phase-0 rows.

**Out of scope (explicitly not done)**

- Auth UI, referral capture, onboarding APIs, payment processing, admin
  mutations — later phases.
- Any database migration, DDL, seed or data import. Any production data
  access or mutation. Any new Supabase project. Any new salon website
  template. Any replacement/generated reward poster.

**Exit evidence**: `npm ci`, `npm run typecheck`, `npm test`, `npm run build`
all green; static audit 17/17; PR opened and **not** merged until reviewed.

## Phase sequence

| Phase | Deliverable | Key acceptance |
| ----- | ----------- | -------------- |
| 0 | Canonical baseline (this document set) | gates green; 0.1/0.2 PASS |
| 1 | Nexora design system + public programme UI (`/`) | tokens; 11 landing sections; 7 milestones; poster section; responsive 360/768/1024/1440; 1.1–1.3 PASS |
| 2 | Supabase Auth UI + referral capture | `/partner/signup` `/partner/login`; server-side attribution write |
| 3 | Locked shop onboarding + template handoff | step flow; signed expiring handoff links |
| 4 | Payment ingestion + qualification + earnings engine | atomic idempotent ingestion; 15-day window; separate reward/share ledger rows |
| 5 | Milestones, claims, ops approval | claim lifecycle; audit logs |
| 6 | Payouts & partner withdrawals | `payments` settlement lifecycle |
| 7 | Reconciliation of any legacy copy/flows with this PRD set | no contradictory copy anywhere |
| 8 | Hardening, performance, go-live | RLS on; monitoring; launch checklist |

Rules for every later phase: additive and idempotent database changes only,
applied through reviewed migrations (never inside feature PRs); RLS enabled
per `06_RULES.md` §7; server-authoritative writes; no fake data.

## Phase 1 prerequisites

- **Exact original poster required before Phase 1 public UI** — the official
  Nexora reward poster containing the seven final rewards. Until it exists in
  the repo (proposed path `public/assets/`), the poster section cannot ship.
  The poster asset name/path is fixed in Phase 1 as provided; substitutes are
  prohibited.
- Landing content must use the exact strings in `03_APPFLOW.md` §1 and the
  ₹-figures in `06_RULES.md`.

## Risk register

| Risk | Mitigation |
| ---- | ---------- |
| Reward/commission copy drift | constants + contract tests are the only allowed source |
| Duplicate schema models | forbidden-name contract tests; code review |
| Secret leakage to browser | env guard + tests; server-only modules |
| Unauthorized re-attribution | unique attribution per shop; server-side resolution |
| Fake/demo figures in UI | prohibited by spec; review + tests |
