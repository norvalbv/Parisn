import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Basket } from '../components/CustomSVG';

const NavBar = () => {
  const retreviedProductInfo = localStorage.getItem('savedProductInfo');
  const parsedData = JSON.parse(retreviedProductInfo || 'null');
  const truthyDataParsed = parsedData !== null && Object.values(parsedData).every((item) => item);

  const location = useLocation();

  const [hovered, setHovered] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (truthyDataParsed && location.pathname !== '/checkout') navigate('/checkout');
  }, [location.pathname]);

  return (
    <>
      {location.pathname !== '/checkout' && (
        <ul className="absolute right-0 flex text-white items-center pr-8 py-6 z-50 divide-x">
          <Link to="/home">
            <li className="px-10 cursor-pointer hover:underline underline-offset-8">Home</li>
          </Link>
          <Link to="/catalogue">
            <li className="px-10 cursor-pointer hover:underline underline-offset-8">Catalogue</li>
          </Link>
          <Link to="/contact-us">
            <li className="px-10 cursor-pointer hover:underline underline-offset-8">Contact</li>
          </Link>
          {truthyDataParsed && (
            <Link
              to="/checkout"
              className="px-10"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <Basket colour={hovered ? 'pink' : 'white'} />
            </Link>
          )}
        </ul>
      )}
    </>
  );
};

export default NavBar;
