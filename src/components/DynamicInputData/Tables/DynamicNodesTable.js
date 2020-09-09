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

const DynamicNodesTable = () => {
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dynamicNodes = useSelector(
    (state) => state.dynamicNodesReducer.dynamicNodes
  );
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (dynamicNodes.length) {
      setRows(dynamicNodes.slice((currentPage - 1) * 5, currentPage * 5));
    } else {
      setRows([]);
    }
  }, [currentPage, dynamicNodes]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Node Name</TableCell>
            <TableCell align="left">Node Coordinate</TableCell>
            <TableCell align="left">Node Time&nbsp;(min)</TableCell>
            <TableCell align="left">Node Type</TableCell>
            <TableCell align="left">Delete Node</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="center">{row.DynamicNodes}</TableCell>
              <TableCell align="center">{row.DynamicNodesCoordinate}</TableCell>
              <TableCell align="center">{row.DynamicNodeTime}</TableCell>
              <TableCell align="left">{row.DynamicNodeType}</TableCell>
              <IconButton
                onClick={(id) =>
                  dispatch(
                    actions.removeDynamicNode({
                      DynamicNodes: row.DynamicNodes,
                      DynamicNodesCoordinate: row.DynamicNodesCoordinate,
                      DynamicNodeTime: row.DynamicNodeTime,
                      DynamicNodeType: row.DynamicNodeType,
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
        count={Math.ceil(dynamicNodes.length / 5)}
        variant="outlined"
        onChange={(e, value) => setCurrentPage(value)}
      />
    </TableContainer>
  );
};

export default DynamicNodesTable;
