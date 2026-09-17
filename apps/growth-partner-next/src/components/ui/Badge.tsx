import type { HTMLAttributes, ReactNode } from 'react';

export type BadgeVariant =
  | 'magenta'
  | 'wine'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

export function Badge({
  variant = 'magenta',
  children,
  className = '',
  ...props
}: BadgeProps) {
  return (
    <span className={`badge badge-${variant} ${className}`.trim()} {...props}>
      {children}
    </span>
  );
}
