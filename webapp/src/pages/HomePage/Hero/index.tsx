import React, { ReactElement } from 'react';
import Button from 'components/Button';
import Carousel from './Carousel';

const Hero = (): ReactElement => {
  return (
    <header className="flex h-screen justify-between pt-[7rem]">
      <section className="w-[23.8125rem]">
        <p className="h3-hairline">
          Unlock the Essence of Urban Luxury with Refined Shopping Redefined by
        </p>
        <h2 className="mb-3 mt-1 font-semibold tracking-[.42rem]">PARISN</h2>
        <p className="text-primary-neutral">
          Limited Editions, Coveted Brands, and the Thrill of Reverse Bidding
        </p>
        <Button text="Shop Now" className="mt-[3.75rem] w-72" roundedBorders="none" />
      </section>
      <Carousel />
    </header>
  );
};

export default Hero;
