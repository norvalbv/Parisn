import Button from 'components/Button';
import React, { ReactElement } from 'react';

const Hero = (): ReactElement => {
  return (
    <div className="bg-red-500/20 h-screen">
      <span>Unlock the Essence of Urban Luxury with Refined Shopping Redefined by</span>
      <span>PARISN</span>
      <span>Limited Editions, Coveted Brands, and the Thrill of Reverse Bidding</span>
      <Button text="Shop Now" />
    </div>
  );
};

export default Hero;
