import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
  nodes : [],
  loading: false,
  submit: false,
  types: []
}

const submitInputsSuccess = (state,action) => {
  const newNode = updateObject(action.nodeData, {id: action.nodeId});
  const newType = updateObject(action.nodeData.NodeType, {id: action.nodeId});
  return updateObject(state,{
    loading: false,
    nodes: state.nodes.concat(newNode),
    types: state.types.concat(newType)
  })
}


  const submitInputsFail = (state,action) => {
      return updateObject(state,{loading:false})
  }
  const submitInputsStart = (state,action) => {
      return updateObject(state, {loading: true})
  }


const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SUBMIT_INPUTS_SUCCESS:
      return {...state, nodes: [...state.nodes, action.payload.nodeData], types: action.payload.typeData};
    case actionTypes.REBUILD_NODES_FROM_LOCAL_STORAGE:
      return {...state, nodes: action.payload.nodes.map(item => item.nodeData), types: action.payload.types};
    case actionTypes.SUBMIT_INPUTS_FAIL: return submitInputsFail(state,action);
    case actionTypes.SUBMIT_INPUTS_START:return submitInputsStart(state,action);
    default:
      return state;
  }

}

  export default reducer;
