import type { HTMLAttributes, ReactNode } from 'react';

type CardVariant = 'glass' | 'glass-hover' | 'wine' | 'magenta' | 'soft';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  children: ReactNode;
  className?: string;
}

export function Card({
  variant = 'glass',
  children,
  className = '',
  ...props
}: CardProps) {
  let variantClass = 'glass-card';
  if (variant === 'glass-hover') variantClass = 'glass-card glass-card-hover';
  else if (variant === 'wine') variantClass = 'wine-gradient-card';
  else if (variant === 'magenta') variantClass = 'magenta-gradient-card';
  else if (variant === 'soft') variantClass = 'soft-card';

  return (
    <div className={`${variantClass} ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
