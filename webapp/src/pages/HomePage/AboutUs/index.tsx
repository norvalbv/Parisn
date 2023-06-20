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
          Launched in 2021 allows you to choose the price you pay for your items in a reverse
          bidding strategy technique. Starting at £1,000 per item, over time the price of the item
          drops to £0.
        </p>
      </div>
      <div className="h-full w-full opacity-0">
        <img src={DASHBOARD_IMAGE} alt="p" />
      </div>
    </div>
  );
};

export default AboutUs;
