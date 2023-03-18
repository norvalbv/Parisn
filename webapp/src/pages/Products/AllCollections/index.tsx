import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../components/Loading';
import { useCollections } from '../../../services/DataApiService';

const AllCollections = (): ReactElement => {
  const { data } = useCollections();

  console.log(data);

  if (!data) return <Loading />;

  return (
    <div className="grid grid-cols-3 h-screen">
      {data.map((collection) => (
        <div
          key={collection.collections}
          className="flex flex-col flex-wrap justify-center items-center pt-10"
          data-testid="Shoes"
        >
          <Link to={collection.collections} className="flex justify-center items-center">
            <img
              src={collection.image}
              alt={collection.image}
              className="w-[20rem] h-[30rem] cursor-pointer hover:scale-110 transition-all rounded-xl"
            />
          </Link>
          <p className="underline mt-10 text-xl uppercase tracking-widest font-thin underline-offset-8">
            {collection.collections}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AllCollections;
