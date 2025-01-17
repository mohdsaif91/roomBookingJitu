import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";

import { routeData } from "../../util/Assets/Data/routesData";

import style from "./leftNavigation.module.scss";

function LeftNavigation({ openleftNav }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <ul className={style.pageNavigationList}>
      {routeData.map((m) => (
        <li
          key={m.id}
          className={`${style.pageNavigationItem} ${
            m.subRoutes.includes(pathname) && style.itemActive
          }`}
          onClick={() => {
            navigate(m.route);
          }}
        >
          <img src={m.img} className={style.navIcon} />
          {/* <Tooltip
            id={`room-tool-tip-${m.name}`}
            place="right"
            content={<div>{m.name}</div>}
          /> */}
          {openleftNav && <label className={style.navLabel}>{m.name}</label>}
        </li>
      ))}
    </ul>
  );
}

export default LeftNavigation;
