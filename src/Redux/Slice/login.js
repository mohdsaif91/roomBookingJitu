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
    return onAuthenticated(payload)
      .then((res) => {
        console.log(res, " <>?");
        if (res.status === 200) {
          return fulfillWithValue(res);
        } else {
          return rejectWithValue(res.data.msg);
        }
      })
      .catch((err) => rejectWithValue(err));
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    loginFlag: false,
    loginData: JSON.parse(sessionStorage.getItem("loginData") || "{}"),
    loading: false,
    errMsg: "",
  },
  reducers: {
    logoutUser: (state) => {
      sessionStorage.clear();
      return {
        ...state,
        loginData: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signinUser.fulfilled, (state, { payload }) => {
      sessionStorage.setItem("loginData", JSON.stringify(payload.data));
      return {
        ...state,
        loginFlag: true,
        loginData: payload.data,
        error: false,
        loading: false,
      };
    });
    builder.addCase(signinUser.pending, (state, { payload }) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(signinUser.rejected, (state, { payload }) => {
      return {
        ...state,
        loginFlag: false,
        loginData: { role: "" },
        loading: false,
        errMsg: "No User Found !",
      };
    });
  },
});

export const LoginReducer = loginSlice.reducer;

export const { logoutUser } = loginSlice.actions;
