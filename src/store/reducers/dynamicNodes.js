import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  dynamicNodes: [],
  loading: false,
  submit: false,
  dynamicTypes: [],
};

const submitDynamicNodeInputsSuccess = (state, action) => {
  const newDynamicNode = updateObject(action.dynamicNodeData, {
    id: action.dynamicNodeId,
  });
  const newDynamicType = updateObject(action.dynamicNodeData.DynamicNodeType, {
    id: action.dynamicNodeId,
  });
  return updateObject(state, {
    loading: false,
    dynamicNodes: state.dynamicNodes.concat(newDynamicNode),
    dynamicTypes: state.dynamicTypes.concat(newDynamicType),
  });
};

const submitDynamicNodeInputsFail = (state, action) => {
  return updateObject(state, { loading: false });
};
const submitDynamicNodeInputsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const removeDynamicNode = (state, action) => {
  return updateObject(state, {
    loading: false,
    dynamicNodes: state.dynamicNodes.filter(
      (item) => item.DynamicNodes !== action.payload.DynamicNodes
    ),
    dynamicTypes: {
      ...state.dynamicTypes,
      [action.payload.DynamicNodeType]:
        state.dynamicTypes[action.payload.DynamicNodeType] - 1,
    },
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUBMIT_DYNAMIC_NODE_INPUTS_SUCCESS:
      return {
        ...state,
        dynamicNodes: [...state.dynamicNodes, action.payload.dynamicNodeData],
        dynamicTypes: action.payload.dynamicTypeData,
      };
    case actionTypes.REBUILD_DYNAMIC_NODES_FROM_LOCAL_STORAGE:
      return {
        ...state,
        dynamicNodes: action.payload.dynamicNodes.map(
          (item) => item.dynamicNodeData
        ),
        dynamicTypes: action.payload.dynamicTypes,
      };
    case actionTypes.SUBMIT_DYNAMIC_NODE_INPUTS_FAIL:
      return submitDynamicNodeInputsFail(state, action);
    case actionTypes.SUBMIT_DYNAMIC_NODE_INPUTS_START:
      return submitDynamicNodeInputsStart(state, action);
    case actionTypes.REMOVE_DYNAMIC_NODE:
      return removeDynamicNode(state, action);
    default:
      return state;
  }
};

export default reducer;
