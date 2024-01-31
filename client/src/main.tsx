import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import { SnackbarProvider } from 'notistack';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import React from 'react';

// Setup axios defaults
axios.defaults.baseURL = "https://login-app-backend-teal.vercel.app"
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider>
        <GoogleOAuthProvider clientId="482773850042-nvknfo47p9shhn4vohmacp3uhnem4or7.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>
);