import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getRoomCount } from "../../Redux/Slice/room";

import style from "./home.module.scss";

function Home() {
  const roomSlice = useSelector((state) => state.room);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(roomSlice, "<>?");
    if (!roomSlice.roomCount) {
      dispatch(getRoomCount());
    }
  }, []);

  return (
    <div className={style.homeContainer}>
      <div className={style.cardContainer}>
        <div className={`${style.cardItem} ${style.primaryCard}`}>
          <label className={style.cardLabel}>Total no.of rooms</label>
          <div>
            <label className={style.labelValue}>10</label>
          </div>
        </div>
        <div className={`${style.cardItem} ${style.secondaryCard}`}>
          <label className={style.cardLabel}>Alotted rooms</label>
          <div>
            <label className={style.labelValue}>6</label>
          </div>
        </div>
        <div className={`${style.cardItem} ${style.tertiaryCard}`}>
          <label className={style.cardLabel}>Empty rooms</label>
          <div>
            <label className={style.labelValue}>4</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
