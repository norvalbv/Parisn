import React from "react";

const NavBar = () => {
  return (
    <ul className="flex justify-end items-center py-6 z-50 text-sm">
      <li className="px-4 cursor-pointer hover:border-b">How It Works</li>
      <li className="px-4 cursor-pointer hover:border-b">About us</li>
      <li className="px-4 cursor-pointer hover:border-b">
        Terms And Conditions
      </li>
      <li className="px-4 cursor-pointer hover:border-b">Privacy Policy</li>
    </ul>
  );
};

export default NavBar;
