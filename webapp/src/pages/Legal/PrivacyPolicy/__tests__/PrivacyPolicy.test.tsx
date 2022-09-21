import { FC } from 'react';
import renderer from 'react-test-renderer';

import PrivacyPolicy from '../';

describe('<PrivacyPolicy />', () => {
  test('PrivacyPolicy props with mandatory props', () => {
    const tree = renderer.create(<PrivacyPolicy />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
