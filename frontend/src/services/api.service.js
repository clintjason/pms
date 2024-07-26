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
    console.error("Login api endpoint error: ", error);
    throw error;
  })

export const apiLogout = (data) => api.post(import.meta.env.VITE_DEV_BASE_URL + `auth/logout`, data)
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.error("Logout api endpoint error: ", error);
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

export const apiUpdatePatientProfile = (data, userId) => api.put(import.meta.env.VITE_DEV_BASE_URL + `patient/update/${userId}`, data)
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.error("update patient profile api endpoint error:", error);
    throw error;
  })

export const apiUpdateDoctorProfile = (data, userId) => api.put(import.meta.env.VITE_DEV_BASE_URL + `doctor/update/${userId}`, data)
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.error("apiUpdateDoctorProfile api endpoint error:", error);
    throw error;
  })

export const apiUpdateAvatar = (data, userId) => api.put(import.meta.env.VITE_DEV_BASE_URL + `user/update-avatar/${userId}`, data)
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.error("apiUpdateAvatar endpoint error:", error);
    throw error;
  })

export const apiUpdateUser = (data, userId) => api.put(import.meta.env.VITE_DEV_BASE_URL + `user/update/${userId}`, data)
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.error("apiUpdateUser endpoint error:", error);
    throw error;
  })

  export const apiGetCompletedSessions = () => api.get(import.meta.env.VITE_DEV_BASE_URL + `user/monitored-sessions`)
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.error("apiGetCompletedSessions endpoint error:", error);
    throw error;
  })
  
  export const apiGetUserCompletedSessions = () => api.get(import.meta.env.VITE_DEV_BASE_URL + `user/user-monitored-sessions`)
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.error("apiGetUserCompletedSessions endpoint error:", error);
    throw error;
  })

export const apiResetPassword = (data, userId) => api.put(import.meta.env.VITE_DEV_BASE_URL + `user/reset-password/${userId}`, data)
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.error("Reset password api endpoint error:", error);
    throw error;
  })

export const getAllVitalSigns = () => api.get(import.meta.env.VITE_DEV_BASE_URL + `vital-sign-simulator-api`)
  .then(response => {
    const data = response.data?.vitals.map(vital => {
      return {...vital, key: vital.vital_sign_id}
    })
    return data;
  })
  .catch(error => {
    console.error("getAllVitalSigns Error: ", error);
    throw error;
  })

export const apiGetPatientVitalSigns = (patient_id) => api.post(import.meta.env.VITE_DEV_BASE_URL + `vital-sign-simulator-api/patient-vitals/`, patient_id)
  .then(response => {
    console.log("ge", response);
    const data = response.data?.vitals.map(vital => {
      return {...vital, key: vital.vital_sign_id}
    })
    return data;
  })
  .catch(error => {
    console.error("getPatientVitalSigns Error: ", error);
    throw error;
  })

export const apiGetUser = (userId) => api.get(import.meta.env.VITE_DEV_BASE_URL +  `user/?${userId}`)
.then(response => {
  return response.data;
})
.catch(error => {
  console.error("apiGetUser Error: ", error);
  throw error;
})

export const apiGetDoctor = () => api.get(import.meta.env.VITE_DEV_BASE_URL +  `doctor`)
.then(response => {
  return response.data;
})
.catch(error => {
  console.error("apiGetDoctor Error: ", error);
  throw error;
})

export const apiGetPatient = () => api.get(import.meta.env.VITE_DEV_BASE_URL +  `patient`)
.then(response => {
  return response.data;
})
.catch(error => {
  console.error("apiGetPatient Error: ", error);
  throw error;
})

export const apiGetStats = () => api.get(import.meta.env.VITE_DEV_BASE_URL +  `user/stats`)
.then(response => {
  return response.data;
})
.catch(error => {
  console.error("apiGetStats Error: ", error);
  throw error;
})

export const apiGetAllPatients = (query) => api.get(import.meta.env.VITE_DEV_BASE_URL +  `patient/all/?${query}`)
.then(response => {
  return response.data;
})
.catch(error => {
  console.error("apiGetAllPatients Error: ", error);
  throw error;
})

export const apiGetAllUsers = (query) => api.get(import.meta.env.VITE_DEV_BASE_URL +  `user/all/?${query}`)
.then(response => {
  return response.data;
})
.catch(error => {
  console.error("apiGetAllPatients Error: ", error);
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

