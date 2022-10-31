import React, { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../../services/DataApiService';
import LiveViewers from '../../../components/LiveViewers';
import { ProductData } from '../../../types';

const Catalogue = (): ReactElement => {
  const [products, setProducts] = useState<null | ProductData[]>();
  useEffect(() => {
    (async () => {
      const { data } = await useProducts();
      setProducts(data);
    })();
  }, []);

  if (!products) return <></>;

  return (
    <div className="grid grid-cols-4 h-screen">
      {products.map((product) => (
        <div key={product.ID} className="flex flex-col flex-wrap justify-center items-center pt-10">
          <p className="underline z-10">{product.Title}</p>
          <Link
            to={`/shop-item?product=${product.ID}`}
            className="flex justify-center items-center my-4"
          >
            <img
              src={product.Image}
              alt={product.Title}
              className="w-[24rem] h-[34rem] cursor-pointer hover:scale-110 transition-all rounded-xl"
            />
          </Link>
          {/* <p>Current Price: £{product.ID}</p> */}
          <LiveViewers params={product.ID} />
        </div>
      ))}
    </div>
  );
};

export default Catalogue;
