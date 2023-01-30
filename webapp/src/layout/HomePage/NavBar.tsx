import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Basket } from '../../components/CustomSVG';
import { UserIcon, UserLoginIcon } from '../../components/SVG';
import useUser from '../../hooks/useUser';
import Login from '../../pages/Account/Login';

type NavBarProps = {
  setAccountOpen: Dispatch<SetStateAction<boolean>>;
};

const NavBar = ({ setAccountOpen }: NavBarProps) => {
  const retreviedProductInfo = localStorage.getItem('savedProductInfo');
  const parsedData = JSON.parse(retreviedProductInfo || 'null');
  const truthyDataParsed = parsedData !== null && Object.values(parsedData).every((item) => item);

  const location = useLocation();

  const [hovered, setHovered] = useState(false);

  const navigate = useNavigate();

  const { user } = useUser();

  useEffect(() => {
    if (truthyDataParsed && location.pathname !== '/checkout') navigate('/checkout');
  }, [location.pathname]);

  return (
    <>
      {location.pathname !== '/checkout' && (
        <ul className="absolute right-0 flex text-white items-center pr-8 py-6 z-30 divide-x">
          {user.userInfo?.id ? (
            <li
              className="px-10 cursor-pointer hover:underline underline-offset-8"
              onClick={() => setAccountOpen(true)}
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
