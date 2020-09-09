import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  trucks: [],
  loading: false,
  submit: false,
};

const submitTruckInputsSuccess = (state, action) => {
  const newTruck = updateObject(action.truckData, { id: action.truckDataId });
  return updateObject(state, {
    loading: false,
    trucks: state.trucks.concat(newTruck),
  });
};

const submitTruckInputsFail = (state, action) => {
  return updateObject(state, { loading: false });
};
const submitTruckInputsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const removeTruck = (state, action) => {
  return updateObject(state, {
    loading: false,
    trucks: [""],
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUBMIT_TRUCK_INPUTS_SUCCESS:
      return { ...state, trucks: [...state.trucks, action.payload.truckData] };
    case actionTypes.REBUILD_TRUCKS_FROM_LOCAL_STORAGE:
      return {
        ...state,
        trucks: action.payload.trucks.map((item) => item.truckData),
      };
    case actionTypes.SUBMIT_TRUCK_INPUTS_FAIL:
      return submitTruckInputsFail(state, action);
    case actionTypes.SUBMIT_INPUTS_START:
      return submitTruckInputsStart(state, action);
    case actionTypes.REMOVE_TRUCK:
      return removeTruck(state, action);
    default:
      return state;
  }
};

export default reducer;
