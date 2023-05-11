import React, { ReactElement } from 'react';

const Select = (): ReactElement => {
  return (
    <select className="daisy-select daisy-select-ghost w-full max-w-xs">
      <option disabled selected>
        Menu
      </option>
      <option>Collections</option>
      <option>Contact</option>
    </select>
  );
};

export default Select;
