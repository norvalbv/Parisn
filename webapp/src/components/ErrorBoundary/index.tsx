import React, { ReactElement, useMemo } from 'react';
// React error boundaries do not work with functional components out of the box - hence the use of the package below.
import { ErrorBoundary as ErrorBounds } from 'react-error-boundary';

export type ErrorBoundaryProps = {
  children?: JSX.Element;
  errorMessage?: string;
  // Typically used for resetting state or to re-fetch data.
  onClick?: () => void;
  className?: string;
  // Used for automatically specifiying when the error boundary should reload.
  reset?: {
    resetKeys: string[];
    onReset: () => void;
  };
};

const ErrorBoundary = ({
  children,
  errorMessage,
  onClick = (): void => window.location.reload(),
  className = '',
  reset,
}: ErrorBoundaryProps): ReactElement => {
  const memoizedFallback = useMemo(
    () => (
      <div
        role="alert"
        className={`flex items-center gap-4 rounded bg-red-400 px-4 py-2 ${className}`}
      >
        <b>
          {errorMessage ||
            'An error occured! Please try again or contact support if the error persists'}
        </b>
        {onClick && (
          <button
            onClick={(): void => onClick()}
            type="button"
            className="rounded border border-gray-500 px-4 py-2 hover:underline"
          >
            Try again
          </button>
        )}
      </div>
    ),
    [className, errorMessage, onClick]
  );

  return children ? (
    <ErrorBounds
      fallbackRender={(): JSX.Element => memoizedFallback}
      resetKeys={reset?.resetKeys}
      onReset={(): void => reset?.onReset()}
    >
      {children}
    </ErrorBounds>
  ) : (
    memoizedFallback
  );
};

export default ErrorBoundary;
