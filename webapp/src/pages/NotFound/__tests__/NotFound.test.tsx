import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import NotFound from '..';

describe('<NotFound />', () => {
  it('Should render correctly', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
