import { FC, ReactElement } from 'react';

interface RadialProps {
  size?: keyof typeof sizeMap;
  colour?: keyof typeof colourMap;
  classes?: string;
}

const Radial: FC<RadialProps> = ({
  size = 'lg',
  colour = '#004B6E',
  classes = '',
}): ReactElement => {
  return (
    <svg
      className={`absolute rounded-full opacity-20 blur-3xl z-0 ${classes}`}
      style={{
        backgroundColor: colour,
        width: sizeMap[size],
        height: sizeMap[size],
      }}
    />
  );
};

export default Radial;

const sizeMap = {
  sm: '15rem',
  md: '25rem',
  lg: '35rem',
  xl: '40rem',
  '2xl': '45rem',
};

const colourMap = {
  bluegreen: '#004B6E',
  darkpurple: '#120E44',
  purple: '#8948DC',
  green: '#00BA92',
  blue: '#1BC5DC',
  neutral: '#C0D1D9',
  dark: '#888888',
};
