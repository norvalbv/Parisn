import { FC } from 'react';
import renderer from 'react-test-renderer';

import Spinner from '../';

describe('<Spinner />', () => {
  test('Spinner props with mandatory props', () => {
    const tree = renderer.create(<Spinner />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
