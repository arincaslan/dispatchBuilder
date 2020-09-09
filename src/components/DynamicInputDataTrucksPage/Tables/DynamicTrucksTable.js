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
// actions
import * as actions from "../../../store/actions/index";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const DynamicTrucksTable = () => {
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dynamicTrucks = useSelector(
    (state) => state.dynamicTrucksReducer.dynamicTrucks
  );
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (dynamicTrucks.length) {
      setRows(dynamicTrucks.slice((currentPage - 1) * 5, currentPage * 5));
    } else {
      setRows([]);
    }
  }, [currentPage, dynamicTrucks]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name The Truck</TableCell>
            <TableCell align="left">Trucks Capacity</TableCell>
            <TableCell align="left">Truck Quantity</TableCell>
            <TableCell align="left">Truck Type</TableCell>
            <TableCell align="left">Delete Truck Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="center">{row.Trucks}</TableCell>
              <TableCell align="center">{row.TrucksCapacity}</TableCell>
              <TableCell align="center">{row.TrucksTypeQuantity}</TableCell>
              <TableCell align="center">{row.DynamicTruckType}</TableCell>
              <IconButton
                onClick={(id) =>
                  dispatch(
                    actions.removeDynamicTruck({
                      Trucks: row.Trucks,
                      TrucksCapacity: row.TrucksCapacity,
                      TrucksTypeQuantity: row.TrucksTypeQuantity,
                      DynamicTruckType: row.DynamicTruckType,
                    })
                  )
                }
                aria-label="delete"
                color="danger"
              >
                <DeleteIcon />
              </IconButton>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        className="pt-2 pb-2 pl-2"
        color="primary"
        count={Math.ceil(dynamicTrucks.length / 5)}
        variant="outlined"
        onChange={(e, value) => setCurrentPage(value)}
      />
    </TableContainer>
  );
};

export default DynamicTrucksTable;
