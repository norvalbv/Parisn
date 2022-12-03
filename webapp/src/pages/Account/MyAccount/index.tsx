import { useTransition, animated } from '@react-spring/web';
import { Dispatch, SetStateAction, useState } from 'react';
import Button from '../../../components/Button';
import { PRODUCT_1_IMAGE } from '../../../constants';
import useUser from '../../../hooks/useUser';
import MyInformation from './TabPages/MyInformation';
import MyOrders from './TabPages/MyOrders';

type MyAccountProps = {
  isOpened: { accountOpen: boolean; setAccountOpen: Dispatch<SetStateAction<boolean>> };
};

const MyAccount = ({ isOpened }: MyAccountProps) => {
  const { setUser, user } = useUser();

  const transitions = useTransition(isOpened.accountOpen, {
    from: { width: '0%', display: 'none' },
    enter: { width: '66%', display: 'block' },
    leave: { width: '0%', display: 'none' },
  });

  const [selectedTab, setSelectedTab] = useState('myinformation');

  return transitions(
    (styles, item) =>
      item && (
        <animated.div
          style={styles}
          className="w-2/3 h-screen bg-primary-dark/90 z-50 top-0 bottom-0 right-0 fixed rounded-bl-lg rounded-tl-lg"
        >
          <div className="flex items-center justify-between mb-4 p-4 border-b">
            <h2>My Account</h2>
            <Button
              text="X"
              size="xs"
              width="1.5rem"
              borderRequired="none"
              hoverColorRequired={false}
              onClick={() => isOpened.setAccountOpen(false)}
              classes="hover:rotate-90 transform-all duration-300"
            />
          </div>
          <div className="h-full grid grid-cols-3 divide-x divide-x-gray">
            <div className="p-4">
              <div className="flex gap-6 items-center border-b pb-4 mb-4">
                <img
                  src={PRODUCT_1_IMAGE}
                  alt="User Profile Picture"
                  className="rounded-full h-14 w-14 border-2"
                />
                <h3 className="text-2xl capitalize">Hello, {user.firstName}!</h3>
              </div>
              <div className="divide-y">
                <p
                  className="py-2 cursor-pointer hover:underline"
                  onClick={() => setSelectedTab('myinformation')}
                >
                  My Information
                </p>
                <p
                  className="py-2 cursor-pointer hover:underline"
                  onClick={() => setSelectedTab('myorders')}
                >
                  My Orders
                </p>
                <Button
                  text="Log Out"
                  onClick={() => {
                    setUser(null);
                    isOpened.setAccountOpen(false);
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
              {selectedTab === 'myinformation' ? <MyInformation /> : <MyOrders />}
            </div>
          </div>
        </animated.div>
      )
  );
};

export default MyAccount;
