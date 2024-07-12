import axios from 'axios';
import store from '../store';

const api = axios.create({
  baseURL: import.meta.env.VITE_DEV_BASE_URL,
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    const authToken = store.getState().auth.token;
    if(authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    } else {
      // send refresh token request
      console.log("No auth token");
      //window.location.href = '/login';
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;