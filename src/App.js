import React, { Suspense, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Header from "./Component/Header/Header";
import Loading from "./Component/Loading/Loading";

import style from "./index.module.scss";
import PageTitle from "./Component/PageTitle/PageTitle";
import LeftNavigation from "./Component/LeftNavigation/LeftNavigation";

const Login = React.lazy(() => import("./Pages/Login/Login"));
const Home = React.lazy(() => import("./Pages/Home/Home"));
const Event = React.lazy(() => import("./Pages/Event/Event"));
const AddRoom = React.lazy(() => import("./Pages/Room/AddRoom/AddRoom"));
const RoomList = React.lazy(() => import("./Pages/Room/RoomList/RoomList"));

function App() {
  const [openleftNav, setOpenLeftNav] = useState(false);

  const { pathname } = useLocation();

  return (
    <div className={style.mainApp}>
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
      <div className={`${openleftNav ? style.extraMargin : style.mainPage}`}>
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
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
