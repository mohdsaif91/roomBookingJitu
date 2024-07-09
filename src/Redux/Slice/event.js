import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { onAuthenticated } from "../../API/axios";
import { apiList } from "../../API/apiIndex";

export const addEvent = createAsyncThunk(
  "event/addEvent",
  (data, { fulfillWithValue, rejectWithValue }) => {
    const payload = {
      url: apiList.addEvent,
      method: "post",
      data,
    };
    return onAuthenticated(payload)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

export const getEventData = createAsyncThunk(
  "event/getEventData",
  (data, { fulfillWithValue, rejectWithValue }) => {
    const payload = {
      url: apiList.getEventData,
      method: "get",
    };
    return onAuthenticated(payload)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

const eventSlice = createSlice({
  name: "event",
  initialState: {
    loading: false,
    eventData: null,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addEvent.fulfilled, (state, { payload }) => {
      return {
        ...state,
        eventData: payload.data,
        loading: false,
      };
    });
    builder.addCase(addEvent.rejected, (state, { payload }) => {
      return {
        ...state,
        error: payload.data,
        loading: false,
      };
    });
    builder.addCase(addEvent.pending, (state, { payload }) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(getEventData.fulfilled, (state, { payload }) => {
      return {
        ...state,
        eventData: payload.data,
        loading: false,
      };
    });
    builder.addCase(getEventData.rejected, (state, { payload }) => {
      return {
        ...state,
        error: payload.data,
        loading: false,
      };
    });
    builder.addCase(getEventData.pending, (state, { payload }) => {
      return {
        ...state,
        loading: true,
      };
    });
  },
});

export const EventReducer = eventSlice.reducer;
