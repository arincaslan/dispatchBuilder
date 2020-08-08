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
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import * as actions from '../../../store/actions/index';


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

  useEffect(() => {
    if (trucks.length) {
      setRows(trucks.slice((currentPage - 1) * 5, currentPage * 5));
    } else {
      setRows([]);
    }
  }, [currentPage, trucks]);


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Yearly Stripping Rate</TableCell>
            <TableCell align="left">Bucket Stuffing Factor</TableCell>
            <TableCell align="left">Workplace Efficiency</TableCell>
            <TableCell align="left">Rock Swell Factor</TableCell>
            <TableCell align="left">Bucket Period</TableCell>
            <TableCell align="left">Truck Tonnage</TableCell>
            <TableCell align="left">Truck Volume</TableCell>
            <TableCell align="left">Material Density</TableCell>
            <TableCell align="left">Soil Blistering Factor</TableCell>
            <TableCell align="left">Unloading Time</TableCell>
            <TableCell align="left">Mean Travel Time</TableCell>
            <TableCell align="left">Driver Factor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="left">{row.YearlyStrippingRate}</TableCell>
              <TableCell align="left">{row.BucketStuffingFactor}</TableCell>
              <TableCell align="left">{row.WorkplaceEfficiency}</TableCell>
              <TableCell align="left">{row.RockSwellFactor}</TableCell>
              <TableCell align="left">{row.BucketPeriod}</TableCell>
              <TableCell align="left">{row.BucketVolume}</TableCell>
              <TableCell align="left">{row.TruckTonnage}</TableCell>
              <TableCell align="left">{row.MaterialDensity}</TableCell>
              <TableCell align="left">{row.SoilBlisteringFactor}</TableCell>
              <TableCell align="left">{row.UnloadingTime}</TableCell>
              <TableCell align="left">{row.MeanTravelTime}</TableCell>
              <TableCell align="left">{row.DriverFactor}</TableCell>
              <IconButton onClick={(id) => dispatch(actions.removeTruck({
                  YearlyStrippingRate: row.YearlyStrippingRate,
                  BucketStuffingFactor: row.BucketStuffingFactor,
                  WorkplaceEfficiency: row.WorkplaceEfficiency,
                  RockSwellFactor: row.RockSwellFactor,
                  BucketPeriod: row.BucketPeriod,
                  BucketVolume: row.BucketVolume,
                  TruckTonnage: row.TruckTonnage,
                  MaterialDensity: row.MaterialDensity,
                  SoilBlisteringFactor: row.SoilBlisteringFactor,
                  UnloadingTime: row.UnloadingTime,
                  MeanTravelTime: row.MeanTravelTime,
                  DriverFactor: row.DriverFactor,
                }))} aria-label="delete"  color="secondary">
                <DeleteIcon />
              </IconButton>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TraditionalTruckTable;
