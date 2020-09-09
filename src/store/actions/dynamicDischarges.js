import * as actionTypes from "./actionTypes";
import axios from "../../axios-data";
import * as firebase from "firebase/app";
import "firebase/firestore";

export const submitDynamicDischargeInputsSuccess = (
  id,
  dynamicDischargeData
) => {
  return {
    type: actionTypes.SUBMIT_DYNAMIC_PATH_COSTS_INPUTS_SUCCESS,
    dynamicDischargeId: id,
    dynamicDischargeData: dynamicDischargeData,
  };
};

export const submitDynamicDischargeInputsFail = (error) => {
  return {
    type: actionTypes.SUBMIT_DYNAMIC_DISCHARGE_INPUTS_FAIL,
    error: error,
  };
};

export const submitDynamicDischargeInputsStart = () => {
  return {
    type: actionTypes.SUBMIT_DYNAMIC_DISCHARGE_INPUTS_START,
  };
};

export const removeDynamicDischarge = (selectedDynamicDischarge) => {
  console.log(selectedDynamicDischarge);
  const dynamicDischargesFromLocalStorage = JSON.parse(
    localStorage.getItem("dynamicDischarges")
  ).filter(
    (item) =>
      item.DynamicDischargeNodes !==
      selectedDynamicDischarge.DynamicDischargeNodes
  );
  localStorage.setItem(
    "dynamicDischarges",
    JSON.stringify(dynamicDischargesFromLocalStorage)
  );
  return {
    type: actionTypes.REMOVE_DYNAMIC_DISCHARGE,
    payload: selectedDynamicDischarge,
  };
};

export const submitDynamicDischargeInputs = (dynamicDischarge, token) => {
  return (dispatch) => {
    dispatch(submitDynamicDischargeInputsStart());
    dispatch({
      type: actionTypes.SUBMIT_DYNAMIC_DISCHARGE_INPUTS_SUCCESS,
      payload: {
        ...dynamicDischarge.dynamicDischargeData,
      },
    });

    console.log(dynamicDischarge.dynamicDischargeData);
    const dynamicDischarges = localStorage.getItem("dynamicDischarges");
    if (dynamicDischarges) {
      const dynamicDischargesList = JSON.parse(dynamicDischarges);
      dynamicDischargesList.push({
        ...dynamicDischarge.dynamicDischargeData,
      });
      localStorage.setItem(
        "dynamicDischarges",
        JSON.stringify(dynamicDischargesList)
      );
    } else {
      localStorage.setItem(
        "dynamicDischarges",
        JSON.stringify([
          {
            ...dynamicDischarge.dynamicDischargeData,
          },
        ])
      );
    }
  };
};

export const rebuildDynamicDischargesFromLocalStorage = () => {
  const dynamicDischarges = JSON.parse(
    localStorage.getItem("dynamicDischarges")
  );
  return dynamicDischarges
    ? {
        type: actionTypes.REBUILD_DYNAMIC_DISCHARGES_FROM_LOCAL_STORAGE,
        payload: dynamicDischarges,
      }
    : {
        type: actionTypes.REBUILD_DYNAMIC_DISCHARGES_FROM_LOCAL_STORAGE,
        payload: [],
      };
};
