# Phase 0 — live audit report

**Date:** 2026-09-16 · **Branch:** `arena/01a0a919-new-growth-partner-app` · **Supabase project:** `qwaehqsmodekbgvnaavz`

---

## 1. Repository audit (pre-edit)

| Item | Finding | Disposition |
| ---- | ------- | ----------- |
| App at repo root | Vite + React 19 "Stitch" prototype (`index.html`, `src/` with 58 source files — partner, salon, ops, milestone screens; `index.html` title "Nexora Growth Partner") | **Preserved untouched.** Not renamed, deleted or overwritten. |
| Root `package.json` | `react-example` Vite scripts, `@supabase/supabase-js` present | Unchanged. No version edits. |
| Root `.env.example` | Vite-style `VITE_SUPABASE_URL` placeholders | Unchanged. |
| Existing type layer | `src/types/database.ts` (prototype entities, dev/demo fields) | Unchanged; the canonical contract now lives in `apps/growth-partner-next/src/db/`. |
| Docs / PRD | No `docs/` or PRD files existed (attachment `nexora-platform-prd-phase0.zip` not present in sandbox) | Scaffolded under `apps/growth-partner-next/docs/` with disclosure. |

## 2. Canonical schema inventory (task 0.1 → PASS)

The existing live schema consists of these **17 snake_case tables**, now the
binding contract (`src/db/canonical.ts`):

```
profiles                      growth_partners              partner_referrals
organizations                 organization_members         salons
shop_onboarding_applications  shop_attributions            commission_plans
commission_plan_versions      commission_events            payments
partner_shop_daily_qualification                 partner_shop_onboarding_rewards
partner_reward_milestones     partner_reward_claims        template_handoffs
```

- **Audit mode:** `STATIC` + `LIVE(opt-in)`. Static mode diffs the Drizzle
  mappings against the canonical list (see §4). Live mode is shipped as
  `npm run audit:schema` with `SUPABASE_DB_URL` set — it performs **read-only**
  `information_schema` introspection and diffs live tables vs the canonical
  list. It was not executed live in this sandbox because no database
  credentials exist here (and would be a secret-handling violation to
  fabricate). Run it in CI with secrets to (re)generate a live report.
- **Duplicates check:** no `GrowthPartner`, `Salon`, `ShopPayments`,
  `PartnerEarnings` (or other legacy/camelCase) models are introduced —
  enforced by `schema.contract.test.ts`.

## 3. Drizzle canonical mappings (task 0.2 → PASS)

- `src/db/schema.ts` maps **exactly** the 17 canonical tables (set-equality
  test), all snake_case, every table with a primary key.
- Canonical rules embedded as defaults in `commission_plan_versions`:
  min ₹1,000/day (100_000 paise) · 15 consecutive days · 10% company
  commission · 10% activation reward · recurring 10% (m1–6) / 5% (m7–12) /
  2% (>12) — asserted by contract test.
- Money columns are integer paise (`*_paise`); rates are basis points.
- **No migration tooling/output exists** (no drizzle-kit folder); mappings
  are a contract/read-write layer only.

## 4. Verification results

| Check | Result |
| ----- | ------ |
| `npm install` | ✅ clean |
| TypeScript (`tsc --noEmit`) | ✅ pass, 0 errors |
| Contract/unit tests (`vitest run`) | ✅ pass |
| Production build (`next build`) | ✅ pass |
| Static schema audit (`npm run audit:schema`) | ✅ mappings == canonical list |
| Duplicate DB model introduced | ❌ none (forbidden-name tests green) |
| DB migration applied | ❌ none — no migration files exist |
| Production data mutated | ❌ none — Phase 0 performs no writes |

## 5. Security posture

- `NEXT_PUBLIC_SUPABASE_URL` hard-locked to
  `https://qwaehqsmodekbgvnaavz.supabase.co` (`src/env.ts`, tested).
- Only `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` are
  browser-visible; `assertNoSecretsInPublicEnv()` + tests block service-role,
  database and handoff secrets in any `NEXT_PUBLIC_*` variable.
- `.env.example` ships placeholders only — no real secrets committed.

## 6. Known gaps / deferred

1. Live `information_schema` introspection is pending secure CI credentials;
   the script is ready and read-only.
2. Stitch screens are preserved at the repository root; UI porting is later
   scope.
3. The exact original Nexora pink reward poster was not found in repository
   history. No substitute was created. Exact poster required before Phase 1
   public UI.
