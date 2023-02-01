import React from "react";
import DispathBuilderLogo from "../../../assets/images/dispatch-builder-logo.png";
import classes from "./Toolbar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import { Link } from "react-router-dom";

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.drawerToggleClicked}></DrawerToggle>
    <div className={classes.Logo} style={{ color: "white" }}>
      <Link to="">
        <img src={DispathBuilderLogo} style={{ height: "45px" }} alt="" />
      </Link>
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
