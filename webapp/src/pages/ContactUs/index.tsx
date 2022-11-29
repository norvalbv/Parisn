import { Fragment, ReactElement } from 'react';
import { useFormik } from 'formik';
import { validateContact } from '../../utils/validation';
import useUser from '../../hooks/useUser';
import { DASHBOARD_IMAGE } from '../../constants';
import Button from '../../components/Button';
import CardWrapper from '../../components/CardWrapper';

const ContactUs = (): ReactElement => {
  const { user } = useUser();

  const formik = useFormik({
    initialValues: {
      firstName: user.id ?? '',
      lastName: user.id ?? '',
      email: user.id ?? '',
      orderNumber: '',
      Message: '',
    },
    validateContact,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      localStorage.clear();
    },
  });

  const values = ['First Name', 'Last Name', 'Email', 'Order Number', 'Message'];

  return (
    <div className="flex flex-row-reverse">
      <img src={DASHBOARD_IMAGE} alt={DASHBOARD_IMAGE} className="h-screen w-[42.5%]" />
      <CardWrapper cardType="centered">
        <div className="flex flex-col text-center gap-4 tracking-wider">
          <h2 className="text-4xl underline mx-auto relative">Contact Us</h2>
          <h3 className="my-6">Contact Parisn Customer Support</h3>
          <form className="flex flex-col gap-8">
            {Object.entries(formik.initialValues).map(([key], idx) => (
              <Fragment key={key}>
                <div className="flex gap-8 items-center">
                  <label htmlFor={key}>{values[idx]}</label>
                  {Object.keys(formik.errors).includes(key) &&
                  Object.keys(formik.touched).includes(key) ? (
                    <span className="text-sm text-utility-warning-main">
                      {Object.values(formik.errors)[Object.keys(formik.errors).indexOf(key)]}
                    </span>
                  ) : null}
                </div>
                <input
                  id={key}
                  type={key === 'email' ? 'email' : 'string'}
                  {...formik.getFieldProps(key)}
                  className="w-full bg-transparent outline-none border-b -mb-4 -mt-8"
                />
              </Fragment>
            ))}
            <Button text="Submit" />
          </form>
        </div>
      </CardWrapper>
    </div>
  );
};

export default ContactUs;
