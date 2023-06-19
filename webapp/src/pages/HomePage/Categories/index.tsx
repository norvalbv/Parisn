import React, { ReactElement } from 'react';
import StyledLink from 'components/StyledLink';
import Radial from 'components/SVG/Design';
import { useCollections } from 'services/DataApiService';
import Loading from 'components/Loading';
import { collections } from '__mocks__/dataApiMock';
import PageIndicators from 'components/PageIndicators';

const Categories = (): ReactElement => {
  // const { data } = useCollections();
  const data = collections;

  if (!data) return <Loading />;

  const pageCount = Math.ceil(data.length / 3);

  return (
    <section className="relative flex flex-col items-center">
      <Radial colour="purple" />
      <p className="uppercase">Exceptional Apparel Awaits</p>
      <h3 className="mb-[2.5rem]">
        <span className="logo-text-medium">PARISN</span>&apos;s Fashion Panorama
      </h3>
      <div className="flex items-center gap-10">
        {data.map((collection) => (
          <div
            className="relative h-[31.875rem] w-[19.625rem] rounded"
            key={collection.collections}
          >
            <img
              src={collection.image}
              alt="p"
              className="h-full rounded bg-red-500 brightness-[.65]"
            />
            <div className="absolute bottom-0 z-10 flex h-[8.25rem] w-full flex-col items-center justify-center gap-6 bg-gradient-to-b from-primary-dark/30 via-primary-dark/20 to-primary-dark/20">
              <h4 className="font-thin leading-[1.8125rem]">{collection.collections}</h4>
              <StyledLink to="/" text="View All" />
            </div>
          </div>
        ))}
      </div>
      <PageIndicators pages={pageCount} />
    </section>
  );
};

export default Categories;
