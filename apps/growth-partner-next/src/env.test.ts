import { describe, it, expect } from 'vitest';

import {
  LOCKED_SUPABASE_URL,
  SUPABASE_PROJECT_REF,
  assertNoSecretsInPublicEnv,
  getEnvStatus,
  getPublicEnv,
  getServerEnv,
} from './env';

const ANON = 'a'.repeat(40);

describe('environment contract', () => {
  it('locks the Supabase URL to the canonical project', () => {
    expect(SUPABASE_PROJECT_REF).toBe('qwaehqsmodekbgvnaavz');
    expect(LOCKED_SUPABASE_URL).toBe(
      'https://qwaehqsmodekbgvnaavz.supabase.co',
    );
  });

  it('accepts the locked public env', () => {
    const parsed = getPublicEnv({
      NEXT_PUBLIC_SUPABASE_URL:
        'https://qwaehqsmodekbgvnaavz.supabase.co',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: ANON,
    });
    expect(parsed.NEXT_PUBLIC_SUPABASE_URL).toBe(LOCKED_SUPABASE_URL);
  });

  it.each([
    'https://another-project.supabase.co',
    'https://qwaehqsmodekbgvnaavx.supabase.co',
    'http://localhost:54321',
    'not-a-url',
    undefined,
  ])(
    'rejects NEXT_PUBLIC_SUPABASE_URL=%j (project is locked, no new project allowed)',
    (url) => {
      expect(() =>
        getPublicEnv({
          NEXT_PUBLIC_SUPABASE_URL: url,
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ANON,
        }),
      ).toThrow();
    },
  );

  it('rejects a missing/too-short anon key', () => {
    expect(() =>
      getPublicEnv({
        NEXT_PUBLIC_SUPABASE_URL: LOCKED_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: 'short',
      }),
    ).toThrow();
  });

  it.each([
    'NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY',
    'NEXT_PUBLIC_SERVICE_ROLE',
    'NEXT_PUBLIC_DATABASE_URL',
    'NEXT_PUBLIC_SUPABASE_DB_URL',
    'NEXT_PUBLIC_TEMPLATE_HANDOFF_SECRET',
    'NEXT_PUBLIC_HANDOFF_SECRET',
    'NEXT_PUBLIC_DB_PASSWORD',
  ])(
    'blocks browser-exposed secret variable %s',
    (key) => {
      expect(() =>
        assertNoSecretsInPublicEnv({ [key]: 'whatever-value' }),
      ).toThrow(/Secret leak blocked/);
    },
  );

  it('blocks a service-role JWT pasted into ANY public variable', () => {
    expect(() =>
      assertNoSecretsInPublicEnv({
        NEXT_PUBLIC_RANDOM_FLAG: 'prefix-"role":"service_role"-suffix',
      }),
    ).toThrow(/Secret leak blocked/);
  });

  it('blocks a postgres DSN in a public variable', () => {
    expect(() =>
      assertNoSecretsInPublicEnv({
        NEXT_PUBLIC_ANALYTICS_ENDPOINT:
          'postgresql://postgres:pw@db.example.supabase.co:5432/postgres',
      }),
    ).toThrow(/Secret leak blocked/);
  });

  it('allows the two canonical public variables', () => {
    expect(() =>
      assertNoSecretsInPublicEnv({
        NEXT_PUBLIC_SUPABASE_URL: LOCKED_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: ANON,
      }),
    ).not.toThrow();
  });

  it('server env stays optional and separate', () => {
    const parsed = getServerEnv({
      NEXT_PUBLIC_SUPABASE_URL: LOCKED_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: ANON,
      SUPABASE_SERVICE_ROLE_KEY: 'b'.repeat(40),
      SUPABASE_DB_URL:
        'postgresql://postgres.qwaehqsmodekbgvnaavz:pw@pooler.supabase.com:6543/postgres',
      TEMPLATE_HANDOFF_SECRET: 'c'.repeat(32),
    });
    expect(parsed.SUPABASE_SERVICE_ROLE_KEY).toBe('b'.repeat(40));
  });

  it('env status never exposes secret values', () => {
    const status = getEnvStatus({
      NEXT_PUBLIC_SUPABASE_URL: LOCKED_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: ANON,
      SUPABASE_SERVICE_ROLE_KEY: 'super-secret-value',
      SUPABASE_DB_URL: 'postgresql://postgres:pw@host/db',
    });
    expect(status.urlMatchesLock).toBe(true);
    expect(status.anonKeyPresent).toBe(true);
    expect(status.serviceRolePresent).toBe(true);
    expect(status.dbUrlPresent).toBe(true);
    expect(JSON.stringify(status)).not.toContain('super-secret-value');
    expect(JSON.stringify(status)).not.toContain('postgres:pw@');
  });
});
