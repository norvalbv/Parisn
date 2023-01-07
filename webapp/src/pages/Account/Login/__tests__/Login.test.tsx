import { Amplify, Auth } from 'aws-amplify';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import LoginPage from '../';
import aws_exports from '../../../../aws-exports';
import { UserInformationProvider } from '../../../../context/UserContext';

jest.mock('aws-amplify');
Amplify.configure(aws_exports);

Auth.signIn = jest.fn().mockImplementation(() => {
  return true;
});

Auth.signOut = jest.fn().mockImplementation(() => {
  return true;
});

Auth.changePassword = jest.fn().mockImplementation(() => {
  return true;
});

Auth.confirmSignUp = jest.fn().mockImplementation(() => {
  return true;
});
Auth.signUp = jest.fn().mockImplementation(() => {
  return true;
});

Auth.forgotPassword = jest.fn().mockImplementation(() => {
  return true;
});

Auth.forgotPasswordSubmit = jest.fn().mockImplementation(() => {
  return true;
});

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
