import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowRightIcon, LockIcon, ShieldIcon } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Growth Partner Registration — Phase 2 Launch',
  description:
    'Growth Partner registration opens in Phase 2. Explore the qualification rules, commission structure, and milestone rewards.',
};

export default function PartnerSignupPlaceholderPage() {
  return (
    <div className="section-padding" style={{ display: 'flex', alignItems: 'center', minHeight: 'calc(100vh - 450px)' }}>
      <div className="container" style={{ maxWidth: '680px', textAlign: 'center' }}>
        <div className="glass-card" style={{ padding: '40px 32px' }}>
          <Badge variant="wine" style={{ marginBottom: '16px' }}>
            <LockIcon width={14} height={14} /> Phase 2 Milestone
          </Badge>

          <h1 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 800, color: 'var(--color-wine-dark)', margin: '0 0 12px' }}>
            Growth Partner Onboarding
          </h1>

          <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: '0 0 28px' }}>
            Interactive partner authentication and referral code issuance will open in Phase 2 per the implementation plan. In the meantime, explore the programme economics, qualification criteria, and reward ladder.
          </p>

          <div
            style={{
              padding: '16px 20px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-surface-soft)',
              border: '1px solid var(--color-border)',
              marginBottom: '32px',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
            }}
          >
            <ShieldIcon width={20} height={20} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
              <strong>Early Preparation:</strong> You will need a valid mobile number, Government ID proof (Aadhaar/PAN), and bank account details for direct referral commission payouts.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button href="/" variant="primary">
              Public Programme Dekhein <ArrowRightIcon width={16} height={16} />
            </Button>
            <Button href="/rewards" variant="outline">
              Rewards Ladder Check Karein
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
