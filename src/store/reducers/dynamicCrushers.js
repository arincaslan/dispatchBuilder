import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  dynamicCrushers: [],
  loading: false,
  submit: false,
};

const submitDynamicCrusherInputsSuccess = (state, action) => {
  const newDynamicCrusher = updateObject(action.dynamicCrushersData, {
    id: action.dynamicCrushersId,
  });
  return updateObject(state, {
    loading: false,
    dynamicCrushers: state.dynamicCrushers.concat(newDynamicCrusher),
  });
};

const submitDynamicCrusherInputsFail = (state, action) => {
  return updateObject(state, { loading: false });
};
const submitDynamicCrusherInputsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const removeDynamicCrusher = (state, action) => {
  return updateObject(state, {
    loading: false,
    dynamicCrushers: state.dynamicCrushers.filter(
      (item) => item.DynamicCrusherNodes !== action.payload.DynamicCrusherNodes
    ),
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUBMIT_DYNAMIC_CRUSHER_INPUTS_SUCCESS:
      return {
        ...state,
        dynamicCrushers: [...state.dynamicCrushers, { ...action.payload }],
      };
    case actionTypes.REBUILD_DYNAMIC_CRUSHERS_FROM_LOCAL_STORAGE:
      return { ...state, dynamicCrushers: action.payload.map((item) => item) };
    case actionTypes.REMOVE_DYNAMIC_CRUSHER:
      return {
        ...state,
        dynamicCrushers: state.dynamicCrushers.filter(
          (item) =>
            !(
              item.DynamicCrusherNodes === action.payload.DynamicCrusherNodes
            ) && item
        ),
      };
    case actionTypes.SUBMIT_DYNAMIC_CRUSHER_INPUTS_FAIL:
      return submitDynamicCrusherInputsFail(state, action);
    case actionTypes.SUBMIT_DYNAMIC_CRUSHER_INPUTS_START:
      return submitDynamicCrusherInputsStart(state, action);
    case actionTypes.REMOVE_DYNAMIC_CRUSHER:
      return {
        ...state,
        dynamicCrushers: state.dynamicCrushers.filter(
          (item) =>
            !(item.DynamicCrusherNodes === action.payload.DynamicCrusherNodes)
        ),
      };
    default:
      return state;
  }
};

export default reducer;
