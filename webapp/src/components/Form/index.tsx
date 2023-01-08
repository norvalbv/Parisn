import { Fragment, HTMLInputTypeAttribute, ReactElement, useState } from 'react';
import Button from '../Button';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';

type FormProps = {
  footerButton?: { active: boolean; label: string; onClick: (() => void) | null };
  footerLink?: { active: boolean; label: string; to: string };
  formValues: {
    [key: string]: {
      initialValue: string;
      label: string;
      placeholder?: HTMLInputTypeAttribute;
      type: string;
      disabled?: boolean;
      disableAutocomplete?: 'off' | 'on';
      extraInfo?: string;
    };
  };
  formError?: string | null;
  submitButton: { label: string; className?: string };
  submitFn: (arg: { [key: string]: string }) => void;
  validationSchema?: unknown;
};

const Form = ({
  footerButton = { active: false, label: '', onClick: null },
  footerLink = { active: false, label: '', to: '' },
  formValues,
  formError,
  submitButton,
  submitFn,
  validationSchema,
}: FormProps): ReactElement => {
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
        {Object.entries(formValues).map(([id, values]) => {
          const [type, setType] = useState(values.type);
          return (
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
                type={type}
                className="w-full bg-transparent outline-none border-b -mb-4 -mt-8"
                disabled={values.disabled}
                autoComplete={values.disableAutocomplete}
              />
              {values.label === 'Password' && (
                <button
                  type="button"
                  className="text-sm text-left italic underline m-0"
                  onClick={() => (type === 'password' ? setType('text') : setType('password'))}
                >
                  {type === 'password' ? 'Show Password' : 'Hide Password'}
                </button>
              )}
              {values.extraInfo && <div className="text-sm italic">{values.extraInfo}</div>}
            </Fragment>
          );
        })}
        <div className="flex justify-between items-baseline flex-row-reverse">
          {footerLink?.active ? (
            <Link className="hover:underline cursor-pointer" to={footerLink.to}>
              {footerLink.label}
            </Link>
          ) : footerButton?.active ? (
            <button
              type="button"
              className="hover:underline cursor-pointer"
              onClick={() => {
                if (footerButton.onClick) footerButton.onClick();
              }}
            >
              {footerButton?.label}
            </button>
          ) : null}
          {formError && (
            <div className="text-utility-warning-main mt-2 font-semibold">{formError}</div>
          )}
        </div>
        <Button text={submitButton.label} type="submit" classes={submitButton.className} />
      </FormikForm>
    </Formik>
  );
};

export default Form;
