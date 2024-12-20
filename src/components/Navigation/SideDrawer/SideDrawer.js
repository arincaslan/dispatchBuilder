import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Auxilary from '../../../hoc/Auxilary/Auxilary';


const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return(
    <Auxilary>
    <div className={attachedClasses.join(' ')} onClick={props.closed}>
    <div className={classes.Logo}>
    Logo
    </div>
      <nav>
          <NavigationItems></NavigationItems>
      </nav>
    </div>
    </Auxilary>
  );
};

export default sideDrawer;
