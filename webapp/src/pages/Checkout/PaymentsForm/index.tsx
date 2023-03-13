import React, { Dispatch, FormEvent, ReactElement, SetStateAction, useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

type PaymentsFormProps = {
  productId: string;
  setStage: Dispatch<SetStateAction<number>>;
};

const PaymentsForm = ({ productId, setStage }: PaymentsFormProps): ReactElement => {
  const stripe = useStripe();
  const elements = useElements();

  const [formError, setFormError] = useState<string | undefined>();

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();

    (async (): Promise<void> => {
      if (!stripe || !elements) return;
      setStage(1);

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-successful?product_id=${productId}`,
        },
      });

      if (result.error) {
        setFormError(result.error.message);
      }
    })().catch(() => {});
  };

  return (
    <div className="mockup-window mx-auto w-[50rem] rounded-lg border bg-base-300">
      <div className="flex justify-center bg-base-200 px-4 py-16">
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <span className="text-xs text-error">{formError}</span>
          <button
            disabled={!stripe}
            className="daisy-btn-primary daisy-btn mt-10 w-40"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentsForm;
