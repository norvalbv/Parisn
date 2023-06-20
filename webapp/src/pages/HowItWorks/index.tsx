import React, { ReactElement } from 'react';
import CardWrapper from 'components/CardWrapper';

const HowItWorks = (): ReactElement => {
  return (
    <CardWrapper cardType="centered" className="w-1/2">
      <article className="-mt-10 flex flex-col gap-20 text-center">
        <section id="step-one">
          <h4>1st Pick Your Desire</h4>
          <p className="mt-4">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium fugiat vel
            doloribus nesciunt! Non odit reprehenderit placeat sint tempore fugit animi nemo porro
            quod ipsa, nisi provident quibusdam ipsum a ratione? Assumenda perspiciatis officia sed,
            hic vero maxime, vel dolor facilis asperiores tempora ratione ipsam fuga numquam aut
            deserunt odio!
          </p>
        </section>
        <section id="step-two">
          <h4>2nd Set Your Price</h4>
          <p className="mt-4">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium fugiat vel
            doloribus nesciunt! Non odit reprehenderit placeat sint tempore fugit animi nemo porro
            quod ipsa, nisi provident quibusdam ipsum a ratione? Assumenda perspiciatis officia sed,
            hic vero maxime, vel dolor facilis asperiores tempora ratione ipsam fuga numquam aut
            deserunt odio!
          </p>
        </section>
        <section id="step-three">
          <h4>3rd Win Or Wait</h4>
          <p className="mt-4">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium fugiat vel
            doloribus nesciunt! Non odit reprehenderit placeat sint tempore fugit animi nemo porro
            quod ipsa, nisi provident quibusdam ipsum a ratione? Assumenda perspiciatis officia sed,
            hic vero maxime, vel dolor facilis asperiores tempora ratione ipsam fuga numquam aut
            deserunt odio!
          </p>
        </section>
      </article>
    </CardWrapper>
  );
};

export default HowItWorks;
