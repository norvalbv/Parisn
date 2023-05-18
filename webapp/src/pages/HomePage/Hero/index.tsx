import React, { ReactElement } from 'react';
import Button from 'components/Button';
import Carousel from './Carousel';

const Hero = (): ReactElement => {
  return (
    <header className="flex h-screen justify-between pt-[10.125rem]">
      <section className="w-[23.8125rem]">
        <p className="text-[1.5rem]">
          Unlock the Essence of Urban Luxury with Refined Shopping Redefined by
        </p>
        <h1 className="mt-1 mb-3 tracking-[.42rem]">PARISN</h1>
        <p className="text-sm text-primary-neutral">
          Limited Editions, Coveted Brands, and the Thrill of Reverse Bidding
        </p>
        <Button text="Shop Now" className="mt-[3.75rem] w-72" roundedBorders="none" />
      </section>
      <Carousel />
    </header>
  );
};

export default Hero;
