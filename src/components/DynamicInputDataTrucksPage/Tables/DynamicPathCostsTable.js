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
//actions
import * as actions from "../../../store/actions/index";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const DynamicPathCostsTable = () => {
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dynamicPathCosts = useSelector(
    (state) => state.dynamicPathCostsReducer.dynamicPathCosts
  );
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (dynamicPathCosts.length) {
      setRows(dynamicPathCosts.slice((currentPage - 1) * 5, currentPage * 5));
    } else {
      setRows([]);
    }
  }, [currentPage, dynamicPathCosts]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Path Name</TableCell>
            <TableCell align="left">Truck Type</TableCell>
            <TableCell align="left">Path Type</TableCell>
            <TableCell align="left">Travel Costs</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="center">
                {row.DynamicConcatenatedPaths}
              </TableCell>
              <TableCell align="center">{row.DynamicTruckTypes}</TableCell>
              <TableCell align="center">
                {row.DynamicTravelCostForPath}
              </TableCell>
              <TableCell align="center">{row.DynamicPathType}</TableCell>
              <IconButton
                onClick={(id) => dispatch(actions.removeDynamicPathCost(row))}
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
        count={Math.ceil(dynamicPathCosts.length / 5)}
        variant="outlined"
        onChange={(e, value) => setCurrentPage(value)}
      />
    </TableContainer>
  );
};

export default DynamicPathCostsTable;
