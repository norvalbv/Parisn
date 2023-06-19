import React, { ReactElement } from 'react';
import { CloseIcon } from 'components/SVG';
import { useDrawer } from 'hooks/useDrawer';

type DrawerProps = {
  children: JSX.Element | JSX.Element[];
  size?: keyof typeof sizeMap;
  title: string;
  id: string;
};

const Drawer = ({ children, size = 'base', title, id }: DrawerProps): ReactElement => {
  const { openedId, closeDrawer } = useDrawer();

  return (
    <div
      id="item-chat"
      className={`fixed right-0 top-0 z-40 h-screen overflow-y-auto p-4 transition-transform duration-500 ${
        openedId === id ? '' : 'translate-x-full'
      } ${sizeMap[size]} bg-gray-900`}
      tabIndex={-1}
    >
      <h5 className="text-base font-semibold uppercase text-gray-500">{title}</h5>
      <button
        type="button"
        onClick={(): void => closeDrawer()}
        className="transform-all absolute right-2.5 top-2.5 inline-flex items-center rounded-full border border-gray-400 bg-transparent p-1.5 text-xxs text-gray-400 duration-300 hover:rotate-90"
      >
        <CloseIcon />
        <span className="sr-only">Close</span>
      </button>
      <div className="mt-4 border-t pt-4">{children}</div>
    </div>
  );
};

const sizeMap = {
  base: 'w-96',
  lg: 'w-[50rem]',
};

export default Drawer;
