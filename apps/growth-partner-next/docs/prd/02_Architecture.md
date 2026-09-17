# 02_Architecture — Nexora Growth Partner platform

**Phase:** 0 (baseline) · **Status:** binding

## 1. Repository topology

```
new-growth-partner-app/
├── index.html, src/, vite.config.ts, …      # EXISTING Stitch prototype (Vite + React 19)
│                                            # PRESERVED as-is: reference UI, not production
└── apps/
    └── growth-partner-next/                 # PRODUCTION application (this PRD set)
        ├── src/app/                         # Next.js App Router (RSC by default)
        ├── src/db/                          # Drizzle canonical mappings + contract
        ├── src/lib/                         # Canonical constants + Supabase clients
        ├── src/env.ts                       # Environment lock + secret guard
        ├── scripts/audit-schema.ts          # Read-only schema audit
        └── docs/prd/                        # This specification set (source of truth)
```

Rules:

- There is exactly **one** production application: `apps/growth-partner-next`.
  Duplicating the app is prohibited.
- The Stitch prototype at the repository root remains untouched: its screens
  are the approved visual language that later UI phases port into App Router
  routes. It is never wired to production data.

## 2. Application layers (production app)

| Layer | Responsibility | Key files |
| ----- | -------------- | --------- |
| Routes | Server Components by default; Client Components only where interaction requires | `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/api/health/route.ts` |
| Canonical rules | Reward ladder, commission math, event types — single source of truth | `src/lib/constants/rewards.ts`, `commissions.ts` |
| Data mapping | Drizzle `pgTable` declarations of the 17 canonical tables | `src/db/schema.ts`, `src/db/canonical.ts` |
| Connectivity | Server-only Drizzle client; anon browser client; service-role server client | `src/db/index.ts`, `src/lib/supabase/*` |
| Environment | URL lock + public-secret guard (fail-fast) | `src/env.ts` |
| Assurance | Unit + contract tests; schema audit | `src/**/*.test.ts`, `scripts/audit-schema.ts` |

## 3. Identity & tenancy

- Authentication is **Supabase Auth, identical to the Template App**.
- `profiles.id == auth.users.id`; `growth_partners.profile_id → profiles.id`.
- A Growth Partner owns exactly one `referral_code`; attribution is resolved
  **server-side** at capture time and stored once in `shop_attributions`
  (unique per `salon_id`). Client-supplied partner identifiers are never
  trusted.
- `organizations` / `organization_members` allow a partner to operate as a
  team (agency) without changing the attribution model.

## 4. Data architecture (canonical, snake_case only)

- Shop onboarding state: `shop_onboarding_applications` (step machine,
  `payload` jsonb, review fields) around the canonical shop entity `salons`.
- Daily truth: `partner_shop_daily_qualification` (one row per shop per
  business day: amount, genuineness, streak index).
- First-window result: `partner_shop_onboarding_rewards` (one per shop).
- Money ledger: `commission_events` with `event_type` ∈ {`company_commission`,
  `onboarding_reward`, `recurring_growth_share`} — **one-time rewards and
  recurring shares are always separate rows**, with `month_index` for
  recurring rows. Settlement: `payments`.
- Rates: `commission_plans` + immutable, effective-dated
  `commission_plan_versions` (defaults equal the locked rules).
- Milestones: `partner_reward_milestones` (seeded later from
  `src/lib/constants/rewards.ts`) + `partner_reward_claims` (one per partner
  per milestone).
- Template handoff: `template_handoffs` stores only a **token hash**,
  expiry, and lifecycle timestamps — never the raw secret.

## 5. Security architecture

- **Project lock**: `NEXT_PUBLIC_SUPABASE_URL` must equal
  `https://qwaehqsmodekbgvnaavz.supabase.co`; validation rejects any other
  value at boot/build/test time. No new Supabase project may be created.
- **Browser bundle**: only public URL + anon key. `assertNoSecretsInPublicEnv`
  scans every `NEXT_PUBLIC_*` key/value for service-role, database or handoff
  material and throws. Service-role and DB clients live in server-only
  modules and validate lazily.
- **RLS (later phase, designed now)**: partners read only their own referral
  graph, earnings and claims; shop owners read only their shop; admin reads
  via explicit admin role; public reads no KYC/earnings/payment data. Manual
  admin mutations require audit logging. Phase 0 documents these policies but
  applies none of them.
- **Integrity**: payment ingestion (+ earning creation) runs in one atomic
  PostgreSQL transaction with idempotency keys; duplicate transaction IDs are
  rejected. All write workflows (later phases) are server-authoritative.

## 6. Conventions

- Money: integer **paise** (`*_paise` columns). Rates: integer **basis
  points** (`*_bps`, 10% = 1000). Timestamps: UTC `timestamptz`.
- No floats for money anywhere (test-enforced).
- Phase 0 maps existing tables only: **no migration files, no DDL, no data
  mutation**. The read-only audit script diffs live `information_schema`
  against the canonical list when CI provides `SUPABASE_DB_URL`.
