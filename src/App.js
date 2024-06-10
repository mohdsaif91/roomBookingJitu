import React, { Suspense, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Header from "./Component/Header/Header";
import Loading from "./Component/Loading/Loading";

import style from "./index.module.scss";
import PageTitle from "./Component/PageTitle/PageTitle";
import LeftNavigation from "./Component/LeftNavigation/LeftNavigation";
import { useSelector } from "react-redux";

const Login = React.lazy(() => import("./Pages/Login/Login"));
const Home = React.lazy(() => import("./Pages/Home/Home"));
const Event = React.lazy(() => import("./Pages/Event/Event"));
const AddRoom = React.lazy(() => import("./Pages/Room/AddRoom/AddRoom"));
const RoomList = React.lazy(() => import("./Pages/Room/RoomList/RoomList"));
const ViewBooking = React.lazy(() =>
  import("./Pages/Room/ViewBooking/ViewBooking")
);
const LabourList = React.lazy(() =>
  import("./Pages/Labour/LabourList/LabourList")
);
const LabourData = React.lazy(() =>
  import("./Pages/Labour/AddLabour/AddLabour")
);

function App() {
  const [openleftNav, setOpenLeftNav] = useState(false);

  const authData = useSelector((state) => state.login);

  const { pathname } = useLocation();

  console.log(
    authData?.loginData.role !== "superAdmin" ||
      authData?.loginData.role !== "staff",
    " <>?"
  );

  return (
    <div className={style.mainApp}>
      {(authData?.loginData.role === "superAdmin" ||
        authData?.loginData.role === "staff") && (
        <div
          className={`${style.navigation}
          ${
            openleftNav
              ? style.largVerticalNavigation
              : style.verticalNavigation
          }
        `}
        >
          <LeftNavigation openleftNav={openleftNav} />
        </div>
      )}
      <div
        className={`${
          openleftNav
            ? style.extraMargin
            : authData?.loginData.role === "superAdmin" ||
              authData?.loginData.role === "staff"
            ? style.mainPage
            : style.rmMargin
        }`}
      >
        {pathname !== "/login" && (
          <Header
            openCloseDrawer={(openCloseFlag) => setOpenLeftNav(openCloseFlag)}
            drawerOpenClose={openleftNav}
          />
        )}
        <div className={style.mainPageScss}>
          <PageTitle />
          <Routes>
            <Route
              path="/login"
              element={
                <Suspense fallback={<Loading />}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path="/"
              element={
                <Suspense fallback={<Loading />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/event"
              element={
                <Suspense fallback={<Loading />}>
                  <Event />
                </Suspense>
              }
            />
            <Route
              path="/room"
              element={
                <Suspense fallback={<Loading />}>
                  <RoomList />
                </Suspense>
              }
            />
            <Route
              path="/addRoom"
              element={
                <Suspense fallback={<Loading />}>
                  <AddRoom />
                </Suspense>
              }
            />
            <Route
              path="/viewBooking"
              element={
                <Suspense fallback={<Loading />}>
                  <ViewBooking />
                </Suspense>
              }
            />
            <Route
              path="/labour"
              element={
                <Suspense fallback={<Loading />}>
                  <LabourList />
                </Suspense>
              }
            />
            <Route
              path="/addLabour"
              element={
                <Suspense fallback={<Loading />}>
                  <LabourData />
                </Suspense>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
