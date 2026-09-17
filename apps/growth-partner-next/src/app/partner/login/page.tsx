import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowRightIcon, LockIcon, SmartphoneIcon } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Partner Portal Login — Phase 2 Launch',
  description:
    'Growth Partner portal login launches in Phase 2. Track referred salons, view commission ledgers, and manage milestone claims.',
};

export default function PartnerLoginPlaceholderPage() {
  return (
    <div className="section-padding" style={{ display: 'flex', alignItems: 'center', minHeight: 'calc(100vh - 450px)' }}>
      <div className="container" style={{ maxWidth: '680px', textAlign: 'center' }}>
        <div className="glass-card" style={{ padding: '40px 32px' }}>
          <Badge variant="wine" style={{ marginBottom: '16px' }}>
            <LockIcon width={14} height={14} /> Phase 2 Milestone
          </Badge>

          <h1 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 800, color: 'var(--color-wine-dark)', margin: '0 0 12px' }}>
            Partner Portal Login
          </h1>

          <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: '0 0 28px' }}>
            Supabase authentication and partner dashboard access are launching in Phase 2. Once live, you will be able to log in to view real-time salon streaks, commission ledgers, and claim status.
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
            <SmartphoneIcon width={20} height={20} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
              <strong>Zero Dead Links:</strong> The Nexora platform strictly maintains working routes across all lifecycle phases. Check back once Phase 2 launches.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button href="/" variant="primary">
              Home Page Par Jayein <ArrowRightIcon width={16} height={16} />
            </Button>
            <Button href="/commission" variant="outline">
              Commission Calculator Dekhein
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
