import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { onAuthenticated } from "../../API/axios";
import { apiList } from "../../API/apiIndex";

export const addRoom = createAsyncThunk(
  "room/addRoom",
  (data, { fulfillWithValue, rejectWithValue }) => {
    const payload = {
      url: apiList.addRoom,
      method: "post",
      data,
    };
    return onAuthenticated(payload)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

export const getRooms = createAsyncThunk(
  "room/getRoom",
  (data, { fulfillWithValue, rejectWithValue }) => {
    const payload = {
      url: apiList.getRoom,
      method: "get",
    };
    return onAuthenticated(payload)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

export const getRoomCount = createAsyncThunk(
  "room/getRoomCount",
  (data, { fulfillWithValue, rejectWithValue }) => {
    const payload = {
      url: apiList.getRoomCount,
      method: "get",
    };
    return onAuthenticated(payload)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

const roomSlice = createSlice({
  name: "room",
  initialState: {
    rooms: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addRoom.fulfilled, (state, { payload }) => {
      return {
        ...state,
        rooms: payload.data,
        error: false,
      };
    });
    builder.addCase(addRoom.rejected, (state, { payload }) => {
      return {
        ...state,
        error: true,
        erromrMessage: payload.data,
      };
    });

    builder.addCase(getRooms.fulfilled, (state, { payload }) => {
      return {
        ...state,
        rooms: payload.data,
        error: false,
      };
    });
    builder.addCase(getRooms.rejected, (state, { payload }) => {
      return {
        ...state,
        error: true,
        erromrMessage: payload.data,
      };
    });
    builder.addCase(getRoomCount.fulfilled, (state, { payload }) => {
      return {
        ...state,
        roomData: payload.data,
        error: false,
      };
    });
    builder.addCase(getRoomCount.rejected, (state, { payload }) => {
      return {
        ...state,
        error: true,
        erromrMessage: payload.data,
      };
    });
  },
});

export const RoomReducer = roomSlice.reducer;
