import React from 'react';
import { Link } from 'react-router-dom';
import { InstagramLogo } from '../../components/CustomSVG';

const NavBar = () => {
  return (
    <div className="w-full py-6 absolute bottom-0">
      <div className="cursor-pointer">
        <InstagramLogo />
      </div>
      <ul className="flex justify-end items-center text-sm">
        <Link to="/how-it-works">
          <li className="px-4 cursor-pointer hover:border-b">How It Works</li>
        </Link>
        <Link to="/about-us">
          <li className="px-4 cursor-pointer hover:border-b">About us</li>
        </Link>
        <Link to="/terms-and-conditions">
          <li className="px-4 cursor-pointer hover:border-b">Terms And Conditions</li>
        </Link>
        <Link to="/privacy-policy">
          <li className="px-4 cursor-pointer hover:border-b">Privacy Policy</li>
        </Link>
      </ul>
    </div>
  );
};

export default NavBar;
