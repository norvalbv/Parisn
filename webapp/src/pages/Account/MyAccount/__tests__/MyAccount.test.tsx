import { FC } from 'react';
import renderer from 'react-test-renderer';

import MyAccount from '../';

describe('<MyAccount />', () => {
  test('should render correctly', () => {
    const tree = renderer.create(<MyAccount />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
