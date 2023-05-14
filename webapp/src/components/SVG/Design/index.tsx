import React, { ReactElement } from 'react';

type RadialProps = {
  backgroundColor?: keyof typeof backgroundColorMap;
};

const Radial = ({ backgroundColor = 'green' }: RadialProps): ReactElement => {
  return (
    <svg
      className="absolute w-[25.875rem] h-[62.5rem] -top-40 rotate-[-80deg] blur-[150px]"
      style={{
        backgroundColor: backgroundColorMap[backgroundColor],
      }}
    />
  );
};

const backgroundColorMap = {
  purple: '#9E00FF25',
  green: '#00640030',
};

export default Radial;
