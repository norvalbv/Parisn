import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import Product from '..';
import { ProductContextProvider } from 'context/ProductContext';

describe('<ItemView />', () => {
  test('ItemView props with mandatory props', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <ProductContextProvider>
            <Product />
          </ProductContextProvider>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
