import React from "react";
import { useDispatch, useSelector } from "react-redux";

import refreshIcon from "../../../util/Assets/Icon/refresh.png";
import Loading from "../../../Component/Loading/Loading";

import style from "./staffList.module.scss";
import { useNavigate } from "react-router-dom";

function StaffList() {
  const StaffSlice = useSelector((state) => state.staff);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className={style.staffContainer}>
      {StaffSlice.loading ? (
        <Loading />
      ) : (
        <>
          <div className={style.roomHeading}>
            <img
              src={refreshIcon}
              //   onClick={() => dispatch(getRooms())}
              className={style.refreshIocn}
            />
            <button
              className={style.addRoomBtn}
              onClick={() => navigate("/addStaff")}
            >
              Add Staff
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default StaffList;
