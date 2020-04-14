import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import solver from 'javascript-lp-solver';

const DispatchBuilder = () => {
  const dispatch = useDispatch();
  const nodes = useSelector(state => state.nodesReducer.nodes);
  const types = useSelector(state => state.nodesReducer.types);
  const paths = useSelector(state => state.pathsReducer.paths);

  useEffect(() => {
    if (nodes.length && paths.length) {
        //console.log(nodes);
        const constraintsVal = {};
        let rateLimitCounter = 1;
        for (let i = 0; i < nodes.length; i++) {
          constraintsVal[`For ${nodes[i]["Nodes"]}`] = {equal: 0}

          if (nodes[i]["NodeType"] === "Showel") {
            constraintsVal[`rateLimit-${nodes[i]["Nodes"]}`] = {equal: 1 / nodes[i]["NodeTime"]}
            rateLimitCounter++;
          }
        }
        constraintsVal["showel"] = {equal: types["Showel"]}

        const variablesVal = {};
        let variableLimitCounter = 1;
        for (let i = 0; i < paths.length; i++) {
          variablesVal[paths[i]["concatenatePath"]] = {
            trucks: nodes.find(item => item["Nodes"] === paths[i]["SecondNode"])["NodeType"] === "Crusher" || nodes.find(item => item["Nodes"] === paths[i]["SecondNode"])["NodeType"] === "Dump" ? parseInt(nodes.find(item => item["Nodes"] === paths[i]["SecondNode"])["NodeTime"], 10) + parseInt(paths[i]["TimeBetweenNodes"], 10) : parseInt(paths[i]["TimeBetweenNodes"], 10),
            [`For ${paths[i]["FirstNode"]}`] : -1,
            [`For ${paths[i]["SecondNode"]}`] : 1,
            ...(nodes.find(item => item["Nodes"] === paths[i]["SecondNode"])["NodeType"] === "Crusher" || nodes.find(item => item["Nodes"] === paths[i]["SecondNode"])["NodeType"] === "Dump" ? {[`rateLimit-${paths[i]["FirstNode"]}`]: 1} : {})
          }
          if (nodes.find(item => item["Nodes"] === paths[i]["FirstNode"])["NodeType"] === "Showel" ) {
            variableLimitCounter++;
          }
        }

        const newModel = {
          optimize: "trucks",
          opType: "min",
          constraints: {
            ...constraintsVal,

          },
          variables: {
            ...variablesVal,
            "showels": {
              "trucks": 1,
              "showel": 1
            },
          }
        }
        console.log("newModel", newModel)
        const results = solver.Solve(newModel);
        console.log(results);
    }
  }, [nodes, paths, types])



// Min = 12*X13 + 8*X31 + 12*X24 + 8*X42 + 3*X41 + 4*X32 + X13 + X24 + 2;
//
// !continuity constraints;
//
// X13 - X31 - X32 = 0;
// X24 - X42 - X41 = 0;
// X41 + X31 - X13 = 0;
// X42 + X32 - X24 = 0;
// X24 - 1/3 = 0;
// X13 - 1/3 = 0;
//
// end

//const results = solver.Solve(model);

  return(
    <p>Deneme</p>
  )
}
//
export default DispatchBuilder;
