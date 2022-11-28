import { RouterProvider } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { router } from './routes/MainRoutes';
import './styles/index.css';

const App = () => {
  return (
    <div className="bg-black box-border text-primary-light">
      <ErrorBoundary className="relative top-4 mx-4">
        <RouterProvider router={router} />
      </ErrorBoundary>
    </div>
  );
};

export default App;
