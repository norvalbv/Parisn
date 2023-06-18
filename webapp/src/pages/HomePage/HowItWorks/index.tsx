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
          <span className="text-lg font-normal leading-[1.375rem]">1st Pick Your Desire</span>
          <p className="mb-6 mt-2 w-4/5 text-sm text-primary-neutral">
            Dive into our excliusive, time-limited products. Each item will decrease in price over a
            period of time, ultimately going to 0.
          </p>
          <StyledLink to="/" />
        </div>
      </div>
      <Radial />
      <div className="relative flex w-4/5 flex-row-reverse items-center gap-4 self-end">
        <div className="text-[32px]">
          <div className="ml-14 opacity-40">
            <span className="mr-8 text-[44px] font-normal">£</span>1,000.00
          </div>
          <div className="my-10 w-96 rounded-3xl border border-neutral bg-secondary-dark py-6 pl-10">
            <span className="mr-8 text-[44px] font-normal">£</span>500.00
          </div>
          <div className="ml-14 opacity-40">
            <span className="mr-8 text-[44px] font-normal">£</span>200.00
          </div>
        </div>
        <div>
          <span className="text-lg font-normal leading-[1.375rem]">2nd Set Your price</span>
          <p className="mb-6 mt-2 w-4/5 text-sm text-primary-neutral">
            Set your desired price point, empowering you to take control of your shopping
            experience.
          </p>
          <StyledLink to="/" />
        </div>
      </div>
      <div className="flex w-4/5 items-center gap-4 self-center">
        <img src={PRODUCT_1_IMAGE} alt="" className="h-[400px] w-[400px]" />
        <div>
          <span className="text-lg font-normal leading-[1.375rem]">3rd Win Or Wait</span>
          <p className="mb-6 mt-2 w-4/5 text-sm text-primary-neutral">
            Secure your purchase at the products current price or hold out for a potentially better
            deal as prices continue to fall and risk it becoming out of stock.
          </p>
          <StyledLink to="/" />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
