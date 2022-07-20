import React from "react";

const NavBar = () => {
  return (
    <ul className="flex text-white justify-end items-center pr-8 py-6 z-50">
      <li className="px-10 cursor-pointer hover:border-b">How It Works</li>
      <li className="px-10 cursor-pointer hover:border-b">
        Terms And Conditions
      </li>
      <li className="px-10 cursor-pointer hover:border-b">Privacy Policy</li>
    </ul>
  );
};

export default NavBar;
