import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import ProductsByCollection from '..';

describe('<ProductsByCollection />', () => {
  test('ProductsByCollection with only desired props', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <ProductsByCollection />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
