import React, { ReactElement, useState } from 'react';
import StyledLink from 'components/StyledLink';
import Radial from 'components/SVG/Design';
// import { useCollections } from 'services/DataApiService';
import Loader from 'components/Loading';
import { collections } from '__mocks__/dataApiMock';
import PageIndicators from 'components/PageIndicators';

const Categories = (): ReactElement => {
  // const { data } = useCollections();
  const [page, setPage] = useState(0);
  const data = collections;

  if (!data) return <Loader />;

  const pageCount = Math.ceil(data.length / 3);

  // Create a shallow copy of a data that is limited to three categories per page.
  const processedData = data.slice(page * 3, page * 3 + 3);

  return (
    <section className="relative flex flex-col items-center">
      <Radial colour="purple" />
      <p className="uppercase">Exceptional Apparel Awaits</p>
      <h3 className="mb-[2.5rem]">
        <span className="logo-text-medium">PARISN</span>&apos;s Fashion Panorama
      </h3>
      <div className="flex items-center gap-10">
        {processedData.map((collection) => (
          <div
            className="relative h-[31.875rem] w-[19.625rem] rounded"
            key={collection.collections}
          >
            <img
              src={collection.image}
              alt={`${collection.collections} collection cover`}
              className="h-full rounded brightness-[.65]"
            />
            <div className="absolute bottom-0 z-10 flex h-[8.25rem] w-full flex-col items-center justify-center gap-6 bg-gradient-to-b from-primary-dark/30 via-primary-dark/20 to-primary-dark/20">
              <h4 className="font-thin leading-[1.8125rem]">{collection.collections}</h4>
              <StyledLink to={`/collections/${collection.collections}`} text="View All" />
            </div>
          </div>
        ))}
      </div>
      <PageIndicators pages={pageCount} currentPage={page} setCurrentPage={setPage} />
    </section>
  );
};

export default Categories;
