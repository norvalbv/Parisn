import React, { ReactElement, forwardRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

interface ButtonProps {
  /**
   * Text or label of button
   */
  text: string;
  /**
   * Text or label for when hovered
   */
  hoveredText?: string;
  /**
   * How big the button
   */
  size?: keyof typeof buttonSizeMap;
  /**
   * How big the border radius
   */
  rounded?: keyof typeof buttonRadiusMap;
  /**
   * Set button width manually
   */
  width?: number;
  /**
   * Overwrite text color
   */
  color?: string;
  /**
   * Overwrite background color
   */
  backgroundColor?: string;
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
  onClick?: () => void;
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
   * Font weight for text
   */
  fontWeight?: keyof typeof fontWeightMap;
  /**
   * Type of button
   */
  type?: 'button' | 'submit';
  /**
   * Navigate to another page within the app
   */
  navigateTo?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      text,
      hoveredText,
      size = 'base',
      rounded = 'none',
      width = '25rem',
      color,
      backgroundColor,
      disabled,
      loading = false,
      icon,
      iconPosition = 'left',
      onClick,
      id,
      dataAtt,
      upperCase = true,
      classes = '',
      fontWeight = 'semibold',
      type = 'button',
      navigateTo,
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

    console.log(hovered, hoveredText);

    return (
      <button
        type={type}
        className={`relative inline-flex items-center justify-center text-center hover:bg-buttons-hover ${
          upperCase ? 'uppercase' : ''
        } ${buttonRadiusMap[rounded]} ${buttonSizeMap[size]} ${classes} border py-4`}
        style={{ width, color, backgroundColor }}
        onClick={(): void => clickHandle()}
        role="button"
        id={id}
        data-testid={dataAtt}
        disabled={disabled}
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {disabled && <div className="absolute top-0 left-0 h-full w-full bg-white opacity-50" />}
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
          {hovered ? hoveredText : text}
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

const buttonRadiusMap = {
  xs: 'rounded-xs',
  small: 'rounded-small',
  base: 'rounded',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  none: '',
};

const fontWeightMap = {
  thin: 'font-thin',
  extralight: 'font-extralight',
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
  black: 'font-black',
};

export default React.memo(Button);
