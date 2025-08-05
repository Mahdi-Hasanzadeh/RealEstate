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
    //For updating just favorites
    updateFavorites: (state, action) => {
      const { id, remove } = action.payload;
      const favorites = state.userInfo?.favorites || [];

      if (remove) {
        state.userInfo.favorites = favorites.filter((favId) => favId !== id);
      } else {
        if (!favorites.includes(id)) {
          state.userInfo.favorites.push(id);
        }
      }
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
  updateFavorites,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
