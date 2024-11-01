import React, { ReactElement, useRef } from 'react';
import StyledLink from 'components/StyledLink';
import Radial from 'components/SVG/Design';
import { PRODUCT_1_IMAGE } from 'constants/index';
import { motion, useScroll, useTransform } from 'framer-motion';
import WavyBackground from 'components/Waves';

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
    [0.2, 0.8], // Expanded range for slower price change
    [MAX_PRICE, MIN_PRICE]
  );

  const price = useTransform(rawPrice, (value: number) => value.toFixed(2));

  return (
    <div className="relative min-h-[400vh]">
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
              src={PRODUCT_1_IMAGE}
              alt=""
              className="w-[250px] rounded-xl object-cover sm:w-[300px] md:h-[400px] md:w-[400px]"
            />
            <div className="px-4 text-center sm:px-0 md:text-left">
              <h4 className="text-xl font-semibold uppercase tracking-wide sm:text-2xl">
                Select Your Luxury
              </h4>
              <p className="mb-4 mt-2 w-full text-sm leading-relaxed text-primary-neutral/80 sm:text-base md:mb-6 md:w-4/5">
                Browse our exclusive, time-sensitive collection. Watch as each item's price
                elegantly descends over time, spiralling towards zero.
              </p>
              <StyledLink to="/how-it-works#step-one" />
            </div>
          </div>
        </div>

        <div ref={priceRef} className="flex min-h-[150vh] items-center">
          <div className="sticky top-1/2 w-full -translate-y-1/2">
            <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-8 p-4 sm:gap-16 sm:p-8 md:flex-row md:p-20">
              <div className="w-full space-y-4 text-center sm:space-y-6 md:w-1/3 md:text-left">
                <h3 className="text-2xl font-semibold uppercase tracking-wide sm:text-3xl">
                  Watch The Price Drop
                </h3>
                <p className="px-4 text-base font-light leading-relaxed text-primary-neutral/80 sm:px-0 sm:text-lg">
                  Our dynamic pricing system ensures you get the best deal. The longer you wait, the
                  lower the price - but don't wait too long!
                </p>
              </div>

              <div className="relative flex w-full justify-center md:w-2/3 md:justify-end">
                <motion.div
                  className="z-40 flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex h-[100px] w-[280px] items-center justify-start rounded-2xl border border-white/10 bg-gradient-to-br from-black/90 via-black/80 to-black/60 px-6 shadow-2xl backdrop-blur-xl transition-all hover:border-white/20 sm:h-[140px] sm:w-[340px] sm:px-10">
                    <div className="flex items-center text-white">
                      <span className="mr-4 text-[3rem] font-extralight tracking-tighter sm:mr-6 sm:text-[4rem]">
                        £
                      </span>
                      <motion.span className="text-[3rem] font-extralight tracking-tighter sm:text-[4rem]">
                        <motion.span style={{ display: 'inline-block' }}>{price}</motion.span>
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-screen items-center">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-4 sm:gap-4 sm:p-8 md:w-4/5 md:flex-row md:p-20">
            <img
              src={PRODUCT_1_IMAGE}
              alt=""
              className="w-[250px] rounded-xl object-cover sm:w-[300px] md:h-[400px] md:w-[400px]"
            />
            <div className="px-4 text-center sm:px-0 md:text-left">
              <h4 className="text-xl font-semibold uppercase tracking-wide sm:text-2xl">
                Claim or Wait
              </h4>
              <p className="mb-4 mt-2 w-full text-sm leading-relaxed text-primary-neutral/80 sm:text-base md:mb-6 md:w-4/5">
                Secure your chosen luxury at its prevailing price, or anticipate an even more
                attractive deal as prices continue to dip - but remember, waiting could lead to your
                desired item being snapped up by others.
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
