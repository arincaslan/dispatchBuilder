import * as actionTypes from "./actionTypes";
import axios from "../../axios-data";
import * as firebase from "firebase/app";
import "firebase/firestore";

export const submitTruckInputsSuccess = (id, truckData) => {
  return {
    type: actionTypes.SUBMIT_TRUCK_INPUTS_SUCCESS,
    truckDataId: id,
    truckData: truckData,
  };
};

export const submitTruckInputsFail = (error) => {
  return {
    type: actionTypes.SUBMIT_TRUCK_INPUTS_FAIL,
    error: error,
  };
};

export const submitTruckInputsStart = () => {
  return {
    type: actionTypes.SUBMIT_TRUCK_INPUTS_START,
  };
};

export const removeTruck = (selectedTruck) => {
  const truckDataFromLocalStorage = JSON.parse(
    localStorage.getItem("trucks")
  ).map((item) => item.truckData);
  localStorage.setItem("trucks", JSON.stringify(truckDataFromLocalStorage));
  return {
    type: actionTypes.REMOVE_TRUCK,
    payload: selectedTruck,
  };
};

export const submitTruckInputs = (truckData, token) => {
  return (dispatch) => {
    dispatch(submitTruckInputsStart());
    console.log(truckData);

    dispatch({
      type: actionTypes.SUBMIT_TRUCK_INPUTS_SUCCESS,
      payload: truckData,
    });
    const trucks = localStorage.getItem("trucks");
    if (trucks) {
      const trucksList = JSON.parse(trucks);
      trucksList.push(truckData);
      localStorage.setItem("trucks", JSON.stringify(trucksList));
    } else {
      localStorage.setItem("trucks", JSON.stringify([{ ...truckData }]));
    }
  };
};

export const rebuildTrucksFromLocalStorage = () => {
  const trucks = JSON.parse(localStorage.getItem("trucks"));
  const newTrucks = trucks ? trucks.map((truck) => truck.truckData) : [];
  return trucks
    ? {
        type: actionTypes.REBUILD_TRUCKS_FROM_LOCAL_STORAGE,
        payload: { trucks },
      }
    : {
        type: actionTypes.REBUILD_TRUCKS_FROM_LOCAL_STORAGE,
        payload: { trucks: [] },
      };
};
