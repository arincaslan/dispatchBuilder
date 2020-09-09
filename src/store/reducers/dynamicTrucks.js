import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  dynamicTrucks: [],
  loading: false,
  submit: false,
};

const submitDynamicTruckInputsSuccess = (state, action) => {
  const newDynamicTruck = updateObject(action.dynamicTruckData, {
    id: action.dynamicTruckId,
  });
  return updateObject(state, {
    loading: false,
    dynamicTrucks: state.dynamicTrucks.concat(newDynamicTruck),
  });
};

const submitDynamicTruckInputsFail = (state, action) => {
  return updateObject(state, { loading: false });
};
const submitDynamicTruckInputsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const removeDynamicTruck = (state, action) => {
  return updateObject(state, {
    loading: false,
    dynamicTrucks: state.dynamicTrucks.filter(
      (item) => item.Trucks !== action.payload.Trucks
    ),
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUBMIT_DYNAMIC_TRUCK_INPUTS_SUCCESS:
      return {
        ...state,
        dynamicTrucks: [...state.dynamicTrucks, action.payload.dynamicTrucks],
      };
    case actionTypes.REBUILD_DYNAMIC_TRUCKS_FROM_LOCAL_STORAGE:
      return {
        ...state,
        dynamicTrucks: action.payload.map((item) => item.dynamicTruckData),
      };
    case actionTypes.SUBMIT_DYNAMIC_TRUCK_INPUTS_FAIL:
      return submitDynamicTruckInputsFail(state, action);
    case actionTypes.SUBMIT_DYNAMIC_TRUCK_INPUTS_START:
      return submitDynamicTruckInputsStart(state, action);
    case actionTypes.REMOVE_DYNAMIC_TRUCK:
      return removeDynamicTruck(state, action);
    default:
      return state;
  }
};

export default reducer;
