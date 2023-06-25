import React, { ReactElement } from 'react';
import Button from 'components/Button';
import Carousel from './Carousel';
import { useNavigate } from 'react-router-dom';

const Hero = (): ReactElement => {
  const navigate = useNavigate();
  return (
    <header className="flex h-screen justify-between pt-[7rem]">
      <section className="w-[23.8125rem]">
        <p className="h3-hairline">Discover a Unique Shopping Landscape Shaped by</p>
        <h2 className="mb-3 mt-1 font-semibold tracking-[.42rem]">PARISN</h2>
        <p className="text-primary-neutral">
          Exceptional Exclusives, A Dance of Desire and Patience, as Prices Descend Over Time
        </p>
        <Button
          text="Shop Now"
          className="mt-[3.75rem] w-72"
          roundedBorders="none"
          onClick={(): void => navigate('/collections')}
        />
      </section>
      <Carousel />
    </header>
  );
};

export default Hero;
