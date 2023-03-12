import React, { ReactElement } from 'react';

const AboutUs = (): ReactElement => {
  return (
    <div className="h-screen grid place-items-center text-center">
      <p>
        This is a DEMO SITE. It is not currently responsive :( I also don&apos;t currently plan on
        making it mobile responsive.
        <span className="block my-10">Check out my Github. @norvalbv</span>
        Site built with React, JavaScript, Typescript, Tailwind, Formik, DaisyUI, AWS, Azure Devops,
        and a bunch of other stuff!
      </p>
    </div>
  );
};

export default AboutUs;
