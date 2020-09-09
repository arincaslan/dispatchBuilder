import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./DynamicPathsForm.module.css";
// import Button from "../../UI/Button/Button";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";

import Spinner from "../../UI/Spinner/Spinner";
import Input from "../../UI/Input/Input";
import { updateObject, checkValidity } from "../../../shared/utility";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";

const DynamicPathsForm = (props) => {
  const dynamicNodes = useSelector(
    (state) => state.dynamicNodesReducer.dynamicNodes
  );

  useEffect(() => {
    setDynamicPathForm((prev) => ({
      ...prev,
      DynamicFirstNode: {
        ...prev.DynamicFirstNode,
        elementConfig: {
          options: dynamicNodes.map((dynamicNode) => ({
            value: dynamicNode.DynamicNodes,
            displayValue: dynamicNode.DynamicNodes,
          })),
        },
        value: prev.DynamicFirstNode.value
          ? prev.DynamicFirstNode.value
          : dynamicNodes[0] && dynamicNodes[0].DynamicNodes,
      },
      DynamicSecondNode: {
        ...prev.DynamicSecondNode,
        elementConfig: {
          options: dynamicNodes.map((dynamicNode) => ({
            value: dynamicNode.DynamicNodes,
            displayValue: dynamicNode.DynamicNodes,
          })),
        },
        value: prev.DynamicSecondNode.value
          ? prev.DynamicSecondNode.value
          : dynamicNodes[0] && dynamicNodes[0].DynamicNodes,
      },
    }));
  }, [dynamicNodes]);

  const [dynamicPathForm, setDynamicPathForm] = useState({
    DynamicFirstNode: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "", displayValue: "" },
          { value: "", displayValue: "" },
        ],
      },
      value: "",
      validation: {},
      valid: true,
    },
    DynamicSecondNode: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "", displayValue: "" },
          { value: "", displayValue: "" },
        ],
      },
      value: "",
      validation: {},
      valid: true,
    },
    DynamicTimeBetweenNodes: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder:
          "Give the average time spend between nodes in minutes. Exmp:5",
      },
      id: "node-btw-time",
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const inputChangedHandler = (event, inputIdentifier) => {
    setDynamicPathForm({
      ...dynamicPathForm,
      [inputIdentifier]: {
        ...dynamicPathForm.inputIdentifier,
        value: event.target.value,
      },
    });
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in dynamicPathForm) {
      formData[formElementIdentifier] =
        dynamicPathForm[formElementIdentifier].value;
    }

    console.log(formData);
    const dynamicPath = {
      dynamicPathData: formData,
    };
    props.onSubmitInput(dynamicPath, props.token);
  };

  let form = (
    <form onSubmit={formSubmitHandler}>
      <div className="row mt-4">
        <div className="col-md-6">
          <FormControl className="w-100">
            <InputLabel>First Node</InputLabel>
            <Select
              native
              value={dynamicPathForm.DynamicFirstNode.value}
              onChange={(e) => inputChangedHandler(e, "DynamicFirstNode")}
            >
              {dynamicNodes.map((dynamicNode, index) => (
                <option key={index} value={dynamicNode.DynamicNodes}>
                  {dynamicNode.DynamicNodes}
                </option>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="col-md-6 col-sm-12">
          <FormControl className="w-100">
            <InputLabel>Second Node</InputLabel>
            <Select
              native
              value={dynamicPathForm.DynamicSecondNode.value}
              onChange={(e) => inputChangedHandler(e, "DynamicSecondNode")}
            >
              {dynamicNodes.map((dynamicNode, index) => (
                <option key={index} value={dynamicNode.DynamicNodes}>
                  {dynamicNode.DynamicNodes}
                </option>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <TextField
            className="w-100"
            {...dynamicPathForm.DynamicTimeBetweenNodes.elementConfig}
            value={dynamicPathForm.DynamicTimeBetweenNodes.value}
            onChange={(event) =>
              inputChangedHandler(event, "DynamicTimeBetweenNodes")
            }
          ></TextField>
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <Button
          type="submit"
          className="mt-5"
          variant="contained"
          color="primary"
        >
          Add Path
        </Button>
      </div>
    </form>
  );
  if (props.loading) {
    form = <Spinner></Spinner>;
  }
  return <div>{form}</div>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitInput: (dynamicPathData, token) =>
      dispatch(actions.submitDynamicPathInputs(dynamicPathData, token)),
  };
};

export default connect(null, mapDispatchToProps)(DynamicPathsForm);
