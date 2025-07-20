import { createSlice } from "@reduxjs/toolkit";

const showListings = createSlice({
  name: "showListings",
  initialState: {
    show: false,
  },
  reducers: {
    setShowListings: (state, action) => {
      state.show = action.payload;
    },
  },
});

export const { setShowListings } = showListings.actions;

export const showListingsReducer = showListings.reducer;
