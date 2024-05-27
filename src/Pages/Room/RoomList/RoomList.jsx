import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";

import { getRooms } from "../../../Redux/Slice/room";
import refreshIcon from "../../../util/Assets/Icon/refresh.png";

import style from "./roomList.module.scss";
import "react-tooltip/dist/react-tooltip.css";

function RoomList() {
  const roomsSlice = useSelector((state) => state.room);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!roomsSlice.rooms) {
      dispatch(getRooms());
    }
  }, [roomsSlice.rooms]);

  const generateRoomCircle = (rm, index) => (
    <div
      data-tooltip-id={`room-tool-tip-${index}`}
      className={style.roomCircle}
      style={{ backgroundColor: rm.availabel ? "#19891c" : "red" }}
    >
      {rm.roomNumber}
      <Tooltip
        id={`room-tool-tip-${index}`}
        place="bottom"
        content={<div>{rm.noOfBed}</div>}
      />
    </div>
  );

  return (
    <div className={style.roomContainer}>
      <div className={style.roomHeading}>
        <img
          src={refreshIcon}
          onClick={() => dispatch(getRooms())}
          className={style.refreshIocn}
        />
        <button
          className={style.addRoomBtn}
          onClick={() => navigate("/addRoom")}
        >
          Add Rooms
        </button>
      </div>
      <div className={style.roomTableContainer}>
        {Array.isArray(roomsSlice.rooms) && (
          <>
            <table className={style.roomTable}>
              <tr className={style.tableHeaderRow}>
                <th className={style.tableHeaderRowItem}>Bhavan name</th>
                <th className={style.tableHeaderRowItem}>Landmark</th>
                <th className={style.tableHeaderRowItem}>Totle no.of room</th>
                <th className={style.tableHeaderRowItem}>Room amount</th>
                <th className={style.tableHeaderRowItem}>Rooms</th>
              </tr>
              {roomsSlice.rooms.map((m) => (
                <tr className={style.tableDataRow}>
                  <td className={style.tableDataRowItem}>{m.bhavanName}</td>
                  <td className={style.tableDataRowItem}>{m.landmark}</td>
                  <td className={style.tableDataRowItem}>{m.totalNoOfRooms}</td>
                  <td className={style.tableDataRowItem}>{m.roomAmount}</td>
                  <td
                    className={`${style.roomCircleContainer} ${style.tableDataRowItem}`}
                  >
                    {m.rooms.map((rm, index) => generateRoomCircle(rm, index))}
                  </td>
                </tr>
              ))}
            </table>
            {roomsSlice.rooms.length === 0 && (
              <div className={style.noData}>No Data !</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default RoomList;
