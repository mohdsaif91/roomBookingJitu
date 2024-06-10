import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { apiList } from "../../API/apiIndex";
import { onAuthenticated } from "../../API/axios";

export const bookRoom = createAsyncThunk(
  "booking/bookRoom",
  (data, { fulfillWithValue, rejectWithValue }) => {
    const payload = {
      url: apiList.roomBooking,
      method: "post",
      data,
    };
    return onAuthenticated(payload, true)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

const boookingSlice = createSlice({
  name: "booking",
  initialState: {
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(bookRoom.fulfilled, (state, { payload }) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(bookRoom.pending, (state, { payload }) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(bookRoom.rejected, (state, { payload }) => {
      return {
        ...state,
        loading: false,
      };
    });
  },
});

export const BookingReducer = boookingSlice.reducer;
