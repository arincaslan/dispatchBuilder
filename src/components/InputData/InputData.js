import React, { useState, useEffect } from "react";
import NodsForm from "./Forms/NodesForm";
import PathsData from "./Forms/PathsForm";
import NodeCard from "../NodeCard/NodeCard";

// REDUX
import { useSelector } from "react-redux";
// MATERIAL UI
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const InputData = (props) => {
  const nodes = useSelector((state) => state.nodesReducer.nodes);

  return (
    <div className="p-4">
      <div className="row">
        <div className="col-12">
          <Paper style={{ padding: "25px" }} elevation={4}>
            <Typography variant="h4" gutterBottom>
              Nodes
            </Typography>
            <Typography
              style={{ color: "#767676" }}
              variant="subtitle1"
              className="mb-4"
            >
              Here you can add new nodes and view them in table.
            </Typography>
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <Paper style={{ padding: "15px" }} elevation={2}>
                  <Typography className="mb-3" variant="h5">
                    Create New Node
                  </Typography>
                  <NodsForm />
                </Paper>
              </div>
              <div className="col-md-6 col-sm-12">
                {/* CONTENT WILL COME HERE (TABLE) */}
              </div>
            </div>
          </Paper>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12">
          <Paper style={{ padding: "25px" }} elevation={4}>
            <Typography variant="h4" gutterBottom>
              Paths
            </Typography>
            <Typography
              style={{ color: "#767676" }}
              variant="subtitle1"
              className="mb-4"
            >
              Here you can add new paths and view them in the table.
            </Typography>
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <Paper style={{ padding: "15px" }} elevation={2}>
                  <Typography className="mb-3" variant="h5">
                    Create New Path
                  </Typography>
                  <PathsData />
                </Paper>
              </div>
              <div className="col-md-6 col-sm-12">
                {/* CONTENT WILL COME HERE (TABLE) */}
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default InputData;
