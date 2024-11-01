import React, { ReactElement } from 'react';
import Radial from '@/src/components/SVG/Design';
import DASHBOARD_IMAGE from '@/public/images/dashboard-image.jpg';
const AboutUs = (): ReactElement => {
  return (
    <div className="relative mx-auto mb-20 flex w-full flex-col items-center gap-8 md:mb-40 md:w-11/12 md:flex-row md:gap-16 lg:w-9/12">
      <Radial className="right-1/4 hidden md:block" />
      <div className="w-full md:w-1/2">
        <span className="mb-4 inline-block text-base font-semibold uppercase tracking-[.42rem] md:mb-8 md:text-lg">
          Parisn.com
        </span>
        <p className="text-sm md:text-base">
          PARISN revolutionizes the traditional retail experience by introducing an innovative
          pricing mechanism. With us, you are empowered to decide the price you pay for your items.
          Every piece in our exclusive collection starts at a premium, reflecting its rarity and
          quality. However, as time progresses, the price of each item gracefully descends,
          eventually reaching the unique possibility of being free. This distinctive model disrupts
          the norms of conventional shopping, turning every purchase into a thrilling strategic
          decision and transforming every customer into a savvy shopper
        </p>
      </div>
      <div className="h-full w-full opacity-0 md:w-1/2">
        <img src={DASHBOARD_IMAGE.src} alt="p" className="h-auto w-full" />
      </div>
    </div>
  );
};

export default AboutUs;
