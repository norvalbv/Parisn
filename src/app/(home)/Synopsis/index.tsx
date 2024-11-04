import React, { ReactElement } from 'react';

const Synopsis = (): ReactElement => {
  return (
    <section className="flex h-[30vh] flex-col items-center justify-center px-4 text-center md:px-0">
      <p className="text-sm uppercase md:text-base">Redefining Luxury Shopping</p>
      <p className="mt-6 max-w-2xl text-sm text-gray-400 md:text-base">
        Watch as prices automatically decrease over time. Choose between securing your desired item
        immediately or strategically waiting for a better price - but remember, waiting carries the
        risk of another shopper claiming it first. The choice is yours.
      </p>
    </section>
  );
};

export default Synopsis;
