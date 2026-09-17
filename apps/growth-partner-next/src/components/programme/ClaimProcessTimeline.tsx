import { Badge } from '../ui/Badge';
import { AwardIcon, CheckIcon, ShieldIcon, UsersIcon } from '../ui/Icons';

const TIMELINE_STEPS = [
  {
    status: 'locked → eligible',
    title: '1. Threshold Crossed',
    icon: <UsersIcon />,
    description:
      'Cumulative count of fraud-cleared, KYC-verified shops reaches the milestone target (25, 50, 100, 250, 500, 750, 1000+). The milestone status automatically updates to Eligible.',
  },
  {
    status: 'eligible → claimed',
    title: '2. Claim Submitted',
    icon: <AwardIcon />,
    description:
      'Partner submits the claim in the portal, verifying physical delivery address, PAN/Aadhaar details, and recipient identification.',
  },
  {
    status: 'claimed → review',
    title: '3. Compliance Audit',
    icon: <ShieldIcon />,
    description:
      'Nexora operations and fraud prevention team audits every underlying salon transaction to verify genuineness, merchant settlement, and absence of circular swiping.',
  },
  {
    status: 'review → fulfilled',
    title: '4. Physical Fulfillment',
    icon: <CheckIcon />,
    description:
      'Upon formal written approval, the branded reward is procured directly through authorized channels and delivered with warranty documentation. Cash conversion is strictly prohibited.',
  },
];

export function ClaimProcessTimeline() {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Badge variant="wine">Standard Operating Procedure</Badge>
          <h2 className="heading-section">Milestone Claim & Fulfillment Lifecycle</h2>
          <p className="subheading-section" style={{ margin: '0 auto' }}>
            A transparent 4-stage audit workflow ensuring legitimate claims are honored with genuine physical rewards.
          </p>
        </div>

        <div className="grid-4" style={{ marginBottom: '32px' }}>
          {TIMELINE_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                padding: '24px 20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--color-primary-light)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {step.icon}
                </div>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--color-surface-soft)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-wine)',
                  }}
                >
                  {step.status}
                </span>
              </div>

              <h3 style={{ margin: '0 0 10px', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-wine-dark)' }}>
                {step.title}
              </h3>

              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
