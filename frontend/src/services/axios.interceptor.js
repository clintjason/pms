import axios from 'axios';
import store from '../store';
import { logout as logoutReducer } from '../reducers/authSlice';

const api = axios.create({
  baseURL: import.meta.env.VITE_DEV_BASE_URL,
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    const authToken = store.getState().auth.token;
    const session = store.getState().auth.session;
    const monitoring_session_id = store.getState().auth.monitoring_session_id;


    // Check if the request is for login or registration
    const isAuthRequest = config.url.includes('/login') || config.url.includes('/signup');

    if (session && session.id) {
      config.headers['sessionid'] = session.id;
    }

    if (monitoring_session_id) {
      config.headers['monitoringsessionid'] = monitoring_session_id;
    }

    if(authToken && !isAuthRequest) {
      config.headers.Authorization = `Bearer ${authToken}`;
    } else{
      // send refresh token request
      console.log("No auth token");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
      console.log(error);
     // Check if the request is for login or registration
     const isAuthRequest = error.config.url.includes('/login') || error.config.url.includes('/signup');

    if (error.response && error.response.status === 401 && !isAuthRequest) {
      // Token has expired or user is not authenticated
      store.dispatch(logoutReducer());
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export default api;