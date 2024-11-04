import CardWrapper from '@/src/components/CardWrapper';
import Form from '@/src/components/Form';
import useUser from '@/src/hooks/useUser';
import React, { ReactElement } from 'react';
// import { contactSchema } from '@/src/utils/validation/contactSchema';
import DASHBOARD_IMAGE from '@/public/images/dashboard-image.jpg';
import { COMPANY_NAME } from '@/src/constants';
import { useCustomerSupport } from '@/src/services/DataApiService';
import { ContactForm } from '@/src/types';

const ContactUs = (): ReactElement => {
  const { user } = useUser();

  const { sendSupportEmail } = useCustomerSupport();

  return (
    <div className="flex flex-row-reverse">
      <img src={DASHBOARD_IMAGE.src} alt={DASHBOARD_IMAGE.src} className="h-screen w-[42.5%]" />
      <CardWrapper>
        <div className="flex flex-col gap-4 text-center tracking-wider">
          <h2 className="relative mx-auto text-4xl underline">Contact Us</h2>
          <h3 className="my-6">Contact {COMPANY_NAME} Customer Support</h3>
          <Form
            formValues={{
              firstName: {
                disabled: !!user.userInfo?.firstName,
                initialValue: user.userInfo?.firstName ?? '',
                label: 'First Name',
                type: 'text',
              },
              lastName: {
                disabled: !!user.userInfo?.lastName,
                initialValue: user.userInfo?.lastName ?? '',
                label: 'Last Name',
                type: 'text',
              },
              email: {
                disabled: !!user.userInfo?.email,
                initialValue: user.userInfo?.email ?? '',
                label: 'Email',
                type: 'email',
              },
              orderNumber: { initialValue: '', type: 'text', label: 'Order Number' },
              message: {
                initialValue: '',
                type: 'textarea',
                label: 'Message',
                disableAutocomplete: 'off',
              },
            }}
            submitButton={{ label: 'Submit Query' }}
            submitFn={(values): void => sendSupportEmail(values as ContactForm)}
            // validationSchema={contactSchema}
            resetFormOnbSubmit
          />
        </div>
      </CardWrapper>
    </div>
  );
};

export default ContactUs;