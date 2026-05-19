export const BASE_URL = import.meta.env.VITE_API_URL
  || (import.meta.env.PROD
    ? 'https://fintrack-backend-fmsm.onrender.com'
    : 'http://localhost:3000');