import * as actionTypes from "./actionTypes";
import axios from "../../axios-data";
import * as firebase from "firebase/app";
import "firebase/firestore";

export const submitDynamicTruckInputsSuccess = (id, dynamicTruckData) => {
  return {
    type: actionTypes.SUBMIT_DYNAMIC_TRUCK_INPUTS_SUCCESS,
    dynamicTruckId: id,
    dynamicTruckData: dynamicTruckData,
  };
};

export const submitDynamicTruckInputsFail = (error) => {
  return {
    type: actionTypes.SUBMIT_DYNAMIC_TRUCK_INPUTS_FAIL,
    error: error,
  };
};

export const submitDynamicTruckInputsStart = () => {
  return {
    type: actionTypes.SUBMIT_DYNAMIC_TRUCK_INPUTS_START,
  };
};

export const removeDynamicTruck = (selectedDynamicTruck) => {
  const dynamicTrucksFromLocalStorage = JSON.parse(
    localStorage.getItem("dynamicTrucks")
  )
    .map((item) => item.dynamicTruckData)
    .filter((item) => item.Trucks !== selectedDynamicTruck.Trucks)
    .map((item) => ({ dynamicTruckData: item }));
  localStorage.setItem(
    "dynamicTrucks",
    JSON.stringify(dynamicTrucksFromLocalStorage)
  );
  return {
    type: actionTypes.REMOVE_DYNAMIC_TRUCK,
    payload: selectedDynamicTruck,
  };
};

export const submitDynamicTruckInputs = (dynamicTruckData, token) => {
  return (dispatch) => {
    dispatch(submitDynamicTruckInputsStart());
    console.log(dynamicTruckData);

    dispatch({
      type: actionTypes.SUBMIT_DYNAMIC_TRUCK_INPUTS_SUCCESS,
      payload: dynamicTruckData,
    });
    const dynamicTrucks = localStorage.getItem("dynamicTrucks");
    if (dynamicTrucks) {
      const dynamicTrucksList = JSON.parse(dynamicTrucks);
      dynamicTrucksList.push(dynamicTruckData);
      localStorage.setItem("dynamicTrucks", JSON.stringify(dynamicTrucksList));
    } else {
      localStorage.setItem(
        "dynamicTrucks",
        JSON.stringify([{ ...dynamicTruckData }])
      );
    }
  };
};

export const rebuildDynamicTrucksFromLocalStorage = () => {
  const dynamicTrucks = JSON.parse(localStorage.getItem("dynamicTrucks"));

  return dynamicTrucks
    ? {
        type: actionTypes.REBUILD_DYNAMIC_TRUCKS_FROM_LOCAL_STORAGE,
        payload: dynamicTrucks.dynamicTruckData,
      }
    : {
        type: actionTypes.REBUILD_DYNAMIC_TRUCKS_FROM_LOCAL_STORAGE,
        payload: { dynamicTrucks: [] },
      };
};
