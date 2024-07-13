import React from "react";

import style from "./updateProfile.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../../../Component/Loading/Loading";
import Axios from "axios";

function UpdateProfile() {
  const AuthSlice = useSelector((state) => state.login);
  const navigate = useNavigate();
  return (
    <div className={style.updateProfileContainer}>
      {AuthSlice.loading ? (
        <Loading />
      ) : (
        <div className={style.updateProfileFormContainer}>
          <button
            className={style.logoutBtn}
            onClick={() => {
              Axios.post("https://seedboat.qortechno.com/auth/login", {
                email: "stack9167@gmail.com",
              }).then((res) => {
                console.log(res);
              });
            }}
            // onClick={() => navigate("/login")}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

export default UpdateProfile;
