import { ReactElement } from 'react';
import AboutUs from './AboutUs';
import Categories from './Categories';
import Hero from './Hero';
import HowItWorks from './HowItWorks';
import Newsletter from './NewsLetter';
import PickedProducts from './PickedProducts';
import Synopsis from './Synopsis';

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
