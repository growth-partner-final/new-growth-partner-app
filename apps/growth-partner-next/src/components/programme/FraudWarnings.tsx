import { Badge } from '../ui/Badge';
import { AlertCircleIcon, ShieldIcon, LockIcon } from '../ui/Icons';

const EXCLUDED_TRANSACTION_TYPES = [
  {
    title: 'Refunds & Payment Reversals',
    description: 'Any customer transaction that is canceled, charged back, or refunded is immediately deducted and invalidates the qualification criteria for that day.',
  },
  {
    title: 'Self-Payments & Own-Card Swiping',
    description: 'Payments made by the salon owner, staff, or growth partner using their own UPI IDs, debit/credit cards, or net banking accounts.',
  },
  {
    title: 'Circular & Looped Transactions',
    description: 'Round-tripping funds between friendly merchant accounts or personal UPI handles to artificially simulate customer footfall.',
  },
  {
    title: 'Duplicate & Phantom Shops',
    description: 'Registering non-existent salons, paper businesses, or duplicate registrations of existing salon branches under altered names.',
  },
  {
    title: 'Artificial Volume Splitting',
    description: 'Splitting single transactions into artificial repetitive micro-transactions or running synthetic bot transactions to manufacture streak days.',
  },
  {
    title: 'Pre-Funded / Non-Customer Transfers',
    description: 'Merchant funding their own QR code through personal bank accounts rather than genuine salon clients paying for hair and beauty services.',
  },
];

export function FraudWarnings() {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-surface-soft)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <Badge variant="danger">Zero Tolerance Policy</Badge>
          <h2 className="heading-section">Fraud Prevention & Excluded Transactions</h2>
          <p className="subheading-section" style={{ margin: '0 auto' }}>
            To safeguard genuine partners and sustainable business growth, Nexora operates automated transaction fraud scoring.
          </p>
        </div>

        {/* Excluded Types Grid */}
        <div className="grid-3" style={{ marginBottom: '36px' }}>
          {EXCLUDED_TRANSACTION_TYPES.map((type, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                borderTop: '3px solid var(--color-danger)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-danger)' }}>
                <AlertCircleIcon width={18} height={18} />
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--color-wine-dark)' }}>
                  {type.title}
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>
                {type.description}
              </p>
            </div>
          ))}
        </div>

        {/* Audit & Consequence Box */}
        <div
          style={{
            padding: '24px 28px',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: '#fff1f2',
            border: '1px solid #fecdd3',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: 'var(--color-danger)' }}>
              <ShieldIcon width={24} height={24} />
            </span>
            <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#9f1239' }}>
              Streak Invalidation & Account Freeze
            </h4>
          </div>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#881337', lineHeight: 1.6 }}>
            A day containing excluded or artificial transactions fails the genuineness check, does NOT qualify, and permanently breaks the 15-day streak for that shop. Repeated or deliberate artificial volume will result in immediate suspension of the partner profile, permanent forfeiture of accrued rewards and claims, and blacklisting across the Nexora merchant network.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 700, color: '#9f1239' }}>
            <LockIcon width={16} height={16} />
            <span>Automated settlement ledger audits run continuously on all active partner attributions.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
