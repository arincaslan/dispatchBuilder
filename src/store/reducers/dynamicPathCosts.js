import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  dynamicPathCosts: [],
  loading: false,
  submit: false,
};

const submitDynamicPathCostsInputsSuccess = (state, action) => {
  const newDynamicPathCost = updateObject(action.dynamicPathCostsData, {
    id: action.dynamicPathCostsId,
  });
  return updateObject(state, {
    loading: false,
    dynamicPathCosts: state.dynamicPathCosts.concat(newDynamicPathCost),
  });
};

const submitDynamicPathCostsInputsFail = (state, action) => {
  return updateObject(state, { loading: false });
};
const submitDynamicPathCostsInputsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const removeDynamicPathCost = (state, action) => {
  return updateObject(state, {
    loading: false,
    dynamicPathCosts: state.dynamicPathCosts.filter(
      (item) =>
        item.DynamicConcatenatedPaths !==
        action.payload.DynamicConcatenatedPaths
    ),
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUBMIT_DYNAMIC_PATH_COSTS_INPUTS_SUCCESS:
      return {
        ...state,
        dynamicPathCosts: [...state.dynamicPathCosts, { ...action.payload }],
      };
    case actionTypes.REBUILD_DYNAMIC_PATH_COSTS_FROM_LOCAL_STORAGE:
      return { ...state, dynamicPathCosts: action.payload.map((item) => item) };
    case actionTypes.REMOVE_DYNAMIC_PATH:
      return {
        ...state,
        dynamicPathCosts: state.dynamicPathCosts.filter(
          (item) =>
            !(
              item.DynamicConcatenatedPaths ===
              action.payload.DynamicConcatenatedPaths
            ) && item
        ),
      };
    case actionTypes.SUBMIT_DYNAMIC_PATH_COSTS_INPUTS_FAIL:
      return submitDynamicPathCostsInputsFail(state, action);
    case actionTypes.SUBMIT_DYNAMIC_PATH_COSTS_INPUTS_START:
      return submitDynamicPathCostsInputsStart(state, action);
    case actionTypes.REMOVE_DYNAMIC_PATH_COST:
      return {
        ...state,
        dynamicPathCosts: state.dynamicPathCosts.filter(
          (item) =>
            !(
              item.DynamicConcatenatedPaths ===
              action.payload.DynamicConcatenatedPaths
            )
        ),
      };
    default:
      return state;
  }
};

export default reducer;
