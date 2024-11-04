import Header from '@/src/components/Header';
import React, { ReactElement } from 'react';

const AboutUs = (): ReactElement => {
  return (
    <div className="text-center min-h-svh">
      <Header title="About Us" />
      <p>
        This is a DEMO SITE. It is not currently responsive :( I also don&apos;t currently plan on
        making it mobile responsive.
        <span className="my-10 block">Check out my Github. @norvalbv</span>
        Site built with React, JavaScript, Typescript, Tailwind, Formik, AWS, Azure Devops, and a
        bunch of other stuff!
      </p>
    </div>
  );
};

export default AboutUs;
