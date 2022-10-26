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
    <div className="grid grid-cols-4 pt-24 pb-8">
      {products.map((product) => (
        <div key={product.ID} className="flex flex-col flex-wrap justify-center items-center pt-10">
          <p className="underline">{product.Title}</p>
          <Link
            to={`/shop-item?product=${product.ID}`}
            className="flex justify-center items-center"
          >
            <img
              src={product.Image}
              alt={product.Title}
              className="w-[24rem] h-[34rem] cursor-pointer"
            />
          </Link>
          {/* <p>Current Price: £{product.price}</p> */}
          <LiveViewers params={product.ID} />
        </div>
      ))}
    </div>
  );
};

export default Catalogue;
