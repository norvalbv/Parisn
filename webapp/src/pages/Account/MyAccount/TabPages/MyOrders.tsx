import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useDrawer } from 'hooks/useDrawer';

const MyOrders = (): ReactElement => {
  const { closeDrawer } = useDrawer();
  return (
    <div className="w-full">
      <h4 className="underline"> My Information</h4>
      <div className="mt-4">
        You have yet to order from us 😟
        <Link
          to="/collections"
          onClick={(): void => closeDrawer()}
          className="inline-block mt-2 underline"
        >
          Be sure to check out our collections
        </Link>
      </div>
    </div>
  );
};

export default MyOrders;
