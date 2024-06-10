import React from "react";
import { useNavigate } from "react-router-dom";

import refreshIcon from "../../../util/Assets/Icon/refresh.png";

import style from "./labourList.module.scss";

function LabourList() {
  const navigate = useNavigate();

  return (
    <div className={style.labourContainer}>
      <div className={style.roomHeading}>
        <img
          src={refreshIcon}
          // onClick={() => dispatch(getRooms())}
          className={style.refreshIocn}
        />
        <button
          className={style.addRoomBtn}
          onClick={() => navigate("/addLabour")}
        >
          Add Rooms
        </button>
      </div>
    </div>
  );
}

export default LabourList;
