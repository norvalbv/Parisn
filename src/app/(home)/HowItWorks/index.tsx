'use client';

import React, { ReactElement, useRef } from 'react';
import StyledLink from '@/src/components/StyledLink';
import PRODUCT_1_IMAGE from '@/public/images/shoe.jpg';
import { motion, useScroll, useTransform } from 'framer-motion';
import WavyBackground from '@/src/components/Waves';

const MAX_PRICE = 1000;
const MIN_PRICE = 0;

const HowItWorks = (): ReactElement => {
  const containerRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: priceRef,
    offset: ['start end', 'end start'],
  });

  const rawPrice = useTransform(
    scrollYProgress,
    [0.2, 0.8],
    [MAX_PRICE, MIN_PRICE]
  );

  const price = useTransform(rawPrice, (value: number) => value.toFixed(2));

  return (
    <div className="relative min-h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <WavyBackground
          colors={[
            'rgba(50, 117, 248, 0.15)', 
            'rgba(255, 192, 203, 0.15)',
            'rgba(255, 255, 255, 0.1)',
          ]}
          backgroundFill="transparent"
          speed="slow"
          waveOpacity={0.3}
        />
      </div>

      <section ref={containerRef} className="absolute inset-0 py-10 sm:py-20">
        <div className="flex h-screen items-center">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-4 sm:gap-4 sm:p-8 md:w-4/5 md:flex-row md:p-20">
            <img
              src={PRODUCT_1_IMAGE.src}
              alt="Luxury product showcase"
              className="w-[250px] rounded-xl object-cover sm:w-[300px] md:h-[400px] md:w-[400px]"
            />
            <div className="px-4 text-center sm:px-0 md:text-left">
              <h4 className="text-xl font-semibold uppercase tracking-wide sm:text-2xl">
                Discover Your Perfect Piece
              </h4>
              <p className="mb-4 mt-2 w-full text-sm leading-relaxed text-primary-neutral/80 sm:text-base md:mb-6 md:w-4/5">
                Explore our curated collection of luxury items. Hand curated by our team of experts,
                uniquely yours.
              </p>
            </div>
          </div>
        </div>

        <motion.div ref={priceRef} className="flex min-h-[150vh] md:min-h-dvh items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}>
          <div className="sticky top-1/2 w-full -translate-y-1/2">
            <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-8 p-4 sm:gap-16 sm:p-8 md:flex-row md:p-20">
              <div className="w-full space-y-4 text-center sm:space-y-6 md:w-1/3 md:text-left">
                <h4 className="text-xl font-semibold uppercase tracking-wide sm:text-2xl">
                  Experience Dynamic Pricing
                </h4>
                <p className="mb-4 mt-2 w-full text-sm leading-relaxed text-primary-neutral/80 sm:text-base md:mb-6">
                  <span>Watch prices decrease in real-time. Our innovative system rewards patience,
                  but remember - popular items may sell quickly at higher prices.</span>
                </p>
              </div>

              <div className="relative flex w-full justify-center md:w-2/3 md:justify-end">
                <div className="group relative flex h-[120px] w-[300px] items-center justify-start overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-zinc-900/90 via-zinc-900/80 to-zinc-800/60 px-8 shadow-[0_0_50px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:shadow-[0_0_80px_rgba(0,0,0,0.4)] sm:h-[160px] sm:w-[380px] sm:px-12">
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl transition-all duration-500 group-hover:bg-blue-500/30" />
                  <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-pink-500/20 blur-3xl transition-all duration-500 group-hover:bg-pink-500/30" />
                  <div className="relative flex items-center text-white">
                    <span className="mr-4 text-[3.5rem] font-extralight tracking-tighter sm:mr-6 sm:text-[4.5rem]">
                      £
                    </span>
                    <motion.span className="text-[3.5rem] font-extralight tracking-tighter sm:text-[4.5rem]">
                      <motion.span style={{ display: 'inline-block' }}>{price}</motion.span>
                    </motion.span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex h-screen items-center">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-4 sm:gap-4 sm:p-8 md:w-4/5 md:flex-row md:p-20">
            <img
              src={PRODUCT_1_IMAGE.src}
              alt="Strategic shopping demonstration"
              className="w-[250px] rounded-xl object-cover sm:w-[300px] md:h-[400px] md:w-[400px]"
            />
            <div className="px-4 text-center sm:px-0 md:text-left">
              <h4 className="text-xl font-semibold uppercase tracking-wide sm:text-2xl">
                Make Your Move
              </h4>
              <p className="mb-4 mt-2 w-full text-sm leading-relaxed text-primary-neutral/80 sm:text-base md:mb-6 md:w-4/5">
                Choose your moment - buy now at current pricing or wait for further reductions.
                Strategic patience may yield better prices, but popular items won't wait forever.
              </p>
              <StyledLink to="/how-it-works#step-three" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
