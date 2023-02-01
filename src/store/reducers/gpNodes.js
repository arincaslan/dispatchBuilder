import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  gpNodes: [],
  loading: false,
  submit: false,
  gpTypes: [],
};

const submitGpNodeInputsSuccess = (state, action) => {
  const newGpNode = updateObject(action.gpNodeData, {
    id: action.gpNodeId,
  });
  const newGpType = updateObject(action.gpNodeData.GpNodeType, {
    id: action.gpNodeId,
  });
  return updateObject(state, {
    loading: false,
    gpNodes: state.gpNodes.concat(newGpNode),
    gpTypes: state.gpTypes.concat(newGpType),
  });
};

const removeGpNode = (state, action) => {
  return updateObject(state, {
    loading: false,
    gpNodes: state.gpNodes.filter(
      (item) => item.GpNodes !== action.payload.GpNodes
    ),
    gpTypes: {
      ...state.gpTypes,
      [action.payload.GpNodeType]:
        state.gpTypes[action.payload.GpNodeType] - 1,
    },
  });
};

const submitGpNodeInputsFail = (state,action) => {
    return updateObject(state,{loading:false})
}
const submitGpNodeInputsStart = (state,action) => {
    return updateObject(state, {loading: true})
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUBMIT_GP_NODE_INPUTS_SUCCESS:
      return {
        ...state,
        gpNodes: [...state.gpNodes, ...action.payload],
        gpTypes: action.payload.gpTypeData,
      };
    case actionTypes.REBUILD_GP_NODES_FROM_LOCAL_STORAGE:
      return {
        ...state,
        gpNodes: action.payload.gpNodes.map(
          (item) => item.gpNodeData
        ),
        gpTypes: action.payload.gpTypes,
      };
    case actionTypes.SUBMIT_GP_NODE_INPUTS_FAIL:
      return submitGpNodeInputsFail(state, action);
    case actionTypes.SUBMIT_GP_NODE_INPUTS_START:
      return submitGpNodeInputsStart(state, action);
    case actionTypes.REMOVE_GP_NODE:
      return removeGpNode(state, action);
    default:
      return state;
  }
};

export default reducer;
