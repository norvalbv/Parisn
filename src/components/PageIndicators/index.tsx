import clsx from 'clsx';
import useInterval from '@/src/hooks/useInterval';
import React, { ReactElement } from 'react';

type PageIndicatorsProps = {
  pages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<number>;
};

const PageIndicators = ({
  pages,
  currentPage,
  setCurrentPage,
}: PageIndicatorsProps): ReactElement => {
  useInterval(() => {
    setCurrentPage(currentPage >= pages - 1 ? 0 : currentPage + 1);
  }, 10000);
  return (
    <div className="mt-10 flex items-center gap-3">
      {Array(pages)
        .fill(null)
        .map((_, i) => (
          <div onClick={(): void => setCurrentPage(i)} className="h-1 cursor-pointer" key={i}>
            <div
              className={clsx(
                'h-0.5 w-[1.875rem]',
                currentPage === i ? 'bg-primary-light' : 'bg-primary-light/40'
              )}
            />
          </div>
        ))}
    </div>
  );
};

export default PageIndicators;
