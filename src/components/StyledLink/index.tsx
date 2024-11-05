'use client';

import { cn } from '@/lib/utils/cn';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { MouseEvent, type ReactElement, cloneElement, isValidElement } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const linkVariants = cva(
  'flex justify-center items-center gap-3 transition-colors duration-200 text-sm 2xl:text-base',
  {
    variants: {
      variant: {
        primary: 'text-slate-300 hover:text-white',
        button: 'bg-action text-background hover:bg-action/90 rounded-md px-4 py-2',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

type StyledLinkProps = {
  children?: string;
  href: string;
  icon?: LucideIcon | ReactElement;
  onClick?: (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  className?: string;
} & VariantProps<typeof linkVariants>;

const StyledLink = ({
  children,
  href,
  icon: Icon,
  onClick,
  className,
  variant,
}: StyledLinkProps): ReactElement => {
  const renderIcon = (): ReactElement | null => {
    if (!Icon) return null;

    const iconClass = 'ml-2 size-6 transition-transform duration-200 group-hover:translate-x-0.5';

    if (isValidElement(Icon)) {
      return cloneElement(Icon as ReactElement, { className: iconClass });
    }

    const LucideIcon = Icon as LucideIcon;
    return <LucideIcon strokeWidth={1.5} className={iconClass} />;
  };

  const handleClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    onClick?.(e);
  };

  return (
    <Link href={href} className={cn(linkVariants({ variant }), className)} onClick={handleClick}>
      {children}
      {Icon && renderIcon()}
    </Link>
  );
};

export default StyledLink;
