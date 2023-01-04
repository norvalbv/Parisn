import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Amplify, Auth } from 'aws-amplify';
import { AmplifyConfig } from './amplify-config';
// Amplify.configure({ Auth: AmplifyConfig });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
