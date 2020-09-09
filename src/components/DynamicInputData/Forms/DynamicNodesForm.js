import React, { useState, useEffect } from "react";
import classes from "./DynamicNodesForm.module.css";
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

const DynamicNodesForm = (props) => {
  const currentDynamicTypes = useSelector(
    (state) => state.dynamicNodesReducer.dynamicTypes
  );
  const currentDynamicNodes = useSelector(
    (state) => state.dynamicNodesReducer.dynamicNodes
  );

  const [dynamicNodeForm, setDynamicNodeForm] = useState({
    DynamicNodes: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Node Name",
      },
      id: "dynamic-node",
      value: "",
      validation: {
        required: false,
      },
      valid: true,
      touched: false,
    },
    DynamicNodesCoordinate: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Node Coordinate",
      },
      id: "dynamic-node-coordinate",
      value: "",
      validation: {
        required: false,
      },
      valid: true,
      touched: false,
    },
    DynamicNodeTime: {
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
    DynamicNodeType: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "Crusher", displayValue: "Crusher" },
          { value: "Showel", displayValue: "Showel" },
          { value: "Dump", displayValue: "Dump" },
          { value: "Ore", displayValue: "Ore" },
        ],
      },
      value: "Crusher",
      validation: {},
      valid: true,
    },
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const inputChangedHandler = (event, inputIdentifier) => {
    setDynamicNodeForm({
      ...dynamicNodeForm,
      [inputIdentifier]: {
        ...dynamicNodeForm.inputIdentifier,
        value: event.target.value,
      },
    });
    setFormIsValid(formIsValid);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in dynamicNodeForm) {
      formData[formElementIdentifier] =
        dynamicNodeForm[formElementIdentifier].value;
    }

    const dynamicNodeTypes = {};
    const dynamicTypes = [...currentDynamicNodes, formData].map((item) => {
      dynamicNodeTypes[item.DynamicNodeType] = dynamicNodeTypes[
        item.DynamicNodeType
      ]
        ? dynamicNodeTypes[item.DynamicNodeType] + 1
        : 1;
    });

    const node = {
      dynamicNodeData: formData,
      dynamicTypeData: dynamicNodeTypes,
    };
    props.onSubmitInput(node, props.token);
  };

  let form = (
    <form onSubmit={formSubmitHandler}>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <TextField
            className="w-100"
            {...dynamicNodeForm.DynamicNodes.elementConfig}
            value={dynamicNodeForm.DynamicNodes.value}
            onChange={(event) => inputChangedHandler(event, "DynamicNodes")}
          ></TextField>
        </div>
        <div className="col-md-6 col-sm-12">
          <TextField
            className="w-100"
            {...dynamicNodeForm.DynamicNodesCoordinate.elementConfig}
            value={dynamicNodeForm.DynamicNodesCoordinate.value}
            onChange={(event) =>
              inputChangedHandler(event, "DynamicNodesCoordinate")
            }
          ></TextField>
        </div>
        <div className="col-md-12 col-sm-12 mt-1">
          <TextField
            className="w-100"
            {...dynamicNodeForm.DynamicNodeTime.elementConfig}
            value={dynamicNodeForm.DynamicNodeTime.value}
            onChange={(event) => inputChangedHandler(event, "DynamicNodeTime")}
          ></TextField>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <FormControl className="w-100">
            <InputLabel htmlFor="age-native-simple">Node Type</InputLabel>
            <Select
              native
              value={dynamicNodeForm.DynamicNodeType.value}
              onChange={(e) => inputChangedHandler(e, "DynamicNodeType")}
            >
              <option value="Showel">Showel</option>
              <option value="Crusher">Crusher</option>
              <option value="Dump">Dump</option>
              <option value="Ore">Ore</option>
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
  return <div className={classes.DynamicNodesForm}>{form}</div>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitInput: (dynamicNodeData, token) =>
      dispatch(actions.submitDynamicNodeInputs(dynamicNodeData, token)),
  };
};

export default connect(null, mapDispatchToProps)(DynamicNodesForm);
