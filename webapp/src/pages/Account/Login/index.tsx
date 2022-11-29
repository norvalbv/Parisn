import { Field, Form, Formik, useFormik } from 'formik';
import { Fragment } from 'react';
import Button from '../../../components/Button';
import CardWrapper from '../../../components/CardWrapper';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      Message: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      localStorage.clear();
    },
  });

  const values = ['Username', 'First Name', 'Last Name', 'Email'];

  return (
    <CardWrapper cardType="centered">
      <div className="flex items-baseline justify-between">
        <h2 className="text-4xl underline my-6">Login</h2>
        <a className="hover:underline cursor-pointer">Need an account?</a>
      </div>
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
        <a className="hover:underline cursor-pointer">Forgot your password?</a>
        <Button text="Submit" />
      </form>
    </CardWrapper>
  );
};

export default Login;
