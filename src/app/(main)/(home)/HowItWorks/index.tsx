'use client';

import PRODUCT_1_IMAGE from '@/public/images/profile.jpg';
import Header from '@/src/components/Header';
import PriceDisplay from '@/src/components/PriceDisplay';
import { motion, useScroll, useTransform } from 'framer-motion';
import React, { ReactElement, useRef } from 'react';
import ItemSection from './itemSection';
import WavyBackground from './Waves';
import { COMPANY_NAME } from '@/src/constants';

const MAX_PRICE = 1000;
const MIN_PRICE = 0;

const HowItWorks = (): ReactElement => {
  const containerRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: priceRef,
    offset: ['start end', 'end start'],
  });

  const rawPrice = useTransform(scrollYProgress, [0.2, 0.8], [MAX_PRICE, MIN_PRICE]);
  const price = useTransform(rawPrice, (value: number) => value.toFixed(2));

  return (
    <div className="relative h-[280vh] sm:h-[200rem] 2xl:h-[180rem]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <WavyBackground
          colors={[
            'rgba(50, 117, 248, 0.15)',
            'rgba(255, 192, 203, 0.15)',
            'rgba(255, 255, 255, 0.1)',
          ]}
          backgroundFill="transparent"
          speed="fast"
          waveOpacity={0.3}
        />
      </div>
      <section ref={containerRef} className="absolute inset-0">
        <ItemSection
          imageSrc={PRODUCT_1_IMAGE.src}
          imageAlt="Luxury product showcase"
          title="Discover Your Perfect Piece"
          description="Explore our curated collection of high quality products, uniquely yours."
        />
        <motion.div
          ref={priceRef}
          className="min-h-svh sm:min-h-[100rem] top-0 relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="sticky top-1/3 transform w-full">
            <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-8 p-4 sm:gap-16 sm:p-8 md:flex-row md:p-20">
              <div className="px-4 text-center sm:px-0 md:text-left">
                <Header title="Experience Dynamic Pricing" />
                <p className="mb-4 mt-2 w-full md:mb-6">
                  Watch prices decrease in real time across all our products. Each product is only
                  available for a short duration and will always become free if not sold.
                </p>
              </div>

              <div className="relative flex w-full justify-center md:w-2/3 md:justify-end">
                <PriceDisplay price={price} />
              </div>
            </div>
          </div>
        </motion.div>
        <ItemSection
          imageSrc={PRODUCT_1_IMAGE.src}
          imageAlt="Strategic shopping demonstration"
          title="Make Your Move"
          description="Choose your moment. Buy now at current pricing or wait for further reductions. Strategic patience may yield better prices, but popular items won't wait forever."
          isReversed
        />
      </section>
    </div>
  );
};

export default HowItWorks;
