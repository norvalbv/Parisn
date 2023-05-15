import React, { ReactElement } from 'react';

type PopupProps = {
  text: string;
};

const Popup = ({ text }: PopupProps): ReactElement => {
  return (
    <div className="absolute -top-24 -right-6 w-52 rounded-xl border border-white bg-secondary-darkPurple px-3 py-2 text-center text-[13px] opacity-75 shadow-lg shadow-[#777777]">
      {text}
    </div>
  );
};

export default Popup;
