import React, { ReactElement } from 'react';
import { RouterProvider } from 'react-router-dom';
import CardWrapper from './components/CardWrapper';
import ErrorBoundary from './components/ErrorBoundary';
import { router } from './routes/MainRoutes';
import './styles/index.css';

const App = (): ReactElement => {
  return (
    <CardWrapper>
      <ErrorBoundary className="relative top-4 mx-4">
        <RouterProvider router={router} />
      </ErrorBoundary>
    </CardWrapper>
  );
};

export default App;
