import React, { ReactElement } from 'react';
import { RouterProvider } from 'react-router-dom';
import CardWrapper from './components/CardWrapper';
import ErrorBoundary from './components/ErrorBoundary';
import { DrawerProvider } from './context/DrawerContext';
import { router } from './routes/MainRoutes';
import './styles/index.css';

const App = (): ReactElement => {
  return (
    <CardWrapper>
      <ErrorBoundary className="relative top-4 mx-4">
        <DrawerProvider>
          <RouterProvider router={router} />
        </DrawerProvider>
      </ErrorBoundary>
    </CardWrapper>
  );
};

export default App;
