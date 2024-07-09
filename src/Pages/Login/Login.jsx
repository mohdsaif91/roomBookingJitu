import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { signinUser } from "../../Redux/Slice/login";

import style from "./login.module.scss";
import Loading from "../../Component/Loading/Loading";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const loginData = useSelector((state) => state.login);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginData.loginFlag) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginData]);

  const submitCred = () => {
    dispatch(signinUser({ userName, password }));
    // navigate("/dashboard");
  };
  return (
    <div className={style.loginContainer}>
      {loginData.loading ? (
        <Loading />
      ) : (
        <div className={style.formContainer}>
          <input
            className={style.loginInput}
            value={userName}
            placeholder="User name"
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="password"
            className={style.loginInput}
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={style.loginBtn} onClick={() => submitCred()}>
            Login
          </button>
          {loginData.errMsg !== "" && (
            <div className={style.errMsg}>{loginData.errMsg}</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Login;
