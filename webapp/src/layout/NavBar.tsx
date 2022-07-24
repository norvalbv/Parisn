import React from "react";

const NavBar = () => {
  return (
    <ul className="absolute right-0 flex text-white items-center pr-8 py-6 z-50">
      <li className="border-r px-10 cursor-pointer hover:border-b">Home</li>
      <li className="px-10 cursor-pointer hover:border-b">Catalogue</li>
      <li className="border-l px-10 cursor-pointer hover:border-b">Contact</li>
    </ul>
  );
};

export default NavBar;
