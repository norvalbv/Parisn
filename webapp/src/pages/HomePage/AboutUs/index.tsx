import React, { ReactElement } from 'react';
import Radial from 'components/SVG/Design';
import { DASHBOARD_IMAGE } from 'constants/index';

const AboutUs = (): ReactElement => {
  return (
    <div className="relative mx-auto mb-40 flex w-9/12 items-center gap-16">
      <Radial className="right-1/4" />
      <div>
        <span className="mb-8 inline-block text-lg font-semibold uppercase tracking-[.42rem]">
          Parisn.com
        </span>
        <p>
          PARISN revolutionizes the traditional retail experience by introducing an innovative
          pricing mechanism. With us, you are empowered to decide the price you pay for your items.
          Every piece in our exclusive collection starts at a premium, reflecting its rarity and
          quality. However, as time progresses, the price of each item gracefully descends,
          eventually reaching the unique possibility of being free. This distinctive model disrupts
          the norms of conventional shopping, turning every purchase into a thrilling strategic
          decision and transforming every customer into a savvy shopper
        </p>
      </div>
      <div className="h-full w-full opacity-0">
        <img src={DASHBOARD_IMAGE} alt="p" />
      </div>
    </div>
  );
};

export default AboutUs;
