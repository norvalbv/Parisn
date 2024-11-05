'use client';

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { useAnimationFrame, useMotionValue } from "framer-motion";
import type { LucideIcon } from 'lucide-react';
import React, { useRef, useState, type ReactElement } from 'react';
import Loading from '../Loading';
import { MovingBorder } from '@/src/app/(main)/(home)/Hero/MovingBorder';

const buttonVariants = cva(
  'inline-flex rounded-md items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-action text-background hover:bg-action/90',
      },
      size: {
        xs: 'h-8 px-2.5 text-xs',
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-11 px-6 text-base',
        icon: 'h-10 w-10',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-fit',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
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
    animate?: boolean;
    duration?: number;
    as?: any;
    borderClassName?: string;
  };

const Button = ({
  className,
  variant,
  size,
  fullWidth,
  icon: Icon,
  iconPosition = 'left',
  loading,
  hoveredText,
  children,
  animate = false,
  duration = 2000,
  as: Component = "button",
  borderClassName,
  ...props
}: Props): ReactElement => {
  const [hovered, setHovered] = useState(false);
  const pathRef = useRef<any>();
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    if (!animate) return;
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const renderIcon = (position: 'left' | 'right'): ReactElement | null => {
    if (!Icon) return null;

    const iconClass = `${position === 'left' ? 'mr-2' : 'ml-2'} size-5`;

    if (React.isValidElement(Icon)) {
      return React.cloneElement(Icon as ReactElement, { className: iconClass });
    }

    const LucideIcon = Icon as LucideIcon;
    return <LucideIcon strokeWidth={1.5} className={iconClass} />;
  };

  const buttonContent = (
    <>
      {iconPosition === 'left' && renderIcon('left')}
      <span className="inline-block whitespace-nowrap tracking-wider uppercase">
        {hovered && hoveredText ? hoveredText : children}
      </span>
      {loading && <Loading className="ml-2" />}
      {iconPosition === 'right' && renderIcon('right')}
    </>
  );

  const baseButtonClasses = buttonVariants({
    variant,
    size,
    fullWidth,
    className,
  });

  if (animate) {
    return (
      <Component
        className="bg-transparent relative text-xl  h-16 w-40 p-[1px] overflow-hidden "
      style={{
        borderRadius: `8px`,
      }}
      {...props}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(8px * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 opacity-[0.8] bg-[radial-gradient(var(--sky-500)_40%,transparent_60%)]",
              borderClassName
            )}
          />
        </MovingBorder>
      </div>
 
      <div
        className={cn(
          "relative bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased",
          'bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800'
        )}
        style={{
          borderRadius: `calc(8px * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>

    );
  }

  return (
    <button
      className={baseButtonClasses}
      onMouseEnter={(): void => setHovered(true)}
      onMouseLeave={(): void => setHovered(false)}
      disabled={loading}
      {...props}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
