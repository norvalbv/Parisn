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
      <p className="uppercase">Exceptional Apparel Awaits</p>
      <p className="mb-[2.5rem] text-[2rem] font-normal">
        <span className="tracking-[.42rem]">PARISN&apos;s</span>Fashion Panorama
      </p>
      <div className="flex items-center gap-10">
        {t.map((collection, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className="relative h-[31.875rem] w-[19.625rem] rounded" key={idx}>
            <img src={collection} alt="p" className="h-full rounded" />
            <div className="absolute bottom-0 z-10 flex h-[8.25rem] w-full flex-col items-center justify-center gap-6 bg-gradient-to-b from-primary-dark/30 via-primary-dark/20 to-primary-dark/20">
              <span>Limited Size Sneakers</span>
              <StyledLink to="/" text="View All" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 flex items-center gap-3">
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
