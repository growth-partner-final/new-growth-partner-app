import { NextResponse } from 'next/server';

import { CANONICAL_TABLE_NAMES } from '@/db/canonical';
import { getEnvStatus, SUPABASE_PROJECT_REF } from '@/env';

export const dynamic = 'force-dynamic';

/**
 * Read-only health/config probe. Returns presence booleans for secrets —
 * never the secrets themselves.
 */
export function GET() {
  const env = getEnvStatus(process.env);
  return NextResponse.json({
    ok: true,
    phase: 0,
    supabaseProject: SUPABASE_PROJECT_REF,
    envUrlLocked: env.urlMatchesLock,
    anonKeyPresent: env.anonKeyPresent,
    serverSecretsPresent: {
      serviceRoleKey: env.serviceRolePresent,
      dbUrl: env.dbUrlPresent,
    },
    canonicalTableCount: CANONICAL_TABLE_NAMES.length,
  });
}
