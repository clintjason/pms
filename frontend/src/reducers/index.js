import { combineReducers } from 'redux';
import authReducer from './authSlice';
import generalReducer from './generalSlice';
import userReducer from './userSlice';
import notificationsReducer from './notificationsSlice';

// Combine the reducers
const rootReducer = combineReducers({
  general: generalReducer,
  auth: authReducer,
  user: userReducer,
  notifications: notificationsReducer
});

export default rootReducer;