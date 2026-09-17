import Link from 'next/link';
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'outline-wine' | 'ghost';

interface BaseButtonProps {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

type AsButtonProps = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type AsLinkProps = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = AsButtonProps | AsLinkProps;

export function Button({
  variant = 'primary',
  children,
  className = '',
  size = 'md',
  ...rest
}: ButtonProps) {
  const variantClass = `btn-${variant}`;
  const sizeStyle =
    size === 'sm'
      ? { minHeight: '38px', padding: '6px 16px', fontSize: '0.85rem' }
      : size === 'lg'
        ? { minHeight: '52px', padding: '12px 28px', fontSize: '1.05rem' }
        : {};

  const fullClassName = `btn ${variantClass} ${className}`.trim();

  if ('href' in rest && rest.href) {
    const { href, ...linkProps } = rest as AsLinkProps;
    return (
      <Link href={href} className={fullClassName} style={sizeStyle} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as AsButtonProps;
  return (
    <button type="button" className={fullClassName} style={sizeStyle} {...buttonProps}>
      {children}
    </button>
  );
}
