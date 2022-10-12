import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import Checkout from '../';
import { ProductContextProvider } from '../../../context/ProductContext';

describe('<Checkout />', () => {
  test('Checkout props with mandatory props', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <ProductContextProvider>
            <Checkout />
          </ProductContextProvider>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
