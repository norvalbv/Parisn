import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import HomePage from '..';

describe('<HomePage />', () => {
  test('HomePage props with mandatory props', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
