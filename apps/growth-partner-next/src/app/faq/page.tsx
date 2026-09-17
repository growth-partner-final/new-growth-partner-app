import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FAQSection } from '@/components/programme/FAQSection';
import { PhoneIcon, ArrowRightIcon } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ)',
  description:
    'Got questions about the Nexora Growth Partner Programme? Find clear answers regarding registration, qualification streaks, commission math, and milestone claims.',
};

export default function FAQPage() {
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
            Help Center
          </Badge>
          <h1 className="heading-hero" style={{ maxWidth: '820px', margin: '0 auto 16px' }}>
            Frequently Asked Questions
          </h1>
          <p className="subheading-section" style={{ margin: '0 auto' }}>
            Clear, transparent answers to every question about partner economics, salon qualification, streaks, and milestone fulfillment.
          </p>
        </div>
      </section>

      {/* Accordion FAQ Component */}
      <FAQSection />

      {/* Still Have Questions CTA */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-surface-soft)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-wine-dark)', margin: '0 0 12px' }}>
            Still Have Questions?
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', margin: '0 0 24px' }}>
            Our dedicated partner support desk is available Monday through Saturday to guide you through registration and qualification.
          </p>
          <Button href="/support" variant="primary">
            <PhoneIcon width={16} height={16} /> Contact Partner Desk <ArrowRightIcon width={16} height={16} />
          </Button>
        </div>
      </section>
    </div>
  );
}
