import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

// Smart Backend URL configuration:
// If running on localhost / 127.0.0.1, connect to local server (port 4001)
// If deployed in production, connect to Render / custom domain backend
const isLocal = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

const BACKEND_URL = isLocal 
  ? 'http://localhost:4001' 
  : (import.meta.env.VITE_BACKEND_URL || 'https://aayushinstitute.onrender.com');

axios.defaults.baseURL = BACKEND_URL;

axios.interceptors.request.use((config) => {
  if (config.url) {
    if (!isLocal && (config.url.includes('localhost:4001') || config.url.includes('127.0.0.1:4001'))) {
      config.url = config.url.replace(/http:\/\/(localhost|127\.0\.0\.1):4001/g, BACKEND_URL);
    }
  }
  return config;
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
