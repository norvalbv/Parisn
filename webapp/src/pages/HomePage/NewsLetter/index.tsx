import React, { ReactElement, useState } from 'react';
import TextInput from 'components/DataInputs/TextInput';

const Newsletter = (): ReactElement => {
  const [email, setEmail] = useState('');

  return (
    <div className="mx-auto mb-32 text-center">
      <span className="block">
        Join the <span>PARISN</span> Inner Circle
      </span>
      <span className="mb-11 inline-block">
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
