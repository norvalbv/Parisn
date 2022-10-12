import { useFormik } from 'formik';
import React, { Fragment, useEffect, useState } from 'react';
import Button from '../../components/Button';
import useProduct from '../../hooks/useProduct';

const Checkout = () => {
  const { productInfo } = useProduct();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      firstLineOfAddress: '',
      secondLineOfAddress: '',
      country: '',
      postcode: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const values = [
    'First Name',
    'Last Name',
    'Email',
    'First Line of Address',
    'Second Line of Address',
    'Country',
    'Postcode',
  ];

  const truthyDataParsed = productInfo && Object.values(productInfo || '').every((item) => item);

  const [hovered, setHovered] = useState(false);

  if (!productInfo) return <></>;

  console.log(formik);

  return (
    <>
      {truthyDataParsed ? (
        <>
          <h2 className="text-4xl top-10 border-b w-min mx-auto relative">Checkout</h2>

          <div className="flex justify-around divide-x items-center h-screen">
            <div className="flex-1 flex flex-col items-center">
              <p className="underline underline-offset-2">Purchase Information:</p>
              <img src={productInfo.product?.image} className="mx-8 flex-1" />
              <div className="flex text-sm divide-x">
                <p className="px-2">£{productInfo.price}</p>
                <p className="px-2">{productInfo.product?.title}</p>
                <p className="px-2">{productInfo.product?.title}</p>
              </div>
            </div>
            <form className="flex-1 pl-8 flex flex-col gap-8">
              {Object.entries(formik.initialValues).map(([key], idx) => (
                <Fragment key={key}>
                  <label htmlFor={key}>{values[idx]}</label>
                  <input
                    id={key}
                    name={key}
                    type={key}
                    onChange={formik.handleChange}
                    value={Object.values(formik.values)[idx]}
                    className="w-2/3 bg-transparent outline-none border-0 border-b border-primary-main -mb-4 -mt-8"
                  />
                  {Object.values(formik.errors)[idx] ? (
                    <div>{Object.values(formik.errors)[idx]}</div>
                  ) : null}
                </Fragment>
              ))}
              <Button text={`Purchase for £${productInfo.price}`} type="submit" classes="mt-4" />
              <div>
                {truthyDataParsed && !hovered ? (
                  <Button text="Clear shopping Basket" onClick={() => setHovered(true)} />
                ) : (
                  <Button
                    text="Are you sure?"
                    onClick={() => {
                      localStorage.clear();
                      setHovered(false);
                    }}
                    onMouseLeave={() => setHovered(false)}
                    navigateTo="/"
                  />
                )}
                <p className="mt-3 italic text-sm underline w-8/12">
                  Note: If you clear your basket, you will not be able to add anything new for 60
                  seconds
                </p>
              </div>
            </form>
          </div>
        </>
      ) : (
        <div className="h-screen w-full flex flex-col gap-4 justify-center items-center text-xl">
          Basket Empty
          <Button text="Continue Shopping" navigateTo="/catalogue" />
        </div>
      )}
    </>
  );
};

export default Checkout;
