import React, { ReactElement } from 'react';
import StyledLink from 'components/StyledLink';
import Radial from 'components/SVG/Design';
import { PRODUCT_1_IMAGE } from 'constants/index';

const HowItWorks = (): ReactElement => {
  return (
    <section className="relative my-10 flex flex-col gap-4 px-20">
      <div className="flex w-4/5 items-center gap-4">
        <img src={PRODUCT_1_IMAGE} alt="" className="h-[400px] w-[400px]" />
        <div>
          <h4>Select Your Luxury</h4>
          <p className="mb-6 mt-2 w-4/5 text-primary-neutral">
            Browse our exclusive, time-sensitive collection. Watch as each item’s price elegantly
            descends over time, spiralling towards zero.
          </p>
          <StyledLink to="/how-it-works#step-one" />
        </div>
      </div>
      <Radial />
      <div className="relative flex w-4/5 flex-row-reverse items-center gap-4 self-end">
        <div className="text-[2rem]">
          <div className="ml-14 opacity-40">
            <span className="mr-8 text-[2.75rem] font-normal">£</span>1,000.00
          </div>
          <div className="border-neutral my-10 w-96 rounded-3xl border bg-secondary-dark py-6 pl-10">
            <span className="mr-8 text-[2.75rem] font-normal">£</span>500.00
          </div>
          <div className="ml-14 opacity-40">
            <span className="mr-8 text-[2.75rem] font-normal">£</span>200.00
          </div>
        </div>
        <div>
          <h4>Set Your Terms</h4>
          <p className="mb-6 mt-2 w-4/5 text-primary-neutral">
            Define your ideal price point, exercising the power to customise your own shopping
            narrative.
          </p>
          <StyledLink to="/how-it-works#step-two" />
        </div>
      </div>
      <div className="flex w-4/5 items-center gap-4 self-center">
        <img src={PRODUCT_1_IMAGE} alt="" className="h-[400px] w-[400px]" />
        <div>
          <h4>Claim or Wait</h4>
          <p className="mb-6 mt-2 w-4/5 text-primary-neutral">
            Secure your chosen luxury at its prevailing price, or anticipate an even more attractive
            deal as prices continue to dip - but remember, waiting could lead to your desired item
            being snapped up by others.
          </p>
          <StyledLink to="/how-it-works#step-three" />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
