import renderer from 'react-test-renderer';

import Categories from '..';

describe('<Categories />', () => {
  test('Categories props with mandatory props', () => {
    const tree = renderer.create(<Categories />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
