import { Fragment, HTMLInputTypeAttribute, ReactElement } from 'react';
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
              autoComplete={values.disableAutocomplete}
            />
            {values.extraInfo && <div className="text-sm italic">{values.extraInfo}</div>}
          </Fragment>
        ))}
        {footerLink?.active ? (
          <Link className="hover:underline cursor-pointer text-end" to={footerLink.to}>
            {footerLink.label}
          </Link>
        ) : null}
        {footerButton?.active ? (
          <button
            type="button"
            className="hover:underline cursor-pointer text-end"
            onClick={() => {
              if (!footerButton.onClick) return;

              footerButton.onClick();
            }}
          >
            {footerButton?.label}
          </button>
        ) : null}
        {formError && (
          <div className="text-utility-warning-main mt-2 font-semibold">{formError}</div>
        )}
        <Button text={submitButton.label} type="submit" classes={submitButton.className} />
      </FormikForm>
    </Formik>
  );
};

export default Form;
