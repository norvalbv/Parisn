import React, { Fragment, HTMLInputTypeAttribute, ReactElement, useState } from 'react';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import Button from '../Button';
import Popup from '../Popup';

type FormProps = {
  footerButton?: {
    active: boolean;
    label: string;
    onClick: (() => void) | null;
    onMouseLeave?: () => void;
    showPopup?: { active: boolean; text: string };
  };
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
      id?: string;
    };
  };
  formError?: string | null;
  submitButton: { label: string; className?: string };
  submitFn: (arg: { [key: string]: string }) => void;
  validationSchema?: unknown;
  resetFormOnbSubmit?: boolean;
  newsletterSignUp?: boolean;
};

const Form = ({
  footerButton = { active: false, label: '', onClick: null },
  footerLink = { active: false, label: '', to: '' },
  formValues,
  formError,
  submitButton,
  submitFn,
  validationSchema,
  resetFormOnbSubmit = false,
  newsletterSignUp = false,
}: FormProps): ReactElement => {
  const initalValues: { [key: string]: string } = {};

  Object.entries(formValues).forEach(([label, value]) => {
    initalValues[label] = value.initialValue;
  });

  const [hovered, setHovered] = useState(false);

  return (
    <Formik
      initialValues={initalValues}
      validateOnChange={false}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }): void => {
        submitFn(values);
        if (resetFormOnbSubmit) resetForm();
      }}
    >
      <FormikForm className="flex flex-col gap-8">
        {Object.entries(formValues).map(([id, values]) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
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
                id={id}
                name={id}
                placeholder={values.placeholder}
                type={type}
                className="-mb-4 -mt-8 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-black border-gray-600 placeholder-gray-400"
                disabled={values.disabled}
                autoComplete={values.disableAutocomplete}
              />
              {values.id === 'password' && (
                <button
                  type="button"
                  className="text-sm text-left italic underline m-0"
                  onClick={(): void =>
                    type === 'password' ? setType('text') : setType('password')
                  }
                >
                  {type === 'password' ? 'Show Password' : 'Hide Password'}
                </button>
              )}
              {values.extraInfo && <div className="text-sm italic">{values.extraInfo}</div>}
            </Fragment>
          );
        })}
        <div
          className={`flex justify-between items-baseline ${
            newsletterSignUp ? '' : 'flex-row-reverse'
          }`}
        >
          {newsletterSignUp && (
            <div>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label className="cursor-pointer">
                <input type="checkbox" id="newsletterSignUp" className="mr-2 cursor-pointer" />
                Sign up to our newsletter
              </label>
            </div>
          )}
          {footerLink?.active ? (
            <Link className="hover:underline cursor-pointer" to={footerLink.to}>
              {footerLink.label}
            </Link>
          ) : footerButton?.active ? (
            <button
              type="button"
              className="hover:underline cursor-pointer relative w-48 text-end"
              onClick={(): void => {
                if (footerButton.onClick) footerButton.onClick();
              }}
              onMouseLeave={(): void => {
                if (footerButton.onMouseLeave) footerButton.onMouseLeave();
                setHovered(false);
              }}
              onMouseEnter={(): void => setHovered(true)}
            >
              {footerButton.showPopup?.text && hovered && (
                <Popup text={footerButton.showPopup?.text} />
              )}
              {footerButton?.label}
            </button>
          ) : null}
          {formError && (
            <div className="text-utility-warning-main mt-2 font-semibold">{formError}</div>
          )}
        </div>
        <Button
          text={submitButton.label}
          type="submit"
          classes={`${submitButton.className || ''} -mt-4`}
        />
      </FormikForm>
    </Formik>
  );
};

export default Form;
