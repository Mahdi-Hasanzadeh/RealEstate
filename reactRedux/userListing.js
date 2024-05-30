import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../PortConfig";

export const fetchUserListing = createAsyncThunk(
  "fetchUserListing",
  async (value, thunkAPI) => {
    try {
      // fetch single product to show for the user
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
      // get the current user information to see if current user have the above single product
      // in it's favorites list or not
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
      // return the single product info and the favorites list of the current user.
      return {
        ...response?.data,
        favorites: [...response1?.data?.favorites],
      };
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
