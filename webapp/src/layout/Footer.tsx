import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <ul className="flex justify-end items-center py-6 z-50 text-sm">
      <Link to="/how-it-works">
        <li className="px-4 cursor-pointer hover:border-b">How It Works</li>
      </Link>
      <Link to="/about-us">
        <li className="px-4 cursor-pointer hover:border-b">About us</li>
      </Link>
      <Link to="/terms-and-conditions">
        <li className="px-4 cursor-pointer hover:border-b">
          Terms And Conditions
        </li>
      </Link>
      <Link to="/privacy-policy">
        <li className="px-4 cursor-pointer hover:border-b">Privacy Policy</li>
      </Link>
    </ul>
  );
};

export default NavBar;
