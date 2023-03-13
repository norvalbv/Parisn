import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import { Link } from 'react-router-dom';

type MyOrdersProps = {
  setAccountOpen: Dispatch<SetStateAction<boolean>>;
};

const MyOrders = ({ setAccountOpen }: MyOrdersProps): ReactElement => {
  return (
    <div className="w-full">
      <h4 className="underline"> My Information</h4>
      <div className="mt-4">
        You have yet to order from us 😟
        <Link
          to="/collections"
          onClick={(): void => setAccountOpen(false)}
          className="inline-block mt-2 underline"
        >
          Be sure to check out our collections
        </Link>
      </div>
    </div>
  );
};

export default MyOrders;
