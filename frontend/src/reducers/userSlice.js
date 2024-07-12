import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    username: null,
    email: null,
    phone: null,
    profilePic: null,
  },
  reducers: {
    setUser: (state, action) => {
      console.log("setUser Reducer: ", action);
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.profilePic = action.payload.profilePic;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;