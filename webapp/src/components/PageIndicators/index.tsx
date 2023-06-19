import useInterval from 'hooks/useInterval';
import React, { ReactElement, useState } from 'react';
import classNames from 'utils/classNames';

type PageIndicatorsProps = {
  pages: number;
  currentPage: number;
};

const PageIndicators = ({ pages, currentPage }: PageIndicatorsProps): ReactElement => {
  const [page, setPage] = useState(0);

  useInterval(() => {
    setPage(page >= pages - 1 ? 0 : page + 1);
  }, 3500);
  return (
    <div className="mt-10 flex items-center gap-3">
      {Array(pages)
        .fill(null)
        .map((_, i) => (
          <div onClick={(): void => setPage(i)} className="h-1 cursor-pointer">
            <div
              className={classNames(
                'h-0.5 w-[1.875rem]',
                page === i ? 'bg-primary-light' : 'bg-primary-light/40'
              )}
            />
          </div>
        ))}
    </div>
  );
};

export default PageIndicators;
