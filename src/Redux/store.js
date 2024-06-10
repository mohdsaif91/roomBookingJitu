import { configureStore } from "@reduxjs/toolkit";

import { LoginReducer } from "./Slice/login";
import { RoomReducer } from "./Slice/room";
import { BookingReducer } from "./Slice/booking";

const reducer = {
  login: LoginReducer,
  room: RoomReducer,
  booking: BookingReducer,
};

export const store = configureStore({
  reducer,
});
