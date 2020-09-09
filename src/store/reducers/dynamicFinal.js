import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  dynamicFinals: [],
  loading: false,
  submit: false,
};

const submitDynamicFinalInputsSuccess = (state, action) => {
  const newDynamicFinal = updateObject(action.dynamicFinalData, {
    id: action.dynamicFinalId,
  });
  return updateObject(state, {
    loading: false,
    dynamicFinals: state.dynamicFinals.concat(newDynamicFinal),
  });
};

const submitDynamicFinalInputsFail = (state, action) => {
  return updateObject(state, { loading: false });
};
const submitDynamicFinalInputsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const removeDynamicFinal = (state, action) => {
  return updateObject(state, {
    loading: false,
    dynamicFinals: state.dynamicFinals.filter(
      (item) => item.StrippingRatio !== action.payload.StrippingRatio
    ),
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUBMIT_DYNAMIC_FINAL_INPUTS_SUCCESS:
      return {
        ...state,
        dynamicFinals: [...state.dynamicFinals, { ...action.payload }],
      };
    case actionTypes.REBUILD_DYNAMIC_FINALS_FROM_LOCAL_STORAGE:
      return { ...state, dynamicFinals: action.payload.map((item) => item) };
    case actionTypes.REMOVE_DYNAMIC_FINAL:
      return {
        ...state,
        dynamicFinals: state.dynamicFinals.filter(
          (item) =>
            !(item.StrippingRatio === action.payload.StrippingRatio) && item
        ),
      };
    case actionTypes.SUBMIT_DYNAMIC_FINAL_INPUTS_FAIL:
      return submitDynamicFinalInputsFail(state, action);
    case actionTypes.SUBMIT_DYNAMIC_FINAL_INPUTS_START:
      return submitDynamicFinalInputsStart(state, action);
    case actionTypes.REMOVE_DYNAMIC_FINAL:
      return {
        ...state,
        dynamicFinals: state.dynamicFinals.filter(
          (item) => !(item.StrippingRatio === action.payload.StrippingRatio)
        ),
      };
    default:
      return state;
  }
};

export default reducer;
