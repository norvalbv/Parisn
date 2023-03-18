import React, { ReactElement, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserIcon, UserLoginIcon } from '../../components/SVG';
import { useDrawer } from '../../hooks/useDrawer';
import useUser from '../../hooks/useUser';
import { ProductData } from '../../types';

const NavBar = (): ReactElement => {
  const { openDrawer } = useDrawer();

  const retreviedProductInfo = localStorage.getItem('savedProductInfo') || 'null';
  const parsedData = JSON.parse(retreviedProductInfo) as ProductData;
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
              onClick={(): void => openDrawer('Account')}
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
