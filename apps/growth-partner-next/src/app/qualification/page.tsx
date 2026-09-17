import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { QualificationCard } from '@/components/programme/QualificationCard';
import { FraudWarnings } from '@/components/programme/FraudWarnings';
import {
  CheckIcon,
  CloseIcon,
  ShieldIcon,
  CalendarIcon,
  AlertCircleIcon,
} from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Shop Qualification Rules & Streak Criteria',
  description:
    'Comprehensive qualification rules: ₹1,000/day genuine QR collection, 15 consecutive qualifying days, 10% company commission, and mandatory compliance gates.',
};

export default function QualificationPage() {
  return (
    <div>
      {/* Page Header */}
      <section
        style={{
          paddingTop: '64px',
          paddingBottom: '56px',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(253, 164, 201, 0.22) 0%, rgba(250, 245, 248, 0) 70%)',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <Badge variant="magenta" style={{ marginBottom: '16px' }}>
            Verification Standard
          </Badge>
          <h1 className="heading-hero" style={{ maxWidth: '840px', margin: '0 auto 16px' }}>
            Shop Qualification Rules
          </h1>
          <p className="subheading-section" style={{ margin: '0 auto' }}>
            How a newly referred salon achieves verified qualifying status. Strict 15-day streak tracking ensures merchant legitimacy and sustainable partner earnings.
          </p>
        </div>
      </section>

      {/* Core Qualification Rules */}
      <QualificationCard />

      {/* Streak Mechanics Deep Dive */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="heading-section">15-Day Consecutive Streak Simulation</h2>
            <p className="subheading-section" style={{ margin: '0 auto' }}>
              Understanding how daily qualification scoring works across business days.
            </p>
          </div>

          <div className="data-table-wrapper" style={{ marginBottom: '32px' }}>
            <table className="data-table" aria-label="15-Day Streak Simulation Table">
              <thead>
                <tr>
                  <th scope="col">Day</th>
                  <th scope="col">QR Collection</th>
                  <th scope="col">Genuineness Check</th>
                  <th scope="col">Day Status</th>
                  <th scope="col">Consecutive Streak</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Day 1</td>
                  <td>₹1,200</td>
                  <td><span style={{ color: 'var(--color-success)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}><CheckIcon width={14} height={14} /> Passed</span></td>
                  <td><span className="badge badge-success">Qualifies</span></td>
                  <td style={{ fontWeight: 700 }}>1 / 15</td>
                </tr>
                <tr>
                  <td>Day 2</td>
                  <td>₹1,850</td>
                  <td><span style={{ color: 'var(--color-success)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}><CheckIcon width={14} height={14} /> Passed</span></td>
                  <td><span className="badge badge-success">Qualifies</span></td>
                  <td style={{ fontWeight: 700 }}>2 / 15</td>
                </tr>
                <tr>
                  <td>Day 3</td>
                  <td>₹1,000</td>
                  <td><span style={{ color: 'var(--color-success)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}><CheckIcon width={14} height={14} /> Passed</span></td>
                  <td><span className="badge badge-success">Qualifies</span></td>
                  <td style={{ fontWeight: 700 }}>3 / 15</td>
                </tr>
                <tr style={{ backgroundColor: '#fff1f2' }}>
                  <td>Day 4 (Scenario A: Under ₹1,000)</td>
                  <td>₹850</td>
                  <td><span style={{ color: 'var(--color-danger)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}><CloseIcon width={14} height={14} /> Under Floor</span></td>
                  <td><span className="badge badge-danger">Fails Floor</span></td>
                  <td style={{ fontWeight: 700, color: 'var(--color-danger)' }}>0 / 15 (Streak Resets)</td>
                </tr>
                <tr>
                  <td>Day 5 (New Streak Begins)</td>
                  <td>₹1,400</td>
                  <td><span style={{ color: 'var(--color-success)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}><CheckIcon width={14} height={14} /> Passed</span></td>
                  <td><span className="badge badge-success">Qualifies</span></td>
                  <td style={{ fontWeight: 700 }}>1 / 15</td>
                </tr>
                <tr>
                  <td>Days 6 – 19</td>
                  <td>≥ ₹1,000 / day</td>
                  <td><span style={{ color: 'var(--color-success)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}><CheckIcon width={14} height={14} /> 15 Consecutive Days Passed</span></td>
                  <td><span className="badge badge-success">15-Day Window Complete</span></td>
                  <td style={{ fontWeight: 800, color: 'var(--color-success)' }}>15 / 15 (QUALIFIED)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            style={{
              padding: '20px 24px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-lavender-soft)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px',
            }}
          >
            <span style={{ color: 'var(--color-wine)', marginTop: '2px' }}>
              <CalendarIcon width={22} height={22} />
            </span>
            <div>
              <h3 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 800, color: 'var(--color-wine-dark)' }}>
                Streak Integrity Principle
              </h3>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                The 15 days must be strictly consecutive. If a salon has low footfall on one day or a circular transaction is detected, that day does not count and resets the streak. This ensures only genuinely active, ongoing salon businesses are approved into the programme.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fraud & Excluded Transactions */}
      <FraudWarnings />
    </div>
  );
}
