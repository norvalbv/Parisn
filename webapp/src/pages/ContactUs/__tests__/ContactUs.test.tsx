import { FC } from 'react';
import renderer from 'react-test-renderer';

import ContactUs from '../';

describe('<ContactUs />', () => {
  test('ContactUs props with mandatory props', () => {
    const tree = renderer.create(<ContactUs />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
