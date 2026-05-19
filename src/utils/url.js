const defaultBaseUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000'
  : 'https://fintrack-backend-fmsm.onrender.com';

export const BASE_URL = import.meta.env.VITE_API_URL || defaultBaseUrl;