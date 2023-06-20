import React, { ReactElement, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProductsByCollection } from 'services/DataApiService';
import LiveViewers from 'components/LiveViewers';
import Loading from 'components/Loading';
import { UserIcon } from 'components/SVG';
import { logScalePrice } from 'utils/currentPrice';

const Collection = (): ReactElement => {
  const [currentPrices, setCurrentPrices] = useState<{ [key: string]: number }>({});

  const location = useLocation();
  const collection = location.pathname.split('/').slice(-1).toString();

  const { data } = useProductsByCollection(collection);

  useEffect(() => {
    const interval = setInterval(() => {
      if (data) {
        const updatedCurrentPrices: { [key: string]: number } = {};
        data.forEach((product) => {
          updatedCurrentPrices[product.id] = logScalePrice(
            product.startTime,
            product.endTime,
            product.price
          );
        });
        setCurrentPrices(updatedCurrentPrices);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [data]);

  if (!data) return <Loading />;

  return (
    <div className="grid min-h-screen grid-cols-3 pb-10">
      {data.map((product) => (
        <div key={product.id} className="flex flex-col flex-wrap items-center justify-center pt-10">
          <Link to={`${product.id}`} className="my-4 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="h-[34rem] w-[24rem] cursor-pointer rounded-xl transition-all hover:scale-110"
            />
          </Link>
          <div className="flex w-[24rem] items-center justify-between">
            <p className="text-sm">{product.title}</p>
            <div className="flex items-center justify-center gap-2 text-sm">
              {typeof currentPrices[product.id] === 'number' ? (
                <p>
                  {currentPrices[product.id] <= 1
                    ? 'FREE'
                    : `£${currentPrices[product.id].toFixed(2)}`}
                </p>
              ) : (
                <p>£{product.price}</p>
              )}
              <LiveViewers
                params={product.id}
                label={<UserIcon viewBox="-10 0 34 24" />}
                classNames="flex items-center"
                fontSize="sm"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Collection;
