import {
  CANONICAL_TABLE_NAMES,
} from '@/db/canonical';
import { getEnvStatus, LOCKED_SUPABASE_URL, SUPABASE_PROJECT_REF } from '@/env';
import { REWARD_MILESTONES } from '@/lib/constants/rewards';
import {
  COMMISSION_RULES,
  computeActivationRewardPaise,
  computeCompanyCommissionPaise,
  formatINR,
} from '@/lib/constants/commissions';

/**
 * Phase 0 baseline status page — server-rendered, read-only.
 * It proves the env lock, canonical constants and canonical table mapping are
 * wired into the app. No database connection or secret is required to render.
 */
export default function HomePage() {
  const env = getEnvStatus(process.env);

  const exampleQr = 15_000 * 100; // ₹15,000 canonical PRD example
  const exampleCompany = computeCompanyCommissionPaise(exampleQr);
  const exampleActivation = computeActivationRewardPaise(exampleCompany);

  return (
    <main>
      <section className="hero">
        <span className="badge">Phase 0 — Canonical Baseline</span>
        <h1>Nexora Growth Partner Portal</h1>
        <p>
          Next.js App Router + TypeScript + Drizzle ORM on the existing
          canonical Supabase project{' '}
          <span className="mono">{SUPABASE_PROJECT_REF}</span>. This phase
          ships schema mappings, environment lock-in and contract tests only —
          no database migration, no production data mutation.
        </p>
      </section>

      <div className="grid">
        <section className="card">
          <h2>Environment lock</h2>
          <div className="status">
            <p>
              Locked project URL: <br />
              <span className="pass">{LOCKED_SUPABASE_URL}</span>
            </p>
            <p>
              Configured URL matches lock:{' '}
              {env.urlMatchesLock ? (
                <span className="pass">YES</span>
              ) : (
                <span className="warn">NOT CONFIGURED (set NEXT_PUBLIC_SUPABASE_URL)</span>
              )}
            </p>
            <p>
              Anon key present (bool only): {String(env.anonKeyPresent)}
              <br />
              Service-role present (server-only): {String(env.serviceRolePresent)}
              <br />
              DB URL present (server-only): {String(env.dbUrlPresent)}
            </p>
            <p>Secret values are never rendered — presence booleans only.</p>
          </div>
        </section>

        <section className="card">
          <h2>Commission rules (locked)</h2>
          <ul>
            <li>
              Minimum genuine QR business/day:{' '}
              {formatINR(COMMISSION_RULES.minDailyQrAmountPaise)}
            </li>
            <li>
              Qualifying window: {COMMISSION_RULES.consecutiveQualifyingDays}{' '}
              consecutive qualifying days
            </li>
            <li>Company commission: {COMMISSION_RULES.companyCommissionBps / 100}%</li>
            <li>
              One-time activation reward:{' '}
              {COMMISSION_RULES.activationRewardBps / 100}% of company
              commission from the first {COMMISSION_RULES.consecutiveQualifyingDays}{' '}
              qualifying days
            </li>
            <li>
              Recurring share: months 1–6 ={' '}
              {COMMISSION_RULES.recurringMonths16Bps / 100}%, months 7–12 ={' '}
              {COMMISSION_RULES.recurringMonths712Bps / 100}%, after 12 months ={' '}
              {COMMISSION_RULES.recurringAfter12Bps / 100}%
            </li>
            <li>
              Canonical example: ₹15,000 QR → {formatINR(exampleCompany)}{' '}
              company commission → {formatINR(exampleActivation)} activation
              reward
            </li>
          </ul>
        </section>

        <section className="card">
          <h2>Canonical tables mapped ({CANONICAL_TABLE_NAMES.length})</h2>
          <ul className="mono">
            {CANONICAL_TABLE_NAMES.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="card" style={{ marginTop: 16 }}>
        <h2>Milestone reward ladder (final PRD names)</h2>
        <table className="ladder">
          <thead>
            <tr>
              <th>Shops</th>
              <th>Reward</th>
            </tr>
          </thead>
          <tbody>
            {REWARD_MILESTONES.map((milestone) => (
              <tr key={milestone.threshold}>
                <td>{milestone.threshold === 1000 ? '1000+' : milestone.threshold}</td>
                <td>{milestone.label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <footer>
        Phase 0 scope note: the existing Stitch prototype UI at the repository
        root is preserved untouched. No migration has been applied and no
        production data changed. See docs/audits/PHASE_0_LIVE_AUDIT.md.
      </footer>
    </main>
  );
}
