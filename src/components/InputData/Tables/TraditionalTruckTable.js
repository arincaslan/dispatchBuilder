import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Pagination from "@material-ui/lab/Pagination";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";
import TraditionalTruckForm from "../Forms/TraditionalTruckForm";

import * as actions from "../../../store/actions/index";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const TraditionalTruckTable = () => {
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const trucks = useSelector((state) => state.trucksReducer.trucks);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [truck, setTruck] = useState([]);

  useEffect(() => {
    if (trucks.length) {
      for (let i = 0; i < trucks.length; i++) {
        const yearlyStrippingRate = trucks[i]["YearlyStrippingRate"];
        const bucketStuffingFactor = trucks[i]["BucketStuffingFactor"];
        const workplaceEfficiency = trucks[i]["WorkplaceEfficiency"];
        const rockSwellFactor = trucks[i]["RockSwellFactor"];
        const bucketPeriod = trucks[i]["BucketPeriod"];
        const bucketVolume = trucks[i]["BucketVolume"];
        const truckTonnage = trucks[i]["TruckTonnage"];
        const materialDensity = trucks[i]["MaterialDensity"];
        const soilBlisteringFactor = trucks[i]["SoilBlisteringFactor"];
        const unloadingTime = trucks[i]["UnloadingTime"];
        const meanTravelTime = trucks[i]["MeanTravelTime"];
        const driverFactor = trucks[i]["DriverFactor"];

        const traditionalTruckVars = {
          YearlyStrippingRate: yearlyStrippingRate,
          BucketStuffingFactor: bucketStuffingFactor,
          WorkplaceEfficiency: workplaceEfficiency,
          RockSwellFactor: rockSwellFactor,
          BucketPeriod: bucketPeriod,
          BucketVolume: bucketVolume,
          TruckTonnage: truckTonnage,
          MaterialDensity: materialDensity,
          SoilBlisteringFactor: soilBlisteringFactor,
          UnloadingTime: unloadingTime,
          MeanTravelTime: meanTravelTime,
          DriverFactor: driverFactor,
        };
        setTruck(traditionalTruckVars);
      }
    }
    if (trucks.length) {
      setRows(trucks.slice((currentPage - 1) * 5, currentPage * 5));
    } else {
      setRows([]);
    }
  }, [currentPage, trucks]);

  return (
    <>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <div className="d-flex justify-content-between align-items-center">
            <p style={{ fontWeight: 400 }}>
              Truck Header Data{" "}
              <Tooltip title="deneme" placement="top">
                <InfoIcon style={{ color: "#767676", cursor: "pointer" }} />
              </Tooltip>
            </p>
            <p style={{ fontWeight: 300 }}>Data Result</p>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-sm-12">
        <div className="d-flex justify-content-between align-items-center">
          <p style={{ fontWeight: 400 }}>Yearly Stripping Rate</p>
          <p style={{ fontWeight: 300 }}>{truck.YearlyStrippingRate}</p>
        </div>
      </div>
      <div className="col-md-6 col-sm-12">
        <div className="d-flex justify-content-between align-items-center">
          <p style={{ fontWeight: 400 }}>Bucket Stuffing Factor</p>
          <p style={{ fontWeight: 300 }}>{truck.BucketStuffingFactor}</p>
        </div>
      </div>
      <div className="col-md-6 col-sm-12">
        <div className="d-flex justify-content-between align-items-center">
          <p style={{ fontWeight: 400 }}>Workplace Efficiency</p>
          <p style={{ fontWeight: 300 }}>{truck.WorkplaceEfficiency}</p>
        </div>
      </div>
      <div className="col-md-6 col-sm-12">
        <div className="d-flex justify-content-between align-items-center">
          <p style={{ fontWeight: 400 }}>Rock Swell Factor</p>
          <p style={{ fontWeight: 300 }}>{truck.RockSwellFactor}</p>
        </div>
      </div>
      <div className="col-md-6 col-sm-12">
        <div className="d-flex justify-content-between align-items-center">
          <p style={{ fontWeight: 400 }}>Bucket Period</p>
          <p style={{ fontWeight: 300 }}>{truck.BucketPeriod}</p>
        </div>
      </div>
      <div className="col-md-6 col-sm-12">
        <div className="d-flex justify-content-between align-items-center">
          <p style={{ fontWeight: 400 }}>Bucket Volume</p>
          <p style={{ fontWeight: 300 }}>{truck.BucketVolume}</p>
        </div>
      </div>
      <div className="col-md-6 col-sm-12">
        <div className="d-flex justify-content-between align-items-center">
          <p style={{ fontWeight: 400 }}>Truck Tonnage</p>
          <p style={{ fontWeight: 300 }}>{truck.TruckTonnage}</p>
        </div>
      </div>
      <div className="col-md-6 col-sm-12">
        <div className="d-flex justify-content-between align-items-center">
          <p style={{ fontWeight: 400 }}>Material Density</p>
          <p style={{ fontWeight: 300 }}>{truck.MaterialDensity}</p>
        </div>
      </div>
      <div className="col-md-6 col-sm-12">
        <div className="d-flex justify-content-between align-items-center">
          <p style={{ fontWeight: 400 }}>Soil Blistering Factor</p>
          <p style={{ fontWeight: 300 }}>{truck.SoilBlisteringFactor}</p>
        </div>
      </div>
      <div className="col-md-6 col-sm-12">
        <div className="d-flex justify-content-between align-items-center">
          <p style={{ fontWeight: 400 }}>Unloading Time</p>
          <p style={{ fontWeight: 300 }}>{truck.UnloadingTime}</p>
        </div>
      </div>
      <div className="col-md-6 col-sm-12">
        <div className="d-flex justify-content-between align-items-center">
          <p style={{ fontWeight: 400 }}>Mean Travel Time</p>
          <p style={{ fontWeight: 300 }}>{truck.MeanTravelTime}</p>
        </div>
      </div>
      <div className="col-md-6 col-sm-12">
        <div className="d-flex justify-content-between align-items-center">
          <p style={{ fontWeight: 400 }}>Driver Factor</p>
          <p style={{ fontWeight: 300 }}>{truck.DriverFactor}</p>
        </div>
      </div>
    </>
  );
};

export default TraditionalTruckTable;
