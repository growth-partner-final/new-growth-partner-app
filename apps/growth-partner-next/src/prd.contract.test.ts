import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const prd = (name: string) =>
  readFileSync(resolve(process.cwd(), 'docs', 'prd', name), 'utf8');

describe('Phase 0 PRD contract', () => {
  it('contains all ten required PRD documents', () => {
    for (const name of [
      '01_PRD.md', '02_Architecture.md', '03_APPFLOW.md', '04_TECHSPEC.md',
      '05_SCHEMA.md', '06_RULES.md', '07_IMPLEMENTATIONPLAN.md',
      '08_TRACKER.md', '09_Phases.md', '10_memory.md',
    ]) expect(prd(name).length).toBeGreaterThan(100);
  });

  it('keeps the onboarding formula and both canonical examples', () => {
    const rules = prd('06_RULES.md');
    expect(rules).toMatch(/10% of company commission/i);
    expect(rules).toContain('₹15,000 collection produces ₹1,500 company commission and ₹150');
    expect(rules).toContain('₹50,000 produces ₹5,000 and ₹500');
  });

  it('uses exactly the final seven reward labels', () => {
    const rules = prd('06_RULES.md');
    for (const label of [
      '25 Shops — Official Nexora T-Shirt', '50 Shops — Samsung Tablet',
      '100 Shops — Branded HP Laptop', '250 Shops — Electric Scooter',
      '500 Shops — Latest iPhone', '750 Shops — Royal Enfield 350 CC',
      '1000+ Shops — District Partner SUV Car',
    ]) expect(rules).toContain(label);
  });
});
