'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MenuIcon } from '../ui/Icons';
import { Button } from '../ui/Button';
import { MobileNav } from './MobileNav';

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

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          {/* Logo / Brand */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              padding: '6px 0',
            }}
          >
            <span
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-wine) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '1.1rem',
                boxShadow: '0 2px 8px rgba(177, 0, 94, 0.3)',
              }}
            >
              N
            </span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontSize: '1.25rem',
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
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-primary)',
                  lineHeight: 1.1,
                }}
              >
                Growth Partner
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav
            aria-label="Main Navigation"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '6px',
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

          {/* Desktop CTAs */}
          <div
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '12px',
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
            aria-label="Open main navigation menu"
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

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={NAV_LINKS}
      />


    </>
  );
}
