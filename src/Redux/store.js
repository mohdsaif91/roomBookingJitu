import { configureStore } from "@reduxjs/toolkit";

import { LoginReducer } from "./Slice/login";
import { RoomReducer } from "./Slice/room";

const reducer = {
  login: LoginReducer,
  room: RoomReducer,
};

export const store = configureStore({
  reducer,
});
