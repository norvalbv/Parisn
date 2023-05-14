import React, { ReactElement } from 'react';

const Categories = (): ReactElement => {
  const t = [];
  return (
    <div>
      <span>Exceptional Apparel Awaits</span>
      <span>PARISN&apos;s Fashion Panorama</span>
      {t.map((category) => (
        <div className="w-1"></div>
      ))}
    </div>
  );
};

export default Categories;
