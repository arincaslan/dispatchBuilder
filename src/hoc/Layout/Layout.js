import React,{useState} from 'react';
import Auxilary from '../Auxilary/Auxilary';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css';

const Layout = props => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);
  const sideDrawerClosedHandler = () => {
    setSideDrawerIsVisible(false);
  }
  const sideDrawerToggleHandler = () => {
  setSideDrawerIsVisible(!sideDrawerIsVisible);
  }

    return(
      <Auxilary>
        <Toolbar drawerToggleClicked={sideDrawerToggleHandler}></Toolbar>
        <SideDrawer
          open={sideDrawerIsVisible}
          closed={sideDrawerClosedHandler}></SideDrawer>
        <main className={classes.Content}>
          {props.children}
        </main>
      </Auxilary>)

}

export default Layout;
