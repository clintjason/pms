// notificationsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: JSON.parse(localStorage.getItem('notifications')) || []
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
      localStorage.setItem('notifications', JSON.stringify(state.notifications));
    },
    clearNotifications: (state) => {
      state.notifications = [];
      localStorage.setItem('notifications', JSON.stringify([]));
    }
  }
});

export const { addNotification, clearNotifications } = notificationsSlice.actions;

export default notificationsSlice.reducer;