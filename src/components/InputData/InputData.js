import React, {useState, useEffect,} from 'react';
import classes from './InputData.module.css';
// import Button from '../UI/Button/Button';
import Button from '@material-ui/core/Button';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Spinner from '../UI/Spinner/Spinner';
import Input from '../UI/Input/Input';
import NodsData from './Forms/NodesForm';
import PathsData from './Forms/PathsForm';
import axios from '../../axios-data';
import NodeCard from '../NodeCard/NodeCard';
import {useSelector, useDispatch} from "react-redux";


const InputData = props => {


  const nodes = useSelector(state => state.nodesReducer.nodes);
  //
  // useEffect(() => {
  //   if (nodes.length){
  //     let cardOutput = {};
  //     for (let i = 0; i < nodes.length; i++) {
  //       cardOutput = [`${nodes[i]["Nodes"]}`]
  //       console.log(cardOutput);
  //   }
  // }
  // },[nodes])

    return(
      <div class="p-3">
        <Paper style={{padding: "25px"}} elevation={4}>
          <Typography variant="h4" gutterBottom>
            Nodes
          </Typography>
          <Typography style={{color: "#767676"}} variant="subtitle1" gutterBottom>
            Here you can add new nodes and view them in table.
          </Typography>
          <div class="row">
            <div class="col-md-6 col-sm-12">
              <Paper style={{padding: "15px"}} elevation={2}>
                <Typography variant="h5">
                  Create New Node
                </Typography>
                <NodsData />
              </Paper>
            </div>
            <div class="col-md-6 col-sm-12">
              {/* CONTENT WILL COME HERE (TABLE) */}
            </div>
          </div>
        </Paper>

        {nodes.map(node => (
          <NodeCard label={node.Nodes}></NodeCard>
        ))}
        <PathsData></PathsData>
      </div>
    )
}

export default InputData;
