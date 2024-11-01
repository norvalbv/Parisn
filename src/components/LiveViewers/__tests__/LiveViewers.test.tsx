import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import LiveViewers, { LiveViewersProps } from '..';

const LiveViewersWithRequiredProps: FC<Required<LiveViewersProps>> = LiveViewers;

describe('<Radial />', () => {
  test('Radial props with mandatory props', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <LiveViewers />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Radial props with all props as required', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <LiveViewersWithRequiredProps
            params="test-params=test"
            fontSize="xl"
            label="Test Label"
            pageParams="/test"
            className="bg-red-500"
          />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
