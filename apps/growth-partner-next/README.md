# growth-partner-next

Nexora Growth Partner platform — **Next.js App Router + TypeScript + Drizzle
ORM** on the existing canonical Supabase project **`qwaehqsmodekbgvnaavz`**.

> Phase 0 = canonical baseline: schema mappings, environment lock-in,
> contract tests and audit tooling. **No migration is applied and no
> production data is mutated.** The earlier Stitch prototype UI at the
> repository root is preserved untouched.

## Layout

```
src/
  env.ts                     # Env validation: URL lock + NEXT_PUBLIC secret guard
  app/                       # App Router (Phase 0 status page, /api/health)
  db/canonical.ts            # The 17 canonical table names + forbidden duplicates
  db/schema.ts               # Drizzle mappings of the canonical tables (no migrations)
  db/index.ts                # Server-only Drizzle client (SUPABASE_DB_URL)
  db/schema.contract.test.ts # Schema contract tests
  lib/constants/             # Locked reward ladder + commission rules (+ tests)
  lib/supabase/              # Browser / server Supabase clients (same Auth as Template App)
scripts/audit-schema.ts      # Static + opt-in live (read-only) schema audit
docs/prd/                    # PRD documents + 08_TRACKER.md (Phase 0 rows only)
docs/audits/                 # Phase 0 audit report
```

## Commands

```bash
npm install
npm run typecheck     # tsc --noEmit
npm test              # vitest run (schema/env/reward/commission contracts)
npm run build         # next build (type errors fail the build)
npm run audit:schema  # static audit; LIVE read-only when SUPABASE_DB_URL set
npm run verify        # all of the above
npm run dev           # local dev server
```

## Environment

Copy `.env.example` → `.env.local`. Hard rules (also enforced in code/tests):

- `NEXT_PUBLIC_SUPABASE_URL` **must** equal
  `https://qwaehqsmodekbgvnaavz.supabase.co` — any other project throws.
- Service-role key, database URL and template-handoff secrets are
  **server-only**; never prefix them with `NEXT_PUBLIC_`.

## Locked business rules (change = failing tests)

- Min **₹1,000** genuine QR business/day, **15** consecutive qualifying days.
- Company commission **10%**; activation reward **10% of company commission**
  from the first 15 qualifying days (₹15,000 → ₹1,500 → ₹150).
- Recurring share: months 1–6 **10%** · 7–12 **5%** · >12 **2%**.
- Milestones: 25 Official Nexora T-Shirt · 50 Samsung Tablet · 100 Branded HP
  Laptop · 250 Electric Scooter · 500 Latest iPhone · 750 Royal Enfield
  350 CC · 1000+ District Partner SUV Car (exact PRD labels in
  `src/lib/constants/rewards.ts`).
