import { ParentSize } from '@visx/responsive';
import { useEffect, useMemo, useState } from 'react';
import Button from '../components/Button';
import Chart from '../components/Chart';
import LiveViewers from '../../Utils/LiveViewers';
import { scaleLog } from '@visx/scale';
import ProductSizes from '../components/ProductSizes';
import { useProductById } from '../../services/DataApiService';
import { useSearchParams } from 'react-router-dom';

const ItemView = () => {
  const [price, setPrice] = useState(1000);

  const priceScale = useMemo(
    () =>
      scaleLog({
        domain: [1, 1000],
        range: [0, 80000],
      }),
    []
  );
  let num = 80000;

  useEffect(() => {
    const timer = setInterval(() => {
      setPrice(priceScale.invert(num));
      num--;
    }, 10);
    return () => clearInterval(timer);
  }, []);

  const [selectedSize, setSelectedSize] = useState('M');

  const [searchParams] = useSearchParams();
  const currentProduct = searchParams.get('product');

  const [product, setProduct] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await useProductById(currentProduct || '');
      const indexed = data.findIndex((x) => x.id === currentProduct);
      setProduct(data[indexed]);
    })();
  }, []);

  if (!product.stock) return <></>;

  // console.log(Array.from(Array(num).keys()).map((i) => priceScale(i)));

  const compareSelectedVals = Object.entries(product.stock)[
    Object.entries(product.stock).findIndex((x) =>
      x[0].slice(0, 1) === 'e' ? 'xl' : x[0].slice(0, 1) === selectedSize.toLowerCase()
    )
  ][1];

  return (
    <div className="relative overflow-auto scroll-smooth">
      <img src={product.image} alt={product.image} className="h-screen w-[40%] sticky top-0" />
      <div className="absolute right-0 top-0 w-[60%]">
        <div
          id="product-overview"
          className="h-screen flex flex-col justify-center items-center mx-auto gap-4 tracking-wider"
        >
          <div className="w-[70%] h-[35vh]">
            <ParentSize>
              {(parent) => <Chart width={parent.width} height={parent.height} data={price} />}
            </ParentSize>
          </div>

          <span className="text-xl drop-shadow-[0_0_16px_rgba(255,255,255,0.5)]">
            {product.title}
          </span>

          <a className="hover:underline hover:text-secondary-neutral" href="#description">
            View Description
          </a>
          <p className="text-lg">£{price.toFixed(2)}</p>
          <Button
            text="Buy Now"
            hoveredText={`Buy at £${price.toFixed(2)}`}
            classes="mt-10"
            rounded="lg"
            navigateTo="/checkout"
          />
          <ProductSizes
            classes="mb-4"
            selectedSize={selectedSize}
            sizes={product.stock}
            onClick={(size) => setSelectedSize(size)}
          />
          <p className={`text-sm ${compareSelectedVals ? '-mt-2 -mb-1' : 'my-1'}`}>
            {compareSelectedVals ? `${compareSelectedVals}: left in stock` : null}
          </p>
          <LiveViewers />
        </div>
        <div
          id="description"
          className="flex flex-col justify-center items-center mx-auto gap-4 tracking-wider text-center w-3/5 leading-10 h-screen"
        >
          <p className="underline">Product Description</p>
          <p className="my-6 font-light">{product.description}</p>
          <a className="hover:text-secondary-neutral hover:underline" href="#product-overview">
            Back
          </a>
        </div>
      </div>
    </div>
  );
};

export default ItemView;
