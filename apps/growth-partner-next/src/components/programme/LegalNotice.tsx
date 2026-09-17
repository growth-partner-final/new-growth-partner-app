import { Badge } from '../ui/Badge';
import { ShieldIcon, LockIcon } from '../ui/Icons';

export function LegalNotice() {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container">
        <div
          className="wine-gradient-card"
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ color: 'var(--color-lavender)' }}>
              <ShieldIcon width={28} height={28} />
            </span>
            <div>
              <Badge variant="magenta" style={{ marginBottom: '4px' }}>
                Compliance & Legal Disclosure
              </Badge>
              <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
                Binding Legal Terms & Partner Status
              </h2>
            </div>
          </div>

          {/* Verbatim Binding Statement */}
          <div
            style={{
              padding: '16px 20px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(253, 164, 201, 0.3)',
              marginBottom: '20px',
              fontStyle: 'italic',
              color: '#ffdbe8',
              fontSize: '0.95rem',
              lineHeight: 1.6,
            }}
          >
            &ldquo;Rewards verified qualifying shops, fraud clearance, programme rules, availability, documentation aur written approval ke subject hain. Cash alternative available nahi hai.&rdquo;
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              color: 'rgba(255, 255, 255, 0.85)',
              fontSize: '0.88rem',
              lineHeight: 1.6,
            }}
          >
            <div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                Independent Partner Relationship
              </h3>
              <p style={{ margin: 0 }}>
                Nexora Growth Partners operate as independent business facilitators under a zero-investment referral agreement. Registration does not establish an employment, joint venture, agency, or franchise relationship.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                No Cash Conversion or Guarantees
              </h3>
              <p style={{ margin: 0 }}>
                Physical milestone rewards (laptops, two-wheelers, SUV cars) cannot be converted to cash, crypto, or store credits. Vehicle rewards are subject to registration, road tax, and regional documentation policies.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                Audit Rights & Tax Withholding
              </h3>
              <p style={{ margin: 0 }}>
                All commission disbursements and reward disbursements are subject to applicable Indian Tax Deducted at Source (TDS) under Section 194H/194R. Nexora reserves the full right to audit underlying QR settlements prior to payout approval.
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: '24px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.8rem',
              color: 'var(--color-text-inverted-muted)',
            }}
          >
            <LockIcon width={14} height={14} />
            <span>Nexora Growth Partner Programme is operated in compliance with applicable Indian commercial laws.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
