// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { ResizeObserver } from '@juggle/resize-observer';
import ReactDOM from 'react-dom';
import { ReactNode, ReactPortal } from 'react';

/**
 * This jest does not support ResizeObserver out of the box.
 * The `useTooltipInPortal` from `@visx/tooltip` used the `ResizeObserver` dependency.
 * Add polyfill for ResizeObserver.
 */
global.ResizeObserver = ResizeObserver;

/**
 * `react-test-renderer` does not provide a proper way to test components that are using `React.Portal`.
 * https://github.com/facebook/react/issues/11565
 *
 * Mock the `createPortal` from 'react-dom`.
 * As a result, all components will be rendered inside of the component (instead of outside ReactDOM),
 * and will be added to the snapshots.
 */
ReactDOM.createPortal = (children: ReactNode): ReactPortal => children as ReactPortal;

// Define a global mock for the `useId`
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useId: (): string => '0506cbdda73c368',
}));

/**
 * Mock system time to ensure all tests are consistent
 */
jest.useFakeTimers().setSystemTime(new Date('2022-02-18'));

/**
 * Mock Math.random()
 */
global.Math.random = (): number => 0.314159265358979;
