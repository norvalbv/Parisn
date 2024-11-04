import React, { ReactElement } from 'react';
import DASHBOARD_IMAGE from '@/public/images/dashboard-image.jpg';
import { COMPANY_NAME } from '@/src/constants';

const AboutUs = (): ReactElement => {
  return (
    <div className="relative mx-auto mb-20 flex w-full flex-col items-center gap-8 md:mb-40 md:w-11/12 md:flex-row md:gap-16 lg:w-9/12">
      <div className="w-full md:w-1/2">
        <h4 className="mb-4 inline-block text-2xl font-semibold uppercase tracking-[.42rem] md:mb-8 md:text-3xl">
          {COMPANY_NAME}.com
        </h4>
        <p className="text-sm md:text-base">
          {COMPANY_NAME} brings a fresh approach to luxury retail. Our unique pricing model starts items at premium rates 
          that gradually decrease over time. This innovative system lets you choose when to buy - whether at initial 
          pricing or after reductions. It's shopping reimagined, where patience could lead to significant savings.
        </p>
      </div>
      <div className="h-full w-full md:w-1/2">
        <img src={DASHBOARD_IMAGE.src} alt="p" className="h-auto w-full" />
      </div>
    </div>
  );
};

export default AboutUs;
