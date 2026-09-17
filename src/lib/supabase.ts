import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const APPROVED_SUPABASE_PROJECT_REF = 'qwaehqsmodekbgvnaavz' as const;
export const APPROVED_SUPABASE_URL = 'https://qwaehqsmodekbgvnaavz.supabase.co' as const;

/**
 * Validates Supabase environment variables.
 * Fails clearly if variables are missing or point to an unapproved project.
 */
export function validateSupabaseConfig(): { url: string; anonKey: string } {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url || typeof url !== 'string' || !url.trim()) {
    throw new Error(
      `Missing VITE_SUPABASE_URL environment variable. Expected "${APPROVED_SUPABASE_URL}".`
    );
  }

  const normalizedUrl = url.trim().replace(/\/+$/, '');
  if (normalizedUrl !== APPROVED_SUPABASE_URL) {
    throw new Error(
      `Invalid VITE_SUPABASE_URL: "${url}". Only approved Supabase project "${APPROVED_SUPABASE_PROJECT_REF}" (${APPROVED_SUPABASE_URL}) is permitted.`
    );
  }

  if (
    !anonKey ||
    typeof anonKey !== 'string' ||
    !anonKey.trim() ||
    anonKey.includes('placeholder')
  ) {
    throw new Error(
      'Missing or invalid VITE_SUPABASE_ANON_KEY environment variable. Supabase anonymous key is required.'
    );
  }

  return { url: normalizedUrl, anonKey: anonKey.trim() };
}

let _supabaseClient: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_supabaseClient) {
    const { url, anonKey } = validateSupabaseConfig();
    _supabaseClient = createClient(url, anonKey);
  }
  return _supabaseClient;
}

export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getSupabase();
    const val = (client as any)[prop];
    if (typeof val === 'function') {
      return val.bind(client);
    }
    return val;
  },
});

export function useSupabase() {
  return supabase;
}
