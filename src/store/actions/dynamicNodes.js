import * as actionTypes from "./actionTypes";
import axios from "../../axios-data";
import * as firebase from "firebase/app";
import "firebase/firestore";

export const submitDynamicNodeInputsSuccess = (id, dynamicNodeData) => {
  return {
    type: actionTypes.SUBMIT_DYNAMIC_NODE_INPUTS_SUCCESS,
    dynamicNodeId: id,
    dynamicNodeData: dynamicNodeData,
  };
};

export const submitDynamicNodeInputsFail = (error) => {
  return {
    type: actionTypes.SUBMIT_DYNAMIC_NODE_INPUTS_FAIL,
    error: error,
  };
};

export const submitDynamicNodeInputsStart = () => {
  return {
    type: actionTypes.SUBMIT_DYNAMIC_NODE_INPUTS_START,
  };
};

export const removeDynamicNode = (selectedNode) => {
  const dynamicNodesFromLocalStorage = JSON.parse(
    localStorage.getItem("dynamicNodes")
  )
    .map((item) => item.dynamicNodeData)
    .filter((item) => item.DynamicNodes !== selectedNode.DynamicNodes)
    .map((item) => ({ dynamicNodeData: item }));
  localStorage.setItem(
    "dynamicNodes",
    JSON.stringify(dynamicNodesFromLocalStorage)
  );
  const pathsFromLocalStorage = JSON.parse(
    localStorage.getItem("paths")
  ).filter(
    (item) =>
      !(
        item.FirstNode === selectedNode.DynamicNodes ||
        item.SecondNode === selectedNode.DynamicNodes
      ) && item
  );
  localStorage.setItem("paths", JSON.stringify(pathsFromLocalStorage));
  return {
    type: actionTypes.REMOVE_DYNAMIC_NODE,
    payload: selectedNode,
  };
};

export const submitDynamicNodeInputs = (dynamicNodeData, token) => {
  return (dispatch) => {
    dispatch(submitDynamicNodeInputsStart());
    console.log(dynamicNodeData);

    dispatch({
      type: actionTypes.SUBMIT_DYNAMIC_NODE_INPUTS_SUCCESS,
      payload: dynamicNodeData,
    });
    const dynamicNodes = localStorage.getItem("dynamicNodes");
    if (dynamicNodes) {
      const dynamicNodesList = JSON.parse(dynamicNodes);
      dynamicNodesList.push(dynamicNodeData);
      localStorage.setItem("dynamicNodes", JSON.stringify(dynamicNodesList));
    } else {
      localStorage.setItem(
        "dynamicNodes",
        JSON.stringify([{ ...dynamicNodeData }])
      );
    }
  };
};

export const rebuildDynamicNodesFromLocalStorage = () => {
  const dynamicNodes = JSON.parse(localStorage.getItem("dynamicNodes"));
  const newDynamicNodes = dynamicNodes
    ? dynamicNodes.map((dynamicNode) => dynamicNode.dynamicNodeData)
    : [];
  const dynamicNodeTypes = {};
  const dynamicTypes = newDynamicNodes.map((item) => {
    dynamicNodeTypes[item.DynamicNodeType] = dynamicNodeTypes[
      item.DynamicNodeType
    ]
      ? dynamicNodeTypes[item.DynamicNodeType] + 1
      : 1;
  });
  return dynamicNodes
    ? {
        type: actionTypes.REBUILD_DYNAMIC_NODES_FROM_LOCAL_STORAGE,
        payload: { dynamicNodes, dynamicTypes: dynamicNodeTypes },
      }
    : {
        type: actionTypes.REBUILD_DYNAMIC_NODES_FROM_LOCAL_STORAGE,
        payload: { dynamicNodes: [], dynamicTypes: [] },
      };
};
