import React, { ReactElement } from 'react';
import HowItWorks from 'pages/HowItWorks';
import Categories from './Categories';
import Hero from './Hero';
import PickedProducts from './PickedProducts';
import Synopsis from './Synopsis';
import AboutUs from './AboutUs';
import Newsletter from './NewsLetter';

const HomePage = (): ReactElement => {
  return (
    <>
      <Hero />
      <Synopsis />
      <HowItWorks />
      <Categories />
      <PickedProducts />
      <AboutUs />
      <Newsletter />
    </>
  );
};

export default HomePage;
