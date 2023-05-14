import React, { ReactElement } from 'react';
import Button from 'components/Button';
import Carousel from './Carousel';

const Hero = (): ReactElement => {
  return (
    <div className="h-screen pt-[10.125rem] flex justify-between">
      <div className="w-[23.8125rem]">
        <span className="text-[1.5rem]">
          Unlock the Essence of Urban Luxury with Refined Shopping Redefined by
        </span>
        <h2 className="mt-1 mb-3">PARISN</h2>
        <span className="text-[14px] text-primary-neutral">
          Limited Editions, Coveted Brands, and the Thrill of Reverse Bidding
        </span>
        <Button text="Shop Now" classes="mt-[3.75rem]" />
      </div>
      <Carousel />
    </div>
  );
};

export default Hero;
