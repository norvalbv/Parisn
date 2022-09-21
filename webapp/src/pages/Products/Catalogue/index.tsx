import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../../services/DataApiService';
import LiveViewers from '../../../components/LiveViewers';

const Catalogue = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await useProducts();
      setProducts(data);
    })();
  }, []);

  if (!products) return <></>;

  return (
    <div className="grid grid-cols-3 pt-24 pb-8">
      {products.map((product) => {
        // console.log(product.id);
        return (
          <div
            key={product.id}
            className="flex flex-col flex-wrap justify-center items-center border-r border-secondary-neutral last:border-none pt-10"
          >
            <p className="underline">{product.title}</p>
            <Link
              to={`/shop-item?product=${product.id}`}
              className="flex justify-center items-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-[24rem] h-[34rem] cursor-pointer"
              />
            </Link>
            <p>Current Price: £{product.price}</p>
            <LiveViewers params={product.id} />
            {/* temp */}
            {/* <p className="text-sm">Current Viewers: 10</p> */}
          </div>
        );
      })}
    </div>
  );
};

export default Catalogue;
