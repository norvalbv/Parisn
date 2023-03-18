import React, { ReactElement, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProductsByCollection } from '../../../services/DataApiService';
import LiveViewers from '../../../components/LiveViewers';
import Loading from '../../../components/Loading';
import { UserIcon } from '../../../components/SVG';
import { logScalePrice } from '../../../utils/currentPrice';

// interface ProductDataWithPrices extends ProductData {
//   CurrentPrice?: number;
// }

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
    <div className="grid grid-cols-3 min-h-screen pb-10">
      {data.map((product) => (
        <div key={product.ID} className="flex flex-col flex-wrap justify-center items-center pt-10">
          <Link to={`${product.ID}`} className="flex justify-center items-center my-4">
            <img
              src={product.Image}
              alt={product.Title}
              className="w-[24rem] h-[34rem] cursor-pointer hover:scale-110 transition-all rounded-xl"
            />
          </Link>
          <div className="flex justify-between w-[24rem] items-center">
            <p className="text-sm">{product.Title}</p>
            <div className="flex gap-2 items-center justify-center text-sm">
              {currentPrices[product.ID] ? (
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
