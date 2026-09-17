import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { RewardMilestoneCards } from '@/components/programme/RewardMilestoneCards';
import { PosterSection } from '@/components/programme/PosterSection';
import { ClaimProcessTimeline } from '@/components/programme/ClaimProcessTimeline';
import { LegalNotice } from '@/components/programme/LegalNotice';

export const metadata: Metadata = {
  title: 'Official Milestone Rewards — 7 Locked Tiers',
  description:
    'Explore the 7 official Nexora physical milestone rewards from Official T-Shirt to District Partner SUV Car. Review plus-one claim mechanics and fulfillment guidelines.',
};

export default function RewardsPage() {
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
            Tangible Milestones
          </Badge>
          <h1 className="heading-hero" style={{ maxWidth: '860px', margin: '0 auto 16px' }}>
            Official Nexora Milestone Rewards
          </h1>
          <p className="subheading-section" style={{ margin: '0 auto' }}>
            Seven locked physical reward tiers earned exclusively by onboarding genuine qualifying salons. Transparent plus-one unlocks with zero cash alternatives.
          </p>
        </div>
      </section>

      {/* Reward Milestone Cards Component */}
      <RewardMilestoneCards />

      {/* Official Poster Section */}
      <PosterSection />

      {/* Claim Lifecycle & Timeline */}
      <ClaimProcessTimeline />

      {/* Legal & Compliance Notice */}
      <LegalNotice />
    </div>
  );
}
