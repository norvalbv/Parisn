'use client';

import { type VariantProps, cva } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import React, { useState, type ReactElement } from 'react';
import Loading from '../Loading';
import { cn } from '@/lib/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text-primary disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        dark: 'text-text-primary bg-background hover:bg-zinc-800/80',
        ghost: 'text-text-primary bg-transparent hover:bg-zinc-800/20',
      },
      size: {
        xs: 'px-2 py-1.5 text-xs sm:px-3 sm:py-2',
        sm: 'px-3 py-2 text-xs sm:px-4 sm:py-2.5',
        md: 'px-4 py-2.5 text-sm sm:px-6 sm:py-3',
        lg: 'px-6 py-3 text-sm sm:px-8 sm:py-3.5 sm:text-base',
        icon: 'h-9 w-9',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-fit',
      },
      hoveredAnimation: {
        true: 'hover:scale-[1.02]',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'dark',
      size: 'md',
      fullWidth: false,
      hoveredAnimation: false,
    },
  }
);

type IconType = LucideIcon | React.ReactElement;

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    icon?: IconType;
    iconPosition?: 'left' | 'right';
    loading?: boolean;
    hoveredText?: string;
  };

const Button = ({
  className,
  variant,
  size,
  fullWidth,
  hoveredAnimation,
  icon: Icon,
  iconPosition = 'left',
  loading,
  hoveredText,
  children,
  ...props
}: Props): ReactElement => {
  const [hovered, setHovered] = useState(false);

  const renderIcon = (position: 'left' | 'right'): ReactElement | null => {
    if (!Icon) return null;

    const iconClass = `${position === 'left' ? 'mr-2' : 'ml-2'} size-6`;

    if (React.isValidElement(Icon)) {
      return React.cloneElement(Icon as ReactElement, { className: iconClass });
    }

    const LucideIcon = Icon as LucideIcon;
    return <LucideIcon strokeWidth={1} className={iconClass} />;
  };

  return (
    <button
      className={cn(
        buttonVariants({
          variant,
          size,
          fullWidth,
          hoveredAnimation,
          className,
        })
      )}
      onMouseEnter={(): void => setHovered(true)}
      onMouseLeave={(): void => setHovered(false)}
      disabled={loading}
      {...props}
    >
      {iconPosition === 'left' && renderIcon('left')}
      <span className="inline-block whitespace-nowrap tracking-wider uppercase">
        {hovered && hoveredText ? hoveredText : children}
      </span>
      {loading && <Loading className="ml-2" />}
      {iconPosition === 'right' && renderIcon('right')}
    </button>
  );
};

export default Button;
