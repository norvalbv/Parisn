'use client';

import { COMPANY_NAME } from '@/src/constants';
import { motion } from 'framer-motion';
import React, { ReactElement } from 'react';
import { AuroraBackground } from './AuroraBackground';
import { TextHoverEffect } from './TextHoverEffect';
import Button from '@/src/components/Button';

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
          <h1 className="flex w-full h-fit items-center justify-center">
            <TextHoverEffect text={COMPANY_NAME} />
          </h1>
          <p className="-mt-6 sm:-mt-10 text-center uppercase px-4 sm:px-10">
            Where Luxury Meets Strategic Shopping With Automatic Decreasing Prices
          </p>
          <Button>
            PRE REGISTER
          </Button>
        </motion.div>
      </AuroraBackground>
    </header>
  );
};

export default Hero;
