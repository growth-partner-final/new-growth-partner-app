/**
 * Canonical reward ladder — Phase 0.
 *
 * The milestone NAMES and thresholds are locked by the PRD. They are kept
 * here as the single source of truth so UI, seed data (later phase) and the
 * contract tests can never drift apart. Do not reword, reorder or re-tier.
 */

export interface RewardMilestone {
  /** Number of onboarded shops needed to unlock the reward. */
  readonly threshold: number;
  /** Exact PRD label — verbatim, do not edit. */
  readonly label: string;
}

export const REWARD_MILESTONES: readonly RewardMilestone[] = [
  { threshold: 25, label: '25 Shops — Official Nexora T-Shirt' },
  { threshold: 50, label: '50 Shops — Samsung Tablet' },
  { threshold: 100, label: '100 Shops — Branded HP Laptop' },
  { threshold: 250, label: '250 Shops — Electric Scooter' },
  { threshold: 500, label: '500 Shops — Latest iPhone' },
  { threshold: 750, label: '750 Shops — Royal Enfield 350 CC' },
  { threshold: 1000, label: '1000+ Shops — District Partner SUV Car' },
] as const;

export const REWARD_MILESTONE_LABELS: readonly string[] =
  REWARD_MILESTONES.map((m) => m.label);

/** Highest milestone unlocked at a given (qualified, onboarded) shop count. */
export function unlockedMilestone(
  shopCount: number,
): RewardMilestone | undefined {
  let unlocked: RewardMilestone | undefined;
  for (const milestone of REWARD_MILESTONES) {
    if (shopCount >= milestone.threshold) unlocked = milestone;
  }
  return unlocked;
}
