import React, { ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HorizontalTable from 'components/HorizontalTable';
import convertToDate from 'utils/convertToDate';

const PurchaseSuccessful = (): ReactElement => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentIntent = params.get('payment_intent') as string;

  return (
    <div className="daisy-hero min-h-screen bg-gradient-to-br from-base-100 to-base-300">
      <div className="daisy-hero-content text-center">
        <div className="max-w-md">
          <span className="block text-3xl">Purchase Successful 😀</span>
          <div className="daisy-divider mt-10 mb-6" />
          <Link to="/transactions" className="daisy-btn-ghost daisy-btn">
            View Transactions
          </Link>
          <div className="mt-10 w-96">
            <HorizontalTable
              title={{ TitleLabel: 'Purchase Successful' }}
              value={{ ValueLabel: 't' }}
              widths={{ title: 'w-2/5', value: 'w-3/5' }}
            />
            <HorizontalTable
              title={{ TitleLabel: 'Order Id' }}
              value={{ ValueLabel: paymentIntent }}
              widths={{ title: 'w-2/5', value: 'w-3/5' }}
            />
            <HorizontalTable
              title={{ TitleLabel: 'Transaction Date' }}
              value={{ ValueLabel: convertToDate(Date.now() / 1000) }}
              widths={{ title: 'w-2/5', value: 'w-3/5' }}
            />
            <Link to="/catalogue">Back to shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccessful;
