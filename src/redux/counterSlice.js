import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchData = createAsyncThunk(
  "counter/fetchData",
  async (value, { rejectWithValue }) => {
    try {
      return {
        count: 1,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 0,
    idle: true,
    error: "",
    loading: false,
  },
  reducers: {
    increment: (state, action) => {
      state.count = state.count + 1;
    },
    decrement: (state, action) => {
      state.count = state.count - 1;
    },
    incrementByAmount: (state, action) => {
      state.count = state.count + parseInt(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.count = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.idle = false;
      });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
