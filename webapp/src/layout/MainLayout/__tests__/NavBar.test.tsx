import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Amplify, Auth } from 'aws-amplify';
import awsexports from 'aws-exports';
import NavBar from '../NavBar';

jest.mock('aws-amplify');
Amplify.configure(awsexports);

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

describe('<NavBar />', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <NavBar />
        </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
