import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers';
import authMiddleware from '../middleware/authMiddleware';
import api from '../services/axios.interceptor';

const middleware = (getDefaultMiddleware) => getDefaultMiddleware({
  thunk: {
    extraArgument: api,
  },
}).concat(authMiddleware);

const store = configureStore({
  reducer: rootReducer,
})

export default store;
