import React, { useState, useEffect } from "react";
import classes from "./DynamicGPNodesForm.module.css";
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

const DynamicGPNodesForm = (props) => {
  const currentGpTypes = useSelector(
    (state) => state.gpNodesReducer.gpTypes
  );
  const currentGpNodes = useSelector(
    (state) => state.gpNodesReducer.gpNodes
  );

  const [gpNodeForm, setGpNodeForm] = useState({
    GpNodes: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Node Name",
      },
      id: "gp-node",
      value: "",
      validation: {
        required: false,
      },
      valid: true,
      touched: false,
    },
    GpNodesCoordinate: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Node Coordinate",
      },
      id: "gp-node-coordinate",
      value: "",
      validation: {
        required: false,
      },
      valid: true,
      touched: false,
    },
    GpNodeTime: {
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
    GpNodeType: {
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
    setGpNodeForm({
      ...gpNodeForm,
      [inputIdentifier]: {
        ...gpNodeForm.inputIdentifier,
        value: event.target.value,
      },
    });
    setFormIsValid(formIsValid);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in gpNodeForm) {
      formData[formElementIdentifier] =
        gpNodeForm[formElementIdentifier].value;
    }

    const gpNodeTypes = {};
    const gpTypes = [...currentGpNodes, formData].map((item) => {
      gpNodeTypes[item.GpNodeType] = gpNodeTypes[
        item.GpNodeType
      ]
        ? gpNodeTypes[item.GpNodeType] + 1
        : 1;
    });

    const node = {
      gpNodeData: formData,
      gpTypeData: gpNodeTypes,
    };
    props.onSubmitInput(node, props.token);
  };

  let form = (
    <form onSubmit={formSubmitHandler}>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <TextField
            className="w-100"
            {...gpNodeForm.GpNodes.elementConfig}
            value={gpNodeForm.GpNodes.value}
            onChange={(event) => inputChangedHandler(event, "GpNodes")}
          ></TextField>
        </div>
        <div className="col-md-6 col-sm-12">
          <TextField
            className="w-100"
            {...gpNodeForm.GpNodesCoordinate.elementConfig}
            value={gpNodeForm.GpNodesCoordinate.value}
            onChange={(event) =>
              inputChangedHandler(event, "GpNodesCoordinate")
            }
          ></TextField>
        </div>
        <div className="col-md-12 col-sm-12 mt-1">
          <TextField
            className="w-100"
            {...gpNodeForm.GpNodeTime.elementConfig}
            value={gpNodeForm.GpNodeTime.value}
            onChange={(event) => inputChangedHandler(event, "GpNodeTime")}
          ></TextField>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <FormControl className="w-100">
            <InputLabel htmlFor="age-native-simple">Node Type</InputLabel>
            <Select
              native
              value={gpNodeForm.GpNodeType.value}
              onChange={(e) => inputChangedHandler(e, "GpNodeType")}
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
  return <div className={classes.DynamicGPNodesForm}>{form}</div>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitInput: (gpNodeData, token) =>
      dispatch(actions.submitGpNodeInputs(gpNodeData, token)),
  };
};

export default connect(null, mapDispatchToProps)(DynamicGPNodesForm);
