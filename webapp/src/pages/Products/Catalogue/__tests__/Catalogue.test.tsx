import renderer from 'react-test-renderer';

import Catalogue from '../';

describe('<Catalogue />', () => {
  test('Catalogue props with mandatory props', async () => {
    const tree = renderer.create(<Catalogue />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
