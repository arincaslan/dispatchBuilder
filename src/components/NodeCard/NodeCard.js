import React from 'react';

import classes from './NodeCard.module.css';


const NodeCard = (props) => (
    <div className= {classes.NodeCard} onClick={props.clicked}>
        {props.label}
    </div>
);

export default NodeCard;
