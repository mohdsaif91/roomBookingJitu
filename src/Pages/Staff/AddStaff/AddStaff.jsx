import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Loading from "../../../Component/Loading/Loading";
import { addStaff } from "../../../Redux/Slice/staff";

import style from "./addStaff.module.scss";
import { validateEmail } from "../../../util/util";

const initialState = {
  userName: "",
  mobileNumber: "",
  email: "",
  role: "staff",
  password: "admin",
};

function AddStaff() {
  const [staffData, setStaffData] = useState({ ...initialState });
  const [formvalidation, setFormValidation] = useState(false);

  const StaffSlice = useSelector((state) => state.staff);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitStaffData = () => {
    if (
      staffData.name === "" ||
      staffData.mobileNumber === "" ||
      !validateEmail(staffData.email)
    ) {
      setFormValidation(true);
    } else {
      setFormValidation(false);
      dispatch(addStaff(staffData));
      setStaffData({ ...initialState });
    }
  };

  return (
    <div className={style.addStaffContainer}>
      {StaffSlice.loading ? (
        <Loading />
      ) : (
        <div className={style.addStaffFormContainer}>
          <div className={style.formRow}>
            <div className={style.formItem}>
              <labal className={style.eventLabel}>Full name*</labal>
              <div className={style.formItem}>
                <input
                  className={style.eventInput}
                  value={staffData.name}
                  onChange={(e) =>
                    setStaffData({ ...staffData, name: e.target.value })
                  }
                />
                {formvalidation && staffData.name === "" && (
                  <div className={style.formValidationError}>
                    Full name is required
                  </div>
                )}
              </div>
            </div>
            <div className={style.formItem}>
              <labal className={style.eventLabel}>Mobile Number*</labal>
              <div className={style.formItem}>
                <input
                  className={style.eventInput}
                  value={staffData.mobileNumber}
                  onChange={(e) =>
                    setStaffData({
                      ...staffData,
                      mobileNumber: e.target.value,
                    })
                  }
                />
                {formvalidation && staffData.mobileNumber === "" && (
                  <div className={style.formValidationError}>
                    Mobile number is required
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={style.formRow}>
            <div className={style.formItem}>
              <labal className={style.eventLabel}>Email *</labal>
              <div className={style.formItem}>
                <input
                  className={style.eventInput}
                  value={staffData.email}
                  onChange={(e) =>
                    setStaffData({ ...staffData, email: e.target.value })
                  }
                />
                {formvalidation && staffData.email === "" && (
                  <div className={style.formValidationError}>
                    Email is required
                  </div>
                )}
                {staffData.email !== "" && !validateEmail(staffData.email) && (
                  <div className={style.formValidationError}>
                    Email is invalid
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={style.btnContainer}>
            <button
              className={style.resetBtn}
              onclick={() => setStaffData(initialState)}
            >
              Reset
            </button>

            {/* {state?.roomEditData ? (
              <button
                className={style.submitbtn}
                // onClick={() => updateRoomData()}
              >
                Update Room
              </button>
            ) : ( */}
            <button
              className={style.submitbtn}
              onClick={() => submitStaffData()}
            >
              Add Room
            </button>
            {/* )} */}
          </div>
        </div>
      )}
    </div>
  );
}

export default AddStaff;
