import { ShieldIcon, UsersIcon, WalletIcon, LockIcon, AwardIcon, PhoneIcon } from '../ui/Icons';

const TRUST_ITEMS = [
  {
    icon: <WalletIcon />,
    title: 'Zero Investment Required',
    description: 'No registration fees, security deposit, or equipment cost. Start onboarding local salons with zero upfront capital.',
  },
  {
    icon: <LockIcon />,
    title: 'Permanent Server-Side Attribution',
    description: 'When a salon registers via your referral code, attribution is permanently locked in the database. No poaching or re-attribution.',
  },
  {
    icon: <ShieldIcon />,
    title: 'Transparent Qualification Rules',
    description: 'Strict 15-day streak tracking at ₹1,000/day genuine QR business. Real-time clarity on streak status and payout eligibility.',
  },
  {
    icon: <AwardIcon />,
    title: '7 Official Milestone Rewards',
    description: 'Tangible physical rewards from Official T-Shirt to District Partner SUV Car, documented in contract and fulfilled upon verification.',
  },
  {
    icon: <UsersIcon />,
    title: 'Merchant Growth & Tools',
    description: 'Salons receive a professional website template, digital booking flow, and instant QR payments to grow their local business.',
  },
  {
    icon: <PhoneIcon />,
    title: 'Dedicated Partner Desk',
    description: 'Direct phone and WhatsApp partner desk assistance for onboarding questions, document reviews, and milestone claim tracking.',
  },
];

export function TrustPoints() {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 className="heading-section">Kyun Banein Nexora Growth Partner?</h2>
          <p className="subheading-section" style={{ margin: '0 auto' }}>
            A sustainable, zero-investment partnership built on transparency, merchant success, and reliable rewards.
          </p>
        </div>

        <div className="grid-3">
          {TRUST_ITEMS.map((item, idx) => (
            <div key={idx} className="glass-card glass-card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: 'var(--color-wine-dark)' }}>
                {item.title}
              </h3>
              <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
