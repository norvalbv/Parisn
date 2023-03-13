import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import ProductSizes, { ProductSizesProps } from '..';

const ProductSizesWithRequiredProps: FC<Required<ProductSizesProps>> = ProductSizes;

describe('<ProductSizes />', () => {
  test('ProductSizes props with mandatory props', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <ProductSizes sizes={{ Small: 5, Medium: 4, Large: 3, ExtraLarge: 2 }} />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('ProductSizes props with all props as required', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <ProductSizesWithRequiredProps
            sizes={{ Small: 5, Medium: 4, Large: 3, ExtraLarge: 2 }}
            classes="bg-red-500"
            onClick={jest.fn()}
            selectedSize="Medium"
          />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
