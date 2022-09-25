import { FC } from 'react';
import renderer from 'react-test-renderer';

import ProductSizes, { ProductSizesProps } from '../';

const ProductSizesWithRequiredProps: FC<Required<ProductSizesProps>> = ProductSizes;

describe('<ProductSizes />', () => {
  test('ProductSizes props with mandatory props', () => {
    const tree = renderer
      .create(<ProductSizes sizes={{ small: 5, medium: 4, large: 3, extralarge: 2 }} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('ProductSizes props with all props as required', () => {
    const tree = renderer
      .create(
        <ProductSizesWithRequiredProps
          sizes={{ small: 5, medium: 4, large: 3, extralarge: 2 }}
          classes="bg-red-500"
          onClick={jest.fn()}
          selectedSize="Medium"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
