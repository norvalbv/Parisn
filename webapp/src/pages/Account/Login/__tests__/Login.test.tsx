import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import LoginPage from '../';
import { UserInformationProvider } from '../../../../context/UserContext';

describe('<LoginPage />', () => {
  test('should render correctly', () => {
    const tree = renderer
      .create(
        <UserInformationProvider>
          <BrowserRouter>
            <LoginPage />
          </BrowserRouter>
        </UserInformationProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
