import React, { ReactElement, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Basket } from 'components/CustomSVG';
import { useDrawer } from 'hooks/useDrawer';
import useUser from 'hooks/useUser';
import { ProductData } from 'types';

const NavBar = (): ReactElement => {
  const { openDrawer } = useDrawer();

  const retreviedProductInfo = localStorage.getItem('savedProductInfo') || 'null';
  const parsedData = JSON.parse(retreviedProductInfo) as ProductData;
  const truthyDataParsed = parsedData !== null && Object.values(parsedData).every((item) => item);

  const location = useLocation();

  const [hovered, setHovered] = useState(false);

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
          <Link to="/home">
            <li className="px-10 cursor-pointer hover:underline underline-offset-8">Home</li>
          </Link>
          <Link to="/collections" data-testid="Collections Nav Link">
            <li className="px-10 cursor-pointer hover:underline underline-offset-8">Collections</li>
          </Link>
          <Link to="/contact-us">
            <li className="px-10 cursor-pointer hover:underline underline-offset-8">Contact</li>
          </Link>
          {truthyDataParsed && (
            <Link
              to="/checkout"
              className="px-10"
              onMouseEnter={(): void => setHovered(true)}
              onMouseLeave={(): void => setHovered(false)}
            >
              <Basket colour={hovered ? 'pink' : 'white'} />
            </Link>
          )}

          {user.userInfo?.id ? (
            <li
              className="px-10 cursor-pointer hover:underline underline-offset-8"
              onClick={(): void => openDrawer('Account')}
            >
              My Account
            </li>
          ) : (
            <Link to="/login">
              <li className="px-10 cursor-pointer hover:underline underline-offset-8">Login</li>
            </Link>
          )}
        </ul>
      )}
    </>
  );
};

export default NavBar;
