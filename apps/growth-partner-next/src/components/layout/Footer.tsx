import Link from 'next/link';

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-wine-dark)',
        color: 'var(--color-text-inverted)',
        borderTop: '1px solid rgba(253, 164, 201, 0.2)',
        paddingTop: '64px',
        paddingBottom: '40px',
        marginTop: '80px',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          {/* Brand Info */}
          <div style={{ maxWidth: '340px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-lavender) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                }}
              >
                N
              </span>
              <span style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
                Nexora Partner
              </span>
            </div>
            <p style={{ color: 'var(--color-text-inverted-muted)', fontSize: '0.92rem', lineHeight: 1.6, margin: '0 0 16px' }}>
              Zero-investment partnership to onboard local salons onto Nexora, activate verified QR payments, and unlock transparent milestone rewards.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: 'var(--radius-full)', backgroundColor: 'rgba(255, 255, 255, 0.1)', fontSize: '0.8rem', color: '#ffdbe8' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4ade80' }} />
              <span>Canonical Nexora Programme UI</span>
            </div>
          </div>

          {/* Programme Navigation */}
          <div>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-lavender)', marginBottom: '18px' }}>
              Programme
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>
                <Link href="/programme" style={{ color: 'var(--color-text-inverted-muted)', fontSize: '0.92rem', transition: 'color 0.15s ease' }}>
                  Programme Overview
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" style={{ color: 'var(--color-text-inverted-muted)', fontSize: '0.92rem', transition: 'color 0.15s ease' }}>
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/qualification" style={{ color: 'var(--color-text-inverted-muted)', fontSize: '0.92rem', transition: 'color 0.15s ease' }}>
                  Shop Qualification Rules
                </Link>
              </li>
              <li>
                <Link href="/commission" style={{ color: 'var(--color-text-inverted-muted)', fontSize: '0.92rem', transition: 'color 0.15s ease' }}>
                  Commission Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Rewards & Compliance */}
          <div>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-lavender)', marginBottom: '18px' }}>
              Rewards & Safety
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>
                <Link href="/rewards" style={{ color: 'var(--color-text-inverted-muted)', fontSize: '0.92rem', transition: 'color 0.15s ease' }}>
                  7 Milestone Rewards
                </Link>
              </li>
              <li>
                <Link href="/fraud-prevention" style={{ color: 'var(--color-text-inverted-muted)', fontSize: '0.92rem', transition: 'color 0.15s ease' }}>
                  Fraud Prevention Policy
                </Link>
              </li>
              <li>
                <Link href="/faq" style={{ color: 'var(--color-text-inverted-muted)', fontSize: '0.92rem', transition: 'color 0.15s ease' }}>
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/support" style={{ color: 'var(--color-text-inverted-muted)', fontSize: '0.92rem', transition: 'color 0.15s ease' }}>
                  Partner Help Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Actions */}
          <div>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-lavender)', marginBottom: '18px' }}>
              Partner Access
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>
                <Link href="/partner/signup" style={{ color: 'var(--color-text-inverted-muted)', fontSize: '0.92rem', transition: 'color 0.15s ease' }}>
                  Growth Partner Signup
                </Link>
              </li>
              <li>
                <Link href="/partner/login" style={{ color: 'var(--color-text-inverted-muted)', fontSize: '0.92rem', transition: 'color 0.15s ease' }}>
                  Partner Portal Login
                </Link>
              </li>
              <li>
                <Link href="/legal" style={{ color: 'var(--color-text-inverted-muted)', fontSize: '0.92rem', transition: 'color 0.15s ease' }}>
                  Legal & Verification Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(253, 164, 201, 0.18)',
            borderRadius: 'var(--radius-md)',
            padding: '20px 24px',
            marginBottom: '32px',
          }}
        >
          <p style={{ color: '#ffdbe8', fontSize: '0.86rem', lineHeight: 1.6, margin: '0 0 10px', fontWeight: 600 }}>
            Important Legal Notice:
          </p>
          <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.82rem', lineHeight: 1.65, margin: 0 }}>
            Rewards verified qualifying shops, fraud clearance, programme rules, availability, documentation aur written approval ke subject hain. Cash alternative available nahi hai.
            Nexora Growth Partner is an independent merchant onboarding programme. We do not claim or guarantee unconditional free products, vehicles, or speculative cash equivalents. Payouts and physical reward eligibility strictly require KYC verification, genuine merchant QR transactions of ≥ ₹1,000/day for 15 consecutive qualifying days, and comprehensive anti-fraud review.
          </p>
        </div>

        {/* Copyright */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            fontSize: '0.85rem',
            color: 'var(--color-text-inverted-muted)',
          }}
          className="footer-bottom"
        >
          <span>
            © {new Date().getFullYear()} Nexora Platform. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <Link href="/legal" style={{ color: 'inherit' }}>Legal Terms</Link>
            <Link href="/fraud-prevention" style={{ color: 'inherit' }}>Anti-Fraud Standards</Link>
            <Link href="/support" style={{ color: 'inherit' }}>Partner Support</Link>
          </div>
        </div>
      </div>


    </footer>
  );
}
