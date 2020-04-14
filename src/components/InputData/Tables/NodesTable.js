import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const NodesTable = () => {
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const nodes = useSelector((state) => state.nodesReducer.nodes);
  const classes = useStyles();

  useEffect(() => {
    if (nodes.length) {
      setRows(nodes.slice((currentPage - 1) * 5, currentPage * 5));
    }
  }, [currentPage, nodes]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Node Name</TableCell>
            <TableCell align="left">Node Time&nbsp;(min)</TableCell>
            <TableCell align="left">Node Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="left">{row.Nodes}</TableCell>
              <TableCell align="left">{row.NodeTime}</TableCell>
              <TableCell align="left">{row.NodeType}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        className="pt-2 pb-2 pl-2"
        color="primary"
        count={Math.ceil(nodes.length / 5)}
        variant="outlined"
        onChange={(e, value) => setCurrentPage(value)}
      />
    </TableContainer>
  );
};

export default NodesTable;
