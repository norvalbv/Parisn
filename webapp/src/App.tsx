import ErrorBoundary from './components/ErrorBoundary';
import MainRoutes from './routes/MainRoutes';
import './styles/index.css';

const App = () => {
  return (
    <div className="bg-black box-border text-primary-light">
      <ErrorBoundary className="relative top-4 mx-4">
        <MainRoutes />
      </ErrorBoundary>
    </div>
  );
};

export default App;
