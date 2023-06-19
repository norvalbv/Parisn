import React, { ReactElement } from 'react';
import classNames from 'utils/classNames';
import useInterval from 'hooks/useInterval';

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
          <div onClick={(): void => setCurrentPage(i)} className="h-1 cursor-pointer">
            <div
              className={classNames(
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
