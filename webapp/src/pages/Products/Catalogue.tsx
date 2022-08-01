import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCT_1_IMAGE } from '../../constants';
import io from 'socket.io-client';

const Catalogue = () => {
  let socket = io('ws://localhost:8000', {
    withCredentials: true,
  });

  const [viewCount, setViewCount] = useState({});
  const products = [
    {
      id: 1,
      name: 'Product 1',
      title: 'Product 1',
      image: PRODUCT_1_IMAGE,
      currentPrice: '1.00',
      viewers: socket.on('from', (amount) => {
        console.log(amount);
        setViewCount((prev) => {
          return {
            ...prev,
            views: amount.views,
            page: amount.page,
          };
        });
      }),
    },
    {
      id: 2,
      name: 'Product 2',
      title: 'Product 2',
      image: PRODUCT_1_IMAGE,
      currentPrice: '1.00',
      viewers: socket.on('from', (amount) => {
        setViewCount((prev) => {
          return {
            ...prev,
            views: amount.views,
            page: amount.page,
          };
        });
      }),
    },
    {
      id: 3,
      name: 'Product 3',
      title: 'Product 3',
      image: PRODUCT_1_IMAGE,
      currentPrice: '1.00',
      viewers: socket.on('from', (amount) => {
        setViewCount((prev) => {
          return {
            ...prev,
            views: amount.views,
            page: amount.page,
          };
        });
      }),
    },
  ];

  console.log(viewCount);

  return (
    <div className="grid grid-cols-3 pt-24 pb-8">
      {products.map((product, i) => (
        <div
          key={product.id}
          className="flex flex-col flex-wrap justify-center items-center border-r border-secondary-neutral last:border-none pt-10"
        >
          <p className="underline">{product.title}</p>
          <Link to="/shop-item" className="flex justify-center items-center">
            <img src={product.image} alt={product.name} className="w-3/4 cursor-pointer"></img>
          </Link>
          <p>Current Price: £{product.currentPrice}</p>
          {/* <p>Current Viewers: {Object.keys(viewCount[i]).length === 0 ? 0 : viewCount[i]}</p> */}
        </div>
      ))}
    </div>
  );
};

export default Catalogue;
