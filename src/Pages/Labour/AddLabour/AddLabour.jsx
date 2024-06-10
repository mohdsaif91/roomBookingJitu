import React, { useState } from "react";

import style from "./addLabour.module.scss";

const initialState = {
  labourName: "",
  mobileNumber: "",
  labourId: "",
  earningPerDay: 0,
  labourPost: "",
};

function AddLabour() {
  const [labourData, setLabourData] = useState({ ...initialState });
  const [formvalidation, setFormValidation] = useState(false);
  return (
    <div className={style.addLabourContainer}>
      <div className={style.formContainer}>
        <div className={style.formRow}>
          <div className={style.formItem}>
            <labal className={style.eventLabel}>Labour name*</labal>
            <div className={style.formItem}>
              <input
                className={style.eventInput}
                value={labourData.labourName}
                onChange={(e) =>
                  setLabourData({ ...labourData, labourName: e.target.value })
                }
              />
              {formvalidation && labourData.labourName === "" && (
                <div className={style.formValidationError}>
                  Labour name is required
                </div>
              )}
            </div>
          </div>
          <div className={style.formItem}>
            <labal className={style.eventLabel}>Mobile number*</labal>
            <div className={style.formItem}>
              <input
                type="number"
                className={style.eventInput}
                value={labourData.mobileNumber}
                onChange={(e) =>
                  setLabourData({
                    ...mobileNumber,
                    mobileNumber: e.target.value,
                  })
                }
              />
              {formvalidation && labourData.mobileNumber === "" && (
                <div className={style.formValidationError}>
                  Mobile number is required.
                </div>
              )}
              {!validatemobile(labourData.mobileNumber) &&
                labourData.mobileNumber !== "" && (
                  <div className={style.formValidationError}>
                    Mobile number is not valid.
                  </div>
                )}
            </div>
          </div>
        </div>
        <div className={style.formRow}>
          <div className={style.formItem}>
            <labal className={style.eventLabel}>Amount per room</labal>
            <div className={style.formItem}>
              <input
                type="number"
                className={style.eventInput}
                onChange={(e) =>
                  setRoomData({ ...roomData, roomAmount: e.target.value })
                }
                value={roomData.roomAmount}
              />
            </div>
          </div>
          <div className={`${style.formItem} ${style.checkboxContainer}`}>
            <input
              type="checkbox"
              checked={sameBedFlag}
              onChange={() => {
                setGeneratedRooms([]);
                setSameBedFlag((state) => !state);
              }}
            />
            <label>All the rooms have same beds</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddLabour;
