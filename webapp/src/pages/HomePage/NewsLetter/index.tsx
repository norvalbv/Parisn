import React, { ReactElement, useState } from 'react';
import TextInput from 'components/DataInputs/TextInput';

const Newsletter = (): ReactElement => {
  const [email, setEmail] = useState('');

  return (
    <div className="mx-auto mb-32 text-center">
      <h3>
        Join the <span className="logo-text-medium">PARISN</span> Inner Circle
      </h3>
      <span className="mb-11 mt-2 inline-block uppercase">
        Subscribe to Stay Updated on the Latest Collections and Exclusive Offers
      </span>
      <TextInput
        value={null}
        placeholder="Email Address"
        onchange={(value: string): void => setEmail(value)}
      />
    </div>
  );
};

export default Newsletter;
