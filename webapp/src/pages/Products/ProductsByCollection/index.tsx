import { ReactElement, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProductsByCollection } from '../../../services/DataApiService';
import LiveViewers from '../../../components/LiveViewers';
import { ProductData } from '../../../types';
import Loading from '../../../components/Loading';
import { UserIcon } from '../../../components/SVG';

const Catalogue = (): ReactElement => {
  const [products, setProducts] = useState<ProductData[]>();

  const location = useLocation();
  const collection = location.pathname.split('/').slice(-1).toString();
  useEffect(() => {
    (async () => {
      const { data } = await useProductsByCollection(collection);
      setProducts(data);
    })();
  }, []);

  if (!products) return <Loading />;

  return (
    <div className="grid grid-cols-3 h-screen">
      {products.map((product) => (
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
              <p>£{product.ID}</p>
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
