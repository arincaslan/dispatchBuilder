import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  dynamicPaths: [],
  loading: false,
  submit: false,
};

const submitDynamicPathInputsSuccess = (state, action) => {
  const newDynamicPath = updateObject(action.dynamicPathData, {
    id: action.dynamicPathId,
  });
  return updateObject(state, {
    loading: false,
    dynamicPaths: state.dynamicPaths.concat(newDynamicPath),
  });
};

const submitDynamicPathInputsFail = (state, action) => {
  return updateObject(state, { loading: false });
};
const submitDynamicPathInputsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const removeDynamicPath = (state, action) => {
  return updateObject(state, {
    loading: false,
    dynamicPaths: state.dynamicPaths.filter(
      (item) =>
        item.concatenateDynamicPath !== action.payload.concatenateDynamicPath
    ),
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUBMIT_DYNAMIC_PATH_INPUTS_SUCCESS:
      return {
        ...state,
        dynamicPaths: [...state.dynamicPaths, { ...action.payload }],
      };
    case actionTypes.REBUILD_DYNAMIC_PATHS_FROM_LOCAL_STORAGE:
      return { ...state, dynamicPaths: action.payload.map((item) => item) };
    case actionTypes.REMOVE_DYNAMIC_NODE:
      return {
        ...state,
        dynamicPaths: state.dynamicPaths.filter(
          (item) =>
            !(
              item.DynamicFirstNode === action.payload.DynamicNodes ||
              item.DynamicSecondNode === action.payload.DynamicNodes
            ) && item
        ),
      };
    case actionTypes.SUBMIT_DYNAMIC_PATH_INPUTS_FAIL:
      return submitDynamicPathInputsFail(state, action);
    case actionTypes.SUBMIT_DYNAMIC_PATH_INPUTS_START:
      return submitDynamicPathInputsStart(state, action);
    case actionTypes.REMOVE_DYNAMIC_PATH:
      return {
        ...state,
        dynamicPaths: state.dynamicPaths.filter(
          (item) =>
            !(
              item.concatenateDynamicPath ===
              action.payload.concatenateDynamicPath
            )
        ),
      };
    default:
      return state;
  }
};

export default reducer;
