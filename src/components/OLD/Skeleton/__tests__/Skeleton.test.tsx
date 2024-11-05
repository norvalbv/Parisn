import React, { FC } from 'react';
import renderer from 'react-test-renderer';

import Skeleton, { SkeletonProps } from '..';

const SkeletonWithAllProps: FC<Required<SkeletonProps>> = Skeleton;

describe('<Skeleton />', () => {
  test('should render correctly without props', () => {
    const tree = renderer.create(<Skeleton />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('should render correctly with all props', () => {
    const tree = renderer.create(
      <SkeletonWithAllProps
        width="256px"
        height="24px"
        backgroundColor="#cecece"
        borderRadius="2px"
        animationDuration="slow"
        className="border"
      />
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
