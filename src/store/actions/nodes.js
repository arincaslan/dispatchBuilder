import * as actionTypes from './actionTypes';
import axios from '../../axios-data';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

export const submitInputsSuccess = (id, nodeData) => {
  return {
    type: actionTypes.SUBMIT_INPUTS_SUCCESS,
    nodeId: id,
    nodeData: nodeData
  };
};

export const submitInputsFail = (error) => {
  return {
    type: actionTypes.SUBMIT_INPUTS_FAIL,
    error: error
  }
}

export const submitInputsStart = () => {
  return {
    type: actionTypes.SUBMIT_INPUTS_START
  }
}

export const removeNode = (selectedNode) => {
  const nodesFromLocalStorage = JSON.parse(localStorage.getItem("nodes")).map(item => item.nodeData).filter(item => item.Nodes !== selectedNode.Nodes).map(item => ({nodeData: item}));
  localStorage.setItem("nodes", JSON.stringify(nodesFromLocalStorage));
  const pathsFromLocalStorage = JSON.parse(localStorage.getItem("paths")).filter(item => !(item.FirstNode === selectedNode.Nodes || item.SecondNode === selectedNode.Nodes) && item);
  localStorage.setItem("paths", JSON.stringify(pathsFromLocalStorage));
  return {
    type: actionTypes.REMOVE_NODE,
    payload: selectedNode
  }
}




export const submitInputs = (nodeData, token) => {
  return dispatch => {
    dispatch(submitInputsStart());
    console.log(nodeData);

    dispatch({type: actionTypes.SUBMIT_INPUTS_SUCCESS, payload: nodeData})
    const nodes = localStorage.getItem('nodes');
    if (nodes) {
      const nodesList = JSON.parse(nodes);
      nodesList.push(nodeData);
      localStorage.setItem('nodes', JSON.stringify(nodesList));
    } else {
      localStorage.setItem('nodes', JSON.stringify([{...nodeData}]))
    }
  };
};

export const rebuildNodesFromLocalStorage = () => {
  const nodes = JSON.parse(localStorage.getItem("nodes"));
  const newNodes = nodes ? nodes.map(node => node.nodeData) : [];
  const nodeTypes = {};
  const types = newNodes.map(item => {
    nodeTypes[item.NodeType] = nodeTypes[item.NodeType] ? nodeTypes[item.NodeType] + 1 : 1;
  })
  return nodes  ? {type: actionTypes.REBUILD_NODES_FROM_LOCAL_STORAGE, payload: {nodes, types: nodeTypes}} : {type: actionTypes.REBUILD_NODES_FROM_LOCAL_STORAGE, payload: {nodes: [], types: []}};
}
