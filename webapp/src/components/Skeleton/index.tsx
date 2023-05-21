import React, { ReactElement } from 'react';
import { AnimationDuration, animationDurationMap } from 'types';

export interface SkeletonProps {
  /**
   * Skeleton width.
   */
  width?: number | string;
  /**
   * Skeleton height.
   */
  height?: number | string;
  /**
   * Background colour, class name.
   */
  backgroundColor?: string;
  /**
   * Border radius.
   */
  borderRadius?: number | string;
  /**
   * Classes
   */
  className?: string;
  /**
   * Animation duration/frequency
   */
  animationDuration?: AnimationDuration;
}

const Skeleton = ({
  width,
  height,
  backgroundColor = '',
  borderRadius = '',
  className = '',
  animationDuration = 'fast',
}: SkeletonProps): ReactElement => {
  return (
    <template
      style={{ width, height, backgroundColor, borderRadius }}
      className={`block bg-gray-100 ${animationDurationMap[animationDuration]} ${className}`}
    />
  );
};

export default Skeleton;
