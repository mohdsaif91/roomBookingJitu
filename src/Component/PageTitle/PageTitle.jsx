import React from "react";
import { useLocation } from "react-router-dom";

import style from "./pageTitle.module.scss";

function PageTitle() {
  const { pathname } = useLocation();

  return <div className={style.pageTitle}>{pathname.split("/").pop()}</div>;
}

export default PageTitle;
