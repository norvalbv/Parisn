import Header from '@/components/ui/Header';
import TransactionsTable from '@/components/ui/TransactionTable';
import { transactionMockData } from '@/lib/mocks/transactionMockData';
import React, { ReactElement } from 'react';

const Transactions = (): ReactElement => {
  return (
    <div className="relative grid h-[30rem] w-full grid-cols-1 grid-rows-7 place-items-center gap-2 sm:grid-cols-5 lg:h-full">
      <div className="absolute left-0 top-0 w-2/3 lg:top-20">
        <Header highlightedText="Your Transactions" size="xs" className="mb-2" />
        <TransactionsTable transactions={transactionMockData.slice(0, 5)} />
      </div>
      <div className="absolute right-0 top-20 w-2/3 lg:top-60">
        <Header
          highlightedText="What Your Trusted Party Sees"
          size="xs"
          className="mb-2 w-fit rounded-lg bg-white/30 p-2 backdrop-blur sm:p-4"
        />
        <TransactionsTable
          transactions={transactionMockData.slice(0, 5)}
          blurCategories={['Income', 'Bills & Utilities', 'Food & Drink']}
        />
      </div>
    </div>
  );
};

export default Transactions;
