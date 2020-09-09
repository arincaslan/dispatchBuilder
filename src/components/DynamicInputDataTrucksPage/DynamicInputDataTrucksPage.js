import React, { useState, useEffect } from "react";

//Forms
import DynamicTrucksForm from "./Forms/DynamicTrucksForm";
import DynamicPathsCostsForm from "./Forms/DynamicPathCostsForm";
import NodeCard from "../NodeCard/NodeCard";

//Tables
import DynamicTrucksTable from "./Tables/DynamicTrucksTable";
import DynamicPathsCostsTable from "./Tables/DynamicPathCostsTable";

// REDUX
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// MATERIAL UI
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";

const DynamicInputDataTrucksPage = (props) => {
  const dynamicTrucks = useSelector(
    (state) => state.dynamicTrucksReducer.dynamicTrucks
  );

  return (
    <div className="p-4">
      <div className="row">
        <div className="col-12">
          <Paper style={{ padding: "25px" }} elevation={4}>
            <div className="d-flex align-items-center mt-3">
              <Typography variant="h4" gutterBottom>
                Step 3 : Trucks Form
              </Typography>
              <Tooltip title="deneme" placement="right-end">
                <InfoIcon
                  style={{
                    cursor: "pointer",
                    color: "#767676",
                    marginLeft: "15px",
                    marginBottom: "5px",
                  }}
                />
              </Tooltip>
              <Tooltip title="deneme" placement="right-end">
                <InfoIcon
                  style={{
                    cursor: "pointer",
                    color: "#767676",
                    marginLeft: "15px",
                    marginBottom: "5px",
                  }}
                />
              </Tooltip>
            </div>
            <Typography
              style={{ color: "#767676" }}
              variant="subtitle1"
              className="mb-4"
            >
              Here you can add new truck types and their capacities.
            </Typography>
            <div className="row">
              <div className="col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
                <Paper style={{ padding: "30px", width: "100%" }} elevation={2}>
                  <Typography className="mb-3" variant="h5">
                    Create Trucks Data
                  </Typography>
                  <DynamicTrucksForm />
                </Paper>
              </div>
              <div className="col-md-6 col-sm-12">
                {/* CONTENT WILL COME HERE (TABLE) */}
                <DynamicTrucksTable />
              </div>
            </div>
          </Paper>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12">
          <Paper style={{ padding: "25px" }} elevation={4}>
            <div className="d-flex align-items-center mt-3">
              <Typography variant="h4" gutterBottom>
                Step 4 : Total Travel Costs
              </Typography>
              <Tooltip title="deneme" placement="right-end">
                <InfoIcon
                  style={{
                    cursor: "pointer",
                    color: "#767676",
                    marginLeft: "15px",
                    marginBottom: "5px",
                  }}
                />
              </Tooltip>
              <Tooltip title="deneme" placement="right-end">
                <InfoIcon
                  style={{
                    cursor: "pointer",
                    color: "#767676",
                    marginLeft: "15px",
                    marginBottom: "5px",
                  }}
                />
              </Tooltip>
            </div>
            <Typography
              style={{ color: "#767676" }}
              variant="subtitle1"
              className="mb-4"
            >
              Here you can add every paths total travel cost for each type of
              truck.
            </Typography>
            <div className="row">
              <div className="col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
                <Paper style={{ padding: "30px", width: "100%" }} elevation={2}>
                  <Typography className="mb-3" variant="h5">
                    Create Travel Data
                  </Typography>
                  <DynamicPathsCostsForm />
                </Paper>
              </div>
              <div className="col-md-6 col-sm-12">
                {/* CONTENT WILL COME HERE (TABLE) */}
                <DynamicPathsCostsTable />
              </div>
            </div>
          </Paper>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div className="mr-5">
          <Button
            component={Link}
            to="/dynamicdispatchbuilder"
            className="mt-5"
            variant="contained"
          >
            Back To Earlier Steps
          </Button>
        </div>
        <div className="ml-5">
          <Button
            component={Link}
            to="/dynamicdispatchbuilderelementspage"
            className="mt-5"
            variant="contained"
            color="primary"
          >
            Go To Next Steps
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DynamicInputDataTrucksPage;
