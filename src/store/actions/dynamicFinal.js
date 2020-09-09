import * as actionTypes from "./actionTypes";
import axios from "../../axios-data";
import * as firebase from "firebase/app";
import "firebase/firestore";

export const submitDynamicFinalInputsSuccess = (id, dynamicFinalData) => {
  return {
    type: actionTypes.SUBMIT_DYNAMIC_PATH_COSTS_INPUTS_SUCCESS,
    dynamicFinalId: id,
    dynamicFinalData: dynamicFinalData,
  };
};

export const submitDynamicFinalInputsFail = (error) => {
  return {
    type: actionTypes.SUBMIT_DYNAMIC_FINAL_INPUTS_FAIL,
    error: error,
  };
};

export const submitDynamicFinalInputsStart = () => {
  return {
    type: actionTypes.SUBMIT_DYNAMIC_FINAL_INPUTS_START,
  };
};

export const removeDynamicFinal = (selectedDynamicFinal) => {
  console.log(selectedDynamicFinal);
  const dynamicFinalsFromLocalStorage = JSON.parse(
    localStorage.getItem("dynamicFinals")
  ).filter(
    (item) => item.StrippingRatio !== selectedDynamicFinal.StrippingRatio
  );
  localStorage.setItem(
    "dynamicFinals",
    JSON.stringify(dynamicFinalsFromLocalStorage)
  );
  return {
    type: actionTypes.REMOVE_DYNAMIC_FINAL,
    payload: selectedDynamicFinal,
  };
};

export const submitDynamicFinalInputs = (dynamicFinal, token) => {
  return (dispatch) => {
    dispatch(submitDynamicFinalInputsStart());
    dispatch({
      type: actionTypes.SUBMIT_DYNAMIC_FINAL_INPUTS_SUCCESS,
      payload: {
        ...dynamicFinal.dynamicFinalData,
      },
    });

    console.log(dynamicFinal.dynamicFinalData);
    const dynamicFinals = localStorage.getItem("dynamicFinals");
    if (dynamicFinals) {
      const dynamicFinalsList = JSON.parse(dynamicFinals);
      dynamicFinalsList.push({
        ...dynamicFinal.dynamicFinalData,
      });
      localStorage.setItem("dynamicFinals", JSON.stringify(dynamicFinalsList));
    } else {
      localStorage.setItem(
        "dynamicFinals",
        JSON.stringify([
          {
            ...dynamicFinal.dynamicFinalData,
          },
        ])
      );
    }
  };
};

export const rebuildDynamicFinalsFromLocalStorage = () => {
  const dynamicFinals = JSON.parse(localStorage.getItem("dynamicFinals"));
  return dynamicFinals
    ? {
        type: actionTypes.REBUILD_DYNAMIC_FINALS_FROM_LOCAL_STORAGE,
        payload: dynamicFinals,
      }
    : {
        type: actionTypes.REBUILD_DYNAMIC_FINALS_FROM_LOCAL_STORAGE,
        payload: [],
      };
};
