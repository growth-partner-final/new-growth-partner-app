import {
  computeCompanyCommissionPaise,
  computeActivationRewardPaise,
  formatINR,
  ACTIVATION_REWARD_BPS,
  COMPANY_COMMISSION_BPS,
} from '@/lib/constants/commissions';
import { Badge } from '../ui/Badge';
import { AlertCircleIcon, CheckIcon, SparklesIcon } from '../ui/Icons';

export function CommissionCalculator() {
  const ex1QrPaise = 15_000 * 100;
  const ex1CompanyPaise = computeCompanyCommissionPaise(ex1QrPaise);
  const ex1PartnerPaise = computeActivationRewardPaise(ex1CompanyPaise);

  const ex2QrPaise = 50_000 * 100;
  const ex2CompanyPaise = computeCompanyCommissionPaise(ex2QrPaise);
  const ex2PartnerPaise = computeActivationRewardPaise(ex2CompanyPaise);

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-surface-soft)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <Badge variant="magenta">One-Time Activation Reward</Badge>
          <h2 className="heading-section">One-Time Onboarding Reward Formula</h2>
          <p className="subheading-section" style={{ margin: '0 auto' }}>
            Earned once per newly qualified salon upon completion of its first 15-day qualifying streak. Kept strictly separate from recurring growth share.
          </p>
        </div>

        {/* Formula Box */}
        <div
          className="glass-card"
          style={{
            maxWidth: '820px',
            margin: '0 auto 36px',
            textAlign: 'center',
            borderColor: 'var(--color-primary-border)',
            background: 'linear-gradient(180deg, rgba(253, 242, 248, 0.9) 0%, rgba(255, 255, 255, 0.95) 100%)',
            padding: '32px 24px',
          }}
        >
          <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-primary)' }}>
            Authoritative Mathematical Formula
          </span>
          <div
            style={{
              fontSize: 'clamp(1.15rem, 2.5vw, 1.45rem)',
              fontWeight: 800,
              color: 'var(--color-wine-dark)',
              margin: '12px 0 16px',
              padding: '14px 18px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#ffffff',
              border: '1px dashed var(--color-primary)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            Partner Reward = 10% of Company Commission (from first 15 qualifying days)
          </div>
          <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>
            Nexora charges 10% company commission on qualifying QR transactions. Your activation reward is {ACTIVATION_REWARD_BPS / 100}% of that collected company commission (effective 1% of total qualifying QR volume).
          </p>
        </div>

        {/* Both Canonical Examples Side-by-Side */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            marginBottom: '36px',
          }}
        >
          {/* Example 1: Minimum Canonical Window */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                Canonical Example 1
              </span>
              <Badge variant="wine">15-Day Base Window</Badge>
            </div>

            <div style={{ padding: '16px', backgroundColor: 'var(--color-surface-soft)', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                Shop 15-Day QR Collection:
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-wine-dark)' }}>
                {formatINR(ex1QrPaise)}
              </div>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)' }}>
                <span>Company Commission ({COMPANY_COMMISSION_BPS / 100}%):</span>
                <span style={{ fontWeight: 700, color: 'var(--color-wine-dark)' }}>{formatINR(ex1CompanyPaise)}</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)' }}>
                <span>Partner Reward Rate:</span>
                <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>10% of Company Commission</span>
              </li>
            </ul>

            <div
              style={{
                marginTop: 'auto',
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-primary-light)',
                border: '1px solid var(--color-lavender-border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary)' }}>
                  Partner Payout
                </span>
                <div style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--color-primary)' }}>
                  {formatINR(ex1PartnerPaise)}
                </div>
              </div>
              <span style={{ color: 'var(--color-primary)' }}>
                <CheckIcon width={24} height={24} />
              </span>
            </div>
          </div>

          {/* Example 2: Higher Volume Shop */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                Canonical Example 2
              </span>
              <Badge variant="magenta">Higher Volume Window</Badge>
            </div>

            <div style={{ padding: '16px', backgroundColor: 'var(--color-surface-soft)', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                Shop 15-Day QR Collection:
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-wine-dark)' }}>
                {formatINR(ex2QrPaise)}
              </div>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)' }}>
                <span>Company Commission ({COMPANY_COMMISSION_BPS / 100}%):</span>
                <span style={{ fontWeight: 700, color: 'var(--color-wine-dark)' }}>{formatINR(ex2CompanyPaise)}</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)' }}>
                <span>Partner Reward Rate:</span>
                <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>10% of Company Commission</span>
              </li>
            </ul>

            <div
              style={{
                marginTop: 'auto',
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-primary-light)',
                border: '1px solid var(--color-lavender-border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary)' }}>
                  Partner Payout
                </span>
                <div style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--color-primary)' }}>
                  {formatINR(ex2PartnerPaise)}
                </div>
              </div>
              <span style={{ color: 'var(--color-primary)' }}>
                <CheckIcon width={24} height={24} />
              </span>
            </div>
          </div>
        </div>

        {/* Vital Rule Callout: No Cap + Warning */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '16px',
          }}
        >
          <div
            style={{
              padding: '16px 20px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-success-bg)',
              border: '1px solid var(--color-success-border)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
            }}
          >
            <span style={{ color: 'var(--color-success)', marginTop: '2px' }}>
              <SparklesIcon width={20} height={20} />
            </span>
            <div>
              <strong style={{ display: 'block', color: 'var(--color-success)', fontSize: '0.9rem', marginBottom: '2px' }}>
                No Maximum Cap
              </strong>
              <span style={{ fontSize: '0.84rem', color: '#166534' }}>
                There is no upper ceiling on onboarding rewards. If a high-volume salon qualifies with ₹2,00,000 QR collection, company commission is ₹20,000, and your reward is ₹2,000.
              </span>
            </div>
          </div>

          <div
            style={{
              padding: '16px 20px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-danger-bg)',
              border: '1px solid var(--color-danger-border)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
            }}
          >
            <span style={{ color: 'var(--color-danger)', marginTop: '2px' }}>
              <AlertCircleIcon width={20} height={20} />
            </span>
            <div>
              <strong style={{ display: 'block', color: 'var(--color-danger)', fontSize: '0.9rem', marginBottom: '2px' }}>
                Never Direct 10% From QR
              </strong>
              <span style={{ fontSize: '0.84rem', color: '#991b1b' }}>
                The partner reward is 10% of the company&apos;s commission, NOT 10% of the shop&apos;s full QR collection. Stating 10% of full QR (which would imply ₹1,500 on ₹15,000) is strictly inaccurate.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
