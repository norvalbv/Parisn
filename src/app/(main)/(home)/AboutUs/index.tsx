import DASHBOARD_IMAGE from '@/public/images/dashboard-image.jpg';
import Header from '@/src/components/Header';
import { COMPANY_NAME } from '@/src/constants';
import React, { ReactElement } from 'react';

const AboutUs = (): ReactElement => {
  return (
    <div className="relative mx-auto mb-20 flex w-full flex-col items-center gap-8 md:mb-40 md:w-11/12 md:flex-row md:gap-16 lg:w-9/12">
      <div className="w-full md:w-1/2">
        <Header title={COMPANY_NAME} />
        <p>
          {COMPANY_NAME} brings a fresh approach to luxury retail. Our unique pricing model starts
          items at premium rates that gradually decrease over time. This innovative system lets you
          choose when to buy - whether at initial pricing or after reductions. It's shopping
          re-imagined, where patience could lead to significant savings.
        </p>
      </div>
      <div className="h-full w-full md:w-1/2">
        <img
          src={DASHBOARD_IMAGE.src}
          alt={`${COMPANY_NAME} product showcase`}
          className="h-auto w-full"
        />
      </div>
    </div>
  );
};

export default AboutUs;
