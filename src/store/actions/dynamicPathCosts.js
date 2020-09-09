import * as actionTypes from "./actionTypes";
import axios from "../../axios-data";
import * as firebase from "firebase/app";
import "firebase/firestore";

export const submitDynamicPathInputsSuccess = (id, dynamicPathCostsData) => {
  return {
    type: actionTypes.SUBMIT_DYNAMIC_PATH_COSTS_INPUTS_SUCCESS,
    dynamicPathId: id,
    dynamicPathCostsData: dynamicPathCostsData,
  };
};

export const submitDynamicPathCostsInputsFail = (error) => {
  return {
    type: actionTypes.SUBMIT_DYNAMIC_PATH_COSTS_INPUTS_FAIL,
    error: error,
  };
};

export const submitDynamicPathCostsInputsStart = () => {
  return {
    type: actionTypes.SUBMIT_DYNAMIC_PATH_COSTS_INPUTS_START,
  };
};

export const removeDynamicPathCost = (selectedDynamicPathCost) => {
  console.log(selectedDynamicPathCost);
  const dynamicPathCostsFromLocalStorage = JSON.parse(
    localStorage.getItem("dynamicPathCosts")
  ).filter(
    (item) =>
      item.DynamicConcatenatedPaths !==
      selectedDynamicPathCost.DynamicConcatenatedPaths
  );
  localStorage.setItem(
    "dynamicPathCosts",
    JSON.stringify(dynamicPathCostsFromLocalStorage)
  );
  return {
    type: actionTypes.REMOVE_DYNAMIC_PATH_COST,
    payload: selectedDynamicPathCost,
  };
};

export const submitDynamicPathCostsInputs = (dynamicPathCost, token) => {
  return (dispatch) => {
    dispatch(submitDynamicPathCostsInputsStart());
    dispatch({
      type: actionTypes.SUBMIT_DYNAMIC_PATH_COSTS_INPUTS_SUCCESS,
      payload: {
        ...dynamicPathCost.dynamicPathCostsData,
      },
    });
    const dynamicPathCosts = localStorage.getItem("dynamicPathCosts");
    if (dynamicPathCosts) {
      const dynamicPathCostsList = JSON.parse(dynamicPathCosts);
      dynamicPathCostsList.push({
        ...dynamicPathCost.dynamicPathCostsData,
      });
      localStorage.setItem(
        "dynamicPathCosts",
        JSON.stringify(dynamicPathCostsList)
      );
    } else {
      localStorage.setItem(
        "dynamicPathCosts",
        JSON.stringify([
          {
            ...dynamicPathCost.dynamicPathCostsData,
          },
        ])
      );
    }
  };
};

export const rebuildDynamicPathCostsFromLocalStorage = () => {
  const dynamicPathCosts = JSON.parse(localStorage.getItem("dynamicPathCosts"));
  return dynamicPathCosts
    ? {
        type: actionTypes.REBUILD_DYNAMIC_PATH_COSTS_FROM_LOCAL_STORAGE,
        payload: dynamicPathCosts,
      }
    : {
        type: actionTypes.REBUILD_DYNAMIC_PATH_COSTS_FROM_LOCAL_STORAGE,
        payload: [],
      };
};
