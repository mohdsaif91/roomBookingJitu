export const validatemobile = (mobileNumber) => {
  return mobileNumber.match(/^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/);
};
