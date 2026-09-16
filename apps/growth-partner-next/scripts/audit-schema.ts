/**
 * Phase 0 schema audit — read-only.
 *
 * Modes:
 *   STATIC (default): verifies the Drizzle mappings cover exactly the
 *                     canonical table list. No credentials needed.
 *   LIVE  (opt-in):   when SUPABASE_DB_URL is present, performs READ-ONLY
 *                     introspection (information_schema) against the Supabase
 *                     project and diffs it against the canonical list.
 *                     It issues SELECTs only — no DDL, no writes.
 *
 * Usage:
 *   npm run audit:schema                     # static
 *   SUPABASE_DB_URL=... npm run audit:schema # static + live diff
 */

import { getTableName } from 'drizzle-orm';
import { PgTable } from 'drizzle-orm/pg-core';
import postgres from 'postgres';

import { CANONICAL_TABLE_NAMES } from '../src/db/canonical';
import * as schema from '../src/db/schema';

function isPgTable(value: unknown): value is PgTable {
  return value instanceof PgTable;
}

const mappedTables = (Object.values(schema) as unknown[])
  .filter(isPgTable)
  .map((table) => getTableName(table))
  .sort();

function diff(actual: readonly string[], expected: readonly string[]) {
  const actualSet = new Set(actual);
  const expectedSet = new Set(expected);
  return {
    missing: expected.filter((name) => !actualSet.has(name)),
    extra: actual.filter((name) => !expectedSet.has(name)),
  };
}

async function main() {
  console.log('=== Phase 0 schema audit ===\n');

  // ---- STATIC ------------------------------------------------------------
  const canonical = [...CANONICAL_TABLE_NAMES].sort();
  const mappingDiff = diff(mappedTables, canonical);

  console.log(`[static] canonical tables expected : ${canonical.length}`);
  console.log(`[static] drizzle tables mapped     : ${mappedTables.length}`);
  if (mappingDiff.missing.length)
    console.log(`[static] MISSING mappings          : ${mappingDiff.missing.join(', ')}`);
  if (mappingDiff.extra.length)
    console.log(`[static] NON-CANONICAL mappings    : ${mappingDiff.extra.join(', ')}`);
  console.log(
    mappingDiff.missing.length === 0 && mappingDiff.extra.length === 0
      ? '[static] OK — mappings match the canonical list exactly.\n'
      : '[static] FAILED — mapping drift detected.\n',
  );

  // ---- LIVE (opt-in, read-only) ------------------------------------------
  const dbUrl = process.env.SUPABASE_DB_URL;
  if (!dbUrl) {
    console.log(
      '[live] SKIPPED — SUPABASE_DB_URL not set. Provide the (server-only) ' +
        'connection string to run read-only introspection.',
    );
    process.exit(
      mappingDiff.missing.length === 0 && mappingDiff.extra.length === 0 ? 0 : 1,
    );
  }

  const sql = postgres(dbUrl, { prepare: false, max: 1 });
  try {
    const rows = await sql<{ table_name: string }[]>`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `;
    const liveTables = rows.map((row) => row.table_name);
    const liveDiff = diff(liveTables, canonical);

    console.log(`[live] public tables found          : ${liveTables.length}`);
    if (liveDiff.missing.length)
      console.log(`[live] canonical tables MISSING live: ${liveDiff.missing.join(', ')}`);
    if (liveDiff.extra.length)
      console.log(`[live] live tables not canonical  : ${liveDiff.extra.join(', ')}`);
    console.log(
      liveDiff.missing.length === 0
        ? '[live] OK — every canonical table exists in the live schema.'
        : '[live] WARNING — live schema drift vs canonical list.',
    );

    const clean =
      mappingDiff.missing.length === 0 &&
      mappingDiff.extra.length === 0 &&
      liveDiff.missing.length === 0;
    process.exit(clean ? 0 : 1);
  } finally {
    await sql.end({ timeout: 5 });
  }
}

main().catch((error) => {
  console.error('[audit] failed:', error);
  process.exit(2);
});
