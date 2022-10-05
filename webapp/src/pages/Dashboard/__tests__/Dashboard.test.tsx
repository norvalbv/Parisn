import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import Dashboard from '../';

describe('<Dashboard />', () => {
  test('Dashboard props with mandatory props', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
