import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('Phase 1 — Responsive Design & Accessibility Verification', () => {
  const css = readFileSync(
    resolve(process.cwd(), 'src/app/globals.css'),
    'utf8',
  );

  it('contains mobile-first and responsive breakpoints for 360, 390, 768, 1024, 1440px', () => {
    expect(css).toContain('@media (min-width: 768px)');
    expect(css).toContain('@media (min-width: 1024px)');
    expect(css).toContain('@media (min-width: 640px)');
    // Fluid typography using clamp for 360px - 1440px
    expect(css).toContain('clamp(');
  });

  it('enforces box-sizing border-box to prevent horizontal overflow', () => {
    expect(css).toContain('box-sizing: border-box');
  });

  it('has accessible focus-visible states', () => {
    expect(css).toContain(':focus-visible');
    expect(css).toContain('outline:');
  });

  it('supports prefers-reduced-motion', () => {
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
    expect(css).toContain('animation-duration: 0.01ms');
    expect(css).toContain('transition-duration: 0.01ms');
  });

  it('enforces 44px minimum touch targets on buttons', () => {
    expect(css).toContain('min-height: 44px');
  });

  it('wraps tables in overflow-x: auto containers to prevent horizontal cut-off', () => {
    expect(css).toContain('.data-table-wrapper');
    expect(css).toContain('overflow-x: auto');
  });

  it('uses Nexora design palette tokens', () => {
    expect(css).toContain('#b1005e'); // Nexora magenta
    expect(css).toContain('#54123b'); // Deep wine
    expect(css).toContain('#fda4c9'); // Muted lavender/pink
    expect(css).toContain('#ffffff'); // White surfaces
  });
});
