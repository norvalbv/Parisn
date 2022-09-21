import { FC } from 'react';
import renderer from 'react-test-renderer';

import ItemView from '../';

describe('<ItemView />', () => {
  test('ItemView props with mandatory props', () => {
    const tree = renderer.create(<ItemView />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
