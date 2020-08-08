import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact={true}>
      Home
    </NavigationItem>
    <NavigationItem link="/dispatchbuilder" exact>
      Dispatch Builder
    </NavigationItem>
    <NavigationItem link="/truckbuilder" exact>
      Truck Builder
    </NavigationItem>
    <NavigationItem link="/results">Results</NavigationItem>
  </ul>
);

export default navigationItems;
