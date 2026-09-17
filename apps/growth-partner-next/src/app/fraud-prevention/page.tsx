import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { FraudWarnings } from '@/components/programme/FraudWarnings';
import { ShieldIcon, AlertCircleIcon, LockIcon, CheckIcon } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Fraud Prevention Policy & Compliance Standards',
  description:
    'Comprehensive fraud prevention guidelines: excluded transaction types, streak invalidation rules, automated audit protocols, and partner compliance.',
};

export default function FraudPreventionPage() {
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
          <Badge variant="danger" style={{ marginBottom: '16px' }}>
            Zero-Tolerance Compliance
          </Badge>
          <h1 className="heading-hero" style={{ maxWidth: '860px', margin: '0 auto 16px' }}>
            Fraud Prevention & Compliance Policy
          </h1>
          <p className="subheading-section" style={{ margin: '0 auto' }}>
            Nexora protects honest partners, legitimate salons, and merchant integrity through rigorous automated settlement audits.
          </p>
        </div>
      </section>

      {/* Core Fraud Warnings Component */}
      <FraudWarnings />

      {/* Automated Detection Mechanisms */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <h2 className="heading-section">How Nexora Detects Fraud</h2>
            <p className="subheading-section" style={{ margin: '0 auto' }}>
              Multi-layered automated checks verify every transaction before qualification scoring occurs.
            </p>
          </div>

          <div className="grid-3" style={{ marginBottom: '40px' }}>
            <div className="glass-card">
              <div style={{ color: 'var(--color-primary)', marginBottom: '12px' }}><ShieldIcon width={24} height={24} /></div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 8px', color: 'var(--color-wine-dark)' }}>
                VPA & Device Fingerprinting
              </h3>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Identifies payer VPAs matching the partner, salon owner, or associated staff to flag self-swiping patterns immediately.
              </p>
            </div>

            <div className="glass-card">
              <div style={{ color: 'var(--color-primary)', marginBottom: '12px' }}><AlertCircleIcon width={24} height={24} /></div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 8px', color: 'var(--color-wine-dark)' }}>
                Velocity & Anomaly Scoring
              </h3>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Scans for unnatural spikes such as identical amounts repeatedly swiped within minutes or late-night artificial bursts.
              </p>
            </div>

            <div className="glass-card">
              <div style={{ color: 'var(--color-primary)', marginBottom: '12px' }}><LockIcon width={24} height={24} /></div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 8px', color: 'var(--color-wine-dark)' }}>
                Settlement Reconciliation
              </h3>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Matches incoming QR transactions with final bank settlements and chargeback reports to exclude clawed-back volumes.
              </p>
            </div>
          </div>

          {/* Investigation & Appeals */}
          <div className="soft-card" style={{ padding: '28px' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-wine-dark)' }}>
              Audit & Appeals Process
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              If a shop&apos;s streak is paused or disqualified due to an algorithmic flag, the partner or shop owner may submit service bills and customer payment confirmations via the Partner Desk. Nexora ops undertakes a manual review within 48 business hours.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-wine)', fontWeight: 600, fontSize: '0.88rem' }}>
              <CheckIcon width={16} height={16} />
              <span>Genuine partners with legitimate merchant footfall are always fully protected and rewarded.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
