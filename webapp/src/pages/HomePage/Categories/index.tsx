import React, { ReactElement } from 'react';
import StyledLink from 'components/StyledLink';
import Radial from 'components/SVG/Design';

const Categories = (): ReactElement => {
  const t = [
    'https://i.ibb.co/X3fyBCp/ryan-grice-VKDzcs8k-D8-E-unsplash.webp',
    'https://i.ibb.co/X3fyBCp/ryan-grice-VKDzcs8k-D8-E-unsplash.webp',
    'https://i.ibb.co/X3fyBCp/ryan-grice-VKDzcs8k-D8-E-unsplash.webp',
  ];
  return (
    <section className="relative flex flex-col items-center gap-4">
      <Radial colour="purple" />
      <p className="block">Exceptional Apparel Awaits</p>
      <p className="block">PARISN&apos;s Fashion Panorama</p>
      <div className="flex items-center gap-10">
        {t.map((category, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <section className="relative h-[31.875rem] w-[19.625rem]" key={idx}>
            <img src={category} alt="p" className="h-full" />
            <div className="absolute bottom-0 z-10 flex h-[8.25rem] w-full flex-col items-center justify-center gap-6 bg-primary-dark/40">
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
    </section>
  );
};

export default Categories;
