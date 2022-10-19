import React from 'react';

export type PriceDecreaseProps = {
  duration?: number;
};

const PriceDecrease = ({ duration = 1000 }: PriceDecreaseProps) => {
  return <div>PriceDecrease</div>;
};

export default PriceDecrease;
