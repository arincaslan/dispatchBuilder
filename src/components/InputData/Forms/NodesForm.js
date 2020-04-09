import React, {useState, useEffect,} from 'react';
import classes from './NodesForm.module.css';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';
import Input from '../../UI/Input/Input';
import {updateObject, checkValidity} from '../../../shared/utility';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';


const NodsData = props => {
    const [nodeForm, setNodeForm] = useState({
        Nodes: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Name the All Nodes Example:X1'
          },
          id: 'node',
          value: '',
          validation: {
            required: false
          },
          valid: true,
          touched: false
        },
        NodeTime: {
          elementType: 'input',
          elementConfig: {
            type: 'number',
            placeholder: 'Give the average time spen on that node in minutes.Exmp:3'
          },
          id: 'node-time',
          value: '',
          validation: {
            required:true
          },
          valid: false,
          touched: false
        },
      NodeType: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'Crusher', displayValue: 'Crusher'},
            {value: 'Showel', displayValue: 'Showel'},
            {value: 'Dump', displayValue: 'Dump'}
        ]
        },
        value: 'Crusher',
        validation: {},
        valid: true
      }
    })

      const [formIsValid, setFormIsValid] = useState(false);

      const inputChangedHandler = (event, inputIdentifier) => {

      const updatedFormElement = updateObject(nodeForm[inputIdentifier], {
        value: event.target.value,
        valid: checkValidity(event.target.value, nodeForm[inputIdentifier].validation),
        touched: true
      });

      const updatedNodeForm = updateObject(nodeForm, {
        [inputIdentifier]: updatedFormElement
      });

      let formIsValid = true;
      for (let inputIdentifier in updatedNodeForm) {
        formIsValid = updatedNodeForm[inputIdentifier].valid && formIsValid;
      }
      setNodeForm(updatedNodeForm);
      setFormIsValid(formIsValid);
}


    const formElementsArray = [];
    for (let key in nodeForm) {
      formElementsArray.push({
        id: key,
        config: nodeForm[key]
      });
    }

    const formSubmitHandler = (event) => {
          event.preventDefault();

          const formData = {};
          for (let formElementIdentifier in nodeForm){
            formData[formElementIdentifier] = nodeForm[formElementIdentifier].value;
          }

          console.log(formData)
          const node = {
              nodeData: formData,
          }
          props.onSubmitInput(node, props.token);
      }



    let form = (
      <form  onSubmit={formSubmitHandler}>
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
      <div className={classes.NodesForm}>

        {form}
      </div>
    )
}





const mapDispatchToProps = dispatch => {
  return {
    onSubmitInput: (nodeData, token) => dispatch(actions.submitInputs(nodeData, token))
  };
};


export default connect(null, mapDispatchToProps)(NodsData) ;
