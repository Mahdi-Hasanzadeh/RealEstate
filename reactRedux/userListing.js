import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../PortConfig";

export const fetchUserListing = createAsyncThunk(
  "fetchUserListing",
  async (value, thunkAPI) => {
    try {
      const response = await axios.get(
        `${URL}api/listing/userListing/${value.listingId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (response.data.success === false) {
        throw new Error(response.data.message);
      }
      const response1 = await axios.get(
        `${URL}api/user/userInfo/${value.currentUserId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (response1.data.success === false) {
        throw new Error(response.data.message);
      }
      return {
        ...response?.data,
        favorites: [...response1?.data?.favorites],
      };
      // console.log("listing favorite: ", response.data.favorites);
      // console.log("current user: ", currentUser.favorites);
      //   setListing(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userListing = createSlice({
  name: "userListing",
  initialState: {
    loading: false,
    error: null,
    success: false,
    data: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserListing.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUserListing.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.data = action.payload;
        state.success = true;
      })
      .addCase(fetchUserListing.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.data = null;
        state.success = false;
      });
  },
});

export const userListingReducer = userListing.reducer;
