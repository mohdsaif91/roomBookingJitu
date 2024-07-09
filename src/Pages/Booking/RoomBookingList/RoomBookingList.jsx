import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import Loading from "../../../Component/Loading/Loading";
import refreshIcon from "../../../util/Assets/Icon/refresh.png";
import deleteIcon from "../../../util/Assets/Icon/delete.png";
import { deleteBookedRoom, getBookedRooms } from "../../../Redux/Slice/booking";

import style from "./roomBookingList.module.scss";

function RoomBookingList() {
  const RoomBookingSlice = useSelector((state) => state.booking);
  const AuthDataSlice = useSelector((state) => state.login);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!RoomBookingSlice.booking) {
      dispatch(getBookedRooms());
    }
  }, [RoomBookingSlice.booking]);

  return (
    <div className={style.roomBookingContainer}>
      {RoomBookingSlice.loading ? (
        <Loading />
      ) : (
        <>
          <div className={style.roomHeading}>
            <img
              src={refreshIcon}
              onClick={() => dispatch(getBookedRooms())}
              className={style.refreshIocn}
            />
          </div>
          <div className={style.roomBookingTableContainer}>
            {Array.isArray(RoomBookingSlice.booking) && (
              <table className={style.roomTable}>
                <tr className={style.tableHeaderRow}>
                  <th
                    scope="col"
                    rowspan="2"
                    className={style.tableHeaderRowItem}
                  >
                    Sr #
                  </th>
                  <th
                    scope="col"
                    rowspan="2"
                    className={style.tableHeaderRowItem}
                  >
                    Booking Name
                  </th>
                  <th colspan="2" className={style.tableHeaderRowItem}>
                    Members
                  </th>
                  <th
                    scope="col"
                    rowspan="2"
                    className={style.tableHeaderRowItem}
                  >
                    Mobile Number
                  </th>
                  <th
                    scope="col"
                    rowspan="2"
                    className={style.tableHeaderRowItem}
                  >
                    Booking From
                  </th>
                  <th
                    scope="col"
                    rowspan="2"
                    className={style.tableHeaderRowItem}
                  >
                    Booking Till
                  </th>
                  {AuthDataSlice.loginData.role === "superAdmin" && (
                    <th className={style.tableHeaderRowItem}>Action</th>
                  )}
                </tr>
                <tr>
                  <th
                    scope="col"
                    className={`${style.tableHeaderRowItem} ${style.extraCol}`}
                  >
                    Total
                  </th>
                  <th
                    scope="col"
                    className={`${style.tableHeaderRowItem} ${style.extraCol}`}
                  >
                    Alloted
                  </th>
                </tr>
                {RoomBookingSlice.booking.map((m, i) => (
                  <tr className={style.tableDataRow} key={m._id}>
                    <td className={style.tableDataRowItem}>{i + 1}</td>
                    <td className={style.tableDataRowItem}>{m.fullName}</td>
                    <td className={style.tableDataRowItem}>{m.familyMember}</td>
                    <td className={style.tableDataRowItem}>
                      {m.memberAllotted}
                    </td>
                    <td className={style.tableDataRowItem}>{m.mobileNumber}</td>
                    <td className={style.tableDataRowItem}>
                      {moment().format("YYYY/MM/DD", m.bookingFrom)}
                    </td>
                    <td className={style.tableDataRowItem}>
                      {moment().format("YYYY/MM/DD", m.bookingTill)}
                    </td>
                    {AuthDataSlice.loginData.role === "superAdmin" && (
                      <td className={style.tableDataRowItem}>
                        <img
                          src={deleteIcon}
                          onClick={() => dispatch(deleteBookedRoom(m._id))}
                          className={style.actionIcon}
                        />
                      </td>
                    )}
                  </tr>
                ))}
              </table>
            )}
            {Array.isArray(RoomBookingSlice.booking) &&
              RoomBookingSlice.booking.length === 0 && (
                <div className={style.noData}>No Data !</div>
              )}
          </div>
        </>
      )}
    </div>
  );
}

export default RoomBookingList;
