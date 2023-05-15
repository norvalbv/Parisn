import React, { ReactElement } from 'react';
import classNames from 'utils/classNames';

type BadgeProps = {
  type: 'limited' | 'new';
};

const Badge = ({ type }: BadgeProps): ReactElement => {
  return (
    <div
      className={classNames(
        type === 'limited' ? 'bg-secondary-purple' : 'bg-secondary-red',
        'rounded-sm h-[1.375rem] font-medium text-[12px] uppercase tracking-normal leading-[0.875rem] px-2 flex items-center'
      )}
    >
      {type === 'limited' ? 'Limited' : 'New Drop'}
    </div>
  );
};

export default Badge;
