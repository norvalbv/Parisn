import { useTransition, animated } from '@react-spring/web';
import { Dispatch, SetStateAction, useState } from 'react';
import Button from '../../../components/Button';
import useUser from '../../../hooks/useUser';

type MyAccountProps = {
  isOpened: { accountOpen: boolean; setAccountOpen: Dispatch<SetStateAction<boolean>> };
};

const MyAccount = ({ isOpened }: MyAccountProps) => {
  const transitions = useTransition(isOpened.accountOpen, {
    from: { width: '0%', display: 'none' },
    enter: { width: '66%', display: 'block' },
    leave: { width: '0%', display: 'block' },
  });

  const { setUser, user } = useUser();

  return transitions(
    (styles, item) =>
      item && (
        <animated.div
          style={styles}
          className="w-2/3 h-screen bg-primary-dark/80 z-50 top-0 bottom-0 right-0 fixed rounded-bl-lg rounded-tl-lg"
        >
          <div className="p-4 relative h-[86.5%]">
            <div className="flex items-center justify-between mb-4">
              <span className="underline">Chat</span>
              <Button
                text="X"
                size="xs"
                width="1.5rem"
                borderRequired="none"
                hoverColorRequired={false}
                onClick={() => isOpened.setAccountOpen(!isOpened.accountOpen)}
                classes="hover:rotate-90 transform-all duration-300"
              />
            </div>
          </div>
          <Button
            text="Log Out"
            onClick={() => setUser(null)}
            classes="my-96 mx-10"
            navigateTo="/"
          />
        </animated.div>
      )
  );
};

export default MyAccount;
