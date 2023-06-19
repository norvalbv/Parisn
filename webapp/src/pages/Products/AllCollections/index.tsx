import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import Loading from 'components/Loading';
import { useCollections } from 'services/DataApiService';

const AllCollections = (): ReactElement => {
  const { data } = useCollections();

  if (!data) return <Loading />;

  return (
    <div className="grid h-screen grid-cols-3">
      {data.map((collection) => (
        <div
          key={collection.collections}
          className="flex flex-col flex-wrap items-center justify-center pt-10"
          data-testid="Shoes"
        >
          <Link to={collection.collections} className="flex items-center justify-center">
            <img
              src={collection.image}
              alt={collection.image}
              className="h-[30rem] w-[20rem] cursor-pointer rounded-xl transition-all hover:scale-110"
            />
          </Link>
          <p className="mt-10 text-xl font-thin uppercase tracking-widest underline underline-offset-8">
            {collection.collections}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AllCollections;
