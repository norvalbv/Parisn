import React, { ReactElement, forwardRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BorderRequired,
  borderRequiredMap,
  FontWeight,
  fontWeightMap,
  Rounded,
  roundedMap,
} from 'types/tailwind';
import { Spinner } from 'components/CustomSVG';
import classNames from 'utils/classNames';

export interface ButtonProps {
  text: string | JSX.Element;
  hoveredText?: string;
  size?: keyof typeof buttonSizeMap;
  rounded?: Rounded;
  width?: string;
  color?: string;
  backgroundColor?: string;
  hoverColorRequired?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: JSX.Element;
  iconPosition?: 'left' | 'right';
  onClick?: (arg1?: unknown) => void;
  onMouseLeave?: () => void;
  id?: string;
  testId?: string;
  upperCase?: boolean;
  className?: string;
  positioning?: 'relative' | 'absolute';
  fontWeight?: FontWeight;
  type?: 'button' | 'submit';
  navigateTo?: string;
  borderRequired?: BorderRequired;
  textOrientation?: string;
  hoveredAnimation?: boolean;
  navigationState?: unknown;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      backgroundColor,
      borderRequired = 'all',
      className = '',
      color,
      testId,
      disabled,
      fontWeight = 'semibold',
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
      positioning = 'relative',
      rounded = 'none',
      size = 'base',
      text,
      type = 'button',
      upperCase = true,
      width = '25rem',
      textOrientation = 'justify-center',
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
          positioning,
          textOrientation,
          roundedMap[rounded],
          buttonSizeMap[size],
          borderRequiredMap[borderRequired],
          className,
          'py-4 inline-flex items-center',
          { 'hover:scale-110 transition-all': hoveredAnimation },
          {
            'hover:bg-buttons-hover transition-colors duration-200':
              hoverColorRequired && !disabled && !loading,
          },
          { uppercase: upperCase },
          {
            'bg-primary-neutral/60 text-primary-dark border-primary-neutral cursor-default':
              disabled || loading,
          }
        )}
        style={{ width, color, backgroundColor }}
        onClick={(): void => clickHandle()}
        role="button"
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
        <span className={`inline-block ${fontWeightMap[fontWeight]}`}>
          {hovered && hoveredText ? hoveredText : text}
        </span>
        {icon && iconPosition === 'right' && <span>{icon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

const buttonSizeMap = {
  xs: 'px-1 py-2 text-sm',
  sm: 'px-5 py-2.5 text-sm',
  base: 'px-6 py-2.5 text-sm w-full',
  lg: 'px-8 py-2.5 text-base w-full',
};

export default React.memo(Button);
