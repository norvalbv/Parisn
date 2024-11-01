import React, { ReactElement } from 'react';

const Synopsis = (): ReactElement => {
  return (
    <section className="flex h-[50vh] flex-col items-center justify-center px-4 text-center md:px-0">
      <p className="text-sm uppercase md:text-base">TRANSFORM THE RULES OF SHOPPING</p>
      <h3 className="text-xl md:text-2xl lg:text-3xl">
        Unleash the Excitement of the Ultimate with
        <span className="block text-2xl font-normal leading-[2.5rem] tracking-[0.08rem] md:text-[2.625rem] md:leading-[3.125rem]">
          PARISEN
        </span>
      </h3>
    </section>
  );
};

export default Synopsis;
