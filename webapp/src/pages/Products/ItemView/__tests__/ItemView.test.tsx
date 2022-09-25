import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import ItemView from '../';

describe('<ItemView />', () => {
  test('ItemView props with mandatory props', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <ItemView />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
