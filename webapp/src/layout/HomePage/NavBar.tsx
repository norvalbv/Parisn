import React, { Dispatch, ReactElement, SetStateAction, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserIcon, UserLoginIcon } from '../../components/SVG';
import useUser from '../../hooks/useUser';

type NavBarProps = {
  setAccountOpen: Dispatch<SetStateAction<boolean>>;
};

const NavBar = ({ setAccountOpen }: NavBarProps): ReactElement => {
  const retreviedProductInfo = localStorage.getItem('savedProductInfo');
  const parsedData = JSON.parse(retreviedProductInfo || 'null');
  const truthyDataParsed = parsedData !== null && Object.values(parsedData).every((item) => item);

  const location = useLocation();

  const navigate = useNavigate();

  const { user } = useUser();

  useEffect(() => {
    if (truthyDataParsed && location.pathname !== '/checkout') navigate('/checkout');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <>
      {location.pathname !== '/checkout' && (
        <ul className="absolute right-0 flex text-white items-center pr-8 py-6 z-30 divide-x">
          {user.userInfo?.id ? (
            <li
              className="px-10 cursor-pointer hover:underline underline-offset-8"
              onClick={(): void => setAccountOpen(true)}
            >
              <UserLoginIcon />
            </li>
          ) : (
            <Link to="/login">
              <UserIcon />
            </Link>
          )}
        </ul>
      )}
    </>
  );
};

export default NavBar;
