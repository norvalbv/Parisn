import { FC } from 'react';
import renderer from 'react-test-renderer';

import Checkout from '../';

describe('<Checkout />', () => {
  test('Checkout props with mandatory props', () => {
    const tree = renderer.create(<Checkout />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
