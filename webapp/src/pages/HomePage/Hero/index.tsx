import React, { lazy, ReactElement } from 'react';
import Button from 'components/Button';
import Carousel from './Carousel';
import { useNavigate } from 'react-router-dom';

import gradientBall from 'constants/bg-animation.json';
import Lottie from 'lottie-react';
import { AuroraBackground } from './BG';
import { motion } from 'framer-motion';
import { TextHoverEffect } from './TextHoverEffect';
import { HoverBorderGradient } from './HoverBorderGradient';

const Spline = lazy(() => import('@splinetool/react-spline'));

const Hero = (): ReactElement => {
  const navigate = useNavigate();
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
            <TextHoverEffect text="PARISN" />
          </div>
          <p className="-mt-12 text-center uppercase text-white md:text-left">
            Exceptional Exclusives, A Dance of Desire and Patience, as Prices Descend Over Time
          </p>

          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="flex items-center space-x-2 bg-white text-black dark:bg-black dark:text-white"
          >
            <span>Shop Now</span>
          </HoverBorderGradient>
        </motion.div>
      </AuroraBackground>
      {/* <section className="w-full md:w-[23.8125rem] mb-8 md:mb-0">
        <p className="h3-hairline text-center md:text-left">Discover a Unique Shopping Landscape Shaped by</p>
        <h2 className="mb-3 mt-1 font-semibold tracking-[.42rem] text-center md:text-left">PARISN</h2>
        <p className="text-primary-neutral text-center md:text-left">
          Exceptional Exclusives, A Dance of Desire and Patience, as Prices Descend Over Time
        </p>
        <Button
          text="Shop Now"
          className="mt-6 md:mt-[3.75rem] w-full md:w-72 mx-auto md:mx-0"
          roundedBorders="none"
          onClick={(): void => navigate('/collections')}
        />
      </section>
      <Carousel /> */}
    </header>
  );
};

export default Hero;
