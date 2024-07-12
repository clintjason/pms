import { combineReducers } from 'redux';
import authReducer from './authSlice';
import generalReducer from './generalSlice';
import userReducer from './userSlice';

// Combine the reducers
const rootReducer = combineReducers({
  general: generalReducer,
  auth: authReducer,
  user: userReducer,
});

export default rootReducer;