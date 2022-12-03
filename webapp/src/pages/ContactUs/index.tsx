import { ReactElement } from 'react';
import useUser from '../../hooks/useUser';
import { DASHBOARD_IMAGE } from '../../constants';
import CardWrapper from '../../components/CardWrapper';
import Form from '../../components/Form';

const ContactUs = (): ReactElement => {
  const { user } = useUser();

  return (
    <div className="flex flex-row-reverse">
      <img src={DASHBOARD_IMAGE} alt={DASHBOARD_IMAGE} className="h-screen w-[42.5%]" />
      <CardWrapper cardType="centered">
        <div className="flex flex-col text-center gap-4 tracking-wider">
          <h2 className="text-4xl underline mx-auto relative">Contact Us</h2>
          <h3 className="my-6">Contact Parisn Customer Support</h3>
          <Form
            formValues={{
              firstName: { initialValue: user.id ?? '', type: 'text', label: 'First Name' },
              lastName: { initialValue: user.id ?? '', type: 'text', label: 'Last Name' },
              email: { initialValue: user.id ?? '', type: 'text', label: 'Email' },
              orderNumber: { initialValue: '', type: 'text', label: 'Order Number' },
              Message: { initialValue: '', type: 'textarea', label: 'Message' },
            }}
            submitButtonText="Submit Query"
          />
        </div>
      </CardWrapper>
    </div>
  );
};

export default ContactUs;
