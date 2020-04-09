import React, {useState, useEffect,} from 'react';
import {useSelector, useDispatch} from "react-redux";
import classes from './PathsForm.module.css';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';
import Input from '../../UI/Input/Input';
import {updateObject, checkValidity} from '../../../shared/utility';
import NodsData from './NodesForm';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';


const PathsData = props => {
  const nodes = useSelector(state => state.nodesReducer.nodes);

  useEffect(() => {
    setPathForm(prev => ({...prev,
      FirstNode: {
      ...prev.FirstNode,
      elementConfig: {
        options: nodes.map(node => ({value: node.Nodes, displayValue: node.Nodes}))
      },
      value: prev.FirstNode.value ? prev.FirstNode.value : nodes[0] && nodes[0].Nodes
    },
    SecondNode: {
      ...prev.SecondNode,
      elementConfig: {
        options: nodes.map(node => ({value: node.Nodes, displayValue: node.Nodes}))
      },
      value: prev.SecondNode.value ? prev.SecondNode.value : nodes[0] && nodes[0].Nodes
    }
    }))
  }, [nodes])


  const [pathForm, setPathForm] = useState({
    FirstNode: {
      elementType: 'select',
      elementConfig: {
        options: [
          {value: '', displayValue: ''},
          {value: '', displayValue: ''}
        ]
      },
      value: '',
      validation: {},
      valid: true
    },
    SecondNode: {
      elementType: 'select',
      elementConfig: {
        options: [
          {value: '', displayValue: ''},
          {value: '', displayValue: ''},
      ]
      },
      value: '',
      validation: {},
      valid: true
    },
    TimeBetweenNodes: {
      elementType: 'input',
      elementConfig: {
        type: 'number',
        placeholder: 'Give the average time spend between nodes in minutes. Exmp:5'
      },
      id: 'node-btw-time',
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
  })


      const [formIsValid, setFormIsValid] = useState(false);


      const inputChangedHandler = (event, inputIdentifier) => {

      const updatedFormElement = updateObject(pathForm[inputIdentifier], {
        value: event.target.value,
        valid: checkValidity(event.target.value, pathForm[inputIdentifier].validation),
        touched: true
      });

      const updatedPathForm = updateObject(pathForm, {
        [inputIdentifier]: updatedFormElement
      });

      let formIsValid = true;
      for (let inputIdentifier in updatedPathForm) {
        formIsValid = updatedPathForm[inputIdentifier].valid && formIsValid;
      }
      setPathForm(updatedPathForm);
      setFormIsValid(formIsValid);
}


    const formElementsArray = [];
    for (let key in pathForm) {
      formElementsArray.push({
        id: key,
        config: pathForm[key]
      });
    }

    const formSubmitHandler = (event) => {
          event.preventDefault();

          const formData = {};
          for (let formElementIdentifier in pathForm){
            formData[formElementIdentifier] = pathForm[formElementIdentifier].value;
          }

          console.log(formData)
          const path = {
              pathData: formData,
          }
          props.onSubmitInput(path, props.token);
      }


    let form = (
      <form onSubmit={formSubmitHandler}>
          {formElementsArray.map((formElement) => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={(event) => inputChangedHandler(event, formElement.id)}
              ></Input>
          ))}


          <Button btnType="Success" >Add Node</Button>
      </form>
    );
    if (props.loading) {
      form = <Spinner></Spinner>;
    }
    return(
      <div className={classes.PathsForm}>

        {form}
      </div>
    )
}


const mapDispatchToProps = dispatch => {
  return {
    onSubmitInput: (pathData, token) => dispatch(actions.submitPathInputs(pathData, token))
  };
};


export default connect(null, mapDispatchToProps)(PathsData) ;
