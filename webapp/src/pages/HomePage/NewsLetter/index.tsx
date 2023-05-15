import React, { ReactElement, useState } from 'react';
import TextInput from 'components/DataInputs/TextInput';

const Newsletter = (): ReactElement => {
  const [email, setEmail] = useState('');

  return (
    <div className="text-center mb-32 mx-auto">
      <span className="block">
        Join the <span>PARISN</span> Inner Circle
      </span>
      <span className="inline-block mb-11">
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
