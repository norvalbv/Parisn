import clsx from 'clsx';
import { Spinner } from '@/src/components/CustomSVG';
import React, { forwardRef, ReactElement, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  BorderRequired,
  borderRequiredMap,
  FontWeight,
  fontWeightMap,
  Rounded,
  roundedMap,
} from '@/src/types';

export type ButtonProps = {
  text: string | JSX.Element;
  hoveredText?: string;
  size?: keyof typeof buttonSizeMap;
  width?: string;
  hoverColorRequired?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: JSX.Element;
  iconPosition?: 'left' | 'right';
  onClick?: (arg1?: unknown) => void;
  onMouseLeave?: () => void;
  id?: string;
  testId?: string;
  className?: string;
  theme?: keyof typeof themeMap;
  type?: 'button' | 'submit';
  navigateTo?: string;
  borderRequired?: BorderRequired;
  hoveredAnimation?: boolean;
  navigationState?: unknown;
  roundedBorders?: Rounded;
  fontWeight?: FontWeight;
  fullWidth?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      borderRequired = 'all',
      className = '',
      testId,
      roundedBorders = 'md',
      fontWeight = 'normal',
      disabled,
      hoverColorRequired = true,
      hoveredText,
      hoveredAnimation = false,
      icon,
      iconPosition = 'left',
      id,
      loading = false,
      navigateTo,
      onClick,
      onMouseLeave,
      size = 'md',
      text,
      type = 'button',
      theme = 'dark',
      width,
      navigationState,
      fullWidth = false,
    },
    ref
  ): ReactElement => {
    const [hovered, setHovered] = useState(false);
    const router = useRouter();

    const clickHandle = (): void => {
      if (loading) return;
      if (onClick) onClick();
      if (navigateTo) {
        if (navigationState) {
          // router.push(navigateTo, { state: navigationState });
          router.push(navigateTo);
        } else {
          router.push(navigateTo);
        }
      }
    };

    return (
      <button
        type={type}
        className={clsx(
          buttonSizeMap[size],
          themeMap[theme],
          borderRequiredMap[borderRequired],
          roundedMap[roundedBorders],
          fontWeightMap[fontWeight],
          className,
          'relative items-center uppercase transition-all duration-200',
          fullWidth && 'w-full',
          { 'hover:scale-[1.02]': hoveredAnimation },
          hoverColorRequired &&
            !disabled &&
            !loading &&
            `hover:bg-primary-neutral/${theme === 'light' ? '80' : '20'}`,
          {
            'cursor-default border-primary-neutral bg-primary-neutral/40 text-primary-dark':
              disabled || loading,
          }
        )}
        style={{ width: fullWidth ? '100%' : width }}
        onClick={clickHandle}
        id={id}
        data-testid={testId}
        disabled={disabled}
        ref={ref}
        onMouseEnter={(): void => setHovered(true)}
        onMouseLeave={(): void => {
          setHovered(false);
          if (onMouseLeave) onMouseLeave();
        }}
      >
        {disabled && (
          <svg width="100%" height="100%" className="absolute left-0 top-0">
            <line x2="100%" y2="100%" stroke="darkRed" strokeWidth={2.25} />
          </svg>
        )}
        {loading && (
          <span className="absolute right-2 top-1/2 -translate-y-1/2">
            <Spinner className="h-4 w-4 animate-spin" />
          </span>
        )}
        <span className="flex items-center justify-center gap-2">
          {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
          <span className="inline-block whitespace-nowrap tracking-wider">
            {hovered && hoveredText ? hoveredText : text}
          </span>
          {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';

const themeMap = {
  light: 'text-primary-dark bg-primary-light',
  dark: 'text-primary-light bg-primary-dark',
  ghost: 'text-primary-light bg-transparent',
};

const buttonSizeMap = {
  xs: 'px-2 py-1.5 text-xs sm:px-3 sm:py-2',
  sm: 'px-3 py-2 text-xs sm:px-4 sm:py-2.5',
  md: 'px-4 py-2.5 text-sm sm:px-6 sm:py-3',
  lg: 'px-6 py-3 text-sm sm:px-8 sm:py-3.5 sm:text-base',
  custom: '',
};

export default React.memo(Button);
