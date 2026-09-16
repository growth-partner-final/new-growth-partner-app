# Phase 0 live audit

**Branch:** `arena/01a0a919-new-growth-partner-app`  
**Approved project:** `qwaehqsmodekbgvnaavz`

The Phase 0 audit is static by default and verifies that Drizzle maps the 17 canonical snake_case tables. `npm run audit:schema` performs optional, read-only `information_schema` introspection only when `SUPABASE_DB_URL` is provided in a secure CI environment. No live credentials were used here.

No migration was generated or applied, no destructive SQL was run, and no production data was modified. The app hard-locks its public Supabase URL to `https://qwaehqsmodekbgvnaavz.supabase.co`; different project URLs fail validation. Secrets remain placeholders in `.env.example` and are blocked from browser-exposed variables.

The exact original Nexora pink reward poster was not found in the repository or reachable git history. No substitute was created. **Exact poster required before Phase 1 public UI.**
