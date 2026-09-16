import { describe, it, expect } from 'vitest';

import {
  MIN_DAILY_QR_AMOUNT_PAISE,
  CONSECUTIVE_QUALIFYING_DAYS,
  COMPANY_COMMISSION_BPS,
  ACTIVATION_REWARD_BPS,
  RECURRING_SHARE_MONTHS_1_6_BPS,
  RECURRING_SHARE_MONTHS_7_12_BPS,
  RECURRING_SHARE_AFTER_12_BPS,
  computeActivationRewardPaise,
  computeCompanyCommissionPaise,
  computeRecurringSharePaise,
  dayQualifies,
  formatINR,
  recurringShareRateBps,
} from './commissions';

describe('commission rule contract', () => {
  it('locks qualification: ₹1,000 genuine QR/day for 15 consecutive days', () => {
    expect(MIN_DAILY_QR_AMOUNT_PAISE).toBe(100_000); // ₹1,000 in paise
    expect(CONSECUTIVE_QUALIFYING_DAYS).toBe(15);
  });

  it('locks rates: 10% company, 10% activation; recurring 10/5/2%', () => {
    expect(COMPANY_COMMISSION_BPS).toBe(1_000);
    expect(ACTIVATION_REWARD_BPS).toBe(1_000);
    expect(RECURRING_SHARE_MONTHS_1_6_BPS).toBe(1_000);
    expect(RECURRING_SHARE_MONTHS_7_12_BPS).toBe(500);
    expect(RECURRING_SHARE_AFTER_12_BPS).toBe(200);
  });

  it('reproduces the canonical PRD example: ₹15,000 → ₹1,500 → ₹150', () => {
    const qrBusinessPaise = 15_000 * 100; // ₹15,000
    const companyCommission = computeCompanyCommissionPaise(qrBusinessPaise);
    const activationReward = computeActivationRewardPaise(companyCommission);

    expect(companyCommission).toBe(150_000); // ₹1,500
    expect(activationReward).toBe(15_000); // ₹150
    expect(formatINR(companyCommission)).toBe('₹1,500.00');
    expect(formatINR(activationReward)).toBe('₹150.00');
  });

  it('a day qualifies only at >= ₹1,000 of GENUINE business', () => {
    expect(dayQualifies(100_000, true)).toBe(true);
    expect(dayQualifies(99_999, true)).toBe(false);
    expect(dayQualifies(500_000, false)).toBe(false); // fraud-flagged never qualifies
  });

  it('recurring share switches exactly at month boundaries', () => {
    expect(recurringShareRateBps(1)).toBe(1_000);
    expect(recurringShareRateBps(6)).toBe(1_000); // last month at 10%
    expect(recurringShareRateBps(7)).toBe(500); // first month at 5%
    expect(recurringShareRateBps(12)).toBe(500); // last month at 5%
    expect(recurringShareRateBps(13)).toBe(200); // from then on 2%
    expect(recurringShareRateBps(120)).toBe(200);
  });

  it('rejects invalid month indexes', () => {
    expect(() => recurringShareRateBps(0)).toThrow(RangeError);
    expect(() => recurringShareRateBps(-3)).toThrow(RangeError);
    expect(() => recurringShareRateBps(1.5)).toThrow(RangeError);
  });

  it('recurring share math stays integer-exact', () => {
    // ₹1,500 company commission in month 6 → ₹150 share (10%)
    expect(computeRecurringSharePaise(150_000, 6)).toBe(15_000);
    // month 9 → ₹75 (5%)
    expect(computeRecurringSharePaise(150_000, 9)).toBe(7_500);
    // month 20 → ₹30 (2%)
    expect(computeRecurringSharePaise(150_000, 20)).toBe(3_000);
  });

  it('rate application rejects non-integer money', () => {
    expect(() => computeCompanyCommissionPaise(1500.5)).toThrow(TypeError);
  });
});
