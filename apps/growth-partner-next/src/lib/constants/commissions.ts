/**
 * Canonical commission rules — Phase 0.
 *
 * Locked by docs/prd/06_RULES.md (do not change without a PRD revision):
 *
 *   - A day qualifies only with >= ₹1,000 of GENUINE QR business
 *     (refunds, reversals, self-funding, circular and artificial
 *     transactions are excluded).
 *   - Qualification window: 15 CONSECUTIVE qualifying days.
 *   - Company commission: 10% of QR business → minimum ₹100/day,
 *     minimum ₹15,000 QR and ₹1,500 commission over the window.
 *   - One-time onboarding reward (separate from recurring commission):
 *     10% of the COMPANY COMMISSION earned during the first qualifying
 *     15 days. It must NEVER be computed as 10% of the QR collection.
 *     Examples: ₹15,000 → ₹1,500 → ₹150 · ₹50,000 → ₹5,000 → ₹500.
 *   - Recurring growth share (documented separately): months 1–6 = 10%,
 *     months 7–12 = 5%, after 12 months = 2% (lifetime) of the eligible
 *     company commission, not of total QR business.
 *
 * Conventions: money is integer paise; rates are integer basis points
 * (10% = 1000). Math uses integer-rounded basis-point multiplication.
 */

/** ₹1,000 expressed in paise — minimum genuine QR business per day. */
export const MIN_DAILY_QR_AMOUNT_PAISE = 100_000 as const;

/** Consecutive qualifying days required for activation. */
export const CONSECUTIVE_QUALIFYING_DAYS = 15 as const;

/** Company commission on QR business: 10% = 1000 bps. */
export const COMPANY_COMMISSION_BPS = 1_000 as const;

/** One-time onboarding reward: 10% = 1000 bps of the company commission. */
export const ACTIVATION_REWARD_BPS = 1_000 as const;

/** ₹100 in paise — minimum daily company commission (10% of ₹1,000). */
export const MIN_DAILY_COMPANY_COMMISSION_PAISE = 10_000 as const;

/** ₹15,000 in paise — minimum 15-day qualifying QR collection. */
export const MIN_WINDOW_QR_AMOUNT_PAISE = 1_500_000 as const;

/** ₹1,500 in paise — minimum 15-day company commission. */
export const MIN_WINDOW_COMPANY_COMMISSION_PAISE = 150_000 as const;

/** Recurring share windows (bps of eligible company commission). */
export const RECURRING_SHARE_MONTHS_1_6_BPS = 1_000 as const; // 10%
export const RECURRING_SHARE_MONTHS_7_12_BPS = 500 as const; // 5%
export const RECURRING_SHARE_AFTER_12_BPS = 200 as const; // 2% lifetime

/**
 * Commission event ledger types. The one-time onboarding reward and the
 * recurring growth share are SEPARATE ledger entries — never merged.
 */
export const COMMISSION_EVENT_TYPES = {
  COMPANY_COMMISSION: 'company_commission',
  ONBOARDING_REWARD: 'onboarding_reward',
  RECURRING_GROWTH_SHARE: 'recurring_growth_share',
} as const;

export type CommissionEventType =
  (typeof COMMISSION_EVENT_TYPES)[keyof typeof COMMISSION_EVENT_TYPES];

/** Flat rule bundle for display surfaces. */
export const COMMISSION_RULES = {
  minDailyQrAmountPaise: MIN_DAILY_QR_AMOUNT_PAISE,
  consecutiveQualifyingDays: CONSECUTIVE_QUALIFYING_DAYS,
  companyCommissionBps: COMPANY_COMMISSION_BPS,
  activationRewardBps: ACTIVATION_REWARD_BPS,
  minDailyCompanyCommissionPaise: MIN_DAILY_COMPANY_COMMISSION_PAISE,
  minWindowQrAmountPaise: MIN_WINDOW_QR_AMOUNT_PAISE,
  minWindowCompanyCommissionPaise: MIN_WINDOW_COMPANY_COMMISSION_PAISE,
  recurringMonths16Bps: RECURRING_SHARE_MONTHS_1_6_BPS,
  recurringMonths712Bps: RECURRING_SHARE_MONTHS_7_12_BPS,
  recurringAfter12Bps: RECURRING_SHARE_AFTER_12_BPS,
} as const;

/** Integer-exact rate application (paise * bps / 10_000). */
export function applyRateBps(amountPaise: number, bps: number): number {
  if (!Number.isInteger(amountPaise))
    throw new TypeError('amountPaise must be integer paise');
  if (!Number.isInteger(bps)) throw new TypeError('bps must be an integer');
  return Math.round((amountPaise * bps) / 10_000);
}

/** A day qualifies only with genuine business >= ₹1,000. */
export function dayQualifies(qrAmountPaise: number, isGenuine: boolean): boolean {
  return isGenuine && qrAmountPaise >= MIN_DAILY_QR_AMOUNT_PAISE;
}

/** Company commission (paise) for a QR business amount (paise). */
export function computeCompanyCommissionPaise(qrBusinessPaise: number): number {
  return applyRateBps(qrBusinessPaise, COMPANY_COMMISSION_BPS);
}

/**
 * One-time onboarding reward (paise) given the company commission (paise)
 * accumulated over the first 15 consecutive qualifying days.
 * Input is COMPANY COMMISSION — never QR business directly.
 */
export function computeActivationRewardPaise(
  companyCommissionFromQualifyingWindowPaise: number,
): number {
  return applyRateBps(
    companyCommissionFromQualifyingWindowPaise,
    ACTIVATION_REWARD_BPS,
  );
}

/**
 * One-time onboarding reward (paise) for a window QR collection (paise).
 * Composed on purpose: company commission first, then 10% of it — so the
 * reward can never silently become "10% of the QR collection".
 */
export function computeOnboardingRewardFromQrPaise(
  windowQrCollectionPaise: number,
): number {
  return computeActivationRewardPaise(
    computeCompanyCommissionPaise(windowQrCollectionPaise),
  );
}

/**
 * Recurring growth share rate (bps of eligible company commission) for a
 * 1-based month index: months 1–6 → 10%, months 7–12 → 5%, month 13+ → 2%.
 */
export function recurringShareRateBps(monthIndex: number): number {
  if (!Number.isInteger(monthIndex) || monthIndex < 1) {
    throw new RangeError('monthIndex must be an integer >= 1');
  }
  if (monthIndex <= 6) return RECURRING_SHARE_MONTHS_1_6_BPS;
  if (monthIndex <= 12) return RECURRING_SHARE_MONTHS_7_12_BPS;
  return RECURRING_SHARE_AFTER_12_BPS;
}

/** Recurring growth share (paise) for a company commission in a given month. */
export function computeRecurringSharePaise(
  companyCommissionPaise: number,
  monthIndex: number,
): number {
  return applyRateBps(companyCommissionPaise, recurringShareRateBps(monthIndex));
}

/** paise → localized INR string, e.g. 150_000 → "₹1,500.00". */
export function formatINR(paise: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(paise / 100);
}
