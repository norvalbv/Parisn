import DASHBOARD_IMAGE from '@/public/images/dashboard-image.jpg';
import Header from '@/src/components/Header';
import { COMPANY_NAME } from '@/src/constants';
import React, { ReactElement } from 'react';

const AboutUs = (): ReactElement => {
  return (
    <div className="relative mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 max-w-7xl">
      <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 md:gap-16">
        <div className="w-full md:w-1/2 space-y-4 sm:space-y-6">
          <Header title={COMPANY_NAME} className="text-center md:text-left" />
          <p className="text-sm sm:text-base lg:text-lg text-center md:text-left leading-relaxed sm:leading-relaxed">
            {COMPANY_NAME} brings a fresh approach to luxury retail. Our unique pricing model starts
            items at premium rates that gradually decrease over time. This innovative system lets you
            choose when to buy - whether at initial pricing or after reductions. It's shopping
            re-imagined, where patience could lead to significant savings.
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <div className="relative rounded-lg overflow-hidden shadow-xl">
            <img
              src={DASHBOARD_IMAGE.src}
              alt={`${COMPANY_NAME} product showcase`}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
