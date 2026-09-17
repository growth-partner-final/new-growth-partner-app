# 10_memory — decision log

## Session facts

- **2026-09-16 (Phase 0 baseline)** — executed on session branch
  `arena/01a0a919-new-growth-partner-app` (Arena session is pinned to this
  branch; the task-requested `arena/phase-0-canonical-baseline` could not be
  created). PR #1 opened against `main`; **not merged** by automation.
- **2026-09-16 (Phase 0 completion)** — full PRD document set authored
  in-repo (`01`–`10` complete, no stubs), tests extended
  (`commissions.test.ts`, `prd.contract.test.ts`), audit docs completed on
  the same branch and pushed to PR #1. The earlier external PRD bundle
  (`nexora-platform-prd-phase0.zip`) was never delivered to the workspace;
  this in-repo set is the canonical source of truth going forward.
- **2026-09-17 (Phase 1 Public UI completion)** — executed on session branch
  `arena/01a0ad02-new-growth-partner-app`. Implemented all 10 public responsive
  routes (`/`, `/programme`, `/how-it-works`, `/rewards`, `/qualification`,
  `/commission`, `/fraud-prevention`, `/faq`, `/legal`, `/support`) and
  non-404 placeholders (`/partner/signup`, `/partner/login`). Implemented 17
  reusable components with Nexora design system tokens, controlled glassmorphism,
  and accessible navigation. Added responsive and Phase-1 contract tests
  (126 tests green across 7 suites). Handled absent poster safely without
  substitute generation.
- Reward poster not present in git history or working tree → recorded:
  *Exact original poster required before Phase 1 public UI.* Safe fallback
  mirrors the seven rewards semantically in code.

## Binding decisions

1. **Monorepo placement**: production implementation lives at
   `apps/growth-partner-next/`; the existing Stitch prototype (Vite/React) at
   the repository root is preserved untouched — no screen or asset was
   deleted or overwritten, and it is never production-wired.
2. **Supabase**: existing project `qwaehqsmodekbgvnaavz` only. Env validator
   hard-locks `NEXT_PUBLIC_SUPABASE_URL`; Supabase Auth model matches the
   Template App (`profiles.id = auth.users.id`). Foreign URLs fail tests.
3. **Schema**: reuse/map the 17 canonical snake_case tables only (see
   `src/db/canonical.ts`). CamelCase duplicates (`GrowthPartner`, `Salon`,
   `ShopPayments`, `PartnerEarnings`, …) are contract-test-forbidden.
4. **No migration / no data mutation in Phase 0**: `src/db/schema.ts` is a
   mapping layer; there is intentionally no drizzle-kit migration folder; the
   audit script is read-only.
5. **Money = integer paise; rates = basis points** (10% = 1000 bps). Never
   floats; non-integer input throws.
6. **Ledger separation**: `commission_events.event_type` ∈
   {`company_commission`, `onboarding_reward`, `recurring_growth_share`} —
   the one-time onboarding reward and the recurring growth share are distinct
   rows and distinct code paths; the reward is 10% of company commission,
   never 10% of the QR collection.
7. **Secrets**: service-role key, DB URL and handoff secret are server-only;
   `assertNoSecretsInPublicEnv()` + tests block any `NEXT_PUBLIC_*` leak;
   `.env.example` carries placeholders only.
8. **Rewards**: the 7 milestone labels are byte-exact constants; legacy
   names (Welcome Package, Brezza Contribution, Cash Bonus, Global
   Ambassador, President, Vice President, Director rewards) are forbidden and
   test-rejected.
9. **Tracker scope**: 0.1, 0.2, 1.1, 1.2, 1.3 marked PASS in `08_TRACKER.md`;
   the poster prerequisite is recorded with safe semantic fallback. Phase 2
   was not started.
10. **Phase 1 UI scope**: pure CSS implementation with zero external runtime UI
    dependencies. Accessible accordion, modal mobile navigation drawer,
    contrast ratios, and responsive breakpoints at 360, 390, 768, 1024, 1440px.
