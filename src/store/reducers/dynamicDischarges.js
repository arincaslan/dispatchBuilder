import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  dynamicDischarges: [],
  loading: false,
  submit: false,
};

const submitDynamicDischargeInputsSuccess = (state, action) => {
  const newDynamicDischarge = updateObject(action.dynamicDischargeData, {
    id: action.dynamicDischargeId,
  });
  return updateObject(state, {
    loading: false,
    dynamicDischarges: state.dynamicDischarges.concat(newDynamicDischarge),
  });
};

const submitDynamicDischargeInputsFail = (state, action) => {
  return updateObject(state, { loading: false });
};
const submitDynamicDischargeInputsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const removeDynamicDischarge = (state, action) => {
  return updateObject(state, {
    loading: false,
    dynamicDischarges: state.dynamicDischarges.filter(
      (item) =>
        item.DynamicDischargeNodes !== action.payload.DynamicDischargeNodes
    ),
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUBMIT_DYNAMIC_DISCHARGE_INPUTS_SUCCESS:
      return {
        ...state,
        dynamicDischarges: [...state.dynamicDischarges, { ...action.payload }],
      };
    case actionTypes.REBUILD_DYNAMIC_DISCHARGES_FROM_LOCAL_STORAGE:
      return {
        ...state,
        dynamicDischarges: action.payload.map((item) => item),
      };
    case actionTypes.REMOVE_DYNAMIC_DISCHARGE:
      return {
        ...state,
        dynamicDischarges: state.dynamicDischarges.filter(
          (item) =>
            !(
              item.DynamicDischargeNodes ===
              action.payload.DynamicDischargeNodes
            ) && item
        ),
      };
    case actionTypes.SUBMIT_DYNAMIC_DISCHARGE_INPUTS_FAIL:
      return submitDynamicDischargeInputsFail(state, action);
    case actionTypes.SUBMIT_DYNAMIC_DISCHARGE_INPUTS_START:
      return submitDynamicDischargeInputsStart(state, action);
    case actionTypes.REMOVE_DYNAMIC_DISCHARGE:
      return {
        ...state,
        dynamicDischarges: state.dynamicDischarges.filter(
          (item) =>
            !(
              item.DynamicDischargeNodes ===
              action.payload.DynamicDischargeNodes
            )
        ),
      };
    default:
      return state;
  }
};

export default reducer;
