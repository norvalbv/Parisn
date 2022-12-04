import { Fragment, HTMLInputTypeAttribute, ReactElement } from 'react';
import Button from '../Button';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';

type FormProps = {
  footerLink?: { active: boolean; label: string; to: string };
  formValues: {
    [key: string]: {
      initialValue: string;
      label: string;
      placeholder?: HTMLInputTypeAttribute;
      type: string;
      disabled?: boolean;
    };
  };
  submitButton: { label: string; className?: string };
  submitFn: (arg: { [key: string]: string }) => void;
  validationSchema: unknown;
};

const Form = ({
  footerLink = { active: false, label: '', to: '' },
  formValues,
  submitButton,
  submitFn,
  validationSchema,
}: FormProps): ReactElement => {
  console.log(validationSchema);

  let initalValues: { [key: string]: string } = {};

  Object.entries(formValues).forEach(([label, value]) => {
    initalValues[label] = value.initialValue;
  });

  return (
    <Formik
      initialValues={initalValues}
      validateOnChange={false}
      validationSchema={validationSchema}
      onSubmit={(values) => submitFn(values)}
    >
      <FormikForm className="flex flex-col gap-8">
        {Object.entries(formValues).map(([id, values]) => (
          <Fragment key={id}>
            <div className="flex items-center justify-between">
              <label htmlFor={id}>{values.label}</label>
              <ErrorMessage
                name={id}
                component="div"
                className="font-normal text-red-500 text-sm"
              />
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
