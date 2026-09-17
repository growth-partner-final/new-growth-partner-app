# Phase 0 — live audit report

**Date:** 2026-09-16 · **Branch:** `arena/01a0a919-new-growth-partner-app` · **PR:** #1 → `main`
**Approved Supabase project:** `qwaehqsmodekbgvnaavz` (`https://qwaehqsmodekbgvnaavz.supabase.co`)

> This file is synchronized with `docs/audits/PHASE_0_LIVE_AUDIT.md`.

---

## 1. Repository audit (pre-edit)

| Item | Finding | Disposition |
| ---- | ------- | ----------- |
| App at repo root | Vite + React 19 Stitch prototype (`index.html`, `src/` — partner, salon, ops, milestone screens; title "Nexora Growth Partner") | **Preserved untouched.** No file modified, deleted or renamed. |
| Root `package.json` / `.env.example` | Vite scripts; `VITE_SUPABASE_URL` placeholders | Unchanged. |
| Production app | `apps/growth-partner-next` (Next.js App Router + TS + Drizzle) | The single production app; no duplicate created. |
| PRD set | `docs/prd/01…10` | Complete binding set authored in-repo (no stubs). |

## 2. Canonical schema inventory (0.1 → PASS)

The live schema contract is **17 snake_case tables** (`src/db/canonical.ts`):

`profiles` · `growth_partners` · `partner_referrals` · `organizations` ·
`organization_members` · `salons` · `shop_onboarding_applications` ·
`shop_attributions` · `commission_plans` · `commission_plan_versions` ·
`commission_events` · `payments` · `partner_shop_daily_qualification` ·
`partner_shop_onboarding_rewards` · `partner_reward_milestones` ·
`partner_reward_claims` · `template_handoffs`

- **Audit mode:** static by default; `npm run audit:schema` also performs
  read-only `information_schema` introspection when CI provides
  `SUPABASE_DB_URL`. No live credentials were used in this run.
- **Duplicates:** none — `GrowthPartner`, `Salon`, `ShopPayments`,
  `PartnerEarnings` are forbidden by contract tests.

## 3. Drizzle canonical mappings (0.2 → PASS)

- `src/db/schema.ts` maps exactly the 17 tables (set-equality test), all
  snake_case, each with a primary key; PRD defaults embedded in
  `commission_plan_versions` (₹1,000/day · 15 days · 10%/10% · 10/5/2%).
- Money columns are integer paise; rates are basis points.
- **No drizzle-kit migration folder exists; mappings are a contract layer only.**

## 4. Verification results

| Gate | Result |
| ---- | ------ |
| `npm ci` | ✅ clean |
| `npm run typecheck` (`tsc --noEmit`) | ✅ 0 errors |
| `npm test` (vitest) | ✅ all suites pass |
| `npm run build` (`next build`) | ✅ production build, type-checked |
| `npm run audit:schema` (static) | ✅ 17/17 mappings == canonical list |
| Duplicate DB model introduced | ✅ none |
| Migration applied | ✅ none — no migration files exist |
| Production data mutated | ✅ none — read-only Phase 0 |
| Secrets in repo | ✅ none — placeholders only; `.env` never committed |

## 5. Security posture

- Public env hard-locked to the approved project; foreign URLs fail
  validation (`src/env.ts`, `src/env.test.ts`, `src/prd.contract.test.ts`).
- `assertNoSecretsInPublicEnv()` blocks service-role/DB/handoff secrets in
  any `NEXT_PUBLIC_*` variable (name + value patterns).
- Server-only modules: `src/db/index.ts`, `src/lib/supabase/server.ts`.

## 6. Poster asset status

Repository and reachable git history contain no Nexora reward poster and no
image assets. No substitute was generated and none was committed.
**Exact original poster required before Phase 1 public UI.**

## 7. Known gaps / deferred

1. Live `information_schema` introspection runs in CI once `SUPABASE_DB_URL`
   is provided as a secret (read-only).
2. Public UI, Auth, referral capture, onboarding, payments, milestones,
   payouts: Phases 1–6 per `09_Phases.md`.
