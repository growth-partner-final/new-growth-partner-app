import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ArrowRightIcon, AwardIcon, ShieldIcon, SparklesIcon } from '../ui/Icons';

export function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '64px',
        paddingBottom: '64px',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(253, 164, 201, 0.25) 0%, rgba(250, 245, 248, 0) 70%)',
      }}
    >
      <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {/* Top Badges */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '24px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Badge variant="magenta">
            <SparklesIcon width={14} height={14} /> Zero Investment
          </Badge>
          <Badge variant="info">
            <ShieldIcon width={14} height={14} /> 100% Genuine Verification
          </Badge>
        </div>

        {/* Verbatim Main Hinglish Headline */}
        <h1
          className="heading-hero"
          style={{
            maxWidth: '920px',
            margin: '0 auto 20px',
          }}
        >
          Salon onboard karein,{' '}
          <span className="text-gradient">business grow karein</span> aur rewards unlock karein.
        </h1>

        {/* Verbatim Supporting Text */}
        <p
          className="subheading-section"
          style={{
            maxWidth: '740px',
            margin: '0 auto 36px',
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
          }}
        >
          Genuine salon onboarding, verified QR business aur transparent milestone tracking.
        </p>

        {/* CTAs — No dead buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            flexWrap: 'wrap',
            marginBottom: '48px',
          }}
        >
          <Button href="/partner/signup" variant="primary" size="lg">
            Growth Partner Banein <ArrowRightIcon width={18} height={18} />
          </Button>
          <Button href="/rewards" variant="outline" size="lg">
            <AwardIcon width={18} height={18} /> Rewards Dekhein
          </Button>
          <Button href="/partner/login" variant="ghost" size="lg">
            Apna Progress Check Karein
          </Button>
        </div>

        {/* Trust Highlight Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
            maxWidth: '960px',
            margin: '0 auto',
            textAlign: 'left',
          }}
        >
          <div className="glass-card" style={{ padding: '20px 22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ color: 'var(--color-primary)', display: 'flex' }}>
                <SparklesIcon />
              </span>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--color-wine-dark)' }}>
                One-Time Onboarding
              </h2>
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
              10% of company commission from the shop&apos;s first 15-day qualifying window. ₹150+ per qualifying salon, no cap.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '20px 22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ color: 'var(--color-primary)', display: 'flex' }}>
                <ShieldIcon />
              </span>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--color-wine-dark)' }}>
                Recurring Growth Share
              </h2>
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
              Months 1–6: 10% · Months 7–12: 5% · After 12 Months: 2% lifetime share of eligible company commission.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '20px 22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ color: 'var(--color-primary)', display: 'flex' }}>
                <AwardIcon />
              </span>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--color-wine-dark)' }}>
                7 Physical Milestones
              </h2>
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
              Official T-Shirt up to District Partner SUV Car. Transparent unlocks with zero cash conversions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
