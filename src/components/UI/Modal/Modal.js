import React from 'react';
import classes from './Modal.module.css';
import Auxilary from '../../../hoc/Auxilary/Auxilary';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => {
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.show !== props.show || nextProps.children !== props.children)
  //   {
  //     return true;
  //   }
  // }



    return(
  <Auxilary>
    <Backdrop show = {props.show} clicked={props.modalClosed}></Backdrop>
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1': '0'
      }}>
      {props.children}
    </div>
  </Auxilary>);

}
export default React.memo(Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
