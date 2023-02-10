import React from 'react';
import { Link } from 'react-router-dom';
import { InstagramLogo } from '../../components/CustomSVG';

const NavBar = () => {
  return (
    <div className="w-full p-6 absolute bottom-0 flex justify-between">
      <div className="cursor-pointer">
        <InstagramLogo />
      </div>
      <ul className="flex justify-end items-center text-sm">
        <Link to="/how-it-works">
          <li className="px-4 cursor-pointer hover:underline underline-offset-8">How It Works</li>
        </Link>
        <Link to="/about-us">
          <li className="px-4 cursor-pointer hover:underline underline-offset-8">About us</li>
        </Link>
        <Link to="/terms-and-conditions">
          <li className="px-4 cursor-pointer hover:underline underline-offset-8">
            Terms And Conditions
          </li>
        </Link>
        <Link to="/privacy-policy">
          <li className="px-4 cursor-pointer hover:underline underline-offset-8">Privacy Policy</li>
        </Link>
      </ul>
    </div>
  );
};

export default NavBar;
