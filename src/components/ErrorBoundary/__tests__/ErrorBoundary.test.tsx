import React, { FC, ReactElement } from 'react';
import renderer from 'react-test-renderer';

import ErrorBoundary, { ErrorBoundaryProps } from '..';

const ErrorBoundaryWithAllProps: FC<Required<ErrorBoundaryProps>> = ErrorBoundary;

const Child = (): ReactElement => {
  throw new Error();
};

describe('<ErrorBoundary />', () => {
  test('should not render, the div inside should throw an error.', () => {
    const tree = renderer
      .create(
        <ErrorBoundary>
          <div>Child component</div>
        </ErrorBoundary>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should render if error is thrown from child', () => {
    const tree = renderer
      .create(
        <ErrorBoundary>
          <Child />
        </ErrorBoundary>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should render with all props', () => {
    const tree = renderer
      .create(
        <ErrorBoundaryWithAllProps
          className="m-4 p-4 font-light"
          onClick={jest.fn()}
          errorMessage="Error Message!"
          reset={{ onReset: jest.fn(), resetKeys: ['Reset Key'] }}
        >
          <Child />
        </ErrorBoundaryWithAllProps>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
