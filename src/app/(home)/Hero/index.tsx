'use client';

import { COMPANY_NAME } from '@/src/constants';
import { motion } from 'framer-motion';
import React, { ReactElement } from 'react';
import { AuroraBackground } from './AuroraBackground';
import { HoverBorderGradient } from './HoverBorderGradient';
import { TextHoverEffect } from './TextHoverEffect';


const Hero = (): ReactElement => {
  return (
    <header className="flex h-screen flex-col justify-between md:flex-row">
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 0.5, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className="relative flex flex-col items-center justify-center gap-4"
        >
          <div className="flex h-[16rem] items-center justify-center">
            <TextHoverEffect text={COMPANY_NAME} />
          </div>
          <p className="-mt-12 text-center uppercase text-white md:text-left">
            Exceptional Exclusives, A Dance of Desire and Patience, as Prices Descend Over Time
          </p>
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="flex items-center space-x-2 bg-white text-black dark:bg-black dark:text-white"
          >
            Shop Now
          </HoverBorderGradient>
        </motion.div>
      </AuroraBackground>
    </header>
  );
};

export default Hero;
