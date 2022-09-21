import { FC } from 'react';
import renderer from 'react-test-renderer';

import Radial, { RadialProps } from '../';

const RadialWithRequiredProps: FC<Required<RadialProps>> = Radial;

describe('<Radial />', () => {
  test('Radial props with mandatory props', () => {
    const tree = renderer.create(<Radial />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Radial props with all props as required', () => {
    const tree = renderer
      .create(<RadialWithRequiredProps size="md" classes="bg-red-500" colour="blue" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
