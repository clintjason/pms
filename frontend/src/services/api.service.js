//import axios from 'axios';
import api from './axios.interceptor';

export const signup = (data) => api.post(import.meta.env.VITE_DEV_BASE_URL + `auth/signup`, data)
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.error("Signup api endpoint error:", error);
    throw error;
  })

export const apiLogin = (data) => api.post(import.meta.env.VITE_DEV_BASE_URL + `auth/login`, data)
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.error("Login api endpoint error:", error);
    throw error;
  })

  export const apiVitalSignSimulator = (data) => api.post(import.meta.env.VITE_DEV_BASE_URL + `vital-sign-simulator-api`, data)
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.error("Vital Sign Simulator api endpoint error:", error);
    throw error;
  })

export const getAllVitalSigns = () => api.get(import.meta.env.VITE_DEV_BASE_URL + `vital-sign-simulator-api`)
  .then(response => {
    console.log("RESPONSE: ", response)
    const data = response.data.vitals.map(vital => {
      return {...vital, key: vital.vital_sign_id}
    })
    return data;
  })
  .catch(error => {
    console.error(error);
    throw error;
  })

export const getAppointmentById = (id) => api.get(import.meta.env.VITE_DEV_BASE_URL +  `appointments/`+ id)
.then(response => {
  return {...response.data, key: response.data.id};
})
.catch(error => {
  console.error(error);
  throw error;
})

export const deleteAppointmentById = (id) => api.delete(import.meta.env.VITE_DEV_BASE_URL + `appointments/delete/` + id)
.then(response => {
  return response.data;
})
.catch(error => {
  console.error(error);
  throw error;
})


export const searchData = (query) => 
  api.get(import.meta.env.VITE_DEV_BASE_URL + `appointments/search/`,{
    params: {
      name: query,
      address: query,
      phone: query,
      age: query,
      sex: query,
    }
  })
  .then((response) => {
    const data = response.data.map(elmt => {
      return {...elmt, key: elmt.id}
    })
    return data;
  })
  .catch((error) => {
    console.error(error);
    throw error;
  })

export const getUser = (id) => api.get(import.meta.env.VITE_DEV_BASE_URL + `user/${id}`)
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.error(error)
    throw error;
  })

