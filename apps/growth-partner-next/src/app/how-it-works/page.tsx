import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { HowItWorksSteps } from '@/components/programme/HowItWorksSteps';
import {
  CheckIcon,
  CloseIcon,
  ShieldIcon,
  ArrowRightIcon,
  QrCodeIcon,
  SmartphoneIcon,
  AwardIcon,
  WalletIcon,
} from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'How It Works — Step-by-Step Partner Guide',
  description:
    'Complete step-by-step operational guide for Nexora Growth Partners: signup, salon onboarding, KYC, QR activation, 15-day streak, and milestone claim workflows.',
};

export default function HowItWorksPage() {
  return (
    <div>
      {/* Header Banner */}
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
            Operational Blueprint
          </Badge>
          <h1 className="heading-hero" style={{ maxWidth: '820px', margin: '0 auto 16px' }}>
            Kaise Kaam Karta Hai Nexora Partnership?
          </h1>
          <p className="subheading-section" style={{ margin: '0 auto 32px' }}>
            From sharing your referral code to receiving your physical milestone reward: a fully verified, server-authoritative workflow.
          </p>
          <Button href="/partner/signup" variant="primary" size="lg">
            Start Free Registration <ArrowRightIcon width={18} height={18} />
          </Button>
        </div>
      </section>

      {/* 4 Steps Component */}
      <HowItWorksSteps />

      {/* Deep-Dive Operational Steps */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 className="heading-section">Detailed Operational Stages</h2>
            <p className="subheading-section" style={{ margin: '0 auto' }}>
              How attribution, salon verification, payment settlement, and reward claims work under the hood.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Stage 1 */}
            <div className="glass-card" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '16px',
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <SmartphoneIcon width={26} height={26} />
              </div>
              <div style={{ flex: 1, minWidth: '260px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                  Stage 1 · Partner Referral
                </span>
                <h3 style={{ margin: '4px 0 10px', fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-wine-dark)' }}>
                  Immutable Server-Side Referral Attribution
                </h3>
                <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  Once registered, your partner profile receives a unique referral code. When a salon scans your partner link or enters your code during registration, the relationship is recorded once in <code>shop_attributions</code> and locked permanently. No other partner can poach your shop.
                </p>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="glass-card" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(84, 18, 59, 0.1)',
                  color: 'var(--color-wine)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <QrCodeIcon width={26} height={26} />
              </div>
              <div style={{ flex: 1, minWidth: '260px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-wine)', textTransform: 'uppercase' }}>
                  Stage 2 · Salon Onboarding & Template Handoff
                </span>
                <h3 style={{ margin: '4px 0 10px', fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-wine-dark)' }}>
                  Locked Stepped Onboarding & Handoff Link
                </h3>
                <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  The salon owner completes details → documents → KYC → payout bank setup → QR activation. Upon approval by Nexora ops, a signed, expiring template handoff link is generated, activating the salon&apos;s digital website and readying the QR standee.
                </p>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="glass-card" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '16px',
                  backgroundColor: 'var(--color-success-bg)',
                  color: 'var(--color-success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <ShieldIcon width={26} height={26} />
              </div>
              <div style={{ flex: 1, minWidth: '260px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-success)', textTransform: 'uppercase' }}>
                  Stage 3 · Qualification Scoring
                </span>
                <h3 style={{ margin: '4px 0 10px', fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-wine-dark)' }}>
                  15 Consecutive Days at ≥ ₹1,000/Day
                </h3>
                <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  Every business day is scored in <code>partner_shop_daily_qualification</code>. Genuine customer QR volume ≥ ₹1,000 advances the streak by 1. Once Day 15 is successfully recorded with ≥ ₹15,000 window collection, the salon officially achieves Qualified status.
                </p>
              </div>
            </div>

            {/* Stage 4 */}
            <div className="glass-card" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '16px',
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <WalletIcon width={26} height={26} />
              </div>
              <div style={{ flex: 1, minWidth: '260px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                  Stage 4 · Payouts & Recurring Shares
                </span>
                <h3 style={{ margin: '4px 0 10px', fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-wine-dark)' }}>
                  Automated Ledger Recording
                </h3>
                <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  One-time onboarding reward (10% of company commission) is recorded in <code>commission_events</code> with type <code>onboarding_reward</code>. Monthly recurring growth shares (10% / 5% / 2%) are recorded separately with type <code>recurring_growth_share</code>.
                </p>
              </div>
            </div>

            {/* Stage 5 */}
            <div className="glass-card" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '16px',
                  backgroundColor: 'var(--color-wine)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <AwardIcon width={26} height={26} />
              </div>
              <div style={{ flex: 1, minWidth: '260px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-lavender)', textTransform: 'uppercase' }}>
                  Stage 5 · Milestone Fulfillment
                </span>
                <h3 style={{ margin: '4px 0 10px', fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-wine-dark)' }}>
                  Physical Asset Delivery & Compliance Sign-Off
                </h3>
                <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  Crossing milestone thresholds (25, 50, 100, 250, 500, 750, 1000+) enables claim submission. After fraud clearance and identity checks, the physical device or vehicle is delivered. Zero cash alternative is permitted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Do's and Don'ts Checklist */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-surface-soft)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="heading-section">Genuineness Checklist</h2>
            <p className="subheading-section" style={{ margin: '0 auto' }}>
              Clear rules on what qualifies and what breaks the streak.
            </p>
          </div>

          <div className="grid-2">
            {/* What Qualifies */}
            <div className="glass-card" style={{ borderTop: '4px solid var(--color-success)' }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckIcon /> What Qualifies
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
                <li style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: 'var(--color-success)' }}><CheckIcon width={16} height={16} /></span>
                  <span>Genuine customer paying for haircut, facial, salon services via Nexora QR.</span>
                </li>
                <li style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: 'var(--color-success)' }}><CheckIcon width={16} height={16} /></span>
                  <span>Multiple customer bills adding up to ₹1,000 or more in a business day.</span>
                </li>
                <li style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: 'var(--color-success)' }}><CheckIcon width={16} height={16} /></span>
                  <span>Payments successfully settled to the shop&apos;s verified business account.</span>
                </li>
                <li style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: 'var(--color-success)' }}><CheckIcon width={16} height={16} /></span>
                  <span>Completed salon KYC with valid PAN and salon address proof.</span>
                </li>
              </ul>
            </div>

            {/* What Disqualifies */}
            <div className="glass-card" style={{ borderTop: '4px solid var(--color-danger)' }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-danger)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CloseIcon /> What Breaks The Streak
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
                <li style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: 'var(--color-danger)' }}><CloseIcon width={16} height={16} /></span>
                  <span>Salon owner or staff paying their own QR code (self-swiping).</span>
                </li>
                <li style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: 'var(--color-danger)' }}><CloseIcon width={16} height={16} /></span>
                  <span>Circular transactions where money is sent back to the customer afterwards.</span>
                </li>
                <li style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: 'var(--color-danger)' }}><CloseIcon width={16} height={16} /></span>
                  <span>Daily collection falling below ₹1,000 on any day of the 15-day streak.</span>
                </li>
                <li style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: 'var(--color-danger)' }}><CloseIcon width={16} height={16} /></span>
                  <span>Payments that are refunded or reversed within the qualification period.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
