import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    error: "",
    loading: false,
  },
  reducers: {
    signInStart: (state, action) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.userInfo = action.payload;
    },
    signInFailed: (state, action) => {
      state.loading = false;
      state.userInfo = null;
      state.error = action.payload;
    },
    updateUser: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
    deleteUser: (state, action) => {
      state.error = "";
      state.loading = false;
      state.userInfo = null;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailed,
  updateUser,
  deleteUser,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
