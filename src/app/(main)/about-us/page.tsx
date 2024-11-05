import Header from '@/src/components/Header';
import React, { ReactElement } from 'react';

const AboutUs = (): ReactElement => {
  return (
    <div className="text-center min-h-svh">
      <Header title="About Us" />
      <p>
        Welcome to PARISEN, where luxury meets authenticity. Our mission is to provide you with the finest luxury items, guaranteed to be genuine and of the highest quality.
        <span className="my-10 block">Explore our collection and experience the elegance of PARISEN.</span>
        Our site is built with modern technologies including React, TypeScript, TailwindCSS, and more to ensure a seamless and enjoyable shopping experience.
      </p>
    </div>
  );
};

export default AboutUs;
