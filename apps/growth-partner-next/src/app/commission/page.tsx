import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { CommissionCalculator } from '@/components/programme/CommissionCalculator';
import { EarningsComparison } from '@/components/programme/EarningsComparison';
import { LegalNotice } from '@/components/programme/LegalNotice';

export const metadata: Metadata = {
  title: 'Commission & Earnings Calculator',
  description:
    'Authoritative commission rules, canonical ₹15,000 and ₹50,000 examples, strict separation between one-time onboarding rewards and recurring growth share schedules.',
};

export default function CommissionPage() {
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
          <Badge variant="magenta" style={{ marginBottom: '16px' }}>
            Transparent Economics
          </Badge>
          <h1 className="heading-hero" style={{ maxWidth: '860px', margin: '0 auto 16px' }}>
            Commission Structure & Math
          </h1>
          <p className="subheading-section" style={{ margin: '0 auto' }}>
            Clear formulas, exact examples, and strict separation between one-time activation rewards and monthly recurring brokerage shares.
          </p>
        </div>
      </section>

      {/* One-Time Onboarding Formula and Canonical Examples */}
      <CommissionCalculator />

      {/* Side-by-Side Separation of Streams */}
      <EarningsComparison />

      {/* Compliance and Legal Safeguards */}
      <LegalNotice />
    </div>
  );
}
