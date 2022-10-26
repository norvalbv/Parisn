import React, { Fragment, ReactElement } from 'react';
import { useFormik } from 'formik';
import { validateContact } from '../../utils/validation';
import useUser from '../../hooks/useUser';
import { DASHBOARD_IMAGE } from '../../constants';
import Button from '../../components/Button';

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
    <div className="flex">
      <img src={DASHBOARD_IMAGE} alt={DASHBOARD_IMAGE} className="h-screen w-[42.5%]" />

      <div className="h-screen flex flex-col justify-center items-center mx-auto gap-4 tracking-wider absolute right-0 top-0 w-[60%]">
        <h2 className="text-4xl underline mx-auto relative mb-10">Contact Us</h2>{' '}
        <form className="flex-1 pl-8 flex flex-col w-full gap-8">
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
                className="w-2/3 bg-transparent outline-none border-0 border-b border-primary-main -mb-4 -mt-8"
              />
            </Fragment>
          ))}
          <Button text="Submit" />
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
