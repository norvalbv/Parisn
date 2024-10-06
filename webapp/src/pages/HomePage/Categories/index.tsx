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
    <section className="relative flex flex-col items-center px-4 md:px-0">
      <Radial colour="purple" className="hidden md:block" />
      <p className="uppercase text-center">Uncover Unparalleled Elegance</p>
      <h3 className="mb-6 md:mb-10 text-center">
        <span className="logo-text-medium">PARISN</span>&apos;s Exceptional Collections
      </h3>
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
        {processedData.map((collection) => (
          <div
            className="relative h-[24rem] md:h-[31.875rem] w-full md:w-[19.625rem] rounded"
            key={collection.collections}
          >
            <img
              src={collection.image}
              alt={`${collection.collections} collection cover`}
              className="h-full w-full object-cover rounded brightness-[.65]"
            />
            <div className="absolute bottom-0 flex h-[6rem] md:h-[8.25rem] w-full flex-col items-center justify-center gap-4 md:gap-6 bg-gradient-to-b from-primary-dark/30 via-primary-dark/20 to-primary-dark/20">
              <h4 className="font-thin leading-[1.8125rem] text-center">{collection.collections}</h4>
              <StyledLink to={`/collections/${collection.collections}`} text="View All" />
            </div>
          </div>
        ))}
      </div>
      <PageIndicators pages={pageCount} currentPage={page} setCurrentPage={setPage} className="mt-6 md:mt-10" />
    </section>
  );
};

export default Categories;
