import { FC } from 'react';
import renderer from 'react-test-renderer';

import LoginPage from '../';

describe('<LoginPage />', () => {
  test('should render correctly', () => {
    const tree = renderer.create(<LoginPage />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
