import { type VariantProps, cva, cx } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import React, { type ReactElement } from 'react';

const headerVariants = cva('', {
  variants: {
    size: {
      xs: 'text-lg sm:text-xl',
      sm: 'text-2xl',
      md: 'text-3xl sm:text-4xl',
      lg: 'text-3xl sm:text-4xl lg:text-6xl',
      xl: 'text-6xl md:text-8xl lg:text-9xl',
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
    fontWeight: {
      normal: 'font-normal',
      medium: 'font-semibold',
      bold: 'font-bold',
    },
    as: {
      h1: '',
      h2: '',
      h3: '',
    },
  },
  defaultVariants: {
    fontWeight: 'bold',
    size: 'lg',
    alignment: 'left',
    as: 'h2',
    margin: 'sm',
  },
});

export type HeaderProps = VariantProps<typeof headerVariants> & {
  title?: string;
  highlightedText?: string;
  inline?: boolean;
  icon?: LucideIcon;
  className?: string;
};

const Header = ({
  title,
  highlightedText,
  size,
  alignment,
  inline,
  as,
  icon: Icon,
  fontWeight,
  margin,
  className,
}: HeaderProps): ReactElement => {
  const Component = as || 'h2';

  return (
    <Component
      className={cx(
        headerVariants({ size, margin, alignment, as, fontWeight }),
        Icon && 'flex items-center',
        className
      )}
    >
      {Icon && (
        <span className="mr-2">
          <Icon />
        </span>
      )}
      {title && title}
      {highlightedText && (
        <>
          {!inline && title && <br />}
          {inline && '\u00A0'}
          {highlightedText.split(' ').map((word, index) => (
            <span
              key={index}
              className="inline-block bg-gradient-to-t from-teal-400 to-teal-700 bg-clip-text text-transparent"
            >
              {word}
              {index < highlightedText.split(' ').length - 1 && '\u00A0'}
            </span>
          ))}
        </>
      )}
    </Component>
  );
};

export default Header;
