import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <ul className="absolute right-0 flex text-white items-center pr-8 py-6 z-50">
      <Link to="/home">
        <li className="border-r px-10 cursor-pointer hover:border-b">Home</li>
      </Link>
      <Link to="/catalogue">
        <li className="px-10 cursor-pointer hover:border-b">Catalogue</li>
      </Link>
      <Link to="/contact-us">
        <li className="border-l px-10 cursor-pointer hover:border-b">Contact</li>
      </Link>
    </ul>
  );
};

export default NavBar;
