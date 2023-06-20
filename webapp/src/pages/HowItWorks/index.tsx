import CardWrapper from 'components/CardWrapper';
import React, { ReactElement } from 'react';

const HowItWorks = (): ReactElement => {
  return (
    <CardWrapper cardType="centered" className="w-1/2">
      <p className="text-center">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium fugiat vel doloribus
        nesciunt! Non odit reprehenderit placeat sint tempore fugit animi nemo porro quod ipsa, nisi
        provident quibusdam ipsum a ratione? Assumenda perspiciatis officia sed, hic vero maxime,
        vel dolor facilis asperiores tempora ratione ipsam fuga numquam aut deserunt odio!
      </p>
    </CardWrapper>
  );
};

export default HowItWorks;
