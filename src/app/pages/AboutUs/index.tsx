import React, { ReactElement } from 'react';
import CardWrapper from 'components/CardWrapper';

const AboutUs = (): ReactElement => {
  return (
    <CardWrapper cardType="centered" className="w-1/2">
      <p className="text-center">
        {' '}
        This is a DEMO SITE. It is not currently responsive :( I also don&apos;t currently plan on
        making it mobile responsive.
        <span className="my-10 block">Check out my Github. @norvalbv</span>
        Site built with React, JavaScript, Typescript, Tailwind, Formik, AWS, Azure Devops, and a
        bunch of other stuff!
      </p>
    </CardWrapper>
  );
};

export default AboutUs;
