import { useFormik } from 'formik';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import CardWrapper from '../../../components/CardWrapper';

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      address: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      localStorage.clear();
    },
  });

  const values = ['Username', 'First Name', 'Last Name', 'Email', 'Address'];

  return (
    <CardWrapper cardType="centered">
      <div className="flex items-baseline justify-between">
        <h2 className="text-4xl underline my-6">Sign Up</h2>
        <Link className="hover:underline cursor-pointer" to="/login">
          Already have an account?
        </Link>
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
        <Button text="Sign Up" />
      </form>
    </CardWrapper>
  );
};

export default SignUp;
