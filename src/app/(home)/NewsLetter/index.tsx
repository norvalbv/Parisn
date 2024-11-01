'use client';

import React, { ReactElement, useState } from 'react';
import TextInput from '@/src/components/DataInputs/TextInput';

const Newsletter = (): ReactElement => {
  const [email, setEmail] = useState('');

  return (
    <div className="mx-auto mb-16 px-4 text-center md:mb-32 md:px-0">
      <h3>
        Join the <span className="logo-text-medium">PARISN</span> Inner Circle
      </h3>
      <span className="mb-6 mt-2 inline-block uppercase md:mb-11">
        Subscribe to Stay Updated on the Latest Collections and Exclusive Offers
      </span>
      <TextInput
        value={email}
        placeholder="Email Address"
        onchange={(value: string): void => setEmail(value)}
        className="w-full md:w-auto"
      />
    </div>
  );
};

export default Newsletter;
