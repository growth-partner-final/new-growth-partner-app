# 04_TECHSPEC — technical specification

**Phase:** 0 (baseline) · **Status:** binding

## 1. Stack

| Concern | Choice |
| ------- | ------ |
| Framework | Next.js 15 (App Router, Server Components default, `ignoreBuildErrors: false`) |
| Language | TypeScript `strict: true` |
| UI runtime | React 19 |
| ORM/data mapping | Drizzle ORM (`pg-core`), postgres.js driver (`prepare: false` for pooler) |
| Auth & backend | Existing Supabase project `qwaehqsmodekbgvnaavz`; same Auth as the Template App |
| Validation | zod (environment) |
| Tests | Vitest (node env) — unit + contract suites |
| Audit | `tsx scripts/audit-schema.ts` (static default; live read-only with DB URL) |

## 2. Environment variables

| Variable | Scope | Rule |
| -------- | ----- | ---- |
| `NEXT_PUBLIC_SUPABASE_URL` | browser | **Hard-locked** to `https://qwaehqsmodekbgvnaavz.supabase.co`; any other URL fails validation |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | browser | anon/publishable key of the same project |
| `SUPABASE_SERVICE_ROLE_KEY` | server-only | never `NEXT_PUBLIC_*`; absent by default in CI |
| `SUPABASE_DB_URL` | server-only | pooled Postgres connection of the same project; Drizzle + audit |
| `TEMPLATE_HANDOFF_SECRET` | server-only | signer for handoff links; only hashes stored |

`src/env.ts` exposes `getPublicEnv()`, `getServerEnv()`,
`assertNoSecretsInPublicEnv()` (throws on any secret-looking `NEXT_PUBLIC_*`
key or value) and `getEnvStatus()` (presence booleans only — no values).

## 3. Code layout

```
src/
  env.ts                    # env lock + secret guard
  app/                      # App Router: layout, Phase-0 status page, /api/health
  db/canonical.ts           # 17 canonical names + forbidden duplicates
  db/schema.ts              # Drizzle mappings (mapping only — no migrations)
  db/index.ts               # lazy server-only Drizzle client
  lib/constants/rewards.ts  # 7 locked milestone labels
  lib/constants/commissions.ts # locked rules, paise/bps math, ledger types
  lib/supabase/client.ts    # browser client (anon)
  lib/supabase/server.ts    # anon server + service-role server clients
scripts/audit-schema.ts     # static/live read-only schema diff
```

## 4. Conventions (test-enforced)

- Money: integer **paise**; columns `*_paise`; helper math via
  `applyRateBps` (integer-rounded). Non-integer input throws.
- Rates: integer **basis points** (`*_bps`; 10% = 1000, 5% = 500, 2% = 200).
- Ledger types: `COMMISSION_EVENT_TYPES` = `company_commission` ·
  `onboarding_reward` · `recurring_growth_share` — one-time and recurring
  components are distinct rows and distinct code paths.
- Qualification constants: ₹1,000/day (100_000 paise), 15 days, min ₹100/day
  company commission (10_000), min window values ₹15,000 (1_500_000) /
  ₹1,500 (150_000).
- Accent-safe content: user-facing strings may contain Hindi/Hinglish as
  specified in `03_APPFLOW.md`; no fake totals/dashboard figures ever.

## 5. Verification gates (every PR)

```bash
npm ci
npm run typecheck   # tsc --noEmit — zero errors
npm test            # vitest run — all suites green
npm run build       # next build — production, type-checked
npm run audit:schema  # static canonical diff; live read-only when DB URL set
```

Suites: `env.test.ts` (URL lock, secret guard), `schema.contract.test.ts`
(set-equality, snake_case, forbidden duplicates, PKs, PRD defaults, integer
paise), `rewards.contract.test.ts` (exact labels/thresholds),
`commissions.test.ts` (rules + both examples + separation),
`prd.contract.test.ts` (docs presence/quality, URL accept/reject, examples,
separation, milestones vs forbidden names, schema naming, paise).

## 6. Non-negotiables

- No new Supabase project. No `.env` or real secrets committed. No
  migration files. No production database access in Phase 0.
- No duplicate canonical tables; no camelCase authority models.
- `next/image` for local assets (poster required for Phase 1 public UI);
  semantic HTML, 44px touch targets, visible focus, WCAG-readable contrast
  (enforced as UI lands in Phase 1).
