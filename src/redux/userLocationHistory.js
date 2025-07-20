import { createSlice } from "@reduxjs/toolkit";

const userLocationHistory = createSlice({
  name: "userLocationHistory",
  initialState: {
    locationHistory: null,
  },
  reducers: {
    addLocationHistory: (state, action) => {
      state.locationHistory = action.payload;
    },
  },
});

export const { addLocationHistory } = userLocationHistory.actions;
export const userLocationHistoryReducer = userLocationHistory.reducer;
