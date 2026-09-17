import { ArrowRightIcon } from '../ui/Icons';
import { Button } from '../ui/Button';

const STEPS = [
  {
    step: '01',
    title: 'Partner Registration & Code',
    badge: 'Step 1 · Zero Investment',
    description:
      'Complete free partner registration with basic KYC. Instantly receive your unique immutable referral code and partner dashboard link.',
  },
  {
    step: '02',
    title: 'Onboard Local Salons',
    badge: 'Step 2 · Merchant Setup',
    description:
      'Help salon owners register using your referral code. Salons complete locked KYC, activate Nexora QR, and receive their digital website template handoff.',
  },
  {
    step: '03',
    title: '15-Day Qualification Streak',
    badge: 'Step 3 · Verification',
    description:
      'The salon completes 15 consecutive days with ≥ ₹1,000 genuine QR collection/day (₹15,000 window minimum). Company commission is 10% (min ₹1,500).',
  },
  {
    step: '04',
    title: 'Earn & Unlock Milestones',
    badge: 'Step 4 · Payouts & Claims',
    description:
      'Earn one-time onboarding reward (10% of company commission), ongoing recurring monthly growth share, and progress up the 7-tier physical reward ladder.',
  },
];

export function HowItWorksSteps() {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-surface-soft)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 className="heading-section">Partner Journey: Kaise Kaam Karta Hai?</h2>
          <p className="subheading-section" style={{ margin: '0 auto' }}>
            Four simple, transparent steps from partner registration to physical milestone claims.
          </p>
        </div>

        <div className="grid-4" style={{ marginBottom: '40px' }}>
          {STEPS.map((step) => (
            <div
              key={step.step}
              className="glass-card glass-card-hover"
              style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                padding: '24px 20px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                }}
              >
                <span
                  style={{
                    fontSize: '1.8rem',
                    fontWeight: 900,
                    letterSpacing: '-0.03em',
                    color: 'var(--color-primary)',
                    lineHeight: 1,
                  }}
                >
                  {step.step}
                </span>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--color-primary-light)',
                    color: 'var(--color-primary)',
                  }}
                >
                  {step.badge}
                </span>
              </div>

              <h3
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  margin: '0 0 10px',
                  color: 'var(--color-wine-dark)',
                  lineHeight: 1.3,
                }}
              >
                {step.title}
              </h3>

              <p
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.6,
                  margin: 0,
                  marginTop: 'auto',
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Button href="/how-it-works" variant="outline">
            Full Journey Guide Dekhein <ArrowRightIcon width={16} height={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}
