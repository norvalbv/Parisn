import React, { ReactElement } from 'react';
import Button from 'components/Button';
import Carousel from './Carousel';

const Hero = (): ReactElement => {
  return (
    <div className="h-screen pt-[10.125rem] px-32 flex justify-between">
      <div className="w-[23.8125rem]">
        <h2 className="text-h2">
          Unlock the Essence of Urban Luxury with Refined Shopping Redefined by
        </h2>
        <h1 className="text-h1">PARISN</h1>
        <h3 className="text-h3">
          Limited Editions, Coveted Brands, and the Thrill of Reverse Bidding
        </h3>
        <Button text="Shop Now" />
      </div>
      <Carousel />
    </div>
  );
};

export default Hero;
