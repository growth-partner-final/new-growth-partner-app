import { describe, it, expect } from 'vitest';
import { getTableName } from 'drizzle-orm';
import { PgTable, getTableConfig } from 'drizzle-orm/pg-core';

import { CANONICAL_TABLE_NAMES, FORBIDDEN_MODEL_NAMES } from './canonical';
import * as schema from './schema';

function isPgTable(value: unknown): value is PgTable {
  return value instanceof PgTable;
}

const exportedTables = (Object.values(schema) as unknown[]).filter(isPgTable);
const exportedNames = exportedTables.map((table) => getTableName(table));

describe('canonical schema contract', () => {
  it('maps EXACTLY the canonical tables — no more, no less', () => {
    expect([...exportedNames].sort()).toEqual(
      [...CANONICAL_TABLE_NAMES].sort(),
    );
  });

  it.each(CANONICAL_TABLE_NAMES)('canonical table "%s" is mapped', (name) => {
    expect(exportedNames).toContain(name);
  });

  it('contains no duplicate table names', () => {
    expect(new Set(exportedNames).size).toBe(exportedNames.length);
  });

  it('uses snake_case table names only', () => {
    const snakeCase = /^[a-z][a-z0-9]*(_[a-z0-9]+)*$/;
    for (const name of exportedNames) {
      expect(name, `table "${name}" must be snake_case`).toMatch(snakeCase);
    }
  });

  it.each([...FORBIDDEN_MODEL_NAMES])(
    'forbidden duplicate model "%s" is NOT introduced',
    (forbidden) => {
      for (const name of exportedNames) {
        expect(name.toLowerCase()).not.toBe(forbidden.toLowerCase());
      }
      for (const key of Object.keys(schema)) {
        expect(key).not.toBe(forbidden);
      }
    },
  );

  it('never maps the listed camelCase duplicates the PRD calls out', () => {
    const banned = ['growthpartner', 'salon', 'shoppayments', 'partnerearnings'];
    for (const name of exportedNames) {
      expect(banned).not.toContain(name.replace(/_/g, '').toLowerCase());
    }
  });

  it('every mapped table has a primary key', () => {
    for (const table of exportedTables) {
      const { columns } = getTableConfig(table);
      expect(
        columns.some((column) => column.primary),
        `table "${getTableName(table)}" must declare a primary key`,
      ).toBe(true);
    }
  });

  it('PRD commission defaults are embedded in commission_plan_versions', () => {
    const { columns } = getTableConfig(schema.commissionPlanVersions);
    const defaults = Object.fromEntries(
      columns.map((c) => [c.name, c.hasDefault ? c.default : undefined]),
    );
    // ₹1,000/day · 15 consecutive days · 10% company commission
    expect(defaults['min_daily_qr_amount_paise']).toBe(100_000);
    expect(defaults['consecutive_qualifying_days']).toBe(15);
    expect(defaults['company_commission_bps']).toBe(1_000);
    // activation reward 10% · recurring 10% / 5% / 2%
    expect(defaults['activation_reward_bps']).toBe(1_000);
    expect(defaults['recurring_months_1_6_bps']).toBe(1_000);
    expect(defaults['recurring_months_7_12_bps']).toBe(500);
    expect(defaults['recurring_after_12_bps']).toBe(200);
  });

  it('money is integer paise and never float', () => {
    const moneyColumns = [
      ...getTableConfig(schema.commissionEvents).columns,
      ...getTableConfig(schema.payments).columns,
      ...getTableConfig(schema.partnerShopDailyQualification).columns,
      ...getTableConfig(schema.partnerShopOnboardingRewards).columns,
    ].filter((c) => c.name.endsWith('_paise'));
    expect(moneyColumns.length).toBeGreaterThan(0);
    for (const column of moneyColumns) {
      expect(column.dataType, `${column.name} must be integer paise`).toBe(
        'number',
      );
    }
  });
});
