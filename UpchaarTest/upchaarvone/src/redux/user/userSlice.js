import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  LoggedInUser: null,
  error: null,
  loading: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.LoggedInUser = action.payload;
    
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.LoggedInUser = null;
      state.loading = false;
      state.error = null;
    }
  }
})

export const { signInStart, signInSuccess, signInFailure, logout } = userSlice.actions;
export default userSlice.reducer;