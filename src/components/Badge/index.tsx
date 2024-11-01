import clsx from 'clsx';
import React, { ReactElement } from 'react';

type BadgeProps = {
  type: 'limited' | 'new';
};

const Badge = ({ type }: BadgeProps): ReactElement => {
  return (
    <div
      className={clsx(
        type === 'limited' ? 'bg-secondary-purple' : 'bg-secondary-red',
        'flex h-[1.375rem] items-center rounded-sm px-2 text-[12px] font-medium uppercase leading-[0.875rem] tracking-normal'
      )}
    >
      {type === 'limited' ? 'Limited' : 'New Drop'}
    </div>
  );
};

export default Badge;
