import React from 'react';
import renderer from 'react-test-renderer';

import TermsAndConditions from '../page';

describe('<TermsAndConditions />', () => {
  test('TermsAndConditions props with mandatory props', () => {
    const tree = renderer.create(<TermsAndConditions />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
