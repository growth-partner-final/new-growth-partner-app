import { REWARD_MILESTONES } from '@/lib/constants/rewards';
import { Badge } from '../ui/Badge';
import { AwardIcon, LockIcon, ShieldIcon, CheckIcon } from '../ui/Icons';

export function RewardMilestoneCards() {
  return (
    <section id="rewards" className="section-padding" style={{ backgroundColor: 'var(--color-surface-soft)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Badge variant="magenta">7 Canonical Milestone Rewards</Badge>
          <h2 className="heading-section">Physical Reward Milestone Ladder</h2>
          <p className="subheading-section" style={{ margin: '0 auto' }}>
            Earn exclusive physical milestone rewards based on your cumulative verified qualifying salon count.
          </p>
        </div>

        {/* 7 Milestones Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          {REWARD_MILESTONES.map((milestone, idx) => {
            const isTopTier = milestone.threshold >= 750;
            const shopTarget = milestone.threshold === 1000 ? '1000+' : `${milestone.threshold}`;
            // Extract the reward item name after the "—"
            const rewardName = milestone.label.split('—')[1]?.trim() ?? milestone.label;

            return (
              <div
                key={milestone.threshold}
                className={isTopTier ? 'magenta-gradient-card' : 'glass-card glass-card-hover'}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  padding: '24px 20px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: isTopTier ? 'rgba(255, 255, 255, 0.2)' : 'var(--color-primary-light)',
                      color: isTopTier ? '#ffffff' : 'var(--color-primary)',
                    }}
                  >
                    Tier {idx + 1}
                  </span>
                  <span
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 900,
                      color: isTopTier ? '#ffffff' : 'var(--color-wine-dark)',
                    }}
                  >
                    {shopTarget} Shops
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <span style={{ color: isTopTier ? '#ffdbe8' : 'var(--color-primary)' }}>
                    <AwardIcon width={22} height={22} />
                  </span>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      color: isTopTier ? '#ffffff' : 'var(--color-wine-dark)',
                    }}
                  >
                    {rewardName}
                  </h3>
                </div>

                <div
                  style={{
                    fontSize: '0.82rem',
                    color: isTopTier ? 'rgba(255, 255, 255, 0.85)' : 'var(--color-text-muted)',
                    marginBottom: '16px',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {milestone.label}
                </div>

                {/* Plus-one claim unlock indicator */}
                <div
                  style={{
                    marginTop: 'auto',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isTopTier ? 'rgba(0, 0, 0, 0.2)' : 'var(--color-surface-soft)',
                    border: isTopTier ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid var(--color-border)',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: isTopTier ? '#ffdbe8' : 'var(--color-text-muted)',
                  }}
                >
                  <LockIcon width={14} height={14} />
                  <span>Unlocks at {shopTarget} fraud-cleared shops</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Plus-One Claim Progression Callout */}
        <div
          className="glass-card"
          style={{
            borderColor: 'var(--color-primary-border)',
            padding: '24px 28px',
            marginBottom: '32px',
            backgroundColor: '#ffffff',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span style={{ color: 'var(--color-primary)' }}>
              <CheckIcon width={22} height={22} />
            </span>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-wine-dark)' }}>
              Cumulative Plus-One Unlock Mechanics
            </h3>
          </div>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            Your shop counter never resets when claiming a reward! Crossing 25 qualifying shops unlocks Tier 1 (Official Nexora T-Shirt). You only need 25 additional qualifying shops to reach 50 shops and claim Tier 2 (Samsung Tablet). Every milestone is an incremental achievement on your cumulative journey.
          </p>
        </div>

        {/* Verbatim Legal Warning on Rewards */}
        <div
          style={{
            padding: '16px 20px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
          }}
        >
          <span style={{ color: 'var(--color-wine)', marginTop: '2px' }}>
            <ShieldIcon width={20} height={20} />
          </span>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            <strong>Official Reward Conditions:</strong> Rewards verified qualifying shops, fraud clearance, programme rules, availability, documentation aur written approval ke subject hain. Cash alternative available nahi hai. Nexora does not provide unconditional free products, speculative cash substitutes, or guaranteed vehicle titles without rigorous ops compliance verification.
          </p>
        </div>
      </div>
    </section>
  );
}
