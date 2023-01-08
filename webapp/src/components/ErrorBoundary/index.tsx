import React, { ReactElement, useMemo } from 'react';
// React error boundaries do not work with functional components out of the box - hence the use of the package below.
import { ErrorBoundary as ErrorBounds } from 'react-error-boundary';

export interface ErrorBoundaryProps {
  children: JSX.Element;
  errorMessage?: string;
  // Typically used for resetting state or to re-fetch data.
  onClick?: () => void;
  className?: string;
  // Used for automatically specifiying when the error boundary should reload.
  reset?: {
    resetKeys: string[];
    onReset: () => void;
  };
}

const ErrorBoundary = ({
  children,
  errorMessage,
  onClick = () => window.location.reload(),
  className = '',
  reset,
}: ErrorBoundaryProps): ReactElement => {
  const memoizedFallback = useMemo(
    () => (
      <div
        role="alert"
        className={`bg-red-400 rounded py-2 px-4 flex items-center gap-4 ${className}`}
      >
        <b>
          {errorMessage ||
            'An error occured! Please try again or contact support if the error persists'}
        </b>
        {onClick && (
          <button
            onClick={(): void => onClick()}
            type="button"
            className="border border-gray-500 rounded px-4 py-2 hover:underline"
          >
            Try again
          </button>
        )}
      </div>
    ),
    [className, errorMessage, onClick]
  );

  return (
    <ErrorBounds
      fallbackRender={(): JSX.Element => memoizedFallback}
      resetKeys={reset?.resetKeys}
      onReset={(): void => reset?.onReset()}
    >
      {children}
    </ErrorBounds>
  );
};

export default ErrorBoundary;
