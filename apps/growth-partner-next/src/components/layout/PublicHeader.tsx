'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MenuIcon } from '../ui/Icons';
import { Button } from '../ui/Button';
import { MobileNav } from './MobileNav';

const EXISTING_NEXORA_LOGO =
  'https://lh3.googleusercontent.com/aida/AEtjO1XZxTb-KtdsPjo0U0odHwDY485hRuwmfDBk7sy7hvncIa4xg3AdjCaLVTut6pSuuRiQJj_3YtSdqJ3TLo2klHSJMNebL6mVq0uWtOhluaULb7Cy_34No2AloAlRtDCW1-HCFGFyKGQkrv2OMGEMkXFJpEFLcxUma8v2Z1hXG0pFOlEix77UvOTw-NfNuX20oyBgVrPL--0n2ZNjrI0vKNBImBop03G0p3fTT3hR_Chdf05d_h_ZbzfoKQ';

const NAV_LINKS = [
  { href: '/programme', label: 'Programme' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/rewards', label: 'Rewards' },
  { href: '/qualification', label: 'Qualification' },
  { href: '/commission', label: 'Commission' },
  { href: '/fraud-prevention', label: 'Fraud Policy' },
  { href: '/faq', label: 'FAQ' },
  { href: '/support', label: 'Support' },
];

export function PublicHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoImageFailed, setLogoImageFailed] = useState(false);

  return (
    <>
      <header
        className="glass-surface"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 'var(--header-height)',
          }}
        >
          {/* Logo / Wordmark */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
              padding: '6px 0',
            }}
            aria-label="Nexora Growth Partner Home"
          >
            {!logoImageFailed ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={EXISTING_NEXORA_LOGO}
                alt="Nexora Logo"
                style={{
                  height: '34px',
                  width: 'auto',
                  objectFit: 'contain',
                  borderRadius: '6px',
                }}
                onError={() => setLogoImageFailed(true)}
              />
            ) : null}

            {/* Stylized Emblem Fallback / Companion */}
            {logoImageFailed && (
              <span
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  background:
                    'linear-gradient(135deg, var(--color-primary) 0%, var(--color-wine) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '1.15rem',
                  boxShadow: '0 2px 8px rgba(177, 0, 94, 0.3)',
                }}
                aria-hidden="true"
              >
                N
              </span>
            )}

            {/* Wordmark */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    color: 'var(--color-wine-dark)',
                    lineHeight: 1.1,
                  }}
                >
                  Nexora
                </span>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    backgroundColor: 'var(--color-primary-light)',
                    color: 'var(--color-primary)',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  Partner
                </span>
              </div>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.1,
                }}
              >
                Growth Partner Portal
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Public Navigation"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '4px',
            }}
            className="desktop-nav"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    padding: '8px 12px',
                    fontSize: '0.9rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'var(--color-primary)' : 'var(--color-wine-dark)',
                    borderRadius: 'var(--radius-sm)',
                    transition: 'all 0.15s ease',
                    position: 'relative',
                  }}
                  className="nav-link"
                >
                  {link.label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '2px',
                        left: '12px',
                        right: '12px',
                        height: '2px',
                        backgroundColor: 'var(--color-primary)',
                        borderRadius: '2px',
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '10px',
            }}
            className="desktop-actions"
          >
            <Button href="/partner/login" variant="ghost" size="sm">
              Partner Login
            </Button>
            <Button href="/partner/signup" variant="primary" size="sm">
              Growth Partner Banein
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              background: 'none',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--color-wine-dark)',
              cursor: 'pointer',
            }}
            className="mobile-toggle"
          >
            <MenuIcon />
          </button>
        </div>
      </header>

      {/* Accessible Mobile Navigation Drawer */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={NAV_LINKS}
      />
    </>
  );
}
