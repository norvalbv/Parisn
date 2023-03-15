import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import MyAccount from '..';
import { UserInformationProvider } from '../../../../context/UserContext';

describe('<MyAccount />', () => {
  test('should render correctly', () => {
    const tree = renderer
      .create(
        <UserInformationProvider>
          <BrowserRouter>
            <MyAccount />
          </BrowserRouter>
        </UserInformationProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
