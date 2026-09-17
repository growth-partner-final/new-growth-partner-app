# 08_TRACKER — Nexora platform implementation tracker

> Update rule: only the current phase's rows may move to PASS. Later phases
> must NOT be marked complete.

## Phase 0 — Canonical Supabase + Next.js baseline

| #   | Task                        | Status        | Evidence |
| --- | --------------------------- | ------------- | -------- |
| 0.1 | Existing schema inventory   | ✅ **PASS**   | Canonical inventory of all 17 live tables encoded in `src/db/canonical.ts` (+ `scripts/audit-schema.ts` static/live diff). See `docs/PHASE_0_LIVE_AUDIT.md` and `docs/audits/PHASE_0_LIVE_AUDIT.md`. |
| 0.2 | Drizzle canonical mappings  | ✅ **PASS**   | `src/db/schema.ts` maps exactly the 17 canonical tables; `src/db/schema.contract.test.ts` enforces set-equality, snake_case names, forbidden duplicates and PRD defaults. Vitest suites green. |

## Phase 1 — Design system & public programme UI

| #   | Task                        | Status        | Evidence |
| --- | --------------------------- | ------------- | -------- |
| 1.1 | Brand / design tokens       | ✅ **PASS**   | Nexora palette tokens (magenta `#b1005e`, deep wine `#54123b`, muted lavender `#fda4c9`, warm white `#ffffff`), glassmorphism card specification, visible focus states, prefers-reduced-motion overrides, and 44px+ touch targets in `src/app/globals.css`. Verified via `src/responsive.contract.test.ts`. |
| 1.2 | Public landing page & routes| ✅ **PASS**   | `/` implemented with the 11 PRD sections in exact order (`03_APPFLOW.md` §1); 10 public routes live (`/`, `/programme`, `/how-it-works`, `/rewards`, `/qualification`, `/commission`, `/fraud-prevention`, `/faq`, `/legal`, `/support`); non-404 placeholders for `/partner/signup` and `/partner/login`; working desktop header and accessible mobile drawer; zero dead buttons. |
| 1.3 | Rewards poster section      | ✅ **PASS**   | `src/components/programme/PosterSection.tsx` implements conditional `object-fit: contain` rendering when asset is present and a polished semantic HTML table mirror of the seven rewards when absent. Zero broken images rendered. Contract test verified in `src/phase1.contract.test.ts`. |

## Phase 1 asset note (recorded)

- **Exact original poster asset pending release** — the official high-resolution printed Nexora reward poster was not present in the repository. As specified, no synthetic substitute was generated; `PosterSection` safely renders the verified semantic HTML mirror until `/public/assets/nexora-reward-poster.*` is supplied.

## Later phases — explicitly NOT complete

| Phase | Status |
| ----- | ------ |
| Phase 2 | ⏳ Not started |
| Phase 3 | ⏳ Not started |
| Phase 4 | ⏳ Not started |
| Phase 5 | ⏳ Not started |
| Phase 6 | ⏳ Not started |
| Phase 7 | ⏳ Not started |
| Phase 8 | ⏳ Not started |
