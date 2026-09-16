import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { getTableName } from 'drizzle-orm';
import { PgTable, getTableConfig } from 'drizzle-orm/pg-core';

import {
  LOCKED_SUPABASE_URL,
  SUPABASE_PROJECT_REF,
  getPublicEnv,
} from './env';
import { CANONICAL_TABLE_NAMES } from './db/canonical';
import * as schema from './db/schema';
import {
  COMMISSION_EVENT_TYPES,
  computeCompanyCommissionPaise,
  computeOnboardingRewardFromQrPaise,
  recurringShareRateBps,
  RECURRING_SHARE_MONTHS_1_6_BPS,
  RECURRING_SHARE_MONTHS_7_12_BPS,
  RECURRING_SHARE_AFTER_12_BPS,
} from './lib/constants/commissions';
import { REWARD_MILESTONE_LABELS } from './lib/constants/rewards';

const PRD_FILES = [
  '01_PRD.md',
  '02_Architecture.md',
  '03_APPFLOW.md',
  '04_TECHSPEC.md',
  '05_SCHEMA.md',
  '06_RULES.md',
  '07_IMPLEMENTATIONPLAN.md',
  '08_TRACKER.md',
  '09_Phases.md',
  '10_memory.md',
] as const;

const prdPath = (name: string) => resolve(process.cwd(), 'docs', 'prd', name);
const prd = (name: string) => readFileSync(prdPath(name), 'utf8');

const FINAL_REWARD_LABELS = [
  '25 Shops — Official Nexora T-Shirt',
  '50 Shops — Samsung Tablet',
  '100 Shops — Branded HP Laptop',
  '250 Shops — Electric Scooter',
  '500 Shops — Latest iPhone',
  '750 Shops — Royal Enfield 350 CC',
  '1000+ Shops — District Partner SUV Car',
] as const;

/** Legacy reward names that must never appear outside 06_RULES/10_memory
 *  (which document the prohibition itself). */
const FORBIDDEN_REWARD_TERMS = [
  'Welcome Package',
  'Brezza',
  'Cash Bonus',
  'Global Ambassador',
  'President',
  'Vice President',
  'Director',
] as const;

/** PRD documents that may not mention legacy rewards at all. */
const REWARD_SURFACE_DOCS = [
  '01_PRD.md',
  '02_Architecture.md',
  '03_APPFLOW.md',
  '04_TECHSPEC.md',
  '05_SCHEMA.md',
  '07_IMPLEMENTATIONPLAN.md',
  '08_TRACKER.md',
  '09_Phases.md',
  'README.md',
] as const;

const ANON = 'a'.repeat(40);

function isPgTable(value: unknown): value is PgTable {
  return value instanceof PgTable;
}

describe('Phase 0 PRD contract', () => {
  it('contains all ten required PRD documents, with real content', () => {
    for (const name of PRD_FILES) {
      expect(existsSync(prdPath(name)), `missing docs/prd/${name}`).toBe(true);
      const content = prd(name);
      expect(content.length, `docs/prd/${name} must be a full document`).toBeGreaterThan(400);
      expect(content, `docs/prd/${name} must not be a stub`)
        .not.toMatch(/TBD|TODO|WIP\b|PROVISIONAL|placeholder content/i);
    }
  });

  it('accepts only the approved Supabase project', () => {
    expect(SUPABASE_PROJECT_REF).toBe('qwaehqsmodekbgvnaavz');
    expect(
      getPublicEnv({
        NEXT_PUBLIC_SUPABASE_URL: LOCKED_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: ANON,
      }).NEXT_PUBLIC_SUPABASE_URL,
    ).toBe('https://qwaehqsmodekbgvnaavz.supabase.co');
  });

  it.each([
    'https://abcdefghijklmnopqrxz.supabase.co',
    'https://qwaehqsmodekbgvnaavx.supabase.co', // one char off — still foreign
    'http://localhost:54321',
    'https://supabase.com',
  ])('rejects foreign Supabase project %s', (url) => {
    expect(() =>
      getPublicEnv({
        NEXT_PUBLIC_SUPABASE_URL: url,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: ANON,
      }),
    ).toThrow();
  });

  it('keeps the onboarding formula and both canonical examples', () => {
    const rules = prd('06_RULES.md');
    expect(rules).toMatch(/10% of company commission/i);
    expect(rules).toContain(
      '₹15,000 collection produces ₹1,500 company commission and ₹150',
    );
    expect(rules).toContain('₹50,000 produces ₹5,000 and ₹500');

    // same examples computed from code:
    expect(computeCompanyCommissionPaise(15_000 * 100)).toBe(150_000); // ₹1,500
    expect(computeOnboardingRewardFromQrPaise(15_000 * 100)).toBe(15_000); // ₹150
    expect(computeCompanyCommissionPaise(50_000 * 100)).toBe(500_000); // ₹5,000
    expect(computeOnboardingRewardFromQrPaise(50_000 * 100)).toBe(50_000); // ₹500
  });

  it('keeps the one-time reward and recurring growth share separate', () => {
    const types = Object.values(COMMISSION_EVENT_TYPES);
    expect(new Set(types).size).toBe(types.length);
    expect(COMMISSION_EVENT_TYPES.ONBOARDING_REWARD).toBe('onboarding_reward');
    expect(COMMISSION_EVENT_TYPES.RECURRING_GROWTH_SHARE).toBe(
      'recurring_growth_share',
    );

    const rules = prd('06_RULES.md');
    expect(rules).toContain('onboarding_reward');
    expect(rules).toContain('recurring_growth_share');
    expect(rules).toContain('lifetime growth share');

    // recurring schedule stays 10/5/2% and never equals the one-time rate table
    expect(recurringShareRateBps(3)).toBe(RECURRING_SHARE_MONTHS_1_6_BPS);
    expect(recurringShareRateBps(9)).toBe(RECURRING_SHARE_MONTHS_7_12_BPS);
    expect(recurringShareRateBps(40)).toBe(RECURRING_SHARE_AFTER_12_BPS);
  });

  it('uses exactly the final seven reward labels, consistently', () => {
    // constants are the code authority
    expect(REWARD_MILESTONE_LABELS).toEqual([...FINAL_REWARD_LABELS]);
    // and the same labels appear in the binding documents
    for (const doc of ['01_PRD.md', '06_RULES.md'] as const) {
      for (const label of FINAL_REWARD_LABELS) {
        expect(prd(doc), `${doc} must contain "${label}"`).toContain(label);
      }
    }
  });

  it.each([...FORBIDDEN_REWARD_TERMS])(
    'forbidden legacy reward "%s" is absent from reward surfaces',
    (term) => {
      // whole-word matching ("Director" must not match "directory")
      const pattern = new RegExp(`\\b${term.replace(/\s+/g, '\\s+')}\\b`, 'i');
      for (const label of REWARD_MILESTONE_LABELS) {
        expect(label).not.toMatch(pattern);
      }
      for (const doc of REWARD_SURFACE_DOCS) {
        expect(
          prd(doc),
          `docs/prd/${doc} must not mention "${term}"`,
        ).not.toMatch(pattern);
      }
    },
  );

  it('drizzle mappings use exactly the canonical snake_case names', () => {
    const names = (Object.values(schema) as unknown[])
      .filter(isPgTable)
      .map((table) => getTableName(table))
      .sort();
    const snakeCase = /^[a-z][a-z0-9]*(_[a-z0-9]+)*$/;

    expect(names).toEqual([...CANONICAL_TABLE_NAMES].sort());
    for (const name of names) expect(name).toMatch(snakeCase);
  });

  it('money fields use integer paise (never floats)', () => {
    const moneyTables = [
      schema.commissionEvents,
      schema.payments,
      schema.partnerShopDailyQualification,
      schema.partnerShopOnboardingRewards,
      schema.commissionPlanVersions,
    ];
    const paiseColumns = moneyTables.flatMap((table) =>
      getTableConfig(table).columns.filter((c) => c.name.endsWith('_paise')),
    );
    expect(paiseColumns.length).toBeGreaterThanOrEqual(6);
    for (const column of paiseColumns) {
      expect(column.dataType, `${column.name} must be integer paise`).toBe(
        'number',
      );
    }
    const rateColumns = getTableConfig(
      schema.commissionPlanVersions,
    ).columns.filter((c) => c.name.endsWith('_bps'));
    expect(rateColumns.length).toBe(5);
    for (const column of rateColumns) {
      expect(column.dataType, `${column.name} must be integer bps`).toBe(
        'number',
      );
    }
  });
});
