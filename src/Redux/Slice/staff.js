import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { apiList } from "../../API/apiIndex";
import { onAuthenticated } from "../../API/axios";

export const addStaff = createAsyncThunk(
  "staff/addStaff",
  (data, { fulfillWithValue, rejectWithValue }) => {
    const payload = {
      url: apiList.addStaff,
      method: "post",
      data,
    };
    return onAuthenticated(payload)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

const staffSlice = createSlice({
  name: "staff",
  initialState: {
    loading: false,
    error: "",
    staffData: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addStaff.fulfilled, (state, { payload }) => {
      return {
        ...state,
        staffData: payload.data,
        loading: false,
      };
    });
    builder.addCase(addStaff.rejected, (state, { payload }) => {
      return {
        ...state,
        error: payload.data,
        loading: false,
      };
    });
    builder.addCase(addStaff.pending, (state, { payload }) => {
      return {
        ...state,
        loading: true,
      };
    });
  },
});

export const StaffReducer = staffSlice.reducer;
