import { ReactElement, useState } from 'react';
import Button from '../../components/Button';
import Counter from '../../components/Counter';
import useProduct from '../../hooks/useProduct';
import Form from '../../components/Form';
import { checkoutSchema } from '../../utils/validation';

const Checkout = (): ReactElement => {
  const { productInfo } = useProduct();

  const truthyDataParsed = productInfo && Object.values(productInfo || '').every((item) => item);

  const [hovered, setHovered] = useState(false);

  if (!productInfo) return <></>;

  return (
    <>
      {truthyDataParsed ? (
        <>
          <h2 className="text-4xl top-10 border-b w-min mx-auto relative">Contact</h2>

          <div className="flex justify-around divide-x items-center h-screen">
            <div className="flex-1 flex flex-col items-center">
              <p className="underline underline-offset-2">Purchase Information:</p>
              <img src={productInfo.product?.Image} className="mx-8 flex-1" />
              <div className="flex text-sm divide-x">
                <p className="px-2">£{productInfo.price}</p>
                <p className="px-2">{productInfo.product?.Title}</p>
                <p className="px-2">{productInfo.product?.Title}</p>
              </div>
            </div>
            <Form
              formValues={{
                firstName: { initialValue: '', type: 'text', label: 'First Name' },
                lastName: { initialValue: '', type: 'text', label: 'Last Name' },
                email: { initialValue: '', type: 'password', label: 'Password' },
                firstLineOfAddress: {
                  initialValue: '',
                  type: 'text',
                  label: 'First Line of Address',
                },
                secondLineOfAddress: {
                  initialValue: '',
                  type: 'text',
                  label: 'Second Line of Address',
                },
                Country: { initialValue: '', type: 'text', label: 'Country' },
                Postcode: { initialValue: '', type: 'text', label: 'Postcode' },
              }}
              footerLink={{ active: true, label: 'Forgot your password?', to: '/' }}
              submitButton={{ label: `Purchase for £${productInfo.price}`, className: 'mt-4' }}
              submitFn={(values) => {
                console.log(values);
              }}
              validationSchema={checkoutSchema}
            />
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
