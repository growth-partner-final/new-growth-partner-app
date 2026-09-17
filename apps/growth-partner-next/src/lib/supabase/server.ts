import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import { getPublicEnv, getServerEnv } from '@/env';

/**
 * SERVER-ONLY Supabase clients. Never import into client components —
 * SUPABASE_SERVICE_ROLE_KEY bypasses RLS and must stay off the browser
 * (enforced by assertNoSecretsInPublicEnv + contract tests).
 */

/** Anon-key server client (RLS-respecting), e.g. for route handlers. */
export function getSupabaseAnonServerClient(): SupabaseClient {
  const env = getPublicEnv();
  return createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** Service-role client — privileged, server-only. */
export function getSupabaseServiceRoleClient(): SupabaseClient {
  const env = getPublicEnv();
  const server = getServerEnv();
  if (!server.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY is not configured. It is a server-only ' +
        'secret — never expose it via NEXT_PUBLIC_*. See .env.example.',
    );
  }
  return createClient(env.NEXT_PUBLIC_SUPABASE_URL, server.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
