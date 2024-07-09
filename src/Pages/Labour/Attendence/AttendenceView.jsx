import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import refreshIcon from "../../../util/Assets/Icon/refresh.png";
import { getAttendence } from "../../../Redux/Slice/attendence";
import { getDaysInMonth, months } from "../../../util/util";
import Loading from "../../../Component/Loading/Loading";
import LeftArrow from "../../../util/Assets/Icon/leftArrow.png";
import RightArrow from "../../../util/Assets/Icon/rightArrow.png";

import style from "./attendence.module.scss";

function AttendenceView() {
  const [monthDays, setMonthDays] = useState({
    currentMonth: new Date().getMonth() + 1,
    currentYear: new Date().getFullYear(),
  });

  const { state } = useLocation();
  const dispatch = useDispatch();

  const date = new Date();
  const firstDay = new Date(
    date.getFullYear(),
    monthDays.currentMonth - 1,
    1
  ).toISOString();
  const lastDay = new Date(
    date.getFullYear(),
    monthDays.currentMonth,
    1
  ).toISOString();

  const AttendenceSlice = useSelector((state) => state.attendence);

  useEffect(() => {
    dispatch(
      getAttendence({ id: state.attendenceData._id, firstDay, lastDay })
    );
  }, [monthDays.currentMonth]);

  const getSalaryForMonth = () => {
    let total = 0;
    AttendenceSlice.attendenceData.forEach((fm) => {
      if (fm.present === 1) {
        console.log(fm, " <>??");
        total = total + state.attendenceData.earningPerDay;
      }
    });
    return total;
  };

  const calendarData = getDaysInMonth(
    monthDays.currentMonth - 1,
    monthDays.currentYear
  ).map((dayM, dayIndex) => {
    const obj = {
      date: dayM,
      id: dayIndex,
      present: false,
    };
    Array.isArray(AttendenceSlice.attendenceData) &&
      AttendenceSlice.attendenceData.map((am) => {
        if (am.attendenceDate.split("T")[0] === dayM) {
          obj.present = true;
        }
      });
    return { ...obj };
  });

  console.log(calendarData, " <>??");

  return (
    <div className={style.attendenceViewContainer}>
      {AttendenceSlice.loading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <div className={style.roomHeading}>
            <div className={style.labourDataContainer}>
              <div>
                <div className={style.labelHeading}>
                  Labour Name:
                  <span className={style.labelValue}>
                    {state.attendenceData.labourName}
                  </span>
                </div>
                <div className={style.labelHeading}>
                  Earning/Day:
                  <span className={style.labelValue}>
                    {state.attendenceData.earningPerDay}
                  </span>
                </div>
                <div className={style.labelHeading}>
                  Job Title:
                  <span className={style.labelValue}>
                    {state.attendenceData.labourPost}
                  </span>
                </div>
                <div className={style.labelHeading}>
                  Mobile Number:
                  <span className={style.labelValue}>
                    {state.attendenceData.mobileNumber}
                  </span>
                </div>
              </div>
              <div className={style.monthHeading}>
                Salary for
                <span className={style.monthValue}>
                  {" "}
                  {months[monthDays.currentMonth]}{" "}
                </span>
                Month:
                <span className={style.labelValue}>
                  {Array.isArray(AttendenceSlice.attendenceData)
                    ? getSalaryForMonth()
                    : 0}{" "}
                  Rs.
                </span>
              </div>
              <div className={style.actionContainer}>
                <div className={style.monthControlContainer}>
                  <div className={style.btnContainer}>
                    <img
                      src={LeftArrow}
                      onClick={() => {
                        if (monthDays.currentMonth > 1) {
                          setMonthDays({
                            ...monthDays,
                            currentMonth: monthDays.currentMonth - 1,
                          });
                        }
                      }}
                      alt="month chnage icon"
                      className={style.refreshIocn}
                    />
                    <img
                      src={RightArrow}
                      onClick={() => {
                        if (monthDays.currentMonth < 12) {
                          setMonthDays({
                            ...monthDays,
                            currentMonth: monthDays.currentMonth + 1,
                          });
                        }
                      }}
                      alt="month chnage icon"
                      className={style.refreshIocn}
                    />
                  </div>
                </div>
                <img
                  src={refreshIcon}
                  onClick={() =>
                    dispatch(
                      getAttendence({
                        id: state.attendenceData._id,
                        firstDay,
                        lastDay,
                      })
                    )
                  }
                  className={style.refreshIocn}
                />
              </div>
            </div>
          </div>
          <div className={style.attendenceContainer}>
            {calendarData.map((m, i) => {
              return (
                <div
                  className={`${style.dayContainer} ${
                    m.present && style.dayPresent
                  }`}
                  key={`day-${m.date}`}
                >
                  <div>
                    {new Date(m.date).toLocaleString("en-us", {
                      weekday: "short",
                    })}
                  </div>
                  <div>{i + 1}</div>
                  <div>{m.date}</div>
                </div>
              );
            })}
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default AttendenceView;
