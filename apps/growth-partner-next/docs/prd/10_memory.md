# 10_memory — Phase 0 decision log

## Session facts

- 2026-09-16 — Phase 0 executed on session branch
  `arena/01a0a919-new-growth-partner-app` (Arena session is pinned to this
  branch; the task-requested `arena/phase-0-canonical-baseline` could not be
  created). PR opened against `main`.
- Canonical commercial and security rules are locked into `src/lib/constants/*`,
  `src/db/schema.ts`, and contract tests.

## Binding decisions

1. **Monorepo placement**: the Next.js implementation lives at
   `apps/growth-partner-next/`; the existing Stitch prototype (Vite/React) at
   the repository root is preserved untouched — no screen or asset was
   deleted or overwritten.
2. **Supabase**: existing project `qwaehqsmodekbgvnaavz` only. Env validator
   hard-locks `NEXT_PUBLIC_SUPABASE_URL` to that project; Supabase Auth model
   matches the Template App (`profiles.id = auth.users.id`).
3. **Schema**: reuse/map the 17 canonical snake_case tables only (see
   `src/db/canonical.ts`). CamelCase duplicates such as `GrowthPartner`,
   `Salon`, `ShopPayments`, `PartnerEarnings` are contract-test-forbidden.
4. **No migration / no data mutation in Phase 0**: `src/db/schema.ts` is a
   mapping layer; there is intentionally no drizzle-kit migration folder.
5. **Money = integer paise; rates = basis points** (10% = 1000 bps). Never
   floats.
6. **Secrets**: service-role key, DB URL and handoff secret are server-only;
   `assertNoSecretsInPublicEnv` + tests block any `NEXT_PUBLIC_*` leak.
7. **Reward names and commission rules are code-enforced constants** — the 7
   milestone labels and the 10%/10%/10-5-2% recurring schedule cannot change
   without breaking the test suite.
8. **Tracker scope**: only 0.1 and 0.2 marked PASS in `08_TRACKER.md`.
