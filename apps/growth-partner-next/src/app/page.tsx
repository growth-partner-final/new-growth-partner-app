import type { Metadata } from 'next';
import { Hero } from '@/components/programme/Hero';
import { HowItWorksSteps } from '@/components/programme/HowItWorksSteps';
import { TrustPoints } from '@/components/programme/TrustPoints';
import { QualificationCard } from '@/components/programme/QualificationCard';
import { CommissionCalculator } from '@/components/programme/CommissionCalculator';
import { EarningsComparison } from '@/components/programme/EarningsComparison';
import { RewardMilestoneCards } from '@/components/programme/RewardMilestoneCards';
import { PosterSection } from '@/components/programme/PosterSection';
import { FraudWarnings } from '@/components/programme/FraudWarnings';
import { FAQSection } from '@/components/programme/FAQSection';
import { LegalNotice } from '@/components/programme/LegalNotice';
import { SupportSection } from '@/components/programme/SupportSection';

export const metadata: Metadata = {
  title: 'Nexora Growth Partner Programme — Zero-Investment Partnership',
  description:
    'Salon onboard karein, business grow karein aur rewards unlock karein. Zero-investment partner programme with verified salon onboarding and milestone tracking.',
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. How It Works */}
      <HowItWorksSteps />

      {/* 3. Partner Work & Rules / Trust Points */}
      <TrustPoints />

      {/* 4. Shop Qualification Formula */}
      <QualificationCard />

      {/* 5. One-Time Extra Onboarding (Activation) Reward */}
      <CommissionCalculator />

      {/* 6. Recurring Growth Share */}
      <EarningsComparison />

      {/* 7. Seven Reward Milestones & Poster Section */}
      <RewardMilestoneCards />
      <PosterSection />

      {/* 8. Fraud Prevention Notice */}
      <FraudWarnings />

      {/* 9. FAQ */}
      <FAQSection />

      {/* 10. Legal & Verification Notice */}
      <LegalNotice />

      {/* 11. Support Section */}
      <SupportSection />
    </>
  );
}
