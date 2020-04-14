import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import solver from "javascript-lp-solver";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DispatchTable from "../../components/InputData/Tables/DispatchTable";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

const DispatchBuilder = () => {
  const nodes = useSelector((state) => state.nodesReducer.nodes);
  const types = useSelector((state) => state.nodesReducer.types);
  const paths = useSelector((state) => state.pathsReducer.paths);
  const [dispatchResult, setDispatchResult] = useState();

  useEffect(() => {
    if (nodes.length && paths.length) {
      const constraintsVal = {};
      let rateLimitCounter = 1;
      for (let i = 0; i < nodes.length; i++) {
        constraintsVal[`For ${nodes[i]["Nodes"]}`] = { equal: 0 };

        if (nodes[i]["NodeType"] === "Showel") {
          constraintsVal[`rateLimit-${nodes[i]["Nodes"]}`] = {
            equal: 1 / nodes[i]["NodeTime"],
          };
          rateLimitCounter++;
        }
      }
      constraintsVal["showel"] = { equal: types["Showel"] };

      const variablesVal = {};
      let variableLimitCounter = 1;
      for (let i = 0; i < paths.length; i++) {
        variablesVal[paths[i]["concatenatePath"]] = {
          trucks:
            nodes.find((item) => item["Nodes"] === paths[i]["SecondNode"])[
              "NodeType"
            ] === "Crusher" ||
            nodes.find((item) => item["Nodes"] === paths[i]["SecondNode"])[
              "NodeType"
            ] === "Dump"
              ? parseInt(
                  nodes.find(
                    (item) => item["Nodes"] === paths[i]["SecondNode"]
                  )["NodeTime"],
                  10
                ) + parseInt(paths[i]["TimeBetweenNodes"], 10)
              : parseInt(paths[i]["TimeBetweenNodes"], 10),
          [`For ${paths[i]["FirstNode"]}`]: -1,
          [`For ${paths[i]["SecondNode"]}`]: 1,
          ...(nodes.find((item) => item["Nodes"] === paths[i]["SecondNode"])[
            "NodeType"
          ] === "Crusher" ||
          nodes.find((item) => item["Nodes"] === paths[i]["SecondNode"])[
            "NodeType"
          ] === "Dump"
            ? { [`rateLimit-${paths[i]["FirstNode"]}`]: 1 }
            : {}),
        };
        if (
          nodes.find((item) => item["Nodes"] === paths[i]["FirstNode"])[
            "NodeType"
          ] === "Showel"
        ) {
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
          showels: {
            trucks: 1,
            showel: 1,
          },
        },
      };
      console.log("newModel", newModel);
      const results = solver.Solve(newModel);
      console.log(results);
      setDispatchResult(results);
    }
  }, [nodes, paths, types]);

  return (
    <div className="p-3">
      <div className="row">
        <div className="col-12">
          <Paper style={{ padding: "25px" }} elevation={4}>
            <Typography variant="h4" gutterBottom>
              Dispatch Results
            </Typography>
            <Typography
              style={{ color: "#767676" }}
              variant="subtitle1"
              className="mb-4"
            >
              Here you can view the optimal solution of given paths.
            </Typography>

            <div className="row">
              <div className="col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
                <Paper style={{ padding: "30px", width: "100%" }} elevation={2}>
                  <Typography className="mb-3" variant="h5">
                    General Information
                  </Typography>
                  <Typography
                    style={{ color: "#767676", fontSize: "15px" }}
                    variant="subtitle1"
                    className="mb-4"
                  >
                    Global optimal solution has been found.
                  </Typography>
                  <div
                    style={{ width: "300px" }}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <p style={{ width: "100px" }}>Trucks</p>
                    <p
                      className="pr-1"
                      style={{ fontWeight: 300, color: "#767676" }}
                    >
                      {dispatchResult && dispatchResult.result}
                    </p>
                  </div>
                  <div
                    style={{ width: "300px" }}
                    className="d-flex justify-content-between align-items-center mb-3"
                  >
                    <p className="mb-0" style={{ width: "100px" }}>
                      Feasible
                    </p>

                    {dispatchResult && dispatchResult.feasible ? (
                      <CheckCircleIcon color="primary" />
                    ) : (
                      <CancelIcon color="error" />
                    )}
                  </div>
                  <div
                    style={{ width: "300px" }}
                    className="d-flex justify-content-between align-items-center mb-3"
                  >
                    <p className="mb-0" style={{ width: "100px" }}>
                      Bounded
                    </p>

                    {dispatchResult && dispatchResult.bounded ? (
                      <CheckCircleIcon color="primary" />
                    ) : (
                      <CancelIcon color="error" />
                    )}
                  </div>
                </Paper>
              </div>
              <div className="col-md-6 col-sm-12">
                {/* CONTENT WILL COME HERE (TABLE) */}
                <DispatchTable result={dispatchResult} />
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
};
//
export default DispatchBuilder;
