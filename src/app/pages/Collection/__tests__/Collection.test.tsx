import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import Collection from '..';

describe('<Collection />', () => {
  test('Collection with only desired props', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Collection />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
