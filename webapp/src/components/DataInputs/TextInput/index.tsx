import Button from 'components/Button';
import React, { ChangeEvent, ReactElement } from 'react';
import classNames from 'utils/classNames';

type TextInputProps = {
  icon?: JSX.Element;
  inputSize?: string;
  onchange?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  testId?: string | null;
  title?: string;
  value: string | null;
};

const TextInput = ({
  icon,
  inputSize,
  onchange,
  placeholder,
  required,
  testId,
  title,
  value,
}: TextInputProps): ReactElement => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!onchange) return;

    onchange(e.target.value);
  };
  return (
    <div className="my-4 mx-auto flex max-w-max items-center justify-between gap-8">
      {title && (
        <span className="font-semibold">
          {title}
          {required && <span className="ml-1 text-red-600">*</span>}
        </span>
      )}
      <div className="flex items-center">
        <div
          className={classNames(
            'flex h-12 w-[21.25rem] items-center rounded-l border border-primary-light/40 px-6 focus-within:border-red-500',
            inputSize
          )}
        >
          <input
            className="text-grey-darker text-sm placeholder:text-sm w-full appearance-none border-none bg-transparent leading-5 placeholder:text-gray-400 focus:outline-0 focus:ring-transparent"
            onChange={handleChange}
            placeholder={placeholder}
            type="text"
            value={value || ''}
            data-testid={testId}
          />
          {icon && <div>{icon}</div>}
        </div>
        <Button
          text="Subscribe"
          className="h-12 rounded-r font-semibold uppercase"
          theme="light"
          width="10rem"
        />
      </div>
    </div>
  );
};

export default React.memo(TextInput);
