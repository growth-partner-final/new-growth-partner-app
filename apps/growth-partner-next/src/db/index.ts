import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { getServerEnv } from '@/env';
import * as schema from './schema';

/**
 * Lazily-created Drizzle client over the canonical Supabase Postgres
 * (`qwaehqsmodekbgvnaavz`). SERVER-ONLY:
 *
 *   - Never import this from a client component. The connection string comes
 *     from SUPABASE_DB_URL which must never appear in a NEXT_PUBLIC_* var.
 *   - Phase 0 performs no DDL and no production writes. There is no
 *     drizzle-kit migration folder; schema.ts is a mapping layer only.
 */

let sql: postgres.Sql | undefined;
let db: PostgresJsDatabase<typeof schema> | undefined;

export function getDb(): PostgresJsDatabase<typeof schema> {
  const env = getServerEnv();
  if (!env.SUPABASE_DB_URL) {
    throw new Error(
      'SUPABASE_DB_URL is not configured. Set it in the server environment ' +
        '(never as NEXT_PUBLIC_*). See .env.example.',
    );
  }
  if (!db) {
    // `prepare: false` is required when going through the Supabase pooler
    // (transaction mode) with postgres.js.
    sql = postgres(env.SUPABASE_DB_URL, { prepare: false });
    db = drizzle(sql, { schema });
  }
  return db;
}

export async function closeDb(): Promise<void> {
  if (sql) {
    await sql.end({ timeout: 5 });
    sql = undefined;
    db = undefined;
  }
}

export { schema };
export * from './canonical';
