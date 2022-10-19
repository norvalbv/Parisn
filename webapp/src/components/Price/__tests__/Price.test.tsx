import { FC } from 'react';
import renderer from 'react-test-renderer';
import PriceDecrease, { PriceDecreaseProps } from '../';

const LiveViewersWithRequiredProps: FC<Required<PriceDecreaseProps>> = PriceDecrease;

describe('<Radial />', () => {
  test('Radial props with mandatory props', async () => {
    const tree = renderer.create(<PriceDecrease />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Radial props with all props as required', async () => {
    const tree = renderer.create(<LiveViewersWithRequiredProps duration={1000} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
