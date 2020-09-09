import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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

const DynamicDischargeForm = (props) => {
  const dynamicNodes = useSelector(
    (state) => state.dynamicNodesReducer.dynamicNodes
  );
  const dynamicDischargeNodes = [];
  for (let i = 0; i < dynamicNodes.length; i++) {
    if (
      dynamicNodes[i]["DynamicNodeType"] === "Ore" ||
      dynamicNodes[i]["DynamicNodeType"] === "Dump"
    ) {
      dynamicDischargeNodes.push(dynamicNodes[i]);
    }
  }
  useEffect(() => {
    console.log(dynamicDischargeNodes);
    for (let i = 0; i < dynamicDischargeNodes.length; i++) {
      setDynamicDischargeForm((prev) => ({
        ...prev,
        DynamicDischargeNodes: {
          ...dynamicDischargeNodes,
          elementConfig: {
            options: dynamicDischargeNodes.map((dynamicDischargeNode) => ({
              value: dynamicDischargeNode.DynamicNodes,
              displayValue: dynamicDischargeNode.DynamicNodes,
            })),
          },
          value: dynamicDischargeNodes[i]["DynamicNodes"].value
            ? dynamicDischargeNodes[i]["DynamicNodes"].value
            : dynamicDischargeNodes[0] &&
              dynamicDischargeNodes[0]["DynamicNodes"],
        },
      }));
    }
  }, [dynamicNodes]);

  const [dynamicDischargeForm, setDynamicDischargeForm] = useState({
    DynamicDischargeNodes: {
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
    DynamicDischargeCapacity: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Discharge capacities per nodes.",
      },
      id: "Discharge-Cap",
      value: "",
      validation: {
        required: true,
      },
      valid: true,
      touched: false,
    },
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const inputChangedHandler = (event, inputIdentifier) => {
    setDynamicDischargeForm({
      ...dynamicDischargeForm,
      [inputIdentifier]: {
        ...dynamicDischargeForm.inputIdentifier,
        value: event.target.value,
      },
    });
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in dynamicDischargeForm) {
      formData[formElementIdentifier] =
        dynamicDischargeForm[formElementIdentifier].value;
    }

    console.log(formData);
    const dynamicDischarge = {
      dynamicDischargeData: formData,
    };
    props.onSubmitInput(dynamicDischarge, props.token);
  };

  let form = (
    <form onSubmit={formSubmitHandler}>
      <div className="row mt-4">
        <div className="col-md-12">
          <FormControl className="w-100">
            <InputLabel>Select Discharge Point</InputLabel>
            <Select
              native
              value={dynamicDischargeForm.DynamicDischargeNodes.value}
              onChange={(e) => inputChangedHandler(e, "DynamicDischargeNodes")}
            >
              {dynamicDischargeNodes.map((dynamicDischarge, index) => (
                <option key={index} value={dynamicDischarge.DynamicNodes}>
                  {dynamicDischarge.DynamicNodes}
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
            {...dynamicDischargeForm.DynamicDischargeCapacity.elementConfig}
            value={dynamicDischargeForm.DynamicDischargeCapacity.value}
            onChange={(event) =>
              inputChangedHandler(event, "DynamicDischargeCapacity")
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
          Add Data
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
    onSubmitInput: (dynamicDischargeData, token) =>
      dispatch(
        actions.submitDynamicDischargeInputs(dynamicDischargeData, token)
      ),
  };
};

export default connect(null, mapDispatchToProps)(DynamicDischargeForm);
