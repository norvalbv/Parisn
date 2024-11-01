'use client';

import { collections } from '@/src/__mocks__/dataApiMock';
import Loader from '@/src/components/Loading';
import PageIndicators from '@/src/components/PageIndicators';
import StyledLink from '@/src/components/StyledLink';
import { COMPANY_NAME } from '@/src/constants';
import React, { ReactElement, useState } from 'react';

const Categories = (): ReactElement => {
  // const { data } = useCollections();
  const [page, setPage] = useState(0);
  const data = collections;

  if (!data) return <Loader />;

  const pageCount = Math.ceil(data.length / 3);

  // Create a shallow copy of a data that is limited to three categories per page.
  const processedData = data.slice(page * 3, page * 3 + 3);

  return (
    <section className="my-20 overflow-hidden px-4 md:my-40 md:px-8">
      <div className="mx-auto mb-12 flex max-w-7xl flex-col items-center justify-between md:mb-16 md:flex-row">
        <div className="mb-6 text-center md:mb-0 md:text-left">
          <h3 className="mb-2 text-3xl font-semibold tracking-tight">
            <span className="logo-text-medium">{COMPANY_NAME}</span>&apos;s Collections
          </h3>
          <p className="text-xs font-medium uppercase tracking-wider text-primary-neutral/80">
            Uncover Unparalleled Elegance
          </p>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {processedData.map((collection) => (
            <div
              key={collection.collections}
              className="group relative h-[24rem] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-primary-light/[.03] via-primary-light/5 to-primary-light/10 backdrop-blur-sm transition-all hover:border-white/20"
            >
              <div className="relative h-full w-full">
                <img
                  src={collection.image}
                  alt={`${collection.collections} collection cover`}
                  className="h-full w-full object-cover brightness-75 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
                <div className="absolute bottom-0 left-0 right-0 space-y-4 p-6">
                  <h4 className="text-center text-xl font-semibold uppercase tracking-wide">
                    {collection.collections}
                  </h4>
                  <div className="flex justify-center">
                    <StyledLink
                      to={`/collections/${collection.collections}`}
                      text="View Collection"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <PageIndicators pages={pageCount} currentPage={page} setCurrentPage={setPage} />
      </div>
    </section>
  );
};

export default Categories;
