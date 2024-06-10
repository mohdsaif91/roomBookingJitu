import React from "react";

import style from "./loading.module.scss";

function Loading() {
  return (
    <div className={style.loadingContainer}>
      <div className={style.loading}></div>
    </div>
  );
}

export default Loading;
