import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  dynamicOreDepots: [],
  loading: false,
  submit: false,
};

const submitDynamicOreDepotInputsSuccess = (state, action) => {
  const newDynamicOreDepot = updateObject(action.dynamicOreDepotsData, {
    id: action.dynamicOreDepotsId,
  });
  return updateObject(state, {
    loading: false,
    dynamicOreDepots: state.dynamicOreDepots.concat(newDynamicOreDepot),
  });
};

const submitDynamicOreDepotInputsFail = (state, action) => {
  return updateObject(state, { loading: false });
};
const submitDynamicOreDepotInputsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const removeDynamicOreDepot = (state, action) => {
  return updateObject(state, {
    loading: false,
    dynamicOreDepots: state.dynamicOreDepots.filter(
      (item) =>
        item.DynamicOreDepotNodes !== action.payload.DynamicOreDepotNodes
    ),
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUBMIT_DYNAMIC_OREDEPOT_INPUTS_SUCCESS:
      return {
        ...state,
        dynamicOreDepots: [...state.dynamicOreDepots, { ...action.payload }],
      };
    case actionTypes.REBUILD_DYNAMIC_OREDEPOTS_FROM_LOCAL_STORAGE:
      return { ...state, dynamicOreDepots: action.payload.map((item) => item) };
    case actionTypes.REMOVE_DYNAMIC_OREDEPOT:
      return {
        ...state,
        dynamicOreDepots: state.dynamicOreDepots.filter(
          (item) =>
            !(
              item.DynamicOreDepotNodes === action.payload.DynamicOreDepotNodes
            ) && item
        ),
      };
    case actionTypes.SUBMIT_DYNAMIC_OREDEPOT_INPUTS_FAIL:
      return submitDynamicOreDepotInputsFail(state, action);
    case actionTypes.SUBMIT_DYNAMIC_OREDEPOT_INPUTS_START:
      return submitDynamicOreDepotInputsStart(state, action);
    case actionTypes.REMOVE_DYNAMIC_OREDEPOT:
      return {
        ...state,
        dynamicOreDepots: state.dynamicOreDepots.filter(
          (item) =>
            !(item.DynamicOreDepotNodes === action.payload.DynamicOreDepotNodes)
        ),
      };
    default:
      return state;
  }
};

export default reducer;
