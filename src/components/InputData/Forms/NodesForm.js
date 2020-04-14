import React, { useState, useEffect } from "react";
import classes from "./NodesForm.module.css";
// import Button from '../../UI/Button/Button';
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";

import Spinner from "../../UI/Spinner/Spinner";
import Input from "../../UI/Input/Input";
import { updateObject, checkValidity } from "../../../shared/utility";
import * as actions from "../../../store/actions/index";
import { connect, useSelector } from "react-redux";

const NodsForm = (props) => {
  const currentTypes = useSelector((state) => state.nodesReducer.types);
  const currentNodes = useSelector((state) => state.nodesReducer.nodes);

  const [nodeForm, setNodeForm] = useState({
    Nodes: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Node Name",
      },
      id: "node",
      value: "",
      validation: {
        required: false,
      },
      valid: true,
      touched: false,
    },
    NodeTime: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Node Time",
      },
      id: "node-time",
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    NodeType: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "Crusher", displayValue: "Crusher" },
          { value: "Showel", displayValue: "Showel" },
          { value: "Dump", displayValue: "Dump" },
        ],
      },
      value: "Crusher",
      validation: {},
      valid: true,
    },
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const inputChangedHandler = (event, inputIdentifier) => {
    // console.log(inputIdentifier);

    // const updatedFormElement = updateObject(nodeForm[inputIdentifier], {
    //   value: event.target.value,
    //   valid: true,
    //   touched: true,
    // });
    setNodeForm({
      ...nodeForm,
      [inputIdentifier]: {
        ...nodeForm.inputIdentifier,
        value: event.target.value,
      },
    });

    // const updatedNodeForm = updateObject(nodeForm, {
    //   [inputIdentifier]: updatedFormElement,
    // });

    // let formIsValid = true;
    // for (let inputIdentifier in updatedNodeForm) {
    //   formIsValid = updatedNodeForm[inputIdentifier].valid && formIsValid;
    // }
    // setNodeForm(updatedNodeForm);
    setFormIsValid(formIsValid);
  };

  // const formElementsArray = [];
  // for (let key in nodeForm) {
  //   formElementsArray.push({
  //     id: key,
  //     config: nodeForm[key],
  //   });
  // }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in nodeForm) {
      formData[formElementIdentifier] = nodeForm[formElementIdentifier].value;
    }

    const nodeTypes = {};
    const types = [...currentNodes, formData].map((item) => {
      nodeTypes[item.NodeType] = nodeTypes[item.NodeType]
        ? nodeTypes[item.NodeType] + 1
        : 1;
    });

    const node = {
      nodeData: formData,
      typeData: nodeTypes,
    };
    props.onSubmitInput(node, props.token);
  };

  let form = (
    <form onSubmit={formSubmitHandler}>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <TextField
            className="w-100"
            {...nodeForm.Nodes.elementConfig}
            value={nodeForm.Nodes.value}
            onChange={(event) => inputChangedHandler(event, "Nodes")}
          ></TextField>
        </div>
        <div className="col-md-6 col-sm-12">
          <TextField
            className="w-100"
            {...nodeForm.NodeTime.elementConfig}
            value={nodeForm.NodeTime.value}
            onChange={(event) => inputChangedHandler(event, "NodeTime")}
          ></TextField>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <FormControl className="w-100">
            <InputLabel htmlFor="age-native-simple">Node Type</InputLabel>
            <Select
              native
              value={nodeForm.NodeType.value}
              onChange={(e) => inputChangedHandler(e, "NodeType")}
            >
              <option value="Showel">Showel</option>
              <option value="Crusher">Crusher</option>
              <option value="Dump">Dump</option>
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <Button
          type="submit"
          className="mt-5"
          variant="contained"
          color="primary"
        >
          Add Node
        </Button>
      </div>
    </form>
  );
  if (props.loading) {
    form = <Spinner></Spinner>;
  }
  return <div className={classes.NodesForm}>{form}</div>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitInput: (nodeData, token) =>
      dispatch(actions.submitInputs(nodeData, token)),
  };
};

export default connect(null, mapDispatchToProps)(NodsForm);
