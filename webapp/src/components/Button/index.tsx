import React, { ReactElement, forwardRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BorderRequired, borderRequiredMap, FontWeight, Rounded } from 'types/tailwind';
import { Spinner } from 'components/CustomSVG';
import classNames from 'utils/classNames';

export interface ButtonProps {
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
  uppercase?: boolean;
  className?: string;
  theme?: keyof typeof themeMap;
  type?: 'button' | 'submit';
  navigateTo?: string;
  borderRequired?: BorderRequired;
  hoveredAnimation?: boolean;
  navigationState?: unknown;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      borderRequired = 'all',
      className = '',
      testId,
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
      size = 'base',
      text,
      type = 'button',
      theme = 'dark',
      uppercase = true,
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
          uppercase,
          borderRequiredMap[borderRequired],
          className,
          'items-center',
          { 'transition-all hover:scale-110': hoveredAnimation },
          {
            'transition-colors duration-200 hover:bg-buttons-hover':
              hoverColorRequired && !disabled && !loading,
          },
          {
            'cursor-default border-primary-neutral bg-primary-neutral/60 text-primary-dark':
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
          <svg width="100%" height="100%" className="absolute">
            <line x2="100%" y2="100%" stroke="darkRed" strokeWidth={2.25} />
          </svg>
        )}
        {loading && (
          <span className="absolute top-3 right-3 h-full">
            <Spinner />
          </span>
        )}
        {icon && iconPosition === 'left' && <span className="mr-2.5">{icon}</span>}
        <span className="inline-block">{hovered && hoveredText ? hoveredText : text}</span>
        {icon && iconPosition === 'right' && <span>{icon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

const themeMap = {
  light: 'text-primary-dark bg-primary-light',
  dark: 'text-primary-light bg-primary-dark',
};

const buttonSizeMap = {
  xs: 'px-1 py-2 text-sm',
  sm: 'px-5 py-2.5 text-sm',
  base: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-2.5 text-base',
};

export default React.memo(Button);
