import axios from 'axios';
import store from '../store';

const api = axios.create({
  baseURL: import.meta.env.VITE_DEV_BASE_URL,
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    const authToken = store.getState().auth.token;
    const session = store.getState().auth.session;
    const monitoring_session_id = store.getState().auth.monitoring_session_id;

    if (session && session.id) {
      config.headers['sessionid'] = session.id;
    }

    if (monitoring_session_id) {
      config.headers['monitoringsessionid'] = monitoring_session_id;
    }

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