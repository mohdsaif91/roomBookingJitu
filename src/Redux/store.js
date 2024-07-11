import { configureStore } from "@reduxjs/toolkit";

import { LoginReducer } from "./Slice/login";
import { RoomReducer } from "./Slice/room";
import { BookingReducer } from "./Slice/booking";
import { LabourReducer } from "./Slice/labour";
import { AttendenceReducer } from "./Slice/attendence";
import { EventReducer } from "./Slice/event";
import { StaffReducer } from "./Slice/staff";

const reducer = {
  login: LoginReducer,
  room: RoomReducer,
  booking: BookingReducer,
  labour: LabourReducer,
  attendence: AttendenceReducer,
  event: EventReducer,
  staff: StaffReducer,
};

export const store = configureStore({
  reducer,
});
