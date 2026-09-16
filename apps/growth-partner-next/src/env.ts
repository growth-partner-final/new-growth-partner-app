import { z } from 'zod';

/**
 * Canonical environment validation — Phase 0.
 *
 * Non-negotiable rules (from docs/prd):
 *  1. The app is HARD-LOCKED to the existing Supabase project
 *     `qwaehqsmodekbgvnaavz`. Creating or pointing at any other project is a
 *     build-time/test-time error.
 *  2. Only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
 *     may ever reach the browser.
 *  3. Service-role keys, database URLs and handoff secrets must NEVER be
 *     exposed through a `NEXT_PUBLIC_*` variable. `assertNoSecretsInPublicEnv`
 *     is executed by every getter here and by the contract tests.
 */

export const SUPABASE_PROJECT_REF = 'qwaehqsmodekbgvnaavz' as const;
export const LOCKED_SUPABASE_URL =
  `https://${SUPABASE_PROJECT_REF}.supabase.co` as const;

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .url('NEXT_PUBLIC_SUPABASE_URL must be a valid URL')
    .refine((value) => value === LOCKED_SUPABASE_URL, {
      message:
        `NEXT_PUBLIC_SUPABASE_URL is locked to "${LOCKED_SUPABASE_URL}" ` +
        `(Supabase project ref: ${SUPABASE_PROJECT_REF}). ` +
        'Do not create or point at any other Supabase project.',
    }),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(20, 'NEXT_PUBLIC_SUPABASE_ANON_KEY looks empty or truncated'),
});

const serverEnvSchema = z.object({
  /** Bypasses RLS — server-only, must never be bundled for the browser. */
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20).optional(),
  /** Postgres connection string of the SAME Supabase project (Drizzle ORM). */
  SUPABASE_DB_URL: z.string().min(1).optional(),
  /** Shared signer for template handoff links (template_handoffs). */
  TEMPLATE_HANDOFF_SECRET: z.string().min(16).optional(),
});

export type PublicEnv = z.infer<typeof publicEnvSchema>;
export type ServerEnv = z.infer<typeof serverEnvSchema>;

/**
 * Names that mark a variable as a server secret. If a NEXT_PUBLIC_* key
 * matches this pattern the environment is rejected outright.
 */
const FORBIDDEN_PUBLIC_KEY_PATTERN =
  /service[_-]?role|database|db[_-]?url|handoff|secret|password|private[_-]?key|postgres/i;

/** Values that mark a leaked secret (JWT role claims / postgres DSNs). */
const FORBIDDEN_PUBLIC_VALUE_PATTERN =
  /service_role|postgres(ql)?:\/\/|-----BEGIN [A-Z ]*PRIVATE KEY-----/i;

/** Variables that are explicitly allowed to be public. */
const ALLOWED_PUBLIC_KEYS = new Set([
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
]);

/**
 * Throws when any browser-exposed variable carries a secret.
 * Call this before ANY env consumption (getters below do it for you; the
 * schema contract tests run it against fabricated environments too).
 */
export function assertNoSecretsInPublicEnv(
  env: Record<string, string | undefined> = process.env,
): void {
  for (const [key, value] of Object.entries(env)) {
    if (!key.startsWith('NEXT_PUBLIC_')) continue;
    if (ALLOWED_PUBLIC_KEYS.has(key)) continue;

    if (FORBIDDEN_PUBLIC_KEY_PATTERN.test(key)) {
      throw new Error(
        `Secret leak blocked: "${key}" matches a secret pattern but is ` +
          'exposed via NEXT_PUBLIC_. Service-role keys, database URLs and ' +
          'handoff secrets must remain server-only.',
      );
    }
    if (value && FORBIDDEN_PUBLIC_VALUE_PATTERN.test(value)) {
      throw new Error(
        `Secret leak blocked: the value of "${key}" looks like a service-role ` +
          'credential, database URL or private key but is exposed via NEXT_PUBLIC_.',
      );
    }
  }
}

/** Validated browser-safe env. Throws on a wrong/foreign Supabase project. */
export function getPublicEnv(
  env: Record<string, string | undefined> = process.env,
): PublicEnv {
  assertNoSecretsInPublicEnv(env);
  return publicEnvSchema.parse({
    NEXT_PUBLIC_SUPABASE_URL: env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });
}

/** Validated server-only env (never import this object into client code). */
export function getServerEnv(
  env: Record<string, string | undefined> = process.env,
): ServerEnv {
  assertNoSecretsInPublicEnv(env);
  return serverEnvSchema.parse({
    SUPABASE_SERVICE_ROLE_KEY: env.SUPABASE_SERVICE_ROLE_KEY,
    SUPABASE_DB_URL: env.SUPABASE_DB_URL,
    TEMPLATE_HANDOFF_SECRET: env.TEMPLATE_HANDOFF_SECRET,
  });
}

export interface EnvStatus {
  projectRef: typeof SUPABASE_PROJECT_REF;
  lockedUrl: typeof LOCKED_SUPABASE_URL;
  configuredUrl: string | undefined;
  urlMatchesLock: boolean;
  anonKeyPresent: boolean;
  serviceRolePresent: boolean;
  dbUrlPresent: boolean;
}

/**
 * Non-throwing status probe used by the Phase 0 status page and /api/health.
 * It NEVER returns secret values — only presence booleans.
 */
export function getEnvStatus(
  env: Record<string, string | undefined> = process.env,
): EnvStatus {
  return {
    projectRef: SUPABASE_PROJECT_REF,
    lockedUrl: LOCKED_SUPABASE_URL,
    configuredUrl: env.NEXT_PUBLIC_SUPABASE_URL,
    urlMatchesLock: env.NEXT_PUBLIC_SUPABASE_URL === LOCKED_SUPABASE_URL,
    anonKeyPresent: Boolean(env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    serviceRolePresent: Boolean(env.SUPABASE_SERVICE_ROLE_KEY),
    dbUrlPresent: Boolean(env.SUPABASE_DB_URL),
  };
}
