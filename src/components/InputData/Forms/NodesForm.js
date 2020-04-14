import React, {useState, useEffect} from 'react';
import classes from './NodesForm.module.css';
// import Button from '../../UI/Button/Button';
import Button from '@material-ui/core/Button';
import Spinner from '../../UI/Spinner/Spinner';
import Input from '../../UI/Input/Input';
import TextField from "@material-ui/core/TextField";
import {updateObject, checkValidity} from '../../../shared/utility';
import * as actions from '../../../store/actions/index';
import {connect, useSelector} from 'react-redux';


const NodsData = props => {
  const currentTypes = useSelector(state => state.nodesReducer.types);
  const currentNodes = useSelector(state => state.nodesReducer.nodes);

    const [nodeForm, setNodeForm] = useState({
        Nodes: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Node Name'
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
        console.log(inputIdentifier)

      const updatedFormElement = updateObject(nodeForm[inputIdentifier], {
        value: event.target.value,
        valid: true,
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

          console.log("formData", formData)
          const nodeTypes = {};
          const types = [...currentNodes, formData].map(item => {
            nodeTypes[item.NodeType] = nodeTypes[item.NodeType] ? nodeTypes[item.NodeType] + 1 : 1;
          })
          console.log("nodeTypes", nodeTypes);

          const node = {
              nodeData: formData,
              typeData: nodeTypes
          }
          props.onSubmitInput(node, props.token);
      }



    let form = (
      <form  onSubmit={formSubmitHandler}>

          <TextField
            key={nodeForm.Nodes.id}

            {...nodeForm.Nodes.elementConfig}
            value={nodeForm.Nodes.value}
            invalid={!nodeForm.Nodes.valid}
            shouldValidate={nodeForm.Nodes.validation}
            touched={nodeForm.Nodes.touched}
            onChange={(event) => inputChangedHandler(event, nodeForm.Nodes.id)}
            >
          </TextField>


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
