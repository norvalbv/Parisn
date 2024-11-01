import clsx from 'clsx';
import React, { ReactElement } from 'react';

type RadialProps = {
  colour?: keyof typeof colourMap;
  className?: string;
};

const Radial = ({ colour = 'green', className }: RadialProps): ReactElement => {
  return (
    <svg
      className={clsx(
        'absolute -top-10 -z-10 h-[62.5rem] w-[25.875rem] rotate-[-80deg] blur-[9rem]',
        className
      )}
      style={{
        backgroundColor: colourMap[colour],
      }}
    />
  );
};

const colourMap = {
  purple: '#9E00FF25',
  green: '#00640030',
};

export default Radial;
