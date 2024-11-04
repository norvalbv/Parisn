'use client';

import React, { Fragment, HTMLInputTypeAttribute, ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/src/components/Button';
import Popup from '@/src/components/Popup';
import Link from 'next/link';

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
  const initialValues: { [key: string]: string } = {};

  Object.entries(formValues).forEach(([label, value]) => {
    initialValues[label] = value.initialValue;
  });

  const [hovered, setHovered] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const onSubmit = (values: Record<string, string>): void => {
    console.log(values);
    submitFn(values);
    if (resetFormOnbSubmit) reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      {Object.entries(formValues).map(([id, values]) => {
        const [type, setType] = useState(values.type);
        return (
          <Fragment key={id}>
            <div className="flex items-center justify-between">
              <label htmlFor={id}>{values.label}</label>
              {errors[id] && (
                <div className="text-sm font-normal text-red-500">
                  {errors[id]?.message as string}
                </div>
              )}
            </div>
            <input
              {...register(id)}
              id={id}
              placeholder={values.placeholder}
              type={type}
              className="-mb-4 -mt-8 block w-full rounded-lg border border-gray-600 bg-black p-2.5 text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              disabled={values.disabled}
              autoComplete={values.disableAutocomplete}
            />
            {values.id === 'password' && (
              <button
                type="button"
                className="m-0 text-left text-sm italic underline"
                onClick={(): void => (type === 'password' ? setType('text') : setType('password'))}
              >
                {type === 'password' ? 'Show Password' : 'Hide Password'}
              </button>
            )}
            {values.extraInfo && <div className="text-sm italic">{values.extraInfo}</div>}
          </Fragment>
        );
      })}
      <div
        className={`flex items-baseline justify-between ${
          newsletterSignUp ? '' : 'flex-row-reverse'
        }`}
      >
        {newsletterSignUp && (
          <div>
            <label className="cursor-pointer">
              <input type="checkbox" id="newsletterSignUp" className="mr-2 cursor-pointer" />
              Sign up to our newsletter
            </label>
          </div>
        )}
        {footerLink?.active ? (
          <Link className="cursor-pointer hover:underline" href={footerLink.to}>
            {footerLink.label}
          </Link>
        ) : footerButton?.active ? (
          <button
            type="button"
            className="relative w-48 cursor-pointer text-end hover:underline"
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
          <div className="mt-2 font-semibold text-utility-warning-main">{formError}</div>
        )}
      </div>
      <Button type="submit" className={`${submitButton.className || ''} -mt-4`}>
        {submitButton.label}
      </Button>
    </form>
  );
};

export default Form;
