export const fontSizeMap = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

export type FontSize = keyof typeof fontSizeMap;

export const fontWeightMap = {
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

export type FontWeight = keyof typeof fontWeightMap;

export const borderRequiredMap = {
  all: 'border',
  none: 'none',
  bottom: 'border-b',
  top: 'border-t',
  left: 'border-l',
  right: 'border-r',
};

export type BorderRequired = keyof typeof borderRequiredMap;

export const roundedMap = {
  xs: 'rounded-xs',
  small: 'rounded-small',
  base: 'rounded',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  none: '',
};

export type Rounded = keyof typeof roundedMap;

const colourMap = {
  bluegreen: '#004B6E',
  darkpurple: '#120E44',
  purple: '#8948DC',
  green: '#00BA92',
  blue: '#1BC5DC',
  neutral: '#C0D1D9',
  dark: '#888888',
};

export type Colour = keyof typeof colourMap;

export const animationDurationMap = {
  fast: 'animate-pulse-fast',
  slow: 'animate-pulse',
};

export type AnimationDuration = keyof typeof animationDurationMap;
