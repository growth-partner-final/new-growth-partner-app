import { Button } from '../ui/Button';
import { PhoneIcon, HelpCircleIcon, ShieldIcon, ArrowRightIcon } from '../ui/Icons';
import { Badge } from '../ui/Badge';

export function SupportSection() {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-surface-soft)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <Badge variant="magenta">Dedicated Assistance</Badge>
          <h2 className="heading-section">Partner Support & Help Desk</h2>
          <p className="subheading-section" style={{ margin: '0 auto' }}>
            Have questions about salon onboarding, streak verification, or milestone claims? Our partner desk is here to help.
          </p>
        </div>

        <div className="grid-3" style={{ maxWidth: '1000px', margin: '0 auto 36px' }}>
          {/* Card 1: Partner Desk Hours */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}
            >
              <PhoneIcon width={20} height={20} />
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-wine-dark)' }}>
              Partner Helpline & Hours
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              Direct assistance for registration, merchant QR activation, and handoff links.
            </p>
            <div style={{ marginTop: 'auto', padding: '12px', backgroundColor: 'var(--color-surface-soft)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem' }}>
              <strong>Hours:</strong> Mon – Sat: 9:00 AM – 7:00 PM IST
            </div>
          </div>

          {/* Card 2: Ops & Claim Verification */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: 'rgba(84, 18, 59, 0.1)',
                color: 'var(--color-wine)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}
            >
              <ShieldIcon width={20} height={20} />
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-wine-dark)' }}>
              Streak & Claim Review
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              Encountered a streak dispute or submitted a milestone claim? Check status with our compliance team.
            </p>
            <div style={{ marginTop: 'auto', padding: '12px', backgroundColor: 'var(--color-surface-soft)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem' }}>
              <strong>Turnaround:</strong> 24–48 Business Hours
            </div>
          </div>

          {/* Card 3: Self-Service FAQ */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: 'var(--color-success-bg)',
                color: 'var(--color-success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}
            >
              <HelpCircleIcon width={20} height={20} />
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-wine-dark)' }}>
              Knowledge Base
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              Instant answers on qualification rules, commission calculations, and anti-fraud policies.
            </p>
            <div style={{ marginTop: 'auto' }}>
              <Button href="/faq" variant="outline" size="sm" style={{ width: '100%' }}>
                Browse FAQ <ArrowRightIcon width={14} height={14} />
              </Button>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Button href="/support" variant="primary">
            Visit Partner Support Center <ArrowRightIcon width={16} height={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}
