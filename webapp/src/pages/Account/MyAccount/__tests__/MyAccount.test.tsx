import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import MyAccount from '../';
import { UserInformationProvider } from '../../../../context/UserContext';

describe('<MyAccount />', () => {
  test('should render correctly', () => {
    const tree = renderer
      .create(
        <UserInformationProvider>
          <BrowserRouter>
            <MyAccount
              isOpened={{
                accountOpen: false,
                setAccountOpen: jest.fn(),
              }}
            />
          </BrowserRouter>
        </UserInformationProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
