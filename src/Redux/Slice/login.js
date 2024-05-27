import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { onAuthenticated } from "../../API/axios";
import { apiList } from "../../API/apiIndex";

export const signinUser = createAsyncThunk(
  "login/signinUser",
  (data, { fulfillWithValue, rejectWithValue }) => {
    const payload = {
      url: apiList.login,
      method: "post",
      data,
    };
    console.log(payload, " <>?");
    return onAuthenticated(payload)
      .then((res) => fulfillWithValue(res))
      .catch((err) => rejectWithValue(err));
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    loginFlag: false,
    loginData: JSON.parse(sessionStorage.getItem("loginData") || "{}"),
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signinUser.fulfilled, (state, { payload }) => {
      sessionStorage.setItem("loginData", JSON.stringify(payload.data));
      return {
        ...state,
        loginFlag: true,
        loginData: payload.data,
        error: false,
      };
    });
    builder.addCase(signinUser.rejected, (state, { payload }) => {
      return {
        ...state,
        loginFlag: false,
        loginData: null,
      };
    });
  },
});

export const LoginReducer = loginSlice.reducer;
