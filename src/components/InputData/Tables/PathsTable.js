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

const PathsTable = () => {
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const paths = useSelector((state) => state.pathsReducer.paths);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (paths.length) {
      setRows(paths.slice((currentPage - 1) * 5, currentPage * 5));
    } else {
      setRows([]);
    }
  }, [currentPage, paths]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">First Node</TableCell>
            <TableCell align="left">Second Node</TableCell>
            <TableCell align="left">Time Between Nodes</TableCell>
            <TableCell align="left">Delete Path</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="left">{row.FirstNode}</TableCell>
              <TableCell align="left">{row.SecondNode}</TableCell>
              <TableCell align="left">{row.TimeBetweenNodes}</TableCell>
              <IconButton
                onClick={(id) => dispatch(actions.removePath(row))}
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
        count={Math.ceil(paths.length / 5)}
        variant="outlined"
        onChange={(e, value) => setCurrentPage(value)}
      />
    </TableContainer>
  );
};

export default PathsTable;
