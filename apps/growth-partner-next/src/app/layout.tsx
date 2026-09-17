import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Nexora Growth Partner Programme — Zero-Investment Partnership',
    template: '%s | Nexora Growth Partner',
  },
  description:
    'Zero-investment partner programme: Onboard local salons, activate verified QR payments, and unlock activation rewards, recurring growth share, and 7 physical milestone rewards.',
  keywords: [
    'Nexora Growth Partner',
    'Salon Onboarding',
    'QR Payments',
    'Merchant Commission',
    'Milestone Rewards',
    'Zero Investment Partnership',
  ],
  authors: [{ name: 'Nexora Platform' }],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Accessible skip link */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <Header />
        <main id="main-content" style={{ minHeight: 'calc(100vh - 400px)' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
