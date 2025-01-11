import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Toaster from 'react-hot-toast';

axios.defaults.baseURL = 'https://hospify.onrender.com/api';
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster position='top-center'></Toaster>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
