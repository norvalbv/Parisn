import { FC } from 'react';
import renderer from 'react-test-renderer';

import Dashboard from '../';

describe('<Dashboard />', () => {
  test('Dashboard props with mandatory props', () => {
    const tree = renderer.create(<Dashboard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
