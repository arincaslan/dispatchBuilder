import * as actionTypes from "./actionTypes";
import axios from "../../axios-data";
import * as firebase from "firebase/app";
import "firebase/firestore";

export const submitDynamicShowelInputsSuccess = (id, dynamicShowelsData) => {
  return {
    type: actionTypes.SUBMIT_DYNAMIC_PATH_COSTS_INPUTS_SUCCESS,
    dynamicShowelsId: id,
    dynamicShowelsData: dynamicShowelsData,
  };
};

export const submitDynamicShowelInputsFail = (error) => {
  return {
    type: actionTypes.SUBMIT_DYNAMIC_SHOWEL_INPUTS_FAIL,
    error: error,
  };
};

export const submitDynamicShowelInputsStart = () => {
  return {
    type: actionTypes.SUBMIT_DYNAMIC_SHOWEL_INPUTS_START,
  };
};

export const removeDynamicShowel = (selectedDynamicShowel) => {
  console.log(selectedDynamicShowel);
  const dynamicShowelsFromLocalStorage = JSON.parse(
    localStorage.getItem("dynamicShowels")
  ).filter(
    (item) =>
      item.DynamicShowelNodes !== selectedDynamicShowel.DynamicShowelNodes
  );
  localStorage.setItem(
    "dynamicShowels",
    JSON.stringify(dynamicShowelsFromLocalStorage)
  );
  return {
    type: actionTypes.REMOVE_DYNAMIC_SHOWEL,
    payload: selectedDynamicShowel,
  };
};

export const submitDynamicShowelInputs = (dynamicShowel, token) => {
  return (dispatch) => {
    dispatch(submitDynamicShowelInputsStart());
    dispatch({
      type: actionTypes.SUBMIT_DYNAMIC_SHOWEL_INPUTS_SUCCESS,
      payload: {
        ...dynamicShowel.dynamicShowelsData,
      },
    });

    console.log(dynamicShowel.dynamicShowelsData);
    const dynamicShowels = localStorage.getItem("dynamicShowels");
    if (dynamicShowels) {
      const dynamicShowelsList = JSON.parse(dynamicShowels);
      dynamicShowelsList.push({
        ...dynamicShowel.dynamicShowelsData,
      });
      localStorage.setItem(
        "dynamicShowels",
        JSON.stringify(dynamicShowelsList)
      );
    } else {
      localStorage.setItem(
        "dynamicShowels",
        JSON.stringify([
          {
            ...dynamicShowel.dynamicShowelsData,
          },
        ])
      );
    }
  };
};

export const rebuildDynamicShowelsFromLocalStorage = () => {
  const dynamicShowels = JSON.parse(localStorage.getItem("dynamicShowels"));
  return dynamicShowels
    ? {
        type: actionTypes.REBUILD_DYNAMIC_SHOWELS_FROM_LOCAL_STORAGE,
        payload: dynamicShowels,
      }
    : {
        type: actionTypes.REBUILD_DYNAMIC_SHOWELS_FROM_LOCAL_STORAGE,
        payload: [],
      };
};
