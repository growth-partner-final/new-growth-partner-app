'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CloseIcon, ArrowRightIcon } from '../ui/Icons';
import { Button } from '../ui/Button';

interface NavLinkItem {
  href: string;
  label: string;
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLinkItem[];
}

export function MobileNav({ isOpen, onClose, links }: MobileNavProps) {
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape key and trap focus
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Focus close button on open
    closeButtonRef.current?.focus();

    // Prevent body scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(56, 10, 38, 0.65)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
        aria-hidden="true"
      />

      {/* Slide-out Menu Panel */}
      <div
        ref={drawerRef}
        style={{
          position: 'relative',
          marginLeft: 'auto',
          width: '100%',
          maxWidth: '340px',
          height: '100%',
          backgroundColor: 'var(--color-surface)',
          boxShadow: 'var(--shadow-xl)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 10000,
          overflowY: 'auto',
          padding: '20px 24px 32px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '16px',
            borderBottom: '1px solid var(--color-border)',
            marginBottom: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary)',
              }}
            />
            <span style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--color-wine-dark)' }}>
              Nexora
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
              Partner
            </span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '10px',
              minWidth: '44px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-wine-dark)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Links */}
        <nav aria-label="Mobile main navigation" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '1rem',
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? 'var(--color-primary)' : 'var(--color-wine-dark)',
                  backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent',
                  minHeight: '44px',
                  transition: 'background-color 0.15s ease',
                }}
              >
                <span>{link.label}</span>
                <span style={{ color: isActive ? 'var(--color-primary)' : 'var(--color-text-light)' }} aria-hidden="true">
                  <ArrowRightIcon width={16} height={16} />
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '24px',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <Button href="/partner/signup" variant="primary" onClick={onClose} style={{ width: '100%' }}>
            Growth Partner Banein
          </Button>
          <Button href="/partner/login" variant="outline" onClick={onClose} style={{ width: '100%' }}>
            Partner Login
          </Button>
        </div>
      </div>
    </div>
  );
}
