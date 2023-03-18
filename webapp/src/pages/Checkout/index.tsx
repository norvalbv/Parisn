import React, { ReactElement, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Button from 'components/Button';
import Counter from 'components/Counter';
import useProduct from 'hooks/useProduct';
import Form from 'components/Form';
import { checkoutSchema } from 'utils/validation';
import Loading from 'components/Loading';
import useUser from 'hooks/useUser';
import PaymentsForm from './PaymentsForm';

type LocationState = {
  client_secret: string;
  payment_intent_id: string;
};

// if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) throw new Error('Invalid Stripe Key.');

// Kept outside of the function to prevent it being reloaded is render / mounting from React.
const stripePromise = loadStripe('pk_test_qblFNYngBkEdjEZ16jxxoWSM');

const Checkout = (): ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();

  const locationState = location.state as LocationState;
  const clientSecret = locationState?.client_secret || '';

  if (!clientSecret) navigate('/');

  const { productInfo } = useProduct();

  const { user } = useUser();

  const truthyDataParsed = productInfo && Object.values(productInfo || '').every((item) => item);

  const [hovered, setHovered] = useState(false);
  const [stage, setStage] = useState(2);

  if (!productInfo) return <Loading />;

  const options = {
    clientSecret,
  };

  return (
    <>
      {truthyDataParsed ? (
        stage === 1 ? (
          <>
            <h2 className="text-4xl pt-10 mb-10 border-b w-min mx-auto">Checkout</h2>

            <div className="flex justify-around items-center w-4/5 mx-auto">
              <div className="flex-1 flex flex-col items-center gap-5 pr-5">
                <p className="underline underline-offset-2">Purchase Information:</p>
                <img
                  src={productInfo.product?.Image}
                  alt={productInfo.product?.Title}
                  className="mx-8 flex-1 rounded-lg w-96"
                />
                <div className="flex text-sm divide-x">
                  <p className="px-2">£{productInfo.price}</p>
                  <p className="px-2">{productInfo.product?.Title}</p>
                  <p className="px-2">{productInfo.product?.Title}</p>
                </div>
              </div>
              <div className="flex-1 pl-5">
                <Form
                  formValues={{
                    firstName: {
                      initialValue: user.userInfo?.firstName || '',
                      type: 'text',
                      label: 'First Name',
                    },
                    lastName: {
                      initialValue: user.userInfo?.lastName || '',
                      type: 'text',
                      label: 'Last Name',
                    },
                    email: {
                      initialValue: user.userInfo?.email || '',
                      type: 'email',
                      label: 'Email',
                    },
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
                    onClick: (): void => {
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
                  submitButton={{
                    label: `Purchase for £${productInfo.price || 0}`,
                    className: 'mt-4',
                  }}
                  submitFn={(values): void => {
                    // eslint-disable-next-line no-console
                    console.log('called');
                    // eslint-disable-next-line no-console
                    console.log(values);
                    setStage(2);
                  }}
                  validationSchema={checkoutSchema}
                  newsletterSignUp
                />
                <Counter />
              </div>
            </div>
          </>
        ) : (
          <Elements stripe={stripePromise} options={options}>
            <PaymentsForm productId={productInfo.product?.ID || ''} setStage={setStage} />
          </Elements>
        )
      ) : (
        <div className="h-screen w-full flex flex-col gap-4 justify-center items-center text-xl">
          Basket Empty
          <Button text="Continue Shopping" navigateTo="/collections" />
        </div>
      )}
    </>
  );
};

export default Checkout;
