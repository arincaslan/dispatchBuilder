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

const TraditionalTruckResultTable = (props) => {
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const classes = useStyles();
  const [trucks, setTrucks] = useState([]);

  useEffect(() => {
    if (props.traditionalTruckResults) {
      const resVals = Object.values(props.traditionalTruckResults);
      console.log(resVals)
      const tabledResVals = resVals.map((item) => ({
        resVal: props.traditionalTruckResults[item],
      }))
    }

    if (props.traditionalTruckResults) {
      const resNames = Object.keys(props.traditionalTruckResults).filter((item) => {
          return item;
      });
      const trucks = resNames.map((item) => ({
        resName: item,
      }));
      setTrucks(trucks);
      setRows(trucks.slice((currentPage - 1) * 5, currentPage * 5));
    }
  }, [currentPage, props.traditionalTruckResults]);


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Calculated Values</TableCell>
            <TableCell align="left">Results</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="left">{row.resName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        className="pt-2 pb-2 pl-2"
        color="primary"
        count={Math.ceil(trucks.length / 5)}
        variant="outlined"
        onChange={(e, value) => setCurrentPage(value)}
      />

    </TableContainer>



  );
};

export default TraditionalTruckResultTable;
