import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  dynamicShowels: [],
  loading: false,
  submit: false,
};

const submitDynamicShowelInputsSuccess = (state, action) => {
  const newDynamicShowel = updateObject(action.dynamicShowelsData, {
    id: action.dynamicShowelsId,
  });
  return updateObject(state, {
    loading: false,
    dynamicShowels: state.dynamicShowels.concat(newDynamicShowel),
  });
};

const submitDynamicShowelInputsFail = (state, action) => {
  return updateObject(state, { loading: false });
};
const submitDynamicShowelInputsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const removeDynamicShowel = (state, action) => {
  return updateObject(state, {
    loading: false,
    dynamicShowels: state.dynamicShowels.filter(
      (item) => item.DynamicShowelNodes !== action.payload.DynamicShowelNodes
    ),
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUBMIT_DYNAMIC_SHOWEL_INPUTS_SUCCESS:
      return {
        ...state,
        dynamicShowels: [...state.dynamicShowels, { ...action.payload }],
      };
    case actionTypes.REBUILD_DYNAMIC_SHOWELS_FROM_LOCAL_STORAGE:
      return { ...state, dynamicShowels: action.payload.map((item) => item) };
    case actionTypes.REMOVE_DYNAMIC_SHOWEL:
      return {
        ...state,
        dynamicShowels: state.dynamicShowels.filter(
          (item) =>
            !(item.DynamicShowelNodes === action.payload.DynamicShowelNodes) &&
            item
        ),
      };
    case actionTypes.SUBMIT_DYNAMIC_SHOWEL_INPUTS_FAIL:
      return submitDynamicShowelInputsFail(state, action);
    case actionTypes.SUBMIT_DYNAMIC_SHOWEL_INPUTS_START:
      return submitDynamicShowelInputsStart(state, action);
    case actionTypes.REMOVE_DYNAMIC_SHOWEL:
      return {
        ...state,
        dynamicShowels: state.dynamicShowels.filter(
          (item) =>
            !(item.DynamicShowelNodes === action.payload.DynamicShowelNodes)
        ),
      };
    default:
      return state;
  }
};

export default reducer;
