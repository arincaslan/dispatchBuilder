import * as actionTypes from "./actionTypes";
import axios from "../../axios-data";
import * as firebase from "firebase/app";
import "firebase/firestore";

export const submitGpNodeInputsSuccess = (id, gpNodeData) => {
  return {
    type: actionTypes.SUBMIT_GP_NODE_INPUTS_SUCCESS,
    gpNodeId: id,
    gpNodeData: gpNodeData,
  };
};

export const submitGpNodeInputsFail = (error) => {
  return {
    type: actionTypes.SUBMIT_GP_NODE_INPUTS_FAIL,
    error: error,
  };
};

export const submitGpNodeInputsStart = () => {
  return {
    type: actionTypes.SUBMIT_GP_NODE_INPUTS_START,
  };
};

export const removeGpNode = (selectedNode) => {
  const gpNodesFromLocalStorage = JSON.parse(
    localStorage.getItem("gpNodes")
  )
    .map((item) => item.gpNodeData)
    .filter((item) => item.GpNodes !== selectedNode.GpNodes)
    .map((item) => ({ gpNodeData: item }));
  localStorage.setItem(
    "gpNodes",
    JSON.stringify(gpNodesFromLocalStorage)
  );
  const pathsFromLocalStorage = JSON.parse(
    localStorage.getItem("paths")
  ).filter(
    (item) =>
      !(
        item.FirstNode === selectedNode.GpNodes ||
        item.SecondNode === selectedNode.GpNodes
      ) && item
  );
  localStorage.setItem("paths", JSON.stringify(pathsFromLocalStorage));
  return {
    type: actionTypes.REMOVE_GP_NODE,
    payload: selectedNode,
  };
};

export const submitGpNodeInputs = (gpNodeData, token) => {
  return (dispatch) => {
    dispatch(submitGpNodeInputsStart());
    console.log(gpNodeData);

    dispatch({
      type: actionTypes.SUBMIT_GP_NODE_INPUTS_SUCCESS,
      payload: gpNodeData,
    });
    const gpNodes = localStorage.getItem("gpNodes");
    if (gpNodes) {
      const gpNodesList = JSON.parse(gpNodes);
      gpNodesList.push(gpNodeData);
      localStorage.setItem("gpNodes", JSON.stringify(gpNodesList));
    } else {
      localStorage.setItem(
        "gpNodes",
        JSON.stringify([{ ...gpNodeData }])
      );
    }
  };
};

export const rebuildGpNodesFromLocalStorage = () => {
  const gpNodes = JSON.parse(localStorage.getItem("gpNodes"));
  const newGpNodes = gpNodes
    ? gpNodes.map((gpNode) => gpNode.gpNodeData)
    : [];
  const gpNodeTypes = {};
  const gpTypes = newGpNodes.map((item) => {
    gpNodeTypes[item.GpNodeType] = gpNodeTypes[
      item.GpNodeType
    ]
      ? gpNodeTypes[item.GpNodeType] + 1
      : 1;
  });
  return gpNodes
    ? {
        type: actionTypes.REBUILD_GP_NODES_FROM_LOCAL_STORAGE,
        payload: { gpNodes, gpTypes: gpNodeTypes },
      }
    : {
        type: actionTypes.REBUILD_GP_NODES_FROM_LOCAL_STORAGE,
        payload: { gpNodes: [], gpTypes: [] },
      };
};
