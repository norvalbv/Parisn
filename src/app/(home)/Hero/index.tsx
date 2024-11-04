'use client';

import { COMPANY_NAME } from '@/src/constants';
import { motion } from 'framer-motion';
import React, { ReactElement } from 'react';
import { AuroraBackground } from './AuroraBackground';
import { HoverBorderGradient } from './HoverBorderGradient';
import { TextHoverEffect } from './TextHoverEffect';

const Hero = (): ReactElement => {
  return (
    <header className="relative flex h-svh flex-col justify-between md:flex-row">
      <AuroraBackground>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-svh w-full object-cover opacity-25 mix-blend-overlay"
        >
          <source src="/videos/homepage.mp4" type="video/mp4" />
        </video>
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
            Where Luxury Meets Strategic Shopping With Automatic Decreasing Prices
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
