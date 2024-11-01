import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export const Section = ({
  children,
  onInView,
}: {
  children: React.ReactNode;
  onInView: () => void;
}) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      onInView();
    }
  }, [inView, onInView]);

  return (
    <>
      <motion.section
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 1.25 }}
        className="hidden h-screen items-center justify-center lg:flex"
      >
        {children}
      </motion.section>
      <section className="lg:hidden">{children}</section>
    </>
  );
};
