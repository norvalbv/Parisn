import React from 'react';
import renderer from 'react-test-renderer';

import HowItWorks from '..';

describe('<HowItWorks />', () => {
  test('HowItWorks props with mandatory props', () => {
    const tree = renderer.create(<HowItWorks />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
