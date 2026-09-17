# PRD documents — Nexora Growth Partner Programme

This directory is the **binding specification** for the application at
`apps/growth-partner-next`. Code constants (`src/lib/constants/*`), the
schema contract (`src/db/canonical.ts`, `src/db/schema.ts`) and the test
suites enforce the security, money, qualification and reward rules described
here. When prose and tests ever disagree, the change requires a PRD revision
plus a test update in the same PR.

| File | Content |
| ---- | ------- |
| `01_PRD.md` | Product requirements: programme, personas, commercial rules, milestones, security mandates |
| `02_Architecture.md` | Repository topology, application layers, identity/tenancy, data & security architecture |
| `03_APPFLOW.md` | Public landing structure, partner/referral/onboarding/qualification/milestone flows |
| `04_TECHSPEC.md` | Stack, environment variables, code layout, conventions, verification gates |
| `05_SCHEMA.md` | Canonical snake_case table inventory (17 tables) and integrity notes |
| `06_RULES.md` | Locked commercial, fraud, reward-naming, RLS and security rules |
| `07_IMPLEMENTATIONPLAN.md` | Phase boundaries, sequence, prerequisites, risk register |
| `08_TRACKER.md` | Status tracker (Phase 0 rows 0.1/0.2 = PASS only) |
| `09_Phases.md` | Phase definitions and per-phase tracker rows |
| `10_memory.md` | Decision log |

**Status:** complete Phase 0 set. Phase 1 prerequisite: *exact original
poster required before Phase 1 public UI* (see `08_TRACKER.md`).
