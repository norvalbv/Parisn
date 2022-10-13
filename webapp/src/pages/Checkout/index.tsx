import { useFormik } from 'formik';
import React, { Fragment, ReactElement, useState } from 'react';
import Button from '../../components/Button';
import Counter from '../../components/Counter';
import useProduct from '../../hooks/useProduct';

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  } else if (values.firstName.length > 15) {
    errors.firstName = 'Must be 15 characters or less';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  } else if (values.lastName.length > 20) {
    errors.lastName = 'Must be 20 characters or less';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

const Checkout = (): ReactElement => {
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
    validate,
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
                  <div className="flex gap-8 items-center">
                    <label htmlFor={key}>{values[idx]}</label>

                    {Object.values(formik.errors)[idx] ? (
                      <span className="text-sm text-utility-warning-main">
                        {Object.values(formik.errors)[idx]}
                      </span>
                    ) : null}
                  </div>
                  <input
                    id={key}
                    name={key}
                    type={key}
                    onChange={formik.handleChange}
                    value={Object.values(formik.values)[idx]}
                    className="w-2/3 bg-transparent outline-none border-0 border-b border-primary-main -mb-4 -mt-8"
                  />
                </Fragment>
              ))}
              <Button text={`Purchase for £${productInfo.price}`} type="submit" classes="mt-4" />
              <Counter />
              <div>
                {!hovered ? (
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
