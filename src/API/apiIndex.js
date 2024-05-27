const v1 = "/api/v1";

const signinV1 = `${v1}/login`;
const roomV1 = `${v1}/room`;

export const apiList = {
  login: signinV1,
  addRoom: `${roomV1}/addRoom`,
  getRoom: roomV1,
  getRoomCount: `${roomV1}/count`,
};
