import React, { ReactElement } from 'react';
import Button from 'components/Button';
import Carousel from './Carousel';
import { useNavigate } from 'react-router-dom';

const Hero = (): ReactElement => {
  const navigate = useNavigate();
  return (
    <header className="flex flex-col md:flex-row h-screen justify-between pt-20 md:pt-[7rem]">
      <section className="w-full md:w-[23.8125rem] mb-8 md:mb-0">
        <p className="h3-hairline text-center md:text-left">Discover a Unique Shopping Landscape Shaped by</p>
        <h2 className="mb-3 mt-1 font-semibold tracking-[.42rem] text-center md:text-left">PARISN</h2>
        <p className="text-primary-neutral text-center md:text-left">
          Exceptional Exclusives, A Dance of Desire and Patience, as Prices Descend Over Time
        </p>
        <Button
          text="Shop Now"
          className="mt-6 md:mt-[3.75rem] w-full md:w-72 mx-auto md:mx-0"
          roundedBorders="none"
          onClick={(): void => navigate('/collections')}
        />
      </section>
      <Carousel />
    </header>
  );
};

export default Hero;
