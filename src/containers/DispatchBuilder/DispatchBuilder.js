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
            constraintsVal[`rateLimit-${rateLimitCounter}`] = {equal: 1 / nodes[i]["NodeTime"]}
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
            ...(nodes.find(item => item["Nodes"] === paths[i]["SecondNode"])["NodeType"] === "Crusher" || nodes.find(item => item["Nodes"] === paths[i]["SecondNode"])["NodeType"] === "Dump" ? {[`rateLimit-${variableLimitCounter}`]: 1} : {})
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
  }, [nodes, paths])

  useEffect(() => {
    const model = {
            "optimize": "trucks",
            "opType": "min",
            "constraints": {
              "For X1": {"equal": 0}, //Her noktadan giren ve çıkanların farkı için nokta başına equal 0 constrainti.
              "For X2": {"equal": 0},
              "For X3": {"equal": 0},
              "For X4": {"equal": 0},
              "rateLimit-1": {"equal": 1/3}, // 1/Showel tipinde olanlarda geçen süre. Her showel için bir constraint.
              "rateLimit-2": {"equal": 1/3},
              "showel": {"equal" : 2} //Showel tipinde olanların sayısı
            },
            "variables": {
              "X1X3": {      //Path isimleri variable isimleri olarak alınacak.
                  "trucks": 13, //Eğer dump veya krushersa yolda geçen süre artı noktada geçen süre
                  "For X1": -1,  // Girenler den çıkanların çıkarılması Yani X13 yolu X1 'e giden yol X3'den çıkan yol.
                  "For X3": 1,
                  "rateLimit-1": 1,
              },
              "X3X1": {
                "trucks": 8,
                "For X1": 1,
                "For X3": -1,
                },
              "X2X4": {
                "trucks": 13,
                "For X2": -1,
                "For X4": 1,
                "rateLimit-2": 1
            },
              "X4X2": {
                "trucks": 8,
                "For X2": 1,
                "For X4": -1,
            },
              "X4X1": {
                "trucks": 3,
                "For X4": -1,
                "For X1": 1,
            },
              "X3X2": {
                "trucks": 4,
                "For X3":-1,
                "For X2": 1,
              },
              "showels": {
                "trucks": 1,
                "showel": 1
              },
      },
    };
    // console.log("model", model);
    // const results = solver.Solve(model);
    // console.log(results);
  }, [])


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
