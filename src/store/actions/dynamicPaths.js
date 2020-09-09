import * as actionTypes from "./actionTypes";
import axios from "../../axios-data";
import * as firebase from "firebase/app";
import "firebase/firestore";

export const submitDynamicPathInputsSuccess = (id, dynamicPathData) => {
  return {
    type: actionTypes.SUBMIT_DYNAMIC_PATH_INPUTS_SUCCESS,
    dynamicPathId: id,
    dynamicPathData: dynamicPathData,
  };
};

export const submitDynamicPathInputsFail = (error) => {
  return {
    type: actionTypes.SUBMIT_DYNAMIC_PATH_INPUTS_FAIL,
    error: error,
  };
};

export const submitDynamicPathInputsStart = () => {
  return {
    type: actionTypes.SUBMIT_DYNAMIC_PATH_INPUTS_START,
  };
};

export const removeDynamicPath = (selectedDynamicPath) => {
  console.log(selectedDynamicPath);
  const dynamicPathsFromLocalStorage = JSON.parse(
    localStorage.getItem("dynamicPaths")
  ).filter(
    (item) =>
      item.concatenateDynamicPath !== selectedDynamicPath.concatenateDynamicPath
  );
  localStorage.setItem(
    "dynamicPaths",
    JSON.stringify(dynamicPathsFromLocalStorage)
  );
  return {
    type: actionTypes.REMOVE_DYNAMIC_PATH,
    payload: selectedDynamicPath,
  };
};

export const submitDynamicPathInputs = (dynamicPath, token) => {
  return (dispatch) => {
    dispatch(submitDynamicPathInputsStart());
    dispatch({
      type: actionTypes.SUBMIT_DYNAMIC_PATH_INPUTS_SUCCESS,
      payload: {
        ...dynamicPath.dynamicPathData,
        concatenateDynamicPath: `${dynamicPath.dynamicPathData.DynamicFirstNode}${dynamicPath.dynamicPathData.DynamicSecondNode}`,
      },
    });
    const dynamicPaths = localStorage.getItem("dynamicPaths");
    if (dynamicPaths) {
      const dynamicPathsList = JSON.parse(dynamicPaths);
      dynamicPathsList.push({
        ...dynamicPath.dynamicPathData,
        concatenateDynamicPath: `${dynamicPath.dynamicPathData.DynamicFirstNode}${dynamicPath.dynamicPathData.DynamicSecondNode}`,
      });
      localStorage.setItem("dynamicPaths", JSON.stringify(dynamicPathsList));
    } else {
      localStorage.setItem(
        "dynamicPaths",
        JSON.stringify([
          {
            ...dynamicPath.dynamicPathData,
            concatenateDynamicPath: `${dynamicPath.dynamicPathData.DynamicFirstNode}${dynamicPath.dynamicPathData.DynamicSecondNode}`,
          },
        ])
      );
    }
  };
};

export const rebuildDynamicPathsFromLocalStorage = () => {
  const dynamicPaths = JSON.parse(localStorage.getItem("dynamicPaths"));
  return dynamicPaths
    ? {
        type: actionTypes.REBUILD_DYNAMIC_PATHS_FROM_LOCAL_STORAGE,
        payload: dynamicPaths,
      }
    : {
        type: actionTypes.REBUILD_DYNAMIC_PATHS_FROM_LOCAL_STORAGE,
        payload: [],
      };
};
