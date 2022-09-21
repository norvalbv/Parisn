import { FC } from 'react';
import renderer from 'react-test-renderer';

import ProductSizes, { ProductSizesProps } from '../';

const ProductSizesWithRequiredProps: FC<Required<ProductSizesProps>> = ProductSizes;

describe('<ProductSizes />', () => {
  test('ProductSizes props with mandatory props', () => {
    const tree = renderer
      .create(
        <ProductSizes
          sizes={{ small: 'Small', medium: 'Medium', large: 'Large', extralarge: 'Extra Large' }}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('ProductSizes props with all props as required', () => {
    const tree = renderer
      .create(
        <ProductSizesWithRequiredProps
          sizes={{ small: 'Small', medium: 'Medium', large: 'Large', extralarge: 'Extra Large' }}
          classes="bg-red-500"
          onClick={jest.fn()}
          selectedSize="Medium"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
