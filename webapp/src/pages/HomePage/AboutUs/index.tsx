import Radial from 'components/SVG/Design';
import React, { ReactElement } from 'react';
import PersonHoldingPhone from 'TempSVGImages/PersonHoldingPhone';

const AboutUs = (): ReactElement => {
  return (
    <div className="flex relative items-center w-1/2 mx-auto gap-8">
      <Radial />
      <div>
        <span className="mb-8 inline-block uppercase">Parisn.com</span>
        <p>
          Launched in 2021 allows you to choose the price you pay for your items in a reverse
          bidding strategy technique. Starting at £1,000 per item, over time the price of the item
          drops to £0.
        </p>
      </div>
      <PersonHoldingPhone />
    </div>
  );
};

export default AboutUs;
