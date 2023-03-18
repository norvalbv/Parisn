import React, { ReactElement } from 'react';
import { Colour } from 'types/tailwind';

export interface RadialProps {
  size?: keyof typeof sizeMap;
  colour?: Colour;
  classes?: string;
}

const Radial = ({
  size = 'xl',
  colour = 'darkpurple',
  classes = '',
}: RadialProps): ReactElement => {
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
