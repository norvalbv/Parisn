'use client';

import CardWrapper from '@/src/components/CardWrapper';
import gradientBall from '@/src/constants/gradient-ball.json';
import Lottie from 'lottie-react';
import React, { ReactElement } from 'react';
import { SECURITY_DESCRIPTION } from './constants';

const SecuritySection = (): ReactElement => {
  return (
    <CardWrapper className="flex h-[50rem] max-h-screen flex-col items-center justify-center px-4 py-8 md:flex-row md:px-8">
      <Lottie
        animationData={gradientBall}
        loop={true}
        className="mb-8 w-full max-w-[18rem] md:mb-0 md:w-1/2 md:max-w-[24rem]"
      />
      <div className="w-full text-center md:w-1/2 md:text-left">
        <h3 className="mb-4 max-md:text-center md:mb-6">
          Authentic Luxury
          <br />
          Guaranteed.
        </h3>
        <p className="mb-6 text-sm md:text-base text-text-secondary">{SECURITY_DESCRIPTION}</p>
      </div>
    </CardWrapper>
  );
};

export default SecuritySection;
