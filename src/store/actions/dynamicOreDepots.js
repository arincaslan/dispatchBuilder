import * as actionTypes from "./actionTypes";
import axios from "../../axios-data";
import * as firebase from "firebase/app";
import "firebase/firestore";

export const submitDynamicOreDepotInputsSuccess = (
  id,
  dynamicOreDepotsData
) => {
  return {
    type: actionTypes.SUBMIT_DYNAMIC_PATH_COSTS_INPUTS_SUCCESS,
    dynamicOreDepotsId: id,
    dynamicOreDepotsData: dynamicOreDepotsData,
  };
};

export const submitDynamicOreDepotInputsFail = (error) => {
  return {
    type: actionTypes.SUBMIT_DYNAMIC_OREDEPOT_INPUTS_FAIL,
    error: error,
  };
};

export const submitDynamicOreDepotInputsStart = () => {
  return {
    type: actionTypes.SUBMIT_DYNAMIC_OREDEPOT_INPUTS_START,
  };
};

export const removeDynamicOreDepot = (selectedDynamicOreDepot) => {
  console.log(selectedDynamicOreDepot);
  const dynamicOreDepotsFromLocalStorage = JSON.parse(
    localStorage.getItem("dynamicOreDepots")
  ).filter(
    (item) =>
      item.DynamicOreDepotNodes !== selectedDynamicOreDepot.DynamicOreDepotNodes
  );
  localStorage.setItem(
    "dynamicOreDepots",
    JSON.stringify(dynamicOreDepotsFromLocalStorage)
  );
  return {
    type: actionTypes.REMOVE_DYNAMIC_OREDEPOT,
    payload: selectedDynamicOreDepot,
  };
};

export const submitDynamicOreDepotInputs = (dynamicOreDepot, token) => {
  return (dispatch) => {
    dispatch(submitDynamicOreDepotInputsStart());
    dispatch({
      type: actionTypes.SUBMIT_DYNAMIC_OREDEPOT_INPUTS_SUCCESS,
      payload: {
        ...dynamicOreDepot.dynamicOreDepotsData,
      },
    });

    console.log(dynamicOreDepot.dynamicOreDepotsData);
    const dynamicOreDepots = localStorage.getItem("dynamicOreDepots");
    if (dynamicOreDepots) {
      const dynamicOreDepotsList = JSON.parse(dynamicOreDepots);
      dynamicOreDepotsList.push({
        ...dynamicOreDepot.dynamicOreDepotsData,
      });
      localStorage.setItem(
        "dynamicOreDepots",
        JSON.stringify(dynamicOreDepotsList)
      );
    } else {
      localStorage.setItem(
        "dynamicOreDepots",
        JSON.stringify([
          {
            ...dynamicOreDepot.dynamicOreDepotsData,
          },
        ])
      );
    }
  };
};

export const rebuildDynamicOreDepotsFromLocalStorage = () => {
  const dynamicOreDepots = JSON.parse(localStorage.getItem("dynamicOreDepots"));
  return dynamicOreDepots
    ? {
        type: actionTypes.REBUILD_DYNAMIC_OREDEPOTS_FROM_LOCAL_STORAGE,
        payload: dynamicOreDepots,
      }
    : {
        type: actionTypes.REBUILD_DYNAMIC_OREDEPOTS_FROM_LOCAL_STORAGE,
        payload: [],
      };
};
