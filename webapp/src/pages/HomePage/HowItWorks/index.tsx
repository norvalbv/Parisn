import React, { ReactElement } from 'react';
import StyledLink from 'components/StyledLink';
import Radial from 'components/SVG/Design';
import { PRODUCT_1_IMAGE } from 'constants/index';

const HowItWorks = (): ReactElement => {
  return (
    <section className="relative my-10 flex flex-col gap-8 md:gap-4 px-4 md:px-20">
      <div className="flex flex-col md:flex-row w-full md:w-4/5 items-center gap-4">
        <img src={PRODUCT_1_IMAGE} alt="" className="h-[300px] md:h-[400px] w-[300px] md:w-[400px] object-cover" />
        <div className="text-center md:text-left">
          <h4>Select Your Luxury</h4>
          <p className="mb-4 md:mb-6 mt-2 w-full md:w-4/5 text-primary-neutral">
            Browse our exclusive, time-sensitive collection. Watch as each item's price elegantly
            descends over time, spiralling towards zero.
          </p>
          <StyledLink to="/how-it-works#step-one" />
        </div>
      </div>
      <Radial className="hidden md:block" />
      <div className="relative flex flex-col-reverse md:flex-row w-full md:w-4/5 items-center gap-4 self-center md:self-end">
        <div className="text-[1.5rem] md:text-[2rem] w-full md:w-auto">
          <div className="ml-0 md:ml-14 opacity-40 text-center md:text-left">
            <span className="mr-4 md:mr-8 text-[2rem] md:text-[2.75rem] font-normal">£</span>1,000.00
          </div>
          <div className="border-neutral my-6 md:my-10 w-full md:w-96 rounded-3xl border bg-secondary-dark py-4 md:py-6 pl-4 md:pl-10 text-center md:text-left">
            <span className="mr-4 md:mr-8 text-[2rem] md:text-[2.75rem] font-normal">£</span>500.00
          </div>
          <div className="ml-0 md:ml-14 opacity-40 text-center md:text-left">
            <span className="mr-4 md:mr-8 text-[2rem] md:text-[2.75rem] font-normal">£</span>200.00
          </div>
        </div>
        <div className="text-center md:text-left">
          <h4>Set Your Terms</h4>
          <p className="mb-4 md:mb-6 mt-2 w-full md:w-4/5 text-primary-neutral">
            Define your ideal price point, exercising the power to customise your own shopping
            narrative.
          </p>
          <StyledLink to="/how-it-works#step-two" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full md:w-4/5 items-center gap-4 self-center">
        <img src={PRODUCT_1_IMAGE} alt="" className="h-[300px] md:h-[400px] w-[300px] md:w-[400px] object-cover" />
        <div className="text-center md:text-left">
          <h4>Claim or Wait</h4>
          <p className="mb-4 md:mb-6 mt-2 w-full md:w-4/5 text-primary-neutral">
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