# Phase 0 — live audit report (detailed)

**Date:** 2026-09-16 · **Branch:** `arena/01a0a919-new-growth-partner-app` · **PR:** #1 → `main`
**Approved Supabase project:** `qwaehqsmodekbgvnaavz` (`https://qwaehqsmodekbgvnaavz.supabase.co`)
**Synchronized summary:** `docs/PHASE_0_LIVE_AUDIT.md`

---

## 1. Repository audit (pre-edit)

| Item | Finding | Disposition |
| ---- | ------- | ----------- |
| App at repo root | Vite + React 19 Stitch prototype (`index.html`, `src/` — 58 source files incl. partner, salon, ops, milestone screens; title "Nexora Growth Partner") | **Preserved untouched.** Not renamed, deleted or overwritten; never production-wired. |
| Root `package.json` | `react-example` Vite scripts, `@supabase/supabase-js` present | Unchanged. |
| Root `.env.example` | Vite-style `VITE_SUPABASE_URL` placeholders | Unchanged. |
| PRD set | `docs/prd/01…10` + README | Complete binding set authored in-repo (no stubs, no placeholders). |

## 2. Canonical schema inventory (task 0.1 → PASS)

The approved project's live schema contract is these **17 snake_case tables**
(`src/db/canonical.ts`):

```
profiles                      growth_partners              partner_referrals
organizations                 organization_members         salons
shop_onboarding_applications  shop_attributions            commission_plans
commission_plan_versions      commission_events            payments
partner_shop_daily_qualification                 partner_shop_onboarding_rewards
partner_reward_milestones     partner_reward_claims        template_handoffs
```

- **Audit mode:** `STATIC` + `LIVE(opt-in)`. Static diffs Drizzle mappings vs
  the canonical list. Live mode (`SUPABASE_DB_URL` set) performs read-only
  `information_schema` introspection; it was not executed here because no
  database credentials exist in this environment (and minting any would be a
  secret-handling violation).
- **Duplicates check:** no `GrowthPartner`, `Salon`, `ShopPayments`,
  `PartnerEarnings` (or other legacy/camelCase) models — enforced by
  `schema.contract.test.ts`.

## 3. Drizzle canonical mappings (task 0.2 → PASS)

- `src/db/schema.ts` maps **exactly** the 17 canonical tables (set-equality
  test), all snake_case, every table with a primary key.
- Locked defaults embedded in `commission_plan_versions`: min ₹1,000/day
  (100_000 paise) · 15 consecutive days · 10% company commission · 10%
  onboarding reward · recurring 10% (m1–6) / 5% (m7–12) / 2% (>12).
- Money columns are integer paise (`*_paise`); rates are basis points.
- **No migration tooling/output exists**; mappings are a contract layer only.

## 4. Verification results

| Gate | Result |
| ---- | ------ |
| `npm ci` | ✅ clean |
| `npm run typecheck` | ✅ 0 errors |
| `npm test` | ✅ all suites pass (env · schema contract · rewards · commissions · PRD contract) |
| `npm run build` | ✅ production build, type-checked |
| `npm run audit:schema` (static) | ✅ 17/17 |
| Duplicate DB model introduced | ✅ none (forbidden-name tests green) |
| DB migration applied | ✅ none — no migration files exist |
| Production data mutated | ✅ none — Phase 0 performs no writes |
| Committed artifacts | ✅ no `.env`, secrets, `node_modules`, `.next`, `*.tsbuildinfo`, or generated poster |

## 5. Security posture

- `NEXT_PUBLIC_SUPABASE_URL` hard-locked to the approved project; foreign
  URLs rejected by validation and tests (`env.test.ts`, `prd.contract.test.ts`).
- Only public URL + anon key are browser-visible;
  `assertNoSecretsInPublicEnv()` + tests block service-role, database and
  handoff secrets in any `NEXT_PUBLIC_*` variable.
- `.env.example` ships placeholders only.

## 6. Poster asset status

No Nexora reward poster exists in the repository or reachable git history;
no image assets are tracked anywhere. No substitute was generated or
committed. **Exact original poster required before Phase 1 public UI.**

## 7. Known gaps / deferred

1. Live `information_schema` introspection pending CI secrets (script ready,
   read-only).
2. Public landing UI (Phase 1), Auth (2), onboarding/handoff (3), payments &
   qualification (4), milestones (5), payouts (6), copy reconciliation (7),
   hardening (8) — per `09_Phases.md`.
