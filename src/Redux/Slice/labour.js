import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { apiList } from "../../API/apiIndex";
import { onAuthenticated } from "../../API/axios";

export const addLabour = createAsyncThunk(
  "labour/addLabour",
  (data, { fulfillWithValue, rejectWithValue }) => {
    const payload = {
      url: apiList.addLabour,
      method: "post",
      data,
    };
    return onAuthenticated(payload, true)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

export const markAttendence = createAsyncThunk(
  "labour/markAttendence",
  (data, { fulfillWithValue, rejectWithValue }) => {
    const payload = {
      url: apiList.markAttendence,
      method: "post",
      data,
    };
    return onAuthenticated(payload)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

export const getLabourList = createAsyncThunk(
  "labour/getlabourlist",
  (data, { fulfillWithValue, rejectWithValue }) => {
    const payload = {
      url: apiList.getLabour,
      method: "get",
    };
    return onAuthenticated(payload, true)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

const labourSlice = createSlice({
  name: "labour",
  initialState: {
    loading: false,
    labourData: null,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addLabour.fulfilled, (state, { payload }) => {
      return {
        ...state,
        loading: false,
        labourData: payload.data,
      };
    });
    builder.addCase(addLabour.pending, (state, { payload }) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(addLabour.rejected, (state, { payload }) => {
      return {
        ...state,
        loading: false,
        error: payload.data,
      };
    });
    builder.addCase(getLabourList.fulfilled, (state, { payload }) => {
      return {
        ...state,
        loading: false,
        labourData: payload.data,
      };
    });
    builder.addCase(getLabourList.pending, (state, { payload }) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(getLabourList.rejected, (state, { payload }) => {
      return {
        ...state,
        loading: false,
        error: payload.data,
      };
    });
    builder.addCase(markAttendence.fulfilled, (state, { payload }) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(markAttendence.pending, (state, { payload }) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(markAttendence.rejected, (state, { payload }) => {
      return {
        ...state,
        error: payload.data,
      };
    });
  },
});

export const LabourReducer = labourSlice.reducer;
