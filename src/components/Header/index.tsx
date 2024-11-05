import { type VariantProps, cva, cx } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import React, { type ReactElement } from 'react';

const headerVariants = cva('text-center sm:text-left', {
  variants: {
    size: {
      xs: 'text-base sm:text-lg',
      sm: 'text-lg sm:text-xl',
      md: 'text-xl sm:text-2xl',
      lg: 'text-2xl sm:text-3xl',
      xl: 'text-3xl sm:text-4xl',
    },
    alignment: {
      center: 'text-center',
      left: 'text-left',
    },
    margin: {
      none: '',
      sm: 'mb-4',
      md: 'mb-8',
    },
    uppercase: {
      true: 'uppercase',
      false: '',
    },
    as: {
      h1: '',
      h2: '',
      h3: '',
    },
  },
  defaultVariants: {
    size: 'lg',
    alignment: 'left',
    as: 'h2',
    margin: 'sm',
    uppercase: true,
  },
});

export type HeaderProps = VariantProps<typeof headerVariants> & {
  title?: string;
  icon?: LucideIcon;
  className?: string;
};

const Header = ({
  title,
  size,
  alignment,
  as,
  icon: Icon,
  margin,
  className,
}: HeaderProps): ReactElement => {
  const Component = as || 'h2';

  return (
    <Component
      className={cx(
        headerVariants({ size, margin, alignment, as }),
        Icon && 'flex items-center tracking-widest',
        className
      )}
    >
      {Icon && (
        <span className="mr-2">
          <Icon />
        </span>
      )}
      {title}
    </Component>
  );
};

export default Header;
