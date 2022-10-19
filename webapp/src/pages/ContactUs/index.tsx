import React, { Fragment, ReactElement } from 'react';
import { useFormik } from 'formik';
import { validateContact } from '../../utils/validation';
import useUser from '../../hooks/useUser';

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
    <div className="flex justify-center items-center flex-col gap-8 w-full">
      <h2 className="text-4xl top-10 border-b w-min mx-auto relative">Contact Us</h2>

      <form className="flex-1 pl-8 flex flex-col gap-8 w-full">
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
      </form>
    </div>
  );
};

export default ContactUs;
