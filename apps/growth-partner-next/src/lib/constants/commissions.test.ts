import { describe, it, expect } from 'vitest';

import {
  MIN_DAILY_QR_AMOUNT_PAISE,
  CONSECUTIVE_QUALIFYING_DAYS,
  COMPANY_COMMISSION_BPS,
  ACTIVATION_REWARD_BPS,
  MIN_DAILY_COMPANY_COMMISSION_PAISE,
  MIN_WINDOW_QR_AMOUNT_PAISE,
  MIN_WINDOW_COMPANY_COMMISSION_PAISE,
  RECURRING_SHARE_MONTHS_1_6_BPS,
  RECURRING_SHARE_MONTHS_7_12_BPS,
  RECURRING_SHARE_AFTER_12_BPS,
  COMMISSION_EVENT_TYPES,
  applyRateBps,
  computeActivationRewardPaise,
  computeCompanyCommissionPaise,
  computeOnboardingRewardFromQrPaise,
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

  it('locks window minimums: ₹100/day, ₹15,000 and ₹1,500 per 15 days', () => {
    expect(MIN_DAILY_COMPANY_COMMISSION_PAISE).toBe(10_000); // ₹100 = 10% of ₹1,000
    expect(MIN_WINDOW_QR_AMOUNT_PAISE).toBe(1_500_000); // ₹15,000
    expect(MIN_WINDOW_COMPANY_COMMISSION_PAISE).toBe(150_000); // ₹1,500
    // internally consistent: 15 × daily minimums = window minimums
    expect(MIN_DAILY_QR_AMOUNT_PAISE * CONSECUTIVE_QUALIFYING_DAYS).toBe(
      MIN_WINDOW_QR_AMOUNT_PAISE,
    );
    expect(
      computeCompanyCommissionPaise(MIN_WINDOW_QR_AMOUNT_PAISE),
    ).toBe(MIN_WINDOW_COMPANY_COMMISSION_PAISE);
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
    expect(computeOnboardingRewardFromQrPaise(qrBusinessPaise)).toBe(15_000);
    expect(formatINR(companyCommission)).toBe('₹1,500.00');
    expect(formatINR(activationReward)).toBe('₹150.00');
  });

  it('reproduces the ₹50,000 → ₹5,000 → ₹500 onboarding example', () => {
    const companyCommission = computeCompanyCommissionPaise(50_000 * 100);
    const onboardingReward = computeActivationRewardPaise(companyCommission);

    expect(companyCommission).toBe(500_000); // ₹5,000
    expect(onboardingReward).toBe(50_000); // ₹500
    expect(computeOnboardingRewardFromQrPaise(50_000 * 100)).toBe(50_000);
  });

  it('never computes the reward as 10% of the complete QR collection', () => {
    // ₹50,000 collection: WRONG (10% of QR) would be ₹5,000; correct is ₹500.
    const windowQr = 50_000 * 100;
    const wrongDirectQrShare = applyRateBps(windowQr, 1_000);
    const reward = computeOnboardingRewardFromQrPaise(windowQr);

    expect(wrongDirectQrShare).toBe(500_000); // ₹5,000 — the forbidden result
    expect(reward).toBe(50_000); // ₹500 — the correct result
    expect(reward).not.toBe(wrongDirectQrShare);
    expect(reward * 10).toBe(wrongDirectQrShare); // reward = 1% of QR, not 10%
  });

  it('one-time onboarding reward and recurring growth share have separate ledger types', () => {
    const types = Object.values(COMMISSION_EVENT_TYPES);
    expect(new Set(types).size).toBe(types.length); // all distinct
    expect(types.sort()).toEqual([
      'company_commission',
      'onboarding_reward',
      'recurring_growth_share',
    ]);
  });

  it('recurring growth share varies by month; the onboarding reward does not', () => {
    const companyCommission = computeCompanyCommissionPaise(50_000 * 100); // ₹5,000
    // onboarding reward is computed once from the first qualifying window
    const once = computeActivationRewardPaise(companyCommission);
    expect(once).toBe(50_000); // ₹500, one-time
    // recurring share is month-indexed on the same eligible commission
    expect(computeRecurringSharePaise(companyCommission, 1)).toBe(50_000); // 10%
    expect(computeRecurringSharePaise(companyCommission, 12)).toBe(25_000); // 5%
    expect(computeRecurringSharePaise(companyCommission, 24)).toBe(10_000); // 2%
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
