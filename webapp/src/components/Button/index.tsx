import React, { ReactElement, forwardRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BorderRequired,
  borderRequiredMap,
  FontWeight,
  fontWeightMap,
  Rounded,
  roundedMap,
} from '../../types/tailwind';
import { Spinner } from '../CustomSVG';

export interface ButtonProps {
  /**
   * Text or label of button
   */
  text: string | JSX.Element;
  /**
   * Text or label for when hovered
   */
  hoveredText?: string;
  /**
   * How big the button is
   */
  size?: keyof typeof buttonSizeMap;
  /**
   * How big the border radius
   */
  rounded?: Rounded;
  /**
   * Set button width manually
   */
  width?: string;
  /**
   * Overwrite text color
   */
  color?: string;
  /**
   * Overwrite background color
   */
  backgroundColor?: string;
  /**
   * Require a hover colour?
   */
  hoverColorRequired?: boolean;
  /**
   * Is button disabled
   */
  disabled?: boolean;
  /**
   * Loading state
   */
  loading?: boolean;
  /**
   * Icon for button
   */
  icon?: JSX.Element;
  /**
   * Icon position
   */
  iconPosition?: 'left' | 'right';
  /**
   * Optional click event
   */
  onClick?: (arg1?: unknown) => void;
  /**
   * Optional mouse event
   */
  onMouseLeave?: () => void;
  /**
   * id to identify button on dom
   */
  id?: string;
  /*
   * Data attribute for testing with cypress
   */
  dataAtt?: string;
  /**
   * Text case
   */
  upperCase?: boolean;
  /**
   * Additional classes
   */
  classes?: string;
  /**
   * Positioning of button
   */
  positioning?: 'relative' | 'absolute';
  /**
   * Font weight for text
   */
  fontWeight?: FontWeight;
  /**
   * Type of button
   */
  type?: 'button' | 'submit';
  /**
   * Navigate to another page within the app
   */
  navigateTo?: string;
  /**
   * Require boarders?
   */
  borderRequired?: BorderRequired;
  /**
   * Positioning of text
   */
  textOrientation?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      backgroundColor,
      borderRequired = 'all',
      classes = '',
      color,
      dataAtt,
      disabled,
      fontWeight = 'semibold',
      hoverColorRequired = true,
      hoveredText,
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

      if (navigateTo) navigate(navigateTo);
    };

    return (
      <button
        type={type}
        className={`${positioning} inline-flex items-center ${textOrientation} ${
          hoverColorRequired && 'hover:bg-buttons-hover transition-colors duration-200'
        } ${upperCase ? 'uppercase' : ''} ${roundedMap[rounded]} ${
          buttonSizeMap[size]
        } ${classes} ${borderRequiredMap[borderRequired]} py-4`}
        style={{ width, color, backgroundColor }}
        onClick={(): void => clickHandle()}
        role="button"
        id={id}
        data-testid={dataAtt}
        disabled={disabled}
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
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
          <div className="absolute top-0 left-0 h-full w-full bg-white opacity-50">
            {text}
            <span className="float-right mt-3">
              <Spinner />
            </span>
          </div>
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
