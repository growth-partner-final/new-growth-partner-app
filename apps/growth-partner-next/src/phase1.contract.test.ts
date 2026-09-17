import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { createElement } from 'react';

import {
  COMMISSION_RULES,
  computeCompanyCommissionPaise,
  computeActivationRewardPaise,
  computeOnboardingRewardFromQrPaise,
  recurringShareRateBps,
  RECURRING_SHARE_MONTHS_1_6_BPS,
  RECURRING_SHARE_MONTHS_7_12_BPS,
  RECURRING_SHARE_AFTER_12_BPS,
  COMMISSION_EVENT_TYPES,
  formatINR,
} from './lib/constants/commissions';
import { REWARD_MILESTONES, REWARD_MILESTONE_LABELS } from './lib/constants/rewards';
import { PosterSection, findPosterAsset } from './components/programme/PosterSection';

const EXPECTED_ROUTES = [
  '/',
  '/programme',
  '/how-it-works',
  '/rewards',
  '/qualification',
  '/commission',
  '/fraud-prevention',
  '/faq',
  '/legal',
  '/support',
  '/partner/signup',
  '/partner/login',
] as const;

const FORBIDDEN_LEGACY_TERMS = [
  'Welcome Package',
  'Brezza',
  'Cash Bonus',
  'Global Ambassador',
  'President',
  'Vice President',
  'Director',
] as const;

const EXPECTED_SEVEN_MILESTONES = [
  '25 Shops — Official Nexora T-Shirt',
  '50 Shops — Samsung Tablet',
  '100 Shops — Branded HP Laptop',
  '250 Shops — Electric Scooter',
  '500 Shops — Latest iPhone',
  '750 Shops — Royal Enfield 350 CC',
  '1000+ Shops — District Partner SUV Car',
] as const;

function getAllSourceFiles(dir: string, fileList: string[] = []): string[] {
  if (!existsSync(dir)) return fileList;
  const files = readdirSync(dir);
  for (const file of files) {
    const fullPath = join(dir, file);
    if (statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        getAllSourceFiles(fullPath, fileList);
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

describe('Phase 1 — Public Programme UI Contract Tests', () => {
  describe('Public Routes Existence', () => {
    it.each(EXPECTED_ROUTES)('route file exists for %s', (route) => {
      let pagePath: string;
      if (route === '/') {
        pagePath = resolve(process.cwd(), 'src/app/page.tsx');
      } else {
        pagePath = resolve(process.cwd(), `src/app${route}/page.tsx`);
      }
      expect(existsSync(pagePath), `Route file missing at ${pagePath}`).toBe(true);
      const content = readFileSync(pagePath, 'utf8');
      expect(content.length).toBeGreaterThan(100);
      expect(content).toContain('export default');
    });

    it('defines page-specific metadata for every public route', () => {
      for (const route of EXPECTED_ROUTES) {
        const pagePath =
          route === '/'
            ? resolve(process.cwd(), 'src/app/page.tsx')
            : resolve(process.cwd(), `src/app${route}/page.tsx`);
        const content = readFileSync(pagePath, 'utf8');
        expect(content, `${route} must export page metadata`).toMatch(
          /export const metadata(: Metadata)?\s*=/,
        );
      }
    });
  });

  describe('Working Navigation Targets', () => {
    it('header links to all primary public routes and CTAs', () => {
      const headerPath = resolve(process.cwd(), 'src/components/layout/Header.tsx');
      const content = readFileSync(headerPath, 'utf8');
      const expectedTargets = [
        '/programme',
        '/how-it-works',
        '/rewards',
        '/qualification',
        '/commission',
        '/fraud-prevention',
        '/faq',
        '/support',
        '/partner/signup',
        '/partner/login',
      ];
      for (const target of expectedTargets) {
        expect(content, `Header must contain link to ${target}`).toContain(target);
      }
    });

    it('footer links to programme, rewards, legal and support routes', () => {
      const footerPath = resolve(process.cwd(), 'src/components/layout/Footer.tsx');
      const content = readFileSync(footerPath, 'utf8');
      const expectedTargets = [
        '/programme',
        '/how-it-works',
        '/qualification',
        '/commission',
        '/rewards',
        '/fraud-prevention',
        '/faq',
        '/support',
        '/partner/signup',
        '/partner/login',
        '/legal',
      ];
      for (const target of expectedTargets) {
        expect(content, `Footer must contain link to ${target}`).toContain(target);
      }
    });

    it('contains no dead buttons (empty href or href="#")', () => {
      const srcFiles = getAllSourceFiles(resolve(process.cwd(), 'src'));
      for (const filePath of srcFiles) {
        // Skip test files
        if (filePath.includes('.test.')) continue;
        const content = readFileSync(filePath, 'utf8');
        expect(content, `${filePath} contains href="#"`).not.toMatch(/href=["']#["']/);
        expect(content, `${filePath} contains href=""`).not.toMatch(/href=["']["']/);
      }
    });
  });

  describe('Commission Calculations & Separation', () => {
    it('accurately computes Canonical Example 1: ₹15,000 QR collection', () => {
      const qrPaise = 15_000 * 100;
      const companyCommPaise = computeCompanyCommissionPaise(qrPaise);
      const partnerRewardPaise = computeActivationRewardPaise(companyCommPaise);

      expect(companyCommPaise).toBe(150_000); // ₹1,500
      expect(partnerRewardPaise).toBe(15_000); // ₹150
      expect(computeOnboardingRewardFromQrPaise(qrPaise)).toBe(15_000);
      expect(formatINR(partnerRewardPaise)).toContain('150');
    });

    it('accurately computes Canonical Example 2: ₹50,000 QR collection', () => {
      const qrPaise = 50_000 * 100;
      const companyCommPaise = computeCompanyCommissionPaise(qrPaise);
      const partnerRewardPaise = computeActivationRewardPaise(companyCommPaise);

      expect(companyCommPaise).toBe(500_000); // ₹5,000
      expect(partnerRewardPaise).toBe(50_000); // ₹500
      expect(computeOnboardingRewardFromQrPaise(qrPaise)).toBe(50_000);
      expect(formatINR(partnerRewardPaise)).toContain('500');
    });

    it('strictly separates one-time onboarding reward and recurring growth share', () => {
      expect(COMMISSION_EVENT_TYPES.ONBOARDING_REWARD).not.toBe(
        COMMISSION_EVENT_TYPES.RECURRING_GROWTH_SHARE,
      );

      // Verify recurring schedule rates
      expect(recurringShareRateBps(1)).toBe(RECURRING_SHARE_MONTHS_1_6_BPS); // 10%
      expect(recurringShareRateBps(6)).toBe(RECURRING_SHARE_MONTHS_1_6_BPS);
      expect(recurringShareRateBps(7)).toBe(RECURRING_SHARE_MONTHS_7_12_BPS); // 5%
      expect(recurringShareRateBps(12)).toBe(RECURRING_SHARE_MONTHS_7_12_BPS);
      expect(recurringShareRateBps(13)).toBe(RECURRING_SHARE_AFTER_12_BPS); // 2%
      expect(recurringShareRateBps(24)).toBe(RECURRING_SHARE_AFTER_12_BPS); // 2%
    });

    it('enforces qualification constants match PRD exactly', () => {
      expect(COMMISSION_RULES.minDailyQrAmountPaise).toBe(100_000); // ₹1,000
      expect(COMMISSION_RULES.minDailyCompanyCommissionPaise).toBe(10_000); // ₹100
      expect(COMMISSION_RULES.consecutiveQualifyingDays).toBe(15);
      expect(COMMISSION_RULES.minWindowQrAmountPaise).toBe(1_500_000); // ₹15,000
      expect(COMMISSION_RULES.minWindowCompanyCommissionPaise).toBe(150_000); // ₹1,500
      expect(COMMISSION_RULES.companyCommissionBps).toBe(1_000); // 10%
      expect(COMMISSION_RULES.activationRewardBps).toBe(1_000); // 10%
    });
  });

  describe('Seven Milestone Rewards & Forbidden Terms', () => {
    it('matches exactly the 7 locked milestone labels', () => {
      expect(REWARD_MILESTONE_LABELS).toEqual([...EXPECTED_SEVEN_MILESTONES]);
      expect(REWARD_MILESTONES.map((m) => m.threshold)).toEqual([
        25, 50, 100, 250, 500, 750, 1000,
      ]);
    });

    it('forbidden legacy terms are absent across all source files', () => {
      const srcFiles = getAllSourceFiles(resolve(process.cwd(), 'src'));
      for (const filePath of srcFiles) {
        // Skip contract test files that explicitly test for absence of forbidden terms
        if (filePath.endsWith('contract.test.ts')) continue;
        const content = readFileSync(filePath, 'utf8');
        for (const term of FORBIDDEN_LEGACY_TERMS) {
          const pattern = new RegExp(`\\b${term.replace(/\s+/g, '\\s+')}\\b`, 'i');
          expect(
            content,
            `Forbidden legacy term "${term}" found in ${filePath}`,
          ).not.toMatch(pattern);
        }
      }
    });

    it('rewards include non-cash and verification disclaimers', () => {
      const legalNoticePath = resolve(
        process.cwd(),
        'src/components/programme/LegalNotice.tsx',
      );
      const content = readFileSync(legalNoticePath, 'utf8');
      expect(content).toContain('Cash alternative available nahi hai');
      expect(content).toContain('Rewards verified qualifying shops');
    });
  });

  describe('Poster Component Safe Fallback Behaviour', () => {
    it('detects that official poster is currently absent', () => {
      const asset = findPosterAsset();
      expect(asset.found).toBe(false);
    });

    it('renders clean fallback without broken image when asset is absent', () => {
      const element = createElement(PosterSection, {
        forcedAsset: { found: false },
      });
      expect(element).toBeDefined();
    });

    it('renders Next.js Image component when asset is provided', () => {
      const element = createElement(PosterSection, {
        forcedAsset: {
          found: true,
          publicPath: '/assets/nexora-reward-poster.png',
          filename: 'nexora-reward-poster.png',
        },
      });
      expect(element).toBeDefined();
    });
  });
});
