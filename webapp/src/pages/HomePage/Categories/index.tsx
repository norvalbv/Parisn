import StyledLink from 'components/StyledLink/intex';
import Radial from 'components/SVG/Design';
import React, { ReactElement } from 'react';

const Categories = (): ReactElement => {
  const t = [
    'https://i.ibb.co/X3fyBCp/ryan-grice-VKDzcs8k-D8-E-unsplash.webp',
    'https://i.ibb.co/X3fyBCp/ryan-grice-VKDzcs8k-D8-E-unsplash.webp',
    'https://i.ibb.co/X3fyBCp/ryan-grice-VKDzcs8k-D8-E-unsplash.webp',
  ];
  return (
    <div className="flex flex-col gap-4 items-center relative">
      <Radial colour="purple" />
      <span className="block">Exceptional Apparel Awaits</span>
      <span className="block">PARISN&apos;s Fashion Panorama</span>
      <div className="flex items-center gap-10">
        {t.map((category, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <section className="h-[31.875rem] w-[19.625rem] relative" key={idx}>
            <img src={category} alt="p" className="h-full" />
            <div className="h-[8.25rem] bg-primary-dark/40 absolute z-10 bottom-0 w-full flex flex-col items-center justify-center gap-6">
              <span>Limited Size Sneakers</span>
              <StyledLink to="/" text="View All" />
            </div>
          </section>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <div className="h-0.5 w-[1.875rem] bg-primary-light" />
        <div className="h-0.5 w-[1.875rem] bg-primary-light/40" />
        <div className="h-0.5 w-[1.875rem] bg-primary-light/40" />
        <div className="h-0.5 w-[1.875rem] bg-primary-light/40" />
        <div className="h-0.5 w-[1.875rem] bg-primary-light/40" />
      </div>
    </div>
  );
};

export default Categories;
