import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import { getPublicEnv } from '@/env';

/**
 * Browser Supabase client — SAME Supabase Auth as the Template App, pointed
 * at the LOCKED project qwaehqsmodekbgvnaavz (env validation throws on any
 * other URL).
 *
 * Uses only NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY.
 * Service-role credentials are never available here by construction.
 */

let browserClient: SupabaseClient | undefined;

export function getSupabaseBrowserClient(): SupabaseClient {
  if (!browserClient) {
    const env = getPublicEnv();
    browserClient = createClient(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    );
  }
  return browserClient;
}
