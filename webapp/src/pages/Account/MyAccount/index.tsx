import React, { ReactElement, useState } from 'react';
import Button from 'components/Button';
import useUser from 'hooks/useUser';
import Drawer from 'components/Drawer';
import ChangePassword from './TabPages/ChangePassword';
import MyInformation from './TabPages/MyInformation';
import MyOrders from './TabPages/MyOrders';
import VerifyAccount from './TabPages/VerifyAccount';
import { PRODUCT_1_IMAGE } from '../../../constants';

const MyAccount = (): ReactElement => {
  const { user, signOut } = useUser();

  const [selectedTab, setSelectedTab] = useState('myinformation');

  return (
    <Drawer title="My Account" size="lg" id="Account">
      <div className="h-full grid grid-cols-3 divide-x divide-x-gray">
        <div className="p-4">
          <div className="flex gap-6 items-center border-b pb-4 mb-4">
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img
              src={PRODUCT_1_IMAGE}
              alt="User Profile Picture"
              className="rounded-full h-14 w-14 border-2"
            />
            <h3 className="text-2xl capitalize">
              Hello, {user.userInfo?.firstName || user.userInfo?.username}!
            </h3>
          </div>
          <div className="divide-y">
            <p
              className="py-2 cursor-pointer hover:underline"
              onClick={(): void => setSelectedTab('myinformation')}
            >
              My Information
            </p>
            <p
              className="py-2 cursor-pointer hover:underline"
              onClick={(): void => setSelectedTab('myorders')}
            >
              My Orders
            </p>
            {!user.cognitoInfo?.email_verified && (
              <p
                className="py-2 cursor-pointer hover:underline"
                onClick={(): void => setSelectedTab('verifyaccount')}
              >
                Verify Account
              </p>
            )}
            <p
              className="py-2 cursor-pointer hover:underline"
              onClick={(): void => setSelectedTab('changepassword')}
            >
              Change Password
            </p>
            <Button
              text="Log Out"
              onClick={(): void => {
                signOut();
              }}
              navigateTo="/"
              classes="text-left px-0 hover:underline"
              upperCase={false}
              width="100%"
              borderRequired="bottom"
              fontWeight="normal"
              size="lg"
              hoverColorRequired={false}
              textOrientation="text-left"
            />
          </div>
        </div>
        <div className="p-4 w-80">
          {selectedTab === 'myinformation' ? (
            <MyInformation />
          ) : selectedTab === 'myorders' ? (
            <MyOrders />
          ) : selectedTab === 'verifyaccount' ? (
            <VerifyAccount />
          ) : (
            <ChangePassword />
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default MyAccount;
