import { createSlice } from "@reduxjs/toolkit";

const showWelcomeToast = createSlice({
  name: "showsWelcomeToast",
  initialState: {
    userAlreadySeeWelcomeToast: false,
  },
  reducers: {
    setWelcomeToast: (state, action) => {
      state.userAlreadySeeWelcomeToast = action.payload;
    },
  },
});

export const { setWelcomeToast } = showWelcomeToast.actions;
export const showWelcomeToastReducer = showWelcomeToast.reducer;
