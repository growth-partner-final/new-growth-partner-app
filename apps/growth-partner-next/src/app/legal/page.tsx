import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { LegalNotice } from '@/components/programme/LegalNotice';
import { ShieldIcon, LockIcon } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Legal Terms & Verification Disclosures',
  description:
    'Official partner terms, independent facilitator agreement, non-cash reward disclosures, verification policies, and statutory compliance standards.',
};

export default function LegalPage() {
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
          <Badge variant="wine" style={{ marginBottom: '16px' }}>
            Statutory & Programme Rules
          </Badge>
          <h1 className="heading-hero" style={{ maxWidth: '820px', margin: '0 auto 16px' }}>
            Legal Terms & Disclosures
          </h1>
          <p className="subheading-section" style={{ margin: '0 auto' }}>
            Binding commercial guidelines, verification conditions, and independent contractor terms governing the Nexora Growth Partner Programme.
          </p>
        </div>
      </section>

      {/* Core Legal Card */}
      <LegalNotice />

      {/* Comprehensive Legal Clauses */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-surface-soft)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* Clause 1 */}
            <div className="glass-card">
              <h3 style={{ margin: '0 0 10px', fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-wine-dark)' }}>
                1. Independent Facilitator Status
              </h3>
              <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
                Participation as a Growth Partner is strictly on an independent principal-to-principal contractor basis. You are not an employee, agent, franchisee, or legal representative of Nexora. You have no authority to bind Nexora in contract or assume any obligation on its behalf.
              </p>
            </div>

            {/* Clause 2 */}
            <div className="glass-card">
              <h3 style={{ margin: '0 0 10px', fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-wine-dark)' }}>
                2. Reward Conditions & Strict Non-Cash Equivalence
              </h3>
              <p style={{ margin: '0 0 10px', fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
                Milestone physical rewards (devices, electronics, two-wheelers, SUV car) are contingent upon written approval, stock availability, fraud clearance, and successful completion of all qualification parameters across the underlying shops.
              </p>
              <div style={{ padding: '12px 16px', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-lavender-border)', fontSize: '0.88rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                Under no circumstances will cash alternatives, cryptocurrencies, bank credits, or equivalent monetary substitutes be granted in lieu of physical milestone rewards.
              </div>
            </div>

            {/* Clause 3 */}
            <div className="glass-card">
              <h3 style={{ margin: '0 0 10px', fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-wine-dark)' }}>
                3. Qualification Audit Rights & Clawback
              </h3>
              <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
                Nexora maintains full transactional logging. In the event of post-settlement chargebacks, synthetic payments, circular swiping, or collusion between the partner and salon owner, Nexora reserves the explicit right to claw back commission disbursements, freeze pending claims, and terminate partner access without prior notice.
              </p>
            </div>

            {/* Clause 4 */}
            <div className="glass-card">
              <h3 style={{ margin: '0 0 10px', fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-wine-dark)' }}>
                4. Statutory Tax Compliance (TDS)
              </h3>
              <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
                All commission payouts and value-based milestone rewards are subject to Tax Deducted at Source (TDS) pursuant to the Income-tax Act, 1961 (including Section 194H and 194R). Partners must provide a verified Permanent Account Number (PAN) prior to claim execution.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
