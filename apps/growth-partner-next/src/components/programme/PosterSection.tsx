import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import { Badge } from '../ui/Badge';
import { AwardIcon, InfoIcon, ShieldIcon } from '../ui/Icons';
import { REWARD_MILESTONES } from '@/lib/constants/rewards';

export interface PosterAssetInfo {
  found: boolean;
  publicPath?: string;
  filename?: string;
}

/**
 * Checks for the presence of the exact original reward poster in public/assets.
 * Checked synchronously on the server (Server Component).
 */
export function findPosterAsset(): PosterAssetInfo {
  const possibleDirs = [
    path.resolve(process.cwd(), 'public', 'assets'),
    path.resolve(process.cwd(), 'apps', 'growth-partner-next', 'public', 'assets'),
  ];

  const allowedExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];

  for (const dir of possibleDirs) {
    if (fs.existsSync(dir)) {
      try {
        const files = fs.readdirSync(dir);
        for (const file of files) {
          const lower = file.toLowerCase();
          if (
            lower.startsWith('nexora-reward-poster') &&
            allowedExtensions.some((ext) => lower.endsWith(ext))
          ) {
            return {
              found: true,
              publicPath: `/assets/${file}`,
              filename: file,
            };
          }
        }
      } catch {
        // Fall back gracefully on read error
      }
    }
  }

  return { found: false };
}

export function PosterSection({
  forcedAsset,
}: {
  forcedAsset?: PosterAssetInfo;
}) {
  const asset = forcedAsset ?? findPosterAsset();

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Badge variant="magenta">Visual Verification</Badge>
          <h2 className="heading-section">Official Programme Reward Poster</h2>
          <p className="subheading-section" style={{ margin: '0 auto' }}>
            Authoritative display of the seven locked milestone rewards.
          </p>
        </div>

        {asset.found && asset.publicPath ? (
          /* When the exact asset is present: render uncropped with object-fit: contain */
          <div
            className="glass-card"
            style={{
              maxWidth: '920px',
              margin: '0 auto',
              padding: '24px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxHeight: '800px',
                overflow: 'hidden',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <Image
                src={asset.publicPath}
                alt="Nexora Growth Partner Official Reward Poster — 7 Milestone Rewards"
                width={1200}
                height={800}
                style={{
                  objectFit: 'contain',
                  width: '100%',
                  height: 'auto',
                }}
                priority
              />
            </div>
            <p style={{ marginTop: '16px', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Official printed reward poster for the Nexora Growth Partner Programme.
            </p>
          </div>
        ) : (
          /* When asset is absent: NO fake image, NO broken <img>, polished semantic HTML mirror */
          <div
            className="glass-card"
            style={{
              maxWidth: '960px',
              margin: '0 auto',
              padding: '36px 32px',
              border: '2px dashed var(--color-lavender-border)',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                marginBottom: '28px',
              }}
            >
              <Badge variant="warning" style={{ marginBottom: '12px' }}>
                <InfoIcon width={14} height={14} /> Pending Official Asset Release
              </Badge>
              <h3 style={{ margin: '0 0 10px', fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-wine-dark)' }}>
                Nexora Milestone Ladder (Official Semantic Mirror)
              </h3>
              <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--color-text-muted)', maxWidth: '640px' }}>
                The original high-resolution graphic poster is pending placement at{' '}
                <code style={{ fontSize: '0.85rem', backgroundColor: 'var(--color-surface-soft)', padding: '2px 6px', borderRadius: '4px' }}>
                  /public/assets/nexora-reward-poster.*
                </code>
                . No substitute infographic has been generated. The verified binding milestones are mirrored below:
              </p>
            </div>

            {/* Semantic Mirror Table */}
            <div className="data-table-wrapper" style={{ marginBottom: '24px' }}>
              <table className="data-table" aria-label="Official Reward Milestones Mirror">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: '80px' }}>Tier</th>
                    <th scope="col" style={{ width: '140px' }}>Shops Required</th>
                    <th scope="col">Official Reward Label</th>
                    <th scope="col" style={{ width: '140px' }}>Claim Status</th>
                  </tr>
                </thead>
                <tbody>
                  {REWARD_MILESTONES.map((m, idx) => (
                    <tr key={m.threshold}>
                      <td style={{ fontWeight: 700, color: 'var(--color-primary)' }}>#{idx + 1}</td>
                      <td style={{ fontWeight: 800, color: 'var(--color-wine-dark)' }}>
                        {m.threshold === 1000 ? '1000+ Shops' : `${m.threshold} Shops`}
                      </td>
                      <td style={{ fontWeight: 600 }}>{m.label}</td>
                      <td>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--color-wine)' }}>
                          <AwardIcon width={14} height={14} /> Contract Locked
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Verification and Legal footnote */}
            <div
              style={{
                padding: '14px 18px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-surface-soft)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '0.82rem',
                color: 'var(--color-text-muted)',
              }}
            >
              <ShieldIcon width={18} height={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
              <span>
                <strong>Prerequisite Status:</strong> The exact original poster asset is recorded as the sole pending visual asset in <code>08_TRACKER.md</code>. Layout will automatically display the image once the verified file is provided.
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
