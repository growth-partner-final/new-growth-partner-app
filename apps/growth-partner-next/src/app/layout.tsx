import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import './globals.css';

export const metadata: Metadata = {
  title: 'Nexora Growth Partner Portal',
  description:
    'Nexora Growth Partner program — zero-investment partner portal with activation rewards, recurring brokerage share and a milestone reward ladder.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
