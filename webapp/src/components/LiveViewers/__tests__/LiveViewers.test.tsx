import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import LiveViewers, { LiveViewersProps } from '../';

const LiveViewersWithRequiredProps: FC<Required<LiveViewersProps>> = LiveViewers;

describe('<Radial />', () => {
  test('Radial props with mandatory props', async () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <LiveViewers />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Radial props with all props as required', async () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <LiveViewersWithRequiredProps
            params="test-params=test"
            fontSize="xl"
            label="Test Label"
            pageParams="/test"
          />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
