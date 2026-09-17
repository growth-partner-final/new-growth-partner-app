import { Badge } from '../ui/Badge';
import { CalendarIcon, TrendingUpIcon, SparklesIcon, CheckIcon } from '../ui/Icons';
import {
  RECURRING_SHARE_MONTHS_1_6_BPS,
  RECURRING_SHARE_MONTHS_7_12_BPS,
  RECURRING_SHARE_AFTER_12_BPS,
} from '@/lib/constants/commissions';

export function EarningsComparison() {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Badge variant="wine">Strict Ledger Separation</Badge>
          <h2 className="heading-section">One-Time Reward vs Recurring Growth Share</h2>
          <p className="subheading-section" style={{ margin: '0 auto' }}>
            Nexora separates activation rewards from ongoing monthly shares. Each stream has distinct rules, timelines, and accounting.
          </p>
        </div>

        {/* 2-Column Comparison Cards */}
        <div className="grid-2" style={{ marginBottom: '40px' }}>
          {/* Card 1: One-Time Onboarding Reward */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', borderColor: 'var(--color-primary-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <SparklesIcon />
              </span>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary)' }}>
                  Stream 1 · Activation
                </span>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-wine-dark)' }}>
                  One-Time Onboarding Reward
                </h3>
              </div>
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
              A lump-sum activation bonus earned when a newly onboarded salon successfully completes its first 15-day qualifying streak.
            </p>

            <div style={{ padding: '16px', backgroundColor: 'var(--color-surface-soft)', borderRadius: 'var(--radius-md)', marginBottom: '20px' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                Share Rate & Basis
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                10% of Company Commission
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                Calculated on the first 15 consecutive qualifying days only.
              </div>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: 'var(--color-success)', marginTop: '2px' }}><CheckIcon width={16} height={16} /></span>
                <span><strong>Trigger:</strong> Completion of 15 consecutive qualifying days (≥ ₹1,000/day).</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: 'var(--color-success)', marginTop: '2px' }}><CheckIcon width={16} height={16} /></span>
                <span><strong>Cap:</strong> No maximum limit; scales with shop volume.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: 'var(--color-success)', marginTop: '2px' }}><CheckIcon width={16} height={16} /></span>
                <span><strong>Ledger Row:</strong> Distinct <code>onboarding_reward</code> event type.</span>
              </li>
            </ul>

            <div style={{ marginTop: 'auto', padding: '12px 16px', borderRadius: 'var(--radius-md)', backgroundColor: '#fdf2f8', border: '1px solid #fbcfe8', fontSize: '0.85rem', color: '#9d174d' }}>
              Canonical: ₹15,000 QR → ₹1,500 Company Comm → <strong>₹150 Partner Reward</strong>
            </div>
          </div>

          {/* Card 2: Recurring Growth Share */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', borderColor: 'var(--color-wine)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(84, 18, 59, 0.1)',
                  color: 'var(--color-wine)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TrendingUpIcon />
              </span>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-wine)' }}>
                  Stream 2 · Long-Term
                </span>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-wine-dark)' }}>
                  Recurring Growth Share
                </h3>
              </div>
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
              Ongoing monthly brokerage share paid on eligible company commission generated by your active attributed salons.
            </p>

            {/* Schedule Table */}
            <div style={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', overflow: 'hidden', marginBottom: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', backgroundColor: 'var(--color-lavender-soft)', padding: '10px 14px', fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', color: 'var(--color-wine-dark)' }}>
                <span>Tenure Window</span>
                <span style={{ textAlign: 'right' }}>Share of Company Comm</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '10px 14px', borderTop: '1px solid var(--color-border)', fontSize: '0.9rem', backgroundColor: '#ffffff' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CalendarIcon width={14} height={14} /> Months 1 – 6
                </span>
                <span style={{ textAlign: 'right', fontWeight: 700, color: 'var(--color-primary)' }}>
                  {RECURRING_SHARE_MONTHS_1_6_BPS / 100}%
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '10px 14px', borderTop: '1px solid var(--color-border)', fontSize: '0.9rem', backgroundColor: 'var(--color-surface-soft)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CalendarIcon width={14} height={14} /> Months 7 – 12
                </span>
                <span style={{ textAlign: 'right', fontWeight: 700, color: 'var(--color-wine)' }}>
                  {RECURRING_SHARE_MONTHS_7_12_BPS / 100}%
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '10px 14px', borderTop: '1px solid var(--color-border)', fontSize: '0.9rem', backgroundColor: '#ffffff' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CalendarIcon width={14} height={14} /> After 12 Months
                </span>
                <span style={{ textAlign: 'right', fontWeight: 800, color: '#15803d' }}>
                  {RECURRING_SHARE_AFTER_12_BPS / 100}% (Lifetime)
                </span>
              </div>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: 'var(--color-success)', marginTop: '2px' }}><CheckIcon width={16} height={16} /></span>
                <span><strong>Applied to:</strong> Eligible company commission, not total QR collections.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: 'var(--color-success)', marginTop: '2px' }}><CheckIcon width={16} height={16} /></span>
                <span><strong>Cadence:</strong> Monthly settlement cycle based on verified payment volume.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: 'var(--color-success)', marginTop: '2px' }}><CheckIcon width={16} height={16} /></span>
                <span><strong>Ledger Row:</strong> Distinct <code>recurring_growth_share</code> event type.</span>
              </li>
            </ul>

            <div style={{ marginTop: 'auto', padding: '12px 16px', borderRadius: 'var(--radius-md)', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', fontSize: '0.85rem', color: '#166534' }}>
              Lifetime growth share continues beyond Year 1 at 2% for active qualifying salons.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
