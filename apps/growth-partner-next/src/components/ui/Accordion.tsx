'use client';

import { useState, useId, type ReactNode } from 'react';
import { ChevronDownIcon } from './Icons';

export interface AccordionItem {
  id?: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({
  items,
  allowMultiple = false,
  className = '',
}: AccordionProps) {
  const baseId = useId();
  const [openIds, setOpenIds] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        if (!allowMultiple) {
          next.clear();
        }
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className={`accordion-container ${className}`.trim()} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {items.map((item, index) => {
        const isOpen = openIds.has(index);
        const headerId = `acc-header-${baseId}-${index}`;
        const panelId = `acc-panel-${baseId}-${index}`;

        return (
          <div
            key={item.id ?? index}
            className="glass-card"
            style={{
              padding: '0',
              overflow: 'hidden',
              borderColor: isOpen ? 'var(--color-primary-border)' : 'var(--color-border)',
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            }}
          >
            <h3>
              <button
                type="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '18px 24px',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  minHeight: '48px',
                  fontFamily: 'inherit',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: isOpen ? 'var(--color-primary)' : 'var(--color-wine-dark)',
                  transition: 'color 0.2s ease',
                }}
              >
                <span>{item.title}</span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: isOpen ? 'var(--color-primary-light)' : 'var(--color-surface-soft)',
                    color: isOpen ? 'var(--color-primary)' : 'var(--color-text-muted)',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease, background-color 0.2s ease, color 0.2s ease',
                    flexShrink: 0,
                    marginLeft: '12px',
                  }}
                  aria-hidden="true"
                >
                  <ChevronDownIcon />
                </span>
              </button>
            </h3>
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={headerId}
                style={{
                  padding: '0 24px 22px 24px',
                  color: 'var(--color-text-muted)',
                  fontSize: '0.98rem',
                  lineHeight: 1.65,
                  borderTop: '1px solid var(--color-border-subtle)',
                  paddingTop: '16px',
                }}
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
