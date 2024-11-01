import clsx from 'clsx';
import Button from '@/src/components/Button';
import React, { ChangeEvent, ReactElement } from 'react';
import { cn } from '@/lib/utils/cn';

type TextInputProps = {
  icon?: JSX.Element;
  inputSize?: string;
  onchange?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  testId?: string | null;
  title?: string;
  value: string | null;
  className?: string;
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
  className,
}: TextInputProps): ReactElement => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!onchange) return;

    onchange(e.target.value);
  };
  return (
    <div
      className={cn(
        'mx-auto my-4 flex max-w-max items-center justify-between gap-8',
        className || ''
      )}
    >
      {title && (
        <span className="font-semibold">
          {title}
          {required && <span className="ml-1 text-red-600">*</span>}
        </span>
      )}
      <div className="flex items-center">
        <div
          className={clsx(
            'flex h-12 w-[21.25rem] items-center rounded-l border border-primary-light/40 px-6 focus-within:border-red-500',
            inputSize
          )}
        >
          <input
            className="text-grey-darker w-full appearance-none border-none bg-transparent text-sm leading-5 placeholder:text-sm placeholder:text-gray-400 focus:outline-0 focus:ring-transparent"
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
          roundedBorders="none"
          theme="light"
          width="10rem"
        />
      </div>
    </div>
  );
};

export default React.memo(TextInput);
