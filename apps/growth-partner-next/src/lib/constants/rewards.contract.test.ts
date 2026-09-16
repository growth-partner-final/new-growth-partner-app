import { describe, it, expect } from 'vitest';

import {
  REWARD_MILESTONES,
  REWARD_MILESTONE_LABELS,
  unlockedMilestone,
} from './rewards';

/**
 * The reward names below are the FINAL PRD names — byte-for-byte, including
 * the em dash. They must survive every refactor unchanged.
 */
const CANONICAL_LABELS = [
  '25 Shops — Official Nexora T-Shirt',
  '50 Shops — Samsung Tablet',
  '100 Shops — Branded HP Laptop',
  '250 Shops — Electric Scooter',
  '500 Shops — Latest iPhone',
  '750 Shops — Royal Enfield 350 CC',
  '1000+ Shops — District Partner SUV Car',
] as const;

describe('reward milestone contract', () => {
  it('keeps exactly the 7 final PRD rewards, verbatim', () => {
    expect(REWARD_MILESTONE_LABELS).toEqual([...CANONICAL_LABELS]);
    expect(REWARD_MILESTONES).toHaveLength(7);
  });

  it('locks thresholds to 25 / 50 / 100 / 250 / 500 / 750 / 1000 in order', () => {
    expect(REWARD_MILESTONES.map((m) => m.threshold)).toEqual([
      25, 50, 100, 250, 500, 750, 1000,
    ]);
  });

  it('thresholds are strictly increasing', () => {
    const thresholds = REWARD_MILESTONES.map((m) => m.threshold);
    for (let i = 1; i < thresholds.length; i++) {
      expect(thresholds[i]).toBeGreaterThan(thresholds[i - 1]);
    }
  });

  it('resolves the highest unlocked milestone for a shop count', () => {
    expect(unlockedMilestone(0)).toBeUndefined();
    expect(unlockedMilestone(24)).toBeUndefined();
    expect(unlockedMilestone(25)?.label).toBe(CANONICAL_LABELS[0]);
    expect(unlockedMilestone(49)?.label).toBe(CANONICAL_LABELS[0]);
    expect(unlockedMilestone(120)?.label).toBe(CANONICAL_LABELS[2]);
    expect(unlockedMilestone(1000)?.label).toBe(CANONICAL_LABELS[6]);
    expect(unlockedMilestone(5000)?.label).toBe(CANONICAL_LABELS[6]);
  });
});
