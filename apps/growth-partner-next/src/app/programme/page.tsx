import type { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TrustPoints } from '@/components/programme/TrustPoints';
import {
  SparklesIcon,
  ShieldIcon,
  AwardIcon,
  CheckIcon,
  ArrowRightIcon,
  BuildingIcon,
  UsersIcon,
} from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Programme Overview',
  description:
    'Learn about the Nexora Growth Partner Programme: zero-investment partnership, three-pillar earning model, and transparent salon onboarding.',
};

export default function ProgrammePage() {
  return (
    <div>
      {/* Hero Banner */}
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
            Zero-Investment Partnership
          </Badge>
          <h1 className="heading-hero" style={{ maxWidth: '840px', margin: '0 auto 16px' }}>
            Nexora Growth Partner Programme
          </h1>
          <p className="subheading-section" style={{ margin: '0 auto 32px' }}>
            Join India&apos;s fastest-growing salon enablement network. Onboard local salon merchants, help them digitize their billing, and build sustainable active and recurring income.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <Button href="/partner/signup" variant="primary" size="lg">
              Partner Banein <ArrowRightIcon width={18} height={18} />
            </Button>
            <Button href="/how-it-works" variant="outline" size="lg">
              How It Works
            </Button>
          </div>
        </div>
      </section>

      {/* 3 Pillars Deep Dive */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 className="heading-section">The 3-Pillar Partner Economic Model</h2>
            <p className="subheading-section" style={{ margin: '0 auto' }}>
              Designed for transparent immediate returns, compound monthly growth, and life-changing physical milestone rewards.
            </p>
          </div>

          <div className="grid-3">
            {/* Pillar 1 */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
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
                  marginBottom: '16px',
                }}
              >
                <SparklesIcon />
              </div>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '4px' }}>
                Pillar 1 · Activation
              </span>
              <h3 style={{ margin: '0 0 12px', fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-wine-dark)' }}>
                One-Time Onboarding Reward
              </h3>
              <p style={{ margin: '0 0 16px', fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                10% of company commission collected during the shop&apos;s first 15-day qualifying streak (₹1,000/day minimum).
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem' }}>
                <li style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: 'var(--color-success)' }}><CheckIcon width={16} height={16} /></span>
                  <span>₹150+ per qualified salon</span>
                </li>
                <li style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: 'var(--color-success)' }}><CheckIcon width={16} height={16} /></span>
                  <span>No maximum earning cap</span>
                </li>
                <li style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: 'var(--color-success)' }}><CheckIcon width={16} height={16} /></span>
                  <span>Paid on streak completion</span>
                </li>
              </ul>
              <div style={{ marginTop: 'auto' }}>
                <Link href="/commission" style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  Math details <ArrowRightIcon width={14} height={14} />
                </Link>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(84, 18, 59, 0.1)',
                  color: 'var(--color-wine)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <UsersIcon />
              </div>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-wine)', marginBottom: '4px' }}>
                Pillar 2 · Recurring
              </span>
              <h3 style={{ margin: '0 0 12px', fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-wine-dark)' }}>
                Monthly Growth Share
              </h3>
              <p style={{ margin: '0 0 16px', fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Ongoing monthly brokerage share of eligible company commission generated by your active salon portfolio.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem' }}>
                <li style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: 'var(--color-success)' }}><CheckIcon width={16} height={16} /></span>
                  <span>Months 1–6: 10% company comm</span>
                </li>
                <li style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: 'var(--color-success)' }}><CheckIcon width={16} height={16} /></span>
                  <span>Months 7–12: 5% company comm</span>
                </li>
                <li style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: 'var(--color-success)' }}><CheckIcon width={16} height={16} /></span>
                  <span>Month 13+: 2% lifetime share</span>
                </li>
              </ul>
              <div style={{ marginTop: 'auto' }}>
                <Link href="/commission" style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-wine)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  Schedule details <ArrowRightIcon width={14} height={14} />
                </Link>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--color-success-bg)',
                  color: 'var(--color-success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <AwardIcon />
              </div>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-success)', marginBottom: '4px' }}>
                Pillar 3 · Milestone
              </span>
              <h3 style={{ margin: '0 0 12px', fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-wine-dark)' }}>
                7 Physical Milestone Rewards
              </h3>
              <p style={{ margin: '0 0 16px', fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Tangible physical rewards achieved as your cumulative count of verified qualifying salons grows.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem' }}>
                <li style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: 'var(--color-success)' }}><CheckIcon width={16} height={16} /></span>
                  <span>Official T-Shirt at 25 shops</span>
                </li>
                <li style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: 'var(--color-success)' }}><CheckIcon width={16} height={16} /></span>
                  <span>Laptops, Scooters, iPhone</span>
                </li>
                <li style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: 'var(--color-success)' }}><CheckIcon width={16} height={16} /></span>
                  <span>District SUV Car at 1000+ shops</span>
                </li>
              </ul>
              <div style={{ marginTop: 'auto' }}>
                <Link href="/rewards" style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-success)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  View reward ladder <ArrowRightIcon width={14} height={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Salon Owner Value Proposition */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-surface-soft)' }}>
        <div className="container">
          <div style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center', marginBottom: '40px' }}>
            <Badge variant="wine">Salon Merchant Benefits</Badge>
            <h2 className="heading-section">Why Local Salons Love Nexora</h2>
            <p className="subheading-section" style={{ margin: '0 auto' }}>
              You are offering salon owners real technological tools that modernize their salon, increase customer repeat visits, and streamline payments.
            </p>
          </div>

          <div className="grid-3">
            <div className="glass-card">
              <div style={{ color: 'var(--color-primary)', marginBottom: '12px' }}><BuildingIcon width={24} height={24} /></div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 8px', color: 'var(--color-wine-dark)' }}>
                Dedicated Salon Website
              </h3>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                Each salon receives a personalized, mobile-optimized website template delivered via a secure handoff link.
              </p>
            </div>

            <div className="glass-card">
              <div style={{ color: 'var(--color-primary)', marginBottom: '12px' }}><SparklesIcon width={24} height={24} /></div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 8px', color: 'var(--color-wine-dark)' }}>
                Instant QR Payments
              </h3>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                Branded Nexora QR code for UPI payments from Google Pay, PhonePe, Paytm, and all banking apps.
              </p>
            </div>

            <div className="glass-card">
              <div style={{ color: 'var(--color-primary)', marginBottom: '12px' }}><ShieldIcon width={24} height={24} /></div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 8px', color: 'var(--color-wine-dark)' }}>
                Reliable Bank Settlements
              </h3>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                Daily automated settlements directly into the salon merchant&apos;s verified bank account with zero hidden deductions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Points */}
      <TrustPoints />

      {/* CTA Banner */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-wine-dark)', color: '#ffffff', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800, margin: '0 0 16px', color: '#ffffff' }}>
            Ready To Start Your Growth Journey?
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-text-inverted-muted)', margin: '0 0 32px' }}>
            Zero investment. Zero inventory. Transparent rewards. Join the Nexora Growth Partner Programme today.
          </p>
          <Button href="/partner/signup" variant="primary" size="lg">
            Growth Partner Banein <ArrowRightIcon width={18} height={18} />
          </Button>
        </div>
      </section>
    </div>
  );
}
