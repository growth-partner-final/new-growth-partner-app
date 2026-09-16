# 04_TECHSPEC — technical baseline

- Next.js 15 App Router, React 19, and TypeScript `strict: true`.
- Drizzle maps only canonical snake_case PostgreSQL tables; duplicate camelCase authority models are forbidden.
- Money is integer paise and rates are integer basis points; floats are never used for money.
- `NEXT_PUBLIC_SUPABASE_URL` is exactly `https://qwaehqsmodekbgvnaavz.supabase.co`; browser variables cannot expose service-role keys, database URLs, passwords, or handoff secrets.
- Browser code uses the public Supabase client only. Server-only database and service-role configuration remains outside client bundles.
- Vitest enforces URL, server-env, schema, money, commission examples, and all seven reward labels.
- `npm ci`, `npm run typecheck`, `npm test`, and `npm run build` are review gates. No Phase 0 migration runs.
