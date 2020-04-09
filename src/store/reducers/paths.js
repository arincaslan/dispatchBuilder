import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
  paths : [],
  loading: false,
  submit: false,
  // updatedPath: []
}

const submitPathInputsSuccess = (state,action) => {
  const newPath = updateObject(action.pathData, {id: action.pathId});
  return updateObject(state,{
    loading: false,
    paths: state.paths.concat(newPath)
  })
};

// const combineNodesForPath = (state,action) => {
//   const mergedPath = updateObject(action.pathData, {id: action.pathId});
//   return updateObject (state, {
//     loading: false,
//     updatedPath: state.updatedPath.concat(mergedPath)
//   })
// }
//
//

  const submitPathInputsFail = (state,action) => {
      return updateObject(state,{loading:false})
  }
  const submitPathInputsStart = (state,action) => {
      return updateObject(state, {loading: true})
  }


const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SUBMIT_PATH_INPUTS_SUCCESS:
      return {...state, paths: [...state.paths, {...action.payload}]};
    case actionTypes.REBUILD_PATHS_FROM_LOCAL_STORAGE:
      return {...state, paths: action.payload.map(item => item)};
    // case actionTypes.MERGE_NODES_FOR_PATHS:
    //   return {...state, updatedPath:action.payload.map(item => item.pathData)}
    case actionTypes.SUBMIT_PATH_INPUTS_FAIL: return submitPathInputsFail(state,action);
    case actionTypes.SUBMIT_PATH_INPUTS_START:return submitPathInputsStart(state,action);
    default:
      return state;
  }

}

  export default reducer;
