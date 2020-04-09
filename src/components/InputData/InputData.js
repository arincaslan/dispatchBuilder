import React, {useState, useEffect,} from 'react';
import classes from './InputData.module.css';
import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';
import Input from '../UI/Input/Input';
import NodsData from './Forms/NodesForm';
import PathsData from './Forms/PathsForm';
import axios from '../../axios-data';

const InputData = props => {
  //
  // const [submit, setSubmit] = useState(false);
  //
  //   const submitHandler = () => {
  //     setSubmit(true);
  //   }
  //
  //   const submitCancelHandler = () => {
  //     setSubmit(false)
  //   }
  //
  //   const submitContinueHandler = () => {
  //     const inputs = {
  //       nodes: 'Node names',
  //       times: 'Node times',
  //       types: 'Node Types'
  //     }
  //     axios.post('/inputs.json', inputs)
  //     .then(response => console.log(response))
  //     .catch(err => console.log(err));
  //   }

    return(
      <div >
        <h4>Enter Required Props In Order To Optimize</h4>
        <NodsData></NodsData>
        <PathsData></PathsData>
      </div>
    )
}

export default InputData;
