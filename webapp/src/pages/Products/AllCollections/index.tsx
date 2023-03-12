import React, { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../components/Loading';
import { useCollections } from '../../../services/DataApiService';
import { CollectionData } from '../../../types';

const AllCollections = (): ReactElement => {
  const [products, setProducts] = useState<CollectionData[]>();
  useEffect((): void => {
    (async (): Promise<void> => {
      const { data } = await useCollections();
      setProducts(data);
    })();
  }, []);

  if (!products) return <Loading />;

  return (
    <div className="grid grid-cols-3 h-screen">
      {products.map((item, idx) => (
        <div
          key={idx}
          className="flex flex-col flex-wrap justify-center items-center pt-10"
          data-testid="Shoes"
        >
          <Link to={item.collections} className="flex justify-center items-center">
            <img
              src={item.image}
              alt={item.image}
              className="w-[20rem] h-[30rem] cursor-pointer hover:scale-110 transition-all rounded-xl"
            />
          </Link>
          <p className="underline mt-10 text-xl uppercase tracking-widest font-thin underline-offset-8">
            {item.collections}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AllCollections;
