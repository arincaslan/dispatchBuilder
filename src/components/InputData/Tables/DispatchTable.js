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

const DispatchTable = (props) => {
  const [paths, setPaths] = useState([]);
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const classes = useStyles();

  useEffect(() => {
    if (props.result) {
      const pathNames = Object.keys(props.result).filter((item) => {
        if (
          item !== "bounded" &&
          item !== "result" &&
          item !== "feasible" &&
          item !== "showels"
        ) {
          return item;
        }
      });
      const paths = pathNames.map((item) => ({
        pathName: item,
        truckPerMin: (props.result[item] * props.result.result).toFixed(3),
        pathTime: props.result[item].toFixed(3),
      }));
      setPaths(paths);
      setRows(paths.slice((currentPage - 1) * 5, currentPage * 5));
    }
  }, [currentPage, props.result]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Path</TableCell>
            <TableCell align="left">Trucks/Min</TableCell>
            <TableCell align="left">Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="left">{row.pathName}</TableCell>
              <TableCell align="left">{row.truckPerMin}</TableCell>
              <TableCell align="left">{row.pathTime}</TableCell>
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

export default DispatchTable;
