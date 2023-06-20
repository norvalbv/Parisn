import React from 'react';
import renderer from 'react-test-renderer';

import Collections from '..';

describe('<Collections />', () => {
  test('Categories props with mandatory props', () => {
    const tree = renderer.create(<Collections />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
