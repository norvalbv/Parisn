import Header from '@/src/components/Header';
import React, { ReactElement } from 'react';

const Synopsis = (): ReactElement => {
  return (
    <section className="flex h-[30rem] sm:h-[40rem] flex-col items-center justify-center px-4 text-center md:px-0">
      <Header title="Redefining Luxury Shopping" />
      <p className="mt-6 max-w-2xl">
        Watch as prices automatically decrease over time. Choose between securing your desired item
        immediately or strategically waiting for a better price - but remember, waiting carries the
        risk of another shopper claiming it first. The choice is yours.
      </p>
    </section>
  );
};

export default Synopsis;
