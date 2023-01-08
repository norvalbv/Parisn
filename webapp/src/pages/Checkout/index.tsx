import { ReactElement, useState } from 'react';
import Button from '../../components/Button';
import Counter from '../../components/Counter';
import useProduct from '../../hooks/useProduct';
import Form from '../../components/Form';
import { checkoutSchema } from '../../utils/validation';
import { useNavigate } from 'react-router-dom';

const Checkout = (): ReactElement => {
  const navigate = useNavigate();
  const { productInfo } = useProduct();

  const truthyDataParsed = productInfo && Object.values(productInfo || '').every((item) => item);

  const [hovered, setHovered] = useState(false);
  console.log(hovered);

  if (!productInfo) return <></>;

  return (
    <>
      {truthyDataParsed ? (
        <>
          <h2 className="text-4xl top-10 border-b w-min mx-auto relative">Checkout</h2>

          <div className="flex justify-around items-center w-4/5 mx-auto h-screen">
            <div className="flex-1 flex flex-col items-center gap-5 pr-5">
              <p className="underline underline-offset-2">Purchase Information:</p>
              <img src={productInfo.product?.Image} className="mx-8 flex-1 rounded-lg" />
              <div className="flex text-sm divide-x">
                <p className="px-2">£{productInfo.price}</p>
                <p className="px-2">{productInfo.product?.Title}</p>
                <p className="px-2">{productInfo.product?.Title}</p>
              </div>
            </div>
            <div className="flex-1 pl-5">
              <Form
                formValues={{
                  firstName: { initialValue: '', type: 'text', label: 'First Name' },
                  lastName: { initialValue: '', type: 'text', label: 'Last Name' },
                  email: { initialValue: '', type: 'email', label: 'Email' },
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
                footerButton={{
                  active: true,
                  label: !hovered ? 'Clear shopping basket' : 'Are you sure?',
                  onClick: () => {
                    if (!hovered) setHovered(true);
                    else {
                      localStorage.clear();
                      setHovered(false);
                      navigate('/');
                    }
                  },
                  onMouseLeave: () => setHovered(false),
                  showPopup: {
                    active: true,
                    text: 'Note: If you clear your basket, you will not be able to add anything new for 60 seconds',
                  },
                }}
                submitButton={{ label: `Purchase for £${productInfo.price}`, className: 'mt-4' }}
                submitFn={(values) => {
                  console.log(values);
                }}
                validationSchema={checkoutSchema}
              />
              <Counter />
              {/* 
                  Note: If you clear your basket, you will not be able to add anything new for 60
                  seconds
        */}
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
