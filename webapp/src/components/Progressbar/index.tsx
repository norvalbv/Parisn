import React, { ReactElement } from 'react';

type ProgressBarProps = {
  /**
   * A % value (0-100%)
   */
  value: number;
};

const ProgressBar = ({ value }: ProgressBarProps): ReactElement => {
  return (
    <div className="w-full bg-gray-400/20 rounded-full h-2.5 my-4 dark:bg-gray-700/20">
      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${value}%` }} />
    </div>
  );
};

export default ProgressBar;
