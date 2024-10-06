import React, { ReactElement } from 'react';
import Radial from 'components/SVG/Design';
import { DASHBOARD_IMAGE } from 'constants/index';

const AboutUs = (): ReactElement => {
  return (
    <div className="relative mx-auto mb-20 md:mb-40 flex flex-col md:flex-row w-full md:w-11/12 lg:w-9/12 items-center gap-8 md:gap-16">
      <Radial className="right-1/4 hidden md:block" />
      <div className="w-full md:w-1/2">
        <span className="mb-4 md:mb-8 inline-block text-base md:text-lg font-semibold uppercase tracking-[.42rem]">
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
      <div className="w-full md:w-1/2 h-full opacity-0">
        <img src={DASHBOARD_IMAGE} alt="p" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default AboutUs;
