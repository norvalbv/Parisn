import { Fragment, HTMLInputTypeAttribute, ReactElement } from 'react';
import Button from '../Button';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';

type FormProps = {
  formValues: {
    [key: string]: {
      initialValue: string;
      label: string;
      placeholder?: HTMLInputTypeAttribute;
      type: string;
      disabled?: boolean;
    };
  };
  footerLink?: { active: boolean; label: string; to: string };
  submitButton: { label: string; className?: string };
  submitFn: (arg: { [key: string]: string }) => void;
};

const Form = ({
  formValues,
  footerLink = { active: false, label: '', to: '' },
  submitButton,
  submitFn,
}: FormProps): ReactElement => {
  let initalValues: { [key: string]: string } = {};

  Object.entries(formValues).forEach(([label, value]) => {
    initalValues[label] = value.initialValue;
  });

  return (
    <Formik initialValues={initalValues} onSubmit={(values) => submitFn(values)}>
      <FormikForm className="flex flex-col gap-8">
        {Object.entries(formValues).map(([id, values]) => (
          <Fragment key={id}>
            <div className="flex items-center justify-between">
              <label htmlFor={id}>{values.label}</label>
              {false ? <ErrorMessage name={id} /> : null}
            </div>

            <Field
              dis
              id={id}
              name={id}
              placeholder={values.placeholder}
              type={values.type}
              className="w-full bg-transparent outline-none border-b -mb-4 -mt-8"
              disabled={values.disabled}
            />
          </Fragment>
        ))}
        {footerLink?.active ? (
          <Link className="hover:underline cursor-pointer text-end" to={footerLink.to}>
            {footerLink.label}
          </Link>
        ) : null}
        <Button text={submitButton.label} type="submit" classes={submitButton.className} />
      </FormikForm>
    </Formik>
  );
};

export default Form;
