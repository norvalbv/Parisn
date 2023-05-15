import React, { ReactElement, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProductsByCollection } from 'services/DataApiService';
import LiveViewers from 'components/LiveViewers';
import Loading from 'components/Loading';
import { UserIcon } from 'components/SVG';
import { logScalePrice } from 'utils/currentPrice';

const Catalogue = (): ReactElement => {
  const [currentPrices, setCurrentPrices] = useState<{ [key: string]: number }>({});

  const location = useLocation();
  const collection = location.pathname.split('/').slice(-1).toString();

  const { data } = useProductsByCollection(collection);

  useEffect(() => {
    const interval = setInterval(() => {
      if (data) {
        const updatedCurrentPrices: { [key: string]: number } = {};
        data.forEach((product) => {
          updatedCurrentPrices[product.ID] = logScalePrice(
            product.StartTime,
            product.EndTime,
            product.Price
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
        <div key={product.ID} className="flex flex-col flex-wrap items-center justify-center pt-10">
          <Link to={`${product.ID}`} className="my-4 flex items-center justify-center">
            <img
              src={product.Image}
              alt={product.Title}
              className="h-[34rem] w-[24rem] cursor-pointer rounded-xl transition-all hover:scale-110"
            />
          </Link>
          <div className="flex w-[24rem] items-center justify-between">
            <p className="text-sm">{product.Title}</p>
            <div className="text-sm flex items-center justify-center gap-2">
              {typeof currentPrices[product.ID] === 'number' ? (
                <p>
                  {currentPrices[product.ID] <= 1
                    ? 'FREE'
                    : `£${currentPrices[product.ID].toFixed(2)}`}
                </p>
              ) : (
                <p>£{product.Price}</p>
              )}
              <LiveViewers
                params={product.ID}
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

export default Catalogue;
