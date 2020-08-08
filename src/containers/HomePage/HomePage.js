import React from 'react';
// MATERIAL UI
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
//classes
import DispathBuilderLogo from "../../assets/images/dispatch-builder-logo.png";
import classes from "./HomePage.module.css";


const HomePage = () => {
  return (
    <div className = 'col-12'>
    <Typography color="primary" align="center" variant="h3" gutterBottom>
      Dispatch Builder For Mining Truck Optimization
    </Typography>
      <div className={classes.Logo} style={{ color: "red" }}>
        <img src={DispathBuilderLogo} style={{ height: "100px" }} alt="" />
      </div>
    </div>

  )
}



export default HomePage;
