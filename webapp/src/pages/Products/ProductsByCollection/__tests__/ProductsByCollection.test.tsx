import renderer from 'react-test-renderer';

import ProductsByCollection from '..';

describe('<Catalogue />', () => {
  test('Catalogue props with mandatory props', async () => {
    const tree = renderer.create(<ProductsByCollection />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
