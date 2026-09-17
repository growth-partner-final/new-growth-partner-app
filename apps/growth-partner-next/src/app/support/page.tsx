import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SupportSection } from '@/components/programme/SupportSection';
import { PhoneIcon, ShieldIcon, HelpCircleIcon, CheckIcon } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Partner Support Desk & Help Center',
  description:
    'Dedicated support desk for Nexora Growth Partners: get help with merchant onboarding, streak dispute reviews, milestone claim tracking, and technical inquiries.',
};

export default function SupportPage() {
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
            Direct Partner Desk
          </Badge>
          <h1 className="heading-hero" style={{ maxWidth: '820px', margin: '0 auto 16px' }}>
            Partner Support & Assistance
          </h1>
          <p className="subheading-section" style={{ margin: '0 auto' }}>
            Need help resolving a salon streak query, verifying bank details, or tracking your milestone claim? Our partner operations desk is standing by.
          </p>
        </div>
      </section>

      {/* Support Section Component */}
      <SupportSection />

      {/* Escalation Guidelines */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="heading-section">Escalation Resolution Times</h2>
            <p className="subheading-section" style={{ margin: '0 auto' }}>
              We hold our partner operations to strict service level agreements (SLAs).
            </p>
          </div>

          <div className="grid-3">
            <div className="glass-card">
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                Query Type 1
              </span>
              <h3 style={{ margin: '6px 0 8px', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-wine-dark)' }}>
                Streak & Qualification
              </h3>
              <p style={{ margin: '0 0 12px', fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                Questions regarding daily volume scoring, streak reset reviews, or merchant transaction audits.
              </p>
              <div style={{ marginTop: 'auto', fontWeight: 700, color: 'var(--color-success)', fontSize: '0.85rem' }}>
                Resolution: 24 Business Hours
              </div>
            </div>

            <div className="glass-card">
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-wine)', textTransform: 'uppercase' }}>
                Query Type 2
              </span>
              <h3 style={{ margin: '6px 0 8px', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-wine-dark)' }}>
                Milestone Claim Review
              </h3>
              <p style={{ margin: '0 0 12px', fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                PAN verification, physical delivery address updates, and reward dispatch tracking.
              </p>
              <div style={{ marginTop: 'auto', fontWeight: 700, color: 'var(--color-success)', fontSize: '0.85rem' }}>
                Resolution: 48 Business Hours
              </div>
            </div>

            <div className="glass-card">
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                Query Type 3
              </span>
              <h3 style={{ margin: '6px 0 8px', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-wine-dark)' }}>
                QR & Merchant Tech
              </h3>
              <p style={{ margin: '0 0 12px', fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                QR standee delivery, expiring website template handoff links, and merchant payout bank setup.
              </p>
              <div style={{ marginTop: 'auto', fontWeight: 700, color: 'var(--color-success)', fontSize: '0.85rem' }}>
                Resolution: Same Day
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
