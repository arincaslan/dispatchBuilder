import React, { useState, useEffect } from "react";
import TraditionalTruckForm from "./Forms/TraditionalTruckForm";
import TraditionalTruckTable from "./Tables/TraditionalTruckTable";

// REDUX
import { useSelector } from "react-redux";
// MATERIAL UI
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";


const TraditionalTruckData = (props) => {
  const trucks = useSelector((state) => state.trucksReducer.trucks);

  return (
    <div className="p-4">
      <div className="row">
        <div className="col-12">
          <Paper style={{ padding: "25px" }} elevation={4}>
            <Typography variant="h4" gutterBottom>
              Truck Calculator Form
            </Typography>
            <Typography
              style={{ color: "#767676" }}
              variant="subtitle1"
              className="mb-4"
            >
              Here you can add your required data in order to calculate Truck Number in traditional way.
            </Typography>
            <div className="row">
              <div className="col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
                <Paper style={{ padding: "30px", width: "100%" }} elevation={2}>
                  <Typography className="mb-3" variant="h5">
                    Data Form
                  </Typography>
                  <TraditionalTruckForm />
                </Paper>
              </div>
              <div className="col-md-6 col-sm-12">
                {/* CONTENT WILL COME HERE (TABLE) */}
                <TraditionalTruckTable />
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default TraditionalTruckData;
