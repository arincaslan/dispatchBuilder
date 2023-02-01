import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact={true}>
      Home
    </NavigationItem>
    <NavigationItem link="/dispatchbuilder" exact>
      Static Dispatch Builder
    </NavigationItem>
    <NavigationItem link="/dynamicdispatchbuilder" exact>
      Real Time Dispatch Builder
    </NavigationItem>
    <NavigationItem link="/dynamicdispatchbuildergp" exact>
      Real Time Dispatch Builder (GP)
    </NavigationItem>

    <NavigationItem link="/results">Results</NavigationItem>
    <NavigationItem link="/dynamicresults">Dynamic Results</NavigationItem>
  </ul>
);

export default navigationItems;
// <NavigationItem link="/truckbuilder" exact>
//   Truck Builder
// </NavigationItem>
