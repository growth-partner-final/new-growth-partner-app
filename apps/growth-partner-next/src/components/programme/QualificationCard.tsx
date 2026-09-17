import { AlertCircleIcon, CheckIcon, ShieldIcon } from '../ui/Icons';
import { Badge } from '../ui/Badge';
import {
  MIN_DAILY_QR_AMOUNT_PAISE,
  MIN_DAILY_COMPANY_COMMISSION_PAISE,
  MIN_WINDOW_QR_AMOUNT_PAISE,
  MIN_WINDOW_COMPANY_COMMISSION_PAISE,
  CONSECUTIVE_QUALIFYING_DAYS,
  COMPANY_COMMISSION_BPS,
  formatINR,
} from '@/lib/constants/commissions';

export function QualificationCard() {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <Badge variant="magenta" className="mb-2">
            Locked Commercial Rule
          </Badge>
          <h2 className="heading-section">Shop Qualification Criteria</h2>
          <p className="subheading-section" style={{ margin: '0 auto' }}>
            A shop must satisfy all strict qualification parameters before counting toward partner onboarding rewards and milestone progress.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
            marginBottom: '32px',
          }}
        >
          {/* Pillar 1: Daily QR Minimum */}
          <div className="glass-card" style={{ borderLeft: '4px solid var(--color-primary)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
              Daily Minimum
            </span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-wine-dark)', margin: '6px 0' }}>
              {formatINR(MIN_DAILY_QR_AMOUNT_PAISE)}
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
              Minimum genuine QR payments collected per business day. Excludes refunds and reversals.
            </p>
          </div>

          {/* Pillar 2: Company Commission Floor */}
          <div className="glass-card" style={{ borderLeft: '4px solid var(--color-wine)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-wine)', textTransform: 'uppercase' }}>
              Company Commission ({COMPANY_COMMISSION_BPS / 100}%)
            </span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-wine-dark)', margin: '6px 0' }}>
              {formatINR(MIN_DAILY_COMPANY_COMMISSION_PAISE)}/day
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
              10% company commission floor. (Note: ₹100 is the company&apos;s daily commission, not salon revenue).
            </p>
          </div>

          {/* Pillar 3: Consecutive Streak */}
          <div className="glass-card" style={{ borderLeft: '4px solid #15803d' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#15803d', textTransform: 'uppercase' }}>
              Streak Window
            </span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-wine-dark)', margin: '6px 0' }}>
              {CONSECUTIVE_QUALIFYING_DAYS} Days
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
              15 strictly consecutive qualifying days. An excluded day breaks the streak and resets the window.
            </p>
          </div>

          {/* Pillar 4: Window Totals */}
          <div className="glass-card" style={{ borderLeft: '4px solid #0369a1' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase' }}>
              Window Minimum
            </span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-wine-dark)', margin: '6px 0' }}>
              {formatINR(MIN_WINDOW_QR_AMOUNT_PAISE)}
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
              Minimum cumulative 15-day collection; yields {formatINR(MIN_WINDOW_COMPANY_COMMISSION_PAISE)} company commission.
            </p>
          </div>
        </div>

        {/* 4 Compliance Gates */}
        <div
          className="soft-card"
          style={{
            backgroundColor: 'var(--color-lavender-soft)',
            border: '1px solid var(--color-border)',
            padding: '28px',
            marginBottom: '32px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ color: 'var(--color-primary)', display: 'flex' }}>
              <ShieldIcon width={24} height={24} />
            </span>
            <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-wine-dark)' }}>
              4 Mandatory Gates Before A Shop Counts
            </h3>
          </div>

          <p style={{ margin: '0 0 20px', fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>
            Every referred shop must satisfy all four gates in sequence. Zero rewards or milestone credit are unlocked without full verification:
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '14px',
            }}
          >
            {[
              { title: 'Gate 1: KYC Verification', desc: 'Shop owner identity, PAN/Aadhaar & business address verified.' },
              { title: 'Gate 2: QR Activation', desc: 'Physical or digital Nexora QR verified active on salon premises.' },
              { title: 'Gate 3: Settlement Clearance', desc: 'Daily payments successfully settled to merchant bank account.' },
              { title: 'Gate 4: Fraud Audit', desc: 'Automated scan clears circular UPI, self-swiping, and artificial patterns.' },
            ].map((gate, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-success)', fontWeight: 700, fontSize: '0.9rem' }}>
                  <CheckIcon width={16} height={16} />
                  <span>{gate.title}</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                  {gate.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Warning Callout on Streak Breaks */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px',
            backgroundColor: 'var(--color-warning-bg)',
            border: '1px solid var(--color-warning-border)',
            borderRadius: 'var(--radius-md)',
            padding: '18px 20px',
          }}
        >
          <span style={{ color: 'var(--color-warning)', flexShrink: 0, marginTop: '2px' }}>
            <AlertCircleIcon width={22} height={22} />
          </span>
          <div>
            <h4 style={{ margin: '0 0 4px', fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-warning)' }}>
              Consecutive Streak Rule
            </h4>
            <p style={{ margin: 0, fontSize: '0.86rem', color: '#78350f', lineHeight: 1.55 }}>
              The 15 days must be strictly consecutive. If a salon collects ₹999 on Day 12 or has an artificial transaction, Day 12 does not qualify, and the streak resets to 0. Only genuine salon customer payments count.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
