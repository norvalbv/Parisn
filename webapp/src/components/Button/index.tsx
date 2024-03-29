import React, { ReactElement, forwardRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BorderRequired,
  borderRequiredMap,
  FontWeight,
  fontWeightMap,
  Rounded,
  roundedMap,
} from 'types';
import { Spinner } from 'components/CustomSVG';
import classNames from 'utils/classNames';

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
    },
    ref
  ): ReactElement => {
    const [hovered, setHovered] = useState(false);

    const navigate = useNavigate();
    const clickHandle = (): void => {
      if (loading) {
        return;
      }

      if (onClick) onClick();

      if (navigateTo) {
        if (navigationState) {
          navigate(navigateTo, { state: navigationState });
        } else {
          navigate(navigateTo);
        }
      }
    };

    return (
      <button
        // eslint-disable-next-line react/button-has-type
        type={type}
        className={classNames(
          buttonSizeMap[size],
          themeMap[theme],
          borderRequiredMap[borderRequired],
          roundedMap[roundedBorders],
          fontWeightMap[fontWeight],
          className,
          'relative items-center uppercase',
          { 'transition-all hover:scale-110': hoveredAnimation },
          hoverColorRequired &&
            !disabled &&
            !loading &&
            `transition-colors duration-200 hover:bg-primary-neutral/${
              theme === 'light' ? '80' : '20'
            }`,
          {
            'cursor-default border-primary-neutral bg-primary-neutral/40 text-primary-dark':
              disabled || loading,
          }
        )}
        style={{ width }}
        onClick={(): void => clickHandle()}
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
          <span className="absolute right-3 top-3 h-full">
            <Spinner />
          </span>
        )}
        {icon && iconPosition === 'left' && <span className="mr-2.5">{icon}</span>}
        <span className="inline-block tracking-[0.16rem]">
          {hovered && hoveredText ? hoveredText : text}
        </span>
        {icon && iconPosition === 'right' && <span>{icon}</span>}
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
  xs: 'px-1 py-2 text-sm',
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-2.5 text-base',
  custom: '',
};

export default React.memo(Button);
