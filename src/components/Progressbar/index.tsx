import React, { ReactElement } from 'react';

type ProgressBarProps = {
  /**
   * A % value (0-100%)
   */
  value: number;
};

const ProgressBar = ({ value }: ProgressBarProps): ReactElement => {
  return (
    <div className="my-4 h-2.5 w-full rounded-full bg-gray-400/40">
      <div className="h-2.5 rounded-full bg-blue-600" style={{ width: `${value}%` }} />
    </div>
  );
};

export default ProgressBar;
