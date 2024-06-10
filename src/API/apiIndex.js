const v1 = "/api/v1";

const signinV1 = `${v1}/login`;
const roomV1 = `${v1}/room`;
const roomBookingV1 = `${v1}/booking`;

export const apiList = {
  login: signinV1,
  addRoom: `${roomV1}/addRoom`,
  getRoom: roomV1,
  getRoomCount: `${roomV1}/count`,
  updateRoom: `${roomV1}/updateRoom`,
  deleteRoom: roomV1,
  roomBooking: `${roomBookingV1}/addBooking`,
  viewSingleRoom: `${roomV1}/viewSingleBooking`,
};
