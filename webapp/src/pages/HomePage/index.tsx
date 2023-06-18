import React, { ReactElement } from 'react';
import HowItWorks from './HowItWorks';
import Categories from './Categories';
import Hero from './Hero';
import PickedProducts from './PickedProducts';
import Synopsis from './Synopsis';
import AboutUs from './AboutUs';
import Newsletter from './NewsLetter';

const HomePage = (): ReactElement => {
  return (
    <div className="overflow-hidden px-[7.5rem]">
      <Hero />
      <Synopsis />
      <HowItWorks />
      <Categories />
      <PickedProducts />
      <AboutUs />
      <Newsletter />
    </div>
  );
};

export default HomePage;
