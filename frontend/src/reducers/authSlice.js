import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    userId: null,
    isAuthenticated: false,
  },
  reducers: {
    setAuthToken: (state, action) => {
      console.log('setAuthToken Reducer: ', action)
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setUserId: (state, action) => {
      console.log('setUserId Reducer: ', action)
      state.userId = action.payload;
    },
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: (state, action) => {
      console.log('logout Reducer')
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("pms_userId");
      localStorage.removeItem("pms_token");
    }
  },
});

export const { setAuthToken, login, setUserId, logout } = authSlice.actions;

export default authSlice.reducer;