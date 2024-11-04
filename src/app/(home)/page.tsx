import { ReactElement } from 'react';
import AboutUs from './AboutUs';
import Hero from './Hero';
import HowItWorks from './HowItWorks';
import Newsletter from './NewsLetter';
import SecuritySection from './SecuritySection';
import Synopsis from './Synopsis';

const HomePage = (): ReactElement => {
  return (
    <>
      <Hero />
      <Synopsis />
      <HowItWorks />
      <SecuritySection />
      <AboutUs />
      <Newsletter />
    </>
  );
};

export default HomePage;
