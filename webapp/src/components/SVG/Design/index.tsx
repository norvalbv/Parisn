import React, { ReactElement } from 'react';

type RadialProps = {
  colour?: keyof typeof colourMap;
};

const Radial = ({ colour = 'green' }: RadialProps): ReactElement => {
  return (
    <svg
      className="absolute -top-40 z-0 h-[62.5rem] w-[25.875rem] rotate-[-80deg] blur-[150px]"
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
