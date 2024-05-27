import React from "react";
import { useNavigate } from "react-router-dom";

import userAvatar from "../../util/Assets/Icon/userAvatar.png";

import style from "./header.module.scss";

function Header({ openCloseDrawer, drawerOpenClose }) {
  const navigate = useNavigate();
  return (
    <div className={style.headerContainer}>
      <button
        className={style.buttonToggleMenu}
        onClick={() => openCloseDrawer(!drawerOpenClose)}
      >
        <div className={style.menuLine} />
        <div className={style.menuLine} />
        <div className={style.menuLine} />
      </button>
      <div
        className={style.userAvatarContainer}
        onClick={() => {
          sessionStorage.clear();
          navigate("/login");
        }}
      >
        <img src={userAvatar} className={style.userAvatarIcon} />
      </div>
    </div>
  );
}

export default Header;
