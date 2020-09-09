import * as actionTypes from "./actionTypes";
import axios from "../../axios-data";
import * as firebase from "firebase/app";
import "firebase/firestore";

export const submitDynamicCrusherInputsSuccess = (id, dynamicCrushersData) => {
  return {
    type: actionTypes.SUBMIT_DYNAMIC_PATH_COSTS_INPUTS_SUCCESS,
    dynamicCrushersId: id,
    dynamicCrushersData: dynamicCrushersData,
  };
};

export const submitDynamicCrusherInputsFail = (error) => {
  return {
    type: actionTypes.SUBMIT_DYNAMIC_CRUSHER_INPUTS_FAIL,
    error: error,
  };
};

export const submitDynamicCrusherInputsStart = () => {
  return {
    type: actionTypes.SUBMIT_DYNAMIC_CRUSHER_INPUTS_START,
  };
};

export const removeDynamicCrusher = (selectedDynamicCrusher) => {
  console.log(selectedDynamicCrusher);
  const dynamicCrushersFromLocalStorage = JSON.parse(
    localStorage.getItem("dynamicCrushers")
  ).filter(
    (item) =>
      item.DynamicCrusherNodes !== selectedDynamicCrusher.DynamicCrusherNodes
  );
  localStorage.setItem(
    "dynamicCrushers",
    JSON.stringify(dynamicCrushersFromLocalStorage)
  );
  return {
    type: actionTypes.REMOVE_DYNAMIC_CRUSHER,
    payload: selectedDynamicCrusher,
  };
};

export const submitDynamicCrusherInputs = (dynamicCrusher, token) => {
  return (dispatch) => {
    dispatch(submitDynamicCrusherInputsStart());
    dispatch({
      type: actionTypes.SUBMIT_DYNAMIC_CRUSHER_INPUTS_SUCCESS,
      payload: {
        ...dynamicCrusher.dynamicCrushersData,
      },
    });

    console.log(dynamicCrusher.dynamicCrushersData);
    const dynamicCrushers = localStorage.getItem("dynamicCrushers");
    if (dynamicCrushers) {
      const dynamicCrushersList = JSON.parse(dynamicCrushers);
      dynamicCrushersList.push({
        ...dynamicCrusher.dynamicCrushersData,
      });
      localStorage.setItem(
        "dynamicCrushers",
        JSON.stringify(dynamicCrushersList)
      );
    } else {
      localStorage.setItem(
        "dynamicCrushers",
        JSON.stringify([
          {
            ...dynamicCrusher.dynamicCrushersData,
          },
        ])
      );
    }
  };
};

export const rebuildDynamicCrushersFromLocalStorage = () => {
  const dynamicCrushers = JSON.parse(localStorage.getItem("dynamicCrushers"));
  return dynamicCrushers
    ? {
        type: actionTypes.REBUILD_DYNAMIC_CRUSHERS_FROM_LOCAL_STORAGE,
        payload: dynamicCrushers,
      }
    : {
        type: actionTypes.REBUILD_DYNAMIC_CRUSHERS_FROM_LOCAL_STORAGE,
        payload: [],
      };
};
