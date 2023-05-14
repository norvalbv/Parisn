import React, { ReactElement } from 'react';
import StyledLink from 'components/StyledLink/intex';
import Radial from 'components/SVG/Design';
import Phone from '../../../TempSVGImages/phone';

const HowItWorks = (): ReactElement => {
  return (
    <div className="my-10 px-20 relative">
      <div className="flex w-4/5 gap-4 items-center">
        <Phone />
        <div>
          <span>1st Choose Your Item</span>
          <p className="mb-6">
            Handpick from a carefully curated collection of exclusive brands and limited edition
            products.
          </p>
          <StyledLink to="/" />
        </div>
      </div>
      <Radial />
      <div className="flex flex-row-reverse w-4/5 gap-4 items-center relative">
        <div className="text-[32px]">
          <div className="opacity-40 ml-14">
            <span className="mr-8 text-[44px] font-normal">£</span>1,000.00
          </div>
          <div className="bg-secondary-dark rounded-3xl border border-neutral my-10 py-6 pl-10 w-96">
            <span className="mr-8 text-[44px] font-normal">£</span>500.00
          </div>
          <div className="opacity-40 ml-14">
            <span className="mr-8 text-[44px] font-normal">£</span>200.00
          </div>
        </div>
        <div>
          <span>2nd Set Your Price</span>
          <p className="mb-6">
            Set your desired price point, empowering you to take control of your shopping
            experience.
          </p>
          <StyledLink to="/" />
        </div>
      </div>
      <div className="flex w-4/5 gap-4 items-center">
        <Phone />
        <div>
          <span>3rd Win Or Wait</span>
          <p className="mb-6">
            Secure your purchase at your chosen price or hold out for a potentially better deal as
            prices continue to fall.
          </p>
          <StyledLink to="/" />
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
