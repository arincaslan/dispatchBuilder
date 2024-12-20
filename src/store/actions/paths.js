import * as actionTypes from './actionTypes';
import axios from '../../axios-data';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

export const submitPathInputsSuccess = (id, pathData) => {
  return {
    type: actionTypes.SUBMIT_PATH_INPUTS_SUCCESS,
    pathId: id,
    pathData: pathData
  };
};

export const submitPathInputsFail = (error) => {
  return {
    type: actionTypes.SUBMIT_PATH_INPUTS_FAIL,
    error: error
  }
}

export const submitPathInputsStart = () => {
  return {
    type: actionTypes.SUBMIT_PATH_INPUTS_START
  }
}

export const submitPathInputs = (path, token) => {
  return dispatch => {
    dispatch(submitPathInputsStart());
    dispatch({type: actionTypes.SUBMIT_PATH_INPUTS_SUCCESS, payload: {...path.pathData, concatenatePath: `${path.pathData.FirstNode}${path.pathData.SecondNode}`}})
    const paths = localStorage.getItem('paths');
    if (paths) {
      const pathsList = JSON.parse(paths);
      pathsList.push({...path.pathData, concatenatePath: `${path.pathData.FirstNode}${path.pathData.SecondNode}`});
      localStorage.setItem('paths', JSON.stringify(pathsList));
    } else {
      localStorage.setItem('paths', JSON.stringify([{...path.pathData, concatenatePath: `${path.pathData.FirstNode}${path.pathData.SecondNode}`}]))
    }
  };
};


// export const mergeNodesForPaths = () => {
//   const updatedPath = {};
//   const paths = JSON.parse(localStorage.getItem('paths'));
//   if (paths !== null ) {
//     updatedPath.push( JSON.stringify(paths.FirstNode) + JSON.stringify(paths.SecondNode));
//   }
//   return updatedPath ? {type: actionTypes.MERGE_NODES_FOR_PATHS, payload: updatedPath}: {type: actionTypes.MERGE_NODES_FOR_PATHS, payload: []};
// }

export const rebuildPathsFromLocalStorage = () => {
  const paths = JSON.parse(localStorage.getItem("paths"));
  return paths ? {type: actionTypes.REBUILD_PATHS_FROM_LOCAL_STORAGE, payload: paths} : {type: actionTypes.REBUILD_PATHS_FROM_LOCAL_STORAGE, payload: []};
}
